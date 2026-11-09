import { useState, useEffect } from 'react'
import type { LocationWaypoint } from '@/locations/types'
import { MAIN_ISLAND_SPAWN_POSITION, MAIN_ISLAND_SPAWN_ROTATION } from './spawnConfig'

export type CameraViewMode = 'FOLLOW' | 'FREE'

interface CharacterStoreState {
  playerPosition: [number, number, number]
  playerRotation: number
  isMoving: boolean
  isSprinting: boolean
  targetDestination: [number, number, number] | null
  nearbyLocation: LocationWaypoint | null
  cameraMode: CameraViewMode
}

type Listener = (state: CharacterStoreState) => void
type TeleportListener = (pos: [number, number, number], rot: number) => void

let state: CharacterStoreState = {
  playerPosition: [...MAIN_ISLAND_SPAWN_POSITION],
  playerRotation: MAIN_ISLAND_SPAWN_ROTATION,
  isMoving: false,
  isSprinting: false,
  targetDestination: null,
  nearbyLocation: null,
  cameraMode: 'FOLLOW',
}

const listeners = new Set<Listener>()
const teleportListeners = new Set<TeleportListener>()

let lastNotifyTime = 0
const THROTTLE_MS = 60 // ~16 updates per second for React UI instead of 60 FPS to prevent main thread lag

function notify(immediate = false) {
  const now = performance.now()
  if (immediate || now - lastNotifyTime >= THROTTLE_MS) {
    lastNotifyTime = now
    listeners.forEach((listener) => listener({ ...state }))
  }
}

export const characterStore = {
  getState: () => state,

  // Position updates called by physics controller
  setPlayerPosition: (pos: [number, number, number], rot: number, moving: boolean, sprinting: boolean) => {
    const motionChanged = state.isMoving !== moving || state.isSprinting !== sprinting
    state.playerPosition = pos
    state.playerRotation = rot
    state.isMoving = moving
    state.isSprinting = sprinting

    // Notify immediately when starting/stopping movement; throttle while continuously walking
    notify(motionChanged)
  },

  // Centralized Spawn: ALWAYS places character at safe ground on the main island
  spawnOnMainIsland: () => {
    const pos = [...MAIN_ISLAND_SPAWN_POSITION] as [number, number, number]
    const rot = MAIN_ISLAND_SPAWN_ROTATION
    state = {
      ...state,
      playerPosition: pos,
      playerRotation: rot,
      isMoving: false,
      isSprinting: false,
      targetDestination: null,
    }
    teleportListeners.forEach((fn) => fn(pos, rot))
    notify(true)
  },

  // Explicit fast-travel / teleport to specific coordinates
  teleportTo: (coords: [number, number, number], rot = 0) => {
    const targetPos: [number, number, number] = [coords[0], coords[1], coords[2]]
    state = {
      ...state,
      playerPosition: targetPos,
      playerRotation: rot,
      targetDestination: null,
      isMoving: false,
      isSprinting: false,
    }
    teleportListeners.forEach((fn) => fn(targetPos, rot))
    notify(true)
  },

  // Subscribe to teleport / spawn events (used by controller ref sync)
  onTeleport: (listener: TeleportListener) => {
    teleportListeners.add(listener)
    return () => {
      teleportListeners.delete(listener)
    }
  },

  setTargetDestination: (dest: [number, number, number] | null) => {
    state = { ...state, targetDestination: dest }
    notify(true)
  },

  setNearbyLocation: (loc: LocationWaypoint | null) => {
    if (state.nearbyLocation?.id !== loc?.id) {
      state = { ...state, nearbyLocation: loc }
      notify(true)
    }
  },

  setCameraMode: (mode: CameraViewMode) => {
    state = { ...state, cameraMode: mode }
    notify(true)
  },

  toggleCameraMode: () => {
    const nextMode = state.cameraMode === 'FOLLOW' ? 'FREE' : 'FOLLOW'
    state = { ...state, cameraMode: nextMode }
    notify(true)
    return nextMode
  },
}

export function useCharacterStore() {
  const [storeState, setStoreState] = useState<CharacterStoreState>(state)

  useEffect(() => {
    const listener: Listener = (newState) => {
      setStoreState(newState)
    }
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  }, [])

  return {
    ...storeState,
    setTargetDestination: characterStore.setTargetDestination,
    setCameraMode: characterStore.setCameraMode,
    toggleCameraMode: characterStore.toggleCameraMode,
    teleportTo: characterStore.teleportTo,
    spawnOnMainIsland: characterStore.spawnOnMainIsland,
  }
}
