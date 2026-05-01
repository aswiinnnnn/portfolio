import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { useEffect } from "react";
import { FaWhatsapp, FaInstagram, FaPhone, FaEnvelope } from "react-icons/fa";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

const contactOptions = [
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    subtitle: "Quick chat on WhatsApp",
    href: "https://wa.me/918848532354?text=Hi%20Ashwin!%20I%20visited%20your%20portfolio%20and%20I%E2%80%99d%20like%20to%20discuss%20a%20project%20with%20you.",
    color: "from-grey-500/20 to-emerald-500/20",
    borderColor: "hover:border-green-500/40",
  },
  {
    icon: FaEnvelope,
    label: "Email",
    subtitle: "ashwinrajkc@gmail.com",
    href: "mailto:ashwinrajkc@gmail.com?subject=Project%20Inquiry&body=Hello%20Ashwin,%0A%0AI%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20potential%20project.%0A%0APlease%20let%20me%20know%20your%20availability.%0A%0AThank%20you,",
    color: "from-grey-500/20 to-orange-500/20",
    borderColor: "hover:border-orange-500/40",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    subtitle: "@aswiin.n_",
    href: "https://www.instagram.com/aswiin.n_",
    color: "from-grey-500/20 to-grey-500/100",
    borderColor: "hover:border-pink-500/40",
  },
  {
    icon: FaPhone,
    label: "Call Me",
    subtitle: "+91 88485 32354",
    href: "tel:+918848532354",
    color: "from-grey-500/20 to-cyan-500/20",
    borderColor: "hover:border-blue-500/40",
  },
];

const ContactModal = ({ open, onClose }: ContactModalProps) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-xl"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-md pointer-events-auto bg-card/90 backdrop-blur-2xl border border-border/40 rounded-3xl p-6 md:p-8 shadow-[0_24px_80px_-16px_hsl(0_72%_51%/0.2)]">
              {/* Close */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-foreground/5 border border-border/30 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </motion.button>

              {/* Header */}
              <div className="mb-6">
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary mb-2">Connect with me</p>
                <h3 className="font-display text-2xl md:text-3xl font-black tracking-tight leading-tight">
                  How would you like<br />
                  <span className="text-gradient-orange italic">to reach out?</span>
                </h3>
              </div>

              {/* Options */}
              <div className="flex flex-col gap-2.5">
                {contactOptions.map((opt, i) => (
                  <motion.a
                    key={opt.label}
                    href={opt.href}
                    target={opt.label === "Instagram" ? "_blank" : undefined}
                    rel={opt.label === "Instagram" ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.4 }}
                    className={`group flex items-center justify-between p-4 rounded-2xl border border-border bg-gradient-to-r ${opt.color} backdrop-blur-sm ${opt.borderColor} transition-all duration-300 hover:shadow-lg`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-foreground/5 border border-border/60 flex items-center justify-center">
                        <opt.icon className="w-4.5 h-4.5 text-foreground/80 group-hover:text-foreground transition-colors" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground font-body">{opt.label}</p>
                        <p className="text-[11px] text-muted-foreground font-mono">{opt.subtitle}</p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary group-hover:rotate-45 transition-all duration-300 shrink-0" />
                  </motion.a>
                ))}
              </div>

              {/* Footer hint */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-5 text-center font-mono text-[10px] text-muted-foreground/40 tracking-wider uppercase"
              >
                I typically respond within 24 hours
              </motion.p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
