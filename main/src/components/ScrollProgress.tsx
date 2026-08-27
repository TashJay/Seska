import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX: smooth }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-crimson via-electric to-neon origin-left z-[60] shadow-[0_0_10px_rgba(220,38,38,0.5)]"
    />
  );
}
