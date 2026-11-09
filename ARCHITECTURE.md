# INA.EXE — Architecture & Technical Foundation (Phase 1)

> **"A Digital World of Creativity & Technology"**  
> *Tagline:* EXPLORE MY WORLD. DISCOVER MY WORK.  
> *Author:* Ina Grace Tan  
> *Stack:* React 19, TypeScript, Vite, Three.js, React Three Fiber, Drei, GSAP, Framer Motion, Tailwind CSS v4, Lucide React.

---

## 1. Visual Direction & Design System

The visual identity is modeled around a **stylized low-poly 3D indie adventure game** set in a **cozy floating island environment** with natural soft lighting and a crisp HUD interface.

### Color Tokens

| Token | Hex Value | Role & Usage |
|---|---|---|
| `sky-blue` | `#38bdf8` / `#7dd3fc` / `#0284c7` | Atmospheric highlights, water shaders, sky bounce |
| `muted-green` | `#52796f` / `#84a98c` / `#354f52` | Low-poly vegetation, grass canopy, environmental accents |
| `warm-ivory` | `#faf8f5` / `#ded6c9` / `#f0eae1` | Primary readable typography, architectural stone slabs |
| `deep-navy` | `#0b1120` / `#0f172a` / `#1e293b` | Midnight sky backdrop, island core stone, glassmorphic HUD base |
| `electric-blue` | `#00f0ff` / `#38bdf8` | Interactive beacons, button glows, active states, focus rings |

### Typography

- **Display / Headers:** `Outfit` (Bold, geometric modern game title typography)
- **Body & Controls:** `Plus Jakarta Sans` (Clean, highly legible neo-grotesque)
- **HUD & Data Readouts:** `JetBrains Mono` (Coordinates, system badges, code tags)

---

## 2. Directory Architecture

All code is strictly decoupled into distinct functional layers:

