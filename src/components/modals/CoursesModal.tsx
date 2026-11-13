import React, { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { useObjectInspection } from '@/interactions/useObjectInspection'
import { educationData } from '@/data/education'
import { certificationsData } from '@/data/certifications'
import { CredlyBadge } from '@/components/portfolio/CredlyBadge'
import {
  Briefcase,
  GraduationCap,
  Calendar,
  BadgeCheck,
  MapPin,
  CheckCircle2,
  BookOpen,
  Cloud,
  Shield,
  Server,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sprout,
  Monitor,
  Globe,
  Award,
} from 'lucide-react'

import plantingSeedsCert from '@/assets/cert-planting-seeds.jpg'

// ─── Types ───────────────────────────────────────────────────────────────────
type TabId = 'work' | 'education' | 'seminars' | 'badges'

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'work', label: 'Work Experience', icon: <Briefcase className="w-3 h-3" /> },
  { id: 'education', label: 'Education', icon: <GraduationCap className="w-3 h-3" /> },
  { id: 'seminars', label: 'Seminars', icon: <Calendar className="w-3 h-3" /> },
  { id: 'badges', label: 'Badges', icon: <BadgeCheck className="w-3 h-3" /> },
]

// ─── Work Experience Data ─────────────────────────────────────────────────────
const workExperienceData = [
  {
    id: 'it-intern-lgu',
    title: 'Information Technology Intern',
    organization: 'City Agriculture Office – LGU Malaybalay, Bukidnon',
    period: 'June 2026',
    type: 'Internship',
    icon: <Monitor className="w-4 h-4 text-electric-blue" />,
    responsibilities: [
      'Developed and maintained the City Agriculture Procurement Monitoring System.',
      'Managed and validated records and document transactions using Excel and the Document Tracking System (DTS).',
      'Provided technical support for computer hardware, software, printers, and network-related issues.',
      'Installed and configured Windows, antivirus software, and office applications.',
    ],
  },
  {
    id: 'freelance-data-entry',
    title: 'Freelance Data Entry Assistant',
    organization: 'Freelance',
    period: '2025 – January 2026',
    type: 'Freelance',
    icon: <Briefcase className="w-4 h-4 text-muted-green-light" />,
    responsibilities: [
      'Encoded insurance sales data using Microsoft Excel.',
      'Maintained accurate and organized records.',
      'Completed time-sensitive data entry tasks.',
      'Responded to data update requests.',
    ],
  },
]

// ─── Seminars Data ────────────────────────────────────────────────────────────
const seminarsData = [
  {
    id: 'avalanche-team1',
    title: 'Avalanche Team1 University Connect',
    date: 'November 3, 2026',
    organizer: 'Central Mindanao University',
    venue: 'Central Mindanao University, Bukidnon, Philippines',
    icon: <Globe className="w-3.5 h-3.5 text-electric-blue" />,
    description:
      'A university-based learning and engagement activity providing academic and professional exposure through technology-related learning and industry perspectives.',
    keyAreas: [] as string[],
    hasCert: false,
  },
  {
    id: 'planting-seeds',
    title: 'Seminar on Planting Seeds of Service Excellence: Customer Service for Agricultural Stakeholders',
    date: 'April 10, 2026',
    organizer: 'City Agriculture Office – City of Malaybalay, Bukidnon',
    venue: 'Farmers Training Center, City Agriculture Office, Casisang, Malaybalay City, Bukidnon',
    icon: <Sprout className="w-3.5 h-3.5 text-muted-green-light" />,
    recognition: 'Certificate of Participation',
    description:
      'Participated in a seminar focused on strengthening the knowledge, skills, and commitment of participants in delivering quality and responsive customer service to farmers and other agricultural stakeholders, promoting service excellence and professionalism in public service within the agricultural sector.',
    keyAreas: [
      'Quality and responsive customer service',
      'Effective assistance to farmers and agricultural stakeholders',
      'Professionalism and commitment in public service',
      'Service excellence within the agricultural sector',
    ],
    hasCert: true,
  },
  {
    id: 'dost-sarai',
    title: 'DOST SARAI Training',
    date: 'March 13, 2026',
    organizer: 'Department of Science and Technology (DOST)',
    venue: 'Department of Science and Technology',
    icon: <Sprout className="w-3.5 h-3.5 text-sky-light" />,
    description:
      'A technical training focused on the use of the DOST Smarter Approaches to Reinvigorate Agriculture as an Industry (SARAI) system and Google Earth Engine, highlighting their relevance to agricultural information, geospatial data, and technology-assisted monitoring.',
    keyAreas: [
      'Introduction to the SARAI system',
      'Familiarization with Google Earth Engine',
      'Geospatial data and digital tools for agricultural monitoring',
    ],
    hasCert: false,
  },
  {
    id: 'cmu-it-seminars',
    title: 'Information Technology Seminars and Workshops',
    date: 'Academic Curriculum',
    organizer: 'Central Mindanao University',
    venue: 'Central Mindanao University, Bukidnon',
    icon: <Monitor className="w-3.5 h-3.5 text-electric-blue" />,
    description:
      'A collection of IT-related seminars and workshops attended during my academic experience, supporting continuous learning and exposure to information technology concepts and professional practices.',
    keyAreas: [] as string[],
    hasCert: false,
  },
]

