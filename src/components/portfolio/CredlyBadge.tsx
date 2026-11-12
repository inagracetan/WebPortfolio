import React, { useState, useEffect, useRef } from 'react'
import { ExternalLink, ShieldCheck, Loader2 } from 'lucide-react'

interface CredlyBadgeProps {
  badgeId: string
  title: string
  issuer: string
  width?: number
  height?: number
  verificationUrl?: string
  fallbackImageUrl?: string
}

const CREDLY_SCRIPT_URL = 'https://cdn.credly.com/assets/utilities/embed.js'

let scriptLoadingPromise: Promise<void> | null = null

function loadCredlyScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()

  if (window.document.querySelector(`script[src="${CREDLY_SCRIPT_URL}"]`)) {
    return Promise.resolve()
  }

  if (!scriptLoadingPromise) {
    scriptLoadingPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = CREDLY_SCRIPT_URL
      script.async = true
      script.onload = () => resolve()
      script.onerror = (err) => reject(err)
      document.head.appendChild(script)
    })
  }

  return scriptLoadingPromise
}

export const CredlyBadge: React.FC<CredlyBadgeProps> = ({
  badgeId,
  title,
  issuer,
  width = 150,
  height = 270,
  verificationUrl,
  fallbackImageUrl,
}) => {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false)
  const [iframeError, setIframeError] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Ensure the official Credly embed script is registered once
    loadCredlyScript().catch(() => {
      // Gracefully continue; iframe directly renders authentic badge endpoint
    })
  }, [])

  const targetVerificationUrl = verificationUrl || `https://www.credly.com/badges/${badgeId}`

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center p-3 rounded-md bg-deep-navy/80 border border-sky-blue/20 transition-all hover:border-electric-blue/50 shadow-md group"
      style={{ minWidth: `${width}px`, minHeight: `${height}px` }}
    >
      {/* Official Credly Embed Container (Standard Attributes) */}
      <div
        data-iframe-width={width}
        data-iframe-height={height}
        data-share-badge-id={badgeId}
        data-share-badge-host="https://www.credly.com"
        className="w-full flex flex-col items-center justify-center relative"
      >
        {/* Loading Spinner */}
        {!isIframeLoaded && !iframeError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-deep-navy/90 z-10">
            <Loader2 className="w-6 h-6 text-electric-blue animate-spin" />
            <span className="font-mono text-[10px] text-sky-light/80 tracking-wider">
              VERIFYING BADGE
            </span>
          </div>
        )}

        {/* Fallback Image if iframe encounters network blockage */}
        {iframeError && fallbackImageUrl ? (
          <div className="flex flex-col items-center justify-center py-4 space-y-3">
            <img
              src={fallbackImageUrl}
              alt={title}
              width={105}
              height={105}
              className="w-[105px] h-[105px] object-contain drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]"
            />
            <div className="text-center font-mono text-xs">
              <div className="font-bold text-warm-ivory">{title}</div>
              <div className="text-[10px] text-sky-light mt-0.5">Issuer: {issuer}</div>
            </div>
          </div>
        ) : (
          /* Official Credly Embedded Iframe */
          <iframe
            name="acclaim-badge"
            allowTransparency={true}
            frameBorder="0"
            id={`embedded-badge-${badgeId}`}
            scrolling="no"
            src={`https://www.credly.com/embedded_badge/${badgeId}`}
            style={{ width: `${width}px`, height: `${height}px`, border: 'none' }}
            title={`View ${title} verified achievement on Credly.`}
            onLoad={() => setIsIframeLoaded(true)}
            onError={() => setIframeError(true)}
            className="rounded overflow-hidden"
          />
        )}
      </div>

      {/* Verification Direct Link Action */}
      <div className="w-full pt-3 mt-2 border-t border-sky-blue/15 flex items-center justify-between font-mono text-[11px]">
        <span className="flex items-center gap-1 text-emerald-400 font-semibold text-[10px]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>VERIFIED ON CREDLY</span>
        </span>

        <a
          href={targetVerificationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sky-light hover:text-electric-blue transition-colors group-hover:translate-x-0.5"
          title="Inspect Credential Details on Credly"
          aria-label={`Verify ${title} on Credly`}
        >
          <span>VERIFY</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  )
}

