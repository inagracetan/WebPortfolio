import React from 'react'
import { motion } from 'framer-motion'
import { Globe2, FolderGit2, Keyboard, Volume2 } from 'lucide-react'
import { Button } from './Button'
import { useGameStore } from '@/hooks/useGameStore'
import { APP_CONFIG } from '@/utilities/constants'

export const WelcomeScreen: React.FC = () => {
  const { enterWorld, explorePortfolio, openModal } = useGameStore()

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.96 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto relative w-full max-w-xl bg-deep-navy-card/90 backdrop-blur-xl border border-sky-blue/30 rounded-sm p-6 sm:p-10 shadow-[0_24px_64px_rgba(0,0,0,0.7)] hud-corner-tl hud-corner-br text-center"
      >
        {/* Subtle background game grid accent */}
        <div className="absolute inset-0 bg-game-grid opacity-20 pointer-events-none rounded-sm" />

        {/* Top Status HUD Badge */}
        <div className="relative z-10 inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-deep-navy/80 border border-sky-blue/30 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-electric-blue animate-pulse" />
          <span className="text-electric-blue font-semibold tracking-wider">
            {APP_CONFIG.name}
          </span>
          <span className="text-warm-ivory-dim/60">//</span>
          <span className="text-warm-ivory-dim tracking-widest text-[11px]">
            {APP_CONFIG.tagline}
          </span>
        </div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="relative z-10 font-display font-extrabold text-2xl sm:text-4xl lg:text-4xl tracking-tight text-warm-ivory mb-2"
        >
          HELLO, I'M INA GRACE TAN.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative z-10 text-sky-light font-medium text-base sm:text-lg mb-2"
        >
          Welcome to my little digital world.
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative z-10 text-warm-ivory-dim text-xs sm:text-sm leading-relaxed mb-8 max-w-lg mx-auto font-sans"
        >
          An interactive space where technology, creativity, and ideas come together.
          Explore the low-poly floating islands or access portfolio dossiers directly.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3.5"
        >
          {/* Start Exploring Button */}
          <Button
            variant="primary"
            size="lg"
            icon={<Globe2 className="w-5 h-5 text-deep-navy" />}
            onClick={enterWorld}
            className="w-full sm:w-auto min-w-[210px] shadow-[0_0_20px_rgba(0,240,255,0.4)]"
          >
            START EXPLORING
          </Button>

          {/* Direct Portfolio View Button */}
          <Button
            variant="secondary"
            size="lg"
            icon={<FolderGit2 className="w-5 h-5 text-sky-light" />}
            onClick={explorePortfolio}
            className="w-full sm:w-auto min-w-[210px]"
          >
            DIRECT PORTFOLIO VIEW
          </Button>
        </motion.div>

        {/* Controls Guide & Sound Hint Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="relative z-10 mt-8 pt-4 border-t border-sky-blue/15 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-warm-ivory-dim/70"
        >
          <button
            type="button"
            onClick={() => openModal('CONTROLS')}
            className="flex items-center gap-1.5 text-sky-light hover:text-electric-blue transition-colors cursor-pointer"
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span>View Controls Guide</span>
          </button>

          <span className="flex items-center gap-1.5 text-warm-ivory-dim/60">
            <Volume2 className="w-3.5 h-3.5 text-electric-blue" />
            <span>Interactive Audio Enabled on Start</span>
          </span>
        </motion.div>
      </motion.div>
    </div>
  )
}
