import React, { useState, useEffect, useRef } from 'react'
import { Modal } from '@/components/ui/Modal'
import { useObjectInspection } from '@/interactions/useObjectInspection'
import { educationData, seminarsTrainingsData } from '@/data/education'
import { certificationsData } from '@/data/certifications'
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
  ExternalLink,
  ShieldCheck,
} from 'lucide-react'

// ─── Tab definitions ──────────────────────────────────────────────────────────
type Tab = 'coursework' | 'seminars' | 'badges'

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'coursework', label: 'Coursework', icon: <BookOpen className="w-3.5 h-3.5" /> },
  { id: 'seminars', label: 'Seminars', icon: <Calendar className="w-3.5 h-3.5" /> },
  { id: 'badges', label: 'Badges', icon: <Award className="w-3.5 h-3.5" /> },
]

// ─── Badge IDs (official Credly) ──────────────────────────────────────────────
const BADGE_IDS = [
  'e8ec67d0-dccb-40a5-abe6-80508f090357',
  '4432b001-1021-4a74-bcbe-13994156f7fa',
  '1bcf100a-5261-49d2-9213-e9be7cea8d9c',
]

// ─── Credly embed panel ───────────────────────────────────────────────────────
// Loads the official Credly embed.js once and re-initialises on tab activation.
// Falls back to badge artwork images if the embed script is blocked.
function CredlyEmbedBadges({ active }: { active: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scriptLoaded = useRef(false)

  useEffect(() => {
    if (!active) return

    const tryInit = () => {
      const w = window as any
      if (typeof w.CL?.widget?.loadAll === 'function') w.CL.widget.loadAll()
      else if (typeof w.__credly?.loadBadges === 'function') w.__credly.loadBadges()
    }

    // Script already on page — just re-trigger init
    if (document.querySelector('script[src*="credly.com/assets/utilities/embed.js"]')) {
      scriptLoaded.current = true
      setTimeout(tryInit, 150)
      return
    }

    if (scriptLoaded.current) {
      setTimeout(tryInit, 100)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://cdn.credly.com/assets/utilities/embed.js'
    script.async = true
    script.onload = () => {
      scriptLoaded.current = true
      setTimeout(tryInit, 150)
    }
    document.body.appendChild(script)
  }, [active])

  return (
    <div ref={containerRef} className="space-y-6">
      <p className="font-mono text-[11px] text-sky-light/60 text-center leading-relaxed">
        Click any badge to verify on Credly &nbsp;·&nbsp; Issued by Cisco
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {certificationsData.map((cert, i) => (
          <div key={cert.id} className="flex flex-col items-center gap-3">
            {/* Official Credly embed container — initialized by embed.js */}
            <div
              className="w-full flex justify-center min-h-[150px]"
              data-iframe-width="150"
              data-iframe-height="270"
              data-share-badge-id={BADGE_IDS[i]}
              data-share-badge-host="https://www.credly.com"
            />

            {/* Always-visible fallback artwork — shown until embed hydrates */}
            <a
              href={cert.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={`Verify ${cert.title} on Credly`}
              className="block hover:scale-105 transition-transform duration-200"
            >
              <img
                src={cert.badgeImageUrl}
                alt={`${cert.title} — issued by ${cert.issuer}`}
                className="w-28 h-28 object-contain drop-shadow-[0_4px_24px_rgba(0,240,255,0.2)]"
                draggable={false}
              />
            </a>

            {/* Metadata */}
            <div className="text-center space-y-1 w-full">
              <p className="font-mono text-[11px] text-warm-ivory font-semibold leading-snug">
                {cert.title}
              </p>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[9px] font-bold">
                <ShieldCheck className="w-2.5 h-2.5" />
                {cert.category}
              </span>
              <div className="pt-1">
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] font-mono text-electric-blue hover:text-sky-light transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  Verify on Credly
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main modal ───────────────────────────────────────────────────────────────
export const CoursesModal: React.FC = () => {
  const { activeInspectionModal, closeInspection } = useObjectInspection()
  const [activeTab, setActiveTab] = useState<Tab>('coursework')

  // Reset tab when modal closes
  useEffect(() => {
    if (activeInspectionModal !== 'COURSES') {
      setActiveTab('coursework')
    }
  }, [activeInspectionModal])

  const courseworkItems = educationData.filter(
    (edu) => edu.type === 'COURSEWORK' || edu.type === 'TECHNICAL_KNOWLEDGE'
  )

  const getCourseIcon = (id: string) => {
    if (id.includes('cloud-security')) return <Shield className="w-4 h-4 text-pink-400" />
    if (id.includes('cloud')) return <Cloud className="w-4 h-4 text-sky-light" />
    return <Server className="w-4 h-4 text-electric-blue" />
  }

  return (
    <Modal
      isOpen={activeInspectionModal === 'COURSES'}
      onClose={closeInspection}
      title="ACADEMIA // COURSEWORK_RECORDS.DAT"
      subtitle="Institutional IT coursework, cloud foundations, directory services &amp; verified badges"
      badge="ACADEMIC COURSEWORK"
      locationTag="UNIVERSITY BUILDING"
      maxWidth="3xl"
    >
      <div className="space-y-5">

        {/* ── Notice banner ───────────────────────────────────────────────── */}
        <div className="p-3.5 bg-deep-navy/80 border border-sky-blue/20 rounded-sm flex items-start gap-2.5 text-xs text-sky-light">
          <Info className="w-4 h-4 text-electric-blue flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-mono font-bold text-electric-blue uppercase tracking-wider block">
              Official Coursework &amp; Training Notice
            </span>
            <p className="text-warm-ivory-dim font-sans leading-relaxed">
              Verified academic coursework, laboratory modules, industry seminars, and official
              Cisco digital badges earned under the IT curriculum at Central Mindanao University
              and cooperating agencies.
            </p>
          </div>
        </div>

        {/* ── Tab navigation ─────────────────────────────────────────────── */}
        <div
          className="flex gap-1 p-1 bg-deep-navy/60 border border-sky-blue/15 rounded-sm"
          role="tablist"
          aria-label="University Building sections"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`tab-panel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={[
                'flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-sm font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-electric-blue',
                activeTab === tab.id
                  ? 'bg-electric-blue/20 border border-electric-blue/40 text-electric-blue shadow-[0_0_8px_rgba(0,240,255,0.15)]'
                  : 'text-sky-light/60 hover:text-sky-light hover:bg-sky-blue/10 border border-transparent',
              ].join(' ')}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.id === 'badges' && (
                <span className="ml-0.5 px-1.5 py-0 rounded bg-emerald-500/20 text-emerald-400 text-[8px] font-bold border border-emerald-500/30 leading-4">
                  3
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── COURSEWORK panel ───────────────────────────────────────────── */}
        {activeTab === 'coursework' && (
          <div id="tab-panel-coursework" role="tabpanel" className="space-y-3">
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
                    {course.institution}
                    {course.specialization && ` • ${course.specialization}`}
                  </span>
                </div>

                <div className="space-y-1 pt-1">
                  {course.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-warm-ivory-dim leading-relaxed">
                      <span className="text-electric-blue font-mono flex-shrink-0">→</span>
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
        )}

        {/* ── SEMINARS panel ─────────────────────────────────────────────── */}
        {activeTab === 'seminars' && (
          <div id="tab-panel-seminars" role="tabpanel" className="space-y-3">
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
                  <span className="font-bold text-warm-ivory text-xs leading-snug block">
                    {st.title}
                  </span>
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
                        <span
                          key={i}
                          className="px-1.5 py-0.5 bg-sky-blue/10 text-sky-light text-[9px] rounded border border-sky-blue/20"
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

        {/* ── BADGES panel ───────────────────────────────────────────────── */}
        {activeTab === 'badges' && (
          <div id="tab-panel-badges" role="tabpanel">
            <div className="mb-4 flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-electric-blue" />
              <h4 className="font-mono text-xs text-electric-blue font-bold tracking-wider uppercase">
                Official Cisco Credly Verified Badges
              </h4>
            </div>
            <div className="p-5 bg-deep-navy/60 border border-electric-blue/20 rounded-sm">
              <CredlyEmbedBadges active={activeTab === 'badges'} />
            </div>
          </div>
        )}

      </div>
    </Modal>
  )
}
