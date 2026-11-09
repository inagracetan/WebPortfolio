import React, { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import { useCharacterStore } from '@/characters/useCharacterStore'
import { INTERACTIVE_OBJECTS } from '@/interactions/interactiveObjectsData'
import { objectInspectionStore, useObjectInspection } from '@/interactions/useObjectInspection'
import { gameStore } from '@/hooks/useGameStore'
import { useSound } from '@/hooks/useSound'
import type { InteractiveObjectItem } from '@/interactions/types'

export const InteractionPrompt: React.FC = () => {
  const { playerPosition } = useCharacterStore()
  const { activeInspectionModal } = useObjectInspection()
  const { playClick, playHover } = useSound()

  const nearestObject = useMemo(() => {
    const [px, , pz] = playerPosition

    let nearest: InteractiveObjectItem | null = null
    let minDist = Infinity

    for (const obj of INTERACTIVE_OBJECTS) {
      const d = Math.hypot(px - obj.position[0], pz - obj.position[2])
      if (d <= obj.radius && d < minDist) {
        minDist = d
        nearest = obj
      }
    }

    return nearest
  }, [playerPosition])

  // Don't display prompt if any modal is currently active
  if (!nearestObject || gameStore.getState().activeModal || activeInspectionModal) {
    return null
  }

  const handleTrigger = () => {
    playClick()
    objectInspectionStore.openInspection(nearestObject)
  }

  return (
    <AnimatePresence>
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
        <motion.button
          initial={{ opacity: 0, y: 15, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ type: 'spring', damping: 22, stiffness: 350 }}
          type="button"
          onClick={handleTrigger}
          onMouseEnter={playHover}
          className="pointer-events-auto flex items-center gap-3 px-5 py-2.5 bg-deep-navy-card/95 hover:bg-deep-navy border-2 border-electric-blue rounded-sm shadow-[0_0_25px_rgba(0,240,255,0.45)] backdrop-blur-xl text-warm-ivory group cursor-pointer"
        >
          {/* Key indicator badge */}
          <span className="px-2 py-0.5 bg-electric-blue text-deep-navy font-mono font-bold text-xs rounded shadow-sm group-hover:scale-105 transition-transform">
            [E]
          </span>

          <div className="flex flex-col text-left">
            <span className="font-mono text-xs font-bold tracking-wider text-electric-blue flex items-center gap-1.5 uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{nearestObject.prompt}</span>
            </span>
            <span className="text-[11px] font-mono text-warm-ivory-dim/80">
              {nearestObject.name} &bull; {nearestObject.sublabel}
            </span>
          </div>

          <ArrowRight className="w-4 h-4 text-sky-light group-hover:translate-x-1 transition-transform ml-1" />
        </motion.button>
      </div>
    </AnimatePresence>
  )
}
