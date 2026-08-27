import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Zap, Shield, Flame, Gauge, Sparkles } from "lucide-react";
import SpeedGauge from "./SpeedGauge";
import TransparentImage from "./TransparentImage";
import { assets } from "../assets";

export type VehicleData = {
  id: string;
  name: string;
  brand: string;
  type: "MODDED" | "CONCEPT" | "MATATU" | "SPORT" | "SUPERCAR" | "OFFROAD";
  subtitle: string;
  img: string;
  isCustomUrl?: boolean;
  color: string;
  accent: string;
  stats: { speed: number; control: number; nitro: number; armor: number };
  origin: string;
  topSpeed: number;
  engine: string;
  specialTrait: string;
  customLivery?: "reggae" | "neon" | "stealth" | "matatu" | "safari";
};

const vehicles: VehicleData[] = [
  {
    id: "marley",
    name: "Marley's Memory",
    brand: "Subaru Forester STI",
    type: "MODDED",
    subtitle: "Yellow Subaru Forester with authentic Bob Marley Rasta Livery",
    img: assets.cars.subaru,
    isCustomUrl: true,
    color: "#ffd21a",
    accent: "#10b981",
    stats: { speed: 86, control: 92, nitro: 88, armor: 80 },
    origin: "Duka La Mods / Kingston Alley, Nairobi",
    topSpeed: 290,
    engine: "2.5L Turbo Boxer · 510 BHP",
    specialTrait: "Lion of Judah Acoustic Nitrous Boost",
    customLivery: "reggae",
  },
  {
    id: "simba",
    name: "Simba SVJ",
    brand: "Lamborghini V12 Infiltrator",
    type: "SUPERCAR",
    subtitle: "Mid-engine Italian V12 tuned for Kenyan night blackout runs",
    img: assets.cars.lamborghini,
    isCustomUrl: true,
    color: "#ff6b1a",
    accent: "#e11d2a",
    stats: { speed: 99, control: 86, nitro: 94, armor: 72 },
    origin: "Mombasa Free Port Underground",
    topSpeed: 365,
    engine: "6.5L Naturally Aspirated V12 · 770 BHP",
    specialTrait: "Active Aero Downforce & Police Radar Jammer",
  },
  {
    id: "nyati",
    name: "Nyati M-Sport",
    brand: "BMW M5 Competition",
    type: "SPORT",
    subtitle: "Twin-Turbo Bavarian interceptor built for high-speed highway sweeps",
    img: assets.cars.bmw,
    isCustomUrl: true,
    color: "#38bdf8",
    accent: "#e11d2a",
    stats: { speed: 94, control: 90, nitro: 85, armor: 82 },
    origin: "Soda Baridi Cryo Workshop",
    topSpeed: 335,
    engine: "4.4L Twin-Turbo V8 · 720 BHP",
    specialTrait: "Launch Telemetry & Drift Angle Lock",
  },
  {
    id: "shujaa",
    name: "Shujaa Nganya",
    brand: "Nairobi Custom Matatu",
    type: "MATATU",
    subtitle: "Airbrushed Kenyan Matatu with RGB neon & 12 custom air horns",
    img: assets.cars.matatu,
    isCustomUrl: true,
    color: "#10b981",
    accent: "#ffd21a",
    stats: { speed: 78, control: 84, nitro: 96, armor: 98 },
    origin: "Eastlands Embassava VIP Garage",
    topSpeed: 240,
    engine: "Heavy Diesel Bi-Turbo · 540 BHP",
    specialTrait: "Multiplayer Swarm Smoke Screen & Heat Clear",
    customLivery: "matatu",
  },
  {
    id: "necromancer",
    name: "Necromancer",
    brand: "Skunkworks Hyper-Concept",
    type: "CONCEPT",
    subtitle: "Matte black hypercar prototype with active plasma downforce",
    img: assets.cars.necromancer,
    isCustomUrl: false,
    color: "#a855f7",
    accent: "#ec4899",
    stats: { speed: 98, control: 80, nitro: 95, armor: 70 },
    origin: "Nairobi Military Skunkworks",
    topSpeed: 360,
    engine: "Quad-Electric Rotor · 1100 BHP",
    specialTrait: "Thermal Signature Masking & EMP Immunity",
    customLivery: "stealth",
  },
  {
    id: "chrono",
    name: "Chrono Breaker",
    brand: "Cyber Telemetry Prototype",
    type: "CONCEPT",
    subtitle: "High-spec cyber concept with sub-second drift telemetry sensors",
    img: assets.cars.necromancer,
    isCustomUrl: false,
    color: "#22d3ee",
    accent: "#3b82f6",
    stats: { speed: 99, control: 78, nitro: 99, armor: 68 },
    origin: "Chemi Chemi Precision Labs",
    topSpeed: 375,
    engine: "Flux Hybrid Core · 1250 BHP",
    specialTrait: "Sub-Second Cornering Rewind Sensors",
    customLivery: "neon",
  },
  {
    id: "ndovu",
    name: "Ndovu Combat 4x4",
    brand: "Kenyan Safari Cruiser V8",
    type: "OFFROAD",
    subtitle: "Armored Kenyan Safari Cruiser with reinforced bullbars",
    img: assets.cars.hero,
    isCustomUrl: false,
    color: "#f97316",
    accent: "#eab308",
    stats: { speed: 75, control: 95, nitro: 72, armor: 100 },
    origin: "Mufasa Heavy Works",
    topSpeed: 230,
    engine: "V8 High-Torque Diesel · 620 BHP",
    specialTrait: "Savannah Roadblock Smasher & Off-road Grip",
    customLivery: "safari",
  },
];

