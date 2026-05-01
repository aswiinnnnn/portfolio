import { useEffect, useRef } from "react";

/**
 * Attaches a smooth scroll progress bar to the top of the page.
 */
export function useScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bar = document.createElement("div");
    bar.id = "scroll-progress-bar";
    bar.style.cssText = `
      position: fixed; top: 0; left: 0; height: 2px; width: 0%;
      background: linear-gradient(90deg, hsl(14 100% 49%), hsl(27 100% 57%));
      z-index: 99998; pointer-events: none;
      transition: width 0.1s linear;
      box-shadow: 0 0 10px hsl(14 100% 49% / 0.6);
    `;
    document.body.prepend(bar);
    barRef.current = bar;

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = `${pct}%`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      bar.remove();
    };
  }, []);
}
