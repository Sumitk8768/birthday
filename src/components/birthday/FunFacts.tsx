import { motion } from "framer-motion";

const FACTS = [
  {
    emoji: "🌍",
    stat: "~21,000",
    label: "trips around the sun happening today",
    detail: "You share this day with millions — but somehow it's still uniquely yours.",
  },
  {
    emoji: "🕯️",
    stat: "since 3000 BC",
    label: "people have been celebrating birthdays",
    detail: "Ancient Egyptians started the tradition. Yours is the best iteration so far.",
  },
  {
    emoji: "🎵",
    stat: "160+ languages",
    label: 'sing "Happy Birthday to You"',
    detail: "The most recognized song on the planet — and today it's playing for you.",
  },
  {
    emoji: "🎂",
    stat: "17 billion",
    label: "candles blown out every year",
    detail: "Add yours to the count. Make it a good wish.",
  },
];

const BADGES = [
  { emoji: "🏆", label: "Legendary Human", desc: "For consistent excellence in being you." },
  { emoji: "⭐", label: "Star Player", desc: "MVP of everyone lucky enough to know you." },
  { emoji: "🚀", label: "Adventurer", desc: "Another year of chapters ahead." },
  { emoji: "🎯", label: "Goal Getter", desc: "Unlocked: new milestones this year." },
];

export function FunFacts() {
  return (
    <section
      id="facts"
      className="relative overflow-hidden px-6 py-32"
      style={{ backgroundColor: "#0F172A" }}
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-white/50">fun trivia</p>
          <h3 className="font-display text-5xl text-white md:text-7xl">
            A few <span className="text-aurora">fun facts</span>
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {FACTS.map((f, i) => (
            <motion.article
              key={f.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="glass-card flex gap-5 rounded-3xl p-6 md:p-8"
            >
              <div className="text-4xl md:text-5xl">{f.emoji}</div>
              <div className="flex-1">
                <p className="font-display text-2xl text-aurora md:text-3xl">{f.stat}</p>
                <p className="text-sm uppercase tracking-[0.2em] text-white/60">{f.label}</p>
                <p className="mt-3 text-white/80">{f.detail}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 mb-10 text-center"
        >
          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-white/50">
            achievements unlocked
          </p>
          <h4 className="font-display text-4xl text-white md:text-5xl">
            Today's <span className="text-aurora">badges</span>
          </h4>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {BADGES.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, rotate: -2 }}
              className="glass-card rounded-3xl p-6 text-center"
            >
              <div className="text-4xl">{b.emoji}</div>
              <p className="mt-3 font-display text-lg text-white">{b.label}</p>
              <p className="mt-1 text-xs text-white/60">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
