export interface TechStackGroup {
  category: string
  items: string[]
}

export interface Project {
  id: string
  title: string
  subtitle: string
  category: string
  description: string
  features: string[]
  metrics?: string
  role: string
  techStack: string[]
  techStackGrouped?: TechStackGroup[]
  links: {
    github?: string
    demo?: string
    external?: string
  }
  featured: boolean
  locationId: string
  previewImage?: string
  previewScreenshot?: string
  logo?: string
  statusBadge?: string
  isCapstone?: boolean
  isPersonalProject?: boolean
  isDocumentationOnly?: boolean
  documentationNotes?: string
}

export interface SkillItem {
  name: string
  level?: number
  highlight?: boolean
  tag?: string
  proficiencyLabel?: string
  logo?: string
  icon?: string
}

export interface SkillGroup {
  id: string
  title: string
  description: string
  icon: string
  gradient?: string
  skills: SkillItem[]
}

export interface ExperienceItem {
  id: string
  role: string
  organization: string
  period: string
  location: string
  summary: string
  responsibilities: string[]
  technologies: string[]
}

export interface EducationItem {
  id: string
  degree: string
  institution: string
  period: string
  location: string
  specialization?: string
  type: 'DEGREE' | 'COURSEWORK' | 'TECHNICAL_KNOWLEDGE'
  details: string[]
  clarificationNote?: string
}

export interface ContactInfo {
  name: string
  title: string
  degree: string
  specialization: string
  university: string
  location: string
  email: string
  phone: string
  phoneFormatted: string
  availability: string
  bio: string
  interests: string[]
  socialLinks: {
    platform: string
    url: string
    handle: string
    status?: string
  }[]
}

export interface SeminarTrainingItem {
  id: string
  title: string
  date: string
  venue: string
  organizer?: string
  institution?: string
  description?: string
  recognition?: string
  details?: string[]
  certificateUrl?: string
  hasCertificate?: boolean
}
