import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    THREE?: any;
  }
}

const THREE_SCRIPT_ID = 'threejs-cdn-r128';
const SYMBOL_TEXTS = ['{ }', '[ ]', '</>', 'AI', 'MERN', '01', 'func', '=>', '&&', '||', '#'];

const ExperienceThreeBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;
    let disposed = false;

    const setupScene = () => {
      if (!containerRef.current || !window.THREE) return;
      const THREE = window.THREE;
      const container = containerRef.current;

      let isMobile = window.innerWidth < 768;
      let mouseX = window.innerWidth / 2;
      let mouseY = window.innerHeight / 2;
      let targetX = 0;
      let targetY = 0;

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x000105, 0.012);

      const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
      const updateView = () => {
        isMobile = window.innerWidth < 768;
        if (isMobile) {
          camera.position.set(0, 30, 75);
        } else {
          camera.position.set(0, 18, 52);
        }
        camera.lookAt(0, 0, 0);
      };
      updateView();

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      const clock = new THREE.Clock();
      const symbols: any[] = [];

      scene.add(new THREE.AmbientLight(0x0a1535, 1.8));
      const blueLight = new THREE.PointLight(0x00aaff, 12, 140);
      blueLight.position.set(-50, 20, 20);
      scene.add(blueLight);
      const orangeLight = new THREE.PointLight(0xff9900, 12, 140);
      orangeLight.position.set(50, 15, 20);
      scene.add(orangeLight);

      const width = 180;
      const height = 180;
      const segments = isMobile ? 70 : 130;
      const geometry = new THREE.PlaneGeometry(width, height, segments, segments);
      const material = new THREE.PointsMaterial({
        size: isMobile ? 0.28 : 0.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
      });

      const getWaveHeight = (x: number, y: number, t: number) =>
        Math.sin(x * 0.07 + t) * Math.cos(y * 0.07 + t * 0.7) * 10 + Math.sin(x * 0.03 + y * 0.03 + t * 1.1) * 5;

      const positions = geometry.attributes.position.array;
      const colors: number[] = [];
      const colorIndigo = new THREE.Color(0x1a237e);
      const colorGold = new THREE.Color(0xffa000);

      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        positions[i + 2] = getWaveHeight(x, y, 0);

        const lerpFactor = THREE.MathUtils.mapLinear(x, -width / 2, width / 2, 0, 1);
        const mixedColor = colorIndigo.clone().lerp(colorGold, lerpFactor);
        if (positions[i + 2] > 5) mixedColor.multiplyScalar(1.2);
        colors.push(mixedColor.r, mixedColor.g, mixedColor.b);
      }

      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      const terrain = new THREE.Points(geometry, material);
      terrain.rotation.x = -Math.PI / 2.2;
      terrain.position.y = -10;
      scene.add(terrain);

      const createTextSprite = (text: string, isOrange: boolean) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;

        canvas.width = 512;
        canvas.height = 512;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.font = 'Bold 120px "Inter", Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const glowColor = isOrange ? 'rgba(255, 100, 0, 0.6)' : 'rgba(0, 100, 255, 0.6)';
        ctx.shadowBlur = 45;
        ctx.shadowColor = glowColor;
        ctx.fillStyle = isOrange ? '#ffcc80' : '#ffffff';
        ctx.fillText(text, 256, 256);

        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({
          map: texture,
          transparent: true,
          opacity: 0.8,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          depthTest: true,
        });

        const sprite = new THREE.Sprite(spriteMaterial);
        const scale = isMobile ? 4.5 : 7;
        sprite.scale.set(scale, scale, 1);
        return sprite;
      };

      const countPerSymbol = isMobile ? 3 : 7;
      SYMBOL_TEXTS.forEach((text) => {
        for (let j = 0; j < countPerSymbol; j += 1) {
          const sprite = createTextSprite(text, Math.random() > 0.45);
          if (!sprite) continue;

          sprite.position.set((Math.random() - 0.5) * 160, Math.random() * 45 - 5, (Math.random() - 0.5) * 100);
          sprite.userData = {
            speed: 0.006 + Math.random() * 0.018,
            osc: Math.random() * Math.PI * 2,
            phase: Math.random() * 50,
          };

          scene.add(sprite);
          symbols.push(sprite);
        }
      });

      const onPointerMove = (event: MouseEvent | Touch) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        targetX = (event.clientX - window.innerWidth / 2) / 120;
        targetY = (event.clientY - window.innerHeight / 2) / 120;
      };

      const onMouseMove = (event: MouseEvent) => onPointerMove(event);
      const onTouchMove = (event: TouchEvent) => {
        if (event.touches.length > 0) onPointerMove(event.touches[0]);
      };

      const onWindowResize = () => {
        if (!containerRef.current) return;
        camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        updateView();
      };

      document.addEventListener('mousemove', onMouseMove, false);
      document.addEventListener('touchmove', onTouchMove, { passive: true });
      window.addEventListener('resize', onWindowResize, false);

      const animate = () => {
        if (disposed) return;
        rafId = requestAnimationFrame(animate);

        const time = clock.getElapsedTime();

        for (let i = 0; i < positions.length; i += 3) {
          const x = positions[i];
          const y = positions[i + 1];
          positions[i + 2] = getWaveHeight(x, y, time * 0.35);
        }
        terrain.geometry.attributes.position.needsUpdate = true;

        symbols.forEach((sprite) => {
          const data = sprite.userData;
          sprite.position.y += Math.sin(time * 0.4 + data.osc) * 0.02;
          sprite.position.x += data.speed;

          if (sprite.position.x > 85) sprite.position.x = -85;

          const opacity = 0.4 + Math.sin(time * 0.9 + data.phase) * 0.4;
          sprite.material.opacity = opacity;

          const pulseScale = (isMobile ? 4.5 : 7) + Math.sin(time * 0.5 + data.phase) * 0.5;
          sprite.scale.set(pulseScale, pulseScale, 1);
        });

        camera.position.x += (targetX - camera.position.x) * 0.04;
        camera.position.y += (-targetY + (isMobile ? 30 : 18) - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);

        if (glowRef.current && coreRef.current) {
          const curX = parseFloat(glowRef.current.style.left || '0');
          const curY = parseFloat(glowRef.current.style.top || '0');
          const lerp = 0.18;
          const smoothX = curX + (mouseX - curX) * lerp;
          const smoothY = curY + (mouseY - curY) * lerp;

          glowRef.current.style.left = `${smoothX}px`;
          glowRef.current.style.top = `${smoothY}px`;
          coreRef.current.style.left = `${mouseX}px`;
          coreRef.current.style.top = `${mouseY}px`;
        }

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        disposed = true;
        cancelAnimationFrame(rafId);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('resize', onWindowResize);

        renderer.dispose();
        geometry.dispose();
        material.dispose();
        symbols.forEach((sprite) => {
          sprite.material?.map?.dispose?.();
          sprite.material?.dispose?.();
        });

        if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
      };
    };

    const existing = document.getElementById(THREE_SCRIPT_ID) as HTMLScriptElement | null;
    let cleanupScene: (() => void) | undefined;
    let onLoad: (() => void) | undefined;

    if (window.THREE) {
      cleanupScene = setupScene();
    } else if (existing) {
      onLoad = () => {
        if (disposed) return;
        cleanupScene = setupScene();
      };
      existing.addEventListener('load', onLoad);
    } else {
      const script = document.createElement('script');
      script.id = THREE_SCRIPT_ID;
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      script.async = true;
      script.onload = () => {
        if (disposed) return;
        cleanupScene = setupScene();
      };
      document.body.appendChild(script);
    }

    return () => {
      disposed = true;
      if (cleanupScene) cleanupScene();
      if (existing && onLoad) existing.removeEventListener('load', onLoad);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        ref={glowRef}
        className="pointer-events-none fixed z-40 hidden h-[140px] w-[140px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen md:block md:h-[200px] md:w-[200px]"
        style={{
          background: 'radial-gradient(circle, rgba(0,150,255,0.12) 0%, rgba(255,100,0,0.04) 45%, transparent 75%)',
          willChange: 'transform',
        }}
      />
      <div
        ref={coreRef}
        className="pointer-events-none fixed z-[41] hidden h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white md:block md:h-[6px] md:w-[6px]"
        style={{ boxShadow: '0 0 15px 2px white, 0 0 30px 8px rgba(0, 180, 255, 0.5)' }}
      />
    </>
  );
};

export default ExperienceThreeBackground;
