import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CV_DATA } from '../constants';
import { useTheme } from '../App';

// ── Scramble text hook ───────────────────────────────────────────────────────
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';

function useScramble(target: string, trigger: boolean, speed = 40) {
  const [display, setDisplay] = useState(target);
  const frame = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!trigger) { setDisplay(target); return; }
    let iter = 0;
    const total = target.length;
    const tick = () => {
      setDisplay(target.split('').map((ch, i) => {
        if (ch === ' ') return ' ';
        if (i < iter) return ch;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join(''));
      iter += 0.6;
      if (iter < total + 2) frame.current = setTimeout(tick, speed);
      else setDisplay(target);
    };
    tick();
    return () => { if (frame.current) clearTimeout(frame.current); };
  }, [trigger, target, speed]);
  return display;
}

// ── Three.js Network Background ──────────────────────────────────────────────
const NetworkBackground: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<any>(null);
  const frameRef = useRef<number>(0);
  const isDarkRef = useRef(isDark);

  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dynamically load Three.js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => {
      const THREE = (window as any).THREE;
      const particleCount = 150;
      const maxDistance = 150;
      const positions = new Float32Array(particleCount * 3);
      const particleData: { velocity: { x: number; y: number; z: number } }[] = [];

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 1, 4000);
      camera.position.z = 800;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      const group = new THREE.Group();
      scene.add(group);

      const pMaterial = new THREE.PointsMaterial({ color: 0x00ff00, size: 3, transparent: true, opacity: 0.8 });
      const particlesGeom = new THREE.BufferGeometry();

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3]     = Math.random() * 800 - 400;
        positions[i * 3 + 1] = Math.random() * 800 - 400;
        positions[i * 3 + 2] = Math.random() * 800 - 400;
        particleData.push({ velocity: {
          x: (Math.random() - 0.5) * 0.7,
          y: (Math.random() - 0.5) * 0.7,
          z: (Math.random() - 0.5) * 0.7,
        }});
      }

      particlesGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
      const particles = new THREE.Points(particlesGeom, pMaterial);
      group.add(particles);

      const lineGeometry = new THREE.BufferGeometry();
      const linePositions = new Float32Array(particleCount * particleCount * 3);
      const lineColors    = new Float32Array(particleCount * particleCount * 3);
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
      lineGeometry.setAttribute('color',    new THREE.BufferAttribute(lineColors,    3).setUsage(THREE.DynamicDrawUsage));
      const lineMaterial = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.5 });
      const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
      group.add(lineMesh);

      let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
      const onMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX - window.innerWidth / 2;
        mouseY = e.clientY - window.innerHeight / 2;
      };
      const onTouchMove = (e: TouchEvent) => {
        if (e.touches.length > 0) {
          mouseX = e.touches[0].clientX - window.innerWidth / 2;
          mouseY = e.touches[0].clientY - window.innerHeight / 2;
        }
      };
      const onResize = () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('resize', onResize);

      const animate = () => {
        frameRef.current = requestAnimationFrame(animate);
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;
        camera.position.x += (targetX - camera.position.x) * 0.02;
        camera.position.y += (-targetY - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        const dark = isDarkRef.current;
        const lr = dark ? 0 : 0, lg = dark ? 1 : 0, lb = dark ? 0 : 0;
        pMaterial.color.set(dark ? 0x00ff00 : 0x00bb00);

        const linePosAttr   = lineMesh.geometry.attributes.position as any;
        const lineColorAttr = lineMesh.geometry.attributes.color as any;
        let vi = 0, ci = 0, lineCount = 0;

        for (let i = 0; i < particleCount; i++) {
          positions[i * 3]     += particleData[i].velocity.x;
          positions[i * 3 + 1] += particleData[i].velocity.y;
          positions[i * 3 + 2] += particleData[i].velocity.z;
          if (positions[i * 3]     < -400) positions[i * 3]     = 400;
          if (positions[i * 3]     >  400) positions[i * 3]     = -400;
          if (positions[i * 3 + 1] < -400) positions[i * 3 + 1] = 400;
          if (positions[i * 3 + 1] >  400) positions[i * 3 + 1] = -400;
          if (positions[i * 3 + 2] < -400) positions[i * 3 + 2] = 400;
          if (positions[i * 3 + 2] >  400) positions[i * 3 + 2] = -400;

          for (let j = i + 1; j < particleCount; j++) {
            const dx = positions[i*3] - positions[j*3];
            const dy = positions[i*3+1] - positions[j*3+1];
            const dz = positions[i*3+2] - positions[j*3+2];
            if (Math.sqrt(dx*dx + dy*dy + dz*dz) < maxDistance) {
              linePosAttr.setXYZ(vi++, positions[i*3], positions[i*3+1], positions[i*3+2]);
              linePosAttr.setXYZ(vi++, positions[j*3], positions[j*3+1], positions[j*3+2]);
              lineColorAttr.setXYZ(ci++, dark ? 0 : 0, dark ? 1 : 0.73, dark ? 0 : 0);
              lineColorAttr.setXYZ(ci++, dark ? 0 : 0, dark ? 1 : 0.73, dark ? 0 : 0);
              lineCount++;
            }
          }
        }

        particles.geometry.attributes.position.needsUpdate = true;
        linePosAttr.needsUpdate   = true;
        lineColorAttr.needsUpdate = true;
        lineMesh.geometry.setDrawRange(0, lineCount * 2);
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        cancelAnimationFrame(frameRef.current);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('resize', onResize);
        renderer.dispose();
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      };
    };
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

