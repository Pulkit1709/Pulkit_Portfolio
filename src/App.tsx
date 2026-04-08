import { useEffect, useMemo, useState } from "react";
import { CinematicHero } from "./components/hero/CinematicHero";
import { navItems, sectionIds } from "./effects/scroll";
import { useUIEffects } from "./effects/uiEffects";
import { useIsMobile } from "./hooks/useIsMobile";

type ProjectCard = {
  title: string;
  subtitle: string;
  impact: string;
  stack: string[];
};
type ExperienceItem = {
  role: string;
  summary: string;
  badge: string;
  certificateImage: string;
  certificateLink?: string;
};

const projectCards: ProjectCard[] = [
  {
    title: "Medimate",
    subtitle: "AI healthcare assistant with Random Forest diagnosis flow",
    impact: "88% model accuracy with actionable symptom-to-care guidance",
    stack: ["Flask", "MySQL", "Random Forest", "Python"],
  },
  {
    title: "SportNexus",
    subtitle: "MERN platform with ML recommendation engine",
    impact: "Cosine-similarity based matching for personalized sports discovery",
    stack: ["React", "Node", "MongoDB", "Recommendation ML"],
  },
  {
    title: "E-commerce Forecasting",
    subtitle: "Demand prediction with time-series + regression blend",
    impact: "92% forecasting accuracy on retail demand signals",
    stack: ["ARIMA", "Regression", "Pandas", "Power BI"],
  },
  {
    title: "CA-ASG Research",
    subtitle: "Confidence-Aware Adaptive Step Guidance for diffusion optimization",
    impact: "Improved generation quality via SNU-driven adaptive control",
    stack: ["PyTorch", "Hugging Face", "Stable Diffusion", "CLIP/FID"],
  },
];
const experienceItems: ExperienceItem[] = [
  {
    role: "Data Science Intern - Imarticus Learning",
    summary:
      "Analyzed 50K+ transactions and shipped ML forecasting models up to 92% accuracy with ARIMA and RFM segmentation.",
    badge: "ML + Analytics",
    certificateImage: "/images/certificate-imarticus.png",
  },
  {
    role: "Software Developer Intern - Nirmal Engineering Works",
    summary: "Built MERN APIs handling 10K+ requests and improved MongoDB performance by 60%.",
    badge: "MERN + APIs",
    certificateImage: "/images/certificate-nirmal.png",
  },
  {
    role: "Python Developer Intern - OctaNet",
    summary: "Automated ETL and Flask workflow pipelines processing 500K+ records with 96% time reduction.",
    badge: "Automation + ETL",
    certificateImage: "/images/certificate-octanet.png",
  },
];

