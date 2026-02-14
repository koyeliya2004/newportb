
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
  // Fix: Added optional hasLogo property to the skill definition to allow logo metadata in constants
  skills: { name: string; icon?: string; hasLogo?: boolean }[];
}

export interface Certification {
  name: string;
  issuer?: string;
}
