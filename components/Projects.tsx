
import React from 'react';
import { PROJECTS } from '../constants';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-32 bg-[#050505] px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter text-white">
              My <span className="text-lime-400 font-playfair">Projects</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-lg">
              A curated selection of my technical builds across AI, Full-stack, and Data Engineering.
            </p>
          </div>
          <div className="text-right">
             <span className="text-6xl font-light text-white/20">{PROJECTS.length} items</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {PROJECTS.map((proj) => (
            <div key={proj.id} className="group flex flex-col bg-[#111] rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={proj.image} 
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors"></div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold mb-4">{proj.title}</h3>
                <ul className="space-y-3 mb-8 flex-1">
                  {proj.description.map((line, idx) => (
                    <li key={idx} className="text-gray-400 text-sm leading-snug flex gap-2">
                       <span className="text-lime-400">✦</span>
                       {line}
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {proj.techStack.map(tag => (
                    <span key={tag} className="text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">
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
