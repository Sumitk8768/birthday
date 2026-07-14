import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "Gift" },
  { id: "story", label: "Story" },
  { id: "birthday", label: "Birthday" },
  { id: "mode", label: "Mode" },
  { id: "wishes", label: "Wishes" },
  { id: "facts", label: "Facts" },
  { id: "quotes", label: "Quotes" },
  { id: "cake", label: "Cake" },
  { id: "surprise", label: "Surprise" },
];

export function ProgressIndicator() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((s, idx) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) setActive(idx);
          }
        },
        { threshold: 0.5 },
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      aria-label="Sections"
      className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-4 md:flex"
    >
      {SECTIONS.map((s, i) => (
        <a key={s.id} href={`#${s.id}`} className="group relative flex items-center justify-end">
          <span
            className={`mr-3 whitespace-nowrap text-xs uppercase tracking-[0.3em] transition-all duration-300 ${
              active === i
                ? "text-white/80 opacity-100"
                : "text-white/40 opacity-0 group-hover:opacity-100"
            }`}
          >
            {s.label}
          </span>
          <span
            className={`block h-[1px] transition-all duration-500 ${
              active === i ? "w-8 bg-white" : "w-4 bg-white/30 group-hover:bg-white/60"
            }`}
            style={active === i ? { boxShadow: "0 0 8px rgba(255,255,255,0.6)" } : undefined}
          />
        </a>
      ))}
    </nav>
  );
}
