import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Particles } from "./Particles";

type Props = { onDone: () => void };

export function Loader({ onDone }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 800);
    }, 2600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{
            background: "radial-gradient(ellipse at center, #1a2340 0%, #0F172A 60%, #070a15 100%)",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <Particles count={80} />
          <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
            <motion.div
              className="relative h-16 w-16"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, ease: "linear", repeat: Infinity }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent, #FFD1FF, #FFD700, transparent)",
                  mask: "radial-gradient(circle, transparent 55%, black 56%)",
                  WebkitMask: "radial-gradient(circle, transparent 55%, black 56%)",
                }}
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-display text-4xl tracking-wide text-white/90 md:text-5xl"
            >
              Preparing something special
              <motion.span
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              >
                …
              </motion.span>
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
