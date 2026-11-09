import type { SkillGroup } from './types'

export const skillGroupsData: SkillGroup[] = [
  {
    id: 'programming-development',
    title: 'Programming & Development',
    description: 'Mobile application engineering in Flutter/Dart and foundational web development technologies.',
    icon: 'Code2',
    skills: [
      {
        name: 'Flutter',
        level: 78,
        highlight: true,
        tag: 'Mobile Framework',
        proficiencyLabel: 'Applied Project Experience',
      },
      {
        name: 'Dart',
        level: 75,
        highlight: true,
        tag: 'Programming Language',
        proficiencyLabel: 'Applied Project Experience',
      },
      {
        name: 'Web Development',
        level: 72,
        highlight: false,
        tag: 'HTML / CSS / JavaScript',
        proficiencyLabel: 'Fundamental to Intermediate',
      },
    ],
  },
  {
    id: 'database-backend',
    title: 'Database & Backend',
    description: 'Cloud database integration, real-time data synchronization, and authentication services.',
    icon: 'Database',
    skills: [
      {
        name: 'Firebase',
        level: 75,
        highlight: true,
        tag: 'Cloud Backend / Firestore',
        proficiencyLabel: 'Applied Project Experience',
      },
    ],
  },
  {
    id: 'networking-it',
    title: 'Networking & IT',
    description: 'Core IT infrastructure, network architecture specialization, maintenance, and directory services.',
    icon: 'Network',
    skills: [
      {
        name: 'Computer Networking',
        level: 82,
        highlight: true,
        tag: 'Specialization Core',
        proficiencyLabel: 'Major Field of Study',
      },
      {
        name: 'IT Support',
        level: 80,
        highlight: true,
        tag: 'Technical Assistance',
        proficiencyLabel: 'Practical Competency',
      },
      {
        name: 'System Maintenance',
        level: 76,
        highlight: false,
        tag: 'Troubleshooting & Maintenance',
        proficiencyLabel: 'Practical Competency',
      },
      {
        name: 'Active Directory Fundamentals',
        level: 70,
        highlight: false,
        tag: 'Windows Server / Directory Services',
        proficiencyLabel: 'Foundational Coursework',
      },
    ],
  },
  {
    id: 'cloud-security',
    title: 'Cloud & Security',
    description: 'Academic cloud computing fundamentals, cloud security controls, and risk management analysis.',
    icon: 'ShieldCheck',
    skills: [
      {
        name: 'AWS Academy Cloud Coursework',
        level: 76,
        highlight: true,
        tag: 'AWS Academy Curriculum',
        proficiencyLabel: 'Academic Coursework Completed',
      },
      {
        name: 'AWS Academy Cloud Security Coursework',
        level: 74,
        highlight: true,
        tag: 'AWS Academy Curriculum',
        proficiencyLabel: 'Academic Coursework Completed',
      },
      {
        name: 'Security Risk Management',
        level: 75,
        highlight: false,
        tag: 'Risk Analysis & Controls',
        proficiencyLabel: 'Academic Project & Assessment',
      },
    ],
  },
  {
    id: 'productivity-creative',
    title: 'Productivity & Creative Tools',
    description: 'Accurate data encoding, spreadsheet record organization, graphic design, and media editing.',
    icon: 'FileSpreadsheet',
    skills: [
      {
        name: 'Microsoft Excel',
        level: 86,
        highlight: true,
        tag: 'Spreadsheet Encoding / Formulas',
        proficiencyLabel: 'Verified Freelance Experience',
      },
      {
        name: 'Data Entry',
        level: 88,
        highlight: true,
        tag: 'Records & Information Management',
        proficiencyLabel: 'Verified Freelance Experience',
      },
      {
        name: 'Graphic Design',
        level: 70,
        highlight: false,
        tag: 'Visual & Layout Assets',
        proficiencyLabel: 'Practical Creative Tooling',
      },
      {
        name: 'Video Editing',
        level: 68,
        highlight: false,
        tag: 'Media Production',
        proficiencyLabel: 'Practical Creative Tooling',
      },
    ],
  },
]
