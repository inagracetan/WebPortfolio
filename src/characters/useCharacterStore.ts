import { useState, useEffect } from 'react'
import type { LocationWaypoint } from '@/locations/types'

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

let state: CharacterStoreState = {
  playerPosition: [0, 0.45, 1.8], // Starts near the workspace entrance
  playerRotation: 0,
  isMoving: false,
  isSprinting: false,
  targetDestination: null,
  nearbyLocation: null,
  cameraMode: 'FOLLOW',
}

const listeners = new Set<Listener>()

function notify() {
  listeners.forEach((listener) => listener({ ...state }))
}

export const characterStore = {
  getState: () => state,
  setPlayerPosition: (pos: [number, number, number], rot: number, moving: boolean, sprinting: boolean) => {
    state = {
      ...state,
      playerPosition: pos,
      playerRotation: rot,
      isMoving: moving,
      isSprinting: sprinting,
    }
    notify()
  },
  setTargetDestination: (dest: [number, number, number] | null) => {
    state = { ...state, targetDestination: dest }
    notify()
  },
  setNearbyLocation: (loc: LocationWaypoint | null) => {
    if (state.nearbyLocation?.id !== loc?.id) {
      state = { ...state, nearbyLocation: loc }
      notify()
    }
  },
  setCameraMode: (mode: CameraViewMode) => {
    state = { ...state, cameraMode: mode }
    notify()
  },
  toggleCameraMode: () => {
    const nextMode = state.cameraMode === 'FOLLOW' ? 'FREE' : 'FOLLOW'
    state = { ...state, cameraMode: nextMode }
    notify()
    return nextMode
  },
  teleportTo: (coords: [number, number, number]) => {
    state = {
      ...state,
      playerPosition: [coords[0], coords[1] + 0.45, coords[2]],
      targetDestination: null,
      isMoving: false,
    }
    notify()
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
  }
}

