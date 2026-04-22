import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    THREE?: any;
  }
}

const THREE_SCRIPT_ID = 'threejs-cdn-r128';
const SYMBOL_TEXTS = ['{ }', '[ ]', '</>', '#', '>', '()', '&&', '||', '!=', '=>', 'func', '01', 'var'];

const ExperienceThreeBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;
    let disposed = false;

    const setupScene = () => {
      if (!containerRef.current || !window.THREE) return;
      const THREE = window.THREE;
      const container = containerRef.current;

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x000105, 0.015);

      const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
      camera.position.z = 45;
      camera.position.y = 10;
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      const clock = new THREE.Clock();
      const symbols: any[] = [];

      scene.add(new THREE.AmbientLight(0x0a1a4a, 2));
      const goldLight = new THREE.PointLight(0xffcc00, 10, 180);
      goldLight.position.set(40, 20, 15);
      scene.add(goldLight);
      const blueLight = new THREE.PointLight(0x0088ff, 10, 180);
      blueLight.position.set(-40, 10, 15);
      scene.add(blueLight);

      const geometry = new THREE.PlaneGeometry(160, 160, 110, 110);
      const material = new THREE.PointsMaterial({ size: 0.28, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending });
      const positions = geometry.attributes.position.array;
      const colors: number[] = [];
      const colorDeepBlue = new THREE.Color(0x0044ff);
      const colorGold = new THREE.Color(0xffbb00);

      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        positions[i + 2] = Math.sin(x * 0.1) * Math.cos(y * 0.1) * 8 + Math.sin(x * 0.05 + y * 0.05) * 5;
        const height = positions[i + 2];
        const lerpFactor = THREE.MathUtils.clamp((height + 3) / 14, 0, 1);
        const mixedColor = colorDeepBlue.clone().lerp(colorGold, lerpFactor);
        colors.push(mixedColor.r, mixedColor.g, mixedColor.b);
      }

      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      const terrain = new THREE.Points(geometry, material);
      terrain.rotation.x = -Math.PI / 2.3;
      terrain.position.y = -6;
      scene.add(terrain);

      const starGeometry = new THREE.BufferGeometry();
      const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.12, transparent: true, opacity: 0.35 });
      const starVertices: number[] = [];
      for (let i = 0; i < 2200; i++) {
        starVertices.push((Math.random() - 0.5) * 400, (Math.random() - 0.5) * 400, (Math.random() - 0.5) * 400);
      }
      starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
      scene.add(new THREE.Points(starGeometry, starMaterial));

      const createTextSprite = (text: string, isGold: boolean) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) return null;
        canvas.width = 512;
        canvas.height = 512;
        context.font = 'Bold 160px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.shadowBlur = 40;
        context.shadowColor = isGold ? 'rgba(255, 200, 0, 1)' : 'rgba(0, 140, 255, 1)';
        context.fillStyle = isGold ? '#ffcc00' : '#ffffff';
        context.fillText(text, 256, 256);
        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.65, blending: THREE.AdditiveBlending });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(4.8, 4.8, 1);
        return sprite;
      };

      SYMBOL_TEXTS.forEach((text) => {
        for (let j = 0; j < 4; j++) {
          const sprite = createTextSprite(text, Math.random() > 0.6);
          if (!sprite) continue;
          sprite.position.set((Math.random() - 0.5) * 140, Math.random() * 50 - 15, (Math.random() - 0.5) * 60);
          sprite.userData = {
            speed: 0.008 + Math.random() * 0.012,
            oscillation: Math.random() * Math.PI * 2,
            phase: Math.random() * 100,
          };
          scene.add(sprite);
          symbols.push(sprite);
        }
      });

      let mouseX = 0;
      let mouseY = 0;
      const onMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX - window.innerWidth / 2) / 120;
        mouseY = (event.clientY - window.innerHeight / 2) / 120;
      };

      const onWindowResize = () => {
        if (!containerRef.current) return;
        camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      };

      document.addEventListener('mousemove', onMouseMove, false);
      window.addEventListener('resize', onWindowResize, false);

      const animate = () => {
        if (disposed) return;
        rafId = requestAnimationFrame(animate);
        const time = clock.getElapsedTime();

        for (let i = 0; i < positions.length; i += 3) {
          const x = positions[i];
          const y = positions[i + 1];
          positions[i + 2] = Math.sin(x * 0.1 + time * 0.2) * Math.cos(y * 0.1 + time * 0.15) * 8 + Math.sin(x * 0.05 + y * 0.08 + time * 0.3) * 4;
        }
        terrain.geometry.attributes.position.needsUpdate = true;

        symbols.forEach((sprite) => {
          const data = sprite.userData;
          sprite.position.y += Math.sin(time * 0.4 + data.oscillation) * 0.012;
          sprite.position.x += data.speed;
          if (sprite.position.x > 70) sprite.position.x = -70;
          const pulse = 0.45 + Math.sin(time * 1.2 + data.phase) * 0.32;
          sprite.material.opacity = pulse;
        });

        camera.position.x += (mouseX - camera.position.x) * 0.02;
        camera.position.y += (-mouseY + 10 - camera.position.y) * 0.02;
        camera.lookAt(0, 2, 0);
        renderer.render(scene, camera);
      };

      animate();

      return () => {
        disposed = true;
        cancelAnimationFrame(rafId);
        document.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onWindowResize);
        renderer.dispose();
        geometry.dispose();
        material.dispose();
        starGeometry.dispose();
        starMaterial.dispose();
        symbols.forEach((sprite) => {
          sprite.material?.map?.dispose?.();
          sprite.material?.dispose?.();
        });
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
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

  return <div ref={containerRef} className="absolute inset-0 opacity-60" aria-hidden="true" />;
};

export default ExperienceThreeBackground;
