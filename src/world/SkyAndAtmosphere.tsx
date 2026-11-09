import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useGameStore } from '@/hooks/useGameStore'

export const SkyAndAtmosphere: React.FC = () => {
  const cloudsRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const miniIslandsRef = useRef<THREE.Group>(null)
  const { graphicsQuality } = useGameStore()

  // Generate glowing floating particles / dust motes
  const particleCount = graphicsQuality === 'eco' ? 50 : 140
  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    const sca = new Float32Array(particleCount)
    let seed = 1337
    const pseudoRandom = () => {
      seed = (seed * 16807) % 2147483647
      return (seed - 1) / 2147483646
    }
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (pseudoRandom() - 0.5) * 44
      pos[i * 3 + 1] = pseudoRandom() * 12 - 2
      pos[i * 3 + 2] = (pseudoRandom() - 0.5) * 44
      sca[i] = pseudoRandom() * 0.15 + 0.05
    }
    return [pos, sca]
  }, [particleCount])

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useFrame((state) => {
    if (prefersReducedMotion) return
    const t = state.clock.getElapsedTime()

    // Slow atmospheric cloud drift
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = t * 0.015
    }

    // Mini floating island gentle bob
    if (miniIslandsRef.current) {
      miniIslandsRef.current.position.y = Math.sin(t * 0.5) * 0.2
    }

    // Particles gentle vertical oscillation
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.02
    }
  })

  return (
    <group>
      {/* Deep twilight atmospheric sky dome */}
      <mesh scale={[-1, 1, 1]}>
        <sphereGeometry args={[70, 24, 24]} />
        <meshBasicMaterial
          color="#0b1120"
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Floating Ambient Glowing Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-scale"
            args={[scales, 1]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#00f0ff"
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Drifting Low-Poly Geometric Clouds */}
      <group ref={cloudsRef}>
        {[
          { pos: [-24, 8, -20] as [number, number, number], scale: [5, 1.2, 3] as [number, number, number] },
          { pos: [22, 11, -22] as [number, number, number], scale: [6, 1.4, 3.5] as [number, number, number] },
          { pos: [-20, 6, 22] as [number, number, number], scale: [5.5, 1.3, 3] as [number, number, number] },
          { pos: [25, 9, 18] as [number, number, number], scale: [5, 1.2, 2.8] as [number, number, number] },
          { pos: [0, 14, -28] as [number, number, number], scale: [7, 1.6, 4] as [number, number, number] },
          { pos: [-28, 10, 0] as [number, number, number], scale: [5, 1.2, 3] as [number, number, number] },
        ].map((cloud, i) => (
          <group key={i} position={cloud.pos} scale={cloud.scale}>
            <mesh castShadow={false}>
              <dodecahedronGeometry args={[1, 0]} />
              <meshStandardMaterial
                color="#faf8f5"
                roughness={0.9}
                transparent
                opacity={0.55}
                flatShading
              />
            </mesh>
            <mesh position={[0.8, -0.2, 0.3]} scale={0.7}>
              <icosahedronGeometry args={[1, 0]} />
              <meshStandardMaterial
                color="#f0eae1"
                roughness={0.9}
                transparent
                opacity={0.45}
                flatShading
              />
            </mesh>
            <mesh position={[-0.8, -0.1, -0.2]} scale={0.65}>
              <octahedronGeometry args={[1, 0]} />
              <meshStandardMaterial
                color="#e0f2fe"
                roughness={0.9}
                transparent
                opacity={0.4}
                flatShading
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* Distant Orbiting Mini Rocks */}
      <group ref={miniIslandsRef}>
        {[
          { pos: [-18, -4, -16] as [number, number, number], rot: 0.4, scale: 1.2 },
          { pos: [19, -3, -17] as [number, number, number], rot: -0.6, scale: 1.5 },
          { pos: [-19, -5, 16] as [number, number, number], rot: 0.2, scale: 1.3 },
          { pos: [18, -4, 18] as [number, number, number], rot: -0.3, scale: 1.4 },
        ].map((rock, idx) => (
          <group key={idx} position={rock.pos} scale={rock.scale} rotation={[0, rock.rot, 0]}>
            <mesh receiveShadow castShadow>
              <cylinderGeometry args={[0.9, 0.1, 1.6, 6]} />
              <meshStandardMaterial color="#1e293b" flatShading roughness={0.9} />
            </mesh>
            <mesh position={[0, 0.8, 0]}>
              <dodecahedronGeometry args={[0.4, 0]} />
              <meshStandardMaterial color="#84a98c" flatShading roughness={0.7} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  )
}

