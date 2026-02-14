
import React from 'react';
import { PROJECTS } from '../constants';
import { useTheme } from '../App';

const Projects: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="projects" className={`py-32 px-6 transition-colors duration-500 ${isDark ? 'bg-[#050505]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className={`text-5xl md:text-8xl font-black italic tracking-tighter transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
              My <span className="text-lime-500 font-playfair">Projects</span>
            </h2>
            <p className={`mt-4 max-w-lg transition-colors ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>
              A curated selection of my technical builds across AI, Full-stack, and Data Engineering.
            </p>
          </div>
          <div className="text-right">
             <span className={`text-6xl font-light transition-colors ${isDark ? 'text-white/20' : 'text-slate-200'}`}>{PROJECTS.length} items</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {PROJECTS.map((proj) => (
            <div key={proj.id} className={`group flex flex-col rounded-3xl overflow-hidden border transition-all ${isDark ? 'bg-[#111] border-white/5 hover:border-white/20' : 'bg-white border-black/5 hover:shadow-2xl shadow-md'}`}>
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={proj.image} 
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 transition-colors ${isDark ? 'bg-black/40 group-hover:bg-black/10' : 'bg-black/10 group-hover:bg-transparent'}`}></div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <h3 className={`text-2xl font-bold mb-4 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>{proj.title}</h3>
                <ul className="space-y-3 mb-8 flex-1">
                  {proj.description.map((line, idx) => (
                    <li key={idx} className={`text-sm leading-snug flex gap-2 transition-colors ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                       <span className="text-lime-500">✦</span>
                       {line}
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {proj.techStack.map(tag => (
                    <span key={tag} className={`text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded-md border transition-all ${isDark ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-slate-100 border-black/5 text-slate-600'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
