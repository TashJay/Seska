import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";
import NewsHeadline from "./NewsHeadline";

const accentColors: Record<string, string> = {
  crimson: "#e11d2a",
  electric: "#ffd21a",
  neon: "#22d3ee",
  plasma: "#a855f7",
  blaze: "#ff6b1a",
  toxic: "#9ae600",
};

type HeadlineType = "breaking-news" | "newspaper" | "underground-flyer" | "state-decree";

interface HeadlineData {
  variant: HeadlineType;
  headline: string;
  subhead?: string;
  bodyPreview?: string;
  ticker?: string;
  location?: string;
}

function Chapter({
  chapterNum,
  eyebrow,
  title,
  body,
  headline,
  imageSide = "right",
  accent = "crimson",
  accentText,
  id,
  bigNumber,
}: {
  chapterNum: string;
  eyebrow: string;
  title: ReactNode;
  body: ReactNode;
  headline: HeadlineData;
  imageSide?: "left" | "right";
  accent?: string;
  accentText?: string;
  id?: string;
  bigNumber?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.5 });

  const textY = useTransform(smooth, [0, 0.5, 1], [50, 0, -50]);
  const textOpacity = useTransform(smooth, [0, 0.25, 0.85, 1], [0, 1, 1, 0]);

  const imgY = useTransform(smooth, [0, 1], [60, -60]);
  const imgRotate = useTransform(smooth, [0, 0.5, 1], [imageSide === "left" ? -3 : 3, 0, imageSide === "left" ? 3 : -3]);

  const bigNumY = useTransform(smooth, [0, 1], [60, -60]);
  const bigNumOpacity = useTransform(smooth, [0, 0.3, 0.7, 1], [0, 0.04, 0.04, 0]);

  const lineScaleX = useTransform(smooth, [0.15, 0.5], [0, 1]);
  const c = accentColors[accent] || "#e11d2a";
  const isLeft = imageSide === "left";

  return (
    <section
      ref={ref}
      id={id}
      className="relative min-h-[90vh] flex items-center overflow-hidden py-28 sm:py-36 lg:py-44"
    >
      {/* Background chapter watermark */}
      {bigNumber && (
        <motion.div
          style={{ y: bigNumY, opacity: bigNumOpacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        >
          <span className="head-xl text-[40vw] text-white select-none">{bigNumber}</span>
        </motion.div>
      )}

      {/* Atmospheric backlight */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at ${isLeft ? "25%" : "75%"} 50%, ${c}12, transparent 70%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">

          {/* Text column */}
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className={`lg:col-span-5 flex flex-col justify-center space-y-7 sm:space-y-9 ${
              isLeft ? "lg:order-2" : "lg:order-1"
            }`}
          >
            {/* Chapter tag */}
            <div className="flex items-center gap-3.5 flex-wrap">
              <div
                className="font-mono text-xs tracking-[0.35em] font-semibold"
                style={{ color: c }}
              >
                CHAPTER {chapterNum}
              </div>
              <motion.div
                style={{ scaleX: lineScaleX, background: c }}
                className="h-px w-12 origin-left"
              />
              <div className="font-mono text-xs tracking-[0.25em] text-white/50 uppercase">
                {eyebrow}
              </div>
            </div>

            {/* Title */}
            <h2 className="head-xl text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-[0.95] tracking-tight">
              {title}
            </h2>

            {/* Body */}
            <div className="space-y-5 text-white/65 text-base sm:text-lg leading-[1.75] font-body max-w-xl">
              {body}
            </div>

            {accentText && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="pt-2"
              >
                <span
                  className="head-xl text-xl sm:text-2xl tracking-[0.15em] inline-block font-bold"
                  style={{ color: c, textShadow: `0 0 25px ${c}66` }}
                >
                  {accentText}
                </span>
              </motion.div>
            )}
          </motion.div>

          {/* Headline visual column */}
          <div
            className={`lg:col-span-7 relative flex items-center justify-center ${
              isLeft ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <motion.div
              style={{ y: imgY, rotate: imgRotate }}
              className="w-full max-w-2xl"
            >
              <NewsHeadline {...headline} />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default function StorySection() {
  return (
    <div className="relative divide-y divide-white/[0.04] bg-ink-950">
      <Chapter
        id="world"
        chapterNum="01"
        bigNumber="01"
        eyebrow="THE TRUTH BROADCAST"
        accent="crimson"
        title={
          <>
            <span className="text-stroke-white">Anonymous Morans</span>
            <br />
            Stole the Truth.
          </>
        }
        body={
          <>
            <p>
              Deep in Nairobi's underground tech grid, a rebel hacker collective known as{" "}
              <strong className="text-white">Anonymous Morans</strong> intercepted decades of siphoned public wealth.
            </p>
            <p>
              They decrypted overseas shell accounts in Panama, Zurich, and Dubai — compiling forty-seven counts of corruption onto a single hardened military drive.
            </p>
          </>
        }
        headline={{
          variant: "breaking-news",
          headline: "Hackers Release Encrypted Drive Exposing 47 Corrupt Accounts",
          subhead: "Anonymous Morans claim responsibility · Overseas vaults compromised",
          location: "NAIROBI · LIVE",
          ticker:
            "ANONYMOUS MORANS RELEASE STATEMENT · SHELL ACCOUNTS IN ZURICH DUBAI PANAMA EXPOSED · GOVERNMENT DENIES ALLEGATIONS · INTERNATIONAL TRIBUNAL ON STANDBY · HUNT FOR DRIVE INTENSIFIES",
        }}
        imageSide="right"
      />

      <Chapter
        chapterNum="02"
        bigNumber="02"
        eyebrow="STATE OF EMERGENCY"
        accent="blaze"
        title={
          <>
            A Nation
            <br />
            <span className="text-stroke-crimson">Under Lockdown.</span>
          </>
        }
        body={
          <>
            <p>
              The corrupt oligarchy declared a nationwide curfew. High-tech roadblocks, rogue mercenary convoys, and automated interceptors have sealed every expressway from Mombasa to Malaba.
            </p>
            <p>
              The decree is total: find and incinerate the drive before international tribunals receive the encrypted ledger.
            </p>
          </>
        }
        headline={{
          variant: "newspaper",
          headline: "Nation Sealed Under State of Emergency",
          subhead:
            "Government imposes total curfew · Every road, port, and border closed until further notice",
          bodyPreview:
            "The unprecedented decree comes hours after Anonymous Morans revealed the classified drive. Ministers warn that any citizen aiding the transporter will face treason charges.",
        }}
        imageSide="left"
      />

      <Chapter
        chapterNum="03"
        bigNumber="03"
        eyebrow="THE CALL TO ACTION"
        accent="electric"
        title={
          <>
            Now It's
            <br />
            <span className="text-electric text-glow-electric">In Your Hands.</span>
          </>
        }
        body={
          <>
            <p>
              You are the transporter. Outrun rogue agencies across savannah highways, modify your machine in underground garages, and survive the heat with allied matatus.
            </p>
            <p>
              Deliver the hard drive to the international coalition waiting at the border — and bring the corrupt to justice.
            </p>
          </>
        }
        headline={{
          variant: "underground-flyer",
          headline: "Transporter Wanted.",
          subhead:
            "One drive. One nation. One border. The Anonymous Morans need a fearless pilot who won't stop until Malaba.",
          bodyPreview:
            "If you can drive, drift, and disappear — the network will find you. Bring the drive across the border and end forty-seven years of theft. This is not a race. This is a revolution.",
        }}
        imageSide="right"
        accentText="RACE · ESCAPE · DELIVER · JUSTICE"
      />
    </div>
  );
}
