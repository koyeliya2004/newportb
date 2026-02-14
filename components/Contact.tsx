
import React from 'react';
import { CV_DATA } from '../constants';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
        <div className="space-y-12">
           <h2 className="text-6xl font-black tracking-tighter">Let's <span className="font-playfair italic font-light">Connect</span></h2>
           <p className="text-gray-400 text-lg leading-relaxed max-w-md">
             Open for internships, freelance projects, and collaborations in AI, Web Dev, and Data Engineering.
           </p>

           <div className="space-y-6">
             <a href={`mailto:${CV_DATA.email}`} className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-pink-500 transition-colors">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                   </svg>
                </div>
                <div>
                   <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email Me</p>
                   <p className="text-xl font-medium">{CV_DATA.email}</p>
                </div>
             </a>
             
             <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                   </svg>
                </div>
                <div>
                   <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Location</p>
                   <p className="text-xl font-medium">{CV_DATA.location}</p>
                </div>
             </div>
           </div>

           <div className="flex gap-4">
              <a href={CV_DATA.links.github} target="_blank" className="p-4 bg-white/5 rounded-full hover:bg-white/10 transition-colors">GitHub</a>
              <a href={CV_DATA.links.linkedin} target="_blank" className="p-4 bg-white/5 rounded-full hover:bg-white/10 transition-colors">LinkedIn</a>
           </div>
        </div>

        <div className="bg-[#111] p-10 rounded-3xl border border-white/5">
           <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Full Name</label>
                    <input type="text" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-pink-500 outline-none transition-colors" placeholder="John Doe" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email Address</label>
                    <input type="email" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-pink-500 outline-none transition-colors" placeholder="john@example.com" />
                 </div>
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Message</label>
                 <textarea rows={5} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-pink-500 outline-none transition-colors" placeholder="Tell me about your project..."></textarea>
              </div>
              <button className="w-full py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-pink-500 hover:text-white transition-all">
                 Send Message
              </button>
           </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
