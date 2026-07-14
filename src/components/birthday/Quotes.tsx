import { motion } from "framer-motion";

const QUOTES = [
  {
    text: "Count your age by friends, not years. Count your life by smiles, not tears.",
    author: "John Lennon",
  },
  {
    text: "The more you praise and celebrate your life, the more there is in life to celebrate.",
    author: "Oprah Winfrey",
  },
  {
    text: "Do not regret growing older. It is a privilege denied to many.",
    author: "Unknown",
  },
];

export function Quotes() {
  return (
    <section
      id="quotes"
      className="relative overflow-hidden px-6 py-32"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(255,215,0,0.1), transparent 60%), #0F172A",
      }}
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-white/50">
            words worth keeping
          </p>
          <h3 className="font-display text-5xl text-white md:text-7xl">
            A little <span className="text-aurora">inspiration</span>
          </h3>
        </motion.div>

        <div className="space-y-8">
          {QUOTES.map((q, i) => (
            <motion.blockquote
              key={q.text}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card relative rounded-3xl p-8 md:p-12"
            >
              <span
                aria-hidden
                className="absolute left-6 top-2 font-display text-8xl text-aurora/60 md:text-9xl"
              >
                “
              </span>
              <p className="relative font-display text-2xl leading-relaxed text-white/90 md:text-3xl">
                {q.text}
              </p>
              <footer className="mt-6 text-sm uppercase tracking-[0.3em] text-white/50">
                — {q.author}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
