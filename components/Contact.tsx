
import React from 'react';
import { CV_DATA } from '../constants';
import { useTheme } from '../App';

const Contact: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
           <h2 className={`text-6xl md:text-8xl font-black tracking-tighter mb-6 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>Let's <span className="font-playfair italic font-light text-pink-500">Connect</span></h2>
           <p className={`text-xl leading-relaxed max-w-2xl mx-auto transition-colors ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
             Open for internships, freelance projects, and collaborations in AI, Web Dev, and Data Engineering.
           </p>
        </div>

        <div className="grid lg:grid-cols-1 gap-12 max-w-4xl mx-auto">
           {/* Professional Info Display */}
           <div className={`border p-12 rounded-[2.5rem] relative overflow-hidden group transition-all duration-500 ${isDark ? 'bg-[#0a0a0a] border-white/5 shadow-2xl' : 'bg-white border-black/5 shadow-2xl'}`}>
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-pink-500/10 blur-[100px] rounded-full group-hover:bg-pink-500/20 transition-all duration-700"></div>
              
              <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-12 relative z-10">
                 <div className="text-center">
                    <p className={`text-[10px] font-black uppercase tracking-[0.4em] mb-2 transition-colors ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Email</p>
                    <a href={`mailto:${CV_DATA.email}`} className={`text-xl md:text-2xl font-medium hover:text-pink-500 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>{CV_DATA.email}</a>
                 </div>

                 <div className={`h-12 w-px hidden md:block transition-colors ${isDark ? 'bg-white/10' : 'bg-black/10'}`}></div>

                 <div className="text-center">
                    <p className={`text-[10px] font-black uppercase tracking-[0.4em] mb-2 transition-colors ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Phone</p>
                    <p className={`text-xl md:text-2xl font-medium transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>{CV_DATA.phone}</p>
                 </div>

                 <div className={`h-12 w-px hidden md:block transition-colors ${isDark ? 'bg-white/10' : 'bg-black/10'}`}></div>

                 <div className="text-center">
                    <p className={`text-[10px] font-black uppercase tracking-[0.4em] mb-2 transition-colors ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Location</p>
                    <p className={`text-xl md:text-2xl font-medium transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>{CV_DATA.location}</p>
                 </div>
              </div>

              <div className="mt-20 flex flex-col items-center gap-12">
                 <a 
                   href={CV_DATA.links.whatsapp} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className={`group relative inline-flex items-center gap-4 px-12 py-6 rounded-full font-black uppercase tracking-[0.2em] text-sm hover:bg-pink-500 hover:text-white transition-all duration-500 shadow-xl hover:-translate-y-2 ${isDark ? 'bg-white text-black' : 'bg-slate-900 text-white'}`}
                 >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.558 0 11.895-5.335 11.898-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    WhatsApp Me
                 </a>

                 <div className="flex gap-12 mt-4">
                    <a href={CV_DATA.links.github} target="_blank" rel="noopener noreferrer" className={`transition-colors font-bold uppercase tracking-[0.2em] text-xs ${isDark ? 'text-gray-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>GitHub</a>
                    <a href={CV_DATA.links.linkedin} target="_blank" rel="noopener noreferrer" className={`transition-colors font-bold uppercase tracking-[0.2em] text-xs ${isDark ? 'text-gray-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>LinkedIn</a>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
