import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import SpeedGauge from "./SpeedGauge";
import Car3D from "./three/Car3D";

/**
 * HeroSection — cinematic opening screen.
 *
 * The 3D car uses <Car3D />. To swap in a real GLB:
 *   <Car3D glbUrl="/models/hero-car.glb" color="#e11d2a" />
 * Otherwise a procedural fallback renders automatically.
 */

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 28, mass: 0.5 });

  // Parallax
  const textY = useTransform(smooth, [0, 1], [0, -80]);
  const textOpacity = useTransform(smooth, [0, 0.65], [1, 0]);
  const carOpacity = useTransform(smooth, [0, 0.8], [1, 0]);
  const speedProg = useTransform(smooth, [0, 1], [0.15, 0.9]);

  return (
    <section
      ref={ref}
      id="story"
      className="relative min-h-[100vh] flex items-center overflow-hidden bg-ink-950 pt-32 pb-24 lg:py-0"
    >
      {/* Base gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950 pointer-events-none" />

      {/* Ambient tinted glow */}
      <div
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 65% 45%, rgba(225,29,42,0.16), transparent 70%)",
        }}
      />

      {/* Warm horizon dust */}
      <div
        className="absolute inset-x-0 bottom-0 h-96 opacity-25 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 40% at 50% 100%, rgba(245,158,11,0.1), transparent 70%)",
        }}
      />

      {/* Racing perspective floor grid */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 z-[1] pointer-events-none opacity-30">
        <div
          className="w-full h-full"
          style={{
            background: `
              linear-gradient(to top, rgba(225,29,42,0.06), transparent 70%),
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "100% 100%, 70px 70px, 70px 70px",
            maskImage: "linear-gradient(to top, black 20%, transparent 85%)",
            WebkitMaskImage: "linear-gradient(to top, black 20%, transparent 85%)",
            transform: "perspective(600px) rotateX(60deg)",
            transformOrigin: "center bottom",
          }}
        />
      </div>

      {/* Editorial grid container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-center">

          {/* Left: Copy with generous negative space */}
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="lg:col-span-7 flex flex-col justify-center space-y-10 lg:space-y-12"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex items-center gap-4"
            >
              <div className="h-px w-10 bg-crimson" />
              <span className="font-mono text-xs tracking-[0.35em] text-crimson uppercase font-semibold">
                KENYA, 2047 · NATIONWIDE LOCKDOWN
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="head-xl text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight leading-[0.92]"
            >
              The Country
              <br />
              <span className="text-stroke-white">Stopped</span>
              <br />
              <span className="relative inline-block text-crimson text-glow-crimson">
                Moving.
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="absolute -bottom-2 left-0 right-0 h-[5px] bg-crimson origin-left"
                />
              </span>
            </motion.h1>

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.9 }}
              className="text-white/60 text-base sm:text-lg leading-[1.75] max-w-xl font-body"
            >
              Corruption consumed every system. The government locked the nation down until the Anonymous Morans hard drive is found and destroyed.
              <span className="block mt-3 text-white/90 font-medium">
                Some truths were never meant to stay buried.
              </span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-wrap items-center gap-4 sm:gap-5"
            >
              <a
                href="#signup"
                className="group relative overflow-hidden bg-crimson px-8 py-4 font-mono text-xs tracking-[0.25em] font-bold text-white shadow-[0_0_30px_rgba(225,29,42,0.5)] transition-all duration-300"
              >
                <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 flex items-center gap-2 group-hover:text-ink-950 transition-colors">
                  JOIN THE RESISTANCE
                  <Sparkles size={14} />
                </span>
              </a>

              <a
                href="#cars"
                className="group flex items-center gap-3 px-6 py-4 font-mono text-xs tracking-[0.2em] text-white/70 hover:text-white border border-white/15 hover:border-white/40 transition-all duration-300"
              >
                <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
                VIEW VEHICLE VAULT
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-white/[0.08] max-w-lg"
            >
              <div>
                <div className="head-xl text-3xl sm:text-4xl text-white">47</div>
                <div className="font-mono text-[10px] tracking-[0.2em] text-white/40 mt-2 uppercase">
                  Accounts Exposed
                </div>
              </div>
              <div>
                <div className="head-xl text-3xl sm:text-4xl text-crimson font-bold">01</div>
                <div className="font-mono text-[10px] tracking-[0.2em] text-white/40 mt-2 uppercase">
                  Drive to Deliver
                </div>
              </div>
              <div>
                <div className="head-xl text-3xl sm:text-4xl text-white">47K</div>
                <div className="font-mono text-[10px] tracking-[0.2em] text-white/40 mt-2 uppercase">
                  Registered Morans
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: True 3D Car (GLB-ready) + subtle single gauge */}
          <motion.div
            style={{ opacity: carOpacity }}
            className="lg:col-span-5 relative flex flex-col items-center justify-center gap-6"
          >
            {/* 3D Car stage — swap glbUrl to load real GLB */}
            <div className="relative w-full aspect-square max-h-[480px]">
              {/* Ambient rim glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="w-[70%] h-[55%] rounded-full aura-pulse"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(225,29,42,0.35), transparent 65%)",
                    filter: "blur(50px)",
                  }}
                />
              </div>

              <Car3D
                color="#e11d2a"
                autoSpin={true}
                cameraPosition={[4.5, 2, 5.5]}
                className="w-full h-full relative"
                // To use a real GLB: glbUrl="/models/hero-car.glb"
              />

              {/* "3D LIVE" indicator */}
              <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 bg-ink-950/80 backdrop-blur border border-white/10 pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
                <span className="font-mono text-[9px] tracking-[0.3em] text-white/70 uppercase">
                  3D · Live Preview
                </span>
              </div>
            </div>

            {/* Single, subtle speed gauge */}
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 bg-ink-900/80 backdrop-blur-xl border border-white/[0.08] shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
                <SpeedGauge progress={speedProg} size={140} label="LIVE SPEED" max={320} unit="KM/H" />
              </div>
              <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] text-white/40 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
                Telemetry synchronized
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none"
      >
        <span className="font-mono text-[9px] tracking-[0.35em] text-white/40 uppercase">
          Scroll to uncover
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={14} className="text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
