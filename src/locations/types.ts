export type LocationCategory = 'WORKSPACE' | 'PROJECTS' | 'TECH' | 'UNIVERSITY' | 'CONTACT'

export interface LocationWaypoint {
  id: string
  name: string
  tagline: string
  description: string
  coordinates: [number, number, number]
  cameraOffset: [number, number, number]
  cameraTarget: [number, number, number]
  category: LocationCategory
  badge: string
  color: string
  iconName: string
}
