import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Compass,
  FolderGit2,
  Code2,
  Briefcase,
  GraduationCap,
  Mail,
  FileText,
  Settings,
  Sparkles,
  Keyboard,
  User,
  Home,
} from 'lucide-react'
import { useGameStore, type ActiveModal } from '@/hooks/useGameStore'
import { useCharacterStore } from '@/characters/useCharacterStore'
import { locationsData } from '@/locations/locationsData'

export const MenuDrawer: React.FC = () => {
  const {
    isMenuOpen,
    setMenuOpen,
    openModal,
    enterWorld,
    setLocation,
    activeLocation,
  } = useGameStore()

  const { teleportTo } = useCharacterStore()

  const navItems: {
    label: string
    modal?: ActiveModal
    action?: () => void
    icon: React.ReactNode
    badge?: string
    isPrimary?: boolean
  }[] = [
    {
      label: '3D World Exploration',
      action: () => enterWorld(),
      icon: <Compass className="w-4 h-4 text-electric-blue" />,
      badge: 'EXPLORE',
      isPrimary: true,
    },
    {
      label: 'About Me & Background',
      modal: 'RESUME', // Or About Me
      action: () => openModal('RESUME'),
      icon: <User className="w-4 h-4 text-warm-ivory" />,
      badge: 'INA GRACE TAN',
    },
    {
      label: 'Featured Projects',
      modal: 'PROJECTS',
      icon: <FolderGit2 className="w-4 h-4 text-sky-light" />,
      badge: '5 PROJECTS',
    },
    {
      label: 'Technical Skills Matrix',
      modal: 'SKILLS',
      icon: <Code2 className="w-4 h-4 text-muted-green-light" />,
      badge: '5 DOMAINS',
    },
    {
      label: 'Work Experience',
      modal: 'EXPERIENCE',
      icon: <Briefcase className="w-4 h-4 text-sky-light" />,
      badge: 'FREELANCE',
    },
    {
      label: 'Education & Coursework',
      modal: 'EXPERIENCE',
      icon: <GraduationCap className="w-4 h-4 text-warm-ivory" />,
      badge: 'CMU & AWS',
    },
    {
      label: 'Contact & Transmissions',
      modal: 'CONTACT',
      icon: <Mail className="w-4 h-4 text-electric-blue" />,
      badge: 'OPEN FOR ROLES',
    },
    {
      label: 'Curriculum Vitae Dossier',
      modal: 'RESUME',
      icon: <FileText className="w-4 h-4 text-warm-ivory" />,
      badge: 'PRINT / PDF',
    },
    {
      label: 'Controls & Keybindings',
      modal: 'CONTROLS',
      icon: <Keyboard className="w-4 h-4 text-sky-light" />,
    },
    {
      label: 'System Settings & Audio',
      modal: 'SETTINGS',
      icon: <Settings className="w-4 h-4 text-warm-ivory-dim" />,
    },
  ]

  const handleWaypointWarp = (locId: string) => {
    const loc = locationsData.find((l) => l.id === locId)
    if (loc) {
      setLocation(loc.id)
      teleportTo([loc.coordinates[0], loc.coordinates[1] + 0.45, loc.coordinates[2] + 1.2])
      setMenuOpen(false)
    }
  }

  const handleReturnToSpawn = () => {
    setLocation('workspace')
    teleportTo([0, 0.45, 1.8])
    setMenuOpen(false)
  }

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
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
              <div className="flex items-center justify-between pb-5 border-b border-sky-blue/15 mb-5">
                <div>
                  <h3 className="font-display font-extrabold text-lg text-warm-ivory tracking-wide flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-electric-blue" />
                    <span>SYSTEM DIRECTORY</span>
                  </h3>
                  <p className="font-mono text-xs text-sky-light/70 tracking-widest mt-0.5">
                    RECRUITER ACCESS // INA.EXE
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="p-2 text-warm-ivory-dim hover:text-electric-blue hover:bg-white/5 rounded-sm transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Recruiter Quick Access Notice */}
              <div className="mb-4 p-2.5 bg-sky-blue/10 border border-sky-blue/20 rounded text-[11px] font-mono text-sky-light">
                Direct portfolio index for quick review without 3D world navigation.
              </div>

              {/* Navigation Items */}
              <div className="space-y-1.5 mb-6">
                {navItems.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      if (item.action) {
                        item.action()
                      } else if (item.modal) {
                        openModal(item.modal)
                      }
                      setMenuOpen(false)
                    }}
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

              {/* Island Waypoints Fast Travel & Return to Main Island */}
              <div className="pt-4 border-t border-sky-blue/15">
                <div className="flex items-center justify-between mb-2.5 font-mono text-[11px] text-sky-light/80 uppercase">
                  <span>Island Waypoints [1-5]</span>
                  <button
                    type="button"
                    onClick={handleReturnToSpawn}
                    className="text-electric-blue hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Home className="w-3 h-3" />
                    <span>Return to Spawn</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-1.5">
                  {locationsData.map((loc, idx) => {
                    const isActive = activeLocation.id === loc.id
                    return (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => handleWaypointWarp(loc.id)}
                        className={`flex items-center justify-between px-3 py-2 rounded text-xs font-mono transition-all text-left border cursor-pointer ${
                          isActive
                            ? 'bg-electric-blue/15 border-electric-blue text-electric-blue font-bold'
                            : 'bg-deep-navy/40 border-transparent text-warm-ivory-dim hover:text-warm-ivory hover:bg-deep-navy'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-electric-blue font-bold">[{idx + 1}]</span>
                          <span className="truncate">{loc.name}</span>
                        </div>
                        <span className="text-[10px] opacity-70 ml-2">
                          {loc.badge.split(' // ')[1]}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-sky-blue/15 font-mono text-[11px] text-warm-ivory-dim/60 flex items-center justify-between">
              <span>INA GRACE TAN &bull; BUKIDNON, PH</span>
              <span className="text-electric-blue font-bold">SYSTEM ACTIVE</span>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
