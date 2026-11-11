import React, { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { useGameStore } from '@/hooks/useGameStore'
import { useSound } from '@/hooks/useSound'
import { soundEngine } from '@/utilities/audio'
import { Volume2, VolumeX, Keyboard, Monitor, Cpu, Music } from 'lucide-react'

export const SettingsModal: React.FC = () => {
  const {
    activeModal,
    closeModal,
    isSoundMuted,
    toggleMute,
    openModal,
    graphicsQuality,
    setGraphicsQuality,
  } = useGameStore()
  const {
    setMasterVolume,
    setBgmVolume,
    setSfxVolume,
    playClick,
    playInspect,
    playLocationTransition,
  } = useSound()

  const [masterVol, setMasterVolState] = useState<number>(() => Math.round(soundEngine.getMasterVolume() * 100))
  const [bgmVol, setBgmVolState] = useState<number>(() => Math.round(soundEngine.getBgmVolume() * 100))
  const [sfxVol, setSfxVolState] = useState<number>(() => Math.round(soundEngine.getSfxVolume() * 100))

  const handleMasterChange = (val: number) => {
    setMasterVolState(val)
    setMasterVolume(val / 100)
  }

  const handleBgmChange = (val: number) => {
    setBgmVolState(val)
    setBgmVolume(val / 100)
  }

  const handleSfxChange = (val: number) => {
    setSfxVolState(val)
    setSfxVolume(val / 100)
  }

  return (
    <Modal
      isOpen={activeModal === 'SETTINGS'}
      onClose={closeModal}
      title="SETTINGS // SYSTEM_CONFIGURATION.DAT"
      locationTag="SYSTEM CONFIG"
      subtitle="Volume orchestration, procedural audio effects & rendering quality"
      badge="CONFIG"
      maxWidth="lg"
    >
      <div className="space-y-5">
        {/* Master Sound & Mute Toggle */}
        <div className="p-4 bg-deep-navy/80 border border-sky-blue/20 rounded-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-sky-blue/10 border border-sky-blue/30 rounded text-electric-blue">
                {isSoundMuted ? <VolumeX className="w-5 h-5 text-warm-ivory-dim" /> : <Volume2 className="w-5 h-5" />}
              </div>
              <div>
                <h4 className="font-mono text-xs font-semibold text-warm-ivory uppercase tracking-wider">
                  Audio System State
                </h4>
                <p className="text-xs text-warm-ivory-dim font-sans">
                  {isSoundMuted ? 'All procedural audio is currently muted.' : 'Web Audio procedural synthesis active.'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={toggleMute}
              className={`px-3 py-1.5 text-xs font-mono rounded border transition-colors cursor-pointer ${
                isSoundMuted
                  ? 'bg-deep-navy border-warm-ivory/20 text-warm-ivory-dim hover:text-warm-ivory'
                  : 'bg-electric-blue text-deep-navy font-bold border-electric-blue shadow-[0_0_10px_rgba(0,240,255,0.3)]'
              }`}
            >
              {isSoundMuted ? 'UNMUTE AUDIO' : 'MUTED'}
            </button>
          </div>

          {/* Volume Sliders */}
          <div className="space-y-3 pt-2 border-t border-sky-blue/10 text-xs font-mono">
            {/* Master Volume */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-warm-ivory">Master Volume</span>
                <span className="text-electric-blue">{masterVol}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={masterVol}
                onChange={(e) => handleMasterChange(Number(e.target.value))}
                className="w-full accent-electric-blue cursor-pointer h-1.5 bg-deep-navy-surface rounded-lg appearance-none"
              />
            </div>

            {/* BGM Volume */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-warm-ivory-dim flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5 text-sky-light" />
                  <span>Ambient Music &amp; Wind</span>
                </span>
                <span className="text-sky-light">{bgmVol}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={bgmVol}
                onChange={(e) => handleBgmChange(Number(e.target.value))}
                className="w-full accent-sky-blue cursor-pointer h-1.5 bg-deep-navy-surface rounded-lg appearance-none"
              />
            </div>

            {/* SFX Volume */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-warm-ivory-dim flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-muted-green-light" />
                  <span>Sound Effects &amp; Footsteps</span>
                </span>
                <span className="text-muted-green-light">{sfxVol}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sfxVol}
                onChange={(e) => handleSfxChange(Number(e.target.value))}
                className="w-full accent-muted-green cursor-pointer h-1.5 bg-deep-navy-surface rounded-lg appearance-none"
              />
            </div>
          </div>

          {/* Audio Sample Tests */}
          <div className="pt-2 flex items-center gap-2">
            <span className="text-[10px] font-mono text-warm-ivory-dim/70">Test SFX:</span>
            <button
              type="button"
              onClick={() => playClick()}
              className="px-2 py-1 bg-deep-navy hover:bg-deep-navy-surface border border-sky-blue/20 rounded text-[10px] font-mono text-warm-ivory cursor-pointer"
            >
              Click
            </button>
            <button
              type="button"
              onClick={() => playInspect()}
              className="px-2 py-1 bg-deep-navy hover:bg-deep-navy-surface border border-sky-blue/20 rounded text-[10px] font-mono text-electric-blue cursor-pointer"
            >
              Inspect Chime
            </button>
            <button
              type="button"
              onClick={() => playLocationTransition()}
              className="px-2 py-1 bg-deep-navy hover:bg-deep-navy-surface border border-sky-blue/20 rounded text-[10px] font-mono text-muted-green-light cursor-pointer"
            >
              Transition Swell
            </button>
          </div>
        </div>

        {/* Graphics Preference */}
        <div className="p-4 bg-deep-navy/70 border border-sky-blue/20 rounded-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-blue/10 border border-sky-blue/30 rounded text-sky-light">
              <Monitor className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-mono text-xs font-semibold text-warm-ivory uppercase tracking-wider">
                Graphics &amp; Frame Rate Target
              </h4>
              <p className="text-xs text-warm-ivory-dim font-sans">
                Dynamic soft shadows, floating motes, and cherry petal particle systems.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              type="button"
              onClick={() => setGraphicsQuality('high')}
              className={`p-2 rounded text-xs font-mono border text-center transition-colors cursor-pointer ${
                graphicsQuality === 'high'
                  ? 'bg-electric-blue/15 border-electric-blue text-electric-blue font-semibold shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                  : 'bg-deep-navy border-sky-blue/15 text-warm-ivory-dim hover:text-warm-ivory'
              }`}
            >
              HIGH FIDELITY
            </button>
            <button
              type="button"
              onClick={() => setGraphicsQuality('medium')}
              className={`p-2 rounded text-xs font-mono border text-center transition-colors cursor-pointer ${
                graphicsQuality === 'medium'
                  ? 'bg-electric-blue/15 border-electric-blue text-electric-blue font-semibold shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                  : 'bg-deep-navy border-sky-blue/15 text-warm-ivory-dim hover:text-warm-ivory'
              }`}
            >
              BALANCED
            </button>
            <button
              type="button"
              onClick={() => setGraphicsQuality('low')}
              className={`p-2 rounded text-xs font-mono border text-center transition-colors cursor-pointer ${
                graphicsQuality === 'low'
                  ? 'bg-electric-blue/15 border-electric-blue text-electric-blue font-semibold shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                  : 'bg-deep-navy border-sky-blue/15 text-warm-ivory-dim hover:text-warm-ivory'
              }`}
            >
              ECO / BATTERY
            </button>
          </div>
        </div>

        {/* Quick link to Controls Guide */}
        <div className="p-3 bg-deep-navy/50 border border-sky-blue/15 rounded flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Keyboard className="w-4 h-4 text-electric-blue" />
            <span className="text-xs font-mono text-warm-ivory">Looking for input keybindings?</span>
          </div>
          <button
            type="button"
            onClick={() => openModal('CONTROLS')}
            className="px-3 py-1 bg-sky-blue/15 hover:bg-sky-blue/25 border border-sky-blue/30 text-electric-blue text-xs font-mono rounded cursor-pointer"
          >
            VIEW CONTROLS GUIDE
          </button>
        </div>

        {/* System Build Info */}
        <div className="pt-2 border-t border-sky-blue/15 flex items-center justify-between text-[11px] font-mono text-warm-ivory-dim/60">
          <span className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-muted-green-light" />
            <span>INA.EXE ENGINE // THREE.JS + REACT 19</span>
          </span>
          <span>BUILD 2026.02 // STABLE</span>
        </div>
      </div>
    </Modal>
  )
}
