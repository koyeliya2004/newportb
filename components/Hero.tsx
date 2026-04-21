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

// ── Three.js Network Background (cursor-reactive) ────────────────────────────
const NetworkBackground: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<any>(null);
  const frameRef = useRef<number>(0);
  const isDarkRef = useRef(isDark);

  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let cleanupFn: (() => void) | null = null;

    // Check if THREE already loaded
    const setup = () => {
      const THREE = (window as any).THREE;
      if (!THREE) return;

      const particleCount = 150;
      const maxDistance = 150;
      const positions = new Float32Array(particleCount * 3);
      const particleData: { vx: number; vy: number; vz: number }[] = [];

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 1, 4000);
      camera.position.z = 800;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      const group = new THREE.Group();
      scene.add(group);

      const pMaterial = new THREE.PointsMaterial({ color: 0x00ff00, size: 3, transparent: true, opacity: 0.8 });
      const particlesGeom = new THREE.BufferGeometry();
      for (let i = 0; i < particleCount; i++) {
        positions[i*3]   = Math.random() * 800 - 400;
        positions[i*3+1] = Math.random() * 800 - 400;
        positions[i*3+2] = Math.random() * 800 - 400;
        particleData.push({ vx: (Math.random()-0.5)*0.7, vy: (Math.random()-0.5)*0.7, vz: (Math.random()-0.5)*0.7 });
      }
      particlesGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
      const particles = new THREE.Points(particlesGeom, pMaterial);
      group.add(particles);

      const lineGeom = new THREE.BufferGeometry();
      const lPos = new Float32Array(particleCount * particleCount * 3);
      const lCol = new Float32Array(particleCount * particleCount * 3);
      lineGeom.setAttribute('position', new THREE.BufferAttribute(lPos, 3).setUsage(THREE.DynamicDrawUsage));
      lineGeom.setAttribute('color',    new THREE.BufferAttribute(lCol, 3).setUsage(THREE.DynamicDrawUsage));
      const lineMesh = new THREE.LineSegments(lineGeom, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.5 }));
      group.add(lineMesh);

      // Mouse state — raw pixel coords updated instantly
      let rawMouseX = 0, rawMouseY = 0;
      let smoothX = 0, smoothY = 0;

      const onMouseMove = (e: MouseEvent) => {
        rawMouseX = e.clientX - window.innerWidth / 2;
        rawMouseY = e.clientY - window.innerHeight / 2;
      };
      const onTouchMove = (e: TouchEvent) => {
        if (e.touches.length > 0) {
          rawMouseX = e.touches[0].clientX - window.innerWidth / 2;
          rawMouseY = e.touches[0].clientY - window.innerHeight / 2;
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
        // Smooth lerp towards raw mouse — snappy follow
        smoothX += (rawMouseX - smoothX) * 0.08;
        smoothY += (rawMouseY - smoothY) * 0.08;
        camera.position.x += (smoothX * 0.5 - camera.position.x) * 0.06;
        camera.position.y += (-smoothY * 0.5 - camera.position.y) * 0.06;
        camera.lookAt(scene.position);

        const dark = isDarkRef.current;
        pMaterial.color.set(dark ? 0x00ff00 : 0x00bb00);

        const linePosAttr = lineMesh.geometry.attributes.position as any;
        const lineColAttr = lineMesh.geometry.attributes.color as any;
        let vi = 0, ci = 0, lineCount = 0;

        for (let i = 0; i < particleCount; i++) {
          positions[i*3]   += particleData[i].vx;
          positions[i*3+1] += particleData[i].vy;
          positions[i*3+2] += particleData[i].vz;
          if (positions[i*3]   < -400) positions[i*3]   = 400;
          if (positions[i*3]   >  400) positions[i*3]   = -400;
          if (positions[i*3+1] < -400) positions[i*3+1] = 400;
          if (positions[i*3+1] >  400) positions[i*3+1] = -400;
          if (positions[i*3+2] < -400) positions[i*3+2] = 400;
          if (positions[i*3+2] >  400) positions[i*3+2] = -400;

          for (let j = i+1; j < particleCount; j++) {
            const dx = positions[i*3]-positions[j*3];
            const dy = positions[i*3+1]-positions[j*3+1];
            const dz = positions[i*3+2]-positions[j*3+2];
            if (Math.sqrt(dx*dx+dy*dy+dz*dz) < maxDistance) {
              linePosAttr.setXYZ(vi++, positions[i*3], positions[i*3+1], positions[i*3+2]);
              linePosAttr.setXYZ(vi++, positions[j*3], positions[j*3+1], positions[j*3+2]);
              lineColAttr.setXYZ(ci++, 0, dark?1:0.73, 0);
              lineColAttr.setXYZ(ci++, 0, dark?1:0.73, 0);
              lineCount++;
            }
          }
        }
        particles.geometry.attributes.position.needsUpdate = true;
        linePosAttr.needsUpdate = true;
        lineColAttr.needsUpdate = true;
        lineMesh.geometry.setDrawRange(0, lineCount * 2);
        renderer.render(scene, camera);
      };
      animate();

      cleanupFn = () => {
        cancelAnimationFrame(frameRef.current);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('resize', onResize);
        renderer.dispose();
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      };
    };

    if ((window as any).THREE) {
      setup();
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      script.onload = setup;
      document.head.appendChild(script);
      return () => { script.remove(); cleanupFn?.(); };
    }
    return () => { cleanupFn?.(); };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-0" style={{ pointerEvents: 'none' }} />;
};

