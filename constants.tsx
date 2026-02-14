
import { Project, Experience, SkillCategory, Certification, Achievement } from './types';

export const CV_DATA = {
  name: "Bhumika Tewari",
  email: "bhumikatewariit@gmail.com",
  phone: "+91 8420399560",
  location: "Kolkata, India",
  links: {
    github: "https://github.com/bhumikatewari",
    linkedin: "https://www.linkedin.com/in/bhumika-tewari-21294027a/",
    whatsapp: "https://wa.me/918420399560"
  },
  summary: "Innovative software engineer with hands-on experience in full-stack development, AI/ML systems, data engineering pipelines, cyber security and cloud-based solutions. Proven ability to build scalable, data-driven products using modern frameworks, machine learning models, and enterprise tools. Actively involved in development, teaching and tech — converting real business problems into functioning products. Passionate about building tech products that improve focus, efficiency, and user wellbeing."
};

export const EXPERIENCES: Experience[] = [
  {
    id: "exp1",
    role: "Cybersecurity Intern (CRS Team)",
    company: "Wipro Limited",
    duration: "Jan 2026 – Present",
    location: "Remote/Hybrid",
    bullets: [
      "Assisted the CRS team in implementing security controls aligned with ISO 27001 and NIST frameworks for enterprises.",
      "Conducted risk assessments and control mapping across 10+ domains including IAM, data protection, and incident response.",
      "Supported vulnerability analysis and security monitoring, identifying 20+ potential risks with mitigation recommendations.",
      "Prepared security documentation and compliance artifacts improving audit readiness by 30%."
    ]
  },
  {
    id: "exp2",
    role: "MERN Stack and AI Engineer (Teaching Assistant)",
    company: "Stealth Startup (Ed-Tech Platform)",
    duration: "Nov 2025 – Dec 2025",
    location: "Remote",
    bullets: [
      "Mentored 120+ learners in MERN development, simplifying full-stack architecture, debugging workflows.",
      "Resolved 250+ frontend/backend issues and delivered 20+ sessions on APIs, routing, authentication, and schemas.",
      "Developed and trained LLM-powered chat assistants to support student queries, improving explanation accuracy.",
      "Designed AI-driven learning workflows using structured prompts and contextual retrieval to improve chatbot performance."
    ]
  },
  {
    id: "exp3",
    role: "SDE Intern (Full Stack)",
    company: "Bihar Innovation Hub",
    duration: "Feb 2025 – Oct 2025",
    location: "On-site/Hybrid",
    bullets: [
      "Developed 30+ full-stack applications using React.js, Node.js, Express.js, MongoDB, MySQL.",
      "Built 45+ REST APIs improving data flow & response time across multiple feature modules.",
      "Improved query performance by 40–60% with optimized indexing and schema-level refactors.",
      "Integrated AWS/Azure microservices & external API layers enhancing platform reliability."
    ]
  }
];

