import React from 'react'
import { motion } from 'framer-motion'

export interface InfoPanelProps {
  title?: string
  subtitle?: string
  badge?: string
  coordinate?: string
  icon?: React.ReactNode
  onClose?: () => void
  children: React.ReactNode
  className?: string
  variant?: 'glass' | 'solid' | 'hud'
}

export const InfoPanel: React.FC<InfoPanelProps> = ({
  title,
  subtitle,
  badge,
  coordinate,
  icon,
  onClose,
  children,
  className = '',
  variant = 'hud',
}) => {
  const variantStyles = {
    glass: 'bg-deep-navy/75 backdrop-blur-xl border border-sky-blue/20',
    solid: 'bg-deep-navy-card border border-deep-navy-border',
    hud: 'bg-deep-navy/85 backdrop-blur-2xl border border-sky-blue/30 shadow-[0_8px_32px_rgba(0,0,0,0.5)]',
  }[variant]

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`relative rounded-sm p-5 md:p-6 text-warm-ivory hud-corner-tl hud-corner-br ${variantStyles} ${className}`}
    >
      {(title || badge || coordinate || onClose) && (
        <div className="flex items-start justify-between gap-4 pb-4 mb-4 border-b border-sky-blue/15">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="p-2 bg-sky-blue/10 border border-sky-blue/30 rounded text-electric-blue">
                {icon}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                {title && (
                  <h3 className="font-display font-bold text-lg md:text-xl tracking-wide text-warm-ivory">
                    {title}
                  </h3>
                )}
                {badge && (
                  <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-electric-blue/15 text-electric-blue border border-electric-blue/30 rounded">
                    {badge}
                  </span>
                )}
              </div>
              {subtitle && (
                <p className="text-xs font-mono text-warm-ivory-dim tracking-wide mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {coordinate && (
              <span className="hidden sm:inline-block font-mono text-[10px] text-sky-light/80 bg-sky-blue/10 px-2 py-0.5 rounded border border-sky-blue/20">
                {coordinate}
              </span>
            )}
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-warm-ivory-dim hover:text-electric-blue hover:bg-white/5 rounded transition-colors"
                aria-label="Close panel"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      <div>{children}</div>
    </motion.div>
  )
}