// ── Tech Stack 3D Cloud Section ───────────────────────────────────────────────
const TechStackCloud: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let cleanupFn: (() => void) | null = null;

    const setup = () => {
      const THREE = (window as any).THREE;
      if (!THREE) return;

      const techIcons = [
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg',
      ];

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 2000);
      camera.position.z = 700;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      container.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0xffffff, 1));

      const logos: any[] = [];
      const loader = new THREE.TextureLoader();
      const radius = 280;

      techIcons.forEach((url, index) => {
        loader.load(url, (texture: any) => {
          const mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(70, 70),
            new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide })
          );
          const phi = Math.acos(-1 + (2 * index) / techIcons.length);
          const theta = Math.sqrt(techIcons.length * Math.PI) * phi;
          const x = radius * Math.cos(theta) * Math.sin(phi);
          const y = radius * Math.sin(theta) * Math.sin(phi);
          const z = radius * Math.cos(phi);
          mesh.position.set(x, y, z);
          mesh.userData = { origin: new THREE.Vector3(x, y, z), phase: Math.random()*Math.PI*2, speed: 0.5+Math.random(), hovered: false };
          scene.add(mesh);
          logos.push(mesh);
        });
      });

      let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
      const mouse2D = new THREE.Vector2();
      const raycaster = new THREE.Raycaster();

      const onMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX - window.innerWidth / 2;
        mouseY = e.clientY - window.innerHeight / 2;
        const rect = container.getBoundingClientRect();
        mouse2D.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse2D.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      };
      const onResize = () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('resize', onResize);

      const animate = () => {
        frameRef.current = requestAnimationFrame(animate);
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;
        camera.position.x += (targetX * 0.6 - camera.position.x) * 0.05;
        camera.position.y += (-targetY * 0.6 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        raycaster.setFromCamera(mouse2D, camera);
        logos.forEach(l => { l.userData.hovered = false; });
        const hits = raycaster.intersectObjects(logos);
        if (hits.length > 0) hits[0].object.userData.hovered = true;

        const time = Date.now() * 0.001;
        logos.forEach(logo => {
          const d = logo.userData;
          logo.quaternion.copy(camera.quaternion);
          logo.position.x = d.origin.x + Math.cos(time * 0.5) * 5;
          logo.position.y = d.origin.y + Math.sin(time * d.speed + d.phase) * 15;
          logo.position.z = d.origin.z + Math.sin(time * 0.5) * 5;
          const ts = d.hovered ? 1.5 : 1.0;
          const ns = logo.scale.x + (ts - logo.scale.x) * 0.1;
          logo.scale.set(ns, ns, ns);
          logo.material.opacity = d.hovered ? 1.0 : 0.85;
        });
        renderer.render(scene, camera);
      };
      animate();

      cleanupFn = () => {
        cancelAnimationFrame(frameRef.current);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onResize);
        renderer.dispose();
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      };
    };

    if ((window as any).THREE) setup();
    else {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      script.onload = setup;
      document.head.appendChild(script);
      return () => { script.remove(); cleanupFn?.(); };
    }
    return () => { cleanupFn?.(); };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} />;
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
      <div className={`relative z-10 flex items-center justify-center overflow-hidden transition-all duration-300 ${glitching?'grayscale brightness-75':''}`}
        style={{ width:'300px', height:'420px', clipPath:'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)', transform:glitching?`rotate(${(Math.random()-0.5)*6}deg)`:'rotate(0deg)', transition:'filter 0.2s, transform 0.15s' }}
      >
        <div className="flex flex-col items-center justify-center w-full h-full bg-black/30">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#b5f23d] via-[#6ee7b7] to-[#3b82f6] flex items-center justify-center text-4xl font-black text-black shadow-2xl">KG</div>
          <p className="mt-4 text-white/70 text-sm font-semibold tracking-widest uppercase">Your Photo Here</p>
        </div>
        {glitching && (
          <>
            <div className="absolute inset-0 pointer-events-none" style={{ background:'repeating-linear-gradient(transparent 0px,transparent 3px,rgba(181,242,61,0.18) 3px,rgba(181,242,61,0.18) 4px)', animation:'glitchScan 0.18s steps(1) infinite', mixBlendMode:'screen' }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background:'rgba(255,0,80,0.12)', transform:'translateX(4px)', animation:'glitchShift 0.12s steps(1) infinite', mixBlendMode:'screen' }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background:'rgba(0,255,200,0.10)', transform:'translateX(-4px)', animation:'glitchShift 0.09s steps(1) infinite reverse', mixBlendMode:'screen' }} />
          </>
        )}
      </div>
      {!glitching && <div className="absolute bottom-3 right-2 z-20 bg-black text-[#b5f23d] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-[#b5f23d]/40 animate-pulse">Click me</div>}
      <style>{`
        @keyframes glitchScan{0%{transform:translateY(0)}25%{transform:translateY(-8px)}50%{transform:translateY(5px)}75%{transform:translateY(-3px)}100%{transform:translateY(0)}}
        @keyframes glitchShift{0%{clip-path:inset(20% 0 60% 0)}20%{clip-path:inset(60% 0 10% 0)}40%{clip-path:inset(5% 0 80% 0)}60%{clip-path:inset(40% 0 30% 0)}80%{clip-path:inset(70% 0 5% 0)}100%{clip-path:inset(20% 0 60% 0)}}
      `}</style>
    </div>
  );
};

