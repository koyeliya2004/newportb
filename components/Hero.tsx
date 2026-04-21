import React, { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CV_DATA } from '../constants';

// ── Scramble text hook ──────────────────────────────────────────────────────
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';

function useScramble(target: string, trigger: boolean, speed = 40) {
  const [display, setDisplay] = useState(target);
  const frame = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!trigger) { setDisplay(target); return; }
    let iter = 0;
    const total = target.length;
    const tick = () => {
      setDisplay(
        target
          .split('')
          .map((ch, i) => {
            if (ch === ' ') return ' ';
            if (i < iter) return ch;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );
      iter += 0.6;
      if (iter < total + 2) frame.current = setTimeout(tick, speed);
      else setDisplay(target);
    };
    tick();
    return () => { if (frame.current) clearTimeout(frame.current); };
  }, [trigger, target, speed]);

  return display;
}

// ── Glitch image component ──────────────────────────────────────────────────
const GlitchAvatar: React.FC = () => {
  const [glitching, setGlitching] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerGlitch = useCallback(() => {
    setGlitching(true);
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setGlitching(false), 1400);
  }, []);

  return (
    <div
      onClick={triggerGlitch}
      className="relative cursor-pointer select-none"
      title="Click me!"
    >
      {/* Lime polygon background */}
      <div
        className="absolute inset-0 bg-[#b5f23d] z-0"
        style={{ clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)' }}
      />

      {/* Placeholder silhouette / initials */}
      <div
        className={`relative z-10 flex items-center justify-center overflow-hidden transition-all duration-300 ${
          glitching ? 'grayscale brightness-75' : 'grayscale-0 brightness-100'
        }`}
        style={{
          width: '300px',
          height: '420px',
          clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
          transform: glitching ? `rotate(${(Math.random() - 0.5) * 6}deg)` : 'rotate(0deg)',
          transition: 'filter 0.2s, transform 0.15s',
        }}
      >
        {/* Avatar placeholder */}
        <div className="flex flex-col items-center justify-center w-full h-full bg-black/30">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#b5f23d] via-[#6ee7b7] to-[#3b82f6] flex items-center justify-center text-4xl font-black text-black shadow-2xl">
            KG
          </div>
          <p className="mt-4 text-white/70 text-sm font-semibold tracking-widest uppercase">Your Photo Here</p>
        </div>

        {/* Glitch overlay slices */}
        {glitching && (
          <>
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'repeating-linear-gradient(transparent 0px, transparent 3px, rgba(181,242,61,0.18) 3px, rgba(181,242,61,0.18) 4px)',
              animation: 'glitchScan 0.18s steps(1) infinite',
              mixBlendMode: 'screen',
            }} />
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'rgba(255,0,80,0.12)',
              transform: 'translateX(4px)',
              animation: 'glitchShift 0.12s steps(1) infinite',
              mixBlendMode: 'screen',
            }} />
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'rgba(0,255,200,0.10)',
              transform: 'translateX(-4px)',
              animation: 'glitchShift 0.09s steps(1) infinite reverse',
              mixBlendMode: 'screen',
            }} />
          </>
        )}
      </div>

      {/* Click hint badge */}
      {!glitching && (
        <div className="absolute bottom-3 right-2 z-20 bg-black text-[#b5f23d] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-[#b5f23d]/40 animate-pulse">
          Click me
        </div>
      )}

      <style>{`
        @keyframes glitchScan {
          0%   { transform: translateY(0px); }
          25%  { transform: translateY(-8px); }
          50%  { transform: translateY(5px); }
          75%  { transform: translateY(-3px); }
          100% { transform: translateY(0px); }
        }
        @keyframes glitchShift {
          0%   { clip-path: inset(20% 0 60% 0); }
          20%  { clip-path: inset(60% 0 10% 0); }
          40%  { clip-path: inset(5% 0 80% 0); }
          60%  { clip-path: inset(40% 0 30% 0); }
          80%  { clip-path: inset(70% 0 5% 0); }
          100% { clip-path: inset(20% 0 60% 0); }
        }
      `}</style>
    </div>
  );
};

