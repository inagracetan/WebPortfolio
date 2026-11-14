import type { EducationItem, SeminarTrainingItem } from './types'
import avalCert from '@/assets/aval.png'
import certImg from '@/assets/cert.jpg'

export const educationData: EducationItem[] = [
  {
    id: 'cmu-bsit-networking',
    degree: 'Bachelor of Science in Information Technology',
    institution: 'Central Mindanao University',
    period: 'July 2026',
    location: 'Musuan, Maramag, Bukidnon, Philippines',
    specialization: 'Major in Data Networking',
    type: 'DEGREE',
    details: [
      'Major in Data Networking: network design, switching, IP addressing, DHCP, VLAN configuration, and Active Directory.',
      'Developed City Agriculture Admin Procurement Monitoring System and CMU Faculty Availability and Appointment System (Capstone).',
      'Coursework and practical foundations across Database Management, System Administration, and Technical Support.',
    ],
    clarificationNote: 'Confirmed academic degree track at Central Mindanao University (July 2026).',
  },
  {
    id: 'aws-academy-cloud-foundations',
    degree: 'AWS Academy Cloud Coursework',
    institution: 'AWS Academy / Central Mindanao University',
    period: 'Academic Coursework Completed',
    location: 'Central Mindanao University',
    specialization: 'Cloud Infrastructure & Core Services',
    type: 'COURSEWORK',
    details: [
      'Completed comprehensive AWS Academy cloud modules covering compute (Amazon EC2), object storage (Amazon S3), and virtual networking (Amazon VPC).',
      'Studied cloud architecture fundamentals, cloud economics, high availability concepts, and managed database services.',
      'Completed hands-on laboratory exercises configured through the official AWS Academy learning platform.',
    ],
    clarificationNote: 'Note: Completed as official academic coursework within the university curriculum; not a commercial vendor certification.',
  },
  {
    id: 'aws-academy-cloud-security',
    degree: 'AWS Academy Cloud Security Coursework',
    institution: 'AWS Academy / Central Mindanao University',
    period: 'Academic Coursework Completed',
    location: 'Central Mindanao University',
    specialization: 'Cloud Security & Governance',
    type: 'COURSEWORK',
    details: [
      'Studied cloud security compliance models, shared responsibility framework, and defensive architectural patterns.',
      'Hands-on laboratory training in AWS Identity and Access Management (IAM) policies, roles, and least-privilege access controls.',
      'Explored cloud data encryption (at rest and in transit), audit logging with AWS CloudTrail, and cloud monitoring.',
    ],
    clarificationNote: 'Note: Completed as official academic coursework within the university curriculum; not a commercial vendor certification.',
  },
  {
    id: 'active-directory-fundamentals',
    degree: 'Active Directory Fundamentals & System Administration',
    institution: 'Central Mindanao University — IT Curriculum',
    period: 'Technical Coursework',
    location: 'Central Mindanao University',
    specialization: 'Directory Services & Administration',
    type: 'TECHNICAL_KNOWLEDGE',
    details: [
      'Foundational understanding of Active Directory Domain Services (AD DS), domain controllers, and hierarchical forest/domain structure.',
      'Knowledge of managing Organizational Units (OUs), creating and organizing user and group security accounts.',
      'Introduction to Group Policy Objects (GPOs) for centralized configuration and baseline security management.',
    ],
    clarificationNote: 'Foundational academic knowledge of directory services and system administration.',
  },
]

export const seminarsTrainingsData: SeminarTrainingItem[] = [
  {
    id: 'avalanche-team1',
    title: 'Avalanche Team1 University Connect',
    date: 'November 3, 2026',
    organizer: 'Central Mindanao University / Avalanche Team1',
    institution: 'Central Mindanao University',
    venue: 'Central Mindanao University, Bukidnon, Philippines',
    description:
      'A university-based learning and engagement activity providing academic and professional exposure through technology-related learning and industry perspectives.',
    recognition: 'Certificate of Attendance',
    details: [
      'Web3 & Blockchain Fundamentals',
      'Smart Contract Architecture',
      'Decentralized Application Ecosystems',
      'Industry & Academic Perspectives',
    ],
    certificateUrl: avalCert,
    hasCertificate: true,
  },
  {
    id: 'planting-seeds-excellence',
    title: 'Planting Seeds of Excellence: Customer Service for Agricultural Stakeholders (Seminar)',
    date: 'April 10, 2026',
    organizer: 'City Agriculture Office – LGU Malaybalay, Bukidnon',
    institution: 'City Agriculture Office – LGU Malaybalay',
    venue: 'Farmers Training Center, City Agriculture Office, Casisang, Malaybalay City, Bukidnon',
    description:
      'Participated in a seminar focused on strengthening the knowledge, skills, and commitment of participants in delivering quality and responsive customer service to farmers and other agricultural stakeholders, promoting service excellence and professionalism in public service within the agricultural sector.',
    recognition: 'Certificate of Participation',
    details: [
      'Quality and responsive customer service',
      'Effective assistance to farmers and agricultural stakeholders',
      'Professionalism and commitment in public service',
      'Service excellence within the agricultural sector',
    ],
    certificateUrl: certImg,
    hasCertificate: true,
  },
  {
    id: 'dost-sarai',
    title: 'DOST SARAI Training',
    date: 'March 13, 2026',
    organizer: 'Department of Science and Technology (DOST)',
    institution: 'Department of Science and Technology',
    venue: 'Department of Science and Technology',
    description:
      'A technical training focused on the use of the DOST Smarter Approaches to Reinvigorate Agriculture as an Industry (SARAI) system and Google Earth Engine, highlighting their relevance to agricultural information, geospatial data, and technology-assisted monitoring.',
    details: [
      'Introduction to the SARAI system',
      'Familiarization with Google Earth Engine',
      'Geospatial data and digital tools for agricultural monitoring',
    ],
    hasCertificate: false,
  },
  {
    id: 'cmu-it-seminars',
    title: 'Information Technology Seminars and Workshops',
    date: 'Academic Curriculum',
    organizer: 'Central Mindanao University',
    institution: 'Central Mindanao University',
    venue: 'Conducted by Central Mindanao University, Bukidnon',
    description:
      'A collection of IT-related seminars and workshops attended during my academic experience, supporting continuous learning and exposure to information technology concepts and professional practices.',
    details: [
      'Network Administration & Infrastructure',
      'Systems Maintenance & Tech Support',
      'Academic IT Workshops',
    ],
    hasCertificate: false,
  },
]
