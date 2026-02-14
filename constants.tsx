
import { Project, Experience, SkillCategory, Certification } from './types';

export const CV_DATA = {
  name: "Bhumika Tewari",
  email: "bhumikatewariit@gmail.com",
  phone: "+91 8420399560",
  location: "Kolkata, India",
  links: {
    github: "https://github.com/bhumikatewari",
    linkedin: "https://linkedin.com/in/bhumikatewari",
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
      "Prepared security documentation and compliance artifacts (policies, SOPs, risk registers), improving audit readiness by 30%."
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
    company: "Bihar Innovation",
    duration: "Feb 2025 – Oct 2025",
    location: "Patna/Kolkata",
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
    icon: "☁️"
  },
  {
    category: "Data & Analytics",
    companies: "Microsoft, PwC, Tata, Quantium, British Airways, Mastercard",
    icon: "📊"
  },
  {
    category: "Finance & Consulting",
    companies: "JPMorgan, Fidelity, HP, KPMG US, HSBC, Bank of America, BCG",
    icon: "💼"
  },
  {
    category: "PM & Leadership",
    companies: "Siemens, CBRE, GE, NY Jobs CEO Council",
    icon: "🚀"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "proj1",
    title: "AI-Driven Precision Agriculture DSS",
    description: [
      "Design an AI-powered end-to-end decision support platform for precision agriculture.",
      "Build and train machine learning models (Random Forest, XGBoost) for crop selection.",
      "Implement CNN-based plant disease detection using image classification models.",
      "Create interactive farmer dashboard with visual analytics."
    ],
    techStack: ["Python", "Sklearn", "TensorFlow", "FastAPI"],
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "proj2",
    title: "Next-Gen Classroom Automation",
    description: [
      "Designed AI-driven classroom automation platform using LLMs.",
      "Built scalable plagiarism detection pipeline using FAISS.",
      "Developed AI-generated text detection using NLP.",
      "Architected role-based APIs and JWT-based authentication."
    ],
    techStack: ["Nextjs", "TypeScript", "FastAPI", "Postgres"],
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "proj3",
    title: "Automated ETL Pipeline",
    description: [
      "Implemented end-to-end ETL pipeline using AWS Lambda and Glue.",
      "Automated data extraction from multiple sources.",
      "Built cloud data warehouse using Amazon Redshift.",
      "Developed Power BI dashboards to track KPIs."
    ],
    techStack: ["Python", "AWS", "Redshift"],
    image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=1000&auto=format&fit=crop"
  }
];

export const SKILL_CATEGORIES = [
  {
    name: "Languages",
    skills: [
      { name: "Python", icon: "py", hasLogo: true }, 
      { name: "JavaScript", icon: "js", hasLogo: true }, 
      { name: "TypeScript", icon: "ts", hasLogo: true }, 
      { name: "C Programming", icon: "c", hasLogo: true },
      { name: "SQL", icon: "mysql", hasLogo: true }
    ]
  },
  {
    name: "Web Development",
    skills: [
      { name: "React.js", icon: "react", hasLogo: true }, 
      { name: "Next.js", icon: "nextjs", hasLogo: true }, 
      { name: "Node.js", icon: "nodejs", hasLogo: true }, 
      { name: "Express.js", icon: "express", hasLogo: true }, 
      { name: "MERN Stack", hasLogo: false }, 
      { name: "REST APIs", hasLogo: false },
      { name: "JWT Auth", hasLogo: false },
      { name: "WebSockets", hasLogo: false },
      { name: "Tailwind CSS", icon: "tailwind", hasLogo: true }
    ]
  },
  {
    name: "AI/ML & LLMs",
    skills: [
      { name: "LangChain", icon: "py", hasLogo: true },
      { name: "TensorFlow", icon: "tensorflow", hasLogo: true }, 
      { name: "Llama", icon: "huggingface", hasLogo: true },
      { name: "OpenAI/GPT", icon: "huggingface", hasLogo: true },
      { name: "Gemini", icon: "huggingface", hasLogo: true },
      { name: "FAISS", icon: "postgres", hasLogo: true },
      { name: "ChromaDB", icon: "mongodb", hasLogo: true },
      { name: "Transformers", hasLogo: false },
      { name: "RAG Systems", hasLogo: false },
      { name: "Prompt Engineering", hasLogo: false },
      { name: "Machine Learning", hasLogo: false },
      { name: "Gen AI", hasLogo: false },
      { name: "NLP", hasLogo: false },
      { name: "GAN", hasLogo: false }
    ]
  },
  {
    name: "Data Engineering & Analysis",
    skills: [
      { name: "SQL", icon: "mysql", hasLogo: true },
      { name: "PostgreSQL", icon: "postgres", hasLogo: true },
      { name: "MongoDB", icon: "mongodb", hasLogo: true },
      { name: "MySQL", icon: "mysql", hasLogo: true },
      { name: "Supabase", icon: "supabase", hasLogo: true },
      { name: "Power BI", icon: "windows", hasLogo: true },
      { name: "Tableau", icon: "windows", hasLogo: true },
      { name: "Apache Airflow", icon: "py", hasLogo: true },
      { name: "ETL Pipelines", hasLogo: false },
      { name: "DAX", hasLogo: false },
      { name: "Data Modeling", hasLogo: false },
      { name: "Data Lakes", hasLogo: false },
      { name: "Data Warehousing", hasLogo: false },
      { name: "Incremental Loads", hasLogo: false },
      { name: "Vector Databases", hasLogo: false }
    ]
  },
  {
    name: "Cloud & DevOps",
    skills: [
      { name: "AWS", icon: "aws", hasLogo: true }, 
      { name: "Docker", icon: "docker", hasLogo: true }, 
      { name: "Kubernetes", icon: "kubernetes", hasLogo: true }, 
      { name: "Git", icon: "git", hasLogo: true },
      { name: "GitHub", icon: "github", hasLogo: true },
      { name: "CI/CD Mindset", hasLogo: false }
    ]
  },
  {
    name: "Tools & Frameworks",
    skills: [
      { name: "Flask", icon: "flask", hasLogo: true },
      { name: "Redis", icon: "redis", hasLogo: true },
      { name: "Prisma", icon: "prisma", hasLogo: true },
      { name: "Streamlit", icon: "py", hasLogo: true },
      { name: "FastAPI", icon: "fastapi", hasLogo: true },
      { name: "Clerk/AuthJS", icon: "clerk", hasLogo: true },
      { name: "n8n", icon: "js", hasLogo: true },
      { name: "Zapier", icon: "js", hasLogo: true }
    ]
  },
  {
    name: "Project Management",
    skills: [
      { name: "Jira", icon: "windows", hasLogo: true },
      { name: "Trello", icon: "windows", hasLogo: true },
      { name: "Agile Practices", hasLogo: false },
      { name: "Stakeholder Communication", hasLogo: false }
    ]
  },
  {
    name: "Soft Skills",
    skills: [
      { name: "Analytical Thinking", hasLogo: false },
      { name: "Product Thinking", hasLogo: false },
      { name: "Technical Mentoring", hasLogo: false },
      { name: "Team Collaboration", hasLogo: false },
      { name: "Detailed-Oriented", hasLogo: false }
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
