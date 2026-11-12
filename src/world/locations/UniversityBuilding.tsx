import React from 'react'
import { ForestTree, PathLantern, Boulder } from '../FoliageAndProps'

export const UniversityBuilding: React.FC = () => {
  return (
    <group position={[-10, 1.0, -11]}>
      {/* Platform Foundation */}
      <mesh position={[0, 0.1, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[4.4, 4.1, 0.25, 7]} />
        <meshStandardMaterial color="#52796f" roughness={0.7} flatShading />
      </mesh>

      {/* Flagstone Plaza Deck */}
      <mesh position={[0, 0.22, 0]} receiveShadow>
        <boxGeometry args={[4.2, 0.04, 3.8]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.5} flatShading />
      </mesh>

      {/* Academic Pavilion Architecture */}
      <group position={[0, 0.24, -0.6]}>
        {/* Main Academic Hall Back Wall */}
        <mesh position={[0, 1.2, -1.2]} castShadow receiveShadow>
          <boxGeometry args={[3.6, 2.2, 0.4]} />
          <meshStandardMaterial color="#faf8f5" roughness={0.4} flatShading />
        </mesh>

        {/* 4 Architectural Portico Columns */}
        {[-1.4, -0.5, 0.5, 1.4].map((x, idx) => (
          <group key={idx} position={[x, 0, 0.6]}>
            {/* Column Shaft */}
            <mesh position={[0, 1.0, 0]} castShadow>
              <cylinderGeometry args={[0.14, 0.16, 2.0, 6]} />
              <meshStandardMaterial color="#faf8f5" roughness={0.3} flatShading />
            </mesh>
            {/* Column Capital */}
            <mesh position={[0, 2.05, 0]} castShadow>
              <boxGeometry args={[0.38, 0.1, 0.38]} />
              <meshStandardMaterial color="#e2e8f0" flatShading />
            </mesh>
          </group>
        ))}

        {/* Portico Architrave & Slanted Academic Roof Pediment */}
        <mesh position={[0, 2.25, -0.2]} castShadow>
          <boxGeometry args={[3.8, 0.25, 2.0]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.4} flatShading />
        </mesh>
        {/* Triangular Pediment / Roof */}
        <mesh position={[0, 2.7, 0.7]} rotation={[0, 0, 0]} castShadow>
          <coneGeometry args={[1.6, 0.7, 4]} />
          <meshStandardMaterial color="#334155" roughness={0.5} flatShading />
        </mesh>

        {/* Warm Golden Campus Entrance Doorway */}
        <mesh position={[0, 0.8, -0.98]}>
          <planeGeometry args={[0.9, 1.5]} />
          <meshStandardMaterial color="#fef08a" emissive="#fde047" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* Academic Degree Monument (Graduation Cap & Pedestal) */}
      <group position={[0, 0.25, 1.4]}>
        {/* Stepped Pedestal */}
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.9, 0.4, 0.9]} />
          <meshStandardMaterial color="#0f172a" roughness={0.5} flatShading />
        </mesh>
        {/* Degree Scroll / Book */}
        <mesh position={[0, 0.46, 0]} rotation={[0.2, 0.4, 0]} castShadow>
          <boxGeometry args={[0.45, 0.08, 0.32]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.3} flatShading />
        </mesh>
        {/* Stylized Graduation Cap Accent */}
        <mesh position={[0, 0.58, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
          <boxGeometry args={[0.36, 0.03, 0.36]} />
          <meshStandardMaterial color="#1e293b" flatShading />
        </mesh>
      </group>

      {/* Outdoor Study Table & Wooden Bench */}
      <group position={[-1.8, 0.25, 0.8]}>
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.9, 0.06, 0.5]} />
          <meshStandardMaterial color="#b45309" roughness={0.6} flatShading />
        </mesh>
        <mesh position={[0, 0.17, 0]} castShadow>
          <boxGeometry args={[0.7, 0.3, 0.3]} />
          <meshStandardMaterial color="#475569" flatShading />
        </mesh>
        {/* Books on the study table */}
        <mesh position={[0, 0.41, 0]} castShadow>
          <boxGeometry args={[0.22, 0.06, 0.16]} />
          <meshStandardMaterial color="#38bdf8" />
        </mesh>
      </group>

      {/* Surrounding Scholarly Foliage & Boulder */}
      <ForestTree position={[-2.8, 0.2, -1.8]} scale={1.2} tint="lush" />
      <ForestTree position={[2.6, 0.2, -1.6]} scale={1.1} tint="sage" />
      <Boulder position={[2.2, 0.2, 1.6]} scale={1.2} />
      <PathLantern position={[1.4, 0.2, 2.2]} />
    </group>
  )
}

