import React from 'react'
import { Modal } from '@/components/ui/Modal'
import { useObjectInspection } from '@/interactions/useObjectInspection'
import { ExternalLink, Sparkles, CheckCircle2, FolderGit2, Info } from 'lucide-react'

// Official GitHub icon component matching DirectPortfolioView
const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
)

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
        {/* Screenshot / Architecture Preview Frame Above Title */}
        {(activeProjectDetail.previewScreenshot || activeProjectDetail.logo) && (
          <div className="relative w-full aspect-[2/1] bg-deep-navy/90 border border-sky-blue/25 rounded overflow-hidden shadow-inner group/preview">
            {activeProjectDetail.previewScreenshot ? (
              <>
                <img
                  src={activeProjectDetail.previewScreenshot}
                  alt={`${activeProjectDetail.title} preview`}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/preview:scale-[1.03]"
                  draggable={false}
                />
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-deep-navy/90 to-transparent pointer-events-none" />
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-deep-navy-surface/80">
                <div className="absolute inset-0 bg-game-grid opacity-20 pointer-events-none" />
                {activeProjectDetail.logo && (
                  <img
                    src={activeProjectDetail.logo}
                    alt={`${activeProjectDetail.title} logo`}
                    className="max-h-16 max-w-[160px] object-contain drop-shadow-lg"
                    draggable={false}
                  />
                )}
                <span className="font-mono text-[10px] text-sky-light/70 mt-1">
                  {activeProjectDetail.category}
                </span>
              </div>
            )}
            {/* Live badge overlay matching Direct Portfolio View */}
            {activeProjectDetail.links?.demo && (
              <div className="absolute top-2.5 right-2.5">
                <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-red-500/20 border border-red-500/40 text-red-400 font-mono text-[9px] font-bold shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  LIVE
                </span>
              </div>
            )}
          </div>
        )}

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

        {/* Project Title with Application Logo Beside Name */}
        <div className="flex items-center gap-3">
          {activeProjectDetail.logo && (
            <img
              src={activeProjectDetail.logo}
              alt={`${activeProjectDetail.title} logo`}
              className="w-9 h-9 object-contain flex-shrink-0 rounded-md bg-deep-navy/80 p-0.5 border border-sky-blue/20"
              draggable={false}
            />
          )}
          <div>
            <h3 className="font-display font-extrabold text-2xl text-warm-ivory leading-snug">
              {activeProjectDetail.title}
            </h3>
            <p className="text-xs text-sky-light mt-0.5 font-mono">
              {activeProjectDetail.subtitle}
            </p>
          </div>
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

        {/* Action Links: Official GitHub Logo + Red Live Button */}
        <div className="pt-2 border-t border-sky-blue/15 flex flex-wrap items-center gap-3">
          {activeProjectDetail.links.github && (
            <a
              href={activeProjectDetail.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] px-3.5 py-1.5 rounded bg-deep-navy hover:bg-deep-navy-surface border border-sky-blue/30 text-warm-ivory hover:text-white hover:border-white/50 transition-colors shadow-sm"
              title={`View ${activeProjectDetail.title} on GitHub`}
              aria-label={`View ${activeProjectDetail.title} repository on GitHub`}
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          )}

          {activeProjectDetail.links.demo && (
            <a
              href={activeProjectDetail.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] px-3.5 py-1.5 rounded bg-red-600 hover:bg-red-500 text-white font-bold border border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.4)] transition-all active:scale-95"
              title={`Launch ${activeProjectDetail.title} Live Demo`}
              aria-label={`Launch ${activeProjectDetail.title} Live Demo`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>Live</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}

          {!activeProjectDetail.links.github && !activeProjectDetail.links.demo && (
            <span className="inline-flex items-center gap-2 px-3.5 py-2 bg-deep-navy border border-sky-blue/15 text-warm-ivory-dim/70 text-xs font-mono rounded">
              <FolderGit2 className="w-3.5 h-3.5 text-sky-light/50" />
              <span>SOURCE CODE: ON FILE // AVAILABLE UPON INQUIRY</span>
            </span>
          )}
        </div>
      </div>
    </Modal>
  )
}
