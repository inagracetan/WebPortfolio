import type { ActiveModal } from '@/hooks/useGameStore'

export type InspectionModalType =
  | 'ABOUT_ME'
  | 'PROFILE'
  | 'EDUCATION'
  | 'COURSES'
  | 'PROJECT_DETAIL'
  | 'SKILL_DETAIL'
  | 'CONTACT'
  | 'RESUME'
  | 'CUSTOM'

export interface InteractiveObjectItem {
  id: string
  name: string
  sublabel: string
  prompt: string
  locationId: 'workspace' | 'projects' | 'tech' | 'university' | 'contact'
  position: [number, number, number]
  radius: number
  iconName: string
  modalType: InspectionModalType
  targetModal?: ActiveModal
  projectId?: string
  skillGroupId?: string
  cameraTarget?: [number, number, number]
  details?: {
    heading: string
    description: string
    bullets?: string[]
    tags?: string[]
  }
}

export type InteractionKind = 'INSPECT' | 'TELEPORT' | 'OPEN_PANEL' | 'TRIGGER_SOUND' | 'PLAY_ANIMATION'

export interface InteractableZone {
  id: string
  label: string
  sublabel?: string
  interactionKind: InteractionKind
  position: [number, number, number]
  radius: number
  targetPayload?: string
  promptText: string
  isActive: boolean
}

export interface InteractionEvent {
  zoneId: string
  kind: InteractionKind
  payload?: unknown
  timestamp: number
}
