import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Award, Calendar, Building2 } from 'lucide-react'

interface CertificateModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  title: string
  date?: string
  organizer?: string
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  title,
  date,
  organizer,
}) => {
  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Certificate Preview for ${title}`}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-deep-navy/90 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[92vh] flex flex-col bg-deep-navy-card/95 border border-sky-blue/30 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-sky-blue/20 bg-deep-navy/90 font-mono text-xs">
              <div className="flex items-center gap-2 text-electric-blue truncate pr-2">
                <Award className="w-4 h-4 flex-shrink-0" />
                <span className="font-bold uppercase tracking-wider truncate">
                  Certificate Preview // {title}
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded bg-sky-blue/10 hover:bg-rose-500/20 text-warm-ivory hover:text-rose-300 border border-sky-blue/20 transition-colors flex items-center gap-1 cursor-pointer flex-shrink-0"
                aria-label="Close Certificate Preview"
              >
                <X className="w-4 h-4" />
                <span className="text-[10px] hidden sm:inline">CLOSE</span>
              </button>
            </div>

            {/* Certificate Image Viewport (Strict Aspect Ratio & No Distortion) */}
            <div className="p-3 sm:p-4 overflow-auto flex-1 flex items-center justify-center bg-black/40">
              <img
                src={imageSrc}
                alt={`Certificate: ${title}`}
                className="max-w-full max-h-[72vh] w-auto h-auto object-contain rounded border border-sky-blue/20 shadow-xl"
                draggable={false}
              />
            </div>

            {/* Footer Metadata */}
            <div className="px-4 py-2.5 bg-deep-navy/90 border-t border-sky-blue/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[11px] text-warm-ivory-dim">
              <div className="flex flex-wrap items-center gap-3">
                {date && (
                  <span className="flex items-center gap-1 text-electric-blue">
                    <Calendar className="w-3 h-3" />
                    <span>{date}</span>
                  </span>
                )}
                {organizer && (
                  <span className="flex items-center gap-1 text-sky-light">
                    <Building2 className="w-3 h-3" />
                    <span>{organizer}</span>
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="self-end sm:self-auto px-3 py-1 rounded bg-electric-blue/15 hover:bg-electric-blue/25 text-electric-blue border border-electric-blue/30 text-xs transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

