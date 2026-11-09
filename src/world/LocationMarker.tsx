import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
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

  const { activeLocation, setLocation, openModal, isUiModalOpen } = useGameStore()
  const { playHover, playClick } = useSound()

  const isSelected = activeLocation.id === location.id

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
  })

  if (isUiModalOpen) {
    return null
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    playClick()
    setLocation(location.id)

    // Open corresponding modal when clicking the marker
    let targetModal: ActiveModal = 'PROJECTS'
    if (location.category === 'WORKSPACE') targetModal = 'RESUME'
    else if (location.category === 'PROJECTS') targetModal = 'PROJECTS'
    else if (location.category === 'TECH') targetModal = 'SKILLS'
    else if (location.category === 'UNIVERSITY') targetModal = 'EXPERIENCE'
    else if (location.category === 'CONTACT') targetModal = 'CONTACT'

    openModal(targetModal)
  }

  const handlePointerEnter = () => {
    setIsHovered(true)
    playHover()
  }

  const handlePointerLeave = () => {
    setIsHovered(false)
  }

  return (
    <group position={[position[0], 0, position[2]]}>
      {/* 3D Floating Crystal Pin */}
      <mesh
        ref={crystalRef}
        position={[0, position[1], 0]}
        scale={isSelected || isHovered ? 1.3 : 1.0}
      >
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color={location.color}
          emissive={location.color}
          emissiveIntensity={isSelected || isHovered ? 0.9 : 0.4}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Orbiting Wire Ring */}
      <mesh
        ref={ringRef}
        position={[0, position[1], 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <torusGeometry args={[0.55, 0.03, 8, 24]} />
        <meshStandardMaterial
          color={location.color}
          emissive={location.color}
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Ground Projection Ring */}
      <mesh position={[0, 0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.7, 0.85, 16]} />
        <meshBasicMaterial
          color={location.color}
          transparent
          opacity={isSelected ? 0.8 : 0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Interactive 2.5D HUD Label Overlay */}
      <Html
        position={[0, position[1] + 0.85, 0]}
        center
        distanceFactor={20}
        zIndexRange={[100, 0]}
      >
        <button
          type="button"
          onClick={handleClick}
          onMouseEnter={handlePointerEnter}
          onMouseLeave={handlePointerLeave}
          aria-label={`View ${location.name} details`}
          className={`flex items-center gap-2 px-3 py-1 rounded-sm border font-mono text-xs tracking-wider uppercase transition-all backdrop-blur-md cursor-pointer select-none shadow-lg whitespace-nowrap ${
            isSelected
              ? 'bg-electric-blue text-deep-navy font-bold border-electric-blue shadow-[0_0_15px_rgba(0,240,255,0.6)] scale-105'
              : isHovered
              ? 'bg-deep-navy-card/95 text-electric-blue border-electric-blue/70 scale-105'
              : 'bg-deep-navy-card/85 text-warm-ivory border-sky-blue/30 hover:border-electric-blue'
          }`}
        >
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: location.color }}
          />
          <span className="font-semibold">{location.name}</span>
          <span className="text-[10px] opacity-70 hidden sm:inline">
            // {location.badge.split(' // ')[1]}
          </span>
        </button>
      </Html>
    </group>
  )
}