function hexA(hex: string, a: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

export default function VehicleSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [filter, setFilter] = useState<string>("ALL");
  const [paused, setPaused] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });
  const eyebrowY = useTransform(smooth, [0, 1], [30, -30]);
  const gaugeProg = useTransform(smooth, [0, 0.5, 1], [0.15, 0.88, 0.65]);

  const filteredVehicles = filter === "ALL"
    ? vehicles
    : vehicles.filter((v) => v.type === filter);

  const safeIndex = Math.min(index, filteredVehicles.length - 1);
  const active = filteredVehicles[safeIndex] || vehicles[0];

  const next = () => setIndex((i) => (i + 1) % filteredVehicles.length);
  const prev = () => setIndex((i) => (i - 1 + filteredVehicles.length) % filteredVehicles.length);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [paused, filteredVehicles.length]);

  return (
    <section ref={ref} id="cars" className="relative py-28 sm:py-36 lg:py-44 overflow-hidden bg-ink-950">
      {/* Background ambient lighting */}
      <motion.div
        key={active.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 65% 55% at 50% 50%, ${hexA(active.color, 0.12)}, transparent 70%)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        
        {/* Editorial Header with generous spacing */}
        <motion.div style={{ y: eyebrowY }} className="mb-14 lg:mb-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-12">
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="h-px w-10 bg-crimson" />
                <span className="font-mono text-xs tracking-[0.35em] text-crimson uppercase font-semibold">
                  VEHICLE VAULT · {vehicles.length} TUNED MACHINES
                </span>
              </div>
              <h2 className="head-xl text-4xl sm:text-5xl lg:text-7xl text-white tracking-tight leading-[0.92]">
                Built for speed.
                <br />
                <span className="text-stroke-white">Made for war.</span>
              </h2>
            </div>

            {/* Filter Tabs with breathing room */}
            <div className="flex flex-wrap gap-2 p-1.5 bg-ink-900 border border-white/[0.08] self-start lg:self-end">
              {["ALL", "SUPERCAR", "SPORT", "MODDED", "MATATU", "CONCEPT", "OFFROAD"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setFilter(cat);
                    setIndex(0);
                  }}
                  className={`px-3.5 py-1.5 font-mono text-[11px] tracking-[0.2em] transition-all duration-300 ${
                    filter === cat
                      ? "bg-crimson text-white font-bold shadow-[0_0_15px_rgba(225,29,42,0.5)]"
                      : "text-white/40 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Vehicle Showcase Grid */}
        <div
          className="relative grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Main Visual Display: Bounded, Anchored with Ground Shadows */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div
              className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden border border-white/[0.08] bg-gradient-to-b from-ink-900 via-ink-850 to-ink-950 flex flex-col justify-between p-6 sm:p-8"
              style={{
                boxShadow: `inset 0 0 90px rgba(0,0,0,0.85), 0 20px 50px ${hexA(active.color, 0.15)}`,
              }}
            >
              {/* Radial Lighting Tint */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 65% 55% at 50% 60%, ${hexA(active.color, 0.22)}, transparent 70%)`,
                }}
              />

              {/* Reggae / Bob Marley Decal Effect for Subaru */}
              {active.customLivery === "reggae" && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
                  <div className="absolute top-1/4 -right-10 w-[120%] h-6 bg-gradient-to-r from-emerald-500 via-yellow-400 to-red-600 rotate-[-12deg] blur-[2px]" />
                  <div className="absolute bottom-8 -left-10 w-[120%] h-8 bg-gradient-to-r from-emerald-500 via-yellow-400 to-red-600 rotate-[-12deg] blur-[3px]" />
                </div>
              )}

              {/* Top Header info inside car view */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full animate-pulse"
                    style={{ background: active.color, boxShadow: `0 0 10px ${active.color}` }}
                  />
                  <span className="font-mono text-xs tracking-[0.25em] text-white/70 uppercase font-medium">
                    {active.brand}
                  </span>
                </div>

                <div
                  className="px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase font-bold border"
                  style={{
                    color: active.color,
                    borderColor: `${active.color}55`,
                    background: `${active.color}15`,
                  }}
                >
                  {active.type}
                </div>
              </div>

              {/* Center Car View: Anchored firmly with road perspective & contact shadow */}
              <div className="relative z-10 my-auto flex items-center justify-center w-full h-[65%]">
                {/* Contact ground shadow */}
                <div
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-8 rounded-full pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse, rgba(0,0,0,0.95) 0%, ${hexA(active.color, 0.5)} 40%, transparent 75%)`,
                    filter: "blur(16px)",
                  }}
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, scale: 0.94, x: 30 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.96, x: -30 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full h-full flex items-center justify-center"
                  >
                    {active.isCustomUrl ? (
                      /* Real photographic vehicles (BMW, Lamborghini, Matatu, Subaru) rendered with clean cinematic framing */
                      <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded">
                        <img
                          src={active.img}
                          alt={active.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-center rounded filter brightness-[0.9] contrast-[1.1]"
                          style={{
                            boxShadow: `0 15px 35px rgba(0,0,0,0.9)`,
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent pointer-events-none" />
                      </div>
                    ) : (
                      /* Concept / Transporter Cutout Vehicles with transparent background */
                      <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="relative w-[90%] sm:w-[85%] h-full flex items-center justify-center"
                      >
                        <TransparentImage
                          src={active.img}
                          alt={active.name}
                          tolerance={55}
                          feather={30}
                          className="w-full h-full object-contain"
                          style={{
                            filter: `drop-shadow(0 25px 35px rgba(0,0,0,0.95)) drop-shadow(0 0 30px ${hexA(active.color, 0.5)})`,
                          }}
                        />
                      </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Specs and Title */}
              <div className="relative z-10 pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h3 className="head-xl text-3xl sm:text-4xl lg:text-5xl text-white leading-none tracking-tight">
                    {active.name}
                  </h3>
                  <p className="text-white/60 text-xs sm:text-sm mt-1.5 font-body">
                    {active.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-5 font-mono text-xs">
                  <div>
                    <span className="text-white/40 block text-[10px] uppercase">TOP SPEED</span>
                    <span className="font-bold text-base sm:text-lg" style={{ color: active.color }}>
                      {active.topSpeed} KM/H
                    </span>
                  </div>
                  <div className="h-7 w-px bg-white/15" />
                  <div>
                    <span className="text-white/40 block text-[10px] uppercase">ENGINE SPEC</span>
                    <span className="text-white font-bold">{active.engine.split("·")[0]}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Selector Thumbnail Carousel */}
            <div className="flex items-center justify-between gap-4 mt-5">
              <button
                onClick={prev}
                aria-label="Previous vehicle"
                className="p-3 bg-ink-900 border border-white/10 hover:border-crimson text-white/70 hover:text-white transition-colors"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex-1 flex gap-2.5 overflow-x-auto no-scrollbar py-1">
                {filteredVehicles.map((v, i) => (
                  <button
                    key={v.id}
                    onClick={() => setIndex(i)}
                    className={`flex-1 min-w-[120px] sm:min-w-[140px] p-3 text-left border transition-all duration-300 ${
                      i === safeIndex
                        ? "bg-ink-850 border-crimson shadow-[0_0_15px_rgba(225,29,42,0.35)]"
                        : "bg-ink-900/60 border-white/[0.06] hover:border-white/20 opacity-65 hover:opacity-100"
                    }`}
                  >
                    <div
                      className="h-1 w-full mb-2 transition-all"
                      style={{ background: i === safeIndex ? v.color : "transparent" }}
                    />
                    <div className="font-display text-sm text-white truncate">{v.name}</div>
                    <div className="font-mono text-[9px] text-white/40 uppercase">{v.brand.split(" ")[0]}</div>
                  </button>
                ))}
              </div>

              <button
                onClick={next}
                aria-label="Next vehicle"
                className="p-3 bg-ink-900 border border-white/10 hover:border-crimson text-white/70 hover:text-white transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Right Column: Performance Diagnostics & ONE Precision Speed Gauge */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            
            {/* Performance Diagnostic Telemetry Card */}
            <div className="bg-ink-900/80 border border-white/[0.08] p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/[0.08]">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase font-semibold">
                    TUNER TELEMETRY
                  </span>
                  <span
                    className="font-mono text-[9px] tracking-[0.2em] font-bold px-2.5 py-0.5"
                    style={{ background: `${active.color}22`, color: active.color }}
                  >
                    {active.brand}
                  </span>
                </div>

                {/* Progress Bars */}
                <div className="space-y-4">
                  {[
                    { label: "TOP SPEED", val: active.stats.speed, icon: Gauge },
                    { label: "DRIFT / CORNERING", val: active.stats.control, icon: Zap },
                    { label: "NITROUS CAPACITY", val: active.stats.nitro, icon: Flame },
                    { label: "CHASSIS ARMOR", val: active.stats.armor, icon: Shield },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                        <span className="text-white/60 flex items-center gap-2">
                          <stat.icon size={13} style={{ color: active.color }} />
                          {stat.label}
                        </span>
                        <span className="font-bold text-white">{stat.val}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-ink-800 overflow-hidden">
                        <motion.div
                          key={`${active.id}-${stat.label}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${stat.val}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full"
                          style={{
                            background: `linear-gradient(90deg, ${active.color}77, ${active.color})`,
                            boxShadow: `0 0 10px ${active.color}`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Special Ability Card */}
                <div className="mt-6 p-4 bg-ink-950 border border-white/[0.06]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Sparkles size={14} style={{ color: active.color }} />
                    <span className="font-mono text-[9px] tracking-[0.25em] text-white/50 uppercase font-semibold">
                      UNIQUE COMBAT TRAIT
                    </span>
                  </div>
                  <p className="font-mono text-xs text-white/90 leading-relaxed">{active.specialTrait}</p>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-white/40">
                <span>TUNER: {active.origin.split("/")[0]}</span>
                <span className="text-crimson font-bold">READY FOR RUN</span>
              </div>
            </div>

            {/* ONE Clean Speed Gauge */}
            <div className="bg-ink-900/80 border border-white/[0.08] p-5 flex flex-col items-center justify-center">
              <SpeedGauge
                progress={gaugeProg}
                size={160}
                label="PEAK DYNAMICS"
                max={active.topSpeed}
                unit="KM/H"
              />
              <span className="font-mono text-[9px] text-white/40 tracking-[0.3em] mt-2 uppercase">
                ONE PRECISION INSTRUMENT
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
