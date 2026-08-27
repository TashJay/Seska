import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Wrench, Flame, Cpu, Gauge, Disc, MapPin, Award, CheckCircle2 } from "lucide-react";
import { assets } from "../assets";

const garageList = [
  {
    key: "sodaBaridi",
    ...assets.mechanics.sodaBaridi,
    icon: Gauge,
    services: ["Cryo-Intercooling", "Twin Turbocharger Spooling", "Sub-Zero Engine Mapping"],
    quote: "Heat kills speed. We keep your engine ice cold at 8,000 RPM under police fire.",
    tier: "LEGENDARY COOLING TUNER",
  },
  {
    key: "mufasa",
    ...assets.mechanics.mufasa,
    icon: Flame,
    services: ["V8 & 2JZ Engine Swaps", "Reinforced Driveshafts", "Heavy Torque Output"],
    quote: "If the chassis can't take the punch, we weld it till it can. Pure Kenyan iron.",
    tier: "MASTER HEAVY FABRICATOR",
  },
  {
    key: "chemiChemi",
    ...assets.mechanics.chemiChemi,
    icon: Cpu,
    services: ["Encrypted ECU Tuning", "Nitrous Oxide Injection", "Anti-Lockdown Jamming"],
    quote: "We don't fix what breaks. We re-engineer it so the government can't trace your telemetry.",
    tier: "PRECISION TECH SPECIALIST",
  },
  {
    key: "motoKali",
    ...assets.mechanics.motoKali,
    icon: Wrench,
    services: ["Custom Widebody Kits", "Exhaust Flamethrower Kits", "Aero Diffusers"],
    quote: "When you blast past the blockade, you want them to remember the flames.",
    tier: "CUSTOM FABRICATOR",
  },
  {
    key: "dukaLaMods",
    ...assets.mechanics.dukaLaMods,
    icon: Disc,
    services: ["Contraband Hypercar Parts", "Stealth Carbon Wraps", "Underglow & Sound Systems"],
    quote: "Direct from the shipping containers at Kilindini. If it's banned, we have two in stock.",
    tier: "UNDERGROUND IMPORTER",
  },
];

