import React from 'react'

export const ConnectingPaths: React.FC = () => {
  return (
    <group>
      {/* ========================================================
          BRIDGE 1: Workspace -> Project Lab (West)
          ======================================================== */}
      <group>
        {/* Curved series of low-poly floating stone/wooden planks */}
        {[-4.8, -6.5, -8.2, -9.9].map((x, idx) => {
          const z = 2.0 + idx * 0.75
          const y = -0.15 + idx * 0.1
          return (
            <group key={`bridge-west-${idx}`} position={[x, y, z]} rotation={[0, -0.4, 0]}>
              {/* Wooden Plank */}
              <mesh castShadow receiveShadow>
                <boxGeometry args={[1.5, 0.16, 0.8]} />
                <meshStandardMaterial color="#64748b" roughness={0.7} flatShading />
              </mesh>
              {/* Stepping Rock Pedestal below */}
              <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.5, 0.2, 0.7, 5]} />
                <meshStandardMaterial color="#1e293b" roughness={0.9} flatShading />
              </mesh>
              {/* Subtle edge glowing indicator */}
              <mesh position={[0.7, 0.1, 0]}>
                <boxGeometry args={[0.06, 0.04, 0.75]} />
                <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.6} />
              </mesh>
            </group>
          )
        })}
      </group>

      {/* ========================================================
          BRIDGE 2: Workspace -> Tech Center (East)
          ======================================================== */}
      <group>
        {[4.8, 6.5, 8.2, 9.9].map((x, idx) => {
          const z = 2.0 + idx * 0.75
          const y = -0.1 + idx * 0.12
          return (
            <group key={`bridge-east-${idx}`} position={[x, y, z]} rotation={[0, 0.4, 0]}>
              {/* Futuristic Glass/Steel Tech Plank */}
              <mesh castShadow receiveShadow>
                <boxGeometry args={[1.5, 0.16, 0.8]} />
                <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.4} flatShading />
              </mesh>
              <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.5, 0.2, 0.7, 5]} />
                <meshStandardMaterial color="#1e293b" roughness={0.9} flatShading />
              </mesh>
              {/* Cyan Circuit Light Line */}
              <mesh position={[-0.7, 0.1, 0]}>
                <boxGeometry args={[0.06, 0.04, 0.75]} />
                <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.8} />
              </mesh>
            </group>
          )
        })}
      </group>

      {/* ========================================================
          BRIDGE 3: Workspace -> University (North-West)
          ======================================================== */}
      <group>
        {[-3.6, -5.2, -6.8, -8.2].map((x, idx) => {
          const z = -3.8 - idx * 1.6
          const y = 0.0 + idx * 0.2
          return (
            <group key={`bridge-nw-${idx}`} position={[x, y, z]} rotation={[0, 0.75, 0]}>
              {/* Stone flagstone slab */}
              <mesh castShadow receiveShadow>
                <boxGeometry args={[1.5, 0.18, 0.9]} />
                <meshStandardMaterial color="#94a3b8" roughness={0.8} flatShading />
              </mesh>
              <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.55, 0.25, 0.8, 6]} />
                <meshStandardMaterial color="#1e293b" roughness={0.9} flatShading />
              </mesh>
              {/* Small roadside lantern post on middle stepping slab */}
              {idx === 2 && (
                <group position={[0.7, 0.5, 0]}>
                  <mesh castShadow>
                    <cylinderGeometry args={[0.05, 0.06, 0.8, 4]} />
                    <meshStandardMaterial color="#334155" flatShading />
                  </mesh>
                  <mesh position={[0, 0.45, 0]}>
                    <dodecahedronGeometry args={[0.12, 0]} />
                    <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={1} />
                  </mesh>
                </group>
              )}
            </group>
          )
        })}
      </group>

      {/* ========================================================
          BRIDGE 4: Workspace -> Contact Station (North-East)
          ======================================================== */}
      <group>
        {[3.8, 5.4, 7.0, 8.6].map((x, idx) => {
          const z = -3.5 - idx * 1.5
          const y = 0.05 + idx * 0.22
          return (
            <group key={`bridge-ne-${idx}`} position={[x, y, z]} rotation={[0, -0.75, 0]}>
              {/* Wooden / Ivory Plank */}
              <mesh castShadow receiveShadow>
                <boxGeometry args={[1.5, 0.18, 0.9]} />
                <meshStandardMaterial color="#cbd5e1" roughness={0.6} flatShading />
              </mesh>
              <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.55, 0.25, 0.8, 6]} />
                <meshStandardMaterial color="#1e293b" roughness={0.9} flatShading />
              </mesh>
              {/* Warm guiding lantern on stepping slab */}
              {idx === 2 && (
                <group position={[-0.7, 0.5, 0]}>
                  <mesh castShadow>
                    <cylinderGeometry args={[0.05, 0.06, 0.8, 4]} />
                    <meshStandardMaterial color="#334155" flatShading />
                  </mesh>
                  <mesh position={[0, 0.45, 0]}>
                    <dodecahedronGeometry args={[0.12, 0]} />
                    <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={1} />
                  </mesh>
                </group>
              )}
            </group>
          )
        })}
      </group>
    </group>
  )
}

