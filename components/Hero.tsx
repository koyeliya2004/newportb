import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../App';
import { CV_DATA, PROJECTS, SKILL_CATEGORIES, EXPERIENCES, CERTIFICATIONS, ACHIEVEMENTS } from '../constants';

/* ─── tiny helpers ─────────────────────────────────────────── */
function toRad(d: number) { return (d * Math.PI) / 180; }
function latLonToXY(
  lat: number, lon: number,
  cx: number, cy: number, r: number
): [number, number] {
  // simple equirectangular projection centred on Kolkata
  const dLon = lon - 88.36;
  const dLat = lat - 22.57;
  const scale = r / 75; // 75° visible radius
  const x = cx + dLon * scale;
  const y = cy - dLat * scale;
  return [x, y];
}

/* ─── Starfield Canvas ──────────────────────────────────────── */
const Starfield: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d')!;
    let W = c.width = window.innerWidth;
    let H = c.height = window.innerHeight;
    const stars = Array.from({ length: 280 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      a: Math.random(),
      da: (Math.random() - 0.5) * 0.005,
    }));
    let raf: number;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      stars.forEach(s => {
        s.a = Math.max(0.05, Math.min(1, s.a + s.da));
        if (s.a <= 0.05 || s.a >= 1) s.da *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,210,255,${s.a})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    const onResize = () => {
      W = c.width = window.innerWidth;
      H = c.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" />;
};

/* ─── Interactive Globe Canvas ──────────────────────────────── */
const Globe: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const SIZE = 320;
    c.width = SIZE; c.height = SIZE;
    const ctx = c.getContext('2d')!;
    const cx = SIZE / 2, cy = SIZE / 2, R = SIZE / 2 - 8;

    // Kolkata coords
    const KOL_LAT = 22.57, KOL_LON = 88.36;
    // Some world city dots (lat, lon, label)
    const cities: [number, number, string][] = [
      [22.57, 88.36, 'Kolkata ★'],
      [28.61, 77.20, 'Delhi'],
      [19.07, 72.87, 'Mumbai'],
      [13.08, 80.27, 'Chennai'],
      [12.97, 77.59, 'Bengaluru'],
      [51.51, -0.12, 'London'],
      [40.71, -74.00, 'New York'],
      [35.68, 139.69, 'Tokyo'],
      [1.35, 103.82, 'Singapore'],
      [37.77, -122.41, 'SF'],
      [48.85, 2.35, 'Paris'],
      [-33.87, 151.21, 'Sydney'],
      [55.75, 37.62, 'Moscow'],
      [31.23, 121.47, 'Shanghai'],
      [-23.55, -46.63, 'São Paulo'],
    ];

    // Rough world continent outlines as lat/lon polylines
    const continentLines: [number, number][][] = [
      // Africa outline (simplified)
      [[37,10],[34,-5],[15,-17],[5,-5],[-5,10],[-18,12],[-34,18],[-26,32],[-11,38],[0,42],[10,51],[22,40],[30,32],[37,22],[37,10]],
      // Eurasia
      [[35,-5],[35,28],[37,35],[40,29],[36,36],[37,41],[41,44],[43,51],[51,60],[60,60],[70,68],[71,55],[65,37],[60,30],[55,22],[55,37],[49,31],[35,28]],
      // India subcontinent
      [[28,68],[28,98],[8,78],[22,68],[28,68]],
      // SE Asia
      [[23,100],[23,115],[5,105],[2,108],[5,115],[0,107],[-5,106],[-8,115],[-8,125],[0,132],[10,124],[15,120],[20,110],[23,100]],
      // Americas
      [[70,-130],[70,-90],[60,-64],[50,-57],[45,-55],[25,-77],[10,-75],[0,-50],[-10,-40],[-55,-65],[-55,-38],[-25,-43],[-5,-34],[0,-50],[10,-75]],
      [[70,-130],[60,-140],[50,-125],[35,-120],[20,-105],[15,-90],[10,-85],[8,-77]],
      // Australia
      [[-17,136],[-25,130],[-35,135],[-38,143],[-25,152],[-17,136]],
    ];

    let rotY = 0;
    let drag = false;
    let lastX = 0;
    let velX = 0.003;
    let raf: number;

    function projectLatLon(lat: number, lon: number, rotationY: number): [number, number, boolean] {
      // 3D sphere projection with Y-axis rotation
      const phi = toRad(90 - lat);
      const theta = toRad(lon) + rotationY;
      const x3 = Math.sin(phi) * Math.cos(theta);
      const y3 = Math.cos(phi);
      const z3 = Math.sin(phi) * Math.sin(theta);
      const visible = z3 > -0.1; // front hemisphere
      const sx = cx + x3 * R;
      const sy = cy - y3 * R;
      return [sx, sy, visible];
    }

    function draw() {
      ctx.clearRect(0, 0, SIZE, SIZE);

      // Globe base glow
      const grd = ctx.createRadialGradient(cx, cy, R * 0.3, cx, cy, R);
      grd.addColorStop(0, 'rgba(30,60,100,0.85)');
      grd.addColorStop(0.6, 'rgba(10,20,50,0.92)');
      grd.addColorStop(1, 'rgba(5,10,30,0.98)');
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = grd; ctx.fill();

      // Latitude grid lines
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let first = true;
        for (let lon = -180; lon <= 180; lon += 4) {
          const [sx, sy, vis] = projectLatLon(lat, lon, rotY);
          if (!vis) { first = true; continue; }
          if (first) { ctx.moveTo(sx, sy); first = false; } else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = 'rgba(100,160,255,0.12)';
        ctx.lineWidth = 0.6; ctx.stroke();
      }
      // Longitude grid lines
      for (let lon = -180; lon < 180; lon += 30) {
        ctx.beginPath();
        let first = true;
        for (let lat = -90; lat <= 90; lat += 4) {
          const [sx, sy, vis] = projectLatLon(lat, lon, rotY);
          if (!vis) { first = true; continue; }
          if (first) { ctx.moveTo(sx, sy); first = false; } else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = 'rgba(100,160,255,0.12)';
        ctx.lineWidth = 0.6; ctx.stroke();
      }

      // Continent lines
      continentLines.forEach(poly => {
        ctx.beginPath();
        let first = true;
        poly.forEach(([lat, lon]) => {
          const [sx, sy, vis] = projectLatLon(lat, lon, rotY);
          if (!vis) { first = true; return; }
          if (first) { ctx.moveTo(sx, sy); first = false; } else ctx.lineTo(sx, sy);
        });
        ctx.strokeStyle = 'rgba(120,180,255,0.5)';
        ctx.lineWidth = 1.2; ctx.stroke();
      });

      // City dots & labels
      cities.forEach(([lat, lon, label]) => {
        const [sx, sy, vis] = projectLatLon(lat, lon, rotY);
        if (!vis) return;
        const isKolkata = label.startsWith('Kolkata');
        const dotR = isKolkata ? 5 : 2.5;
        ctx.beginPath();
        ctx.arc(sx, sy, dotR, 0, Math.PI * 2);
        if (isKolkata) {
          // Pulsing glow
          const glowGrd = ctx.createRadialGradient(sx, sy, 0, sx, sy, 16);
          glowGrd.addColorStop(0, 'rgba(255,220,80,0.9)');
          glowGrd.addColorStop(1, 'rgba(255,100,0,0)');
          ctx.fillStyle = glowGrd;
          ctx.beginPath(); ctx.arc(sx, sy, 16, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(sx, sy, dotR, 0, Math.PI * 2);
          ctx.fillStyle = '#FFD700'; ctx.fill();
          ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.2; ctx.stroke();
          ctx.fillStyle = '#FFD700';
          ctx.font = 'bold 10px sans-serif';
          ctx.fillText(label, sx + 8, sy - 6);
        } else {
          ctx.fillStyle = 'rgba(180,210,255,0.8)'; ctx.fill();
          ctx.fillStyle = 'rgba(180,210,255,0.6)';
          ctx.font = '8px sans-serif';
          ctx.fillText(label, sx + 4, sy - 3);
        }
      });

      // Outer rim glow
      const rimGrd = ctx.createRadialGradient(cx, cy, R - 6, cx, cy, R + 4);
      rimGrd.addColorStop(0, 'rgba(100,150,255,0)');
      rimGrd.addColorStop(0.6, 'rgba(80,130,255,0.22)');
      rimGrd.addColorStop(1, 'rgba(60,100,200,0)');
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = rimGrd; ctx.lineWidth = 8; ctx.stroke();

      // Clip to circle
      ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip(); ctx.restore();

      rotY += velX;
      raf = requestAnimationFrame(draw);
    }

    // Drag to rotate
    c.addEventListener('mousedown', e => { drag = true; lastX = e.clientX; velX = 0; });
    window.addEventListener('mousemove', e => {
      if (!drag) return;
      const dx = e.clientX - lastX; lastX = e.clientX;
      rotY += dx * 0.008; velX = dx * 0.004;
    });
    window.addEventListener('mouseup', () => { drag = false; if (Math.abs(velX) < 0.001) velX = 0.003; });
    c.addEventListener('touchstart', e => { drag = true; lastX = e.touches[0].clientX; velX = 0; }, { passive: true });
    window.addEventListener('touchmove', e => {
      if (!drag) return;
      const dx = e.touches[0].clientX - lastX; lastX = e.touches[0].clientX;
      rotY += dx * 0.008; velX = dx * 0.004;
    }, { passive: true });
    window.addEventListener('touchend', () => { drag = false; if (Math.abs(velX) < 0.001) velX = 0.003; });

    draw();
    return () => { cancelAnimationFrame(raf); };
  }, []);

  return (
    <canvas
      ref={ref}
      className="cursor-grab active:cursor-grabbing"
      style={{ width: 320, height: 320, borderRadius: '50%', display: 'block' }}
    />
  );
};

