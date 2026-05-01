import { useState, useEffect, useRef, useCallback, memo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Images, ChevronLeft, ChevronRight } from "lucide-react";

const letterVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { delay: 0.2 + i * 0.03, duration: 0.8, ease: [0.22, 1, 0.36, 1] as any },
  }),
};

// Project assets - Keep these as they are verified
import p1_1 from "../assets/project1/1.webp";
import p1_2 from "../assets/project1/2.webp";
import p1_3 from "../assets/project1/3.webp";
import p2_1 from "../assets/project2/1.webp";
import p2_2 from "../assets/project2/2.webp";
import p3_1 from "../assets/project3/1.webp";
import p3_2 from "../assets/project3/2.webp";
import p4_1 from "../assets/project4/1.webp";
import p4_2 from "../assets/project4/2.webp";
import p5_1 from "../assets/project5/1.webp";
import p5_2 from "../assets/project5/2.webp";
import p6_1 from "../assets/project6/1.webp";
import p6_2 from "../assets/project6/2.webp";
import p7_1 from "../assets/project7/1.webp";
import p8_1 from "../assets/project8/1.webp";
import p8_2 from "../assets/project8/2.webp";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  sector: string;
  year: string;
  responsibility: string;
  color: string;
  images: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "WHARP CORP",
    category: "Brochure Design",
    description: "A premium tri-fold brochure designed for a high-end car wrap brand, presenting services, finish options, and contact details in a clean, high-impact layout. The design is meticulously structured for quick readability, utilizing strong visuals and a modern automotive aesthetic to resonate with premium enthusiasts.",
    sector: "Automotive",
    year: "2026",
    responsibility: "Brochure Design",
    color: "hsl(210 50% 35%)",
    images: [p1_1, p1_2, p1_3],
  },
  {
    id: 2,
    title: "FAREWELL PARTY",
    category: "Poster Design",
    description: "High-energy promotional poster for a college farewell event. Features bold typography and high-contrast visuals designed with a clear visual hierarchy for maximum impact and engagement.",
    sector: "Events",
    year: "2025",
    responsibility: "Poster Design",
    color: "hsl(280 40% 45%)",
    images: [p2_1, p2_2],
  },
  {
    id: 3,
    title: "CAKE WORLD",
    category: "Menu Design",
    description: "Two-page menu design for a cake shop, presenting products and pricing in a clean, easy-to-scan layout. Focused on readability, structured hierarchy, and a warm, bakery-inspired visual style.",
    sector: "Food & Beverage",
    year: "2024",
    responsibility: "Menu Design",
    color: "hsl(35 40% 45%)",
    images: [p3_1, p3_2],
  },
  {
    id: 4,
    title: "YSL 6.0",
    category: "Poster Design",
    description: "Jersey reveal poster designed for YSL 6.0, featuring bold lighting, high-contrast visuals, and a dynamic composition to highlight the new kit. The design focuses on creating anticipation, with a strong central reveal, dramatic glow effects, and a modern sports aesthetic that drives attention and engagement.",
    sector: "Sports",
    year: "2025",
    responsibility: "Poster Design",
    color: "hsl(12 70% 45%)",
    images: [p4_1, p4_2],
  },
  {
    id: 5,
    title: "FOODIT",
    category: "Poster Design",
    description: "Promotional posters for a food delivery app, highlighting fast service and ease of ordering. Uses vibrant visuals, a friendly character, and clear call-to-action to attract attention and drive app installs.",
    sector: "Food & Delivery",
    year: "2025",
    responsibility: "Poster Design",
    color: "hsl(20 80% 45%)",
    images: [p5_1, p5_2],
  },
  {
    id: 6,
    title: "CAR RENTALS",
    category: "Poster Design",
    description: "Promotional poster for a car rental service, highlighting vehicle availability and key features with a clean, modern layout. Focused on strong typography, clear messaging, and quick visual impact.",
    sector: "Automotive",
    year: "2024",
    responsibility: "Poster Design",
    color: "hsl(210 50% 40%)",
    images: [p6_1, p6_2],
  },
  {
    id: 7,
    title: "WEDDING INVITATION",
    category: "Invitation Design",
    description: "Wedding invitation card inspired by Arabic design elements, featuring elegant typography, soft floral patterns, and a refined layout. Designed to convey a luxurious and graceful aesthetic while maintaining clear readability of event details.",
    sector: "Events",
    year: "2025",
    responsibility: "Invitation Card Design",
    color: "hsl(25 30% 40%)",
    images: [p7_1],
  },
  {
    id: 8,
    title: "YSL 6.0",
    category: "Digital Campaign",
    description: "Complete social media campaign designed for YSL 6.0, including match announcements, player highlights, and promotional creatives. Focused on bold visuals, strong typography, and consistent layouts to build hype and maintain engagement throughout the tournament.",
    sector: "Sports",
    year: "2025",
    responsibility: "Social Media Creatives",
    color: "hsl(12 70% 45%)",
    images: [p8_1, p8_2],
  },
];

