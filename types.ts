
export interface Project {
  id: string;
  title: string;
  description: string[];
  techStack: string[];
  image: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  location: string;
  bullets: string[];
}

export interface SkillCategory {
  name: string;
  skills: { name: string; icon?: string }[];
}

export interface Certification {
  name: string;
  issuer?: string;
}
