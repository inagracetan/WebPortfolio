import { useState, useEffect } from 'react'
import type { LocationWaypoint } from '@/locations/types'
import { locationsData } from '@/locations/locationsData'
import { soundEngine } from '@/utilities/audio'

export type AppScreen = 'LOADING' | 'WELCOME' | 'EXPLORE' | 'WORLD'
export type ActiveModal =
  | 'PROJECTS'
  | 'SKILLS'
  | 'EXPERIENCE'
  | 'CONTACT'
  | 'SETTINGS'
  | 'RESUME'
  | 'CONTROLS'
  | null

interface GameState {
  currentScreen: AppScreen
  activeModal: ActiveModal
  selectedProjectId: string | null
  activeLocation: LocationWaypoint
  isSoundMuted: boolean
  isMenuOpen: boolean
  hasEnteredWorld: boolean
  graphicsQuality: 'high' | 'eco'
}

type Listener = (state: GameState) => void

let state: GameState = {
  currentScreen: 'LOADING',
  activeModal: null,
  selectedProjectId: null,
  activeLocation: locationsData[0],
  isSoundMuted: false,
  isMenuOpen: false,
  hasEnteredWorld: false,
  graphicsQuality: typeof window !== 'undefined' && window.innerWidth < 768 ? 'eco' : 'high',
}

const listeners = new Set<Listener>()

function notify() {
  listeners.forEach((listener) => listener({ ...state }))
}

export const gameStore = {
  getState: () => state,
  setScreen: (screen: AppScreen) => {
    state = { ...state, currentScreen: screen }
    if (screen === 'WORLD') {
      state.hasEnteredWorld = true
    }
    notify()
  },
  openModal: (modal: ActiveModal, projectId?: string) => {
    soundEngine.playModalOpen()
    state = {
      ...state,
      activeModal: modal,
      selectedProjectId: projectId ?? null,
      isMenuOpen: false,
    }
    notify()
  },
  closeModal: () => {
    if (state.activeModal) {
      soundEngine.playModalClose()
    }
    state = {
      ...state,
      activeModal: null,
      selectedProjectId: null,
    }
    notify()
  },
  setLocation: (locationId: string) => {
    const loc = locationsData.find((l) => l.id === locationId)
    if (loc) {
      soundEngine.playLocationTransition()
      state = { ...state, activeLocation: loc }
      notify()
    }
  },
  toggleMute: () => {
    const newMuted = soundEngine.toggleMute()
    state = { ...state, isSoundMuted: newMuted }
    notify()
    return newMuted
  },
  toggleMenu: () => {
    soundEngine.playClick()
    state = { ...state, isMenuOpen: !state.isMenuOpen }
    notify()
  },
  setMenuOpen: (open: boolean) => {
    state = { ...state, isMenuOpen: open }
    notify()
  },
  enterWorld: () => {
    soundEngine.playEnter()
    soundEngine.startAmbientBgm()
    state = { ...state, currentScreen: 'WORLD', hasEnteredWorld: true }
    notify()
  },
  explorePortfolio: () => {
    soundEngine.playClick()
    state = { ...state, currentScreen: 'EXPLORE', activeModal: 'PROJECTS' }
    notify()
  },
  resetToWelcome: () => {
    soundEngine.playClick()
    state = { ...state, currentScreen: 'WELCOME', activeModal: null, isMenuOpen: false }
    notify()
  },
  setGraphicsQuality: (quality: 'high' | 'eco') => {
    soundEngine.playClick()
    state = { ...state, graphicsQuality: quality }
    notify()
  },
}

export function useGameStore() {
  const [currentState, setCurrentState] = useState<GameState>(state)

  useEffect(() => {
    const listener: Listener = (newState) => {
      setCurrentState(newState)
    }
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  }, [])

  return {
    ...currentState,
    setScreen: gameStore.setScreen,
    openModal: gameStore.openModal,
    closeModal: gameStore.closeModal,
    setLocation: gameStore.setLocation,
    toggleMute: gameStore.toggleMute,
    toggleMenu: gameStore.toggleMenu,
    setMenuOpen: gameStore.setMenuOpen,
    enterWorld: gameStore.enterWorld,
    explorePortfolio: gameStore.explorePortfolio,
    resetToWelcome: gameStore.resetToWelcome,
    setGraphicsQuality: gameStore.setGraphicsQuality,
  }
}

