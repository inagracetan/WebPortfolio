import React from 'react'
import { Modal } from '@/components/ui/Modal'
import { skillGroupsData } from '@/data/skills'
import { useGameStore } from '@/hooks/useGameStore'
import { Code2, Database, Network, ShieldCheck, FileSpreadsheet, Layers, Info } from 'lucide-react'

export const SkillsModal: React.FC = () => {
  const { activeModal, closeModal } = useGameStore()

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
      isOpen={activeModal === 'SKILLS'}
      onClose={closeModal}
      title="TECH CENTER // TECHNICAL CAPABILITIES"
      subtitle="Organized competency matrix across programming, networking, cloud, security & productivity"
      badge="VERIFIED SKILLS"
      maxWidth="3xl"
    >
      <div className="space-y-4">
        {/* Verification Note */}
        <div className="p-3 bg-deep-navy/80 border border-sky-blue/20 rounded-sm flex items-start gap-2 text-xs text-sky-light">
          <Info className="w-4 h-4 text-electric-blue flex-shrink-0 mt-0.5" />
          <p className="font-mono text-[11px] text-warm-ivory-dim leading-relaxed">
            Proficiencies are represented transparently based on confirmed academic coursework,
            practical project implementations, and professional freelance experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillGroupsData.map((group) => (
            <div
              key={group.id}
              className="p-4 bg-deep-navy/70 border border-sky-blue/20 rounded-sm space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-sky-blue/10 border border-sky-blue/30 rounded">
                  {getIcon(group.icon)}
                </div>
                <div>
                  <h4 className="font-display font-bold text-base text-warm-ivory">
                    {group.title}
                  </h4>
                  <p className="text-xs text-warm-ivory-dim/75 font-sans">
                    {group.description}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-sky-blue/10">
                {group.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-warm-ivory flex items-center gap-1.5 font-medium">
                        {skill.name}
                        {skill.highlight && (
                          <span className="w-1.5 h-1.5 rounded-full bg-electric-blue" />
                        )}
                      </span>
                      <span className="text-sky-light text-[10px] bg-sky-blue/10 px-1.5 py-0.5 rounded">
                        {skill.proficiencyLabel}
                      </span>
                    </div>

                    {/* Skill level indicator */}
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 flex-1 bg-deep-navy-surface rounded-full overflow-hidden border border-sky-blue/20">
                        <div
                          className="h-full bg-gradient-to-r from-sky-blue to-electric-blue rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <span className="font-mono text-[10px] text-warm-ivory-dim/70 w-8 text-right">
                        {skill.level}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}
