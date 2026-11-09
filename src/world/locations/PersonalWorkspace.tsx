import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { CherryTree, GlowingBush } from '../FoliageAndProps'
import { CherryPetals } from '../environment/CherryPetals'
import { useGameStore } from '@/hooks/useGameStore'

export const PersonalWorkspace: React.FC = () => {
  const waterRef = useRef<THREE.Mesh>(null)
  const { graphicsQuality } = useGameStore()
  const isEco = graphicsQuality === 'low'

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (waterRef.current) {
      waterRef.current.position.y = 0.1 + Math.sin(t * 2.2) * 0.012
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Falling Sakura Cherry Blossom Petals in Garden */}
      <CherryPetals count={90} areaCenter={[-2.4, 2.5, 1.6]} />
      {/* ========================================================
          1. GROUND PLATFORM & LAWN (From 3d.jpeg)
          ======================================================== */}
      {/* Base Foundation Slab */}
      <mesh position={[0, 0.15, 0]} receiveShadow castShadow>
        <boxGeometry args={[7.2, 0.3, 7.2]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} flatShading />
      </mesh>

      {/* Lush Green Lawn Segment */}
      <mesh position={[1.4, 0.32, 1.4]} receiveShadow>
        <boxGeometry args={[4.2, 0.05, 4.2]} />
        <meshStandardMaterial color="#10b981" roughness={0.7} flatShading />
      </mesh>

      {/* Dark Modern Asphalt Corner & Curb Strip */}
      <mesh position={[-2.4, 0.31, 2.4]} receiveShadow>
        <boxGeometry args={[2.2, 0.06, 2.2]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} flatShading />
      </mesh>

      {/* Textured Paved Flagstone Pathway along the pool */}
      <group position={[-0.8, 0.33, 1.8]}>
        {[-0.8, -0.4, 0.0, 0.4, 0.8, 1.2, 1.6].map((x, idx) => (
          <mesh key={idx} position={[x, 0, 0]} receiveShadow>
            <boxGeometry args={[0.36, 0.04, 0.7]} />
            <meshStandardMaterial color="#cbd5e1" roughness={0.6} flatShading />
          </mesh>
        ))}
      </group>

      {/* ========================================================
          2. LOWER TERRACE, WOODEN DECK & POOL (From 3d.jpeg)
          ======================================================== */}
      {/* Wooden Pool Deck */}
      <mesh position={[-1.2, 0.45, -0.2]} receiveShadow castShadow>
        <boxGeometry args={[2.8, 0.25, 2.6]} />
        <meshStandardMaterial color="#b45309" roughness={0.6} flatShading />
      </mesh>

      {/* 2 Reclining Sun Loungers on the Deck */}
      {[-0.4, 0.4].map((zOffset, idx) => (
        <group key={`lounger-${idx}`} position={[-1.6, 0.65, -0.2 + zOffset]} rotation={[0, Math.PI / 2, 0]}>
          {/* Seat base */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.9, 0.08, 0.38]} />
            <meshStandardMaterial color="#7dd3fc" roughness={0.4} flatShading />
          </mesh>
          {/* Reclined backrest */}
          <mesh position={[-0.32, 0.14, 0]} rotation={[0, 0, 0.45]} castShadow>
            <boxGeometry args={[0.45, 0.08, 0.38]} />
            <meshStandardMaterial color="#7dd3fc" roughness={0.4} flatShading />
          </mesh>
        </group>
      ))}

      {/* Turquoise Swimming Pool Basin */}
      <group position={[-1.2, 0.42, 1.1]}>
        {/* Pool Concrete Frame */}
        <mesh receiveShadow castShadow>
          <boxGeometry args={[2.4, 0.32, 1.8]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.4} flatShading />
        </mesh>
        {/* Animated Pool Water Volume */}
        <mesh ref={waterRef} position={[0, 0.1, 0]}>
          <boxGeometry args={[2.2, 0.2, 1.6]} />
          <meshStandardMaterial
            color="#00f0ff"
            roughness={0.05}
            metalness={0.5}
            transparent
            opacity={0.85}
          />
        </mesh>
        {/* Transparent Glass Railing around the pool */}
        <mesh position={[0, 0.35, 0.85]}>
          <boxGeometry args={[2.4, 0.35, 0.04]} />
          <meshStandardMaterial color="#38bdf8" transparent opacity={0.45} roughness={0.1} />
        </mesh>
        <mesh position={[-1.15, 0.35, 0]}>
          <boxGeometry args={[0.04, 0.35, 1.8]} />
          <meshStandardMaterial color="#38bdf8" transparent opacity={0.45} roughness={0.1} />
        </mesh>
        {/* Recessed Warm Pool Step Lights (from 3d.jpeg) */}
        {(isEco ? [-0.4, 0.4] : [-0.6, -0.2, 0.2, 0.6]).map((x, idx) => (
          <mesh key={idx} position={[x, -0.05, 0.92]}>
            <sphereGeometry args={[0.04, 6, 6]} />
            <meshStandardMaterial color="#fde047" emissive="#fde047" emissiveIntensity={1.5} />
          </mesh>
        ))}
      </group>

      {/* Stairs leading to Upper Garden / Entrance */}
      <group position={[0.4, 0.35, 1.1]}>
        {[0, 1, 2, 3].map((step) => (
          <mesh key={step} position={[0, step * 0.08, -step * 0.2]} castShadow receiveShadow>
            <boxGeometry args={[0.8, 0.08, 0.22]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.5} flatShading />
          </mesh>
        ))}
        {/* Glass Stair Railing */}
        <mesh position={[0.42, 0.32, -0.3]} rotation={[0.4, 0, 0]}>
          <boxGeometry args={[0.03, 0.35, 0.9]} />
          <meshStandardMaterial color="#38bdf8" transparent opacity={0.5} />
        </mesh>
      </group>

      {/* ========================================================
          3. GROUND FLOOR VILLA & INTERIOR WORKSPACE STUDIO
          ======================================================== */}
      <group position={[0.6, 0.5, -0.8]}>
        {/* Main Architectural White Box */}
        <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.2, 1.5, 2.8]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} flatShading />
        </mesh>

        {/* Large Corner Glass Windows Glowing Warmly */}
        {/* Front Glass Wall facing the pool */}
        <mesh position={[0, 0.75, 1.42]}>
          <planeGeometry args={[2.8, 1.3]} />
          <meshStandardMaterial
            color="#fef08a"
            emissive="#fde047"
            emissiveIntensity={0.65}
            transparent
            opacity={0.88}
            roughness={0.1}
          />
        </mesh>
        {/* Side Glass Wall facing the lawn */}
        <mesh position={[1.62, 0.75, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[2.4, 1.3]} />
          <meshStandardMaterial
            color="#fef08a"
            emissive="#fde047"
            emissiveIntensity={0.65}
            transparent
            opacity={0.88}
            roughness={0.1}
          />
        </mesh>

        {/* --- INTERIOR WORKSPACE OBJECTS (Clearly modeled inside) --- */}
        {/* Modern Oak Desk */}
        <group position={[0.2, 0.45, 0.3]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.4, 0.06, 0.7]} />
            <meshStandardMaterial color="#d97706" roughness={0.5} flatShading />
          </mesh>
          {/* Desk Metal Legs */}
          {[-0.6, 0.6].map((x, i) => (
            <mesh key={i} position={[x, -0.22, 0]} castShadow>
              <boxGeometry args={[0.06, 0.42, 0.6]} />
              <meshStandardMaterial color="#1e293b" flatShading />
            </mesh>
          ))}
          {/* Dual Screen / Laptop with glowing INA.EXE screen */}
          <group position={[0, 0.16, 0.05]}>
            {/* Screen Stand */}
            <mesh position={[0, 0, -0.05]}>
              <boxGeometry args={[0.15, 0.02, 0.12]} />
              <meshStandardMaterial color="#334155" />
            </mesh>
            {/* Monitor Panel */}
            <mesh position={[0, 0.12, 0]}>
              <boxGeometry args={[0.55, 0.32, 0.03]} />
              <meshStandardMaterial color="#0f172a" />
            </mesh>
            {/* Glowing Display */}
            <mesh position={[0, 0.12, 0.02]}>
              <planeGeometry args={[0.5, 0.28]} />
              <meshBasicMaterial color="#00f0ff" />
            </mesh>
            {/* Minimalist Keyboard & Trackpad */}
            <mesh position={[0, 0.01, 0.15]}>
              <boxGeometry args={[0.35, 0.01, 0.14]} />
              <meshStandardMaterial color="#64748b" />
            </mesh>
          </group>
          {/* Cozy Desk Lamp */}
          <group position={[0.5, 0.12, -0.1]}>
            <mesh>
              <cylinderGeometry args={[0.04, 0.06, 0.03, 8]} />
              <meshStandardMaterial color="#334155" />
            </mesh>
            <mesh position={[0, 0.1, 0]} rotation={[0, 0, -0.3]}>
              <cylinderGeometry args={[0.015, 0.015, 0.2, 6]} />
              <meshStandardMaterial color="#64748b" />
            </mesh>
            <mesh position={[-0.06, 0.2, 0]}>
              <coneGeometry args={[0.06, 0.08, 8]} />
              <meshStandardMaterial color="#fef08a" emissive="#fde047" emissiveIntensity={1} />
            </mesh>
          </group>
          {/* Coffee Mug */}
          <mesh position={[-0.45, 0.06, 0.1]}>
            <cylinderGeometry args={[0.035, 0.035, 0.08, 8]} />
            <meshStandardMaterial color="#faf8f5" />
          </mesh>
        </group>

        {/* Ergonomic Studio Chair */}
        <group position={[0.2, 0.42, 0.85]}>
          {/* Seat Cushion */}
          <mesh castShadow>
            <boxGeometry args={[0.42, 0.06, 0.4]} />
            <meshStandardMaterial color="#1e293b" flatShading />
          </mesh>
          {/* Backrest */}
          <mesh position={[0, 0.25, 0.18]} castShadow>
            <boxGeometry args={[0.38, 0.45, 0.05]} />
            <meshStandardMaterial color="#1e293b" flatShading />
          </mesh>
          {/* Pedestal */}
          <mesh position={[0, -0.18, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.32, 6]} />
            <meshStandardMaterial color="#64748b" />
          </mesh>
        </group>

        {/* Modern Bookshelf with Color-Coded Tech Books */}
        <group position={[-1.2, 0.7, -0.5]}>
          {/* Bookshelf Frame */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.3, 1.2, 1.2]} />
            <meshStandardMaterial color="#475569" flatShading />
          </mesh>
          {/* Shelves and Books */}
          {[-0.3, 0.0, 0.3].map((y, rowIdx) => (
            <group key={rowIdx} position={[0.05, y, 0]}>
              {isEco ? (
                // Eco mode: Consolidated low-poly book rows to reduce draw calls
                <mesh position={[0, 0.08, 0]} castShadow>
                  <boxGeometry args={[0.18, 0.22, 0.85]} />
                  <meshStandardMaterial color={['#38bdf8', '#10b981', '#a855f7'][rowIdx]} flatShading />
                </mesh>
              ) : (
                [-0.35, -0.2, -0.05, 0.1, 0.25, 0.4].map((z, bIdx) => {
                  const bookColors = ['#38bdf8', '#f472b6', '#fef08a', '#10b981', '#a855f7', '#f97316']
                  return (
                    <mesh key={bIdx} position={[0, 0.08, z]} castShadow>
                      <boxGeometry args={[0.18, 0.22, 0.08]} />
                      <meshStandardMaterial color={bookColors[(rowIdx + bIdx) % bookColors.length]} flatShading />
                    </mesh>
                  )
                })
              )}
            </group>
          ))}
        </group>
      </group>

      {/* ========================================================
          4. SECOND FLOOR & ROOFTOP TERRACE (From 3d.jpeg)
          ======================================================== */}
      <group position={[0.4, 2.0, -0.9]}>
        {/* Cantilevered Dark Wooden Slat Upper Room */}
        <mesh position={[-0.8, 0.6, 0.2]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 1.2, 1.8]} />
          <meshStandardMaterial color="#334155" roughness={0.7} flatShading />
        </mesh>

        {/* Panoramic Corner Upper Window with warm amber glow */}
        <mesh position={[-0.8, 0.6, 1.12]}>
          <planeGeometry args={[1.8, 0.8]} />
          <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={0.6} />
        </mesh>

        {/* Slanted Rooftop Solar Panel Array (From 3d.jpeg) */}
        <group position={[-0.8, 1.3, 0.2]} rotation={[0.25, 0, 0]}>
          <mesh castShadow>
            <boxGeometry args={[1.9, 0.06, 1.6]} />
            <meshStandardMaterial color="#1e3a8a" roughness={0.2} metalness={0.7} flatShading />
          </mesh>
          {/* Photovoltaic Grid Line Accents */}
          {(isEco ? [-0.3, 0.3] : [-0.6, -0.2, 0.2, 0.6]).map((x, i) => (
            <mesh key={i} position={[x, 0.04, 0]}>
              <boxGeometry args={[0.02, 0.02, 1.5]} />
              <meshBasicMaterial color="#60a5fa" />
            </mesh>
          ))}
        </group>

        {/* Rooftop Green Grass Terrace (From 3d.jpeg) */}
        <mesh position={[0.9, 0.05, 0.2]} receiveShadow>
          <boxGeometry args={[1.8, 0.1, 1.8]} />
          <meshStandardMaterial color="#10b981" roughness={0.7} flatShading />
        </mesh>

        {/* Transparent Glass Railing around Rooftop Terrace */}
        <mesh position={[0.9, 0.3, 1.1]}>
          <boxGeometry args={[1.8, 0.4, 0.03]} />
          <meshStandardMaterial color="#38bdf8" transparent opacity={0.45} />
        </mesh>
        <mesh position={[1.8, 0.3, 0.2]}>
          <boxGeometry args={[0.03, 0.4, 1.8]} />
          <meshStandardMaterial color="#38bdf8" transparent opacity={0.45} />
        </mesh>

        {/* Vibrant Red Patio Sun Umbrella (Iconic from 3d.jpeg) */}
        <group position={[0.9, 0.1, 0.2]}>
          {/* Pole */}
          <mesh position={[0, 0.7, 0]} castShadow>
            <cylinderGeometry args={[0.025, 0.025, 1.4, 6]} />
            <meshStandardMaterial color="#1e293b" flatShading />
          </mesh>
          {/* Red Faceted Canopy */}
          <mesh position={[0, 1.35, 0]} castShadow>
            <coneGeometry args={[0.75, 0.3, 8]} />
            <meshStandardMaterial color="#ef4444" roughness={0.4} flatShading />
          </mesh>
          {/* 2 White Rooftop Lounge Chairs */}
          <mesh position={[-0.35, 0.1, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
            <boxGeometry args={[0.6, 0.06, 0.25]} />
            <meshStandardMaterial color="#faf8f5" flatShading />
          </mesh>
          <mesh position={[0.35, 0.1, 0]} rotation={[0, -Math.PI / 2, 0]} castShadow>
            <boxGeometry args={[0.6, 0.06, 0.25]} />
            <meshStandardMaterial color="#faf8f5" flatShading />
          </mesh>
          {/* Small Drink Table */}
          <mesh position={[0, 0.08, 0.2]} castShadow>
            <cylinderGeometry args={[0.12, 0.12, 0.16, 6]} />
            <meshStandardMaterial color="#f1f5f9" flatShading />
          </mesh>
        </group>
      </group>

      {/* ========================================================
          5. SURROUNDING VEGETATION & CHERRY TREES (From 3d.jpeg)
          ======================================================== */}
      {/* Cherry Tree 1 (Left near road and pool) */}
      <CherryTree position={[-2.8, 0.3, 1.5]} scale={1.15} rotationY={0.4} />

      {/* Cherry Tree 2 (Right lawn corner) */}
      <CherryTree position={[2.6, 0.3, 1.8]} scale={1.25} rotationY={-0.6} />

      {/* Glowing Faceted Pink Bushes (Faithful to 3d.jpeg) */}
      <GlowingBush position={[-2.4, 0.4, 0.4]} scale={1.1} />
      <GlowingBush position={[0.8, 0.4, 2.4]} scale={0.9} />
      <GlowingBush position={[1.2, 0.4, 2.6]} scale={1.2} />
      <GlowingBush position={[1.6, 0.4, 2.4]} scale={0.85} />
      <GlowingBush position={[2.2, 0.4, 0.9]} scale={1.3} />
    </group>
  )
}
