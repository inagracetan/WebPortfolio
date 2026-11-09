import React from 'react'
import { Modal } from '@/components/ui/Modal'
import { useObjectInspection } from '@/interactions/useObjectInspection'
import { Code2, Database, Network, ShieldCheck, FileSpreadsheet, Layers, CheckCircle2 } from 'lucide-react'

export const SkillDetailModal: React.FC = () => {
  const { activeInspectionModal, activeSkillGroupDetail, closeInspection } = useObjectInspection()

  if (!activeSkillGroupDetail) return null

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-5 h-5 text-sky-light" />
      case 'Database':
        return <Database className="w-5 h-5 text-electric-blue" />
      case 'Network':
        return <Network className="w-5 h-5 text-sky-light" />
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-muted-green-light" />
      case 'FileSpreadsheet':
        return <FileSpreadsheet className="w-5 h-5 text-warm-ivory" />
      default:
        return <Layers className="w-5 h-5 text-sky-light" />
    }
  }

  return (
    <Modal
      isOpen={activeInspectionModal === 'SKILL_DETAIL'}
      onClose={closeInspection}
      title={activeSkillGroupDetail.title}
      subtitle={activeSkillGroupDetail.description}
      badge="CAPABILITY DOMAIN"
      maxWidth="3xl"
    >
      <div className="space-y-6">
        {/* Domain Overview Header */}
        <div className="p-4 bg-deep-navy/80 border border-sky-blue/20 rounded-sm flex items-center gap-3.5">
          <div className="p-2.5 bg-sky-blue/10 border border-sky-blue/30 rounded text-electric-blue">
            {getIcon(activeSkillGroupDetail.icon)}
          </div>
          <div>
            <h4 className="font-display font-bold text-lg text-warm-ivory">
              {activeSkillGroupDetail.title}
            </h4>
            <p className="text-xs text-sky-light font-mono mt-0.5">
              {activeSkillGroupDetail.description}
            </p>
          </div>
        </div>

        {/* Detailed Competency Matrix */}
        <div className="space-y-3">
          <h4 className="font-mono text-xs text-sky-light font-semibold tracking-wider uppercase">
            Competencies &amp; Honest Proficiency Representation
          </h4>

          <div className="space-y-3">
            {activeSkillGroupDetail.skills.map((skill) => (
              <div
                key={skill.name}
                className="p-3.5 bg-deep-navy/50 border border-sky-blue/15 rounded space-y-2"
              >
                <div className="flex flex-wrap justify-between items-center gap-2 text-xs font-mono">
                  <span className="font-bold text-warm-ivory flex items-center gap-2">
                    {skill.name}
                    {skill.highlight && (
                      <span className="px-1.5 py-0.2 text-[9px] bg-electric-blue/15 text-electric-blue border border-electric-blue/30 rounded">
                        KEY FOCUS
                      </span>
                    )}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-sky-light/90 bg-sky-blue/10 px-2 py-0.5 rounded font-mono">
                      {skill.proficiencyLabel}
                    </span>
                    <span className="text-electric-blue font-bold">{skill.level}%</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-2 w-full bg-deep-navy-surface rounded-full overflow-hidden border border-sky-blue/20">
                  <div
                    className="h-full bg-gradient-to-r from-sky-blue via-electric-blue to-sky-light rounded-full"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

                <div className="text-[11px] font-mono text-warm-ivory-dim/75">
                  Category: <span className="text-sky-light">{skill.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Practical Application Highlight */}
        <div className="p-3.5 bg-muted-green-dark/20 border border-muted-green-light/30 rounded text-xs text-warm-ivory-dim flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-muted-green-light flex-shrink-0 mt-0.5" />
          <span>
            Skills are demonstrated in academic capstones, group projects, and verified freelance roles. Continuous learning is applied through hands-on laboratory exercises and documentation.
          </span>
        </div>
      </div>
    </Modal>
  )
}
