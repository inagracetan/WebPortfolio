import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { characterStore } from '@/characters/useCharacterStore'
import { useGameStore, type ActiveModal } from '@/hooks/useGameStore'
import { useSound } from '@/hooks/useSound'
import type { LocationWaypoint } from '@/locations/types'

interface LocationMarkerProps {
  location: LocationWaypoint
  position: [number, number, number]
}

export const LocationMarker: React.FC<LocationMarkerProps> = ({ location, position }) => {
  const crystalRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isNearby, setIsNearby] = useState(false)

  const { activeLocation, setLocation, openModal, isUiModalOpen } = useGameStore()
  const { playHover, playClick } = useSound()

  // STRICT REQUIREMENT 1: Only display location label when character is at THIS specific location
  const isCurrentLocation = activeLocation.id === location.id

  useFrame((state) => {
    if (isUiModalOpen) return
    const t = state.clock.getElapsedTime()
    if (crystalRef.current) {
      crystalRef.current.rotation.y = t * 1.5
      crystalRef.current.position.y = position[1] + Math.sin(t * 2 + position[0]) * 0.15
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.8
      ringRef.current.rotation.x = Math.sin(t) * 0.2
    }

    // Proximity check for location marker
    const [px, , pz] = characterStore.getState().playerPosition
    const d = Math.hypot(px - position[0], pz - position[2])
    const nearby = d <= 8.0
    if (nearby !== isNearby) {
      setIsNearby(nearby)
    }
  })

  // STRICT REQUIREMENT 4: Hide completely when modal or popup is open
  if (isUiModalOpen) {
    return null
  }

  const handleClick = (e: React.MouseEvent | any) => {
    if (e && e.stopPropagation) e.stopPropagation()
    playClick()
    setLocation(location.id)

    // Open corresponding modal when clicking the marker
    let targetModal: ActiveModal = 'PROJECTS'
    if (location.category === 'WORKSPACE' || location.id === 'workspace') targetModal = 'ABOUT'
    else if (location.category === 'PROJECTS' || location.id === 'projects') targetModal = 'PROJECTS'
    else if (location.category === 'TECH' || location.id === 'tech') targetModal = 'TECH'
    else if (location.category === 'UNIVERSITY' || location.id === 'university') targetModal = 'EXPERIENCE'
    else if (location.category === 'CONTACT' || location.id === 'contact') targetModal = 'CONTACT'

    openModal(targetModal)
  }

  const handlePointerEnter = (e?: any) => {
    if (e && e.stopPropagation) e.stopPropagation()
    setIsHovered(true)
    if (typeof document !== 'undefined') {
      document.body.style.cursor = 'pointer'
    }
    playHover()
  }

  const handlePointerLeave = (e?: any) => {
    if (e && e.stopPropagation) e.stopPropagation()
    setIsHovered(false)
    if (typeof document !== 'undefined') {
      document.body.style.cursor = 'default'
    }
  }

  // Show floating label ONLY for current location when nearby or hovered
  const showLabel = isCurrentLocation && (isNearby || isHovered)

  return (
    <group position={[position[0], 0, position[2]]}>
      {/* 3D Floating Crystal Pin (Subtle landmark in 3D viewport) */}
      <mesh
        ref={crystalRef}
        position={[0, position[1], 0]}
        scale={isCurrentLocation || isHovered ? 1.25 : 0.9}
        onClick={handleClick}
        onPointerDown={handleClick}
        onPointerOver={handlePointerEnter}
        onPointerOut={handlePointerLeave}
      >
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color={location.color}
          emissive={location.color}
          emissiveIntensity={isCurrentLocation || isHovered ? 0.9 : 0.3}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Orbiting Wire Ring */}
      <mesh
        ref={ringRef}
        position={[0, position[1], 0]}
        rotation={[Math.PI / 2, 0, 0]}
        onClick={handleClick}
        onPointerDown={handleClick}
        onPointerOver={handlePointerEnter}
        onPointerOut={handlePointerLeave}
      >
        <torusGeometry args={[0.55, 0.03, 8, 24]} />
        <meshStandardMaterial
          color={location.color}
          emissive={location.color}
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Ground Projection Ring */}
      <mesh
        position={[0, 0.12, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={handleClick}
        onPointerDown={handleClick}
        onPointerOver={handlePointerEnter}
        onPointerOut={handlePointerLeave}
      >
        <ringGeometry args={[0.7, 0.85, 16]} />
        <meshBasicMaterial
          color={location.color}
          transparent
          opacity={isCurrentLocation ? 0.8 : 0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Simplified, Minimalist Location Label (Layering priority z-25; strictly below z-40 navigation & z-50 modals) */}
      {showLabel && (
        <Html
          position={[0, position[1] + 0.75, 0]}
          center
          distanceFactor={20}
          zIndexRange={[25, 10]}
        >
          <button
            type="button"
            onClick={handleClick}
            onPointerDown={(e) => {
              if (e && e.stopPropagation) e.stopPropagation()
              handleClick(e)
            }}
            onTouchEnd={(e) => {
              if (e && e.stopPropagation) e.stopPropagation()
              handleClick(e)
            }}
            onMouseEnter={handlePointerEnter}
            onMouseLeave={handlePointerLeave}
            aria-label={`View ${location.name} details`}
            className="pointer-events-auto flex items-center gap-2 px-3 py-1 rounded-full border border-electric-blue/40 font-mono text-[11px] tracking-wider uppercase transition-all backdrop-blur-md cursor-pointer select-none shadow-lg whitespace-nowrap bg-deep-navy-card/90 text-warm-ivory hover:text-electric-blue hover:scale-105 active:scale-95"
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0 shadow-[0_0_6px_rgba(0,240,255,0.8)]"
              style={{ backgroundColor: location.color }}
            />
            <span className="font-semibold">{location.name}</span>
          </button>
        </Html>
      )}
    </group>
  )
}