const desktopLayouts = [
  { span: "col-span-7 row-span-2", height: "h-[560px]", rounded: "rounded-[2.5rem]" },
  { span: "col-span-5", height: "h-[270px]", rounded: "rounded-3xl" },
  { span: "col-span-5", height: "h-[270px]", rounded: "rounded-[2rem]" },
  { span: "col-span-6", height: "h-[380px]", rounded: "rounded-[2.5rem]" },
  { span: "col-span-6", height: "h-[380px]", rounded: "rounded-3xl" },
  { span: "col-span-4", height: "h-[320px]", rounded: "rounded-[2rem]" },
  { span: "col-span-4", height: "h-[320px]", rounded: "rounded-[2.5rem]" },
  { span: "col-span-4", height: "h-[320px]", rounded: "rounded-3xl" },
];

const ViewProjectButton = memo(({ compact = false }: { compact?: boolean }) => (
  <div className="flex items-center gap-2">
    <span className={`font-mono tracking-wider uppercase text-white/50 ${compact ? "text-[8px]" : "text-[9px]"}`}>
      View Project
    </span>
    <div className={`rounded-full bg-white/10 bg-neutral-800/80 border border-white/20 flex items-center justify-center ${
      compact ? "w-7 h-7" : "w-10 h-10"
    }`}>
      <ArrowUpRight className={compact ? "w-3 h-3 text-white" : "w-4 h-4 text-white"} />
    </div>
  </div>
));

const ImageCountBadge = memo(({ count, compact = false }: { count: number; compact?: boolean }) => (
  <div className={`flex items-center gap-1.5 bg-white/10 bg-neutral-800/80 border border-white/20 rounded-full ${
    compact ? "px-2 py-1" : "px-3 py-1.5"
  }`}>
    <Images className={compact ? "w-2.5 h-2.5 text-white/80" : "w-3 h-3 text-white/80"} />
    <span className={`font-mono text-white/80 ${compact ? "text-[8px]" : "text-[9px]"}`}>{count}</span>
  </div>
));

const ProjectImage = ({ src, alt, className }: { src: string; alt: string; className: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className={`relative ${className} bg-neutral-900 border border-white/5 overflow-hidden`}>
      {/* SKELETON LOADER */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent bg-neutral-800/50" />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-700 ease-out ${isLoaded ? "opacity-100" : "opacity-0"}`}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};

const ProjectCard = memo(({ 
  project, 
  onClick, 
  layout, 
  mobile = false,
  isActive = false 
}: { 
  project: Project; 
  onClick: () => void; 
  layout?: any;
  mobile?: boolean;
  isActive?: boolean;
}) => {
  if (mobile) {
    return (
      <div
        onClick={onClick}
        data-hover="Click to view"
        className={`relative overflow-hidden cursor-pointer border border-border/20 ${layout?.className || ""} ${layout?.height || "h-[220px]"} rounded-[1.5rem]`}
      >
        <ProjectImage src={project.images[0]} alt={project.title} className="absolute inset-0 w-full h-full" />
        <div className={`absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent ${isActive ? "opacity-90" : "opacity-70"} transition-opacity duration-300`} />
        <div className="absolute inset-0 p-3.5 flex flex-col justify-end">
          <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/80 mb-0.5 block">{project.category}</span>
          <h3 className="font-display text-lg font-black uppercase tracking-tight text-white">{project.title}</h3>
        </div>
        <div className="absolute top-2.5 right-2.5"><ViewProjectButton compact /></div>
        {project.images.length > 1 && <div className="absolute bottom-3 right-3"><ImageCountBadge count={project.images.length} compact /></div>}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onClick={onClick}
      data-hover="Click to view"
      className={`${layout.span} ${layout.height} ${layout.rounded} relative group cursor-pointer overflow-hidden border border-border/20 hover:border-primary/30 transition-all duration-300 will-change-transform`}
    >
      <ProjectImage
        src={project.images[0]}
        alt={project.title}
        className="absolute inset-0 w-full h-full transition-transform duration-300 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/80 mb-2 block">{project.category}</span>
          <h3 className="font-display text-3xl lg:text-4xl font-black uppercase tracking-tight text-white">{project.title}</h3>
        </div>
        <div className="absolute top-6 right-6"><ViewProjectButton /></div>
        {project.images.length > 1 && <div className="absolute bottom-6 right-6"><ImageCountBadge count={project.images.length} /></div>}
      </div>
    </motion.div>
  );
});

const ModalPortal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); return () => setMounted(false); }, []);
  return mounted ? createPortal(children, document.body) : null;
};

