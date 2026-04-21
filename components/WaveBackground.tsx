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
        { r: 255, g: 193, b: 7 },    // Gold/Yellow
        { r: 236, g: 72, b: 153 },   // Pink
        { r: 139, g: 92, b: 246 },   // Purple
        { r: 59, g: 130, b: 246 },   // Blue
        { r: 250, g: 204, b: 21 },   // Yellow
      ];

      for (let waveIdx = 0; waveIdx < waveCount; waveIdx++) {
        const waveColor = waveColors[waveIdx % waveColors.length];
        const yOffset = (height / waveCount) * waveIdx + height / 3;
        const amplitude = 35 + Math.sin(time * speed * 2) * 15 + waveIdx * 10;
        const frequency = 0.007 - waveIdx * 0.001;
        const speed = 0.01 + waveIdx * 0.008;
        const opacity = 0.18 - waveIdx * 0.015;

        // More vibrant and glowing
        ctx.strokeStyle = `rgba(${waveColor.r}, ${waveColor.g}, ${waveColor.b}, ${opacity + 0.1})`;
        ctx.lineWidth = 3 + waveIdx * 0.7;
        ctx.shadowBlur = 15;
        ctx.shadowColor = `rgba(${waveColor.r}, ${waveColor.g}, ${waveColor.b}, 0.8)`;
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

        // Increase fill transparency and remove shadow for the fill part
        ctx.shadowBlur = 0;
        ctx.fillStyle = `rgba(${waveColor.r}, ${waveColor.g}, ${waveColor.b}, ${opacity * 0.4})`;
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
      gradient.addColorStop(0, 'rgba(236, 72, 153, 0.05)');
      gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)');
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
