// Vercel serverless function: GET /api/dsa-stats
//
// Live solved-problem counts for the portfolio's DSA section, from
//   - LeetCode GraphQL (profile solved counts by difficulty)
//   - Codeforces API   (unique accepted problems + rating/rank)
// The response is cached at Vercel's edge for an hour, so the upstream APIs are
// hit roughly hourly, not on every visit. If one source fails, the other is still
// returned and the page fills the gap from public/dsa-fallback.json.

const LEETCODE_USERNAME = "AbhigyanDeyGameJava";
const CODEFORCES_HANDLE = "Abhigyan_Java110707";
const TIMEOUT_MS = 8000;

async function getJson(url, init) {
  const res = await fetch(url, { ...init, signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!res.ok) throw new Error(`${new URL(url).host} responded ${res.status}`);
  return res.json();
}

export async function fetchLeetCode(username = LEETCODE_USERNAME) {
  const json = await getJson("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: "https://leetcode.com",
      "User-Agent": "Mozilla/5.0 (portfolio dsa-stats)",
    },
    body: JSON.stringify({
      query: `query ($u: String!) {
        matchedUser(username: $u) {
          submitStatsGlobal { acSubmissionNum { difficulty count } }
        }
      }`,
      variables: { u: username },
    }),
  });

  const rows = json.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum;
  if (!rows) throw new Error(json.errors?.[0]?.message ?? `LeetCode user "${username}" not found`);

  const count = (difficulty) => rows.find((r) => r.difficulty === difficulty)?.count ?? 0;
  return {
    username,
    profileUrl: `https://leetcode.com/u/${username}/`,
    total: count("All"),
    easy: count("Easy"),
    medium: count("Medium"),
    hard: count("Hard"),
  };
}

export async function fetchCodeforces(handle = CODEFORCES_HANDLE) {
  const api = (method) =>
    getJson(`https://codeforces.com/api/${method}`).then((json) => {
      if (json.status !== "OK") throw new Error(`Codeforces: ${json.comment}`);
      return json.result;
    });

  // Sequential: Codeforces rate-limits bursts of requests
  const [info] = await api(`user.info?handles=${encodeURIComponent(handle)}`);
  const submissions = await api(`user.status?handle=${encodeURIComponent(handle)}`);

  const solved = new Set();
  for (const s of submissions) {
    if (s.verdict !== "OK") continue;
    const p = s.problem;
    // Problems without a contestId (e.g. acmsguru) are keyed by their problemset
    solved.add(`${p.contestId ?? p.problemsetName}-${p.index}`);
  }

  return {
    handle,
    profileUrl: `https://codeforces.com/profile/${handle}`,
    solved: solved.size,
    // Unrated accounts have no rating/rank fields at all
    rating: info.rating ?? null,
    maxRating: info.maxRating ?? null,
    rank: info.rank ?? "unrated",
    maxRank: info.maxRank ?? null,
  };
}

export default async function handler(req, res) {
  const [leetcode, codeforces] = await Promise.allSettled([fetchLeetCode(), fetchCodeforces()]);

  const body = {
    updatedAt: new Date().toISOString(),
    leetcode: leetcode.status === "fulfilled" ? leetcode.value : null,
    codeforces: codeforces.status === "fulfilled" ? codeforces.value : null,
  };
  body.total = (body.leetcode?.total ?? 0) + (body.codeforces?.solved ?? 0);

  const errors = {};
  if (leetcode.status === "rejected") errors.leetcode = leetcode.reason.message;
  if (codeforces.status === "rejected") errors.codeforces = codeforces.reason.message;
  if (Object.keys(errors).length) body.errors = errors;

  const ok = body.leetcode || body.codeforces;
  // Full result: cache for an hour. Partial/failed: retry within a few minutes.
  res.setHeader(
    "Cache-Control",
    body.errors
      ? "public, s-maxage=300, stale-while-revalidate=3600"
      : "public, s-maxage=3600, stale-while-revalidate=86400"
  );
  res.status(ok ? 200 : 502).json(body);
}
