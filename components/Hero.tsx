import React, { useEffect, useRef, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CV_DATA } from '../constants';

// ─── Golden Three.js Network Background ───────────────────────────────────────
const GoldenNetwork: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const THREE = (window as any).THREE;
    if (!THREE) return;

    const particleCount = 120;
    const maxDistance = 160;
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(60, container.offsetWidth / container.offsetHeight, 1, 4000);
    camera.position.z = 800;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Gold particles
    const pMaterial = new THREE.PointsMaterial({
      color: 0xf3c623,
      size: 3.5,
      transparent: true,
      opacity: 0.9,
    });
    const particlesGeom = new THREE.BufferGeometry();

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = Math.random() * 800 - 400;
      positions[i * 3 + 1] = Math.random() * 800 - 400;
      positions[i * 3 + 2] = Math.random() * 800 - 400;
      velocities.push({
        x: (Math.random() - 0.5) * 0.65,
        y: (Math.random() - 0.5) * 0.65,
        z: (Math.random() - 0.5) * 0.65,
      });
    }

    particlesGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
    const particlesMesh = new THREE.Points(particlesGeom, pMaterial);
    group.add(particlesMesh);

    // Gold lines
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * particleCount * 3);
    const lineColors = new Float32Array(particleCount * particleCount * 3);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));
    const lineMaterial = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.45 });
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
      camera.aspect = container.offsetWidth / container.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.offsetWidth, container.offsetHeight);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('resize', onResize);

    // Gold RGB
    const GR = 0.9569, GG = 0.7765, GB = 0.1373;

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      camera.position.x += (targetX - camera.position.x) * 0.02;
      camera.position.y += (-targetY - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      const linePosAttr = lineMesh.geometry.attributes.position as any;
      const lineColAttr = lineMesh.geometry.attributes.color as any;
      let vi = 0, ci = 0, lineCount = 0;

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += velocities[i].x;
        positions[i * 3 + 1] += velocities[i].y;
        positions[i * 3 + 2] += velocities[i].z;
        if (positions[i * 3] < -400) positions[i * 3] = 400;
        if (positions[i * 3] > 400) positions[i * 3] = -400;
        if (positions[i * 3 + 1] < -400) positions[i * 3 + 1] = 400;
        if (positions[i * 3 + 1] > 400) positions[i * 3 + 1] = -400;
        if (positions[i * 3 + 2] < -400) positions[i * 3 + 2] = 400;
        if (positions[i * 3 + 2] > 400) positions[i * 3 + 2] = -400;

        for (let j = i + 1; j < particleCount; j++) {
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < maxDistance) {
            linePosAttr.setXYZ(vi++, positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
            linePosAttr.setXYZ(vi++, positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
            const alpha = 1 - dist / maxDistance;
            lineColAttr.setXYZ(ci++, GR * alpha, GG * alpha, GB * alpha);
            lineColAttr.setXYZ(ci++, GR * alpha, GG * alpha, GB * alpha);
            lineCount++;
          }
        }
      }

      particlesGeom.attributes.position.needsUpdate = true;
      linePosAttr.needsUpdate = true;
      lineColAttr.needsUpdate = true;
      lineMesh.geometry.setDrawRange(0, lineCount * 2);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
};

// ─── Roles typewriter ─────────────────────────────────────────────────────────
const roles = ['Deep Learning Explorer', 'Full Stack Builder', 'AI/ML Developer', 'Creative Problem Solver'];

// ─── Counter ──────────────────────────────────────────────────────────────────
const Counter: React.FC<{ target: number; suffix?: string }> = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let v = 0;
    const step = Math.max(1, Math.ceil(target / 80));
    const t = setInterval(() => {
      v += step;
      if (v >= target) { setCount(target); clearInterval(t); } else setCount(v);
    }, 18);
    return () => clearInterval(t);
  }, [target]);
  return <span>{count}{suffix}</span>;
};

// ─── Expertise items ──────────────────────────────────────────────────────────
const expertiseItems = [
  { title: 'Full Stack Development', subtitle: '(MERN / Next.js)', icon: '</>' },
  { title: 'AI & Machine Learning', subtitle: '(NLP, LLMs, GenAI)', icon: '◉' },
  { title: 'Data Engineering', subtitle: '(ETL, SQL, Warehousing)', icon: '▣' },
  { title: 'REST APIs & Backend', subtitle: '(Node.js, Express.js)', icon: 'API' },
  { title: 'Cloud & DevOps', subtitle: '(AWS, Docker, CI/CD)', icon: '☁' },
  { title: 'System Design Basics', subtitle: '(Scalable & Efficient Systems)', icon: '▤' },
];

