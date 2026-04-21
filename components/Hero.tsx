import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../App';
import { CV_DATA, PROJECTS, SKILL_CATEGORIES } from '../constants';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const featuredProjects = PROJECTS.slice(0, 3);
  const topSkillGroups = SKILL_CATEGORIES.slice(0, 3);

  return (
    <div
      id="home"
      className={`relative min-h-screen transition-colors duration-500 ${
        isDark ? 'bg-slate-950 text-slate-50' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Hero section */}
      <section className="relative min-h-[80vh] flex items-center">
        {/* Subtle grid background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className={`absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.5)_1px,transparent_0)] bg-[size:32px_32px]`}
          />
          <div
            className={`absolute inset-y-0 left-1/2 w-px translate-x-[-50%] ${
              isDark ? 'bg-slate-700/40' : 'bg-slate-300/60'
            }`}
          />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16 md:flex-row md:items-center md:justify-between">
          {/* Left: intro */}
          <div className="max-w-xl space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-slate-500/30 bg-slate-900/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] backdrop-blur-sm dark:bg-slate-900/30">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Portfolio · Audit-Driven Engineering</span>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">
                {CV_DATA.location}
              </p>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                <span className="block text-sm font-semibold uppercase tracking-[0.35em] text-emerald-500">
                  Bhumika Tewari
                </span>
                <span className="mt-3 block leading-tight">
                  Technology, AI & Data
                  <span className="block text-slate-500">Auditing systems with an engineer's lens.</span>
                </span>
              </h1>
              <p className="text-sm leading-relaxed text-slate-500">
                I build and review software, AI and data systems with a focus on reliability, traceability and
                real-world impact – treating every project like an audit: clear scope, evidence-based decisions and
                tight feedback loops.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate('/projects')}
                className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-50 shadow-sm transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
              >
                View case studies
                <span className="text-base transition-transform group-hover:translate-x-1">↗</span>
              </button>

              <button
                onClick={() => navigate('/experience')}
                className="inline-flex items-center gap-2 rounded-full border border-slate-500/40 bg-slate-900/5 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 backdrop-blur-sm hover:border-slate-500 hover:text-slate-300 dark:bg-slate-900/40"
              >
                Audit my experience
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 text-xs">
              <div className="space-y-1 border-l border-slate-500/30 pl-3">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-500">Projects</p>
                <p className="text-lg font-semibold">{PROJECTS.length}+</p>
                <p className="text-[0.7rem] text-slate-500">End-to-end builds & deep dives</p>
              </div>
              <div className="space-y-1 border-l border-slate-500/30 pl-3">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-500">Domains</p>
                <p className="text-lg font-semibold">AI · Data · Cloud</p>
                <p className="text-[0.7rem] text-slate-500">From ML models to ETL & dashboards</p>
              </div>
              <div className="space-y-1 border-l border-slate-500/30 pl-3">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-500">Style</p>
                <p className="text-lg font-semibold">Audit-minded</p>
                <p className="text-[0.7rem] text-slate-500">Evidence, observability & clarity</p>
              </div>
            </div>
          </div>

          {/* Right: portrait + summary card */}
          <div className="relative mt-10 w-full max-w-sm md:mt-0">
            <div
              className={`relative overflow-hidden rounded-3xl border ${
                isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white'
              } shadow-xl`}
            >
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1000&auto=format&fit=crop"
                  alt="Audit-style workspace with laptop and reports"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Review · Design · Ship</span>
                </div>
              </div>

              <div className="space-y-4 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Systems audit summary
                </p>
                <p className="text-xs leading-relaxed text-slate-400">
                  {CV_DATA.summary}
                </p>
                <div className="flex flex-wrap gap-2 text-[0.65rem]">
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 font-medium text-emerald-300">
                    Full-stack engineering
                  </span>
                  <span className="rounded-full bg-sky-500/10 px-3 py-1 font-medium text-sky-300">AI / ML</span>
                  <span className="rounded-full bg-amber-500/10 px-3 py-1 font-medium text-amber-300">
                    Data & analytics
                  </span>
                </div>
              </div>
            </div>

            {/* Scroll hint */}
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('home-overview');
                el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="group absolute -bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-slate-500"
            >
              <span>Scroll to overview</span>
              <span className="flex h-9 w-px items-center justify-center overflow-hidden rounded-full bg-slate-600/30">
                <span className="h-5 w-[1px] animate-[scrollDot_1.4s_ease-in-out_infinite] bg-slate-400" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Overview / what I audit */}
      <section
        id="home-overview"
        className={`border-t ${
          isDark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-slate-50'
        }`}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-14 md:flex-row">
          <div className="max-w-md space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Overview</p>
            <h2 className="text-lg font-semibold tracking-tight md:text-xl">
              From requirement to review – treating every build like a structured audit.
            </h2>
            <p className="text-sm leading-relaxed text-slate-500">
              I specialise in projects where correctness, traceability and data quality matter – combining code,
              analytics and documentation so that teams can trust what they ship and how it behaves in the wild.
            </p>
          </div>

          <div className="grid flex-1 grid-cols-1 gap-4 text-sm sm:grid-cols-2">
            <div
              className={`flex flex-col justify-between rounded-2xl border p-4 ${
                isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white'
              }`}
            >
              <div className="space-y-2">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-500">
                  What I audit
                </p>
                <p className="text-sm font-medium">AI pipelines · ETL flows · dashboards · full-stack apps</p>
                <p className="text-[0.75rem] text-slate-500">
                  Focusing on data paths, failure modes, logging, monitoring and the real questions stakeholders want
                  answered.
                </p>
              </div>
            </div>

            <div
              className={`flex flex-col justify-between rounded-2xl border p-4 ${
                isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white'
              }`}
            >
              <div className="space-y-2">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-500">
                  How I work
                </p>
                <ul className="space-y-1 text-[0.75rem] text-slate-500">
                  <li>· Short discovery → scoped checklist</li>
                  <li>· Evidence-backed findings with concrete fixes</li>
                  <li>· Lightweight diagrams, not 50-page PDFs</li>
                  <li>· Paired sessions with engineers & PMs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured projects preview */}
      <section
        className={`border-t ${
          isDark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-slate-50'
        }`}
      >
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Selected work</p>
              <h2 className="text-lg font-semibold tracking-tight md:text-xl">Case studies worth auditing</h2>
            </div>
            <button
              onClick={() => navigate('/projects')}
              className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-slate-500 hover:text-slate-300"
            >
              View all
            </button>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {featuredProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => navigate(`/projects/${project.id}`)}
                className={`group flex h-full flex-col justify-between rounded-2xl border p-4 text-left transition hover:-translate-y-1 hover:shadow-lg ${
                  isDark
                    ? 'border-slate-800 bg-slate-900/60 hover:border-slate-600'
                    : 'border-slate-200 bg-white hover:border-slate-400'
                }`}
              >
                <div className="space-y-2">
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-slate-500">
                    Project audit · {project.id}
                  </p>
                  <p className="text-sm font-semibold leading-snug">{project.title}</p>
                  {project.description && project.description[0] && (
                    <p className="text-[0.75rem] text-slate-500 line-clamp-3">{project.description[0]}</p>
                  )}
                </div>
                <div className="mt-4 flex items-center justify-between text-[0.7rem] text-slate-500">
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-slate-500/10 px-2 py-0.5 text-[0.65rem] text-slate-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 group-hover:text-emerald-400">
                    Open
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities strip */}
      <section
        className={`border-t ${
          isDark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-slate-50'
        }`}
      >
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Capability areas</p>
              <p className="text-sm text-slate-400">Where an audit mindset meets shipping code.</p>
            </div>
            <div className="grid flex-1 grid-cols-1 gap-3 text-[0.75rem] sm:grid-cols-3">
              {topSkillGroups.map((group) => (
                <div
                  key={group.name}
                  className={`rounded-full border px-4 py-2 ${
                    isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white'
                  }`}
                >
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-slate-500">
                    {group.name}
                  </p>
                  <p className="truncate text-[0.75rem] text-slate-400">
                    {group.skills.map((s) => s.name).join(' · ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className={`border-t ${
          isDark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-slate-50'
        }`}
      >
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div
            className={`flex flex-col items-start gap-4 rounded-3xl border px-6 py-6 md:flex-row md:items-center md:justify-between ${
              isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'
            }`}
          >
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Next step</p>
              <p className="text-sm font-medium md:text-base">
                Want to walk through the details like an audit? Let&apos;s step through projects, decisions and metrics
                together.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-[0.75rem]">
              <button
                onClick={() => navigate('/contact')}
                className="rounded-full bg-emerald-500 px-4 py-2 font-semibold uppercase tracking-[0.2em] text-emerald-950 shadow-sm hover:bg-emerald-400"
              >
                Schedule a call
              </button>
              <button
                onClick={() => navigate('/about')}
                className="rounded-full border border-slate-500/40 px-4 py-2 font-semibold uppercase tracking-[0.2em] text-slate-500 hover:border-slate-400 hover:text-slate-300"
              >
                View full profile
              </button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes scrollDot {
          0% { transform: translateY(-140%); opacity: 0; }
          40% { opacity: 1; }
          100% { transform: translateY(140%); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Hero;
