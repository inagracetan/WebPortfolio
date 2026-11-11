import React, { useState, useEffect } from 'react'
import {
  House,
  UserRound,
  FileUser,
  FolderKanban,
  Brain,
  Briefcase,
  GraduationCap,
  Award,
  Mail,
  Globe2,
  Download,
  Phone,
  MapPin,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Volume2,
  VolumeX,
  CheckCircle2,
  ArrowUp,
  Sparkles,
  Layers,
  Send,
} from 'lucide-react'
import { useGameStore } from '@/hooks/useGameStore'
import { projectsData } from '@/data/projects'
import { skillGroupsData } from '@/data/skills'
import { experienceData } from '@/data/experience'
import { educationData, seminarsTrainingsData } from '@/data/education'
import { contactData } from '@/data/contact'
import { APP_CONFIG } from '@/utilities/constants'

const SECTIONS = [
  { id: 'home', label: 'Home', icon: House },
  { id: 'about', label: 'About Me', icon: UserRound },
  { id: 'resume', label: 'Resume', icon: FileUser },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'skills', label: 'Skills', icon: Brain },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'certifications', label: 'Trainings', icon: Award },
  { id: 'contact', label: 'Contact', icon: Mail },
] as const

export const DirectPortfolioView: React.FC = () => {
  const { enterWorld, isSoundMuted, toggleMute } = useGameStore()
  const [activeSection, setActiveSection] = useState<string>('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formSent, setFormSent] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  // Active section scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200
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
    setMobileMenuOpen(false)
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

      {/* STICKY HEADER */}
      <header className="sticky top-0 z-50 bg-deep-navy/90 backdrop-blur-xl border-b border-sky-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Logo Brand */}
          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-electric-blue/20 border border-electric-blue flex items-center justify-center text-electric-blue font-bold text-xs shadow-[0_0_12px_rgba(0,240,255,0.4)] group-hover:scale-105 transition-transform">
              IT
            </div>
            <div>
              <div className="font-display font-bold text-sm tracking-wide text-warm-ivory group-hover:text-electric-blue transition-colors">
                {APP_CONFIG.name}
              </div>
              <div className="font-mono text-[10px] text-sky-light/70 hidden sm:block">
                BSIT &bull; Data Networking
              </div>
            </div>
          </button>

          {/* Desktop Navigation (All 9 Sections) */}
          <nav
            aria-label="Direct Portfolio Sections"
            className="hidden xl:flex items-center gap-1 bg-deep-navy-card/90 border border-sky-blue/20 px-2 py-1 rounded-full text-xs font-mono"
          >
            {SECTIONS.map((sec) => {
              const Icon = sec.icon
              const isActive = activeSection === sec.id
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => scrollToSection(sec.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                    isActive
                      ? 'bg-electric-blue text-deep-navy font-bold shadow-sm'
                      : 'text-warm-ivory-dim hover:text-warm-ivory hover:bg-white/5'
                  }`}
                  aria-label={sec.label}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{sec.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              type="button"
              onClick={toggleMute}
              className="p-2 rounded-full border border-sky-blue/25 bg-deep-navy-card/90 text-sky-light hover:text-electric-blue hover:border-electric-blue transition-colors cursor-pointer"
              title={isSoundMuted ? 'Unmute Audio' : 'Mute Audio'}
              aria-label={isSoundMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Switch to 3D World Button */}
            <button
              type="button"
              onClick={enterWorld}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-electric-blue text-deep-navy font-mono text-xs font-bold rounded-full shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:bg-white transition-all cursor-pointer active:scale-95"
              title="Return to Interactive 3D Archipelago"
              aria-label="Switch to 3D Exploration"
            >
              <Globe2 className="w-4 h-4" />
              <span className="hidden sm:inline">3D WORLD</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-full border border-sky-blue/25 bg-deep-navy-card/90 text-warm-ivory hover:text-electric-blue transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-deep-navy-card/98 border-t border-sky-blue/20 px-4 py-4 space-y-1 font-mono text-xs shadow-2xl">
            <div className="text-[10px] text-sky-light/60 uppercase tracking-widest px-3 py-1">
              PORTFOLIO SECTIONS
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {SECTIONS.map((sec) => {
                const Icon = sec.icon
                const isActive = activeSection === sec.id
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => scrollToSection(sec.id)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-sm border transition-colors text-left cursor-pointer ${
                      isActive
                        ? 'bg-electric-blue/20 border-electric-blue text-electric-blue font-bold'
                        : 'bg-deep-navy/80 border-sky-blue/15 text-warm-ivory hover:text-electric-blue'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-sky-light" />
                    <span>{sec.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-20 relative z-10">
        {/* ========================================================= */}
        {/* SECTION 1: HOME / INTRODUCTION */}
        {/* ========================================================= */}
        <section id="home" className="pt-6 sm:pt-10 scroll-mt-24">
          <div className="p-6 sm:p-10 rounded-sm bg-deep-navy-card/80 border border-sky-blue/25 shadow-2xl relative overflow-hidden">
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
                    onClick={() => scrollToSection('projects')}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-warm-ivory transition-colors cursor-pointer"
                  >
                    <span>VIEW PROJECTS</span>
                    <ChevronRight className="w-4 h-4 text-sky-light" />
                  </button>
                </div>
              </div>

              {/* Quick Stat Card */}
              <div className="w-full lg:w-80 p-5 rounded-sm bg-deep-navy/90 border border-sky-blue/20 font-mono text-xs space-y-3.5 shadow-xl">
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
                    <div className="text-[10px] text-warm-ivory-dim/70">PORTFOLIO ARCHIVE</div>
                    <div className="text-warm-ivory">5 Verified Systems & Capstone</div>
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
                Candidate Profile, Background & Professional Objectives
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4 p-6 rounded-sm bg-deep-navy-card/60 border border-sky-blue/20">
              <h3 className="font-mono text-sm font-bold text-electric-blue uppercase tracking-wider">
                Professional Profile
              </h3>
              <p className="font-sans text-sm text-warm-ivory leading-relaxed">
                Graduated with a Bachelor of Science in Information Technology, specializing in Data Networking from Central Mindanao University (July 2026). Achieved College Scholar recognition throughout academic tenure.
              </p>
              <p className="font-sans text-sm text-warm-ivory-dim leading-relaxed">
                Demonstrated practical competence in database administration, switching and network segmentation (VLANs, DHCP, IP addressing), directory management fundamentals, and systems development. Experienced through an intensive IT internship at the City Agriculture Office (LGU Malaybalay) and hands-on freelance data entry and information management engagements.
              </p>
              <p className="font-sans text-sm text-warm-ivory-dim leading-relaxed">
                Eager to bring disciplined technical skills, high data accuracy, and collaborative problem-solving to technical teams in network engineering, systems administration, database management, and technical support.
              </p>
            </div>

            <div className="space-y-4 p-6 rounded-sm bg-deep-navy-card/60 border border-sky-blue/20 font-mono text-xs">
              <h3 className="font-bold text-sky-light uppercase tracking-wider">
                Core Focus Areas
              </h3>
              <ul className="space-y-2.5 text-warm-ivory-dim">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-electric-blue flex-shrink-0 mt-0.5" />
                  <span>Network Configuration, Switching & VLANs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-electric-blue flex-shrink-0 mt-0.5" />
                  <span>Relational & Cloud Databases (MySQL, Firebase)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-electric-blue flex-shrink-0 mt-0.5" />
                  <span>Administrative Systems & Procurement Tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-electric-blue flex-shrink-0 mt-0.5" />
                  <span>Workstation Troubleshooting & Technical Support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-electric-blue flex-shrink-0 mt-0.5" />
                  <span>Item & Event Photography (Lucky Bliss Studio)</span>
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
                className="flex items-center gap-1.5 px-3 py-1.5 bg-electric-blue/15 hover:bg-electric-blue text-electric-blue hover:text-deep-navy border border-electric-blue/40 rounded-full font-mono text-xs font-bold transition-all"
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

          <div className="p-6 rounded-sm bg-deep-navy-card/80 border border-sky-blue/25 space-y-6">
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
                  <li>Cross-platform mobile and web application development (Flutter, Firebase)</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-sky-light uppercase tracking-wider">
                  Target IT Roles
                </h4>
                <ul className="space-y-1.5 text-warm-ivory-dim list-disc pl-4">
                  <li>Data Networking & Infrastructure Specialist</li>
                  <li>Database Administrator / Data Analyst</li>
                  <li>Junior Software / Mobile App Developer</li>
                  <li>IT Support Specialist & Workstation Technician</li>
                  <li>Information Management & Records Specialist</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 4: PROJECTS */}
        {/* ========================================================= */}
        <section id="projects" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-3 border-b border-sky-blue/20 pb-3">
            <FolderKanban className="w-6 h-6 text-electric-blue" />
            <div>
              <h2 className="font-display font-bold text-2xl text-warm-ivory tracking-wide">
                FEATURED PROJECTS
              </h2>
              <p className="font-mono text-xs text-sky-light/70">
                5 Verified Academic, Capstone & Enterprise Projects
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsData.map((project) => (
              <div
                key={project.id}
                className="p-6 rounded-sm bg-deep-navy-card/70 border border-sky-blue/20 flex flex-col justify-between space-y-4 hover:border-electric-blue/50 transition-colors shadow-lg"
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
        {/* SECTION 5: TECHNICAL SKILLS */}
        {/* ========================================================= */}
        <section id="skills" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-3 border-b border-sky-blue/20 pb-3">
            <Brain className="w-6 h-6 text-electric-blue" />
            <div>
              <h2 className="font-display font-bold text-2xl text-warm-ivory tracking-wide">
                TECHNICAL SKILLS
              </h2>
              <p className="font-mono text-xs text-sky-light/70">
                6 Verified Technical Competency Domains
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillGroupsData.map((group) => (
              <div
                key={group.id}
                className="p-5 rounded-sm bg-deep-navy-card/70 border border-sky-blue/20 space-y-4 shadow-lg"
              >
                <div>
                  <h3 className="font-display font-bold text-base text-warm-ivory flex items-center gap-2">
                    <Layers className="w-4 h-4 text-electric-blue" />
                    <span>{group.title}</span>
                  </h3>
                  <p className="font-mono text-[11px] text-sky-light/70 mt-1">
                    {group.description}
                  </p>
                </div>

                <div className="space-y-2.5">
                  {group.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="font-semibold text-warm-ivory">{skill.name}</span>
                        <span className="text-[10px] text-sky-light">{skill.proficiencyLabel}</span>
                      </div>
                      <div className="h-1.5 w-full bg-deep-navy rounded-full overflow-hidden border border-sky-blue/15">
                        <div
                          className="h-full bg-gradient-to-r from-sky-blue to-electric-blue rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 6: WORK EXPERIENCE */}
        {/* ========================================================= */}
        <section id="experience" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-3 border-b border-sky-blue/20 pb-3">
            <Briefcase className="w-6 h-6 text-electric-blue" />
            <div>
              <h2 className="font-display font-bold text-2xl text-warm-ivory tracking-wide">
                WORK EXPERIENCE
              </h2>
              <p className="font-mono text-xs text-sky-light/70">
                Verified Internship & On-Site Freelance Engagements
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {experienceData.map((exp) => (
              <div
                key={exp.id}
                className="p-6 rounded-sm bg-deep-navy-card/70 border border-sky-blue/20 space-y-4 shadow-lg"
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
                    Core Responsibilities & Achievements:
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
        {/* SECTION 7: EDUCATION */}
        {/* ========================================================= */}
        <section id="education" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-3 border-b border-sky-blue/20 pb-3">
            <GraduationCap className="w-6 h-6 text-electric-blue" />
            <div>
              <h2 className="font-display font-bold text-2xl text-warm-ivory tracking-wide">
                EDUCATION
              </h2>
              <p className="font-mono text-xs text-sky-light/70">
                Academic Degrees & Higher Educational Background
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {educationData.map((edu) => (
              <div
                key={edu.id}
                className="p-6 rounded-sm bg-deep-navy-card/70 border border-sky-blue/20 space-y-3 shadow-lg"
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
        {/* SECTION 8: TRAININGS AND CERTIFICATIONS */}
        {/* ========================================================= */}
        <section id="certifications" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-3 border-b border-sky-blue/20 pb-3">
            <Award className="w-6 h-6 text-electric-blue" />
            <div>
              <h2 className="font-display font-bold text-2xl text-warm-ivory tracking-wide">
                TRAININGS &amp; CERTIFICATIONS
              </h2>
              <p className="font-mono text-xs text-sky-light/70">
                Academic Cloud Modules, Seminars &amp; Technical Workshops
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {seminarsTrainingsData.map((sem) => (
              <div
                key={sem.id}
                className="p-5 rounded-sm bg-deep-navy-card/70 border border-sky-blue/20 space-y-2 shadow-lg"
              >
                <div className="font-mono text-[10px] text-electric-blue font-bold uppercase">
                  {sem.date}
                </div>
                <h3 className="font-display font-bold text-base text-warm-ivory">
                  {sem.title}
                </h3>
                <div className="font-mono text-xs text-sky-light">
                  {sem.venue}
                </div>
                {sem.details && (
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {sem.details.map((d) => (
                      <span
                        key={d}
                        className="font-mono text-[10px] px-2 py-0.5 rounded bg-deep-navy border border-sky-blue/20 text-warm-ivory-dim"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
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
            <div className="p-6 rounded-sm bg-deep-navy-card/80 border border-sky-blue/25 space-y-6 shadow-xl">
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
                  className="flex items-center gap-3 p-3 rounded bg-deep-navy/90 border border-sky-blue/20 hover:border-electric-blue transition-colors group"
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
                  className="flex items-center gap-3 p-3 rounded bg-deep-navy/90 border border-sky-blue/20 hover:border-electric-blue transition-colors group"
                >
                  <Mail className="w-4 h-4 text-electric-blue group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-[10px] text-warm-ivory-dim/70">OFFICIAL EMAIL</div>
                    <div className="font-bold text-warm-ivory group-hover:text-electric-blue">
                      {contactData.email}
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3 rounded bg-deep-navy/90 border border-sky-blue/20">
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
            <div className="p-6 rounded-sm bg-deep-navy-card/80 border border-sky-blue/25 space-y-4 shadow-xl">
              <h3 className="font-display font-bold text-lg text-warm-ivory">
                SEND DIRECT TRANSMISSION
              </h3>

              {formSent ? (
                <div className="p-6 rounded bg-muted-green/20 border border-muted-green text-center space-y-2">
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

