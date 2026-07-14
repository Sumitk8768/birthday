import { motion } from "framer-motion";

const WISHES = [
  {
    emoji: "🎉",
    text: "May this year bring you endless happiness — the loud, laugh-out-loud kind and the quiet kind too.",
  },
  {
    emoji: "✨",
    text: "Keep smiling. The world looks brighter when you do.",
  },
  {
    emoji: "🌟",
    text: "Never stop believing in yourself. The rest of us already do.",
  },
  {
    emoji: "🌈",
    text: "May every dream find its way to you — sometimes early, sometimes just in time.",
  },
  {
    emoji: "🎈",
    text: "May your days feel soft, unhurried, and full of the things you love.",
  },
  {
    emoji: "🎂",
    text: "And on the harder days, may you remember how many people are cheering you on.",
  },
];

export function Wishes() {
  return (
    <section
      className="relative overflow-hidden px-6 py-32"
      style={{
        background:
          "radial-gradient(ellipse at 80% 10%, rgba(255,154,158,0.15), transparent 50%), radial-gradient(ellipse at 10% 90%, rgba(255,209,255,0.15), transparent 55%), #0F172A",
      }}
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-white/50">
            a few birthday wishes
          </p>
          <h3 className="font-display text-5xl text-white md:text-7xl">
            Sent with <span className="text-aurora">confetti</span>
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {WISHES.map((w, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="glass-card rounded-3xl p-8"
            >
              <div className="text-4xl">{w.emoji}</div>
              <p className="mt-4 text-lg leading-relaxed text-white/85">{w.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
