import type { InteractionEvent, InteractableZone } from './types'

type InteractionListener = (event: InteractionEvent) => void

class InteractionManager {
  private listeners: Set<InteractionListener> = new Set()
  private zones: Map<string, InteractableZone> = new Map()
  private activeZoneId: string | null = null

  public registerZone(zone: InteractableZone): () => void {
    this.zones.set(zone.id, zone)
    return () => {
      this.zones.delete(zone.id)
    }
  }

  public getZone(zoneId: string): InteractableZone | undefined {
    return this.zones.get(zoneId)
  }

  public getAllZones(): InteractableZone[] {
    return Array.from(this.zones.values())
  }

  public subscribe(listener: InteractionListener): () => void {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  public trigger(zoneId: string, payload?: unknown): void {
    const zone = this.zones.get(zoneId)
    if (!zone) return

    const event: InteractionEvent = {
      zoneId,
      kind: zone.interactionKind,
      payload: payload ?? zone.targetPayload,
      timestamp: Date.now(),
    }

    this.listeners.forEach((listener) => listener(event))
  }

  public setActiveZone(zoneId: string | null): void {
    this.activeZoneId = zoneId
  }

  public getActiveZoneId(): string | null {
    return this.activeZoneId
  }
}

export const interactionManager = new InteractionManager()

