import { motion } from "framer-motion";

const tools = [
  {
    name: "Photoshop",
    initial: "Ps",
    desc: "Raster editing & compositing",
    bgColor: "bg-[#001E36]/30",
    borderColor: "border-[#31A8FF]/15",
    iconBg: "bg-[#001E36]",
    iconBorder: "border-[#31A8FF]/60",
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
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Adobe_Lightroom_CC_2026_icon.svg/330px-Adobe_Lightroom_CC_2026_icon.svg.png",
  },
];

const ToolsSection = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background" />

      <div className="container mx-auto px-4 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-10 md:mb-16"
        >
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4">Arsenal</p>
          <h2 className="font-display text-4xl md:text-7xl font-black uppercase tracking-tighter">
            My <span className="text-gradient-orange italic font-display">Tools</span>
          </h2>
        </motion.div>

        {/* Desktop */}
        <div className="hidden lg:grid grid-cols-3 gap-5">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className={`group relative backdrop-blur-sm border ${tool.borderColor} hover:border-primary/30 transition-all duration-500 overflow-hidden ${
                i === 1 ? `${tool.bgColor} rounded-[2rem] p-10` : `${tool.bgColor} rounded-3xl p-8`
              }`}
            >
              <div className="flex items-start justify-between mb-8">
                <img src={tool.logoUrl} alt={tool.name} loading="lazy" className="w-12 h-12 md:w-16 md:h-16 will-change-transform"
                  onError={(e) => { e.currentTarget.style.display = 'none'; const f = e.currentTarget.nextElementSibling as HTMLElement; if (f) f.style.display = 'flex'; }}
                />
                <div className={`${tool.iconBg} border ${tool.iconBorder} rounded-2xl p-4 items-center justify-center hidden`}>
                  <span className="font-mono text-2xl font-bold text-foreground">{tool.initial}</span>
                </div>
                <span className="font-mono text-[10px] text-muted-foreground/40 tracking-wider">ADOBE</span>
              </div>
              <h3 className="font-display text-3xl font-black uppercase tracking-tight mb-2">{tool.name}</h3>
              <p className="text-sm text-muted-foreground font-body">{tool.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Tablet */}
        <div className="hidden md:grid lg:hidden grid-cols-3 gap-3">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`${tool.bgColor} backdrop-blur-sm border ${tool.borderColor} rounded-[1.5rem] p-5`}
            >
              <div className="flex items-center gap-3 mb-3">
                <img src={tool.logoUrl} alt={tool.name} loading="lazy" className="w-10 h-10" />
                <span className="font-mono text-[9px] text-muted-foreground/40 tracking-wider">ADOBE</span>
              </div>
              <h3 className="font-display text-xl font-black uppercase tracking-tight mb-1">{tool.name}</h3>
              <p className="text-xs text-muted-foreground font-body">{tool.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Mobile */}
        <div className="md:hidden space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`${tools[0].bgColor} backdrop-blur-sm border ${tools[0].borderColor} rounded-[1.5rem] p-5`}
          >
            <div className="flex items-center gap-4">
              <img src={tools[0].logoUrl} alt={tools[0].name} loading="lazy" className="w-12 h-12" />
              <div>
                <h3 className="font-display text-xl font-black uppercase tracking-tight">{tools[0].name}</h3>
                <p className="text-[11px] text-muted-foreground font-body">{tools[0].desc}</p>
              </div>
            </div>
          </motion.div>

          <div className="flex gap-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`flex-[1.3] ${tools[1].bgColor} backdrop-blur-sm border ${tools[1].borderColor} rounded-[1.3rem] p-4`}
            >
              <img src={tools[1].logoUrl} alt={tools[1].name} loading="lazy" className="w-10 h-10 mb-3" />
              <h3 className="font-display text-lg font-black uppercase tracking-tight">{tools[1].name}</h3>
              <p className="text-[10px] text-muted-foreground font-body mt-1">{tools[1].desc}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`flex-1 ${tools[2].bgColor} backdrop-blur-sm border ${tools[2].borderColor} rounded-[1.5rem] p-4 flex flex-col items-center justify-center text-center`}
            >
              <img src={tools[2].logoUrl} alt={tools[2].name} loading="lazy" className="w-10 h-10 mb-2" />
              <h3 className="font-display text-lg font-black uppercase tracking-tight">{tools[2].name}</h3>
            </motion.div>
          </div>
        </div>

        {/* Marquee: moved to between tools and portfolio naturally */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-16 md:mt-24 border-t border-b border-border/30 py-4 md:py-6 overflow-hidden"
        >
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 md:gap-12 whitespace-nowrap font-display text-2xl md:text-5xl font-black uppercase tracking-tighter text-foreground/[0.1]"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="flex items-center gap-8 md:gap-12">
                PIXELS WITH PURPOSE
                <span className="text-primary/20">✦</span>
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ToolsSection;
