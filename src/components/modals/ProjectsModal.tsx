import React, { useState } from 'react'
import { Sparkles, CheckCircle2, Info, FolderGit2, Globe, Code2 } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { projectsData } from '@/data/projects'
import type { Project } from '@/data/types'
import { useGameStore } from '@/hooks/useGameStore'

export const ProjectsModal: React.FC = () => {
  const { activeModal, closeModal, selectedProjectId } = useGameStore()
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')

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
      isOpen={activeModal === 'PROJECTS'}
      onClose={closeModal}
      title="PROJECT_LAB // SHOWCASE_ARCHIVE.EXE"
      subtitle="Personal projects, academic capstones, mobile applications, cybersecurity analysis & enterprise systems"
      badge="6 PROJECTS"
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
                  <span className="font-display font-bold text-sm text-warm-ivory">
                    {proj.title}
                  </span>
                  {proj.isPersonalProject ? (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-sky-blue/15 text-sky-light border border-sky-blue/30 whitespace-nowrap">
                      PERSONAL
                    </span>
                  ) : proj.statusBadge && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-electric-blue/15 text-electric-blue border border-electric-blue/30 whitespace-nowrap">
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
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono text-electric-blue tracking-wider">
                {activeProject.category} &bull; {activeProject.role}
              </span>
              {activeProject.isPersonalProject ? (
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-sky-blue/15 text-sky-light border border-sky-blue/30 font-semibold">
                  PERSONAL PROJECT
                </span>
              ) : activeProject.statusBadge && (
                <span className="text-xs font-mono text-muted-green-light font-semibold">
                  {activeProject.statusBadge}
                </span>
              )}
            </div>
            <h3 className="font-display font-extrabold text-2xl text-warm-ivory mt-1">
              {activeProject.title}
            </h3>
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

          {/* Tech Stack — grouped if available, flat otherwise */}
          <div>
            <h4 className="font-mono text-xs text-warm-ivory font-semibold tracking-wider mb-2 uppercase">
              Technologies &amp; Methodologies
            </h4>
            {activeProject.techStackGrouped ? (
              <div className="space-y-2">
                {activeProject.techStackGrouped.map((group) => (
                  <div key={group.category}>
                    <div className="font-mono text-[10px] text-sky-light/70 uppercase tracking-wider mb-1">
                      {group.category}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs font-mono bg-deep-navy-surface text-sky-light border border-sky-blue/25 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
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
            )}
          </div>

          {/* Documentation / Notes */}
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

          {/* Action Links */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {activeProject.links.github ? (
              <a
                href={activeProject.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-deep-navy hover:bg-deep-navy-surface border border-sky-blue/30 text-warm-ivory hover:text-electric-blue text-xs font-mono rounded tracking-wider transition-colors"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>REPOSITORY</span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-deep-navy border border-sky-blue/15 text-warm-ivory-dim/70 text-xs font-mono rounded">
                <FolderGit2 className="w-3.5 h-3.5 text-sky-light/50" />
                <span>CODE REPOSITORY: ON FILE // AVAILABLE UPON REQUEST</span>
              </span>
            )}

            {activeProject.links.demo && (
              <a
                href={activeProject.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-electric-blue hover:bg-sky-light text-deep-navy text-xs font-mono font-bold rounded tracking-wider transition-colors shadow-[0_0_15px_rgba(0,240,255,0.4)]"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>LIVE DEMO</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}

