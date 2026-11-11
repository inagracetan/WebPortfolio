import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  FolderKanban,
  Brain,
  Mail,
  FileUser,
  Settings,
  Sparkles,
  Keyboard,
  UserRound,
  House,
  RefreshCcw,
} from 'lucide-react'
import { useGameStore, type ActiveModal } from '@/hooks/useGameStore'
import { characterStore } from '@/characters/useCharacterStore'

export const MenuDrawer: React.FC = () => {
  const {
    isMenuOpen,
    setMenuOpen,
    openModal,
    enterWorld,
    currentScreen,
    setScreen,
    setLocation,
  } = useGameStore()

  const navItems: {
    label: string
    modal?: ActiveModal
    action?: () => void
    icon: React.ReactNode
    badge?: string
    isPrimary?: boolean
  }[] = [
    {
      label: 'Direct Portfolio (All 9 Sections)',
      action: () => {
        setScreen('DIRECT_PORTFOLIO')
        setMenuOpen(false)
      },
      icon: <FileUser className="w-4 h-4 text-electric-blue" />,
      badge: 'COMPLETE PROFILE',
      isPrimary: true,
    },
    {
      label: 'Personal Workspace',
      action: () => {
        if (currentScreen === 'WELCOME') {
          enterWorld()
        }
        setLocation('workspace')
        setMenuOpen(false)
      },
      icon: <House className="w-4 h-4 text-electric-blue" />,
      badge: 'STUDIO VILLA',
    },
    {
      label: 'About Me',
      action: () => {
        openModal('ABOUT')
        setMenuOpen(false)
      },
      icon: <UserRound className="w-4 h-4 text-sky-light" />,
      badge: 'INA GRACE TAN',
    },
    {
      label: 'Curriculum Vitae (CV)',
      action: () => {
        openModal('RESUME')
        setMenuOpen(false)
      },
      icon: <FileUser className="w-4 h-4 text-electric-blue" />,
      badge: 'PDF / PRINT',
    },
    {
      label: 'Featured Projects',
      action: () => {
        openModal('PROJECTS')
        setMenuOpen(false)
      },
      icon: <FolderKanban className="w-4 h-4 text-sky-light" />,
      badge: '5 PROJECTS',
    },
    {
      label: 'Technical Skills Matrix',
      action: () => {
        openModal('SKILLS')
        setMenuOpen(false)
      },
      icon: <Brain className="w-4 h-4 text-muted-green-light" />,
      badge: '6 DOMAINS',
    },
    {
      label: 'Contact & Direct Telephone',
      action: () => {
        openModal('CONTACT')
        setMenuOpen(false)
      },
      icon: <Mail className="w-4 h-4 text-warm-ivory" />,
      badge: '0955-290-0484',
    },
    {
      label: 'Controls & Keybindings',
      action: () => {
        openModal('CONTROLS')
        setMenuOpen(false)
      },
      icon: <Keyboard className="w-4 h-4 text-sky-light/80" />,
    },
    {
      label: 'System Settings & Audio',
      action: () => {
        openModal('SETTINGS')
        setMenuOpen(false)
      },
      icon: <Settings className="w-4 h-4 text-warm-ivory-dim" />,
    },
  ]

  const handleReturnToSpawn = () => {
    characterStore.spawnOnMainIsland()
    setMenuOpen(false)
  }

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-deep-navy/80 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-deep-navy-card/95 border-l border-sky-blue/25 shadow-2xl backdrop-blur-xl p-6 flex flex-col justify-between overflow-y-auto"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-sky-blue/15 mb-4">
                <div>
                  <h3 className="font-display font-bold text-base text-warm-ivory tracking-wide flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-electric-blue" />
                    <span>PORTFOLIO DIRECTORY</span>
                  </h3>
                  <p className="font-mono text-[11px] text-sky-light/70 tracking-wider mt-0.5">
                    INA GRACE TAN &bull; BS IT (DATA NETWORKING)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="p-1.5 text-warm-ivory-dim hover:text-electric-blue hover:bg-white/5 rounded-full transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items (6 Core Sections) */}
              <div className="space-y-1.5 mb-6">
                {navItems.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={item.action}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-sm border transition-all font-mono text-xs tracking-wider group text-left cursor-pointer ${
                      item.isPrimary
                        ? 'bg-electric-blue/15 hover:bg-electric-blue border-electric-blue text-electric-blue hover:text-deep-navy font-bold'
                        : 'bg-deep-navy/60 hover:bg-deep-navy border-sky-blue/10 hover:border-sky-blue/40 text-warm-ivory hover:text-electric-blue'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="p-1 rounded bg-sky-blue/10 group-hover:scale-110 transition-transform">
                        {item.icon}
                      </span>
                      <span className="font-sans font-semibold text-xs sm:text-sm">
                        {item.label}
                      </span>
                    </div>
                    {item.badge && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-electric-blue/15 text-electric-blue border border-electric-blue/30 font-mono">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Respawn / Return to Main Island Action */}
              <div className="p-3 bg-deep-navy/60 border border-sky-blue/15 rounded flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2 text-warm-ivory">
                  <RefreshCcw className="w-3.5 h-3.5 text-electric-blue" />
                  <span>Main Island Spawn Point</span>
                </div>
                <button
                  type="button"
                  onClick={handleReturnToSpawn}
                  className="px-2.5 py-1 bg-electric-blue/15 hover:bg-electric-blue text-electric-blue hover:text-deep-navy rounded text-[11px] font-bold border border-electric-blue/30 transition-colors cursor-pointer"
                >
                  RESPAWN
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-sky-blue/15 font-mono text-[11px] text-warm-ivory-dim/60 flex items-center justify-between">
              <span>INA GRACE TAN &bull; BUKIDNON, PH</span>
              <span className="text-electric-blue font-bold">READY FOR ROLES</span>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
