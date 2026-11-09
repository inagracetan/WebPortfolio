import React from 'react'
import { useGameStore } from '@/hooks/useGameStore'

export const EnvironmentLighting: React.FC = () => {
  const { graphicsQuality } = useGameStore()
  const isHighQuality = graphicsQuality === 'high'
  const shadowMapSize = isHighQuality ? 2048 : 1024

  return (
    <>
      {/* Soft atmospheric ambient light */}
      <ambientLight intensity={isHighQuality ? 0.7 : 0.85} color="#c7d2fe" />

      {/* Main warm directional sunlight */}
      <directionalLight
        position={[20, 28, 18]}
        intensity={1.8}
        color="#fffbeb"
        castShadow={isHighQuality}
        shadow-mapSize-width={shadowMapSize}
        shadow-mapSize-height={shadowMapSize}
        shadow-camera-far={80}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-bias={-0.0004}
      />

      {/* Cool twilight sky bounce from opposite low angle */}
      <directionalLight
        position={[-18, -12, -15]}
        intensity={0.5}
        color="#38bdf8"
      />

      {/* Warm evening backlight for rim lighting */}
      <directionalLight
        position={[-15, 12, -20]}
        intensity={0.4}
        color="#fbcfe8"
      />

      {/* Dedicated Workspace Interior Warm Lamp */}
      <pointLight
        position={[0.2, 1.4, 0.4]}
        intensity={2.2}
        distance={7}
        color="#fef08a"
        castShadow={isHighQuality}
      />

      {/* Workspace Pool Aqua Glow */}
      <pointLight
        position={[-1.2, 0.8, 1.2]}
        intensity={1.5}
        distance={5}
        color="#00f0ff"
      />

      {/* Cherry Blossom Garden Subtle Magenta Ambient Glow */}
      <pointLight
        position={[-3.2, 0.9, 2.2]}
        intensity={0.9}
        distance={6}
        color="#f472b6"
      />
    </>
  )
}
