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
    linkedin: "https://www.linkedin.com/in/bhumika-tewari-21294027a/",
    whatsapp: "https://wa.me/910000000000"
  },
  summary:
    "Building intelligent systems across AI, data, and full-stack development — from machine learning models to production-ready applications. Passionate about creating scalable, high-performance solutions with real-world impact."
};

export const EXPERIENCES: Experience[] = [
  {
    id: "exp1",
    role: "MERN Stack and AI Engineer (Teaching Assistant)",
    company: "Stealth Startup (Ed-Tech Platform)",
    duration: "Nov 2025 – Dec 2025",
    location: "Kolkata, India",
    bullets: [
      "Mentored 120+ learners in MERN development, simplifying full-stack architecture, debugging workflows.",
      "Resolved 250+ frontend/backend issues and delivered 20+ sessions on APIs, routing, authentication, and schemas.",
      "Developed and trained LLM-powered chat assistants to support student queries, improving explanation accuracy.",
      "Designed AI-driven learning workflows using structured prompts and contextual retrieval to improve chatbot performance."
    ]
  },
  {
    id: "exp2",
    role: "SDE Intern (Full Stack)",
    company: "Bihar Innovation",
    duration: "Feb 2025 – Oct 2025",
    location: "Kolkata, India",
    bullets: [
      "Developed 30+ full-stack applications using React.js, Node.js, Express.js, MongoDB, MySQL.",
      "Built 45+ REST APIs improving data flow & response time across multiple feature modules.",
      "Improved query performance by 40–60% with optimized indexing and schema-level refactors.",
      "Integrated AWS/Azure microservices & external API layers enhancing platform reliability."
    ]
  },
  {
    id: "exp3",
    role: "More Opportunities Coming",
    company: "Career Roadmap",
    duration: "2026 →",
    location: "Kolkata, India",
    bullets: [
      "+"
    ]
  }
];


