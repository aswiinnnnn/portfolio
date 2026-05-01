import { useRef } from "react";
import { motion } from "framer-motion";

const wordVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] as any },
  }),
};

const letterVariants = {
  hidden: { opacity: 0, y: 80, rotateX: -40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { delay: 0.4 + i * 0.04, duration: 0.8, ease: [0.22, 1, 0.36, 1] as any },
  }),
};

const AboutSection = () => {
  const statRef = useRef<HTMLDivElement>(null);

  const headingWords = ["Practical", "design"];
  const headingOrangeWords = ["for", "real", "impact"];

  return (
    <section id="about" className="pt-2 pb-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-12">
        {/* Moving marquee */}
        <div className="mb-12 md:mb-16 overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 md:gap-16 whitespace-nowrap"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="font-display text-4xl md:text-7xl lg:text-[6rem] font-black uppercase tracking-tighter text-foreground/[0.07] flex items-center gap-8 md:gap-16">
                DESIGN IS COMMUNICATION
                <span className="text-primary/15">✦</span>
              </span>
            ))}
          </motion.div>
        </div>

        <div className="max-w-4xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <motion.span
              className="inline-block w-6 h-px bg-primary"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ originX: 0 }}
            />
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary label-mono">About</p>
          </motion.div>

          {/* Heading — word by word */}
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-10">
            <span className="block overflow-hidden pb-1">
              {headingWords.map((word, i) => (
                <motion.span
                  key={word}
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  className="inline-block mr-4"
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <span
              className="block overflow-hidden text-gradient-orange italic font-display normal-case pb-1"
              style={{ perspective: 800 }}
            >
              {"for real impact".split("").map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  className="inline-block"
                  style={{ display: char === " " ? "inline" : "inline-block" }}
                >
                  {char === " " ? "\u00a0" : char}
                </motion.span>
              ))}
            </span>
          </h2>

          {/* Body text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="space-y-5 text-muted-foreground leading-relaxed font-body text-lg max-w-xl"
          >
            <p>
              I'm a graphic designer with more than 2 years of experience creating clear, effective visuals
              for businesses and events. My work isn't about making things "pretty," it's about making them{" "}
              <span className="text-foreground font-semibold">work</span>.
            </p>
            <p>
              From logos and packaging to event graphics and social media creatives, I deliver designs that
              communicate fast, look professional, and hold attention.
            </p>
          </motion.div>

          {/* Experience stat — animated counter */}
          <motion.div
            ref={statRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-14 relative"
          >
            <div className="flex items-baseline gap-3">
              {/* Counter */}
              <div className="relative">
                {/* Glow behind number */}
                <div
                  className="absolute inset-0 blur-2xl rounded-full opacity-30"
                  style={{ background: "hsl(14 100% 49%)" }}
                />
                <span className="relative font-display text-7xl md:text-8xl font-black tracking-tighter text-foreground leading-none">
                  2
                  <span className="text-primary">+</span>
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl md:text-2xl font-black uppercase tracking-tight text-foreground leading-tight">
                  Years
                </span>
                <span className="font-display text-xl md:text-2xl font-black uppercase tracking-tight text-foreground/40 leading-tight">
                  in the Game
                </span>
              </div>
            </div>
            <div className="mt-3 ml-1 flex items-center gap-3">
              <motion.div
                className="h-px bg-gradient-to-r from-primary/60 to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
              <p className="font-body text-sm text-muted-foreground">
                Crafting visuals that businesses rely on daily
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
