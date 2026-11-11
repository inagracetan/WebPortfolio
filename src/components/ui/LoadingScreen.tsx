import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { soundEngine } from '@/utilities/audio'

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
  const [progress, setProgress] = useState(0)
  const logIndex = Math.min(
    Math.floor((progress / 100) * BOOT_LOGS.length),
    BOOT_LOGS.length - 1
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            soundEngine.playEnter()
            onComplete()
          }, 350)
          return 100
        }
        const step = Math.floor(Math.random() * 12) + 6
        const next = Math.min(prev + step, 100)
        return next
      })
    }, 110)

    return () => clearInterval(timer)
  }, [onComplete])



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
            <span className="truncate pr-2">{BOOT_LOGS[logIndex]}</span>
            <span className="font-bold text-electric-blue">{progress}%</span>
          </div>

          <div
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Portfolio asset and world loading progress"
            className="h-1.5 w-full bg-deep-navy-surface border border-sky-blue/30 rounded-full overflow-hidden p-0.5"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-sky-blue to-electric-blue rounded-full shadow-[0_0_10px_rgba(0,240,255,0.7)]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Status Prompt */}
        <div className="font-mono text-[11px] text-warm-ivory-dim/60 tracking-wider">
          {progress === 100 ? 'INITIALIZATION COMPLETE' : 'CALIBRATING FLOATING ISLANDS'}
        </div>
      </div>
    </motion.div>
  )
}

