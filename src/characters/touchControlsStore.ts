interface TouchControlsState {
  joystickVector: { x: number; y: number }
  isSprinting: boolean
  interactRequested: boolean
}

let touchState: TouchControlsState = {
  joystickVector: { x: 0, y: 0 },
  isSprinting: false,
  interactRequested: false,
}

type TouchListener = (state: TouchControlsState) => void
const touchListeners = new Set<TouchListener>()

function notify() {
  touchListeners.forEach((l) => l({ ...touchState }))
}

export const touchControlsStore = {
  getState: () => touchState,
  setJoystickVector: (x: number, y: number) => {
    touchState.joystickVector = { x, y }
    notify()
  },
  setSprinting: (sprint: boolean) => {
    touchState.isSprinting = sprint
    notify()
  },
  triggerInteract: () => {
    touchState.interactRequested = true
    notify()
    setTimeout(() => {
      touchState.interactRequested = false
      notify()
    }, 100)
  },
}

