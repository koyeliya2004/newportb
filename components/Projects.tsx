import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { useTheme } from '../App';
import { ArrowUpRight, Sparkles } from 'lucide-react';

const cardAccentMap = [
  {
    glow: 'from-lime-400/20 via-emerald-500/10 to-transparent',
    border: 'hover:border-lime-400/40',
    chip: 'text-lime-300 border-lime-400/20 bg-lime-400/10',
    button: 'group-hover:text-lime-300',
    line: 'from-lime-400 via-emerald-400 to-cyan-400'
  },
  {
    glow: 'from-violet-400/20 via-fuchsia-500/10 to-transparent',
    border: 'hover:border-violet-400/40',
    chip: 'text-violet-300 border-violet-400/20 bg-violet-400/10',
    button: 'group-hover:text-violet-300',
    line: 'from-violet-400 via-fuchsia-400 to-pink-400'
  },
  {
    glow: 'from-cyan-400/20 via-sky-500/10 to-transparent',
    border: 'hover:border-cyan-400/40',
    chip: 'text-cyan-300 border-cyan-400/20 bg-cyan-400/10',
    button: 'group-hover:text-cyan-300',
    line: 'from-cyan-400 via-sky-400 to-blue-400'
  }
];

const ProjectCard: React.FC<{ proj: any; isDark: boolean; index: number }> = ({ proj, isDark, index }) => {
  const navigate = useNavigate();
  const accent = cardAccentMap[index % cardAccentMap.length];

  return (
    <button
      type="button"
      onClick={() => navigate(`/projects/${proj.id}`)}
      className={`group relative text-left flex h-full flex-col overflow-hidden rounded-[2rem] border transition-all duration-700 hover:-translate-y-2 ${isDark ? `bg-white/[0.03] border-white/10 ${accent.border} shadow-[0_30px_80px_rgba(0,0,0,0.45)]` : 'bg-white border-slate-200 hover:border-slate-300 shadow-[0_25px_70px_rgba(15,23,42,0.08)] hover:shadow-[0_35px_90px_rgba(15,23,42,0.16)]'}`}
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br ${accent.glow}`}></div>

      <div className="relative h-72 overflow-hidden">
        <img
          src={proj.image}
          alt={proj.title}
          className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-110"
        />
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-[#020617] via-[#020617]/60 to-transparent' : 'bg-gradient-to-t from-white/95 via-white/10 to-transparent'}`}></div>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-60"></div>

        <div className="absolute left-6 top-6 flex items-center gap-3">
          <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-black uppercase tracking-[0.28em] backdrop-blur-md ${isDark ? 'border-white/15 bg-black/30 text-white' : 'border-white/70 bg-white/70 text-slate-800'}`}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <span className="opacity-70">Major Project</span>
          </div>
        </div>

        <div className={`absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-500 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 ${isDark ? 'border-white/15 bg-black/30 text-white' : 'border-white/70 bg-white/70 text-slate-900'}`}>
          <ArrowUpRight className="h-5 w-5" />
        </div>

        <div className="absolute inset-x-6 bottom-6">
          <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] ${isDark ? accent.chip : 'text-slate-700 border-slate-300 bg-white/80'}`}>
            <Sparkles className="h-3.5 w-3.5" />
            Click to open details
          </div>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col p-8 md:p-9">
        <div className={`mb-6 h-1.5 w-20 rounded-full bg-gradient-to-r ${accent.line}`}></div>

        <h3 className={`text-2xl md:text-[1.85rem] font-black leading-tight tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
          {proj.title}
        </h3>

        {proj.subtitle && (
          <p className={`mt-3 text-sm md:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            {proj.subtitle}
          </p>
        )}

        <p className={`mt-5 text-sm md:text-[15px] leading-7 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          {proj.description[0]}
        </p>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {proj.techStack.slice(0, 6).map((tag: string) => (
            <span
              key={tag}
              className={`rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.22em] ${isDark ? 'border-white/10 bg-white/[0.04] text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-600'}`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className={`mt-8 mb-7 h-px w-full ${isDark ? 'bg-white/10' : 'bg-slate-200'}`}></div>

        <div className="space-y-3">
          {proj.description.slice(1).map((line: string, idx: number) => (
            <div key={idx} className="flex items-start gap-3">
              <span className={`mt-2 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r ${accent.line}`}></span>
              <p className={`text-sm leading-7 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{line}</p>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-8 flex items-center justify-between">
          <span className={`text-[11px] font-black uppercase tracking-[0.28em] ${isDark ? `text-white/50 ${accent.button}` : 'text-slate-500 group-hover:text-slate-900'}`}>
            View project details
          </span>
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full bg-gradient-to-r ${accent.line}`}></span>
            <span className={`h-2 w-8 rounded-full ${isDark ? 'bg-white/10' : 'bg-slate-200'}`}></span>
          </div>
        </div>
      </div>
    </button>
  );
};

const Projects: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      id="projects"
      className={`relative overflow-hidden py-28 md:py-36 px-6 transition-colors duration-700 ${isDark ? 'bg-[#020617]' : 'bg-[#f8fafc]'}`}
    >
      <style>{`
        @keyframes projectFloatAcrossA {
          0% { transform: translate3d(-12%, -8%, 0) scale(1); }
          50% { transform: translate3d(24%, 14%, 0) scale(1.12); }
          100% { transform: translate3d(56%, -6%, 0) scale(1); }
        }
        @keyframes projectFloatAcrossB {
          0% { transform: translate3d(18%, 8%, 0) scale(1); }
          50% { transform: translate3d(-28%, -14%, 0) scale(1.08); }
          100% { transform: translate3d(-62%, 12%, 0) scale(1); }
        }
      `}</style>
      <div className="pointer-events-none absolute inset-0">
        <div className={`absolute inset-0 ${isDark ? 'bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.08),transparent_30%),radial-gradient(circle_at_20%_30%,rgba(163,230,53,0.08),transparent_28%),radial-gradient(circle_at_80%_15%,rgba(168,85,247,0.10),transparent_26%),linear-gradient(180deg,#020617_0%,#040b17_55%,#020617_100%)]' : 'bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.08),transparent_28%),radial-gradient(circle_at_15%_25%,rgba(132,204,22,0.08),transparent_24%),radial-gradient(circle_at_85%_18%,rgba(168,85,247,0.08),transparent_24%),linear-gradient(180deg,#f8fafc_0%,#eef6ff_50%,#f8fafc_100%)]'}`}></div>
        <div className={`absolute inset-x-0 top-0 h-40 ${isDark ? 'bg-gradient-to-b from-white/[0.04] to-transparent' : 'bg-gradient-to-b from-white/70 to-transparent'}`}></div>
        <div className={`absolute left-0 right-0 top-24 h-px ${isDark ? 'bg-white/10' : 'bg-slate-200/80'}`}></div>
        <div className={`absolute left-1/2 top-32 h-[420px] w-[420px] -translate-x-1/2 rounded-full blur-3xl ${isDark ? 'bg-cyan-500/10' : 'bg-sky-200/60'}`}></div>
        <div
          className={`absolute left-[6%] top-[24%] h-[360px] w-[360px] rounded-full blur-3xl ${isDark ? 'bg-fuchsia-500/14' : 'bg-fuchsia-300/45'}`}
          style={{ animation: 'projectFloatAcrossA 18s ease-in-out infinite alternate' }}
        />
        <div
          className={`absolute right-[10%] bottom-[14%] h-[320px] w-[320px] rounded-full blur-3xl ${isDark ? 'bg-cyan-400/16' : 'bg-cyan-300/50'}`}
          style={{ animation: 'projectFloatAcrossB 16s ease-in-out infinite alternate' }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 md:mb-24 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className={`mb-6 inline-flex items-center gap-3 rounded-full border px-5 py-2 text-[11px] font-black uppercase tracking-[0.32em] ${isDark ? 'border-lime-400/20 bg-lime-400/10 text-lime-300' : 'border-lime-300 bg-lime-50 text-lime-700'}`}>
              <span className="h-2 w-2 rounded-full bg-current"></span>
              Featured Work
            </div>
            <h2 className={`text-4xl md:text-6xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
              My <span className={isDark ? 'text-lime-300' : 'text-lime-600'}>Projects</span>
            </h2>
            <p className={`mt-6 max-w-2xl text-lg md:text-xl leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Real-world solutions built with modern technologies to solve meaningful problems.
            </p>
          </div>

          <div className={`grid grid-cols-2 gap-4 rounded-[1.75rem] border p-5 md:p-6 ${isDark ? 'border-white/10 bg-white/[0.04]' : 'border-slate-200 bg-white/80 backdrop-blur-sm'}`}>
            <div>
              <p className={`text-[11px] font-black uppercase tracking-[0.28em] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                Major Projects
              </p>
              <p className={`mt-3 text-3xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {String(PROJECTS.length).padStart(2, '0')}
              </p>
            </div>
            <div>
              <p className={`text-[11px] font-black uppercase tracking-[0.28em] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                Detail View
              </p>
              <p className={`mt-3 text-sm leading-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Each card opens a dedicated project page with complete architecture, stack, and outcome.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-3 md:grid-cols-2">
          {PROJECTS.map((proj, index) => (
            <ProjectCard key={proj.id} proj={proj} isDark={isDark} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
