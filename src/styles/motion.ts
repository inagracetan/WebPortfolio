/**
 * INA.EXE — Apple-Inspired Fluid Motion System
 * Unified transition curves, spring physics, and interaction timings.
 */

// Custom cubic-bezier easing arrays for Framer Motion
export const APPLE_EASE = [0.16, 1, 0.3, 1] as const
export const APPLE_SMOOTH_EASE = [0.25, 1, 0.5, 1] as const

// Standard Apple spring dynamics
export const APPLE_SPRINGS = {
  // Tactile button / small control taps
  snappy: {
    type: 'spring',
    stiffness: 480,
    damping: 26,
    mass: 0.5,
  },
  // Dialogs, cards, popups, and drawer expansions
  modal: {
    type: 'spring',
    stiffness: 380,
    damping: 30,
    mass: 0.8,
  },
  // Floating indicators, sliding pills, and tabs
  pill: {
    type: 'spring',
    stiffness: 450,
    damping: 32,
    mass: 0.7,
  },
  // Smooth gentle camera / waypoint transitions
  gentle: {
    type: 'spring',
    stiffness: 240,
    damping: 28,
    mass: 1.0,
  },
} as const

// Precise durations according to Apple-inspired motion hierarchy
export const MOTION_DURATIONS = {
  buttonPress: 0.14,      // 140ms
  hoverTransition: 0.22,  // 220ms
  dropdown: 0.25,         // 250ms
  cardInteraction: 0.26,  // 260ms
  tabSwitch: 0.28,        // 280ms
  sectionReveal: 0.45,    // 450ms
  popupOpening: 0.52,     // 520ms
  popupClosing: 0.36,     // 360ms
  modeTransition: 0.58,   // 580ms
} as const

// Framer Motion Reusable Animation Variants

// 1. Popup / Modal Windows (Natural expansion from trigger/origin)
export const modalBackdropVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25, ease: APPLE_EASE },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.22, ease: APPLE_EASE },
  },
}

export const modalChassisVariants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
    y: 14,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATIONS.popupOpening,
      ease: APPLE_EASE,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 8,
    transition: {
      duration: MOTION_DURATIONS.popupClosing,
      ease: APPLE_EASE,
    },
  },
}

// 2. Navigation Dropdown Menus
export const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -8,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: MOTION_DURATIONS.dropdown,
      ease: APPLE_EASE,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.97,
    transition: {
      duration: 0.18,
      ease: APPLE_EASE,
    },
  },
}

// 3. Side Navigation Drawer
export const drawerVariants = {
  hidden: {
    x: '100%',
    opacity: 0.6,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 340,
      damping: 32,
      mass: 0.8,
    },
  },
  exit: {
    x: '100%',
    opacity: 0.4,
    transition: {
      duration: 0.28,
      ease: APPLE_EASE,
    },
  },
}

// 4. Staggered list items inside drawers or cards
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.05,
    },
  },
}

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: APPLE_EASE,
    },
  },
}

// 5. Button Press Feedback Props
export const BUTTON_PRESS_MOTION = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.965 },
  transition: APPLE_SPRINGS.snappy,
}

export const ICON_BUTTON_PRESS_MOTION = {
  whileHover: { scale: 1.08 },
  whileTap: { scale: 0.92 },
  transition: APPLE_SPRINGS.snappy,
}

