import React from 'react';
import { useTheme } from '../App';

const DataAnalysisProjects: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      id="projects-data-analysis"
      className={`relative overflow-hidden py-28 md:py-36 px-6 transition-colors duration-700 ${isDark ? 'bg-[#020617]' : 'bg-[#f8fafc]'}`}
    >
      <div className="mx-auto max-w-7xl">
        <div className={`rounded-3xl border px-8 py-16 text-center ${isDark ? 'border-white/10 bg-white/[0.03] text-slate-200' : 'border-slate-200 bg-white text-slate-700'}`}>
          <h2 className={`text-3xl md:text-5xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
            Data Analysis Projects
          </h2>
          <p className={`mt-4 text-base md:text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            This page is intentionally kept empty for now.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DataAnalysisProjects;
