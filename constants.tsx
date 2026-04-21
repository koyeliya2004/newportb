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
  summary:
    "Innovative software engineer with hands-on experience in full-stack development, AI/ML systems, data engineering pipelines, cyber security and cloud-based solutions. Proven ability to build scalable, data-driven products using modern frameworks, machine learning models, and enterprise tools. Actively involved in development, teaching and tech — converting real business problems into functioning products. Passionate about building tech products that improve focus, efficiency, and user wellbeing."
};

// Work Experience (portfolio-view) — Wipro CRS details intentionally omitted as requested
export const EXPERIENCES: Experience[] = [
  {
    id: "exp2",
    role: "MERN Stack and AI Engineer (Teaching Assistant)",
    company: "Stealth Startup (Ed-Tech Platform)",
    duration: "Nov 2025 – Dec 2025",
    location: "Remote",
    bullets: [
      "Mentored 120+ learners in MERN development, simplifying full-stack architecture and debugging workflows.",
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
      "Developed 30+ full-stack applications using React.js, Node.js, Express.js, MongoDB, and MySQL.",
      "Built 45+ REST APIs improving data flow and response time across multiple feature modules.",
      "Improved query performance by 40–60% with optimized indexing and schema-level refactors.",
      "Integrated AWS/Azure microservices and external API layers enhancing platform reliability."
    ]
  }
];

// Virtual work simulations
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

