import { useState, useRef, useEffect } from 'react'
import { ExternalLink, Globe } from 'lucide-react'

interface ProjectLivePreviewProps {
  url: string
  title: string
  logo?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// ProjectLivePreview
//
// Renders a mini browser window with a scaled-down iframe of the live site.
// Falls back to a branded placeholder + link if the site blocks embedding.
//
// Technique: the iframe renders at IFRAME_W × IFRAME_H pixels (simulating a
// real desktop viewport), then CSS transform scale() shrinks it to fit the
// preview container. The container height is computed so there is no clipping
// or overflow: containerHeight = IFRAME_H * scale.
// ─────────────────────────────────────────────────────────────────────────────

const IFRAME_W = 1280 // simulated viewport width
const IFRAME_H = 800  // simulated viewport height
const CHROME_H = 32  // height of the fake browser bar (px)

export function ProjectLivePreview({ url, title, logo }: ProjectLivePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.25)
  const [loaded, setLoaded] = useState(false)
  const [blocked, setBlocked] = useState(false)

  // Recompute scale whenever the container resizes
  useEffect(() => {
    if (!containerRef.current) return
    const obs = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width
      if (w) setScale(w / IFRAME_W)
    })
    obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])

  // Heuristic: if the iframe doesn't fire onLoad within 8 s, treat as blocked
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loaded) setBlocked(true)
    }, 8000)
    return () => clearTimeout(timer)
  }, [loaded])

  const previewH = Math.round(IFRAME_H * scale)
  const totalH = CHROME_H + previewH

  const hostname = (() => {
    try { return new URL(url).hostname } catch { return url }
  })()

  return (
    <div
      ref={containerRef}
      className="w-full rounded-lg overflow-hidden border border-sky-blue/25 bg-deep-navy shadow-inner"
      style={{ height: totalH }}
      aria-label={`Live preview of ${title}`}
    >
      {/* ── Fake browser chrome ─────────────────────────────────────── */}
      <div
        className="flex items-center gap-2 px-3 border-b border-sky-blue/20 bg-deep-navy/95 flex-shrink-0"
        style={{ height: CHROME_H }}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 animate-pulse" />
        </div>

        {/* Address bar */}
        <div className="flex-1 flex items-center gap-1.5 bg-deep-navy-surface/80 rounded px-2 py-0.5 border border-sky-blue/15 min-w-0">
          <Globe className="w-2.5 h-2.5 text-emerald-400 flex-shrink-0" />
          <span className="font-mono text-[9px] text-sky-light/60 truncate">{hostname}</span>
        </div>

        {/* Open in tab */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 text-sky-light/40 hover:text-electric-blue transition-colors"
          title={`Open ${title} in new tab`}
        >
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* ── Preview area ────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden bg-white"
        style={{ height: previewH, width: '100%' }}
      >
        {/* Scaled iframe — only shown when not blocked */}
        {!blocked && (
          <iframe
            src={url}
            title={`${title} live preview`}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setBlocked(true)}
            style={{
              width: IFRAME_W,
              height: IFRAME_H,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              pointerEvents: 'none',
              border: 'none',
              display: 'block',
              // hide until loaded to avoid white flash
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
          />
        )}

        {/* Loading shimmer — shown until iframe loads */}
        {!loaded && !blocked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-deep-navy-surface/95">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-electric-blue/60 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-electric-blue/60 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-electric-blue/60 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="font-mono text-[9px] text-sky-light/40">Loading preview…</span>
          </div>
        )}

        {/* Fallback — shown when iframe is blocked / errored */}
        {blocked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-deep-navy-surface/95 p-4">
            {logo && (
              <img
                src={logo}
                alt={`${title} logo`}
                className="max-h-10 max-w-[120px] object-contain opacity-80"
                draggable={false}
              />
            )}
            <p className="font-mono text-[9px] text-sky-light/50 text-center">
              Preview blocked by browser policy
            </p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-deep-navy bg-electric-blue hover:bg-white px-3 py-1 rounded transition-colors"
            >
              <span>Open Site</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

        {/* Invisible click-shield overlay — prevents accidental interaction */}
        {loaded && !blocked && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-10 cursor-pointer"
            title={`Open ${title} in new tab`}
            aria-label={`Open ${title} live site`}
          />
        )}
      </div>
    </div>
  )
}

