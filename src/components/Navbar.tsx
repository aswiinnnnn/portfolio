import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import ContactModal from "./ContactModal";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.4, duration: 1 }}
      className="fixed top-4 inset-x-0 mx-auto z-50 w-[92%] max-w-5xl"
    >
      <div
        className={`flex items-center justify-between px-5 md:px-6 py-3 rounded-2xl border transition-all duration-500 ${
          scrolled
            ? "bg-background/20 backdrop-blur-2xl border-primary/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "bg-background/10 backdrop-blur-xl border-border/30"
        }`}
      >
        <motion.a
          href="#"
          className="font-display text-xl font-bold text-foreground tracking-tight"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          A<span className="text-primary">.</span>
        </motion.a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground px-4 py-2 rounded-xl hover:bg-foreground/5 transition-all group"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => setContactOpen(true)}
            className="ml-2 font-mono text-[11px] tracking-[0.15em] uppercase bg-primary/90 backdrop-blur-sm text-primary-foreground px-5 py-2 rounded-xl hover:bg-primary transition-all hover:shadow-[0_0_25px_hsl(0_72%_51%/0.5)] btn-glow relative overflow-hidden"
          >
            Hire Me
          </button>

        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-foreground p-2 rounded-xl hover:bg-foreground/5 transition-colors relative z-[60]"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile fullscreen overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            transition={{ duration: menuOpen ? 0.5 : 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-2xl flex flex-col justify-center items-center"
          >
            {/* Close button */}
            <motion.button
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="absolute top-7 right-9 w-10 h-10 rounded-full bg-foreground/10 border border-border/30 flex items-center justify-center"
            >
              <X className="w-5 h-5 text-foreground" />
            </motion.button>

            {/* Nav links */}
            <div className="flex flex-col items-center gap-2">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                  className="font-display text-4xl font-black uppercase tracking-tight text-foreground/80 hover:text-foreground py-3 transition-all"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            <motion.button
              onClick={() => { setMenuOpen(false); setTimeout(() => setContactOpen(true), 300); }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mt-10 inline-flex items-center gap-2 bg-primary/90 backdrop-blur-sm text-primary-foreground px-8 py-3 rounded-2xl font-mono text-sm tracking-[0.15em] uppercase"
            >
              Start A Project
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-8 left-8 font-mono text-[10px] text-muted-foreground/30 tracking-wider"
            >
              ASHWIN RAJ K C
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-8 right-8 font-mono text-[10px] text-muted-foreground/30 tracking-wider"
            >
              GRAPHIC DESIGNER
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </motion.nav>
  );
};

export default Navbar;
