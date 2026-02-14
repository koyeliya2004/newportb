
import React from 'react';
import { EXPERIENCES, VIRTUAL_SIMULATIONS } from '../constants';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Experience That Brings <span className="font-playfair italic font-light text-pink-500">Ideas to Life</span></h2>
        </div>

        <div className="relative space-y-12">
          {/* Vertical Line */}
          <div className="absolute left-[23px] top-4 bottom-4 w-px bg-gradient-to-b from-blue-500 via-pink-500 to-transparent hidden md:block"></div>

          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="relative md:pl-20 group">
              {/* Dot */}
              <div className="absolute left-0 top-1.5 w-12 h-12 bg-black border border-white/10 rounded-full flex items-center justify-center z-10 hidden md:flex group-hover:border-pink-500 transition-colors">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>

              <div className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-12">
                <div className="text-gray-500">
                  <p className="text-xs font-bold uppercase tracking-widest mb-1">{exp.duration}</p>
                  <p className="text-sm">{exp.location}</p>
                </div>

                <div className="bg-white/5 border border-white/5 p-8 rounded-2xl hover:bg-white/[0.07] transition-all hover:-translate-y-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
                    <div>
                      <h3 className="text-2xl font-bold">{exp.role}</h3>
                      <p className="text-pink-500 font-medium">{exp.company}</p>
                    </div>
                  </div>
                  <ul className="space-y-4">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className="text-gray-400 flex gap-3 text-sm leading-relaxed">
                        <span className="text-pink-500">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Roadmap for Virtual Work Simulations */}
        <div className="mt-40">
           <div className="text-center mb-20">
              <p className="text-pink-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-4">Journey of Growth</p>
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter">Virtual Work <span className="text-blue-500 italic font-playfair">Simulations</span></h3>
           </div>

           <div className="relative max-w-4xl mx-auto">
              {/* Roadmap Path */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-pink-500 to-purple-500 opacity-20 hidden md:block -translate-x-1/2 rounded-full"></div>

              <div className="space-y-24">
                 {VIRTUAL_SIMULATIONS.map((sim, idx) => (
                    <div key={idx} className={`relative flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                       {/* Center Node */}
                       <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black border-4 border-pink-500 rounded-full z-20 hidden md:flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                          <span className="text-lg">{sim.icon}</span>
                       </div>

                       {/* Content Card */}
                       <div className={`w-full md:w-5/12 p-8 bg-white/5 border border-white/10 rounded-3xl relative hover:bg-white/[0.08] transition-all group hover:border-pink-500/50 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                          <div className={`absolute top-1/2 w-8 h-px bg-pink-500 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block ${idx % 2 === 0 ? '-right-8' : '-left-8'}`}></div>
                          <h4 className="text-xl font-bold mb-2 text-white">{sim.category}</h4>
                          <p className="text-gray-400 text-sm leading-relaxed">{sim.companies}</p>
                       </div>

                       <div className="hidden md:block w-5/12"></div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
