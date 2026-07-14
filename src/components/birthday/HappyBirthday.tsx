import { motion } from "framer-motion";
import { useMemo } from "react";
import { BIRTHDAY_NAME } from "@/config/birthday";

export function HappyBirthday() {
  const title = `Happy Birthday ${BIRTHDAY_NAME}!`;
  const chars = useMemo(() => title.split(""), [title]);

  const balloons = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        left: Math.random() * 90 + 5,
        delay: Math.random() * 5,
        duration: 14 + Math.random() * 10,
        size: 40 + Math.random() * 40,
        color: BALLOON_COLORS[i % BALLOON_COLORS.length],
      })),
    [],
  );

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24"
      style={{
        background:
          "radial-gradient(ellipse at top, rgba(255,209,255,0.18), transparent 50%), radial-gradient(ellipse at bottom, rgba(255,215,0,0.15), transparent 55%), #0F172A",
      }}
    >
      {/* Balloons */}
      {balloons.map((b) => (
        <motion.div
          key={b.id}
          className="pointer-events-none absolute bottom-[-20%]"
          style={{ left: `${b.left}%` }}
          animate={{ y: "-140vh", x: [0, 20, -20, 0] }}
          transition={{
            y: {
              duration: b.duration,
              repeat: Infinity,
              ease: "linear",
              delay: b.delay,
            },
            x: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <div
            className="rounded-full"
            style={{
              width: b.size,
              height: b.size * 1.2,
              background: b.color,
              boxShadow: `inset -8px -12px 20px rgba(0,0,0,0.2), inset 6px 8px 12px rgba(255,255,255,0.4), 0 0 30px ${b.color}55`,
            }}
          />
          <div className="mx-auto h-24 w-[1px]" style={{ background: "rgba(255,255,255,0.3)" }} />
        </motion.div>
      ))}

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-6 text-xs uppercase tracking-[0.4em] text-white/50"
        >
          🎉 the moment 🎉
        </motion.p>

        <h2 className="font-display text-5xl leading-[1.05] md:text-8xl">
          {chars.map((ch, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, rotate: -8 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.05,
                type: "spring",
                stiffness: 200,
                damping: 12,
              }}
              className="inline-block text-aurora"
              style={{
                filter: "drop-shadow(0 0 20px rgba(255,209,255,0.35))",
              }}
            >
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: chars.length * 0.05 + 0.4, duration: 0.8 }}
          className="mt-8 max-w-xl text-base text-white/60 md:text-lg"
        >
          Every year, the world is a little more radiant because you're in it.
        </motion.p>
      </div>
    </section>
  );
}

const BALLOON_COLORS = ["#FF9A9E", "#FAD0C4", "#FFD1FF", "#FFD700", "#ffb6b9", "#c9a0dc"];
