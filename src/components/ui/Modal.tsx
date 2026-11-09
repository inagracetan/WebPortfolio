import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  subtitle?: string
  badge?: string
  children: React.ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  badge,
  children,
  maxWidth = '2xl',
}) => {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-deep-navy/85 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
            transition={
              prefersReducedMotion
                ? { duration: 0.15 }
                : { type: 'spring', damping: 26, stiffness: 360 }
            }
            className={`relative w-full ${maxWidthClass} z-10 bg-deep-navy-card/95 border border-sky-blue/30 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.85)] hud-corner-tl hud-corner-br overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[88vh]`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-sky-blue/20 bg-deep-navy/80 flex-shrink-0">
              <div className="pr-2 truncate">
                <div className="flex items-center gap-2 truncate">
                  {title && (
                    <h2
                      id="modal-title"
                      className="font-display font-bold text-base sm:text-xl text-warm-ivory tracking-wide truncate"
                    >
                      {title}
                    </h2>
                  )}
                  {badge && (
                    <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-semibold bg-electric-blue/15 text-electric-blue border border-electric-blue/30 rounded flex-shrink-0">
                      {badge}
                    </span>
                  )}
                </div>
                {subtitle && (
                  <p className="text-[11px] sm:text-xs font-mono text-warm-ivory-dim tracking-wide mt-0.5 truncate">
                    {subtitle}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-sky-light/80 bg-sky-blue/10 border border-sky-blue/20 rounded">
                  ESC
                </kbd>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 sm:p-1.5 text-warm-ivory-dim hover:text-electric-blue hover:bg-white/10 rounded transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-electric-blue min-w-[36px] min-h-[36px] flex items-center justify-center"
                  aria-label="Close modal window"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-warm-ivory">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