// ─── Component ────────────────────────────────────────────────────────────────
export const CoursesModal: React.FC = () => {
  const { activeInspectionModal, closeInspection } = useObjectInspection()
  const [activeTab, setActiveTab] = useState<TabId>('work')
  const [expandedWork, setExpandedWork] = useState<string | null>('it-intern-lgu')
  const [certOpen, setCertOpen] = useState(false)

  // Reset tab & state when modal reopens
  React.useEffect(() => {
    if (activeInspectionModal === 'COURSES') {
      setActiveTab('work')
      setExpandedWork('it-intern-lgu')
      setCertOpen(false)
    }
  }, [activeInspectionModal])

  const courseworkItems = educationData.filter(
    (edu) => edu.type === 'COURSEWORK' || edu.type === 'TECHNICAL_KNOWLEDGE'
  )
  const degreeItem = educationData.find((edu) => edu.type === 'DEGREE')

  const getCourseIcon = (id: string) => {
    if (id.includes('cloud-security')) return <Shield className="w-4 h-4 text-pink-400" />
    if (id.includes('cloud')) return <Cloud className="w-4 h-4 text-sky-light" />
    return <Server className="w-4 h-4 text-electric-blue" />
  }

  return (
    <Modal
      isOpen={activeInspectionModal === 'COURSES'}
      onClose={closeInspection}
      title="UNIVERSITY BUILDING // PROFILE_RECORDS.DAT"
      subtitle="Professional experience, academic background, seminars & verified credentials"
      badge="PROFESSIONAL PROFILE"
      locationTag="UNIVERSITY BUILDING"
      maxWidth="3xl"
    >
      <div className="flex flex-col gap-4">
        {/* ── Tab Bar ── */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-deep-navy/60 border border-sky-blue/20 rounded-sm">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={[
                  'flex items-center justify-center gap-1.5 px-2 py-2 rounded-sm font-mono text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-200',
                  isActive
                    ? 'bg-electric-blue/20 border border-electric-blue/40 text-electric-blue shadow-sm'
                    : 'text-sky-light/50 hover:text-sky-light hover:bg-sky-blue/10 border border-transparent',
                ].join(' ')}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">
                  {tab.id === 'work' ? 'Work' : tab.id === 'education' ? 'Edu' : tab.id === 'seminars' ? 'Sem.' : 'Badges'}
                </span>
                {tab.id === 'badges' && (
                  <span className="ml-0.5 px-1 py-0.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[8px] rounded font-bold leading-none">
                    {certificationsData.length}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* ── Tab Content ── */}

        {/* ════════════════ WORK EXPERIENCE ════════════════ */}
        {activeTab === 'work' && (
          <div className="space-y-3">
            <p className="font-mono text-[10px] text-sky-light/50 uppercase tracking-wider">
              Professional Experience
            </p>

            <div className="relative pl-5 space-y-3">
              {/* timeline line */}
              <div className="absolute left-1.5 top-2 bottom-2 w-px bg-electric-blue/20" />

              {workExperienceData.map((job) => {
                const isExpanded = expandedWork === job.id
                return (
                  <div key={job.id} className="relative">
                    {/* timeline dot */}
                    <div className="absolute -left-[14px] top-3.5 w-2 h-2 rounded-full bg-electric-blue border-2 border-deep-navy" />

                    <div className="bg-deep-navy/70 border border-sky-blue/20 rounded-sm overflow-hidden hover:border-electric-blue/30 transition-colors">
                      {/* Header row — always visible */}
                      <button
                        className="w-full text-left p-4 flex items-start justify-between gap-3"
                        onClick={() => setExpandedWork(isExpanded ? null : job.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-1.5 bg-electric-blue/10 border border-electric-blue/20 rounded mt-0.5">
                            {job.icon}
                          </div>
                          <div>
                            <h4 className="font-display font-bold text-sm text-warm-ivory leading-tight">
                              {job.title}
                            </h4>
                            <p className="font-mono text-xs text-electric-blue mt-0.5">
                              {job.organization}
                            </p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="flex items-center gap-1 font-mono text-[10px] text-muted-green-light">
                                <Calendar className="w-3 h-3" />
                                {job.period}
                              </span>
                              <span className="px-1.5 py-0.5 bg-sky-blue/10 border border-sky-blue/20 rounded text-[9px] font-mono text-sky-light uppercase tracking-wider">
                                {job.type}
                              </span>
                            </div>
                          </div>
                        </div>
                        {isExpanded
                          ? <ChevronUp className="w-3.5 h-3.5 text-sky-light/40 flex-shrink-0 mt-1" />
                          : <ChevronDown className="w-3.5 h-3.5 text-sky-light/40 flex-shrink-0 mt-1" />
                        }
                      </button>

                      {/* Expanded responsibilities */}
                      {isExpanded && (
                        <div className="px-4 pb-4 space-y-1.5 border-t border-sky-blue/10 pt-3">
                          <p className="font-mono text-[10px] text-sky-light/50 uppercase tracking-wider mb-2">
                            Key Responsibilities
                          </p>
                          {job.responsibilities.map((r, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-warm-ivory-dim leading-relaxed">
                              <span className="text-electric-blue font-mono flex-shrink-0 mt-px">→</span>
                              <span>{r}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ════════════════ EDUCATION & COURSEWORK ════════════════ */}
        {activeTab === 'education' && (
          <div className="space-y-4">
            {/* Degree Card */}
            {degreeItem && (
              <div className="p-4 bg-deep-navy/70 border border-electric-blue/30 rounded-sm space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-electric-blue/15 border border-electric-blue/30 rounded">
                    <GraduationCap className="w-5 h-5 text-electric-blue" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-extrabold text-base text-warm-ivory leading-tight">
                      {degreeItem.degree}
                    </h3>
                    <p className="font-mono text-xs text-electric-blue mt-0.5">
                      {degreeItem.institution}
                    </p>
                    {degreeItem.specialization && (
                      <p className="font-mono text-[11px] text-sky-light/70 mt-0.5">
                        {degreeItem.specialization}
                      </p>
                    )}
                    <div className="flex flex-wrap items-center gap-3 mt-1.5">
                      <span className="flex items-center gap-1 font-mono text-[10px] text-muted-green-light">
                        <CheckCircle2 className="w-3 h-3" />
                        Graduated {degreeItem.period}
                      </span>
                      <span className="flex items-center gap-1 font-mono text-[10px] text-sky-light/60">
                        <MapPin className="w-3 h-3" />
                        {degreeItem.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1 border-t border-sky-blue/10">
                  {degreeItem.details.map((d, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-warm-ivory-dim leading-relaxed">
                      <span className="text-electric-blue font-mono flex-shrink-0">→</span>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Academic Coursework */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs text-sky-light font-semibold tracking-wider uppercase flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-electric-blue" />
                Academic Coursework Modules
              </h4>

              {courseworkItems.map((course) => (
                <div
                  key={course.id}
                  className="p-3.5 bg-deep-navy/60 border border-sky-blue/20 rounded-sm space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-electric-blue/15 border border-electric-blue/30 rounded">
                        {getCourseIcon(course.id)}
                      </div>
                      <h5 className="font-display font-bold text-sm text-warm-ivory">
                        {course.degree}
                      </h5>
                    </div>
                    <span className="text-[10px] font-mono text-muted-green-light flex items-center gap-1 ml-9 sm:ml-0">
                      <CheckCircle2 className="w-3 h-3" />
                      {course.period}
                    </span>
                  </div>

                  <p className="font-mono text-[11px] text-sky-light ml-9">
                    {course.institution}
                    {course.specialization && ` • ${course.specialization}`}
                  </p>

                  <div className="space-y-1 ml-9">
                    {course.details.map((d, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] text-warm-ivory-dim leading-relaxed">
                        <span className="text-electric-blue font-mono flex-shrink-0">→</span>
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>

                  {course.clarificationNote && (
                    <p className="ml-9 text-[10px] font-mono text-warm-ivory-dim/60 italic border-t border-sky-blue/10 pt-1.5">
                      {course.clarificationNote}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════ SEMINARS & TRAININGS ════════════════ */}
        {activeTab === 'seminars' && (
          <div className="space-y-3">
            <p className="font-mono text-[10px] text-sky-light/50 uppercase tracking-wider">
              Seminars, Trainings &amp; Professional Learning — Newest First
            </p>

            {seminarsData.map((sem) => (
              <div
                key={sem.id}
                className="bg-deep-navy/70 border border-sky-blue/20 rounded-sm overflow-hidden hover:border-electric-blue/20 transition-colors"
              >
                {/* Entry header */}
                <div className="p-4 space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 bg-electric-blue/10 border border-electric-blue/20 rounded flex-shrink-0 mt-0.5">
                      {sem.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-bold text-sm text-warm-ivory leading-snug">
                        {sem.title}
                      </h4>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5">
                        <span className="flex items-center gap-1 font-mono text-[10px] text-electric-blue">
                          <Calendar className="w-3 h-3" />
                          {sem.date}
                        </span>
                        <span className="flex items-center gap-1 font-mono text-[10px] text-sky-light/60">
                          <Award className="w-3 h-3" />
                          {sem.organizer}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-1 font-mono text-[10px] text-warm-ivory-dim/60">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{sem.venue}</span>
                      </div>
                      {'recognition' in sem && (
                        <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 bg-muted-green/15 border border-muted-green/30 rounded text-[9px] font-mono text-muted-green-light uppercase tracking-wider">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          {sem.recognition}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-warm-ivory-dim leading-relaxed pl-9">
                    {sem.description}
                  </p>

                  {/* Key areas */}
                  {sem.keyAreas.length > 0 && (
                    <div className="pl-9 space-y-1">
                      <p className="font-mono text-[10px] text-sky-light/50 uppercase tracking-wider">
                        Key Learning Areas
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {sem.keyAreas.map((area, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-sky-blue/10 border border-sky-blue/20 rounded text-[10px] font-mono text-sky-light"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Certificate preview (planting seeds only) */}
                {sem.hasCert && (
                  <div className="border-t border-sky-blue/10">
                    <button
                      onClick={() => setCertOpen((p) => !p)}
                      className="w-full flex items-center justify-between px-4 py-2.5 font-mono text-[10px] text-electric-blue hover:text-sky-light hover:bg-electric-blue/5 transition-colors"
                    >
                      <span className="flex items-center gap-1.5">
                        <Award className="w-3 h-3" />
                        {certOpen ? 'Hide Certificate' : 'View Certificate of Participation'}
                      </span>
                      {certOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>

                    {certOpen && (
                      <div className="px-4 pb-4">
                        <div className="rounded-sm overflow-hidden border border-sky-blue/20">
                          <img
                            src={plantingSeedsCert}
                            alt="Certificate of Participation — Seminar on Planting Seeds of Service Excellence"
                            className="w-full h-auto object-contain"
                            draggable={false}
                          />
                        </div>
                        <p className="mt-2 font-mono text-[9px] text-warm-ivory-dim/50 text-center">
                          Certificate of Participation — April 10, 2026 · City Agriculture Office, Malaybalay City
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ════════════════ BADGES ════════════════ */}
        {activeTab === 'badges' && (
          <div className="space-y-4">
            <p className="font-mono text-[10px] text-sky-light/50 uppercase tracking-wider flex items-center gap-1.5">
              <BadgeCheck className="w-3.5 h-3.5 text-electric-blue" />
              Official Cisco Credly Verified Badges
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {certificationsData.map((cert) => (
                <div
                  key={cert.id}
                  className="flex flex-col items-center gap-3 p-4 bg-deep-navy/70 border border-sky-blue/20 rounded-sm hover:border-electric-blue/40 transition-colors"
                >
                  <CredlyBadge
                    badgeId={cert.credlyBadgeId}
                    title={cert.title}
                    issuer={cert.issuer}
                    verificationUrl={cert.verificationUrl}
                    fallbackImageUrl={cert.badgeImageUrl}
                  />
                  <div className="text-center space-y-1 w-full">
                    <p className="font-mono text-[11px] text-warm-ivory font-semibold leading-snug">
                      {cert.title}
                    </p>
                    <p className="font-mono text-[9px] text-sky-light/60 uppercase tracking-wider">
                      {cert.category}
                    </p>
                    <p className="font-mono text-[9px] text-warm-ivory-dim/60">{cert.issuer}</p>
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-1 px-2 py-1 rounded bg-electric-blue/10 border border-electric-blue/30 text-[9px] font-mono text-electric-blue hover:bg-electric-blue/20 transition-colors"
                    >
                      <ExternalLink className="w-2.5 h-2.5" />
                      Verify on Credly
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[10px] font-mono text-warm-ivory-dim/40 text-center">
              All badges issued by Cisco through the official Credly platform.
            </p>
          </div>
        )}
      </div>
    </Modal>
  )
}
