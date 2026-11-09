export interface BoundingBox2D {
  minX: number
  maxX: number
  minZ: number
  maxZ: number
}

export interface BoundingCircle2D {
  x: number
  z: number
  radius: number
}

export interface BridgeCorridor {
  startX: number
  startZ: number
  endX: number
  endZ: number
  width: number
}

// Island center circles (walkable ground zones)
const ISLAND_ZONES: BoundingCircle2D[] = [
  { x: 0, z: 0, radius: 6.3 }, // Central Workspace Island
  { x: -13, z: 5, radius: 4.3 }, // Project Lab Island
  { x: 13, z: 5, radius: 4.3 }, // Tech Center Island
  { x: -10, z: -11, radius: 4.4 }, // University Island
  { x: 11, z: -10, radius: 4.2 }, // Contact Station Island
]

// Connecting Bridge Corridors (walkable pathways between islands)
const BRIDGE_CORRIDORS: BridgeCorridor[] = [
  // Workspace -> Project Lab
  { startX: -4.5, startZ: 2.0, endX: -10.5, endZ: 4.8, width: 2.2 },
  // Workspace -> Tech Center
  { startX: 4.5, startZ: 2.0, endX: 10.5, endZ: 4.8, width: 2.2 },
  // Workspace -> University
  { startX: -3.5, startZ: -3.5, endX: -8.5, endZ: -9.5, width: 2.2 },
  // Workspace -> Contact Station
  { startX: 3.5, startZ: -3.5, endX: 8.5, endZ: -9.0, width: 2.2 },
]

// Solid Obstacle Boxes (walls, solid furniture, structures that block movement)
// NOTE: Specifically crafted so the Personal Workspace can be entered and explored freely!
const SOLID_OBSTACLES: BoundingBox2D[] = [
  // Personal Workspace: Pool Water Basin Basin boundary (so player walks ON the deck, not inside water)
  { minX: -2.3, maxX: -0.1, minZ: 0.3, maxZ: 1.9 },

  // Personal Workspace: Solid back wall (keeps player inside the building / on deck)
  { minX: -1.0, maxX: 2.2, minZ: -2.2, maxZ: -2.0 },
  // Personal Workspace: Desk collision (allows walking right up to the desk without clipping)
  { minX: 0.3, maxX: 1.5, minZ: -0.8, maxZ: -0.3 },
  // Personal Workspace: Bookshelf collision
  { minX: -0.8, maxX: -0.4, minZ: -1.6, maxZ: -0.4 },

  // Project Lab: Server racks
  { minX: -14.2, maxX: -11.8, minZ: 2.0, maxZ: 2.7 },

  // Tech Center: Back structural wall
  { minX: 11.2, maxX: 14.8, minZ: 3.1, maxZ: 3.4 },

  // University: Solid back wall
  { minX: -12.0, maxX: -8.0, minZ: -12.4, maxZ: -12.0 },

  // Contact Station: Antenna mast
  { minX: 10.7, maxX: 11.3, minZ: -11.4, maxZ: -10.8 },
]

