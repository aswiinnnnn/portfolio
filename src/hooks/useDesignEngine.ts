import { useEffect, useRef } from "react";

export const TOOL_MODES = [
  "Selection",
  "Pen",
  "Magnifier",
  "Smart Guides",
  "Measurement",
  "Gradient",
  "Crop",
  "Text",
  "Circle",
  "Color Picker",
  "Magic Select",
  "Pan"
];

export const TOOL_HINTS = [
  "Click and drag to select elements on the canvas.",
  "Click to place points and create custom vector paths.",
  "Hover over any area to inspect pixels in high detail.",
  "Toggle architectural alignment guides for layout precision.",
  "Click and drag between two points to measure distances.",
  "Define color transitions by dragging across the workspace.",
  "Select a region to define new viewport boundaries.",
  "Click anywhere to place and edit custom typography.",
  "Click and drag to draw perfect circles and ellipses.",
  "Sample precise color values directly from the artwork.",
  "Use smart edge detection for complex shape selections.",
  "Drag to pan across the canvas or hold space to move."
];

const STUDIO_COLORS = ["#ff5a28", "#00f0ff", "#ff00ff", "#ffffff", "#0a0a0a", "#222222"];

interface Point { x: number; y: number; }
interface Rect { x: number; y: number; w: number; h: number; }
interface TextNode { x: number; y: number; text: string; active: boolean; }
interface WandSelection { points: Point[]; alpha: number; }
interface Path { points: Point[]; closed: boolean; }

