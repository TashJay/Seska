import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Play, Volume2, VolumeX, ShieldAlert, Sparkles } from "lucide-react";

const navLinks = [
  { label: "Story", href: "#story" },
  { label: "World", href: "#world" },
  { label: "Cars", href: "#cars" },
  { label: "Racers", href: "#racers" },
  { label: "Garages", href: "#garages" },
  { label: "Crew", href: "#crew" },
  { label: "Pre-Register", href: "#signup" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-ink-950/90 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between h-16 sm:h-20">
          {/* Logo — PNG mark + wordmark */}
          <a href="#" className="flex items-center gap-3 group" aria-label="IHENYA — home">
            <img
              src="/logo-ihenya.png"
              alt="IHENYA Racing"
              width={40}
              height={40}
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain transition-transform duration-500 group-hover:scale-110"
              style={{ filter: "drop-shadow(0 0 12px rgba(225,29,42,0.35))" }}
            />
            <div>
              <div className="font-display text-2xl sm:text-[28px] leading-none tracking-tight text-white group-hover:text-crimson transition-colors">
                IHENYA
              </div>
              <div className="font-mono text-[8px] sm:text-[9px] tracking-[0.35em] text-white/40 mt-1">
                RACING · 2047
              </div>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className="relative px-3 xl:px-4 py-2 group"
              >
                <span className="font-mono text-[10px] xl:text-[11px] tracking-[0.25em] text-white/60 group-hover:text-white transition-colors duration-300">
                  {String(i + 1).padStart(2, "0")} · {link.label.toUpperCase()}
                </span>
                <span className="absolute bottom-1 left-3 right-3 h-px bg-crimson scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </a>
            ))}
          </div>

          {/* Right CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#signup"
              className="flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-electric px-3 py-1.5 bg-ink-900 border border-electric/30 hover:border-electric transition-colors"
            >
              <span className="w-1.5 h-1.5 bg-electric rounded-full animate-pulse" />
              PRE-REG OPEN
            </a>

            <button
              onClick={() => setTrailerOpen(true)}
              className="group relative overflow-hidden border border-crimson/60 hover:border-crimson px-4 sm:px-5 py-2 sm:py-2.5 transition-all duration-300 bg-crimson/10 hover:bg-crimson"
            >
              <span className="relative flex items-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-white font-bold">
                TRAILER
                <Play size={10} className="fill-current text-white" />
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-white/80 hover:text-white focus:outline-none"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-ink-950/98 backdrop-blur-2xl border-b border-white/[0.08] overflow-hidden"
            >
              <div className="px-6 py-6 flex flex-col gap-4">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-mono text-xs tracking-[0.25em] text-white/70 hover:text-white py-1 flex items-center justify-between border-b border-white/[0.04]"
                  >
                    <span>{String(i + 1).padStart(2, "0")} · {link.label.toUpperCase()}</span>
                    <span className="text-crimson text-xs">→</span>
                  </motion.a>
                ))}

                <div className="pt-2 flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      setTrailerOpen(true);
                    }}
                    className="w-full py-3 bg-crimson font-mono text-xs tracking-[0.25em] font-bold text-white flex items-center justify-center gap-2"
                  >
                    <Play size={12} className="fill-current" /> WATCH OFFICIAL TRAILER
                  </button>

                  <a
                    href="#signup"
                    onClick={() => setMobileOpen(false)}
                    className="w-full py-3 text-center border border-electric/50 text-electric font-mono text-xs tracking-[0.25em] font-bold"
                  >
                    CLAIM CLEARANCE PASS
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Cinematic Teaser Trailer Modal */}
      <AnimatePresence>
        {trailerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ink-950/95 backdrop-blur-3xl flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-ink-900 border-2 border-crimson/50 shadow-[0_0_80px_rgba(225,29,42,0.4)] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between bg-ink-950 p-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-crimson animate-pulse" />
                  <span className="font-mono text-xs tracking-[0.3em] text-white uppercase font-bold">
                    IHENYA · TEASER REEL (4K / 60FPS)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSoundOn(!soundOn)}
                    className="text-white/60 hover:text-white p-1"
                    title={soundOn ? "Mute" : "Unmute"}
                  >
                    {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
                  </button>
                  <button
                    onClick={() => setTrailerOpen(false)}
                    className="text-white/60 hover:text-white p-1"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Simulated Cinematic Screen */}
              <div className="relative aspect-video bg-ink-950 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(225,29,42,0.25),transparent_70%)]" />
                <div className="absolute inset-0 grid-lines opacity-40" />

                <div className="relative z-10 text-center px-6 max-w-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-crimson/20 border border-crimson text-crimson font-mono text-[10px] tracking-[0.3em] mb-4">
                    <ShieldAlert size={12} /> CLASSIFIED NAIROBI FOOTAGE
                  </div>
                  <h3 className="head-xl text-3xl sm:text-5xl text-white mb-3">
                    TRANSPORT THE DRIVE.
                    <br />
                    <span className="text-electric">SURVIVE THE PURSUIT.</span>
                  </h3>
                  <p className="font-mono text-xs sm:text-sm text-white/60 leading-relaxed mb-6">
                    In 2047, Kenya is locked down by government decree. Only the fastest underground racers, mechanics, and spotters can breach the border.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <a
                      href="#signup"
                      onClick={() => setTrailerOpen(false)}
                      className="px-6 py-3 bg-crimson text-white font-mono text-xs tracking-[0.25em] font-bold hover:bg-crimson-deep transition-colors flex items-center gap-2"
                    >
                      <Sparkles size={14} /> JOIN CLOSED BETA
                    </a>
                    <button
                      onClick={() => setTrailerOpen(false)}
                      className="px-5 py-3 border border-white/20 text-white/80 hover:text-white font-mono text-xs tracking-[0.2em]"
                    >
                      CLOSE PREVIEW
                    </button>
                  </div>
                </div>

                {/* CRT Scanline effect */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-10"
                  style={{
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.8) 2px, rgba(0,0,0,0.8) 4px)",
                  }}
                />
              </div>

              {/* Modal Footer */}
              <div className="p-3 bg-ink-950 border-t border-white/10 flex items-center justify-between font-mono text-[9px] text-white/40">
                <span>RACING MULTIPLAYER · COMING SOON</span>
                <span className="text-crimson">CONFIDENTIAL</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
