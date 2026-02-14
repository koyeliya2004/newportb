
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
      "Mentored 120+ learners in MERN development, simplifying full-stack architecture.",
      "Resolved 250+ frontend/backend issues and delivered 20+ sessions on APIs, routing, and schemas.",
      "Developed and trained LLM-powered chat assistants using structured prompts and contextual retrieval."
    ]
  }
];

export const VIRTUAL_SIMULATIONS = [
  { category: "Software & Cloud", companies: "AWS, Walmart, Goldman Sachs, HPE, Accenture", icon: "☁️" },
  { category: "Data & Analytics", companies: "Microsoft, PwC, Tata, Quantium, Mastercard", icon: "📊" },
  { category: "Finance & Consulting", companies: "JPMorgan, Fidelity, HP, KPMG US, HSBC", icon: "💼" },
  { category: "PM & Leadership", companies: "Siemens, CBRE, GE", icon: "🚀" }
];

export const PROJECTS: Project[] = [
  {
    id: "proj1",
    title: "AI-Driven Precision Agriculture DSS",
    description: ["Design an AI-powered end-to-end decision support platform.", "Build and train ML models (Random Forest, XGBoost)."],
    techStack: ["Python", "Sklearn", "TensorFlow", "FastAPI"],
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1000&auto=format&fit=crop"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Languages",
    skills: [
      { name: "Python", icon: "py", hasLogo: true }, 
      { name: "JavaScript", icon: "js", hasLogo: true }, 
      { name: "TypeScript", icon: "ts", hasLogo: true }, 
      { name: "C Programming", icon: "c", hasLogo: true }
    ]
  },
  {
    name: "Web Development",
    skills: [
      { name: "React.js", icon: "react", hasLogo: true }, 
      { name: "Next.js", icon: "nextjs", hasLogo: true }, 
      { name: "Node.js", icon: "nodejs", hasLogo: true }, 
      { name: "Express.js", icon: "express", hasLogo: true }, 
      { name: "MERN Stack", hasLogo: true }, 
      { name: "REST APIs", hasLogo: false }, 
      { name: "JWT Auth", hasLogo: false }, 
      { name: "WebSockets", hasLogo: false }
    ]
  },
  {
    name: "AI/ML & LLMs",
    skills: [
      { name: "LangChain", hasLogo: true }, 
      { name: "Transformers", hasLogo: false }, 
      { name: "RAG Systems", hasLogo: false }, 
      { name: "TensorFlow", icon: "tensorflow", hasLogo: true }, 
      { name: "Llama/GPT/Gemini Models", hasLogo: true }, 
      { name: "Prompt Engineering", hasLogo: false }, 
      { name: "Machine Learning", hasLogo: false }, 
      { name: "Gen AI", hasLogo: false }, 
      { name: "NLP", hasLogo: false }, 
      { name: "GAN", hasLogo: false }, 
      { name: "FAISS", hasLogo: false }, 
      { name: "ChromaDB", hasLogo: false }
    ]
  },
  {
    name: "Data Engineering & Analysis",
    skills: [
      { name: "ETL Pipelines", hasLogo: false }, 
      { name: "SQL", icon: "mysql", hasLogo: true }, 
      { name: "PostgreSQL", icon: "postgres", hasLogo: true }, 
      { name: "MongoDB", icon: "mongodb", hasLogo: true }, 
      { name: "MySQL", icon: "mysql", hasLogo: true }, 
      { name: "Supabase", icon: "supabase", hasLogo: true }, 
      { name: "Power BI", hasLogo: true }, 
      { name: "DAX", hasLogo: false }, 
      { name: "Tableau", hasLogo: true }, 
      { name: "Apache Airflow", hasLogo: true }, 
      { name: "Data Modeling", hasLogo: false }, 
      { name: "Data Lakes and Warehousing", hasLogo: false }, 
      { name: "Incremental Loads", hasLogo: false }, 
      { name: "Vector Databases", hasLogo: false }
    ]
  },
  {
    name: "Cloud & DevOps",
    skills: [
      { name: "AWS", icon: "aws", hasLogo: true }, 
      { name: "Docker", icon: "docker", hasLogo: true }, 
      { name: "Kubernetes (Basics)", icon: "kubernetes", hasLogo: true }, 
      { name: "Git/GitHub", icon: "github", hasLogo: true }, 
      { name: "CI/CD Mindset", hasLogo: false }
    ]
  },
  {
    name: "Tools & Frameworks",
    skills: [
      { name: "Flask", icon: "flask", hasLogo: true }, 
      { name: "Redis", icon: "redis", hasLogo: true }, 
      { name: "Prisma", icon: "prisma", hasLogo: true }, 
      { name: "Streamlit", hasLogo: true }, 
      { name: "FastAPI", icon: "fastapi", hasLogo: true }, 
      { name: "Tailwind CSS", icon: "tailwind", hasLogo: true }, 
      { name: "Clerk/AuthJS", hasLogo: true }, 
      { name: "n8n", hasLogo: true }, 
      { name: "Zapier", hasLogo: true }
    ]
  },
  {
    name: "Project Management & Collaboration",
    skills: [
      { name: "Jira", hasLogo: true }, 
      { name: "Trello", hasLogo: true }, 
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
  { name: "AWS Certified Solutions Architect – Associate" },
  { name: "Oracle AI Foundations Associate" },
  { name: "IBM AI Product Management" },
  { name: "Google Cloud GenAI + Gemini Tooling" }
];
