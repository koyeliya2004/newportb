import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    THREE?: any;
  }
}

const SYMBOL_TEXTS = ['{ }', '[ ]', '</>', 'AI', 'MERN', '#', '&&', '||', '=>', '01'];
const THREE_SCRIPT_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';

const ensureThree = async (): Promise<any> => {
  if (window.THREE) return window.THREE;

  await new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${THREE_SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('Failed to load Three.js')), { once: true });
      if (window.THREE) resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = THREE_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Three.js'));
    document.head.appendChild(script);
  });

  if (!window.THREE) throw new Error('Three.js unavailable');
  return window.THREE;
};

const ExperienceThreeBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const glowEl = glowRef.current;
    const coreEl = coreRef.current;
    if (!container || !glowEl || !coreEl) return;

    let cleanup = () => {};

    const start = async () => {
      try {
        const THREE = await ensureThree();
        if (!container.isConnected) return;

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000105, 0.018);

        const camera = new THREE.PerspectiveCamera(60, container.clientWidth / Math.max(container.clientHeight, 1), 0.1, 1000);
        camera.position.set(0, 12, 45);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        const clock = new THREE.Clock();
        let terrain: any;
        const symbols: Array<{ sprite: any; speed: number; phase: number }> = [];

        scene.add(new THREE.AmbientLight(0x0a1535, 2.0));

        const blueLight = new THREE.PointLight(0x00aaff, 12, 180);
        blueLight.position.set(-40, 20, 20);
        scene.add(blueLight);

        const orangeLight = new THREE.PointLight(0xff9900, 12, 180);
        orangeLight.position.set(40, 15, 20);
        scene.add(orangeLight);

        const wave = (x: number, y: number, t: number) =>
          Math.sin(x * 0.08 + t) * Math.cos(y * 0.08 + t * 0.8) * 9 + Math.sin(x * 0.04 + y * 0.04 + t * 1.2) * 4;

        const geometry = new THREE.PlaneGeometry(180, 180, 140, 140);
        const material = new THREE.PointsMaterial({
          size: 0.22,
          vertexColors: true,
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending,
        });

        const positions = geometry.attributes.position.array;
        const colors: number[] = [];
        const blue = new THREE.Color(0x1a4fff);
        const orange = new THREE.Color(0xffa000);

        for (let i = 0; i < positions.length; i += 3) {
          const x = positions[i];
          const y = positions[i + 1];
          positions[i + 2] = wave(x, y, 0);
          const mix = (x + 90) / 180;
          const color = blue.clone().lerp(orange, mix);
          colors.push(color.r, color.g, color.b);
        }

        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        terrain = new THREE.Points(geometry, material);
        terrain.rotation.x = -Math.PI / 2.2;
        terrain.position.y = -6;
        scene.add(terrain);

        for (let i = 0; i < 45; i += 1) {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) continue;

          canvas.width = 256;
          canvas.height = 256;

          const text = SYMBOL_TEXTS[Math.floor(Math.random() * SYMBOL_TEXTS.length)];
          const isOrange = Math.random() > 0.5;

          ctx.font = 'bold 80px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = isOrange ? '#ffaa00' : '#ffffff';
          ctx.shadowBlur = 30;
          ctx.shadowColor = isOrange ? 'rgba(255, 170, 0, 0.8)' : 'rgba(0, 170, 255, 0.8)';
          ctx.fillText(text, 128, 128);

          const texture = new THREE.CanvasTexture(canvas);
          const spriteMaterial = new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          });

          const sprite = new THREE.Sprite(spriteMaterial);
          sprite.position.set((Math.random() - 0.5) * 140, Math.random() * 40 - 5, (Math.random() - 0.5) * 80);
          const scale = window.innerWidth < 768 ? 4.2 : 6;
          sprite.scale.set(scale, scale, 1);

          scene.add(sprite);
          symbols.push({
            sprite,
            speed: 0.005 + Math.random() * 0.015,
            phase: Math.random() * Math.PI * 2,
          });
        }

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let targetX = 0;
        let targetY = 0;
        let frameId = 0;

        const onMouseMove = (event: MouseEvent) => {
          mouseX = event.clientX;
          mouseY = event.clientY;
          targetX = (event.clientX - window.innerWidth / 2) / 100;
          targetY = (event.clientY - window.innerHeight / 2) / 100;
        };

        const onResize = () => {
          const width = container.clientWidth;
          const height = container.clientHeight;
          camera.aspect = width / Math.max(height, 1);
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        };

        const animate = () => {
          frameId = window.requestAnimationFrame(animate);
          const t = clock.getElapsedTime();

          const pos = terrain.geometry.attributes.position.array;
          for (let i = 0; i < pos.length; i += 3) {
            pos[i + 2] = wave(pos[i], pos[i + 1], t * 0.4);
          }
          terrain.geometry.attributes.position.needsUpdate = true;

          symbols.forEach(({ sprite, speed, phase }) => {
            sprite.position.y += Math.sin(t * 0.5 + phase) * 0.015;
            sprite.position.x += speed;
            if (sprite.position.x > 80) sprite.position.x = -80;
            sprite.material.opacity = 0.4 + Math.sin(t + phase) * 0.3;
          });

          camera.position.x += (targetX - camera.position.x) * 0.05;
          camera.position.y += (-targetY + 12 - camera.position.y) * 0.05;
          camera.lookAt(0, 0, 0);

          const glowX = parseFloat(glowEl.style.left || '0');
          const glowY = parseFloat(glowEl.style.top || '0');
          glowEl.style.left = `${glowX + (mouseX - glowX) * 0.15}px`;
          glowEl.style.top = `${glowY + (mouseY - glowY) * 0.15}px`;
          coreEl.style.left = `${mouseX}px`;
          coreEl.style.top = `${mouseY}px`;

          renderer.render(scene, camera);
        };

        window.addEventListener('resize', onResize);
        document.addEventListener('mousemove', onMouseMove);
        onResize();
        animate();

        cleanup = () => {
          window.cancelAnimationFrame(frameId);
          window.removeEventListener('resize', onResize);
          document.removeEventListener('mousemove', onMouseMove);

          symbols.forEach(({ sprite }) => {
            sprite.material.map?.dispose();
            sprite.material.dispose();
          });

          terrain.geometry.dispose();
          terrain.material.dispose();
          renderer.dispose();
          container.innerHTML = '';
        };
      } catch {
        cleanup = () => {
          container.innerHTML = '';
        };
      }
    };

    void start();

    return () => cleanup();
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div ref={containerRef} className="absolute inset-0" />
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-0 top-0 z-[70] h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen md:h-[180px] md:w-[180px]"
        style={{
          background:
            'radial-gradient(circle, rgba(0, 100, 255, 0.15) 0%, rgba(255, 150, 0, 0.05) 50%, transparent 70%)',
        }}
      />
      <div
        ref={coreRef}
        className="pointer-events-none absolute left-0 top-0 z-[80] h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white md:h-1.5 md:w-1.5"
        style={{ boxShadow: '0 0 15px 2px white, 0 0 30px 8px rgba(0, 150, 255, 0.6)' }}
      />
    </div>
  );
};

export default ExperienceThreeBackground;
