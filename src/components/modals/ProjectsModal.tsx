import React, { useState } from 'react'
import { ExternalLink, Sparkles, CheckCircle2, Info, FolderGit2 } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { projectsData } from '@/data/projects'
import type { Project } from '@/data/types'
import { useGameStore } from '@/hooks/useGameStore'
import { useObjectInspection } from '@/interactions/useObjectInspection'

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

export const ProjectsModal: React.FC = () => {
  const { activeModal, closeModal, selectedProjectId } = useGameStore()
  const { activeInspectionModal, closeInspection } = useObjectInspection()
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')

  const isProjectsOpen = activeModal === 'PROJECTS' || (activeInspectionModal as any) === 'PROJECTS'

  const handleProjectsClose = () => {
    closeModal()
    if ((activeInspectionModal as any) === 'PROJECTS') {
      closeInspection()
    }
  }

  const categories = ['ALL', ...Array.from(new Set(projectsData.map((p) => p.category)))]

  const filteredProjects = projectsData.filter((p) => {
    if (selectedCategory === 'ALL') return true
    return p.category === selectedCategory
  })

  const [activeProject, setActiveProject] = useState<Project>(
    projectsData.find((p) => p.id === selectedProjectId) || projectsData[0]
  )

  return (
    <Modal
      isOpen={isProjectsOpen}
      onClose={handleProjectsClose}
      title="PROJECT_LAB // SHOWCASE_ARCHIVE.EXE"
      subtitle="Academic capstones, mobile applications, cybersecurity analysis & enterprise systems"
      badge="5 PROJECTS"
      locationTag="PROJECT LAB"
      maxWidth="4xl"
    >
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-1.5 pb-2.5 border-b border-sky-blue/15">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 text-xs font-mono rounded transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-electric-blue text-deep-navy font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                : 'bg-deep-navy/60 text-warm-ivory-dim hover:text-warm-ivory hover:bg-deep-navy border border-sky-blue/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
        {/* Project Selector List (Left) */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[55vh] overflow-y-auto pr-1">
          {filteredProjects.map((proj) => {
            const isSelected = activeProject.id === proj.id
            return (
              <button
                key={proj.id}
                type="button"
                onClick={() => setActiveProject(proj)}
                className={`w-full text-left p-3.5 rounded-sm border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-deep-navy-surface border-electric-blue text-warm-ivory shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                    : 'bg-deep-navy/50 border-sky-blue/15 text-warm-ivory-dim hover:border-sky-blue/40 hover:text-warm-ivory'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 min-w-0">
                    {proj.logo && (
                      <img
                        src={proj.logo}
                        alt=""
                        className="w-5 h-5 object-contain flex-shrink-0 rounded bg-deep-navy/80 p-0.5 border border-sky-blue/20"
                        draggable={false}
                      />
                    )}
                    <span className="font-display font-bold text-sm text-warm-ivory truncate">
                      {proj.title}
                    </span>
                  </div>
                  {proj.statusBadge && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-electric-blue/15 text-electric-blue border border-electric-blue/30 whitespace-nowrap flex-shrink-0">
                      {proj.statusBadge.split(' // ')[0]}
                    </span>
                  )}
                </div>
                <p className="text-xs text-warm-ivory-dim/80 font-sans mb-2 leading-relaxed break-words">
                  {proj.subtitle}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono text-sky-light bg-sky-blue/10 px-2 py-0.5 rounded">
                    {proj.category}
                  </span>
                  {proj.metrics && (
                    <span className="text-[10px] font-mono text-muted-green-light break-words">
                      {proj.metrics}
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Project Deep Dive (Right) */}
        <div className="lg:col-span-7 bg-deep-navy/70 border border-sky-blue/20 rounded-sm p-5 space-y-4">
          {/* Screenshot / Preview Container Above Title */}
          {(activeProject.previewScreenshot || activeProject.logo) && (
            <div className="relative w-full aspect-[2/1] rounded overflow-hidden border border-sky-blue/25 bg-deep-navy shadow-inner group/preview">
              {activeProject.previewScreenshot ? (
                <>
                  <img
                    src={activeProject.previewScreenshot}
                    alt={`${activeProject.title} preview`}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/preview:scale-[1.03]"
                    draggable={false}
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-deep-navy/90 to-transparent pointer-events-none" />
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-deep-navy-surface/80">
                  <div className="absolute inset-0 bg-game-grid opacity-20 pointer-events-none" />
                  {activeProject.logo && (
                    <img
                      src={activeProject.logo}
                      alt={`${activeProject.title} logo`}
                      className="max-h-16 max-w-[160px] object-contain drop-shadow-lg"
                      draggable={false}
                    />
                  )}
                  <span className="font-mono text-[10px] text-sky-light/70 mt-1">
                    {activeProject.category}
                  </span>
                </div>
              )}
              {/* Live badge overlay matching Direct Portfolio View */}
              {activeProject.links?.demo && (
                <div className="absolute top-2.5 right-2.5">
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-red-500/20 border border-red-500/40 text-red-400 font-mono text-[9px] font-bold shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    LIVE
                  </span>
                </div>
              )}
            </div>
          )}

          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono text-electric-blue tracking-wider">
                {activeProject.category} &bull; {activeProject.role}
              </span>
              {activeProject.statusBadge && (
                <span className="text-xs font-mono text-muted-green-light font-semibold">
                  {activeProject.statusBadge}
                </span>
              )}
            </div>

            {/* Application Logo Beside Project Name */}
            <div className="flex items-center gap-3 mt-1.5">
              {activeProject.logo && (
                <img
                  src={activeProject.logo}
                  alt={`${activeProject.title} logo`}
                  className="w-9 h-9 object-contain flex-shrink-0 rounded-md bg-deep-navy/80 p-0.5 border border-sky-blue/20"
                  draggable={false}
                />
              )}
              <h3 className="font-display font-extrabold text-2xl text-warm-ivory leading-snug">
                {activeProject.title}
              </h3>
            </div>

            <p className="text-sm text-sky-light mt-1 font-medium">
              {activeProject.subtitle}
            </p>
          </div>

          <p className="text-sm text-warm-ivory-dim leading-relaxed">
            {activeProject.description}
          </p>

          {/* Key Features */}
          <div>
            <h4 className="font-mono text-xs text-warm-ivory font-semibold tracking-wider mb-2 flex items-center gap-1.5 uppercase">
              <Sparkles className="w-3.5 h-3.5 text-electric-blue" />
              <span>Project Highlights &amp; Scope</span>
            </h4>
            <div className="space-y-1.5">
              {activeProject.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-warm-ivory-dim">
                  <CheckCircle2 className="w-3.5 h-3.5 text-muted-green-light flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Badges */}
          <div>
            <h4 className="font-mono text-xs text-warm-ivory font-semibold tracking-wider mb-2 uppercase">
              Technologies &amp; Methodologies
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {activeProject.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-xs font-mono bg-deep-navy-surface text-sky-light border border-sky-blue/25 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Documentation & Screenshot Placeholder Notice */}
          <div className="p-3 bg-deep-navy/90 border border-sky-blue/15 rounded flex items-start gap-2 text-xs text-warm-ivory-dim">
            <Info className="w-4 h-4 text-sky-light flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-mono text-[11px] text-sky-light font-semibold block">
                Verification &amp; Documentation Status
              </span>
              <p className="font-mono text-[11px] text-warm-ivory-dim/80">
                {activeProject.documentationNotes ||
                  'Project specifications verified. Additional screenshots and demonstration links remain accessible upon formal academic inquiry.'}
              </p>
            </div>
          </div>

          {/* Action Links: Official GitHub Logo + Red Live Button */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {activeProject.links.github && (
              <a
                href={activeProject.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] px-3.5 py-1.5 rounded bg-deep-navy hover:bg-deep-navy-surface border border-sky-blue/30 text-warm-ivory hover:text-white hover:border-white/50 transition-colors shadow-sm"
                title={`View ${activeProject.title} on GitHub`}
                aria-label={`View ${activeProject.title} repository on GitHub`}
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            )}

            {activeProject.links.demo && (
              <a
                href={activeProject.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] px-3.5 py-1.5 rounded bg-red-600 hover:bg-red-500 text-white font-bold border border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.4)] transition-all active:scale-95"
                title={`Launch ${activeProject.title} Live Demo`}
                aria-label={`Launch ${activeProject.title} Live Demo`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>Live</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {!activeProject.links.github && !activeProject.links.demo && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-deep-navy border border-sky-blue/15 text-warm-ivory-dim/70 text-xs font-mono rounded">
                <FolderGit2 className="w-3.5 h-3.5 text-sky-light/50" />
                <span>DOCUMENTATION CASE STUDY // ON FILE</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}
