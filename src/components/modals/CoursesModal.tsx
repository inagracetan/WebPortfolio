import React from 'react'
import { Modal } from '@/components/ui/Modal'
import { useObjectInspection } from '@/interactions/useObjectInspection'
import { educationData, seminarsTrainingsData } from '@/data/education'
import { certificationsData } from '@/data/certifications'
import { CredlyBadge } from '@/components/portfolio/CredlyBadge'
import { BookOpen, CheckCircle2, Info, Cloud, Shield, Server, Award, Calendar, MapPin, ExternalLink } from 'lucide-react'

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
      title="ACADEMIA // COURSEWORK_RECORDS.DAT"
      subtitle="Institutional IT coursework, cloud foundations, directory services & verified seminars"
      badge="ACADEMIC COURSEWORK"
      locationTag="UNIVERSITY BUILDING"
      maxWidth="3xl"
    >
      <div className="space-y-5">
        {/* Compliance Notice Banner */}
        <div className="p-3.5 bg-deep-navy/80 border border-sky-blue/20 rounded-sm flex items-start gap-2.5 text-xs text-sky-light">
          <Info className="w-4 h-4 text-electric-blue flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-mono font-bold text-electric-blue uppercase tracking-wider block">
              Official Coursework &amp; Training Notice
            </span>
            <p className="text-warm-ivory-dim font-sans leading-relaxed">
              The credentials listed below represent verified academic coursework, laboratory
              modules, and industry seminars attended under the Information Technology curriculum at
              Central Mindanao University and cooperating agencies.
            </p>
          </div>
        </div>

        {/* Official Credly Verified Badges */}
        <div className="space-y-3">
          <h3 className="font-mono text-xs text-electric-blue font-bold tracking-wider uppercase flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            Official Cisco Credly Verified Badges
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {certificationsData.map((cert) => (
              <div key={cert.id} className="space-y-2">
                <CredlyBadge
                  badgeId={cert.credlyBadgeId}
                  title={cert.title}
                  issuer={cert.issuer}
                  verificationUrl={cert.verificationUrl}
                  fallbackImageUrl={cert.badgeImageUrl}
                />
                <div className="text-center space-y-0.5">
                  <p className="font-mono text-[10px] text-warm-ivory font-semibold leading-snug">{cert.title}</p>
                  <p className="font-mono text-[9px] text-sky-light/60">{cert.category}</p>
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[9px] font-mono text-electric-blue hover:text-sky-light transition-colors"
                  >
                    <ExternalLink className="w-2.5 h-2.5" />
                    Verify on Credly
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Coursework Cards */}
        <div className="space-y-3">
          <h4 className="font-mono text-xs text-sky-light font-semibold tracking-wider uppercase flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-electric-blue" />
            <span>Academic Coursework Modules</span>
          </h4>

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

        {/* Seminars & Professional Trainings Section */}
        <div className="space-y-3 pt-2">
          <h4 className="font-mono text-xs text-sky-light font-semibold tracking-wider uppercase flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-electric-blue" />
            <span>Seminars &amp; Workshops Attended (From CV)</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {seminarsTrainingsData.map((st) => (
              <div
                key={st.id}
                className="p-3.5 bg-deep-navy/60 border border-sky-blue/20 rounded-sm space-y-1.5 font-mono"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-bold text-warm-ivory text-xs leading-snug">
                    {st.title}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-electric-blue text-[11px]">
                  <Calendar className="w-3 h-3" />
                  <span>{st.date}</span>
                </div>
                <div className="flex items-center gap-1.5 text-warm-ivory-dim/80 text-[10px]">
                  <MapPin className="w-3 h-3 text-sky-light" />
                  <span>{st.venue}</span>
                </div>
                {st.details && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {st.details.map((d, i) => (
                      <span key={i} className="px-1.5 py-0.5 bg-sky-blue/10 text-sky-light text-[9px] rounded border border-sky-blue/20">
                        {d}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}
