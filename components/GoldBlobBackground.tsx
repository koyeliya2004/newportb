import React, { useEffect, useRef, useState } from 'react';

interface ColorObj {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface Blob {
  c: ColorObj;
  x: number;
  y: number;
  baseRadius: number;
  xOff1: number;
  xOff2: number;
  yOff1: number;
  yOff2: number;
  rOff: number;
  speed1: number;
  speed2: number;
  interactX: number;
  interactY: number;
  interactR: number;
  currentRadius: number;
  init: (width: number, height: number) => void;
  update: (mouseX: number, mouseY: number, mouseRadius: number) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

const GoldBlobBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const blobsRef = useRef<Blob[]>([]);
  const animationIdRef = useRef<number | null>(null);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  const BASE_SPEED = 0.00012;
  const BLOB_COUNT = 6;
  const MOUSE_RADIUS = 350;
  const COLORS: ColorObj[] = [
    { r: 255, g: 215, b: 0, a: 0.4 },
    { r: 218, g: 165, b: 32, a: 0.35 },
    { r: 255, g: 191, b: 0, a: 0.3 },
    { r: 184, g: 134, b: 11, a: 0.25 },
    { r: 255, g: 223, b: 0, a: 0.35 },
    { r: 212, g: 175, b: 55, a: 0.3 },
  ];

  const createBlob = (colorObj: ColorObj): Blob => {
    const { width, height } = dimensionsRef.current;
    const blob: Blob = {
      c: colorObj,
      x: Math.random() * width,
      y: Math.random() * height,
      baseRadius: 0,
      xOff1: Math.random() * 2000,
      xOff2: Math.random() * 2000,
      yOff1: Math.random() * 2000,
      yOff2: Math.random() * 2000,
      rOff: Math.random() * 2000,
      speed1: BASE_SPEED + Math.random() * 0.0001,
      speed2: BASE_SPEED * (0.6 + Math.random()),
      interactX: 0,
      interactY: 0,
      interactR: 0,
      currentRadius: 0,
      init: function (w: number, h: number) {
        this.baseRadius = Math.random() * (w * 0.4) + w * 0.25;
      },
      update: function (mouseX: number, mouseY: number, mouseRadius: number) {
        const { width, height } = dimensionsRef.current;

        this.xOff1 += this.speed1;
        this.xOff2 += this.speed2 * 0.8;
        this.yOff1 += this.speed1 * 1.2;
        this.yOff2 += this.speed2 * 0.7;
        this.rOff += BASE_SPEED * 1.5;

        const noiseX = Math.sin(this.xOff1) * 0.75 + Math.sin(this.xOff2) * 0.25;
        const noiseY = Math.cos(this.yOff1) * 0.75 + Math.cos(this.yOff2) * 0.25;

        const targetX = noiseX * width * 0.5 + width / 2;
        const targetY = noiseY * height * 0.5 + height / 2;

        const dx = targetX + this.interactX - mouseX;
        const dy = targetY + this.interactY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRadius) {
          const power = (mouseRadius - dist) / mouseRadius;
          this.interactX += (dx / dist) * power * 25;
          this.interactY += (dy / dist) * power * 25;
          this.interactR = power * 120;
        }

        this.interactX *= 0.95;
        this.interactY *= 0.95;
        this.interactR *= 0.94;

        this.x = targetX + this.interactX;
        this.y = targetY + this.interactY;

        const pulse = Math.sin(this.rOff) * 50;
        this.currentRadius = this.baseRadius + pulse + this.interactR;
      },
      draw: function (ctx: CanvasRenderingContext2D) {
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.currentRadius);

        const { r, g, b, a } = this.c;
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${a})`);
        grad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${a * 0.4})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2);
        ctx.fill();
      },
    };
    return blob;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      dimensionsRef.current = { width, height };

      if (blobsRef.current.length === 0) {
        for (let i = 0; i < BLOB_COUNT; i++) {
          const blob = createBlob(COLORS[i % COLORS.length]);
          blob.init(width, height);
          blobsRef.current.push(blob);
        }
      } else {
        blobsRef.current.forEach((blob) => {
          blob.init(width, height);
        });
      }
    };

    const animate = () => {
      const { width, height } = dimensionsRef.current;

      ctx.fillStyle = '#0a0905';
      ctx.fillRect(0, 0, width, height);

      blobsRef.current.forEach((blob) => {
        blob.update(mousePos.x, mousePos.y, MOUSE_RADIUS);
        blob.draw(ctx);
      });

      animationIdRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    };

    const handleMouseLeave = () => {
      setMousePos({ x: -1000, y: -1000 });
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [mousePos.x, mousePos.y]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{ filter: 'blur(80px)' }}
      />
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{
          opacity: 0.02,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
        style={{
          background: 'radial-gradient(circle, transparent 20%, rgba(0,0,0,0.4) 100%)',
        }}
      />
    </>
  );
};

export default GoldBlobBackground;