// Major projects
export const PROJECTS: Project[] = [
  {
    id: "proj1",
    title: "AI-Driven Precision Agriculture Decision Support System",
    description: [
      "Designed and developed an AI-powered end-to-end decision support platform for precision agriculture, integrating crop recommendation, fertilizer optimization, disease detection, pest outbreak prediction, and market price forecasting into a unified system.",
      "Built and trained machine learning models (Random Forest, XGBoost, Linear Regression) for crop selection, fertilizer dosage, loan eligibility scoring, and yield-linked decision support using soil, weather, and historical crop datasets.",
      "Implemented CNN-based plant disease detection using image classification models, enabling early-stage disease identification and reducing potential crop loss.",
      "Developed ETL pipelines for ingesting and preprocessing multi-source structured and unstructured data (soil data, weather APIs, market prices), ensuring scalable and clean data flow.",
      "Created an interactive farmer dashboard with visual analytics for crop health, weather risks, irrigation planning, and profitability insights, exposing model inference via Flask/FastAPI services."
    ],
    techStack: [
      "Python",
      "Scikit-learn",
      "TensorFlow",
      "CNN",
      "Pandas",
      "NumPy",
      "Flask/FastAPI",
      "SQL/NoSQL",
      "Weather APIs",
      "GIS"
    ],
    image:
      "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1000&auto=format&fit=crop",
    fullDetails: {
      intro:
        "An AI-powered precision agriculture platform that unifies recommendation, risk prediction, and analytics to guide farmers on crops, fertilizers, disease risk, and profitability.",
      overview:
        "The system ingests soil, weather, satellite, and market data to power ML models for crop selection, fertilizer optimization, disease detection, and early warning alerts. Farmers interact through a dashboard that surfaces recommendations and visual insights.",
      features: [
        {
          title: "Crop & Fertilizer Recommendation",
          description:
            "Recommends optimal crops and fertilizer dosage per plot using ensemble ML models trained on soil, climate, and historical yield data."
        },
        {
          title: "Disease & Pest Risk",
          description:
            "CNN-based plant disease detection combined with geo-climate risk scoring to flag potential outbreaks early."
        },
        {
          title: "Market & Profitability Insights",
          description:
            "Forecasts prices and profit scenarios so farmers can plan sowing, harvesting, and selling windows."
        }
      ],
      techStackDetails: [
        { category: "Models", items: ["Random Forest", "XGBoost", "Linear Regression", "CNN"] },
        { category: "Backend", items: ["FastAPI", "Flask", "Python"] },
        { category: "Data", items: ["Pandas", "NumPy", "SQL/NoSQL", "Weather APIs"] }
      ],
      challenges: [
        "Standardising heterogeneous agricultural data from soil labs, weather APIs, and farmer inputs.",
        "Keeping models generalisable across crops, regions, and changing climate patterns."
      ],
      learnings: [
        "Data preprocessing and feature engineering dominate real-world ML work.",
        "Domain understanding is critical when building decision-support systems for non-technical users."
      ],
      outcome:
        "Delivered a modular, scalable decision support stack that can extend to new crops and regions with minimal retraining."
    }
  },
  {
    id: "proj2",
    title: "Next-Gen Classroom Automation System",
    description: [
      "Designed and implemented an AI-driven classroom automation platform to support academic integrity, assessment evaluation, and data-driven educator decision-making using LLMs and ML models.",
      "Built a scalable plagiarism detection pipeline using FAISS + BM25, enabling semantic and keyword-based similarity analysis across large volumes of PDF and text submissions.",
      "Developed an AI-generated text detection pipeline leveraging NLP preprocessing and transformer-based models to identify machine-generated content in student assignments.",
      "Architected role-based APIs and dashboards for teachers and students with JWT-based authentication, submission tracking, performance analytics, and automated evaluation insights.",
      "Integrated LLM-powered workflows for research assistance, citation support, and exam analytics to surface curriculum trends and learning gaps."
    ],
    techStack: [
      "Python",
      "FastAPI",
      "Transformers",
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "LangChain",
      "AWS S3",
      "AWS EC2"
    ],
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop",
    fullDetails: {
      intro:
        "An AI-first classroom automation platform that automates plagiarism checks, grading workflows, and insight generation for educators.",
      overview:
        "The system combines vector search, transformer models, and LLM workflows to analyse student submissions, detect AI-generated content, and surface rich analytics through dashboards.",
      features: [
        {
          title: "Plagiarism & Similarity Search",
          description:
            "FAISS + BM25 pipeline for high-speed semantic and lexical similarity across large student submission corpora."
        },
        {
          title: "AI Text Detection",
          description:
            "Transformer-based classifier to detect machine-generated content, supporting academic integrity policies."
        },
        {
          title: "Teacher & Student Dashboards",
          description:
            "Role-based dashboards with JWT authentication, submission tracking, and performance analytics."
        }
      ],
      techStackDetails: [
        { category: "Frontend", items: ["Next.js", "TypeScript"] },
        { category: "Backend", items: ["FastAPI", "Node.js", "PostgreSQL", "Redis"] },
        { category: "AI", items: ["LangChain", "Transformers", "Vector Search (FAISS)"] }
      ],
      challenges: [
        "Scaling similarity search and embeddings storage for large batches of PDF submissions.",
        "Balancing detection accuracy with latency to keep teacher workflows responsive."
      ],
      learnings: [
        "Vector databases and retrieval quality are as important as the downstream LLM.",
        "Clear role-based access and observability are essential in edu-tech platforms."
      ],
      outcome:
        "Reduced manual grading and plagiarism review effort, while giving educators deeper visibility into learning patterns."
    }
  },
  {
    id: "proj3",
    title: "Automated ETL Data Engineering Pipeline",
    description: [
      "Designed and implemented an end-to-end ETL pipeline to ingest, clean, transform, and store large volumes of structured and semi-structured data using AWS Lambda, AWS Glue, and Python.",
      "Automated data extraction from multiple sources, performed schema validation, normalization, and data quality checks, and converted raw data into optimized Parquet format for analytics efficiency.",
      "Built a cloud-based data warehouse using Amazon Redshift, enabling fast querying and scalable analytics for business intelligence use cases.",
      "Developed Power BI dashboards to track KPIs, demand trends, revenue metrics, and operational insights with scheduled refresh and automated reporting."
    ],
    techStack: [
      "Python",
      "AWS Lambda",
      "AWS Glue",
      "Athena",
      "Redshift",
      "SQL",
      "Parquet",
      "Power BI",
      "Data Modeling",
      "ETL Pipelines"
    ],
    image:
      "https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=1000&auto=format&fit=crop",
    fullDetails: {
      intro:
        "An AWS-native ETL and analytics stack that moves raw multi-source data into a modeled warehouse for BI and reporting.",
      overview:
        "The pipeline uses serverless components and scheduled jobs to pull data into a lake, clean and transform it, and serve analytics queries from Redshift and Athena-backed datasets.",
      features: [
        {
          title: "Serverless Ingestion",
          description:
            "Event-driven extraction from multiple sources using AWS Lambda and Glue jobs for scalable processing."
        },
        {
          title: "Quality & Governance",
          description:
            "Schema validation, normalization, and data quality checks before data lands in analytical tables."
        },
        {
          title: "BI Dashboards",
          description:
            "Power BI reports for KPIs, demand trends, and revenue metrics with automated refresh."
        }
      ],
      techStackDetails: [
        { category: "Cloud", items: ["AWS Glue", "AWS Lambda", "Athena", "Redshift"] },
        { category: "Data", items: ["SQL", "Parquet", "Data Modeling"] }
      ],
      challenges: [
        "Handling schema drift and inconsistent source data.",
        "Tuning Redshift and partitioning strategies for predictable performance at scale."
      ],
      learnings: [
        "Serverless ETL significantly reduces maintenance overhead for small data teams.",
        "Good dimensional modeling unlocks simpler BI and self-serve analytics."
      ],
      outcome:
        "Delivered a reliable data foundation that supports downstream analytics, dashboards, and experimentation."
    }
  },
  {
    id: "chest_disease",
    title: "Chest Disease AI Assistant",
    subtitle: "AI-Powered Chest X-Ray Analysis System",
    description: [
      "AI-powered medical imaging analysis application for detecting thoracic conditions from chest X-rays.",
      "Uses a convolutional neural network (CNN) for multi-label classification of common chest conditions.",
      "Integrates an LLM layer for structured educational explanations of diagnostic results."
    ],
    techStack: ["Next.js", "FastAPI", "PyTorch", "Python", "Docker", "Groq API", "Tailwind CSS"],
    image:
      "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=1000&auto=format&fit=crop",
    fullDetails: {
      intro:
        "Chest Disease AI Assistant is a medical imaging system that analyses chest X-ray images and returns probability scores for multiple thoracic conditions.",
      overview:
        "The application separates the Next.js frontend, FastAPI backend, and PyTorch inference engine, enabling deterministic inference, secure uploads, and LLM-powered explanation of predictions.",
      features: [
        {
          title: "Multi-Label Disease Classification",
          description:
            "CNN-based classifier predicts the likelihood of multiple chest conditions for a single X-ray image."
        },
        {
          title: "Real-Time Inference",
          description:
            "Optimised PyTorch models running in evaluation mode provide fast, reproducible outputs for uploads."
        },
        {
          title: "LLM Explanations",
          description:
            "An LLM layer explains predictions in simple language for educational and assistive use cases (not a replacement for clinicians)."
        }
      ],
      techStackDetails: [
        { category: "Frontend", items: ["Next.js", "TypeScript", "Tailwind CSS"] },
        { category: "Backend", items: ["FastAPI", "Python", "PyTorch"] },
        { category: "AI", items: ["CNN on CheXpert-style dataset", "Groq-hosted LLM"] }
      ],
      systemArchitecture:
        "User uploads X-ray → Next.js UI → FastAPI API → PyTorch CNN model → Probability scores → LLM explanation layer → Interpretable report",
      modelDetails: [
        "Cardiomegaly",
        "Pneumonia",
        "Pleural Effusion",
        "Lung Opacity",
        "Atelectasis",
        "Pneumothorax",
        "Edema",
        "Fracture",
        "Support Devices"
      ],
      challenges: [
        "Designing a deterministic inference pipeline suitable for medical-style applications.",
        "Balancing performance with GPU/CPU resource constraints in deployment environments."
      ],
      learnings: [
        "Strict evaluation-mode pipelines and logging are essential in sensitive AI domains.",
        "Clear disclaimers and UX cues are needed when AI systems operate in health contexts."
      ],
      outcome:
        "Built an end-to-end prototype that demonstrates how deep learning and language models can work together for medical imaging assistance."
    }
  }
];

