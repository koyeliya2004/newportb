import React from 'react';
import { useTheme } from '../App';

const BLINKIT_PROJECT = {
  title: 'Blinkit Sales Data Analysis Dashboard',
  previewImage: 'https://raw.githubusercontent.com/koyeliya2004/newportb/main/Screenshot%202026-04-22%20232627.png',
  detailImage: 'https://raw.githubusercontent.com/koyeliya2004/newportb/main/Screenshot%202026-04-22%20232627.png',
  overview:
    'Comprehensive business intelligence analysis of Blinkit transactional sales data to derive insights on performance, customer behavior, and operations.',
  dataset:
    '8,500+ transaction records, 13 attributes, 12 years (2011–2022), and approximately $1.20M in total sales.',
  workPerformed: [
    'Performed full dataset structure review with item- and transaction-level dimensions including category, outlet type/size, tier, sales, and ratings.',
    'Completed data cleaning and preprocessing: missing value handling, duplicate removal, categorical consistency fixes, and data type standardization.',
    'Built transformed analysis-ready model using calculated fields and pivot tables for dynamic multi-dimensional summarization.',
    'Ran exploratory and comparative analysis across categories, outlet profiles, and regions, including temporal trend tracking and growth/stabilization phases.',
    'Designed dashboard wireframe and implemented an interactive Excel dashboard with donut, bar, line, pie, stacked column, funnel-map, and matrix visuals.',
  ],
  keyInsights: [
    'Total sales reached ~$1.2M with average transaction value of $141 and average customer rating of 4.0.',
    'Fruits & Vegetables and Snack Foods were top revenue drivers; low-fat products represented about 65% of sales.',
    'Tier 3 locations contributed about 39% of revenue, while larger outlets showed stronger revenue efficiency.',
    'Supermarket Type 1 outlets significantly outperformed other outlet formats.',
  ],
  challenges: [
    'Supplier complexity across diverse vendors and product categories.',
    'Inventory management scale challenge with 8,500+ stock-keeping units.',
    'Demand forecasting affected by seasonality and product variety.',
    'High wastage risk due to perishable inventory.',
  ],
  recommendations: [
    'Centralized vendor management and real-time inventory tracking.',
    'Predictive demand forecasting with automated reorder mechanisms and ABC inventory prioritization.',
    'Tier 3-focused expansion and replication of high-performing product mix.',
    'Maintain low-fat segment strength with phased, scalable growth strategy.',
  ],
  impact:
    'Projected outcomes include up to 40% revenue growth, better inventory efficiency, lower wastage, and stronger forecasting accuracy.',
  technologies: [
    'Microsoft Excel',
    'Pivot Tables and Data Aggregation',
    'Data Cleaning and Transformation',
    'Dashboard Design and Data Visualization',
  ],
};

const DataAnalysisProjects: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [previewSrc, setPreviewSrc] = React.useState(BLINKIT_PROJECT.previewImage);
  const [detailSrc, setDetailSrc] = React.useState(BLINKIT_PROJECT.detailImage);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <section
      id="projects-data-analysis"
      className={`relative overflow-hidden py-28 md:py-36 px-6 transition-colors duration-700 ${isDark ? 'bg-[#020617]' : 'bg-[#f8fafc]'}`}
    >
      <div className="mx-auto max-w-7xl">
        <div className={`rounded-3xl border px-6 py-10 md:px-8 md:py-12 ${isDark ? 'border-white/10 bg-white/[0.03] text-slate-200' : 'border-slate-200 bg-white text-slate-700'}`}>
          <h2 className={`text-3xl md:text-5xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>Data Analysis Projects</h2>
          <p className={`mt-4 max-w-3xl text-sm md:text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Featured case study with complete overview, methods, insights, strategic recommendations, and business impact.
          </p>

          <article className={`mt-10 overflow-hidden rounded-3xl border ${isDark ? 'border-white/10 bg-slate-950/40' : 'border-slate-200 bg-slate-50/80'}`}>
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="w-full text-left"
              aria-expanded={isOpen}
              aria-controls="blinkit-project-details"
            >
            <div className="grid gap-0 lg:grid-cols-[1fr_1.1fr]">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={previewSrc}
                  alt={`${BLINKIT_PROJECT.title} preview`}
                  onError={() => setPreviewSrc('/Screenshot 2026-04-22 105721.png')}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-black/55 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                  Preview
                </div>
              </div>

              <div className="p-6 md:p-8">
                <h3 className={`text-2xl font-black leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{BLINKIT_PROJECT.title}</h3>
                <h4 className={`mt-5 text-sm font-black uppercase tracking-[0.2em] ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>Project Overview</h4>
                <p className={`mt-2 text-sm leading-7 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{BLINKIT_PROJECT.overview}</p>
                <p className={`mt-3 text-sm leading-7 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{BLINKIT_PROJECT.dataset}</p>
                <p className={`mt-5 text-xs font-black uppercase tracking-[0.18em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {isOpen ? 'Tap to hide full details' : 'Tap to open full details'}
                </p>
              </div>
            </div>
            </button>

            {isOpen && (
            <div id="blinkit-project-details" className="border-t border-white/10 p-6 md:p-8">
              <div className={`mb-8 overflow-hidden rounded-2xl border ${isDark ? 'border-white/10 bg-black/30' : 'border-slate-200 bg-white'}`}>
                <img
                  src={detailSrc}
                  alt={`${BLINKIT_PROJECT.title} dashboard full view`}
                  onError={() => setDetailSrc('/Screenshot 2026-04-22 105721.png')}
                  className="h-full max-h-[720px] w-full object-contain"
                />
              </div>

              <SectionTitle isDark={isDark} title="Work Performed" />
              <BulletList isDark={isDark} items={BLINKIT_PROJECT.workPerformed} />

              <SectionTitle isDark={isDark} title="Key Insights" />
              <BulletList isDark={isDark} items={BLINKIT_PROJECT.keyInsights} />

              <SectionTitle isDark={isDark} title="Problem Identification and Analysis" />
              <BulletList isDark={isDark} items={BLINKIT_PROJECT.challenges} />

              <SectionTitle isDark={isDark} title="Solutions and Strategic Recommendations" />
              <BulletList isDark={isDark} items={BLINKIT_PROJECT.recommendations} />

              <SectionTitle isDark={isDark} title="Business Impact" />
              <p className={`text-sm leading-7 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{BLINKIT_PROJECT.impact}</p>

              <SectionTitle isDark={isDark} title="Technologies Used" />
              <div className="flex flex-wrap gap-2.5">
                {BLINKIT_PROJECT.technologies.map((tech) => (
                  <span
                    key={tech}
                    className={`rounded-full border px-3 py-1.5 text-[11px] font-bold ${isDark ? 'border-white/15 bg-white/5 text-slate-200' : 'border-slate-300 bg-white text-slate-700'}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            )}
          </article>
        </div>
      </div>
    </section>
  );
};

const SectionTitle: React.FC<{ isDark: boolean; title: string }> = ({ isDark, title }) => (
  <h4 className={`mb-3 mt-8 text-sm font-black uppercase tracking-[0.2em] ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>{title}</h4>
);

const BulletList: React.FC<{ isDark: boolean; items: string[] }> = ({ isDark, items }) => (
  <ul className="space-y-3">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-3">
        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-400" />
        <span className={`text-sm leading-7 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{item}</span>
      </li>
    ))}
  </ul>
);

export default DataAnalysisProjects;
