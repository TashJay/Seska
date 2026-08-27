import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Flame, Wrench, Settings, Radio, Bus } from "lucide-react";

const roles = [
  {
    title: "Racer",
    desc: "Carry the drive. Dodge road spikes, perform stunts on live TV, and cross the border.",
    color: "#e11d2a",
    num: "01",
    icon: Flame,
    perk: "+5,000 EXP / Clean Run",
  },
  {
    title: "Modder",
    desc: "Craft custom parts, nitrous injectors, and tune engine curves for allied racers.",
    color: "#22d3ee",
    num: "02",
    icon: Wrench,
    perk: "Craft Unique Blueprint Parts",
  },
  {
    title: "Mechanic",
    desc: "Repair bullet holes, overheated turbos, and blown tires at safehouse checkpoints.",
    color: "#ff6b1a",
    num: "03",
    icon: Settings,
    perk: "Fast In-Race Field Repairs",
  },
  {
    title: "Spotter",
    desc: "Hack government surveillance cams, jam radar, and mark police ambushes on the map.",
    color: "#10b981",
    num: "04",
    icon: Radio,
    perk: "Radar Jamming & Escape Intel",
  },
  {
    title: "Matatu Crew",
    desc: "Deploy smoke screens, swarm pursuit cruisers, and shield wanted racers to clear heat.",
    color: "#ffd21a",
    num: "05",
    icon: Bus,
    perk: "Mobile Safehouse & Escapes",
  },
];

export default function MultiplayerSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={ref} id="crew" className="relative py-28 sm:py-36 lg:py-44 overflow-hidden bg-ink-950">
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left info */}
          <motion.div style={{ y }} className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-3.5">
              <div className="h-px w-10 bg-crimson" />
              <span className="font-mono text-xs tracking-[0.35em] text-crimson uppercase font-semibold">
                MULTIPLAYER WORLD · 05 ROLES
              </span>
            </div>
            <h2 className="head-xl text-4xl sm:text-5xl lg:text-6xl text-white leading-[0.95]">
              More than a racer.
              <br />
              <span className="text-stroke-white">Be the movement.</span>
            </h2>
            <p className="text-white/65 text-base leading-[1.75] max-w-md font-body">
              The Ihenya underground is built by players. Pick your role — carry the drive, engineer the machines, hack police roadblocks, or swarm the highways in matatus to make racers disappear.
            </p>
            <a
              href="#signup"
              className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-white px-7 py-4 bg-crimson hover:bg-crimson-deep transition-colors font-bold shadow-[0_0_25px_rgba(225,29,42,0.4)]"
            >
              JOIN THE UNDERGROUND
              <ArrowUpRight size={14} />
            </a>
          </motion.div>

          {/* Right role cards */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4 sm:gap-5">
            {roles.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.a
                  href="#signup"
                  key={r.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  whileHover={{ y: -4 }}
                  className={`group relative overflow-hidden p-5 sm:p-6 bg-ink-900/70 backdrop-blur border border-white/[0.08] hover:border-white/30 cursor-pointer transition-all duration-300 block ${
                    i === 0 ? "sm:col-span-2" : ""
                  }`}
                >
                  <div
                    className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: r.color }}
                  />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Icon size={16} style={{ color: r.color }} />
                        <span
                          className="font-mono text-[9px] sm:text-[10px] tracking-[0.35em] font-bold"
                          style={{ color: r.color }}
                        >
                          ROLE · #{r.num}
                        </span>
                      </div>
                      <ArrowUpRight
                        size={15}
                        className="text-white/30 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                      />
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl uppercase text-white mb-1.5">
                      {r.title}
                    </h3>
                    <p className="text-white/55 text-xs sm:text-sm leading-relaxed mb-4">{r.desc}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                      <span className="font-mono text-[9px] text-white/40 uppercase">PERK:</span>
                      <span className="font-mono text-[9px] sm:text-[10px] text-white/80 font-bold" style={{ color: r.color }}>
                        {r.perk}
                      </span>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