/* ─── Main Hero Component ───────────────────────────────────── */
const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const featuredPair = PROJECTS.slice(0, 2);
  const projectCards = PROJECTS.slice(0, 3);
  const primarySkills = SKILL_CATEGORIES.flatMap(g => g.skills).slice(0, 14);
  const topCerts = CERTIFICATIONS.slice(0, 6);
  const topAchievements = ACHIEVEMENTS.slice(0, 3);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-100"
    >
      {/* Starfield */}
      <Starfield />

      {/* Cosmic purple/blue radial glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(88,28,135,0.55),transparent_70%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-[radial-gradient(ellipse_80%_100%_at_50%_100%,rgba(8,47,73,0.7),transparent)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 pb-20 pt-10 space-y-10">

        {/* ── 1. AVATAR + TITLE ── */}
        <div className="flex flex-col items-center gap-5 text-center">
          {/* Glowing avatar ring */}
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-[conic-gradient(from_0deg,rgba(168,85,247,0.8),rgba(99,102,241,0.5),rgba(59,130,246,0.7),rgba(168,85,247,0.8))] blur-sm animate-[spin_8s_linear_infinite]" />
            <div className="relative h-28 w-28 rounded-full border-2 border-white/20 bg-gradient-to-br from-slate-700 to-slate-900 shadow-[0_0_50px_rgba(168,85,247,0.6)] overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-3xl font-black text-slate-400 select-none">BT</div>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{CV_DATA.name}</h1>
            <p className="text-sm font-medium text-slate-300">AI Engineer &middot; Full Stack Developer &middot; Data Systems Builder</p>
            <p className="mx-auto max-w-xl text-sm text-slate-400">
              I design intelligent systems that transform real-world problems into scalable, data-driven solutions.
            </p>
          </div>

          {/* Skill chips */}
          <div className="flex flex-wrap justify-center gap-2 text-[0.7rem]">
            {['AI/ML Systems','MERN Stack','Data Engineering','Cloud & DevOps'].map(t => (
              <span key={t} className="rounded-full border border-white/15 bg-white/8 px-4 py-1 font-medium text-slate-200 backdrop-blur-sm">{t}</span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => navigate('/projects')} className="rounded-full bg-violet-600 px-6 py-2 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-violet-500/40 hover:bg-violet-500 transition">
              View Projects
            </button>
            <button onClick={() => navigate('/contact')} className="rounded-full border border-white/20 bg-white/5 px-6 py-2 text-xs font-bold uppercase tracking-widest text-slate-200 hover:bg-white/10 transition">
              Let&apos;s Collaborate
            </button>
          </div>
        </div>

        {/* ── 2. GLOBE + EXPERIENCE ── */}
        <div className="grid gap-5 md:grid-cols-[1fr_1.1fr]">
          {/* Globe card */}
          <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-900/70 p-5 shadow-[0_0_60px_rgba(15,23,42,0.9)] backdrop-blur-sm">
            <Globe />
            <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-amber-400">
              <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
              Based in Kolkata, India &middot; Open to remote work
            </div>
            <p className="mt-1 text-center text-[0.7rem] text-slate-400">Drag to rotate the globe</p>
          </div>

          {/* Experience timeline card */}
          <div className="overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-900/70 p-5 shadow-[0_0_60px_rgba(15,23,42,0.9)] backdrop-blur-sm">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Experience</p>
            <div className="relative space-y-5 pl-5 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-slate-700">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="relative">
                  <div className="absolute -left-5 top-1.5 h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] ring-2 ring-slate-900" />
                  <div className="flex flex-wrap items-start justify-between gap-1">
                    <p className="text-sm font-semibold text-slate-100 leading-snug">{exp.role}</p>
                    <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[0.65rem] text-slate-400">{exp.duration}</span>
                  </div>
                  <p className="text-xs text-slate-400">{exp.company} &middot; {exp.location}</p>
                  {exp.bullets[0] && <p className="mt-1 text-[0.72rem] text-slate-300 leading-relaxed">{exp.bullets[0]}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 3. CAPABILITY TILES ── */}
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {[
            { label: 'AI Systems', icon: '🤖', desc: 'ML models, LLMs, RAG pipelines, GenAI tools & computer vision.' },
            { label: 'Full-Stack Apps', icon: '🖥️', desc: 'MERN / Next.js apps with auth, REST APIs, WebSockets & real-time features.' },
            { label: 'Cloud & DevOps', icon: '☁️', desc: 'AWS microservices, Docker, CI/CD, logs, metrics & alerts.' },
            { label: 'Data Pipelines', icon: '📊', desc: 'ETL jobs, data warehousing, Redshift, Power BI & Tableau dashboards.' },
          ].map(t => (
            <div key={t.label} className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-4 backdrop-blur-sm hover:border-slate-500 transition">
              <p className="text-2xl mb-2">{t.icon}</p>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-300 mb-1">{t.label}</p>
              <p className="text-[0.72rem] text-slate-400 leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        {/* ── 4. FEATURED PROJECTS (big cards) ── */}
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-slate-400 text-center">Featured Projects</p>
          <div className="grid gap-4 md:grid-cols-2">
            {featuredPair.map((p) => (
              <button key={p.id} onClick={() => navigate(`/projects/${p.id}`)}
                className="group overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-900/70 text-left backdrop-blur-sm hover:border-violet-500/70 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition">
                {p.image && (
                  <div className="h-40 overflow-hidden">
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500" />
                  </div>
                )}
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{p.id === 'proj1' ? '🌾' : '🎓'}</span>
                    <p className="text-sm font-bold text-slate-100 leading-snug">{p.title}</p>
                  </div>
                  <p className="text-[0.73rem] text-slate-300 line-clamp-2">{p.description?.[0]}</p>
                  <div className="flex flex-wrap gap-1">
                    {p.techStack.slice(0, 4).map(t => (
                      <span key={t} className="rounded-full bg-slate-800 px-2 py-0.5 text-[0.62rem] text-slate-300">{t}</span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── 5. ALL PROJECTS (3-col detail cards) ── */}
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-slate-400 text-center">All Projects</p>
          <div className="grid gap-4 md:grid-cols-3">
            {projectCards.map((p) => (
              <button key={p.id} onClick={() => navigate(`/projects/${p.id}`)}
                className="group overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-900/70 text-left backdrop-blur-sm hover:border-violet-500/70 transition">
                {p.image && (
                  <div className="h-28 overflow-hidden">
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500" />
                  </div>
                )}
                <div className="p-3 space-y-1.5">
                  <p className="text-xs font-bold text-slate-100 leading-snug">{p.title}</p>
                  <p className="text-[0.68rem] text-slate-400 line-clamp-2">{p.description?.[0]}</p>
                  <div className="flex flex-wrap gap-1">
                    {p.techStack.slice(0, 3).map(t => (
                      <span key={t} className="rounded-full bg-slate-800 px-2 py-0.5 text-[0.6rem] text-slate-400">{t}</span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── 6. TECH BADGE STRIP ── */}
        <div className="rounded-3xl border border-slate-700/60 bg-slate-900/70 p-5 backdrop-blur-sm">
          <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Technologies</p>
          <div className="flex flex-wrap justify-center gap-2">
            {primarySkills.map(s => (
              <span key={s.name} className="flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/80 px-3 py-1 text-[0.68rem] font-medium text-slate-200">
                {s.name}
              </span>
            ))}
          </div>
        </div>

        {/* ── 7. CERTIFICATIONS ── */}
        <div className="rounded-3xl border border-slate-700/60 bg-slate-900/70 p-5 backdrop-blur-sm">
          <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Certifications</p>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            {topCerts.map(cert => (
              <div key={cert.name} className="flex items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-800/70 px-3 py-2">
                <span className="text-base">🏅</span>
                <p className="text-[0.7rem] text-slate-200 leading-snug">{cert.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 8. ACHIEVEMENTS ── */}
        <div className="grid gap-3 sm:grid-cols-3">
          {topAchievements.map((ach, i) => (
            <div key={ach.title} className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-4 backdrop-blur-sm">
              <p className="text-2xl mb-2">{['🏆','🚀','⭐'][i]}</p>
              <p className="text-xs font-bold text-slate-100 mb-1">{ach.title}</p>
              <p className="text-[0.68rem] text-slate-400">{ach.description}</p>
            </div>
          ))}
        </div>

        {/* ── 9. CONTACT CTA ── */}
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-violet-500/30 bg-violet-950/30 p-8 text-center backdrop-blur-sm">
          <p className="text-lg font-bold">I&apos;m based in Kolkata, India &mdash; open to remote work worldwide 🌍</p>
          <p className="text-sm text-slate-300">{CV_DATA.email}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => navigate('/contact')} className="rounded-full bg-violet-600 px-6 py-2 text-xs font-bold uppercase tracking-widest text-white hover:bg-violet-500 transition">
              Let&apos;s build together
            </button>
            <a href={CV_DATA.links.linkedin} target="_blank" rel="noopener noreferrer"
              className="rounded-full border border-slate-500/50 bg-slate-800/60 px-6 py-2 text-xs font-bold uppercase tracking-widest text-slate-200 hover:bg-slate-700 transition">
              LinkedIn
            </a>
            <a href={CV_DATA.links.github} target="_blank" rel="noopener noreferrer"
              className="rounded-full border border-slate-500/50 bg-slate-800/60 px-6 py-2 text-xs font-bold uppercase tracking-widest text-slate-200 hover:bg-slate-700 transition">
              GitHub
            </a>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .bg-white\/8 { background-color: rgba(255,255,255,0.08); }
      `}</style>
    </section>
  );
};

export default Hero;