function App() {
  const isMobile = useIsMobile();
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<(typeof sectionIds)[number]>("hero");
  const [selectedProject, setSelectedProject] = useState<ProjectCard | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);
  useUIEffects(!isMobile);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id as (typeof sectionIds)[number]);
        });
      },
      { threshold: 0.45 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const aboutMetrics = useMemo(
    () => [
      { value: "9.14", label: "CGPA", detail: "Dean's List for 2 semesters" },
      { value: "3", label: "Internships", detail: "Cross-domain delivery experience" },
      { value: "300+", label: "DSA Problems", detail: "LeetCode problems solved" },
      { value: "92%", label: "ML Accuracy", detail: "Production-grade model performance" },
      { value: "50K+", label: "Data Points", detail: "Analyzed and modeled at scale" },
      { value: "96%", label: "Automation Gain", detail: "Workflow time reduction" },
    ],
    []
  );

  const focusCards = useMemo(
    () => [
      {
        icon: "🧠",
        title: "AI & ML Systems",
        desc: "Designing robust model pipelines from experimentation to deployment.",
      },
      {
        icon: "🧪",
        title: "Generative AI Research",
        desc: "Exploring diffusion optimization, uncertainty signals, and quality metrics.",
      },
      {
        icon: "⚙️",
        title: "Full Stack Engineering",
        desc: "Building end-to-end products with performant APIs and premium UX.",
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-[#05050a] text-white">
      <div className="fixed left-0 top-0 z-50 h-1 w-full bg-white/5">
        <div className="h-full bg-gradient-to-r from-violet-400 via-cyan-300 to-fuchsia-300" style={{ width: `${progress * 100}%` }} />
      </div>

      <nav className="fixed right-4 top-5 z-50 hidden rounded-full border border-white/15 bg-black/35 px-2 py-2 backdrop-blur md:block">
        <ul className="flex items-center gap-1">
          {navItems.map((item) => {
            const id = item.href.slice(1) as (typeof sectionIds)[number];
            const active = activeSection === id;
            return (
              <li key={item.href}>
                <a
                  data-magnetic="true"
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.22em] transition ${
                    active ? "bg-white text-black" : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <CinematicHero />

      <section id="about" className="reveal-section about-shell relative z-10 mx-auto max-w-6xl px-6 py-28 md:px-10">
        <div className="about-particles" aria-hidden="true">
          {new Array(12).fill(null).map((_, idx) => (
            <span key={`about-particle-${idx}`} style={{ ["--delay" as string]: `${idx * 0.4}s` }} />
          ))}
        </div>
        <p className="text-sm uppercase tracking-[0.35em] text-violet-300/80">About</p>
        <div className="mt-6 grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="about-story self-start space-y-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur md:p-8">
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight md:text-5xl">
              I build <span className="gradient-word">intelligent systems</span> that scale from research to real-world{" "}
              <span className="gradient-word">impact</span>.
            </h2>
            <p className="text-slate-300">
              I am Pulkit Gambhir, a B.Tech CSE (Data Science) student at Bennett University focused on{" "}
              <span className="text-white">AI</span>, ML, and modern software engineering.
            </p>
            <p className="text-slate-300">
              I build end-to-end products where models, APIs, and interfaces work together to solve practical
              problems at scale.
            </p>
            <p className="text-slate-300">
              What sets me apart is a research-first mindset paired with shipping discipline - I optimize for novelty,
              reliability, and measurable outcomes.
            </p>
          </div>

          <div className="about-metrics-grid self-start grid gap-4 sm:grid-cols-2">
            {aboutMetrics.map((metric) => (
              <article key={metric.label} className="metric-card rounded-2xl border border-white/15 bg-white/[0.05] p-5 backdrop-blur">
                <p className="text-3xl font-semibold tracking-tight text-white md:text-4xl">{metric.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.24em] text-cyan-200/90">{metric.label}</p>
                <p className="mt-2 text-sm text-slate-300">{metric.detail}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="signature-strip mt-8 rounded-2xl border border-violet-300/30 bg-gradient-to-r from-violet-500/10 via-cyan-400/10 to-transparent px-5 py-4 text-center text-sm text-slate-100 md:text-base">
          I don&apos;t just train models - I engineer intelligent systems that deliver measurable impact.
        </div>
      </section>

      <section className="reveal-section relative z-10 mx-auto max-w-6xl px-6 pb-10 md:px-10">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">What I Focus On</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {focusCards.map((card) => (
            <article key={card.title} className="focus-card rounded-2xl border border-white/12 bg-white/[0.04] p-5">
              <p className="text-2xl" aria-hidden="true">
                {card.icon}
              </p>
              <h3 className="mt-3 text-lg font-semibold">{card.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{card.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="reveal-section relative z-10 mx-auto max-w-6xl border-t border-white/10 px-6 py-28 md:px-10">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Projects</p>
        <h2 className="mt-4 text-3xl font-semibold md:text-5xl">High-impact AI and engineering work.</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {projectCards.map((project) => (
            <button
              key={project.title}
              type="button"
              data-magnetic="true"
              className="project-card group relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] p-6 text-left transition hover:border-cyan-200/40 hover:bg-white/[0.08]"
              onClick={() => setSelectedProject(project)}
            >
              <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-cyan-400/20 blur-2xl transition group-hover:bg-violet-400/25" />
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/90">{project.title}</p>
              <p className="mt-3 text-xl font-semibold">{project.subtitle}</p>
              <p className="mt-4 text-sm text-slate-300">{project.impact}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/15 px-3 py-1 text-xs text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </section>

      <section id="experience" className="reveal-section relative z-10 mx-auto max-w-6xl border-t border-white/10 px-6 py-28 md:px-10">
        <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-300/80">Experience</p>
        <div className="mt-6 space-y-5">
          {experienceItems.map((item) => (
            <button
              key={item.role}
              type="button"
              data-magnetic="true"
              className="exp-card group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 text-left"
              onClick={() => setSelectedExperience(item)}
            >
              <div className="exp-orb exp-orb-a" />
              <div className="exp-orb exp-orb-b" />
              <p className="exp-badge text-xs uppercase tracking-[0.22em] text-cyan-200/90">{item.badge}</p>
              <h3 className="mt-2 text-xl font-semibold">{item.role}</h3>
              <p className="mt-2 text-slate-300">{item.summary}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-fuchsia-200/85">Click to view certificate</p>
            </button>
          ))}
        </div>
      </section>

      {selectedProject && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl border border-white/20 bg-[#0a0a14] p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/90">Project Preview</p>
            <h3 className="mt-3 text-2xl font-semibold">{selectedProject.title}</h3>
            <p className="mt-3 text-slate-300">{selectedProject.subtitle}</p>
            <p className="mt-3 text-slate-200">{selectedProject.impact}</p>
            <button
              data-magnetic="true"
              type="button"
              className="mt-7 rounded-full border border-white/25 px-5 py-2 text-sm transition hover:bg-white/10"
              onClick={() => setSelectedProject(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {selectedExperience && (
        <div className="fixed inset-0 z-[75] grid place-items-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl border border-white/20 bg-[#0b0a16] p-5 md:p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-fuchsia-300/90">Experience Certificate</p>
            <h3 className="mt-3 text-2xl font-semibold">{selectedExperience.role}</h3>
            <p className="mt-3 text-slate-300">{selectedExperience.summary}</p>
            <img
              src={selectedExperience.certificateImage}
              alt={`${selectedExperience.role} certificate`}
              className="mt-5 h-auto w-full rounded-xl border border-white/15 object-cover"
            />
            <div className="mt-5 flex flex-wrap gap-3">
              {selectedExperience.certificateLink ? (
                <a
                  data-magnetic="true"
                  href={selectedExperience.certificateLink}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-cyan-200/35 px-5 py-2 text-sm transition hover:bg-cyan-300/15"
                >
                  Verify Certificate
                </a>
              ) : (
                <span className="rounded-full border border-white/20 px-5 py-2 text-sm text-slate-300">
                  Add certificate link to enable verification
                </span>
              )}
              <button
                data-magnetic="true"
                type="button"
                className="rounded-full border border-white/25 px-5 py-2 text-sm transition hover:bg-white/10"
                onClick={() => setSelectedExperience(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
