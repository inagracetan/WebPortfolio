import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { touchControlsStore } from '@/characters/touchControlsStore'
import { useCharacterStore } from '@/characters/useCharacterStore'
import { INTERACTIVE_OBJECTS } from '@/interactions/interactiveObjectsData'
import { objectInspectionStore } from '@/interactions/useObjectInspection'
import { useGameStore } from '@/hooks/useGameStore'
import { Hand, Zap, Sparkles } from 'lucide-react'

export const MobileControls: React.FC = () => {
  const { currentScreen, isUiModalOpen } = useGameStore()
  const { playerPosition } = useCharacterStore()

  const [joystickActive, setJoystickActive] = useState(false)
  const [knobPos, setKnobPos] = useState({ x: 0, y: 0 })
  const [isSprinting, setIsSprinting] = useState(false)

  const joystickBaseRef = useRef<HTMLDivElement>(null)
  const touchIdRef = useRef<number | null>(null)
  const baseCenterRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  // Check if near any target for the mobile interact button
  const hasNearbyTarget = useMemo(() => {
    const [px, , pz] = playerPosition
    return INTERACTIVE_OBJECTS.some(
      (t) => Math.hypot(px - t.position[0], pz - t.position[2]) <= t.radius + 0.5
    )
  }, [playerPosition])

  // Handle Joystick Touch Start
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchIdRef.current !== null) return
    const touch = e.changedTouches[0]
    touchIdRef.current = touch.identifier

    if (joystickBaseRef.current) {
      const rect = joystickBaseRef.current.getBoundingClientRect()
      baseCenterRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      }
    }

    setJoystickActive(true)
    handleTouchMove(e)
  }

  // Handle Joystick Touch Move
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchIdRef.current === null) return

    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i]
      if (touch.identifier === touchIdRef.current) {
        const dx = touch.clientX - baseCenterRef.current.x
        const dy = touch.clientY - baseCenterRef.current.y
        const dist = Math.hypot(dx, dy)
        const maxRadius = 45 // max joystick travel radius in px

        let clampedX = dx
        let clampedY = dy

        if (dist > maxRadius) {
          clampedX = (dx / dist) * maxRadius
          clampedY = (dy / dist) * maxRadius
        }

        setKnobPos({ x: clampedX, y: clampedY })

        // Normalized vector (-1 to 1)
        touchControlsStore.setJoystickVector(clampedX / maxRadius, clampedY / maxRadius)
        break
      }
    }
  }

  // Handle Joystick Touch End
  const handleTouchEnd = useCallback((e: React.TouchEvent<HTMLDivElement> | TouchEvent) => {
    if (touchIdRef.current === null) return

    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === touchIdRef.current) {
        touchIdRef.current = null
        setJoystickActive(false)
        setKnobPos({ x: 0, y: 0 })
        touchControlsStore.setJoystickVector(0, 0)
        break
      }
    }
  }, [])

  useEffect(() => {
    const onWindowTouchEnd = (e: TouchEvent) => handleTouchEnd(e)
    window.addEventListener('touchend', onWindowTouchEnd)
    window.addEventListener('touchcancel', onWindowTouchEnd)
    return () => {
      window.removeEventListener('touchend', onWindowTouchEnd)
      window.removeEventListener('touchcancel', onWindowTouchEnd)
    }
  }, [handleTouchEnd])

  const triggerHaptic = (ms: number = 15) => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(ms)
      } catch {
        // Ignored on unsupported platforms
      }
    }
  }

  const toggleSprint = () => {
    triggerHaptic(20)
    const next = !isSprinting
    setIsSprinting(next)
    touchControlsStore.setSprinting(next)
  }

  const handleMobileInteract = () => {
    triggerHaptic(25)
    touchControlsStore.triggerInteract()
    const [px, , pz] = playerPosition
    for (const obj of INTERACTIVE_OBJECTS) {
      if (Math.hypot(px - obj.position[0], pz - obj.position[2]) <= obj.radius + 0.5) {
        objectInspectionStore.openInspection(obj)
        break
      }
    }
  }

  if (isUiModalOpen || currentScreen === 'LOADING' || currentScreen === 'WELCOME') {
    return null
  }

  return (
    <div className="fixed inset-0 z-30 pointer-events-none md:hidden flex justify-between items-end p-5 pb-8 select-none">
      {/* 1. Left: Virtual Touch Joystick (Translucent, Lightweight & Unobtrusive) */}
      <div
        ref={joystickBaseRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`pointer-events-auto touch-none relative w-28 h-28 rounded-full border flex items-center justify-center transition-all ${
          joystickActive
            ? 'bg-electric-blue/15 border-electric-blue/60 backdrop-blur-xs shadow-[0_0_20px_rgba(0,240,255,0.25)]'
            : 'bg-white/[0.07] border-white/30 backdrop-blur-xs shadow-[inset_0_0_12px_rgba(255,255,255,0.05)]'
        }`}
      >
        {/* Subtle Center Origin Indicator */}
        <div className="w-2 h-2 rounded-full bg-white/40 ring-1 ring-white/20" />

        {/* Movable Joystick Knob (Semi-transparent with glowing core) */}
        <div
          className={`absolute w-12 h-12 rounded-full border flex items-center justify-center backdrop-blur-xs transition-shadow shadow-md ${
            joystickActive
              ? 'bg-electric-blue/25 border-electric-blue/80 shadow-[0_0_12px_rgba(0,240,255,0.4)]'
              : 'bg-white/20 border-white/40'
          }`}
          style={{
            transform: `translate(${knobPos.x}px, ${knobPos.y}px)`,
          }}
        >
          <div className="w-4 h-4 rounded-full bg-electric-blue/80 shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
        </div>
      </div>

      {/* 2. Right: Action Buttons (Interact & Sprint — Redundant Menu Button Removed) */}
      <div className="pointer-events-auto flex flex-col items-center gap-2.5">
        {/* Dedicated Interaction Button */}
        <button
          type="button"
          onClick={handleMobileInteract}
          className={`w-14 h-14 rounded-full border-2 flex flex-col items-center justify-center font-mono text-[10px] font-bold shadow-lg transition-transform active:scale-95 ${
            hasNearbyTarget
              ? 'bg-electric-blue text-deep-navy border-electric-blue animate-pulse shadow-[0_0_20px_rgba(0,240,255,0.7)]'
              : 'bg-deep-navy/80 text-warm-ivory-dim border-sky-blue/30'
          }`}
          aria-label="Interact"
        >
          {hasNearbyTarget ? <Sparkles className="w-5 h-5 mb-0.5" /> : <Hand className="w-5 h-5 mb-0.5" />}
          <span>[E]</span>
        </button>

        {/* Sprint Toggle Button */}
        <button
          type="button"
          onClick={toggleSprint}
          className={`w-11 h-11 rounded-full border flex items-center justify-center font-mono text-[10px] font-bold shadow-md transition-all active:scale-95 ${
            isSprinting
              ? 'bg-sky-light text-deep-navy border-sky-light shadow-[0_0_15px_rgba(56,189,248,0.6)]'
              : 'bg-deep-navy/70 text-warm-ivory border-sky-blue/30'
          }`}
          aria-label="Sprint Toggle"
        >
          <Zap className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
