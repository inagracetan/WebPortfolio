# INA.EXE — A Digital World of Creativity & Technology

> **An interactive 3D indie adventure game-inspired portfolio created by Ina Grace Tan.**
> Built with React 19, TypeScript, Three.js, React Three Fiber, Framer Motion, and Tailwind CSS.

---

## 🎮 Overview

**INA.EXE** reimagines the traditional developer portfolio as a cozy, stylized low-poly floating archipelago. Visitors can explore the world as a third-person avatar or browse every piece of documentation directly through a recruiter-focused navigation menu.

The centerpiece location—the **Personal Workspace**—is an architectural 3D recreation of the modern villa visual reference in `3d.jpeg`, complete with swimming pool, sun deck, cantilevered upper studio, rooftop solar panels, red patio umbrella, and cherry blossom trees with falling sakura petals.

---

## 🗺️ Explorable World Locations

| Location | Theme / Island | Interactive Focus |
|---|---|---|
| **1. Personal Workspace** | Modern Low-Poly Villa (inspired by `3d.jpeg`) | About Me, background summary, academic track & fast facts |
| **2. Project Lab** | Creative Tech Workshop & Pedestals | Featured technical projects, capstone, mobile apps & systems |
| **3. Tech Center** | Technology Monoliths | Technical skills matrix across 5 verified domains |
| **4. University Building** | Academic Pavilion | Degree in BS Information Technology, Data Networking & coursework |
| **5. Contact Station** | Communications Terminal | Contact form, email, GitHub, LinkedIn & availability |

---

## 🕹️ Controls & Navigation

### Desktop
* **`W` / `↑`**: Move forward
* **`S` / `↓`**: Move backward
* **`A` / `←`**: Move left
* **`D` / `→`**: Move right
* **`Shift`**: Sprint
* **`E`**: Interact with nearby objects / pedestals
* **`V`**: Toggle camera mode (Follow Character vs. Free Orbit)
* **`1` – `5`**: Fast travel directly to any island waypoint
* **`0` / `Home`**: Return to spawn point (Personal Workspace)
* **`M`**: Mute / Unmute audio
* **`H`**: Open system settings & audio sliders
* **`C`**: Open Controls Guide
* **`ESC`**: Close active modal window

### Mobile & Touch Devices
* **Virtual Joystick**: Clamped dynamic touch joystick on the bottom-left for character movement.
* **`[E]` Action Button**: Dynamic glowing button that pulses when near an interactive object.
* **`[⚡]` Sprint Button**: Toggle walk/sprint speed.
* **Quick Menu Button**: Dedicated thumb-accessible button to immediately open the recruiter directory.
* **Haptic Feedback**: Subtle vibration cues on interactions (supported mobile devices).
* **Elevated HUD**: Bottom waypoint carousel elevated above touch controls to prevent finger collisions.

---

## 🎵 Procedural Web Audio Engine

* **No external audio files**: 100% synthesized in real time via the HTML5 Web Audio API using custom oscillator networks, biquad filter sweeps, and gain curves.
* **Ambient Background Soundscape**: Warm layered chord pads with procedural white-noise wind sweeps.
* **Dynamic SFX**: Synthesized interaction chimes, button clicks, waypoint transition swells, and throttled walking footsteps.
* **User Control**: Never autoplays before user gesture. Includes independent sliders in **Settings** for Master, Ambient Music, and Sound Effects.

---

## ⚡ Performance & Mobile Optimization

* **Adaptive Fidelity Settings (`High` vs. `Eco`)**:
  * **Device Pixel Ratio (DPR)**: `[1, 2]` on High vs. `[1, 1.25]` on Eco.
  * **Shadow Maps**: 2048px on High vs. 1024px on Eco. Point light shadows disabled in Eco mode.
  * **Dynamic Geometry**: In Eco mode, bookshelf meshes, pool step lights, and particle systems automatically consolidate to minimize WebGL draw calls.
  * **Automatic Mobile Detection**: Devices with screen width `< 768px` automatically boot in Eco mode.
* **Accessibility & Inclusive Design**:
  * `prefers-reduced-motion` compliance across 3D island animations, particle systems, and modal animations.
  * Screen reader accessible landmarks (`role="main"`, `role="dialog"`, `role="progressbar"`, `aria-label`).
  * High-contrast typography and min-touch target sizing (`min-w-[40px] min-h-[40px]`).
* **Recruiter Fast Access**: Recruiters can bypass 3D controls at any time using the top header, the **Menu Drawer**, or the **Direct Portfolio View** on the welcome screen.

---

## 🎓 Verified Portfolio Information

All content reflects the verified academic and professional record of **Ina Grace Tan**:

