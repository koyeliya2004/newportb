
import React from 'react';
import { CERTIFICATIONS } from '../constants';

const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-32 bg-[#050505] px-6">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Verified <span className="text-blue-500">Excellence</span></h2>
        <p className="text-gray-500 mt-4">Professional certifications from industry leaders.</p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CERTIFICATIONS.map((cert, idx) => (
          <div key={idx} className="p-6 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4 hover:border-blue-500/50 transition-colors">
            <div className="w-12 h-12 bg-blue-500/10 flex items-center justify-center rounded-full shrink-0">
               <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04m17.236 0a11.952 11.952 0 00-6.831 12.407l.005.058a.996.996 0 001.978 0l.005-.058a11.952 11.952 0 00-6.831-12.407"></path>
               </svg>
            </div>
            <p className="text-sm font-bold leading-tight">{cert.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
