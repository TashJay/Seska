import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, MotionValue } from "framer-motion";
import { useRef, useState } from "react";
import SpeedGauge from "./SpeedGauge";

const beats = [
  {
    kicker: "01 · HIGH SPEED PURSUIT",
    title: "Outrun",
    sub: "The Police & Rogue Units.",
    body: "Every checkpoint. Every interceptor. Corrupt oligarchs bought their tactical forces — your pedal is the only reply that matters.",
    color: "#e11d2a",
    stat: "240+ KM/H ESCAPES",
  },
  {
    kicker: "02 · LIVE HEADLINES",
    title: "Broadcast",
    sub: "Every Wild Stunt.",
    body: "Pull a barrel roll or bridge leap and watch the split-screen cut straight to breaking live KBC news. The crazier the stunt, the higher the underworld payout.",
    color: "#ff6b1a",
    stat: "+5,000 BOUNTY PTS",
  },
  {
    kicker: "03 · UNDERGROUND UPGRADES",
    title: "Modify",
    sub: "At Allied Garages.",
    body: "Soda Baridi, Mufasa, Chemi Chemi — each shop specializes in weapons, ECU decoders, cryo-intercooling, and custom bodywork.",
    color: "#22d3ee",
    stat: "200+ CRAFTABLE PARTS",
  },
  {
    kicker: "04 · MULTIPLAYER ASSIST",
    title: "Vanish",
    sub: "Into the Matatu Swarm.",
    body: "Allied matatu crews and spotters deploy smoke, block police cruisers, and cool down your wanted level in mobile safehouses across Kenya.",
    color: "#ffd21a",
    stat: "5 MULTIPLAYER ROLES",
  },
  {
    kicker: "05 · FINAL BORDER RUN",
    title: "Deliver",
    sub: "The Classified Drive.",
    body: "Breach the final border gate. Hand the Anonymous Morans hard drive to the international tribunal. Expose the corrupt, recover the billions.",
    color: "#10b981",
    stat: "47 ACCOUNTS EXPOSED",
  },
];

function Beat({
  index,
  total,
  smooth,
  beat,
}: {
  index: number;
  total: number;
  smooth: MotionValue<number>;
  beat: typeof beats[number];
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const mid = (start + end) / 2;

  const opacity = useTransform(smooth, [start, mid - 0.04, mid + 0.04, end], [0, 1, 1, 0]);
  const y = useTransform(smooth, [start, end], [50, -50]);
  const scale = useTransform(smooth, [start, mid, end], [0.93, 1, 0.96]);

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-8 sm:gap-12 items-center pt-12 sm:pt-0 px-6 sm:px-8 lg:px-12">
        <div className="lg:col-span-4 relative">
          <div className="relative">
            <span
              className="head-xl text-[24vw] sm:text-[20vw] lg:text-[18vw] leading-none block"
              style={{ color: beat.color, opacity: 0.9 }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className="head-xl text-[24vw] sm:text-[20vw] lg:text-[18vw] leading-none block absolute inset-0 text-stroke-white opacity-30"
              style={{ transform: "translate(4px, 4px)" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div
            className="font-mono text-[9px] sm:text-xs tracking-[0.35em] mb-2 sm:mb-4 uppercase"
            style={{ color: beat.color }}
          >
            {beat.kicker}
          </div>
          <h4 className="head-xl text-3xl sm:text-5xl lg:text-7xl text-white">
            {beat.title}
            <br />
            <span style={{ color: beat.color, textShadow: `0 0 25px ${beat.color}66` }}>
              {beat.sub}
            </span>
          </h4>
          <p className="text-white/65 text-xs sm:text-base lg:text-lg leading-relaxed max-w-xl mt-3 sm:mt-5 font-body">
            {beat.body}
          </p>
          <div className="flex items-center gap-4 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/[0.08]">
            <span
              className="font-mono text-[10px] sm:text-xs tracking-[0.25em] font-bold"
              style={{ color: beat.color }}
            >
              {beat.stat}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function RailItem({
  index,
  total,
  smooth,
  color,
}: {
  index: number;
  total: number;
  smooth: MotionValue<number>;
  color: string;
}) {
  const step = 1 / total;
  const opacity = useTransform(
    smooth,
    [Math.max(0, index * step - 0.05), index * step, (index + 1) * step, Math.min(1, (index + 1) * step + 0.05)],
    [0.2, 1, 1, 0.2]
  );
  return (
    <div className="flex items-center gap-2">
      <motion.span
        style={{ opacity }}
        className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] text-white/70"
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>
      <motion.div style={{ opacity, background: color }} className="w-5 sm:w-8 h-px" />
    </div>
  );
}

export default function GameplaySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const rpm = useTransform(smooth, (v) => {
    const gears = 6;
    const inGear = (v * gears) % 1;
    return 0.25 + inGear * 0.7;
  });

  const [gearDisplay, setGearDisplay] = useState("1");
  useMotionValueEvent(smooth, "change", (v) => {
    const g = Math.min(6, Math.max(1, Math.floor(v * 6) + 1));
    setGearDisplay(String(g));
  });

  return (
    <section
      ref={ref}
      className="relative bg-ink-950"
      style={{ height: `${beats.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950" />
        <div
          className="absolute inset-0 opacity-15 speed-lines pointer-events-none"
          style={{
            maskImage: "linear-gradient(to right, transparent, black, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black, transparent)",
          }}
        />

        {/* Progress rail */}
        <div className="absolute right-3 sm:right-6 lg:right-10 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2 sm:gap-3">
          {beats.map((b, i) => (
            <RailItem key={i} index={i} total={beats.length} smooth={smooth} color={b.color} />
          ))}
        </div>

        {/* Section eyebrow */}
        <div className="absolute top-16 sm:top-20 lg:top-24 left-4 sm:left-6 lg:left-10 z-20">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 sm:w-10 bg-crimson" />
            <span className="font-mono text-[9px] sm:text-xs tracking-[0.35em] text-crimson uppercase font-bold">
              EVERY RIDE IS A FIGHT
            </span>
          </div>
          <h3 className="head-xl text-2xl sm:text-4xl lg:text-5xl text-white mt-1 sm:mt-2">
            The Rules of the Run.
          </h3>
        </div>

        {beats.map((b, i) => (
          <Beat key={i} index={i} total={beats.length} smooth={smooth} beat={b} />
        ))}

        {/* Scroll-reactive gauge cluster */}
        <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-6 lg:left-10 z-30 flex items-end gap-2 sm:gap-3">
          <div className="bg-ink-900/80 backdrop-blur-xl border border-white/[0.08] p-1.5 sm:p-2">
            <SpeedGauge progress={smooth} size={110} label="SPEED" max={320} unit="KM/H" />
          </div>
          <div className="bg-ink-900/80 backdrop-blur-xl border border-white/[0.08] p-1.5 sm:p-2 hidden sm:block">
            <SpeedGauge progress={rpm} size={90} label="RPM" max={9} unit="X1000" />
          </div>
          <div className="bg-ink-900/80 backdrop-blur-xl border border-white/[0.08] px-3 py-2 hidden md:block">
            <div className="font-mono text-[8px] tracking-[0.25em] text-white/40 mb-0.5">GEAR</div>
            <motion.div className="head-xl text-3xl sm:text-4xl text-crimson leading-none font-bold">
              {gearDisplay}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