// ── Glitch Avatar ────────────────────────────────────────────────────────────
const GlitchAvatar: React.FC = () => {
  const [glitching, setGlitching] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerGlitch = useCallback(() => {
    setGlitching(true);
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setGlitching(false), 1400);
  }, []);

  return (
    <div onClick={triggerGlitch} className="relative cursor-pointer select-none" title="Click me!">
      <div className="absolute inset-0 bg-[#b5f23d] z-0" style={{ clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)' }} />
      <div
        className={`relative z-10 flex items-center justify-center overflow-hidden transition-all duration-300 ${glitching ? 'grayscale brightness-75' : ''}`}
        style={{
          width: '300px', height: '420px',
          clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
          transform: glitching ? `rotate(${(Math.random()-0.5)*6}deg)` : 'rotate(0deg)',
          transition: 'filter 0.2s, transform 0.15s',
        }}
      >
        <div className="flex flex-col items-center justify-center w-full h-full bg-black/30">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#b5f23d] via-[#6ee7b7] to-[#3b82f6] flex items-center justify-center text-4xl font-black text-black shadow-2xl">KG</div>
          <p className="mt-4 text-white/70 text-sm font-semibold tracking-widest uppercase">Your Photo Here</p>
        </div>
        {glitching && (
          <>
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'repeating-linear-gradient(transparent 0px, transparent 3px, rgba(181,242,61,0.18) 3px, rgba(181,242,61,0.18) 4px)', animation: 'glitchScan 0.18s steps(1) infinite', mixBlendMode: 'screen' }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(255,0,80,0.12)', transform: 'translateX(4px)', animation: 'glitchShift 0.12s steps(1) infinite', mixBlendMode: 'screen' }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(0,255,200,0.10)', transform: 'translateX(-4px)', animation: 'glitchShift 0.09s steps(1) infinite reverse', mixBlendMode: 'screen' }} />
          </>
        )}
      </div>
      {!glitching && (
        <div className="absolute bottom-3 right-2 z-20 bg-black text-[#b5f23d] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-[#b5f23d]/40 animate-pulse">Click me</div>
      )}
      <style>{`
        @keyframes glitchScan { 0%{transform:translateY(0)} 25%{transform:translateY(-8px)} 50%{transform:translateY(5px)} 75%{transform:translateY(-3px)} 100%{transform:translateY(0)} }
        @keyframes glitchShift { 0%{clip-path:inset(20% 0 60% 0)} 20%{clip-path:inset(60% 0 10% 0)} 40%{clip-path:inset(5% 0 80% 0)} 60%{clip-path:inset(40% 0 30% 0)} 80%{clip-path:inset(70% 0 5% 0)} 100%{clip-path:inset(20% 0 60% 0)} }
      `}</style>
    </div>
  );
};

// ── Roles ────────────────────────────────────────────────────────────────────
const roles = ['Full Stack Developer', 'AI / ML Engineer', 'Deep Learning Explorer', 'Open Source Contributor'];

