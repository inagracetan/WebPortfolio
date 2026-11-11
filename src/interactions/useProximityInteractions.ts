import { useEffect, useRef } from 'react'
import { useCharacterStore } from '@/characters/useCharacterStore'
import { gameStore } from '@/hooks/useGameStore'
import { locationsData } from '@/locations/locationsData'
import { INTERACTIVE_OBJECTS } from './interactiveObjectsData'
import { objectInspectionStore } from './useObjectInspection'
import type { InteractiveObjectItem } from './types'

export function useProximityInteractions() {
  const { playerPosition } = useCharacterStore()
  const nearestRef = useRef<InteractiveObjectItem | null>(null)

  // 1. Single keyboard event listener on mount
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return
      }

      if (e.key === 'e' || e.key === 'E') {
        const isUiOpen = gameStore.getState().isUiModalOpen
        const nearest = nearestRef.current

        if (nearest && !isUiOpen) {
          e.preventDefault()
          objectInspectionStore.openInspection(nearest)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // 2. Evaluate proximity to interactive targets within CURRENT location and island waypoints
  useEffect(() => {
    const [px, , pz] = playerPosition
    const activeLoc = gameStore.getState().activeLocation

    // Update active location waypoint in gameStore when entering an island radius
    let currentIslandLoc = activeLoc
    for (const loc of locationsData) {
      const d = Math.hypot(px - loc.coordinates[0], pz - loc.coordinates[2])
      if (d <= 5.8) {
        currentIslandLoc = loc
        if (activeLoc.id !== loc.id) {
          gameStore.setLocation(loc.id)
        }
        break
      }
    }

    // STRICT REQUIREMENT 1 & 2: Find single nearest interactive object ONLY within the character's CURRENT location
    let nearest: InteractiveObjectItem | null = null
    let minDist = Infinity

    for (const obj of INTERACTIVE_OBJECTS) {
      if (obj.locationId !== currentIslandLoc.id) continue
      const d = Math.hypot(px - obj.position[0], pz - obj.position[2])
      if (d <= obj.radius && d < minDist) {
        minDist = d
        nearest = obj
      }
    }

    nearestRef.current = nearest
    objectInspectionStore.setNearestInteractiveId(nearest ? nearest.id : null)
  }, [playerPosition])
}
