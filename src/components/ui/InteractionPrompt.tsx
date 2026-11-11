import React, { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCharacterStore } from '@/characters/useCharacterStore'
import { INTERACTIVE_OBJECTS } from '@/interactions/interactiveObjectsData'
import { objectInspectionStore, useObjectInspection } from '@/interactions/useObjectInspection'
import { useGameStore } from '@/hooks/useGameStore'
import { useSound } from '@/hooks/useSound'
import type { InteractiveObjectItem } from '@/interactions/types'

export const InteractionPrompt: React.FC = () => {
  const { playerPosition } = useCharacterStore()
  const { activeInspectionModal } = useObjectInspection()
  const { isUiModalOpen, activeLocation } = useGameStore()
  const { playClick, playHover } = useSound()

  const nearestObject = useMemo(() => {
    const [px, , pz] = playerPosition

    let nearest: InteractiveObjectItem | null = null
    let minDist = Infinity

    for (const obj of INTERACTIVE_OBJECTS) {
      // STRICT REQUIREMENT 1: Only check interactive objects in the character's CURRENT location
      if (obj.locationId !== activeLocation.id) continue
      const d = Math.hypot(px - obj.position[0], pz - obj.position[2])
      if (d <= obj.radius && d < minDist) {
        minDist = d
        nearest = obj
      }
    }

    return nearest
  }, [playerPosition, activeLocation.id])

  // Don't display prompt if any modal or inspection is currently active
  if (!nearestObject || isUiModalOpen || activeInspectionModal) {
    return null
  }

  const handleTrigger = () => {
    playClick()
    objectInspectionStore.openInspection(nearestObject)
  }

  return (
    <AnimatePresence>
      <div className="fixed bottom-[215px] landscape:bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 z-35 pointer-events-none select-none">
        <motion.button
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.95 }}
          transition={{ duration: 0.18 }}
          type="button"
          onClick={handleTrigger}
          onMouseEnter={playHover}
          className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 bg-deep-navy-card/90 hover:bg-deep-navy border border-electric-blue/40 hover:border-electric-blue rounded-full shadow-[0_0_15px_rgba(0,240,255,0.25)] backdrop-blur-md text-xs font-mono text-warm-ivory group cursor-pointer transition-all"
        >
          {/* Key indicator badge */}
          <span className="px-1.5 py-0.2 bg-electric-blue text-deep-navy font-mono font-bold text-[10px] rounded shadow-sm">
            [E]
          </span>

          <span className="font-semibold text-electric-blue text-[11px] tracking-wider uppercase">
            {nearestObject.prompt}
          </span>

          <span className="text-[10px] text-warm-ivory-dim/75 hidden sm:inline">
            &bull; {nearestObject.name}
          </span>
        </motion.button>
      </div>
    </AnimatePresence>
  )
}