```
portfolio/
├── public/                     # Static public assets (3d.jpeg reference, icons)
├── src/
│   ├── assets/                 # Local assets & reference imagery (3d.jpeg)
│   ├── characters/             # Character configuration, player state, animation interfaces
│   │   ├── types.ts            # CharacterConfig, PlayerState, CharacterAnimationState
│   │   └── index.ts
│   ├── components/
│   │   ├── modals/             # Feature modals & system drawer
│   │   │   ├── MenuDrawer.tsx      # System directory navigation drawer
│   │   │   ├── ProjectsModal.tsx   # Project catalog with category filters & deep-dive view
│   │   │   ├── SkillsModal.tsx     # Capabilities & tech stack matrix
│   │   │   ├── ExperienceModal.tsx # Career history & education timeline
│   │   │   ├── ContactModal.tsx    # Transmission beacon & social links
│   │   │   ├── SettingsModal.tsx   # Audio, graphics & keybindings guide
│   │   │   ├── ResumeModal.tsx     # Executive CV dossier & print action
│   │   │   └── index.ts
│   │   └── ui/                 # Reusable UI component library
│   │       ├── Button.tsx          # Game-feel button (notches, hover sound, variants)
│   │       ├── Navigation.tsx      # Header HUD (Logo, Audio toggle, Settings, Resume, Menu)
│   │       ├── LoadingScreen.tsx   # Boot sequence, rotating wireframe diamond, progress bar
│   │       ├── WelcomeScreen.tsx   # Phase 1 Welcome view with exact copy & dual CTA
│   │       ├── WorldHud.tsx        # Bottom waypoint navigation & fast-travel bar
│   │       ├── InfoPanel.tsx       # Glassmorphic HUD card with corner brackets
│   │       ├── Modal.tsx           # Accessible modal container with ESC support
│   │       ├── Tooltip.tsx         # Tactile hover tooltips with keyboard shortcuts
│   │       ├── SectionLabel.tsx    # Status pulse badges & coordinates
│   │       ├── Container.tsx       # Responsive layout wrapper
│   │       └── index.ts
│   ├── data/                   # Centralized, authentic portfolio knowledge base
│   │   ├── types.ts            # Strict TypeScript interfaces
│   │   ├── projects.ts         # Portfolio projects with metrics & architectural highlights
│   │   ├── skills.ts           # 4 skill domains with mastery levels and tags
│   │   ├── experience.ts       # Career history & achievements
│   │   ├── education.ts        # Degree, academic honors & specialized certifications
│   │   ├── contact.ts          # Contact details, availability & social links
│   │   └── index.ts
│   ├── hooks/                  # Reusable React hooks
│   │   ├── useGameStore.ts     # Screen states, active modal, active location, sound store
│   │   ├── useSound.ts         # Procedural sound playback hook
│   │   ├── useKeyboardShortcuts.ts # ESC, M (Mute), H (Help), 1-5 (Fast Travel)
│   │   └── index.ts
│   ├── interactions/           # Interaction layer
│   │   ├── types.ts            # InteractableZone, InteractionKind, InteractionEvent
│   │   ├── interactionManager.ts # Event emitter / zone registry for 3D interactions
│   │   └── index.ts
│   ├── locations/              # Island waypoints registry
│   │   ├── types.ts            # LocationWaypoint schema
│   │   ├── locationsData.ts    # Atrium, Projects, Skills, Experience, Contact coordinates
│   │   └── index.ts
│   ├── styles/                 # Styling layer
│   │   └── theme.css           # Tailwind v4 @theme tokens, HUD brackets, scanlines, grid
│   ├── utilities/              # Procedural audio & helpers
│   │   ├── audio.ts            # Zero-dependency Web Audio procedural sound synthesizer
│   │   ├── constants.ts        # App configuration constants
│   │   ├── math.ts             # Lerp, clamp, coordinate formatters
│   │   └── index.ts
│   ├── world/                  # 3D Scene & Rendering Layer
│   │   ├── WorldCanvas.tsx     # R3F Canvas wrapper with soft shadows & antialiasing
│   │   ├── WorldScene.tsx      # Low-poly floating island diorama, lighting & animations
│   │   ├── CameraRig.tsx       # Dynamic lerped camera transitions between waypoints
│   │   ├── EnvironmentLighting.tsx # Natural sunlight, cool sky bounce & electric rim lights
│   │   └── index.ts
│   ├── App.tsx                 # Root scene & HUD orchestrator
│   ├── index.css               # Global CSS entry
│   └── main.tsx                # React DOM mount point
├── index.html                  # HTML template with fonts and metadata
├── package.json                # Dependencies and build scripts
├── tsconfig.json               # Root TypeScript configuration
├── tsconfig.app.json           # App TypeScript settings with '@/*' alias
└── vite.config.ts              # Vite configuration with Tailwind v4 & Rollup chunking
```

---

## 3. Screen States & User Flow

1. **`LOADING`**:
   - Boots system diagnostics, renders a rotating low-poly geometric wireframe core.
   - Smoothly progresses from 0% to 100% with simulated shader compilation logs.
   - Chimes and transitions to `WELCOME`.

2. **`WELCOME`**:
   - Displays:
     - Heading: `"HELLO, I'M INA GRACE TAN."`
     - Subtitle: `"Welcome to my little digital world."`
     - Tagline: `"An interactive space where technology, creativity, and ideas come together."`
     - Buttons: `ENTER WORLD` (enters interactive 3D perspective) & `EXPLORE PORTFOLIO` (opens project showcase).

3. **`WORLD`**:
   - Interactive 3D scene where the user can freely orbit around the stylized low-poly floating island.
   - Displays the bottom Waypoint Navigation bar (Atrium, Project Pavilion, Skill Garden, Experience Archives, Contact Beacon).
   - Hotkeys `1` through `5` trigger smooth camera transitions to each island waypoint.
   - `INSPECT` button opens the modal relevant to that waypoint.

