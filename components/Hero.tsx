import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../App';
import { CV_DATA, PROJECTS, SKILL_CATEGORIES, EXPERIENCES, CERTIFICATIONS, ACHIEVEMENTS } from '../constants';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const featuredProjects = PROJECTS.slice(0, 3);
  const primarySkills = SKILL_CATEGORIES.slice(0, 4).flatMap((group) => group.skills).slice(0, 10);
  const topCerts = CERTIFICATIONS.slice(0, 4);
  const topAchievements = ACHIEVEMENTS.slice(0, 3);

  return (
    <section
      id="home"
      className={`relative min-h-screen overflow-hidden bg-gradient-to-b ${
        isDark
          ? 'from-slate-950 via-slate-950 to-slate-950 text-slate-50'
          : 'from-slate-900 via-slate-900 to-slate-950 text-slate-50'
      }`}
    >
      {/* Cosmic background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_top,_rgba(88,28,135,0.45),transparent_55%),radial-gradient(circle_at_bottom,_rgba(8,47,73,0.7),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.18] bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.7)_1px,transparent_0)] bg-[size:26px_26px]" />
        <div className="absolute -left-40 top-1/3 h-[320px] w-[320px] rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute -right-40 bottom-10 h-[320px] w-[320px] rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-5 pb-16 pt-10 md:pt-14">
        {/* Top hero: avatar + title */}
        <div className="flex flex-col items-center gap-6 pt-4 text-center">
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-slate-900/60 shadow-[0_0_40px_rgba(129,140,248,0.5)] ring-2 ring-purple-400/70">
            <div className="h-28 w-28 rounded-full bg-gradient-to-br from-slate-700 via-slate-900 to-slate-800" />
            <div className="pointer-events-none absolute inset-0 rounded-full border border-white/10" />
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              {CV_DATA.location} · Open to remote work
            </p>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
              <span className="block text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                {CV_DATA.name}
              </span>
              <span className="mt-2 block text-sm font-medium text-slate-300">
                AI Engineer · Full Stack Developer · Data Systems Builder
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-300">
              I design intelligent systems that transform real
              world problems into scalable, data
              driven solutions 
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-1 text-[0.7rem]">
              <span className="rounded-full bg-purple-500/20 px-3 py-1 font-medium text-purple-100">
                AI/ML Systems
              </span>
              <span className="rounded-full bg-sky-500/20 px-3 py-1 font-medium text-sky-100">MERN Stack</span>
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 font-medium text-emerald-100">
                Data Engineering
              </span>
              <span className="rounded-full bg-amber-500/20 px-3 py-1 font-medium text-amber-100">
                Cloud &amp; DevOps
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-[0.7rem]">
            <button
              onClick={() => navigate('/projects')}
              className="rounded-full bg-purple-500 px-5 py-2 font-semibold uppercase tracking-[0.2em] text-slate-50 shadow-lg shadow-purple-500/40 transition hover:bg-purple-400"
            >
              View projects
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="rounded-full border border-slate-500/60 bg-slate-900/60 px-5 py-2 font-semibold uppercase tracking-[0.2em] text-slate-300 hover:border-slate-200"
            >
              Let&apos;s collaborate
            </button>
          </div>
        </div>

        {/* Mid band: summary + experience timeline */}
        <div className="grid gap-6 md:grid-cols-[1.2fr_1.1fr]">
          {/* Left: abstract globe / summary card */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-700/70 bg-slate-900/70 p-5 shadow-[0_0_40px_rgba(15,23,42,0.9)]">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -bottom-16 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-400/25 blur-3xl" />
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_rgba(148,163,184,0.6),transparent_55%)]" />
            </div>
            <div className="relative space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">About my work</p>
              <p className="text-sm leading-relaxed text-slate-200">
                {CV_DATA.summary}
              </p>
              <p className="pt-1 text-[0.75rem] text-slate-400">
                I treat each project like an audit: understand the system, map the data paths, design experiments,
                then turn that learning into production
