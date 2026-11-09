import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useCharacterController } from './useCharacterController'
import { useCharacterStore } from './useCharacterStore'

export const PlayerAvatar: React.FC = () => {
  // Movement & physics controller hook
  const { currentPos, currentRot } = useCharacterController()
  const { isMoving, isSprinting } = useCharacterStore()

  // Mesh & limb hierarchy references
  const avatarGroupRef = useRef<THREE.Group>(null)
  const bodyRef = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Group>(null)
  const leftArmRef = useRef<THREE.Group>(null)
  const rightArmRef = useRef<THREE.Group>(null)
  const leftLegRef = useRef<THREE.Group>(null)
  const rightLegRef = useRef<THREE.Group>(null)
  const companionOrbRef = useRef<THREE.Mesh>(null)
  const scarfRef = useRef<THREE.Mesh>(null)

  // Stride animation phase
  const stridePhase = useRef(0)
  const animWeight = useRef(0) // 0 = idle, 1 = moving
  const idleTimer = useRef(0)

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()

    // Sync group position and rotation
    if (avatarGroupRef.current) {
      avatarGroupRef.current.position.copy(currentPos.current)
      avatarGroupRef.current.rotation.y = currentRot.current
    }

    // Blend animation weight between idle and moving
    const targetWeight = isMoving ? 1 : 0
    animWeight.current = THREE.MathUtils.lerp(animWeight.current, targetWeight, delta * 12)

    // Stride speed (walk vs sprint)
    const strideSpeed = isSprinting ? 14 : 9
    if (isMoving) {
      stridePhase.current += delta * strideSpeed
      idleTimer.current = 0
    } else {
      idleTimer.current += delta
    }

    const phase = stridePhase.current
    const weight = animWeight.current

    // 1. Body & Torso Bob and Forward Lean
    if (bodyRef.current) {
      // Forward lean when moving/running
      const targetLean = isSprinting ? 0.22 : 0.12
      bodyRef.current.rotation.x = THREE.MathUtils.lerp(0, targetLean, weight)

      // Vertical hip bounce while walking/running + subtle idle breathing
      const idleBob = Math.sin(t * 2.5) * 0.025
      const walkBob = Math.abs(Math.sin(phase)) * (isSprinting ? 0.09 : 0.06)
      bodyRef.current.position.y = THREE.MathUtils.lerp(idleBob, walkBob, weight)
    }

    // 2. Head subtle nod + periodic idle look-around
    if (headRef.current) {
      headRef.current.rotation.x = Math.sin(t * 2.5) * 0.02 - weight * 0.05
      if (!isMoving && idleTimer.current > 2.5) {
        headRef.current.rotation.y = Math.sin((idleTimer.current - 2.5) * 1.4) * 0.22
      } else {
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, 0, delta * 6)
      }
    }

    // 3. Limbs: Legs Alternating Walk/Run
    if (leftLegRef.current && rightLegRef.current) {
      const legAmplitude = isSprinting ? 0.75 : 0.52
      const legAngle = Math.sin(phase) * legAmplitude * weight

      leftLegRef.current.rotation.x = legAngle
      rightLegRef.current.rotation.x = -legAngle

      // Slight knee bend on backswing
      leftLegRef.current.position.y = 0.35 + Math.max(0, -Math.sin(phase)) * 0.05 * weight
      rightLegRef.current.position.y = 0.35 + Math.max(0, Math.sin(phase)) * 0.05 * weight
    }

    // 4. Limbs: Arms Counter-Swing
    if (leftArmRef.current && rightArmRef.current) {
      const armAmplitude = isSprinting ? 0.65 : 0.42
      const armAngle = Math.sin(phase) * armAmplitude * weight

      // Counter-motion to legs
      leftArmRef.current.rotation.x = -armAngle
      rightArmRef.current.rotation.x = armAngle

      // Natural outward arm angle
      leftArmRef.current.rotation.z = 0.15 + Math.sin(t * 2) * 0.03
      rightArmRef.current.rotation.z = -0.15 - Math.sin(t * 2) * 0.03
    }

    // 5. Billowing Scarf
    if (scarfRef.current) {
      scarfRef.current.rotation.x = -0.2 - weight * (isSprinting ? 0.5 : 0.3) + Math.sin(t * 6) * 0.1
    }

    // 6. Floating Companion Light Orb
    if (companionOrbRef.current) {
      companionOrbRef.current.position.y = 1.35 + Math.sin(t * 3.5) * 0.08
      companionOrbRef.current.position.x = 0.45 + Math.cos(t * 2.0) * 0.05
      companionOrbRef.current.rotation.y = t * 2.0
    }
  })

  return (
    <group ref={avatarGroupRef} position={[0, 0.45, 1.8]}>
      {/* Contact Shadow Decal on Ground */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.32, 16]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.35} />
      </mesh>

      {/* Floating Companion Light Orb (Indie Adventure Sprite) */}
      <mesh ref={companionOrbRef} position={[0.45, 1.35, -0.15]} castShadow>
        <octahedronGeometry args={[0.1, 0]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={1.2}
          roughness={0.2}
        />
      </mesh>

      {/* Hierarchical Animated Character Body */}
      <group ref={bodyRef} position={[0, 0.45, 0]}>
        {/* Torso / Adventure Tunic Coat */}
        <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.38, 0.46, 0.28]} />
          <meshStandardMaterial color="#0f172a" roughness={0.6} flatShading />
        </mesh>

        {/* Tunic Waist Belt & Buckle */}
        <mesh position={[0, 0.22, 0]} castShadow>
          <boxGeometry args={[0.4, 0.08, 0.3]} />
          <meshStandardMaterial color="#b45309" roughness={0.5} flatShading />
        </mesh>
        <mesh position={[0, 0.22, 0.16]}>
          <boxGeometry args={[0.08, 0.06, 0.02]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Low-Poly Adventure Backpack */}
        <group position={[0, 0.44, -0.18]}>
          <mesh castShadow>
            <boxGeometry args={[0.26, 0.32, 0.14]} />
            <meshStandardMaterial color="#334155" roughness={0.7} flatShading />
          </mesh>
          {/* Compass Sensor Light on Backpack */}
          <mesh position={[0, 0.08, -0.08]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
        </group>

        {/* Electric Blue Flowing Scarf / Collar */}
        <mesh position={[0, 0.65, 0]} castShadow>
          <boxGeometry args={[0.34, 0.09, 0.26]} />
          <meshStandardMaterial color="#00f0ff" roughness={0.4} flatShading />
        </mesh>
        {/* Scarf Tail Fluttering Behind */}
        <mesh ref={scarfRef} position={[0.08, 0.58, -0.18]} castShadow>
          <boxGeometry args={[0.1, 0.26, 0.03]} />
          <meshStandardMaterial color="#00f0ff" roughness={0.4} flatShading />
        </mesh>

        {/* Head & Explorer Hat */}
        <group ref={headRef} position={[0, 0.85, 0]}>
          {/* Cute Stylized Head */}
          <mesh castShadow>
            <boxGeometry args={[0.32, 0.3, 0.3]} />
            <meshStandardMaterial color="#faf8f5" roughness={0.4} flatShading />
          </mesh>
          {/* Visor / Eyes strip */}
          <mesh position={[0, 0.02, 0.155]}>
            <boxGeometry args={[0.24, 0.07, 0.02]} />
            <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.6} />
          </mesh>
          {/* Low-Poly Explorer Cap / Hood */}
          <mesh position={[0, 0.16, -0.02]} castShadow>
            <boxGeometry args={[0.36, 0.12, 0.34]} />
            <meshStandardMaterial color="#1e293b" flatShading />
          </mesh>
        </group>

        {/* Left Arm */}
        <group ref={leftArmRef} position={[-0.26, 0.58, 0]}>
          <mesh position={[0, -0.18, 0]} castShadow>
            <boxGeometry args={[0.11, 0.36, 0.12]} />
            <meshStandardMaterial color="#1e293b" flatShading />
          </mesh>
          {/* Hand / Glove */}
          <mesh position={[0, -0.38, 0]} castShadow>
            <boxGeometry args={[0.09, 0.09, 0.09]} />
            <meshStandardMaterial color="#faf8f5" flatShading />
          </mesh>
        </group>

        {/* Right Arm */}
        <group ref={rightArmRef} position={[0.26, 0.58, 0]}>
          <mesh position={[0, -0.18, 0]} castShadow>
            <boxGeometry args={[0.11, 0.36, 0.12]} />
            <meshStandardMaterial color="#1e293b" flatShading />
          </mesh>
          {/* Hand / Glove */}
          <mesh position={[0, -0.38, 0]} castShadow>
            <boxGeometry args={[0.09, 0.09, 0.09]} />
            <meshStandardMaterial color="#faf8f5" flatShading />
          </mesh>
        </group>

        {/* Left Leg & Boot */}
        <group ref={leftLegRef} position={[-0.11, 0.18, 0]}>
          <mesh position={[0, -0.22, 0]} castShadow>
            <boxGeometry args={[0.13, 0.38, 0.14]} />
            <meshStandardMaterial color="#334155" flatShading />
          </mesh>
          <mesh position={[0, -0.42, 0.04]} castShadow>
            <boxGeometry args={[0.14, 0.12, 0.2]} />
            <meshStandardMaterial color="#0f172a" flatShading />
          </mesh>
        </group>

        {/* Right Leg & Boot */}
        <group ref={rightLegRef} position={[0.11, 0.18, 0]}>
          <mesh position={[0, -0.22, 0]} castShadow>
            <boxGeometry args={[0.13, 0.38, 0.14]} />
            <meshStandardMaterial color="#334155" flatShading />
          </mesh>
          <mesh position={[0, -0.42, 0.04]} castShadow>
            <boxGeometry args={[0.14, 0.12, 0.2]} />
            <meshStandardMaterial color="#0f172a" flatShading />
          </mesh>
        </group>
      </group>
    </group>
  )
}

