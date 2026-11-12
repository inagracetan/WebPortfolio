import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, ShieldCheck } from 'lucide-react'
import { useGameStore } from '@/hooks/useGameStore'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  subtitle?: string
  badge?: string
  locationTag?: string
  systemStatus?: string
  children: React.ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  badge,
  locationTag,
  systemStatus = 'ONLINE',
  children,
  maxWidth = '2xl',
}) => {
  const { activeLocation } = useGameStore()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const maxWidthClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
  }[maxWidth]

  // Accessibility: detect reduced motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const resolvedLocation = locationTag || activeLocation.name.toUpperCase()
  const cleanTitle = (title || 'SYSTEM_WINDOW').replaceAll('//', '::')

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 overflow-y-auto select-none"
        >
          {/* Backdrop with dark CRT vignette */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-deep-navy/85 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Retro Computer Window Chassis */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
            transition={
              prefersReducedMotion
                ? { duration: 0.12 }
                : { type: 'spring', damping: 28, stiffness: 380 }
            }
            className={`relative w-full ${maxWidthClass} z-10 bg-[#0a0e17] border border-sky-blue/35 rounded-xs shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_20px_rgba(0,240,255,0.12)] overflow-hidden flex flex-col max-h-[94vh] sm:max-h-[90vh]`}
          >
            {/* Restrained Retro Scanline & CRT Phosphor Grain Overlay (3% opacity) */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] z-30" />

            {/* A. Classic Retro Title Bar */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-sky-blue/25 bg-[#121926] flex-shrink-0 z-10">
              <div className="flex items-center gap-2 pr-2 min-w-0">
                <div className="p-1 rounded-xs bg-sky-blue/10 border border-sky-blue/30 text-electric-blue flex-shrink-0">
                  <Terminal className="w-3.5 h-3.5" />
                </div>
                <h2
                  id="modal-title"
                  className="font-mono font-bold text-xs sm:text-sm text-warm-ivory tracking-wider break-words uppercase"
                >
                  {cleanTitle}
                </h2>
                {badge && (
                  <span className="hidden sm:inline-block px-1.5 py-0.2 text-[9px] font-mono font-semibold bg-electric-blue/15 text-electric-blue border border-electric-blue/30 rounded-xs flex-shrink-0">
                    [{badge}]
                  </span>
                )}
              </div>

              {/* Functional Window Close Control */}
              <div className="flex items-center gap-1.5 font-mono flex-shrink-0">
                <span className="hidden md:inline-block px-1.5 py-0.2 text-[9px] text-sky-light/60 bg-white/5 border border-white/10 rounded-xs mr-1">
                  ESC
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-2 py-0.5 flex items-center gap-1 bg-rose-500/20 hover:bg-rose-500 border border-rose-500/40 text-rose-300 hover:text-white text-xs font-bold rounded-xs transition-colors cursor-pointer"
                  title="Close Window (ESC)"
                  aria-label="Close Window"
                >
                  <span>CLOSE</span>
                  <span>✕</span>
                </button>
              </div>
            </div>

            {/* B. Retro Terminal Command / Context Sub-Bar */}
            <div className="px-3 sm:px-4 py-1.5 bg-[#0e141f] border-b border-sky-blue/15 flex items-center justify-between text-[10px] font-mono text-sky-light/75 flex-shrink-0 z-10">
              <div className="flex items-center gap-2 break-all pr-2">
                <span className="text-electric-blue font-bold flex-shrink-0">C:\INA_TAN\ARCHIPELAGO&gt;</span>
                <span className="text-warm-ivory-dim break-all">
                  {subtitle || `cat ${resolvedLocation.toLowerCase().replace(/[^a-z0-9]/g, '_')}_spec.dat`}
                </span>
              </div>
              <div className="hidden xs:flex items-center gap-1.5 text-muted-green-light font-semibold flex-shrink-0">
                <ShieldCheck className="w-3 h-3" />
                <span>ACCESS: GRANTED</span>
              </div>
            </div>

            {/* C. Main Content Area (Clean, Readable & Vertically Scrollable) */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-warm-ivory select-text z-10 bg-[#0a0e17]/95">
              {children}
            </div>

            {/* D. Retro Terminal Footer Status Bar */}
            <div className="px-3 sm:px-4 py-1.5 bg-[#0e141f] border-t border-sky-blue/15 flex items-center justify-between text-[10px] font-mono text-warm-ivory-dim/70 flex-shrink-0 z-10">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-green-light animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                <span className="text-muted-green-light font-semibold">
                  SYS: {systemStatus}
                </span>
              </div>
              <span className="hidden sm:inline text-sky-light/60">
                LOCATION: {resolvedLocation}
              </span>
              <span className="text-warm-ivory-dim/60">
                MEM: 640KB // READ-ONLY
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
