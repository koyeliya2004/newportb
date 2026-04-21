import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GoldenNetwork: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const THREE = (window as any).THREE;
    if (!THREE) return;

    const particleCount = 150;
    const maxDistance = 190;
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(60, container.offsetWidth / container.offsetHeight, 1, 4000);
    camera.position.z = 760;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const glowMaterial = new THREE.PointsMaterial({
      color: 0xf3c623,
      size: 4.2,
      transparent: true,
      opacity: 1,
    });
    const particlesGeom = new THREE.BufferGeometry();

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = Math.random() * 900 - 450;
      positions[i * 3 + 1] = Math.random() * 900 - 450;
      positions[i * 3 + 2] = Math.random() * 900 - 450;
      velocities.push({
        x: (Math.random() - 0.5) * 0.95,
        y: (Math.random() - 0.5) * 0.95,
        z: (Math.random() - 0.5) * 0.65,
      });
    }

    particlesGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
    const particlesMesh = new THREE.Points(particlesGeom, glowMaterial);
    group.add(particlesMesh);

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * particleCount * 3);
    const lineColors = new Float32Array(particleCount * particleCount * 3);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));
    const lineMaterial = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.82 });
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

    const GR = 0.9569, GG = 0.7765, GB = 0.1373;

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      targetX += (mouseX - targetX) * 0.07;
      targetY += (mouseY - targetY) * 0.07;
      camera.position.x += (targetX * 0.08 - camera.position.x) * 0.06;
      camera.position.y += (-targetY * 0.08 - camera.position.y) * 0.06;
      camera.lookAt(scene.position);

      group.rotation.y += 0.0015;
      group.rotation.x += 0.0004;

      const linePosAttr = lineMesh.geometry.attributes.position as any;
      const lineColAttr = lineMesh.geometry.attributes.color as any;
      let vi = 0, ci = 0, lineCount = 0;

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += velocities[i].x;
        positions[i * 3 + 1] += velocities[i].y;
        positions[i * 3 + 2] += velocities[i].z;

        const pointerPushX = targetX * 0.00018;
        const pointerPushY = -targetY * 0.00018;
        positions[i * 3] += pointerPushX * (i % 5 === 0 ? 1.8 : 0.8);
        positions[i * 3 + 1] += pointerPushY * (i % 7 === 0 ? 1.5 : 0.7);

        if (positions[i * 3] < -450) positions[i * 3] = 450;
        if (positions[i * 3] > 450) positions[i * 3] = -450;
        if (positions[i * 3 + 1] < -450) positions[i * 3 + 1] = 450;
        if (positions[i * 3 + 1] > 450) positions[i * 3 + 1] = -450;
        if (positions[i * 3 + 2] < -450) positions[i * 3 + 2] = 450;
        if (positions[i * 3 + 2] > 450) positions[i * 3 + 2] = -450;

        for (let j = i + 1; j < particleCount; j++) {
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            linePosAttr.setXYZ(vi++, positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
            linePosAttr.setXYZ(vi++, positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
            const alpha = Math.pow(1 - dist / maxDistance, 0.6);
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
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg'
];

const TechStackCloud: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;
    const THREE = (window as any).THREE;
    if (!THREE) return;

    let scene: any, camera: any, renderer: any;
    let logos: any[] = [];
    let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, container.offsetWidth / container.offsetHeight, 0.1, 2000);
    camera.position.z = 800;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xf3c623, 1.2);
    pointLight.position.set(180, 200, 500);
    scene.add(pointLight);

    const loader = new THREE.TextureLoader();

    techIcons.forEach((url) => {
      loader.load(url, (texture: any) => {
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          side: THREE.DoubleSide,
        });

        const geometry = new THREE.PlaneGeometry(72, 72);
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(
          (Math.random() - 0.5) * 650,
          (Math.random() - 0.5) * 420,
          (Math.random() - 0.5) * 300
        );

        mesh.userData = {
          velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.55,
            (Math.random() - 0.5) * 0.55,
            (Math.random() - 0.5) * 0.18
          ),
          rotationSpeed: (Math.random() - 0.5) * 0.018,
          phase: Math.random() * Math.PI * 2,
        };

        scene.add(mesh);
        logos.push(mesh);
      });
    });

    const onWindowResize = () => {
      camera.aspect = container.offsetWidth / container.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.offsetWidth, container.offsetHeight);
    };

    const onMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX - window.innerWidth / 2;
      mouseY = event.clientY - window.innerHeight / 2;
    };

    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', onMouseMove);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      camera.position.x += (targetX * 0.18 - camera.position.x) * 0.05;
      camera.position.y += (-targetY * 0.18 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      const time = Date.now() * 0.001;

      logos.forEach((logo) => {
        logo.position.add(logo.userData.velocity);
        logo.rotation.y += logo.userData.rotationSpeed;

        const limitX = 430, limitY = 300, limitZ = 230;
        if (Math.abs(logo.position.x) > limitX) logo.userData.velocity.x *= -1;
        if (Math.abs(logo.position.y) > limitY) logo.userData.velocity.y *= -1;
        if (Math.abs(logo.position.z) > limitZ) logo.userData.velocity.z *= -1;

        const vector = new THREE.Vector3(targetX / 120, -targetY / 120, 0);
        logo.position.addScaledVector(vector, 0.035);

        const scale = 1 + Math.sin(time + logo.userData.phase) * 0.07;
        logo.scale.set(scale, scale, scale);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('mousemove', onMouseMove);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 h-full w-full" />;
};

const roles = ['Deep Learning Explorer', 'Full Stack Builder', 'AI/ML Developer', 'Creative Problem Solver'];

const Counter: React.FC<{ target: number; suffix?: string }> = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let v = 0;
    const step = Math.max(1, Math.ceil(target / 80));
    const t = setInterval(() => {
      v += step;
      if (v >= target) {
        setCount(target);
        clearInterval(t);
      } else setCount(v);
    }, 18);
    return () => clearInterval(t);
  }, [target]);
  return <span>{count}{suffix}</span>;
};

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
const APP_LOGO_URL =
  'https://github.com/user-attachments/assets/a759aca4-d673-4e52-b551-3b5414a9daa8';

