import { useCallback } from 'react'
import { soundEngine } from '@/utilities/audio'

export function useSound() {
  const playHover = useCallback(() => {
    soundEngine.playHover()
  }, [])

  const playClick = useCallback(() => {
    soundEngine.playClick()
  }, [])

  const playEnter = useCallback(() => {
    soundEngine.playEnter()
  }, [])

  const playModalOpen = useCallback(() => {
    soundEngine.playModalOpen()
  }, [])

  const playModalClose = useCallback(() => {
    soundEngine.playModalClose()
  }, [])

  const playFootstep = useCallback((isSprinting: boolean = false) => {
    soundEngine.playFootstep(isSprinting)
  }, [])

  const playInspect = useCallback(() => {
    soundEngine.playInspect()
  }, [])

  const playLocationTransition = useCallback(() => {
    soundEngine.playLocationTransition()
  }, [])

  const startAmbientBgm = useCallback(() => {
    soundEngine.startAmbientBgm()
  }, [])

  const stopAmbientBgm = useCallback(() => {
    soundEngine.stopAmbientBgm()
  }, [])

  const toggleMute = useCallback(() => {
    return soundEngine.toggleMute()
  }, [])

  const isMuted = useCallback(() => {
    return soundEngine.isMuted()
  }, [])

  const setMasterVolume = useCallback((vol: number) => {
    soundEngine.setMasterVolume(vol)
  }, [])

  const setBgmVolume = useCallback((vol: number) => {
    soundEngine.setBgmVolume(vol)
  }, [])

  const setSfxVolume = useCallback((vol: number) => {
    soundEngine.setSfxVolume(vol)
  }, [])

  return {
    playHover,
    playClick,
    playEnter,
    playModalOpen,
    playModalClose,
    playFootstep,
    playInspect,
    playLocationTransition,
    startAmbientBgm,
    stopAmbientBgm,
    toggleMute,
    isMuted,
    setMasterVolume,
    setBgmVolume,
    setSfxVolume,
  }
}
