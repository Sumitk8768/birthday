import { useEffect, useRef } from "react";

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
  rot: number;
  vr: number;
};

export function SparklesCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;
    const sparks: Spark[] = [];
    let lastEmit = 0;
    let mouseX = 0;
    let mouseY = 0;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    function onMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const now = performance.now();
      if (now - lastEmit < 40) return;
      lastEmit = now;
      for (let i = 0; i < 2; i++) {
        sparks.push({
          x: mouseX + (Math.random() - 0.5) * 12,
          y: mouseY + (Math.random() - 0.5) * 12,
          vx: (Math.random() - 0.5) * 0.6,
          vy: -0.3 - Math.random() * 0.6,
          life: 0,
          maxLife: 900 + Math.random() * 600,
          size: 6 + Math.random() * 8,
          hue: 40 + Math.random() * 20,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.05,
        });
      }
    }
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    let last = performance.now();
    function tick(now: number) {
      const dt = now - last;
      last = now;
      ctx.clearRect(0, 0, width, height);
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life += dt;
        if (s.life > s.maxLife) {
          sparks.splice(i, 1);
          continue;
        }
        s.x += s.vx * (dt / 16);
        s.y += s.vy * (dt / 16);
        s.vy -= 0.005;
        s.rot += s.vr * (dt / 16);
        const t = s.life / s.maxLife;
        const alpha = (1 - t) * 0.95;
        drawStar(ctx, s.x, s.y, s.size * (1 - t * 0.3), s.rot, `hsla(${s.hue},95%,72%,${alpha})`);
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-[60]" />
  );
}

function drawStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rotation: number,
  color: string,
) {
  const spikes = 5;
  const outer = size;
  const inner = size * 0.45;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.shadowBlur = 14;
  ctx.shadowColor = color;
  ctx.fillStyle = color;
  ctx.beginPath();
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI / spikes) * i - Math.PI / 2;
    const px = Math.cos(a) * r;
    const py = Math.sin(a) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
