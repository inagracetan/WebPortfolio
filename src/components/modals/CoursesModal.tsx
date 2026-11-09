import React from 'react'
import { Modal } from '@/components/ui/Modal'
import { useObjectInspection } from '@/interactions/useObjectInspection'
import { educationData } from '@/data/education'
import { BookOpen, CheckCircle2, Info, Cloud, Shield, Server } from 'lucide-react'

export const CoursesModal: React.FC = () => {
  const { activeInspectionModal, closeInspection } = useObjectInspection()

  // Filter for coursework and technical knowledge items
  const courseworkItems = educationData.filter(
    (edu) => edu.type === 'COURSEWORK' || edu.type === 'TECHNICAL_KNOWLEDGE'
  )

  const getCourseIcon = (id: string) => {
    if (id.includes('cloud-security')) {
      return <Shield className="w-4 h-4 text-pink-400" />
    }
    if (id.includes('cloud')) {
      return <Cloud className="w-4 h-4 text-sky-light" />
    }
    return <Server className="w-4 h-4 text-electric-blue" />
  }

  return (
    <Modal
      isOpen={activeInspectionModal === 'COURSES'}
      onClose={closeInspection}
      title="ACADEMIC TRAINING & COURSEWORK"
      subtitle="Institutional IT coursework, cloud foundations & system administration modules"
      badge="ACADEMIC COURSEWORK"
      maxWidth="3xl"
    >
      <div className="space-y-4">
        {/* Compliance Notice Banner */}
        <div className="p-3.5 bg-deep-navy/80 border border-sky-blue/20 rounded-sm flex items-start gap-2.5 text-xs text-sky-light">
          <Info className="w-4 h-4 text-electric-blue flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-mono font-bold text-electric-blue uppercase tracking-wider block">
              Official Coursework Notice
            </span>
            <p className="text-warm-ivory-dim font-sans leading-relaxed">
              The credentials listed below represent verified academic coursework and laboratory
              modules completed under the Information Technology curriculum at Central Mindanao
              University. They are presented honestly as academic coursework rather than commercial
              vendor certifications.
            </p>
          </div>
        </div>

        {/* Coursework Cards */}
        {courseworkItems.map((course) => (
          <div
            key={course.id}
            className="p-4 bg-deep-navy/70 border border-sky-blue/20 rounded-sm space-y-2.5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-electric-blue/15 border border-electric-blue/30 rounded text-electric-blue">
                  {getCourseIcon(course.id)}
                </div>
                <h4 className="font-display font-bold text-base text-warm-ivory">
                  {course.degree}
                </h4>
              </div>

              <span className="text-xs font-mono text-muted-green-light font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {course.period}
              </span>
            </div>

            <div className="text-xs text-sky-light font-mono flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>
                {course.institution} {course.specialization && `• ${course.specialization}`}
              </span>
            </div>

            <div className="space-y-1 pt-1">
              {course.details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-warm-ivory-dim leading-relaxed">
                  <span className="text-electric-blue font-mono">&rarr;</span>
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            {course.clarificationNote && (
              <div className="pt-1 text-[11px] font-mono text-warm-ivory-dim/75 italic border-t border-sky-blue/10">
                {course.clarificationNote}
              </div>
            )}
          </div>
        ))}
      </div>
    </Modal>
  )
}
