import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { assets } from "../assets";

const headlines = [
  { text: "Unknown racer flips police interceptor on Thika Superhighway", pts: 3200, location: "THIKA EXPWY" },
  { text: "High-speed chase through Kileleshwa — 12 convoy cars evaded", pts: 4100, location: "KILELESHWA" },
  { text: "Mystery Subaru drifts around Uhuru Gardens roundabout", pts: 2500, location: "LANG'ATA RD" },
  { text: "Bridge-jump in Kisumu goes viral · #IhenyaMorans trends #1", pts: 5800, location: "KISUMU BYPASS" },
];

export default function NewsStuntsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const carX = useTransform(smooth, [0, 1], ["-20%", "20%"]);
  const carRotate = useTransform(smooth, [0, 1], [-6, 6]);
  const tvScale = useTransform(smooth, [0, 0.5, 1], [0.94, 1, 0.96]);

  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % headlines.length), 3800);
    return () => clearInterval(t);
  }, []);

  const h = headlines[idx];

  return (
    <section ref={ref} className="relative py-28 sm:py-36 lg:py-44 overflow-hidden bg-ink-950">
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* TV/News screen */}
        <motion.div
          style={{ scale: tvScale }}
          className="lg:col-span-7 relative"
        >
          <div className="relative bg-ink-900 border border-white/[0.1] shadow-[0_30px_70px_rgba(0,0,0,0.7)]">
            {/* Broadcast bar */}
            <div className="flex items-center justify-between bg-crimson px-3 sm:px-4 py-2 relative z-20">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-white font-bold">
                  LIVE · KBC NEWS SPECIAL REPORT
                </span>
              </div>
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-white/80">
                {h.location}
              </span>
            </div>

            {/* Screen content with racing car */}
            <div className="relative aspect-video bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 overflow-hidden">
              <div className="absolute inset-0 speed-lines opacity-40" />

              {/* Car footage */}
              <motion.img
                style={{ x: carX, rotate: carRotate }}
                src={assets.cars.hero}
                alt="Race footage"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover scale-110"
              />
              <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 80px 25px rgba(8,7,12,0.9)" }} />

              {/* Explosion/boost glow */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blaze/30 blur-[80px] rounded-full pointer-events-none" />

              {/* CRT scanlines */}
              <div
                className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.6) 2px, rgba(0,0,0,0.6) 4px)",
                }}
              />

              {/* News ticker overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink-950 via-ink-950/95 to-transparent p-3 sm:p-5 pt-12 z-10">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="bg-crimson px-2.5 py-0.5 text-[8px] sm:text-[9px] font-mono tracking-[0.2em] text-white font-bold uppercase">
                    BREAKING BROADCAST
                  </span>
                  <span className="font-mono text-[9px] text-white/50">INTERCEPT IN PROGRESS</span>
                </div>

                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white text-xs sm:text-sm md:text-base font-body leading-snug max-w-lg font-medium"
                >
                  {h.text}
                </motion.p>

                <div className="flex items-center gap-3 sm:gap-4 mt-2 sm:mt-3 pt-2 border-t border-white/10">
                  <span className="font-mono text-[9px] sm:text-[10px] text-white/50">
                    STUNT MULTIPLIER:
                  </span>
                  <motion.span
                    key={h.pts}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="font-display text-xl sm:text-2xl text-electric font-bold"
                  >
                    +{h.pts.toLocaleString()} PTS
                  </motion.span>
                </div>
              </div>

              {/* Broadcast corner crosshairs */}
              <div className="absolute top-8 left-3 w-4 h-4 border-l border-t border-white/30" />
              <div className="absolute top-8 right-3 w-4 h-4 border-r border-t border-white/30" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-l border-b border-white/30 hidden sm:block" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-white/30 hidden sm:block" />
            </div>
          </div>
        </motion.div>

        {/* Right text copy */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-blaze" />
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.35em] text-blaze uppercase font-bold">
              SPLIT-SCREEN BROADCAST
            </span>
          </div>
          <h2 className="head-xl text-3xl sm:text-5xl lg:text-6xl text-white mb-4 sm:mb-6">
            Your stunts.
            <br />
            Their news.
            <br />
            <span className="text-electric text-glow-electric">Your underworld rep.</span>
          </h2>
          <div className="space-y-3 sm:space-y-4 text-white/65 text-xs sm:text-sm lg:text-base leading-relaxed max-w-md mb-6 sm:mb-8 font-body">
            <p>
              Pull off high-risk maneuvers during high-speed police chases and watch the screen split to a live KBC news cutaway showing your driving in real time.
            </p>
            <p>
              Bridge leaps, near misses, and drift chains stack bonus bounty points that cash out at allied underground garages.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {["BARREL ROLL", "DRIFT CHAIN", "NEAR MISS", "BRIDGE JUMP", "MATATU ESCAPE"].map((t) => (
              <span
                key={t}
                className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-white/50 border border-white/[0.08] hover:border-blaze/50 hover:text-white px-3 py-1.5 transition-all duration-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
