import { motion } from "framer-motion";

const socials = [
  { name: "X", icon: "𝕏", href: "#" },
  { name: "INSTAGRAM", icon: "IG", href: "#" },
  { name: "TIKTOK", icon: "TT", href: "#" },
  { name: "YOUTUBE", icon: "YT", href: "#" },
  { name: "DISCORD", icon: "DC", href: "#" },
];

const columns = [
  { title: "STREET ARCHIVE", links: [{ l: "Anonymous Morans Story", h: "#story" }, { l: "Vehicle Vault (7 Cars)", h: "#cars" }, { l: "Racer Legends (5 Drivers)", h: "#racers" }, { l: "Allied Garages (5 Shops)", h: "#garages" }] },
  { title: "MULTIPLAYER", links: [{ l: "Racer Career", h: "#crew" }, { l: "Modder Workshop", h: "#crew" }, { l: "Matatu Swarm Assist", h: "#crew" }, { l: "Live KBC Stunts", h: "#world" }] },
  { title: "COMMUNITY", links: [{ l: "Pre-Register Clearance", h: "#signup" }, { l: "Nairobi Discord Server", h: "#" }, { l: "Closed Beta Guidelines", h: "#signup" }, { l: "Official Rules", h: "#" }] },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.08] pt-14 pb-8 bg-ink-950">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <img
                src="/logo-ihenya.png"
                alt="IHENYA Racing"
                width={40}
                height={40}
                className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
                style={{ filter: "drop-shadow(0 0 10px rgba(225,29,42,0.3))" }}
              />
              <div>
                <div className="font-display text-2xl sm:text-3xl leading-none tracking-tight text-white">
                  IHENYA
                </div>
                <div className="font-mono text-[8px] sm:text-[9px] tracking-[0.35em] text-crimson mt-0.5 font-bold">
                  RACING · FUTURE KENYA 2047
                </div>
              </div>
            </motion.div>
            <p className="text-white/50 text-xs sm:text-sm max-w-sm leading-relaxed font-body mb-6">
              Transport the Anonymous Morans drive across a locked-down Kenya. Modify machines in underground garages, survive rogue mercenary convoys, and expose the truth at the border.
            </p>
            <div className="flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  className="w-9 h-9 flex items-center justify-center border border-white/10 hover:border-crimson hover:bg-crimson/10 transition-all font-mono text-[10px] text-white/70 hover:text-white"
                  title={s.name}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {columns.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h4 className="font-mono text-[10px] tracking-[0.3em] text-white/40 mb-4 uppercase font-bold">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.l}>
                    <a
                      href={link.h}
                      className="text-white/60 hover:text-white text-xs transition-colors duration-200"
                    >
                      {link.l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Direct Support */}
          <div className="lg:col-span-1">
            <h4 className="font-mono text-[10px] tracking-[0.3em] text-white/40 mb-4 uppercase font-bold">
              SECTOR
            </h4>
            <p className="font-mono text-xs text-white/70">Nairobi, KE</p>
            <p className="font-mono text-[10px] text-crimson mt-1 font-bold">ALPHA BUILD</p>
          </div>
        </div>

        {/* Big Watermark Strip */}
        <div className="border-t border-white/[0.04] pt-6 overflow-hidden">
          <div className="head-xl text-[16vw] leading-none uppercase text-white/[0.03] tracking-tighter select-none text-center">
            IHENYA RACING
          </div>
        </div>

        {/* Legal bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.06] mt-4 font-mono text-[9px] text-white/40 tracking-[0.25em]">
          <p>© 2026 IHENYA RACING GAME · ALL RIGHTS RESERVED</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-white transition-colors">TERMS OF SERVICE</a>
            <a href="#" className="hover:text-white transition-colors">CLEARANCE ACCESS</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
