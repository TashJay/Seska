import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { Flag, Wrench, ShieldAlert, Home, Radio, MapPin, TrendingUp } from "lucide-react";

/**
 * WorldMapSection — dark tactical briefing map interlude.
 * Cinematic dark background with electric blue routes/waypoints and
 * red-alert danger pins. Everything animated in-place with framer-motion.
 */

type PinType = "start" | "end" | "safehouse" | "checkpoint" | "garage";

interface MapPin {
  id: string;
  x: number;
  y: number;
  type: PinType;
  label: string;
  sub?: string;
}

const pins: MapPin[] = [
  { id: "nairobi", x: 62, y: 60, type: "start", label: "NAIROBI", sub: "MISSION START" },
  { id: "nakuru", x: 50, y: 48, type: "safehouse", label: "NAKURU", sub: "SAFEHOUSE ALPHA" },
  { id: "kericho", x: 41, y: 55, type: "garage", label: "KERICHO", sub: "MUFASA GARAGE" },
  { id: "kisumu", x: 30, y: 48, type: "safehouse", label: "KISUMU", sub: "MATATU CREW HQ" },
  { id: "eldoret", x: 36, y: 36, type: "garage", label: "ELDORET", sub: "CHEMI CHEMI LAB" },
  { id: "malaba", x: 22, y: 30, type: "end", label: "MALABA BORDER", sub: "DELIVERY POINT" },
  { id: "namanga", x: 62, y: 84, type: "checkpoint", label: "NAMANGA", sub: "GOV CHECKPOINT" },
  { id: "mombasa", x: 86, y: 78, type: "checkpoint", label: "MOMBASA", sub: "PORT SECURED" },
  { id: "garissa", x: 82, y: 55, type: "checkpoint", label: "GARISSA", sub: "MILITARY ZONE" },
];

const routePath = "M 62,60 L 50,48 L 41,55 L 30,48 L 36,36 L 22,30";

const pinColors: Record<PinType, string> = {
  start: "#22d3ee",       // cyan — mission origin
  end: "#22d3ee",         // cyan — destination
  safehouse: "#3b82f6",   // blue — allied checkpoint
  checkpoint: "#e11d2a",  // red — danger
  garage: "#22d3ee",      // cyan — allied garage
};

const pinIcons: Record<PinType, typeof Flag> = {
  start: Flag,
  end: Flag,
  safehouse: Home,
  checkpoint: ShieldAlert,
  garage: Wrench,
};

const pinLabels: Record<PinType, string> = {
  start: "MISSION START",
  end: "DELIVERY POINT",
  safehouse: "ALLIED SAFEHOUSE",
  checkpoint: "HOSTILE CHECKPOINT",
  garage: "TUNING GARAGE",
};