4. **`EXPLORE`**:
   - Structured modal HUD experience allowing full inspection of Projects, Skills, Timeline, and Contact information without leaving the 3D space.

---

## 4. Audio Architecture

To prevent broken asset URLs or loading delays, a procedural sound engine (`src/utilities/audio.ts`) utilizes standard Web Audio oscillators to synthesize:
- **Hover:** Short 1200Hz micro-tick
- **Click:** Crisp 880Hz tactile select tone
- **Enter World:** 4-note ascending chord arpeggio (`C5 -> E5 -> G5 -> C6`)
- **Modal Open/Close:** Harmonic frequency sweeps
- **Mute Toggle:** Accessible via HUD button or `M` hotkey.



---

## 5. Phase 2: 3D World & Environment Architecture

### 5.1 The Explorable Locations

1. **Personal Workspace (`[0, 0, 0]`):**
   - Direct 3D physical recreation of [3d.jpeg](file:///c:/Users/Ina%20Grace/Desktop/portfolio/3d.jpeg).
   - Ground floor: Modern white cubic pavilion with warm glowing glass corner walls (`#fef08a`), wooden sun deck with 2 loungers, turquoise swimming pool with glass railings and warm recessed step lights, entry stairs, and flagstone path.
   - Interior office: Solid oak desk, ergonomic chair, dual displays with glowing `INA.EXE` screen, cozy desk lamp, coffee mug, and modern bookshelf with colorful tech books.
   - Second floor / Rooftop: Cantilevered dark wood slat upper room with panoramic glowing window, slanted solar panel array, rooftop grass lawn terrace with glass safety railings, vibrant red sun umbrella, and 2 white loungers.
   - Surroundings: Low-poly cherry blossom trees with faceted pink canopy, glowing pink faceted bushes, and dark asphalt corner road.

2. **Project Lab (`[-13, 0.4, 5]`):**
   - High-tech open platform with a rotating central holographic project core and glowing orbit rings.
   - 4 holographic project display pedestals with floating wireframe geometric previews.
   - Dual server rack towers with blinking green and cyan LED status indicators.
   - Glass overlook railing looking out onto the cloud sea.

3. **Tech Center (`[13, 0.6, 5]`):**
   - Geometric steel and glass pavilion with tinted cyan canopy.
   - Central quantum data crystal spire floating above an octagonal plinth.
   - Four skill category monoliths (React/TypeScript, Three.js/R3F, Node/APIs, UI/UX Design).
   - Glowing floor circuit traces and sage/pine foliage.

4. **University Building (`[-10, 1.0, -11]`):**
   - Scholarly academic campus hall with 4 portico columns and geometric pediment.
   - Academic graduation honors monument featuring a golden honors plaque and stylized graduation cap.
   - Outdoor study terrace with wooden library table, bench, and books.
   - Classical flagstone terrace deck with surrounding trees and scholarly boulder accents.

5. **Contact Station (`[11, 1.2, -10]`):**
   - Elevated transmission observatory platform.
   - High-altitude communication lattice spire with a rotating parabolic radar dish and pulsing radio wave rings.
   - Welcoming collaboration lounge with curved modern bench, coffee table, and an electronic letterbox / inbox terminal.
   - Overlook deck with path lanterns and cherry blossom trees.

### 5.2 Environmental Decor & Paths

- **Connecting Paths:** Wooden plank bridges, futuristic steel/glass skyways, flagstone stepping arches, and modern path lantern posts linking the central workspace to the four outer islands.
- **Sky & Atmosphere:** Twilight sky dome, 6 drifting low-poly cloud clusters, 140 ambient glowing cyan dust particles / fireflies, and distant floating mini-islands.
- **Interactive 3D Location Markers:** Floating crystal beacons with spinning rings and Drei `<Html>` interactive buttons with hover sound feedback and camera focus transitions.


---

## 6. Phase 3: Character, Movement & Camera System

### 6.1 Character Design & Locomotion

- **Avatar Mesh (`src/characters/PlayerAvatar.tsx`):**
  - Stylized low-poly explorer with a warm ivory head, electric blue glowing visor strip, explorer hood, deep navy tunic with waist belt, flowing electric blue scarf, adventure backpack with sensor crystal, and boots.
  - Floating companion light orb hovering over the player's shoulder.
- **Procedural Animations:**
  - **Idle:** Gentle vertical breathing oscillation (`sin(t * 2.5)`), companion light orb bobbing.
  - **Walking:** Forward body lean (0.12 rad), hip bounce (`|sin(phase)| * 0.06`), alternating leg stride (`sin(phase) * 0.52`), and counter-arm swing (`-sin(phase) * 0.42`).
  - **Running (`Shift`):** Increased stride frequency (14 rad/s), enhanced forward lean (0.22 rad), larger limb amplitudes, and fluttering scarf.
  - Fluid linear interpolation (`THREE.MathUtils.lerp`) between states.

### 6.2 Movement & Camera-Relative Navigation

- **Controller (`src/characters/useCharacterController.ts`):**
  - Inputs: Desktop (`WASD`, Arrow keys, `Shift`), Mobile virtual joystick (`touchControlsStore`).
  - Camera-relative translation: Movement vectors are dynamically transformed based on the camera's horizontal azimuth angle, ensuring `W` always propels the character forward relative to the viewer's gaze.
  - Speeds: Walk (4.5 units/s), Sprint (8.0 units/s).
  - Smooth slerp rotation towards the movement vector.

### 6.3 Collision Detection & Terrain Height System

- **Collision Engine (`src/characters/collisionSystem.ts`):**
  - 5 island boundary circles + 4 bridge corridors ensure the player stays safely on walkable terrain.
  - Solid obstacle boxes for structural walls, pool water basin, and large server units.
  - Personal Workspace is intentionally designed with an open entrance and clear pathways around the desk, chair, and bookshelf for unrestricted indoor exploration.
  - Sliding response: Resolves collisions by decomposing movement vectors against obstacles to prevent sticking or glitching.
  - Dynamic terrain height map (`getTerrainHeight`) smoothly elevates the avatar across steps, decks, and bridges.

### 6.4 Third-Person Camera Tracking

- **Camera Rig (`src/world/CameraRig.tsx`):**
  - **Third-Person Follow Mode:** Camera smoothly trails behind the avatar, targeting chest height with damped lerp tracking.
  - Clamped polar angles (`PI / 6` to `PI / 2.15`) prevent camera clipping below terrain or through floors.
  - Toggle between Follow Mode and Free Orbit anytime (`V` hotkey or HUD button).

### 6.5 Proximity Interactions & Mobile Controls

- **Proximity Detection (`src/interactions/useProximityInteractions.ts`):**
  - Detects when within range (~2.8 units) of the Studio Workstation, Project Lab Core, Tech Center Crystal, University Monument, or Contact Station.
  - Displays the floating `[E] INTERACT` HUD prompt ([InteractionPrompt.tsx](file:///c:/Users/Ina%20Grace/Desktop/portfolio/src/components/ui/InteractionPrompt.tsx)).
- **Mobile Touch Controls ([MobileControls.tsx](file:///c:/Users/Ina%20Grace/Desktop/portfolio/src/components/ui/MobileControls.tsx)):**
  - Virtual touch joystick on the bottom-left with dynamic knob tracking.
  - Dedicated `[E / INTERACT]` and `[RUN]` sprint buttons on bottom-right.
- **Minimap Radar ([Minimap.tsx](file:///c:/Users/Ina%20Grace/Desktop/portfolio/src/components/ui/Minimap.tsx)):**
  - Corner radar displaying archipelago islands, location nodes, and real-time player position with heading indicator.


---

## 7. Phase 4: Interactive Locations & Objects

### 7.1 Interactive Object Registry (`src/interactions/interactiveObjectsData.ts`)

Every location features 3D in-world interactive anchors ([InteractiveAnchor.tsx](file:///c:/Users/Ina%20Grace/Desktop/portfolio/src/world/environment/InteractiveAnchor.tsx)) that display floating visual indicators and Drei `<Html>` prompts when approached:

1. **Personal Workspace (Based on `3d.jpeg`):**
   - **Workstation Laptop:** Opens **About Me Modal** ([AboutMeModal.tsx](file:///c:/Users/Ina%20Grace/Desktop/portfolio/src/components/modals/AboutMeModal.tsx)) presenting biography, design pillars, and engineering philosophy.
   - **Developer Notebook:** Opens **Personal Profile Modal** ([PersonalProfileModal.tsx](file:///c:/Users/Ina%20Grace/Desktop/portfolio/src/components/modals/PersonalProfileModal.tsx)) with fast facts, daily toolchains, timezone, and work style.
   - **Studio Bookshelf:** Opens **Education & Academic Foundations** ([ExperienceModal.tsx](file:///c:/Users/Ina%20Grace/Desktop/portfolio/src/components/modals/ExperienceModal.tsx)).
   - **Framed Credentials:** Opens **Courses & Specializations** ([CoursesModal.tsx](file:///c:/Users/Ina%20Grace/Desktop/portfolio/src/components/modals/CoursesModal.tsx)) detailing Three.js Journey, Enterprise React, and WCAG AAA Accessibility accreditations.
   - **Rooftop Terrace Lounge:** Opens **Featured Projects Showcase**.
   - **Poolside Lounger:** Triggers **Poolside Relaxation** mode with chill ambient chimes.

2. **Project Lab:**
   - **4 Project Display Pedestals:** Opens dedicated **Project Detail Modals** ([ProjectDetailModal.tsx](file:///c:/Users/Ina%20Grace/Desktop/portfolio/src/components/modals/ProjectDetailModal.tsx)) for `INA.EXE World`, `SynthFlow Workspace`, `Aether Component System`, and `Prism Vision Explorer` with architecture breakdowns, metrics, features, repository, and demo links.
   - **Central Holographic Core:** Opens the full project catalog.

3. **Tech Center:**
   - **4 Skill Monoliths:** Opens dedicated **Skill Domain Modals** ([SkillDetailModal.tsx](file:///c:/Users/Ina%20Grace/Desktop/portfolio/src/components/modals/SkillDetailModal.tsx)) for Frontend Architecture, 3D & Creative Tech, Backend Systems, and UI/UX Design with proficiency meters and production notes.
   - **Quantum Skill Spire:** Opens the holistic capabilities matrix.

4. **University Building:**
   - **Graduation Honors Monument:** Displays Computer Science degree, Cum Laude honors, and Capstone research.
   - **Scholarly Study Table:** Displays coursework in Human-Computer Interaction (HCI) and Interactive Computer Graphics.

5. **Contact Station:**
   - **Transmission Letterbox:** Instant email copying, direct communication link, and availability status.
   - **Satellite Dish Console:** Direct social coordinates (GitHub, LinkedIn, Twitter/X).
   - **Executive Dossier Tablet:** Full curriculum vitae summary and PDF print request action.

### 7.2 Proximity & Inspection Engine (`src/interactions/useObjectInspection.ts`)

- Seamlessly tracks distance between the player avatar and all registered interactive objects.
- Displays the responsive bottom-center prompt ([InteractionPrompt.tsx](file:///c:/Users/Ina%20Grace/Desktop/portfolio/src/components/ui/InteractionPrompt.tsx)) with `[E] <PROMPT>` and object details.
- Pressing `E` or clicking on the 3D in-world floating indicator opens the inspection panel.
- On mobile, the dedicated `[E]` button pulses and triggers the inspection with tactile haptics.
- All modals can be closed via the close button, clicking the backdrop, or pressing `Escape`.
