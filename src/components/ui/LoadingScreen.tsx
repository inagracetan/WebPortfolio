import React, { useEffect, useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '@/hooks/useGameStore'

interface LoadingScreenProps {
  onComplete: () => void
}

const BOOT_LOGS = [
  'BOOTING INA.EXE KERNEL v1.0.0',
  'INITIALIZING THREE.JS WEBGL RENDER PIPELINE',
  'GENERATING LOW-POLY FLOATING ISLAND GEOMETRY',
  'COMPILING NATURAL AMBIENT LIGHT SHADERS',
  'SYNCHRONIZING PORTFOLIO KNOWLEDGE REPOSITORY',
  'WORLD READY: ENTERING ATMOSPHERE',
]

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const { isEssentialReady, loadingProgress, loadingStage } = useGameStore()
  const [displayProgress, setDisplayProgress] = useState(15)
  const hasCompleted = useRef(false)

  // Keep a stable ref to onComplete so effects don't re-run when the parent
  // passes a new function reference (e.g. on every store notify in App).
  const onCompleteRef = useRef(onComplete)
  useEffect(() => { onCompleteRef.current = onComplete }, [onComplete])

  // Central completion — called from any path; fires exactly once.
  const complete = useCallback(() => {
    if (hasCompleted.current) return
    hasCompleted.current = true
    onCompleteRef.current()
  }, [])

  // Smoothly lerp displayed progress toward real store progress
  useEffect(() => {
    const target = isEssentialReady ? 100 : loadingProgress
    const interval = setInterval(() => {
      setDisplayProgress((prev) => {
        if (prev < target) {
          return Math.min(target, prev + Math.max(2, Math.ceil((target - prev) * 0.25)))
        }
        return prev
      })
    }, 30)

    return () => clearInterval(interval)
  }, [loadingProgress, isEssentialReady])

  // Complete as soon as essential world is ready
  useEffect(() => {
    if (isEssentialReady || displayProgress >= 100) {
      const timer = setTimeout(() => complete(), 200)
      return () => clearTimeout(timer)
    }
  }, [isEssentialReady, displayProgress, complete])

  // Failsafe watchdog: fires once after 4 s regardless of store state.
  // Uses a ref-based callback so it is NEVER reset by re-renders or prop changes.
  // This is the safety net for production environments where WebGL may be
  // blocked, slow, or unavailable (server-side rendering, bots, restricted GPUs).
  useEffect(() => {
    const failsafe = setTimeout(() => complete(), 4000)
    return () => clearTimeout(failsafe)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // intentionally empty — must only run once on mount

  const logIndex = Math.min(
    Math.floor((displayProgress / 100) * BOOT_LOGS.length),
    BOOT_LOGS.length - 1
  )



  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-deep-navy px-4 select-none"
    >
      {/* Background Subtle Game Grid */}
      <div className="absolute inset-0 bg-game-grid opacity-30 pointer-events-none" />

      {/* Decorative HUD Corner Accents */}
      <div className="absolute top-8 left-8 font-mono text-[11px] text-sky-light/50 tracking-widest hidden sm:block">
        [SYS_BOOT // ARCHIPELAGO_V1]
      </div>
      <div className="absolute top-8 right-8 font-mono text-[11px] text-sky-light/50 tracking-widest hidden sm:block">
        [COORDINATES: 0.00, 0.00, 0.00]
      </div>
      <div className="absolute bottom-8 left-8 font-mono text-[11px] text-sky-light/50 tracking-widest hidden sm:block">
        INA GRACE TAN &copy; 2026
      </div>
      <div className="absolute bottom-8 right-8 font-mono text-[11px] text-sky-light/50 tracking-widest hidden sm:block">
        STATUS: INITIALIZING
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center">
        {/* Animated Geometric Element: 3D-styled Low-Poly Diamond */}
        <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
          {/* Outer Pulsing Glow */}
          <div className="absolute inset-0 rounded-full bg-electric-blue/20 blur-xl animate-pulse" />

          {/* Rotating Wireframe Diamond Rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
            className="absolute inset-0 border border-sky-blue/30 rounded-lg transform rotate-45"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
            className="absolute inset-2 border border-electric-blue/60 rounded-md transform rotate-12"
          />

          {/* Inner Geometric Core */}
          <motion.div
            animate={{ scale: [0.85, 1.15, 0.85] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-8 h-8 bg-gradient-to-tr from-sky-blue to-electric-blue rotate-45 shadow-[0_0_20px_rgba(0,240,255,0.8)]"
          />
        </div>

        {/* INA.EXE Logo */}
        <div className="mb-2">
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-widest text-warm-ivory flex items-center justify-center gap-2">
            <span>INA</span>
            <span className="text-electric-blue">.</span>
            <span className="text-sky-light">EXE</span>
          </h1>
          <p className="font-mono text-xs text-sky-light/80 tracking-widest mt-1.5 uppercase">
            A Digital World of Creativity &amp; Technology
          </p>
        </div>

        {/* Introductory Text */}
        <p className="text-xs sm:text-sm text-warm-ivory-dim font-mono mb-8 max-w-xs sm:max-w-sm">
          Preparing an interactive 3D portfolio experience crafted by Ina Grace Tan.
        </p>

        {/* Progress Bar Container */}
        <div className="w-full max-w-xs mb-3">
          <div className="flex justify-between items-center text-xs font-mono mb-2 text-sky-light">
            <span className="break-words pr-2 truncate">{loadingStage || BOOT_LOGS[logIndex]}</span>
            <span className="font-bold text-electric-blue">{displayProgress}%</span>
          </div>

          <div
            role="progressbar"
            aria-valuenow={displayProgress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Portfolio asset and world loading progress"
            className="h-1.5 w-full bg-deep-navy-surface border border-sky-blue/30 rounded-full overflow-hidden p-0.5"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-sky-blue to-electric-blue rounded-full shadow-[0_0_10px_rgba(0,240,255,0.7)]"
              style={{ width: `${displayProgress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Status Prompt */}
        <div className="font-mono text-[11px] text-warm-ivory-dim/60 tracking-wider">
          {displayProgress >= 100 ? 'INITIALIZATION COMPLETE' : 'CALIBRATING FLOATING ARCHIPELAGO'}
        </div>
      </div>
    </motion.div>
  )
}

