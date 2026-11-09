import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import type { InteractiveObjectItem } from '@/interactions/types'
import { useCharacterStore } from '@/characters/useCharacterStore'
import { objectInspectionStore } from '@/interactions/useObjectInspection'
import { useSound } from '@/hooks/useSound'

interface InteractiveAnchorProps {
  item: InteractiveObjectItem
}

export const InteractiveAnchor: React.FC<InteractiveAnchorProps> = ({ item }) => {
  const markerRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const [isHovered, setIsHovered] = useState(false)

  const { playerPosition, teleportTo } = useCharacterStore()
  const { playHover, playClick } = useSound()

  // Calculate distance between player avatar and this interactive object
  const dist = Math.hypot(
    playerPosition[0] - item.position[0],
    playerPosition[2] - item.position[2]
  )
  const isNearby = dist <= item.radius

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (markerRef.current) {
      markerRef.current.rotation.y = t * 1.8
      markerRef.current.position.y = item.position[1] + 0.35 + Math.sin(t * 3 + item.position[0]) * 0.08
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 1.2
    }
  })

  const handleTrigger = (e: React.MouseEvent) => {
    e.stopPropagation()
    playClick()

    // If far away, walk/warp to object first
    if (dist > item.radius) {
      teleportTo([item.position[0], item.position[1] - 0.2, item.position[2] + 0.8])
    }

    objectInspectionStore.openInspection(item)
  }

  return (
    <group position={[item.position[0], 0, item.position[2]]}>
      {/* 3D Floating Diamond Indicator */}
      <mesh
        ref={markerRef}
        position={[0, item.position[1] + 0.35, 0]}
        scale={isNearby || isHovered ? 1.2 : 0.8}
      >
        <octahedronGeometry args={[0.12, 0]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={isNearby || isHovered ? 1.0 : 0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Orbiting Ring (visible when nearby) */}
      {isNearby && (
        <mesh
          ref={ringRef}
          position={[0, item.position[1] + 0.35, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[0.22, 0.015, 6, 16]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      )}

      {/* Floating 2.5D Interactive Prompt (Visible when nearby or hovered) */}
      {(isNearby || isHovered) && (
        <Html
          position={[0, item.position[1] + 0.75, 0]}
          center
          distanceFactor={16}
          zIndexRange={[100, 0]}
        >
          <button
            type="button"
            onClick={handleTrigger}
            onMouseEnter={() => {
              setIsHovered(true)
              playHover()
            }}
            onMouseLeave={() => setIsHovered(false)}
            className="pointer-events-auto flex items-center gap-2 px-2.5 py-1 rounded bg-deep-navy-card/95 hover:bg-deep-navy border border-electric-blue text-warm-ivory shadow-[0_0_15px_rgba(0,240,255,0.4)] backdrop-blur-md text-[10px] font-mono tracking-wider whitespace-nowrap transition-transform hover:scale-105 cursor-pointer select-none"
          >
            <span className="px-1 py-0.2 bg-electric-blue text-deep-navy font-bold rounded">
              [E]
            </span>
            <span className="font-semibold text-electric-blue">{item.prompt}</span>
          </button>
        </Html>
      )}
    </group>
  )
}

