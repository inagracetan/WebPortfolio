import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { characterStore } from './useCharacterStore'
import { touchControlsStore } from './touchControlsStore'
import { resolveMovement, getTerrainHeight } from './collisionSystem'
import { soundEngine } from '@/utilities/audio'

export function useCharacterController() {
  const { camera } = useThree()

  // Keystroke state
  const keys = useRef<{
    forward: boolean
    backward: boolean
    left: boolean
    right: boolean
    sprint: boolean
  }>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    sprint: false,
  })

  // Keyboard event listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return
      }

      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          keys.current.forward = true
          break
        case 'KeyS':
        case 'ArrowDown':
          keys.current.backward = true
          break
        case 'KeyA':
        case 'ArrowLeft':
          keys.current.left = true
          break
        case 'KeyD':
        case 'ArrowRight':
          keys.current.right = true
          break
        case 'ShiftLeft':
        case 'ShiftRight':
          keys.current.sprint = true
          break
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          keys.current.forward = false
          break
        case 'KeyS':
        case 'ArrowDown':
          keys.current.backward = false
          break
        case 'KeyA':
        case 'ArrowLeft':
          keys.current.left = false
          break
        case 'KeyD':
        case 'ArrowRight':
          keys.current.right = false
          break
        case 'ShiftLeft':
        case 'ShiftRight':
          keys.current.sprint = false
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  // Current avatar position and rotation refs
  const currentPos = useRef(new THREE.Vector3(0, 0.45, 1.8))
  const currentRot = useRef(0)

  // Reusable vectors for performance
  const moveDir = useRef(new THREE.Vector3())
  const forwardVec = useRef(new THREE.Vector3())
  const rightVec = useRef(new THREE.Vector3())

  useFrame((_, delta) => {
    const touch = touchControlsStore.getState()

    // 1. Calculate raw input vector from Keyboard + Mobile Joystick
    let inputX = 0
    let inputZ = 0

    if (keys.current.forward) inputZ -= 1
    if (keys.current.backward) inputZ += 1
    if (keys.current.left) inputX -= 1
    if (keys.current.right) inputX += 1

    // Add touch joystick input
    inputX += touch.joystickVector.x
    inputZ += touch.joystickVector.y

    const isMoving = Math.hypot(inputX, inputZ) > 0.05
    const isSprinting = keys.current.sprint || touch.isSprinting

    if (isMoving) {
      // Normalize input vector
      const length = Math.hypot(inputX, inputZ)
      const normX = inputX / length
      const normZ = inputZ / length

      // 2. Camera-relative movement transformation
      // Get camera horizontal forward vector
      camera.getWorldDirection(forwardVec.current)
      forwardVec.current.y = 0
      forwardVec.current.normalize()

      // Calculate camera right vector
      rightVec.current.crossVectors(forwardVec.current, new THREE.Vector3(0, 1, 0)).normalize()

      // Combined world movement vector
      moveDir.current
        .set(0, 0, 0)
        .addScaledVector(forwardVec.current, -normZ)
        .addScaledVector(rightVec.current, normX)
        .normalize()

      // Movement speed (Walk: 4.5, Sprint: 8.0)
      const speed = isSprinting ? 8.0 : 4.5
      const deltaDist = speed * Math.min(delta, 0.05)

      // Sound feedback for locomotion footsteps
      soundEngine.playFootstep(isSprinting)

      const targetDeltaX = moveDir.current.x * deltaDist
      const targetDeltaZ = moveDir.current.z * deltaDist

      // 3. Collision resolution with sliding against obstacles & island borders
      const [newX, newZ] = resolveMovement(
        currentPos.current.x,
        currentPos.current.z,
        targetDeltaX,
        targetDeltaZ,
        0.35 // Player capsule radius
      )

      currentPos.current.x = newX
      currentPos.current.z = newZ

      // 4. Update elevation based on terrain / steps
      const groundHeight = getTerrainHeight(newX, newZ)
      currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, groundHeight + 0.1, 0.25)

      // 5. Smooth rotation towards movement direction
      const targetAngle = Math.atan2(moveDir.current.x, moveDir.current.z)
      // Smooth angle interpolation
      let diff = targetAngle - currentRot.current
      while (diff < -Math.PI) diff += Math.PI * 2
      while (diff > Math.PI) diff -= Math.PI * 2
      currentRot.current += diff * Math.min(delta * 14, 1.0)
    }

    // Update centralized character state store
    characterStore.setPlayerPosition(
      [currentPos.current.x, currentPos.current.y, currentPos.current.z],
      currentRot.current,
      isMoving,
      isSprinting
    )
  })

  return {
    currentPos,
    currentRot,
  }
}

