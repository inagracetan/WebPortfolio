import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Compass, Eye, Video, EyeOff, Home, HelpCircle, Sparkles, Navigation as NavIcon } from 'lucide-react'
import { useGameStore, type ActiveModal } from '@/hooks/useGameStore'
import { useCharacterStore } from '@/characters/useCharacterStore'
import { locationsData } from '@/locations/locationsData'

export const WorldHud: React.FC = () => {
  const {
    currentScreen,
    activeLocation,
    setLocation,
    openModal,
    isUiModalOpen,
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
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showBanner, activeLocation.id])

  // Completely hide WorldHud if a modal or welcome/loading screen is active
  if (isUiModalOpen || currentScreen === 'LOADING' || currentScreen === 'WELCOME') {
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

  // Selecting a location updates focus/inspection WITHOUT teleporting the character
  const handleLocationTabSelect = (locId: string) => {
    setLocation(locId)
  }

  // Explicit action to fast-travel / warp character to the active location
  const handleWarpToActiveLocation = () => {
    const loc = locationsData.find((l) => l.id === activeLocation.id)
    if (loc) {
      teleportTo([loc.coordinates[0], loc.coordinates[1] + 0.45, loc.coordinates[2] + 1.2])
    }
  }

  // Explicit return to Personal Workspace spawn point
  const handleReturnToSpawn = () => {
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
            className="fixed top-18 left-0 right-0 z-30 flex justify-center pointer-events-none px-4"
          >
            <div className="flex items-center gap-2.5 px-4 py-2 bg-deep-navy-card/90 border border-sky-blue/35 rounded-sm shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl font-mono text-xs text-warm-ivory">
              <Sparkles className="w-3.5 h-3.5 text-electric-blue animate-pulse flex-shrink-0" />
              <div className="flex items-baseline gap-2">
                <span className="text-sky-light/70 uppercase text-[10px] tracking-wider">
                  Location:
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

      {/* Bottom Floating Navigation HUD */}
      <div className="fixed bottom-24 md:bottom-6 left-0 right-0 z-20 px-3 sm:px-4 pointer-events-none">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-2">
          {/* Location Selection Bar (Clicking selects the tab without teleporting) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto flex items-center justify-start sm:justify-center overflow-x-auto max-w-full gap-1.5 p-1.5 bg-deep-navy-card/95 border border-sky-blue/30 rounded-sm shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl hud-corner-tl hud-corner-br"
            role="tablist"
            aria-label="Island Location Tabs"
          >
            {locationsData.map((loc, idx) => {
              const isSelected = activeLocation.id === loc.id
              return (
                <button
                  key={loc.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleLocationTabSelect(loc.id)}
                  aria-label={`Select ${loc.name} location info`}
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

          {/* Location Detail & Controlled Actions Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            key={activeLocation.id}
            className="pointer-events-auto flex items-center justify-between gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-deep-navy/95 border border-sky-blue/25 rounded-sm backdrop-blur-md text-xs font-mono max-w-xl w-full shadow-lg"
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
              {/* Explicit Warp to Location Button */}
              <button
                type="button"
                onClick={handleWarpToActiveLocation}
                className="flex items-center gap-1.5 px-2.5 py-1.5 sm:py-1 bg-sky-blue/15 hover:bg-sky-blue/25 border border-sky-blue/30 text-sky-light rounded text-xs font-mono transition-colors cursor-pointer min-h-[36px] sm:min-h-auto"
                title={`Teleport avatar to ${activeLocation.name}`}
                aria-label={`Teleport to ${activeLocation.name}`}
              >
                <NavIcon className="w-3.5 h-3.5 text-electric-blue" />
                <span className="hidden md:inline">WARP</span>
              </button>

              {/* Explicit Return to Spawn Point Button */}
              <button
                type="button"
                onClick={handleReturnToSpawn}
                className="flex items-center gap-1.5 px-2.5 py-1.5 sm:py-1 bg-deep-navy border border-sky-blue/20 hover:border-sky-blue text-warm-ivory-dim hover:text-warm-ivory rounded text-xs font-mono transition-colors cursor-pointer min-h-[36px] sm:min-h-auto"
                title="Return to Spawn Point (Personal Workspace)"
                aria-label="Return to Spawn Point"
              >
                <Home className="w-3.5 h-3.5 text-sky-light" />
                <span className="hidden md:inline">SPAWN</span>
              </button>

              {/* Camera Mode Toggle */}
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
                aria-label="Inspect active location dossier"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>INSPECT</span>
              </button>
            </div>
          </motion.div>

          {/* Desktop Controls Cheat Sheet Pill + Help Trigger */}
          <div className="font-mono text-[10px] text-warm-ivory-dim/70 tracking-wider hidden sm:flex items-center gap-2 bg-deep-navy/80 px-3 py-1 rounded border border-sky-blue/10 backdrop-blur-sm pointer-events-auto">
            <span>
              <span className="text-electric-blue font-bold">WASD / ARROWS</span> TO MOVE &bull;{' '}
              <span className="text-electric-blue font-bold">SHIFT</span> TO SPRINT &bull;{' '}
              <span className="text-electric-blue font-bold">E</span> TO INTERACT &bull;{' '}
              <span className="text-electric-blue font-bold">V</span> TOGGLE VIEW &bull;{' '}
              <span className="text-electric-blue font-bold">1-5</span> SELECT TABS
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