// Skill matrix for About section
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
    name: "Web & App Engineering",
    skills: [
      { name: "React.js" },
      { name: "Next.js" },
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "MERN Stack" },
      { name: "REST APIs" },
      { name: "JWT Auth" },
      { name: "WebSockets" },
      { name: "Tailwind CSS" }
    ]
  },
  {
    name: "AI/ML & LLM Systems",
    skills: [
      { name: "Machine Learning" },
      { name: "Gen AI" },
      { name: "NLP" },
      { name: "GAN" },
      { name: "LangChain" },
      { name: "Transformers" },
      { name: "RAG Systems" },
      { name: "TensorFlow" },
      { name: "Llama / GPT / Gemini" },
      { name: "Prompt Engineering" },
      { name: "FAISS" },
      { name: "ChromaDB" }
    ]
  },
  {
    name: "Data Engineering & Analytics",
    skills: [
      { name: "ETL Pipelines" },
      { name: "SQL / PostgreSQL / MySQL / MongoDB" },
      { name: "Supabase" },
      { name: "Data Modeling" },
      { name: "Data Lakes & Warehousing" },
      { name: "Incremental Loads" },
      { name: "Vector Databases" },
      { name: "Apache Airflow" },
      { name: "Power BI / DAX" },
      { name: "Tableau" }
    ]
  },
  {
    name: "Cloud & DevOps",
    skills: [
      { name: "AWS" },
      { name: "Docker" },
      { name: "Kubernetes (Basics)" },
      { name: "Git / GitHub" }
    ]
  },
  {
    name: "Frameworks & Tools",
    skills: [
      { name: "Flask" },
      { name: "FastAPI" },
      { name: "Redis" },
      { name: "Prisma" },
      { name: "Streamlit" },
      { name: "Clerk / Auth.js" },
      { name: "n8n" },
      { name: "Zapier" },
      { name: "Jira" },
      { name: "Trello" }
    ]
  },
  {
    name: "Soft Skills",
    skills: [
      { name: "Analytical Thinking" },
      { name: "Product Thinking" },
      { name: "Technical Mentoring" },
      { name: "Team Collaboration" },
      { name: "Detail-Oriented" }
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
  { name: "Cybersecurity Fundamentals — LinkedIn Learning" },
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
    description: "Cloud, containerization and CI/CD basics."
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
