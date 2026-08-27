import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ShieldCheck, Check, Sparkles, Copy, Download, Share2, Flame, Wrench, Radio, Bus, RefreshCw } from "lucide-react";
import { assets } from "../assets";
import TransparentImage from "./TransparentImage";

type RoleType = "RACER" | "MODDER" | "SPOTTER" | "MATATU_CREW";

interface PreRegData {
  email: string;
  callsign: string;
  role: RoleType;
  garage: string;
  carPreference: string;
  passId: string;
  timestamp: string;
}

const roleOptions = [
  { id: "RACER" as RoleType, label: "Racer", desc: "Transport the Drive across Kenya to the border", icon: Flame, color: "#e11d2a" },
  { id: "MODDER" as RoleType, label: "Modder / Mechanic", desc: "Craft custom parts & tune allied engines in garages", icon: Wrench, color: "#22d3ee" },
  { id: "SPOTTER" as RoleType, label: "Spotter", desc: "Hack traffic grids & relay police roadblocks in real time", icon: Radio, color: "#10b981" },
  { id: "MATATU_CREW" as RoleType, label: "Matatu Crew", desc: "Provide mobile safehouses & cool down high-heat racers", icon: Bus, color: "#ffd21a" },
];

const garageOptions = [
  "Soda Baridi (Cooling & Turbo)",
  "Mufasa Performance (Heavy Torque)",
  "Chemi Chemi (ECU & Nitrous)",
  "Moto Kali (Widebody & Flames)",
  "Duka La Mods (Exotic Imports)",
];