* **Degree**: Bachelor of Science in Information Technology (BS IT)
* **Specialization**: Data Networking
* **Institution**: Central Mindanao University, Musuan, Maramag, Bukidnon, Philippines
* **Work Experience**: Freelance Data Entry Assistant (January 2025 – January 2026, Remote)
* **Featured Projects**:
  1. *MusuanTrack* — Campus Navigation App (Main Developer // Group Project, Flutter/Dart)
  2. *CMU Faculty Availability & Appointment System* — Academic Capstone Project
  3. *Flutter & Firebase Real-Time Scheduling System* — Mobile & Cloud persistence
  4. *Security Risk Management Analysis* — Academic cybersecurity & threat modeling report
  5. *Automated Payroll & HR System for EC Mabao Corporation* — Group system analysis & technical documentation
* **Education & Training**:
  * BS IT (Data Networking), Central Mindanao University
  * AWS Academy Cloud Coursework (Academic curriculum)
  * AWS Academy Cloud Security Coursework (Academic curriculum)
  * Active Directory Fundamentals (System Administration)

---

## 🛠️ Tech Stack

* **Framework**: React 19 + TypeScript + Vite 8
* **3D Engine**: Three.js + React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`)
* **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
* **Motion & Animation**: Framer Motion + GSAP
* **Icons**: Lucide React
* **Code Quality**: Oxlint + TypeScript strict mode

---

## 🚀 Getting Started Locally

### Prerequisites
* Node.js 18+ or 20+ installed
* npm (bundled with Node)

### Installation
```bash
# Clone or navigate to the project directory
cd portfolio

# Install dependencies
npm install

# Start local development server
npm run dev
```
Open `http://localhost:5173` in your browser.

### Quality Verification Commands
```bash
# Run lightning-fast Oxlint check (0 warnings, 0 errors)
npm run lint

# Run TypeScript type check and production build
npm run build

# Preview the local production build
npm run preview
```

---

## 🌐 Free Deployment Instructions

The project is built with relative base paths (`base: './'`) and client-side routing fallback configurations for all major static hosting providers.

### Option 1: Vercel (Recommended)
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset will be automatically detected as **Vite**.
5. Click **Deploy**. Vercel will use the included `vercel.json` configuration for SPA rewrites and asset caching.

### Option 2: Netlify
1. Sign in to [Netlify](https://netlify.com) and select **"Add new site" > "Import an existing project"**.
2. Connect your GitHub repository.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click **Deploy Site**. Netlify will use the bundled `netlify.toml` for redirect rules.

### Option 3: GitHub Pages
An automated GitHub Actions workflow is provided in `.github/workflows/deploy.yml`.
1. Push your code to your `main` or `master` branch on GitHub.
2. In your GitHub repository, navigate to **Settings > Pages**.
3. Under **Build and deployment > Source**, select **GitHub Actions**.
4. Every push to `main` will automatically trigger the workflow and deploy the latest build to `https://<username>.github.io/<repository-name>/`.

---

## 📁 Project Structure

```
portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated GitHub Pages CI/CD workflow
├── public/
│   ├── 3d.jpeg                   # Visual reference for Personal Workspace
│   └── favicon.svg               # SVG Favicon
├── src/
│   ├── characters/               # Player avatar, animations, controller & touch store
│   │   ├── PlayerAvatar.tsx
│   │   ├── collisionSystem.ts
│   │   ├── touchControlsStore.ts
│   │   ├── useCharacterController.ts
│   │   └── useCharacterStore.ts
│   ├── components/
│   │   ├── modals/               # In-depth dossier & inspection modals (13 modals)
│   │   └── ui/                   # HUD, Minimap, Virtual Joystick, Modals, Navigation
│   ├── data/                     # 100% verified portfolio content (Projects, Skills, etc.)
│   │   ├── contact.ts
│   │   ├── education.ts
│   │   ├── experience.ts
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   └── types.ts
│   ├── hooks/                    # Global pub-sub game store & sound hook
│   │   ├── useGameStore.ts
│   │   ├── useKeyboardShortcuts.ts
│   │   └── useSound.ts
│   ├── interactions/             # Proximity detection & 3D inspection triggers
│   │   ├── interactiveObjectsData.ts
│   │   └── useObjectInspection.ts
│   ├── locations/                # Waypoint coordinates & location metadata
│   ├── utilities/                # Web Audio API engine & constants
│   │   ├── audio.ts
│   │   └── constants.ts
│   ├── world/                    # 3D canvas, scene, lighting, atmosphere & islands
│   │   ├── CameraRig.tsx
│   │   ├── EnvironmentLighting.tsx
│   │   ├── FoliageAndProps.tsx
│   │   ├── LocationMarker.tsx
│   │   ├── SkyAndAtmosphere.tsx
│   │   ├── WorldCanvas.tsx
│   │   ├── WorldScene.tsx
│   │   ├── environment/
│   │   │   └── CherryPetals.tsx
│   │   └── locations/
│   │       ├── ContactStation.tsx
│   │       ├── PersonalWorkspace.tsx
│   │       ├── ProjectLab.tsx
│   │       ├── TechCenter.tsx
│   │       └── UniversityBuilding.tsx
│   ├── App.tsx                   # Main layout container
│   ├── index.css                 # Global styles & scanlines
│   └── main.tsx
├── netlify.toml                  # Netlify deployment configuration
├── vercel.json                   # Vercel deployment configuration
├── vite.config.ts                # Vite build configuration with chunking & relative base
└── package.json
```

---

## 📄 License & Attribution

Designed and developed by **Ina Grace Tan**. All architectural 3D models and procedural soundscapes are custom-built for **INA.EXE**.
All rights reserved © 2026.
