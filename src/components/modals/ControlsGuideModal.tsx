import React from 'react'
import { Modal } from '@/components/ui/Modal'
import { useGameStore } from '@/hooks/useGameStore'
import { Keyboard, Smartphone, Sparkles } from 'lucide-react'

export const ControlsGuideModal: React.FC = () => {
  const { activeModal, closeModal } = useGameStore()

  const desktopControls = [
    {
      action: 'Locomotion / Movement',
      keys: ['W', 'A', 'S', 'D'],
      subkeys: ['ARROWS'],
      description: 'Navigate character across island paths, stairs & bridges',
    },
    {
      action: 'Sprint / Run',
      keys: ['SHIFT'],
      description: 'Hold while moving to sprint at 8 m/s with motion lean',
    },
    {
      action: 'Inspect / Interact',
      keys: ['E'],
      description: 'Interact with laptops, terminals, pedestals, and monoliths',
    },
    {
      action: 'Camera View Mode',
      keys: ['V'],
      description: 'Toggle between Third-Person Follow Camera & Free Orbit View',
    },
    {
      action: 'Island Fast Travel',
      keys: ['1', '2', '3', '4', '5'],
      description: 'Direct teleport to Workspace, Lab, Tech, University, or Contact',
    },
    {
      action: 'Audio Mute Toggle',
      keys: ['M'],
      description: 'Mute/unmute procedural ambient music and sound effects',
    },
    {
      action: 'Settings & Keybindings',
      keys: ['H'],
      description: 'Open system settings, volume sliders & graphics mode',
    },
    {
      action: 'Close / Cancel',
      keys: ['ESC'],
      description: 'Close active information panel, drawer or prompt',
    },
    {
      action: 'Camera Orbit & Zoom',
      keys: ['MOUSE DRAG', 'WHEEL'],
      description: 'Pan around character & adjust view distance',
    },
  ]

  const mobileControls = [
    {
      control: 'Virtual Joystick',
      gesture: 'Touch & Drag (Left)',
      detail: '360° directional character locomotion and speed control',
    },
    {
      control: 'Sprint Button [⚡]',
      gesture: 'Hold (Bottom Right)',
      detail: 'Sprint mode for fast traversal between islands',
    },
    {
      control: 'Interact Button [E]',
      gesture: 'Tap (Bottom Right)',
      detail: 'Inspects nearby interactive objects and opens portfolio dossiers',
    },
    {
      control: 'Camera Orbit',
      gesture: 'One-Finger Drag',
      detail: 'Rotate 3D perspective to explore islands from any vantage',
    },
  ]

  return (
    <Modal
      isOpen={activeModal === 'CONTROLS'}
      onClose={closeModal}
      title="CONTROLS // INPUT_MAPPINGS.DAT"
      subtitle="Complete input mappings for desktop keyboard and mobile touch exploration"
      badge="FIELD MANUAL"
      locationTag="NAVIGATION TERMINAL"
      maxWidth="3xl"
    >
      <div className="space-y-6">
        {/* Desktop Controls Matrix */}
        <div>
          <h4 className="font-mono text-xs text-sky-light font-semibold tracking-wider mb-3 flex items-center gap-2 uppercase">
            <Keyboard className="w-4 h-4 text-electric-blue" />
            <span>Desktop Keyboard &amp; Mouse Controls</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {desktopControls.map((item, idx) => (
              <div
                key={idx}
                className="p-3 bg-deep-navy/70 border border-sky-blue/15 rounded flex flex-col justify-between gap-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-warm-ivory font-mono">
                    {item.action}
                  </span>
                  <div className="flex items-center gap-1">
                    {item.keys.map((k) => (
                      <kbd
                        key={k}
                        className="px-2 py-0.5 bg-sky-blue/15 border border-sky-blue/30 text-electric-blue rounded font-mono font-bold text-[11px] shadow-sm"
                      >
                        {k}
                      </kbd>
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-warm-ivory-dim/80 font-sans">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Touch Controls Matrix */}
        <div>
          <h4 className="font-mono text-xs text-sky-light font-semibold tracking-wider mb-3 flex items-center gap-2 uppercase">
            <Smartphone className="w-4 h-4 text-muted-green-light" />
            <span>Mobile &amp; Touch Controls</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {mobileControls.map((m, idx) => (
              <div
                key={idx}
                className="p-3 bg-deep-navy/60 border border-sky-blue/15 rounded space-y-1"
              >
                <div className="flex justify-between items-center font-mono">
                  <span className="font-bold text-warm-ivory">{m.control}</span>
                  <span className="text-[10px] text-muted-green-light bg-muted-green/15 px-2 py-0.5 rounded">
                    {m.gesture}
                  </span>
                </div>
                <p className="text-[11px] text-warm-ivory-dim/80 font-sans">
                  {m.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recruiter Quick Tip */}
        <div className="p-3.5 bg-sky-blue/10 border border-sky-blue/30 rounded flex items-start gap-2.5 text-xs text-warm-ivory-dim">
          <Sparkles className="w-4 h-4 text-electric-blue flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <span className="font-mono font-bold text-electric-blue mr-1">Direct Recruiter Access:</span>
            Prefer not to roam the 3D environment? You can open any portfolio section directly via the
            <strong className="text-warm-ivory"> MENU</strong> in the top header or use number keys <strong className="text-electric-blue font-mono">[1-5]</strong> for instant waypoint fast travel.
          </p>
        </div>
      </div>
    </Modal>
  )
}
