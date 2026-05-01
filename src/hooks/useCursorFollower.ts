import { useEffect, useRef } from "react";

export function useCursorFollower() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Create cursor elements
    const cursor = document.createElement("div");
    cursor.id = "cursor-follower";
    cursor.style.cssText = `
      position: fixed; top: 0; left: 0; width: 32px; height: 32px;
      border-radius: 50%; border: 1.5px solid hsl(14 100% 49% / 0.6);
      pointer-events: none; z-index: 99999; transform: translate(-50%,-50%);
      transition: width 0.3s, height 0.3s, background 0.3s, border-color 0.3s;
      mix-blend-mode: normal; will-change: transform;
    `;

    const dot = document.createElement("div");
    dot.id = "cursor-dot";
    dot.style.cssText = `
      position: fixed; top: 0; left: 0; width: 6px; height: 6px;
      border-radius: 50%; background: hsl(14 100% 49%);
      pointer-events: none; z-index: 100000; transform: translate(-50%,-50%);
      will-change: transform;
    `;

    document.body.appendChild(cursor);
    document.body.appendChild(dot);
    cursorRef.current = cursor;
    dotRef.current = dot;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
    };

    const onEnterHoverable = () => {
      cursor.style.width = "56px";
      cursor.style.height = "56px";
      cursor.style.background = "hsl(14 100% 49% / 0.1)";
      cursor.style.borderColor = "hsl(14 100% 49%)";
    };

    const onLeaveHoverable = () => {
      cursor.style.width = "32px";
      cursor.style.height = "32px";
      cursor.style.background = "transparent";
      cursor.style.borderColor = "hsl(14 100% 49% / 0.6)";
    };

    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;
      cursor.style.transform = `translate(${pos.current.x - 16}px, ${pos.current.y - 16}px)`;
      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);
    window.addEventListener("mousemove", onMove);

    const hoverables = () => document.querySelectorAll("a, button, [data-hover]");

    const attachHover = () => {
      hoverables().forEach(el => {
        el.addEventListener("mouseenter", onEnterHoverable);
        el.addEventListener("mouseleave", onLeaveHoverable);
      });
    };

    attachHover();
    const observer = new MutationObserver(attachHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
      cursor.remove();
      dot.remove();
    };
  }, []);
}
