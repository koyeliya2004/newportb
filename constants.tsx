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
    image: "https://images.unsplash.com/photo-1579165466949-3180a3d056d1?q=80&w=1400&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1581090700227-1e8e8f7f0f16?q=80&w=1400&auto=format&fit=crop",
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
