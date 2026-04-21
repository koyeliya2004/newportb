import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CV_DATA } from '../constants';

const roles = [
  'AI/ML Developer',
  'Full Stack Builder',
  'Computer Science Student',
  'Creative Problem Solver',
];

const expertiseItems = [
  {
    title: 'Full Stack Development',
    subtitle: '(MERN / Next.js)',
    icon: '</>',
  },
  {
    title: 'AI & Machine Learning',
    subtitle: '(NLP, LLMs, GenAI)',
    icon: '◉',
  },
  {
    title: 'Data Engineering',
    subtitle: '(ETL, SQL, Warehousing)',
    icon: '▣',
  },
  {
    title: 'REST APIs & Backend',
    subtitle: '(Node.js, Express.js)',
    icon: 'API',
  },
  {
    title: 'Cloud & DevOps',
    subtitle: '(AWS, Docker, CI/CD)',
    icon: '☁',
  },
  {
    title: 'System Design Basics',
    subtitle: '(Scalable & Efficient Systems)',
    icon: '▤',
  },
];

const buildItems = [
  {
    title: 'AI-Powered Applications',
    description: 'Building intelligent solutions using ML, NLP & GenAI.',
    icon: '✦',
  },
  {
    title: 'Scalable Web Platforms',
    description: 'Developing modern, responsive and high-performance apps.',
    icon: '◎',
  },
  {
    title: 'Data Driven Systems',
    description: 'Creating ETL pipelines, data models & analytics solutions.',
    icon: '◌',
  },
  {
    title: 'Real-world Impact',
    description: 'Solving meaningful problems with clean, efficient code.',
    icon: '↗',
  },
];

const skillPoints = [
  { label: 'Frontend', x: 50, y: 10 },
  { label: 'Backend', x: 82, y: 32 },
  { label: 'AI / ML', x: 76, y: 68 },
  { label: 'Data', x: 50, y: 84 },
  { label: 'Cloud', x: 24, y: 68 },
  { label: 'System Design', x: 18, y: 32 },
];

const polygon = '50,20 71,33 67,61 50,74 33,61 29,39';

const FloatingGoldParticle: React.FC = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${5 + Math.random() * 7}s`,
        opacity: 0.25 + Math.random() * 0.55,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute h-1.5 w-1.5 rounded-full bg-[#f3c623]"
          style={{
            left: particle.left,
            top: particle.top,
            opacity: particle.opacity,
            boxShadow: '0 0 14px rgba(243,198,35,0.65)',
            animation: `goldFloat ${particle.duration} ease-in-out ${particle.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
};

