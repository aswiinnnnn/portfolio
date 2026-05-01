import { useEffect, useRef } from "react";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vr: number;
  life: number;
  size: number;
}

export function useInkTrail(
  containerRef: React.RefObject<HTMLElement | null>,
  active: boolean = true
) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparks = useRef<Spark[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);
  const lastEmit = useRef(0);

  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:absolute; inset:0; pointer-events:none; z-index:15;";
    
    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    container.appendChild(canvas);
    canvasRef.current = canvas;

    const ctx = canvas.getContext("2d")!;

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      
      const now = Date.now();
      if (now - lastEmit.current > 50) { // Throttled emission
        sparks.current.push({
          x: mouse.current.x,
          y: mouse.current.y,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          rotation: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.2,
          life: 1.0,
          size: Math.random() * 4 + 2
        });
        lastEmit.current = now;
      }
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparks.current.forEach((s, i) => {
        s.x += s.vx;
        s.y += s.vy;
        s.rotation += s.vr;
        s.life -= 0.02;

        if (s.life <= 0) {
          sparks.current.splice(i, 1);
          return;
        }

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        ctx.globalAlpha = s.life;
        ctx.strokeStyle = "#ff5a28";
        ctx.lineWidth = 1;
        ctx.strokeRect(-s.size/2, -s.size/2, s.size, s.size);
        
        // Optional tiny core
        ctx.fillStyle = "#ff5a28";
        ctx.fillRect(-1, -1, 2, 2);
        
        ctx.restore();
      });

      rafId.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId.current);
      if (canvas.parentNode) canvas.remove();
    };
  }, [active]);
}
