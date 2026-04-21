import { Project, Experience, SkillCategory, Certification, Achievement } from './types';

export const APP_LOGO_URL =
  '/assets/app-logo.svg';

export const CV_DATA = {
  name: "Bhumika",
  email: "bhumika@gmail.com",
  phone: "+91 0000000000",
  location: "Kolkata, India",
  links: {
    github: "https://github.com/Bhumika2006-hue",
    linkedin: "https://www.linkedin.com/in/bhumika",
    whatsapp: "https://wa.me/910000000000"
  },
  summary:
    "Building intelligent systems across AI, data, and full-stack development — from machine learning models to production-ready applications. Passionate about creating scalable, high-performance solutions with real-world impact."
};

export const EXPERIENCES: Experience[] = [
  {
    id: "exp1",
    role: "AI/ML Developer",
    company: "Self Projects & Open Source",
    duration: "2023 – Present",
    location: "Kolkata, India",
    bullets: [
      "Built multiple ML classification models and real-world AI applications.",
      "Developed interactive apps with modern UI and full-stack integration.",
      "Created intelligent systems using machine learning, deep learning, and computer vision.",
      "Worked on scalable apps and deployable products.",
      "Focused on practical, impactful solutions for real users."
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
    subtitle: "End-to-end AI platform for precision farming intelligence",
    description: [
      "Designed and developed an AI-powered end-to-end decision support platform for precision agriculture, integrating crop recommendation, fertilizer optimization, disease detection, pest outbreak prediction, and market price forecasting into a unified system.",
      "Built and trained machine learning models for crop selection, fertilizer dosage, loan eligibility scoring, and yield-linked decision support using soil, weather, and historical crop datasets.",
      "Implemented CNN-based plant disease detection and interactive dashboards for crop health, weather risks, irrigation planning, and profitability insights."
    ],
    techStack: ["Python", "Scikit-learn", "TensorFlow", "CNN", "Pandas", "NumPy", "FastAPI", "SQL/NoSQL", "GIS"],
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1400&auto=format&fit=crop",
    fullDetails: {
      intro: "Designed and developed an AI-powered end-to-end decision support platform for precision agriculture, integrating crop recommendation, fertilizer optimization, disease detection, pest outbreak prediction, and market price forecasting into a unified system.",
      overview: "The platform was structured as an end-to-end ML ecosystem covering data ingestion, preprocessing, feature engineering, model training, and inference for smart agriculture workflows.",
      features: [
        { title: "Unified Agriculture Intelligence", description: "Integrated crop recommendation, fertilizer optimization, disease detection, pest outbreak prediction, and market price forecasting into one platform." },
        { title: "ML-Based Decision Support", description: "Built Random Forest, XGBoost, and Linear Regression models for crop selection, fertilizer dosage, loan eligibility scoring, and yield-linked recommendations." },
        { title: "CNN Disease Detection", description: "Implemented CNN-based image classification using MobileNet and ResNet for early-stage plant disease identification and crop loss reduction." },
        { title: "Geo-Climate Risk Analysis", description: "Integrated geo-climate data to generate early warning signals for pest outbreaks and crop risk monitoring." },
        { title: "Scalable ETL Pipelines", description: "Developed ETL pipelines for structured and unstructured multi-source data including soil data, weather feeds, and market signals." },
        { title: "Interactive Farmer Dashboard", description: "Created a dashboard for crop health visualization, irrigation planning, weather risks, and profitability insights with API-based real-time inference services." },
        { title: "Scalability-Focused Design", description: "Focused on model generalization, modular architecture, and scalability across crops, regions, and deployment scenarios." }
      ],
      systemArchitecture: "Data Ingestion → Preprocessing & Feature Engineering → ML/CNN Training → API Inference Layer → Farmer Dashboard & Decision Support",
      techStackDetails: [
        { category: "Languages & Core", items: ["Python", "Pandas", "NumPy"] },
        { category: "Machine Learning", items: ["Scikit-learn", "Random Forest", "XGBoost", "Linear Regression"] },
        { category: "Deep Learning", items: ["TensorFlow", "CNN", "MobileNet", "ResNet"] },
        { category: "Backend & APIs", items: ["Flask", "FastAPI"] },
        { category: "Data & Infra", items: ["SQL/NoSQL", "Weather APIs", "GIS"] }
      ],
      challenges: [
        "Combining multiple agriculture intelligence workflows into one coherent platform.",
        "Handling heterogeneous datasets from soil, weather, and market sources.",
        "Designing prediction systems that stay useful across different crops and regions."
      ],
      learnings: [
        "How to build modular ML systems for real-world agriculture use cases.",
        "The importance of strong preprocessing and feature engineering for domain-specific intelligence.",
        "How dashboards and APIs translate model outputs into actionable farmer decisions."
      ],
      outcome: "Delivered a scalable precision agriculture support system combining predictive analytics, computer vision, and decision dashboards for smarter farming operations."
    }
  },
  {
    id: "proj2",
    title: "Next-Gen Classroom Automation System",
    subtitle: "AI-powered academic integrity and educator intelligence platform",
    description: [
      "Designed and implemented an AI-driven classroom automation platform to support academic integrity, assessment evaluation, and data-driven educator decision-making using LLMs and ML models.",
      "Built a scalable plagiarism detection pipeline using FAISS + BM25 and an AI-generated text detection workflow using NLP preprocessing with transformer models.",
      "Architected secure dashboards and APIs for teachers and students with submission tracking, analytics, and automated evaluation insights."
    ],
    techStack: ["Python", "FastAPI", "Transformers", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redis", "LangChain", "AWS"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop",
    fullDetails: {
      intro: "Designed and implemented an AI-driven classroom automation platform to support academic integrity, assessment evaluation, and data-driven educator decision-making using LLMs and ML models.",
      overview: "This system combined semantic retrieval, transformer-based analysis, role-based workflows, and cloud-ready deployment patterns to modernize digital classroom operations.",
      features: [
        { title: "Plagiarism Detection Pipeline", description: "Built a scalable pipeline using FAISS + BM25 for semantic and keyword-based similarity analysis across large PDF and text submission sets." },
        { title: "AI-Generated Text Detection", description: "Developed a detection pipeline using NLP preprocessing and transformer-based models to identify machine-generated assignment content." },
        { title: "Role-Based Teacher & Student Portals", description: "Architected dashboards and APIs with JWT-based authentication, submission tracking, performance analytics, and evaluation workflows." },
        { title: "LLM-Powered Academic Workflows", description: "Integrated LLM-assisted workflows for research paper generation, citation support, and exam analytics to surface curriculum trends and learning gaps." },
        { title: "Performance & Scalability", description: "Improved responsiveness and scalability using Redis caching and asynchronous background workers." },
        { title: "Cloud-Ready Deployment", description: "Deployed the platform using a secure, modular, and scalable cloud-oriented application architecture." }
      ],
      systemArchitecture: "Student/Teacher Portal → Auth & Submission APIs → Similarity / NLP / LLM Pipelines → Analytics & Evaluation Engine → Dashboard Insights",
      techStackDetails: [
        { category: "Backend", items: ["Python", "FastAPI", "Node.js"] },
        { category: "Frontend", items: ["Next.js", "TypeScript"] },
        { category: "AI & NLP", items: ["Transformers", "LangChain", "FAISS", "BM25"] },
        { category: "Database & Cache", items: ["PostgreSQL", "Redis"] },
        { category: "Cloud", items: ["AWS S3", "AWS EC2"] }
      ],
      challenges: [
        "Balancing semantic similarity detection with scalable performance for many submissions.",
        "Designing trustworthy academic workflows around AI-assisted evaluation.",
        "Maintaining modular APIs for multiple user roles and intelligent pipelines."
      ],
      learnings: [
        "How retrieval systems like FAISS and BM25 complement each other in plagiarism analysis.",
        "How transformer pipelines can support authenticity checks in educational systems.",
        "How secure API and dashboard design improve usability for both teachers and students."
      ],
      outcome: "Built a modern classroom automation platform combining academic integrity, intelligent evaluation, and educator analytics in a scalable production-style system."
    }
  },
  {
    id: "proj3",
    title: "Automated ETL Data Engineering Pipeline",
    subtitle: "Cloud-scale ETL, warehousing, and analytics workflow",
    description: [
      "Designed and implemented an end-to-end ETL pipeline to ingest, clean, transform, and store large volumes of structured and semi-structured data using AWS Lambda, AWS Glue, and Python.",
      "Built a cloud-based data warehouse using Amazon Redshift with Athena-based validation and analytics-ready Parquet transformation workflows.",
      "Developed Power BI dashboards for KPI tracking, demand trends, revenue metrics, and operational insights with refresh-ready reporting architecture."
    ],
    techStack: ["Python", "AWS Lambda", "AWS Glue", "Athena", "Redshift", "SQL", "Parquet", "Power BI", "ETL Pipelines"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop",
    fullDetails: {
      intro: "Designed and implemented an end-to-end ETL pipeline to ingest, clean, transform, and store large volumes of structured and semi-structured data using AWS Lambda, AWS Glue, and Python.",
      overview: "The project focused on reliable cloud data flow, schema validation, analytics optimization, and reporting readiness for business intelligence scenarios.",
      features: [
        { title: "End-to-End ETL Workflow", description: "Automated ingestion, cleaning, transformation, and storage of structured and semi-structured datasets using Python and AWS services." },
        { title: "Schema Validation & Quality Checks", description: "Implemented schema validation, normalization, and data quality rules before transformation into analytics-friendly formats." },
        { title: "Optimized Parquet Transformation", description: "Converted raw data into Parquet format to improve analytics efficiency and storage performance." },
        { title: "Cloud Data Warehouse", description: "Built an Amazon Redshift warehouse for scalable querying and analytics consumption." },
        { title: "Athena Validation & Analysis", description: "Used AWS Athena to validate data lake outputs and run SQL-based analytical checks." },
        { title: "Business Intelligence Dashboards", description: "Developed Power BI dashboards for KPIs, demand trends, revenue metrics, and operational reporting with scheduled refresh support." },
        { title: "Monitoring & Reliability", description: "Implemented event-driven workflows, pipeline logging, partitioning strategies, and performance optimization for stable pipeline operations." }
      ],
      systemArchitecture: "Source Systems → AWS Lambda / AWS Glue ETL → Data Lake / Parquet Storage → Athena Validation → Redshift Warehouse → Power BI Dashboards",
      techStackDetails: [
        { category: "Languages", items: ["Python", "SQL"] },
        { category: "AWS ETL", items: ["AWS Lambda", "AWS Glue"] },
        { category: "Query & Warehouse", items: ["Athena", "Amazon Redshift"] },
        { category: "Storage", items: ["Parquet", "Data Lake"] },
        { category: "Analytics", items: ["Power BI", "Data Modeling", "ETL Pipelines"] }
      ],
      challenges: [
        "Designing consistent schemas across multiple structured and semi-structured sources.",
        "Improving query performance and storage efficiency for analytics workloads.",
        "Creating dependable monitoring and failure handling across automated ETL steps."
      ],
      learnings: [
        "How cloud ETL components work together in event-driven architectures.",
        "Why partitioning, optimized formats, and schema discipline matter for analytics performance.",
        "How to design pipelines that are not just functional but analytics-consumption ready."
      ],
      outcome: "Delivered a cloud-based ETL and analytics pipeline with strong data quality handling, warehouse integration, and business intelligence reporting support."
    }
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Languages",
    skills: [
      { name: "Python" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "C++" }
    ]
  },
  {
    name: "Web Development",
    skills: [
      { name: "React.js" },
      { name: "Next.js" },
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "Tailwind CSS" }
    ]
  },
  {
    name: "AI/ML & Data",
    skills: [
      { name: "Machine Learning" },
      { name: "Deep Learning" },
      { name: "NLP" },
      { name: "GenAI" },
      { name: "SQL" },
      { name: "Data Engineering" }
    ]
  },
  {
    name: "Tools & Platforms",
    skills: [
      { name: "Git / GitHub" },
      { name: "Docker" },
      { name: "AWS" },
      { name: "Vercel" },
      { name: "VS Code" }
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  { name: "Machine Learning" },
  { name: "Full Stack Web Development" },
  { name: "Data Engineering Fundamentals" },
  { name: "Cloud Basics" },
  { name: "AI & NLP" }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: "15+ Projects Built",
    description: "Designed and developed multiple portfolio, AI, and full-stack applications."
  },
  {
    title: "40+ APIs Developed",
    description: "Worked on backend systems, integrations, and production-style API development."
  },
  {
    title: "Always Learning",
    description: "Constantly building, exploring, and improving across AI, web, and data systems."
  }
];
