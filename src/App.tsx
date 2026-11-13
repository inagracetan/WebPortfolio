import React, { useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { WorldCanvas } from '@/world/WorldCanvas'
import { LoadingScreen } from '@/components/ui/LoadingScreen'
import { WelcomeScreen } from '@/components/ui/WelcomeScreen'
import { Navigation } from '@/components/ui/Navigation'
import { WorldHud } from '@/components/ui/WorldHud'
import { InteractionPrompt } from '@/components/ui/InteractionPrompt'
import { Minimap } from '@/components/ui/Minimap'
import { MobileControls } from '@/components/ui/MobileControls'
import { DirectPortfolioView } from '@/components/portfolio/DirectPortfolioView'
import {
  MenuDrawer,
  ProjectsModal,
  SkillsModal,
  ExperienceModal,
  ContactModal,
  SettingsModal,
  ResumeModal,
  AboutMeModal,
  PersonalProfileModal,
  CoursesModal,
  ProjectDetailModal,
  SkillDetailModal,
  ControlsGuideModal,
} from '@/components/modals'
import { useGameStore } from '@/hooks/useGameStore'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'
import { useProximityInteractions } from '@/interactions/useProximityInteractions'

export const App: React.FC = () => {
  const { currentScreen, setScreen } = useGameStore()

  // Stable reference — must not change between renders or the LoadingScreen
  // failsafe timer (which depends on onComplete) resets on every store notify,
  // preventing it from ever firing in production when WebGL is slow/unavailable.
  const handleLoadingComplete = useCallback(() => {
    setScreen('WELCOME')
  }, [setScreen])

  // Activate keyboard shortcuts (Escape, M, H, V, 1-5)
  useKeyboardShortcuts()

  // Activate proximity trigger listener
  useProximityInteractions()

  return (
    <main
      role="main"
      aria-label="INA.EXE - 3D Interactive Portfolio Environment"
      className="relative w-screen h-screen overflow-hidden bg-deep-navy text-warm-ivory select-none font-sans"
    >
      {/* 3D Interactive World Canvas Layer */}
      <WorldCanvas />

      {/* Decorative Indie Game Scanlines & Vignette */}
      <div className="absolute inset-0 pointer-events-none scanlines opacity-30 z-10" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-deep-navy/80 via-transparent to-deep-navy/50 z-10" />

      {/* Persistent Navigation Header HUD */}
      {currentScreen !== 'LOADING' && currentScreen !== 'DIRECT_PORTFOLIO' && <Navigation />}

      {/* Top-Right Archipelago Radar / Minimap */}
      {currentScreen !== 'LOADING' && currentScreen !== 'WELCOME' && currentScreen !== 'DIRECT_PORTFOLIO' && <Minimap />}

      {/* Screen Views */}
      <AnimatePresence mode="wait">
        {currentScreen === 'LOADING' && (
          <LoadingScreen
            key="loading"
            onComplete={handleLoadingComplete}
          />
        )}

        {currentScreen === 'WELCOME' && (
          <WelcomeScreen key="welcome" />
        )}

        {currentScreen === 'DIRECT_PORTFOLIO' && (
          <DirectPortfolioView key="direct-portfolio" />
        )}
      </AnimatePresence>

      {/* Proximity Interaction Prompt [E] */}
      {currentScreen !== 'LOADING' && currentScreen !== 'WELCOME' && currentScreen !== 'DIRECT_PORTFOLIO' && <InteractionPrompt />}

      {/* Bottom Waypoint & HUD Controls (visible in WORLD / EXPLORE modes) */}
      {currentScreen !== 'DIRECT_PORTFOLIO' && <WorldHud />}

      {/* Mobile Touch Virtual Joystick & Interact Action */}
      {currentScreen !== 'DIRECT_PORTFOLIO' && <MobileControls />}

      {/* Interactive Modals & Drawers */}
      <MenuDrawer />
      <ProjectsModal />
      <SkillsModal />
      <ExperienceModal />
      <ContactModal />
      <SettingsModal />
      <ResumeModal />

      {/* Phase 4: Object-Specific In-Depth Inspection Modals */}
      <AboutMeModal />
      <PersonalProfileModal />
      <CoursesModal />
      <ProjectDetailModal />
      <SkillDetailModal />

      {/* Phase 6: Controls & Navigation Guide */}
      <ControlsGuideModal />
    </main>
  )
}

export default App