// ── Main Hero ────────────────────────────────────────────────────────────────
const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeRole, setActiveRole] = useState(0);
  const [scrambleTrigger, setScrambleTrigger] = useState(false);
  const [hoverName, setHoverName] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveRole(p => (p + 1) % roles.length);
      setScrambleTrigger(true);
      setTimeout(() => setScrambleTrigger(false), 1200);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  const displayRole = useScramble(roles[activeRole], scrambleTrigger, 30);
  const displayName = useScramble(CV_DATA.name, hoverName, 25);

  return (
    <section className={`relative min-h-screen overflow-hidden text-white flex items-center ${isDark ? 'bg-[#050805]' : 'bg-white'}`}>

      {/* Three.js Network — full background, pointer-events-none so clicks pass through */}
      <NetworkBackground isDark={isDark} />

      {/* Subtle lime grid overlay */}
      <div className="pointer-events-none absolute inset-0 z-[1]" style={{
        backgroundImage: 'linear-gradient(rgba(181,242,61,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(181,242,61,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16 py-24">
        <div className="grid w-full gap-14 lg:grid-cols-2 items-center">

          {/* LEFT */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#b5f23d]/40 bg-[#b5f23d]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-[#b5f23d] mb-8">
              <span className="h-2 w-2 rounded-full bg-[#b5f23d] shadow-[0_0_10px_rgba(181,242,61,0.9)] animate-pulse" />
              Open to Internships &amp; Collaborations
            </div>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-none tracking-tighter mb-4 cursor-default"
              onMouseEnter={() => setHoverName(true)}
              onMouseLeave={() => setHoverName(false)}
            >
              <span className={`block text-lg font-semibold tracking-[0.4em] uppercase mb-2 ${isDark ? 'text-white/40' : 'text-black/40'}`}>Hey, I&apos;m</span>
              <span className="bg-gradient-to-r from-[#b5f23d] via-white to-[#b5f23d] bg-clip-text text-transparent">{displayName}</span>
            </h1>

            <div className="mt-4 h-10 flex items-center">
              <span className={`text-xl sm:text-2xl font-mono font-bold ${isDark ? 'text-white/60' : 'text-black/60'}`}>&gt;&nbsp;</span>
              <span className="text-xl sm:text-2xl font-mono font-bold text-[#b5f23d] tracking-wide">
                {displayRole}
                <span className="inline-block w-[2px] h-6 bg-[#b5f23d] ml-1 animate-pulse align-middle" />
              </span>
            </div>

            <p className={`mt-6 max-w-lg text-base leading-8 ${isDark ? 'text-white/55' : 'text-black/60'}`}>
              I build intelligent web applications and real-world AI solutions — from deep learning models to full-stack products. Currently pursuing CSE at MAKAUT, Kolkata, with a focus on turning ideas into deployable, impactful software.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/projects')}
                className="rounded-full bg-[#b5f23d] text-black px-8 py-4 text-sm font-black uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(181,242,61,0.35)] hover:shadow-[0_0_50px_rgba(181,242,61,0.55)] hover:-translate-y-1 transition-all duration-300"
              >View My Work</button>
              <button
                onClick={() => navigate('/contact')}
                className={`rounded-full border px-8 py-4 text-sm font-black uppercase tracking-[0.2em] hover:-translate-y-1 transition-all duration-300 ${
                  isDark ? 'border-white/20 bg-white/5 text-white hover:border-[#b5f23d]/60 hover:text-[#b5f23d]' : 'border-black/20 bg-black/5 text-black hover:border-[#b5f23d] hover:text-[#5a9200]'
                }`}
              >Get In Touch</button>
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              {[
                { value: '15+', label: 'Projects Built' },
                { value: 'MAKAUT', label: 'B.Tech CSE' },
                { value: 'AI & Web', label: 'Specialisation' },
                { value: 'Kolkata', label: 'Based In' },
              ].map(s => (
                <div key={s.label} className={`rounded-2xl border px-5 py-4 backdrop-blur-xl hover:border-[#b5f23d]/40 transition-colors ${
                  isDark ? 'border-white/8 bg-white/4' : 'border-black/10 bg-black/4'
                }`}>
                  <p className="text-xl font-extrabold text-[#b5f23d]">{s.value}</p>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-white/50' : 'text-black/50'}`}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <GlitchAvatar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