const skillPoints = [
  { label: 'Frontend', x: 50, y: 10 },
  { label: 'Backend', x: 82, y: 32 },
  { label: 'AI / ML', x: 76, y: 68 },
  { label: 'Data', x: 50, y: 84 },
  { label: 'Cloud', x: 24, y: 68 },
  { label: 'System\nDesign', x: 18, y: 32 },
];

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const [visibleSections, setVisibleSections] = useState<number[]>([]);
  const [threeReady, setThreeReady] = useState(!!(window as any).THREE);
  const threeLoaded = useRef(false);

  useEffect(() => {
    if ((window as any).THREE) {
      threeLoaded.current = true;
      setThreeReady(true);
      return;
    }

    const existingScript = document.querySelector('script[data-threejs="true"]') as HTMLScriptElement | null;

    const handleLoad = () => {
      threeLoaded.current = true;
      setThreeReady(true);
    };

    if (existingScript) {
      if ((window as any).THREE) {
        handleLoad();
      } else {
        existingScript.addEventListener('load', handleLoad);
        return () => existingScript.removeEventListener('load', handleLoad);
      }
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.async = true;
    script.dataset.threejs = 'true';
    script.onload = handleLoad;
    document.head.appendChild(script);

    return () => script.removeEventListener('load', handleLoad);
  }, []);

  useEffect(() => {
    const target = roles[activeRole];
    let i = 0;
    setDisplayed('');
    setTyping(true);
    const typeTimer = setInterval(() => {
      i++;
      setDisplayed(target.slice(0, i));
      if (i >= target.length) {
        clearInterval(typeTimer);
        setTyping(false);
      }
    }, 48);
    return () => clearInterval(typeTimer);
  }, [activeRole]);

  useEffect(() => {
    if (!typing) {
      const pause = setTimeout(() => setActiveRole((p) => (p + 1) % roles.length), 1800);
      return () => clearTimeout(pause);
    }
  }, [typing]);

  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number((entry.target as HTMLElement).dataset.reveal);
            setVisibleSections((prev) => (prev.includes(id) ? prev : [...prev, id]));
          }
        });
      },
      { threshold: 0.18 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const revealClass = (id: number) =>
    visibleSections.includes(id)
      ? 'opacity-100 translate-y-0 scale-100'
      : 'opacity-0 translate-y-14 scale-[0.98]';

  return (
    <div className="relative overflow-x-hidden bg-black text-white">
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          {threeReady && <GoldenNetwork />}
        </div>
        <div className="absolute inset-0 z-[1] bg-black/45" />

        <div className="relative z-[2] mx-auto flex min-h-screen max-w-7xl items-center px-6 sm:px-10 lg:px-14">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="transition-all duration-1000 ease-out" data-reveal="1">
              <p className="text-xs font-bold uppercase tracking-[0.38em] text-white/55">Hey, I&apos;m</p>

              <h1 className="mt-3 text-6xl font-black leading-[0.92] tracking-tight sm:text-7xl lg:text-[6.2rem]">
                <span className="text-white">Bhumika </span>
                <span className="text-[#f3c623] [text-shadow:0_0_44px_rgba(243,198,35,0.7)]">Tewari</span>
              </h1>

              <div className="mt-6 flex items-center gap-3 text-base font-bold text-[#f3c623] sm:text-xl">
                <span className="text-white/50">&gt;</span>
                <span className="font-mono">
                  {displayed}
                  <span className="animate-pulse">|</span>
                </span>
              </div>

              <p className="mt-7 max-w-xl text-sm leading-8 text-white/62 sm:text-base">
                Building intelligent systems across AI, data, and full-stack development — from machine learning models to production-ready applications. Passionate about creating scalable, high-performance solutions with real-world impact.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/projects')}
                  className="rounded-full bg-[#f3c623] px-9 py-4 text-xs font-black uppercase tracking-[0.28em] text-black shadow-[0_0_28px_rgba(243,198,35,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(243,198,35,0.58)]"
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

            <div className="relative mx-auto flex w-full max-w-sm items-center justify-center transition-all duration-1000 ease-out" data-reveal="2">
              <div className="absolute h-[360px] w-[360px] rounded-full bg-[#f3c623]/15 blur-3xl animate-pulse" />
              <div className="absolute h-[300px] w-[300px] rounded-full bg-[#f3c623]/18 blur-2xl" style={{ animation: 'hazyPulse 4s ease-in-out infinite' }} />

              <div
                className="relative flex h-[300px] w-[300px] flex-col items-center justify-center rounded-full border border-[#f3c623]/30 bg-[#f3c623]/5 backdrop-blur-2xl shadow-[0_0_90px_rgba(243,198,35,0.2)]"
                style={{ animation: 'avatarFloat 5s ease-in-out infinite' }}
              >
                <div className="absolute inset-4 rounded-full bg-[#f3c623]/8 blur-xl" />
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

                <div className="absolute h-[290px] w-[290px] rounded-full border border-[#f3c623]/22" style={{ animation: 'spin 18s linear infinite' }}>
                  <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#f3c623] shadow-[0_0_14px_rgba(243,198,35,0.95)]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-[2] -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
          <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-[#f3c623]/70 to-transparent" style={{ animation: 'scrollBlink 2s ease-in-out infinite' }} />
        </div>
      </section>

      <section className={`relative z-10 bg-black px-6 pb-10 pt-24 transition-all duration-1000 ease-out sm:px-10 lg:px-14 ${revealClass(3)}`} data-reveal="3">
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
          </div>
        </div>
      </section>

      <section className={`relative z-10 bg-black px-6 pb-24 transition-all duration-1000 ease-out sm:px-10 lg:px-14 ${revealClass(4)}`} data-reveal="4">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[1fr_0.85fr_1.1fr_1fr]">
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

          <div className="rounded-[1.6rem] border border-[#f3c623]/22 bg-[radial-gradient(circle_at_bottom_left,rgba(243,198,35,0.18),transparent_22%),#0a0a0a] p-5 shadow-[0_0_36px_rgba(243,198,35,0.08)] transition duration-400 hover:-translate-y-1 hover:border-[#f3c623]/45">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#f3c623]/35 bg-[#f3c623]/10 text-xl text-[#f3c623]">▥</div>
            </div>
            <div className="space-y-4 text-center">
              {[
                { val: 15, suf: '+', label: 'Projects Built' },
                { val: 40, suf: '+', label: 'APIs Developed' },
                { val: 120, suf: '+', label: 'Students Mentored' },
                { val: 60, suf: '%', label: 'Performance Boost' },
              ].map((stat, i) => (
                <div key={stat.label}>
                  {i !== 0 && <div className="mb-4 h-px bg-gradient-to-r from-transparent via-[#f3c623]/40 to-transparent" />}
                  <p className="text-4xl font-black text-[#f3c623]"><Counter target={stat.val} suffix={stat.suf} /></p>
                  <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/75">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

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
                    <p className="text-sm font-semibold leading-tight text-white">{item.title}</p>
                    <p className="mt-1 text-xs leading-6 text-[#f3c623]/65">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
                <span key={p.label} className="absolute -translate-x-1/2 -translate-y-1/2 text-center text-[10px] font-semibold leading-tight text-white/75" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
                  {p.label}
                </span>
              ))}
            </div>
            <div className="mt-4 rounded-full border border-[#f3c623]/28 bg-[#f3c623]/6 px-4 py-2.5 text-center text-xs text-[#f8e7a6]">✦ Always Learning, Always Building.</div>
          </div>
        </div>
      </section>

      <section className={`relative z-10 min-h-[95vh] overflow-hidden bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#000000_100%)] px-6 py-24 transition-all duration-1000 ease-out sm:px-10 lg:px-14 ${revealClass(5)}`} data-reveal="5">
        <div className="pointer-events-none absolute inset-0 opacity-90">
          {threeReady && <TechStackCloud />}
        </div>

        <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-7xl flex-col justify-between">
          <div className="pt-4 text-center">
            <h2 className="text-4xl font-light tracking-[0.12em] text-white sm:text-5xl lg:text-6xl">
              &nbsp; &nbsp;
              <br />
              &nbsp; &nbsp;
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-white/58 sm:text-base">
              Focusing on the Best
            </p>
          </div>
        </div>
      </section>
      <section className="relative z-10 bg-black px-6 pb-20 sm:px-10 lg:px-14">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 border-t border-[#f3c623]/20 pt-10">
          <img
            src={APP_LOGO_URL}
            alt="App logo"
            className="h-16 w-16 rounded-lg object-cover shadow-[0_0_24px_rgba(243,198,35,0.5)]"
          />
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#f3c623]/80">&lt;/&gt; Built with Code</p>
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
