import React from 'react'
import { Modal } from '@/components/ui/Modal'
import { useObjectInspection } from '@/interactions/useObjectInspection'
import { BookOpen, Laptop, Clock, Globe2, Sparkles, CheckCircle2 } from 'lucide-react'

export const PersonalProfileModal: React.FC = () => {
  const { activeInspectionModal, closeInspection } = useObjectInspection()

  const fastFacts = [
    {
      label: 'Specialization',
      value: 'BS IT — Data Networking (Central Mindanao University)',
      icon: <Laptop className="w-3.5 h-3.5 text-electric-blue" />,
    },
    {
      label: 'Location & Timezone',
      value: 'Bukidnon, Philippines • UTC+8',
      icon: <Globe2 className="w-3.5 h-3.5 text-sky-light" />,
    },
    {
      label: 'Work Approach',
      value: 'Accurate, methodical, organized, committed to deadlines',
      icon: <Clock className="w-3.5 h-3.5 text-muted-green-light" />,
    },
    {
      label: 'Core Interests',
      value: 'IT Support, Networking, Flutter Dev, Cloud, Cybersecurity',
      icon: <Sparkles className="w-3.5 h-3.5 text-warm-ivory" />,
    },
  ]

  const toolchain = [
    {
      category: 'Mobile & Software Development',
      tools: 'Flutter, Dart, Mobile UI Design, Web Development (HTML, CSS, JavaScript)',
    },
    {
      category: 'Networking & IT Infrastructure',
      tools: 'Computer Networking, IT Support, System Maintenance, Active Directory Fundamentals',
    },
    {
      category: 'Cloud & Database Services',
      tools: 'Firebase (Realtime Database, Firestore, Auth), AWS Academy Cloud Coursework',
    },
    {
      category: 'Productivity, Data & Creative Media',
      tools: 'Microsoft Excel (Encoding & Formulas), Data Entry, Graphic Design, Video Editing',
    },
  ]

  return (
    <Modal
      isOpen={activeInspectionModal === 'PROFILE'}
      onClose={closeInspection}
      title="DEVELOPER NOTEBOOK // PERSONAL PROFILE"
      subtitle="Verified facts, technical competencies, daily toolchain & professional focus"
      badge="PROFILE DOSSIER"
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Fast Facts Grid */}
        <div className="space-y-2">
          <h4 className="font-mono text-xs text-sky-light font-semibold tracking-wider flex items-center gap-2 uppercase">
            <BookOpen className="w-3.5 h-3.5 text-electric-blue" />
            <span>Profile Quick Reference</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {fastFacts.map((fact, idx) => (
              <div key={idx} className="p-3 bg-deep-navy/70 border border-sky-blue/15 rounded flex items-start gap-2.5">
                <div className="p-1 rounded bg-sky-blue/10 flex-shrink-0 mt-0.5">
                  {fact.icon}
                </div>
                <div>
                  <span className="font-mono text-[10px] text-sky-light/70 uppercase block">
                    {fact.label}
                  </span>
                  <span className="font-medium text-warm-ivory">
                    {fact.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Toolchains */}
        <div className="space-y-2">
          <h4 className="font-mono text-xs text-sky-light font-semibold tracking-wider flex items-center gap-2 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-electric-blue" />
            <span>Technical Capabilities &amp; Toolchain</span>
          </h4>

          <div className="space-y-2">
            {toolchain.map((item, idx) => (
              <div key={idx} className="p-3 bg-deep-navy/50 border border-sky-blue/15 rounded text-xs space-y-1">
                <span className="font-mono text-[11px] text-electric-blue font-semibold uppercase block">
                  {item.category}
                </span>
                <p className="text-warm-ivory-dim font-mono">
                  {item.tools}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Philosophy Note */}
        <div className="p-4 bg-muted-green-dark/20 border border-muted-green-light/30 rounded text-xs text-warm-ivory-dim leading-relaxed space-y-1.5">
          <span className="font-mono font-bold text-muted-green-light flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Dedicated Technical Work Ethic</span>
          </span>
          <p>
            Trained with a strong foundation in Data Networking at Central Mindanao University and
            strengthened by real-world freelance data entry accuracy, I believe that dependable IT
            infrastructure and user-centric software stem from thoroughness, continuous learning, and
            clean communication.
          </p>
        </div>
      </div>
    </Modal>
  )
}
