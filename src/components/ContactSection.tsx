import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, ArrowUpRight } from "lucide-react";
import ContactModal from "./ContactModal";
import { FaWhatsapp } from "react-icons/fa";

const contactLinks = [
  { icon: FaWhatsapp, label: "WhatsApp", value: "+91 88485 32354", href: "https://wa.me/918848532354?text=Hi%20Ashwin!%20I%20visited%20your%20portfolio%20and%20I%E2%80%99d%20like%20to%20discuss%20a%20project%20with%20you." },
  { icon: Mail, label: "Email", value: "ashwinrajkc@gmail.com", href: "mailto:ashwinrajkc@gmail.com?subject=Project%20Inquiry&body=Hello%20Ashwin,%0A%0AI%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20potential%20project.%0A%0APlease%20let%20me%20know%20your%20availability.%0A%0AThank%20you," },
  { icon: Phone, label: "Phone", value: "+91 88485 32354", href: "tel:+918848532354" },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/ashwin-raj-k-c", href: "https://www.linkedin.com/in/ashwin-raj-k-c" },
];

const headingWords = ["Let's", "make"];
const headingOrangeWords = ["something", "bold"];

const wordVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] as any },
  }),
};

const ContactSection = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section id="contact" className="pt-20 md:pt-32 pb-6 md:pb-10 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid md:grid-cols-12 gap-8 md:gap-16">
          {/* Left: big heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="md:col-span-7"
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
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary label-mono">Get in touch</p>
            </div>

            {/* Word-by-word heading */}
            <h2 className="font-display text-4xl md:text-7xl lg:text-[5.5rem] font-black uppercase tracking-tighter leading-[0.9] mb-6 md:mb-8">
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
              <span className="block overflow-hidden text-gradient-animated italic font-display normal-case pb-1">
                {headingOrangeWords.map((word, i) => (
                  <motion.span
                    key={word}
                    custom={i + headingWords.length}
                    variants={wordVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="inline-block mr-3"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-muted-foreground leading-relaxed max-w-md font-body text-base md:text-lg"
            >
              Have a project in mind? Whether it's a brand identity, event graphics, or packaging, I'm ready to bring your vision to life.
            </motion.p>

            {/* CTA button with glow */}
            <motion.button
              onClick={() => setContactOpen(true)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="group inline-flex items-center gap-3 mt-8 md:mt-10 bg-primary/90 backdrop-blur-sm text-primary-foreground px-6 md:px-8 py-3 md:py-4 rounded-2xl font-mono text-xs md:text-sm tracking-[0.15em] uppercase hover:bg-primary transition-all hover:shadow-[0_0_40px_hsl(0_72%_51%/0.5)] btn-glow relative overflow-hidden"
            >
              Start a Project
              <span className="group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </motion.button>
          </motion.div>

          {/* Right — contact links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-5 flex flex-col gap-3"
          >
            {contactLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                whileHover={{ x: 4, boxShadow: "0 0 25px hsl(14 100% 49% / 0.15)" }}
                className={`group flex items-center justify-between backdrop-blur-sm border border-border/30 hover:border-primary/30 transition-all duration-300 ${
                  i === 0
                    ? "bg-primary/[0.06] rounded-2xl p-4 md:p-6"
                    : "bg-foreground/[0.03] rounded-xl p-3.5 md:p-5"
                }`}
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <div
                    className={`flex items-center justify-center ${
                      i === 0 ? "w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10" : "w-8 h-8 md:w-10 md:h-10 rounded-lg bg-foreground/5"
                    }`}
                  >
                    <link.icon className={`text-primary ${i === 0 ? "w-4 h-4 md:w-5 md:h-5" : "w-3.5 h-3.5 md:w-4 md:h-4"}`} />
                  </div>
                  <div>
                    <p className="font-mono text-[9px] md:text-[10px] text-muted-foreground/60 tracking-wider uppercase">{link.label}</p>
                    <p className="text-foreground font-body text-xs md:text-sm">{link.value}</p>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-muted-foreground/40 group-hover:text-primary group-hover:rotate-45 transition-all duration-300 shrink-0" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-16 md:mt-24 pt-6 border-t border-border/30"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="font-display text-3xl md:text-4xl font-black text-foreground tracking-tight">
                A<span className="text-primary">.</span>
              </span>
              <div className="w-px h-8 bg-border/30" />
              <p className="font-mono text-[10px] md:text-[11px] text-muted-foreground/50 tracking-wider uppercase leading-tight">
                Designed with<br />precision & passion
              </p>
            </div>

            <div className="flex items-center gap-4 md:gap-6">
              <div className="flex items-center gap-2">
                <motion.span
                  className="w-2 h-2 rounded-full bg-green-500"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                <span className="font-mono text-[10px] md:text-[11px] text-muted-foreground/60 tracking-wider uppercase">
                  Available for work
                </span>
              </div>
            </div>
          </div>

          {/* Large footer text */}
          <div className="mt-4 overflow-hidden -mb-2">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="font-display text-[3rem] md:text-[5rem] lg:text-[8rem] font-black uppercase tracking-tighter leading-[0.85] text-foreground/[0.05] select-none"
            >
              Let's Create Together
            </motion.p>
          </div>
        </motion.div>
      </div>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  );
};

export default ContactSection;
