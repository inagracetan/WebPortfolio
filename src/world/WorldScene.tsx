import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { EnvironmentLighting } from './EnvironmentLighting'
import { SkyAndAtmosphere } from './SkyAndAtmosphere'
import { IslandTerrain } from './IslandTerrain'
import { ConnectingPaths } from './ConnectingPaths'
import {
  PersonalWorkspace,
  ProjectLab,
  TechCenter,
  UniversityBuilding,
  ContactStation,
} from './locations'
import { LocationMarker } from './LocationMarker'
import { InteractiveAnchor } from './environment/InteractiveAnchor'
import { PlayerAvatar } from '@/characters/PlayerAvatar'
import { locationsData } from '@/locations/locationsData'
import { INTERACTIVE_OBJECTS } from '@/interactions/interactiveObjectsData'
import { gameStore } from '@/hooks/useGameStore'

export const WorldScene: React.FC = () => {
  const worldGroupRef = useRef<THREE.Group>(null)
  const isFirstRender = useRef(true)
  const [secondaryLoaded, setSecondaryLoaded] = useState(false)

  // Progressive background loading: mount essential Main Island first,
  // then hydrate secondary distant islands and connecting paths in background
  useEffect(() => {
    // Schedule background hydration after initial paint
    const timer = setTimeout(() => {
      setSecondaryLoaded(true)
      gameStore.setLoadingProgress(100, 'ALL ARCHIPELAGO SECTORS SYNCHRONIZED')
    }, 60)
    return () => clearTimeout(timer)
  }, [])

  useFrame((state) => {
    // Signal essential readiness on the very first rendered frame
    if (isFirstRender.current) {
      isFirstRender.current = false
      gameStore.setEssentialReady(true)
    }

    // Respect system reduced-motion accessibility preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (worldGroupRef.current) {
      if (prefersReducedMotion) {
        worldGroupRef.current.position.y = 0
      } else {
        const t = state.clock.getElapsedTime()
        worldGroupRef.current.position.y = Math.sin(t * 0.7) * 0.08
      }
    }
  })

  return (
    <group>
      {/* Dynamic Lighting Rig */}
      <EnvironmentLighting />

      {/* Atmospheric Sky, Low-Poly Clouds & Floating Motes */}
      <SkyAndAtmosphere />

      {/* Main Floating Archipelago Group */}
      <group ref={worldGroupRef}>
        {/* Island Bedrock & Elevated Terraces */}
        <IslandTerrain />

        {/* Bridges & Inter-Island Connecting Paths (Progressively loaded) */}
        {secondaryLoaded && <ConnectingPaths />}

        {/* ========================================================
            THE 5 EXPLORABLE LOCATIONS
            ======================================================== */}
        {/* 1. Essential Main Island (Personal Workspace modeled from 3d.jpeg) */}
        <PersonalWorkspace />

        {/* Secondary Locations (Loaded progressively in background) */}
        {secondaryLoaded && (
          <>
            {/* 2. Project Lab (Creative dev & project showcase) */}
            <ProjectLab />

            {/* 3. Tech Center (Technology-themed environment for skills) */}
            <TechCenter />

            {/* 4. University Building (Academic environment for education) */}
            <UniversityBuilding />

            {/* 5. Contact Station (Welcoming communications lounge & beacon) */}
            <ContactStation />
          </>
        )}

        {/* ========================================================
            PLAYABLE 3D CHARACTER AVATAR
            ======================================================== */}
        <PlayerAvatar />

        {/* ========================================================
            INTERACTIVE 3D OBJECT ANCHORS & PROMPTS
            ======================================================== */}
        {INTERACTIVE_OBJECTS.map((obj) => (
          <InteractiveAnchor key={obj.id} item={obj} />
        ))}

        {/* ========================================================
            INTERACTIVE 3D LOCATION MARKERS (Waypoints & HTML Badges)
            ======================================================== */}
        {locationsData.map((loc) => {
          const markerY = loc.category === 'WORKSPACE' ? 4.2 : 3.4
          return (
            <LocationMarker
              key={loc.id}
              location={loc}
              position={[loc.coordinates[0], markerY, loc.coordinates[2]]}
            />
          )
        })}
      </group>
    </group>
  )
}
