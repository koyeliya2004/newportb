import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CV_DATA } from '../constants';

const roles = [
  'AI/ML Developer',
  'Full Stack Builder',
  'Computer Science Student',
  'Creative Problem Solver',
];

const FloatingOrb: React.FC<{
  className: string;
  color: string;
  size: string;
  duration?: string;
}> = ({ className, color, size, duration = '6s' }) => (
  <div
    className={`absolute rounded-full blur-3xl opacity-40 animate-pulse ${className}`}
    style={{
      width: size,
      height: size,
      background: color,
      animationDuration: duration,
    }}
  />
);

const ParticleLayer: React.FC = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 6}s`,
        duration: `${4 + Math.random() * 7}s`,
        size: Math.random() > 0.6 ? 'h-2 w-2' : 'h-1.5 w-1.5',
        opacity: Math.random() > 0.5 ? 'bg-white/60' : 'bg-pink-300/50',
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className={`absolute rounded-full ${particle.size} ${particle.opacity}`}
          style={{
            left: particle.left,
            top: particle.top,
            animation: `floatParticle ${particle.duration} ease-in-out ${particle.delay} infinite`,
            boxShadow: '0 0 14px rgba(255,255,255,0.4)',
          }}
        />
      ))}
    </div>
  );
};

const GridOverlay: React.FC = () => (
  <div
    className="pointer-events-none absolute inset-0"
    style={{
      backgroundImage:
        'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
      backgroundSize: '72px 72px',
      maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
    }}
  />
);

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRole((prev) => (prev + 1) % roles.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const highlights = [
    'Machine Learning & Deep Learning',
    'Full-Stack Applications',
    'Production-Ready AI Systems',
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#040610] text-white">
      {/* Dynamic mouse-reactive gradient */}
      <div
        className="absolute inset-0 transition-all duration-700 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(168,85,247,0.18) 0%, transparent 50%)`,
        }}
      />

      {/* Base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_top_left,rgba(168,85,247,0.30),transparent_40%),radial-gradient(ellipse_100%_70%_at_top_right,rgba(59,130,246,0.28),transparent_40%),radial-gradient(ellipse_90%_60%_at_bottom_center,rgba(236,72,153,0.22),transparent_45%),radial-gradient(ellipse_60%_50%_at_center,rgba(14,165,233,0.10),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent_20%,rgba(255,255,255,0.02))]" />

      {/* Large atmospheric orbs */}
      <FloatingOrb className="-left-32 top-10" color="radial-gradient(circle, rgba(244,114,182,0.95), rgba(244,114,182,0))" size="32rem" duration="7s" />
      <FloatingOrb className="-right-20 top-0" color="radial-gradient(circle, rgba(96,165,250,0.90), rgba(96,165,250,0))" size="36rem" duration="9s" />
      <FloatingOrb className="bottom-0 left-1/4" color="radial-gradient(circle, rgba(168,85,247,0.85), rgba(168,85,247,0))" size="28rem" duration="8s" />
      <FloatingOrb className="bottom-1/4 right-1/4" color="radial-gradient(circle, rgba(34,211,238,0.70), rgba(34,211,238,0))" size="22rem" duration="11s" />
      <FloatingOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" color="radial-gradient(circle, rgba(139,92,246,0.15), rgba(139,92,246,0))" size="50rem" duration="15s" />

      {/* Grid overlay */}
      <GridOverlay />

      <ParticleLayer />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 py-24 sm:px-10 lg:px-12">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-pink-200 backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(74,222,128,0.9)]" />
              Available for internships & collaboration
            </div>

            <div className="mt-8 space-y-6">
              <p className="text-sm uppercase tracking-[0.4em] text-white/55">Portfolio</p>

              <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                Hey, I&apos;m <span className="bg-gradient-to-r from-pink-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent">{CV_DATA.name}</span>
              </h1>

              <div className="min-h-[54px] text-xl font-semibold text-white/90 sm:text-2xl">
                I build <span className="text-cyan-300 transition-all duration-500">{roles[activeRole]}</span>
              </div>

              <p className="max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
                Building intelligent systems across AI, data, and full-stack development — from machine learning models to production-ready applications.
                Passionate about creating scalable, high-performance solutions with real-world impact.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm text-white/75 backdrop-blur-lg"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/projects')}
                className="rounded-2xl bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 px-7 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-[0_12px_45px_rgba(168,85,247,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_55px_rgba(59,130,246,0.35)]"
              >
                Explore Projects
              </button>

              <button
                onClick={() => navigate('/contact')}
                className="rounded-2xl border border-white/15 bg-white/8 px-7 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white/90 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/12"
              >
                Contact Me
              </button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-pink-500/30 via-violet-500/20 to-cyan-500/20 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/8 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.55)] backdrop-blur-2xl">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_35%,transparent_65%,rgba(255,255,255,0.08))]" />

              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.32em] text-white/45">Creative Developer</p>
                    <h2 className="mt-2 text-2xl font-bold text-white">Digital Profile Card</h2>
                  </div>
                  <div className="flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-pink-400" />
                    <span className="h-3 w-3 rounded-full bg-violet-400" />
                    <span className="h-3 w-3 rounded-full bg-cyan-400" />
                  </div>
                </div>

                <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-[#0d1025]/80 p-6">
                  <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-pink-500 via-violet-500 to-cyan-500 text-3xl font-black shadow-[0_18px_45px_rgba(168,85,247,0.35)]">
                    KG
                  </div>

                  <div className="mt-6 text-center">
                    <h3 className="text-2xl font-bold">{CV_DATA.name}</h3>
                    <p className="mt-2 text-sm leading-7 text-white/65">
                      CSE student, builder, learner, and dreamer — mixing code, creativity, and curiosity into every project.
                    </p>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-white/75">
                    <div className="rounded-2xl border border-white/8 bg-white/6 p-4">
                      <p className="text-white/45">Strength</p>
                      <p className="mt-1 font-semibold">Frontend + AI</p>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-white/6 p-4">
                      <p className="text-white/45">Goal</p>
                      <p className="mt-1 font-semibold">Build impactful apps</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-sm text-white/70">
                  <span>Designing with passion</span>
                  <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.2; }
          50% { transform: translateY(-22px) scale(1.5); opacity: 0.95; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