export const VIRTUAL_SIMULATIONS = [
  { 
    category: "Software & Cloud", 
    companies: "AWS, Walmart, Goldman Sachs, HPE, Accenture, AIG, Verizon", 
    icon: "☁️",
    color: "#EF4444" 
  },
  { 
    category: "Data & Analytics", 
    companies: "Microsoft, PwC, Tata, Quantium, British Airways, Mastercard", 
    icon: "📊",
    color: "#10B981"
  },
  { 
    category: "Finance & Consulting", 
    companies: "JPMorgan, Fidelity, HP, KPMG US, HSBC, Bank of America, BCG", 
    icon: "💼",
    color: "#F59E0B"
  },
  { 
    category: "PM & Leadership", 
    companies: "Siemens, CBRE, GE, NY Jobs CEO Council", 
    icon: "🚀",
    color: "#3B82F6"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "proj1",
    title: "AI-Driven Precision Agriculture Decision Support System",
    description: [
      "Designed and developed an AI-powered end-to-end decision support platform for precision agriculture, integrating crop recommendation, fertilizer optimization, disease detection, pest outbreak prediction, and market price forecasting into a unified system.",
      "Built and trained machine learning models (Random Forest, XGBoost, Linear Regression) for crop selection, fertilizer dosage, and yield-linked decision support.",
      "Implemented CNN-based plant disease detection using image classification models.",
      "Developed ETL pipelines for ingesting and preprocessing multi-source data.",
      "Created an interactive farmer dashboard with visual analytics."
    ],
    techStack: ["Python", "Scikit-learn", "TensorFlow", "CNN", "Pandas", "NumPy", "Flask/FastAPI", "SQL/NoSQL", "Weather APIs", "GIS"],
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "proj2",
    title: "Next-Gen Classroom Automation System",
    description: [
      "Designed and implemented an AI-driven classroom automation platform using LLMs and ML models.",
      "Built a scalable plagiarism detection pipeline using FAISS + BM25.",
      "Developed an AI-generated text detection pipeline leveraging NLP preprocessing.",
      "Architected role-based APIs and dashboards with JWT-based authentication."
    ],
    techStack: ["Python", "FastAPI", "Transformers", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redis", "LangChain", "AWS S3", "AWS EC2"],
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "proj3",
    title: "Automated ETL Data Engineering Pipeline",
    description: [
      "Designed and implemented an end-to-end ETL pipeline to ingest, clean, and store large volumes of data using AWS services.",
      "Automated data extraction, schema validation, and normalization.",
      "Built a cloud-based data warehouse using Amazon Redshift.",
      "Developed Power BI dashboards to track KPIs and demand trends."
    ],
    techStack: ["Python", "AWS Lambda", "AWS Glue", "Athena", "Redshift", "SQL", "Parquet", "Power BI", "Data Modeling", "ETL Pipelines"],
    image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=1000&auto=format&fit=crop"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Languages",
    skills: [
      { name: "Python" }, 
      { name: "JavaScript" }, 
      { name: "TypeScript" }, 
      { name: "C Programming" }
    ]
  },
  {
    name: "Web Development",
    skills: [
      { name: "React.js" }, 
      { name: "Next.js" }, 
      { name: "Node.js" }, 
      { name: "Express.js" }, 
      { name: "MERN Stack" },
      { name: "REST APIs" },
      { name: "JWT Auth" },
      { name: "WebSockets" }
    ]
  },
  {
    name: "AI/ML & LLMs",
    skills: [
      { name: "LangChain" },
      { name: "Transformers" },
      { name: "RAG Systems" },
      { name: "TensorFlow" },
      { name: "Llama/GPT/Gemini Models" },
      { name: "Prompt Engineering" },
      { name: "Machine Learning" },
      { name: "Gen AI" },
      { name: "NLP" },
      { name: "GAN" },
      { name: "FAISS" },
      { name: "ChromaDB" }
    ]
  },
  {
    name: "Data Engineering & Analysis",
    skills: [
      { name: "ETL Pipelines" },
      { name: "SQL" },
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "MySQL" },
      { name: "Supabase" },
      { name: "Power BI" },
      { name: "DAX" },
      { name: "Tableau" },
      { name: "Apache Airflow" },
      { name: "Data Modeling" },
      { name: "Data Lakes and Warehousing" },
      { name: "Incremental Loads" },
      { name: "Vector Databases" }
    ]
  },
  {
    name: "Cloud & DevOps",
    skills: [
      { name: "AWS" },
      { name: "Docker" },
      { name: "Kubernetes (Basics)" },
      { name: "Git/GitHub" },
      { name: "CI/CD Mindset" }
    ]
  },
  {
    name: "Tools & Frameworks",
    skills: [
      { name: "Flask" },
      { name: "Redis" },
      { name: "Prisma" },
      { name: "Streamlit" },
      { name: "FastAPI" },
      { name: "Tailwind CSS" },
      { name: "Clerk/AuthJS" },
      { name: "n8n" },
      { name: "Zapier" }
    ]
  },
  {
    name: "Project Management & Collaboration",
    skills: [
      { name: "Jira" },
      { name: "Trello" },
      { name: "Agile Practices" },
      { name: "Stakeholder Communication" }
    ]
  },
  {
    name: "Soft Skills",
    skills: [
      { name: "Analytical Thinking" },
      { name: "Product Thinking" },
      { name: "Technical Mentoring" },
      { name: "Team Collaboration" },
      { name: "Detailed-Oriented" }
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  { name: "AWS Certified Solutions Architect – Associate (SAA-C03)" },
  { name: "Oracle AI Foundations Associate (OCI)" },
  { name: "IBM AI Product Management Professional Certificate" },
  { name: "Google Cloud GenAI + Responsible AI + Gemini Tooling" },
  { name: "Machine Learning Crash Course (MLCC) – Google" },
  { name: "Google Analytics Individual Qualification (GA4)" },
  { name: "Google Advanced Data Analytics Professional Certificate" },
  { name: "SQL for Data Science – University of California" },
  { name: "Google Cybersecurity Professional Certificate" },
  { name: "Harvard CS50 – Introduction to Computer Science" },
  { name: "Cybersecurity Fundamentals—LinkedIn Learning" },
  { name: "ISB Executive Education — Investing Fundamentals" }
];

export const ACHIEVEMENTS: Achievement[] = [
  { 
    title: "Second Runner-Up, Igniters Tank Competition", 
    description: "Engineered a tech-driven solution for an impact challenge." 
  },
  { 
    title: "Top 12 National Finalist, LaunchX", 
    description: "National Business Summit, Jadavpur University." 
  },
  { 
    title: "Cloud & DevOps Associate, Ignite X Club", 
    description: "Cloud, containerization & CI/CD basics." 
  },
  { 
    title: "Finalist, Innovate for Impact (Loreto College)", 
    description: "Sustainable, tech-enabled Cloud Kitchen business model." 
  },
  { 
    title: "Marketing Team Member, HackInverse", 
    description: "East India’s first theme-based hackathon." 
  },
  { 
    title: "Finalist, Market Maelstrom (ECONOVISION’25)", 
    description: "Sustainability-focused market strategy case study." 
  }
];
