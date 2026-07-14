import { motion, useAnimationControls } from "framer-motion";
import confetti from "canvas-confetti";
import { useState } from "react";
import { Particles } from "./Particles";

type Props = { onOpen: () => void };

export function Hero({ onOpen }: Props) {
  const [opened, setOpened] = useState(false);
  const boxControls = useAnimationControls();
  const lidControls = useAnimationControls();
  const ribbonControls = useAnimationControls();

  const handleClick = async () => {
    if (opened) return;
    setOpened(true);

    await boxControls.start({
      x: [0, -8, 8, -6, 6, -3, 3, 0],
      transition: { duration: 0.7 },
    });

    ribbonControls.start({
      opacity: 0,
      scale: 0.4,
      y: -30,
      transition: { duration: 0.5 },
    });
    lidControls.start({
      y: -160,
      rotate: -18,
      opacity: 0.95,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    });

    // Confetti burst
    const end = Date.now() + 800;
    const colors = ["#FF9A9E", "#FAD0C4", "#FFD1FF", "#FFD700"];
    (function frame() {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 70,
        origin: { x: 0.2, y: 0.6 },
        colors,
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 70,
        origin: { x: 0.8, y: 0.6 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();

    setTimeout(onOpen, 1400);
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 20%, rgba(255,154,158,0.18), transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(255,209,255,0.16), transparent 55%), #0F172A",
        }}
      />
      <Particles count={70} />

      <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-3 text-xs font-medium uppercase tracking-[0.4em] text-white/50"
        >
          A little something
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="font-display text-5xl leading-[1.05] text-white md:text-7xl"
        >
          Someone special has a <span className="text-aurora">surprise</span> waiting…
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-6 max-w-lg text-base text-white/60 md:text-lg"
        >
          Tap the gift to begin.
        </motion.p>

        <motion.button
          type="button"
          onClick={handleClick}
          aria-label="Open the gift"
          className="group relative mt-16 cursor-pointer select-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          whileHover={{ y: -10, transition: { duration: 0.4 } }}
        >
          {/* Glow */}
          <div
            className="absolute inset-0 -z-10 mx-auto h-56 w-56 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(circle, rgba(255,215,0,0.45), rgba(255,154,158,0.35), transparent 70%)",
              opacity: 0.7,
            }}
          />

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <motion.div
              animate={boxControls}
              className="relative h-44 w-44 md:h-52 md:w-52"
              style={{ perspective: 800 }}
            >
              {/* Box body */}
              <div
                className="absolute inset-x-0 bottom-0 h-32 rounded-2xl md:h-36"
                style={{
                  background: "linear-gradient(160deg, #ff9a9e 0%, #fad0c4 50%, #ffd1ff 100%)",
                  boxShadow:
                    "0 30px 60px -20px rgba(255,154,158,0.5), inset 0 -8px 20px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.4)",
                }}
              >
                {/* Vertical ribbon on body */}
                <div
                  className="absolute left-1/2 top-0 h-full w-8 -translate-x-1/2"
                  style={{
                    background: "linear-gradient(90deg, #b8860b, #ffd700, #b8860b)",
                    boxShadow: "0 0 20px rgba(255,215,0,0.6)",
                  }}
                />
              </div>

              {/* Lid */}
              <motion.div
                animate={lidControls}
                className="absolute inset-x-0 top-8 h-16 rounded-2xl md:top-4 md:h-20"
                style={{
                  background: "linear-gradient(160deg, #ffb6b9 0%, #ffd1ff 100%)",
                  boxShadow:
                    "0 15px 30px -10px rgba(0,0,0,0.35), inset 0 -6px 12px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.6)",
                }}
              >
                <div
                  className="absolute left-1/2 top-0 h-full w-8 -translate-x-1/2"
                  style={{
                    background: "linear-gradient(90deg, #b8860b, #ffd700, #b8860b)",
                    boxShadow: "0 0 20px rgba(255,215,0,0.7)",
                  }}
                />
                {/* Ribbon bow */}
                <motion.div
                  animate={ribbonControls}
                  style={{
                    transformOrigin: "50% 100%",
                    animation: opened ? undefined : "ribbon-sway 3s ease-in-out infinite",
                  }}
                  className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="relative h-10 w-24">
                    <div
                      className="absolute left-0 top-0 h-10 w-10 rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle at 30% 30%, #ffe680, #ffd700 60%, #b8860b)",
                        boxShadow: "0 0 25px rgba(255,215,0,0.8)",
                      }}
                    />
                    <div
                      className="absolute right-0 top-0 h-10 w-10 rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle at 30% 30%, #ffe680, #ffd700 60%, #b8860b)",
                        boxShadow: "0 0 25px rgba(255,215,0,0.8)",
                      }}
                    />
                    <div
                      className="absolute left-1/2 top-2 h-6 w-6 -translate-x-1/2 rounded-full"
                      style={{
                        background: "radial-gradient(circle, #b8860b, #8b6508)",
                      }}
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* Inner glow after open */}
              {opened && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1.4 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,215,0,0.9), rgba(255,209,255,0.4), transparent 70%)",
                    filter: "blur(20px)",
                  }}
                />
              )}
            </motion.div>
          </motion.div>
        </motion.button>
      </div>

      <ScrollHint />
    </section>
  );
}

function ScrollHint() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-white/40"
    >
      scroll gently
    </motion.div>
  );
}
