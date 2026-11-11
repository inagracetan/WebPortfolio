import React, { useState, useEffect } from 'react'
import {
  House,
  UserRound,
  FileUser,
  Briefcase,
  GraduationCap,
  FolderKanban,
  Brain,
  Award,
  Mail,
  Globe2,
  Download,
  Phone,
  MapPin,
  ExternalLink,
  CheckCircle2,
  ArrowUp,
  Sparkles,
  Layers,
  Send,
  ShieldCheck,
} from 'lucide-react'
import { useGameStore } from '@/hooks/useGameStore'
import { projectsData } from '@/data/projects'
import { skillGroupsData } from '@/data/skills'
import { experienceData } from '@/data/experience'
import { educationData } from '@/data/education'
import { contactData } from '@/data/contact'
import { certificationsData, CATEGORY_GRADIENTS } from '@/data/certifications'
import { CredlyBadge } from './CredlyBadge'
import { TechLogo } from './TechLogo'
import { DirectPortfolioNav } from './DirectPortfolioNav'

// Exact 9-section order required
const SECTIONS = [
  { id: 'home', label: 'Home', icon: House },
  { id: 'about', label: 'About Me', icon: UserRound },
  { id: 'resume', label: 'Resume', icon: FileUser },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'skills', label: 'Technical Skills', icon: Brain },
  { id: 'certifications', label: 'Certifications & Badges', icon: Award },
  { id: 'contact', label: 'Contact', icon: Mail },
] as const

