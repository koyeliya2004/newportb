
import React from 'react';
import { Project, Experience, SkillCategory, Certification } from './types';

export const CV_DATA = {
  name: "Bhumika Tewari",
  email: "bhumikatewariit@gmail.com",
  phone: "+91 8420399560",
  location: "Kolkata, India",
  links: {
    github: "https://github.com",
    linkedin: "https://linkedin.com"
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
    techStack: ["Python", "Scikit-learn", "TensorFlow", "CNN", "FastAPI"],
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
    techStack: ["Next.js", "TypeScript", "FastAPI", "Transformers", "PostgreSQL"],
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
    techStack: ["Python", "AWS Lambda", "Glue", "Redshift", "Power BI"],
    image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=1000&auto=format&fit=crop"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Languages",
    skills: [
      { name: "Python", icon: "py" }, 
      { name: "JavaScript", icon: "js" }, 
      { name: "TypeScript", icon: "ts" }, 
      { name: "C", icon: "c" }
    ]
  },
  {
    name: "Web Development",
    skills: [
      { name: "React.js", icon: "react" }, 
      { name: "Next.js", icon: "nextjs" }, 
      { name: "Node.js", icon: "nodejs" }, 
      { name: "Express.js", icon: "express" }, 
      { name: "MongoDB", icon: "mongodb" }, 
      { name: "MySQL", icon: "mysql" }, 
      { name: "Tailwind", icon: "tailwind" }, 
      { name: "HTML5", icon: "html" }
    ]
  },
  {
    name: "AI/ML & LLMs",
    skills: [
      { name: "TensorFlow", icon: "tensorflow" }, 
      { name: "PyTorch", icon: "pytorch" }, 
      { name: "Scikit-Learn", icon: "sklearn" }, 
      { name: "Pandas", icon: "pandas" }, 
      { name: "OpenCV", icon: "opencv" }, 
      { name: "HuggingFace", icon: "huggingface" }
    ]
  },
  {
    name: "Data & Cloud",
    skills: [
      { name: "AWS", icon: "aws" }, 
      { name: "Docker", icon: "docker" }, 
      { name: "Kubernetes", icon: "kubernetes" }, 
      { name: "PostgreSQL", icon: "postgres" }, 
      { name: "Redis", icon: "redis" }, 
      { name: "Firebase", icon: "firebase" }, 
      { name: "Linux", icon: "linux" }, 
      { name: "Git", icon: "git" }
    ]
  },
  {
    name: "Design & Tools",
    skills: [
      { name: "Figma", icon: "figma" }, 
      { name: "Postman", icon: "postman" }, 
      { name: "Notion", icon: "notion" }, 
      { name: "Visual Studio", icon: "vscode" }, 
      { name: "Slack", icon: "slack" }, 
      { name: "Discord", icon: "discord" }
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  { name: "AWS Certified Solutions Architect – Associate" },
  { name: "Oracle AI Foundations Associate" },
  { name: "IBM AI Product Management" },
  { name: "Google Cloud GenAI + Gemini Tooling" },
  { name: "Harvard CS50" }
];
