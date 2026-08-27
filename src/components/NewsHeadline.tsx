import { motion } from "framer-motion";
import { AlertTriangle, Radio, Skull, ShieldAlert } from "lucide-react";

/**
 * NewsHeadline — cinematic headline graphics for the story chapters.
 * Each variant renders a fully distinct editorial style so the same
 * component can act as a Breaking-News screen, a newspaper front page,
 * or an underground rebel flyer.
 */

type Variant = "breaking-news" | "newspaper" | "underground-flyer" | "state-decree";

interface Props {
  variant: Variant;
  headline: string;
  subhead?: string;
  masthead?: string;
  date?: string;
  edition?: string;
  location?: string;
  ticker?: string;
  bodyPreview?: string;
  color?: string;
}

export default function NewsHeadline(props: Props) {
  switch (props.variant) {
    case "breaking-news":
      return <BreakingNews {...props} />;
    case "newspaper":
      return <Newspaper {...props} />;
    case "underground-flyer":
      return <UndergroundFlyer {...props} />;
    case "state-decree":
      return <StateDecree {...props} />;
    default:
      return null;
  }
}

/* ---------- 1. BREAKING NEWS SCREEN ---------- */
function BreakingNews({ headline, subhead, location = "NAIROBI · KENYA", ticker }: Props) {
  return (
    <div className="relative w-full aspect-[16/10] bg-ink-950 border border-white/[0.08] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.7)]">
      {/* Top LIVE bar */}
      <div className="relative z-20 flex items-center justify-between bg-crimson px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
          <span className="font-mono text-[10px] tracking-[0.3em] text-white font-bold">
            LIVE · KBC BREAKING
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Radio size={11} className="text-white/90" />
          <span className="font-mono text-[9px] tracking-[0.25em] text-white/90">
            {location}
          </span>
        </div>
      </div>

      {/* Simulated news footage area */}
      <div className="relative flex-1 h-[calc(100%-40px)] bg-gradient-to-b from-ink-800 via-ink-900 to-ink-950 overflow-hidden">
        {/* Radial ambient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(225,29,42,0.25), transparent 65%)",
          }}
        />

        {/* KBC bug top right */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
          <div className="w-8 h-8 border-2 border-white/40 flex items-center justify-center bg-black/40">
            <span className="font-display text-white font-bold text-[10px]">KBC</span>
          </div>
        </div>

        {/* Timestamp corner */}
        <div className="absolute top-3 left-3 z-10 font-mono text-[9px] text-white/50 tracking-widest">
          03:47 EAT
        </div>

        {/* Anonymous Morans silhouette scene */}
        <div className="relative h-full flex items-center justify-center">
          <svg viewBox="0 0 400 220" className="w-[75%] h-[65%] opacity-70">
            {/* Central Anonymous mask emblem */}
            <g transform="translate(200, 90)">
              <circle cx="0" cy="0" r="42" fill="none" stroke="#e11d2a" strokeWidth="2" opacity="0.5" />
              <circle cx="0" cy="0" r="30" fill="#e11d2a" opacity="0.15" />
              {/* Simplified anonymous mask */}
              <path
                d="M -20 -5 Q -20 -18, -10 -18 Q 0 -22, 10 -18 Q 20 -18, 20 -5 Q 20 15, 0 22 Q -20 15, -20 -5 Z"
                fill="#e11d2a"
                opacity="0.4"
              />
              <path
                d="M -12 -8 L -5 -3 M 5 -3 L 12 -8"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.7"
              />
              <path d="M -6 6 Q 0 10, 6 6" stroke="#fff" strokeWidth="1.5" fill="none" opacity="0.7" />
            </g>

            {/* Left figure silhouette */}
            <g transform="translate(100, 110)" opacity="0.65">
              <ellipse cx="0" cy="-25" rx="14" ry="17" fill="#0a0a0e" />
              <path d="M -22 -5 Q -22 -18, 0 -20 Q 22 -18, 22 -5 L 22 65 L -22 65 Z" fill="#0a0a0e" />
              <path d="M -14 30 L 14 30" stroke="#e11d2a" strokeWidth="1" opacity="0.6" />
            </g>

            {/* Right figure silhouette */}
            <g transform="translate(300, 115)" opacity="0.65">
              <ellipse cx="0" cy="-28" rx="15" ry="18" fill="#0a0a0e" />
              <path d="M -25 -8 Q -25 -20, 0 -22 Q 25 -20, 25 -8 L 25 60 L -25 60 Z" fill="#0a0a0e" />
              <path d="M -15 22 L 15 22" stroke="#e11d2a" strokeWidth="1" opacity="0.6" />
            </g>

            {/* Data stream lines */}
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={i}
                x1={100 + i * 50}
                y1="180"
                x2={100 + i * 50}
                y2="200"
                stroke="#22d3ee"
                strokeWidth="1"
                opacity={0.3 + i * 0.1}
              />
            ))}
          </svg>
        </div>

        {/* Static / scanlines overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.7) 2px, rgba(0,0,0,0.7) 4px)",
          }}
        />

        {/* Corner brackets */}
        <div className="absolute top-1/3 left-4 w-3 h-3 border-l border-t border-white/30" />
        <div className="absolute top-1/3 right-4 w-3 h-3 border-r border-t border-white/30" />

        {/* Lower-third headline chyron */}
        <div className="absolute bottom-9 left-0 right-0 z-10 px-4">
          <div className="bg-ink-950/95 backdrop-blur-sm border-l-[4px] border-crimson p-3 shadow-2xl">
            <div className="font-mono text-[9px] tracking-[0.3em] text-crimson mb-1.5 font-bold">
              BREAKING · JUST IN
            </div>
            <div className="font-display text-base sm:text-lg lg:text-xl text-white leading-tight tracking-tight">
              {headline}
            </div>
            {subhead && (
              <div className="font-mono text-[10px] text-white/70 mt-1.5 tracking-wide">
                {subhead}
              </div>
            )}
          </div>
        </div>

        {/* Bottom ticker */}
        <div className="absolute bottom-0 left-0 right-0 bg-black border-t border-white/10 h-7 flex items-center overflow-hidden">
          <div className="bg-crimson h-full px-3 flex items-center flex-shrink-0">
            <span className="font-mono text-[9px] text-white font-bold tracking-widest">TICKER</span>
          </div>
          <motion.div
            animate={{ x: ["100%", "-100%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="whitespace-nowrap font-mono text-[9px] text-white/70 tracking-[0.25em] pl-4"
          >
            {ticker ||
              "NATION UNDER LOCKDOWN · GOVERNMENT MOBILIZES SECURITY FORCES · CORRUPT DRIVE MUST BE FOUND · ROADBLOCKS ACTIVE 24/7 · CURFEW EXTENDED · ANONYMOUS MORANS SILENT · INTERNATIONAL TRIBUNAL AWAITS DELIVERY"}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 2. NEWSPAPER FRONT PAGE ---------- */
function Newspaper({
  headline,
  subhead,
  masthead = "THE NAIROBI HERALD",
  date = "Sunday · 15 March · 2047",
  edition = "SPECIAL EMERGENCY EDITION · No. 47,308",
  bodyPreview,
}: Props) {
  return (
    <div className="relative w-full aspect-[16/10] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.75)]">
      {/* Aged paper background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, #f5f0e4 0%, #e8ddc7 55%, #c9b998 100%)",
        }}
      />
      {/* Paper grain */}
      <div
        className="absolute inset-0 opacity-25 mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.7'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative h-full p-5 sm:p-7 flex flex-col text-ink-950">
        {/* Masthead */}
        <div className="text-center pb-2 border-b-4 border-double border-ink-950">
          <div className="font-mono text-[8px] tracking-[0.4em] uppercase mb-0.5">
            EST. 1960 · ONE HUNDRED THOUSAND EDITION
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-none"
            style={{ fontFamily: "'Playfair Display', 'Times New Roman', serif" }}
          >
            {masthead}
          </h1>
          <div className="flex justify-between items-center text-[9px] font-mono uppercase tracking-widest mt-1.5">
            <span>{date}</span>
            <span className="text-red-800 font-bold">{edition}</span>
            <span>KSH 200 / USD 5</span>
          </div>
        </div>

        {/* SPECIAL EDITION stamp */}
        <div className="absolute top-16 right-4 sm:top-20 sm:right-6 z-10 rotate-[12deg] border-4 border-red-800 px-3 py-1 bg-transparent opacity-90">
          <span className="font-mono text-[10px] font-bold tracking-widest text-red-800">
            SPECIAL EDITION
          </span>
        </div>

        {/* Main headline area */}
        <div className="flex-1 pt-4 sm:pt-5 grid grid-cols-3 gap-3 sm:gap-4">
          {/* Left column - subhead + preview */}
          <div className="col-span-1 space-y-2">
            <div className="border-t-2 border-b border-ink-950 py-1">
              <span className="font-mono text-[9px] font-bold tracking-widest uppercase">
                LEAD STORY
              </span>
            </div>
            <p className="text-[10px] leading-relaxed" style={{ fontFamily: "'Times New Roman', serif" }}>
              {bodyPreview ||
                "Officials confirmed today that unprecedented emergency measures are being enforced across all fourteen counties. Citizens are urged to remain indoors as security operations continue nationwide."}
            </p>
            <div className="w-full h-16 bg-ink-950/15 border border-ink-950/30 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <ShieldAlert size={24} className="text-ink-950/40" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-ink-950/70 py-0.5 px-1">
                <span className="font-mono text-[7px] text-white tracking-wider">
                  FILE · GOVT DECREE
                </span>
              </div>
            </div>
            <p className="text-[9px] leading-snug text-ink-800" style={{ fontFamily: "'Times New Roman', serif" }}>
              "Every road, every border sealed until further notice." — Ministry
            </p>
          </div>

          {/* Center + right column - massive headline */}
          <div className="col-span-2 flex flex-col justify-between">
            <div>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl leading-[0.9] tracking-tight font-black uppercase text-ink-950"
                style={{ fontFamily: "'Playfair Display', 'Times New Roman', serif" }}
              >
                {headline}
              </h2>
              {subhead && (
                <p
                  className="mt-2 text-sm sm:text-base italic text-ink-800 leading-snug"
                  style={{ fontFamily: "'Times New Roman', serif" }}
                >
                  {subhead}
                </p>
              )}
            </div>

            {/* Two-column body preview */}
            <div className="grid grid-cols-2 gap-3 mt-3">
              {[0, 1].map((i) => (
                <div key={i} className="text-[9px] leading-snug space-y-1" style={{ fontFamily: "'Times New Roman', serif" }}>
                  <span className="font-bold uppercase text-[8px] tracking-wider block">
                    {i === 0 ? "By I. Wanjiku, Chief Correspondent" : "Continued from front page"}
                  </span>
                  <p className="text-ink-900/90">
                    Sources within the presidential office described a widespread mobilization
                    of security battalions across the highway grid. Every checkpoint from
                    Malaba to Namanga is now automated.
                  </p>
                  <p className="text-ink-900/75">
                    Meanwhile, underground networks report suspicious activity in Kileleshwa
                    and Industrial Area as authorities intensify searches.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t-2 border-ink-950 mt-2 pt-1.5 flex items-center justify-between font-mono text-[8px] uppercase tracking-widest text-ink-800">
          <span>Volume XLVII · Pages 1–72</span>
          <span>Weather: Overcast · 22°C</span>
          <span className="text-red-800 font-bold">CURFEW: 18:00 – 06:00</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- 3. UNDERGROUND REBEL FLYER ---------- */
function UndergroundFlyer({ headline, subhead, bodyPreview }: Props) {
  return (
    <div className="relative w-full aspect-[16/10] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.75)]">
      {/* Off-white photocopy paper */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #e8e2d5 0%, #d4cbb6 50%, #bcaf94 100%)",
        }}
      />
      {/* Xerox grain and stains */}
      <div
        className="absolute inset-0 mix-blend-multiply opacity-30"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Torn edge effect */}
      <div
        className="absolute -top-2 left-0 right-0 h-3 bg-repeat-x"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 8'%3E%3Cpath fill='%23e8e2d5' d='M0 0 L2 5 L4 2 L6 6 L8 3 L10 7 L12 2 L14 5 L16 1 L18 6 L20 3 L20 0 Z'/%3E%3C/svg%3E\")",
          backgroundSize: "20px 8px",
        }}
      />

      <div className="relative h-full flex flex-col p-4 sm:p-6 text-ink-950">
        {/* Top tags */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="border-2 border-ink-950 px-2 py-0.5">
              <span className="font-mono text-[9px] font-bold tracking-widest uppercase">
                CLASSIFIED · MORAN NETWORK
              </span>
            </div>
          </div>
          {/* Anonymous emblem */}
          <div className="w-11 h-11 rounded-full border-2 border-red-800 flex items-center justify-center bg-red-800/10">
            <Skull size={22} className="text-red-800" />
          </div>
        </div>

        {/* Central massive brutalist call */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-red-800/25 font-mono text-[10px] tracking-[0.5em] uppercase mb-1 font-bold">
            [ ENCRYPTED BROADCAST · CHANNEL 47 ]
          </div>

          <h2
            className="text-4xl sm:text-5xl lg:text-6xl leading-[0.85] font-black uppercase tracking-tighter text-ink-950"
            style={{ fontFamily: "'Anton', 'Impact', sans-serif" }}
          >
            {headline}
          </h2>

          {subhead && (
            <p className="mt-3 text-base sm:text-lg font-medium text-ink-900 leading-snug max-w-lg">
              {subhead}
            </p>
          )}

          {/* Spray-paint style accent */}
          <div className="relative mt-4 py-2">
            <span
              className="inline-block bg-red-800 text-white font-mono text-xs sm:text-sm font-bold tracking-widest px-3 py-1 -rotate-2 shadow-md"
            >
              REWARD: FREEDOM
            </span>
          </div>

          {bodyPreview && (
            <p className="mt-4 font-mono text-[10px] sm:text-xs text-ink-900/80 max-w-md leading-relaxed">
              {bodyPreview}
            </p>
          )}
        </div>

        {/* Bottom fold */}
        <div className="border-t-2 border-dashed border-ink-950/60 pt-2 grid grid-cols-3 gap-3 items-center">
          <div>
            <span className="font-mono text-[8px] tracking-widest text-ink-900/60 uppercase block">
              CONTACT
            </span>
            <span className="font-mono text-[10px] text-red-800 font-bold">
              tor://morans.onion
            </span>
          </div>
          <div className="text-center">
            <span className="font-mono text-[8px] tracking-widest text-ink-900/60 uppercase block">
              CODEWORD
            </span>
            <span className="font-mono text-[10px] text-ink-950 font-bold">
              IHENYA-2047
            </span>
          </div>
          <div className="text-right">
            <span className="font-mono text-[8px] tracking-widest text-ink-900/60 uppercase block">
              STATUS
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-800 animate-pulse" />
              <span className="font-mono text-[10px] text-red-800 font-bold">
                RECRUITING
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 4. STATE DECREE (bonus variant) ---------- */
function StateDecree({ headline, subhead, bodyPreview }: Props) {
  return (
    <div className="relative w-full aspect-[16/10] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.75)]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #f7f4ea 0%, #ede8d5 50%, #d9d0b3 100%)",
        }}
      />
      <div className="relative h-full p-6 flex flex-col text-ink-950">
        <div className="flex items-center gap-3 pb-3 border-b-2 border-ink-950">
          <div className="w-12 h-12 rounded-full border-4 border-red-800 flex items-center justify-center">
            <AlertTriangle size={22} className="text-red-800" />
          </div>
          <div>
            <div className="font-mono text-[8px] tracking-widest uppercase text-ink-800">
              Republic of Kenya · Office of the President
            </div>
            <div className="font-display text-lg font-bold tracking-wide uppercase">
              Executive Decree No. 47/2047
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="font-mono text-[10px] tracking-[0.4em] text-red-800 mb-3 font-bold">
            NATIONAL EMERGENCY
          </div>
          <h2 className="head-xl text-4xl lg:text-5xl leading-[0.9] uppercase text-ink-950">
            {headline}
          </h2>
          {subhead && <p className="mt-3 text-base italic">{subhead}</p>}
          {bodyPreview && (
            <p className="mt-4 font-mono text-xs text-ink-900/80 max-w-lg leading-relaxed">
              {bodyPreview}
            </p>
          )}
        </div>
        <div className="border-t border-ink-950 pt-2 font-mono text-[9px] uppercase tracking-widest flex justify-between">
          <span>Effective Immediately</span>
          <span className="text-red-800 font-bold">By Order of the State</span>
        </div>
      </div>
    </div>
  );
}