function hexA(hex: string, a: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

export default function GarageSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const activeGarage = garageList[selectedIdx];

  return (
    <section ref={ref} id="garages" className="relative py-28 sm:py-36 lg:py-44 overflow-hidden bg-ink-950">
      {/* Background ambient lighting */}
      <motion.div
        key={activeGarage.color}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${hexA(activeGarage.color, 0.1)}, transparent 70%)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div style={{ y }} className="mb-14 lg:mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10 bg-crimson" />
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.35em] text-crimson uppercase">
                UNDERGROUND GARAGES & MODDERS
              </span>
            </div>
            <h2 className="head-xl text-4xl sm:text-6xl lg:text-7xl text-white">
              Build. Upgrade.
              <br />
              <span className="text-stroke-white">Dominate the streets.</span>
            </h2>
          </div>

          <a
            href="#signup"
            className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] text-crimson hover:text-white px-5 py-3 border border-crimson/40 hover:border-crimson hover:bg-crimson/10 transition-all duration-300"
          >
            SIGN UP AS A MODDER
            <ArrowUpRight size={14} />
          </a>
        </motion.div>

        {/* Garage Navigation Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 sm:mb-8">
          {garageList.map((g, i) => (
            <button
              key={g.key}
              onClick={() => setSelectedIdx(i)}
              className={`flex-shrink-0 px-4 py-3 border text-left transition-all duration-300 ${
                i === selectedIdx
                  ? "bg-ink-850 border-white/40 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                  : "bg-ink-900/60 border-white/[0.06] hover:border-white/20 opacity-70 hover:opacity-100"
              }`}
              style={{
                borderTopColor: i === selectedIdx ? g.color : undefined,
                borderTopWidth: i === selectedIdx ? 3 : 1,
              }}
            >
              <div className="font-mono text-[9px] text-white/40 uppercase mb-0.5">GARAGE #{g.tag}</div>
              <div className="font-display text-sm sm:text-base text-white tracking-wide">{g.name}</div>
            </button>
          ))}
        </div>

        {/* Active Garage Master Showcase */}
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Left: Mechanic Portrait & Workshop Photo */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden border border-white/[0.08] bg-ink-900 group">
              {/* Workshop Background Image */}
              <img
                src={activeGarage.workshop}
                alt={activeGarage.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center filter brightness-[0.6] contrast-[1.1] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
              <div
                className="absolute inset-0 mix-blend-overlay opacity-50 pointer-events-none"
                style={{ background: activeGarage.color }}
              />

              {/* Inset Mechanic Portrait Badge */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex items-center gap-4 bg-ink-950/90 backdrop-blur border border-white/10 p-2.5 sm:p-3 max-w-[85%] sm:max-w-md">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 overflow-hidden border-2" style={{ borderColor: activeGarage.color }}>
                  <img
                    src={activeGarage.portrait}
                    alt={activeGarage.modder}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />
                </div>
                <div>
                  <span
                    className="font-mono text-[8px] sm:text-[9px] tracking-[0.25em] uppercase font-bold"
                    style={{ color: activeGarage.color }}
                  >
                    {activeGarage.tier}
                  </span>
                  <h4 className="font-display text-base sm:text-lg text-white">{activeGarage.modder}</h4>
                  <div className="flex items-center gap-1.5 text-white/50 text-xs font-mono">
                    <MapPin size={11} className="text-crimson" />
                    <span>{activeGarage.location}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Quote & Tagline */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                <p className="font-mono text-xs sm:text-sm text-white/90 italic max-w-xl leading-relaxed mb-2">
                  "{activeGarage.quote}"
                </p>
                <div className="flex items-center gap-3 font-mono text-[10px] text-white/40">
                  <span className="flex items-center gap-1 text-yellow-400">
                    <Award size={12} /> REP: {activeGarage.reputation}%
                  </span>
                  <span>·</span>
                  <span className="text-emerald-400">ACTIVE MULTIPLAYER HUB</span>
                </div>
              </div>
            </div>

            {/* Quick Mechanic Roster Thumbnails */}
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {garageList.map((g, i) => (
                <button
                  key={g.key}
                  onClick={() => setSelectedIdx(i)}
                  className={`relative p-2 border text-left flex items-center gap-2 transition-all ${
                    i === selectedIdx
                      ? "bg-ink-850 border-crimson"
                      : "bg-ink-900/60 border-white/[0.06] hover:border-white/20 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={g.portrait}
                    alt={g.name}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded object-cover flex-shrink-0"
                  />
                  <div className="hidden sm:block truncate">
                    <div className="font-display text-xs text-white truncate">{g.name.split(" ")[0]}</div>
                    <div className="font-mono text-[8px] text-white/40 truncate">{g.specialty.split("&")[0]}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Modding Specialties & Multiplayer Services */}
          <div className="lg:col-span-5 bg-ink-900/80 border border-white/[0.08] p-5 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
                <div>
                  <span className="font-mono text-[9px] tracking-[0.25em] text-white/40 uppercase">
                    WORKSHOP SERVICES
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl text-white mt-1">
                    {activeGarage.name}
                  </h3>
                </div>
                <div
                  className="p-2.5 border"
                  style={{ borderColor: `${activeGarage.color}44`, background: `${activeGarage.color}15` }}
                >
                  <activeGarage.icon size={20} style={{ color: activeGarage.color }} />
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <span className="font-mono text-[10px] tracking-[0.2em] text-white/50 block uppercase">
                  AVAILABLE UPGRADES FOR RACERS:
                </span>
                {activeGarage.services.map((svc) => (
                  <div
                    key={svc}
                    className="flex items-center gap-3 p-3 bg-ink-950 border border-white/[0.06] hover:border-white/20 transition-colors"
                  >
                    <CheckCircle2 size={16} style={{ color: activeGarage.color }} className="flex-shrink-0" />
                    <span className="font-mono text-xs sm:text-sm text-white font-medium">{svc}</span>
                  </div>
                ))}
              </div>

              {/* Multiplayer Modder Role Info */}
              <div className="p-4 bg-ink-950 border border-white/[0.08]">
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="text-white/60">JOIN AS A MECHANIC IN THIS GARAGE</span>
                  <span style={{ color: activeGarage.color }} className="font-bold">+500 PTS / UPGRADE</span>
                </div>
                <p className="font-mono text-[11px] text-white/40 leading-relaxed">
                  Modders create custom parts, repair damaged drives, and clear police heat for allied racers.
                </p>
              </div>
            </div>

            <a
              href="#signup"
              className="mt-6 w-full text-center py-3.5 font-mono text-xs tracking-[0.25em] uppercase font-bold text-white transition-all duration-300"
              style={{
                background: activeGarage.color,
                color: "#08070c",
                boxShadow: `0 0 20px ${activeGarage.color}66`,
              }}
            >
              AFFILIATE WITH {activeGarage.name.toUpperCase()}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
