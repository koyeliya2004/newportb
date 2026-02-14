
import React from 'react';
import { CV_DATA } from '../constants';
import { useTheme } from '../App';

const Contact: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden min-h-screen flex items-center justify-center">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 ${isDark ? 'bg-pink-500/10' : 'bg-pink-500/5'}`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 ${isDark ? 'bg-blue-500/10' : 'bg-blue-500/5'}`}></div>
        
        {/* Technical Grid Overlay */}
        <div className={`absolute inset-0 opacity-[0.03] ${isDark ? 'invert' : ''}`}
          style={{ 
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="text-center mb-24">
           <div className="inline-block mb-6 px-4 py-1 rounded-full border border-pink-500/20 bg-pink-500/5 backdrop-blur-md">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-pink-500">Secure Channel</span>
           </div>
           <h2 className={`text-6xl md:text-9xl font-black tracking-tighter mb-6 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
             Let's <span className="font-playfair italic font-light text-pink-500 drop-shadow-[0_0_30px_rgba(236,72,153,0.3)]">Connect</span>
           </h2>
           <p className={`text-xl leading-relaxed max-w-2xl mx-auto font-light transition-colors ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
             Open for internships, freelance projects, and collaborations in AI, Web Dev, and Data Engineering.
           </p>
        </div>

        <div className="max-w-5xl mx-auto">
           {/* Professional Auditor-Style Card */}
           <div className={`relative border p-8 md:p-16 rounded-[3rem] overflow-hidden group transition-all duration-700 ${isDark ? 'bg-black/60 border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.9)]' : 'bg-white border-black/5 shadow-2xl'}`}>
              
              {/* Card Corner Accents */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-pink-500/30 rounded-tl-[3rem]"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-blue-500/30 rounded-br-[3rem]"></div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10 items-start">
                 
                 {/* Email Section */}
                 <div className="flex flex-col items-center md:items-start text-center md:text-left group/item">
                    <div className="flex items-center gap-3 mb-4">
                       <span className="text-[9px] font-mono text-pink-500 font-bold tracking-widest opacity-60">REF_01</span>
                       <p className={`text-[10px] font-black uppercase tracking-[0.4em] transition-colors ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Email</p>
                    </div>
                    <a href={`mailto:${CV_DATA.email}`} className={`text-lg md:text-xl font-bold hover:text-pink-500 transition-all break-all ${isDark ? 'text-white' : 'text-slate-900'}`}>
                       {CV_DATA.email}
                    </a>
                 </div>

                 {/* Phone Section */}
                 <div className="flex flex-col items-center md:items-start text-center md:text-left group/item">
                    <div className="flex items-center gap-3 mb-4">
                       <span className="text-[9px] font-mono text-blue-500 font-bold tracking-widest opacity-60">REF_02</span>
                       <p className={`text-[10px] font-black uppercase tracking-[0.4em] transition-colors ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Phone</p>
                    </div>
                    <p className={`text-lg md:text-xl font-bold transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
                       {CV_DATA.phone}
                    </p>
                 </div>

                 {/* Location Section */}
                 <div className="flex flex-col items-center md:items-start text-center md:text-left group/item">
                    <div className="flex items-center gap-3 mb-4">
                       <span className="text-[9px] font-mono text-purple-500 font-bold tracking-widest opacity-60">REF_03</span>
                       <p className={`text-[10px] font-black uppercase tracking-[0.4em] transition-colors ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Location</p>
                    </div>
                    <p className={`text-lg md:text-xl font-bold transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
                       {CV_DATA.location}
                    </p>
                 </div>
              </div>

              <div className="mt-24 flex flex-col items-center gap-12 relative z-10">
                 {/* Premium WhatsApp Button */}
                 <a 
                   href={CV_DATA.links.whatsapp} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className={`group relative inline-flex items-center gap-6 px-16 py-8 rounded-full font-black uppercase tracking-[0.3em] text-xs transition-all duration-500 hover:-translate-y-2 overflow-hidden ${
                     isDark 
                     ? 'bg-white text-black shadow-[0_20px_50px_rgba(255,255,255,0.1)]' 
                     : 'bg-slate-900 text-white shadow-[0_20px_50px_rgba(0,0,0,0.2)]'
                   }`}
                 >
                    {/* Animated sweep effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500/20 to-transparent -translate-x-full group-hover:animate-sweep"></div>
                    
                    <div className="relative z-10 flex items-center gap-4">
                      <svg className="w-6 h-6 animate-pulse-slow" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.558 0 11.895-5.335 11.898-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      <span>WhatsApp Me</span>
                    </div>
                    
                    {/* Background glow on hover */}
                    <div className="absolute inset-0 bg-pink-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                 </a>

                 <div className="flex gap-12 items-center">
                    <div className="h-px w-8 bg-current opacity-20"></div>
                    <div className="flex gap-12">
                       <a href={CV_DATA.links.github} target="_blank" rel="noopener noreferrer" className={`transition-all font-black uppercase tracking-[0.3em] text-[10px] hover:text-pink-500 hover:tracking-[0.4em] ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>GitHub</a>
                       <a href={CV_DATA.links.linkedin} target="_blank" rel="noopener noreferrer" className={`transition-all font-black uppercase tracking-[0.3em] text-[10px] hover:text-pink-500 hover:tracking-[0.4em] ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>LinkedIn</a>
                    </div>
                    <div className="h-px w-8 bg-current opacity-20"></div>
                 </div>
              </div>
           </div>
           
           {/* Auditor Metadata Decals */}
           <div className="mt-12 flex justify-between items-center px-8 opacity-30">
              <div className="text-[8px] font-mono tracking-widest uppercase">Secured_Line_v2.0</div>
              <div className="flex gap-4">
                 <div className="w-1 h-1 rounded-full bg-pink-500"></div>
                 <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                 <div className="w-1 h-1 rounded-full bg-purple-500"></div>
              </div>
              <div className="text-[8px] font-mono tracking-widest uppercase">Verified_Identity_Hash_842</div>
           </div>
        </div>
      </div>

      <style>{`
        @keyframes sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-sweep {
          animation: sweep 2.5s ease-in-out infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Contact;