export const DirectPortfolioView: React.FC = () => {
  const { enterWorld } = useGameStore()
  const [activeSection, setActiveSection] = useState<string>('home')
  const [formSent, setFormSent] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  // Active section scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 220
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id)
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(SECTIONS[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSent(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' })
      setFormSent(false)
    }, 4500)
  }

  return (
    <div className="fixed inset-0 z-30 overflow-y-auto bg-deep-navy text-warm-ivory font-sans selection:bg-electric-blue selection:text-deep-navy">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-blue/15 via-transparent to-deep-navy" />
      <div className="fixed inset-0 pointer-events-none opacity-20 scanlines" />

      {/* INA.EXE REDESIGNED NAVIGATION BAR */}
      <DirectPortfolioNav
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* MAIN CONTENT CONTAINER */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-20 relative z-10">
        {/* ========================================================= */}
        {/* SECTION 1: HOME / INTRODUCTION */}
        {/* ========================================================= */}
        <section id="home" className="pt-6 sm:pt-10 scroll-mt-24">
          <div className="p-6 sm:p-10 rounded-lg bg-deep-navy-card/80 border border-sky-blue/25 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-electric-blue/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-blue/15 border border-electric-blue/30 font-mono text-xs text-electric-blue">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>DIRECT PORTFOLIO DOSSIER</span>
                </div>

                <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-warm-ivory tracking-tight leading-tight">
                  {contactData.name}
                </h1>

                <p className="font-mono text-sm sm:text-base text-electric-blue font-semibold">
                  Bachelor of Science in Information Technology &bull; Major in Data Networking
                </p>

                <p className="font-sans text-sm sm:text-base text-warm-ivory-dim leading-relaxed">
                  {contactData.bio}
                </p>

                {/* Direct Contact Pills */}
                <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
                  <a
                    href={`tel:${contactData.phone}`}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-deep-navy/90 border border-sky-blue/25 text-warm-ivory hover:text-electric-blue hover:border-electric-blue transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-electric-blue" />
                    <span>{contactData.phoneFormatted}</span>
                  </a>

                  <a
                    href={`mailto:${contactData.email}`}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-deep-navy/90 border border-sky-blue/25 text-warm-ivory hover:text-electric-blue hover:border-electric-blue transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-electric-blue" />
                    <span>{contactData.email}</span>
                  </a>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-deep-navy/90 border border-sky-blue/25 text-warm-ivory-dim">
                    <MapPin className="w-3.5 h-3.5 text-sky-light" />
                    <span>{contactData.location}</span>
                  </div>
                </div>

                {/* Primary CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-4 font-mono text-xs">
                  <a
                    href="/Tan_IG_CV.pdf"
                    download="Tan_IG_CV.pdf"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-electric-blue hover:bg-white text-deep-navy font-bold transition-all shadow-lg active:scale-95"
                  >
                    <Download className="w-4 h-4" />
                    <span>DOWNLOAD CV (PDF)</span>
                  </a>

                  <button
                    type="button"
                    onClick={enterWorld}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-deep-navy hover:bg-sky-blue/20 border border-electric-blue/40 text-electric-blue font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <Globe2 className="w-4 h-4" />
                    <span>EXPLORE 3D ARCHIPELAGO</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection('certifications')}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-warm-ivory transition-colors cursor-pointer"
                  >
                    <Award className="w-4 h-4 text-electric-blue" />
                    <span>CREDLY BADGES</span>
                  </button>
                </div>
              </div>

              {/* Quick Stat Card */}
              <div className="w-full lg:w-80 p-5 rounded-lg bg-deep-navy/90 border border-sky-blue/20 font-mono text-xs space-y-3.5 shadow-xl">
                <div className="flex items-center justify-between pb-2 border-b border-sky-blue/15 text-sky-light">
                  <span className="font-bold uppercase tracking-wider">CANDIDATE METRICS</span>
                  <span className="text-[10px] text-electric-blue">VERIFIED</span>
                </div>

                <div className="space-y-2.5">
                  <div>
                    <div className="text-[10px] text-warm-ivory-dim/70">ACADEMIC ALMA MATER</div>
                    <div className="text-warm-ivory font-semibold">Central Mindanao University</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-warm-ivory-dim/70">ACADEMIC HONORS</div>
                    <div className="text-cyber-yellow font-semibold">College Scholar</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-warm-ivory-dim/70">TECHNICAL SPECIALIZATION</div>
                    <div className="text-electric-blue font-semibold">Major in Data Networking</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-warm-ivory-dim/70">OFFICIAL BADGES</div>
                    <div className="text-emerald-400 font-semibold">3 Cisco Credly Badges Verified</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: ABOUT ME */}
        {/* ========================================================= */}
        <section id="about" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-3 border-b border-sky-blue/20 pb-3">
            <UserRound className="w-6 h-6 text-electric-blue" />
            <div>
              <h2 className="font-display font-bold text-2xl text-warm-ivory tracking-wide">
                ABOUT ME
              </h2>
              <p className="font-mono text-xs text-sky-light/70">
                Candidate Profile, Background &amp; Professional Objectives
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4 p-6 rounded-lg bg-deep-navy-card/60 border border-sky-blue/20 shadow-md">
              <h3 className="font-mono text-sm font-bold text-electric-blue uppercase tracking-wider">
                Professional Profile
              </h3>
              <p className="font-sans text-sm text-warm-ivory leading-relaxed">
                Graduated with a Bachelor of Science in Information Technology, specializing in Data Networking from Central Mindanao University (July 2026). Achieved College Scholar recognition throughout academic tenure.
              </p>
              <p className="font-sans text-sm text-warm-ivory-dim leading-relaxed">
                Demonstrated practical competence in database administration, network segmentation (VLANs, DHCP, IP addressing), directory management fundamentals, and systems development. Experienced through an intensive IT internship at the City Agriculture Office (LGU Malaybalay) and hands-on freelance data entry and information management engagements.
              </p>
              <p className="font-sans text-sm text-warm-ivory-dim leading-relaxed">
                Eager to bring disciplined technical skills, high data accuracy, and collaborative problem-solving to technical teams in network engineering, systems administration, database management, and technical support.
              </p>
            </div>

            <div className="space-y-4 p-6 rounded-lg bg-deep-navy-card/60 border border-sky-blue/20 font-mono text-xs shadow-md">
              <h3 className="font-bold text-sky-light uppercase tracking-wider">
                Core Focus Areas
              </h3>
              <ul className="space-y-2.5 text-warm-ivory-dim">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-electric-blue flex-shrink-0 mt-0.5" />
                  <span>Network Configuration, Switching &amp; VLANs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-electric-blue flex-shrink-0 mt-0.5" />
                  <span>Relational &amp; Cloud Databases (MySQL, Firebase)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-electric-blue flex-shrink-0 mt-0.5" />
                  <span>Administrative Systems &amp; Procurement Tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-electric-blue flex-shrink-0 mt-0.5" />
                  <span>Workstation Troubleshooting &amp; Technical Support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-electric-blue flex-shrink-0 mt-0.5" />
                  <span>Item &amp; Event Photography (Lucky Bliss Studio)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: RESUME (CV) */}
        {/* ========================================================= */}
        <section id="resume" className="scroll-mt-24 space-y-6">
          <div className="flex items-center justify-between border-b border-sky-blue/20 pb-3">
            <div className="flex items-center gap-3">
              <FileUser className="w-6 h-6 text-electric-blue" />
              <div>
                <h2 className="font-display font-bold text-2xl text-warm-ivory tracking-wide">
                  CURRICULUM VITAE (CV)
                </h2>
                <p className="font-mono text-xs text-sky-light/70">
                  Authoritative Candidate Dossier &bull; Tan_IG_CV.pdf
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="/Tan_IG_CV.pdf"
                download="Tan_IG_CV.pdf"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-electric-blue/15 hover:bg-electric-blue text-electric-blue hover:text-deep-navy border border-electric-blue/40 rounded-full font-mono text-xs font-bold transition-all shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">DOWNLOAD PDF</span>
              </a>

              <button
                type="button"
                onClick={() => window.open('/Tan_IG_CV.pdf', '_blank')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-deep-navy-card/90 hover:bg-deep-navy border border-sky-blue/25 text-warm-ivory rounded-full font-mono text-xs transition-colors cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-sky-light" />
                <span className="hidden sm:inline">VIEW FULLSCREEN</span>
              </button>
            </div>
          </div>

          <div className="p-6 rounded-lg bg-deep-navy-card/80 border border-sky-blue/25 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sky-blue/15">
              <div>
                <h3 className="font-display font-bold text-xl text-warm-ivory">
                  INA GRACE D. TAN
                </h3>
                <p className="font-mono text-xs text-electric-blue mt-0.5">
                  BS Information Technology &bull; Major in Data Networking
                </p>
              </div>
              <div className="font-mono text-xs text-warm-ivory-dim/80 space-y-1">
                <div>Phone: 0955-290-0484</div>
                <div>Email: inagracetan@gmail.com</div>
                <div>Location: Valencia City, Bukidnon</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
              <div className="space-y-2">
                <h4 className="font-bold text-electric-blue uppercase tracking-wider">
                  Summary of Qualifications
                </h4>
                <ul className="space-y-1.5 text-warm-ivory-dim list-disc pl-4">
                  <li>Bachelor of Science in Information Technology (Major in Data Networking)</li>
                  <li>College Scholar at Central Mindanao University (Graduation: July 2026)</li>
                  <li>Hands-on IT internship with procurement systems and document tracking</li>
                  <li>Verified on-site freelance data entry and sales records maintenance</li>
                  <li>Cisco Credly Verified in Cybersecurity, IT Customer Support, and Security Analysis</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-sky-light uppercase tracking-wider">
                  Target IT Roles
                </h4>
                <ul className="space-y-1.5 text-warm-ivory-dim list-disc pl-4">
                  <li>Data Networking &amp; Infrastructure Specialist</li>
                  <li>Database Administrator / Data Analyst</li>
                  <li>Junior Software / Mobile App Developer</li>
                  <li>IT Support Specialist &amp; Workstation Technician</li>
                  <li>Junior Cybersecurity Analyst / SOC Tier 1</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 4: WORK EXPERIENCE */}
        {/* ========================================================= */}
        <section id="experience" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-3 border-b border-sky-blue/20 pb-3">
            <Briefcase className="w-6 h-6 text-electric-blue" />
            <div>
              <h2 className="font-display font-bold text-2xl text-warm-ivory tracking-wide">
                WORK EXPERIENCE
              </h2>
              <p className="font-mono text-xs text-sky-light/70">
                Verified Internship &amp; On-Site Freelance Engagements
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {experienceData.map((exp) => (
              <div
                key={exp.id}
                className="p-6 rounded-lg bg-deep-navy-card/70 border border-sky-blue/20 space-y-4 shadow-lg hover:border-sky-blue/40 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-sky-blue/15">
                  <div>
                    <h3 className="font-display font-bold text-lg text-warm-ivory">
                      {exp.role}
                    </h3>
                    <div className="font-mono text-xs text-electric-blue font-semibold">
                      {exp.organization}
                    </div>
                  </div>
                  <div className="font-mono text-xs text-warm-ivory-dim/80 text-left sm:text-right">
                    <div>{exp.period}</div>
                    <div className="text-[11px] text-sky-light">{exp.location}</div>
                  </div>
                </div>

                <p className="font-sans text-xs sm:text-sm text-warm-ivory-dim leading-relaxed">
                  {exp.summary}
                </p>

                <div className="space-y-2">
                  <div className="font-mono text-xs font-bold text-sky-light uppercase">
                    Core Responsibilities &amp; Achievements:
                  </div>
                  <ul className="space-y-2 font-mono text-xs text-warm-ivory-dim">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-electric-blue flex-shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-deep-navy/80 border border-sky-blue/20 text-sky-light"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 5: EDUCATION */}
        {/* ========================================================= */}
        <section id="education" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-3 border-b border-sky-blue/20 pb-3">
            <GraduationCap className="w-6 h-6 text-electric-blue" />
            <div>
              <h2 className="font-display font-bold text-2xl text-warm-ivory tracking-wide">
                EDUCATION
              </h2>
              <p className="font-mono text-xs text-sky-light/70">
                Academic Degrees &amp; Higher Educational Background
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {educationData.map((edu) => (
              <div
                key={edu.id}
                className="p-6 rounded-lg bg-deep-navy-card/70 border border-sky-blue/20 space-y-3 shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-sky-blue/15">
                  <div>
                    <h3 className="font-display font-bold text-lg text-warm-ivory">
                      {edu.degree}
                    </h3>
                    <div className="font-mono text-xs text-electric-blue">
                      {edu.institution} &bull; {edu.specialization}
                    </div>
                  </div>
                  <div className="font-mono text-xs text-warm-ivory-dim/80">
                    <div>{edu.period}</div>
                    <div className="text-[10px] text-sky-light">{edu.location}</div>
                  </div>
                </div>

                <ul className="space-y-1.5 font-mono text-xs text-warm-ivory-dim">
                  {edu.details.map((det, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-electric-blue font-bold">&bull;</span>
                      <span>{det}</span>
                    </li>
                  ))}
                </ul>

                <div className="font-mono text-[10px] text-cyber-yellow pt-2">
                  {edu.clarificationNote}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 6: PROJECTS */}
        {/* ========================================================= */}
        <section id="projects" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-3 border-b border-sky-blue/20 pb-3">
            <FolderKanban className="w-6 h-6 text-electric-blue" />
            <div>
              <h2 className="font-display font-bold text-2xl text-warm-ivory tracking-wide">
                FEATURED PROJECTS
              </h2>
              <p className="font-mono text-xs text-sky-light/70">
                5 Verified Academic, Capstone &amp; Enterprise Projects
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsData.map((project) => (
              <div
                key={project.id}
                className="p-6 rounded-lg bg-deep-navy-card/70 border border-sky-blue/20 flex flex-col justify-between space-y-4 hover:border-electric-blue/50 transition-colors shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-electric-blue/15 text-electric-blue border border-electric-blue/30 uppercase font-semibold">
                      {project.category}
                    </span>
                    <span className="font-mono text-[10px] text-warm-ivory-dim/70">
                      {project.role}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-warm-ivory leading-snug">
                    {project.title}
                  </h3>

                  <p className="font-sans text-xs text-warm-ivory-dim leading-relaxed">
                    {project.description}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <div className="font-mono text-[10px] font-bold text-sky-light uppercase">
                      Key Highlights:
                    </div>
                    <ul className="space-y-1 font-mono text-[11px] text-warm-ivory-dim/90">
                      {project.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-electric-blue">&rsaquo;</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-sky-blue/15 space-y-2.5">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] px-2 py-0.5 rounded bg-deep-navy/80 border border-sky-blue/20 text-sky-light"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="font-mono text-[10px] text-electric-blue flex items-center justify-between">
                    <span>{project.statusBadge}</span>
                    <span className="text-warm-ivory-dim/60">{project.metrics}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 7: TECHNICAL SKILLS (ENHANCED - NO ARBITRARY RATINGS) */}
        {/* ========================================================= */}
        <section id="skills" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-3 border-b border-sky-blue/20 pb-3">
            <Brain className="w-6 h-6 text-electric-blue" />
            <div>
              <h2 className="font-display font-bold text-2xl text-warm-ivory tracking-wide">
                TECHNICAL SKILLS
              </h2>
              <p className="font-mono text-xs text-sky-light/70">
                Organized Technical Competencies, Toolchains &amp; Recognized Frameworks
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillGroupsData.map((group) => (
              <div
                key={group.id}
                className={`p-6 rounded-lg bg-gradient-to-b ${group.gradient || 'from-deep-navy-card/80 to-deep-navy'} border border-sky-blue/25 space-y-4 shadow-xl hover:border-electric-blue/40 transition-all`}
              >
                <div className="border-b border-sky-blue/15 pb-3">
                  <h3 className="font-display font-bold text-base text-warm-ivory flex items-center gap-2">
                    <Layers className="w-4 h-4 text-electric-blue" />
                    <span>{group.title}</span>
                  </h3>
                  <p className="font-mono text-[11px] text-sky-light/75 mt-1 leading-snug">
                    {group.description}
                  </p>
                </div>

                {/* Compact Skill Cards with Logos & Icons */}
                <div className="grid grid-cols-1 gap-2">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between p-2.5 rounded-md bg-deep-navy/80 border border-sky-blue/15 hover:border-electric-blue/30 transition-colors group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="p-1 rounded bg-deep-navy flex-shrink-0">
                          <TechLogo name={skill.logo || skill.name} className="w-4 h-4" />
                        </div>
                        <span className="font-mono text-xs font-semibold text-warm-ivory group-hover:text-electric-blue transition-colors truncate">
                          {skill.name}
                        </span>
                      </div>

                      {skill.tag && (
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-sky-blue/10 text-sky-light border border-sky-blue/20 flex-shrink-0">
                          {skill.tag}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 8: CERTIFICATIONS & BADGES (OFFICIAL CREDLY EMBEDS) */}
        {/* ========================================================= */}
        <section id="certifications" className="scroll-mt-24 space-y-6">
          <div className="flex items-center justify-between border-b border-sky-blue/20 pb-3">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-electric-blue" />
              <div>
                <h2 className="font-display font-bold text-2xl text-warm-ivory tracking-wide">
                  CERTIFICATIONS &amp; BADGES
                </h2>
                <p className="font-mono text-xs text-sky-light/70">
                  Official Cisco Credly Verified Credentials &amp; Cloud Modules
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 font-mono text-[11px] text-emerald-400 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>OFFICIAL CREDLY VERIFIED</span>
              </span>
            </div>
          </div>

          {/* Cards Grid with Category Gradients */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificationsData.map((cert) => {
              const gradient = CATEGORY_GRADIENTS[cert.category] || CATEGORY_GRADIENTS['General IT']

              return (
                <div
                  key={cert.id}
                  className={`p-6 rounded-lg bg-gradient-to-b ${gradient.bg} border ${gradient.border} shadow-xl backdrop-blur-md flex flex-col justify-between space-y-5 transition-all hover:scale-[1.01] hover:shadow-2xl`}
                >
                  <div className="space-y-4">
                    {/* Category & Issuer Header */}
                    <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/10">
                      <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold ${gradient.badgeBg} ${gradient.badgeText} border border-current/30 uppercase`}>
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
                    <div className="space-y-2 pt-2">
                      <h3 className="font-display font-bold text-base text-warm-ivory leading-snug">
                        {cert.title}
                      </h3>
                      <p className="font-sans text-xs text-warm-ivory-dim leading-relaxed">
                        {cert.description}
                      </p>

                      {/* Skills Covered Pills */}
                      {cert.skillsCovered && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
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
                      <div className="text-[10px] text-warm-ivory-dim/60 truncate">
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
        </section>

        {/* ========================================================= */}
        {/* SECTION 9: CONTACT */}
        {/* ========================================================= */}
        <section id="contact" className="scroll-mt-24 space-y-6 pb-12">
          <div className="flex items-center gap-3 border-b border-sky-blue/20 pb-3">
            <Mail className="w-6 h-6 text-electric-blue" />
            <div>
              <h2 className="font-display font-bold text-2xl text-warm-ivory tracking-wide">
                CONTACT INFORMATION
              </h2>
              <p className="font-mono text-xs text-sky-light/70">
                Direct Cellular Line, Email Transmission &amp; Message Portal
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Details Card */}
            <div className="p-6 rounded-lg bg-deep-navy-card/80 border border-sky-blue/25 space-y-6 shadow-xl">
              <div className="space-y-2">
                <h3 className="font-display font-bold text-lg text-warm-ivory">
                  GET IN TOUCH
                </h3>
                <p className="font-sans text-xs sm:text-sm text-warm-ivory-dim leading-relaxed">
                  {contactData.availability}
                </p>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <a
                  href={`tel:${contactData.phone}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-deep-navy/90 border border-sky-blue/20 hover:border-electric-blue transition-colors group"
                >
                  <Phone className="w-4 h-4 text-electric-blue group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-[10px] text-warm-ivory-dim/70">MOBILE TELEPHONE (VOICE &amp; SMS)</div>
                    <div className="font-bold text-warm-ivory group-hover:text-electric-blue">
                      {contactData.phoneFormatted}
                    </div>
                  </div>
                </a>

                <a
                  href={`mailto:${contactData.email}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-deep-navy/90 border border-sky-blue/20 hover:border-electric-blue transition-colors group"
                >
                  <Mail className="w-4 h-4 text-electric-blue group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-[10px] text-warm-ivory-dim/70">OFFICIAL EMAIL</div>
                    <div className="font-bold text-warm-ivory group-hover:text-electric-blue">
                      {contactData.email}
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-deep-navy/90 border border-sky-blue/20">
                  <MapPin className="w-4 h-4 text-sky-light" />
                  <div>
                    <div className="text-[10px] text-warm-ivory-dim/70">LOCATION</div>
                    <div className="font-bold text-warm-ivory">{contactData.location}</div>
                  </div>
                </div>
              </div>

              {/* Social / Repositories Links */}
              <div className="pt-2 space-y-2">
                <div className="font-mono text-[10px] font-bold text-sky-light uppercase tracking-wider">
                  ONLINE PROFILES
                </div>
                <div className="flex flex-wrap gap-2">
                  {contactData.socialLinks.map((link) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-full bg-deep-navy/80 hover:bg-sky-blue/15 border border-sky-blue/25 hover:border-electric-blue text-xs font-mono text-warm-ivory hover:text-electric-blue transition-colors flex items-center gap-1.5"
                    >
                      <span>{link.platform}</span>
                      <ExternalLink className="w-3 h-3 text-sky-light" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Interactive Message Form */}
            <div className="p-6 rounded-lg bg-deep-navy-card/80 border border-sky-blue/25 space-y-4 shadow-xl">
              <h3 className="font-display font-bold text-lg text-warm-ivory">
                SEND DIRECT TRANSMISSION
              </h3>

              {formSent ? (
                <div className="p-6 rounded-lg bg-muted-green/20 border border-muted-green text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-muted-green-light mx-auto" />
                  <div className="font-mono font-bold text-sm text-warm-ivory">
                    TRANSMISSION RECEIVED
                  </div>
                  <p className="font-sans text-xs text-warm-ivory-dim">
                    Thank you for reaching out. Ina Grace Tan will review your message shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 font-mono text-xs">
                  <div className="space-y-1">
                    <label htmlFor="name" className="block text-sky-light">
                      YOUR NAME
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Jane Doe"
                      className="w-full px-3 py-2 rounded bg-deep-navy/90 border border-sky-blue/25 text-warm-ivory placeholder-warm-ivory-dim/40 focus:border-electric-blue focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="email" className="block text-sky-light">
                      YOUR EMAIL
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. recruiter@company.com"
                      className="w-full px-3 py-2 rounded bg-deep-navy/90 border border-sky-blue/25 text-warm-ivory placeholder-warm-ivory-dim/40 focus:border-electric-blue focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="message" className="block text-sky-light">
                      MESSAGE / INQUIRY
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Detail your inquiry or interview invitation here..."
                      className="w-full px-3 py-2 rounded bg-deep-navy/90 border border-sky-blue/25 text-warm-ivory placeholder-warm-ivory-dim/40 focus:border-electric-blue focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded bg-electric-blue hover:bg-white text-deep-navy font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <Send className="w-4 h-4" />
                    <span>SEND TRANSMISSION</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-sky-blue/20 bg-deep-navy-card/90 py-8 text-center font-mono text-xs text-warm-ivory-dim/70 space-y-3">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            &copy; 2026 INA GRACE D. TAN &bull; BSIT (Data Networking)
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-1 text-sky-light hover:text-electric-blue transition-colors cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>TOP OF PAGE</span>
            </button>

            <button
              type="button"
              onClick={enterWorld}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-electric-blue/15 hover:bg-electric-blue text-electric-blue hover:text-deep-navy border border-electric-blue/30 font-bold transition-all cursor-pointer"
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>RETURN TO 3D ARCHIPELAGO</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
