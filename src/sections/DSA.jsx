import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import TitleHeader from "../components/TitleHeader";
import { lcDifficulties, cfRankColors } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const fetchJson = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json(); // throws on non-JSON, e.g. the SPA's index.html under `vite dev`
};

// Live stats from the serverless function; any source it couldn't reach is
// filled from the last saved values, so the section never shows an error.
async function loadStats() {
  let live = null;
  try {
    live = await fetchJson("/api/dsa-stats");
  } catch {
    // fall through to the saved values
  }
  if (live?.leetcode && live?.codeforces) return { ...live, source: "live" };

  let saved = null;
  try {
    saved = await fetchJson(`${import.meta.env.BASE_URL}dsa-fallback.json`);
  } catch {
    // nothing saved either; show placeholders
  }

  const leetcode = live?.leetcode ?? saved?.leetcode ?? null;
  const codeforces = live?.codeforces ?? saved?.codeforces ?? null;
  return {
    leetcode,
    codeforces,
    total: (leetcode?.total ?? 0) + (codeforces?.solved ?? 0),
    updatedAt: live?.updatedAt ?? saved?.updatedAt,
    source: live ? "partial" : "saved",
  };
}

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const titleCase = (s) => s.replace(/\b\w/g, (c) => c.toUpperCase());

const ProgressBar = ({ label, value, max, color, display }) => (
  <div>
    <div className="flex justify-between gap-4 text-sm mb-2">
      <span className="text-white-50">{label}</span>
      <span className="font-semibold">{display ?? value}</span>
    </div>
    <div className="h-2 rounded-full bg-black-200 overflow-hidden">
      <div
        className="dsa-bar-fill h-full rounded-full origin-left"
        style={{ width: `${max ? (value / max) * 100 : 0}%`, backgroundColor: color }}
      />
    </div>
  </div>
);

const Panel = ({ title, link, children }) => (
  <div className="dsa-card card-border rounded-xl md:p-8 p-6">
    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
      <h3 className="text-xl font-semibold">{title}</h3>
      {link && (
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-white-50 hover:text-white transition-colors duration-300"
        >
          @{link.name} ↗
        </a>
      )}
    </div>
    {children}
  </div>
);

const InfoRow = ({ label, children }) => (
  <div className="flex justify-between gap-4 py-4 first:pt-0 last:pb-0">
    <span className="text-white-50">{label}</span>
    <span className="font-semibold text-right">{children}</span>
  </div>
);

const DSA = () => {
  const sectionRef = useRef(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let cancelled = false;
    loadStats().then((s) => !cancelled && setStats(s));
    return () => {
      cancelled = true;
    };
  }, []);

  // Cards fade in once; they render immediately with loading placeholders
  useGSAP(
    () => {
      gsap.fromTo(
        ".dsa-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          // the ref, not "#dsa": selectors are scoped to the section's children
          scrollTrigger: { trigger: sectionRef.current, start: "top center" },
        }
      );
    },
    { scope: sectionRef }
  );

  // Bars grow once the numbers are in
  useGSAP(
    () => {
      if (!stats) return;
      gsap.fromTo(
        ".dsa-bar-fill",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: ".dsa-bars", start: "top bottom-=100" },
        }
      );
    },
    { scope: sectionRef, dependencies: [stats] }
  );

  const lc = stats?.leetcode;
  const cf = stats?.codeforces;
  const rank = cf?.rank ?? "unrated";
  const loading = !stats;
  const show = (value) => (loading ? "—" : value ?? "—");

  const tiles = [
    { value: show(stats?.total), label: "Problems solved" },
    { value: show(lc?.total), label: "LeetCode" },
    { value: show(cf?.solved), label: "Codeforces" },
    { value: show(cf ? cf.rating ?? "Unrated" : null), label: "Codeforces rating" },
  ];

  return (
    <section id="dsa" ref={sectionRef} className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader title="Problem Solving & DSA" sub="🧠 Algorithms in Practice" />

        <div className="mt-16 flex flex-col gap-6" aria-busy={loading}>
          {/* Headline numbers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tiles.map(({ value, label }) => (
              <div key={label} className="dsa-card card-border rounded-xl p-6">
                <p className={`md:text-4xl text-3xl font-bold ${loading ? "animate-pulse text-blue-50" : ""}`}>
                  {value}
                </p>
                <p className="text-white-50 mt-1">{label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Panel
              title="LeetCode"
              link={lc && { name: lc.username, url: lc.profileUrl }}
            >
              <div className="dsa-bars flex flex-col gap-5">
                {lcDifficulties.map((d) => {
                  const value = lc?.[d.label.toLowerCase()] ?? 0;
                  return (
                    <ProgressBar
                      key={d.label}
                      label={d.label}
                      value={value}
                      display={loading ? "—" : value}
                      max={lc?.total}
                      color={d.color}
                    />
                  );
                })}
              </div>
            </Panel>

            <Panel
              title="Codeforces"
              link={cf && { name: cf.handle, url: cf.profileUrl }}
            >
              <div className="flex flex-col divide-y divide-black-50">
                <InfoRow label="Problems solved">{show(cf?.solved)}</InfoRow>
                <InfoRow label="Rating">
                  {loading
                    ? "—"
                    : cf?.rating != null
                      ? `${cf.rating} (max ${cf.maxRating})`
                      : "Unrated"}
                </InfoRow>
                <InfoRow label="Rank">
                  <span style={{ color: cfRankColors[rank] }}>
                    {loading ? "—" : titleCase(rank)}
                  </span>
                </InfoRow>
              </div>
            </Panel>
          </div>

          {stats?.updatedAt && (
            <p className="text-sm text-blue-50 text-center">
              {stats.source === "live"
                ? "Live from LeetCode & Codeforces"
                : "Showing saved stats"}{" "}
              · updated {formatDate(stats.updatedAt)}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default DSA;
