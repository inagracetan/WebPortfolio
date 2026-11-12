export type CertificationCategory =
  | 'Cybersecurity'
  | 'Networking'
  | 'Technical Support'
  | 'Cloud Computing'
  | 'Programming'
  | 'General IT'

export interface CertificationItem {
  id: string
  title: string
  issuer: string
  issueDate: string
  category: CertificationCategory
  credentialId: string
  verificationUrl: string
  type: 'credly'
  credlyBadgeId: string
  badgeImageUrl: string
  width: number
  height: number
  description: string
  skillsCovered: string[]
}

export interface AcademicTrainingItem {
  id: string
  title: string
  provider: string
  institution: string
  completionNote: string
  description: string
  skillsCovered: string[]
}

/**
 * STRICT REQUIREMENT:
 * Only the three authentic, official Cisco Credly badges are included here.
 * AWS Academy courses are strictly classified as academic training / coursework,
 * not professional certifications.
 */
export const certificationsData: CertificationItem[] = [
  {
    id: 'cisco-intro-cybersecurity',
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco',
    issueDate: 'Verified Credential',
    category: 'Cybersecurity',
    credentialId: 'e8ec67d0-dccb-40a5-abe6-80508f090357',
    verificationUrl: 'https://www.credly.com/badges/e8ec67d0-dccb-40a5-abe6-80508f090357',
    type: 'credly',
    credlyBadgeId: 'e8ec67d0-dccb-40a5-abe6-80508f090357',
    badgeImageUrl: 'https://images.credly.com/images/af8c6b4e-fc31-47c4-8dcb-eb7a2065dc5b/I2CS__1_.png',
    width: 150,
    height: 270,
    description: 'Demonstrates foundational knowledge of cybersecurity principles, global threat landscapes, cyber defense technologies, and data confidentiality.',
    skillsCovered: ['Cybersecurity', 'Threat Analysis', 'Network Vulnerabilities', 'Security Ethics'],
  },
  {
    id: 'cisco-it-customer-support',
    title: 'IT Customer Support Basics',
    issuer: 'Cisco',
    issueDate: 'Verified Credential',
    category: 'Technical Support',
    credentialId: '4432b001-1021-4a74-bcbe-13994156f7fa',
    verificationUrl: 'https://www.credly.com/badges/4432b001-1021-4a74-bcbe-13994156f7fa',
    type: 'credly',
    credlyBadgeId: '4432b001-1021-4a74-bcbe-13994156f7fa',
    badgeImageUrl: 'https://images.credly.com/images/474a03c6-b5e1-44df-b313-adf0fed6c531/blob',
    width: 150,
    height: 270,
    description: 'Verifies core competencies in IT helpdesk support, ticket workflows, hardware diagnostics, effective communication, and problem escalation.',
    skillsCovered: ['Technical Support', 'Troubleshooting', 'Customer Service', 'Documentation'],
  },
  {
    id: 'cisco-junior-cybersecurity-analyst',
    title: 'Junior Cybersecurity Analyst Career Path',
    issuer: 'Cisco',
    issueDate: 'Verified Credential',
    category: 'Cybersecurity',
    credentialId: '1bcf100a-5261-49d2-9213-e9be7cea8d9c',
    verificationUrl: 'https://www.credly.com/badges/1bcf100a-5261-49d2-9213-e9be7cea8d9c',
    type: 'credly',
    credlyBadgeId: '1bcf100a-5261-49d2-9213-e9be7cea8d9c',
    badgeImageUrl: 'https://images.credly.com/images/441578ec-c0f3-46cc-95fc-86b27e90cf4f/image.png',
    width: 150,
    height: 270,
    description: 'In-depth career pathway credential covering threat intelligence, network monitoring, security operations, endpoint defense, and incident remediation.',
    skillsCovered: ['Security Operations', 'Threat Intelligence', 'Incident Response', 'Packet Analysis'],
  },
]

/**
 * Completed Academic Training & University Coursework
 * (Taught in partnership with AWS Academy at Central Mindanao University)
 */
export const academicTrainingData: AcademicTrainingItem[] = [
  {
    id: 'aws-cloud-foundations',
    title: 'AWS Academy Cloud Foundations',
    provider: 'AWS Academy',
    institution: 'Central Mindanao University',
    completionNote: 'Completed Academic Coursework',
    description: 'Comprehensive academic coursework covering AWS core compute (Amazon EC2), storage solutions (Amazon S3), virtual private cloud networking (Amazon VPC), cloud economics, and infrastructure architecture.',
    skillsCovered: ['Cloud Computing', 'Amazon EC2', 'Amazon S3', 'Amazon VPC', 'Cloud Architecture'],
  },
  {
    id: 'aws-cloud-security',
    title: 'AWS Academy Cloud Security',
    provider: 'AWS Academy',
    institution: 'Central Mindanao University',
    completionNote: 'Completed Academic Coursework',
    description: 'Practical training on the AWS Shared Responsibility Model, Identity and Access Management (IAM), data encryption at rest and in transit, and security compliance auditing.',
    skillsCovered: ['Cloud Security', 'AWS IAM', 'Data Encryption', 'Compliance Auditing', 'Access Governance'],
  },
]

export const CATEGORY_GRADIENTS: Record<CertificationCategory, {
  bg: string
  border: string
  badgeBg: string
  badgeText: string
  accent: string
}> = {
  Cybersecurity: {
    bg: 'from-emerald-950/40 via-deep-navy-card/80 to-green-950/30',
    border: 'border-emerald-500/30 hover:border-emerald-400/60',
    badgeBg: 'bg-emerald-500/15',
    badgeText: 'text-emerald-400',
    accent: '#10b981',
  },
  Networking: {
    bg: 'from-cyan-950/40 via-deep-navy-card/80 to-blue-950/30',
    border: 'border-cyan-500/30 hover:border-cyan-400/60',
    badgeBg: 'bg-cyan-500/15',
    badgeText: 'text-cyan-400',
    accent: '#00f0ff',
  },
  'Technical Support': {
    bg: 'from-blue-950/40 via-deep-navy-card/80 to-violet-950/30',
    border: 'border-blue-500/30 hover:border-blue-400/60',
    badgeBg: 'bg-blue-500/15',
    badgeText: 'text-blue-400',
    accent: '#3b82f6',
  },
  'Cloud Computing': {
    bg: 'from-purple-950/40 via-deep-navy-card/80 to-indigo-950/30',
    border: 'border-purple-500/30 hover:border-purple-400/60',
    badgeBg: 'bg-purple-500/15',
    badgeText: 'text-purple-400',
    accent: '#a855f7',
  },
  Programming: {
    bg: 'from-teal-950/40 via-deep-navy-card/80 to-cyan-950/30',
    border: 'border-teal-500/30 hover:border-teal-400/60',
    badgeBg: 'bg-teal-500/15',
    badgeText: 'text-teal-400',
    accent: '#14b8a6',
  },
  'General IT': {
    bg: 'from-blue-950/40 via-deep-navy-card/80 to-slate-900/30',
    border: 'border-slate-500/30 hover:border-slate-400/60',
    badgeBg: 'bg-slate-500/15',
    badgeText: 'text-slate-300',
    accent: '#64748b',
  },
}
