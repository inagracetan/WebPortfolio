import React, { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { useObjectInspection } from '@/interactions/useObjectInspection'
import { useGameStore } from '@/hooks/useGameStore'
import { educationData, seminarsTrainingsData } from '@/data/education'
import { certificationsData, CATEGORY_GRADIENTS } from '@/data/certifications'
import { CredlyBadge } from '@/components/portfolio/CredlyBadge'
import { CertificateModal } from '@/components/portfolio/CertificateModal'
import {
  BookOpen,
  CheckCircle2,
  Info,
  Cloud,
  Shield,
  Server,
  Award,
  Calendar,
  MapPin,
  Building2,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  X,
  Maximize2,
  ExternalLink,
} from 'lucide-react'

export const CoursesModal: React.FC = () => {
  const { activeInspectionModal, closeInspection } = useObjectInspection()
  const { activeModal, closeModal } = useGameStore()
  const [activeTab, setActiveTab] = useState<'COURSEWORK' | 'SEMINARS' | 'BADGES'>('COURSEWORK')
  const [expandedCertId, setExpandedCertId] = useState<string | null>(null)
  const [modalCert, setModalCert] = useState<{
    imageSrc: string
    title: string
    date?: string
    organizer?: string
  } | null>(null)

  const isCoursesOpen = activeInspectionModal === 'COURSES' || (activeModal as any) === 'COURSES'

  const handleCoursesClose = () => {
    closeInspection()
    if ((activeModal as any) === 'COURSES') {
      closeModal()
    }
  }

  const toggleCertificate = (id: string) => {
    setExpandedCertId((prev) => (prev === id ? null : id))
  }

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
    <>
      <Modal
        isOpen={isCoursesOpen}
        onClose={handleCoursesClose}
        title="ACADEMIA // COURSEWORK_RECORDS.DAT"
        subtitle="Institutional IT coursework, cloud foundations, directory services, verified seminars & digital badges"
        badge="ACADEMIC COURSEWORK"
        locationTag="UNIVERSITY BUILDING"
        maxWidth="4xl"
      >
        <div className="space-y-5">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-sky-blue/15">
            <button
              type="button"
              onClick={() => setActiveTab('COURSEWORK')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono rounded transition-all cursor-pointer ${
                activeTab === 'COURSEWORK'
                  ? 'bg-electric-blue text-deep-navy font-bold shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                  : 'bg-deep-navy/60 text-warm-ivory-dim hover:text-warm-ivory hover:bg-deep-navy border border-sky-blue/20'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>ACADEMIC COURSEWORK</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('SEMINARS')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono rounded transition-all cursor-pointer ${
                activeTab === 'SEMINARS'
                  ? 'bg-electric-blue text-deep-navy font-bold shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                  : 'bg-deep-navy/60 text-warm-ivory-dim hover:text-warm-ivory hover:bg-deep-navy border border-sky-blue/20'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>SEMINARS &amp; TRAININGS</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('BADGES')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono rounded transition-all cursor-pointer ${
                activeTab === 'BADGES'
                  ? 'bg-electric-blue text-deep-navy font-bold shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                  : 'bg-deep-navy/60 text-warm-ivory-dim hover:text-warm-ivory hover:bg-deep-navy border border-sky-blue/20'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>BADGES</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                {certificationsData.length}
              </span>
            </button>
          </div>

          {/* TAB 1: COURSEWORK */}
          {activeTab === 'COURSEWORK' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-deep-navy/80 border border-sky-blue/20 rounded-sm flex items-start gap-2.5 text-xs text-sky-light">
                <Info className="w-4 h-4 text-electric-blue flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-mono font-bold text-electric-blue uppercase tracking-wider block">
                    Official Coursework Notice
                  </span>
                  <p className="text-warm-ivory-dim font-sans leading-relaxed">
                    The credentials listed below represent verified academic coursework and laboratory
                    modules completed under the Information Technology curriculum at Central Mindanao University.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
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
            </div>
          )}

          {/* TAB 2: SEMINARS & TRAININGS */}
          {activeTab === 'SEMINARS' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-deep-navy/80 border border-sky-blue/20 rounded-sm flex items-start gap-2.5 text-xs text-sky-light">
                <Award className="w-4 h-4 text-electric-blue flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-mono font-bold text-electric-blue uppercase tracking-wider block">
                    Seminars &amp; Professional Trainings
                  </span>
                  <p className="text-warm-ivory-dim font-sans leading-relaxed">
                    Verified technical seminars and customer service workshops attended. Certificates are hidden by default and accessible via the View Certificate button.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {seminarsTrainingsData.map((st) => {
                  const isCertExpanded = expandedCertId === st.id
                  const hasCert = Boolean(st.hasCertificate && st.certificateUrl)

                  return (
                    <div
                      key={st.id}
                      className="p-5 bg-deep-navy/70 border border-sky-blue/20 rounded-lg space-y-3.5 font-mono text-xs hover:border-sky-blue/40 transition-colors"
                    >
                      {/* Top Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 border-b border-sky-blue/15 pb-2.5">
                        <div className="space-y-1">
                          <h4 className="font-bold text-warm-ivory text-sm sm:text-base leading-snug">
                            {st.title}
                          </h4>
                          <div className="flex flex-wrap items-center gap-3 text-[11px] text-sky-light">
                            {st.organizer && (
                              <span className="flex items-center gap-1.5 text-warm-ivory-dim">
                                <Building2 className="w-3.5 h-3.5 text-electric-blue" />
                                <span>{st.organizer}</span>
                              </span>
                            )}
                            <span className="flex items-center gap-1.5 text-electric-blue">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{st.date}</span>
                            </span>
                          </div>
                        </div>

                        {st.recognition && (
                          <span className="self-start px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            {st.recognition}
                          </span>
                        )}
                      </div>

                      {/* Location / Venue */}
                      {st.venue && (
                        <div className="flex items-center gap-1.5 text-sky-light/80 text-[11px]">
                          <MapPin className="w-3.5 h-3.5 text-sky-light/70 flex-shrink-0" />
                          <span>{st.venue}</span>
                        </div>
                      )}

                      {/* Description */}
                      {st.description && (
                        <p className="font-sans text-xs text-warm-ivory-dim leading-relaxed">
                          {st.description}
                        </p>
                      )}

                      {/* Topic Tags */}
                      {st.details && st.details.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {st.details.map((d, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-sky-blue/10 text-sky-light text-[10px] rounded border border-sky-blue/20"
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Certificate Actions & Viewer */}
                      <div className="pt-2 border-t border-sky-blue/15 flex flex-col gap-2">
                        <div className="flex items-center justify-between gap-2">
                          {hasCert ? (
                            <button
                              type="button"
                              onClick={() => toggleCertificate(st.id)}
                              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono font-semibold transition-all cursor-pointer ${
                                isCertExpanded
                                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                  : 'bg-electric-blue/15 text-electric-blue hover:bg-electric-blue/25 border border-electric-blue/30'
                              }`}
                              aria-expanded={isCertExpanded}
                            >
                              <Award className="w-3.5 h-3.5" />
                              <span>{isCertExpanded ? 'Hide Certificate' : 'View Certificate'}</span>
                              {isCertExpanded ? (
                                <ChevronUp className="w-3.5 h-3.5" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5" />
                              )}
                            </button>
                          ) : (
                            <div className="flex items-center gap-1.5 text-warm-ivory-dim/60 text-[11px]">
                              <ShieldCheck className="w-3.5 h-3.5 text-sky-light/60" />
                              <span>Institutional Curriculum Record (Official CV)</span>
                            </div>
                          )}

                          {hasCert && isCertExpanded && (
                            <button
                              type="button"
                              onClick={() =>
                                setModalCert({
                                  imageSrc: st.certificateUrl!,
                                  title: st.title,
                                  date: st.date,
                                  organizer: st.organizer,
                                })
                              }
                              className="inline-flex items-center gap-1 text-[11px] text-sky-light hover:text-electric-blue transition-colors cursor-pointer"
                              title="Inspect Full Certificate"
                            >
                              <Maximize2 className="w-3 h-3" />
                              <span className="hidden sm:inline">Fullscreen</span>
                            </button>
                          )}
                        </div>

                        {/* Inline Expandable Certificate (Hidden by default, displayed on demand) */}
                        {hasCert && isCertExpanded && (
                          <div className="mt-3 p-3 rounded-md bg-black/40 border border-sky-blue/30 space-y-2">
                            <div className="flex items-center justify-between pb-1.5 text-[10px] text-sky-light border-b border-white/10">
                              <span>OFFICIAL CERTIFICATE PREVIEW</span>
                              <button
                                type="button"
                                onClick={() => toggleCertificate(st.id)}
                                className="flex items-center gap-1 text-rose-300 hover:text-rose-200 cursor-pointer"
                              >
                                <X className="w-3.5 h-3.5" />
                                <span>Close</span>
                              </button>
                            </div>

                            <div
                              className="flex items-center justify-center overflow-hidden cursor-zoom-in group"
                              onClick={() =>
                                setModalCert({
                                  imageSrc: st.certificateUrl!,
                                  title: st.title,
                                  date: st.date,
                                  organizer: st.organizer,
                                })
                              }
                            >
                              <img
                                src={st.certificateUrl}
                                alt={`Certificate for ${st.title}`}
                                className="w-full max-h-[420px] object-contain rounded border border-sky-blue/20 shadow-lg group-hover:opacity-95 transition-opacity"
                                draggable={false}
                              />
                            </div>

                            <p className="text-[10px] text-center text-warm-ivory-dim/70 font-mono">
                              Click image or &quot;Fullscreen&quot; to inspect full resolution certificate
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* TAB 3: BADGES */}
          {activeTab === 'BADGES' && (
            <div className="space-y-5">
              <div className="story-header py-3 px-4 rounded-lg bg-deep-navy/90 border border-sky-blue/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-electric-blue/15 border border-electric-blue/30 text-electric-blue flex-shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-warm-ivory tracking-wide flex items-center gap-2">
                      <span>OFFICIAL CREDLY BADGES</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    </h3>
                    <p className="font-mono text-[11px] text-sky-light/70">
                      Official Cisco Credly Verified Digital Badges
                    </p>
                  </div>
                </div>

                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 font-mono text-[11px] text-emerald-400 font-bold self-start sm:self-auto">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>OFFICIAL CREDLY VERIFIED</span>
                </span>
              </div>

              {/* Cards Grid with Category Gradients - Matches Direct Portfolio View */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {certificationsData.map((cert) => {
                  const gradient = CATEGORY_GRADIENTS[cert.category] || CATEGORY_GRADIENTS['General IT']

                  return (
                    <div
                      key={cert.id}
                      className={`p-5 rounded-lg bg-gradient-to-b ${gradient.bg} border ${gradient.border} shadow-xl backdrop-blur-md flex flex-col justify-between space-y-4 transition-all`}
                    >
                      <div className="space-y-3.5">
                        {/* Category & Issuer Header */}
                        <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/10">
                          <span
                            className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold ${gradient.badgeBg} ${gradient.badgeText} border border-current/30 uppercase`}
                          >
                            {cert.category}
                          </span>
                          <span className="font-mono text-[11px] text-warm-ivory-dim/90 font-medium">
                            {cert.issuer}
                          </span>
                        </div>

                        {/* Centered Authentic Badge Display */}
                        <div className="flex justify-center py-1">
                          {cert.type === 'credly' && cert.credlyBadgeId ? (
                            <CredlyBadge
                              badgeId={cert.credlyBadgeId}
                              title={cert.title}
                              issuer={cert.issuer}
                              width={cert.width}
                              height={cert.height}
                              verificationUrl={cert.verificationUrl}
                              fallbackImageUrl={cert.badgeImageUrl}
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center p-4 rounded-md bg-deep-navy/80 border border-sky-blue/20 w-full text-center space-y-3">
                              {cert.badgeImageUrl && (
                                <img
                                  src={cert.badgeImageUrl}
                                  alt={cert.title}
                                  width={cert.width}
                                  height={cert.height}
                                  className="w-[110px] h-[110px] object-contain drop-shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-transform hover:scale-105"
                                />
                              )}
                              <div className="font-mono text-xs font-semibold text-warm-ivory">
                                {cert.title}
                              </div>
                              <span className="font-mono text-[10px] text-sky-light/80">
                                {cert.issueDate}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Credential Narrative Details */}
                        <div className="space-y-1.5 pt-1">
                          <h4 className="font-display font-bold text-sm text-warm-ivory leading-snug break-words">
                            {cert.title}
                          </h4>
                          <p className="font-sans text-xs text-warm-ivory-dim leading-relaxed break-words">
                            {cert.description}
                          </p>

                          {/* Skills Covered Pills */}
                          {cert.skillsCovered && (
                            <div className="flex flex-wrap gap-1.5 pt-1.5">
                              {cert.skillsCovered.map((sk) => (
                                <span
                                  key={sk}
                                  className="font-mono text-[9px] px-2 py-0.5 rounded bg-deep-navy/90 border border-sky-blue/20 text-sky-light"
                                >
                                  {sk}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card Footer: Credential ID & Direct Verify Action */}
                      <div className="pt-3 border-t border-white/10 font-mono text-[11px] flex flex-col gap-1.5">
                        {cert.credentialId && (
                          <div className="text-[10px] text-warm-ivory-dim/60 break-all">
                            ID: <span className="text-warm-ivory font-mono">{cert.credentialId}</span>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[10px] text-sky-light/80">
                            {cert.issueDate}
                          </span>
                          <a
                            href={cert.verificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-electric-blue hover:text-white font-bold text-xs transition-colors"
                            aria-label={`Open Credential for ${cert.title}`}
                          >
                            <span>INSPECT</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Lightbox Certificate Modal */}
      {modalCert && (
        <CertificateModal
          isOpen={Boolean(modalCert)}
          onClose={() => setModalCert(null)}
          imageSrc={modalCert.imageSrc}
          title={modalCert.title}
          date={modalCert.date}
          organizer={modalCert.organizer}
        />
      )}
    </>
  )
}
