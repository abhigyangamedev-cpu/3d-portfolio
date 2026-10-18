const navLinks = [
  {
    name: "Work",
    link: "#work",
  },
  // {
  //   name: "Experience",
  //   link: "#experience",
  // },
  {
    name: "Skills",
    link: "#skills",
  },
  {
    name: "DSA",
    link: "#dsa",
  },
  // {
  //   name: "Testimonials",
  //   link: "#testimonials",
  // },

    {
    name: "GitHub",
    link: "https://github.com/abhigyangamedev-cpu",
  },
];

const words = [
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
];

const fpsProject = {
  title: "Multiplayer FPS — Unreal Engine 5 & C++",
  videoId: "JE_cdeTnj7Q",
  summary:
    "A networked, server-authoritative first-person shooter built in Unreal Engine 5 as a single C++ module (~4,500 lines across 53 files). Gameplay rules, combat, health, scoring and UI logic all live in C++; Blueprints only supply assets, styling and visual effects.",
  stats: [
    { value: "4.5K", label: "Lines of C++" },
    { value: "53", label: "Source files" },
    { value: "10", label: "Special elim types" },
    { value: "LAN", label: "Host & join by IP" },
  ],
  highlights: [
    {
      title: "Server-authoritative networking",
      desc: "Damage, health, ammo, score and the match clock are decided on the server and replicated down. Clients predict fire animations, impacts and ammo, then reconcile with the server.",
    },
    {
      title: "Component-based character",
      desc: "A thin pawn delegates to Combat, Health and Elimination components. Weapons and widgets reach it only through a PlayerInterface, so nothing depends on the concrete class.",
    },
    {
      title: "Hitscan combat & ammo prediction",
      desc: "Sphere-swept traces on a custom weapon channel, headshot damage, auto/semi-auto fire and sequence-based client ammo prediction that never jumps back under latency.",
    },
    {
      title: "Special eliminations",
      desc: "A uint16 bit-flag system detects headshots, streaks, revenge, first blood, multi-kills and lead changes on the server, then queues callouts on the owning client.",
    },
    {
      title: "Match flow",
      desc: "10-minute rounds, first to 40 eliminations, spawn protection with a draining overhead bar, 3 s respawns at random spawn points and a win/lose/draw screen.",
    },
    {
      title: "C++ HUD, Blueprint visuals",
      desc: "Every HUD element is a C++ widget base with BindWidget slots that survives respawns and late replication: reticle, ammo counter, floating damage numbers, timer and score.",
    },
  ],
  tags: [
    "C++",
    "Unreal Engine 5",
    "Replication & RPCs",
    "Gameplay Framework",
    "Enhanced Input",
    "UMG",
    "Gameplay Tags",
    "Data Assets",
  ],
};

const warriorProject = {
  title: "Warrior — Melee Action with GAS, UE 5.5 & C++",
  videoId: "aSICYSr6dio",
  summary:
    "A third-person melee action game in Unreal Engine 5.5 built on the Gameplay Ability System. An axe-wielding hero fights waves of AI enemies in a survival arena. C++ provides the framework (characters, a custom ability system component, attributes, damage math, input routing, combat components, AI nodes and the wave director) while Blueprints build the concrete abilities, montages and widgets on top of it.",
  stats: [
    { value: "5.4K", label: "Lines of C++" },
    { value: "102", label: "Source files" },
    { value: "77", label: "Native gameplay tags" },
    { value: "4", label: "Difficulty levels" },
  ],
  highlights: [
    {
      title: "Data-driven Gameplay Ability System",
      desc: "Characters load a StartUp data asset that grants abilities and effects to a custom ASC. Nothing in the hero's C++ knows which abilities exist; difficulty simply changes the level they are granted at.",
    },
    {
      title: "Tag-routed input",
      desc: "Enhanced Input actions map to gameplay tags. The ASC matches them to ability specs, with Toggleable tags cancelling on a second press and MustBeHeld tags cancelling on release.",
    },
    {
      title: "Combat & damage pipeline",
      desc: "Anim notifies open weapon collision, hits become gameplay events, and a custom execution calculation scales base damage by combo count and AttackPower ÷ DefensePower before the attribute set applies it.",
    },
    {
      title: "Target lock & directional reactions",
      desc: "A ticking ability task drives lock-on with left/right target switching. Hit reactions pick front, back, left or right from the attack angle, and blocks are validated against the defender's facing.",
    },
    {
      title: "Enemy AI",
      desc: "AI controllers with sight perception and Detour crowd avoidance, native behavior-tree nodes for facing targets, and randomised attack selection by tag. Bosses summon minions through a custom ability task.",
    },
    {
      title: "Survival wave director",
      desc: "A tick-driven game-mode state machine reads waves from a data table, async-preloads enemy classes and spawns them at random navigable points, while a push-based UI layer reacts through delegates.",
    },
  ],
  tags: [
    "C++",
    "Unreal Engine 5.5",
    "Gameplay Ability System",
    "Gameplay Tags",
    "Enhanced Input",
    "Behavior Trees",
    "AI Perception",
    "Motion Warping",
    "UMG",
    "Data Assets",
  ],
};

const lcDifficulties = [
  { label: "Easy", color: "#00b8a3" },
  { label: "Medium", color: "#ffc01e" },
  { label: "Hard", color: "#ef4743" },
];

// Codeforces rank -> the colour Codeforces shows it in
const cfRankColors = {
  newbie: "#a0a0a0",
  pupil: "#3cb371",
  specialist: "#03a89e",
  expert: "#5b7cff",
  "candidate master": "#b65bff",
  master: "#ff8c00",
  "international master": "#ff8c00",
  grandmaster: "#ff3333",
  "international grandmaster": "#ff3333",
  "legendary grandmaster": "#ff3333",
};

