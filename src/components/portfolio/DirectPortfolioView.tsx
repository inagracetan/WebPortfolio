import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  Palette,
  Calendar,
  Building2,
  ChevronDown,
  ChevronUp,
  X,
  Maximize2,
  Smartphone,
  Terminal,
} from 'lucide-react'
import { useGameStore } from '@/hooks/useGameStore'
import { projectsData } from '@/data/projects'
import { skillGroupsData } from '@/data/skills'
import { experienceData } from '@/data/experience'
import { educationData, seminarsTrainingsData } from '@/data/education'
import { contactData } from '@/data/contact'
import { certificationsData, academicTrainingData, CATEGORY_GRADIENTS } from '@/data/certifications'
import { multimediaData, type MultimediaCategory, type MultimediaItem } from '@/data/multimedia'
import { CredlyBadge } from './CredlyBadge'
import { TechLogo } from './TechLogo'
import { DirectPortfolioNav } from './DirectPortfolioNav'
import { CertificateModal } from './CertificateModal'

// Helper for category-appropriate project simulation icons
const getProjectDemoIcon = (project: { category: string }) => {
  if (project.category.includes('Mobile') || project.category.includes('Geolocation')) {
    return <Smartphone className="w-5 h-5 text-electric-blue" />
  }
  if (project.category.includes('Cybersecurity')) {
    return <ShieldCheck className="w-5 h-5 text-emerald-400" />
  }
  return <Terminal className="w-5 h-5 text-sky-light" />
}

// Apple-inspired ambient illumination profiles per section
const getSectionAmbientGlow = (section: string) => {
  switch (section) {
    case 'certifications':
      return 'bg-[radial-gradient(ellipse_80%_60%_at_50%_25%,_rgba(16,185,129,0.15),_transparent_70%)]'
    case 'multimedia':
      return 'bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,_rgba(255,215,0,0.12),_transparent_70%)]'
    case 'skills':
      return 'bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,_rgba(139,92,246,0.14),_transparent_70%)]'
    case 'projects':
      return 'bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,_rgba(0,240,255,0.16),_transparent_70%)]'
    case 'resume':
    case 'experience':
    case 'education':
    case 'seminars':
      return 'bg-[radial-gradient(ellipse_80%_60%_at_50%_25%,_rgba(56,189,248,0.13),_transparent_70%)]'
    case 'contact':
      return 'bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,_rgba(0,240,255,0.14),_transparent_70%)]'
    default:
      return 'bg-[radial-gradient(ellipse_80%_60%_at_50%_15%,_rgba(56,189,248,0.15),_transparent_70%)]'
  }
}

// Exact 11-section portfolio order
const SECTIONS = [
  { id: 'home', label: 'Home', icon: House },
  { id: 'about', label: 'About Me', icon: UserRound },
  { id: 'resume', label: 'Resume', icon: FileUser },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'seminars', label: 'Seminars & Training', icon: Award },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'skills', label: 'Technical Skills', icon: Brain },
  { id: 'certifications', label: 'Certifications & Badges', icon: Award },
  { id: 'multimedia', label: 'Multimedia & Creative Works', icon: Palette },
  { id: 'contact', label: 'Contact', icon: Mail },
] as const

