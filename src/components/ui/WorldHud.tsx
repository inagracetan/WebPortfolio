import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Compass, Eye, RotateCcw, Video, EyeOff, Home, HelpCircle, Sparkles } from 'lucide-react'
import { useGameStore, type ActiveModal } from '@/hooks/useGameStore'
import { useCharacterStore } from '@/characters/useCharacterStore'
import { locationsData } from '@/locations/locationsData'

export const WorldHud: React.FC = () => {
  const {
    currentScreen,
    activeLocation,
    setLocation,
    openModal,
    resetToWelcome,
  } = useGameStore()

  const { cameraMode, toggleCameraMode, teleportTo } = useCharacterStore()

  // Track location entrance banner transition
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
      }, 3200)
      return () => clearTimeout(timer)
    }
  }, [showBanner, activeLocation.id])

  if (currentScreen === 'LOADING' || currentScreen === 'WELCOME') {
    return null
  }

  const handleInspect = () => {
    let targetModal: ActiveModal = 'PROJECTS'
    if (activeLocation.category === 'WORKSPACE') targetModal = 'RESUME'
    else if (activeLocation.category === 'PROJECTS') targetModal = 'PROJECTS'
    else if (activeLocation.category === 'TECH') targetModal = 'SKILLS'
    else if (activeLocation.category === 'UNIVERSITY') targetModal = 'EXPERIENCE'
    else if (activeLocation.category === 'CONTACT') targetModal = 'CONTACT'

    openModal(targetModal)
  }

  const handleWaypointSelect = (locId: string) => {
    const loc = locationsData.find((l) => l.id === locId)
    if (loc) {
      setLocation(loc.id)
      // Teleport character to waypoint entrance
      teleportTo([loc.coordinates[0], loc.coordinates[1] + 0.45, loc.coordinates[2] + 1.2])
    }
  }

  // Return to Personal Workspace spawn point
  const handleReturnToMainIsland = () => {
    setLocation('workspace')
    teleportTo([0, 0.45, 1.8])
  }

  return (
    <>
      {/* Floating Location Entrance Transition Toast (Top Center) */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            key={activeLocation.id}
            initial={{ opacity: 0, y: -24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 260 }}
            className="fixed top-18 left-0 right-0 z-40 flex justify-center pointer-events-none px-4"
          >
            <div className="flex items-center gap-2.5 px-4 py-2 bg-deep-navy-card/90 border border-sky-blue/35 rounded-sm shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl font-mono text-xs text-warm-ivory">
              <Sparkles className="w-3.5 h-3.5 text-electric-blue animate-pulse flex-shrink-0" />
              <div className="flex items-baseline gap-2">
                <span className="text-sky-light/70 uppercase text-[10px] tracking-wider">
                  Arriving At:
                </span>
                <span className="font-display font-bold text-sm text-warm-ivory tracking-wide">
                  {activeLocation.name}
                </span>
                <span className="text-electric-blue text-[11px] hidden sm:inline">
                  [{activeLocation.badge}]
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Floating Navigation HUD - elevated on mobile (bottom-28) to prevent joystick overlap */}
      <div className="fixed bottom-28 md:bottom-6 left-0 right-0 z-20 px-3 sm:px-4 pointer-events-none">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-2">
          {/* Floating Waypoint Fast-Travel Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-auto flex items-center justify-start sm:justify-center overflow-x-auto max-w-full gap-1.5 p-1.5 bg-deep-navy-card/90 border border-sky-blue/30 rounded-sm shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl hud-corner-tl hud-corner-br"
            role="toolbar"
            aria-label="World Waypoint Navigation"
          >
            {locationsData.map((loc, idx) => {
              const isSelected = activeLocation.id === loc.id
              return (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => handleWaypointSelect(loc.id)}
                  aria-label={`Fast travel to ${loc.name}`}
                  className={`flex-shrink-0 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded text-xs font-mono transition-all cursor-pointer min-h-[36px] sm:min-h-auto ${
                    isSelected
                      ? 'bg-electric-blue text-deep-navy font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                      : 'text-warm-ivory-dim hover:text-warm-ivory hover:bg-white/5'
                  }`}
                >
                  <span className="opacity-70 font-semibold">{idx + 1}</span>
                  <span className="hidden sm:inline">{loc.name}</span>
                  <span className="sm:hidden text-[11px]">{loc.badge.split(' // ')[1]}</span>
                </button>
              )
            })}
          </motion.div>

          {/* Selected Waypoint Detail Bar & Actions */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            key={activeLocation.id}
            className="pointer-events-auto flex items-center justify-between gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-deep-navy/90 border border-sky-blue/25 rounded-sm backdrop-blur-md text-xs font-mono max-w-xl w-full shadow-lg"
          >
            <div className="flex items-center gap-2 sm:gap-2.5 truncate">
              <Compass className="w-4 h-4 text-electric-blue flex-shrink-0 animate-pulse" />
              <div className="truncate">
                <span className="text-warm-ivory font-bold">{activeLocation.name}</span>
                <span className="text-sky-light/60 ml-2 hidden sm:inline">
                  [{activeLocation.coordinates.join(', ')}]
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              {/* Return to Main Island Option */}
              <button
                type="button"
                onClick={handleReturnToMainIsland}
                className="flex items-center gap-1.5 px-2.5 py-1.5 sm:py-1 bg-deep-navy border border-sky-blue/20 hover:border-sky-blue text-warm-ivory-dim hover:text-warm-ivory rounded text-xs font-mono transition-colors cursor-pointer min-h-[36px] sm:min-h-auto"
                title="Return to Main Island (Personal Workspace)"
                aria-label="Return to Main Island"
              >
                <Home className="w-3.5 h-3.5 text-sky-light" />
                <span className="hidden md:inline">MAIN ISLAND</span>
              </button>

              {/* Camera View Mode Toggle */}
              <button
                type="button"
                onClick={toggleCameraMode}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 sm:py-1 rounded border text-xs font-mono transition-colors cursor-pointer min-h-[36px] sm:min-h-auto ${
                  cameraMode === 'FOLLOW'
                    ? 'bg-sky-blue/15 border-sky-blue text-sky-light'
                    : 'bg-deep-navy border-sky-blue/20 text-warm-ivory-dim hover:text-warm-ivory'
                }`}
                title="Toggle Camera Follow Mode (V)"
                aria-label={cameraMode === 'FOLLOW' ? 'Switch to Free Orbit camera' : 'Switch to Follow camera'}
              >
                {cameraMode === 'FOLLOW' ? (
                  <Video className="w-3.5 h-3.5 text-electric-blue" />
                ) : (
                  <EyeOff className="w-3.5 h-3.5" />
                )}
                <span className="hidden sm:inline">
                  {cameraMode === 'FOLLOW' ? 'FOLLOW CAM' : 'FREE ORBIT'}
                </span>
              </button>

              {/* Inspect Modal Trigger */}
              <button
                type="button"
                onClick={handleInspect}
                className="flex items-center gap-1.5 px-3 py-1.5 sm:py-1 bg-electric-blue/20 hover:bg-electric-blue text-electric-blue hover:text-deep-navy border border-electric-blue/40 rounded transition-all font-bold cursor-pointer min-h-[36px] sm:min-h-auto"
                aria-label="Inspect active location details"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>INSPECT</span>
              </button>

              {/* Return to Welcome View */}
              <button
                type="button"
                onClick={resetToWelcome}
                className="p-2 sm:p-1.5 text-warm-ivory-dim hover:text-electric-blue hover:bg-white/5 rounded transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                title="Return to Welcome Screen"
                aria-label="Return to Welcome Screen"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Desktop Controls Cheat Sheet Pill + Help Trigger */}
          <div className="font-mono text-[10px] text-warm-ivory-dim/70 tracking-wider hidden sm:flex items-center gap-2 bg-deep-navy/70 px-3 py-1 rounded border border-sky-blue/10 backdrop-blur-sm pointer-events-auto">
            <span>
              <span className="text-electric-blue font-bold">WASD / ARROWS</span> TO MOVE &bull;{' '}
              <span className="text-electric-blue font-bold">SHIFT</span> TO SPRINT &bull;{' '}
              <span className="text-electric-blue font-bold">E</span> TO INTERACT &bull;{' '}
              <span className="text-electric-blue font-bold">V</span> TOGGLE VIEW &bull;{' '}
              <span className="text-electric-blue font-bold">1-5</span> FAST TRAVEL
            </span>

            <button
              type="button"
              onClick={() => openModal('CONTROLS')}
              className="ml-2 pl-2 border-l border-sky-blue/20 text-sky-light hover:text-electric-blue flex items-center gap-1 cursor-pointer font-bold"
            >
              <HelpCircle className="w-3 h-3" />
              <span>GUIDE</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
