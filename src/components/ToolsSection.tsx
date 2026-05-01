import { useRef } from "react";
import { motion } from "framer-motion";

const letterVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { delay: 0.2 + i * 0.03, duration: 0.8, ease: [0.22, 1, 0.36, 1] as any },
  }),
};

const tools = [
  {
    name: "Photoshop",
    initial: "Ps",
    desc: "Raster editing & compositing",
    bgColor: "bg-[#001E36]/30",
    borderColor: "border-[#31A8FF]/15",
    iconBg: "bg-[#001E36]",
    iconBorder: "border-[#31A8FF]/60",
    accentColor: "#31A8FF",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Adobe_Photoshop_CC_2026_icon.svg/330px-Adobe_Photoshop_CC_2026_icon.svg.png",
  },
  {
    name: "Illustrator",
    initial: "Ai",
    desc: "Vector graphics & logos",
    bgColor: "bg-[#330000]/30",
    borderColor: "border-[#FF9A00]/15",
    iconBg: "bg-[#330000]",
    iconBorder: "border-[#FF9A00]/60",
    accentColor: "#FF9A00",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Adobe_Illustrator_CC_icon.svg/330px-Adobe_Illustrator_CC_icon.svg.png",
  },
  {
    name: "Lightroom",
    initial: "Lr",
    desc: "Color grading & retouching",
    bgColor: "bg-[#001D36]/30",
    borderColor: "border-[#31A8FF]/15",
    iconBg: "bg-[#001D36]",
    iconBorder: "border-[#31A8FF]/60",
    accentColor: "#31A8FF",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Adobe_Lightroom_CC_2026_icon.svg/330px-Adobe_Lightroom_CC_2026_icon.svg.png",
  },
];

