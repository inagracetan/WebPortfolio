export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max)
}

export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor
}

export function formatCoordinate(val: number): string {
  return (val >= 0 ? '+' : '') + val.toFixed(2)
}

export function formatVector3([x, y, z]: [number, number, number]): string {
  return `[${formatCoordinate(x)}, ${formatCoordinate(y)}, ${formatCoordinate(z)}]`
}

