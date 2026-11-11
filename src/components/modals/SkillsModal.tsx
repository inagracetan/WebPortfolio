import React, { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { skillGroupsData } from '@/data/skills'
import { useGameStore } from '@/hooks/useGameStore'
import {
  Code2,
  Database,
  Network,
  ShieldCheck,
  FileSpreadsheet,
  Layers,
  Info,
  Cpu,
} from 'lucide-react'

export const SkillsModal: React.FC = () => {
  const { activeModal, closeModal } = useGameStore()
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL')

  const domains = ['ALL', ...skillGroupsData.map((g) => g.title)]

  const filteredGroups = skillGroupsData.filter((group) => {
    if (selectedDomain === 'ALL') return true
    return group.title === selectedDomain
  })

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
      isOpen={activeModal === 'SKILLS' || activeModal === 'TECH'}
      onClose={closeModal}
      title="TECH_CENTER // CAPABILITIES_MATRIX.EXE"
      subtitle="Futuristic glass pavilion housing verified proficiencies across Data Networking, IT Systems, Software & Cloud"
      badge="VERIFIED SKILLS"
      locationTag="TECH CENTER"
      maxWidth="4xl"
    >
      <div className="space-y-4">
        {/* Tech Center Architectural & Systems Overview */}
        <div className="p-3.5 bg-deep-navy-card/90 border border-sky-blue/30 rounded-sm flex items-start gap-3 text-xs shadow-md">
          <div className="p-2 rounded bg-sky-blue/10 border border-sky-blue/20 text-electric-blue flex-shrink-0 mt-0.5">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-warm-ivory text-xs uppercase tracking-wider">
                Tech Center Pavilion &bull; Core Competencies
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-electric-blue/15 text-electric-blue border border-electric-blue/30">
                ACTIVE
              </span>
            </div>
            <p className="font-sans text-xs text-warm-ivory-dim leading-relaxed">
              A modern technological pavilion surrounded by glowing circuit pathways, floating skill nodes, and real-time framework telemetry. proficiencies are verified through academic capstone projects at Central Mindanao University, industry-standard training (AWS Academy, Active Directory), and professional remote freelance experience.
            </p>
          </div>
        </div>

        {/* Domain Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pb-2.5 border-b border-sky-blue/15">
          {domains.map((domain) => (
            <button
              key={domain}
              type="button"
              onClick={() => setSelectedDomain(domain)}
              className={`px-3 py-1 text-xs font-mono rounded transition-all cursor-pointer ${
                selectedDomain === domain
                  ? 'bg-electric-blue text-deep-navy font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                  : 'bg-deep-navy/60 text-warm-ivory-dim hover:text-warm-ivory hover:bg-deep-navy border border-sky-blue/20'
              }`}
            >
              {domain}
            </button>
          ))}
        </div>

        {/* Verification Note */}
        <div className="p-3 bg-deep-navy/70 border border-sky-blue/20 rounded-sm flex items-start gap-2 text-xs text-sky-light">
          <Info className="w-4 h-4 text-electric-blue flex-shrink-0 mt-0.5" />
          <p className="font-mono text-[11px] text-warm-ivory-dim leading-relaxed">
            Proficiencies are represented transparently based on confirmed academic coursework,
            practical project implementations, and professional freelance experience (from Tan_IG_CV.pdf).
          </p>
        </div>

        {/* Skill Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredGroups.map((group) => (
            <div
              key={group.id}
              className="p-4 bg-deep-navy/70 border border-sky-blue/20 rounded-sm space-y-3 hover:border-sky-blue/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-sky-blue/10 border border-sky-blue/30 rounded">
                  {getIcon(group.icon)}
                </div>
                <div>
                  <h4 className="font-display font-bold text-base text-warm-ivory flex items-center gap-1.5">
                    <span>{group.title}</span>
                  </h4>
                  <p className="text-xs text-warm-ivory-dim/75 font-sans">
                    {group.description}
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-sky-blue/10">
                {group.skills.map((skill) => (
                  <div key={skill.name} className="flex justify-between items-center text-xs font-mono py-0.5">
                    <span className="text-warm-ivory flex items-center gap-1.5 font-medium">
                      {skill.name}
                      {skill.highlight && (
                        <span className="w-1.5 h-1.5 rounded-full bg-electric-blue shadow-[0_0_6px_rgba(0,240,255,0.8)]" />
                      )}
                    </span>
                    {skill.tag && (
                      <span className="text-sky-light text-[10px] bg-sky-blue/10 px-2 py-0.5 rounded border border-sky-blue/20">
                        {skill.tag}
                      </span>
                    )}
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