const Counter: React.FC<{ target: number; suffix?: string; duration?: number }> = ({
  target,
  suffix = '',
  duration = 1600,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = Math.max(1, Math.ceil(target / (duration / 16)));
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

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

  return (
    <div className="relative overflow-hidden bg-black text-white">
      <section className="relative min-h-screen overflow-hidden bg-black text-white">
        <div
          className="absolute inset-0 transition-all duration-700 ease-out"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(243,198,35,0.14) 0%, transparent 45%)`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(243,198,35,0.18),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_28%),linear-gradient(to_bottom,rgba(255,215,64,0.04),transparent_25%,rgba(255,255,255,0.015))]" />
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              'linear-gradient(rgba(243,198,35,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(243,198,35,0.07) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
        <FloatingGoldParticle />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 py-24 sm:px-10 lg:px-12">
          <div className="w-full">
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#f3c623]">// What I Do</p>

            <div className="mt-8 max-w-6xl">
              <h1 className="text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
                <span className="block text-white">Building intelligent systems</span>
                <span className="block text-[#f3c623]">that turn ideas into real-world impact.</span>
              </h1>

              <div className="mt-6 min-h-[42px] text-lg font-semibold text-white/80 sm:text-2xl">
                I build <span className="text-[#f3c623] transition-all duration-500">{roles[activeRole]}</span>
              </div>

              <p className="mt-8 max-w-4xl text-xl font-semibold leading-relaxed text-white/76 sm:text-2xl">
                Creating scalable AI and full-stack solutions that solve meaningful problems.
              </p>

              <p className="mt-10 max-w-5xl text-lg leading-10 text-white/56 sm:text-[1.45rem]">
                From machine learning models to production-ready applications, I focus on building efficient, data-driven systems that are practical, scalable, and impactful. Every project I take on is built with a clear goal: real users, real results.
              </p>
            </div>

            <div className="mt-14 flex flex-wrap gap-5">
              <button
                onClick={() => navigate('/about')}
                className="rounded-full bg-[#f3c623] px-10 py-5 text-sm font-black uppercase tracking-[0.28em] text-black shadow-[0_0_28px_rgba(243,198,35,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(243,198,35,0.4)]"
              >
                About Me
              </button>
              <button
                onClick={() => navigate('/projects')}
                className="rounded-full border border-white/20 bg-white/5 px-10 py-5 text-sm font-black uppercase tracking-[0.28em] text-white transition duration-300 hover:-translate-y-1 hover:border-[#f3c623]/60 hover:text-[#f3c623]"
              >
                Explore My Work →
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 sm:px-10 lg:px-12">
        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr_1.1fr_1fr]">
          <div className="rounded-[1.8rem] border border-[#f3c623]/25 bg-[linear-gradient(180deg,rgba(11,11,11,0.95),rgba(16,16,16,0.92))] p-6 shadow-[0_0_40px_rgba(243,198,35,0.08)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-[#f3c623]/55">
            <div className="mb-6 flex items-center gap-3 text-[#f3c623]">
              <span className="text-2xl">✦</span>
              <p className="text-lg font-bold uppercase tracking-[0.2em] text-white">Core Expertise</p>
            </div>
            <div className="space-y-5">
              {expertiseItems.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#f3c623]/35 bg-[#f3c623]/8 text-sm font-bold text-[#f3c623]">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-base font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-sm text-[#f3c623]/72">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-[#f3c623]/25 bg-[radial-gradient(circle_at_bottom_left,rgba(243,198,35,0.22),transparent_25%),linear-gradient(180deg,rgba(11,11,11,0.98),rgba(17,17,17,0.94))] p-6 shadow-[0_0_40px_rgba(243,198,35,0.1)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-[#f3c623]/55">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#f3c623]/40 bg-[#f3c623]/10 text-[#f3c623] shadow-[0_0_20px_rgba(243,198,35,0.12)]">
                ▥
              </div>
              <div className="h-16 w-16 rounded-full bg-[radial-gradient(circle,rgba(243,198,35,0.18),transparent_70%)] blur-2xl" />
            </div>

            <div className="space-y-5 text-center">
              <div>
                <p className="text-6xl font-black text-[#f3c623]"><Counter target={15} suffix="+" /></p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">Projects Built</p>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-[#f3c623]/50 to-transparent" />
              <div>
                <p className="text-5xl font-black text-[#f3c623]"><Counter target={40} suffix="+" /></p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">APIs Developed</p>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-[#f3c623]/50 to-transparent" />
              <div>
                <p className="text-5xl font-black text-[#f3c623]"><Counter target={120} suffix="+" /></p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">Students Mentored</p>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-[#f3c623]/50 to-transparent" />
              <div>
                <p className="text-5xl font-black text-[#f3c623]"><Counter target={60} suffix="%" /></p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">Performance Improvement</p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-[#f3c623]/25 bg-[linear-gradient(180deg,rgba(11,11,11,0.95),rgba(16,16,16,0.92))] p-6 shadow-[0_0_40px_rgba(243,198,35,0.08)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-[#f3c623]/55">
            <div className="mb-6 flex items-center gap-3 text-[#f3c623]">
              <span className="text-2xl">▣</span>
              <p className="text-lg font-bold uppercase tracking-[0.2em] text-white">What I Build</p>
            </div>
            <div className="space-y-6">
              {buildItems.map((item, index) => (
                <div key={item.title} className="relative flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#f3c623]/35 bg-[#f3c623]/10 text-lg font-bold text-[#f3c623]">
                      {item.icon}
                    </div>
                    {index !== buildItems.length - 1 && (
                      <div className="mt-2 h-12 w-px bg-gradient-to-b from-[#f3c623]/60 to-transparent" />
                    )}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-sm leading-7 text-[#f3c623]/72">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-[#f3c623]/25 bg-[linear-gradient(180deg,rgba(11,11,11,0.95),rgba(16,16,16,0.92))] p-6 shadow-[0_0_40px_rgba(243,198,35,0.08)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-[#f3c623]/55">
            <div className="mb-6 flex items-center gap-3 text-[#f3c623]">
              <span className="text-2xl">✦</span>
              <p className="text-lg font-bold uppercase tracking-[0.2em] text-white">Skill Distribution</p>
            </div>

            <div className="relative mx-auto mt-2 flex h-[280px] w-full max-w-[280px] items-center justify-center">
              <svg viewBox="0 0 100 100" className="h-full w-full">
                <polygon points="50,8 86,29 86,71 50,92 14,71 14,29" fill="none" stroke="rgba(243,198,35,0.16)" />
                <polygon points="50,18 77,34 77,66 50,82 23,66 23,34" fill="none" stroke="rgba(243,198,35,0.16)" />
                <polygon points="50,28 68,39 68,61 50,72 32,61 32,39" fill="none" stroke="rgba(243,198,35,0.16)" />
                <polygon points="50,38 59,44 59,56 50,62 41,56 41,44" fill="none" stroke="rgba(243,198,35,0.16)" />
                <line x1="50" y1="10" x2="50" y2="84" stroke="rgba(243,198,35,0.16)" />
                <line x1="18" y1="32" x2="82" y2="68" stroke="rgba(243,198,35,0.16)" />
                <line x1="18" y1="68" x2="82" y2="32" stroke="rgba(243,198,35,0.16)" />

                <polygon
                  points={polygon}
                  fill="rgba(243,198,35,0.45)"
                  stroke="#f3c623"
                  strokeWidth="1.5"
                  className="animate-pulse"
                />

                {skillPoints.map((point) => (
                  <g key={point.label}>
                    <circle cx={point.x} cy={point.y} r="2.3" fill="#f3c623" />
                  </g>
                ))}
              </svg>

              {skillPoints.map((point) => (
                <span
                  key={point.label}
                  className="absolute -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-white/80"
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                >
                  {point.label}
                </span>
              ))}
            </div>

            <div className="mt-5 rounded-full border border-[#f3c623]/30 bg-[#f3c623]/6 px-4 py-3 text-center text-sm text-[#f8e7a6]">
              ✦ Always Learning, Always Building.
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes goldFloat {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.2; }
          50% { transform: translateY(-18px) scale(1.45); opacity: 0.92; }
        }
      `}</style>
    </div>
  );
};

export default Hero;
