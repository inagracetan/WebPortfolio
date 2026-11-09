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

// Island center circles (walkable ground zones matching actual visual geometry)
const ISLAND_ZONES: BoundingCircle2D[] = [
  { x: 0, z: 0, radius: 7.2 }, // Central Workspace Island (cylinder radius 6.8 + lawn margin)
  { x: -13, z: 5, radius: 5.2 }, // Project Lab Island
  { x: 13, z: 5, radius: 5.2 }, // Tech Center Island
  { x: -10, z: -11, radius: 5.2 }, // University Island
  { x: 11, z: -10, radius: 5.0 }, // Contact Station Island
]

// Connecting Bridge Corridors:
// Extends from central island origin (0, 0) directly into each island's center to ensure
// seamless connectivity without any physics dead zones or seams.
const BRIDGE_CORRIDORS: BridgeCorridor[] = [
  // Workspace -> Project Lab (West)
  { startX: 0, startZ: 0, endX: -13, endZ: 5, width: 3.8 },
  // Workspace -> Tech Center (East)
  { startX: 0, startZ: 0, endX: 13, endZ: 5, width: 3.8 },
  // Workspace -> University (North-West)
  { startX: 0, startZ: 0, endX: -10, endZ: -11, width: 3.8 },
  // Workspace -> Contact Station (North-East)
  { startX: 0, startZ: 0, endX: 11, endZ: -10, width: 3.8 },
]

// Solid Obstacle Boxes (physical structures that block movement)
const SOLID_OBSTACLES: BoundingBox2D[] = [
  // Personal Workspace: Pool Water Basin boundary (player walks ON the deck, not inside water)
  { minX: -2.3, maxX: -0.1, minZ: 0.3, maxZ: 1.9 },

  // Personal Workspace: Solid back wall
  { minX: -1.0, maxX: 2.2, minZ: -2.2, maxZ: -2.0 },
  // Personal Workspace: Desk collision (allows walking right up to the desk without clipping)
  { minX: 0.3, maxX: 1.5, minZ: -0.8, maxZ: -0.3 },
  // Personal Workspace: Bookshelf collision
  { minX: -0.8, maxX: -0.4, minZ: -1.6, maxZ: -0.4 },

  // Project Lab: Server racks
  { minX: -14.1, maxX: -11.9, minZ: 2.1, maxZ: 2.7 },

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
  if (distWorkspace <= 7.2) {
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
  if (distProject <= 5.2) {
    return 0.5
  }

  // Tech Center
  const distTech = Math.hypot(x - 13, z - 5)
  if (distTech <= 5.2) {
    return 0.65
  }

  // University
  const distUniversity = Math.hypot(x - (-10), z - (-11))
  if (distUniversity <= 5.2) {
    return 1.1
  }

  // Contact Station
  const distContact = Math.hypot(x - 11, z - (-10))
  if (distContact <= 5.0) {
    return 1.3
  }

  // Linear height lerp along bridges
  if (x < -2.0 && z > 0.5) {
    // Bridge to Project Lab: (0, 0) -> (-13, 5)
    const factor = Math.min(Math.max((x - 0) / (-13 - 0), 0), 1)
    return 0.35 + factor * 0.15
  }
  if (x > 2.0 && z > 0.5) {
    // Bridge to Tech Center: (0, 0) -> (13, 5)
    const factor = Math.min(Math.max((x - 0) / (13 - 0), 0), 1)
    return 0.35 + factor * 0.3
  }
  if (x < -1.5 && z < -2.0) {
    // Bridge to University: (0, 0) -> (-10, -11)
    const factor = Math.min(Math.max((z - 0) / (-11 - 0), 0), 1)
    return 0.35 + factor * 0.75
  }
  if (x > 1.5 && z < -2.0) {
    // Bridge to Contact Station: (0, 0) -> (11, -10)
    const factor = Math.min(Math.max((z - 0) / (-10 - 0), 0), 1)
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
export function isPositionWalkable(x: number, z: number, playerRadius = 0.25): boolean {
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
export function checkObstacleCollision(x: number, z: number, playerRadius = 0.25): boolean {
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

// Resolves collision with sliding response and sub-stepping for smooth diagonal locomotion
export function resolveMovement(
  currentX: number,
  currentZ: number,
  deltaX: number,
  deltaZ: number,
  playerRadius = 0.25
): [number, number] {
  const targetX = currentX + deltaX
  const targetZ = currentZ + deltaZ

  // 1. Try full movement step
  if (isPositionWalkable(targetX, targetZ, playerRadius) && !checkObstacleCollision(targetX, targetZ, playerRadius)) {
    return [targetX, targetZ]
  }

  // 2. Try axis-aligned sliding
  if (isPositionWalkable(targetX, currentZ, playerRadius) && !checkObstacleCollision(targetX, currentZ, playerRadius)) {
    return [targetX, currentZ]
  }

  if (isPositionWalkable(currentX, targetZ, playerRadius) && !checkObstacleCollision(currentX, targetZ, playerRadius)) {
    return [currentX, targetZ]
  }

  // 3. Sub-stepping / fractional sliding for natural movement along angled bridge corridors
  const subSteps = 4
  for (let s = subSteps - 1; s >= 1; s--) {
    const fraction = s / subSteps
    const subX = currentX + deltaX * fraction
    const subZ = currentZ + deltaZ * fraction
    if (isPositionWalkable(subX, subZ, playerRadius) && !checkObstacleCollision(subX, subZ, playerRadius)) {
      return [subX, subZ]
    }
    if (isPositionWalkable(subX, currentZ, playerRadius) && !checkObstacleCollision(subX, currentZ, playerRadius)) {
      return [subX, currentZ]
    }
    if (isPositionWalkable(currentX, subZ, playerRadius) && !checkObstacleCollision(currentX, subZ, playerRadius)) {
      return [currentX, subZ]
    }
  }

  // 4. Blocked completely
  return [currentX, currentZ]
}
