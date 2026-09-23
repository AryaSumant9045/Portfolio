/**
 * Single source of truth for every piece of site content.
 * Components stay presentational; content edits happen here only.
 */

export const profile = {
  name: "Sumant Saini",
  firstName: "Sumant",
  lastName: "Saini",
  title: "Data Science & AI @ IIT Guwahati",
  institution: "Indian Institute of Technology Guwahati",
  programme: "BSc (Hons) — Data Science & Artificial Intelligence",
  period: "2024 — Present",
  email: "s.sumant@op.iitg.ac.in",
  location: "Guwahati, India",
  tagline: "I build retrieval systems and deep learning models that survive contact with real users.",
  intro: [
    "Data Science & AI undergraduate at IIT Guwahati, working at the intersection of retrieval systems, deep learning, and shippable machine learning products.",
    "Most of my work starts with messy, real data — 20 hours of lecture audio, 2,500 leaf photographs, a few million box-office records — and ends with something a person can actually open and use.",
  ],
  focus: ["RAG systems", "Deep learning", "Full-stack ML products"],
  stats: [
    { value: "4", label: "Shipped projects" },
    { value: "20+", label: "Hours of audio indexed" },
    { value: "2.5K", label: "Images trained on" },
    { value: "2024", label: "Joined IIT Guwahati" },
  ],
} as const;

export type SkillGroup = {
  title: string;
  caption: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages & Data",
    caption: "The base layer",
    skills: ["Python", "SQL"],
  },
  {
    title: "Machine Learning",
    caption: "Modelling & retrieval",
    skills: ["Machine Learning", "Deep Learning", "NLP", "RAG"],
  },
  {
    title: "Frameworks & Tooling",
    caption: "Build & ship",
    skills: [
      "PyTorch",
      "TensorFlow",
      "Hugging Face",
      "Pandas",
      "NumPy",
      "FastAPI",
      "Streamlit",
      "Git",
    ],
  },
  {
    title: "Practice & Infra",
    caption: "Making it hold up",
    skills: ["Model Evaluation", "Feature Engineering", "EDA", "AWS EC2"],
  },
];

/** Two concentric rings for the desktop constellation. */
export const orbitInner = [
  "Python",
  "PyTorch",
  "NLP",
  "RAG",
  "Pandas",
  "FastAPI",
  "Hugging Face",
  "SQL",
];

export const orbitOuter = [
  "Deep Learning",
  "TensorFlow",
  "NumPy",
  "Streamlit",
  "Model Evaluation",
  "Feature Engineering",
  "EDA",
  "AWS EC2",
  "Git",
  "Machine Learning",
];

