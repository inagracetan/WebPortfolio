import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Compass, Eye, Video, EyeOff, RotateCcw, Sparkles } from 'lucide-react'
import { useGameStore, type ActiveModal } from '@/hooks/useGameStore'
import { characterStore, useCharacterStore } from '@/characters/useCharacterStore'

export const WorldHud: React.FC = () => {
  const {
    currentScreen,
    activeLocation,
    openModal,
    isUiModalOpen,
  } = useGameStore()

  const { cameraMode, toggleCameraMode } = useCharacterStore()

  // Track location entrance toast
  const [showBanner, setShowBanner] = useState(true)
  const [prevLocationId, setPrevLocationId] = useState(activeLocation.id)

  if (prevLocationId !== activeLocation.id) {
    setPrevLocationId(activeLocation.id)
    setShowBanner(true)
  }

  useEffect(() => {
    if (showBanner) {
      const timer = setTimeout(() => {
        setShowBanner(false)
      }, 2600)
      return () => clearTimeout(timer)
    }
  }, [showBanner, activeLocation.id])

  // STRICT REQUIREMENT (Phase 5): Hide completely when ANY modal, drawer, or welcome screen is open
  if (isUiModalOpen || currentScreen === 'LOADING' || currentScreen === 'WELCOME') {
    return null
  }

  // Inspect current location's portfolio content
  const handleInspectLocation = () => {
    let targetModal: ActiveModal = 'PROJECTS'
    if (activeLocation.category === 'WORKSPACE' || activeLocation.id === 'workspace') targetModal = 'RESUME'
    else if (activeLocation.category === 'PROJECTS' || activeLocation.id === 'projects') targetModal = 'PROJECTS'
    else if (activeLocation.category === 'TECH' || activeLocation.id === 'tech') targetModal = 'TECH'
    else if (activeLocation.category === 'UNIVERSITY' || activeLocation.id === 'university') targetModal = 'EXPERIENCE'
    else if (activeLocation.category === 'CONTACT' || activeLocation.id === 'contact') targetModal = 'CONTACT'

    openModal(targetModal)
  }

  // Explicit respawn on the main island
  const handleRespawn = () => {
    characterStore.spawnOnMainIsland()
  }

  return (
    <>
      {/* Floating Location Entrance Notification (Minimalist Toast) */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            key={activeLocation.id}
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="fixed top-20 left-0 right-0 z-30 flex justify-center pointer-events-none px-4"
          >
            <div className="flex items-center gap-2 px-3.5 py-1.5 bg-deep-navy-card/90 border border-sky-blue/30 rounded-full shadow-lg backdrop-blur-md font-mono text-xs text-warm-ivory">
              <Sparkles className="w-3.5 h-3.5 text-electric-blue animate-pulse flex-shrink-0" />
              <span className="font-semibold tracking-wide">{activeLocation.name}</span>
              <span className="text-sky-light/60 text-[10px] hidden sm:inline">
                &bull; {activeLocation.tagline}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dedicated Bottom HUD Toolbar: Placed strictly ABOVE mobile joystick on mobile (z-40) */}
      <div className="fixed bottom-[156px] landscape:bottom-3 md:bottom-6 left-0 right-0 z-40 px-2.5 sm:px-4 pointer-events-none">
        <div className="max-w-xl mx-auto flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto flex items-center justify-between gap-1.5 sm:gap-3 px-3 py-1.5 sm:px-4 sm:py-2 bg-deep-navy-card/95 border border-sky-blue/30 rounded-full shadow-2xl backdrop-blur-xl text-xs font-mono text-warm-ivory select-none"
          >
            {/* Current Active Location Indicator */}
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 pr-1.5 sm:pr-2 border-r border-sky-blue/15">
              <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-electric-blue flex-shrink-0 animate-pulse" />
              <span className="font-semibold text-warm-ivory truncate text-[11px] sm:text-xs max-w-[105px] xs:max-w-[150px] sm:max-w-[200px]">
                {activeLocation.name}
              </span>
            </div>

            {/* Actions: View Details, Camera, Respawn */}
            <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
              <button
                type="button"
                onClick={handleInspectLocation}
                className="flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-electric-blue/15 hover:bg-electric-blue text-electric-blue hover:text-deep-navy border border-electric-blue/40 rounded-full font-bold text-[10px] sm:text-xs transition-all cursor-pointer shadow-sm active:scale-95 min-h-[30px]"
                title={`View ${activeLocation.name} portfolio details`}
              >
                <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>DETAILS</span>
              </button>

              <button
                type="button"
                onClick={toggleCameraMode}
                className="flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 bg-deep-navy/80 hover:bg-deep-navy border border-sky-blue/20 hover:border-sky-blue text-warm-ivory-dim hover:text-warm-ivory rounded-full text-[10px] sm:text-xs transition-colors cursor-pointer active:scale-95 min-h-[30px]"
                title={cameraMode === 'FOLLOW' ? 'Switch to Free Orbit camera' : 'Switch to Follow camera'}
              >
                {cameraMode === 'FOLLOW' ? (
                  <Video className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-electric-blue" />
                ) : (
                  <EyeOff className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                )}
                <span>{cameraMode === 'FOLLOW' ? 'FOLLOW' : 'ORBIT'}</span>
              </button>

              <button
                type="button"
                onClick={handleRespawn}
                className="flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 bg-deep-navy/80 hover:bg-deep-navy border border-sky-blue/20 hover:border-electric-blue text-warm-ivory-dim hover:text-electric-blue rounded-full text-[10px] sm:text-xs transition-colors cursor-pointer active:scale-95 min-h-[30px]"
                title="Respawn avatar at Main Island spawn point"
              >
                <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>RESPAWN</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
