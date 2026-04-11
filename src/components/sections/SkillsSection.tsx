import type { IconType } from "react-icons";
import {
  SiDocker,
  SiFlask,
  SiGit,
  SiHuggingface,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPytorch,
  SiPython,
  SiReact,
  SiScikitlearn,
  SiTypescript,
} from "react-icons/si";

type SkillItem = {
  name: string;
  Icon: IconType;
  accent: string;
};

const skills: SkillItem[] = [
  { name: "Python", Icon: SiPython, accent: "#3776AB" },
  { name: "PyTorch", Icon: SiPytorch, accent: "#EE4C2C" },
  { name: "React", Icon: SiReact, accent: "#61DAFB" },
  { name: "TypeScript", Icon: SiTypescript, accent: "#3178C6" },
  { name: "Node.js", Icon: SiNodedotjs, accent: "#339933" },
  { name: "scikit-learn", Icon: SiScikitlearn, accent: "#F7931E" },
  { name: "MongoDB", Icon: SiMongodb, accent: "#47A248" },
  { name: "MySQL", Icon: SiMysql, accent: "#4479A1" },
  { name: "Flask", Icon: SiFlask, accent: "#ffffff" },
  { name: "Hugging Face", Icon: SiHuggingface, accent: "#FFD21E" },
  { name: "Docker", Icon: SiDocker, accent: "#2496ED" },
  { name: "Git", Icon: SiGit, accent: "#F05032" },
];

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="reveal-section mobile-section relative z-10 mx-auto max-w-6xl border-t border-white/10 px-5 py-20 md:px-10 md:py-28"
    >
      <p className="text-sm uppercase tracking-[0.35em] text-violet-300/80">Skills</p>
      <h2 className="mt-4 max-w-2xl text-[2rem] font-semibold leading-tight md:text-5xl">
        Tools and stacks I ship with — <span className="gradient-word">animated</span> at a glance.
      </h2>
      <p className="mt-4 max-w-2xl text-sm text-slate-300 md:text-base">
        Core technologies across ML, full-stack delivery, and MLOps-style workflows.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:mt-12 md:grid-cols-4 md:gap-4">
        {skills.map((skill, index) => (
          <article
            key={skill.name}
            className="skill-tile skill-card group relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04] p-4 backdrop-blur md:p-5"
            style={{
              animationDelay: `${index * 0.07}s`,
              ["--skill-accent" as string]: skill.accent,
            }}
          >
            <div
              className="skill-icon-ring pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              aria-hidden
            />
            <div className="skill-icon-float relative flex flex-col items-center gap-3 text-center">
              <div className="skill-icon-bubble flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] shadow-[0_0_24px_rgb(139_92_246/12%)] transition duration-500 group-hover:border-cyan-200/35 group-hover:shadow-[0_0_32px_rgb(34_211_238/18%)] md:h-16 md:w-16">
                <skill.Icon
                  className="h-7 w-7 md:h-8 md:w-8 transition-transform duration-500 group-hover:scale-110"
                  style={{ color: skill.accent }}
                  aria-hidden
                />
              </div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-200 md:text-[0.72rem]">
                {skill.name}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
