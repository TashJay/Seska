import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { assets } from "../assets";
import TransparentImage from "./TransparentImage";
import { Sparkles, Shield, Cpu, Eye, Target } from "lucide-react";

export type CharacterData = {
  id: string;
  name: string;
  alias: string;
  role: string;
  image: string;
  color: string;
  accent: string;
  bio: string;
  quote: string;
  animeTrait: string;
  stats: { drive: number; nerve: number; tech: number; strength: number };
  tag: string;
  signatureCar: string;
};

const characters: CharacterData[] = [
  {
    id: "jay",
    name: "Jay",
    alias: "Kivumbi (Dust Devil)",
    role: "The Fearless Leader",
    image: assets.characters.jay,
    color: "#e11d2a",
    accent: "#ff6b1a",
    bio: "Born in Kibera, raised on the night blackouts. Jay leads the underground convoy with razor instinct and zero hesitation.",
    quote: "If the road is closed, we make our own highway.",
    animeTrait: "Overdrive Focus & Instant Drift Vector Telemetry",
    stats: { drive: 96, nerve: 98, tech: 70, strength: 84 },
    tag: "01",
    signatureCar: "Simba SVJ / Phantom Widebody",
  },
  {
    id: "ketch",
    name: "Ketch",
    alias: "Mfalme (The King)",
    role: "Street King & Route Master",
    image: assets.characters.ketch,
    color: "#ff6b1a",
    accent: "#ffd21a",
    bio: "Every crew from Eastlands to Westlands respects his nod. Ketch knows every hidden alley, unmapped dirt track, and police blind spot.",
    quote: "Respect isn't bought with money; it's earned at 7,000 RPM.",
    animeTrait: "Eidetic Grid Memory & Slipstream Hunter",
    stats: { drive: 92, nerve: 90, tech: 80, strength: 82 },
    tag: "02",
    signatureCar: "Nyati M-Sport (BMW V8)",
  },
  {
    id: "aaron",
    name: "Aaron",
    alias: "Siri (The Cipher)",
    role: "Anonymous Moran // Tech Genius",
    image: assets.characters.aaron,
    color: "#22d3ee",
    accent: "#3b82f6",
    bio: "The cyber architect of the Anonymous Morans. Cracked the government shell accounts and compiled the classified drive.",
    quote: "The government encrypted their theft. I made it open-source.",
    animeTrait: "EMP Disruption & Real-time Police Jamming",
    stats: { drive: 70, nerve: 85, tech: 100, strength: 65 },
    tag: "03",
    signatureCar: "Chrono Breaker Cyber Prototype",
  },
  {
    id: "warden",
    name: "Warden",
    alias: "Mlinzi (The Enforcer)",
    role: "Convoy Shield & Security",
    image: assets.characters.kihunzit,
    color: "#10b981",
    accent: "#059669",
    bio: "Ex-tactical transport specialist turned underground sentinel. When roadblocks turn hostile, Warden breaks the frontline.",
    quote: "Nobody touches the transporter while I'm breathing.",
    animeTrait: "Kinetic Barrier Projection & Heavy Ramming",
    stats: { drive: 82, nerve: 95, tech: 74, strength: 96 },
    tag: "04",
    signatureCar: "Ndovu Combat Armored 4x4",
  },
  {
    id: "bubbly",
    name: "Bubbly Shawtie",
    alias: "Radi (Lightning Strike)",
    role: "Wild Card & Acrobatic Stunt Driver",
    image: assets.characters.bubbly,
    color: "#ec4899",
    accent: "#f43f5e",
    bio: "High-octane energy and peerless reflexes. Bubbly pulls off gravity-defying bridge leaps and barrel rolls that dominate live TV broadcasts.",
    quote: "If you're not airborne, you're not trying hard enough!",
    animeTrait: "Acrobatic Nitro Jumps & Boost Chaining",
    stats: { drive: 90, nerve: 100, tech: 78, strength: 72 },
    tag: "05",
    signatureCar: "Marley's Memory (Subaru Forester STI)",
  },
  {
    id: "israel",
    name: "Israel",
    alias: "Mrekebishaji (The Fixer)",
    role: "Underground Broker & Smuggler",
    image: assets.characters.ketch,
    color: "#a855f7",
    accent: "#7c3aed",
    bio: "Connected across all nine provinces. Israel secures contraband military fuel, prototype nitrous canisters, and border clearances.",
    quote: "Everything in this country has a price. Freedom just costs more.",
    animeTrait: "Shadow Smuggling & Ghost Checkpoint Bribes",
    stats: { drive: 84, nerve: 88, tech: 86, strength: 78 },
    tag: "06",
    signatureCar: "Necromancer Concept Stealth",
  },
  {
    id: "kihunzit",
    name: "Kihunzit",
    alias: "Jabali (The Rock)",
    role: "The Heavyweight / Iron Tank",
    image: assets.characters.kihunzit,
    color: "#ffd21a",
    accent: "#ea580c",
    bio: "A middle-aged, massive muscular Kenyan powerhouse with scarred knuckles and decades of underground warfare experience.",
    quote: "You call it a roadblock. I call it target practice.",
    animeTrait: "Titan Armor Overdrive & Shockwave Slam",
    stats: { drive: 80, nerve: 100, tech: 60, strength: 100 },
    tag: "07",
    signatureCar: "Ndovu Combat V8 Safari Cruiser",
  },
];