export default function WorldMapSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [activePin, setActivePin] = useState<string | null>("malaba");

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });

  const routeProgress = useTransform(smooth, [0.2, 0.65], [0, 1]);
  const carProgress = useTransform(smooth, [0.15, 0.85], [0, 1]);
  const eyebrowY = useTransform(smooth, [0, 1], [30, -30]);

  const legend: { type: PinType }[] = [
    { type: "start" },
    { type: "safehouse" },
    { type: "garage" },
    { type: "checkpoint" },
    { type: "end" },
  ];

  const selected = pins.find((p) => p.id === activePin);

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink-950">
      {/* Dark section with subtle blue ambient */}
      <div className="relative py-28 sm:py-36 lg:py-44">
        {/* Subtle blue ambient wash across the map */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 45% 55%, rgba(59,130,246,0.10), transparent 70%)",
          }}
        />
        {/* Second ambient hint of red danger */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 40% 40% at 80% 40%, rgba(225,29,42,0.09), transparent 70%)",
          }}
        />

        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section header */}
          <motion.div style={{ y: eyebrowY }} className="mb-14 lg:mb-20 max-w-3xl">
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-10 bg-neon" />
              <span className="font-mono text-xs tracking-[0.35em] text-neon uppercase font-bold">
                CLASSIFIED · TACTICAL BRIEFING · LIVE MAP
              </span>
            </div>

            <h2 className="head-xl text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-[0.9] tracking-tight mb-8">
              The Route to
              <br />
              <span className="text-neon">Freedom</span>
              <span className="text-white">.</span>
            </h2>

            <p className="text-white/60 text-base sm:text-lg leading-[1.75] max-w-2xl font-body">
              From <strong className="text-white">Nairobi Underground HQ</strong> to the{" "}
              <strong className="text-white">Malaba Border Crossing</strong> — 512km across sealed highways, rogue checkpoints, and allied safehouses. Every pin is a decision.
            </p>
          </motion.div>

          {/* Main content grid */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">

            {/* Left / Center: The map canvas */}
            <div className="lg:col-span-8">
              <div className="relative aspect-[4/3] bg-ink-900 border border-white/[0.06] shadow-[0_30px_80px_rgba(0,0,0,0.7)] overflow-hidden">
                {/* Subtle grid on map */}
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />

                {/* Ambient wash */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at 40% 45%, rgba(59,130,246,0.10), transparent 70%)",
                  }}
                />

                {/* Compass rose top-right */}
                <div className="absolute top-4 right-4 z-20 flex flex-col items-center opacity-60">
                  <div className="font-mono text-[9px] tracking-widest text-neon font-bold">N</div>
                  <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center my-0.5 bg-ink-950/60">
                    <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[9px] border-b-crimson" />
                  </div>
                </div>

                {/* Scale bar bottom-left */}
                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 opacity-70">
                  <div className="flex items-center h-1 border-l border-r border-white/30">
                    <div className="w-6 h-1 bg-white/25" />
                    <div className="w-6 h-1 border-t border-b border-white/25" />
                    <div className="w-6 h-1 bg-white/25" />
                  </div>
                  <span className="font-mono text-[9px] text-white/50 tracking-widest">100 KM</span>
                </div>

                {/* Kenya map SVG */}
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 w-full h-full"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Country outline */}
                  <path
                    d="M 16 22
                       L 24 16
                       L 38 12
                       L 52 11
                       L 66 14
                       L 74 20
                       L 80 28
                       L 84 36
                       L 87 48
                       L 90 58
                       L 92 68
                       L 90 74
                       L 84 76
                       L 76 84
                       L 62 88
                       L 48 88
                       L 38 84
                       L 30 80
                       L 22 72
                       L 16 62
                       L 12 50
                       L 10 38
                       L 12 28 Z"
                    fill="rgba(59, 130, 246, 0.04)"
                    stroke="rgba(59, 130, 246, 0.5)"
                    strokeWidth="0.35"
                    strokeDasharray="1 0.6"
                  />

                  {/* Lake Victoria */}
                  <ellipse
                    cx="22"
                    cy="54"
                    rx="6"
                    ry="5"
                    fill="rgba(59, 130, 246, 0.12)"
                    stroke="rgba(34, 211, 238, 0.6)"
                    strokeWidth="0.25"
                  />
                  <text
                    x="22"
                    y="55.5"
                    textAnchor="middle"
                    fontSize="1.4"
                    fill="rgba(34, 211, 238, 0.7)"
                    fontFamily="monospace"
                    fontWeight="600"
                  >
                    LAKE VICTORIA
                  </text>

                  <text
                    x="82"
                    y="82"
                    fontSize="1.4"
                    fill="rgba(59, 130, 246, 0.55)"
                    fontFamily="monospace"
                    letterSpacing="0.2"
                    fontWeight="600"
                  >
                    INDIAN OCEAN
                  </text>

                  <text
                    x="50"
                    y="20"
                    textAnchor="middle"
                    fontSize="2.8"
                    fill="rgba(255,255,255,0.05)"
                    fontFamily="serif"
                    fontWeight="bold"
                    letterSpacing="0.6"
                  >
                    KENYA
                  </text>

                  {/* Neighboring country hints */}
                  <text x="8" y="18" fontSize="1.15" fill="rgba(255,255,255,0.25)" fontFamily="monospace">UGANDA</text>
                  <text x="72" y="8" fontSize="1.15" fill="rgba(255,255,255,0.25)" fontFamily="monospace">ETHIOPIA</text>
                  <text x="90" y="30" fontSize="1.15" fill="rgba(255,255,255,0.25)" fontFamily="monospace">SOMALIA</text>
                  <text x="45" y="95" fontSize="1.15" fill="rgba(255,255,255,0.25)" fontFamily="monospace">TANZANIA</text>

                  {/* Danger radar pulses on hostile checkpoints */}
                  {pins
                    .filter((p) => p.type === "checkpoint")
                    .map((p) => (
                      <g key={`radar-${p.id}`}>
                        <motion.circle
                          cx={p.x}
                          cy={p.y}
                          r="0"
                          fill="none"
                          stroke="#e11d2a"
                          strokeWidth="0.22"
                          animate={{ r: [0, 7, 0], opacity: [0.9, 0, 0.9] }}
                          transition={{ duration: 3, repeat: Infinity, delay: Math.random() }}
                        />
                      </g>
                    ))}

                  {/* Blue delivery route (animated) */}
                  <motion.path
                    d={routePath}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="0.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="2 1.4"
                    style={{ pathLength: routeProgress }}
                    filter="drop-shadow(0 0 3px rgba(59,130,246,0.8))"
                  />
                  {/* Second brighter route glow layer */}
                  <motion.path
                    d={routePath}
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="0.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ pathLength: routeProgress }}
                    filter="drop-shadow(0 0 4px rgba(34,211,238,1))"
                    opacity="0.9"
                  />

                  {/* Live moving racer marker */}
                  <MovingCar routeProgress={carProgress} />

                  {/* Pins */}
                  {pins.map((pin) => {
                    const color = pinColors[pin.type];
                    const isActive = activePin === pin.id;
                    return (
                      <g
                        key={pin.id}
                        transform={`translate(${pin.x}, ${pin.y})`}
                        style={{ cursor: "pointer" }}
                        onClick={() => setActivePin(pin.id)}
                        onMouseEnter={() => setActivePin(pin.id)}
                      >
                        {/* Pulse */}
                        <motion.circle
                          r="1.5"
                          fill="none"
                          stroke={color}
                          strokeWidth="0.3"
                          animate={{ r: [1.5, 4.5, 1.5], opacity: [0.8, 0, 0.8] }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            delay: pins.indexOf(pin) * 0.2,
                          }}
                        />
                        {/* Pin */}
                        <circle r="1.4" fill={color} filter={`drop-shadow(0 0 2px ${color})`} />
                        <circle r="0.55" fill="#fff" />

                        {/* Active label */}
                        {isActive && (
                          <g>
                            <rect x="-11" y="-6.5" width="22" height="3.3" fill="#08070c" stroke={color} strokeWidth="0.15" rx="0.3" />
                            <text
                              x="0"
                              y="-4.4"
                              textAnchor="middle"
                              fontSize="1.4"
                              fill="#fff"
                              fontFamily="monospace"
                              letterSpacing="0.15"
                              fontWeight="700"
                            >
                              {pin.label}
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* Live coordinates HUD */}
                <div className="absolute bottom-4 right-4 z-20 bg-ink-950/90 backdrop-blur px-2.5 py-1.5 font-mono text-[9px] text-white tracking-widest flex items-center gap-1.5 border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
                  <span>1°17'S · 36°49'E</span>
                </div>

                {/* Corner brackets for tactical feel */}
                <div className="absolute top-3 left-3 w-4 h-4 border-l border-t border-neon/50" />
                <div className="absolute top-3 right-3 w-4 h-4 border-r border-t border-neon/50" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-l border-b border-neon/50" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-neon/50" />
              </div>

              {/* Stat strip */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "TOTAL DISTANCE", value: "512 KM", icon: TrendingUp, color: "#22d3ee" },
                  { label: "SAFEHOUSES", value: "12", icon: Home, color: "#3b82f6" },
                  { label: "CHECKPOINTS", value: "37", icon: ShieldAlert, color: "#e11d2a" },
                  { label: "GARAGES", value: "5", icon: Wrench, color: "#22d3ee" },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="bg-ink-900 border border-white/[0.06] px-4 py-3 flex items-center gap-3"
                    >
                      <div
                        className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                        style={{ background: `${stat.color}1a`, border: `1px solid ${stat.color}40` }}
                      >
                        <Icon size={14} style={{ color: stat.color }} />
                      </div>
                      <div>
                        <div className="font-mono text-[8px] tracking-widest text-white/40 mb-0.5">
                          {stat.label}
                        </div>
                        <div className="font-display text-base text-white leading-none">
                          {stat.value}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Legend + waypoint */}
            <div className="lg:col-span-4 space-y-6">
              {/* Legend */}
              <div className="bg-ink-900 border border-white/[0.06] p-6">
                <div className="flex items-center gap-2 pb-4 mb-5 border-b border-white/[0.06]">
                  <MapPin size={14} className="text-neon" />
                  <h4 className="font-mono text-xs tracking-[0.3em] text-white uppercase font-bold">
                    Map Legend
                  </h4>
                </div>
                <div className="space-y-3">
                  {legend.map((l) => {
                    const Icon = pinIcons[l.type];
                    return (
                      <div key={l.type} className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border"
                          style={{
                            background: `${pinColors[l.type]}22`,
                            borderColor: `${pinColors[l.type]}80`,
                          }}
                        >
                          <Icon size={13} style={{ color: pinColors[l.type] }} strokeWidth={2.5} />
                        </div>
                        <span className="font-mono text-[11px] text-white/80 tracking-[0.15em] uppercase font-semibold">
                          {pinLabels[l.type]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Active waypoint intel */}
              <div className="bg-ink-900 border border-crimson/30 p-6">
                <div className="flex items-center gap-2 pb-4 mb-5 border-b border-white/[0.06]">
                  <Radio size={13} className="text-crimson animate-pulse" />
                  <span className="font-mono text-[10px] tracking-[0.3em] text-white/50 uppercase">
                    LIVE WAYPOINT · INTEL
                  </span>
                </div>
                <div className="font-mono text-[9px] tracking-[0.25em] text-crimson mb-2 font-bold">
                  {selected ? pinLabels[selected.type] : "SELECT PIN"}
                </div>
                <h4 className="head-xl text-2xl text-white mb-2">
                  {selected ? selected.label : "—"}
                </h4>
                <p className="font-mono text-xs text-white/60 mb-5 leading-relaxed">
                  {selected ? selected.sub : "Hover a pin for tactical data"}
                </p>
                <div className="space-y-2.5 pt-4 border-t border-white/[0.06]">
                  <div className="flex justify-between font-mono text-[10px]">
                    <span className="text-white/40">DISTANCE FROM HQ</span>
                    <span className="text-neon font-bold">
                      {selected?.id === "malaba"
                        ? "512 KM"
                        : selected?.id === "kisumu"
                        ? "342 KM"
                        : selected?.id === "nakuru"
                        ? "158 KM"
                        : selected?.id === "eldoret"
                        ? "312 KM"
                        : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between font-mono text-[10px]">
                    <span className="text-white/40">POLICE PRESENCE</span>
                    <span
                      className="font-bold"
                      style={{
                        color: selected?.type === "checkpoint" ? "#e11d2a" : "#22d3ee",
                      }}
                    >
                      {selected?.type === "checkpoint" ? "EXTREME" : "MODERATE"}
                    </span>
                  </div>
                  <div className="flex justify-between font-mono text-[10px]">
                    <span className="text-white/40">ETA @ 220 KM/H</span>
                    <span className="text-white font-bold">
                      {selected?.id === "malaba"
                        ? "2H 20MIN"
                        : selected?.id === "kisumu"
                        ? "1H 34MIN"
                        : "—"}
                    </span>
                  </div>
                </div>
              </div>

              <p className="font-mono text-[10px] text-white/40 leading-relaxed">
                * Live map generated from Anonymous Morans network intercepts. Route dynamically updates based on active police telemetry and mercenary convoy positions.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

/* Small moving car marker traces the route path. */
function MovingCar({ routeProgress }: { routeProgress: import("framer-motion").MotionValue<number> }) {
  const points = [
    { x: 62, y: 60 },
    { x: 50, y: 48 },
    { x: 41, y: 55 },
    { x: 30, y: 48 },
    { x: 36, y: 36 },
    { x: 22, y: 30 },
  ];

  const x = useTransform(routeProgress, (t) => {
    const clamped = Math.max(0, Math.min(1, t));
    const segCount = points.length - 1;
    const segF = clamped * segCount;
    const segI = Math.min(Math.floor(segF), segCount - 1);
    const local = segF - segI;
    return points[segI].x + (points[segI + 1].x - points[segI].x) * local;
  });

  const y = useTransform(routeProgress, (t) => {
    const clamped = Math.max(0, Math.min(1, t));
    const segCount = points.length - 1;
    const segF = clamped * segCount;
    const segI = Math.min(Math.floor(segF), segCount - 1);
    const local = segF - segI;
    return points[segI].y + (points[segI + 1].y - points[segI].y) * local;
  });

  return (
    <>
      <motion.circle
        cx={x}
        cy={y}
        r="2.2"
        fill="none"
        stroke="#e11d2a"
        strokeWidth="0.35"
        opacity="0.6"
      />
      <motion.circle
        cx={x}
        cy={y}
        r="1.5"
        fill="#e11d2a"
        filter="drop-shadow(0 0 4px #e11d2a)"
      />
      <motion.circle cx={x} cy={y} r="0.6" fill="#fff" />
    </>
  );
}
