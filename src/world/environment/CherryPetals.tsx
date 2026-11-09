import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useGameStore } from '@/hooks/useGameStore'

interface CherryPetalsProps {
  count?: number
  areaCenter?: [number, number, number]
}

export const CherryPetals: React.FC<CherryPetalsProps> = ({
  count = 90,
  areaCenter = [-2.5, 2.5, 1.5],
}) => {
  const { graphicsQuality } = useGameStore()
  const effectiveCount = graphicsQuality === 'eco' ? Math.min(count, 35) : count
  const pointsRef = useRef<THREE.Points>(null)

  // Seeded deterministic generation for particle distribution
  const [positions, speeds, phases] = useMemo(() => {
    const pos = new Float32Array(effectiveCount * 3)
    const spd = new Float32Array(effectiveCount)
    const phs = new Float32Array(effectiveCount)

    let seed = 8848
    const rnd = () => {
      seed = (seed * 16807) % 2147483647
      return (seed - 1) / 2147483646
    }

    for (let i = 0; i < effectiveCount; i++) {
      // Clustered around the cherry blossom garden
      pos[i * 3] = areaCenter[0] + (rnd() - 0.5) * 6.5
      pos[i * 3 + 1] = 0.4 + rnd() * 4.2
      pos[i * 3 + 2] = areaCenter[2] + (rnd() - 0.5) * 6.5

      spd[i] = 0.25 + rnd() * 0.35
      phs[i] = rnd() * Math.PI * 2
    }

    return [pos, spd, phs]
  }, [effectiveCount, areaCenter])

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useFrame((state, delta) => {
    if (prefersReducedMotion || !pointsRef.current) return
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    const array = posAttr.array as Float32Array
    const t = state.clock.getElapsedTime()

    for (let i = 0; i < effectiveCount; i++) {
      const idx = i * 3
      const phase = phases[i]

      // Gentle downward drift
      array[idx + 1] -= speeds[i] * delta

      // Gentle swaying on X and Z axis
      array[idx] += Math.sin(t * 1.5 + phase) * 0.008
      array[idx + 2] += Math.cos(t * 1.2 + phase) * 0.006

      // Reset when reaching ground
      if (array[idx + 1] < 0.3) {
        array[idx + 1] = 4.4 + Math.random() * 0.5
        array[idx] = areaCenter[0] + (Math.random() - 0.5) * 6.0
        array[idx + 2] = areaCenter[2] + (Math.random() - 0.5) * 6.0
      }
    }

    posAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        color="#f472b6"
        transparent
        opacity={0.8}
        blending={THREE.NormalBlending}
        depthWrite={false}
      />
    </points>
  )
}

