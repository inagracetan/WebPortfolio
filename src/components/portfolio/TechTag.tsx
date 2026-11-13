import { MapPin, Smartphone } from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// Brand logos for project tech-stack tags.
//
// Policy (per official guidelines):
//   - Inline SVG for logos with simple, accurately reproducible shapes
//     (React, Vercel, Supabase, Firebase, Android, Google Maps).
//   - Branded text badges for complex logos where approximation would mislead
//     (TypeScript, JavaScript, Expo, Flutter, Dart, Java, Gradle).
//     This follows the convention already established in TechLogo.tsx.
//   - Generic Lucide icons only for non-brand descriptors
//     (GPS / Location, Cross-Platform Mobile).
// ─────────────────────────────────────────────────────────────────────────────

function BrandLogo({ name }: { name: string }) {
  const n = name.toLowerCase()

  /* ── TypeScript — official blue square badge ───────────────────── */
  if (n === 'typescript')
    return (
      <span
        className="inline-flex items-center justify-center w-3 h-3 rounded-[2px] text-[7px] font-black leading-none select-none flex-shrink-0"
        style={{ background: '#3178C6', color: '#fff' }}
        aria-hidden
      >
        TS
      </span>
    )

  /* ── JavaScript — official yellow badge ────────────────────────── */
  if (n === 'javascript')
    return (
      <span
        className="inline-flex items-center justify-center w-3 h-3 rounded-[2px] text-[7px] font-black leading-none select-none flex-shrink-0"
        style={{ background: '#F7DF1E', color: '#000' }}
        aria-hidden
      >
        JS
      </span>
    )

  /* ── React — three-orbital atom (#61DAFB) ─────────────────────── */
  if (n === 'react' || n.startsWith('react '))
    return (
      <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="2.05" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="10.5" ry="3.9" stroke="#61DAFB" strokeWidth="1.4" />
        <ellipse cx="12" cy="12" rx="10.5" ry="3.9" stroke="#61DAFB" strokeWidth="1.4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10.5" ry="3.9" stroke="#61DAFB" strokeWidth="1.4" transform="rotate(120 12 12)" />
      </svg>
    )

  /* ── Expo — dark badge (brand uses dark/wordmark on dark bg) ───── */
  if (n === 'expo' || n.startsWith('expo '))
    return (
      <span
        className="inline-flex items-center justify-center w-3 h-3 rounded-[2px] text-[6px] font-black leading-none select-none flex-shrink-0"
        style={{
          background: 'rgba(0,0,32,0.9)',
          color: '#fff',
          border: '0.5px solid rgba(255,255,255,0.25)',
        }}
        aria-hidden
      >
        EX
      </span>
    )

  /* ── Supabase — green lightning bolt (#3FCF8E) ─────────────────── */
  if (n === 'supabase')
    return (
      <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="#3FCF8E" aria-hidden>
        <path d="M14 2.5 6.5 13h5.5L10 21.5l11-13h-6L14 2.5z" />
      </svg>
    )

  /* ── Vercel — white upward triangle ────────────────────────────── */
  if (n === 'vercel')
    return (
      <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="#ffffff" aria-hidden>
        <path d="M12 2 2 21.5h20L12 2z" />
      </svg>
    )

  /* ── Flutter — branded text badge (official logo is complex SVG) ─ */
  if (n === 'flutter')
    return (
      <span
        className="inline-flex items-center justify-center w-3 h-3 rounded-[2px] text-[6px] font-black leading-none select-none flex-shrink-0"
        style={{ background: 'rgba(84,197,248,0.15)', color: '#54C5F8', border: '0.5px solid rgba(84,197,248,0.5)' }}
        aria-hidden
      >
        FL
      </span>
    )

  /* ── Dart — branded text badge ─────────────────────────────────── */
  if (n === 'dart')
    return (
      <span
        className="inline-flex items-center justify-center w-3 h-3 rounded-[2px] text-[6px] font-black leading-none select-none flex-shrink-0"
        style={{ background: 'rgba(1,117,194,0.2)', color: '#13B9FD', border: '0.5px solid rgba(1,117,194,0.5)' }}
        aria-hidden
      >
        Dt
      </span>
    )

  /* ── Firebase / Firestore / Firebase Auth / Cloud Functions ──────
     Stylised amber flame consistent with Firebase brand colors.      */
  if (
    n.includes('firebase') ||
    n === 'cloud functions' ||
    n.includes('firestore')
  )
    return (
      <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
        {/* outer flame — amber */}
        <path
          d="M12 2c0 0-5 6.5-5 12a5 5 0 0010 0c0-2.5-1.5-4.5-2.5-6-0.5 1.5-1 2.5-2.5 3.5C13 9 12 5 12 2z"
          fill="#FFA000"
        />
        {/* inner highlight — yellow */}
        <path
          d="M12 11c0 0-2 2.5-2 4a2 2 0 004 0c0-1.5-1-2.5-2-4z"
          fill="#FFCA28"
        />
      </svg>
    )

  /* ── Java — branded text badge ─────────────────────────────────── */
  if (n === 'java')
    return (
      <span
        className="inline-flex items-center justify-center w-3 h-3 rounded-[2px] text-[6px] font-black leading-none select-none flex-shrink-0"
        style={{
          background: 'rgba(248,152,32,0.15)',
          color: '#f89820',
          border: '0.5px solid rgba(248,152,32,0.5)',
        }}
        aria-hidden
      >
        Ja
      </span>
    )

  /* ── Android SDK — simplified robot head (#3DDC84) ─────────────── */
  if (n === 'android sdk')
    return (
      <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
        {/* antennae */}
        <line x1="8.5" y1="5" x2="6.5" y2="2.5" stroke="#3DDC84" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="15.5" y1="5" x2="17.5" y2="2.5" stroke="#3DDC84" strokeWidth="1.6" strokeLinecap="round" />
        {/* body */}
        <path d="M5 10a4 4 0 014-4h6a4 4 0 014 4v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6z" fill="#3DDC84" />
        {/* eyes */}
        <circle cx="9.5" cy="12" r="1.1" fill="#0b1120" />
        <circle cx="14.5" cy="12" r="1.1" fill="#0b1120" />
      </svg>
    )

  /* ── Google Maps — red location pin with white dot ─────────────── */
  if (n === 'google maps')
    return (
      <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
          fill="#EA4335"
        />
        <circle cx="12" cy="9" r="2.5" fill="#fff" />
      </svg>
    )

  /* ── Gradle — branded text badge ───────────────────────────────── */
  if (n === 'gradle')
    return (
      <span
        className="inline-flex items-center justify-center w-3 h-3 rounded-[2px] text-[6px] font-black leading-none select-none flex-shrink-0"
        style={{
          background: 'rgba(2,170,206,0.15)',
          color: '#02AACE',
          border: '0.5px solid rgba(2,170,206,0.5)',
        }}
        aria-hidden
      >
        Gr
      </span>
    )

  /* ── GPS / Location — generic MapPin (not a brand) ─────────────── */
  if (n.includes('gps') || n.includes('location'))
    return <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: '#34A853' }} aria-hidden />

  /* ── Cross-Platform Mobile — generic Smartphone ─────────────────── */
  if (n.includes('cross-platform'))
    return <Smartphone className="w-3 h-3 flex-shrink-0 text-sky-light" aria-hidden />

  /* ── No match — name-only tag ───────────────────────────────────── */
  return null
}

// ─────────────────────────────────────────────────────────────────────────────
// TechTag — compact brand logo + name pill for project cards
// Matches the existing outlined tag design; logo is omitted when unavailable.
// ─────────────────────────────────────────────────────────────────────────────
export function TechTag({ name }: { name: string }) {
  const logo = <BrandLogo name={name} />
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] px-2 py-0.5 rounded bg-deep-navy/80 border border-sky-blue/20 text-sky-light">
      {logo}
      <span>{name}</span>
    </span>
  )
}

