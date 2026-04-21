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
}> = ({ className, color, size }) => (
  <div
    className={`absolute rounded-full blur-3xl opacity-40 animate-pulse ${className}`}
    style={{
      width: size,
      height: size,
      background: color,
      animationDuration: '6s',
    }}
  />
);

const ParticleLayer: React.FC = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${4 + Math.random() * 5}s`,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute h-1.5 w-1.5 rounded-full bg-white/50"
          style={{
            left: particle.left,
            top: particle.top,
            animation: `floatParticle ${particle.duration} ease-in-out ${particle.delay} infinite`,
            boxShadow: '0 0 12px rgba(255,255,255,0.35)',
          }}
        />
      ))}
    </div>
  );
};

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRole((prev) => (prev + 1) % roles.length);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  const quickStats = [
    { value: '10+', label: 'Projects Built' },
    { value: '5th Sem', label: 'CSE Student' },
    { value: 'AI + Web', label: 'Main Focus' },
    { value: 'Based in', label: 'Kolkata, India' },
  ];

  const highlights = [
    'Machine Learning and Deep Learning projects',
    'Full stack apps with modern UI',
    'Focused on real-world problem solving',
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#070816] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.25),transparent_28%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.22),transparent_30%),radial-gradient(circle_at_bottom,rgba(236,72,153,0.16),transparent_35%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_25%,rgba(255,255,255,0.02))]" />

      <FloatingOrb className="-left-16 top-24" color="radial-gradient(circle, rgba(244,114,182,0.9), rgba(244,114,182,0))" size="18rem" />
      <FloatingOrb className="right-0 top-12" color="radial-gradient(circle, rgba(96,165,250,0.85), rgba(96,165,250,0))" size="22rem" />
      <FloatingOrb className="bottom-0 left-1/3" color="radial-gradient(circle, rgba(168,85,247,0.7), rgba(168,85,247,0))" size="20rem" />

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
                I am a passionate developer who loves building beautiful web experiences, smart AI solutions, and practical projects that feel modern, useful, and memorable.
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

            <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {quickStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-white/10 bg-white/6 p-5 backdrop-blur-2xl shadow-[0_10px_40px_rgba(15,23,42,0.35)]"
                >
                  <p className="text-2xl font-extrabold text-white">{stat.value}</p>
                  <p className="mt-1 text-sm text-white/60">{stat.label}</p>
                </div>
              ))}
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
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.25; }
          50% { transform: translateY(-18px) scale(1.45); opacity: 0.9; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