export const VIRTUAL_SIMULATIONS = [
  {
    category: "Software & Cloud",
    companies: "AWS, Walmart, Goldman Sachs, HPE, Accenture, AIG, Verizon",
    icon: "cloud",
    color: "#EF4444"
  },
  {
    category: "Data & Analytics",
    companies: "Microsoft, PwC, Tata, Quantium, British Airways, Mastercard",
    icon: "analytics",
    color: "#10B981"
  },
  {
    category: "Finance & Consulting",
    companies: "JPMorgan, Fidelity, HP, KPMG US, HSBC, Bank of America, BCG",
    icon: "consulting",
    color: "#F59E0B"
  },
  {
    category: "PM & Leadership",
    companies: "Siemens, CBRE, GE, NY Jobs CEO Council",
    icon: "leadership",
    color: "#3B82F6"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "proj1",
    title: "AgriSense AI",
    subtitle: "AI-powered precision agriculture platform",
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
    title: "Classroom Automate",
    subtitle: "AI-driven classroom automation platform",
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
    title: "Data Pipeline",
    subtitle: "Automated ETL pipeline for analytics",
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
  },
  {
    id: "proj4",
    title: "AI-Based Chest Disease Detection System",
    subtitle: "Deep learning system for automated chest disease detection from X-ray images",
    description: [
      "Designed and developed a CNN-based medical imaging system to detect lung diseases from chest X-rays, enabling faster and more accurate diagnosis.",
      "Built deep learning models using CNN architectures for detecting multiple lung diseases from chest X-ray datasets.",
      "Implemented preprocessing, training pipelines, and deployed prediction system with visualization support for medical insights."
    ],
    techStack: ["Python", "TensorFlow", "CNN", "Flask", "OpenCV", "NumPy", "Pandas"],
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=1400&auto=format&fit=crop",
    github: "https://github.com/Bhumika2006-hue/chest_disease",
    fullDetails: {
      intro: "Developed an AI-powered deep learning system for automated detection of chest diseases from X-ray images.",
      overview: "The system leverages Convolutional Neural Networks (CNNs) to classify lung conditions and assist radiologists in making faster and more accurate diagnoses. It is designed as an end-to-end pipeline covering preprocessing, model training, prediction, and visualization.",
      features: [
        { title: "Deep Learning-Based Classification", description: "Built CNN models for medical image analysis and multi-condition detection such as Pneumonia, Cardiomegaly, and Effusion from chest X-ray datasets." },
        { title: "Image Processing Pipeline", description: "Implemented image resizing, normalization, and deep feature extraction workflows to improve consistency and prediction accuracy." },
        { title: "Multi-Disease Detection", description: "Enabled classification across multiple disease classes by training on large-scale chest X-ray data and handling real-world medical variability." },
        { title: "Model Visualization & Explainability", description: "Added heatmap-based visualization (Grad-CAM style) to highlight affected lung regions and improve prediction interpretability." },
        { title: "Deployment & Application", description: "Built backend services using Flask with an architecture that can be extended into web and mobile applications for real-time predictions." }
      ],
      systemArchitecture: "Chest X-ray Image → Preprocessing (Resize, Normalize) → CNN Model Training → Prediction (Disease Classification) → Visualization (Heatmap Output) → Web App / API",
      modelDetails: ["Pneumonia", "Cardiomegaly", "Effusion"],
      techStackDetails: [
        { category: "Languages & Core", items: ["Python", "NumPy", "Pandas"] },
        { category: "Deep Learning", items: ["TensorFlow", "Keras", "CNN"] },
        { category: "Backend", items: ["Flask"] },
        { category: "Tools", items: ["OpenCV", "Matplotlib"] }
      ],
      challenges: [
        "Handling imbalanced datasets common in medical imaging data.",
        "Ensuring high model accuracy for sensitive healthcare predictions.",
        "Maintaining interpretability so outputs remain useful for clinical understanding."
      ],
      learnings: [
        "Deep learning implementation patterns for medical imaging applications.",
        "The critical impact of preprocessing quality in CNN-based systems.",
        "How to handle real-world dataset limitations in applied AI projects."
      ],
      outcome: "Built a scalable AI-based diagnostic system that automates chest disease detection, improves diagnostic efficiency, and can be extended into real healthcare workflows."
    }
  },
  {
    id: "proj5",
    title: "AI-Powered Stock Analysis Chatbot",
    subtitle: "Conversational stock insights with technical indicators",
    description: [
      "Developed an AI-powered stock analysis chatbot that lets users query stock data, analyze trends, and generate investment insights using natural language.",
      "Integrated real-time Yahoo Finance data retrieval, technical indicator computation, and AI response generation in one interactive workflow.",
      "Built a Streamlit interface with chat history, stock charts, and session-based conversations for fast and intuitive analysis."
    ],
    techStack: ["Python", "Pandas", "NumPy", "Streamlit", "Yahoo Finance API", "OpenAI", "GPT4All", "Technical Analysis"],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1400&auto=format&fit=crop",
    github: "https://github.com/Bhumika2006-hue/Stock-Chatbot-AI-1",
    fullDetails: {
      intro: "Developed an AI-powered stock analysis chatbot that enables users to query stock data, analyze trends, and generate investment insights using natural language.",
      overview: "The system combines natural language intent handling, real-time market data retrieval, technical analysis computation, and AI-based response generation in one streamlined workflow.",
      features: [
        { title: "AI Chatbot Interface", description: "Accepts natural language stock queries, responds conversationally, and supports session-based interactions." },
        { title: "Real-Time Stock Data Analysis", description: "Fetches stock data through Yahoo Finance APIs, including latest values and historical price data for dynamic analysis." },
        { title: "Technical Indicators", description: "Implements SMA, EMA, RSI, and MACD to evaluate momentum, trend direction, and potential buy/sell signals." },
        { title: "Interactive Visualizations", description: "Generates stock price and indicator charts directly in the UI to help users interpret market movement quickly." },
        { title: "Flexible AI Backend", description: "Initially built for OpenAI APIs and later adapted to local GPT4All models with structured function-style responses." },
        { title: "Streamlit Web App", description: "Provides a clean web interface for query input, chat history, and integrated chart display." }
      ],
      systemArchitecture: "User Query (Chat Input) → LLM Processing (Intent + Ticker Extraction) → Stock Data API (Yahoo Finance) → Technical Indicator Calculation → Visualization (Charts) → Response Generation (Chatbot Output) → Streamlit UI",
      techStackDetails: [
        { category: "Languages & Core", items: ["Python", "Pandas", "NumPy"] },
        { category: "AI / ML", items: ["OpenAI API", "GPT4All", "Function-based prompting"] },
        { category: "Frontend", items: ["Streamlit"] },
        { category: "APIs & Data", items: ["Yahoo Finance API", "Time-series price data"] },
        { category: "Concepts", items: ["Technical Analysis", "Time Series Data", "Chatbot Systems"] }
      ],
      challenges: [
        "Handling API rate limits and occasional quota constraints during real-time fetches.",
        "Aligning LLM-generated responses with current market data for reliable outputs.",
        "Keeping financial insights meaningful while maintaining concise conversational responses."
      ],
      learnings: [
        "How to build conversational AI systems grounded in structured external data.",
        "How technical indicators like RSI and MACD can be integrated into interactive workflows.",
        "How to combine API integrations, visualization, and LLM orchestration in a single app."
      ],
      outcome: "Built an intelligent financial assistant that analyzes stock trends, generates AI-driven insights, and visualizes signals interactively for end users."
    }
  },
  {
    id: "proj6",
    title: "House Price Prediction System",
    subtitle: "ML-based house price estimation using structured housing data",
    description: [
      "Developed a machine learning-based prediction system to estimate house prices using historical housing data and key property features.",
      "Implemented linear regression with data preprocessing and feature engineering to improve model quality and prediction reliability.",
      "Evaluated performance with R² score and mean squared error, and supported analysis through feature-price visualizations."
    ],
    techStack: ["Python", "Pandas", "NumPy", "Scikit-learn", "Linear Regression", "Matplotlib"],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1400&auto=format&fit=crop",
    fullDetails: {
      intro: "Developed a machine learning-based prediction system to estimate house prices using historical housing data and key property features.",
      overview: "The model analyzes patterns in the dataset to provide accurate price predictions, supporting better decision-making in real estate.",
      features: [
        { title: "Regression-Based Prediction", description: "Implemented Linear Regression to predict house prices based on structured numerical property features." },
        { title: "Data Preprocessing", description: "Handled missing values, cleaned noisy records, and normalized data before model training." },
        { title: "Feature Engineering", description: "Focused on influential features such as location, area, and number of rooms to improve model performance." },
        { title: "Data Visualization", description: "Visualized feature-to-price relationships to better understand trends and support model evaluation." },
        { title: "Model Evaluation", description: "Measured performance using R² score and Mean Squared Error to ensure reliable predictions." }
      ],
      systemArchitecture: "Raw Housing Data → Data Cleaning & Preprocessing → Feature Selection & Engineering → Model Training (Linear Regression) → Prediction Output (House Price) → Visualization & Analysis",
      techStackDetails: [
        { category: "Languages & Core", items: ["Python", "Pandas", "NumPy"] },
        { category: "Machine Learning", items: ["Scikit-learn", "Linear Regression"] },
        { category: "Visualization", items: ["Matplotlib"] }
      ],
      challenges: [
        "Handling incomplete or noisy housing records.",
        "Selecting the most relevant features for prediction stability.",
        "Avoiding overfitting while preserving useful signal in the data."
      ],
      learnings: [
        "Applied regression modeling to a practical real-estate use case.",
        "Learned the impact of feature selection on prediction quality.",
        "Strengthened data preprocessing and model evaluation skills."
      ],
      outcome: "Built a predictive analytics system that estimates house prices accurately, highlights key influencing factors, and demonstrates a real-world ML application."
    }
  },
  {
    id: "proj7",
    title: "Wine Quality Prediction System",
    subtitle: "ML system for wine quality prediction from chemical properties",
    description: [
      "Developed a machine learning system to predict wine quality using physicochemical attributes such as acidity, alcohol content, and pH.",
      "Built and compared Logistic Regression, Decision Tree, and Random Forest models with preprocessing and feature analysis workflows.",
      "Used visualization and model evaluation metrics to identify key quality drivers and select the best-performing model."
    ],
    techStack: ["Python", "Scikit-learn", "Random Forest", "Decision Tree", "Logistic Regression", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    image: "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?q=80&w=1400&auto=format&fit=crop",
    fullDetails: {
      intro: "Developed a machine learning-based system to predict the quality of wine using physicochemical attributes such as acidity, sugar content, pH, and alcohol levels.",
      overview: "The system models relationships between chemical properties and wine quality scores, enabling data-driven quality assessment.",
      features: [
        { title: "ML-Based Prediction", description: "Implemented Logistic Regression, Decision Tree, and Random Forest models and compared their performance." },
        { title: "Data Preprocessing", description: "Handled missing values and inconsistencies, then applied feature scaling and normalization." },
        { title: "Feature Analysis", description: "Used influential properties such as acidity, alcohol, pH, and sulphates to improve prediction quality." },
        { title: "Data Visualization", description: "Created correlation heatmaps and feature-vs-target plots to identify important relationships." },
        { title: "Model Evaluation", description: "Evaluated using Accuracy and Confusion Matrix and selected the best-performing model." }
      ],
      systemArchitecture: "Wine Dataset → Data Cleaning & Preprocessing → Feature Selection & Analysis → Model Training (ML Algorithms) → Prediction Output (Quality Score) → Visualization & Evaluation",
      techStackDetails: [
        { category: "Languages & Core", items: ["Python", "Pandas", "NumPy"] },
        { category: "Machine Learning", items: ["Scikit-learn", "Random Forest", "Decision Tree", "Logistic Regression"] },
        { category: "Visualization", items: ["Matplotlib", "Seaborn"] }
      ],
      challenges: [
        "Handling class imbalance where average-quality wines dominate.",
        "Selecting the most relevant chemical properties for quality prediction.",
        "Avoiding overfitting across multiple model candidates."
      ],
      learnings: [
        "Gained end-to-end ML workflow experience from preprocessing to deployment-ready evaluation.",
        "Learned how feature engineering impacts classification performance.",
        "Improved model comparison and selection strategies."
      ],
      outcome: "Built a predictive analytics system that estimates wine quality accurately, identifies key influencing factors, and demonstrates a practical ML workflow."
    }
  },
  {
    id: "proj8",
    title: "Heart Disease Prediction System",
    subtitle: "Clinical ML system for heart disease risk prediction",
    description: [
      "Developed a machine learning model to predict heart disease risk from clinical attributes such as age, cholesterol, blood pressure, and heart rate.",
      "Implemented and compared Logistic Regression, Decision Tree, and Random Forest with preprocessing and feature engineering.",
      "Evaluated reliability using accuracy, precision, recall, and F1 score with visual diagnostics including heatmaps and ROC-oriented analysis."
    ],
    techStack: ["Python", "Scikit-learn", "Logistic Regression", "Decision Tree", "Random Forest", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1400&auto=format&fit=crop",
    fullDetails: {
      intro: "Developed a machine learning-based healthcare prediction system to estimate the risk of heart disease using patient clinical data.",
      overview: "The system analyzes medical attributes such as age, blood pressure, cholesterol levels, and heart rate to predict whether a patient is likely to have heart disease.",
      features: [
        { title: "ML-Based Disease Prediction", description: "Implemented Logistic Regression, Decision Tree, and Random Forest to classify heart disease presence or absence." },
        { title: "Data Preprocessing", description: "Handled missing values, applied scaling/normalization, and prepared clinical data for robust training." },
        { title: "Feature Engineering", description: "Focused on age, cholesterol, blood pressure, and chest pain type as key predictive factors." },
        { title: "Data Visualization", description: "Used correlation heatmaps, feature-importance views, confusion matrices, and ROC-style analysis to inspect model behavior." },
        { title: "Model Evaluation", description: "Measured Accuracy, Precision, Recall, and F1 Score to ensure dependable clinical risk classification." }
      ],
      systemArchitecture: "Patient Data Input → Data Preprocessing & Cleaning → Feature Selection & Engineering → Model Training (ML Algorithms) → Prediction Output (Disease Risk) → Visualization & Evaluation",
      techStackDetails: [
        { category: "Languages & Core", items: ["Python", "Pandas", "NumPy"] },
        { category: "Machine Learning", items: ["Scikit-learn", "Logistic Regression", "Decision Tree", "Random Forest"] },
        { category: "Visualization", items: ["Matplotlib", "Seaborn"] }
      ],
      challenges: [
        "Handling variability and noise in medical datasets.",
        "Selecting clinically relevant features while maintaining model simplicity.",
        "Preventing overfitting in high-stakes classification tasks."
      ],
      learnings: [
        "Applied machine learning workflows in a healthcare domain scenario.",
        "Learned the impact of strong feature selection in clinical classification.",
        "Improved multi-metric evaluation for risk-sensitive models."
      ],
      outcome: "Built a predictive healthcare system that identifies heart disease risk early, supports data-driven decisions, and demonstrates real-world ML impact."
    }
  },
  {
    id: "proj9",
    title: "Diabetes Prediction Web App",
    subtitle: "Clinical ML web app for early diabetes risk prediction",
    description: [
      "Developed a machine learning-based web application for early prediction of diabetes using clinical health data.",
      "Built an ensemble pipeline combining Random Forest, Logistic Regression, and SVM to improve classification reliability.",
      "Implemented a Flask interface where users enter health parameters and receive instant diabetic or non-diabetic predictions."
    ],
    techStack: ["Python", "Pandas", "NumPy", "Scikit-learn", "Random Forest", "Logistic Regression", "SVM", "Flask"],
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1400&auto=format&fit=crop",
    fullDetails: {
      intro: "Developed a machine learning-based web application for early prediction of diabetes using clinical health data.",
      overview: "The system allows users to input medical parameters and instantly receive predictions for preventive healthcare support. The model was trained on healthcare datasets with features including glucose, BMI, insulin, and age.",
      features: [
        { title: "ML-Based Disease Prediction", description: "Implemented an ensemble approach using Random Forest, Logistic Regression, and SVM to improve prediction accuracy." },
        { title: "User Input System", description: "Accepts health parameters such as glucose level, blood pressure, BMI, and age, then converts them into model-ready input." },
        { title: "Real-Time Prediction", description: "Provides instant inference and classifies patients as diabetic or non-diabetic with low-latency responses." },
        { title: "Web Application Interface", description: "Built using Flask with a simple and interactive UI that dynamically displays prediction outcomes." },
        { title: "Data Preprocessing", description: "Applied data cleaning, normalization, and feature scaling to improve training quality and model performance." }
      ],
      systemArchitecture: "User Input (Health Parameters) → Data Preprocessing → Ensemble ML Model → Prediction Output (Risk Result) → Web Interface (Flask)",
      techStackDetails: [
        { category: "Languages & Core", items: ["Python", "Pandas", "NumPy"] },
        { category: "Machine Learning", items: ["Scikit-learn", "Random Forest", "Logistic Regression", "SVM"] },
        { category: "Backend", items: ["Flask"] },
        { category: "Concepts", items: ["Ensemble Learning", "Classification Models", "Healthcare Analytics"] }
      ],
      challenges: [
        "Handling variability in medical dataset distributions.",
        "Improving model accuracy through ensemble design.",
        "Designing a simple and user-friendly prediction interface."
      ],
      learnings: [
        "Building full-stack machine learning web applications.",
        "Applying ensemble learning for healthcare classification tasks.",
        "Deploying and serving ML predictions through Flask."
      ],
      outcome: "Built a real-world healthcare AI application that predicts diabetes risk, provides instant results, and demonstrates ML + web integration."
    }
  },
  {
    id: "proj10",
    title: "Flight Fare Prediction System",
    subtitle: "Regression ML system for airline ticket price estimation",
    description: [
      "Developed a machine learning-based system to predict airline ticket prices using historical flight data.",
      "Modeled fare trends from features such as airline, source, destination, duration, and number of stops.",
      "Built a deployment-ready workflow that can be integrated into Flask or Streamlit for real-time fare predictions."
    ],
    techStack: ["Python", "Pandas", "NumPy", "Scikit-learn", "Random Forest Regression", "Linear Regression", "Matplotlib", "Seaborn"],
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1400&auto=format&fit=crop",
    fullDetails: {
      intro: "Developed a machine learning-based system to predict airline ticket prices using historical flight data.",
      overview: "The system analyzes multiple features such as airline, source, destination, duration, and total stops to estimate ticket fares and support better booking decisions.",
      features: [
        { title: "Regression-Based Prediction", description: "Implemented Random Forest Regression and Linear Regression to predict continuous fare values." },
        { title: "Data Preprocessing", description: "Handled missing values and inconsistencies, used label encoding for categorical fields, and applied normalization." },
        { title: "Feature Engineering", description: "Used key variables including airline, source, destination, duration, and total stops to improve fare estimation quality." },
        { title: "Data Visualization", description: "Created price-vs-duration analysis, airline-wise fare comparison, and feature-importance visualization." },
        { title: "Model Evaluation", description: "Evaluated performance using R² Score and Mean Absolute Error (MAE) for reliable model selection." },
        { title: "Deployment Ready", description: "Prepared the system for integration with Flask web apps or Streamlit dashboards for real-time prediction." }
      ],
      systemArchitecture: "Flight Dataset → Data Cleaning & Preprocessing → Feature Engineering → Model Training (Regression Models) → Prediction Output (Fare Price) → Visualization / Web Interface",
      techStackDetails: [
        { category: "Languages & Core", items: ["Python", "Pandas", "NumPy"] },
        { category: "Machine Learning", items: ["Scikit-learn", "Random Forest Regression", "Linear Regression"] },
        { category: "Visualization", items: ["Matplotlib", "Seaborn"] }
      ],
      challenges: [
        "Handling highly dynamic airfare pricing patterns.",
        "Encoding categorical variables effectively for regression models.",
        "Reducing overfitting while preserving generalization."
      ],
      learnings: [
        "Applying regression methods to real-world pricing problems.",
        "Understanding the impact of strong feature engineering on price models.",
        "Building robust preprocessing pipelines for structured travel data."
      ],
      outcome: "Built a predictive analytics system that estimates flight ticket prices, helps users plan cost-effective travel, and demonstrates practical ML deployment readiness."
    }
  },
  {
    id: "proj11",
    title: "Gesture-Based Interaction System",
    subtitle: "Real-time touchless control with computer vision and Flask",
    description: [
      "Developed a full-stack real-time gesture recognition system for touchless human-computer interaction.",
      "Used OpenCV and MediaPipe to detect hand landmarks from webcam video and map gestures to commands.",
      "Integrated frontend controls with Flask backend APIs for interactive, low-latency gesture-based actions."
    ],
    techStack: ["Python", "OpenCV", "MediaPipe", "Flask", "JavaScript", "HTML", "CSS"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop",
    fullDetails: {
      intro: "Developed a real-time gesture recognition system that enables users to interact with applications using hand gestures instead of traditional input devices.",
      overview: "The system captures webcam frames, detects hand landmarks, recognizes gesture intent, and translates it into commands through a touchless full-stack workflow.",
      features: [
        { title: "Real-Time Gesture Detection", description: "Captures live webcam video, detects hand landmarks, and processes gestures instantly." },
        { title: "Computer Vision Pipeline", description: "Uses OpenCV for frame processing and MediaPipe for hand tracking and key-point extraction." },
        { title: "Gesture-Based Control", description: "Maps recognized gestures to navigation, command execution, and UI interaction actions." },
        { title: "Full-Stack Integration", description: "Combines HTML/CSS/JavaScript frontend with Flask backend APIs for smooth interaction flow." },
        { title: "Interactive User Interface", description: "Displays live webcam feed, gesture overlays, and real-time visual feedback." }
      ],
      systemArchitecture: "Webcam Input (Video Stream) → Frame Processing (OpenCV) → Hand Landmark Detection (MediaPipe) → Gesture Recognition Logic → Backend API (Flask) → Frontend UI (Display + Control)",
      techStackDetails: [
        { category: "Languages & Core", items: ["Python", "JavaScript"] },
        { category: "Computer Vision", items: ["OpenCV", "MediaPipe"] },
        { category: "Backend", items: ["Flask"] },
        { category: "Frontend", items: ["HTML", "CSS", "JavaScript"] }
      ],
      challenges: [
        "Handling lighting variation and background noise during detection.",
        "Maintaining high gesture recognition accuracy in real time.",
        "Keeping latency low for responsive user interaction."
      ],
      learnings: [
        "Computer vision fundamentals for real-time tracking systems.",
        "Design patterns for interactive low-latency pipelines.",
        "Practical frontend-backend communication for AI-enabled interfaces."
      ],
      outcome: "Built an interactive gesture-controlled system that enables touchless interaction and demonstrates real-time AI + web integration."
    }
  },
  {
    id: "proj12",
    title: "End-to-End Airbnb Price Prediction System",
    subtitle: "Complete ML pipeline for Airbnb rental price forecasting",
    description: [
      "Developed an end-to-end machine learning pipeline to predict Airbnb listing prices using location, property type, amenities, and ratings.",
      "Implemented full lifecycle workflows including data ingestion, preprocessing, EDA, feature engineering, model training, and evaluation.",
      "Compared regression models and identified key factors that influence listing prices for practical decision support."
    ],
    techStack: ["Python", "Scikit-learn", "Pandas", "NumPy", "EDA", "Regression Models", "Matplotlib", "Seaborn"],
    image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=1400&auto=format&fit=crop",
    fullDetails: {
      intro: "Developed an end-to-end machine learning system to predict Airbnb rental prices using listing data and property features.",
      overview: "The project follows a complete ML lifecycle including data cleaning, exploratory data analysis, feature engineering, model training, and evaluation to support host pricing and guest decision-making.",
      features: [
        { title: "End-to-End ML Pipeline", description: "Implemented complete workflows for data collection, cleaning, feature engineering, model training, and evaluation." },
        { title: "Exploratory Data Analysis (EDA)", description: "Analyzed price distribution, location trends, and property type effects to identify pricing patterns." },
        { title: "Feature Engineering", description: "Focused on influential factors such as location, room count, amenities, and review scores." },
        { title: "Regression-Based Prediction", description: "Built and compared Linear Regression, Decision Tree, and Random Forest models to choose the best performer." },
        { title: "Data Visualization", description: "Used correlation heatmaps and feature-vs-price analysis to explain key pricing drivers." },
        { title: "Model Evaluation", description: "Validated predictions with RMSE, MAE, and R² Score to ensure reliability." }
      ],
      systemArchitecture: "Airbnb Dataset → Data Cleaning & Preprocessing → Exploratory Data Analysis (EDA) → Feature Engineering → Model Training (Regression Models) → Prediction Output (Price) → Evaluation & Visualization",
      techStackDetails: [
        { category: "Languages & Core", items: ["Python", "Pandas", "NumPy"] },
        { category: "Machine Learning", items: ["Scikit-learn", "Linear Regression", "Decision Tree", "Random Forest"] },
        { category: "Concepts", items: ["EDA", "Feature Engineering", "Regression Modeling"] },
        { category: "Visualization", items: ["Matplotlib", "Seaborn"] }
      ],
      challenges: [
        "Handling missing and noisy listing data.",
        "Selecting features that generalize across neighborhoods and property types.",
        "Managing dynamic market-driven pricing behavior."
      ],
      learnings: [
        "Designing robust end-to-end ML workflows for production-style projects.",
        "Why EDA and feature engineering are critical for pricing performance.",
        "How to evaluate and compare regression models for real-world datasets."
      ],
      outcome: "Built a complete data science pipeline that predicts Airbnb prices, identifies key pricing factors, and demonstrates production-level ML workflow design."
    }
  },
  {
    id: "proj13",
    title: "End-to-End Movie Recommendation System",
    subtitle: "AI-powered recommendation system for personalized movie suggestions",
    description: [
      "Developed a machine learning-based system that recommends movies based on user preferences using content-based and similarity-based techniques.",
      "Built a recommendation engine using content-based filtering and similarity measures to suggest movies based on user input.",
      "Implemented text processing and feature extraction techniques to analyze movie metadata like genre, cast, and overview."
    ],
    techStack: ["Python", "Pandas", "Scikit-learn", "NLP", "Cosine Similarity", "Streamlit"],
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1400&auto=format&fit=crop",
    fullDetails: {
      intro: "Developed an end-to-end movie recommendation system that suggests movies based on user preferences and similarity between movie features.",
      overview: "The system uses content-based filtering and similarity metrics to recommend movies with similar characteristics such as genre, cast, and storyline, similar to real-world personalization systems.",
      features: [
        { title: "Content-Based Recommendation", description: "Recommends movies similar to user-selected films by comparing metadata such as genre, cast, and keywords." },
        { title: "Feature Engineering & NLP", description: "Applies text processing and vectorization (TF-IDF / Bag of Words) to convert movie data into numerical features." },
        { title: "Similarity Matrix Computation", description: "Builds a movie-to-movie cosine similarity matrix and retrieves top matching recommendations efficiently." },
        { title: "Data Processing Pipeline", description: "Includes data cleaning, metadata preprocessing, feature extraction, and similarity-ready matrix creation." },
        { title: "Interactive Interface", description: "Provides a Streamlit-based UI where users select a movie and receive instant recommendations." }
      ],
      systemArchitecture: "Movie Dataset → Data Cleaning & Preprocessing → Feature Extraction (NLP) → Vectorization (TF-IDF / BoW) → Similarity Matrix (Cosine Similarity) → Recommendation Engine → User Interface (Streamlit / Web App)",
      techStackDetails: [
        { category: "Languages & Core", items: ["Python", "Pandas", "NumPy"] },
        { category: "Machine Learning / NLP", items: ["Scikit-learn", "TF-IDF / Bag of Words", "Cosine Similarity"] },
        { category: "Frontend", items: ["Streamlit"] }
      ],
      challenges: [
        "Handling large text-based movie datasets efficiently.",
        "Optimizing similarity computation for faster retrieval.",
        "Improving recommendation relevance for diverse user tastes."
      ],
      learnings: [
        "Core recommender system design principles.",
        "NLP-based feature extraction for recommendation pipelines.",
        "Similarity-based modeling for practical personalization use cases."
      ],
      outcome: "Built a personalized movie recommendation system that suggests relevant movies instantly and demonstrates a real-world ML application."
    }
  },
  {
    id: "proj14",
    title: "Automated Certificate Generation System",
    subtitle: "Automated system for generating personalized certificates in bulk",
    description: [
      "Developed a Python-based system to automatically generate certificates by inserting user names into a predefined template, reducing manual effort and improving efficiency.",
      "Built an automated pipeline to generate multiple certificates by dynamically inserting user data into templates.",
      "Eliminated manual certificate creation, significantly improving speed and accuracy for bulk generation tasks."
    ],
    techStack: ["Python", "OpenCV / PIL", "Pandas", "Automation", "Image Processing"],
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1400&auto=format&fit=crop",
    fullDetails: {
      intro: "Developed an automated certificate generation system that creates personalized certificates by inserting user-specific data into a predefined template.",
      overview: "The system processes input names from files and generates certificates in bulk using image processing workflows, significantly reducing repetitive manual work.",
      features: [
        { title: "Automated Certificate Generation", description: "Generates certificates in bulk from a predefined template by dynamically inserting participant names." },
        { title: "Data-Driven Input", description: "Reads names from text files or CSV input and iterates through records to generate certificates programmatically." },
        { title: "Image Processing Pipeline", description: "Uses OpenCV / PIL to place text with proper alignment, style, and formatting on certificate templates." },
        { title: "Fast & Efficient Automation", description: "Produces large numbers of certificates in seconds while minimizing human error." },
        { title: "Output Management", description: "Stores generated certificates in organized folders for easy access and scalable usage." }
      ],
      systemArchitecture: "Input Data (Names List / CSV) → Template Selection (Certificate Image) → Text Processing (Positioning & Formatting) → Image Processing (Overlay Text) → Certificate Generation (Output Files) → Storage (Generated Certificates Folder)",
      techStackDetails: [
        { category: "Languages & Core", items: ["Python"] },
        { category: "Libraries", items: ["OpenCV / PIL", "Pandas"] },
        { category: "Concepts", items: ["Automation", "Image Processing", "Batch Processing"] }
      ],
      challenges: [
        "Aligning text correctly across template designs.",
        "Handling different name lengths without layout breaks.",
        "Maintaining consistent font and formatting quality at scale."
      ],
      learnings: [
        "Automation workflow design using Python.",
        "Practical image processing for document generation.",
        "Handling bulk data processing with reliability."
      ],
      outcome: "Built a practical automation tool that generates certificates instantly, saves manual effort, and supports event-scale usage."
    }
  },
  {
    id: "proj15",
    title: "AI Video Detection System (Deepfake Detector)",
    subtitle: "AI system for detecting deepfake and AI-generated videos using computer vision",
    description: [
      "Developed a deep learning-based system to detect AI-generated or manipulated videos by analyzing frames and identifying inconsistencies.",
      "Built a deepfake detection system using CNN-based models to classify videos as real or fake through frame-by-frame analysis.",
      "Integrated face detection and video processing pipelines to improve accuracy and provide visual detection outputs."
    ],
    techStack: ["Python", "TensorFlow / PyTorch", "OpenCV", "CNN", "MTCNN", "Gradio"],
    image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=1400&auto=format&fit=crop",
    fullDetails: {
      intro: "Developed an AI-powered deepfake detection system to identify whether a video is real or AI-generated.",
      overview: "The system processes video frames, detects faces, and uses deep learning models to classify authenticity based on visual inconsistencies and frame-level patterns.",
      features: [
        { title: "Deepfake Detection", description: "Classifies uploaded videos as real or AI-generated using CNN-based binary classification workflows." },
        { title: "Face Detection & Processing", description: "Uses MTCNN for face extraction from each frame to improve model focus and prediction quality." },
        { title: "Frame-by-Frame Video Analysis", description: "Splits videos into frames, evaluates each frame, and aggregates predictions for final classification." },
        { title: "Prediction Output", description: "Returns final real/fake classification with confidence scores and optional detection highlighting." },
        { title: "Interactive Interface", description: "Provides a user-friendly Gradio/web interface for uploading videos and viewing detection results." }
      ],
      systemArchitecture: "Input Video → Frame Extraction (OpenCV) → Face Detection (MTCNN) → Feature Extraction (CNN Model) → Frame-Level Prediction → Aggregation (Final Decision) → Output (Real / Fake + Confidence)",
      techStackDetails: [
        { category: "Languages & Core", items: ["Python"] },
        { category: "Deep Learning", items: ["TensorFlow / PyTorch", "CNN"] },
        { category: "Computer Vision", items: ["OpenCV", "MTCNN"] },
        { category: "Frontend", items: ["Gradio"] }
      ],
      challenges: [
        "Handling high computational cost for long videos.",
        "Detecting subtle manipulations in realistic deepfakes.",
        "Generalizing detection performance across varied datasets."
      ],
      learnings: [
        "Deep learning techniques for video authenticity analysis.",
        "End-to-end computer vision pipeline construction.",
        "Practical AI security applications for misinformation defense."
      ],
      outcome: "Built a real-world AI security system that detects manipulated videos and showcases advanced ML + computer vision skills."
    }
  },
  {
    id: "proj16",
    title: "Quick QR – QR Code Generator Tool",
    subtitle: "Fast and simple tool for generating QR codes from text and URLs",
    description: [
      "Developed a lightweight application that converts user input (text/URL) into scannable QR codes for quick sharing and access.",
      "Built a tool to instantly generate QR codes from user input such as URLs, text, or data.",
      "Implemented download functionality and a clean UI for easy usage and sharing."
    ],
    techStack: ["Python", "Flask / Streamlit", "QR Libraries", "PIL", "HTML", "CSS"],
    image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1400&auto=format&fit=crop",
    fullDetails: {
      intro: "Developed a QR code generator application that converts user input into scannable QR codes for quick information sharing.",
      overview: "The system provides a simple and efficient interface for generating and downloading QR codes used for URLs, text, and custom data.",
      features: [
        { title: "QR Code Generation", description: "Converts URLs, text, and custom input into scannable QR images instantly using QR libraries." },
        { title: "Instant Output", description: "Generates QR codes in real time with fast response and no noticeable processing delay." },
        { title: "Download Functionality", description: "Allows users to download generated QR codes as image files such as PNG/JPG for easy sharing." },
        { title: "Simple Web Interface", description: "Provides an input field, generate button, and output preview in a clean and minimal interface." },
        { title: "Lightweight & Efficient", description: "Uses minimal dependencies, easy deployment, and supports browser or local usage." }
      ],
      systemArchitecture: "User Input (Text / URL) → Data Processing → QR Code Generation (Library) → Image Output (QR Code) → Display & Download",
      techStackDetails: [
        { category: "Languages & Core", items: ["Python"] },
        { category: "Frameworks", items: ["Flask / Streamlit"] },
        { category: "Libraries", items: ["qrcode", "PIL"] },
        { category: "Frontend", items: ["HTML", "CSS"] }
      ],
      challenges: [
        "Handling different input formats safely and consistently.",
        "Ensuring QR readability across varied content lengths.",
        "Maintaining fast generation speed with a smooth user experience."
      ],
      learnings: [
        "Building utility-based applications for practical daily use.",
        "Working with image and QR generation libraries.",
        "Designing simple and efficient UI flows."
      ],
      outcome: "Built a practical utility tool that generates QR codes instantly, simplifies data sharing, and demonstrates real-world usability."
    }
  },
  {
    id: "proj17",
    title: "Xcoder – Online Coding Platform",
    subtitle: "Web-based coding platform for writing, executing, and testing code in real time",
    description: [
      "Developed an interactive coding platform that allows users to write, execute, and test code in a browser-based environment with real-time feedback.",
      "Built a web-based code editor supporting real-time code execution and output display.",
      "Integrated backend services to handle code compilation/execution and manage user interactions efficiently."
    ],
    techStack: ["JavaScript", "Node.js", "Express", "HTML", "CSS", "API Integration"],
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1400&auto=format&fit=crop",
    fullDetails: {
      intro: "Developed a web-based coding platform that enables users to write, execute, and test code directly in the browser.",
      overview: "The system simulates an online coding environment with API-driven execution and real-time result rendering for practice and interview-style workflows.",
      features: [
        { title: "In-Browser Code Editor", description: "Provides a clean and responsive code editor experience with real-time writing support." },
        { title: "Code Execution Engine", description: "Sends code to a backend runtime, executes securely, and returns output quickly." },
        { title: "API-Based Execution Flow", description: "Implements frontend-to-backend API communication for code submission and output retrieval." },
        { title: "Real-Time Output Display", description: "Displays program output and runtime errors instantly for fast user feedback." },
        { title: "Full Stack Integration", description: "Combines frontend (HTML/CSS/JS) with Node.js/Express backend services." }
      ],
      systemArchitecture: "User (Browser Editor) → Frontend (Code Input UI) → API Request (Send Code) → Backend Server (Execution Engine) → Code Execution (Sandbox / Runtime) → Output Response → Frontend Display",
      techStackDetails: [
        { category: "Frontend", items: ["HTML", "CSS", "JavaScript"] },
        { category: "Backend", items: ["Node.js", "Express"] },
        { category: "Concepts", items: ["API Integration", "Code Execution Systems", "Client-Server Architecture"] }
      ],
      challenges: [
        "Designing secure code execution workflows.",
        "Handling varied programming inputs and errors.",
        "Managing low-latency real-time responses."
      ],
      learnings: [
        "Full-stack system design for developer tools.",
        "API integration for real-time systems.",
        "Practical architecture patterns for interactive coding platforms."
      ],
      outcome: "Built a developer-focused coding platform that enables real-time execution, simulates online coding environments, and demonstrates strong full-stack skills."
    }
  },
  {
    id: "proj18",
    title: "Credit Risk Prediction System",
    subtitle: "Machine learning system for predicting loan default risk and creditworthiness",
    description: [
      "Developed a predictive model to assess the risk of loan default using financial and customer data, helping institutions make smarter lending decisions.",
      "Built classification models to predict whether a borrower is likely to default on a loan using financial datasets.",
      "Performed feature engineering and data analysis to identify key factors affecting credit risk and improve prediction accuracy."
    ],
    techStack: ["Python", "Scikit-learn", "Logistic Regression", "Pandas", "NumPy", "EDA"],
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1400&auto=format&fit=crop",
    fullDetails: {
      intro: "Developed a machine learning-based credit risk prediction system to evaluate whether a borrower is likely to default on a loan.",
      overview: "The model analyzes financial data and outputs default risk probabilities to support informed lending decisions in financial institutions.",
      features: [
        { title: "ML-Based Risk Classification", description: "Implemented Logistic Regression and tree-based models to classify default risk as high or low." },
        { title: "Probability-Based Scoring", description: "Generates probability of default scores to quantify borrower risk levels." },
        { title: "Data Preprocessing", description: "Handled missing values, encoded categorical variables, and applied scaling/normalization." },
        { title: "Feature Engineering", description: "Focused on factors like income, credit history, loan amount, and employment status." },
        { title: "Model Evaluation & Visualization", description: "Used metrics such as Accuracy, Precision, Recall, ROC-AUC, and plotted confusion matrix/ROC." }
      ],
      systemArchitecture: "Customer Financial Data → Data Cleaning & Preprocessing → Feature Engineering → Model Training (Classification) → Prediction Output (Default Risk) → Evaluation & Visualization",
      techStackDetails: [
        { category: "Languages & Core", items: ["Python", "Pandas", "NumPy"] },
        { category: "Machine Learning", items: ["Scikit-learn", "Logistic Regression", "Decision Tree / Random Forest"] },
        { category: "Concepts", items: ["Classification", "Risk Analysis", "Probability Modeling"] }
      ],
      challenges: [
        "Handling class imbalance in default datasets.",
        "Selecting the most meaningful risk features.",
        "Reducing bias risk in financial prediction workflows."
      ],
      learnings: [
        "Financial risk modeling techniques.",
        "Classification model selection and evaluation.",
        "Applying ML in real-world banking use cases."
      ],
      outcome: "Built a financial risk prediction system that assesses borrower reliability and supports lending decisions with practical ML outputs."
    }
  },
  {
    id: "proj19",
    title: "Maritime Intelligence & Monitoring System",
    subtitle: "Data-driven system for maritime tracking, monitoring, and analytics",
    description: [
      "Developed a system to monitor maritime activities, track vessels, and analyze marine data for improving navigation safety and operational efficiency.",
      "Built a system to track and analyze maritime vessel data for monitoring and decision-making.",
      "Integrated data processing and visualization to provide insights into marine operations and logistics."
    ],
    techStack: ["Python", "Data Analysis", "APIs", "GIS", "Visualization", "Pandas"],
    image: "https://images.unsplash.com/photo-1475776408506-9a5371e7a068?q=80&w=1400&auto=format&fit=crop",
    fullDetails: {
      intro: "Developed a maritime intelligence system to monitor vessel movements, analyze marine data, and improve operational efficiency.",
      overview: "The system uses location and maritime data flows to track vessel movement, identify traffic patterns, and provide operational insights for safety and logistics.",
      features: [
        { title: "Vessel Tracking", description: "Tracks ship movement in near real time using location-based data such as GPS/AIS feeds." },
        { title: "Data Analysis & Insights", description: "Analyzes traffic patterns and route efficiency to support decision-making." },
        { title: "Maritime Monitoring", description: "Helps detect congestion and irregular movement patterns for safer operations." },
        { title: "Visualization Dashboard", description: "Provides maps, charts, and analytics views with periodic updates." },
        { title: "Scalable System Design", description: "Supports API/data-feed integration and extensibility for logistics/security use cases." }
      ],
      systemArchitecture: "Maritime Data Input (AIS / GPS / API) → Data Processing & Cleaning → Analysis & Pattern Detection → Visualization (Dashboard / Map) → Insights (Tracking / Monitoring)",
      techStackDetails: [
        { category: "Languages & Core", items: ["Python", "Pandas"] },
        { category: "Concepts", items: ["Geospatial Analysis", "Real-Time Systems", "Data Visualization"] },
        { category: "Integrations", items: ["APIs", "GIS / Mapping"] }
      ],
      challenges: [
        "Handling real-time maritime data streams.",
        "Visualizing geospatial information clearly.",
        "Maintaining tracking accuracy at scale."
      ],
      learnings: [
        "Geospatial data processing patterns.",
        "Design of real-time analytics systems.",
        "Industry-style monitoring architecture."
      ],
      outcome: "Built a maritime monitoring solution that tracks vessels, surfaces operational insights, and demonstrates real-world system design."
    }
  },
  {
    id: "proj20",
    title: "Construction Pulse – Smart Construction Management System",
    subtitle: "Digital platform for managing construction workflows, tasks, and worker coordination",
    description: [
      "Developed a system to streamline construction site operations by managing tasks, documents, and communication between workers and managers.",
      "Built a centralized platform to manage construction workflows, worker data, and project tasks.",
      "Designed a system to improve communication, document handling, and operational efficiency on construction sites."
    ],
    techStack: ["JavaScript", "Node.js", "Express", "MongoDB", "HTML", "CSS"],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1400&auto=format&fit=crop",
    fullDetails: {
      intro: "Developed a construction management platform to digitize and streamline operations on construction sites.",
      overview: "The system enables workers and managers to track tasks, manage documents, and communicate through a centralized interface.",
      features: [
        { title: "Task & Workflow Management", description: "Assigns and tracks tasks, monitors progress, and improves team coordination." },
        { title: "Worker Management", description: "Stores worker data, tracks attendance/activity, and manages roles/responsibilities." },
        { title: "Document Handling", description: "Supports upload and management of certifications, reports, and site documents in one place." },
        { title: "Communication System", description: "Improves interactions between workers and supervisors to reduce delays and confusion." },
        { title: "Full Stack Architecture", description: "Built with HTML/CSS/JS frontend, Node.js/Express backend, and MongoDB storage." }
      ],
      systemArchitecture: "User (Worker / Manager) → Frontend Interface (Dashboard) → API Requests → Backend Server (Node.js / Express) → Database (MongoDB) → Response (Tasks / Data / Updates)",
      techStackDetails: [
        { category: "Frontend", items: ["HTML", "CSS", "JavaScript"] },
        { category: "Backend", items: ["Node.js", "Express"] },
        { category: "Database", items: ["MongoDB"] }
      ],
      challenges: [
        "Managing real-time data updates across users.",
        "Designing scalable backend services for site workflows.",
        "Handling multi-role permissions and access."
      ],
      learnings: [
        "Full-stack product development for operations workflows.",
        "Designing workflow-centric platforms.",
        "Building practical systems for real-world domain needs."
      ],
      outcome: "Built a practical construction management system that improves operational efficiency, centralizes project data, and demonstrates real-world software value."
    }
  },
  {
    id: "proj21",
    title: "Rainwater Harvesting & Groundwater Recharge System",
    subtitle: "Sustainable water management system for rainwater collection and groundwater recharge analysis",
    description: [
      "Developed a system to analyze rainwater harvesting potential and optimize storage and groundwater recharge using rainfall and catchment data.",
      "Built a model to estimate rainwater collection and optimize tank storage capacity based on rainfall and catchment area.",
      "Analyzed groundwater recharge potential and water demand to support sustainable resource management."
    ],
    techStack: ["Python", "Data Analysis", "Simulation", "GIS / Mapping", "NumPy", "Pandas"],
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1400&auto=format&fit=crop",
    fullDetails: {
      intro: "Developed a data-driven water management system to assess rainwater harvesting potential and groundwater recharge efficiency.",
      overview: "The system simulates how rainwater can be collected, stored, and reused to improve sustainability and reduce pressure on traditional water sources.",
      features: [
        { title: "Rainwater Collection Modeling", description: "Estimates harvestable water volume based on rainfall and catchment area inputs." },
        { title: "Tank Storage Optimization", description: "Determines optimal tank sizing and storage efficiency while reducing overflow/wastage." },
        { title: "Groundwater Recharge Analysis", description: "Evaluates recharge potential and support for long-term water table improvement." },
        { title: "Data Analysis & Simulation", description: "Runs scenario-based simulations to support planning and policy decisions." },
        { title: "Real-World Application", description: "Applicable to urban planning, smart city programs, rural conservation, and agriculture." }
      ],
      systemArchitecture: "Rainfall Data Input → Catchment Area Calculation → Water Collection Estimation → Tank Storage Optimization → Groundwater Recharge Model → Output (Water Availability & Efficiency)",
      techStackDetails: [
        { category: "Languages & Core", items: ["Python", "NumPy", "Pandas"] },
        { category: "Concepts", items: ["Simulation Modeling", "Environmental Analytics", "Resource Optimization"] },
        { category: "Domain", items: ["GIS / Mapping", "Water Sustainability"] }
      ],
      challenges: [
        "Handling variable and seasonal rainfall patterns.",
        "Estimating catchment parameters accurately.",
        "Balancing storage decisions against demand variability."
      ],
      learnings: [
        "Environmental data analysis approaches.",
        "Simulation-based planning techniques.",
        "Applying software and analytics beyond traditional ML-only use cases."
      ],
      outcome: "Built a sustainable water management solution that optimizes rainwater usage, supports groundwater recharge, and demonstrates tangible social impact."
    }
  },
  {
    id: "proj22",
    title: "Diamond Price Prediction System (Web App)",
    subtitle: "End-to-end ML web application for predicting diamond prices",
    description: [
      "Developed a machine learning-based web application that predicts diamond prices based on features like carat, cut, clarity, and color using regression models.",
      "Built a complete ML pipeline from data preprocessing to model deployment using regression techniques.",
      "Developed a web interface where users input diamond attributes and receive real-time price predictions."
    ],
    techStack: ["Python", "Scikit-learn", "Flask", "HTML", "CSS", "Pandas", "NumPy"],
    image: "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?q=80&w=1400&auto=format&fit=crop",
    fullDetails: {
      intro: "Developed an end-to-end machine learning web application to predict diamond prices based on physical and quality attributes.",
      overview: "The system takes user inputs such as carat, cut, color, and clarity, processes features, and predicts price through trained regression models.",
      features: [
        { title: "Regression-Based Price Prediction", description: "Implemented Linear Regression, Ridge/Lasso, and tree-based approaches for continuous price estimation." },
        { title: "Feature Engineering", description: "Worked on influential pricing features including carat, cut quality, color, and clarity." },
        { title: "Data Preprocessing", description: "Handled missing data, encoded categorical inputs, and applied feature scaling." },
        { title: "Web Application Interface", description: "Built a simple input form with instant prediction output using Flask-backed inference." },
        { title: "End-to-End Pipeline", description: "Integrated preprocessing, model inference, and UI into a deployable workflow." }
      ],
      systemArchitecture: "User Input (Diamond Features) → Data Preprocessing → Feature Engineering → Model Prediction (Regression) → Output (Predicted Price) → Web Interface (Flask)",
      techStackDetails: [
        { category: "Languages & Core", items: ["Python", "Pandas", "NumPy"] },
        { category: "Machine Learning", items: ["Scikit-learn", "Regression Models"] },
        { category: "Backend", items: ["Flask"] },
        { category: "Frontend", items: ["HTML", "CSS"] }
      ],
      challenges: [
        "Handling categorical features such as cut, color, and clarity.",
        "Improving regression performance and generalization.",
        "Integrating model inference smoothly with web UI."
      ],
      learnings: [
        "End-to-end ML product lifecycle implementation.",
        "Model deployment using Flask.",
        "Applied feature engineering for regression systems."
      ],
      outcome: "Built a production-style ML application that predicts diamond prices in real time and demonstrates complete ML-to-web integration."
    }
  },
  {
    id: "proj23",
    title: "PDF Explainer AI Chatbot",
    subtitle: "AI chatbot for interacting with and understanding PDF documents",
    description: [
      "Developed an AI-powered chatbot that allows users to upload PDF documents and ask questions, generating contextual answers and summaries.",
      "Built document parsing, embedding generation, and retrieval-based question-answering workflows.",
      "Implemented contextual retrieval with vector search and LLM response generation in a chat-style UI."
    ],
    techStack: ["Python", "NLP", "LLM", "LangChain", "Streamlit", "FAISS / Vector DB"],
    image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=1400&auto=format&fit=crop",
    fullDetails: {
      intro: "Developed an AI-powered document understanding system that enables users to interact with PDF files through natural language queries.",
      overview: "The application follows a retrieval-augmented generation (RAG) pipeline to extract relevant content from uploaded PDFs and generate contextual answers.",
      features: [
        { title: "Chat with PDF", description: "Allows users to upload PDF files and ask questions in natural language." },
        { title: "Document Processing", description: "Extracts PDF text, performs chunking, and prepares content for embedding workflows." },
        { title: "Embedding & Retrieval (RAG)", description: "Converts chunks into embeddings, stores them in FAISS, and retrieves relevant context." },
        { title: "AI Response Generation", description: "Uses LLM inference for context-aware answers and summaries." },
        { title: "Interactive Interface", description: "Provides a Streamlit/web chat interface with fast response rendering." }
      ],
      systemArchitecture: "PDF Upload → Text Extraction → Chunking & Preprocessing → Embedding Generation → Vector Database (FAISS) → User Query → Relevant Chunk Retrieval → LLM Response Generation → Chat Interface Output",
      techStackDetails: [
        { category: "Languages & Core", items: ["Python"] },
        { category: "AI / NLP", items: ["LLM", "LangChain", "FAISS"] },
        { category: "Frontend", items: ["Streamlit"] }
      ],
      challenges: [
        "Handling large PDF documents efficiently.",
        "Improving retrieval precision for better answer quality.",
        "Managing context windows for accurate responses."
      ],
      learnings: [
        "Practical RAG pipeline implementation.",
        "NLP workflows for long-document processing.",
        "Designing AI-assisted chat systems for real-world utility."
      ],
      outcome: "Built a smart document assistant that extracts knowledge from PDFs, answers questions quickly, and demonstrates practical AI application."
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
    title: "Second Runner-Up — Igniters Tank Competition",
    description: "Engineered a tech-driven solution for an impact challenge."
  },
  {
    title: "Top 12 National Finalist — LaunchX",
    description: "National Business Summit, Jadavpur University."
  },
  {
    title: "Cloud & DevOps Associate — Ignite X Club",
    description: "Focused on cloud, containerization, and CI/CD basics."
  },
  {
    title: "Finalist — Innovate for Impact (Loreto College)",
    description: "Designed a sustainable, tech-enabled cloud kitchen business model."
  },
  {
    title: "Marketing Team Member — HackInverse",
    description: "Contributed to East India’s first theme-based hackathon."
  },
  {
    title: "Finalist — Market Maelstrom (ECONOVISION’25)",
    description: "Presented a sustainability-focused market strategy case study."
  }
];
