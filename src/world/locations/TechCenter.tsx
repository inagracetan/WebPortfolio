import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { ForestTree, PathLantern, GlowingBush } from '../FoliageAndProps'

export const TechCenter: React.FC = () => {
  const crystalSpireRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (crystalSpireRef.current) {
      crystalSpireRef.current.rotation.y = t * 0.8
      crystalSpireRef.current.position.y = 2.2 + Math.sin(t * 1.6) * 0.12
    }
  })

  return (
    <group position={[13, 0.6, 5]}>
      {/* Foundation Platform Deck */}
      <mesh position={[0, 0.1, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[4.4, 4.1, 0.25, 8]} />
        <meshStandardMaterial color="#0f172a" roughness={0.5} flatShading />
      </mesh>

      {/* Modern Glass & Steel Pavilion Canopy */}
      <group position={[0, 0, 0]}>
        {/* 4 Corner Support Columns */}
        {[
          [-1.8, -1.8],
          [1.8, -1.8],
          [-1.8, 1.8],
          [1.8, 1.8],
        ].map(([x, z], idx) => (
          <mesh key={idx} position={[x, 1.3, z]} castShadow>
            <boxGeometry args={[0.16, 2.4, 0.16]} />
            <meshStandardMaterial color="#1e293b" metalness={0.6} flatShading />
          </mesh>
        ))}

        {/* Floating Geometric Glass Canopy */}
        <mesh position={[0, 2.6, 0]} castShadow>
          <boxGeometry args={[4.0, 0.12, 4.0]} />
          <meshStandardMaterial
            color="#38bdf8"
            transparent
            opacity={0.35}
            roughness={0.1}
            metalness={0.8}
            flatShading
          />
        </mesh>
      </group>

      {/* Glowing Circuit Floor Pattern */}
      <mesh position={[0, 0.24, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.6, 1.9, 8]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>

      {/* Central Quantum Data Crystal Spire */}
      <mesh ref={crystalSpireRef} position={[0, 2.2, 0]} castShadow>
        <octahedronGeometry args={[0.65, 0]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      {/* Crystal Base Plinth */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.8, 1.0, 0.8, 8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} flatShading />
      </mesh>

      {/* 5 Skill Monolith Tablets (Programming, Database, Networking, Cloud/Security, Productivity) */}
      {[
        { pos: [-1.62, 0.6, -0.53] as [number, number, number], rot: Math.PI * 0.4, color: '#a855f7', label: 'PROGRAMMING' },
        { pos: [1.62, 0.6, -0.53] as [number, number, number], rot: -Math.PI * 0.4, color: '#f59e0b', label: 'DATABASE' },
        { pos: [0, 0.6, -1.7] as [number, number, number], rot: 0, color: '#38bdf8', label: 'NETWORKING & IT' },
        { pos: [-1.0, 0.6, 1.38] as [number, number, number], rot: Math.PI * 0.8, color: '#00f0ff', label: 'CLOUD & SEC' },
        { pos: [1.0, 0.6, 1.38] as [number, number, number], rot: -Math.PI * 0.8, color: '#10b981', label: 'PRODUCTIVITY' },
      ].map((tablet, idx) => (
        <group key={idx} position={tablet.pos} rotation={[0, tablet.rot, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.75, 1.1, 0.14]} />
            <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.6} flatShading />
          </mesh>
          {/* Glowing skill circuit line */}
          <mesh position={[0, 0, 0.08]}>
            <planeGeometry args={[0.62, 0.85]} />
            <meshStandardMaterial color={tablet.color} emissive={tablet.color} emissiveIntensity={0.5} />
          </mesh>
        </group>
      ))}

      {/* Surrounding Low-Poly Trees and Foliage */}
      <ForestTree position={[-2.8, 0.2, 2.2]} scale={1.1} tint="sage" />
      <ForestTree position={[2.6, 0.2, -2.0]} scale={0.95} tint="pine" />
      <GlowingBush position={[-1.2, 0.2, 2.6]} scale={1.0} color="#00f0ff" />
      <PathLantern position={[1.4, 0.2, 2.6]} />
    </group>
  )
}

