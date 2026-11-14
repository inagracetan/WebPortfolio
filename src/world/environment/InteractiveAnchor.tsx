import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import type { InteractiveObjectItem } from '@/interactions/types'
import { characterStore } from '@/characters/useCharacterStore'
import { useGameStore } from '@/hooks/useGameStore'
import { objectInspectionStore, useObjectInspection } from '@/interactions/useObjectInspection'
import { useSound } from '@/hooks/useSound'

interface InteractiveAnchorProps {
  item: InteractiveObjectItem
}

export const InteractiveAnchor: React.FC<InteractiveAnchorProps> = ({ item }) => {
  const markerRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isNearby, setIsNearby] = useState(false)

  const { isUiModalOpen, activeLocation } = useGameStore()
  const { nearestInteractiveId } = useObjectInspection()
  const { playHover, playClick } = useSound()

  useFrame((state) => {
    if (item.locationId !== activeLocation.id || isUiModalOpen) return

    const t = state.clock.getElapsedTime()

    if (markerRef.current) {
      markerRef.current.rotation.y = t * 1.8
      markerRef.current.position.y = item.position[1] + 0.35 + Math.sin(t * 3 + item.position[0]) * 0.08
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 1.2
    }

    // Proximity evaluation inside useFrame
    const [px, , pz] = characterStore.getState().playerPosition
    const nearby = Math.hypot(px - item.position[0], pz - item.position[2]) <= item.radius
    if (nearby !== isNearby) {
      setIsNearby(nearby)
    }
  })

  // STRICT REQUIREMENT 1: Only display anchors and labels for the CURRENT location
  // STRICT REQUIREMENT 4: Hide completely when any modal or popup is open
  if (item.locationId !== activeLocation.id || isUiModalOpen) {
    return null
  }

  const handleTrigger = (e?: React.SyntheticEvent | any) => {
    if (e && e.stopPropagation) e.stopPropagation()
    playClick()

    const [px, , pz] = characterStore.getState().playerPosition
    const currentDist = Math.hypot(px - item.position[0], pz - item.position[2])

    // If slightly out of radius, step close to object
    if (currentDist > item.radius) {
      characterStore.teleportTo([item.position[0], item.position[1] + 0.2, item.position[2] + 0.8])
    }

    objectInspectionStore.openInspection(item)
  }

  // STRICT REQUIREMENT 2: Prioritize single nearest interactive object; never stack multiple labels
  const isNearest = nearestInteractiveId === item.id
  const showPrompt = (isNearest && isNearby) || isHovered

  return (
    <group position={[item.position[0], 0, item.position[2]]}>
      {/* 3D Floating Diamond Indicator */}
      <mesh
        ref={markerRef}
        position={[0, item.position[1] + 0.35, 0]}
        scale={showPrompt ? 1.2 : 0.8}
        onClick={handleTrigger}
        onPointerDown={handleTrigger}
        onPointerOver={() => {
          setIsHovered(true)
          if (typeof document !== 'undefined') document.body.style.cursor = 'pointer'
          playHover()
        }}
        onPointerOut={() => {
          setIsHovered(false)
          if (typeof document !== 'undefined') document.body.style.cursor = 'default'
        }}
      >
        <octahedronGeometry args={[0.12, 0]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={showPrompt ? 1.0 : 0.4}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Orbiting Ring (visible when nearby or hovered) */}
      {showPrompt && (
        <mesh
          ref={ringRef}
          position={[0, item.position[1] + 0.35, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          onClick={handleTrigger}
          onPointerDown={handleTrigger}
        >
          <torusGeometry args={[0.22, 0.015, 6, 16]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      )}

      {/* Simplified, Minimalist Floating Prompt (Layering priority z-25; strictly below z-40 navigation & z-50 modals) */}
      {showPrompt && (
        <Html
          position={[0, item.position[1] + 0.65, 0]}
          center
          distanceFactor={18}
          zIndexRange={[25, 10]}
        >
          <button
            type="button"
            onClick={handleTrigger}
            onPointerDown={(e) => {
              e.stopPropagation()
              handleTrigger(e)
            }}
            onTouchEnd={(e) => {
              e.stopPropagation()
              handleTrigger(e)
            }}
            onMouseEnter={() => {
              setIsHovered(true)
              playHover()
            }}
            onMouseLeave={() => setIsHovered(false)}
            aria-label={item.name}
            className="pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-deep-navy-card/90 hover:bg-deep-navy border border-electric-blue/40 text-warm-ivory shadow-[0_0_12px_rgba(0,240,255,0.25)] backdrop-blur-md text-[11px] font-mono whitespace-nowrap transition-all hover:scale-105 active:scale-95 cursor-pointer select-none"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-electric-blue shadow-[0_0_6px_rgba(0,240,255,0.8)]" />
            <span className="font-bold text-electric-blue">[E]</span>
            <span className="font-semibold text-warm-ivory">{item.name}</span>
          </button>
        </Html>
      )}
    </group>
  )
}