const roles = ['Full Stack Developer', 'AI / ML Engineer', 'Deep Learning Explorer', 'Open Source Contributor'];

// ── Main Hero (3 sections) ───────────────────────────────────────────────────
const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeRole, setActiveRole] = useState(0);
  const [scrambleTrigger, setScrambleTrigger] = useState(false);
  const [hoverName, setHoverName] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveRole(p => (p+1)%roles.length);
      setScrambleTrigger(true);
      setTimeout(() => setScrambleTrigger(false), 1200);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  const displayRole = useScramble(roles[activeRole], scrambleTrigger, 30);
  const displayName = useScramble(CV_DATA.name, hoverName, 25);

  return (
    <div className={isDark ? 'bg-[#050805]' : 'bg-white'}>

      {/* ── SECTION 1: Hero with Network BG ── */}
      <section className={`relative min-h-screen overflow-hidden text-white flex items-center`}>
        <NetworkBackground isDark={isDark} />
        <div className="pointer-events-none absolute inset-0 z-[1]" style={{
          backgroundImage: 'linear-gradient(rgba(181,242,61,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(181,242,61,0.025) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16 py-24">
          <div className="grid w-full gap-14 lg:grid-cols-2 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#b5f23d]/40 bg-[#b5f23d]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-[#b5f23d] mb-8">
                <span className="h-2 w-2 rounded-full bg-[#b5f23d] shadow-[0_0_10px_rgba(181,242,61,0.9)] animate-pulse" />
                Open to Internships &amp; Collaborations
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-none tracking-tighter mb-4 cursor-default"
                onMouseEnter={() => setHoverName(true)} onMouseLeave={() => setHoverName(false)}>
                <span className={`block text-lg font-semibold tracking-[0.4em] uppercase mb-2 ${isDark?'text-white/40':'text-white/50'}`}>Hey, I&apos;m</span>
                <span className="bg-gradient-to-r from-[#b5f23d] via-white to-[#b5f23d] bg-clip-text text-transparent">{displayName}</span>
              </h1>
              <div className="mt-4 h-10 flex items-center">
                <span className="text-xl sm:text-2xl font-mono font-bold text-white/60">&gt;&nbsp;</span>
                <span className="text-xl sm:text-2xl font-mono font-bold text-[#b5f23d] tracking-wide">
                  {displayRole}<span className="inline-block w-[2px] h-6 bg-[#b5f23d] ml-1 animate-pulse align-middle" />
                </span>
              </div>
              <p className="mt-6 max-w-lg text-base leading-8 text-white/55">
                I build intelligent web applications and real-world AI solutions — from deep learning models to full-stack products. Currently pursuing CSE at MAKAUT, Kolkata.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <button onClick={() => navigate('/projects')}
                  className="rounded-full bg-[#b5f23d] text-black px-8 py-4 text-sm font-black uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(181,242,61,0.35)] hover:shadow-[0_0_50px_rgba(181,242,61,0.55)] hover:-translate-y-1 transition-all duration-300">View My Work</button>
                <button onClick={() => navigate('/contact')}
                  className="rounded-full border border-white/20 bg-white/5 text-white px-8 py-4 text-sm font-black uppercase tracking-[0.2em] hover:border-[#b5f23d]/60 hover:text-[#b5f23d] hover:-translate-y-1 transition-all duration-300">Get In Touch</button>
              </div>
              <div className="mt-12 flex flex-wrap gap-4">
                {[{value:'15+',label:'Projects Built'},{value:'MAKAUT',label:'B.Tech CSE'},{value:'AI & Web',label:'Specialisation'},{value:'Kolkata',label:'Based In'}].map(s=>(
                  <div key={s.label} className="rounded-2xl border border-white/8 bg-white/4 px-5 py-4 backdrop-blur-xl hover:border-[#b5f23d]/40 transition-colors">
                    <p className="text-xl font-extrabold text-[#b5f23d]">{s.value}</p>
                    <p className="text-xs text-white/50 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end"><GlitchAvatar /></div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: Mission / About ── */}
      <section className={`relative py-32 px-6 sm:px-10 lg:px-16 overflow-hidden ${isDark?'bg-[#0a0c0a]':'bg-[#f5f5f0]'}`}>
        {/* faint grid */}
        <div className="pointer-events-none absolute inset-0" style={{
          backgroundImage:'linear-gradient(rgba(181,242,61,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(181,242,61,0.04) 1px,transparent 1px)',
          backgroundSize:'80px 80px',
        }} />
        <div className="relative z-10 max-w-5xl mx-auto">
          {/* eyebrow */}
          <p className="text-[#b5f23d] text-xs font-black uppercase tracking-[0.4em] mb-6">// What I do</p>
          {/* main heading */}
          <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6 ${isDark?'text-white':'text-black'}`}>
            Building intelligent systems<br />
            <span className="text-[#b5f23d]">that turn ideas into real-world impact.</span>
          </h2>
          <p className={`text-xl font-semibold mb-8 max-w-3xl ${isDark?'text-white/70':'text-black/60'}`}>
            Creating scalable AI and full-stack solutions that solve meaningful problems.
          </p>
          <p className={`text-base leading-8 max-w-3xl mb-10 ${isDark?'text-white/50':'text-black/50'}`}>
            From machine learning models to production-ready applications, I focus on building efficient, data-driven systems that are practical, scalable, and impactful. Every project I take on is built with a clear goal: real users, real results.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => navigate('/about')}
              className="rounded-full bg-[#b5f23d] text-black px-8 py-4 text-sm font-black uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(181,242,61,0.3)] hover:shadow-[0_0_50px_rgba(181,242,61,0.5)] hover:-translate-y-1 transition-all duration-300">
              About Me
            </button>
            <button onClick={() => navigate('/projects')}
              className={`rounded-full border px-8 py-4 text-sm font-black uppercase tracking-[0.2em] hover:-translate-y-1 transition-all duration-300 ${
                isDark?'border-white/20 bg-white/5 text-white hover:border-[#b5f23d]/60 hover:text-[#b5f23d]':'border-black/20 bg-black/5 text-black hover:border-[#b5f23d] hover:text-[#5a9200]'
              }`}>
              Explore My Work &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Tech Stack 3D Cloud ── */}
      <section className={`relative overflow-hidden ${isDark?'bg-[#000000]':'bg-[#0a0c0a]'}`} style={{ height: '100vh' }}>
        {/* text overlays */}
        <div className="absolute top-[5%] w-full text-center z-10 pointer-events-none">
          <h2 className="text-white font-light text-3xl sm:text-4xl lg:text-5xl tracking-widest">
            Focusing on the <span className="text-[#4ade80] font-bold">Best</span>
          </h2>
        </div>
        <div className="absolute bottom-[5%] left-[5%] max-w-sm z-10 pointer-events-none">
          <h3 className="text-white text-xl font-semibold mb-1">
            <span className="text-[#4ade80]">Multiple</span> Tech Stack
          </h3>
          <p className="text-white/60 text-sm leading-relaxed">
            I have worked with multiple technologies and frameworks to build scalable and efficient solutions.
          </p>
        </div>
        {/* 3D canvas */}
        <TechStackCloud />
      </section>

    </div>
  );
};

export default Hero;
