import { Project, Experience, SkillCategory, Certification, Achievement } from './types';

export const APP_LOGO_URL =
  'https://github.com/user-attachments/assets/a759aca4-d673-4e52-b551-3b5414a9daa8';

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
    title: "AI-Powered Portfolio Experience",
    description: [
      "An interactive personal portfolio with bold UI, animations, and modern branding.",
      "Focused on presenting skills, projects, and expertise in a production-ready way.",
      "Built with smooth motion, strong visual hierarchy, and responsive design."
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer-style UI", "Responsive Design"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
    fullDetails: {
      intro: "A visually rich portfolio crafted to showcase technical and creative work.",
      overview: "Built as a modern digital identity with immersive UI, smooth transitions, and a bold black-gold visual style.",
      features: [
        { title: "Interactive Hero", description: "Dynamic hero section with particles, motion, and animated highlights." },
        { title: "Showcase Sections", description: "Dedicated sections for expertise, stats, projects, and skills." },
        { title: "Responsive Experience", description: "Optimized layouts and interactions for desktop and mobile." }
      ],
      techStackDetails: [
        { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS"] },
        { category: "Design", items: ["Animations", "Responsive Layouts", "Interactive UI"] }
      ],
      challenges: ["Balancing visual richness with readability.", "Keeping animations smooth across devices."],
      learnings: ["Motion improves storytelling when used with restraint.", "Strong branding makes portfolios far more memorable."],
      outcome: "A striking and premium portfolio website with an engaging user experience."
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