export const DirectPortfolioView: React.FC = () => {
  const { enterWorld } = useGameStore()
  const [activeSection, setActiveSection] = useState<string>('home')
  const [multimediaFilter, setMultimediaFilter] = useState<'All Works' | MultimediaCategory>('All Works')
  const [selectedMedia, setSelectedMedia] = useState<MultimediaItem | null>(null)
  const [formSent, setFormSent] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [expandedCertId, setExpandedCertId] = useState<string | null>(null)
  const [modalCert, setModalCert] = useState<{
    imageSrc: string
    title: string
    date?: string
    organizer?: string
  } | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const parallaxGlowRef = useRef<HTMLDivElement>(null)
  const parallaxGridRef = useRef<HTMLDivElement>(null)

  // Single lightweight IntersectionObserver for panel and card entrance transitions (GPU-accelerated, runs once)
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const elements = container.querySelectorAll('.reveal-panel, .reveal-card, .panel-reveal')
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            observer.unobserve(entry.target) // Unobserve immediately: zero continuous overhead!
          }
        })
      },
      {
        root: container,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08,
      }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // IntersectionObserver for scroll-spy activeSection (zero layout thrashing)
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const sectionElements = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      Boolean
    ) as HTMLElement[]

    if (sectionElements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) {
          setActiveSection(visible.target.id)
        }
      },
      {
        root: container,
        rootMargin: '-15% 0px -60% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    )

    sectionElements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Apple-Inspired Subtle Parallax Background (RAF-throttled, GPU compositor only)
  useEffect(() => {
    const container = scrollContainerRef.current
    const glowEl = parallaxGlowRef.current
    const gridEl = parallaxGridRef.current
    if (!container || !glowEl || !gridEl) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    let rafId: number
    let lastScroll = -1

    const updateParallax = () => {
      const top = container.scrollTop
      if (top !== lastScroll) {
        lastScroll = top
        const glowY = -(top * 0.05)
        const gridY = -(top * 0.02)
        glowEl.style.transform = `translate3d(0, ${glowY.toFixed(1)}px, 0)`
        gridEl.style.transform = `translate3d(0, ${gridY.toFixed(1)}px, 0)`
      }
      rafId = 0
    }

    const handleScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(updateParallax)
      }
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      container.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  // Close multimedia lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedMedia(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Categories with actual uploaded creative works
  const availableCategories: ('All Works' | MultimediaCategory)[] = [
    'All Works',
    ...Array.from(new Set(multimediaData.map((m) => m.category))),
  ]

  const filteredMedia =
    multimediaFilter === 'All Works'
      ? multimediaData
      : multimediaData.filter((m) => m.category === multimediaFilter)

  // Apple-inspired smooth scroll with quintic ease-out physics and sticky offset
  const scrollToSection = (id: string) => {
    const container = scrollContainerRef.current
    const el = document.getElementById(id)
    if (!container || !el) return

    const containerRect = container.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    // Sticky navigation bar offset (~58px nav + 18px comfortable storytelling margin = 76px)
    const navOffset = 76
    const targetTop = Math.max(0, elRect.top - containerRect.top + container.scrollTop - navOffset)

    // Trigger subtle destination spotlight feedback
    el.classList.remove('section-spotlight')
    void el.offsetWidth // force DOM reflow for animation restart
    el.classList.add('section-spotlight')

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      container.scrollTop = targetTop
      return
    }

    const startTop = container.scrollTop
    const distance = targetTop - startTop
    if (Math.abs(distance) < 2) return

    // Dynamic duration based on travel distance: short glides (~450ms), long traversals (~750ms)
    const duration = Math.min(750, Math.max(450, Math.abs(distance) * 0.35))
    const startTime = performance.now()

    // Apple quintic ease-out: brisk initial movement, prolonged silky deceleration
    const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5)

    let animId: number
    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutQuint(progress)

      container.scrollTop = startTop + distance * eased

      if (progress < 1) {
        animId = requestAnimationFrame(animateScroll)
      }
    }

    animId = requestAnimationFrame(animateScroll)

    // Cancel animation gracefully if user intervenes with mousewheel or touch
    const cancelScroll = () => {
      cancelAnimationFrame(animId)
      container.removeEventListener('wheel', cancelScroll)
      container.removeEventListener('touchstart', cancelScroll)
    }
    container.addEventListener('wheel', cancelScroll, { passive: true, once: true })
    container.addEventListener('touchstart', cancelScroll, { passive: true, once: true })
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
    <div ref={scrollContainerRef} className="fixed inset-0 z-30 overflow-y-auto scroll-smooth bg-deep-navy text-warm-ivory font-sans selection:bg-electric-blue selection:text-deep-navy">
      {/* ========================================================= */}
      {/* APPLE-INSPIRED MULTI-LAYER PARALLAX & AMBIENT SYSTEM     */}
      {/* ========================================================= */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Layer 1: Dynamic Ambient Glow Spheres (Section-Adaptive Crossfade) */}
        <div
          ref={parallaxGlowRef}
          className={`absolute -inset-10 transition-all duration-1000 ease-out will-change-transform ${getSectionAmbientGlow(
            activeSection
          )}`}
        />

        {/* Layer 2: Subtle Cyber Grid with Parallax Depth Offset */}
        <div
          ref={parallaxGridRef}
          className="absolute -inset-20 bg-game-grid opacity-15 pointer-events-none will-change-transform"
        />

        {/* Layer 3: Film-Grain CRT Scanlines */}
        <div className="absolute inset-0 opacity-[0.08] scanlines pointer-events-none" />
      </div>

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
        <section id="home" className="reveal-panel pt-6 sm:pt-10 scroll-mt-24">
          <div className="p-6 sm:p-10 rounded-lg bg-deep-navy-card/80 border border-sky-blue/25 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-electric-blue/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">
              {/* Left Column: Personal Dossier & Identity */}
              <div className="space-y-4 max-w-2xl flex-1">
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

                  <button
                    type="button"
                    onClick={() => scrollToSection('multimedia')}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-cyber-yellow/10 hover:bg-cyber-yellow/20 border border-cyber-yellow/30 text-cyber-yellow font-bold transition-colors cursor-pointer"
                  >
                    <Palette className="w-4 h-4" />
                    <span>CREATIVE WORKS</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Hero Portrait Frame & Candidate Metrics */}
              <div className="w-full lg:w-80 flex flex-col sm:flex-row lg:flex-col gap-4 items-center">
                {/* Authentic Profile Picture Frame */}
                <div className="relative group w-44 h-44 sm:w-48 sm:h-48 flex-shrink-0">
                  <div className="relative w-full h-full rounded-2xl p-1 bg-gradient-to-tr from-cyan-500 via-sky-400 to-electric-blue shadow-[0_0_30px_rgba(0,240,255,0.35)] transition-all group-hover:shadow-[0_0_45px_rgba(0,240,255,0.6)]">
                    <div className="w-full h-full rounded-[14px] overflow-hidden bg-deep-navy border border-electric-blue/50">
                      <img
                        src="/profile.jpg"
                        alt="Ina Grace Tan — Candidate Portrait"
                        width={200}
                        height={200}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    {/* Status Pill Badge */}
                    <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-deep-navy-card/95 border border-electric-blue/60 font-mono text-[10px] text-electric-blue font-bold tracking-wider shadow-lg whitespace-nowrap flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>INA GRACE TAN</span>
                    </div>
                  </div>
                </div>

                {/* Candidate Metrics Card */}
                <div className="w-full p-5 rounded-lg bg-deep-navy/90 border border-sky-blue/20 font-mono text-xs space-y-3 shadow-xl apple-card-hover">
                  <div className="flex items-center justify-between pb-2 border-b border-sky-blue/15 text-sky-light">
                    <span className="font-bold uppercase tracking-wider">CANDIDATE METRICS</span>
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>VERIFIED</span>
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <div className="text-[10px] text-warm-ivory-dim/70">ACADEMIC ALMA MATER</div>
                      <div className="text-warm-ivory font-semibold">Central Mindanao University</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-warm-ivory-dim/70">DEGREE CONFERRED</div>
                      <div className="text-cyber-yellow font-semibold">BS Information Technology</div>
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
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: ABOUT ME */}
        {/* ========================================================= */}
        <section id="about" className="reveal-panel scroll-mt-24 space-y-6">
          <div className="story-header py-3.5 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-t-lg border-b border-sky-blue/20">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-electric-blue/15 border border-electric-blue/30 text-electric-blue flex-shrink-0">
                  <UserRound className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl sm:text-2xl text-warm-ivory tracking-wide flex items-center gap-2">
                    <span>ABOUT ME</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-pulse" />
                  </h2>
                  <p className="font-mono text-[11px] text-sky-light/70">
                    Candidate Profile, Background &amp; Professional Objectives
                  </p>
                </div>
              </div>
              <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-deep-navy border border-sky-blue/25 text-sky-light hidden sm:inline-block">
                CHAPTER // 02
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left: Authentic Portrait Card */}
            <div className="reveal-card apple-card-hover md:col-span-4 p-6 rounded-lg bg-deep-navy-card/80 border border-sky-blue/25 shadow-xl flex flex-col items-center text-center space-y-4" style={{ '--stagger-delay': '0ms' } as React.CSSProperties}>
              <div className="relative w-36 h-36 rounded-2xl p-1 bg-gradient-to-tr from-cyan-500 via-sky-400 to-electric-blue shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                <div className="w-full h-full rounded-[14px] overflow-hidden bg-deep-navy border border-electric-blue/40">
                  <img
                    src="/profile.jpg"
                    alt="Ina Grace Tan"
                    width={150}
                    height={150}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-lg text-warm-ivory">
                  Ina Grace D. Tan
                </h3>
                <div className="font-mono text-xs text-electric-blue font-semibold">
                  BSIT &bull; Data Networking
                </div>
                <div className="font-mono text-[11px] text-warm-ivory-dim/80">
                  Central Mindanao University
                </div>
              </div>
              <div className="w-full pt-3 border-t border-sky-blue/15 text-left font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-warm-ivory-dim/70">Status:</span>
                  <span className="text-emerald-400 font-bold">Open to Opportunities</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-warm-ivory-dim/70">Location:</span>
                  <span className="text-warm-ivory">Bukidnon, Philippines</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-warm-ivory-dim/70">Dual Track:</span>
                  <span className="text-cyber-yellow font-semibold">IT &bull; Multimedia</span>
                </div>
              </div>
            </div>

            {/* Middle: Professional Narrative */}
            <div className="reveal-card apple-card-hover md:col-span-5 space-y-4 p-6 rounded-lg bg-deep-navy-card/60 border border-sky-blue/20 shadow-md" style={{ '--stagger-delay': '80ms' } as React.CSSProperties}>
              <h3 className="font-mono text-sm font-bold text-electric-blue uppercase tracking-wider">
                Professional Profile
              </h3>
              <p className="font-sans text-sm text-warm-ivory leading-relaxed">
                Graduated with a Bachelor of Science in Information Technology, specializing in Data Networking from Central Mindanao University (July 2026).
              </p>
              <p className="font-sans text-sm text-warm-ivory-dim leading-relaxed">
                Demonstrated practical competence in database administration, network segmentation (VLANs, DHCP, IP addressing), directory management fundamentals, and systems development. Experienced through an intensive IT internship at the City Agriculture Office (LGU Malaybalay) and hands-on freelance data entry and information management engagements.
              </p>
              <p className="font-sans text-sm text-warm-ivory-dim leading-relaxed">
                Eager to bring disciplined technical skills, high data accuracy, and collaborative problem-solving to technical teams in network engineering, systems administration, database management, technical support, and creative multimedia production.
              </p>
            </div>

            {/* Right: Core Focus Areas */}
            <div className="reveal-card apple-card-hover md:col-span-3 space-y-4 p-6 rounded-lg bg-deep-navy-card/60 border border-sky-blue/20 font-mono text-xs shadow-md" style={{ '--stagger-delay': '160ms' } as React.CSSProperties}>
              <h3 className="font-bold text-sky-light uppercase tracking-wider">
                Core Competencies
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
                  <CheckCircle2 className="w-4 h-4 text-cyber-yellow flex-shrink-0 mt-0.5" />
                  <span>Graphic Design &amp; Digital Artwork (Canva, Photoshop)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: RESUME (CV) */}
        {/* ========================================================= */}
        <section id="resume" className="reveal-panel scroll-mt-24 space-y-6">
          <div className="story-header py-3.5 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-t-lg border-b border-sky-blue/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-electric-blue/15 border border-electric-blue/30 text-electric-blue flex-shrink-0">
                  <FileUser className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl sm:text-2xl text-warm-ivory tracking-wide flex items-center gap-2">
                    <span>CURRICULUM VITAE (CV)</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-pulse" />
                  </h2>
                  <p className="font-mono text-[11px] text-sky-light/70">
                    Authoritative Candidate Dossier &bull; Tan_IG_CV.pdf
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="/Tan_IG_CV.pdf"
                  download="Tan_IG_CV.pdf"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-electric-blue/15 hover:bg-electric-blue text-electric-blue hover:text-deep-navy border border-electric-blue/40 rounded-full font-mono text-xs font-bold transition-all shadow-sm active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">DOWNLOAD PDF</span>
                </a>

                <button
                  type="button"
                  onClick={() => window.open('/Tan_IG_CV.pdf', '_blank')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-deep-navy-card/90 hover:bg-deep-navy border border-sky-blue/25 text-warm-ivory rounded-full font-mono text-xs transition-colors cursor-pointer active:scale-95"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-sky-light" />
                  <span className="hidden sm:inline">VIEW FULLSCREEN</span>
                </button>
              </div>
            </div>
          </div>

          <div className="reveal-card apple-card-hover p-6 rounded-lg bg-deep-navy-card/80 border border-sky-blue/25 space-y-6 shadow-xl" style={{ '--stagger-delay': '0ms' } as React.CSSProperties}>
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
                  <li>Central Mindanao University Graduate (Graduation: July 2026)</li>
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
        <section id="experience" className="reveal-panel scroll-mt-24 space-y-6">
          <div className="story-header py-3.5 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-t-lg border-b border-sky-blue/20">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-electric-blue/15 border border-electric-blue/30 text-electric-blue flex-shrink-0">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl sm:text-2xl text-warm-ivory tracking-wide flex items-center gap-2">
                    <span>WORK EXPERIENCE</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-pulse" />
                  </h2>
                  <p className="font-mono text-[11px] text-sky-light/70">
                    Verified Internship &amp; On-Site Freelance Engagements
                  </p>
                </div>
              </div>
              <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-deep-navy border border-sky-blue/25 text-sky-light hidden sm:inline-block">
                CHAPTER // 04
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {experienceData.map((exp, expIdx) => (
              <div
                key={exp.id}
                className="reveal-card apple-card-hover p-6 rounded-lg bg-deep-navy-card/70 border border-sky-blue/20 space-y-4 shadow-lg hover:border-sky-blue/40 transition-colors"
                style={{ '--stagger-delay': `${expIdx * 80}ms` } as React.CSSProperties}
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
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2">
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
        <section id="education" className="reveal-panel scroll-mt-24 space-y-6">
          <div className="story-header py-3.5 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-t-lg border-b border-sky-blue/20">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-electric-blue/15 border border-electric-blue/30 text-electric-blue flex-shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl sm:text-2xl text-warm-ivory tracking-wide flex items-center gap-2">
                    <span>EDUCATION</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-pulse" />
                  </h2>
                  <p className="font-mono text-[11px] text-sky-light/70">
                    Academic Degrees &amp; Higher Educational Background
                  </p>
                </div>
              </div>
              <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-deep-navy border border-sky-blue/25 text-sky-light hidden sm:inline-block">
                CHAPTER // 05
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {educationData.map((edu, eduIdx) => (
              <div
                key={edu.id}
                className="reveal-card apple-card-hover p-6 rounded-lg bg-deep-navy-card/70 border border-sky-blue/20 space-y-3 shadow-lg"
                style={{ '--stagger-delay': `${eduIdx * 80}ms` } as React.CSSProperties}
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
                  {edu.details.map((det, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2">
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

            {/* Academic Training & Coursework (AWS Academy / Central Mindanao University) */}
            <div className="reveal-card apple-card-hover p-6 rounded-lg bg-deep-navy-card/70 border border-sky-blue/20 space-y-4 shadow-lg" style={{ '--stagger-delay': '120ms' } as React.CSSProperties}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-sky-blue/15">
                <div>
                  <div className="font-mono text-[10px] text-electric-blue uppercase tracking-widest font-bold">
                    University Curriculum Training
                  </div>
                  <h3 className="font-display font-bold text-lg text-warm-ivory">
                    Academic Cloud Computing Coursework
                  </h3>
                  <div className="font-mono text-xs text-sky-light">
                    AWS Academy &bull; Central Mindanao University Curriculum
                  </div>
                </div>
                <div className="font-mono text-[11px] text-emerald-400 font-semibold px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 self-start sm:self-center">
                  Completed Academic Coursework
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {academicTrainingData.map((course, cIdx) => (
                  <div
                    key={course.id}
                    className="p-4 rounded-md bg-deep-navy/80 border border-sky-blue/15 space-y-2.5"
                    style={{ '--stagger-delay': `${cIdx * 60}ms` } as React.CSSProperties}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-display font-bold text-sm text-warm-ivory">
                        {course.title}
                      </h4>
                      <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-sky-blue/10 text-sky-light whitespace-nowrap">
                        {course.provider}
                      </span>
                    </div>

                    <p className="font-sans text-xs text-warm-ivory-dim leading-relaxed break-words">
                      {course.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {course.skillsCovered.map((topic) => (
                        <span
                          key={topic}
                          className="font-mono text-[9px] px-2 py-0.5 rounded bg-deep-navy-surface border border-sky-blue/20 text-sky-light/80"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 6: SEMINARS & TRAINING */}
        {/* ========================================================= */}
        <section id="seminars" className="reveal-panel scroll-mt-24 space-y-6">
          <div className="story-header py-3.5 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-t-lg border-b border-sky-blue/20">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-electric-blue/15 border border-electric-blue/30 text-electric-blue flex-shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl sm:text-2xl text-warm-ivory tracking-wide flex items-center gap-2">
                    <span>SEMINARS &amp; TRAINING</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-pulse" />
                  </h2>
                  <p className="font-mono text-[11px] text-sky-light/70">
                    Verified Technology Seminars, Workshops &amp; Professional Training Records
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-electric-blue/15 border border-electric-blue/30 font-mono text-[11px] text-electric-blue font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">OFFICIAL CERTIFICATES</span>
                </span>
                <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-deep-navy border border-sky-blue/25 text-sky-light hidden sm:inline-block">
                  CHAPTER // 06
                </span>
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {seminarsTrainingsData.map((st, sIdx) => {
              const isCertExpanded = expandedCertId === st.id
              const hasCert = Boolean(st.hasCertificate && st.certificateUrl)

              return (
                <div
                  key={st.id}
                  className="reveal-card apple-card-hover p-6 rounded-lg bg-deep-navy-card/90 border border-sky-blue/20 shadow-xl backdrop-blur-md flex flex-col justify-between space-y-4 transition-all"
                  style={{ '--stagger-delay': `${sIdx * 80}ms` } as React.CSSProperties}
                >
                  <div className="space-y-3.5">
                    {/* Header: Title & Badges */}
                    <div className="space-y-2 border-b border-white/10 pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display font-bold text-base sm:text-lg text-warm-ivory leading-snug">
                          {st.title}
                        </h3>
                        {st.recognition && (
                          <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex-shrink-0">
                            {st.recognition}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                        {st.organizer && (
                          <span className="flex items-center gap-1.5 text-warm-ivory-dim">
                            <Building2 className="w-3.5 h-3.5 text-electric-blue flex-shrink-0" />
                            <span>{st.organizer}</span>
                          </span>
                        )}
                        <span className="flex items-center gap-1.5 text-electric-blue font-semibold">
                          <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{st.date}</span>
                        </span>
                      </div>
                    </div>

                    {/* Venue */}
                    {st.venue && (
                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-sky-light/80">
                        <MapPin className="w-3.5 h-3.5 text-sky-light/60 flex-shrink-0" />
                        <span>{st.venue}</span>
                      </div>
                    )}

                    {/* Description */}
                    {st.description && (
                      <p className="font-sans text-xs text-warm-ivory-dim leading-relaxed">
                        {st.description}
                      </p>
                    )}

                    {/* Details / Covered topics */}
                    {st.details && st.details.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {st.details.map((d, i) => (
                          <span
                            key={i}
                            className="font-mono text-[10px] px-2.5 py-0.5 rounded bg-deep-navy/80 border border-sky-blue/20 text-sky-light"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Footer: View Certificate Button & Preview */}
                  <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      {hasCert ? (
                        <button
                          type="button"
                          onClick={() => setExpandedCertId(isCertExpanded ? null : st.id)}
                          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                            isCertExpanded
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                              : 'bg-electric-blue/15 text-electric-blue hover:bg-electric-blue/25 border border-electric-blue/35'
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
                        <div className="flex items-center gap-1.5 text-warm-ivory-dim/60 font-mono text-[11px]">
                          <ShieldCheck className="w-3.5 h-3.5 text-sky-light/60" />
                          <span>Institutional Record (From Official CV)</span>
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
                          className="inline-flex items-center gap-1 font-mono text-[11px] text-sky-light hover:text-electric-blue transition-colors cursor-pointer"
                          title="Fullscreen Certificate Inspection"
                        >
                          <Maximize2 className="w-3 h-3" />
                          <span className="hidden sm:inline">Fullscreen</span>
                        </button>
                      )}
                    </div>

                    {/* Expandable Certificate Preview Container (Hidden by default, shown on demand) */}
                    {hasCert && isCertExpanded && (
                      <div className="mt-3 p-3.5 rounded-lg bg-black/40 border border-sky-blue/30 space-y-2">
                        <div className="flex items-center justify-between pb-1.5 text-[10px] font-mono text-sky-light border-b border-white/10">
                          <span className="font-semibold tracking-wider">OFFICIAL CERTIFICATE PREVIEW</span>
                          <button
                            type="button"
                            onClick={() => setExpandedCertId(null)}
                            className="flex items-center gap-1 text-rose-300 hover:text-rose-200 transition-colors cursor-pointer"
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
                            className="w-full max-h-[450px] object-contain rounded border border-sky-blue/20 shadow-xl group-hover:opacity-95 transition-opacity"
                            draggable={false}
                          />
                        </div>

                        <p className="text-[10px] text-center text-warm-ivory-dim/70 font-mono">
                          Click certificate image or &quot;Fullscreen&quot; to inspect in high resolution
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 7: PROJECTS */}
        {/* ========================================================= */}
        <section id="projects" className="reveal-panel scroll-mt-24 space-y-6">
          <div className="story-header py-3.5 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-t-lg border-b border-sky-blue/20">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-electric-blue/15 border border-electric-blue/30 text-electric-blue flex-shrink-0">
                  <FolderKanban className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl sm:text-2xl text-warm-ivory tracking-wide flex items-center gap-2">
                    <span>FEATURED PROJECTS</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-pulse" />
                  </h2>
                  <p className="font-mono text-[11px] text-sky-light/70">
                    5 Verified Academic, Capstone &amp; Enterprise Projects
                  </p>
                </div>
              </div>
              <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-deep-navy border border-sky-blue/25 text-sky-light hidden sm:inline-block">
                CHAPTER // 07
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsData.map((project, pIdx) => (
              <div
                key={project.id}
                className="reveal-card apple-card-hover p-6 rounded-lg bg-deep-navy-card/70 border border-sky-blue/20 flex flex-col justify-between space-y-5 hover:border-electric-blue/50 transition-colors shadow-lg"
                style={{ '--stagger-delay': `${pIdx * 70}ms` } as React.CSSProperties}
              >
                <div className="space-y-3.5">
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

                  {/* Clean Dark-Themed Project Demo Preview Container */}
                  <div className="relative rounded-lg overflow-hidden bg-deep-navy-surface/90 border border-sky-blue/20 p-4 flex flex-col items-center justify-center text-center min-h-[145px] group/preview transition-all hover:border-sky-blue/40 shadow-inner">
                    <div className="absolute inset-0 bg-game-grid opacity-25 pointer-events-none" />

                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono pointer-events-none">
                      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-deep-navy/90 border border-sky-blue/20 text-sky-light">
                        <Terminal className="w-3 h-3 text-electric-blue" />
                        <span>PROTOTYPE ENV</span>
                      </span>
                      {project.links?.demo ? (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>LIVE DEMO</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-sky-blue/10 border border-sky-blue/20 text-sky-light/80 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-light/60" />
                          <span>DEMO COMING SOON</span>
                        </span>
                      )}
                    </div>

                    <div className="relative z-10 flex flex-col items-center gap-2 pt-6 pb-2">
                      <div className="p-3 rounded-xl bg-deep-navy border border-sky-blue/25 shadow-inner group-hover/preview:border-electric-blue transition-colors">
                        {getProjectDemoIcon(project)}
                      </div>
                      <div className="space-y-0.5">
                        <div className="font-mono text-xs font-semibold text-warm-ivory">
                          {project.category}
                        </div>
                        <div className="font-mono text-[10px] text-warm-ivory-dim/60">
                          Institutional Software Prototype
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 w-full pt-2.5 border-t border-sky-blue/10 flex items-center justify-center">
                      {project.links?.demo ? (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-deep-navy bg-electric-blue hover:bg-white px-3 py-1 rounded transition-colors active:scale-95"
                        >
                          <span>LAUNCH INTERACTIVE DEMO</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 font-mono text-[10px] text-warm-ivory-dim/60 cursor-default">
                          <span>Public Web Simulator Under Staging</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="font-mono text-[10px] font-bold text-sky-light uppercase">
                      Key Highlights:
                    </div>
                    <ul className="space-y-1 font-mono text-[11px] text-warm-ivory-dim/90">
                      {project.features.slice(0, 3).map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-1.5">
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
        {/* SECTION 8: TECHNICAL SKILLS */}
        {/* ========================================================= */}
        <section id="skills" className="reveal-panel scroll-mt-24 space-y-6">
          <div className="story-header py-3.5 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-t-lg border-b border-sky-blue/20">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-electric-blue/15 border border-electric-blue/30 text-electric-blue flex-shrink-0">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl sm:text-2xl text-warm-ivory tracking-wide flex items-center gap-2">
                    <span>TECHNICAL SKILLS</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-pulse" />
                  </h2>
                  <p className="font-mono text-[11px] text-sky-light/70">
                    Organized Technical Competencies, Toolchains &amp; Recognized Frameworks
                  </p>
                </div>
              </div>
              <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-deep-navy border border-sky-blue/25 text-sky-light hidden sm:inline-block">
                CHAPTER // 08
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillGroupsData.map((group, gIdx) => (
              <div
                key={group.id}
                className={`reveal-card apple-card-hover p-6 rounded-lg bg-gradient-to-b ${group.gradient || 'from-deep-navy-card/80 to-deep-navy'} border border-sky-blue/25 space-y-4 shadow-xl hover:border-electric-blue/40 transition-all`}
                style={{ '--stagger-delay': `${gIdx * 60}ms` } as React.CSSProperties}
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
                      className="flex items-center justify-between p-2.5 rounded-md bg-deep-navy/80 border border-sky-blue/15 hover:border-electric-blue/30 transition-all duration-200 hover:translate-x-1 group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="p-1 rounded bg-deep-navy flex-shrink-0">
                          <TechLogo name={skill.logo || skill.name} className="w-4 h-4" />
                        </div>
                        <span className="font-mono text-xs font-semibold text-warm-ivory group-hover:text-electric-blue transition-colors break-words">
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
        {/* SECTION 9: CERTIFICATIONS & BADGES */}
        {/* ========================================================= */}
        <section id="certifications" className="reveal-panel scroll-mt-24 space-y-6">
          <div className="story-header py-3.5 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-t-lg border-b border-sky-blue/20">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-electric-blue/15 border border-electric-blue/30 text-electric-blue flex-shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl sm:text-2xl text-warm-ivory tracking-wide flex items-center gap-2">
                    <span>CERTIFICATIONS &amp; BADGES</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </h2>
                  <p className="font-mono text-[11px] text-sky-light/70">
                    Official Cisco Credly Verified Digital Badges
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 font-mono text-[11px] text-emerald-400 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">OFFICIAL CREDLY VERIFIED</span>
                </span>
                <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-deep-navy border border-sky-blue/25 text-sky-light hidden md:inline-block">
                  CHAPTER // 09
                </span>
              </div>
            </div>
          </div>

          {/* Cards Grid with Category Gradients */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificationsData.map((cert, cIdx) => {
              const gradient = CATEGORY_GRADIENTS[cert.category] || CATEGORY_GRADIENTS['General IT']

              return (
                <div
                  key={cert.id}
                  className={`reveal-card apple-card-hover p-6 rounded-lg bg-gradient-to-b ${gradient.bg} border ${gradient.border} shadow-xl backdrop-blur-md flex flex-col justify-between space-y-5 transition-all`}
                  style={{ '--stagger-delay': `${cIdx * 70}ms` } as React.CSSProperties}
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
                      <h3 className="font-display font-bold text-base text-warm-ivory leading-snug break-words">
                        {cert.title}
                      </h3>
                      <p className="font-sans text-xs text-warm-ivory-dim leading-relaxed break-words">
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
        </section>

        {/* ========================================================= */}
        {/* SECTION 10: MULTIMEDIA & CREATIVE WORKS */}
        {/* ========================================================= */}
        <section id="multimedia" className="reveal-panel scroll-mt-24 space-y-6">
          <div className="story-header py-3.5 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-t-lg border-b border-sky-blue/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-cyber-yellow/15 border border-cyber-yellow/30 text-cyber-yellow flex-shrink-0">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl sm:text-2xl text-warm-ivory tracking-wide flex items-center gap-2">
                    <span>MULTIMEDIA &amp; CREATIVE WORKS</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-yellow animate-pulse" />
                  </h2>
                  <p className="font-mono text-[11px] text-sky-light/70">
                    Graphic Design, Photo Manipulation &amp; Digital Artwork
                  </p>
                </div>
              </div>

              {/* Category Filter Pills (Only categories with actual uploaded works) */}
              <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
                {availableCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setMultimediaFilter(cat)}
                    className={`px-3 py-1.5 rounded-full transition-all cursor-pointer active:scale-95 ${
                      multimediaFilter === cat
                        ? 'bg-cyber-yellow text-deep-navy font-bold shadow-[0_0_12px_rgba(255,215,0,0.4)]'
                        : 'bg-deep-navy/80 border border-sky-blue/20 text-warm-ivory-dim hover:text-warm-ivory hover:border-sky-blue'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Gallery Grid */}
          {filteredMedia.length === 0 ? (
            <div className="p-12 text-center rounded-lg bg-deep-navy-card/60 border border-dashed border-sky-blue/30 space-y-3">
              <Palette className="w-10 h-10 text-sky-light/40 mx-auto" />
              <h3 className="font-mono font-bold text-sm text-warm-ivory">NO CREATIVE WORKS IN THIS CATEGORY</h3>
              <p className="font-sans text-xs text-warm-ivory-dim/70 max-w-md mx-auto">
                No items have been uploaded under this category yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMedia.map((item, mIdx) => (
                <div
                  key={item.id}
                  className="reveal-card apple-card-hover rounded-lg bg-deep-navy-card/85 border border-sky-blue/25 shadow-xl overflow-hidden flex flex-col justify-between transition-all group"
                  style={{ '--stagger-delay': `${mIdx * 50}ms` } as React.CSSProperties}
                >
                  {/* Media Preview Container */}
                  <div className="relative bg-black/60 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setSelectedMedia(item)}
                      className="w-full block relative cursor-pointer group/img overflow-hidden"
                      title="Click to view full-resolution image"
                    >
                      <div className="aspect-[4/3] w-full bg-deep-navy/90 flex items-center justify-center overflow-hidden">
                        <img
                          src={item.mediaUrl}
                          alt={item.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover/img:scale-105"
                        />
                      </div>
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-deep-navy/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-xs font-mono font-bold text-warm-ivory backdrop-blur-xs">
                        <Maximize2 className="w-4 h-4 text-cyber-yellow" />
                        <span>EXPAND VIEW</span>
                      </div>
                    </button>

                    {/* Category Pill Over Media */}
                    <div className="absolute top-2.5 left-2.5 pointer-events-none">
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shadow-md flex items-center gap-1 bg-deep-navy/90 border border-cyber-yellow/40 text-cyber-yellow">
                        <span>{item.category}</span>
                      </span>
                    </div>

                    {item.date && (
                      <div className="absolute top-2.5 right-2.5 pointer-events-none">
                        <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-deep-navy/90 border border-white/20 text-sky-light shadow-md">
                          {item.date}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Narrative & Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-display font-bold text-base text-warm-ivory leading-snug group-hover:text-cyber-yellow transition-colors break-words">
                        {item.title}
                      </h3>
                      <p className="font-sans text-xs text-warm-ivory-dim leading-relaxed break-words">
                        {item.description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-2 border-t border-sky-blue/15 font-mono">
                      {/* Software Tools */}
                      <div className="flex flex-wrap gap-1.5">
                        {item.tools.map((t) => (
                          <span
                            key={t}
                            className={`text-[9px] px-2 py-0.5 rounded border font-mono ${
                              t === 'Canva'
                                ? 'bg-sky-500/15 border-sky-400/40 text-sky-300 font-bold'
                                : 'bg-deep-navy border-sky-blue/20 text-sky-light'
                            }`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Card Action */}
                      <div className="flex items-center justify-between pt-1">
                        <button
                          type="button"
                          onClick={() => setSelectedMedia(item)}
                          className="inline-flex items-center gap-1.5 text-xs text-cyber-yellow hover:text-white font-bold transition-colors cursor-pointer active:scale-95"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>DETAILS &amp; FULL VIEW</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ========================================================= */}
        {/* SECTION 11: CONTACT */}
        {/* ========================================================= */}
        <section id="contact" className="reveal-panel scroll-mt-24 space-y-6 pb-12">
          <div className="story-header py-3.5 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-t-lg border-b border-sky-blue/20">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-electric-blue/15 border border-electric-blue/30 text-electric-blue flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl sm:text-2xl text-warm-ivory tracking-wide flex items-center gap-2">
                    <span>CONTACT INFORMATION</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-pulse" />
                  </h2>
                  <p className="font-mono text-[11px] text-sky-light/70">
                    Direct Cellular Line, Email Transmission &amp; Message Portal
                  </p>
                </div>
              </div>
              <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-deep-navy border border-sky-blue/25 text-sky-light hidden sm:inline-block">
                CHAPTER // 11
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Details Card */}
            <div className="reveal-card apple-card-hover p-6 rounded-lg bg-deep-navy-card/80 border border-sky-blue/25 space-y-6 shadow-xl" style={{ '--stagger-delay': '0ms' } as React.CSSProperties}>
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
                      className="px-3 py-1.5 rounded-full bg-deep-navy/80 hover:bg-sky-blue/15 border border-sky-blue/25 hover:border-electric-blue text-xs font-mono text-warm-ivory hover:text-electric-blue transition-colors flex items-center gap-1.5 active:scale-95"
                    >
                      <span>{link.platform}</span>
                      <ExternalLink className="w-3 h-3 text-sky-light" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Interactive Message Form */}
            <div className="reveal-card apple-card-hover p-6 rounded-lg bg-deep-navy-card/80 border border-sky-blue/25 space-y-4 shadow-xl" style={{ '--stagger-delay': '80ms' } as React.CSSProperties}>
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
                      className="w-full px-3 py-2 rounded bg-deep-navy/90 border border-sky-blue/25 text-warm-ivory placeholder-warm-ivory-dim/40 focus:border-electric-blue focus:outline-none transition-colors"
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
                      className="w-full px-3 py-2 rounded bg-deep-navy/90 border border-sky-blue/25 text-warm-ivory placeholder-warm-ivory-dim/40 focus:border-electric-blue focus:outline-none transition-colors"
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
                      placeholder="Detail your inquiry or interview invitation here"
                      className="w-full px-3 py-2 rounded bg-deep-navy/90 border border-sky-blue/25 text-warm-ivory placeholder-warm-ivory-dim/40 focus:border-electric-blue focus:outline-none resize-none transition-colors"
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

      {/* ========================================================= */}
      {/* MULTIMEDIA INSPECTION LIGHTBOX MODAL (APPLE QUICK LOOK)   */}
      {/* ========================================================= */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="multimedia-dialog-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-deep-navy/90 backdrop-blur-xl select-none"
            onClick={() => setSelectedMedia(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-deep-navy-card/95 border border-sky-blue/40 rounded-xl shadow-[0_24px_64px_rgba(0,0,0,0.9),0_0_30px_rgba(0,240,255,0.15)] overflow-hidden flex flex-col font-sans"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#121926] border-b border-sky-blue/25">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <Palette className="w-4 h-4 text-cyber-yellow flex-shrink-0" />
                  <span
                    id="multimedia-dialog-title"
                    className="font-mono font-bold text-xs sm:text-sm text-warm-ivory uppercase break-words"
                  >
                    {selectedMedia.title}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedMedia(null)}
                  className="px-2.5 py-1 bg-rose-500/20 hover:bg-rose-500 border border-rose-500/40 text-rose-300 hover:text-white rounded text-xs font-mono font-bold transition-colors cursor-pointer flex-shrink-0 active:scale-95"
                  aria-label="Close dialog"
                >
                  ✕ CLOSE
                </button>
              </div>

              {/* Media Display Area */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-black/50">
                <div className="flex justify-center items-center">
                  <img
                    src={selectedMedia.mediaUrl}
                    alt={selectedMedia.title}
                    className="max-h-[65vh] w-auto max-w-full rounded object-contain shadow-2xl border border-sky-blue/20"
                  />
                </div>

                {/* Narrative & Details */}
                <div className="space-y-3 pt-3 border-t border-sky-blue/20">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-cyber-yellow/15 text-cyber-yellow border border-cyber-yellow/40 uppercase">
                      {selectedMedia.category}
                    </span>
                    {selectedMedia.date && (
                      <span className="font-mono text-xs text-sky-light">
                        Date: {selectedMedia.date}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-warm-ivory leading-relaxed break-words">
                    {selectedMedia.description}
                  </p>

                  <div className="pt-2">
                    <span className="font-mono text-xs text-sky-light/80 block mb-1.5 uppercase">
                      Tools &amp; Software Used:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedMedia.tools.map((t) => (
                        <span
                          key={t}
                          className={`font-mono text-xs px-2.5 py-1 rounded border ${
                            t === 'Canva'
                              ? 'bg-sky-500/20 border-sky-400/40 text-sky-300 font-bold'
                              : 'bg-deep-navy border-sky-blue/25 text-warm-ivory'
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <a
                      href={selectedMedia.mediaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-electric-blue hover:bg-white text-deep-navy font-mono text-xs font-bold transition-all shadow-md active:scale-95"
                    >
                      <span>OPEN FULL-SIZE IMAGE</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
