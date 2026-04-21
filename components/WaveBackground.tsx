import React, { useEffect, useRef } from 'react';

const WaveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationId: number;

    // Set canvas size
    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resizeCanvas();

    let time = 0;

    const drawWaves = () => {
      // Clear with dark background
      ctx.fillStyle = '#0a0905';
      ctx.fillRect(0, 0, width, height);

      const waveCount = 5;
      const waveColors = [
        { r: 255, g: 215, b: 0 },    // Gold
        { r: 218, g: 165, b: 32 },   // GoldenRod
        { r: 255, g: 191, b: 0 },    // Amber
        { r: 184, g: 134, b: 11 },   // Dark Gold
        { r: 255, g: 223, b: 0 },    // Soft Gold
      ];

      for (let waveIdx = 0; waveIdx < waveCount; waveIdx++) {
        const waveColor = waveColors[waveIdx % waveColors.length];
        const yOffset = (height / waveCount) * waveIdx + height / 2;
        const amplitude = 40 + waveIdx * 15;
        const frequency = 0.01 - waveIdx * 0.002;
        const speed = 0.02 + waveIdx * 0.01;
        const opacity = 0.15 - waveIdx * 0.02;

        ctx.strokeStyle = `rgba(${waveColor.r}, ${waveColor.g}, ${waveColor.b}, ${opacity})`;
        ctx.lineWidth = 2 + waveIdx * 0.5;
        ctx.beginPath();

        for (let x = 0; x <= width; x += 5) {
          const y = yOffset + Math.sin((x * frequency) + (time * speed)) * amplitude;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();

        // Create wave fill effect
        ctx.fillStyle = `rgba(${waveColor.r}, ${waveColor.g}, ${waveColor.b}, ${opacity * 0.3})`;
        ctx.beginPath();

        for (let x = 0; x <= width; x += 5) {
          const y = yOffset + Math.sin((x * frequency) + (time * speed)) * amplitude;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fill();
      }

      // Add subtle mesh gradient overlay
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, 'rgba(255, 215, 0, 0.05)');
      gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
      gradient.addColorStop(1, 'rgba(255, 215, 0, 0.05)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      time += 1;
      animationId = requestAnimationFrame(drawWaves);
    };

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);
    drawWaves();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{ filter: 'blur(1.5px)' }}
      />
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.3) 100%)',
        }}
      />
    </>
  );
};

export default WaveBackground;
