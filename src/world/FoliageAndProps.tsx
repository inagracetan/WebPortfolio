import React from 'react'

interface CherryTreeProps {
  position: [number, number, number]
  scale?: number
  rotationY?: number
}

export const CherryTree: React.FC<CherryTreeProps> = ({
  position,
  scale = 1,
  rotationY = 0,
}) => {
  return (
    <group position={position} scale={scale} rotation={[0, rotationY, 0]}>
      {/* Faceted trunk with slight lean */}
      <mesh position={[0, 0.7, 0]} rotation={[0.05, 0, 0.05]} castShadow>
        <cylinderGeometry args={[0.14, 0.24, 1.4, 5]} />
        <meshStandardMaterial color="#473e35" roughness={0.9} flatShading />
      </mesh>
      {/* Main cherry foliage cluster */}
      <mesh position={[0, 1.8, 0]} castShadow>
        <dodecahedronGeometry args={[1.0, 0]} />
        <meshStandardMaterial
          color="#f472b6" // Pink cherry blossom
          roughness={0.65}
          flatShading
        />
      </mesh>
      {/* Sub foliage cluster 1 */}
      <mesh position={[0.5, 1.5, 0.3]} scale={0.7} castShadow>
        <icosahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial color="#ec4899" roughness={0.65} flatShading />
      </mesh>
      {/* Sub foliage cluster 2 */}
      <mesh position={[-0.45, 1.6, -0.25]} scale={0.65} castShadow>
        <icosahedronGeometry args={[0.85, 0]} />
        <meshStandardMaterial color="#f9a8d4" roughness={0.65} flatShading />
      </mesh>
    </group>
  )
}

interface ForestTreeProps {
  position: [number, number, number]
  scale?: number
  tint?: 'lush' | 'sage' | 'pine'
}

export const ForestTree: React.FC<ForestTreeProps> = ({
  position,
  scale = 1,
  tint = 'lush',
}) => {
  const foliageColor = {
    lush: '#10b981',
    sage: '#52796f',
    pine: '#2d6a4f',
  }[tint]

  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.2, 1.4, 5]} />
        <meshStandardMaterial color="#334155" roughness={0.9} flatShading />
      </mesh>
      <mesh position={[0, 1.7, 0]} castShadow>
        <dodecahedronGeometry args={[0.95, 0]} />
        <meshStandardMaterial color={foliageColor} roughness={0.7} flatShading />
      </mesh>
      <mesh position={[0.3, 1.4, -0.2]} scale={0.65} castShadow>
        <icosahedronGeometry args={[0.85, 0]} />
        <meshStandardMaterial color={foliageColor} roughness={0.7} flatShading />
      </mesh>
    </group>
  )
}

interface GlowingBushProps {
  position: [number, number, number]
  scale?: number
  color?: string
}

export const GlowingBush: React.FC<GlowingBushProps> = ({
  position,
  scale = 1,
  color = '#f472b6',
}) => {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow receiveShadow>
        <icosahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.25}
          roughness={0.6}
          flatShading
        />
      </mesh>
    </group>
  )
}

interface BoulderProps {
  position: [number, number, number]
  scale?: number
  rotation?: [number, number, number]
}

export const Boulder: React.FC<BoulderProps> = ({
  position,
  scale = 1,
  rotation = [0, 0, 0],
}) => {
  return (
    <group position={position} scale={scale} rotation={rotation}>
      <mesh castShadow receiveShadow>
        <dodecahedronGeometry args={[0.45, 0]} />
        <meshStandardMaterial color="#334155" roughness={0.9} flatShading />
      </mesh>
    </group>
  )
}

interface PathLanternProps {
  position: [number, number, number]
}

export const PathLantern: React.FC<PathLanternProps> = ({ position }) => {
  return (
    <group position={position}>
      {/* Dark sleek post */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <boxGeometry args={[0.08, 0.9, 0.08]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} flatShading />
      </mesh>
      {/* Light head */}
      <mesh position={[0, 0.92, 0]}>
        <boxGeometry args={[0.18, 0.14, 0.18]} />
        <meshStandardMaterial
          color="#fef08a"
          emissive="#fef08a"
          emissiveIntensity={1.2}
        />
      </mesh>
    </group>
  )
}

