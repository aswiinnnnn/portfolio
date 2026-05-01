import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroBg from "@/assets/hero-bg.webp";
import heroBgDesktop from "@/assets/hero-bg-desktop.webp";
import { useDesignEngine, TOOL_MODES } from "@/hooks/useDesignEngine";
import { useInkTrail } from "@/hooks/useInkTrail";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  MousePointer, 
  PenTool, 
  Search, 
  Layout, 
  Ruler, 
  GalleryVerticalEnd, 
  Crop, 
  Type, 
  Circle, 
  Pipette, 
  Wand2, 
  Hand 
} from "lucide-react";

const TOOL_ICONS = [
  MousePointer,
  PenTool,
  Search,
  Layout,
  Ruler,
  GalleryVerticalEnd,
  Crop,
  Type,
  Circle,
  Pipette,
  Wand2,
  Hand
];

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 6,
  duration: Math.random() * 8 + 8,
  opacity: Math.random() * 0.4 + 0.1,
}));

const letterVariants = {
  hidden: { opacity: 0, y: 80, rotateX: -40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.4 + i * 0.04,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as any,
    },
  }),
};

const HERO_NAME = "ASHWIN RAJ";

const HeroVisuals = ({ 
  isClone = false, 
  isMagnified = false,
  heroBg, 
  heroBgDesktop, 
  PARTICLES, 
  HERO_NAME, 
  letterVariants 
}: any) => (
  <>
    {/* ── Background Image ── */}
    <div className="absolute inset-0 z-0">
      <picture>
        <source srcSet={heroBgDesktop} media="(min-width: 1024px)" />
        <img
          src={heroBg}
          alt=""
          loading="lazy"
          className={`w-full h-full object-cover lg:object-[95%_top] lg:scale-125 transition-transform duration-75 ease-out ${
            isMagnified ? "opacity-100 brightness-100" : "opacity-25 brightness-[0.7]"
          }`}
        />
      </picture>
      {!isMagnified && <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />}
    </div>

    <div className="absolute inset-0 z-0 pointer-events-none">
      {PARTICLES.map((p: any) => (
        <motion.div
          key={p.id} className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: "hsl(14 100% 49%)", opacity: p.opacity }}
          animate={{ y: [0, -60, 0], x: [0, 15, 0], opacity: [p.opacity, p.opacity * 2.5, p.opacity], scale: [1, 1.4, 1] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>

    <div className="relative z-10 w-full px-6 md:pl-28 lg:pl-36">
      <div className="max-w-5xl text-left">
        <motion.div initial={isClone ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="flex items-center gap-3 mb-6">
          <motion.span className="inline-block w-8 h-px bg-primary" initial={isClone ? { scaleX: 1 } : { scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 0.6 }} style={{ originX: 0 }} />
          <p className="font-mono text-sm tracking-[0.3em] uppercase text-primary label-mono">Graphic Designer</p>
        </motion.div>

        <h1 className="font-display text-[clamp(2.5rem,12vw,10rem)] font-black tracking-tighter flex flex-col leading-[0.7] text-left whitespace-nowrap">
          <span className="block pb-[0.1em]">
            {HERO_NAME.split("").map((char: string, i: number) => (
              <motion.span key={i} custom={i} variants={isClone ? {} : letterVariants} initial={isClone ? "visible" : "hidden"} animate="visible" className="inline-block" style={{ display: char === " " ? "inline" : "inline-block" }}>
                {char === " " ? "\u00a0" : char}
              </motion.span>
            ))}
          </span>
          <span className="block text-shimmer italic font-display -mt-[0.25em] ml-1 md:ml-4 tracking-normal leading-none pl-1 pb-4 overflow-visible" style={{ fontSize: "clamp(2.2rem, 12vw, 4.5rem)" }}>
            {"portfolio".split("").map((char, i) => (
              <motion.span key={i} custom={i + 10} variants={isClone ? {} : letterVariants} initial={isClone ? "visible" : "hidden"} animate="visible" className="inline-block">{char}</motion.span>
            ))}
          </span>
        </h1>

        <motion.div initial={isClone ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.9 }} className="mt-12 flex flex-col md:flex-row md:items-end gap-6 md:gap-16">
          <p className="text-muted-foreground text-lg md:text-xl max-w-md font-body leading-relaxed">
            I design visuals that businesses actually <span className="text-foreground font-semibold italic">use</span>, not just decorate with.
          </p>
          <div className="flex gap-3 font-mono text-xs tracking-wider text-muted-foreground">
            {["Branding", "Advertising", "Visual Identity"].map((tag, i) => (
              <motion.span key={tag} initial={isClone ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 + i * 0.1 }} className="flex items-center gap-2">
                {i > 0 && <span className="text-primary">•</span>}
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </>
);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const [activeMode, setActiveMode] = useState(-1);
  const [showToolbar, setShowToolbar] = useState(false);
  const [showTourHint, setShowTourHint] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hintTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (activeMode !== 2 && activeMode !== 10) return; // Track for magnifier and magic select

    const onMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [activeMode]);

  useEffect(() => {
    if (isMobile) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!timerRef.current) timerRef.current = setTimeout(() => setShowToolbar(true), 4000);
        if (!hintTimerRef.current) hintTimerRef.current = setTimeout(() => setShowTourHint(true), 6000);
      } else {
        if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
        if (hintTimerRef.current) { clearTimeout(hintTimerRef.current); hintTimerRef.current = null; }
      }
    }, { threshold: 0.01 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); if (hintTimerRef.current) clearTimeout(hintTimerRef.current); observer.disconnect(); };
  }, [isMobile]);

  useEffect(() => { if (activeMode !== -1) setShowTourHint(false); }, [activeMode]);
  useDesignEngine(sectionRef, activeMode, setActiveMode, isMobile);
  useInkTrail(sectionRef, !isMobile && activeMode === -1);

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden select-none transition-colors duration-500 ${
        isMobile ? "cursor-default" : activeMode === 11 ? "cursor-grab" : activeMode === 10 ? "cursor-none" : activeMode === 7 ? "cursor-text" : activeMode !== -1 ? "cursor-crosshair" : ""
      }`}
    >
      <HeroVisuals heroBg={heroBg} heroBgDesktop={heroBgDesktop} PARTICLES={PARTICLES} HERO_NAME={HERO_NAME} letterVariants={letterVariants} />

      {/* ── Real DOM Magnifier Overlay ── */}
      <AnimatePresence>
        {activeMode === 2 && !isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 pointer-events-none overflow-hidden"
            style={{
              clipPath: `circle(150px at ${mousePos.x}px ${mousePos.y}px)`,
            }}
          >
            <div 
              className="absolute inset-0"
              style={{
                transform: `scale(2.5)`,
                transformOrigin: `${mousePos.x}px ${mousePos.y}px`,
                width: "100%",
                height: "100%",
              }}
            >
              <HeroVisuals 
                isClone={true}
                isMagnified={true}
                heroBg={heroBg} 
                heroBgDesktop={heroBgDesktop} 
                PARTICLES={PARTICLES} 
                HERO_NAME={HERO_NAME} 
                letterVariants={letterVariants} 
              />
              
              {/* Internal Grid Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,90,40,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,90,40,0.15)_1px,transparent_1px)] bg-[size:20px_20px]" />
            </div>
            <div className="absolute pointer-events-none border-[3px] border-primary rounded-full shadow-[0_0_50px_rgba(255,90,40,0.3)]" style={{ width: 300, height: 300, left: mousePos.x - 150, top: mousePos.y - 150 }}>
               <span className="absolute bottom-[-25px] left-1/2 -translate-x-1/2 text-[10px] font-mono text-primary font-bold whitespace-nowrap bg-black/80 px-2 py-0.5 rounded">ZOOM 2.5X | INSPECTING DOM</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {activeMode === 10 && !isMobile && <Wand2 className="fixed pointer-events-none z-[100] text-primary" style={{ left: mousePos.x, top: mousePos.y }} />}

      <AnimatePresence>
        {!isMobile && showToolbar && (
          <motion.div 
            initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            className="absolute left-6 top-[15%] -translate-y-1/2 z-50 flex flex-col gap-1 p-1 bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl"
          >
            <div className="px-2 py-1 mb-1 border-b border-white/10 flex justify-center"><div className="w-4 h-1 bg-white/20 rounded-full" /></div>
            {TOOL_ICONS.map((Icon, idx) => (
              <motion.button
                key={idx}
                animate={idx === 0 && activeMode === -1 ? { 
                  scale: [1, 1.15, 1],
                  backgroundColor: ["rgba(0,0,0,0)", "rgba(255,90,40,0.2)", "rgba(0,0,0,0)"]
                } : { scale: 1 }}
                transition={{ duration: 2, repeat: 2, repeatDelay: 1 }}
                onClick={() => setActiveMode(idx)}
                className={`p-2.5 rounded-md transition-all relative group ${
                  activeMode === idx 
                    ? "bg-primary text-white shadow-[0_0_15px_rgba(255,90,40,0.4)] !bg-primary" 
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={18} strokeWidth={activeMode === idx ? 2.5 : 1.5} />
                <div className="absolute left-full ml-4 px-3 py-1.5 bg-black text-white text-[10px] font-mono whitespace-nowrap rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity border border-white/10 z-[60] uppercase tracking-widest">{TOOL_MODES[idx]}</div>
              </motion.button>
            ))}
            {activeMode !== -1 && (
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setActiveMode(-1)} className="mt-2 p-2 text-white/30 hover:text-red-500 transition-colors flex justify-center border-t border-white/10 pt-3">
                <div className="w-5 h-5 flex items-center justify-center border border-current rounded-sm text-[8px] font-bold">X</div>
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTourHint && activeMode === -1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -20 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9, x: -20 }}
            className="absolute left-28 top-[20%] z-[100] pointer-events-auto"
          >
            <div className="w-64 bg-zinc-900/95 backdrop-blur-2xl border border-white/10 rounded-xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
              <div className="absolute left-0 top-8 -translate-x-full w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[12px] border-r-white/10" />
              <button onClick={() => setShowTourHint(false)} className="absolute top-4 right-4 text-white/20 hover:text-white transition-colors"><div className="w-4 h-4 flex items-center justify-center text-[10px] font-bold">✕</div></button>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2"><div className="w-2 h-2 bg-primary rounded-full animate-pulse" /><span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest">Creative Studio</span></div>
                <h4 className="text-sm font-display font-bold text-white">Studio Unlocked</h4>
                <p className="text-xs text-white/60 leading-relaxed">Pick a tool from the sidebar to start your design session.</p>
                <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/5">
                  <button onClick={() => setShowTourHint(false)} className="text-[9px] font-mono text-white/30 hover:text-red-400 uppercase tracking-widest transition-colors border border-primary/30 px-3 py-1.5 rounded-md">End Tour</button>
                  <button onClick={() => setShowTourHint(false)} className="px-4 py-1.5 bg-primary text-black text-[9px] font-mono font-bold uppercase tracking-widest rounded-md hover:bg-white transition-colors shadow-lg">Got it</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isMobile && activeMode !== -1 && (
        <div className="absolute bottom-8 left-24 z-50 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div key={activeMode} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-primary/60 tracking-[0.4em] uppercase mb-1">Active Tool</span>
                <span className="text-xl font-display font-black text-white tracking-tight uppercase">{TOOL_MODES[activeMode]}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {activeMode !== -1 && !isMobile && (
          <motion.button
            key="exit-button" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }} onClick={() => setActiveMode(-1)}
            className="absolute top-24 right-12 z-[60] group flex items-center gap-3 px-5 py-2.5 bg-black/40 hover:bg-red-500/20 backdrop-blur-md border border-primary/40 hover:border-red-500/50 rounded-xl transition-all duration-300 pointer-events-auto shadow-2xl"
          >
            <span className="text-[10px] font-mono text-white/40 group-hover:text-red-400 uppercase tracking-widest transition-colors">Exit Studio</span>
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
