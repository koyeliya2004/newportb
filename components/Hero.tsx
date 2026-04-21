import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CV_DATA } from '../constants';
import { useTheme } from '../App';

// Golden accent
const GOLD = '#f5c518';
const GOLD_RGB = '245,197,24';

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

// ── Three.js Network Background ───────────────────────────────────────────────
const NetworkBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let cleanupFn: (() => void) | null = null;

    const setup = () => {
      const THREE = (window as any).THREE;
      if (!THREE) return;

      // Smaller, sparser network
      const particleCount = 100;
      const maxDistance = 120;
      const SPREAD = 500;
      const positions = new Float32Array(particleCount * 3);
      const particleData: { vx: number; vy: number; vz: number; pulsePhase: number }[] = [];

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 1, 4000);
      camera.position.z = 900;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      const group = new THREE.Group();
      scene.add(group);

      // Golden dimmed particles
      const pMaterial = new THREE.PointsMaterial({ color: 0xd4a017, size: 2, transparent: true, opacity: 0.55 });
      const particlesGeom = new THREE.BufferGeometry();
      for (let i = 0; i < particleCount; i++) {
        positions[i*3]   = Math.random() * SPREAD - SPREAD/2;
        positions[i*3+1] = Math.random() * SPREAD - SPREAD/2;
        positions[i*3+2] = Math.random() * SPREAD - SPREAD/2;
        particleData.push({
          vx: (Math.random()-0.5)*0.5,
          vy: (Math.random()-0.5)*0.5,
          vz: (Math.random()-0.5)*0.3,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
      particlesGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
      const particles = new THREE.Points(particlesGeom, pMaterial);
      group.add(particles);

      // Lines
      const lineGeom = new THREE.BufferGeometry();
      const lPos = new Float32Array(particleCount * particleCount * 3);
      const lCol = new Float32Array(particleCount * particleCount * 3);
      lineGeom.setAttribute('position', new THREE.BufferAttribute(lPos, 3).setUsage(THREE.DynamicDrawUsage));
      lineGeom.setAttribute('color',    new THREE.BufferAttribute(lCol, 3).setUsage(THREE.DynamicDrawUsage));
      const lineMesh = new THREE.LineSegments(lineGeom, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.28 }));
      group.add(lineMesh);

      let rawMouseX = 0, rawMouseY = 0, smoothX = 0, smoothY = 0;
      let rotY = 0, rotX = 0;

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
        const time = Date.now() * 0.001;

        // Cursor follow (snappy)
        smoothX += (rawMouseX - smoothX) * 0.08;
        smoothY += (rawMouseY - smoothY) * 0.08;
        camera.position.x += (smoothX * 0.4 - camera.position.x) * 0.06;
        camera.position.y += (-smoothY * 0.4 - camera.position.y) * 0.06;
        camera.lookAt(scene.position);

        // Slow auto-rotation of the whole group for more animation
        group.rotation.y = Math.sin(time * 0.12) * 0.4;
        group.rotation.x = Math.sin(time * 0.08) * 0.15;
        group.rotation.z = Math.sin(time * 0.05) * 0.08;

        // Pulsing particle opacity
        pMaterial.opacity = 0.45 + Math.sin(time * 1.2) * 0.15;

        // Golden line colour (r=0.96, g=0.77, b=0.09) dimmed
        const lr = 0.82, lg = 0.62, lb = 0.05;

        const linePosAttr = lineMesh.geometry.attributes.position as any;
        const lineColAttr = lineMesh.geometry.attributes.color as any;
        let vi = 0, ci = 0, lineCount = 0;

        for (let i = 0; i < particleCount; i++) {
          positions[i*3]   += particleData[i].vx;
          positions[i*3+1] += particleData[i].vy;
          positions[i*3+2] += particleData[i].vz;
          const h = SPREAD/2;
          if (positions[i*3]   < -h) positions[i*3]   = h;
          if (positions[i*3]   >  h) positions[i*3]   = -h;
          if (positions[i*3+1] < -h) positions[i*3+1] = h;
          if (positions[i*3+1] >  h) positions[i*3+1] = -h;
          if (positions[i*3+2] < -h) positions[i*3+2] = h;
          if (positions[i*3+2] >  h) positions[i*3+2] = -h;

          for (let j = i+1; j < particleCount; j++) {
            const dx = positions[i*3]-positions[j*3];
            const dy = positions[i*3+1]-positions[j*3+1];
            const dz = positions[i*3+2]-positions[j*3+2];
            if (Math.sqrt(dx*dx+dy*dy+dz*dz) < maxDistance) {
              linePosAttr.setXYZ(vi++, positions[i*3], positions[i*3+1], positions[i*3+2]);
              linePosAttr.setXYZ(vi++, positions[j*3], positions[j*3+1], positions[j*3+2]);
              lineColAttr.setXYZ(ci++, lr, lg, lb);
              lineColAttr.setXYZ(ci++, lr, lg, lb);
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

  return <div ref={containerRef} className="absolute inset-0 z-0" style={{ pointerEvents: 'none' }} />;
};

// ── Tech Stack 3D Cloud ──────────────────────────────────────────────────────────
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
          logo.scale.setScalar(logo.scale.x + (ts - logo.scale.x) * 0.1);
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

  return <div ref={containerRef} style={{ width:'100%', height:'100%', position:'absolute', inset:0 }} />;
};

const roles = ['Full Stack Developer', 'AI / ML Engineer', 'Deep Learning Explorer', 'Open Source Contributor'];

// ── Main Hero ────────────────────────────────────────────────────────────────────
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
    <div style={{ background: isDark ? '#06050a' : '#fff' }}>

      {/* ── SECTION 1: Hero ── */}
      <section className="relative min-h-screen overflow-hidden text-white flex items-center">
        <NetworkBackground />
        {/* faint gold grid */}
        <div className="pointer-events-none absolute inset-0 z-[1]" style={{
          backgroundImage: `linear-gradient(rgba(${GOLD_RGB},0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(${GOLD_RGB},0.03) 1px,transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />

        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 sm:px-10 lg:px-16 py-28">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] mb-10"
            style={{ borderColor: `rgba(${GOLD_RGB},0.4)`, background: `rgba(${GOLD_RGB},0.08)`, color: GOLD }}>
            <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: GOLD, boxShadow: `0 0 10px ${GOLD}` }} />
            Open to Internships &amp; Collaborations
          </div>

          {/* Name */}
          <h1
            className="text-5xl sm:text-6xl lg:text-8xl font-black leading-none tracking-tighter mb-6 cursor-default"
            onMouseEnter={() => setHoverName(true)}
            onMouseLeave={() => setHoverName(false)}
          >
            <span className="block text-lg font-semibold tracking-[0.4em] uppercase mb-3 text-white/40">Hey, I&apos;m</span>
            <span style={{ background: `linear-gradient(90deg, ${GOLD}, #fff, ${GOLD})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              {displayName}
            </span>
          </h1>

          {/* Animated role */}
          <div className="h-10 flex items-center mb-6">
            <span className="text-xl sm:text-2xl font-mono font-bold text-white/50">&gt;&nbsp;</span>
            <span className="text-xl sm:text-2xl font-mono font-bold tracking-wide" style={{ color: GOLD }}>
              {displayRole}
              <span className="inline-block w-[2px] h-6 ml-1 animate-pulse align-middle" style={{ background: GOLD }} />
            </span>
          </div>

          {/* Bio */}
          <p className="max-w-2xl text-base leading-8 text-white/50 mb-12">
            I build intelligent web applications and real-world AI solutions — from deep learning models to full-stack products. Currently pursuing CSE at MAKAUT, Kolkata.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-16">
            <button onClick={() => navigate('/projects')}
              className="rounded-full text-black px-8 py-4 text-sm font-black uppercase tracking-[0.2em] hover:-translate-y-1 transition-all duration-300"
              style={{ background: GOLD, boxShadow: `0 0 30px rgba(${GOLD_RGB},0.35)` }}>
              View My Work
            </button>
            <button onClick={() => navigate('/contact')}
              className="rounded-full border px-8 py-4 text-sm font-black uppercase tracking-[0.2em] text-white hover:-translate-y-1 transition-all duration-300"
              style={{ borderColor: 'rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor=`rgba(${GOLD_RGB},0.6)`; (e.currentTarget as HTMLElement).style.color=GOLD; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,0.2)'; (e.currentTarget as HTMLElement).style.color='white'; }}
            >
              Get In Touch
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4">
            {[{value:'15+',label:'Projects Built'},{value:'MAKAUT',label:'B.Tech CSE'},{value:'AI & Web',label:'Specialisation'},{value:'Kolkata',label:'Based In'}].map(s=>(
              <div key={s.label}
                className="rounded-2xl px-5 py-4 backdrop-blur-xl transition-colors"
                style={{ border: 'rgba(255,255,255,0.08) 1px solid', background: 'rgba(255,255,255,0.04)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor=`rgba(${GOLD_RGB},0.4)`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,0.08)'; }}
              >
                <p className="text-xl font-extrabold" style={{ color: GOLD }}>{s.value}</p>
                <p className="text-xs text-white/50 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: Mission ── */}
      <section className="relative py-32 px-6 sm:px-10 lg:px-16 overflow-hidden"
        style={{ background: isDark ? '#0c0a06' : '#f8f5ee' }}>
        <div className="pointer-events-none absolute inset-0" style={{
          backgroundImage:`linear-gradient(rgba(${GOLD_RGB},0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(${GOLD_RGB},0.04) 1px,transparent 1px)`,
          backgroundSize:'80px 80px',
        }} />
        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="text-xs font-black uppercase tracking-[0.4em] mb-6" style={{ color: GOLD }}>// What I do</p>
          <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6 ${isDark?'text-white':'text-black'}`}>
            Building intelligent systems<br />
            <span style={{ color: GOLD }}>that turn ideas into real-world impact.</span>
          </h2>
          <p className={`text-xl font-semibold mb-8 max-w-3xl ${isDark?'text-white/70':'text-black/60'}`}>
            Creating scalable AI and full-stack solutions that solve meaningful problems.
          </p>
          <p className={`text-base leading-8 max-w-3xl mb-10 ${isDark?'text-white/50':'text-black/50'}`}>
            From machine learning models to production-ready applications, I focus on building efficient, data-driven systems that are practical, scalable, and impactful. Every project I take on is built with a clear goal: real users, real results.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => navigate('/about')}
              className="rounded-full text-black px-8 py-4 text-sm font-black uppercase tracking-[0.2em] hover:-translate-y-1 transition-all duration-300"
              style={{ background: GOLD, boxShadow: `0 0 30px rgba(${GOLD_RGB},0.3)` }}>
              About Me
            </button>
            <button onClick={() => navigate('/projects')}
              className={`rounded-full border px-8 py-4 text-sm font-black uppercase tracking-[0.2em] hover:-translate-y-1 transition-all duration-300 ${isDark?'text-white border-white/20 bg-white/5':'text-black border-black/20 bg-black/5'}`}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor=GOLD; (e.currentTarget as HTMLElement).style.color=GOLD; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor=''; (e.currentTarget as HTMLElement).style.color=''; }}
            >
              Explore My Work &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Tech Stack Cloud ── */}
      <section className="relative overflow-hidden bg-[#07060a]" style={{ height: '100vh' }}>
        <div className="absolute top-[5%] w-full text-center z-10 pointer-events-none">
          <h2 className="text-white font-light text-3xl sm:text-4xl lg:text-5xl tracking-widest">
            Focusing on the <span className="font-bold" style={{ color: GOLD }}>Best</span>
          </h2>
        </div>
        <div className="absolute bottom-[5%] left-[5%] max-w-sm z-10 pointer-events-none">
          <h3 className="text-white text-xl font-semibold mb-1">
            <span style={{ color: GOLD }}>Multiple</span> Tech Stack
          </h3>
          <p className="text-white/60 text-sm leading-relaxed">
            I have worked with multiple technologies and frameworks to build scalable and efficient solutions.
          </p>
        </div>
        <TechStackCloud />
      </section>

    </div>
  );
};

export default Hero;
