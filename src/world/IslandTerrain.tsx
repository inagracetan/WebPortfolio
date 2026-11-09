import React from 'react'

export const IslandTerrain: React.FC = () => {
  return (
    <group>
      {/* ========================================================
          1. CENTRAL MAIN ISLAND (Personal Workspace Base)
          ======================================================== */}
      <group position={[0, -0.4, 0]}>
        {/* Upper Grass Deck (Faceted Hex/Heptagon Platform) */}
        <mesh position={[0, 0, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[6.8, 6.4, 0.8, 8]} />
          <meshStandardMaterial
            color="#52796f" // Muted lush green
            roughness={0.75}
            metalness={0.08}
            flatShading
          />
        </mesh>

        {/* Lower Rocky Bedrock Strata (Inverted Cone) */}
        <mesh position={[0, -2.8, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[6.4, 0.8, 5.0, 8]} />
          <meshStandardMaterial
            color="#1e293b" // Deep navy stone
            roughness={0.9}
            metalness={0.15}
            flatShading
          />
        </mesh>

        {/* Bottom Stalactite Tip */}
        <mesh position={[0, -5.8, 0]} castShadow>
          <coneGeometry args={[0.8, 1.8, 6]} />
          <meshStandardMaterial
            color="#0f172a"
            roughness={0.95}
            flatShading
          />
        </mesh>

        {/* Embedded Cyan Crystal Veins */}
        <mesh position={[1.8, -2.2, 3.2]} rotation={[0.4, 0.2, 0.6]}>
          <octahedronGeometry args={[0.35, 0]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={0.6}
            flatShading
          />
        </mesh>
        <mesh position={[-2.4, -3.1, -1.8]} rotation={[-0.3, 0.5, -0.4]}>
          <octahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={0.6}
            flatShading
          />
        </mesh>
      </group>

      {/* ========================================================
          2. PROJECT LAB ISLAND (West)
          ======================================================== */}
      <group position={[-13, -0.2, 5]}>
        {/* Grass Deck */}
        <mesh receiveShadow castShadow>
          <cylinderGeometry args={[4.4, 4.0, 0.7, 7]} />
          <meshStandardMaterial color="#475569" roughness={0.7} flatShading />
        </mesh>
        {/* Under Rock */}
        <mesh position={[0, -2.2, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[4.0, 0.6, 3.8, 7]} />
          <meshStandardMaterial color="#1e293b" roughness={0.9} flatShading />
        </mesh>
      </group>

      {/* ========================================================
          3. TECH CENTER ISLAND (East)
          ======================================================== */}
      <group position={[13, 0.0, 5]}>
        {/* Grass Deck */}
        <mesh receiveShadow castShadow>
          <cylinderGeometry args={[4.5, 4.1, 0.7, 7]} />
          <meshStandardMaterial color="#334155" roughness={0.6} flatShading />
        </mesh>
        {/* Under Rock */}
        <mesh position={[0, -2.3, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[4.1, 0.7, 4.0, 7]} />
          <meshStandardMaterial color="#1e293b" roughness={0.9} flatShading />
        </mesh>
      </group>

      {/* ========================================================
          4. UNIVERSITY BUILDING ISLAND (North-West)
          ======================================================== */}
      <group position={[-10, 0.4, -11]}>
        {/* Grass Deck */}
        <mesh receiveShadow castShadow>
          <cylinderGeometry args={[4.6, 4.2, 0.7, 7]} />
          <meshStandardMaterial color="#52796f" roughness={0.75} flatShading />
        </mesh>
        {/* Under Rock */}
        <mesh position={[0, -2.4, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[4.2, 0.8, 4.2, 7]} />
          <meshStandardMaterial color="#1e293b" roughness={0.9} flatShading />
        </mesh>
      </group>

      {/* ========================================================
          5. CONTACT STATION ISLAND (North-East)
          ======================================================== */}
      <group position={[11, 0.6, -10]}>
        {/* Grass Deck */}
        <mesh receiveShadow castShadow>
          <cylinderGeometry args={[4.2, 3.8, 0.7, 6]} />
          <meshStandardMaterial color="#52796f" roughness={0.75} flatShading />
        </mesh>
        {/* Under Rock */}
        <mesh position={[0, -2.5, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[3.8, 0.6, 4.4, 6]} />
          <meshStandardMaterial color="#1e293b" roughness={0.9} flatShading />
        </mesh>
      </group>
    </group>
  )
}

