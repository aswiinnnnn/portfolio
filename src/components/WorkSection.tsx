import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Brand & Business",
    items: ["Logo Design", "Business Ads", "Brochures & Menus", "ID Cards Design", "Product Packaging"],
  },
  {
    title: "Event Graphics",
    items: ["Standies", "Event Gates", "Wedding Invitations", "Housewarming Invitations"],
  },
  {
    title: "Digital",
    items: ["Social Media Posters", "Campaign Creatives", "Story Templates", "Digital Ads","Mockups", "Web Development"],
  },
  {
    title: "Specialized",
    items: ["Vectorization", "Custom Illustrations", "Photo Retouching", "Photo Restoration"],
  },
  {
    title: "Print Media",
    items: ["Flyers", "Banners", "Brochures", "Certificates", "Billboards", "Signage", "Event Passes"],
  },
  {
    title: "UI / Visual",
    items: ["App Screens", "Dashboards", "Pitch Decks", "Presentation Design", "Design Systems", "UI Mockups"],
  },
];

const WorkSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Determine which card is most visible using IntersectionObserver
    let observer = new IntersectionObserver((entries) => {
      // Find the entry that has the highest intersection ratio
      let maxRatio = 0;
      let newIndex = activeIndex;

      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          const indexStr = (entry.target as HTMLElement).dataset.index;
          if (indexStr !== undefined) {
             newIndex = parseInt(indexStr, 10);
          }
        }
      });
      
      if (maxRatio > 0 && newIndex !== activeIndex) {
         setActiveIndex(newIndex);
      }
    }, {
      root: null,
      rootMargin: "-20% 0px -20% 0px",
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    });

    const currentRefs = cardRefs.current;
    currentRefs.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
      observer.disconnect();
    };
  }, [activeIndex]);

  return (
    <section id="work" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-20"
        >
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4">Services</p>
          <h2 className="font-display text-4xl md:text-7xl lg:text-[6rem] font-black uppercase tracking-tighter leading-[0.9]">
            What ‎  I ‎ <span className="text-gradient-orange italic font-display">Create ‎ </span>
          </h2>
        </motion.div>

        {/* Desktop: Bento asymmetric grid */}
        <div className="hidden lg:grid grid-cols-12 gap-3 lg:gap-5">
          {/* Brand & Business: large spanning card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="col-span-7 relative group bg-foreground/[0.03] backdrop-blur-sm border border-border/40 rounded-3xl p-12 hover:border-primary/30 transition-all duration-500 overflow-hidden will-change-transform"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[60px] group-hover:bg-primary/10 transition-colors duration-500" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/60 mb-6 block">01</span>
            <h3 className="font-display text-4xl font-black uppercase tracking-tight mb-8">{categories[0].title}</h3>
            <div className="flex flex-wrap gap-2">
              {categories[0].items.map((item) => (
                <span key={item} className="px-4 py-2 rounded-xl bg-foreground/5 backdrop-blur-sm border border-border/30 text-muted-foreground font-body text-sm hover:border-primary/40 hover:text-foreground transition-all cursor-default">{item}</span>
              ))}
            </div>
          </motion.div>

          {/* Event Graphics — tall card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="col-span-5 row-span-2 relative group bg-foreground/[0.03] bg-neutral-900/60 border border-border/40 rounded-3xl p-10 hover:border-primary/30 transition-all duration-500"
          >
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/60 mb-6 block">02</span>
            <h3 className="font-display text-4xl font-black uppercase tracking-tight mb-10">{categories[1].title}</h3>
            <ul className="space-y-4">
              {categories[1].items.map((item, idx) => (
                <li key={item} className="flex items-center gap-4 group/item">
                  <span className="font-mono text-[10px] text-primary/40">{String(idx + 1).padStart(2, "0")}</span>
                  <span className="text-muted-foreground font-body text-lg group-hover/item:text-foreground transition-colors">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Digital — accent card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="col-span-4 relative group bg-primary/[0.06] bg-neutral-900/60 border border-primary/20 rounded-3xl p-8 hover:border-primary/40 transition-all duration-500"
          >
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/60 mb-4 block">03</span>
            <h3 className="font-display text-2xl font-black uppercase tracking-tight mb-6">{categories[2].title}</h3>
            <div className="space-y-2">
              {categories[2].items.map((item) => (
                <p key={item} className="text-muted-foreground font-body text-sm flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary shrink-0" />{item}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Specialized */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="col-span-3 relative group bg-foreground/[0.03] bg-neutral-900/60 border border-border/40 rounded-[2rem] p-8 hover:border-primary/30 transition-all duration-500"
          >
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/60 mb-4 block">04</span>
            <h3 className="font-display text-xl font-black uppercase tracking-tight mb-6">{categories[3].title}</h3>
            {categories[3].items.map((item) => (
              <p key={item} className="text-muted-foreground font-body text-sm border-b border-border/30 py-3 last:border-0">{item}</p>
            ))}
          </motion.div>

          {/* Print Media — new card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="col-span-8 relative group bg-foreground/[0.03] bg-neutral-900/60 border border-border/40 rounded-3xl p-8 hover:border-primary/30 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-tr-[50px] group-hover:bg-primary/10 transition-colors duration-500" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/60 mb-4 block">05</span>
            <h3 className="font-display text-2xl font-black uppercase tracking-tight mb-6">{categories[4].title}</h3>
            <div className="flex flex-wrap gap-2">
              {categories[4].items.map((item) => (
                <span key={item} className="px-4 py-2 rounded-xl bg-foreground/5 border border-border/30 text-muted-foreground font-body text-sm hover:border-primary/40 hover:text-foreground transition-all cursor-default">{item}</span>
              ))}
            </div>
          </motion.div>

          {/* UI / Visual — new card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="col-span-4 relative group bg-primary/[0.04] bg-neutral-900/60 border border-primary/15 rounded-[2rem] p-8 hover:border-primary/30 transition-all duration-500"
          >
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/60 mb-4 block">06</span>
            <h3 className="font-display text-2xl font-black uppercase tracking-tight mb-6">{categories[5].title}</h3>
            <ul className="space-y-3">
              {categories[5].items.map((item, idx) => (
                <li key={item} className="flex items-center gap-3 group/item">
                  <span className="font-mono text-[10px] text-primary/40">{String(idx + 1).padStart(2, "0")}</span>
                  <span className="text-muted-foreground font-body text-sm group-hover/item:text-foreground transition-colors">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Remaining col-span-3 filler is implicit */}
        </div>

        {/* Tablet: Optimized asymmetric layout */}
        <div className="hidden md:block lg:hidden space-y-3">
          {/* Brand & Business — full width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group bg-foreground/[0.03] bg-neutral-900/60 border border-border/40 rounded-[1.5rem] p-5 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-[40px]" />
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-primary/60 mb-2 block">01</span>
            <h3 className="font-display text-xl font-black uppercase tracking-tight mb-3">{categories[0].title}</h3>
            <div className="flex flex-wrap gap-1.5">
              {categories[0].items.map((item) => (
                <span key={item} className="px-2.5 py-1 rounded-lg bg-foreground/5 border border-border/30 text-muted-foreground font-body text-[11px]">{item}</span>
              ))}
            </div>
          </motion.div>

          {/* Event + Digital side by side */}
          <div className="flex gap-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex-[1.2] bg-foreground/[0.03] bg-neutral-900/60 border border-border/40 rounded-[1.5rem] p-4"
            >
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-primary/60 mb-2 block">02</span>
              <h3 className="font-display text-lg font-black uppercase tracking-tight mb-2">Event Graphics</h3>
              <ul className="space-y-1.5">
                {categories[1].items.map((item, idx) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="font-mono text-[8px] text-primary/40">{String(idx + 1).padStart(2, "0")}</span>
                    <span className="text-muted-foreground font-body text-[11px]">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 bg-primary/[0.06] bg-neutral-900/60 border border-primary/20 rounded-[1.2rem] p-4 flex flex-col"
            >
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-primary/60 mb-2 block">03</span>
              <h3 className="font-display text-lg font-black uppercase tracking-tight mb-2">Digital</h3>
              <div className="space-y-1.5 mt-auto">
                {categories[2].items.map((item) => (
                  <p key={item} className="text-muted-foreground font-body text-[11px] flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-primary shrink-0" />{item}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Specialized + Print side by side */}
          <div className="flex gap-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex-1 bg-foreground/[0.03] bg-neutral-900/60 border border-border/40 rounded-[1.5rem] p-4"
            >
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-primary/60 block mb-1">04</span>
              <h3 className="font-display text-lg font-black uppercase tracking-tight mb-2">Specialized</h3>
              {categories[3].items.map((item) => (
                <p key={item} className="text-muted-foreground font-body text-[11px] border-b border-border/30 py-2 last:border-0">{item}</p>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex-[1.2] bg-foreground/[0.03] bg-neutral-900/60 border border-border/40 rounded-[1.5rem] p-4 overflow-hidden relative"
            >
              <div className="absolute bottom-0 left-0 w-14 h-14 bg-primary/5 rounded-tr-[30px]" />
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-primary/60 block mb-1">05</span>
              <h3 className="font-display text-lg font-black uppercase tracking-tight mb-2">Print Media</h3>
              <div className="flex flex-wrap gap-1.5">
                {categories[4].items.map((item) => (
                  <span key={item} className="px-2.5 py-1 rounded-lg bg-foreground/5 border border-border/30 text-muted-foreground font-body text-[11px]">{item}</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* UI / Visual — full width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-primary/[0.04] bg-neutral-900/60 border border-primary/15 rounded-[1.5rem] p-4"
          >
            <div className="flex items-start gap-4">
              <div className="shrink-0">
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-primary/60 block mb-1">06</span>
                <h3 className="font-display text-lg font-black uppercase tracking-tight">UI / Visual</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {categories[5].items.map((item) => (
                  <span key={item} className="px-2.5 py-1 rounded-lg bg-foreground/5 border border-border/30 text-muted-foreground font-body text-[11px]">{item}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile: Stacked asymmetric layout */}
        <div className="md:hidden space-y-3">
          <motion.div
            data-index={0}
            ref={(el) => { cardRefs.current[0] = el; }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`relative group bg-neutral-900/60 border transition-all duration-300 rounded-[1.5rem] p-5 overflow-hidden will-change-transform ${
              activeIndex === 0 
                ? "bg-primary/[0.08] border-primary/30" 
                : "bg-foreground/[0.03] border-border/40"
            }`}
          >
            <div className={`absolute top-0 right-0 w-16 h-16 rounded-bl-[30px] transition-colors duration-500 ${
              activeIndex === 0 ? "bg-primary/10" : "bg-primary/5"
            }`} />
            <span className={`font-mono text-[9px] tracking-[0.3em] uppercase mb-3 block transition-colors duration-500 ${
              activeIndex === 0 ? "text-primary" : "text-primary/60"
            }`}>01</span>
            <h3 className="font-display text-2xl font-black uppercase tracking-tight mb-4">{categories[0].title}</h3>
            <div className="flex flex-wrap gap-1.5">
              {categories[0].items.map((item) => (
                <span key={item} className={`px-2.5 py-1.5 rounded-lg border font-body text-[11px] transition-all duration-500 ${
                  activeIndex === 0 
                    ? "bg-primary/10 border-primary/20 text-foreground" 
                    : "bg-foreground/5 border-border/30 text-muted-foreground"
                }`}>{item}</span>
              ))}
            </div>
          </motion.div>

          <div className="flex gap-3">
            <motion.div
              data-index={1}
              ref={(el) => { cardRefs.current[1] = el; }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`flex-[1.2] bg-neutral-900/60 border rounded-[1.5rem] p-4 transition-all duration-300 will-change-transform ${
                activeIndex === 1 
                  ? "bg-primary/[0.08] border-primary/30" 
                  : "bg-foreground/[0.03] border-border/40"
              }`}
            >
              <span className={`font-mono text-[9px] tracking-[0.3em] uppercase mb-2 block transition-colors duration-500 ${
                activeIndex === 1 ? "text-primary" : "text-primary/60"
              }`}>02</span>
              <h3 className="font-display text-lg font-black uppercase tracking-tight mb-3">Event<br/>Graphics</h3>
              <ul className="space-y-2">
                {categories[1].items.map((item, idx) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="font-mono text-[8px] text-primary/40">{String(idx + 1).padStart(2, "0")}</span>
                    <span className={`font-body text-[11px] transition-colors duration-500 ${
                      activeIndex === 1 ? "text-foreground" : "text-muted-foreground"
                    }`}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              data-index={2}
              ref={(el) => { cardRefs.current[2] = el; }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`flex-1 bg-neutral-900/60 border rounded-[1.2rem] p-4 flex flex-col transition-all duration-300 will-change-transform ${
                activeIndex === 2 
                  ? "bg-primary/[0.08] border-primary/30" 
                  : "bg-foreground/[0.03] border-border/40"
              }`}
            >
              <span className={`font-mono text-[9px] tracking-[0.3em] uppercase mb-2 block transition-colors duration-500 ${
                activeIndex === 2 ? "text-primary" : "text-primary/60"
              }`}>03</span>
              <h3 className="font-display text-lg font-black uppercase tracking-tight mb-3">Digital</h3>
              <div className="space-y-1.5 mt-auto">
                {categories[2].items.map((item) => (
                  <p key={item} className={`font-body text-[11px] flex items-center gap-1.5 transition-colors duration-500 ${
                    activeIndex === 2 ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    <span className={`w-1 h-1 rounded-full transition-colors duration-500 ${
                      activeIndex === 2 ? "bg-primary" : "bg-primary/40"
                    }`} />{item}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Specialized + Print side by side */}
          <div className="flex gap-3">
            <motion.div
              data-index={3}
              ref={(el) => { cardRefs.current[3] = el; }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className={`flex-1 bg-neutral-900/60 border rounded-[1.5rem] p-4 transition-all duration-300 will-change-transform ${
                activeIndex === 3 
                  ? "bg-primary/[0.08] border-primary/30" 
                  : "bg-foreground/[0.03] border-border/40"
              }`}
            >
              <span className={`font-mono text-[9px] tracking-[0.3em] uppercase block mb-1 transition-colors duration-500 ${
                activeIndex === 3 ? "text-primary" : "text-primary/60"
              }`}>04</span>
              <h3 className="font-display text-base font-black uppercase tracking-tight mb-2">Special</h3>
              {categories[3].items.map((item) => (
                <p key={item} className={`font-body text-[10px] border-b border-border/30 py-1.5 last:border-0 transition-colors duration-500 ${
                  activeIndex === 3 ? "text-foreground" : "text-muted-foreground"
                }`}>{item}</p>
              ))}
            </motion.div>

            <motion.div
              data-index={4}
              ref={(el) => { cardRefs.current[4] = el; }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`flex-[1.3] bg-neutral-900/60 border rounded-[1.3rem] p-4 overflow-hidden relative transition-all duration-300 will-change-transform ${
                activeIndex === 4 
                  ? "bg-primary/[0.08] border-primary/30" 
                  : "bg-foreground/[0.03] border-border/40"
              }`}
            >
              <div className={`absolute bottom-0 left-0 w-12 h-12 rounded-tr-[25px] transition-colors duration-500 ${
                activeIndex === 4 ? "bg-primary/10" : "bg-primary/5"
              }`} />
              <span className={`font-mono text-[9px] tracking-[0.3em] uppercase block mb-1 transition-colors duration-500 ${
                activeIndex === 4 ? "text-primary" : "text-primary/60"
              }`}>05</span>
              <h3 className="font-display text-base font-black uppercase tracking-tight mb-2">Print</h3>
              <div className="flex flex-wrap gap-1.5">
                {categories[4].items.map((item) => (
                  <span key={item} className={`px-2 py-1 rounded-lg border font-body text-[10px] transition-all duration-500 ${
                    activeIndex === 4 
                      ? "bg-primary/10 border-primary/20 text-foreground" 
                      : "bg-foreground/5 border-border/30 text-muted-foreground"
                  }`}>{item}</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* UI / Visual */}
          <motion.div
            data-index={5}
            ref={(el) => { cardRefs.current[5] = el; }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className={`bg-neutral-900/60 border transition-all duration-300 rounded-[1.5rem] p-4 will-change-transform ${
              activeIndex === 5 
                ? "bg-primary/[0.08] border-primary/30" 
                : "bg-foreground/[0.03] border-border/40"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="shrink-0">
                <span className={`font-mono text-[9px] tracking-[0.3em] uppercase block mb-1 transition-colors duration-500 ${
                  activeIndex === 5 ? "text-primary" : "text-primary/60"
                }`}>06</span>
                <h3 className="font-display text-base font-black uppercase tracking-tight">UI / Visual</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {categories[5].items.map((item) => (
                  <span key={item} className={`px-2 py-1 rounded-lg border font-body text-[10px] transition-all duration-500 ${
                    activeIndex === 5 
                      ? "bg-primary/10 border-primary/20 text-foreground" 
                      : "bg-foreground/5 border-border/30 text-muted-foreground"
                  }`}>{item}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
