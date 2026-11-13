import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Modal } from '@/components/ui/Modal'
import { useGameStore } from '@/hooks/useGameStore'
import { contactData } from '@/data/contact'
import { experienceData } from '@/data/experience'
import { educationData, seminarsTrainingsData } from '@/data/education'
import { skillGroupsData } from '@/data/skills'
import { projectsData } from '@/data/projects'
import { APPLE_SPRINGS, APPLE_EASE } from '@/styles/motion'
import {
  Printer,
  Download,
  MapPin,
  Mail,
  Phone,
  FileText,
  Award,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  FolderGit2,
  ExternalLink,
  Code2,
} from 'lucide-react'

export const ResumeModal: React.FC = () => {
  const { activeModal, closeModal } = useGameStore()
  const [activeTab, setActiveTab] = useState<'PDF' | 'INTERACTIVE'>('PDF')

  const handlePrint = () => {
    const printWindow = window.open('/Tan_IG_CV.pdf', '_blank')
    if (printWindow) {
      printWindow.focus()
      try {
        printWindow.onload = () => {
          printWindow.print()
        }
      } catch {
        // Fallback handled by browser
      }
    } else {
      window.print()
    }
  }

  return (
    <Modal
      isOpen={activeModal === 'RESUME'}
      onClose={closeModal}
      title="RESUME_DOSSIER // TAN_IG_CV.PDF"
      subtitle="Verified professional resume & authoritative candidate dossier"
      badge="AUTHORITATIVE CV"
      locationTag="CANDIDATE DOSSIER"
      maxWidth="4xl"
    >
      <div className="space-y-5">
        {/* Top Header Card */}
        <div className="p-4 sm:p-5 bg-deep-navy/90 border border-sky-blue/30 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-warm-ivory tracking-wide">
              {contactData.name}
            </h3>
            <p className="font-mono text-xs text-electric-blue tracking-wider font-semibold">
              {contactData.degree} &bull; {contactData.title.split(' | ')[1]}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 text-xs text-warm-ivory-dim font-mono">
              <a
                href={`tel:${contactData.phone}`}
                className="flex items-center gap-1.5 text-electric-blue hover:underline"
              >
                <Phone className="w-3.5 h-3.5 text-sky-light" />
                <span className="font-bold">{contactData.phoneFormatted}</span>
              </a>
              <a
                href={`mailto:${contactData.email}`}
                className="flex items-center gap-1.5 text-sky-light hover:underline"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{contactData.email}</span>
              </a>
              <span className="flex items-center gap-1.5 text-warm-ivory-dim">
                <MapPin className="w-3.5 h-3.5 text-sky-light" />
                <span>{contactData.location}</span>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 bg-deep-navy hover:bg-deep-navy-surface border border-sky-blue/30 text-warm-ivory hover:text-electric-blue text-xs font-mono rounded flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Print CV document"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT</span>
            </button>
            <a
              href="/Tan_IG_CV.pdf"
              download="Tan_IG_CV.pdf"
              className="px-4 py-2 bg-electric-blue hover:bg-sky-light text-deep-navy text-xs font-mono font-bold rounded flex items-center gap-1.5 transition-colors shadow-[0_0_12px_rgba(0,240,255,0.35)] cursor-pointer"
              title="Download original Tan_IG_CV.pdf"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD PDF</span>
            </a>
          </div>
        </div>

        {/* View Mode Tabs: PDF View vs Interactive Dossier */}
        <div className="flex items-center gap-2 border-b border-sky-blue/20 pb-2">
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('PDF')}
            className={`relative flex items-center gap-2 px-4 py-2 text-xs font-mono rounded transition-colors cursor-pointer z-10 ${
              activeTab === 'PDF'
                ? 'text-deep-navy font-bold'
                : 'bg-deep-navy/60 text-warm-ivory-dim hover:text-warm-ivory hover:bg-deep-navy border border-sky-blue/20'
            }`}
          >
            {activeTab === 'PDF' && (
              <motion.div
                layoutId="resume-tab-active-pill"
                className="absolute inset-0 bg-electric-blue rounded -z-10 shadow-[0_0_12px_rgba(0,240,255,0.35)]"
                transition={APPLE_SPRINGS.pill}
              />
            )}
            <FileText className="w-3.5 h-3.5" />
            <span>ORIGINAL PDF VIEW</span>
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('INTERACTIVE')}
            className={`relative flex items-center gap-2 px-4 py-2 text-xs font-mono rounded transition-colors cursor-pointer z-10 ${
              activeTab === 'INTERACTIVE'
                ? 'text-deep-navy font-bold'
                : 'bg-deep-navy/60 text-warm-ivory-dim hover:text-warm-ivory hover:bg-deep-navy border border-sky-blue/20'
            }`}
          >
            {activeTab === 'INTERACTIVE' && (
              <motion.div
                layoutId="resume-tab-active-pill"
                className="absolute inset-0 bg-electric-blue rounded -z-10 shadow-[0_0_12px_rgba(0,240,255,0.35)]"
                transition={APPLE_SPRINGS.pill}
              />
            )}
            <Award className="w-3.5 h-3.5" />
            <span>INTERACTIVE DOSSIER</span>
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {/* TAB 1: Authentic PDF Document View */}
          {activeTab === 'PDF' && (
            <motion.div
              key="resume-pdf-tab"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: APPLE_EASE }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between px-2 text-xs font-mono text-warm-ivory-dim">
                <span className="text-sky-light">Authoritative Document // Tan_IG_CV.pdf (2 Pages)</span>
                <a
                  href="/Tan_IG_CV.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="text-electric-blue hover:underline flex items-center gap-1"
                >
                  <span>Open in Full Tab</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="w-full rounded border border-sky-blue/30 overflow-hidden bg-slate-900 shadow-inner">
                <iframe
                  src="/Tan_IG_CV.pdf"
                  className="w-full h-[62vh] min-h-[500px]"
                  title="Ina Grace D. Tan - Curriculum Vitae"
                />
              </div>

              <p className="text-[11px] font-mono text-warm-ivory-dim/70 text-center">
                Viewing authentic original PDF document. If preview is not supported on your mobile browser, click{' '}
                <a href="/Tan_IG_CV.pdf" download="Tan_IG_CV.pdf" className="text-electric-blue underline">
                  Download PDF
                </a>{' '}
                or switch to the Interactive Dossier tab.
              </p>
            </motion.div>
          )}

          {/* TAB 2: Structured Interactive Dossier View */}
          {activeTab === 'INTERACTIVE' && (
            <motion.div
              key="resume-interactive-tab"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: APPLE_EASE }}
              className="space-y-6 pt-1"
            >
            {/* Professional Summary */}
            <div>
              <h4 className="font-mono text-xs text-sky-light font-semibold tracking-wider mb-2 uppercase">
                Professional Profile
              </h4>
              <p className="text-xs sm:text-sm text-warm-ivory-dim leading-relaxed bg-deep-navy/40 p-4 border border-sky-blue/15 rounded">
                {contactData.bio}
              </p>
            </div>

            {/* Core Technical Skills by Category */}
            <div>
              <h4 className="font-mono text-xs text-sky-light font-semibold tracking-wider mb-2.5 flex items-center gap-1.5 uppercase">
                <Code2 className="w-3.5 h-3.5 text-electric-blue" />
                <span>Technical Skills &amp; Competencies (From CV)</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                {skillGroupsData.map((group) => (
                  <div
                    key={group.id}
                    className="p-3 bg-deep-navy/60 border border-sky-blue/15 rounded space-y-1.5"
                  >
                    <span className="font-mono text-[11px] font-bold text-electric-blue uppercase block">
                      {group.title}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {group.skills.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.5 bg-deep-navy text-[10px] font-mono text-warm-ivory rounded border border-sky-blue/20"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Work Experience */}
            <div>
              <h4 className="font-mono text-xs text-sky-light font-semibold tracking-wider mb-2 flex items-center gap-1.5 uppercase">
                <Briefcase className="w-3.5 h-3.5 text-electric-blue" />
                <span>Work Experience &amp; Internship</span>
              </h4>
              <div className="space-y-3">
                {experienceData.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-3.5 bg-deep-navy/50 border border-sky-blue/15 rounded text-xs space-y-2"
                  >
                    <div className="flex justify-between font-mono">
                      <span className="font-bold text-warm-ivory text-sm">{exp.role}</span>
                      <span className="text-electric-blue font-semibold">{exp.period}</span>
                    </div>
                    <div className="text-sky-light/80 font-mono text-[11px]">
                      {exp.organization} &bull; {exp.location}
                    </div>
                    <p className="text-warm-ivory-dim/90">{exp.summary}</p>
                    <div className="space-y-1 pt-1">
                      {exp.responsibilities.map((resp, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-warm-ivory-dim/80">
                          <CheckCircle2 className="w-3 h-3 text-muted-green-light flex-shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Academic Coursework */}
            <div>
              <h4 className="font-mono text-xs text-sky-light font-semibold tracking-wider mb-2 flex items-center gap-1.5 uppercase">
                <GraduationCap className="w-3.5 h-3.5 text-electric-blue" />
                <span>Education &amp; Academic Training</span>
              </h4>
              <div className="space-y-2.5">
                {educationData.map((edu) => (
                  <div
                    key={edu.id}
                    className="p-3 bg-deep-navy/50 border border-sky-blue/15 rounded text-xs font-mono space-y-1"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-bold text-warm-ivory">{edu.degree}</span>
                      <span className="text-electric-blue text-[11px] whitespace-nowrap">{edu.period}</span>
                    </div>
                    <div className="text-sky-light text-[11px]">
                      {edu.institution} {edu.specialization && `• ${edu.specialization}`}
                    </div>
                    {edu.clarificationNote && (
                      <p className="text-[10px] text-warm-ivory-dim/70 italic pt-0.5">
                        {edu.clarificationNote}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Seminars and Trainings Attended */}
            <div>
              <h4 className="font-mono text-xs text-sky-light font-semibold tracking-wider mb-2 flex items-center gap-1.5 uppercase">
                <Award className="w-3.5 h-3.5 text-electric-blue" />
                <span>Seminars &amp; Trainings Attended (From CV)</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {seminarsTrainingsData.map((st) => (
                  <div
                    key={st.id}
                    className="p-3 bg-deep-navy/50 border border-sky-blue/15 rounded space-y-1 font-mono"
                  >
                    <span className="font-bold text-warm-ivory block">{st.title}</span>
                    <span className="text-electric-blue text-[11px] block">{st.date}</span>
                    <span className="text-warm-ivory-dim/70 text-[10px] block">{st.venue}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Confirmed Projects */}
            <div>
              <h4 className="font-mono text-xs text-sky-light font-semibold tracking-wider mb-2 flex items-center gap-1.5 uppercase">
                <FolderGit2 className="w-3.5 h-3.5 text-electric-blue" />
                <span>Confirmed Projects</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {projectsData.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 bg-deep-navy/40 border border-sky-blue/15 rounded space-y-1 font-mono"
                  >
                    <span className="font-bold text-warm-ivory block break-words">{p.title}</span>
                    <span className="text-[11px] text-electric-blue block">{p.role}</span>
                    <span className="text-[10px] text-sky-light/80 block">{p.techStack.join(', ')}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </Modal>
  )
}
