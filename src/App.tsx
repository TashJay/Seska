import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import StorySection from "./components/StorySection";
import WorldMapSection from "./components/WorldMapSection";
import NewsStuntsSection from "./components/NewsStuntsSection";
import GameplaySection from "./components/GameplaySection";
import VehicleSection from "./components/VehicleSection";
import CharacterSection from "./components/CharacterSection";
import GarageSection from "./components/GarageSection";
import MultiplayerSection from "./components/MultiplayerSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(t);
          setTimeout(onComplete, 500);
          return 100;
        }
        return p + Math.random() * 10 + 4;
      });
    }, 100);
    return () => clearInterval(t);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] bg-ink-950 flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <img
            src="/logo-ihenya.png"
            alt="IHENYA Racing"
            width={48}
            height={48}
            className="w-11 h-11 object-contain"
            style={{ filter: "drop-shadow(0 0 15px rgba(225,29,42,0.4))" }}
          />
          <span className="font-display text-4xl tracking-tight text-white font-bold">IHENYA</span>
        </div>
        <p className="font-mono text-[9px] tracking-[0.5em] text-white/40 mb-14 uppercase">
          RACING · KENYA · 2047
        </p>

        <div className="w-64 h-[2px] bg-ink-800 mx-auto overflow-hidden mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-crimson via-electric to-crimson"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="font-mono text-[10px] tracking-[0.3em] text-white/50 uppercase font-semibold">
          CLEARANCE LOADING · {Math.min(Math.round(progress), 100).toString().padStart(3, "0")}%
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const handleComplete = useCallback(() => setLoading(false), []);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={handleComplete} />}
      </AnimatePresence>

      <div className={loading ? "opacity-0" : "opacity-100 transition-opacity duration-700 relative z-10"}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ScrollProgress />
        <Navbar />
        <main id="main-content">
          <HeroSection />
          <StorySection />
          <WorldMapSection />
          <GameplaySection />
          <VehicleSection />
          <CharacterSection />
          <NewsStuntsSection />
          <GarageSection />
          <MultiplayerSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
}