const carOptions = [
  "Marley's Memory (Subaru Forester Reggae Edition)",
  "Necromancer (Hyper-Concept)",
  "Chrono Breaker (Cyber Prototype)",
  "Bavaria M5 Shadow (BMW Twin-Turbo)",
  "Shujaa Nganya (Neon Matatu)",
  "Ndovu Combat 4x4 (Safari Armor)",
];

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const carX = useTransform(smooth, [0, 1], ["-6%", "6%"]);
  const carScale = useTransform(smooth, [0, 0.5, 1], [1.02, 1.08, 1.12]);

  // Form State
  const [email, setEmail] = useState("");
  const [callsign, setCallsign] = useState("");
  const [role, setRole] = useState<RoleType>("RACER");
  const [garage, setGarage] = useState(garageOptions[0]);
  const [carPreference, setCarPreference] = useState(carOptions[0]);
  const [copied, setCopied] = useState(false);
  const [regData, setRegData] = useState<PreRegData | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !callsign) return;

    const passId = `IH-${Math.floor(1000 + Math.random() * 9000)}-${role.slice(0, 3)}`;
    const data: PreRegData = {
      email,
      callsign: callsign.toUpperCase().trim(),
      role,
      garage: garage.split("(")[0].trim(),
      carPreference: carPreference.split("(")[0].trim(),
      passId,
      timestamp: new Date().toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" }),
    };

    setRegData(data);
  };

  const handleCopy = () => {
    if (!regData) return;
    navigator.clipboard.writeText(`Underground Clearance Pass: ${regData.passId} | Callsign: ${regData.callsign} | Role: ${regData.role} | IHENYA Racing 2047`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section ref={ref} id="signup" className="relative min-h-screen flex items-center overflow-hidden py-28 sm:py-36 lg:py-44 bg-ink-950">
      {/* Background Car Ambient Overlay */}
      <motion.div
        style={{ x: carX, scale: carScale }}
        className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40 z-0"
      >
        <div
          className="absolute w-[80%] h-[50%] rounded-full aura-pulse"
          style={{ background: "radial-gradient(circle, rgba(225,29,42,0.3), transparent 65%)", filter: "blur(80px)" }}
        />
        <TransparentImage
          src={assets.cars.hero}
          tolerance={55}
          feather={30}
          className="w-full sm:w-[90%] h-[80%] object-contain"
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        {/* Section Header */}
        <div className="mb-14 lg:mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-10 bg-electric" />
            <span className="font-mono text-xs tracking-[0.35em] text-electric uppercase font-semibold">
              THE TRUTH IS OUT THERE · KENYA LOCKDOWN 2047
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-8">
              <h2 className="head-xl text-4xl sm:text-6xl lg:text-7xl xl:text-8xl uppercase text-white leading-[0.92] tracking-tight">
                Are you fast enough
                <br />
                <span className="text-crimson text-glow-crimson">to carry the drive?</span>
              </h2>
            </div>
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-2">
              <div className="flex items-center gap-2.5 px-3 py-1.5 bg-ink-900 border border-electric/40">
                <span className="w-2 h-2 rounded-full bg-electric animate-pulse" />
                <span className="font-mono text-[11px] tracking-[0.2em] text-electric font-bold">
                  48,392 MORANS REGISTERED
                </span>
              </div>
              <p className="font-mono text-[10px] text-white/40 tracking-[0.2em] uppercase">
                Closed beta · Day 1 rewards
              </p>
            </div>
          </div>
        </div>

        {/* Main Form & Clearance Pass Grid */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left / Form Column */}
          <div className="lg:col-span-7 bg-ink-900/90 backdrop-blur-xl border border-white/[0.1] p-6 sm:p-8 lg:p-10">
            <AnimatePresence mode="wait">
              {!regData ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-7"
                >
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl text-white tracking-wide mb-1">
                      UNDERGROUND CLEARANCE REGISTRATION
                    </h3>
                    <p className="font-mono text-xs text-white/50">
                      Sign up to claim your Day 1 anonymous credentials and starter garage affiliation.
                    </p>
                  </div>

                  {/* 1. Step: Callsign & Email */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="callsign"
                        className="block font-mono text-[10px] tracking-[0.25em] text-white/70 uppercase mb-2.5"
                      >
                        Street callsign / handle *
                      </label>
                      <input
                        id="callsign"
                        name="callsign"
                        type="text"
                        value={callsign}
                        onChange={(e) => setCallsign(e.target.value)}
                        placeholder="e.g. GHOST_NAIROBI"
                        required
                        autoComplete="username"
                        className="w-full bg-ink-950 border border-white/15 px-4 py-3.5 font-mono text-xs text-white placeholder-white/20 focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson/40 transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block font-mono text-[10px] tracking-[0.25em] text-white/70 uppercase mb-2.5"
                      >
                        Encrypted email address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="moran@nairobi.network"
                        required
                        autoComplete="email"
                        className="w-full bg-ink-950 border border-white/15 px-4 py-3.5 font-mono text-xs text-white placeholder-white/20 focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson/40 transition-colors"
                      />
                    </div>
                  </div>

                  {/* 2. Step: Select Role */}
                  <fieldset>
                    <legend className="block font-mono text-[10px] tracking-[0.25em] text-white/70 uppercase mb-3">
                      Select your underground role
                    </legend>
                    <div
                      role="radiogroup"
                      aria-label="Underground role"
                      className="grid sm:grid-cols-2 gap-3"
                    >
                      {roleOptions.map((r) => {
                        const Icon = r.icon;
                        const isSelected = role === r.id;
                        return (
                          <button
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            key={r.id}
                            onClick={() => setRole(r.id)}
                            className={`p-4 text-left border transition-all ${
                              isSelected
                                ? "bg-ink-850 border-crimson shadow-[0_0_12px_rgba(225,29,42,0.3)]"
                                : "bg-ink-950/70 border-white/[0.08] hover:border-white/25 opacity-75 hover:opacity-100"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1.5">
                              <Icon size={14} style={{ color: isSelected ? r.color : "#fff" }} />
                              <span className="font-display text-sm text-white">{r.label}</span>
                            </div>
                            <p className="font-mono text-[10px] text-white/55 leading-relaxed">{r.desc}</p>
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  {/* 3. Step: Choose Garage Alliance & Vehicle */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="garage"
                        className="block font-mono text-[10px] tracking-[0.25em] text-white/70 uppercase mb-2.5"
                      >
                        Garage alliance
                      </label>
                      <select
                        id="garage"
                        name="garage"
                        value={garage}
                        onChange={(e) => setGarage(e.target.value)}
                        className="w-full bg-ink-950 border border-white/15 px-4 py-3.5 font-mono text-xs text-white focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson/40"
                      >
                        {garageOptions.map((g) => (
                          <option key={g} value={g} className="bg-ink-950 text-white">
                            {g}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="carPreference"
                        className="block font-mono text-[10px] tracking-[0.25em] text-white/70 uppercase mb-2.5"
                      >
                        Starting vehicle preference
                      </label>
                      <select
                        id="carPreference"
                        name="carPreference"
                        value={carPreference}
                        onChange={(e) => setCarPreference(e.target.value)}
                        className="w-full bg-ink-950 border border-white/15 px-4 py-3.5 font-mono text-xs text-white focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson/40"
                      >
                        {carOptions.map((c) => (
                          <option key={c} value={c} className="bg-ink-950 text-white">
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Pre-reg Perks Check */}
                  <div className="p-3.5 bg-ink-950 border border-white/[0.08] flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] text-white/60">
                    <span className="flex items-center gap-1.5 text-yellow-400">
                      <Sparkles size={13} /> DAY 1 LION OF JUDAH / RASTA WRAP INCLUDED
                    </span>
                    <span className="text-emerald-400">✓ 5,000 REP CREDITS</span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full group relative overflow-hidden bg-crimson py-4 font-mono text-xs tracking-[0.3em] font-bold text-white transition-all duration-300 hover:shadow-[0_0_25px_rgba(225,29,42,0.6)]"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      CLAIM CLEARANCE PASS & JOIN THE MORANS
                      <Sparkles size={14} />
                    </span>
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold mb-1">
                        <ShieldCheck size={16} />
                        CLEARANCE PASS GRANTED · SECTOR 01 ACCESS
                      </div>
                      <h3 className="font-display text-3xl text-white">
                        WELCOME, MORAN {regData.callsign}
                      </h3>
                    </div>
                    <button
                      onClick={() => setRegData(null)}
                      className="p-2 border border-white/10 text-white/50 hover:text-white hover:border-white/40 transition-colors"
                      title="Create Another Pass"
                    >
                      <RefreshCw size={14} />
                    </button>
                  </div>

                  {/* Summary Perks */}
                  <div className="grid sm:grid-cols-3 gap-3 font-mono text-xs">
                    <div className="p-3 bg-ink-950 border border-white/[0.06]">
                      <span className="text-white/40 block text-[9px]">ASSIGNED GARAGE</span>
                      <span className="text-white font-bold">{regData.garage}</span>
                    </div>
                    <div className="p-3 bg-ink-950 border border-white/[0.06]">
                      <span className="text-white/40 block text-[9px]">ROLE</span>
                      <span className="text-crimson font-bold">{regData.role}</span>
                    </div>
                    <div className="p-3 bg-ink-950 border border-white/[0.06]">
                      <span className="text-white/40 block text-[9px]">STARTING MACHINE</span>
                      <span className="text-yellow-400 font-bold">{regData.carPreference}</span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleCopy}
                      className="flex-1 min-w-[140px] py-3 px-4 bg-ink-950 border border-white/20 hover:border-white text-white font-mono text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      {copied ? "COPIED TO CLIPBOARD" : "COPY PASS ID"}
                    </button>
                    <button
                      onClick={handleCopy}
                      className="py-3 px-4 bg-crimson hover:bg-crimson-deep text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                    >
                      <Download size={14} />
                      SAVE BADGE
                    </button>
                    <button
                      onClick={handleCopy}
                      className="py-3 px-4 bg-ink-950 border border-white/20 hover:border-white text-white font-mono text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <Share2 size={14} />
                      SHARE
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Holographic Underground ID Card Preview */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div
              className="relative p-6 sm:p-8 bg-gradient-to-br from-ink-900 via-ink-850 to-ink-950 border-2 border-crimson/50 shadow-[0_0_40px_rgba(225,29,42,0.25)] flex flex-col justify-between min-h-[420px]"
            >
              {/* Card Holographic Watermark & Stripes */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-crimson/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />

              {/* Card Header */}
              <div className="relative z-10 flex items-start justify-between pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-crimson" />
                    <span className="font-mono text-[9px] tracking-[0.3em] text-white/50 uppercase">
                      IHENYA UNDERGROUND PASS
                    </span>
                  </div>
                  <div className="font-display text-2xl text-white tracking-wide mt-1">
                    ANONYMOUS MORANS
                  </div>
                </div>

                <div className="text-right font-mono text-[9px] text-crimson font-bold">
                  2047 · NAIROBI
                </div>
              </div>

              {/* Card Body */}
              <div className="relative z-10 my-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[9px] text-white/40 tracking-[0.2em] block">
                      CALLSIGN
                    </span>
                    <span className="head-xl text-3xl sm:text-4xl text-white tracking-wide">
                      {regData ? regData.callsign : (callsign ? callsign.toUpperCase() : "GHOST_MORAN")}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-[9px] text-white/40 tracking-[0.2em] block">
                      ASSIGNED ROLE
                    </span>
                    <span className="font-mono text-xs text-crimson font-bold px-2 py-1 bg-crimson/10 border border-crimson/30">
                      {regData ? regData.role : role}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-ink-950/80 border border-white/[0.06] flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-white/40 block text-[8px]">PREFERRED LIVERY</span>
                    <span className="text-yellow-400 font-bold">
                      {regData ? regData.carPreference : carPreference.split("(")[0]}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-white/40 block text-[8px]">PASS STATUS</span>
                    <span className="text-emerald-400 font-bold">CLEARANCE READY</span>
                  </div>
                </div>
              </div>

              {/* Card Footer with Simulated Barcode */}
              <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-mono text-[8px] text-white/30 tracking-[0.25em]">
                    SECURITY ID: {regData ? regData.passId : "IH-2047-BETA"}
                  </div>
                  {/* Simulated barcode bars */}
                  <div className="flex gap-[2px] h-5 mt-1.5 opacity-60">
                    {[3, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 2, 4, 3, 1, 2, 4, 1, 3, 2, 1, 4].map((w, i) => (
                      <div key={i} className="bg-white" style={{ width: `${w}px` }} />
                    ))}
                  </div>
                </div>

                <div className="w-10 h-10 border border-white/20 p-1 flex items-center justify-center bg-white/5">
                  <span className="font-mono text-[8px] text-white/50 text-center leading-none">QR AUTH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
