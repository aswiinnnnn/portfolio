import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="pt-2 pb-20 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-12">
        {/* Moving marquee text */}
        <div className="mb-12 md:mb-16 overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 md:gap-16 whitespace-nowrap"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="font-display text-4xl md:text-7xl lg:text-[6rem] font-black uppercase tracking-tighter text-foreground/[0.09] flex items-center gap-8 md:gap-16">
                DESIGN IS COMMUNICATION
                <span className="text-primary/20">✦</span>
              </span>
            ))}
          </motion.div>
        </div>

        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4">About</p>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-10">
              Practical design<br />
              <span className="text-gradient-orange italic font-display normal-case"> ‎ for real impact ‎ </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-5 text-muted-foreground leading-relaxed font-body text-lg max-w-xl"
          >
            <p>
              I'm a graphic designer with more than 2 years of experience creating clear, effective visuals for businesses and events. My work isn't about making things "pretty," it's about making them <span className="text-foreground font-semibold">work</span>.
            </p>
            <p>
              From logos and packaging to event graphics and social media creatives, I deliver designs that communicate fast, look professional, and hold attention.
            </p>
          </motion.div>

          {/* Experience: bold inline typographic treatment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-14 relative"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-display text-7xl md:text-8xl font-black tracking-tighter text-foreground leading-none">2<span className="text-primary">+</span></span>
              <div className="flex flex-col">
                <span className="font-display text-xl md:text-2xl font-black uppercase tracking-tight text-foreground leading-tight">Years</span>
                <span className="font-display text-xl md:text-2xl font-black uppercase tracking-tight text-foreground/40 leading-tight">in the Game</span>
              </div>
            </div>
            <div className="mt-3 ml-1 flex items-center gap-3">
              <div className="w-12 h-px bg-primary/40" />
              <p className="font-body text-sm text-muted-foreground">Crafting visuals that businesses rely on daily</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
