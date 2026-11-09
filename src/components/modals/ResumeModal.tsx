import React from 'react'
import { Modal } from '@/components/ui/Modal'
import { useGameStore } from '@/hooks/useGameStore'
import { contactData } from '@/data/contact'
import { experienceData } from '@/data/experience'
import { educationData } from '@/data/education'
import { projectsData } from '@/data/projects'
import { Printer, Download, MapPin, Mail, Award, CheckCircle2, GraduationCap, Briefcase, FolderGit2 } from 'lucide-react'

export const ResumeModal: React.FC = () => {
  const { activeModal, closeModal } = useGameStore()

  const handlePrint = () => {
    window.print()
  }

  return (
    <Modal
      isOpen={activeModal === 'RESUME'}
      onClose={closeModal}
      title="CURRICULUM VITAE // INA GRACE TAN"
      subtitle="Verified professional resume & candidate dossier"
      badge="VERIFIED DOSSIER"
      maxWidth="3xl"
    >
      <div className="space-y-6">
        {/* Top Header Card */}
        <div className="p-5 bg-deep-navy/80 border border-sky-blue/25 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-extrabold text-2xl text-warm-ivory">
              {contactData.name}
            </h3>
            <p className="font-mono text-xs text-electric-blue tracking-wider mt-0.5">
              {contactData.degree} &bull; Specialization in {contactData.specialization}
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-warm-ivory-dim font-mono">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-sky-light" />
                {contactData.location}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-sky-light" />
                {contactData.email}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 bg-deep-navy hover:bg-deep-navy-surface border border-sky-blue/30 text-warm-ivory hover:text-electric-blue text-xs font-mono rounded flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT</span>
            </button>
            <a
              href={`mailto:${contactData.email}?subject=Resume%20Inquiry%20-%20Ina%20Grace%20Tan`}
              className="px-3.5 py-2 bg-electric-blue hover:bg-sky-light text-deep-navy text-xs font-mono font-bold rounded flex items-center gap-1.5 transition-colors shadow-[0_0_12px_rgba(0,240,255,0.3)]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CONTACT</span>
            </a>
          </div>
        </div>

        {/* Professional Summary */}
        <div>
          <h4 className="font-mono text-xs text-sky-light font-semibold tracking-wider mb-2 uppercase">
            Professional Summary
          </h4>
          <p className="text-xs sm:text-sm text-warm-ivory-dim leading-relaxed bg-deep-navy/40 p-4 border border-sky-blue/15 rounded">
            Bachelor of Science in Information Technology student/graduate from Central Mindanao
            University with a specialization in Data Networking. Strong technical foundation in IT
            support, networking infrastructure, mobile software development using Flutter and Dart,
            cloud computing coursework (AWS Academy), and cybersecurity risk assessment.
            Demonstrated freelance track record in precise data encoding, record auditing, and digital
            information management under tight deadlines.
          </p>
        </div>

        {/* Core Competencies */}
        <div>
          <h4 className="font-mono text-xs text-sky-light font-semibold tracking-wider mb-2.5 flex items-center gap-1.5 uppercase">
            <Award className="w-3.5 h-3.5 text-electric-blue" />
            <span>Core Technical Competencies</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {[
              'Data Networking & Routing Fundamentals',
              'IT Support, Maintenance & Troubleshooting',
              'Mobile App Development (Flutter & Dart)',
              'Firebase Realtime Database & Cloud Firestore',
              'AWS Academy Cloud Foundations (Coursework)',
              'AWS Academy Cloud Security (Coursework)',
              'Active Directory & User Administration Fundamentals',
              'Microsoft Excel & Time-Sensitive Data Entry',
            ].map((strength, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 p-2 bg-deep-navy/60 border border-sky-blue/15 rounded text-warm-ivory-dim"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-muted-green-light flex-shrink-0" />
                <span>{strength}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Work Experience */}
        <div>
          <h4 className="font-mono text-xs text-sky-light font-semibold tracking-wider mb-2 flex items-center gap-1.5 uppercase">
            <Briefcase className="w-3.5 h-3.5 text-electric-blue" />
            <span>Verified Work Experience</span>
          </h4>
          <div className="space-y-3">
            {experienceData.map((exp) => (
              <div
                key={exp.id}
                className="p-3.5 bg-deep-navy/50 border border-sky-blue/15 rounded text-xs space-y-2"
              >
                <div className="flex justify-between font-mono">
                  <span className="font-bold text-warm-ivory">{exp.role}</span>
                  <span className="text-electric-blue">{exp.period}</span>
                </div>
                <div className="text-sky-light/80 font-mono text-[11px]">
                  {exp.organization} &bull; {exp.location}
                </div>
                <p className="text-warm-ivory-dim/90">{exp.summary}</p>
                <div className="space-y-1 pt-1">
                  {exp.responsibilities.map((resp, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-warm-ivory-dim/80">
                      <span className="text-electric-blue font-mono">&bull;</span>
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

        {/* Confirmed Project Portfolio */}
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
                <span className="font-bold text-warm-ivory block truncate">{p.title}</span>
                <span className="text-[11px] text-electric-blue block">{p.role}</span>
                <span className="text-[10px] text-sky-light/80 block">{p.techStack.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}
