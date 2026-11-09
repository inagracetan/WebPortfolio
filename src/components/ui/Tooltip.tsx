import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface TooltipProps {
  content: string
  shortcut?: string
  children: React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  shortcut,
  children,
  position = 'top',
}) => {
  const [isVisible, setIsVisible] = useState(false)

  const posClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }[position]

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: position === 'top' ? 4 : -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`absolute ${posClasses} z-50 pointer-events-none whitespace-nowrap`}
          >
            <div className="px-2.5 py-1 text-xs font-mono bg-deep-navy-surface text-warm-ivory border border-sky-blue/30 shadow-xl rounded backdrop-blur-md flex items-center gap-1.5">
              <span>{content}</span>
              {shortcut && (
                <kbd className="px-1.5 py-0.2 text-[10px] bg-sky-blue/20 text-electric-blue border border-sky-blue/30 rounded font-semibold">
                  {shortcut}
                </kbd>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

