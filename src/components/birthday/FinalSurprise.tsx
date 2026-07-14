import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useState } from "react";
import { BIRTHDAY_NAME } from "@/config/birthday";

export function FinalSurprise() {
  const [stage, setStage] = useState<0 | 1 | 2 | 3>(0);

  const launch = () => {
    if (stage !== 0) return;
    setStage(1);

    // Fireworks
    const duration = 4000;
    const end = Date.now() + duration;
    const colors = ["#FF9A9E", "#FAD0C4", "#FFD1FF", "#FFD700", "#ffffff"];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
        startVelocity: 55,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
        startVelocity: 55,
      });
      if (Math.random() < 0.15) {
        confetti({
          particleCount: 60,
          spread: 360,
          startVelocity: 30,
          origin: {
            x: 0.2 + Math.random() * 0.6,
            y: 0.2 + Math.random() * 0.3,
          },
          colors,
          scalar: 1.1,
        });
      }
      if (Date.now() < end) requestAnimationFrame(frame);
    })();

    setTimeout(() => setStage(2), 2200);
    setTimeout(() => setStage(3), 4600);
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24">
      <motion.div
        className="absolute inset-0"
        animate={{
          background:
            stage === 0
              ? "radial-gradient(ellipse at center, #1a2340 0%, #0F172A 70%)"
              : "radial-gradient(ellipse at center, #3a2a4a 0%, #1a1230 70%)",
        }}
        transition={{ duration: 2 }}
      />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
        <AnimatePresence mode="wait">
          {stage === 0 && (
            <motion.button
              key="btn"
              type="button"
              onClick={launch}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className="group relative cursor-pointer"
            >
              <div
                className="absolute inset-0 -z-10 rounded-full blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,215,0,0.6), rgba(255,154,158,0.4), transparent)",
                  opacity: 0.5,
                }}
              />
              <span
                className="relative inline-flex items-center gap-3 rounded-full px-10 py-5 font-medium text-white"
                style={{
                  background: "linear-gradient(135deg, #ff9a9e, #ffd1ff, #ffd700)",
                  boxShadow:
                    "0 20px 40px -10px rgba(255,154,158,0.5), inset 0 1px 0 rgba(255,255,255,0.5)",
                }}
              >
                <span className="tracking-wide">One Last Surprise</span>
                <span aria-hidden>→</span>
              </span>
            </motion.button>
          )}

          {stage >= 1 && (
            <motion.div
              key="messages"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center gap-8"
            >
              <AnimatePresence mode="wait">
                {stage === 1 && (
                  <motion.p
                    key="m1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 1 }}
                    className="font-display text-4xl text-white/90 md:text-6xl"
                  >
                    Wishing you a day filled with laughter, cake, and unforgettable moments.
                  </motion.p>
                )}
                {stage === 2 && (
                  <motion.p
                    key="m2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 1 }}
                    className="font-display text-4xl text-white/90 md:text-6xl"
                  >
                    May this year bring new adventures, big wins, and countless reasons to smile.
                  </motion.p>
                )}
                {stage === 3 && (
                  <motion.div
                    key="m3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                      className="text-6xl"
                    >
                      🎉
                    </motion.div>
                    <p className="font-display text-5xl text-aurora md:text-8xl">Happy Birthday</p>
                    <p className="font-display text-4xl text-white md:text-6xl">{BIRTHDAY_NAME}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