const buildItems = [
  { title: 'AI-Powered Applications', description: 'Building intelligent solutions using ML, NLP & GenAI.', icon: '✦' },
  { title: 'Scalable Web Platforms', description: 'Developing modern, responsive and high-performance apps.', icon: '◎' },
  { title: 'Data Driven Systems', description: 'Creating ETL pipelines, data models & analytics solutions.', icon: '◌' },
  { title: 'Real-world Impact', description: 'Solving meaningful problems with clean, efficient code.', icon: '↗' },
];

const skillPoints = [
  { label: 'Frontend', x: 50, y: 10 },
  { label: 'Backend', x: 82, y: 32 },
  { label: 'AI / ML', x: 76, y: 68 },
  { label: 'Data', x: 50, y: 84 },
  { label: 'Cloud', x: 24, y: 68 },
  { label: 'System\nDesign', x: 18, y: 32 },
];

// ─── Main Hero ────────────────────────────────────────────────────────────────
const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const threeLoaded = useRef(false);

  // Inject Three.js CDN once
  useEffect(() => {
    if (threeLoaded.current || (window as any).THREE) { threeLoaded.current = true; return; }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.async = true;
    script.onload = () => { threeLoaded.current = true; };
    document.head.appendChild(script);
  }, []);

  // Typewriter
  useEffect(() => {
    const target = roles[activeRole];
    let i = 0;
    setDisplayed('');
    setTyping(true);
    const typeTimer = setInterval(() => {
      i++;
      setDisplayed(target.slice(0, i));
      if (i >= target.length) { clearInterval(typeTimer); setTyping(false); }
    }, 48);
    return () => clearInterval(typeTimer);
  }, [activeRole]);

  useEffect(() => {
    if (!typing) {
      const pause = setTimeout(() => setActiveRole((p) => (p + 1) % roles.length), 1800);
      return () => clearTimeout(pause);
    }
  }, [typing]);

  return (
    <div className="relative bg-black text-white overflow-x-hidden">

      {/* ── SECTION 1: Hero ─────────────────────────────────────── */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Golden network background */}
        <div className="absolute inset-0 z-0">
          <GoldenNetwork />
        </div>

        {/* Dark overlay so text is readable */}
        <div className="absolute inset-0 z-[1] bg-black/55" />

        {/* Content */}
        <div className="relative z-[2] mx-auto flex min-h-screen max-w-7xl items-center px-6 sm:px-10 lg:px-14">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">

            {/* Left: Text */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.38em] text-white/55">Hey, I&apos;m</p>

              <h1 className="mt-3 text-6xl font-black leading-[0.92] tracking-tight sm:text-7xl lg:text-[6.2rem]">
                <span className="text-white">Bhumika </span>
                <span className="text-[#f3c623] [text-shadow:0_0_40px_rgba(243,198,35,0.55)]">
                  Tewari
                </span>
              </h1>

              <div className="mt-6 flex items-center gap-3 text-base font-bold text-[#f3c623] sm:text-xl">
                <span className="text-white/50">&gt;</span>
                <span className="font-mono">
                  {displayed}
                  <span className="animate-pulse">|</span>
                </span>
              </div>

              <p className="mt-7 max-w-xl text-sm leading-8 text-white/62 sm:text-base">
                I build intelligent web applications and real-world AI solutions — from deep learning
                models to full-stack products. Currently pursuing CSE at MAKAUT, Kolkata.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/projects')}
                  className="rounded-full bg-[#f3c623] px-9 py-4 text-xs font-black uppercase tracking-[0.28em] text-black shadow-[0_0_28px_rgba(243,198,35,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_44px_rgba(243,198,35,0.5)]"
                >
                  View My Work
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="rounded-full border border-white/20 bg-white/6 px-9 py-4 text-xs font-black uppercase tracking-[0.28em] text-white backdrop-blur-lg transition duration-300 hover:-translate-y-1 hover:border-[#f3c623]/55 hover:text-[#f3c623]"
                >
                  Get In Touch
                </button>
              </div>
            </div>

            {/* Right: Hazy avatar placeholder */}
            <div className="relative mx-auto flex w-full max-w-sm items-center justify-center">
              {/* Outer glow ring */}
              <div className="absolute h-[340px] w-[340px] rounded-full bg-[#f3c623]/12 blur-3xl animate-pulse" />
              <div className="absolute h-[280px] w-[280px] rounded-full bg-[#f3c623]/18 blur-2xl" style={{ animation: 'hazyPulse 4s ease-in-out infinite' }} />

              {/* Avatar card */}
              <div
                className="relative flex h-[300px] w-[300px] flex-col items-center justify-center rounded-full border border-[#f3c623]/30 bg-[#f3c623]/5 backdrop-blur-2xl shadow-[0_0_80px_rgba(243,198,35,0.18)]"
                style={{ animation: 'avatarFloat 5s ease-in-out infinite' }}
              >
                {/* Inner hazy glow */}
                <div className="absolute inset-4 rounded-full bg-[#f3c623]/8 blur-xl" />

                {/* Initials */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#f3c623] to-[#c89b0a] text-3xl font-black text-black shadow-[0_0_32px_rgba(243,198,35,0.45)]">
                    BT
                  </div>
                  <p className="mt-3 text-sm font-bold text-white/80">Bhumika Tewari</p>
                  <p className="text-xs font-medium text-[#f3c623]/80">AI / Full Stack</p>
                  <div className="mt-3 flex items-center gap-2 rounded-full border border-[#f3c623]/25 bg-[#f3c623]/8 px-4 py-1.5">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.9)]" />
                    <span className="text-xs text-white/70">Available for work</span>
                  </div>
                </div>

                {/* Orbit ring */}
                <div
                  className="absolute h-[290px] w-[290px] rounded-full border border-[#f3c623]/18"
                  style={{ animation: 'spin 18s linear infinite' }}
                >
                  <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#f3c623] shadow-[0_0_12px_rgba(243,198,35,0.8)]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 z-[2] -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
          <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-[#f3c623]/60 to-transparent" style={{ animation: 'scrollBlink 2s ease-in-out infinite' }} />
        </div>
      </section>

      {/* ── SECTION 2: What I Do + Cards ────────────────────────── */}
      <section className="relative z-10 bg-black px-6 pb-10 pt-24 sm:px-10 lg:px-14">
        {/* Subtle gold gradient at top */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#f3c623]/5 to-transparent" />

        <div className="relative mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.38em] text-[#f3c623]">// What I Do</p>

          <h2 className="mt-5 max-w-5xl text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-white">Building intelligent systems</span><br />
            <span className="text-[#f3c623]">that turn ideas into real-world impact.</span>
          </h2>

          <p className="mt-5 max-w-3xl text-base font-semibold leading-relaxed text-white/70 sm:text-lg">
            Creating scalable AI and full-stack solutions that solve meaningful problems.
          </p>

          <p className="mt-4 max-w-4xl text-sm leading-8 text-white/50 sm:text-base">
            From machine learning models to production-ready applications, I focus on building efficient,
            data-driven systems that are practical, scalable, and impactful. Every project I take on is
            built with a clear goal: real users, real results.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={() => navigate('/about')}
              className="rounded-full bg-[#f3c623] px-8 py-4 text-xs font-black uppercase tracking-[0.28em] text-black shadow-[0_0_24px_rgba(243,198,35,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_38px_rgba(243,198,35,0.42)]"
            >
              About Me
            </button>
            <button
              onClick={() => navigate('/projects')}
              className="rounded-full border border-white/18 bg-white/5 px-8 py-4 text-xs font-black uppercase tracking-[0.28em] text-white transition duration-300 hover:-translate-y-1 hover:border-[#f3c623]/55 hover:text-[#f3c623]"
            >
              Explore My Work →
            </button>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Bento cards ───────────────────────────────── */}
      <section className="relative z-10 bg-black px-6 pb-28 sm:px-10 lg:px-14">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[1fr_0.85fr_1.1fr_1fr]">

          {/* Core Expertise */}
          <div className="rounded-[1.6rem] border border-[#f3c623]/22 bg-[#0a0a0a] p-5 shadow-[0_0_36px_rgba(243,198,35,0.07)] transition duration-400 hover:-translate-y-1 hover:border-[#f3c623]/45 hover:shadow-[0_0_48px_rgba(243,198,35,0.12)]">
            <div className="mb-5 flex items-center gap-2">
              <span className="text-lg text-[#f3c623]">✦</span>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-white">Core Expertise</p>
            </div>
            <div className="space-y-4">
              {expertiseItems.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#f3c623]/30 bg-[#f3c623]/8 text-xs font-bold text-[#f3c623]">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white leading-tight">{item.title}</p>
                    <p className="mt-0.5 text-xs text-[#f3c623]/65">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="rounded-[1.6rem] border border-[#f3c623]/22 bg-[radial-gradient(circle_at_bottom_left,rgba(243,198,35,0.18),transparent_22%),#0a0a0a] p-5 shadow-[0_0_36px_rgba(243,198,35,0.08)] transition duration-400 hover:-translate-y-1 hover:border-[#f3c623]/45">
            <div className="mb-5 flex justify-between items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#f3c623]/35 bg-[#f3c623]/10 text-[#f3c623] text-xl">▥</div>
            </div>
            <div className="space-y-4 text-center">
              {[
                { val: 15, suf: '+', label: 'Projects Built' },
                { val: 40, suf: '+', label: 'APIs Developed' },
                { val: 120, suf: '+', label: 'Students Mentored' },
                { val: 60, suf: '%', label: 'Performance Boost' },
              ].map((stat, i) => (
                <div key={stat.label}>
                  {i !== 0 && <div className="h-px bg-gradient-to-r from-transparent via-[#f3c623]/40 to-transparent mb-4" />}
                  <p className="text-4xl font-black text-[#f3c623]"><Counter target={stat.val} suffix={stat.suf} /></p>
                  <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/75">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What I Build */}
          <div className="rounded-[1.6rem] border border-[#f3c623]/22 bg-[#0a0a0a] p-5 shadow-[0_0_36px_rgba(243,198,35,0.07)] transition duration-400 hover:-translate-y-1 hover:border-[#f3c623]/45 hover:shadow-[0_0_48px_rgba(243,198,35,0.12)]">
            <div className="mb-5 flex items-center gap-2">
              <span className="text-lg text-[#f3c623]">▣</span>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-white">What I Build</p>
            </div>
            <div className="space-y-5">
              {buildItems.map((item, index) => (
                <div key={item.title} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f3c623]/30 bg-[#f3c623]/8 text-base text-[#f3c623]">{item.icon}</div>
                    {index !== buildItems.length - 1 && <div className="mt-1.5 h-10 w-px bg-gradient-to-b from-[#f3c623]/50 to-transparent" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white leading-tight">{item.title}</p>
                    <p className="mt-1 text-xs leading-6 text-[#f3c623]/65">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Radar */}
          <div className="rounded-[1.6rem] border border-[#f3c623]/22 bg-[#0a0a0a] p-5 shadow-[0_0_36px_rgba(243,198,35,0.07)] transition duration-400 hover:-translate-y-1 hover:border-[#f3c623]/45 hover:shadow-[0_0_48px_rgba(243,198,35,0.12)]">
            <div className="mb-5 flex items-center gap-2">
              <span className="text-lg text-[#f3c623]">✦</span>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-white">Skill Distribution</p>
            </div>
            <div className="relative mx-auto flex h-[240px] w-full max-w-[240px] items-center justify-center">
              <svg viewBox="0 0 100 100" className="h-full w-full">
                {[8, 18, 28, 38].map((offset) => (
                  <polygon key={offset} points={`50,${offset} ${92 - offset},${25 + offset * 0.35} ${92 - offset},${75 - offset * 0.35} 50,${100 - offset} ${8 + offset},${75 - offset * 0.35} ${8 + offset},${25 + offset * 0.35}`} fill="none" stroke="rgba(243,198,35,0.14)" />
                ))}
                <line x1="50" y1="8" x2="50" y2="92" stroke="rgba(243,198,35,0.14)" />
                <line x1="16" y1="30" x2="84" y2="70" stroke="rgba(243,198,35,0.14)" />
                <line x1="16" y1="70" x2="84" y2="30" stroke="rgba(243,198,35,0.14)" />
                <polygon points="50,20 71,33 67,61 50,74 33,61 29,39" fill="rgba(243,198,35,0.38)" stroke="#f3c623" strokeWidth="1.5" className="animate-pulse" />
                {skillPoints.map((p) => (
                  <circle key={p.label} cx={p.x} cy={p.y} r="2.2" fill="#f3c623" />
                ))}
              </svg>
              {skillPoints.map((p) => (
                <span
                  key={p.label}
                  className="absolute text-[10px] font-semibold text-white/75 -translate-x-1/2 -translate-y-1/2 text-center leading-tight"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  {p.label}
                </span>
              ))}
            </div>
            <div className="mt-4 rounded-full border border-[#f3c623]/28 bg-[#f3c623]/6 px-4 py-2.5 text-center text-xs text-[#f8e7a6]">✦ Always Learning, Always Building.</div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes hazyPulse {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.08); }
        }
        @keyframes avatarFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes scrollBlink {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Hero;