// Smooth magnetic 3D tilt with spring easing
function useTilt(ref: React.RefObject<HTMLDivElement | null>) {
  const animRef = useRef<number>(0);
  const currentTilt = useRef({ x: 0, y: 0 });
  const targetTilt = useRef({ x: 0, y: 0 });
  const glareRef = useRef<HTMLDivElement | null>(null);
  const isHovered = useRef(false);
  const currentOpacity = useRef(0);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animate = (el: HTMLDivElement) => {
    currentTilt.current.x = lerp(currentTilt.current.x, targetTilt.current.x, 0.1);
    currentTilt.current.y = lerp(currentTilt.current.y, targetTilt.current.y, 0.1);
    currentOpacity.current = lerp(currentOpacity.current, isHovered.current ? 0.15 : 0, 0.15);
    
    el.style.transform = `perspective(800px) rotateY(${currentTilt.current.x}deg) rotateX(${currentTilt.current.y}deg) scale3d(1.04,1.04,1.04)`;
    
    if (glareRef.current) {
      const gx = (currentTilt.current.x / 15) * 50 + 50;
      const gy = (-currentTilt.current.y / 15) * 50 + 50;
      glareRef.current.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,${currentOpacity.current}), transparent 65%)`;
    }

    const dist = Math.abs(currentTilt.current.x) + Math.abs(currentTilt.current.y) + currentOpacity.current;
    if (dist > 0.01) {
      animRef.current = requestAnimationFrame(() => animate(el));
    } else {
      if (glareRef.current) glareRef.current.style.background = "none";
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    isHovered.current = true;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    targetTilt.current = { x: x * 15, y: -y * 15 };
    cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(() => animate(el));
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    targetTilt.current = { x: 0, y: 0 };
    const el = ref.current;
    if (el) animRef.current = requestAnimationFrame(() => animate(el));
  };

  return { onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave, glareRef };
}

const ToolCard = ({
  tool,
  index,
  variant = "desktop",
}: {
  tool: (typeof tools)[0];
  index: number;
  variant?: "desktop" | "tablet" | "mobile-row" | "mobile-wide";
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const tilt = useTilt(ref);

  const baseMotion = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] as any },
  };

  if (variant === "mobile-wide") {
    return (
      <motion.div {...baseMotion} ref={ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}
        className={`${tool.bgColor} backdrop-blur-sm border ${tool.borderColor} rounded-[1.5rem] p-5 transition-all duration-300 tilt-card`}
        style={{ boxShadow: `0 0 0px ${tool.accentColor}00`, transition: "transform 0.2s ease, box-shadow 0.3s ease" }}
        onMouseEnter={() => { if (ref.current) ref.current.style.boxShadow = `0 0 30px ${tool.accentColor}22`; }}
        onMouseLeave={(e) => { tilt.onMouseLeave(); if (ref.current) ref.current.style.boxShadow = "none"; }}
      >
        <div className="flex items-center gap-4">
          <img src={tool.logoUrl} alt={tool.name} loading="lazy" className="w-12 h-12" />
          <div>
            <h3 className="font-display text-xl font-black uppercase tracking-tight">{tool.name}</h3>
            <p className="text-[11px] text-muted-foreground font-body">{tool.desc}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === "mobile-row") {
    return (
      <motion.div {...baseMotion} ref={ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}
        className={`${tool.bgColor} backdrop-blur-sm border ${tool.borderColor} rounded-[1.3rem] p-4 transition-all duration-300 tilt-card`}
        onMouseEnter={() => { if (ref.current) ref.current.style.boxShadow = `0 0 25px ${tool.accentColor}22`; }}
        onMouseLeave={(e) => { tilt.onMouseLeave(); if (ref.current) ref.current.style.boxShadow = "none"; }}
      >
        <img src={tool.logoUrl} alt={tool.name} loading="lazy" className="w-10 h-10 mb-3" />
        <h3 className="font-display text-lg font-black uppercase tracking-tight">{tool.name}</h3>
        <p className="text-[10px] text-muted-foreground font-body mt-1">{tool.desc}</p>
      </motion.div>
    );
  }

  if (variant === "tablet") {
    return (
      <motion.div {...baseMotion} ref={ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}
        className={`${tool.bgColor} backdrop-blur-sm border ${tool.borderColor} rounded-[1.5rem] p-5 transition-all duration-300 tilt-card`}
        onMouseEnter={() => { if (ref.current) ref.current.style.boxShadow = `0 0 30px ${tool.accentColor}25`; }}
        onMouseLeave={(e) => { tilt.onMouseLeave(); if (ref.current) ref.current.style.boxShadow = "none"; }}
      >
        <div className="flex items-center gap-3 mb-3">
          <img src={tool.logoUrl} alt={tool.name} loading="lazy" className="w-10 h-10" />
          <span className="font-mono text-[9px] text-muted-foreground/40 tracking-wider">ADOBE</span>
        </div>
        <h3 className="font-display text-xl font-black uppercase tracking-tight mb-1">{tool.name}</h3>
        <p className="text-xs text-muted-foreground font-body">{tool.desc}</p>
      </motion.div>
    );
  }

  // Desktop
  return (
    <motion.div
      {...baseMotion}
      ref={ref}
      {...{ onMouseMove: tilt.onMouseMove, onMouseLeave: tilt.onMouseLeave }}
      className={`group relative backdrop-blur-sm border ${tool.borderColor} hover:border-primary/30 transition-colors duration-300 overflow-hidden tilt-card ${
        index === 1 ? `${tool.bgColor} rounded-[2rem] p-10` : `${tool.bgColor} rounded-3xl p-8`
      }`}
      style={{ transition: "box-shadow 0.3s ease", willChange: "transform" }}
      onMouseEnter={() => { if (ref.current) ref.current.style.boxShadow = `0 0 20px ${tool.accentColor}15, 0 10px 20px rgba(0,0,0,0.2)`; }}
      onMouseLeave={(e) => { tilt.onMouseLeave(); if (ref.current) ref.current.style.boxShadow = "none"; }}
    >
      {/* Dynamic glare sheen */}
      <div
        ref={tilt.glareRef}
        className="absolute inset-0 pointer-events-none rounded-inherit z-10"
        style={{ borderRadius: "inherit", transition: "background 0.05s ease" }}
      />

      {/* Shimmer overlay on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)" }}
        />
      </div>

      <div className="flex items-start justify-between mb-8">
        <img
          src={tool.logoUrl}
          alt={tool.name}
          loading="lazy"
          className="w-12 h-12 md:w-16 md:h-16 will-change-transform"
          onError={(e) => { e.currentTarget.style.display = 'none'; const f = e.currentTarget.nextElementSibling as HTMLElement; if (f) f.style.display = 'flex'; }}
        />
        <div className={`${tool.iconBg} border ${tool.iconBorder} rounded-2xl p-4 items-center justify-center hidden`}>
          <span className="font-mono text-2xl font-bold text-foreground">{tool.initial}</span>
        </div>
        <span className="font-mono text-[10px] text-muted-foreground/40 tracking-wider">ADOBE</span>
      </div>
      <h3 className="font-display text-3xl font-black uppercase tracking-tight mb-2">{tool.name}</h3>
      <p className="text-sm text-muted-foreground font-body">{tool.desc}</p>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] rounded-full"
        style={{ background: `linear-gradient(90deg, ${tool.accentColor}80, transparent)` }}
        initial={{ width: "0%" }}
        whileInView={{ width: "60%" }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
      />
    </motion.div>
  );
};

const ToolsSection = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background" />

      <div className="container mx-auto px-4 md:px-12 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-10 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.span
              className="inline-block w-6 h-px bg-primary"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ originX: 0 }}
            />
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary label-mono">Arsenal</p>
          </div>
          <h2 className="font-display text-4xl md:text-7xl font-black uppercase tracking-tighter flex flex-wrap gap-x-4">
            <span className="flex">
              {"My".split("").map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="inline-block"
                  style={{ display: char === " " ? "inline" : "inline-block" }}
                >
                  {char === " " ? "\u00a0" : char}
                </motion.span>
              ))}
            </span>
            <span className="text-shimmer italic font-display flex lowercase">
              {"Tools  ‎ ".split("").map((char, i) => (
                <motion.span
                  key={i}
                  custom={i + 2}
                  variants={letterVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="inline-block"
                  style={{ display: char === " " ? "inline" : "inline-block" }}
                >
                  {char === " " ? "\u00a0" : char}
                </motion.span>
              ))}
            </span>
          </h2>
        </motion.div>

        {/* Desktop */}
        <div className="hidden lg:grid grid-cols-3 gap-5">
          {tools.map((tool, i) => (
            <ToolCard key={tool.name} tool={tool} index={i} variant="desktop" />
          ))}
        </div>

        {/* Tablet */}
        <div className="hidden md:grid lg:hidden grid-cols-3 gap-3">
          {tools.map((tool, i) => (
            <ToolCard key={tool.name} tool={tool} index={i} variant="tablet" />
          ))}
        </div>

        {/* Mobile */}
        <div className="md:hidden space-y-3">
          <ToolCard tool={tools[0]} index={0} variant="mobile-wide" />
          <div className="flex gap-3">
            <div className="flex-[1.3]">
              <ToolCard tool={tools[1]} index={1} variant="mobile-row" />
            </div>
            <div className="flex-1">
              <ToolCard tool={tools[2]} index={2} variant="mobile-row" />
            </div>
          </div>
        </div>

        {/* Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-16 md:mt-24 border-t border-b border-border/30 py-4 md:py-6 overflow-hidden marquee-track"
        >
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="marquee-inner flex gap-8 md:gap-12 whitespace-nowrap font-display text-2xl md:text-5xl font-black uppercase tracking-tighter text-foreground/[0.08]"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="flex items-center gap-8 md:gap-12">
                PIXELS WITH PURPOSE
                <span className="text-primary/15">✦</span>
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ToolsSection;
