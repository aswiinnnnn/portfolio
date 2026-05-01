import { useEffect, useState } from "react";

export function useCursorHint() {
  const [hint, setHint] = useState<string | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      let hoverTarget: HTMLElement | null = target;
      let foundHint: string | null = null;
      
      while (hoverTarget && hoverTarget !== document.body) {
        if (hoverTarget.hasAttribute("data-hover")) {
          foundHint = hoverTarget.getAttribute("data-hover");
          break;
        }
        hoverTarget = hoverTarget.parentElement;
      }
      
      setHint(foundHint);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useEffect(() => {
    let el = document.getElementById("cursor-hint");
    if (!el) {
      el = document.createElement("div");
      el.id = "cursor-hint";
      el.style.position = "fixed";
      el.style.left = "0";
      el.style.top = "0";
      el.style.pointerEvents = "none";
      el.style.zIndex = "10000";
      el.style.padding = "6px 16px";
      el.style.background = "rgba(10, 10, 10, 0.85)";
      el.style.backdropFilter = "blur(12px)";
      el.style.color = "white";
      el.style.border = "1px solid rgba(255, 255, 255, 0.15)";
      el.style.fontSize = "10px";
      el.style.fontWeight = "600";
      el.style.fontFamily = "monospace";
      el.style.textTransform = "uppercase";
      el.style.letterSpacing = "0.15em";
      el.style.borderRadius = "100px";
      el.style.whiteSpace = "nowrap";
      el.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5), inset 0 0 10px rgba(255,255,255,0.05)";
      el.style.display = "block";
      el.style.opacity = "0";
      el.style.transition = "opacity 0.25s ease, transform 0.1s cubic-bezier(0.23, 1, 0.32, 1)";
      document.body.appendChild(el);
    }

    if (hint) {
      el.innerText = hint;
      el.style.opacity = "1";
      el.style.transform = `translate3d(${pos.x + 20}px, ${pos.y + 20}px, 0)`;
    } else {
      el.style.opacity = "0";
    }
  }, [hint, pos]);
}
