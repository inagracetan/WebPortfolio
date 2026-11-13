import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Modal } from '@/components/ui/Modal'
import { experienceData } from '@/data/experience'
import { educationData, seminarsTrainingsData } from '@/data/education'
import { useGameStore } from '@/hooks/useGameStore'
import { Briefcase, GraduationCap, MapPin, Calendar, CheckCircle2, Info, BookOpen, Award } from 'lucide-react'
import { APPLE_SPRINGS, APPLE_EASE } from '@/styles/motion'

export const ExperienceModal: React.FC = () => {
  const { activeModal, closeModal } = useGameStore()
  const [activeTab, setActiveTab] = useState<'EXPERIENCE' | 'EDUCATION' | 'SEMINARS'>('EXPERIENCE')

  return (
    <Modal
      isOpen={activeModal === 'EXPERIENCE'}
      onClose={closeModal}
      title="UNIVERSITY_BUILDING // ACADEMIA_ARCHIVES.EXE"
      subtitle="Verified academic record at Central Mindanao University, freelance work history & specialized seminars"
      badge="CENTRAL MINDANAO UNIV"
      locationTag="UNIVERSITY BUILDING"
      maxWidth="3xl"
    >
      {/* Tab Switcher */}
      <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-sky-blue/15">
        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab('EXPERIENCE')}
          className={`relative flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono rounded transition-colors cursor-pointer z-10 ${
            activeTab === 'EXPERIENCE'
              ? 'text-deep-navy font-bold'
              : 'bg-deep-navy/60 text-warm-ivory-dim hover:text-warm-ivory hover:bg-deep-navy border border-sky-blue/20'
          }`}
        >
          {activeTab === 'EXPERIENCE' && (
            <motion.div
              layoutId="experience-tab-active-pill"
              className="absolute inset-0 bg-electric-blue rounded -z-10 shadow-[0_0_12px_rgba(0,240,255,0.35)]"
              transition={APPLE_SPRINGS.pill}
            />
          )}
          <Briefcase className="w-3.5 h-3.5" />
          <span>WORK EXPERIENCE</span>
        </motion.button>
        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab('EDUCATION')}
          className={`relative flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono rounded transition-colors cursor-pointer z-10 ${
            activeTab === 'EDUCATION'
              ? 'text-deep-navy font-bold'
              : 'bg-deep-navy/60 text-warm-ivory-dim hover:text-warm-ivory hover:bg-deep-navy border border-sky-blue/20'
          }`}
        >
          {activeTab === 'EDUCATION' && (
            <motion.div
              layoutId="experience-tab-active-pill"
              className="absolute inset-0 bg-electric-blue rounded -z-10 shadow-[0_0_12px_rgba(0,240,255,0.35)]"
              transition={APPLE_SPRINGS.pill}
            />
          )}
          <GraduationCap className="w-3.5 h-3.5" />
          <span>EDUCATION &amp; COURSEWORK</span>
        </motion.button>
        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab('SEMINARS')}
          className={`relative flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono rounded transition-colors cursor-pointer z-10 ${
            activeTab === 'SEMINARS'
              ? 'text-deep-navy font-bold'
              : 'bg-deep-navy/60 text-warm-ivory-dim hover:text-warm-ivory hover:bg-deep-navy border border-sky-blue/20'
          }`}
        >
          {activeTab === 'SEMINARS' && (
            <motion.div
              layoutId="experience-tab-active-pill"
              className="absolute inset-0 bg-electric-blue rounded -z-10 shadow-[0_0_12px_rgba(0,240,255,0.35)]"
              transition={APPLE_SPRINGS.pill}
            />
          )}
          <Award className="w-3.5 h-3.5" />
          <span>SEMINARS &amp; TRAININGS</span>
        </motion.button>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: APPLE_EASE }}
          className="space-y-6 pt-2"
        >
          {activeTab === 'EXPERIENCE' && (
          <div className="space-y-4">
            <div className="p-3 bg-deep-navy/80 border border-sky-blue/20 rounded-sm flex items-start gap-2.5 text-xs text-sky-light">
              <Info className="w-4 h-4 text-electric-blue flex-shrink-0 mt-0.5" />
              <p className="font-mono text-[11px] text-warm-ivory-dim">
                Verified work history containing confirmed roles and responsibilities. No unverified employers or speculative performance metrics are added.
              </p>
            </div>

            {experienceData.map((exp) => (
              <div
                key={exp.id}
                className="relative pl-6 border-l-2 border-sky-blue/30 space-y-2.5 pb-2"
              >
                {/* Timeline marker */}
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-deep-navy border-2 border-electric-blue" />

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h4 className="font-display font-bold text-base text-warm-ivory">
                    {exp.role}
                  </h4>
                  <div className="flex items-center gap-2 text-xs font-mono text-electric-blue">
                    <Calendar className="w-3 h-3" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-sky-light font-mono">
                  <span className="font-semibold text-warm-ivory">{exp.organization}</span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1 text-warm-ivory-dim/80">
                    <MapPin className="w-3 h-3 text-sky-light" />
                    {exp.location}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-warm-ivory-dim leading-relaxed">
                  {exp.summary}
                </p>

                {/* Verified Responsibilities */}
                <div className="space-y-2 pt-1">
                  <span className="font-mono text-xs text-sky-light font-semibold uppercase tracking-wider block">
                    Verified Key Responsibilities
                  </span>
                  {exp.responsibilities.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-warm-ivory-dim leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-muted-green-light flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies / Tools Used */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2 py-0.5 bg-sky-blue/10 text-sky-light rounded border border-sky-blue/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'EDUCATION' && (
          <div className="space-y-4">
            <div className="p-3 bg-deep-navy/80 border border-sky-blue/20 rounded-sm flex items-start gap-2.5 text-xs text-sky-light">
              <Info className="w-4 h-4 text-electric-blue flex-shrink-0 mt-0.5" />
              <p className="font-mono text-[11px] text-warm-ivory-dim">
                Coursework and laboratory training are presented honestly as academic modules completed within the IT curriculum and are not described as commercial certifications.
              </p>
            </div>

            {educationData.map((edu) => (
              <div
                key={edu.id}
                className="p-4 bg-deep-navy/70 border border-sky-blue/20 rounded-sm space-y-2.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h4 className="font-display font-bold text-base text-warm-ivory">
                    {edu.degree}
                  </h4>
                  <span className="text-xs font-mono text-electric-blue font-semibold">
                    {edu.period}
                  </span>
                </div>

                <div className="text-xs text-sky-light font-mono flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>
                    {edu.institution} &bull; {edu.location}
                  </span>
                </div>

                {edu.specialization && (
                  <div className="inline-block px-2.5 py-0.5 text-xs font-mono bg-sky-blue/15 text-sky-light border border-sky-blue/30 rounded">
                    Specialization: {edu.specialization}
                  </div>
                )}

                <div className="space-y-1.5 pt-1">
                  {edu.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-warm-ivory-dim leading-relaxed">
                      <span className="text-electric-blue font-mono">&rarr;</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

                {edu.clarificationNote && (
                  <div className="pt-1.5 text-[11px] font-mono text-warm-ivory-dim/75 italic border-t border-sky-blue/10">
                    {edu.clarificationNote}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'SEMINARS' && (
          <div className="space-y-4">
            <div className="p-3 bg-deep-navy/80 border border-sky-blue/20 rounded-sm flex items-start gap-2.5 text-xs text-sky-light">
              <Award className="w-4 h-4 text-electric-blue flex-shrink-0 mt-0.5" />
              <p className="font-mono text-[11px] text-warm-ivory-dim">
                Verified technical seminars, specialized technology trainings, and customer service workshops attended (from Tan_IG_CV.pdf).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {seminarsTrainingsData.map((st) => (
                <div
                  key={st.id}
                  className="p-4 bg-deep-navy/70 border border-sky-blue/20 rounded-sm space-y-2 font-mono text-xs"
                >
                  <h4 className="font-bold text-warm-ivory text-sm leading-snug">
                    {st.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-electric-blue text-xs font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{st.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sky-light text-[11px]">
                    <MapPin className="w-3 h-3 text-sky-light/80" />
                    <span>{st.venue}</span>
                  </div>
                  {st.details && (
                    <div className="flex flex-wrap gap-1 pt-1.5 border-t border-sky-blue/10">
                      {st.details.map((d, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-sky-blue/15 text-sky-light text-[10px] rounded border border-sky-blue/25"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  </Modal>
  )
}