// Reusable Modal Component to ensure consistency and performance
const ProjectModal = memo(({ 
  project, 
  isOpen, 
  onClose, 
  currentImg, 
  onNext, 
  onPrev 
}: { 
  project: Project | undefined; 
  isOpen: boolean; 
  onClose: () => void;
  currentImg: number;
  onNext: () => void;
  onPrev: () => void;
}) => {
  if (!project) return null;

  return (
    <ModalPortal>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none p-4 md:p-8">
            {/* Simple Overlay - No blur for performance */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/80 pointer-events-auto"
              onClick={onClose}
            />

            {/* Desktop Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="hidden md:flex flex-col relative w-full max-w-3xl bg-neutral-900 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl pointer-events-auto max-h-[90vh] will-change-transform"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button 
                onClick={onClose} 
                className="absolute top-6 right-6 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors border border-white/5"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="overflow-y-auto hide-scrollbar w-full">
                {/* Gallery */}
                <div className="relative h-[400px] w-full shrink-0 bg-black/40 flex items-center justify-center p-4">
                  <img src={project.images[currentImg]} alt="" decoding="async" className="max-h-full max-w-full object-contain rounded-[2rem] transition-all duration-300" />
                  {project.images.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between px-4 md:px-6 pointer-events-none">
                      <button onClick={onPrev} disabled={currentImg === 0} className={`w-10 h-10 md:w-11 md:h-11 pointer-events-auto rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 transition-all ${currentImg === 0 ? "opacity-0" : "hover:bg-black/60 hover:scale-105 active:scale-95"}`}>
                        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </button>
                      <button onClick={onNext} disabled={currentImg === project.images.length - 1} className={`w-10 h-10 md:w-11 md:h-11 pointer-events-auto rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 transition-all ${currentImg === project.images.length - 1 ? "opacity-0" : "hover:bg-black/60 hover:scale-105 active:scale-95"}`}>
                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-10 shrink-0 bg-neutral-900">
                  <div className="flex justify-between items-start gap-8 mb-6">
                    <div className="flex-1">
                      <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary mb-2 block">{project.category}</span>
                      <h3 className="font-display text-4xl font-black uppercase tracking-tight text-white">{project.title}</h3>
                    </div>
                    <div className="flex gap-x-8 text-right font-mono text-[9px] uppercase tracking-widest text-primary/60">
                      <div>Sector <span className="block text-white text-[11px] font-body mt-1">{project.sector}</span></div>
                      <div>Year <span className="block text-white text-[11px] font-body mt-1">{project.year}</span></div>
                      <div>Role <span className="block text-white text-[11px] font-body mt-1 max-w-[110px]">{project.responsibility}</span></div>
                    </div>
                  </div>
                  <p className="text-neutral-400 font-body text-base leading-relaxed max-w-2xl">{project.description}</p>
                </div>
              </div>
            </motion.div>

            {/* Mobile Bottom Sheet Modal Content */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="md:hidden fixed bottom-0 left-0 right-0 z-[10001] bg-neutral-900 border-t border-white/10 rounded-t-[2.5rem] overflow-hidden pointer-events-auto will-change-transform"
              onClick={(e) => e.stopPropagation()}
              style={{ maxHeight: "94vh" }}
            >
              <div className="flex justify-center pt-4 pb-1"><div className="w-12 h-1.5 rounded-full bg-white/10" /></div>
              <div className="flex justify-between items-center px-6 py-4">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary">{project.category}</span>
                <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 transition-transform active:scale-95"><X className="w-4 h-4 text-white" /></button>
              </div>
              <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 px-6 py-2">
                {project.images.map((img, idx) => (
                  <div key={idx} className="min-w-[90%] aspect-[1.2/1] snap-center rounded-[2rem] overflow-hidden border border-white/5 relative bg-neutral-900/50">
                    {/* SKELETON LOADER FOR MOBILE GALLERY */}
                    <div className="absolute inset-0 z-10 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent bg-neutral-800/50" />
                    
                    <img 
                      src={img} 
                      alt="" 
                      decoding="async" 
                      loading="lazy"
                      onLoad={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.opacity = "1";
                        const sibling = target.previousElementSibling as HTMLDivElement;
                        if(sibling) sibling.style.display = "none";
                      }}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 ease-out z-20" 
                    />
                  </div>
                ))}
              </div>
              <div className="p-6 pb-12 overflow-y-auto hide-scrollbar max-h-[40vh] touch-pan-y">
                <h3 className="font-display text-4xl font-black uppercase tracking-tight text-white mb-4">{project.title}</h3>
                <p className="text-neutral-400 font-body text-base leading-relaxed mb-8">{project.description}</p>
                <div className="flex justify-between gap-4 font-mono text-[9px] tracking-wider uppercase border-t border-white/5 pt-6">
                  <div><span className="text-primary/60 block mb-1">Sector</span><span className="text-white">{project.sector}</span></div>
                  <div><span className="text-primary/60 block mb-1">Year</span><span className="text-white">{project.year}</span></div>
                  <div><span className="text-primary/60 block mb-1">Role</span><span className="text-white block max-w-[100px]">{project.responsibility}</span></div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ModalPortal>
  );
});

const PortfolioSection = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  
  const selected = projects.find(p => p.id === selectedId);
  const mobileGridRef = useRef<HTMLDivElement>(null);

  const onNext = useCallback(() => {
    if (selected && currentImgIndex < selected.images.length - 1) setCurrentImgIndex(prev => prev + 1);
  }, [selected, currentImgIndex]);

  const onPrev = useCallback(() => {
    if (currentImgIndex > 0) setCurrentImgIndex(prev => prev - 1);
  }, [currentImgIndex]);

  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = "hidden";
      setCurrentImgIndex(0);
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedId]);

  return (
    <section id="portfolio" className="py-20 md:py-32 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 md:px-12">
        <header className="mb-10 md:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <motion.span
              className="inline-block w-6 h-px bg-primary"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ originX: 0 }}
            />
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary label-mono">Portfolio</p>
          </div>
          <h2 className="font-display text-4xl md:text-7xl lg:text-[6rem] font-black uppercase tracking-tighter leading-[0.9] mb-6 flex flex-wrap gap-x-4">
            <span className="flex">
              {"Selected".split("").map((char, i) => (
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
              {"Works  ‎ ".split("").map((char, i) => (
                <motion.span
                  key={i}
                  custom={i + 8}
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
          <p className="text-muted-foreground font-body text-base md:text-lg max-w-lg">A curated selection of projects across branding, events, and digital design.</p>
        </header>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-12 gap-4">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} layout={desktopLayouts[i]} onClick={() => setSelectedId(p.id)} />
          ))}
        </div>

        {/* Mobile Grid */}
        <div ref={mobileGridRef} className="md:hidden space-y-3">
          <div className="flex gap-3">
            <ProjectCard mobile project={projects[0]} onClick={() => setSelectedId(projects[0].id)} layout={{ className: "flex-[1.4]", height: "h-[240px]" }} />
            <ProjectCard mobile project={projects[1]} onClick={() => setSelectedId(projects[1].id)} layout={{ className: "flex-1", height: "h-[240px]" }} />
          </div>
          <div className="flex gap-3">
            <ProjectCard mobile project={projects[2]} onClick={() => setSelectedId(projects[2].id)} layout={{ className: "flex-1", height: "h-[200px]" }} />
            <ProjectCard mobile project={projects[3]} onClick={() => setSelectedId(projects[3].id)} layout={{ className: "flex-[1.3]", height: "h-[200px]" }} />
          </div>
          <ProjectCard mobile project={projects[4]} onClick={() => setSelectedId(projects[4].id)} layout={{ height: "h-[220px]" }} />
          <div className="flex gap-3">
            <ProjectCard mobile project={projects[5]} onClick={() => setSelectedId(projects[5].id)} layout={{ className: "flex-[1.2]", height: "h-[220px]" }} />
            <ProjectCard mobile project={projects[6]} onClick={() => setSelectedId(projects[6].id)} layout={{ className: "flex-1", height: "h-[220px]" }} />
          </div>
          <ProjectCard mobile project={projects[7]} onClick={() => setSelectedId(projects[7].id)} layout={{ height: "h-[200px]" }} />
        </div>
      </div>

      <ProjectModal 
        project={selected}
        isOpen={selectedId !== null}
        onClose={() => setSelectedId(null)}
        currentImg={currentImgIndex}
        onNext={onNext}
        onPrev={onPrev}
      />
    </section>
  );
};

export default PortfolioSection;
