import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import * as THREE from 'three'
import { useGameStore } from '@/hooks/useGameStore'
import { characterStore, useCharacterStore } from '@/characters/useCharacterStore'

export const CameraRig: React.FC = () => {
  const controlsRef = useRef<OrbitControlsImpl>(null)
  const { currentScreen, activeLocation } = useGameStore()
  const { cameraMode } = useCharacterStore()

  // Target camera focus position and camera eye position
  const targetVec = useRef(new THREE.Vector3(0, 1.2, 0))
  const posVec = useRef(new THREE.Vector3(12, 10, 12))

  // Track previous player position for smooth teleport follow-camera tracking
  const prevPlayerPos = useRef(new THREE.Vector3(...characterStore.getState().playerPosition))

  // Track previous location to detect fast-travel transitions
  const lastLocationId = useRef(activeLocation.id)

  // Synchronize camera eye position and target instantly on teleport to avoid clipping or disorientation
  useEffect(() => {
    const unsubscribe = characterStore.onTeleport((newPos) => {
      if (controlsRef.current) {
        const dx = newPos[0] - prevPlayerPos.current.x
        const dy = newPos[1] - prevPlayerPos.current.y
        const dz = newPos[2] - prevPlayerPos.current.z

        // Offset camera position by player displacement so relative third-person distance & angle are preserved
        controlsRef.current.object.position.x += dx
        controlsRef.current.object.position.y += dy
        controlsRef.current.object.position.z += dz

        const targetY = newPos[1] + 1.1
        controlsRef.current.target.set(newPos[0], targetY, newPos[2])
        targetVec.current.set(newPos[0], targetY, newPos[2])
        controlsRef.current.update()
      }
      prevPlayerPos.current.set(newPos[0], newPos[1], newPos[2])
    })
    return unsubscribe
  }, [])

  useFrame((_, delta) => {
    if (!controlsRef.current) return

    if (currentScreen === 'WELCOME') {
      // High-angle cinematic overview of the whole floating world
      targetVec.current.set(0, 0.8, 0)
      posVec.current.set(16, 14, 16)
      controlsRef.current.target.lerp(targetVec.current, delta * 2.2)
      controlsRef.current.object.position.lerp(posVec.current, delta * 2.2)
    } else {
      // Detect waypoint jump
      if (lastLocationId.current !== activeLocation.id) {
        lastLocationId.current = activeLocation.id
      }

      if (cameraMode === 'FOLLOW') {
        // Third-person camera tracking: Follows the character position directly
        const [px, py, pz] = characterStore.getState().playerPosition
        targetVec.current.set(px, py + 1.1, pz)

        // Smoothly glide camera target towards player
        controlsRef.current.target.lerp(targetVec.current, delta * 7.0)

        // Prevent camera from falling below minimum elevation (clipping ground)
        if (controlsRef.current.object.position.y < py + 1.8) {
          controlsRef.current.object.position.y = THREE.MathUtils.lerp(
            controlsRef.current.object.position.y,
            py + 2.4,
            delta * 5.0
          )
        }
      } else {
        // Free orbit focus on current location
        const [tx, ty, tz] = activeLocation.cameraTarget
        targetVec.current.set(tx, ty, tz)
        controlsRef.current.target.lerp(targetVec.current, delta * 3.5)
      }
    }

    controlsRef.current.update()
  })

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={currentScreen !== 'WELCOME'}
      minDistance={isMobile ? 3.6 : 4.2}
      maxDistance={isMobile ? 18 : 22}
      maxPolarAngle={Math.PI / 2.15} // Prevents clipping below terrain/cloudline
      minPolarAngle={Math.PI / 6} // Prevents awkward top-down clipping
      dampingFactor={0.08}
      rotateSpeed={isMobile ? 0.55 : 0.75}
      zoomSpeed={isMobile ? 0.65 : 0.8}
    />
  )
}
