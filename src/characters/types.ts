export type CharacterAnimationState = 'idle' | 'walking' | 'inspecting' | 'floating'

export interface CharacterConfig {
  id: string
  name: string
  avatarType: 'low-poly-scout' | 'minimal-orb' | 'geometric-traveler'
  movementSpeed: number
  rotationSpeed: number
  scale: [number, number, number]
  initialPosition: [number, number, number]
}

export interface PlayerState {
  position: [number, number, number]
  targetPosition: [number, number, number] | null
  rotation: number
  currentState: CharacterAnimationState
  isMoving: boolean
  isInspecting: boolean
}

