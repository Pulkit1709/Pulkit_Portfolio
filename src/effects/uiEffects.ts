import { useEffect } from "react";

export function useUIEffects(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const cursor = document.createElement("div");
    cursor.className = "cursor-glow";
    document.body.appendChild(cursor);

    const dots: HTMLDivElement[] = [];
    for (let i = 0; i < 8; i += 1) {
      const dot = document.createElement("div");
      dot.className = "cursor-trail";
      dot.style.opacity = `${1 - i * 0.1}`;
      document.body.appendChild(dot);
      dots.push(dot);
    }

    const points = dots.map(() => ({ x: window.innerWidth / 2, y: window.innerHeight / 2 }));

    const onMove = (e: PointerEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      points[0].x = x;
      points[0].y = y;
    };

    const magnetTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic='true']"));
    const projectCards = Array.from(document.querySelectorAll<HTMLElement>(".project-card"));
    const revealSections = Array.from(document.querySelectorAll<HTMLElement>(".reveal-section"));
    const aboutShell = document.querySelector<HTMLElement>(".about-shell");
    const aboutStory = document.querySelector<HTMLElement>(".about-story");
    const aboutMetrics = document.querySelector<HTMLElement>(".about-metrics-grid");
    const magneticMove = (el: HTMLElement, e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate3d(${x * 0.12}px, ${y * 0.12}px, 0)`;
    };
    const magneticLeave = (el: HTMLElement) => {
      el.style.transform = "translate3d(0,0,0)";
    };

    const magneticListeners: Array<{
      el: HTMLElement;
      onTargetMove: (e: Event) => void;
      onTargetLeave: () => void;
    }> = [];
    magnetTargets.forEach((el) => {
      const onTargetMove = (e: Event) => magneticMove(el, e as PointerEvent);
      const onTargetLeave = () => magneticLeave(el);
      el.addEventListener("pointermove", onTargetMove);
      el.addEventListener("pointerleave", onTargetLeave);
      magneticListeners.push({ el, onTargetMove, onTargetLeave });
    });

    const cardListeners: Array<{
      el: HTMLElement;
      onMove: (e: Event) => void;
      onLeave: () => void;
    }> = [];
    projectCards.forEach((el) => {
      const onMove = (event: Event) => {
        const e = event as PointerEvent;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rx = ((y / rect.height) * 2 - 1) * -5;
        const ry = ((x / rect.width) * 2 - 1) * 7;
        el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(2px)`;
      };
      const onLeave = () => {
        el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
      };
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      cardListeners.push({ el, onMove, onLeave });
    });

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in-view");
        });
      },
      { threshold: 0.18 }
    );
    revealSections.forEach((section) => revealObserver.observe(section));

    const onAboutMove = (event: Event) => {
      if (!aboutShell || !aboutStory || !aboutMetrics) return;
      const e = event as PointerEvent;
      const rect = aboutShell.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      aboutStory.style.transform = `translate3d(${px * -8}px, ${py * -8}px, 0)`;
      aboutMetrics.style.transform = `translate3d(${px * 10}px, ${py * 10}px, 0)`;
    };
    const onAboutLeave = () => {
      if (!aboutStory || !aboutMetrics) return;
      aboutStory.style.transform = "translate3d(0,0,0)";
      aboutMetrics.style.transform = "translate3d(0,0,0)";
    };
    aboutShell?.addEventListener("pointermove", onAboutMove);
    aboutShell?.addEventListener("pointerleave", onAboutLeave);

    let rafId = 0;
    const animate = () => {
      for (let i = 1; i < points.length; i += 1) {
        points[i].x += (points[i - 1].x - points[i].x) * 0.32;
        points[i].y += (points[i - 1].y - points[i].y) * 0.32;
      }
      points.forEach((p, idx) => {
        dots[idx].style.transform = `translate3d(${p.x}px, ${p.y}px, 0) scale(${1 - idx * 0.07})`;
      });
      rafId = window.requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
      magneticListeners.forEach(({ el, onTargetMove, onTargetLeave }) => {
        el.removeEventListener("pointermove", onTargetMove);
        el.removeEventListener("pointerleave", onTargetLeave);
      });
      cardListeners.forEach(({ el, onMove, onLeave }) => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      });
      revealObserver.disconnect();
      aboutShell?.removeEventListener("pointermove", onAboutMove);
      aboutShell?.removeEventListener("pointerleave", onAboutLeave);
      cursor.remove();
      dots.forEach((d) => d.remove());
    };
  }, [enabled]);
}
