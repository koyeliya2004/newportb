import { Project, Experience, SkillCategory, Certification, Achievement } from './types';

export const CV_DATA = {
  name: "Koyeliya Ghosh",
  email: "koyeliya@gmail.com",
  phone: "+91 0000000000",
  location: "Kolkata, India",
  links: {
    github: "https://github.com/Bhumika2006-hue",
    linkedin: "https://www.linkedin.com/in/koyeliya-ghosh",
    whatsapp: "https://wa.me/910000000000"
  },
  summary:
    "Computer Science student at MAKAUT with a passion for building intelligent systems across AI, data, and full-stack development. Experienced in machine learning, deep learning, and production-ready web applications. Passionate about creating scalable, high-performance solutions with real-world impact."
};

// Work Experience
export const EXPERIENCES: Experience[] = [
  {
    id: "exp1",
    role: "AI/ML Developer",
    company: "Self Projects & Open Source",
    duration: "2023 – Present",
    location: "Kolkata, India",
    bullets: [
      "Built multiple ML classification models including Diabetes, Pneumonia, COVID-19, Hepatitis C, Arthritis, and Asthma prediction.",
      "Developed AirDraw Studio — an interactive gesture/hand tracking app with real-time collaboration features.",
      "Created emotion detection system from facial expressions using deep learning.",
      "Trained deepfake voice detector model and food classification model.",
      "Built house price prediction application with full frontend/backend integration."
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
    title: "AirDraw Studio",
    description: [
      "Interactive gesture and hand tracking application with real-time collaboration features.",
      "Built using computer vision and deep learning to detect hand gestures and translate them into drawing actions.",
      "Features real-time multi-user collaboration and a modern UI."
    ],
    techStack: ["Python", "OpenCV", "MediaPipe", "TensorFlow", "React", "WebSockets"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1000&auto=format&fit=crop",
    fullDetails: {
      intro: "AirDraw Studio is an interactive drawing application powered by hand gesture recognition.",
      overview: "Uses computer vision to track hand movements and convert gestures into creative drawing inputs, with real-time collaboration support.",
      features: [
        { title: "Hand Gesture Recognition", description: "MediaPipe-powered real-time hand tracking that maps gestures to drawing actions." },
        { title: "Real-Time Collaboration", description: "WebSocket-based multi-user drawing sessions with live sync." },
        { title: "Modern UI", description: "Clean React frontend with intuitive controls and responsive design." }
      ],
      techStackDetails: [
        { category: "Computer Vision", items: ["OpenCV", "MediaPipe"] },
        { category: "AI/ML", items: ["TensorFlow", "Python"] },
        { category: "Frontend", items: ["React", "WebSockets"] }
      ],
      challenges: ["Achieving low-latency gesture detection for smooth drawing experience.", "Syncing real-time drawing state across multiple users."],
      learnings: ["Real-time computer vision requires careful optimization for smooth UX.", "WebSocket architecture for collaborative tools needs robust state management."],
      outcome: "A fully functional interactive drawing studio powered by hand gestures with real-time collaboration."
    }
  },
  {
    id: "proj2",
    title: "Medical Disease Prediction Suite",
    description: [
      "Suite of ML classification models for predicting Diabetes, Pneumonia, COVID-19, Hepatitis C, Arthritis, and Asthma.",
      "Built and trained models using Scikit-learn, XGBoost, and deep learning frameworks.",
      "Integrated with a full-stack web interface for real-world usability."
    ],
    techStack: ["Python", "Scikit-learn", "XGBoost", "TensorFlow", "Flask", "React"],
    image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=1000&auto=format&fit=crop",
    fullDetails: {
      intro: "A comprehensive medical prediction platform covering six major disease categories.",
      overview: "Each model is trained on curated medical datasets and exposed via a Flask API, with a React frontend for easy input and result visualization.",
      features: [
        { title: "Multi-Disease Coverage", description: "Six separate models for Diabetes, Pneumonia, COVID-19, Hepatitis C, Arthritis, and Asthma." },
        { title: "ML Pipeline", description: "End-to-end pipeline from data preprocessing to model inference." },
        { title: "Web Interface", description: "React frontend for submitting inputs and viewing predictions." }
      ],
      techStackDetails: [
        { category: "ML", items: ["Scikit-learn", "XGBoost", "TensorFlow"] },
        { category: "Backend", items: ["Flask", "Python"] },
        { category: "Frontend", items: ["React"] }
      ],
      challenges: ["Handling imbalanced medical datasets.", "Ensuring model generalizability across different patient profiles."],
      learnings: ["Feature engineering is critical in medical ML.", "Model explainability matters for health-related predictions."],
      outcome: "A working prediction suite demonstrating practical ML applications in healthcare."
    }
  },
  {
    id: "proj3",
    title: "Emotion Detection System",
    description: [
      "Real-time facial emotion detection system using deep learning and computer vision.",
      "Classifies emotions like happy, sad, angry, surprised, neutral from live webcam feed.",
      "Built with CNN architecture trained on facial expression datasets."
    ],
    techStack: ["Python", "TensorFlow", "Keras", "OpenCV", "CNN"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    fullDetails: {
      intro: "A real-time emotion recognition system that classifies human facial expressions.",
      overview: "Uses a CNN model trained on facial expression datasets to classify emotions from a live webcam feed in real time.",
      features: [
        { title: "Real-Time Detection", description: "Live webcam feed processed frame-by-frame for instant emotion classification." },
        { title: "Multi-Class Classification", description: "Detects happy, sad, angry, surprised, fearful, disgusted, and neutral emotions." },
        { title: "CNN Architecture", description: "Custom CNN trained on FER2013 dataset for robust performance." }
      ],
      techStackDetails: [
        { category: "Deep Learning", items: ["TensorFlow", "Keras", "CNN"] },
        { category: "Computer Vision", items: ["OpenCV", "Python"] }
      ],
      challenges: ["Low-light and occlusion affecting detection accuracy.", "Real-time performance optimization."],
      learnings: ["Data augmentation significantly improves CNN generalization.", "Real-time inference requires model optimization techniques."],
      outcome: "A working real-time emotion detection pipeline with strong accuracy on standard benchmarks."
    }
  },
  {
    id: "proj4",
    title: "House Price Prediction App",
    description: [
      "Full-stack house price prediction application with ML backend and React frontend.",
      "Trained regression models on real estate datasets to predict property prices.",
      "Features an interactive UI for inputting property details and viewing predictions."
    ],
    techStack: ["Python", "Scikit-learn", "Flask", "React", "Pandas", "NumPy"],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop",
    fullDetails: {
      intro: "A house price prediction application combining ML regression models with a full-stack web interface.",
      overview: "Trained on real estate data, the model predicts property prices based on features like location, size, and amenities, served via Flask API to a React frontend.",
      features: [
        { title: "ML Regression", description: "Multiple regression models compared and optimized for best prediction accuracy." },
        { title: "Interactive UI", description: "User-friendly React interface for entering property details." },
        { title: "Full-Stack Integration", description: "Flask backend serving model predictions to the React frontend." }
      ],
      techStackDetails: [
        { category: "ML", items: ["Scikit-learn", "Pandas", "NumPy"] },
        { category: "Backend", items: ["Flask", "Python"] },
        { category: "Frontend", items: ["React"] }
      ],
      challenges: ["Feature selection and handling missing data in real estate datasets.", "Preventing overfitting on limited training data."],
      learnings: ["EDA is essential before model training.", "Good feature engineering often matters more than model choice."],
      outcome: "A clean, functional price prediction app demonstrating end-to-end ML deployment."
    }
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Languages",
    skills: [
      { name: "Python" },
      { name: "JavaScript" },
      { name: "HTML/CSS" },
      { name: "C++" }
    ]
  },
  {
    name: "Web Development",
    skills: [
      { name: "React.js" },
      { name: "Node.js" },
      { name: "Flask" },
      { name: "REST APIs" },
      { name: "Tailwind CSS" }
    ]
  },
  {
    name: "AI/ML & Deep Learning",
    skills: [
      { name: "Machine Learning" },
      { name: "Deep Learning" },
      { name: "Computer Vision" },
      { name: "NLP" },
      { name: "TensorFlow" },
      { name: "Scikit-learn" },
      { name: "OpenCV" },
      { name: "MediaPipe" },
      { name: "XGBoost" },
      { name: "CNN / RNN" }
    ]
  },
  {
    name: "Data & Tools",
    skills: [
      { name: "Pandas" },
      { name: "NumPy" },
      { name: "Kaggle" },
      { name: "Google Colab" },
      { name: "Hugging Face" },
      { name: "Git / GitHub" }
    ]
  },
  {
    name: "Platforms",
    skills: [
      { name: "VS Code" },
      { name: "Replit" },
      { name: "Vercel" },
      { name: "Render" }
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  { name: "Machine Learning — Coursera / Google" },
  { name: "Deep Learning Specialization" },
  { name: "Python for Data Science" },
  { name: "Full Stack Web Development" },
  { name: "Computer Vision with OpenCV" }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: "MAKAUT CSE Student — 5th Semester",
    description: "Pursuing B.Tech in Computer Science at Maulana Abul Kalam Azad University of Technology."
  },
  {
    title: "Multiple AI Projects Built",
    description: "Developed real-world AI systems including gesture recognition, emotion detection, and medical prediction models."
  },
  {
    title: "Full-Stack Developer",
    description: "Built end-to-end applications with ML backends and modern React frontends."
  }
];
