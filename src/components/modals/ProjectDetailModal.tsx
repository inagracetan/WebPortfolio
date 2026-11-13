import React from 'react'
import { Modal } from '@/components/ui/Modal'
import { useObjectInspection } from '@/interactions/useObjectInspection'
import { ExternalLink, GitBranch, Sparkles, CheckCircle2, FolderGit2, Info } from 'lucide-react'

export const ProjectDetailModal: React.FC = () => {
  const { activeInspectionModal, activeProjectDetail, closeInspection } = useObjectInspection()

  if (!activeProjectDetail) return null

  return (
    <Modal
      isOpen={activeInspectionModal === 'PROJECT_DETAIL'}
      onClose={closeInspection}
      title={`PROJECT_LAB // ${activeProjectDetail.title}.DAT`}
      subtitle={activeProjectDetail.subtitle}
      badge={activeProjectDetail.category}
      locationTag="PROJECT LAB"
      maxWidth="3xl"
    >
      <div className="space-y-6">
        {/* Header Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-deep-navy/80 border border-sky-blue/20 rounded-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-electric-blue font-semibold uppercase">
              Role:
            </span>
            <span className="text-xs font-mono text-warm-ivory">
              {activeProjectDetail.role}
            </span>
          </div>

          {activeProjectDetail.statusBadge && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-muted-green/20 border border-muted-green/40 rounded text-xs font-mono text-muted-green-light">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{activeProjectDetail.statusBadge}</span>
            </div>
          )}
        </div>

        {/* Visual Screenshot / Logo Preview */}
        <div className="relative w-full h-44 bg-deep-navy/90 border border-sky-blue/20 rounded-sm overflow-hidden group">
          {activeProjectDetail.previewScreenshot ? (
            /* Actual website screenshot */
            <>
              <img
                src={activeProjectDetail.previewScreenshot}
                alt={`${activeProjectDetail.title} preview`}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                draggable={false}
              />
              {/* Fade overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-deep-navy/80 to-transparent pointer-events-none" />
              {/* Logo badge over screenshot */}
              {activeProjectDetail.logo && (
                <div className="absolute bottom-2 left-3 p-1.5 bg-deep-navy/80 rounded border border-sky-blue/20 backdrop-blur-sm">
                  <img
                    src={activeProjectDetail.logo}
                    alt={`${activeProjectDetail.title} logo`}
                    className="h-6 w-auto object-contain"
                    draggable={false}
                  />
                </div>
              )}
            </>
          ) : activeProjectDetail.logo ? (
            /* Logo-only display (no screenshot) */
            <div className="w-full h-full flex items-center justify-center bg-deep-navy-surface/60">
              <div className="absolute inset-0 bg-game-grid opacity-15 pointer-events-none" />
              <img
                src={activeProjectDetail.logo}
                alt={`${activeProjectDetail.title} logo`}
                className="max-h-20 max-w-[180px] object-contain drop-shadow-lg"
                draggable={false}
              />
            </div>
          ) : (
            /* Fallback — no assets available */
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-center px-4">
              <div className="absolute inset-0 bg-game-grid opacity-15 pointer-events-none" />
              <span className="font-mono text-xs text-warm-ivory font-bold tracking-wider uppercase">
                {activeProjectDetail.title}
              </span>
              <span className="font-mono text-[10px] text-sky-light/60">
                {activeProjectDetail.category}
              </span>
            </div>
          )}

          {/* Live Demo badge overlay (top-right) */}
          {activeProjectDetail.links?.demo && (
            <div className="absolute top-2 right-2">
              <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-[9px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LIVE DEMO
              </span>
            </div>
          )}
        </div>

        {/* Narrative Description */}
        <div className="space-y-2">
          <h4 className="font-mono text-xs text-sky-light font-semibold tracking-wider uppercase">
            Project Overview &amp; Context
          </h4>
          <p className="text-sm text-warm-ivory-dim leading-relaxed">
            {activeProjectDetail.description}
          </p>
        </div>

        {/* Key Features */}
        <div className="space-y-2.5">
          <h4 className="font-mono text-xs text-sky-light font-semibold tracking-wider uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-electric-blue" />
            <span>Key Functional Scope &amp; Responsibilities</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {activeProjectDetail.features.map((feature, idx) => (
              <div
                key={idx}
                className="p-3 bg-deep-navy/50 border border-sky-blue/15 rounded flex items-start gap-2.5 text-xs text-warm-ivory-dim"
              >
                <CheckCircle2 className="w-4 h-4 text-muted-green-light flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Badges */}
        <div className="space-y-2">
          <h4 className="font-mono text-xs text-sky-light font-semibold tracking-wider uppercase">
            Technologies &amp; Frameworks
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {activeProjectDetail.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-mono bg-deep-navy-surface text-sky-light border border-sky-blue/30 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Verification & Documentation Status */}
        {activeProjectDetail.documentationNotes && (
          <div className="p-3.5 bg-deep-navy/70 border border-sky-blue/20 rounded flex items-start gap-2.5 text-xs">
            <Info className="w-4 h-4 text-electric-blue flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-mono font-bold text-electric-blue uppercase tracking-wider block">
                Verification &amp; Documentation Note
              </span>
              <p className="font-mono text-[11px] text-warm-ivory-dim leading-relaxed">
                {activeProjectDetail.documentationNotes}
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons & Placeholders */}
        <div className="pt-2 border-t border-sky-blue/15 flex flex-wrap items-center gap-3">
          {activeProjectDetail.links.github ? (
            <a
              href={activeProjectDetail.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-deep-navy hover:bg-deep-navy-surface border border-sky-blue/30 text-warm-ivory hover:text-electric-blue text-xs font-mono rounded tracking-wider transition-colors"
            >
              <GitBranch className="w-4 h-4" />
              <span>SOURCE CODE REPOSITORY</span>
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 px-3.5 py-2 bg-deep-navy border border-sky-blue/15 text-warm-ivory-dim/70 text-xs font-mono rounded">
              <FolderGit2 className="w-3.5 h-3.5 text-sky-light/50" />
              <span>SOURCE CODE: ON FILE // AVAILABLE UPON INQUIRY</span>
            </span>
          )}

          {activeProjectDetail.links.demo && (
            <a
              href={activeProjectDetail.links.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 bg-electric-blue hover:bg-sky-light text-deep-navy text-xs font-mono font-bold rounded tracking-wider transition-colors shadow-[0_0_15px_rgba(0,240,255,0.4)]"
            >
              <ExternalLink className="w-4 h-4" />
              <span>LAUNCH LIVE DEMO</span>
            </a>
          )}
        </div>
      </div>
    </Modal>
  )
}
