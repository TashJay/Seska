import { motion, useSpring, useMotionValueEvent, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useState } from "react";

/**
 * Premium black & red racing speedometer.
 * - Black dial with chrome bezel
 * - Red arc, red ticks in redline, red needle with counterweight
 * - White digital readout with red glow
 * Sweeps 240° from 7 o'clock (bottom-left) through 12 to 5 o'clock (bottom-right).
 */
export default function SpeedGauge({
  progress,
  size = 200,
  label = "SPEED",
  max = 320,
  unit = "KM/H",
}: {
  progress: MotionValue<number>;
  size?: number;
  label?: string;
  max?: number;
  unit?: string;
}) {
  const smooth = useSpring(progress, { stiffness: 120, damping: 22, mass: 0.5 });

  const RED = "#e11d2a";
  const RED_DIM = "#3a0b12";

  // Angles are in CSS convention: 0 = up (12 o'clock), positive = clockwise.
  // Start at 7 o'clock (210°), end at 5 o'clock (510° = 150° + 360). 240° sweep.
  const START_CSS = 210;
  const SWEEP = 240;

  const cx = size / 2;
  const cy = size / 2;
  const arcR = size * 0.4;
  const tickOuterR = size * 0.38;
  const labelR = size * 0.29;

  // Convert CSS angle to math angle, then to (x,y)
  const polar = (cssDeg: number, r: number) => {
    const mathRad = ((90 - cssDeg) * Math.PI) / 180;
    return { x: cx + r * Math.cos(mathRad), y: cy - r * Math.sin(mathRad) };
  };

  // Ticks
  const NUM_TICKS = 25;
  const ticks = Array.from({ length: NUM_TICKS }, (_, i) => {
    const t = i / (NUM_TICKS - 1);
    const angle = START_CSS + t * SWEEP;
    const major = i % 5 === 0;
    const inner = tickOuterR - (major ? size * 0.055 : size * 0.028);
    return {
      p1: polar(angle, tickOuterR),
      p2: polar(angle, inner),
      major,
      redline: t > 0.8,
    };
  });

  // Number labels at 5 major ticks
  const labels = Array.from({ length: 5 }, (_, i) => {
    const t = i / 4;
    const angle = START_CSS + t * SWEEP;
    return {
      pos: polar(angle, labelR),
      val: Math.round(t * max),
      redline: t >= 0.75,
    };
  });

  // Arc path (large arc since sweep > 180°)
  const arcStart = polar(START_CSS, arcR);
  const arcEnd = polar(START_CSS + SWEEP, arcR);
  const largeArc = SWEEP > 180 ? 1 : 0;
  const arcPath = `M ${arcStart.x} ${arcStart.y} A ${arcR} ${arcR} 0 ${largeArc} 1 ${arcEnd.x} ${arcEnd.y}`;
  const circumference = (SWEEP / 360) * (2 * Math.PI * arcR);
  const dashOffset = useTransform(smooth, [0, 1], [circumference, 0]);

  // Needle CSS rotation = start angle + progress * sweep.
  // But a div at transform-origin bottom, rotated 0deg, points UP. That's CSS 0°. Perfect.
  const needleRotate = useTransform(smooth, [0, 1], [START_CSS, START_CSS + SWEEP]);
  const needleTransform = useTransform(needleRotate, (a) => `rotate(${a}deg)`);

  // Digital readout
  const [display, setDisplay] = useState(0);
  useMotionValueEvent(smooth, "change", (v) => {
    setDisplay(Math.round(Math.max(0, Math.min(1, v)) * max));
  });

  const dangerOpacity = useTransform(smooth, [0.8, 1], [0, 1]);
  const needleLength = arcR - 12;

  return (
    <div style={{ width: size, height: size }} className="relative select-none">
      {/* Outer bezel */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 25%, #34343a 0%, #17171b 45%, #050506 100%)",
          boxShadow:
            "inset 0 3px 6px rgba(255,255,255,0.08), inset 0 -4px 10px rgba(0,0,0,0.7), 0 8px 30px rgba(0,0,0,0.6)",
        }}
      />
      {/* Chrome ring */}
      <div
        className="absolute rounded-full"
        style={{
          inset: size * 0.03,
          background:
            "conic-gradient(from 0deg, #55555a, #1a1a1e, #55555a, #1a1a1e, #55555a)",
          padding: 1.5,
        }}
      >
        {/* Inner matte black dial */}
        <div
          className="w-full h-full rounded-full relative overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, #17171b 0%, #08080a 60%, #030303 100%)",
            boxShadow:
              "inset 0 6px 16px rgba(0,0,0,0.9), inset 0 -1px 2px rgba(255,255,255,0.03)",
          }}
        >
          {/* Subtle top sheen */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 40% at 50% 15%, rgba(255,255,255,0.06), transparent 70%)",
            }}
          />

          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${size} ${size}`}
            className="absolute inset-0"
          >
            {/* Dim base arc */}
            <path
              d={arcPath}
              fill="none"
              stroke={RED_DIM}
              strokeWidth={size * 0.02}
              strokeLinecap="round"
            />
            {/* Bright animated red arc */}
            <motion.path
              d={arcPath}
              fill="none"
              stroke={RED}
              strokeWidth={size * 0.024}
              strokeLinecap="round"
              strokeDasharray={circumference}
              style={{
                strokeDashoffset: dashOffset,
                filter: `drop-shadow(0 0 6px ${RED})`,
              }}
            />

            {/* Ticks */}
            {ticks.map((t, i) => (
              <line
                key={i}
                x1={t.p1.x}
                y1={t.p1.y}
                x2={t.p2.x}
                y2={t.p2.y}
                stroke={
                  t.redline
                    ? RED
                    : t.major
                    ? "rgba(255,255,255,0.7)"
                    : "rgba(255,255,255,0.25)"
                }
                strokeWidth={t.major ? 2 : 1}
                strokeLinecap="round"
              />
            ))}

            {/* Number labels */}
            {labels.map((n, i) => (
              <text
                key={i}
                x={n.pos.x}
                y={n.pos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="JetBrains Mono, monospace"
                fontSize={size * 0.06}
                fontWeight={700}
                fill={n.redline ? RED : "rgba(255,255,255,0.65)"}
              >
                {n.val}
              </text>
            ))}
          </svg>

          {/* Danger glow at redline */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              boxShadow: `inset 0 0 40px ${RED}, 0 0 30px ${RED}`,
              opacity: dangerOpacity,
            }}
          />

          {/* Needle */}
          <motion.div
            className="absolute left-1/2 top-1/2"
            style={{
              width: 4,
              height: needleLength,
              marginLeft: -2,
              marginTop: -needleLength,
              transform: needleTransform,
              transformOrigin: "50% 100%",
              background: `linear-gradient(to top, ${RED} 30%, ${RED} 70%, rgba(225,29,42,0.2) 100%)`,
              borderRadius: 2,
              boxShadow: `0 0 8px ${RED}, 0 0 16px rgba(225,29,42,0.4)`,
              filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.8))",
            }}
          >
            {/* Needle tip */}
            <div
              style={{
                position: "absolute",
                top: -8,
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "4px solid transparent",
                borderRight: "4px solid transparent",
                borderBottom: `10px solid ${RED}`,
              }}
            />
            {/* Counterweight */}
            <div
              style={{
                position: "absolute",
                bottom: -14,
                left: "50%",
                transform: "translateX(-50%)",
                width: 8,
                height: 16,
                background: RED,
                borderRadius: 2,
                boxShadow: `0 0 6px ${RED}`,
              }}
            />
          </motion.div>

          {/* Center hub */}
          <div
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: size * 0.14,
              height: size * 0.14,
              marginLeft: -(size * 0.07),
              marginTop: -(size * 0.07),
              background:
                "radial-gradient(circle at 30% 30%, #4a0d15 0%, #1a0508 60%, #000 100%)",
              boxShadow: `0 0 12px ${RED}88, inset 0 1px 2px rgba(255,255,255,0.15), 0 3px 6px rgba(0,0,0,0.6)`,
              border: `1.5px solid ${RED}`,
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: 6,
              height: 6,
              marginLeft: -3,
              marginTop: -3,
              background: RED,
              boxShadow: `0 0 8px ${RED}`,
            }}
          />

          {/* Top label (SPEED / RPM / TOP SPEED) */}
          <div
            className="absolute left-1/2 -translate-x-1/2 font-mono uppercase"
            style={{
              top: size * 0.22,
              fontSize: size * 0.055,
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.5)",
              fontWeight: 500,
            }}
          >
            {label}
          </div>

          {/* Digital readout */}
          <div
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
            style={{ bottom: size * 0.16 }}
          >
            <span
              className="font-display leading-none tabular-nums"
              style={{
                fontSize: size * 0.2,
                color: "#fff",
                textShadow: `0 0 14px ${RED}, 0 2px 4px rgba(0,0,0,0.9)`,
                fontWeight: 700,
              }}
            >
              {String(display).padStart(3, "0")}
            </span>
            <span
              className="font-mono mt-1"
              style={{
                fontSize: size * 0.05,
                letterSpacing: "0.25em",
                color: RED,
                fontWeight: 500,
              }}
            >
              {unit}
            </span>
          </div>

          {/* Glass reflection */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 30% at 50% 10%, rgba(255,255,255,0.07), transparent 70%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
