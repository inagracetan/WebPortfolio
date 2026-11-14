import type { Project } from './types'

import cpaleLogo from '@/assets/cpale.png'
import musuantrackLogo from '@/assets/musuantrack.png'
import cmufasLogo from '@/assets/cmufas.png'
import cityagriLogo from '@/assets/cityagri.png'
import cpalePreview from '@/assets/cpale-preview.jpg'
import musuantrackPreview from '@/assets/musuantrack-preview.jpg'

export const projectsData: Project[] = [
  // ── 1. CPALE Tracker ────────────────────────────────────────────────────────
  {
    id: 'cpale-tracker',
    title: 'CPALE Tracker',
    subtitle: 'Responsive study management web application for CPALE examination preparation',
    category: 'Web & Personal',
    description:
      'Developed a responsive study management application designed to help aspiring Certified Public Accountants organize and monitor their CPALE examination preparation.',
    features: [
      'Developed features for syllabus coverage tracking, study planning, calendar management, and monthly assessment and preboard monitoring.',
      'Implemented progress dashboards with subject coverage percentages, study time tracking, and visual progress analytics.',
      'Integrated Excel workbook import and export functionality for efficient study data management.',
      'Designed responsive user interfaces for mobile and desktop devices, including light and dark themes.',
      'Implemented scheduling, deadline management, and study progress tracking to improve organization and usability.',
    ],
    metrics: 'Personal Project',
    role: 'Developer',
    logo: cpaleLogo,
    previewScreenshot: cpalePreview,
    techStack: ['TypeScript', 'React', 'Expo', 'Supabase', 'Vercel'],
    techStackGrouped: [
      { category: 'Languages', items: ['TypeScript', 'JavaScript'] },
      { category: 'Frontend', items: ['React 19', 'React Native', 'React Native Web'] },
      { category: 'Framework & Platform', items: ['Expo SDK 58', 'Expo Router'] },
      { category: 'Backend & Database', items: ['Supabase'] },
      { category: 'Data Management', items: ['AsyncStorage', 'XLSX', 'Zod'] },
      { category: 'UI & Animations', items: ['Lucide React Native', 'React Native Reanimated'] },
      { category: 'Dev Tools', items: ['Visual Studio Code', 'ESLint', 'Vitest', 'Git', 'GitHub'] },
      { category: 'Deployment', items: ['Vercel', 'Expo Web'] },
    ],
    links: {
      github: 'https://github.com/inagracetan/cpaletracker',
      demo: 'https://cpaletracker.vercel.app/',
      external: undefined,
    },
    featured: true,
    locationId: 'pavilion-00',
    statusBadge: 'Personal Project // Live',
    isPersonalProject: true,
    documentationNotes:
      'Personal project — live production deployment available. Source code publicly accessible on GitHub. Built with React Native Web and Expo for cross-platform compatibility.',
  },

  // ── 2. MusuanTrack ───────────────────────────────────────────────────────────
  {
    id: 'musuantrack',
    title: 'MusuanTrack — Campus Navigation App',
    subtitle: 'Geolocation-based mobile campus navigation for Central Mindanao University',
    category: 'Mobile & Geolocation',
    description:
      'A native Android campus navigation application to guide students, faculty, and university visitors across the Central Mindanao University campus. Features GPS-based geolocation tracking, landmark wayfinding, and an interactive campus directory.',
    features: [
      'Geolocation-based campus positioning and route orientation',
      'Interactive directory of campus buildings, colleges, and university facilities',
      'Tailored mobile user interface designed for on-campus navigation',
      'Collaborative architecture built as main developer in a group project',
    ],
    metrics: 'Main Developer // Group Project',
    role: 'Main Developer (Group Project)',
    logo: musuantrackLogo,
    previewScreenshot: musuantrackPreview,
    techStack: ['Java', 'Android SDK', 'Google Maps', 'GPS / Location', 'Gradle'],
    links: {
      github: 'https://github.com/inagracetan/MusuanTrack',
      demo: 'https://musuantrack.vercel.app',
      external: undefined,
    },
    featured: true,
    locationId: 'pavilion-03',
    statusBadge: 'Group Project // Confirmed',
    documentationNotes:
      'Developed as a collaborative project. Repository and documentation access available for review upon request.',
  },

  // ── 3. CMUFAS ───────────────────────────────────────────────────────────────
  {
    id: 'cmu-faculty-appointment',
    title: 'CMU Faculty Availability and Appointment System',
    subtitle: 'Academic capstone project — cross-platform faculty appointment management',
    category: 'Mobile & Cloud',
    description:
      'Developed a cross-platform appointment management system using Flutter and Firebase, digitizing faculty scheduling and appointment requests at Central Mindanao University with real-time synchronization and authentication.',
    features: [
      'Developed a cross-platform appointment management system using Flutter and Firebase, digitizing faculty scheduling and appointment requests',
      'Implemented authentication and real-time database synchronization, improving data accessibility and system responsiveness',
      'Integrated scheduling and database management features, enhancing appointment organization and user experience',
      'Conducted system testing and interface refinement adhering to academic institutional guidelines',
    ],
    metrics: 'Academic Capstone Project',
    role: 'Capstone Developer',
    logo: cmufasLogo,
    techStack: ['Flutter', 'Dart', 'Firebase Firestore', 'Firebase Authentication', 'Cross-Platform Mobile'],
    links: {
      github: 'https://github.com/inagracetan/CMUFAS',
      demo: undefined,
      external: undefined,
    },
    featured: true,
    locationId: 'pavilion-02',
    statusBadge: 'Academic Capstone',
    isCapstone: true,
    documentationNotes: 'Directly featured on authoritative resume as primary capstone project.',
  },

  // ── 4. City Agriculture Admin ────────────────────────────────────────────────
  {
    id: 'city-agriculture-procurement',
    title: 'City Agriculture Admin Procurement Monitoring System',
    subtitle: 'Administrative procurement monitoring, database tracking, and reporting system',
    category: 'Enterprise & Systems',
    description:
      'Designed and developed an administrative procurement monitoring system for the City Agriculture Office, improving the tracking of procurement records, managing database records, and providing reporting features and user support.',
    features: [
      'Designed and developed an administrative procurement monitoring system, improving the tracking of procurement records',
      'Managed database records and system updates, ensuring accurate and reliable information',
      'Implemented reporting features, reducing manual monitoring and improving record accessibility',
      'Resolved system issues and provided user support, enhancing system reliability and usability',
    ],
    metrics: 'Developer // City Agriculture Office Project',
    role: 'Developer',
    logo: cityagriLogo,
    techStack: ['Flutter', 'Dart', 'Firebase Firestore', 'Firebase Auth', 'Cloud Functions'],
    links: {
      github: 'https://github.com/inagracetan/cityagriadmin',
      demo: undefined,
      external: undefined,
    },
    featured: true,
    locationId: 'pavilion-01',
    statusBadge: 'Verified Project // Original CV',
    documentationNotes:
      'Directly featured on authoritative resume. Demonstrates full-cycle administrative software and database implementation.',
  },

  // ── 5. Security Risk Management ─────────────────────────────────────────────
  {
    id: 'security-risk-management',
    title: 'Security Risk Management Analysis',
    subtitle: 'Academic cybersecurity project analyzing system vulnerabilities and mitigation controls',
    category: 'Cybersecurity & Auditing',
    description:
      'An in-depth academic cybersecurity project evaluating organizational information security posture. Identifies critical asset vulnerabilities, evaluates potential threat vectors, and outlines risk treatment frameworks and defensive controls.',
    features: [
      'Comprehensive threat modeling and asset vulnerability identification',
      'Qualitative risk impact analysis and risk prioritization matrix',
      'Defensive mitigation frameworks and administrative/technical control recommendations',
      'Security policy alignment adhering to standard risk management methodologies',
    ],
    metrics: 'Academic Cybersecurity Analysis',
    role: 'Cybersecurity Analyst & Researcher (Academic Project)',
    techStack: ['Security Risk Assessment', 'Threat Modeling', 'Network Security', 'Vulnerability Analysis', 'Technical Documentation'],
    links: {
      github: undefined,
      demo: undefined,
      external: undefined,
    },
    featured: true,
    locationId: 'pavilion-04',
    statusBadge: 'Academic Cybersecurity',
    isDocumentationOnly: true,
    documentationNotes:
      'Comprehensive risk assessment and defensive control report completed within the Data Networking and cybersecurity curriculum.',
  },

  // ── 6. Automated Payroll & HR ────────────────────────────────────────────────
  {
    id: 'automated-payroll-hr-ec-mabao',
    title: 'Automated Payroll & HR System for EC Mabao Corporation',
    subtitle: 'Group system analysis and technical documentation for enterprise workforce management',
    category: 'Systems & Enterprise',
    description:
      'A collaborative enterprise systems project for EC Mabao Corporation. Focused on system analysis, process modeling, database design, and end-to-end technical documentation for automated payroll calculation and human resource record management.',
    features: [
      'Verified system analysis and requirements specification for employee payroll workflows',
      'Business process flowcharts and data flow diagrams (DFDs) for HR operations',
      'Database schema modeling for employee profiles, timekeeping, and compensation records',
      'Collaborative delivery of comprehensive technical system documentation',
    ],
    metrics: 'Group System Analysis Project',
    role: 'System Analyst & Technical Documentation (Group Project)',
    techStack: ['System Analysis & Design', 'Technical Documentation', 'Workflow Modeling', 'Database Schema Design', 'HR & Payroll Workflows'],
    links: {
      github: undefined,
      demo: undefined,
      external: undefined,
    },
    featured: true,
    locationId: 'pavilion-05',
    statusBadge: 'Group Project // Systems Analysis',
    isDocumentationOnly: true,
    documentationNotes:
      'Verified documentation and system analysis contributions completed as part of enterprise systems coursework.',
  },
]
