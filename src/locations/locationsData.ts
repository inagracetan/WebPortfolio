import type { LocationWaypoint } from './types'

export const locationsData: LocationWaypoint[] = [
  {
    id: 'workspace',
    name: 'Personal Workspace',
    tagline: 'Creative Studio & Villa Hub',
    description: 'A cozy 2-story low-poly modern studio villa inspired by 3d.jpeg with an infinity pool, rooftop terrace, warm office, and cherry blossoms.',
    coordinates: [0, 0, 0],
    cameraOffset: [8.5, 7.5, 8.5],
    cameraTarget: [0, 1.2, 0],
    category: 'WORKSPACE',
    badge: 'LOC_01 // STUDIO',
    color: '#00f0ff', // electric-blue
    iconName: 'Home',
  },
  {
    id: 'projects',
    name: 'Project Lab',
    tagline: 'Interactive Engineering Showcase',
    description: 'An open-air technological pavilion featuring holographic project pedestals, live build terminals, and code artifact archives.',
    coordinates: [-13, 0.4, 5],
    cameraOffset: [-8, 6.5, 11],
    cameraTarget: [-13, 1.2, 5],
    category: 'PROJECTS',
    badge: 'LOC_02 // CREATIONS',
    color: '#38bdf8', // sky-blue
    iconName: 'FolderGit2',
  },
  {
    id: 'tech',
    name: 'Tech Center',
    tagline: 'Core Systems & Capabilities Matrix',
    description: 'A futuristic glass atrium surrounded by floating skill nodes, glowing circuit pathways, and real-time framework monitors.',
    coordinates: [13, 0.6, 5],
    cameraOffset: [9, 7.0, 11],
    cameraTarget: [13, 1.2, 5],
    category: 'TECH',
    badge: 'LOC_03 // SKILLS',
    color: '#52796f', // muted-green
    iconName: 'Cpu',
  },
  {
    id: 'university',
    name: 'University Building',
    tagline: 'Academy of Computer Science',
    description: 'A modern academic pavilion honoring Computer Science foundations, research papers, and specialized certifications.',
    coordinates: [-10, 1.0, -11],
    cameraOffset: [-6, 7.5, -6],
    cameraTarget: [-10, 1.5, -11],
    category: 'UNIVERSITY',
    badge: 'LOC_04 // ACADEMIA',
    color: '#7dd3fc', // sky-light
    iconName: 'GraduationCap',
  },
  {
    id: 'contact',
    name: 'Contact Station',
    tagline: 'Communication Beacon & Lounge',
    description: 'An elevated observation platform with satellite telemetry dishes, signaling rings, and an open collaborative lounge.',
    coordinates: [11, 1.2, -10],
    cameraOffset: [7, 7.5, -5],
    cameraTarget: [11, 1.5, -10],
    category: 'CONTACT',
    badge: 'LOC_05 // TRANSMIT',
    color: '#faf8f5', // warm-ivory
    iconName: 'Radio',
  },
]
