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
  Palette,
  Mail,
  Globe2,
  Volume2,
  VolumeX,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react'
import { useGameStore } from '@/hooks/useGameStore'

interface DirectPortfolioNavProps {
  activeSection: string
  onNavigate: (sectionId: string) => void
}

export const DirectPortfolioNav: React.FC<DirectPortfolioNavProps> = ({
  activeSection,
  onNavigate,
}) => {
  const { enterWorld, isSoundMuted, toggleMute } = useGameStore()

  const [openDropdown, setOpenDropdown] = useState<'career' | 'portfolio' | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileCareerExpanded, setMobileCareerExpanded] = useState(false)
  const [mobilePortfolioExpanded, setMobilePortfolioExpanded] = useState(false)

  const navRef = useRef<HTMLElement>(null)
  const careerRef = useRef<HTMLDivElement>(null)
  const portfolioRef = useRef<HTMLDivElement>(null)

  // Determine active parent state
  const isCareerActive = ['resume', 'experience', 'education', 'seminars'].includes(activeSection)
  const isPortfolioActive = ['projects', 'skills', 'certifications', 'multimedia'].includes(activeSection)

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        careerRef.current &&
        !careerRef.current.contains(e.target as Node) &&
        portfolioRef.current &&
        !portfolioRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null)
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleSelectSection = (sectionId: string) => {
    setOpenDropdown(null)
    setMobileMenuOpen(false)
    onNavigate(sectionId)
  }

  const toggleDropdown = (name: 'career' | 'portfolio') => {
    setOpenDropdown(openDropdown === name ? null : name)
  }

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-50 bg-deep-navy/95 backdrop-blur-xl border-b border-sky-blue/25 shadow-[0_4px_24px_rgba(0,0,0,0.6)] select-none font-mono"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
        {/* ========================================================= */}
        {/* LEFT: INA.EXE BRAND IDENTITY WITH OFFICIAL IT LOGO */}
        {/* ========================================================= */}
        <button
          type="button"
          onClick={() => handleSelectSection('home')}
          className="flex items-center gap-3 text-left group cursor-pointer"
          aria-label="INA.EXE - Return to Home"
        >
          {/* Official IT Logo */}
          <div className="relative h-9 flex items-center justify-center">
            <img
              src="/IT_Logo.png"
              alt="IT Logo"
              width={54}
              height={36}
              className="h-8 sm:h-9 w-auto object-contain drop-shadow-[0_0_12px_rgba(0,240,255,0.45)] group-hover:scale-105 transition-transform"
            />
          </div>

          <div>
            <div className="font-bold text-sm tracking-wider text-warm-ivory group-hover:text-electric-blue transition-colors flex items-center gap-1.5">
              <span>INA.EXE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-pulse" />
            </div>
            <div className="text-[10px] text-sky-light/70 tracking-wider">
              BSIT &bull; Data Networking
            </div>
          </div>
        </button>

        {/* ========================================================= */}
        {/* CENTER: DESKTOP NAVIGATION BAR (WITH DROPDOWNS) */}
        {/* ========================================================= */}
        <nav
          aria-label="Portfolio Main Navigation"
          className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-deep-navy-card/85 border border-sky-blue/20 rounded-full shadow-lg backdrop-blur-md text-xs"
        >
          {/* 1. Home */}
          <button
            type="button"
            onClick={() => handleSelectSection('home')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              activeSection === 'home'
                ? 'bg-electric-blue text-deep-navy font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                : 'text-warm-ivory-dim hover:text-warm-ivory hover:bg-white/5'
            }`}
          >
            <House className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          {/* 2. About */}
          <button
            type="button"
            onClick={() => handleSelectSection('about')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              activeSection === 'about'
                ? 'bg-electric-blue text-deep-navy font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                : 'text-warm-ivory-dim hover:text-warm-ivory hover:bg-white/5'
            }`}
          >
            <UserRound className="w-3.5 h-3.5" />
            <span>About</span>
          </button>

          {/* 3. Career (Dropdown: Resume, Experience, Education) */}
          <div ref={careerRef} className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('career')}
              aria-haspopup="true"
              aria-expanded={openDropdown === 'career'}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                isCareerActive
                  ? 'bg-electric-blue/20 text-electric-blue font-bold border border-electric-blue/50 shadow-[0_0_10px_rgba(0,240,255,0.25)]'
                  : 'text-warm-ivory-dim hover:text-warm-ivory hover:bg-white/5'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Career</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ${
                  openDropdown === 'career' ? 'rotate-180 text-electric-blue' : ''
                }`}
              />
            </button>

            {/* Career Dropdown Menu */}
            <AnimatePresence>
              {openDropdown === 'career' && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.97 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full left-0 mt-2 w-52 bg-deep-navy-card/95 border border-sky-blue/30 rounded-md shadow-[0_16px_36px_rgba(0,0,0,0.85),0_0_15px_rgba(0,240,255,0.1)] backdrop-blur-xl p-1.5 space-y-1 z-50"
                >
                  <div className="px-2.5 py-1 text-[9px] uppercase tracking-widest text-sky-light/60 border-b border-sky-blue/15 mb-1">
                    Career Profile
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectSection('resume')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-left transition-all duration-200 hover:translate-x-1 cursor-pointer text-xs ${
                      activeSection === 'resume'
                        ? 'bg-electric-blue/20 text-electric-blue font-bold border border-electric-blue/30'
                        : 'text-warm-ivory hover:text-electric-blue hover:bg-white/5'
                    }`}
                  >
                    <FileUser className="w-3.5 h-3.5 text-electric-blue flex-shrink-0" />
                    <span>Resume (CV)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectSection('experience')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-left transition-all duration-200 hover:translate-x-1 cursor-pointer text-xs ${
                      activeSection === 'experience'
                        ? 'bg-electric-blue/20 text-electric-blue font-bold border border-electric-blue/30'
                        : 'text-warm-ivory hover:text-electric-blue hover:bg-white/5'
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5 text-sky-light flex-shrink-0" />
                    <span>Work Experience</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectSection('education')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-left transition-all duration-200 hover:translate-x-1 cursor-pointer text-xs ${
                      activeSection === 'education'
                        ? 'bg-electric-blue/20 text-electric-blue font-bold border border-electric-blue/30'
                        : 'text-warm-ivory hover:text-electric-blue hover:bg-white/5'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-cyber-yellow flex-shrink-0" />
                    <span>Education (CMU)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectSection('seminars')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-left transition-all duration-200 hover:translate-x-1 cursor-pointer text-xs ${
                      activeSection === 'seminars'
                        ? 'bg-electric-blue/20 text-electric-blue font-bold border border-electric-blue/30'
                        : 'text-warm-ivory hover:text-electric-blue hover:bg-white/5'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>Seminars &amp; Training</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 4. Portfolio (Dropdown: Projects, Technical Skills, Certifications & Badges) */}
          <div ref={portfolioRef} className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('portfolio')}
              aria-haspopup="true"
              aria-expanded={openDropdown === 'portfolio'}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                isPortfolioActive
                  ? 'bg-electric-blue/20 text-electric-blue font-bold border border-electric-blue/50 shadow-[0_0_10px_rgba(0,240,255,0.25)]'
                  : 'text-warm-ivory-dim hover:text-warm-ivory hover:bg-white/5'
              }`}
            >
              <FolderKanban className="w-3.5 h-3.5" />
              <span>Portfolio</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ${
                  openDropdown === 'portfolio' ? 'rotate-180 text-electric-blue' : ''
                }`}
              />
            </button>

            {/* Portfolio Dropdown Menu */}
            <AnimatePresence>
              {openDropdown === 'portfolio' && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.97 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full left-0 mt-2 w-60 bg-deep-navy-card/95 border border-sky-blue/30 rounded-md shadow-[0_16px_36px_rgba(0,0,0,0.85),0_0_15px_rgba(0,240,255,0.1)] backdrop-blur-xl p-1.5 space-y-1 z-50"
                >
                  <div className="px-2.5 py-1 text-[9px] uppercase tracking-widest text-sky-light/60 border-b border-sky-blue/15 mb-1">
                    Technical Showcase
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectSection('projects')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-left transition-all duration-200 hover:translate-x-1 cursor-pointer text-xs ${
                      activeSection === 'projects'
                        ? 'bg-electric-blue/20 text-electric-blue font-bold border border-electric-blue/30'
                        : 'text-warm-ivory hover:text-electric-blue hover:bg-white/5'
                    }`}
                  >
                    <FolderKanban className="w-3.5 h-3.5 text-sky-light flex-shrink-0" />
                    <span>Projects</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectSection('skills')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-left transition-all duration-200 hover:translate-x-1 cursor-pointer text-xs ${
                      activeSection === 'skills'
                        ? 'bg-electric-blue/20 text-electric-blue font-bold border border-electric-blue/30'
                        : 'text-warm-ivory hover:text-electric-blue hover:bg-white/5'
                    }`}
                  >
                    <Brain className="w-3.5 h-3.5 text-muted-green-light flex-shrink-0" />
                    <span>Technical Skills</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectSection('certifications')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-left transition-all duration-200 hover:translate-x-1 cursor-pointer text-xs ${
                      activeSection === 'certifications'
                        ? 'bg-electric-blue/20 text-electric-blue font-bold border border-electric-blue/30'
                        : 'text-warm-ivory hover:text-electric-blue hover:bg-white/5'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5 text-electric-blue flex-shrink-0" />
                    <span>Certifications &amp; Badges</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectSection('multimedia')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-left transition-all duration-200 hover:translate-x-1 cursor-pointer text-xs ${
                      activeSection === 'multimedia'
                        ? 'bg-electric-blue/20 text-electric-blue font-bold border border-electric-blue/30'
                        : 'text-warm-ivory hover:text-electric-blue hover:bg-white/5'
                    }`}
                  >
                    <Palette className="w-3.5 h-3.5 text-cyber-yellow flex-shrink-0" />
                    <span>Multimedia &amp; Creative Works</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 5. Contact */}
          <button
            type="button"
            onClick={() => handleSelectSection('contact')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              activeSection === 'contact'
                ? 'bg-electric-blue text-deep-navy font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                : 'text-warm-ivory-dim hover:text-warm-ivory hover:bg-white/5'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact</span>
          </button>
        </nav>

        {/* ========================================================= */}
        {/* RIGHT: SOUND TOGGLE & 3D WORLD BUTTON */}
        {/* ========================================================= */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle Button */}
          <button
            type="button"
            onClick={toggleMute}
            className={`p-2 rounded-full border text-xs flex items-center justify-center transition-all cursor-pointer backdrop-blur-md ${
              isSoundMuted
                ? 'bg-deep-navy/80 border-warm-ivory/20 text-warm-ivory-dim hover:text-warm-ivory'
                : 'bg-deep-navy-card/90 border-sky-blue/30 text-electric-blue hover:border-electric-blue'
            }`}
            title={isSoundMuted ? 'Unmute Audio' : 'Mute Audio'}
            aria-label={isSoundMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* 3D WORLD Button (Subtle Cyan Accent) */}
          <button
            type="button"
            onClick={enterWorld}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-electric-blue/15 hover:bg-electric-blue text-electric-blue hover:text-deep-navy border border-electric-blue/40 rounded-full font-mono text-xs font-bold transition-all shadow-[0_0_12px_rgba(0,240,255,0.2)] hover:shadow-[0_0_18px_rgba(0,240,255,0.5)] active:scale-95 cursor-pointer"
            title="Return to 3D Interactive Archipelago Exploration"
            aria-label="Switch to 3D World"
          >
            <Globe2 className="w-4 h-4 text-electric-blue hover:text-deep-navy" />
            <span className="hidden sm:inline tracking-wider">3D WORLD</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full border border-sky-blue/25 bg-deep-navy-card/90 text-warm-ivory hover:text-electric-blue transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE / TABLET EXPANDABLE MENU */}
      {/* ========================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-deep-navy-card/98 border-t border-sky-blue/25 px-4 py-4 space-y-2 text-xs shadow-2xl backdrop-blur-2xl"
          >
            <div className="px-2 pb-1 text-[10px] text-sky-light/60 uppercase tracking-widest border-b border-sky-blue/15 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src="/IT_Logo.png" alt="IT Logo" className="h-4 w-auto object-contain" />
                <span>PORTFOLIO DIRECTORY</span>
              </div>
              <span className="text-electric-blue font-bold">INA.EXE</span>
            </div>

            {/* Home */}
            <button
              type="button"
              onClick={() => handleSelectSection('home')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-sm border transition-colors text-left cursor-pointer ${
                activeSection === 'home'
                  ? 'bg-electric-blue/20 border-electric-blue text-electric-blue font-bold'
                  : 'bg-deep-navy/80 border-sky-blue/15 text-warm-ivory'
              }`}
            >
              <House className="w-4 h-4 text-electric-blue" />
              <span>Home</span>
            </button>

            {/* About */}
            <button
              type="button"
              onClick={() => handleSelectSection('about')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-sm border transition-colors text-left cursor-pointer ${
                activeSection === 'about'
                  ? 'bg-electric-blue/20 border-electric-blue text-electric-blue font-bold'
                  : 'bg-deep-navy/80 border-sky-blue/15 text-warm-ivory'
              }`}
            >
              <UserRound className="w-4 h-4 text-sky-light" />
              <span>About Me</span>
            </button>

            {/* Career Accordion */}
            <div className="border border-sky-blue/20 rounded-sm overflow-hidden bg-deep-navy/80">
              <button
                type="button"
                onClick={() => setMobileCareerExpanded(!mobileCareerExpanded)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-left font-bold cursor-pointer text-warm-ivory hover:text-electric-blue"
              >
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4 text-electric-blue" />
                  <span>Career</span>
                  {isCareerActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-blue" />
                  )}
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobileCareerExpanded ? 'rotate-180 text-electric-blue' : ''
                  }`}
                />
              </button>

              {mobileCareerExpanded && (
                <div className="px-3 pb-2 pt-1 space-y-1 bg-deep-navy/90 border-t border-sky-blue/15">
                  <button
                    type="button"
                    onClick={() => handleSelectSection('resume')}
                    className={`w-full flex items-center gap-2 px-2.5 py-2 rounded text-left ${
                      activeSection === 'resume'
                        ? 'text-electric-blue font-bold bg-electric-blue/15'
                        : 'text-warm-ivory-dim hover:text-warm-ivory'
                    }`}
                  >
                    <FileUser className="w-3.5 h-3.5" />
                    <span>Resume (CV)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectSection('experience')}
                    className={`w-full flex items-center gap-2 px-2.5 py-2 rounded text-left ${
                      activeSection === 'experience'
                        ? 'text-electric-blue font-bold bg-electric-blue/15'
                        : 'text-warm-ivory-dim hover:text-warm-ivory'
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Experience</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectSection('education')}
                    className={`w-full flex items-center gap-2 px-2.5 py-2 rounded text-left ${
                      activeSection === 'education'
                        ? 'text-electric-blue font-bold bg-electric-blue/15'
                        : 'text-warm-ivory-dim hover:text-warm-ivory'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Education</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectSection('seminars')}
                    className={`w-full flex items-center gap-2 px-2.5 py-2 rounded text-left ${
                      activeSection === 'seminars'
                        ? 'text-electric-blue font-bold bg-electric-blue/15'
                        : 'text-warm-ivory-dim hover:text-warm-ivory'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Seminars &amp; Training</span>
                  </button>
                </div>
              )}
            </div>

            {/* Portfolio Accordion */}
            <div className="border border-sky-blue/20 rounded-sm overflow-hidden bg-deep-navy/80">
              <button
                type="button"
                onClick={() => setMobilePortfolioExpanded(!mobilePortfolioExpanded)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-left font-bold cursor-pointer text-warm-ivory hover:text-electric-blue"
              >
                <div className="flex items-center gap-2.5">
                  <FolderKanban className="w-4 h-4 text-electric-blue" />
                  <span>Portfolio</span>
                  {isPortfolioActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-blue" />
                  )}
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobilePortfolioExpanded ? 'rotate-180 text-electric-blue' : ''
                  }`}
                />
              </button>

              {mobilePortfolioExpanded && (
                <div className="px-3 pb-2 pt-1 space-y-1 bg-deep-navy/90 border-t border-sky-blue/15">
                  <button
                    type="button"
                    onClick={() => handleSelectSection('projects')}
                    className={`w-full flex items-center gap-2 px-2.5 py-2 rounded text-left ${
                      activeSection === 'projects'
                        ? 'text-electric-blue font-bold bg-electric-blue/15'
                        : 'text-warm-ivory-dim hover:text-warm-ivory'
                    }`}
                  >
                    <FolderKanban className="w-3.5 h-3.5" />
                    <span>Projects</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectSection('skills')}
                    className={`w-full flex items-center gap-2 px-2.5 py-2 rounded text-left ${
                      activeSection === 'skills'
                        ? 'text-electric-blue font-bold bg-electric-blue/15'
                        : 'text-warm-ivory-dim hover:text-warm-ivory'
                    }`}
                  >
                    <Brain className="w-3.5 h-3.5" />
                    <span>Technical Skills</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectSection('certifications')}
                    className={`w-full flex items-center gap-2 px-2.5 py-2 rounded text-left ${
                      activeSection === 'certifications'
                        ? 'text-electric-blue font-bold bg-electric-blue/15'
                        : 'text-warm-ivory-dim hover:text-warm-ivory'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Certifications &amp; Badges</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectSection('multimedia')}
                    className={`w-full flex items-center gap-2 px-2.5 py-2 rounded text-left ${
                      activeSection === 'multimedia'
                        ? 'text-electric-blue font-bold bg-electric-blue/15'
                        : 'text-warm-ivory-dim hover:text-warm-ivory'
                    }`}
                  >
                    <Palette className="w-3.5 h-3.5" />
                    <span>Multimedia &amp; Creative Works</span>
                  </button>
                </div>
              )}
            </div>

            {/* Contact */}
            <button
              type="button"
              onClick={() => handleSelectSection('contact')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-sm border transition-colors text-left cursor-pointer ${
                activeSection === 'contact'
                  ? 'bg-electric-blue/20 border-electric-blue text-electric-blue font-bold'
                  : 'bg-deep-navy/80 border-sky-blue/15 text-warm-ivory'
              }`}
            >
              <Mail className="w-4 h-4 text-electric-blue" />
              <span>Contact</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