// ── Animated role text ────────────────────────────────────────────────────
const roles = [
  'Full Stack Developer',
  'AI / ML Engineer',
  'Creative Problem Solver',
  'CSE Student @ MAKAUT',
];

// ── Main Hero ─────────────────────────────────────────────────────────────
const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState(0);
  const [scrambleTrigger, setScrambleTrigger] = useState(false);
  const [hoverName, setHoverName] = useState(false);

  // rotate roles
  useEffect(() => {
    const t = setInterval(() => {
      setActiveRole(p => (p + 1) % roles.length);
      setScrambleTrigger(true);
      setTimeout(() => setScrambleTrigger(false), 1200);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  const displayRole = useScramble(roles[activeRole], scrambleTrigger, 30);
  const displayName = useScramble(CV_DATA.name, hoverName, 25);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a0c0a] text-white flex items-center">
      {/* Subtle grid lines */}
      <div className="pointer-events-none absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(181,242,61,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(181,242,61,0.04) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Lime glow top-left */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#b5f23d] opacity-10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16 py-24">
        <div className="grid w-full gap-14 lg:grid-cols-2 items-center">

          {/* ── LEFT: Text content ── */}
          <div className="order-2 lg:order-1">
            {/* Status pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#b5f23d]/30 bg-[#b5f23d]/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-[#b5f23d] mb-8">
              <span className="h-2 w-2 rounded-full bg-[#b5f23d] shadow-[0_0_10px_rgba(181,242,61,0.9)] animate-pulse" />
              Available for internships
            </div>

            {/* Name */}
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-none tracking-tighter mb-4 cursor-default"
              onMouseEnter={() => setHoverName(true)}
              onMouseLeave={() => setHoverName(false)}
            >
              <span className="block text-white/40 text-lg font-semibold tracking-[0.4em] uppercase mb-2">Hey, I&apos;m</span>
              <span
                className="bg-gradient-to-r from-[#b5f23d] via-white to-[#b5f23d] bg-clip-text text-transparent"
                style={{ fontFamily: 'inherit' }}
              >
                {displayName}
              </span>
            </h1>

            {/* Animated role */}
            <div className="mt-4 h-10 flex items-center">
              <span className="text-xl sm:text-2xl font-mono font-bold text-white/80">
                {'> '}
              </span>
              <span className="ml-2 text-xl sm:text-2xl font-mono font-bold text-[#b5f23d] tracking-wide">
                {displayRole}
                <span className="inline-block w-[2px] h-6 bg-[#b5f23d] ml-1 animate-pulse align-middle" />
              </span>
            </div>

            <p className="mt-6 max-w-lg text-base leading-8 text-white/55">
              CSE student, builder, and learner — mixing code, creativity, and curiosity into every project. Hover the name. Click the photo.
            </p>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/projects')}
                className="rounded-full bg-[#b5f23d] text-black px-8 py-4 text-sm font-black uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(181,242,61,0.35)] hover:shadow-[0_0_50px_rgba(181,242,61,0.55)] hover:-translate-y-1 transition-all duration-300"
              >
                My Projects
              </button>
              <button
                onClick={() => navigate('/about')}
                className="rounded-full border border-white/20 bg-white/5 text-white px-8 py-4 text-sm font-black uppercase tracking-[0.2em] hover:border-[#b5f23d]/60 hover:text-[#b5f23d] hover:-translate-y-1 transition-all duration-300"
              >
                About Me
              </button>
            </div>

            {/* Quick stats */}
            <div className="mt-12 flex flex-wrap gap-4">
              {[
                { value: '10+', label: 'Projects' },
                { value: '5th Sem', label: 'MAKAUT CSE' },
                { value: 'AI + Web', label: 'Focus' },
                { value: 'Kolkata', label: 'India' },
              ].map(s => (
                <div key={s.label} className="rounded-2xl border border-white/8 bg-white/4 px-5 py-4 backdrop-blur-xl">
                  <p className="text-xl font-extrabold text-[#b5f23d]">{s.value}</p>
                  <p className="text-xs text-white/50 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Glitch Avatar ── */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <GlitchAvatar />
          </div>

        </div>
      </div>

      <style>{`
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.2; }
          50% { transform: translateY(-18px) scale(1.4); opacity: 0.8; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
