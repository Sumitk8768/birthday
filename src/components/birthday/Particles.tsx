import { useMemo } from "react";

type Props = {
  count?: number;
  className?: string;
};

// Ambient floating twinkling particles rendered as absolutely positioned dots.
// Uses CSS animations only so it's cheap even with 60+ particles.
export function Particles({ count = 60, className }: Props) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const size = Math.random() * 3 + 1;
        return {
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          size,
          delay: Math.random() * 6,
          duration: 4 + Math.random() * 6,
          opacity: 0.3 + Math.random() * 0.6,
        };
      }),
    [count],
  );

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      {items.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            filter: "blur(0.5px)",
            boxShadow: `0 0 ${p.size * 4}px rgba(255,255,255,0.7), 0 0 ${p.size * 8}px rgba(255,209,255,0.4)`,
            animation: `twinkle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
