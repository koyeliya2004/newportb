import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    THREE?: any;
  }
}

const THREE_SCRIPT_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';

const ensureThree = async (): Promise<any> => {
  if (window.THREE) return window.THREE;

  await new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${THREE_SCRIPT_SRC}"]`);
    if (existing) {
      if (window.THREE) {
        resolve();
        return;
      }
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('Failed to load Three.js')), { once: true });
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

const CertificationWaveBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cleanup = () => {};

    const start = async () => {
      try {
        const THREE = await ensureThree();
        if (!container.isConnected) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / Math.max(container.clientHeight, 1), 0.1, 1000);
        camera.position.z = 80;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        const particlesCount = 20000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particlesCount * 3);
        const colors = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount; i += 1) {
          const x = (Math.random() - 0.5) * 200;
          const z = (Math.random() - 0.5) * 200;
          const y = Math.sin(x * 0.1) * 5;

          positions[i * 3] = x;
          positions[i * 3 + 1] = y;
          positions[i * 3 + 2] = z;

          colors[i * 3] = Math.random() * 0.65;
          colors[i * 3 + 1] = 0.35 + Math.random() * 0.5;
          colors[i * 3 + 2] = 1;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
          size: 0.62,
          vertexColors: true,
          transparent: true,
          opacity: 0.88,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });

        const particles = new THREE.Points(geometry, material);
        particles.rotation.x = -0.12;
        scene.add(particles);

        let mouseX = 0;
        let mouseY = 0;
        let time = 0;
        let frameId = 0;

        const onMouseMove = (event: MouseEvent) => {
          mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
          mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
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
          time += 0.015;

          const pos = geometry.attributes.position.array;
          for (let i = 0; i < particlesCount; i += 1) {
            const x = pos[i * 3];
            const z = pos[i * 3 + 2];
            pos[i * 3 + 1] =
              Math.sin(x * 0.05 + time + mouseX * 2) * 5 +
              Math.cos(z * 0.05 + time + mouseY * 2) * 5;
          }

          geometry.attributes.position.needsUpdate = true;
          particles.rotation.y += 0.0015;
          renderer.render(scene, camera);
        };

        document.addEventListener('mousemove', onMouseMove);
        window.addEventListener('resize', onResize);
        onResize();
        animate();

        cleanup = () => {
          window.cancelAnimationFrame(frameId);
          document.removeEventListener('mousemove', onMouseMove);
          window.removeEventListener('resize', onResize);
          geometry.dispose();
          material.dispose();
          renderer.dispose();
          container.innerHTML = '';
        };
      } catch {
        cleanup = () => {
          if (container) container.innerHTML = '';
        };
      }
    };

    void start();

    return () => cleanup();
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,5,16,0.15),rgba(0,0,0,0.78))]" />
      <div ref={containerRef} className="absolute inset-0 opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/25 to-[#020617]/70" />
    </div>
  );
};

export default CertificationWaveBackground;
