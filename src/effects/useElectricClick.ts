import { useEffect } from "react";

/** Matches primary interactive controls site-wide. */
const CLICKABLE_SELECTOR = [
  "button:not([data-no-electric])",
  "a[href]:not([data-no-electric])",
  "[role='tab']:not([data-no-electric])",
].join(",");

const ANIM_MS = 460;

function isOverflowClipped(el: HTMLElement) {
  const { overflow, overflowX, overflowY } = window.getComputedStyle(el);
  return overflow === "hidden" || overflowX === "hidden" || overflowY === "hidden";
}

export function useElectricClick() {
  useEffect(() => {
    let clearTimer = 0;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const el = target.closest<HTMLElement>(CLICKABLE_SELECTOR);
      if (!el) return;
      if (el.hasAttribute("disabled") || el.getAttribute("aria-disabled") === "true") return;

      el.classList.remove("electric-click", "electric-click--clip");
      void el.offsetWidth;

      if (isOverflowClipped(el)) el.classList.add("electric-click--clip");
      el.classList.add("electric-click");

      window.clearTimeout(clearTimer);
      clearTimer = window.setTimeout(() => {
        el.classList.remove("electric-click", "electric-click--clip");
      }, ANIM_MS);
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      window.clearTimeout(clearTimer);
    };
  }, []);
}
