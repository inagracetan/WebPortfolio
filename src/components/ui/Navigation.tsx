import React from 'react'
import { motion } from 'framer-motion'
import {
  Volume2,
  VolumeX,
  Settings,
  Menu,
  House,
  UserRound,
  FileUser,
  FolderKanban,
  Brain,
  Mail,
} from 'lucide-react'
import { useGameStore } from '@/hooks/useGameStore'
import { Tooltip } from './Tooltip'
import { APP_CONFIG } from '@/utilities/constants'
import { APPLE_SPRINGS } from '@/styles/motion'

export const Navigation: React.FC = () => {
  const {
    isSoundMuted,
    toggleMute,
    openModal,
    toggleMenu,
    currentScreen,
    setScreen,
    isUiModalOpen,
    activeLocation,
    setLocation,
  } = useGameStore()

  // STRICT REQUIREMENT (Phase 5): Hide completely when ANY modal or popup is open
  if (isUiModalOpen) {
    return null
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 py-3 sm:py-4 pointer-events-none select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand Identity Logo */}
        <div className="pointer-events-auto flex items-center gap-2">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            transition={APPLE_SPRINGS.snappy}
            onClick={() => openModal('ABOUT')}
            className="group flex items-center gap-2.5 px-3 py-1.5 bg-deep-navy-card/90 hover:bg-deep-navy border border-sky-blue/30 hover:border-electric-blue rounded-full backdrop-blur-md transition-colors shadow-md cursor-pointer"
            aria-label="Ina Grace Tan - Profile Summary"
            title="View Candidate Overview"
          >
            <img
              src="/IT_Logo.png"
              alt="IT Logo"
              width={36}
              height={24}
              className="h-6 w-auto object-contain drop-shadow-[0_0_8px_rgba(0,240,255,0.6)] group-hover:scale-105 transition-transform"
            />
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-bold text-sm tracking-wide text-warm-ivory group-hover:text-white">
                {APP_CONFIG.name}
              </span>
              <span className="font-mono text-[10px] text-sky-light/70 hidden md:inline">
                Data Networking &bull; IT
              </span>
            </div>
          </motion.button>
        </div>

        {/* Center: Simplified, Professional 6-Section Navigation (Desktop / Tablet) */}
        {currentScreen !== 'WELCOME' && (
          <nav
            aria-label="Main Portfolio Navigation"
            className="pointer-events-auto hidden md:flex items-center gap-1 px-2.5 py-1 bg-deep-navy-card/90 border border-sky-blue/25 rounded-full shadow-lg backdrop-blur-md text-xs font-mono"
          >
            {/* 1. Personal Workspace (First and most prominent location option - no reset/respawn) */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              transition={APPLE_SPRINGS.snappy}
              onClick={() => setLocation('workspace')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                activeLocation.id === 'workspace'
                  ? 'bg-electric-blue/20 text-electric-blue font-bold border border-electric-blue/40 shadow-sm'
                  : 'text-warm-ivory-dim hover:text-warm-ivory hover:bg-white/10'
              }`}
              title="Personal Workspace (Creative Studio & Villa Hub)"
              aria-label="Personal Workspace"
            >
              <House className="w-3.5 h-3.5 text-electric-blue" />
              <span><span className="hidden xl:inline">PERSONAL </span>WORKSPACE</span>
            </motion.button>

            {/* 2. About (Opens About Me modal without teleporting) */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              transition={APPLE_SPRINGS.snappy}
              onClick={() => openModal('ABOUT')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-warm-ivory-dim hover:text-warm-ivory hover:bg-white/10 transition-colors cursor-pointer"
              title="About Ina Grace Tan"
            >
              <UserRound className="w-3.5 h-3.5 text-sky-light" />
              <span>ABOUT</span>
            </motion.button>

            {/* 3. Resume (Opens authentic PDF CV without teleporting) */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              transition={APPLE_SPRINGS.snappy}
              onClick={() => openModal('RESUME')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-electric-blue/15 text-electric-blue font-bold border border-electric-blue/30 hover:bg-electric-blue hover:text-deep-navy transition-all cursor-pointer shadow-sm"
              title="View & Download Curriculum Vitae"
            >
              <FileUser className="w-3.5 h-3.5" />
              <span>RESUME</span>
            </motion.button>

            {/* 4. Projects (Opens Project Showcase without teleporting) */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              transition={APPLE_SPRINGS.snappy}
              onClick={() => openModal('PROJECTS')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-warm-ivory-dim hover:text-warm-ivory hover:bg-white/10 transition-colors cursor-pointer"
              title="Featured IT & Software Projects"
            >
              <FolderKanban className="w-3.5 h-3.5 text-sky-light" />
              <span>PROJECTS</span>
            </motion.button>

            {/* 5. Skills (Opens Skills Matrix without teleporting) */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              transition={APPLE_SPRINGS.snappy}
              onClick={() => openModal('SKILLS')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-warm-ivory-dim hover:text-warm-ivory hover:bg-white/10 transition-colors cursor-pointer"
              title="Technical Skills Matrix"
            >
              <Brain className="w-3.5 h-3.5 text-muted-green-light" />
              <span>SKILLS</span>
            </motion.button>

            {/* 6. Contact (Opens Contact Beacon without teleporting) */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              transition={APPLE_SPRINGS.snappy}
              onClick={() => openModal('CONTACT')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-warm-ivory-dim hover:text-warm-ivory hover:bg-white/10 transition-colors cursor-pointer"
              title="Contact Info & Direct Cellular Phone"
            >
              <Mail className="w-3.5 h-3.5 text-electric-blue" />
              <span>CONTACT</span>
            </motion.button>
          </nav>
        )}

        {/* Right: Direct Portfolio, Sound, Settings & Mobile Drawer Trigger */}
        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">
          {/* Direct Portfolio Switch (coexisting with 3D exploration) */}
          {currentScreen !== 'WELCOME' && (
            <Tooltip content="Direct Portfolio View (All 9 Sections)">
              <motion.button
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.94 }}
                transition={APPLE_SPRINGS.snappy}
                onClick={() => setScreen('DIRECT_PORTFOLIO')}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-electric-blue/15 hover:bg-electric-blue text-electric-blue hover:text-deep-navy border border-electric-blue/40 rounded-full font-mono text-xs font-semibold transition-colors backdrop-blur-md cursor-pointer shadow-sm"
                aria-label="Direct Portfolio View"
              >
                <FileUser className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">PORTFOLIO</span>
              </motion.button>
            </Tooltip>
          )}

          {/* Sound Toggle */}
          <Tooltip content={isSoundMuted ? 'Unmute Audio' : 'Mute Audio'}>
            <motion.button
              type="button"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={APPLE_SPRINGS.snappy}
              onClick={toggleMute}
              className={`p-2 rounded-full border text-xs font-mono flex items-center justify-center transition-colors backdrop-blur-md cursor-pointer ${
                isSoundMuted
                  ? 'bg-deep-navy/80 border-warm-ivory/20 text-warm-ivory-dim hover:text-warm-ivory'
                  : 'bg-deep-navy-card/90 border-sky-blue/30 text-electric-blue hover:border-electric-blue'
              }`}
              aria-label={isSoundMuted ? 'Unmute Sound' : 'Mute Sound'}
            >
              {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </motion.button>
          </Tooltip>

          {/* Settings */}
          <Tooltip content="Settings & Quality">
            <motion.button
              type="button"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={APPLE_SPRINGS.snappy}
              onClick={() => openModal('SETTINGS')}
              className="p-2 bg-deep-navy-card/90 hover:bg-deep-navy border border-sky-blue/30 hover:border-electric-blue text-warm-ivory hover:text-electric-blue rounded-full text-xs font-mono flex items-center justify-center transition-colors backdrop-blur-md cursor-pointer"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
            </motion.button>
          </Tooltip>

          {/* Mobile / Recruiter Directory Menu Drawer Button (Hidden on Desktop) */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            transition={APPLE_SPRINGS.snappy}
            onClick={toggleMenu}
            className="md:hidden flex items-center gap-1.5 px-3 py-1.5 bg-electric-blue/15 hover:bg-electric-blue text-electric-blue hover:text-deep-navy border border-electric-blue/40 rounded-full font-mono text-xs font-bold transition-colors backdrop-blur-md cursor-pointer shadow-sm"
            aria-label="Open Directory Menu"
          >
            <Menu className="w-4 h-4" />
            <span className="hidden sm:inline">MENU</span>
          </motion.button>
        </div>
      </div>
    </header>
  )
}
