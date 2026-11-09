import { useEffect } from 'react'
import { useCharacterStore } from '@/characters/useCharacterStore'
import { gameStore } from '@/hooks/useGameStore'
import { locationsData } from '@/locations/locationsData'
import { INTERACTIVE_OBJECTS } from './interactiveObjectsData'
import { objectInspectionStore } from './useObjectInspection'
import type { InteractiveObjectItem } from './types'

export function useProximityInteractions() {
  const { playerPosition } = useCharacterStore()

  useEffect(() => {
    const [px, , pz] = playerPosition

    // Find nearest interactive object
    let nearest: InteractiveObjectItem | null = null
    let minDist = Infinity

    for (const obj of INTERACTIVE_OBJECTS) {
      const d = Math.hypot(px - obj.position[0], pz - obj.position[2])
      if (d <= obj.radius && d < minDist) {
        minDist = d
        nearest = obj
      }
    }

    // Also update current active island location waypoint in gameStore
    for (const loc of locationsData) {
      const d = Math.hypot(px - loc.coordinates[0], pz - loc.coordinates[2])
      if (d <= 5.8) {
        gameStore.setLocation(loc.id)
        break
      }
    }

    // Keyboard listener for 'E' key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return
      }

      if (e.key === 'e' || e.key === 'E') {
        const modalOpen =
          gameStore.getState().activeModal ||
          objectInspectionStore.getState().activeInspectionModal

        if (nearest && !modalOpen) {
          e.preventDefault()
          objectInspectionStore.openInspection(nearest)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [playerPosition])
}
