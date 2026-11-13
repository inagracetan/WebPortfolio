import { useState } from 'react'
import { ExternalLink, ShieldCheck } from 'lucide-react'

interface CredlyBadgeProps {
  badgeId: string
  title: string
  issuer: string
  width?: number
  height?: number
  verificationUrl?: string
  fallbackImageUrl?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// CredlyBadge — displays ONLY the badge artwork, no white certificate document.
//
// Credly provides badge artwork as direct PNG/image URLs on images.credly.com
// with transparent backgrounds. We render those directly rather than embedding
// the full Credly certificate iframe (which shows the white document, title,
// issuer text, and Credly footer — all redundant since those details are already
// displayed in the card outside this component).
// ─────────────────────────────────────────────────────────────────────────────

export function CredlyBadge({
  badgeId,
  title,
  issuer,
  verificationUrl,
  fallbackImageUrl,
}: CredlyBadgeProps) {
  const [imgError, setImgError] = useState(false)

  const href = verificationUrl ?? `https://www.credly.com/badges/${badgeId}`

  // Credly badge image endpoint — returns the badge artwork PNG
  // Falls back to the pre-resolved badgeImageUrl from certifications.ts
  const imgSrc = fallbackImageUrl ?? `https://images.credly.com/images/${badgeId}/badge.png`

  return (
    <div className="relative flex flex-col items-center justify-center gap-3 p-5 rounded-xl bg-deep-navy/60 border border-sky-blue/15 transition-all hover:border-electric-blue/40 shadow-inner group w-full">

      {/* Badge artwork */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
        title={`Verify ${title} on Credly`}
        aria-label={`Open ${title} credential on Credly`}
      >
        {!imgError ? (
          <img
            src={imgSrc}
            alt={`${title} — issued by ${issuer}`}
            className="w-28 h-28 object-contain drop-shadow-[0_4px_24px_rgba(0,240,255,0.25)]"
            draggable={false}
            onError={() => setImgError(true)}
          />
        ) : (
          /* Fallback if image fails to load */
          <div className="flex flex-col items-center justify-center w-28 h-28 rounded-full bg-electric-blue/10 border border-electric-blue/20">
            <ShieldCheck className="w-10 h-10 text-electric-blue/60" />
            <span className="font-mono text-[8px] text-sky-light/50 mt-1 text-center px-2">
              {issuer}
            </span>
          </div>
        )}
      </a>

      {/* Verified footer */}
      <div className="w-full pt-2 border-t border-sky-blue/15 flex items-center justify-between font-mono text-[11px]">
        <span className="flex items-center gap-1 text-emerald-400 font-semibold text-[10px]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>VERIFIED ON CREDLY</span>
        </span>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sky-light hover:text-electric-blue transition-colors"
          title="Inspect credential details on Credly"
          aria-label={`Verify ${title} on Credly`}
        >
          <span>VERIFY</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  )
}
