
import { Project, Experience, SkillCategory, Certification, Achievement } from './types';

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
      "Designed and developed an AI-powered end-to-end decision support platform for precision agriculture, integrating crop recommendation, fertilizer optimization, disease detection, pest outbreak prediction, and market price forecasting into a unified system. Designed an end-to-end ML pipeline covering data ingestion, preprocessing, feature engineering, model training, and inference.",
      "Built and trained machine learning models (Random Forest, XGBoost, Linear Regression) for crop selection, fertilizer dosage, loan eligibility scoring, and yield-linked decision support using soil, weather, and historical crop datasets.",
      "Implemented CNN-based plant disease detection using image classification models (MobileNet/ResNet), enabling earlystage disease identification and reducing potential crop loss.",
      "Integrated geo-climate data to generate early warning signals for pest outbreaks and crop risks.",
      "Developed ETL pipelines for ingesting and preprocessing multi-source structured and unstructured data (soil data, weather APIs, market prices), ensuring scalable and clean data flow.",
      "Created an interactive farmer dashboard with visual analytics for crop health, weather risks, irrigation planning, and profitability insights. Built API-based model inference services using Flask/FastAPI to deliver real-time recommendations.",
      "Focused on model generalization, modular design, and scalability across crops and regions."
    ],
    techStack: ["Python", "Scikit-learn", "TensorFlow", "CNN", "Pandas", "NumPy", "Flask/FastAPI", "SQL/NoSQL", "Weather APIs", "GIS"],
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "proj2",
    title: "Next-Gen Classroom Automation System",
    description: [
      "Designed and implemented an AI-driven classroom automation platform to support academic integrity, assessment evaluation, and data-driven educator decision-making using LLMs and ML models.",
      "Built a scalable plagiarism detection pipeline using FAISS + BM25, enabling semantic and keyword-based similarity analysis across large volumes of PDF and text submissions.",
      "Developed an AI-generated text detection pipeline leveraging NLP preprocessing and transformer-based models to identify machine-generated content in student assignments.",
      "Architected role-based APIs and dashboards for teachers and students with JWT-based authentication, submission tracking, performance analytics, and automated evaluation insights.",
      "Integrated LLM-powered workflows for research paper generation, citation assistance, and exam analytics to surface curriculum trends and learning gaps.",
      "Improved system responsiveness and scalability using Redis caching, asynchronous background workers.",
      "Deployed the application with a cloud-ready architecture following secure authentication and modular service design."
    ],
    techStack: ["Python", "FastAPI", "Transformers", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redis", "LangChain", "AWS S3", "AWS EC2"],
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "proj3",
    title: "Automated ETL Data Engineering Pipeline",
    description: [
      "Designed and implemented an end-to-end ETL pipeline to ingest, clean, transform, and store large volumes of structured and semi-structured data using AWS Lambda, AWS Glue, and Python.",
      "Automated data extraction from multiple sources, performed schema validation, normalization, and data quality checks, and converted raw data into optimized Parquet format for analytics efficiency.",
      "Built a cloud-based data warehouse using Amazon Redshift, enabling fast querying and scalable analytics for business intelligence use cases. Used AWS Athena to run SQL queries on the data lake for validation and analysis.",
      "Developed Power BI dashboards to track KPIs, demand trends, revenue metrics, and operational insights with scheduled refresh and automated reporting. Focused on understanding cloud data flow, schema design, and analytics consumption.",
      "Improved query performance and storage efficiency through partitioning, indexing strategies, and optimized data modeling.",
      "Implemented event-driven workflows and logging for monitoring pipeline health and failure handling."
    ],
    techStack: ["Python", "AWS Lambda", "AWS Glue", "Athena", "Redshift", "SQL", "Parquet", "Power BI", "Data Modeling", "ETL Pipelines"],
    image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=1000&auto=format&fit=crop"
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
      { name: "Jira", icon: "windows", hasLogo: true },
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
