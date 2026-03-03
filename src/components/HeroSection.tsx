import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover opacity-40 will-change-opacity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl"
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-mono text-sm tracking-[0.3em] uppercase text-primary mb-6"
          >
            Graphic Designer
          </motion.p>

          <h1 className="font-display text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.85] tracking-tight">
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="block text-foreground"
            >
              ASHWIN RAJ 
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="block text-gradient-orange italic font-display"
              style={{ fontSize: "0.5em" }}
            >
               Portfolio 
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-12 flex flex-col md:flex-row md:items-end gap-6 md:gap-16 will-change-transform"
          >
            <p className="text-muted-foreground text-lg md:text-xl max-w-md font-body leading-relaxed">
              I design visuals that businesses actually use — not just decorate with.
            </p>
            <div className="flex gap-3 font-mono text-xs tracking-wider text-muted-foreground">
              <span>Branding</span>
              <span className="text-primary">•</span>
              <span>Advertising</span>
              <span className="text-primary">•</span>
              <span>Visual Identity</span>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
