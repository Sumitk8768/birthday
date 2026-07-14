import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Particles } from "./Particles";

export function Cake() {
  const [blown, setBlown] = useState(false);

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24"
      style={{
        background: blown
          ? "radial-gradient(ellipse at center, #0a0e1c 0%, #05070f 80%)"
          : "radial-gradient(ellipse at center, #1a2340 0%, #0F172A 70%)",
        transition: "background 1.5s ease",
      }}
    >
      <Particles count={blown ? 120 : 50} />

      <div className="relative z-10 flex flex-col items-center text-center">
        <AnimatePresence mode="wait">
          {!blown ? (
            <motion.p
              key="wish"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-12 font-display text-4xl text-white/90 md:text-6xl"
            >
              Make a wish…
            </motion.p>
          ) : (
            <motion.div
              key="granted"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="mb-12 flex flex-col items-center gap-3"
            >
              <span className="text-3xl">✨</span>
              <p className="font-display text-4xl text-aurora md:text-6xl">
                May all your wishes come true.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative">
          {/* Ambient glow under cake */}
          <div
            className="absolute -bottom-8 left-1/2 h-16 w-64 -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background: "radial-gradient(ellipse, rgba(255,154,158,0.4), transparent 70%)",
            }}
          />

          {/* Cake */}
          <div className="relative">
            {/* Top tier */}
            <div
              className="relative mx-auto h-16 w-40 rounded-t-3xl"
              style={{
                background: "linear-gradient(180deg, #ffd1ff 0%, #ff9a9e 100%)",
                boxShadow:
                  "inset 0 -6px 12px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.5)",
              }}
            >
              {/* Frosting drips */}
              <div className="absolute inset-x-0 top-0 h-6 rounded-t-3xl">
                <svg viewBox="0 0 160 24" className="h-full w-full" preserveAspectRatio="none">
                  <path
                    d="M0,0 L160,0 L160,10 Q150,20 140,10 T120,10 T100,10 T80,10 T60,10 T40,10 T20,10 T0,10 Z"
                    fill="#ffe4f5"
                  />
                </svg>
              </div>

              {/* Candle */}
              <button
                type="button"
                onClick={() => setBlown(true)}
                aria-label="Blow out the candle"
                className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full cursor-pointer"
              >
                <div
                  className="mx-auto h-14 w-2 rounded-sm"
                  style={{
                    background: "linear-gradient(90deg, #ffd700, #fffbe6, #ffd700)",
                    boxShadow: "0 0 8px rgba(255,215,0,0.4)",
                  }}
                />
                {/* Wick */}
                <div className="absolute left-1/2 top-[-6px] h-2 w-[1.5px] -translate-x-1/2 bg-neutral-800" />

                {/* Flame */}
                <AnimatePresence>
                  {!blown && (
                    <motion.div
                      exit={{ opacity: 0, scale: 0.2, y: -20 }}
                      transition={{ duration: 0.6 }}
                      className="absolute left-1/2 top-[-30px] -translate-x-1/2"
                    >
                      <div
                        className="h-8 w-4 rounded-full"
                        style={{
                          background:
                            "radial-gradient(circle at 50% 70%, #fffbe6 0%, #ffd700 40%, #ff9a3c 70%, #ff5722 100%)",
                          boxShadow: "0 0 20px rgba(255,215,0,0.9), 0 0 40px rgba(255,154,60,0.6)",
                          animation: "candle-flicker 0.35s ease-in-out infinite",
                          filter: "blur(0.3px)",
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Smoke after blow */}
                <AnimatePresence>
                  {blown && (
                    <>
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0.6, y: 0, scale: 0.6 }}
                          animate={{ opacity: 0, y: -80, scale: 1.6 }}
                          transition={{
                            duration: 2.4,
                            delay: i * 0.25,
                            repeat: Infinity,
                            repeatDelay: 0.4,
                          }}
                          className="absolute left-1/2 top-[-24px] h-4 w-4 -translate-x-1/2 rounded-full"
                          style={{
                            background: "rgba(200,200,220,0.4)",
                            filter: "blur(4px)",
                          }}
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </button>
            </div>

            {/* Middle tier */}
            <div
              className="relative mx-auto -mt-1 h-20 w-56 rounded-t-xl"
              style={{
                background: "linear-gradient(180deg, #fad0c4 0%, #ff9a9e 100%)",
                boxShadow:
                  "inset 0 -8px 16px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.5)",
              }}
            >
              {/* Dots */}
              <div className="absolute inset-x-4 top-4 flex justify-between">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-2 w-2 rounded-full"
                    style={{
                      background: "#ffd700",
                      boxShadow: "0 0 6px rgba(255,215,0,0.6)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Bottom plate */}
            <div
              className="mx-auto -mt-1 h-4 w-64 rounded-full"
              style={{
                background: "linear-gradient(180deg, #e5e7eb, #a1a1aa)",
                boxShadow: "0 10px 20px rgba(0,0,0,0.4)",
              }}
            />
          </div>

          {!blown && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-10 text-sm uppercase tracking-[0.3em] text-white/50"
            >
              tap the candle
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
