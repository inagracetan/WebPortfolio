import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { ForestTree, PathLantern } from '../FoliageAndProps'

export const ProjectLab: React.FC = () => {
  const holoCoreRef = useRef<THREE.Mesh>(null)
  const holoRingsRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (holoCoreRef.current) {
      holoCoreRef.current.rotation.x = t * 0.8
      holoCoreRef.current.rotation.y = t * 1.2
      holoCoreRef.current.position.y = 1.6 + Math.sin(t * 2) * 0.1
    }
    if (holoRingsRef.current) {
      holoRingsRef.current.rotation.y = -t * 0.5
    }
  })

  return (
    <group position={[-13, 0.4, 5]}>
      {/* Foundation Platform Deck */}
      <mesh position={[0, 0.1, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[4.2, 4.0, 0.25, 7]} />
        <meshStandardMaterial color="#1e293b" roughness={0.6} flatShading />
      </mesh>

      {/* High-Tech Floor Circular Ring with Glowing Inlay */}
      <mesh position={[0, 0.24, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.8, 2.2, 16]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>

      {/* Central Holographic Project Core Platform */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.2, 1.4, 0.4, 8]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.5} flatShading />
      </mesh>

      {/* Floating Holographic Project Core Artifact */}
      <mesh ref={holoCoreRef} position={[0, 1.6, 0]}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#00f0ff"
          emissiveIntensity={0.8}
          wireframe
        />
      </mesh>

      {/* Orbiting Hologram Rings */}
      <group ref={holoRingsRef} position={[0, 1.6, 0]}>
        <mesh rotation={[0.4, 0, 0]}>
          <torusGeometry args={[0.85, 0.02, 6, 24]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        <mesh rotation={[-0.4, 0, 0.4]}>
          <torusGeometry args={[1.1, 0.02, 6, 24]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      </group>

      {/* 5 Interactive Project Pedestals around the Core */}
      {[
        { pos: [-1.8, 0.5, -1.2] as [number, number, number], title: 'MusuanTrack', color: '#00f0ff' },
        { pos: [1.8, 0.5, -1.2] as [number, number, number], title: 'CMU Faculty', color: '#38bdf8' },
        { pos: [-1.8, 0.5, 1.2] as [number, number, number], title: 'Firebase Scheduling', color: '#f59e0b' },
        { pos: [1.8, 0.5, 1.2] as [number, number, number], title: 'Security Risk', color: '#10b981' },
        { pos: [0, 0.5, -2.4] as [number, number, number], title: 'EC Mabao Payroll', color: '#a855f7' },
      ].map((ped, idx) => (
        <group key={idx} position={ped.pos}>
          {/* Pedestal Stand */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.5, 0.8, 0.5]} />
            <meshStandardMaterial color="#0f172a" roughness={0.5} flatShading />
          </mesh>
          {/* Slanted Display Surface */}
          <mesh position={[0, 0.45, 0]} rotation={[0.4, 0, 0]}>
            <boxGeometry args={[0.45, 0.04, 0.35]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          {/* Glowing Preview Tablet */}
          <mesh position={[0, 0.48, 0]} rotation={[0.4, 0, 0]}>
            <planeGeometry args={[0.4, 0.28]} />
            <meshBasicMaterial color={ped.color} />
          </mesh>
          {/* Mini Floating Wireframe Model above tablet */}
          <mesh position={[0, 0.75, 0]}>
            <dodecahedronGeometry args={[0.12, 0]} />
            <meshStandardMaterial color={ped.color} emissive={ped.color} emissiveIntensity={0.6} wireframe />
          </mesh>
        </group>
      ))}

      {/* Developer Server Racks with Pulsing LEDs */}
      <group position={[0, 0.8, -2.6]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.2, 1.4, 0.6]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} flatShading />
        </mesh>
        {/* Blinking Server Units */}
        {[-0.8, 0, 0.8].map((x, i) => (
          <group key={i} position={[x, 0, 0.31]}>
            {[-0.4, -0.2, 0.0, 0.2, 0.4].map((y, row) => (
              <mesh key={row} position={[0, y, 0]}>
                <boxGeometry args={[0.6, 0.12, 0.02]} />
                <meshStandardMaterial color="#1e293b" />
              </mesh>
            ))}
            {/* LED Status Dots */}
            {[-0.4, -0.2, 0.0, 0.2, 0.4].map((y, row) => (
              <mesh key={`led-${row}`} position={[0.22, y, 0.02]}>
                <sphereGeometry args={[0.025, 6, 6]} />
                <meshBasicMaterial color={row % 2 === 0 ? '#00f0ff' : '#10b981'} />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* Surrounding Safety Glass Railing */}
      <mesh position={[0, 0.45, 3.2]}>
        <boxGeometry args={[3.2, 0.45, 0.04]} />
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.4} />
      </mesh>

      {/* Surrounding Low-Poly Trees */}
      <ForestTree position={[-2.8, 0.2, -1.8]} scale={0.9} tint="pine" />
      <ForestTree position={[2.6, 0.2, 2.2]} scale={1.0} tint="lush" />
      <PathLantern position={[-1.2, 0.2, 2.8]} />
    </group>
  )
}

