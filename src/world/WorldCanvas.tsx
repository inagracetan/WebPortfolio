import React, { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { WorldScene } from './WorldScene'
import { CameraRig } from './CameraRig'
import { useGameStore, gameStore } from '@/hooks/useGameStore'

export const WorldCanvas: React.FC = () => {
  const { graphicsQuality, currentScreen } = useGameStore()
  const isDirectPortfolio = currentScreen === 'DIRECT_PORTFOLIO'

  // Adaptive device pixel ratio:
  // - High: capped at 2.0 (crisp high-DPI desktop/iPad)
  // - Eco / Mobile: capped at 1.25 (saves significant GPU fill-rate & prevents thermal throttling)
  const dpr = useMemo<[number, number]>(() => {
    return graphicsQuality === 'low' ? [1, 1.25] : graphicsQuality === 'medium' ? [1, 1.5] : [1, 2]
  }, [graphicsQuality])

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto">
      <Canvas
        frameloop={isDirectPortfolio ? 'never' : 'always'}
        shadows={graphicsQuality === 'high'}
        dpr={dpr}
        camera={{ position: [12, 10, 12], fov: 42 }}
        gl={{
          antialias: graphicsQuality === 'high',
          alpha: true,
          powerPreference: graphicsQuality === 'high' ? 'high-performance' : 'default',
        }}
        onCreated={() => {
          gameStore.setLoadingProgress(50, 'WEBGL PIPELINE INITIALIZED')
        }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <WorldScene />
          <CameraRig />
        </Suspense>
      </Canvas>
    </div>
  )
}
