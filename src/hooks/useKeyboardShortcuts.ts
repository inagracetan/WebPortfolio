import { useEffect } from 'react'
import { gameStore } from './useGameStore'
import { objectInspectionStore } from '@/interactions/useObjectInspection'
import { characterStore } from '@/characters/useCharacterStore'
import { locationsData } from '@/locations/locationsData'
import { DESTINATION_WAYPOINTS } from '@/characters/spawnConfig'

export function useKeyboardShortcuts() {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Don't intercept if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return
      }

      switch (e.key) {
        case 'Escape':
          e.preventDefault()
          if (objectInspectionStore.getState().activeInspectionModal) {
            objectInspectionStore.closeInspection()
          } else if (gameStore.getState().activeModal) {
            gameStore.closeModal()
          } else if (gameStore.getState().isMenuOpen) {
            gameStore.setMenuOpen(false)
          }
          break

        case 'm':
        case 'M':
          e.preventDefault()
          gameStore.toggleMute()
          break

        case 'h':
        case 'H':
          e.preventDefault()
          gameStore.openModal('SETTINGS')
          break

        case 'c':
        case 'C':
          e.preventDefault()
          gameStore.openModal('CONTROLS')
          break

        case 'Home':
        case '0': {
          e.preventDefault()
          const dest = DESTINATION_WAYPOINTS['main']
          gameStore.setLocation(dest.id)
          characterStore.setCameraMode('FOLLOW')
          characterStore.teleportTo(dest.arrivalPosition, dest.arrivalRotation)
          break
        }

        case 'v':
        case 'V':
          e.preventDefault()
          characterStore.toggleCameraMode()
          break

        case '1':
        case '2':
        case '3':
        case '4':
        case '5': {
          const index = parseInt(e.key, 10) - 1
          if (locationsData[index]) {
            e.preventDefault()
            const loc = locationsData[index]
            const dest = DESTINATION_WAYPOINTS[loc.id]
            if (dest) {
              gameStore.setLocation(dest.id)
              characterStore.setCameraMode('FOLLOW')
              characterStore.teleportTo(dest.arrivalPosition, dest.arrivalRotation)
            }
          }
          break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
}
