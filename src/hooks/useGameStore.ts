import { useState, useEffect } from 'react'
import type { LocationWaypoint } from '@/locations/types'
import { locationsData } from '@/locations/locationsData'
import { soundEngine } from '@/utilities/audio'
import { characterStore } from '@/characters/useCharacterStore'

export type AppScreen = 'LOADING' | 'WELCOME' | 'EXPLORE' | 'WORLD'
export type ActiveModal =
  | 'ABOUT'
  | 'PROJECTS'
  | 'SKILLS'
  | 'EXPERIENCE'
  | 'CONTACT'
  | 'SETTINGS'
  | 'RESUME'
  | 'CONTROLS'
  | null

export type GraphicsQuality = 'low' | 'medium' | 'high'

interface GameState {
  currentScreen: AppScreen
  activeModal: ActiveModal
  selectedProjectId: string | null
  activeLocation: LocationWaypoint
  isSoundMuted: boolean
  isMenuOpen: boolean
  hasEnteredWorld: boolean
  graphicsQuality: GraphicsQuality
  isUiModalOpen: boolean
}

type Listener = (state: GameState) => void

function detectDefaultGraphics(): GraphicsQuality {
  if (typeof window === 'undefined') return 'medium'
  if (window.innerWidth < 768) return 'low'
  if (typeof navigator !== 'undefined' && navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
    return 'medium'
  }
  return 'high'
}

let state: GameState = {
  currentScreen: 'LOADING',
  activeModal: null,
  selectedProjectId: null,
  activeLocation: locationsData[0],
  isSoundMuted: false,
  isMenuOpen: false,
  hasEnteredWorld: false,
  graphicsQuality: detectDefaultGraphics(),
  isUiModalOpen: false,
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
      isUiModalOpen: true,
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
      isUiModalOpen: state.isMenuOpen,
    }
    notify()
  },
  setUiModalOpen: (open: boolean) => {
    state = { ...state, isUiModalOpen: open }
    notify()
  },
  setLocation: (locationId: string) => {
    if (state.activeLocation.id === locationId) return
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
    const nextMenu = !state.isMenuOpen
    state = { ...state, isMenuOpen: nextMenu, isUiModalOpen: nextMenu || state.activeModal !== null }
    notify()
  },
  setMenuOpen: (open: boolean) => {
    state = { ...state, isMenuOpen: open, isUiModalOpen: open || state.activeModal !== null }
    notify()
  },
  enterWorld: () => {
    soundEngine.playEnter()
    soundEngine.startAmbientBgm()
    characterStore.spawnOnMainIsland()
    state = { ...state, currentScreen: 'WORLD', hasEnteredWorld: true, isUiModalOpen: false }
    notify()
  },
  explorePortfolio: () => {
    soundEngine.playClick()
    state = { ...state, currentScreen: 'WORLD', activeModal: 'PROJECTS', isUiModalOpen: true }
    notify()
  },
  resetToWelcome: () => {
    soundEngine.playClick()
    state = { ...state, currentScreen: 'WELCOME', activeModal: null, isMenuOpen: false, isUiModalOpen: false }
    notify()
  },
  setGraphicsQuality: (quality: GraphicsQuality) => {
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
    setUiModalOpen: gameStore.setUiModalOpen,
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
