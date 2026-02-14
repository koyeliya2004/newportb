
import React from 'react';
import { EXPERIENCES } from '../constants';

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
      </div>
    </section>
  );
};

export default Experience;
