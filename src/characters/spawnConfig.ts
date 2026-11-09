// ========================================================
// Centralized Destination & Spawn Configuration for Explorable Archipelago
// Predefined safe coordinates on valid ground outside building geometry
// ========================================================

export const MAIN_ISLAND_SPAWN_POSITION: [number, number, number] = [0, 0.45, 1.8]
export const MAIN_ISLAND_SPAWN_ROTATION = 0 // Facing north towards personal workspace entrance

export interface DestinationWaypoint {
  id: string
  name: string
  arrivalPosition: [number, number, number]
  arrivalRotation: number
}

export const DESTINATION_WAYPOINTS: Record<string, DestinationWaypoint> = {
  main: {
    id: 'workspace',
    name: 'Main Island',
    arrivalPosition: [0, 0.45, 1.8],
    arrivalRotation: 0,
  },
  workspace: {
    id: 'workspace',
    name: 'Personal Workspace',
    arrivalPosition: [0, 0.45, 1.8],
    arrivalRotation: 0,
  },
  projects: {
    id: 'projects',
    name: 'Project Lab',
    arrivalPosition: [-13, 0.6, 3.8],
    arrivalRotation: 0,
  },
  tech: {
    id: 'tech',
    name: 'Tech Center',
    arrivalPosition: [13, 0.75, 6.6],
    arrivalRotation: Math.PI,
  },
  university: {
    id: 'university',
    name: 'University Building',
    arrivalPosition: [-10, 1.2, -9.0],
    arrivalRotation: 0,
  },
  contact: {
    id: 'contact',
    name: 'Contact Station',
    arrivalPosition: [11, 1.4, -8.2],
    arrivalRotation: 0,
  },
}

