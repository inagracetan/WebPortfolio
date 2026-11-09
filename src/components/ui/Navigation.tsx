import React from 'react'
import { Volume2, VolumeX, Settings, FileText, Menu, Compass, Keyboard } from 'lucide-react'
import { useGameStore } from '@/hooks/useGameStore'
import { Tooltip } from './Tooltip'
import { APP_CONFIG } from '@/utilities/constants'

export const Navigation: React.FC = () => {
  const {
    isSoundMuted,
    toggleMute,
    openModal,
    toggleMenu,
    currentScreen,
    activeLocation,
  } = useGameStore()

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand Logo & Status */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            type="button"
            onClick={() => openModal('RESUME')}
            className="group flex items-center gap-2.5 px-3 py-1.5 bg-deep-navy/85 hover:bg-deep-navy border border-sky-blue/30 hover:border-electric-blue rounded-sm backdrop-blur-md transition-all shadow-md cursor-pointer"
            aria-label="INA.EXE Profile Overview"
            title="Open Candidate Overview"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-electric-blue shadow-[0_0_8px_rgba(0,240,255,0.8)] group-hover:scale-110 transition-transform" />
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-extrabold text-sm tracking-wider text-warm-ivory group-hover:text-white">
                {APP_CONFIG.name}
              </span>
              <span className="font-mono text-[10px] text-sky-light/70 hidden sm:inline">
                v1.0
              </span>
            </div>
          </button>

          {/* Location indicator when in world or explore */}
          {currentScreen !== 'WELCOME' && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-deep-navy/70 border border-sky-blue/20 rounded-sm font-mono text-xs text-sky-light/90 backdrop-blur-md">
              <Compass className="w-3.5 h-3.5 text-electric-blue animate-spin" style={{ animationDuration: '16s' }} />
              <span className="text-warm-ivory font-semibold">{activeLocation.name}</span>
              <span className="text-sky-light/50 text-[10px]">{activeLocation.badge}</span>
            </div>
          )}
        </div>

        {/* Right: Quick Controls & Navigation */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 pointer-events-auto">
          {/* Controls Guide Shortcut */}
          <Tooltip content="Controls & Input Guide">
            <button
              type="button"
              onClick={() => openModal('CONTROLS')}
              className="p-2 sm:px-3 sm:py-2 min-w-[38px] min-h-[38px] sm:min-w-0 sm:min-h-0 bg-deep-navy/80 hover:bg-deep-navy border border-sky-blue/30 hover:border-electric-blue text-warm-ivory hover:text-electric-blue rounded-sm font-mono text-xs flex items-center justify-center gap-2 transition-all backdrop-blur-md cursor-pointer"
              aria-label="Controls Guide"
            >
              <Keyboard className="w-4 h-4 text-sky-light" />
              <span className="hidden lg:inline tracking-wider">CONTROLS</span>
            </button>
          </Tooltip>

          {/* Sound Toggle */}
          <Tooltip content={isSoundMuted ? 'Unmute Audio' : 'Mute Audio'} shortcut="M">
            <button
              type="button"
              onClick={toggleMute}
              className={`p-2 sm:px-3 sm:py-2 min-w-[38px] min-h-[38px] sm:min-w-0 sm:min-h-0 rounded-sm border font-mono text-xs flex items-center justify-center gap-2 transition-all backdrop-blur-md cursor-pointer ${
                isSoundMuted
                  ? 'bg-deep-navy/80 border-warm-ivory/20 text-warm-ivory-dim hover:text-warm-ivory'
                  : 'bg-deep-navy/80 border-sky-blue/30 text-electric-blue hover:border-electric-blue shadow-[0_0_12px_rgba(0,240,255,0.2)]'
              }`}
              aria-label={isSoundMuted ? 'Unmute Sound' : 'Mute Sound'}
            >
              {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden sm:inline tracking-wider">
                {isSoundMuted ? 'MUTED' : 'AUDIO'}
              </span>
            </button>
          </Tooltip>

          {/* Settings & Volume */}
          <Tooltip content="Settings & Audio Sliders" shortcut="H">
            <button
              type="button"
              onClick={() => openModal('SETTINGS')}
              className="p-2 sm:px-3 sm:py-2 min-w-[38px] min-h-[38px] sm:min-w-0 sm:min-h-0 bg-deep-navy/80 hover:bg-deep-navy border border-sky-blue/30 hover:border-electric-blue text-warm-ivory hover:text-electric-blue rounded-sm font-mono text-xs flex items-center justify-center gap-2 transition-all backdrop-blur-md cursor-pointer"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline tracking-wider">SETTINGS</span>
            </button>
          </Tooltip>

          {/* Resume Shortcut */}
          <Tooltip content="Recruiter Dossier / Resume">
            <button
              type="button"
              onClick={() => openModal('RESUME')}
              className="p-2 sm:px-3 sm:py-2 min-w-[38px] min-h-[38px] sm:min-w-0 sm:min-h-0 bg-deep-navy/80 hover:bg-deep-navy border border-sky-blue/30 hover:border-electric-blue text-warm-ivory hover:text-electric-blue rounded-sm font-mono text-xs flex items-center justify-center gap-2 transition-all backdrop-blur-md cursor-pointer"
              aria-label="Resume"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline tracking-wider">RESUME</span>
            </button>
          </Tooltip>

          {/* Recruiter Main Menu Drawer Toggle */}
          <button
            type="button"
            onClick={toggleMenu}
            className="p-2 sm:px-3.5 sm:py-2 min-w-[38px] min-h-[38px] sm:min-w-0 sm:min-h-0 bg-electric-blue/15 hover:bg-electric-blue text-electric-blue hover:text-deep-navy border border-electric-blue/40 rounded-sm font-mono text-xs flex items-center justify-center gap-2 transition-all backdrop-blur-md cursor-pointer font-bold shadow-[0_0_12px_rgba(0,240,255,0.25)]"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-4 h-4" />
            <span className="hidden sm:inline tracking-widest">MENU</span>
          </button>
        </div>
      </div>
    </header>
  )
}
