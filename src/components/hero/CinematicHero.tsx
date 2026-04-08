import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";

const HeroCanvas = lazy(() => import("./HeroCanvas"));

export function CinematicHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const isMobile = useIsMobile();
  const roles = useMemo(() => ["AI Engineer", "Data Scientist", "Full Stack Developer"], []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { rootMargin: "300px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative isolate flex min-h-[160vh] items-start overflow-clip bg-[radial-gradient(circle_at_50%_15%,rgba(106,76,255,0.45),transparent_45%),radial-gradient(circle_at_22%_22%,rgba(34,211,238,0.22),transparent_50%),linear-gradient(160deg,#020204_0%,#050510_55%,#060314_100%)]"
    >
      <div className="sticky top-0 h-screen w-full">
        <div className="absolute inset-0">
          {visible && (
            <Suspense fallback={<div className="h-full w-full bg-[#04040a]" />}>
              <HeroCanvas />
            </Suspense>
          )}
        </div>

        <div className="pointer-events-none relative z-20 mx-auto grid h-full max-w-[1320px] grid-cols-1 px-6 py-14 md:grid-cols-[1.15fr_1fr_1.1fr] md:px-10">
          <div className="self-center animate-[fadeSlide_.9s_ease-out_forwards] opacity-0 [animation-delay:.12s]">
            <p className="text-base tracking-[0.35em] text-slate-300/90 md:text-lg">HELLO, I&apos;M</p>
            <h1 className="mt-4 text-4xl font-semibold leading-[0.95] text-white md:text-6xl lg:text-7xl">
              Pulkit
              <br />
              <span className="bg-gradient-to-r from-violet-200 to-cyan-200 bg-clip-text text-transparent">
                Gambhir
              </span>
            </h1>
            <div className="pointer-events-auto mt-6 flex flex-wrap items-center gap-3 text-xs tracking-[0.16em] text-slate-300 md:text-sm">
              <a
                data-magnetic="true"
                className="rounded-full border border-white/20 bg-white/5 px-4 py-2 transition hover:bg-white/15"
                href="https://www.linkedin.com/in/pulkitgambhir1709/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                data-magnetic="true"
                className="rounded-full border border-white/20 bg-white/5 px-4 py-2 transition hover:bg-white/15"
                href="https://github.com/Pulkit1709"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                data-magnetic="true"
                className="rounded-full border border-white/20 bg-white/5 px-4 py-2 transition hover:bg-white/15"
                href="mailto:pulkitgambhir1709@gmail.com"
              >
                Email
              </a>
            </div>
          </div>

          <div className="hidden md:block" />

          <div className="self-end pb-8 text-left md:self-center md:pb-0 md:text-right">
            <div className="animate-[fadeSlide_.9s_ease-out_forwards] opacity-0 [animation-delay:.34s]">
              {roles.map((role) => (
                <p
                  key={role}
                  className="text-xl font-semibold tracking-[0.08em] text-slate-100/95 md:text-3xl lg:text-4xl"
                >
                  {role}
                </p>
              ))}
            </div>
            <button
              data-magnetic="true"
              className="pointer-events-auto mt-8 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-xs uppercase tracking-[0.3em] text-white transition hover:scale-[1.03] hover:bg-white/20"
              type="button"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explore Work
            </button>
          </div>
        </div>

        {isMobile && (
          <div className="pointer-events-none absolute inset-x-0 bottom-10 z-30 text-center text-xs uppercase tracking-[0.28em] text-slate-300/80">
            Optimized mobile scene mode
          </div>
        )}
      </div>
    </section>
  );
}
