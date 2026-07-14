import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Stat = {
  emoji: string;
  label: string;
  value: string;
  suffix?: string;
  numeric?: number;
};

const STATS: Stat[] = [
  { emoji: "🎂", label: "Awesome Year", value: "+1", suffix: "" },
  { emoji: "✨", label: "Happiness", value: "+100", numeric: 100 },
  { emoji: "🎉", label: "Celebration Mode", value: "ON" },
  { emoji: "🎁", label: "Cake Access", value: "∞" },
];

export function BirthdayMode() {
  return (
    <section
      id="mode"
      className="relative overflow-hidden px-6 py-32"
      style={{
        background:
          "radial-gradient(ellipse at 20% 20%, rgba(255,215,0,0.15), transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(255,209,255,0.12), transparent 55%), #0F172A",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-white/50">system update</p>
          <h3 className="font-display text-5xl text-white md:text-7xl">
            Birthday Mode <span className="text-aurora">Activated</span>
          </h3>
          <p className="mx-auto mt-6 max-w-xl text-white/60">
            All systems set to maximum joy. Please enjoy responsibly (or don't — it's your day).
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {STATS.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(stat.numeric ? "0" : stat.value);

  useEffect(() => {
    if (!inView || !stat.numeric) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const target = stat.numeric;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(`+${Math.round(target * eased)}`);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, stat.numeric]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.03 }}
      className="glass-card rounded-3xl p-6 text-center"
    >
      <motion.div
        animate={inView ? { scale: [1, 1.2, 1], rotate: [0, -8, 8, 0] } : {}}
        transition={{ duration: 1.4, delay: index * 0.1 }}
        className="text-4xl md:text-5xl"
      >
        {stat.emoji}
      </motion.div>
      <p className="mt-4 font-display text-3xl text-aurora md:text-4xl">{display}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.25em] text-white/60">{stat.label}</p>
    </motion.div>
  );
}