const logoIconsList = [
  {
    imgPath: "/images/logos/company-logo-1.png",
  },
  {
    imgPath: "/images/logos/company-logo-2.png",
  },
  {
    imgPath: "/images/logos/company-logo-3.png",
  },
  {
    imgPath: "/images/logos/company-logo-4.png",
  },
  {
    imgPath: "/images/logos/company-logo-5.png",
  },
  {
    imgPath: "/images/logos/company-logo-6.png",
  },
  {
    imgPath: "/images/logos/company-logo-7.png",
  },
  {
    imgPath: "/images/logos/company-logo-8.png",
  },
  {
    imgPath: "/images/logos/company-logo-9.png",
  },
  {
    imgPath: "/images/logos/company-logo-10.png",
  },
  {
    imgPath: "/images/logos/company-logo-11.png",
  },
];


const techStackImgs = [
  {
    name: "React Developer",
    imgPath: "/images/logos/react.png",
  },
  {
    name: "Python Developer",
    imgPath: "/images/logos/python.svg",
  },
  {
    name: "Backend Developer",
    imgPath: "/images/logos/node.png",
  },
  {
    name: "Interactive Developer",
    imgPath: "/images/logos/three.png",
  },
  {
    name: "Project Manager",
    imgPath: "/images/logos/git.svg",
  },
];

const techStackIcons = [
  {
    name: "Unreal Engine Developer",
    modelPath: "/models/unreal_engine_logo.glb",
    scale: 0.012,
    rotation: [0, -Math.PI / 2, 0],
    position: [0, -1.5, 0]
  },
  {
    name: "C++ Developer",
    modelPath: "/models/cpp.glb",
    scale: 0.08,
    rotation: [0, 0, 0],
  },
  {
    name: "LeetCode Problem Solver",
    modelPath: "/models/leetcode.glb",
    scale: 1.6,
    rotation: [0, 0, 0],
  },
  {
    name: "Competitive Programmer",
    modelPath: "/models/cp-logo.glb",
    scale: 1.1,
    rotation: [0, 0, 0],
  }

];

const expCards = [
  {
    review: "Adrian brought creativity and technical expertise to the team, significantly improving our frontend performance. His work has been invaluable in delivering faster experiences.",
    imgPath: "/images/exp1.png",
    logoPath: "/images/logo1.png",
    title: "Frontend Developer",
    date: "January 2023 - Present",
    responsibilities: [
      "Developed and maintained user-facing features for the Hostinger website.",
      "Collaborated closely with UI/UX designers to ensure seamless user experiences.",
      "Optimized web applications for maximum speed and scalability.",
    ],
  },
  {
    review: "Adrian’s contributions to Docker's web applications have been outstanding. He approaches challenges with a problem-solving mindset.",
    imgPath: "/images/exp2.png",
    logoPath: "/images/logo2.png",
    title: "Full Stack Developer",
    date: "June 2020 - December 2023",
    responsibilities: [
      "Led the development of Docker's web applications, focusing on scalability.",
      "Worked with backend engineers to integrate APIs seamlessly with the frontend.",
      "Contributed to open-source projects that were used with the Docker ecosystem.",
    ],
  },
  {
    review: "Adrian’s work on Appwrite’s mobile app brought a high level of quality and efficiency. He delivered solutions that enhanced our mobile experience & meet our product goals.",
    imgPath: "/images/exp3.png",
    logoPath: "/images/logo3.png",
    title: "React Native Developer",
    date: "March 2019 - May 2020",
    responsibilities: [
      "Built cross-platform mobile apps using React Native, integrating with Appwrite's backend services.",
      "Improved app performance and user experience through code optimization and testing.",
      "Coordinated with the product team to implement features based on feedback.",
    ],
  },
];

const expLogos = [
  {
    name: "logo1",
    imgPath: "/images/logo1.png",
  },
  {
    name: "logo2",
    imgPath: "/images/logo2.png",
  },
  {
    name: "logo3",
    imgPath: "/images/logo3.png",
  },
];

const testimonials = [
  {
    name: "Esther Howard",
    mentions: "@estherhoward",
    review:
      "I can’t say enough good things about Adrian. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.",
    imgPath: "/images/client1.png",
  },
  {
    name: "Wade Warren",
    mentions: "@wadewarren",
    review:
      "Working with Adrian was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.",
    imgPath: "/images/client3.png",
  },
  {
    name: "Guy Hawkins",
    mentions: "@guyhawkins",
    review:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    imgPath: "/images/client2.png",
  },
  {
    name: "Marvin McKinney",
    mentions: "@marvinmckinney",
    review:
      "Adrian was a pleasure to work with. He turned our outdated website into a fresh, intuitive platform that’s both modern and easy to navigate. Fantastic work overall.",
    imgPath: "/images/client5.png",
  },
  {
    name: "Floyd Miles",
    mentions: "@floydmiles",
    review:
      "Adrian’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional!",
    imgPath: "/images/client4.png",
  },
  {
    name: "Albert Flores",
    mentions: "@albertflores",
    review:
      "Adrian was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend and backend dev are top-notch.",
    imgPath: "/images/client6.png",
  },
];

const socialImgs = [
  {
    name: "insta",
    imgPath: "/images/insta.png",
  },
  {
    name: "fb",
    imgPath: "/images/fb.png",
  },
  {
    name: "x",
    imgPath: "/images/x.png",
  },
  {
    name: "linkedin",
    imgPath: "/images/linkedin.png",
  },
];

export {
  fpsProject,
  warriorProject,
  lcDifficulties,
  cfRankColors,
  words,
  logoIconsList,
  expCards,
  expLogos,
  testimonials,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
};