function hexA(hex: string, a: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

export default function CharacterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [selectKey, setSelectKey] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });
  const eyebrowY = useTransform(smooth, [0, 1], [30, -30]);
  const bigNameY = useTransform(smooth, [0, 1], [40, -40]);

  // Subtle mouse parallax for anime-style visual depth
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const mxSp = useSpring(mx, { stiffness: 90, damping: 22 });
  const mySp = useSpring(my, { stiffness: 90, damping: 22 });
  const rotY = useTransform(mxSp, [-1, 1], [-8, 8]);
  const rotX = useTransform(mySp, [-1, 1], [6, -6]);
  const tX = useTransform(mxSp, [-1, 1], [-10, 10]);
  const tY = useTransform(mySp, [-1, 1], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mx.set(x);
    my.set(y);
  };
  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const active = characters[index];

  const selectCharacter = (i: number) => {
    setIndex(i);
    setSelectKey((k) => k + 1);
  };

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % characters.length);
      setSelectKey((k) => k + 1);
    }, 6000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section ref={ref} id="racers" className="relative py-28 sm:py-36 lg:py-44 overflow-hidden bg-ink-950">
      {/* Background ambient lighting */}
      <motion.div
        key={`bg-${active.id}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 55% at 50% 55%, ${hexA(active.color, 0.12)}, transparent 70%)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        
        {/* Editorial Section Header with generous negative space */}
        <motion.div style={{ y: eyebrowY }} className="mb-14 lg:mb-20 space-y-5">
          <div className="flex items-center gap-4">
            <div className="h-px w-10 bg-crimson" />
            <span className="font-mono text-xs tracking-[0.35em] text-crimson uppercase font-semibold">
              CHOOSE YOUR PILOT · {characters.length} UNDERGROUND LEGENDS
            </span>
          </div>
          <h2 className="head-xl text-4xl sm:text-5xl lg:text-7xl text-white tracking-tight leading-[0.92]">
            Legends of the
            <br />
            <span className="text-stroke-white">Underground.</span>
          </h2>
        </motion.div>

        {/* Main Character Stage Grid */}
        <div
          className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Left / Center: Character Visual Display with African Anime / Graphic-Novel Styling */}
          <div className="lg:col-span-7 relative flex flex-col justify-between">
            <div
              ref={stageRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative aspect-[4/5] sm:aspect-[16/12] lg:aspect-auto lg:h-[620px] w-full overflow-hidden border border-white/[0.08] bg-gradient-to-b from-ink-900 via-ink-850 to-ink-950 p-6 sm:p-8 flex flex-col justify-between"
              style={{
                boxShadow: `inset 0 0 90px rgba(0,0,0,0.85), 0 20px 50px ${hexA(active.color, 0.15)}`,
              }}
            >
              {/* Anime-Style Backlight Halo */}
              <div
                key={`aura-${active.id}`}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full aura-pulse pointer-events-none"
                style={{
                  width: "70%",
                  height: "70%",
                  background: `radial-gradient(circle, ${hexA(active.color, 0.45)}, transparent 65%)`,
                  filter: "blur(50px)",
                }}
              />

              {/* Watermark Name in Background */}
              <motion.div
                style={{ y: bigNameY }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1] overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={active.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 0.05, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.7 }}
                    className="head-xl text-[24vw] lg:text-[14vw] text-white whitespace-nowrap select-none"
                  >
                    {active.name.toUpperCase()}
                  </motion.span>
                </AnimatePresence>
              </motion.div>

              {/* Top Tag & Sheng Alias */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full animate-pulse"
                    style={{ background: active.color, boxShadow: `0 0 10px ${active.color}` }}
                  />
                  <span className="font-mono text-xs tracking-[0.25em] text-white/70 uppercase font-medium">
                    MORAN PROTOCOL // #{active.tag}
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
                  {active.alias}
                </div>
              </div>

              {/* Center Character Portrait Stage: Anchored with Contact Shadow */}
              <div className="relative z-10 my-auto flex items-end justify-center w-full h-[70%]">
                {/* Contact shadow */}
                <div
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3/5 h-8 rounded-full pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse, rgba(0,0,0,0.95) 0%, ${hexA(active.color, 0.5)} 40%, transparent 75%)`,
                    filter: "blur(16px)",
                  }}
                />

                <motion.div
                  style={{ rotateY: rotY, rotateX: rotX, x: tX, y: tY }}
                  className="relative w-full h-full flex items-end justify-center"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active.id}
                      initial={{ opacity: 0, y: 30, scale: 0.94 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.96 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="relative w-full h-full flex items-end justify-center"
                    >
                      <div className="char-float h-full w-auto max-w-full flex items-end justify-center">
                        <div className="char-breathe h-full flex items-end justify-center">
                          <TransparentImage
                            src={active.image}
                            alt={active.name}
                            tolerance={55}
                            feather={30}
                            className="h-full w-auto max-w-full object-contain object-bottom"
                            style={{
                              filter: `drop-shadow(0 25px 35px rgba(0,0,0,0.95)) drop-shadow(0 0 30px ${hexA(active.color, 0.45)})`,
                            }}
                          />
                        </div>
                      </div>

                      {/* One-shot sweep highlight on selection */}
                      <div key={`sw-${selectKey}`} className="sweep-once" />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Bottom Character Info Bar */}
              <div className="relative z-10 pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <h3 className="head-xl text-4xl sm:text-5xl text-white leading-none tracking-tight">
                    {active.name}
                  </h3>
                  <p className="font-mono text-xs sm:text-sm text-white/70 mt-1 uppercase" style={{ color: active.color }}>
                    {active.role}
                  </p>
                </div>

                <div className="font-mono text-xs text-right">
                  <span className="text-white/40 block text-[10px] uppercase">SIGNATURE RIDE</span>
                  <span className="text-white font-bold">{active.signatureCar.split("/")[0]}</span>
                </div>
              </div>

              {/* Corner crosshairs */}
              <div className="absolute top-3 left-3 w-4 h-4 border-l border-t" style={{ borderColor: `${active.color}66` }} />
              <div className="absolute top-3 right-3 w-4 h-4 border-r border-t" style={{ borderColor: `${active.color}66` }} />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-l border-b" style={{ borderColor: `${active.color}66` }} />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b" style={{ borderColor: `${active.color}66` }} />
            </div>
          </div>

          {/* Right Column: Lore, Combat Stats & Roster Switcher */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Character Lore & Abilities Card */}
            <div className="bg-ink-900/80 border border-white/[0.08] p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.08]">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase font-semibold">
                    PILOT DOSSIER
                  </span>
                  <span
                    className="font-mono text-[9px] tracking-[0.2em] font-bold px-2.5 py-0.5"
                    style={{ background: `${active.color}22`, color: active.color }}
                  >
                    READY FOR BORDER RUN
                  </span>
                </div>

                <p className="text-white/65 text-sm sm:text-base leading-relaxed mb-4 font-body">
                  {active.bio}
                </p>

                <p className="font-mono text-xs italic text-white/90 mb-6 p-3 bg-ink-950 border-l-2" style={{ borderLeftColor: active.color }}>
                  "{active.quote}"
                </p>

                {/* Anime Combat Ability */}
                <div className="mb-6 p-3.5 bg-ink-950 border border-white/[0.06]">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles size={13} style={{ color: active.color }} />
                    <span className="font-mono text-[9px] tracking-[0.25em] text-white/50 uppercase font-semibold">
                      ANIME COMBAT TRAIT
                    </span>
                  </div>
                  <p className="font-mono text-xs text-white/90 font-medium">{active.animeTrait}</p>
                </div>

                {/* Stat Bars */}
                <div className="space-y-3.5">
                  {[
                    { label: "DRIVING INSTINCT", val: active.stats.drive, icon: Target },
                    { label: "NERVES OF STEEL", val: active.stats.nerve, icon: Eye },
                    { label: "TECH / CIPHER", val: active.stats.tech, icon: Cpu },
                    { label: "RAW STRENGTH", val: active.stats.strength, icon: Shield },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="flex items-center justify-between text-xs mb-1 font-mono">
                        <span className="text-white/60 flex items-center gap-1.5">
                          <s.icon size={12} style={{ color: active.color }} />
                          {s.label}
                        </span>
                        <span className="font-bold text-white">{s.val}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-ink-800 overflow-hidden">
                        <motion.div
                          key={`${active.id}-${s.label}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${s.val}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full"
                          style={{
                            background: `linear-gradient(90deg, ${active.color}77, ${active.color})`,
                            boxShadow: `0 0 8px ${active.color}`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-white/40">
                <span>SECTOR: NAIROBI UNDERGROUND</span>
                <span className="text-crimson font-bold">STATUS: WANTED</span>
              </div>
            </div>

            {/* Roster Selector Grid with all 7 characters */}
            <div>
              <div className="font-mono text-[10px] tracking-[0.25em] text-white/40 mb-3.5 uppercase font-semibold">
                SELECT PILOT ROSTER ({characters.length})
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2.5">
                {characters.map((c, i) => (
                  <button
                    key={c.id}
                    onClick={() => selectCharacter(i)}
                    className={`relative aspect-[3/4] p-1 border text-center transition-all duration-300 flex flex-col items-center justify-between ${
                      i === index
                        ? "bg-ink-850 border-crimson shadow-[0_0_15px_rgba(225,29,42,0.4)]"
                        : "bg-ink-900/60 border-white/[0.06] hover:border-white/25 opacity-65 hover:opacity-100"
                    }`}
                  >
                    <div className="w-full flex-1 flex items-center justify-center overflow-hidden">
                      <TransparentImage
                        src={c.image}
                        alt={c.name}
                        tolerance={55}
                        feather={30}
                        className="w-full h-full object-contain object-bottom"
                      />
                    </div>
                    <span
                      className="font-mono text-[8px] sm:text-[9px] tracking-wider uppercase truncate w-full pt-1 border-t border-white/[0.06]"
                      style={{ color: i === index ? c.color : "#fff" }}
                    >
                      {c.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
