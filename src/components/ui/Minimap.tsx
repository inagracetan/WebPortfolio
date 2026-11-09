import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Map, ChevronUp, ChevronDown } from 'lucide-react'
import { useCharacterStore } from '@/characters/useCharacterStore'
import { locationsData } from '@/locations/locationsData'
import { soundEngine } from '@/utilities/audio'

export const Minimap: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true)
  const { playerPosition, playerRotation, teleportTo } = useCharacterStore()

  const mapScale = 3.6 // 1 world unit = 3.6 minimap pixels
  const centerOffset = 64 // 128x128 map center

  // Convert world coordinates [x, z] to minimap [mx, my]
  const toMinimap = (x: number, z: number) => {
    return {
      x: centerOffset + x * mapScale,
      y: centerOffset + z * mapScale,
    }
  }

  const playerDot = toMinimap(playerPosition[0], playerPosition[2])

  return (
    <div className="fixed top-20 right-4 z-40 hidden sm:block pointer-events-auto select-none">
      <div className="bg-deep-navy-card/90 border border-sky-blue/30 rounded-sm shadow-xl backdrop-blur-xl overflow-hidden hud-corner-tl hud-corner-br">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-deep-navy/80 border-b border-sky-blue/15 text-[10px] font-mono text-sky-light">
          <div className="flex items-center gap-1.5">
            <Map className="w-3 h-3 text-electric-blue" />
            <span className="font-bold tracking-wider">RADAR // ARCHIPELAGO</span>
          </div>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-warm-ivory-dim hover:text-electric-blue transition-colors cursor-pointer"
            aria-label="Toggle minimap"
          >
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Minimap Viewport */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 128, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="relative w-32 h-32 bg-deep-navy/95 overflow-hidden"
            >
              {/* Radar sweep lines & concentric circles */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-24 h-24 rounded-full border border-sky-blue" />
                <div className="absolute w-16 h-16 rounded-full border border-sky-blue" />
                <div className="absolute w-full h-[1px] bg-sky-blue" />
                <div className="absolute h-full w-[1px] bg-sky-blue" />
              </div>

              {/* 5 Island Location Nodes */}
              {locationsData.map((loc) => {
                const nodePos = toMinimap(loc.coordinates[0], loc.coordinates[2])
                return (
                  <button
                    key={loc.id}
                    type="button"
                    title={`${loc.name} (Click to warp)`}
                    onClick={() => {
                      soundEngine.playClick()
                      teleportTo(loc.coordinates)
                    }}
                    style={{
                      left: `${nodePos.x}px`,
                      top: `${nodePos.y}px`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className="absolute w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-transform hover:scale-150 cursor-pointer group"
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: loc.color }}
                    />
                  </button>
                )
              })}

              {/* Player Avatar Blip with Heading Arrow */}
              <div
                style={{
                  left: `${playerDot.x}px`,
                  top: `${playerDot.y}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="absolute z-10 pointer-events-none"
              >
                {/* Heading Arrow */}
                <div
                  style={{
                    transform: `rotate(${playerRotation + Math.PI}rad)`,
                  }}
                  className="w-3.5 h-3.5 flex items-center justify-center"
                >
                  <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[6px] border-b-electric-blue" />
                </div>
                {/* Center Blip */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-electric-blue shadow-[0_0_8px_rgba(0,240,255,1)] animate-ping" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