// Height map evaluation to provide smooth stair and elevation transitions
export function getTerrainHeight(x: number, z: number): number {
  // Workspace ground deck
  const distWorkspace = Math.hypot(x, z)
  if (distWorkspace <= 6.3) {
    // Stepping up to the entrance deck / stairs
    if (x >= 0.0 && x <= 2.2 && z >= -1.5 && z <= 0.8) {
      return 0.5 // Upper studio floor
    }
    // Wooden pool deck
    if (x >= -2.6 && x <= 0.0 && z >= -1.5 && z <= 0.3) {
      return 0.45
    }
    return 0.35 // Base lawn & pathway
  }

  // Project Lab
  const distProject = Math.hypot(x - (-13), z - 5)
  if (distProject <= 4.3) {
    return 0.5
  }

  // Tech Center
  const distTech = Math.hypot(x - 13, z - 5)
  if (distTech <= 4.3) {
    return 0.65
  }

  // University
  const distUniversity = Math.hypot(x - (-10), z - (-11))
  if (distUniversity <= 4.4) {
    return 1.1
  }

  // Contact Station
  const distContact = Math.hypot(x - 11, z - (-10))
  if (distContact <= 4.2) {
    return 1.3
  }

  // Linear height lerp along bridges
  if (x < -4.5 && z > 1.5) {
    // Bridge to Project Lab
    const factor = Math.min(Math.max((x - (-4.5)) / (-13 - (-4.5)), 0), 1)
    return 0.35 + factor * 0.15
  }
  if (x > 4.5 && z > 1.5) {
    // Bridge to Tech Center
    const factor = Math.min(Math.max((x - 4.5) / (13 - 4.5), 0), 1)
    return 0.35 + factor * 0.3
  }
  if (x < -3.0 && z < -3.0) {
    // Bridge to University
    const factor = Math.min(Math.max((z - (-3.5)) / (-11 - (-3.5)), 0), 1)
    return 0.35 + factor * 0.75
  }
  if (x > 3.0 && z < -3.0) {
    // Bridge to Contact Station
    const factor = Math.min(Math.max((z - (-3.5)) / (-10 - (-3.5)), 0), 1)
    return 0.35 + factor * 0.95
  }

  return 0.35
}

// Distance from point to line segment
function distToSegment(px: number, pz: number, x1: number, z1: number, x2: number, z2: number): number {
  const l2 = (x2 - x1) * (x2 - x1) + (z2 - z1) * (z2 - z1)
  if (l2 === 0) return Math.hypot(px - x1, pz - z1)
  let t = ((px - x1) * (x2 - x1) + (pz - z1) * (z2 - z1)) / l2
  t = Math.max(0, Math.min(1, t))
  return Math.hypot(px - (x1 + t * (x2 - x1)), pz - (z1 + t * (z2 - z1)))
}

// Checks if position is within any walkable island or bridge
export function isPositionWalkable(x: number, z: number, playerRadius = 0.35): boolean {
  // 1. Check if inside any island zone
  for (const island of ISLAND_ZONES) {
    const d = Math.hypot(x - island.x, z - island.z)
    if (d <= island.radius - playerRadius) {
      return true
    }
  }

  // 2. Check if on any bridge corridor
  for (const bridge of BRIDGE_CORRIDORS) {
    const d = distToSegment(x, z, bridge.startX, bridge.startZ, bridge.endX, bridge.endZ)
    if (d <= bridge.width / 2) {
      return true
    }
  }

  return false
}

// Checks if position collides with any solid obstacle
export function checkObstacleCollision(x: number, z: number, playerRadius = 0.35): boolean {
  for (const box of SOLID_OBSTACLES) {
    if (
      x + playerRadius > box.minX &&
      x - playerRadius < box.maxX &&
      z + playerRadius > box.minZ &&
      z - playerRadius < box.maxZ
    ) {
      return true
    }
  }
  return false
}

// Resolves collision with sliding response
export function resolveMovement(
  currentX: number,
  currentZ: number,
  deltaX: number,
  deltaZ: number,
  playerRadius = 0.35
): [number, number] {
  const targetX = currentX + deltaX
  const targetZ = currentZ + deltaZ

  // 1. Try full movement
  if (isPositionWalkable(targetX, targetZ, playerRadius) && !checkObstacleCollision(targetX, targetZ, playerRadius)) {
    return [targetX, targetZ]
  }

  // 2. Try sliding along X axis
  if (isPositionWalkable(targetX, currentZ, playerRadius) && !checkObstacleCollision(targetX, currentZ, playerRadius)) {
    return [targetX, currentZ]
  }

  // 3. Try sliding along Z axis
  if (isPositionWalkable(currentX, targetZ, playerRadius) && !checkObstacleCollision(currentX, targetZ, playerRadius)) {
    return [currentX, targetZ]
  }

  // 4. Blocked completely
  return [currentX, currentZ]
}

