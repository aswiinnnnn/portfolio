import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.webp";
import heroBgDesktop from "@/assets/hero-bg-desktop.webp";

// Floating particles (sparks)
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

const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Background Image ── */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source srcSet={heroBgDesktop} media="(min-width: 1024px)" />
          <img
            src={heroBg}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover lg:object-[95%_top] lg:scale-125 opacity-25 brightness-[0.7]"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
      </div>

      {/* ── Floating Sparks ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {PARTICLES.map(p => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: "hsl(14 100% 49%)",
              opacity: p.opacity,
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, 15, 0],
              opacity: [p.opacity, p.opacity * 2.5, p.opacity],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ── Content ── */}
      <div
        className="relative z-10 container mx-auto px-6 md:px-12"
      >
        <div className="max-w-5xl">
          {/* Tag line */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex items-center gap-3 mb-6"
          >
            <motion.span
              className="inline-block w-8 h-px bg-primary"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{ originX: 0 }}
            />
            <p className="font-mono text-sm tracking-[0.3em] uppercase text-primary label-mono">
              Graphic Designer
            </p>
          </motion.div>

          {/* Big name — letter-by-letter */}
          <h1
            className="font-display text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter flex flex-col leading-[0.7]"
            style={{ perspective: 800 }}
          >
            <span className="block pb-[0.1em]">
              {HERO_NAME.split("").map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block"
                  style={{ display: char === " " ? "inline" : "inline-block" }}
                >
                  {char === " " ? "\u00a0" : char}
                </motion.span>
              ))}
            </span>

            <span 
              className="block text-shimmer italic font-display -mt-[0.25em] ml-1 md:ml-4 tracking-normal leading-none pl-1 pb-4 overflow-visible"
              style={{ fontSize: "clamp(2.2rem, 12vw, 4.5rem)" }}
            >
              {"portfolio".split("").map((char, i) => (
                <motion.span
                  key={i}
                  custom={i + 10}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Sub row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9 }}
            className="mt-12 flex flex-col md:flex-row md:items-end gap-6 md:gap-16"
          >
            <p className="text-muted-foreground text-lg md:text-xl max-w-md font-body leading-relaxed">
              I design visuals that businesses actually{" "}
              <span className="text-foreground font-semibold italic">use</span>, not just decorate with.
            </p>
            <div className="flex gap-3 font-mono text-xs tracking-wider text-muted-foreground">
              {["Branding", "Advertising", "Visual Identity"].map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + i * 0.1 }}
                  className="flex items-center gap-2"
                >
                  {i > 0 && <span className="text-primary">•</span>}
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
