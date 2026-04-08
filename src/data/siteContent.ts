export type ThemeMode = "dark" | "light";

export type ProjectCategory = "Product" | "AI" | "Frontend" | "3D";

export interface Stat {
  label: string;
  value: string;
  detail: string;
}

export interface SkillGroup {
  title: string;
  description: string;
  items: string[];
}

export interface Project {
  title: string;
  category: ProjectCategory;
  summary: string;
  impact: string;
  stack: string[];
  metrics: string[];
  accent: string;
}

export interface TimelineEntry {
  period: string;
  title: string;
  organization: string;
  summary: string;
}

export const navItems = [
  { label: "Story", href: "#story" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Selected Work", href: "#selected-work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const stats: Stat[] = [
  {
    value: "5s",
    label: "First impression window",
    detail: "Designed to communicate product thinking and execution instantly.",
  },
  {
    value: "90+",
    label: "Lighthouse target",
    detail: "Performance-first motion, responsive assets, and progressive enhancement.",
  },
  {
    value: "3D",
    label: "Immersive storytelling",
    detail: "A lightweight hero scene adds personality without dragging down mobile devices.",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Product-minded frontend",
    description: "Interfaces that explain value fast, feel premium, and support real business goals.",
    items: ["React", "TypeScript", "Design systems", "Accessibility", "Performance budgets"],
  },
  {
    title: "Creative engineering",
    description: "Motion, WebGL, and visual systems that add delight without becoming noise.",
    items: ["Three.js", "React Three Fiber", "CSS motion", "SVG systems", "Shader-friendly thinking"],
  },
  {
    title: "Shipping discipline",
    description: "Architecture, measurement, and quality guardrails that keep teams moving.",
    items: ["Component architecture", "SEO", "Analytics strategy", "Code reviews", "Lighthouse optimization"],
  },
];

export const projects: Project[] = [
  {
    title: "Signal OS",
    category: "Product",
    summary: "A command-center dashboard for product and support teams with an editorial visual language.",
    impact: "Turned fragmented reporting into a single daily workflow with role-aware insights.",
    stack: ["React", "TypeScript", "Charts", "Design tokens"],
    metrics: ["42% faster triage", "3 stakeholder views", "AA contrast"],
    accent: "var(--accent-sun)",
  },
  {
    title: "Muse Frame",
    category: "AI",
    summary: "An AI-assisted portfolio builder focused on narrative pacing, not just gallery layouts.",
    impact: "Helped creators move from blank state to publishable portfolio stories in one afternoon.",
    stack: ["Prompt UX", "React", "Content modeling", "Animation systems"],
    metrics: ["1-day onboarding", "Story-first CMS", "Modular templates"],
    accent: "var(--accent-mint)",
  },
  {
    title: "Orbit Commerce",
    category: "Frontend",
    summary: "A premium commerce experience with motion-led product reveals and crisp mobile ergonomics.",
    impact: "Raised conversion confidence by tightening load times and simplifying product decision paths.",
    stack: ["Vite", "TypeScript", "Responsive systems", "Performance auditing"],
    metrics: ["89 mobile perf", "60% less JS", "0 layout shift hero"],
    accent: "var(--accent-sky)",
  },
  {
    title: "Northstar Studio",
    category: "3D",
    summary: "An interactive brand showcase using abstract 3D forms instead of heavy scene choreography.",
    impact: "Created a memorable visual signature while staying viable on mid-range laptops and phones.",
    stack: ["Three.js", "R3F", "Progressive enhancement", "Reduced motion support"],
    metrics: ["Adaptive DPR", "Lazy-loaded canvas", "Reduced-motion safe"],
    accent: "var(--accent-rose)",
  },
];

export const timeline: TimelineEntry[] = [
  {
    period: "Now",
    title: "Senior Frontend Engineer / Creative Developer",
    organization: "Independent + product collaborations",
    summary: "Building portfolio-grade interfaces that merge design sensitivity with shipping discipline.",
  },
  {
    period: "2024",
    title: "Frontend Engineer",
    organization: "High-growth digital products",
    summary: "Focused on reusable component systems, responsive UX, and measurable performance improvements.",
  },
  {
    period: "2022",
    title: "Designer to developer transition",
    organization: "Self-directed specialization",
    summary: "Shifted from visual craft into code-driven storytelling, motion systems, and interaction design.",
  },
];

export const contactLinks = [
  { label: "Email", value: "pulkitgambhir1709@gmail.com", href: "mailto:pulkitgambhir1709@gmail.com" },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/pulkitgambhir1709",
    href: "https://www.linkedin.com/in/pulkitgambhir1709/",
  },
  { label: "GitHub", value: "github.com/Pulkit1709", href: "https://github.com/Pulkit1709" },
  { label: "Codolio", value: "codolio.com/profile/Pulkit1709", href: "https://codolio.com/profile/Pulkit1709" },
  { label: "Resume", value: "Download resume", href: "/resume.pdf" },
];