export type Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  summary: string;
  detail: string;
  highlights: string[];
  tags: string[];
  stack: string;
  accent: "brand" | "aqua";
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: "rag-chatbot",
    index: "01",
    title: "Domain-Specific RAG Chatbot",
    category: "Retrieval-Augmented Generation",
    summary:
      "Ask questions across 20+ hours of YouTube lecture transcripts and get answers grounded in the actual lecture, not the model's memory.",
    detail:
      "The pipeline pulls audio with FFmpeg, transcribes it with Whisper, chunks and embeds the transcript, then retrieves the top-5 semantically closest passages per query. The LLM is constrained to answer only from retrieved context, which is what cuts hallucination down — the model is told what it does not know.",
    highlights: [
      "FFmpeg + Whisper ingestion across 20+ hours of lecture audio",
      "Top-5 semantic retrieval over a chunked, embedded transcript index",
      "Grounded generation prompt that suppresses unsupported answers",
      "Streamlit interface with source passages surfaced per answer",
    ],
    tags: ["RAG", "Whisper", "Embeddings", "Streamlit", "NLP"],
    stack: "Python · Whisper · FFmpeg · Vector retrieval · Streamlit",
    accent: "brand",
    links: [
      { label: "GitHub", href: "https://github.com/AryaSumant9045" },
      { label: "Live demo", href: "#projects" },
    ],
  },
  {
    id: "potato-leaf",
    index: "02",
    title: "Potato Leaf Disease Detection",
    category: "Convolutional Neural Network",
    summary:
      "A CNN trained on 2,500 leaf images that classifies disease from a photograph, served behind a versioned FastAPI inference endpoint.",
    detail:
      "The classes were heavily imbalanced, so training used augmentation and rebalanced sampling rather than raw accuracy as the target metric. The model is wrapped in a FastAPI service with explicit model versioning, so a new checkpoint can ship without invalidating what is already serving.",
    highlights: [
      "2,500-image dataset with augmentation and imbalance handling",
      "Evaluation driven by per-class precision/recall, not headline accuracy",
      "FastAPI inference service with versioned model artifacts",
      "Photograph-in, prediction-out inference path",
    ],
    tags: ["CNN", "Deep Learning", "FastAPI", "Augmentation", "Computer Vision"],
    stack: "Python · PyTorch · FastAPI · Model versioning",
    accent: "aqua",
    links: [
      { label: "GitHub", href: "https://github.com/AryaSumant9045" },
      { label: "API docs", href: "#projects" },
    ],
  },
  {
    id: "movie-predictor",
    index: "03",
    title: "Movie Hit / Flop Predictor",
    category: "Supervised Learning",
    summary:
      "A Random Forest over a multi-million-record dataset that predicts commercial outcome, built on a full exploratory analysis rather than a blind model fit.",
    detail:
      "The interesting part was never the model — it was the EDA and feature engineering that decided which signals were worth keeping. Candidates were compared on precision, recall, F1, and ROC-AUC, because accuracy hides exactly the failure mode that matters here.",
    highlights: [
      "Multi-million-record dataset cleaned and explored end to end",
      "Feature engineering and selection driven by EDA findings",
      "Random Forest benchmarked on precision / recall / F1 / ROC-AUC",
      "Streamlit deployment for interactive prediction",
    ],
    tags: ["Random Forest", "EDA", "Feature Engineering", "Model Evaluation", "Streamlit"],
    stack: "Python · scikit-learn · Pandas · Streamlit",
    accent: "brand",
    links: [
      { label: "GitHub", href: "https://github.com/AryaSumant9045" },
      { label: "Live demo", href: "#projects" },
    ],
  },
  {
    id: "getmechai",
    index: "04",
    title: "GetMeChai",
    category: "Full-Stack Product",
    summary:
      "A production Next.js application with GitHub OAuth and Razorpay payments — the project that made me care about everything downstream of the model.",
    detail:
      "Authentication with GitHub OAuth, payment capture through Razorpay, and a Next.js front end. Building it end to end is why I treat deployment, auth, and payments as part of the model's problem rather than someone else's.",
    highlights: [
      "Next.js application with a real, deployed user flow",
      "GitHub OAuth authentication",
      "Razorpay payment integration",
      "End-to-end ownership: UI, auth, payments, deployment",
    ],
    tags: ["Next.js", "TypeScript", "OAuth", "Razorpay", "Full-Stack"],
    stack: "Next.js · TypeScript · GitHub OAuth · Razorpay",
    accent: "aqua",
    links: [
      { label: "GitHub", href: "https://github.com/AryaSumant9045" },
      { label: "Live site", href: "#projects" },
    ],
  },
];

export const achievements = [
  {
    title: "Kaggle Competitions",
    meta: "Ongoing",
    detail:
      "Competing on live leaderboards — the fastest feedback loop available for feature engineering, validation strategy, and honest model evaluation.",
  },
  {
    title: "Regional-Level Yoga Competitor",
    meta: "Regional",
    detail:
      "Competed at regional level. Sustained practice and composure under pressure translate surprisingly well to long training runs and worse leaderboards.",
  },
] as const;

export const socials = [
  {
    label: "Email",
    value: "s.sumant@op.iitg.ac.in",
    href: "mailto:s.sumant@op.iitg.ac.in",
  },
  {
    label: "GitHub",
    value: "github.com/AryaSumant9045",
    href: "https://github.com/AryaSumant9045",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/a-sumant-07a285316",
    href: "https://www.linkedin.com/in/a-sumant-07a285316/",
  },
] as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;
