import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../App';
import { CV_DATA, SKILL_CATEGORIES, EXPERIENCES } from '../constants';

/* ── Starfield ─────────────────────────────────────────────── */
const Starfield: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d')!;
    let W = c.width = window.innerWidth;
    let H = c.height = window.innerHeight;
    const stars = Array.from({ length: 320 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.4 + 0.2,
      a: Math.random(),
      da: (Math.random() - 0.5) * 0.004,
    }));
    let raf: number;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      stars.forEach(s => {
        s.a = Math.max(0.05, Math.min(1, s.a + s.da));
        if (s.a <= 0.05 || s.a >= 1) s.da *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210,220,255,${s.a})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    const onResize = () => { W = c.width = window.innerWidth; H = c.height = window.innerHeight; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" />;
};

/* ── Real Earth Globe ──────────────────────────────────────── */
const Globe: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const SIZE = 380;
    c.width = SIZE; c.height = SIZE;
    const ctx = c.getContext('2d')!;
    const cx = SIZE / 2, cy = SIZE / 2, R = SIZE / 2 - 6;

    function toRad(d: number) { return d * Math.PI / 180; }

    function project(lat: number, lon: number, rotY: number): [number, number, number] {
      const phi = toRad(90 - lat);
      const theta = toRad(lon) + rotY;
      const x3 = Math.sin(phi) * Math.cos(theta);
      const y3 = Math.cos(phi);
      const z3 = Math.sin(phi) * Math.sin(theta);
      return [cx + x3 * R, cy - y3 * R, z3]; // z3 > 0 = front
    }

    // ── Continent polygons (filled) ──
    // Each polygon: array of [lat, lon] forming a closed shape
    const landPolygons: { pts: [number,number][], color: string }[] = [
      // Europe + Western Russia
      { color: '#2d6a2d', pts: [[71,28],[70,50],[60,60],[55,38],[50,30],[48,10],[44,3],[37,-9],[43,-8],[44,0],[50,2],[54,8],[57,12],[62,26],[65,25],[68,18],[71,28]] },
      // Africa
      { color: '#2d6a2d', pts: [[37,10],[38,22],[30,33],[22,37],[12,44],[0,42],[-10,40],[-26,33],[-35,18],[-34,27],[-18,37],[-5,40],[10,51],[22,40],[30,32],[37,22],[37,10]] },
      // Africa west
      { color: '#2d6a2d', pts: [[37,10],[30,-3],[15,-17],[5,-5],[-5,10],[-18,12],[-34,18],[-35,18],[-26,33],[-18,37],[-5,40],[10,51],[22,40],[30,32],[37,22],[37,10]] },
      // India
      { color: '#2d6a2d', pts: [[28,68],[32,75],[28,98],[23,92],[18,84],[8,78],[8,77],[12,75],[20,73],[22,68],[28,68]] },
      // South Asia / SE Asia
      { color: '#2d6a2d', pts: [[28,98],[25,96],[22,100],[20,100],[15,102],[5,103],[1,104],[-5,106],[-8,115],[0,110],[5,115],[10,123],[15,120],[20,110],[22,114],[23,113],[26,115],[28,98]] },
      // East Asia
      { color: '#2d6a2d', pts: [[52,140],[48,135],[40,122],[32,121],[28,121],[22,114],[26,115],[28,116],[32,119],[38,120],[41,122],[43,131],[50,142],[52,140]] },
      // Central + East Russia
      { color: '#2d6a2d', pts: [[60,60],[62,80],[65,90],[68,100],[70,130],[66,142],[60,150],[52,140],[50,142],[43,131],[41,122],[50,90],[55,70],[60,60]] },
      // Scandinavia
      { color: '#2d6a2d', pts: [[71,28],[70,18],[68,14],[62,5],[57,12],[62,26],[65,25],[68,18],[71,28]] },
      // North America East
      { color: '#2d6a2d', pts: [[70,-90],[60,-64],[50,-57],[45,-55],[45,-66],[42,-70],[35,-76],[30,-81],[25,-77],[20,-87],[15,-87],[10,-85],[8,-77],[10,-75],[20,-87],[30,-80],[35,-76],[42,-70],[47,-68],[60,-64],[70,-64],[70,-90]] },
      // North America West
      { color: '#2d6a2d', pts: [[70,-130],[70,-90],[60,-90],[50,-90],[45,-90],[40,-90],[35,-90],[30,-90],[22,-100],[18,-100],[15,-90],[10,-85],[8,-77],[10,-75],[15,-90],[22,-100],[28,-100],[32,-100],[35,-106],[35,-120],[40,-124],[48,-124],[55,-130],[60,-140],[70,-130]] },
      // Greenland
      { color: '#3a7a3a', pts: [[83,-40],[82,-20],[76,-18],[72,-24],[72,-52],[76,-68],[80,-60],[83,-40]] },
      // South America
      { color: '#2d6a2d', pts: [[10,-75],[0,-50],[0,-50],[-5,-34],[-10,-38],[-18,-40],[-25,-43],[-35,-58],[-40,-62],[-55,-65],[-55,-38],[-25,-43],[-5,-34],[0,-50],[10,-62],[10,-75]] },
      // Australia
      { color: '#2d6a2d', pts: [[-16,130],[-20,122],[-32,116],[-35,118],[-38,145],[-32,152],[-24,152],[-17,144],[-14,136],[-16,130]] },
      // Japan
      { color: '#2d6a2d', pts: [[45,141],[42,140],[35,136],[33,131],[34,130],[36,136],[38,140],[42,143],[45,141]] },
      // UK & Ireland
      { color: '#2d6a2d', pts: [[58,-3],[55,0],[52,-2],[50,0],[52,-5],[54,-5],[58,-3]] },
    ];

    // City markers
    const cities: [number, number, string, boolean][] = [
      [22.57, 88.36, 'Kolkata', true],
      [28.61, 77.20, 'Delhi', false],
      [19.07, 72.87, 'Mumbai', false],
      [12.97, 77.59, 'Bengaluru', false],
      [51.51, -0.12, 'London', false],
      [40.71, -74.00, 'New York', false],
      [35.68, 139.69, 'Tokyo', false],
      [1.35, 103.82, 'Singapore', false],
      [48.85, 2.35, 'Paris', false],
      [-33.87, 151.21, 'Sydney', false],
      [55.75, 37.62, 'Moscow', false],
      [31.23, 121.47, 'Shanghai', false],
    ];

    let rotY = 0.6; // start showing India
    let velX = 0.004;
    let drag = false, lastX = 0;
    let pulse = 0;
    let raf: number;

    function drawGlobe() {
      ctx.clearRect(0, 0, SIZE, SIZE);

      // ── Clip to circle ──
      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip();

      // ── Ocean ──
      const ocean = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.05, cx, cy, R);
      ocean.addColorStop(0, '#1a4a8a');
      ocean.addColorStop(0.5, '#0d2f6b');
      ocean.addColorStop(1, '#071d4a');
      ctx.fillStyle = ocean;
      ctx.fillRect(0, 0, SIZE, SIZE);

      // ── Grid lines ──
      ctx.globalAlpha = 0.12;
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath(); let first = true;
        for (let lon = -180; lon <= 180; lon += 3) {
          const [sx, sy, z] = project(lat, lon, rotY);
          if (z < 0) { first = true; continue; }
          first ? (ctx.moveTo(sx, sy), first = false) : ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = '#90c0ff'; ctx.lineWidth = 0.5; ctx.stroke();
      }
      for (let lon = -180; lon < 180; lon += 30) {
        ctx.beginPath(); let first = true;
        for (let lat = -90; lat <= 90; lat += 3) {
          const [sx, sy, z] = project(lat, lon, rotY);
          if (z < 0) { first = true; continue; }
          first ? (ctx.moveTo(sx, sy), first = false) : ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = '#90c0ff'; ctx.lineWidth = 0.5; ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // ── Land polygons ──
      landPolygons.forEach(({ pts, color }) => {
        const projected = pts.map(([lat, lon]) => project(lat, lon, rotY));
        // Only draw if most points are on front hemisphere
        const frontCount = projected.filter(([,,z]) => z >= -0.2).length;
        if (frontCount < 2) return;
        ctx.beginPath();
        let first = true;
        projected.forEach(([sx, sy, z]) => {
          if (z < -0.3) { first = true; return; }
          first ? (ctx.moveTo(sx, sy), first = false) : ctx.lineTo(sx, sy);
        });
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.92;
        ctx.fill();
        ctx.strokeStyle = '#4aaa4a';
        ctx.lineWidth = 0.4;
        ctx.globalAlpha = 0.5;
        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      // ── Atmosphere highlight ──
      const atmo = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.35, 0, cx, cy, R);
      atmo.addColorStop(0, 'rgba(180,220,255,0.18)');
      atmo.addColorStop(0.6, 'rgba(100,160,255,0.04)');
      atmo.addColorStop(1, 'rgba(40,80,200,0.0)');
      ctx.fillStyle = atmo; ctx.fillRect(0, 0, SIZE, SIZE);

      ctx.restore(); // remove clip

      // ── Outer glow ring ──
      const rim = ctx.createRadialGradient(cx, cy, R - 2, cx, cy, R + 14);
      rim.addColorStop(0, 'rgba(80,140,255,0.0)');
      rim.addColorStop(0.5, 'rgba(80,160,255,0.35)');
      rim.addColorStop(1, 'rgba(40,80,200,0.0)');
      ctx.beginPath(); ctx.arc(cx, cy, R + 7, 0, Math.PI * 2);
      ctx.strokeStyle = rim; ctx.lineWidth = 14; ctx.stroke();

      // ── City dots ──
      pulse += 0.07;
      cities.forEach(([lat, lon, label, isKolkata]) => {
        const [sx, sy, z] = project(lat, lon, rotY);
        if (z < 0.05) return;
        if (isKolkata) {
          // Pulsing rings
          const p1 = (Math.sin(pulse) * 0.5 + 0.5);
          const p2 = (Math.sin(pulse + 1.5) * 0.5 + 0.5);
          ctx.beginPath(); ctx.arc(sx, sy, 8 + p1 * 10, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,220,50,${0.6 * (1 - p1)})`; ctx.lineWidth = 1.5; ctx.stroke();
          ctx.beginPath(); ctx.arc(sx, sy, 4 + p2 * 6, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,200,50,${0.8 * (1 - p2)})`; ctx.lineWidth = 1; ctx.stroke();
          // Core dot
          const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, 10);
          glow.addColorStop(0, 'rgba(255,230,80,1)');
          glow.addColorStop(1, 'rgba(255,100,0,0)');
          ctx.beginPath(); ctx.arc(sx, sy, 10, 0, Math.PI * 2);
          ctx.fillStyle = glow; ctx.fill();
          ctx.beginPath(); ctx.arc(sx, sy, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#FFD700'; ctx.fill();
          ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.2; ctx.stroke();
          // Label
          ctx.font = 'bold 11px sans-serif';
          ctx.fillStyle = '#FFD700';
          ctx.shadowColor = 'rgba(0,0,0,0.9)'; ctx.shadowBlur = 4;
          ctx.fillText('Kolkata ★', sx + 8, sy - 8);
          ctx.shadowBlur = 0;
        } else {
          ctx.beginPath(); ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(180,220,255,0.85)'; ctx.fill();
          ctx.font = '8px sans-serif';
          ctx.fillStyle = 'rgba(200,225,255,0.7)';
          ctx.shadowColor = 'rgba(0,0,0,0.8)'; ctx.shadowBlur = 3;
          ctx.fillText(label, sx + 4, sy - 2);
          ctx.shadowBlur = 0;
        }
      });

      rotY += velX;
      raf = requestAnimationFrame(drawGlobe);
    }

    // Drag handlers
    const onDown = (x: number) => { drag = true; lastX = x; velX = 0; };
    const onMove = (x: number) => {
      if (!drag) return;
      const dx = x - lastX; lastX = x;
      rotY += dx * 0.007; velX = dx * 0.004;
    };
    const onUp = () => { drag = false; if (Math.abs(velX) < 0.001) velX = 0.004; };

    c.addEventListener('mousedown', e => onDown(e.clientX));
    window.addEventListener('mousemove', e => onMove(e.clientX));
    window.addEventListener('mouseup', onUp);
    c.addEventListener('touchstart', e => onDown(e.touches[0].clientX), { passive: true });
    window.addEventListener('touchmove', e => onMove(e.touches[0].clientX), { passive: true });
    window.addEventListener('touchend', onUp);

    drawGlobe();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', e => onMove(e.clientX));
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="cursor-grab active:cursor-grabbing"
      style={{ width: 380, height: 380, borderRadius: '50%', display: 'block', maxWidth: '100%' }}
    />
  );
};

/* ── Main Hero ─────────────────────────────────────────────── */
const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="home" className="relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-100">

      {/* Starfield */}
      <Starfield />

      {/* Purple cosmic glow at top */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,rgba(88,28,135,0.6),transparent_65%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-80 bg-[radial-gradient(ellipse_70%_80%_at_50%_100%,rgba(8,47,73,0.55),transparent)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 pb-16 pt-10 space-y-12">

        {/* ── HERO: Avatar + Name + CTAs ── */}
        <div className="flex flex-col items-center gap-6 text-center">

          {/* Spinning conic ring + avatar */}
          <div className="relative flex items-center justify-center">
            {/* Outer spinning ring */}
            <div
              className="absolute rounded-full"
              style={{
                width: 132, height: 132,
                background: 'conic-gradient(from 0deg, rgba(168,85,247,0.9), rgba(99,102,241,0.5), rgba(59,130,246,0.8), rgba(168,85,247,0.9))',
                filter: 'blur(3px)',
                animation: 'spinRing 7s linear infinite',
              }}
            />
            {/* Avatar */}
            <div className="relative h-28 w-28 rounded-full border border-white/20 bg-gradient-to-br from-slate-600 via-slate-800 to-slate-950 shadow-[0_0_60px_rgba(168,85,247,0.7)] overflow-hidden flex items-center justify-center z-10">
              <span className="text-3xl font-black text-slate-300 select-none tracking-tight">BT</span>
              {/* Shine overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.15),transparent_60%)]" />
            </div>
          </div>

          {/* Name + subtitle */}
          <div className="space-y-2">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">{CV_DATA.name}</h1>
            <p className="text-sm font-medium text-slate-300 tracking-wide">
              AI Engineer &middot; Full Stack Developer &middot; Data Systems Builder
            </p>
            <p className="mx-auto max-w-lg text-sm text-slate-400 leading-relaxed">
              I design intelligent systems that transform real-world problems into scalable, data-driven solutions.
            </p>
          </div>

          {/* Skill chips */}
          <div className="flex flex-wrap justify-center gap-2">
            {['AI/ML Systems', 'MERN Stack', 'Data Engineering', 'Cloud & DevOps'].map(t => (
              <span
                key={t}
                className="rounded-full border border-white/20 px-4 py-1 text-[0.72rem] font-medium text-slate-200 backdrop-blur-sm"
                style={{ background: 'rgba(255,255,255,0.07)' }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate('/projects')}
              className="rounded-full bg-violet-600 px-7 py-2.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-violet-500/40 hover:bg-violet-500 transition-all duration-200"
            >
              View Projects
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="rounded-full border border-white/25 px-7 py-2.5 text-xs font-bold uppercase tracking-widest text-slate-200 hover:bg-white/10 transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              Let&apos;s Collaborate
            </button>
          </div>
        </div>

        {/* ── GLOBE + EXPERIENCE ── */}
        <div className="grid gap-5 md:grid-cols-[1fr_1.15fr] items-start">

          {/* Globe card */}
          <div
            className="flex flex-col items-center justify-center rounded-3xl border border-slate-700/50 p-6 shadow-[0_0_80px_rgba(15,23,42,0.95)]"
            style={{ background: 'rgba(10,15,40,0.75)', backdropFilter: 'blur(12px)' }}
          >
            {/* Outer glow behind globe */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-2xl" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)' }} />
              <Globe />
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-amber-400">
              <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,1)]" style={{ animation: 'pulse 2s infinite' }} />
              Based in Kolkata, India &middot; Open to remote
            </div>
            <p className="mt-1 text-[0.68rem] text-slate-500">Drag to rotate</p>
          </div>

          {/* Experience timeline */}
          <div
            className="rounded-3xl border border-slate-700/50 p-6 shadow-[0_0_80px_rgba(15,23,42,0.95)]"
            style={{ background: 'rgba(10,15,40,0.75)', backdropFilter: 'blur(12px)' }}
          >
            <p className="mb-5 text-[0.65rem] font-bold uppercase tracking-[0.35em] text-slate-500">Experience</p>
            <div className="relative space-y-6 pl-6">
              {/* Vertical line */}
              <div className="absolute left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-emerald-500/60 via-slate-700/60 to-transparent" />

              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="relative">
                  {/* Green dot */}
                  <div className="absolute -left-6 top-1 h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)] ring-2 ring-slate-950" />

                  <div className="flex flex-wrap items-start justify-between gap-1 mb-0.5">
                    <p className="text-sm font-bold text-slate-100 leading-snug pr-2">{exp.role}</p>
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[0.6rem] font-medium text-slate-400 whitespace-nowrap"
                      style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      {exp.duration}
                    </span>
                  </div>
                  <p className="text-[0.72rem] text-slate-400 mb-1">{exp.company} &middot; {exp.location}</p>
                  {exp.bullets[0] && (
                    <p className="text-[0.72rem] text-slate-300 leading-relaxed">{exp.bullets[0]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes spinRing { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity:1; box-shadow: 0 0 10px rgba(251,191,36,1); } 50% { opacity:0.5; box-shadow: 0 0 4px rgba(251,191,36,0.4); } }
      `}</style>
    </section>
  );
};

export default Hero;
