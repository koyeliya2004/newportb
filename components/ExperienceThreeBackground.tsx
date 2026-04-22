import React, { useEffect, useRef } from 'react';

const SYMBOLS = ['01', '{ }', '#', 'func', '=>', 'MERN', '<>', '&&'];

type SymbolDot = {
  x: number;
  y: number;
  depth: number;
  speed: number;
  phase: number;
  text: string;
  size: number;
  hue: number;
};

const ExperienceThreeBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let rafId = 0;
    let t = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const symbols: SymbolDot[] = Array.from({ length: 26 }, () => ({
      x: Math.random(),
      y: Math.random() * 0.7 + 0.05,
      depth: Math.random() * 0.9 + 0.1,
      speed: 0.03 + Math.random() * 0.08,
      phase: Math.random() * Math.PI * 2,
      text: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      size: 14 + Math.random() * 14,
      hue: Math.random() > 0.6 ? 40 : 220,
    }));

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const wave = (x: number, row: number, time: number) => {
      const f1 = 0.010 + row * 0.0004;
      const f2 = 0.017 + row * 0.0002;
      const s = Math.sin(x * f1 + time * 0.6 + row * 0.35) * 18;
      const c = Math.cos(x * f2 - time * 0.35 + row * 0.2) * 12;
      return s + c;
    };

    const drawBackdrop = () => {
      const gradient = ctx.createRadialGradient(width * 0.4, height * 0.55, 0, width * 0.5, height * 0.6, width * 0.8);
      gradient.addColorStop(0, '#091228');
      gradient.addColorStop(0.55, '#050914');
      gradient.addColorStop(1, '#02040a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const vignette = ctx.createLinearGradient(0, 0, 0, height);
      vignette.addColorStop(0, 'rgba(0,0,0,0.25)');
      vignette.addColorStop(0.7, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, 'rgba(0,0,0,0.35)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
    };

    const drawDotField = (time: number) => {
      const rows = Math.max(35, Math.floor(height / 14));
      const cols = Math.max(90, Math.floor(width / 9));
      const baseY = height * 0.26;
      const slope = height * 0.58;

      for (let row = 0; row < rows; row += 1) {
        const yRatio = row / (rows - 1);
        const perspective = Math.pow(yRatio, 1.9);
        const y = baseY + perspective * slope;

        for (let col = 0; col < cols; col += 1) {
          const xRatio = col / (cols - 1);
          const x = xRatio * width;
          const z = wave(x, row, time);
          const yPos = y + z;

          const cMix = xRatio;
          const r = Math.floor(95 + 170 * cMix);
          const g = Math.floor(110 + 120 * cMix);
          const b = Math.floor(220 - 130 * cMix);
          const alpha = 0.16 + perspective * 0.8;
          const size = 0.55 + perspective * 1.25;

          ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.beginPath();
          ctx.arc(x, yPos, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const drawSymbols = (time: number) => {
      symbols.forEach((symbol) => {
        const drift = Math.sin(time * symbol.speed + symbol.phase);
        const x = (symbol.x * width + time * 16 * symbol.speed * symbol.depth) % (width + 120) - 60;
        const y = symbol.y * height + drift * 12;
        const alpha = 0.1 + 0.35 * (0.5 + 0.5 * Math.sin(time * 0.7 + symbol.phase));

        ctx.font = `600 ${symbol.size * (0.8 + symbol.depth * 0.4)}px Inter, system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = `hsla(${symbol.hue}, 95%, 72%, ${alpha})`;
        ctx.fillText(symbol.text, x, y);
      });
    };

    const animate = () => {
      t += 0.016;
      drawBackdrop();
      drawDotField(t);
      drawSymbols(t);
      rafId = window.requestAnimationFrame(animate);
    };

    const onResize = () => resize();

    resize();
    animate();
    window.addEventListener('resize', onResize);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full opacity-95" />
    </div>
  );
};

export default ExperienceThreeBackground;