export function useDesignEngine(
  containerRef: React.RefObject<HTMLElement | null>,
  activeMode: number,
  onModeChange?: (mode: number) => void,
  isMobile: boolean = false
) {
  const disabled = false; // Internal flag if needed
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);
  const modeRef = useRef(activeMode);
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });

  // Persistent States
  const selections = useRef<Rect[]>([]);
  const completedPaths = useRef<Path[]>([]);
  const currentPath = useRef<Point[]>([]);
  const hGuides = useRef<number[]>([]);
  const vGuides = useRef<number[]>([]);
  const texts = useRef<TextNode[]>([]);
  const cropRect = useRef<Rect | null>(null);
  const gradient = useRef<{ p1: Point, p2: Point } | null>(null);
  const panOffset = useRef({ x: 0, y: 0 });
  const wandSelections = useRef<WandSelection[]>([]);
  const activeTextIndex = useRef<number>(-1);
  const circles = useRef<{ x: number, y: number, w: number, h: number }[]>([]);
  const measurePoints = useRef<{ p1: Point, p2: Point } | null>(null);

  const resetAll = () => {
    selections.current = [];
    completedPaths.current = [];
    currentPath.current = [];
    hGuides.current = [];
    vGuides.current = [];
    texts.current = [];
    cropRect.current = null;
    gradient.current = null;
    wandSelections.current = [];
    activeTextIndex.current = -1;
    circles.current = [];
    measurePoints.current = null;
    panOffset.current = { x: 0, y: 0 };
    
    if (containerRef.current) {
      const bg = containerRef.current.querySelector("img");
      if (bg) {
        bg.style.transform = "scale(1.25)"; // Restore default scale
        bg.style.filter = "none";
      }
    }
  };

  // Sync modeRef with prop AND CLEAR on change
  useEffect(() => {
    if (modeRef.current !== activeMode) {
      resetAll(); // Clear everything on every tool switch
      modeRef.current = activeMode;
    }
  }, [activeMode]);

  useEffect(() => {
    if (isMobile || activeMode === -1) {
      // If disabled or inactive, ensure cleanup
      if (canvasRef.current && canvasRef.current.parentNode) {
        canvasRef.current.remove();
        canvasRef.current = null;
      }
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    canvasRef.current = canvas;
    const ctx = canvas.getContext("2d")!;
    
    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    canvas.style.cssText = "position:absolute; inset:0; pointer-events:none; z-index:20; transition: opacity 0.5s ease;";
    container.appendChild(canvas);

    const onMouseDown = (e: MouseEvent) => {
      const cur = modeRef.current;
      if (cur === -1) return; 

      const rect = container.getBoundingClientRect();
      const lx = e.clientX - rect.left;
      const ly = e.clientY - rect.top;
      isDragging.current = true;
      startPos.current = { x: lx, y: ly };

      if (cur === 0) { // Selection
        selections.current.push({ x: lx, y: ly, w: 0, h: 0 });
      } else if (cur === 1) { // Pen
        if (currentPath.current.length >= 3) {
          const start = currentPath.current[0];
          const dist = Math.sqrt((lx - start.x)**2 + (ly - start.y)**2);
          if (dist < 15) {
            completedPaths.current.push({ points: [...currentPath.current], closed: true });
            currentPath.current = [];
            return;
          }
        }
        currentPath.current.push({ x: lx, y: ly });
      } else if (cur === 3) { // Guides
        if (lx < 150) vGuides.current.push(lx); else hGuides.current.push(ly);
      } else if (cur === 4) { // Measure
        measurePoints.current = { p1: { x: lx, y: ly }, p2: { x: lx, y: ly } };
      } else if (cur === 5) { // Gradient
        gradient.current = { p1: { x: lx, y: ly }, p2: { x: lx, y: ly } };
      } else if (cur === 6) { // Crop
        cropRect.current = { x: lx, y: ly, w: 0, h: 0 };
      } else if (cur === 7) { // Type
        texts.current.push({ x: lx, y: ly, text: "|", active: true });
        activeTextIndex.current = texts.current.length - 1;
      } else if (cur === 8) { // Circle/Ellipse
        circles.current.push({ x: lx, y: ly, w: 0, h: 0 });
      } else if (cur === 10) { // Magic Wand
        const pts = [];
        for(let i=0; i<10; i++) {
          const a = (i/10) * Math.PI * 2;
          const r = 40 + Math.random() * 60;
          pts.push({ x: lx + Math.cos(a)*r, y: ly + Math.sin(a)*r });
        }
        wandSelections.current.push({ points: pts, alpha: 1 });
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const lx = e.clientX - rect.left;
      const ly = e.clientY - rect.top;
      const dx = lx - mouseRef.current.x;
      const dy = ly - mouseRef.current.y;
      mouseRef.current = { x: lx, y: ly };

      if (isDragging.current) {
        const cur = modeRef.current;
        if (cur === 0 && selections.current.length > 0) {
          const last = selections.current[selections.current.length - 1];
          last.x = Math.min(startPos.current.x, lx); last.y = Math.min(startPos.current.y, ly);
          last.w = Math.abs(lx - startPos.current.x); last.h = Math.abs(ly - startPos.current.y);
        } else if (cur === 4 && measurePoints.current) {
          measurePoints.current.p2 = { x: lx, y: ly };
        } else if (cur === 5 && gradient.current) {
          gradient.current.p2 = { x: lx, y: ly };
        } else if (cur === 6 && cropRect.current) {
          cropRect.current.x = Math.min(startPos.current.x, lx);
          cropRect.current.y = Math.min(startPos.current.y, ly);
          cropRect.current.w = Math.abs(lx - startPos.current.x);
          cropRect.current.h = Math.abs(ly - startPos.current.y);
        } else if (cur === 8 && circles.current.length > 0) { // Circle
          const last = circles.current[circles.current.length - 1];
          last.x = Math.min(startPos.current.x, lx);
          last.y = Math.min(startPos.current.y, ly);
          last.w = Math.abs(lx - startPos.current.x);
          last.h = Math.abs(ly - startPos.current.y);
        } else if (cur === 11) { // Hand Tool
          panOffset.current.x += dx; panOffset.current.y += dy;
          const bg = container.querySelector("img");
          if (bg) bg.style.transform = `translate(${panOffset.current.x}px, ${panOffset.current.y}px) scale(1.25)`;
        }
      }
    };

    const onMouseUp = () => { isDragging.current = false; };

    const onKeyDown = (e: KeyboardEvent) => {
      if (modeRef.current === -1) return; // Ignore if not in studio
      if (e.key === "Escape") resetAll();
      if (activeTextIndex.current !== -1) {
        const node = texts.current[activeTextIndex.current];
        if (e.key === "Backspace") node.text = node.text.slice(0, -2) + "|";
        else if (e.key === "Enter") { node.text = node.text.replace("|", ""); activeTextIndex.current = -1; }
        else if (e.key.length === 1) node.text = node.text.replace("|", "") + e.key + "|";
      }
      if (e.key === "Enter" && modeRef.current === 1) {
        completedPaths.current.push({ points: [...currentPath.current], closed: false });
        currentPath.current = [];
      }
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("keydown", onKeyDown);

    const tick = () => {
      if (!canvasRef.current) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cur = modeRef.current;
      const { x, y } = mouseRef.current;

      // Persistent
      if (gradient.current) {
        const { p1, p2 } = gradient.current;
        const g = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        g.addColorStop(0, "rgba(255, 90, 40, 0.5)"); g.addColorStop(1, "transparent");
        ctx.fillStyle = g; ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "rgba(255,255,255,0.8)"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
        ctx.fillStyle = "white"; ctx.fillRect(p1.x-4, p1.y-4, 8, 8); ctx.fillRect(p2.x-4, p2.y-4, 8, 8);
      }

      ctx.strokeStyle = "rgba(0, 240, 255, 0.7)"; ctx.lineWidth = 1;
      hGuides.current.forEach(pos => { ctx.beginPath(); ctx.moveTo(0, pos); ctx.lineTo(canvas.width, pos); ctx.stroke(); });
      vGuides.current.forEach(pos => { ctx.beginPath(); ctx.moveTo(pos, 0); ctx.lineTo(pos, canvas.height); ctx.stroke(); });

      if (measurePoints.current) {
        const { p1, p2 } = measurePoints.current;
        ctx.strokeStyle = "#ff5a28"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
        const d = Math.round(Math.sqrt((p2.x-p1.x)**2 + (p2.y-p1.y)**2));
        ctx.fillStyle = "white"; ctx.font = "bold 12px monospace"; ctx.fillText(`${d}px`, p2.x+10, p2.y);
        ctx.fillStyle = "white"; ctx.fillRect(p1.x-3, p1.y-3, 6, 6); ctx.fillRect(p2.x-3, p2.y-3, 6, 6);
      }

      if (cropRect.current) {
        const r = cropRect.current;
        ctx.fillStyle = "rgba(0,0,0,0.85)";
        ctx.fillRect(0,0,canvas.width, r.y); ctx.fillRect(0,r.y+r.h, canvas.width, canvas.height);
        ctx.fillRect(0,r.y, r.x, r.h); ctx.fillRect(r.x+r.w, r.y, canvas.width, r.h);
        ctx.strokeStyle = "white"; ctx.strokeRect(r.x, r.y, r.w, r.h);
      }

      wandSelections.current.forEach(s => {
        ctx.strokeStyle = "#ff5a28"; ctx.setLineDash([4, 4]); ctx.beginPath();
        s.points.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)); ctx.closePath(); ctx.stroke();
        ctx.fillStyle = "rgba(255, 90, 40, 0.1)"; ctx.fill();
      });
      ctx.setLineDash([]);

      ctx.strokeStyle = "#ff5a28"; ctx.lineWidth = 2;
      selections.current.forEach(r => { 
        ctx.setLineDash([4,4]); 
        ctx.strokeRect(r.x, r.y, r.w, r.h); 
        ctx.fillStyle = "rgba(255, 90, 40, 0.1)";
        ctx.fillRect(r.x, r.y, r.w, r.h);
      });
      ctx.setLineDash([]);

      completedPaths.current.forEach(path => {
        ctx.beginPath(); 
        path.points.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
        if (path.closed) { ctx.closePath(); ctx.fillStyle = "rgba(255, 90, 40, 0.1)"; ctx.fill(); }
        ctx.stroke();
        path.points.forEach(p => { ctx.fillStyle = "white"; ctx.fillRect(p.x-2, p.y-2, 4, 4); });
      });

      texts.current.forEach(t => { ctx.fillStyle = "white"; ctx.font = "bold 32px Inter"; ctx.fillText(t.text, t.x, t.y); });

      circles.current.forEach(c => {
        ctx.strokeStyle = "#ff5a28"; ctx.lineWidth = 2;
        ctx.beginPath();
        const rx = c.w / 2;
        const ry = c.h / 2;
        const cx = c.x + rx;
        const cy = c.y + ry;
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = "rgba(255, 90, 40, 0.2)";
        ctx.fill();
      });

      // Overlays
      if (cur !== -1) {
        if (cur === 3) {
          ctx.strokeStyle = "rgba(0, 240, 255, 0.25)";
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
        }

        switch(cur) {
          case 1: // Pen
            if (currentPath.current.length > 0) {
              ctx.strokeStyle = "#ff5a28"; ctx.beginPath(); 
              currentPath.current.forEach((p, i) => i===0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)); 
              ctx.lineTo(x, y); ctx.stroke();
              currentPath.current.forEach((p, i) => {
                ctx.fillStyle = i === 0 && currentPath.current.length >= 3 ? "cyan" : "white";
                ctx.fillRect(p.x-3, p.y-3, 6, 6);
              });
            }
            break;
          case 2: // Loupe
            // Handled by DOM in HeroSection
            break;
          case 8: // Circle
            // Handled by main loop
            break;
          case 9: // Color Picker
            const c = STUDIO_COLORS[Math.floor((x+y)/100) % STUDIO_COLORS.length];
            ctx.strokeStyle = "white"; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, 22, 0, Math.PI*2); ctx.stroke();
            ctx.fillStyle = c; ctx.fill();
            break;
        }
      }

      animRef.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
      if (canvasRef.current && canvasRef.current.parentNode) {
        canvasRef.current.remove();
        canvasRef.current = null;
      }
    };
  }, [disabled, activeMode, isMobile]);
}
