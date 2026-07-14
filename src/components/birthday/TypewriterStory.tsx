import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Particles } from "./Particles";

const LINES = [
  "Hey…",
  "Today isn't just another day…",
  "It's the day someone truly wonderful was born.",
  "And I wanted to make something just for you.",
];

export function TypewriterStory() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;

    (async () => {
      for (let i = 0; i < LINES.length; i++) {
        const line = LINES[i];
        for (let j = 1; j <= line.length; j++) {
          if (cancelled) return;
          setCurrentText(line.slice(0, j));
          await wait(38);
        }
        await wait(900);
        if (cancelled) return;
        setVisibleLines((prev) => [...prev, line]);
        setCurrentText("");
        await wait(300);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [inView]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24"
      style={{ backgroundColor: "#0F172A" }}
    >
      <Particles count={40} />
      <div className="relative z-10 max-w-2xl space-y-6 text-center">
        {visibleLines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl leading-relaxed text-white/85 md:text-5xl"
          >
            {line}
          </motion.p>
        ))}
        {currentText && (
          <p className="font-display text-3xl leading-relaxed text-white md:text-5xl">
            {currentText}
            <span className="ml-1 inline-block h-8 w-[2px] animate-pulse bg-white/70 align-middle md:h-10" />
          </p>
        )}
      </div>
    </section>
  );
}

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