ready features.
              </p>
            </div>
          </div>

          {/* Right: experience timeline */}
          <div className="overflow-hidden rounded-3xl border border-slate-700/70 bg-slate-900/80 p-5 shadow-[0_0_40px_rgba(15,23,42,0.9)]">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Experience snapshot
            </p>
            <div className="space-y-4 text-sm">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="relative pl-6">
                  <div className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-emerald-400" />
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-slate-100">{exp.role}</p>
                    <p className="text-[0.7rem] text-slate-400">{exp.duration}</p>
                  </div>
                  <p className="text-[0.75rem] text-slate-400">{exp.company}</p>
                  {exp.bullets[0] && (
                    <p className="mt-1 text-[0.75rem] text-slate-400">{exp.bullets[0]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Capability tiles */}
        <div className="grid gap-4 rounded-3xl border border-slate-700/70 bg-slate-900/60 p-5 text-left shadow-[0_0_40px_rgba(15,23,42,0.9)] md:grid-cols-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">AI Systems</p>
            <p className="text-[0.8rem] text-slate-200">
              ML models, LLM workflows and AI tools that ship, not just notebooks.
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Full-Stack Apps</p>
            <p className="text-[0.8rem] text-slate-200">
              React / Next.js frontends paired with solid backend APIs and auth.
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Cloud &amp; DevOps</p>
            <p className="text-[0.8rem] text-slate-200">
              Deployments on AWS and modern tooling with logs, metrics and alerts.
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Data Pipelines</p>
            <p className="text-[0.8rem] text-slate-200">
              ETL jobs, warehouses and dashboards that keep decision-makers in the loop.
            </p>
          </div>
        </div>

        {/* Featured projects row */}
        <div className="space-y-4">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Featured projects
          </p>
          <div className="grid gap-4 text-sm md:grid-cols-3">
            {featuredProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => navigate(`/projects/${project.id}`)}
                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-700/70 bg-slate-900/70 text-left shadow-[0_0_40px_rgba(15,23,42,0.9)] transition hover:border-purple-400/80 hover:shadow-purple-500/40"
              >
                {project.image && (
                  <div className="h-32 w-full overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                )}
                <div className="space-y-2 p-4">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400">
                    Case study · {project.id}
                  </p>
                  <p className="text-sm font-semibold text-slate-100">{project.title}</p>
                  {project.description && project.description[0] && (
                    <p className="text-[0.75rem] text-slate-300 line-clamp-3">{project.description[0]}</p>
                  )}
                  <div className="flex flex-wrap gap-1 pt-1 text-[0.65rem] text-slate-300">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span key={tech} className="rounded-full bg-slate-700/70 px-2 py-0.5">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tech strip */}
        <div className="space-y-3 rounded-3xl border border-slate-700/70 bg-slate-900/70 p-4 text-center shadow-[0_0_40px_rgba(15,23,42,0.9)]">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Technologies</p>
          <div className="flex flex-wrap justify-center gap-2 text-[0.7rem] text-slate-200">
            {primarySkills.map((skill) => (
              <span key={skill.name} className="rounded-full bg-slate-800/80 px-3 py-1">
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        {/* Certifications & achievements */}
        <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl border border-slate-700/70 bg-slate-900/80 p-4 shadow-[0_0_40px_rgba(15,23,42,0.9)]">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Certifications</p>
            <div className="mt-3 grid gap-2 text-[0.75rem] md:grid-cols-2">
              {topCerts.map((cert) => (
                <div key={cert.name} className="rounded-2xl bg-slate-800/80 px-3 py-2 text-left text-slate-200">
                  {cert.name}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-700/70 bg-slate-900/80 p-4 shadow-[0_0_40px_rgba(15,23,42,0.9)]">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Highlights</p>
            <div className="mt-3 space-y-2 text-[0.75rem] text-left text-slate-200">
              {topAchievements.map((ach) => (
                <div key={ach.title} className="rounded-2xl bg-slate-800/80 px-3 py-2">
                  <p className="font-medium">{ach.title}</p>
                  <p className="text-[0.7rem] text-slate-300">{ach.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
