import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { CherryTree, GlowingBush, PathLantern } from '../FoliageAndProps'

export const ContactStation: React.FC = () => {
  const radarDishRef = useRef<THREE.Group>(null)
  const beaconRingsRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (radarDishRef.current) {
      radarDishRef.current.rotation.y = t * 0.4
    }
    if (beaconRingsRef.current) {
      beaconRingsRef.current.rotation.z = t * 0.6
      beaconRingsRef.current.position.y = 3.6 + Math.sin(t * 1.5) * 0.1
    }
  })

  return (
    <group position={[11, 1.2, -10]}>
      {/* Foundation Platform */}
      <mesh position={[0, 0.1, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[4.2, 3.8, 0.25, 7]} />
        <meshStandardMaterial color="#1e293b" roughness={0.6} flatShading />
      </mesh>

      {/* Observation Deck Hardwood Floor */}
      <mesh position={[0, 0.23, 0]} receiveShadow>
        <cylinderGeometry args={[3.9, 3.9, 0.04, 16]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.5} flatShading />
      </mesh>

      {/* Main Communication Beacon Spire */}
      <group position={[0, 0.25, -1.2]}>
        {/* Lattice / Tower Base */}
        <mesh position={[0, 1.4, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.5, 2.8, 4]} />
          <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.4} flatShading />
        </mesh>

        {/* Rotating Parabolic Radar Dish */}
        <group ref={radarDishRef} position={[0, 2.8, 0]}>
          <mesh rotation={[0.4, 0, 0]} castShadow>
            <cylinderGeometry args={[0.7, 0.2, 0.18, 12]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.3} metalness={0.5} flatShading />
          </mesh>
          {/* Central Transmitter Antenna */}
          <mesh position={[0, 0.15, 0.2]} rotation={[0.4, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.4, 6]} />
            <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.8} />
          </mesh>
        </group>

        {/* Glowing Radio Wave Transmission Rings */}
        <group ref={beaconRingsRef} position={[0, 3.6, 0]}>
          <mesh>
            <torusGeometry args={[0.6, 0.02, 6, 24]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.45, 0.02, 6, 24]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        </group>
      </group>

      {/* Welcoming Collaboration Lounge Seating */}
      <group position={[-1.2, 0.25, 0.8]}>
        {/* Curved Modern Bench */}
        <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.25, 0.5]} />
          <meshStandardMaterial color="#52796f" roughness={0.7} flatShading />
        </mesh>
        <mesh position={[0, 0.45, -0.22]} castShadow>
          <boxGeometry args={[1.5, 0.25, 0.08]} />
          <meshStandardMaterial color="#52796f" roughness={0.7} flatShading />
        </mesh>
        {/* Coffee Table */}
        <mesh position={[0, 0.15, 0.6]} castShadow receiveShadow>
          <cylinderGeometry args={[0.35, 0.35, 0.14, 8]} />
          <meshStandardMaterial color="#faf8f5" flatShading />
        </mesh>
      </group>

      {/* Direct Transmission Terminal / Letterbox Hub */}
      <group position={[1.4, 0.25, 0.8]}>
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.45, 1.0, 0.35]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} flatShading />
        </mesh>
        {/* Terminal Screen with Glowing Email Icon */}
        <mesh position={[0, 0.75, 0.18]} rotation={[-0.2, 0, 0]}>
          <planeGeometry args={[0.35, 0.25]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        {/* Mail Drop Slot */}
        <mesh position={[0, 0.45, 0.18]}>
          <boxGeometry args={[0.22, 0.03, 0.02]} />
          <meshBasicMaterial color="#fef08a" />
        </mesh>
      </group>

      {/* Surrounding Vegetation & Lights */}
      <CherryTree position={[2.4, 0.2, -1.8]} scale={1.05} rotationY={0.6} />
      <GlowingBush position={[-2.4, 0.2, -1.4]} scale={1.0} color="#00f0ff" />
      <PathLantern position={[0, 0.2, 2.4]} />
    </group>
  )
}

