import React from 'react'
import { ExternalLink, Globe } from 'lucide-react'

interface ProjectLivePreviewProps {
  url: string
  title: string
  screenshot: string
  logo?: string
}

const CHROME_H = 32

export const ProjectLivePreview: React.FC<ProjectLivePreviewProps> = ({
  url,
  title,
  screenshot,
}) => {
  const hostname = (() => {
    try {
      return new URL(url).hostname
    } catch {
      return url
    }
  })()

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group/preview block w-full rounded-lg overflow-hidden border border-sky-blue/25 hover:border-red-500/50 bg-deep-navy shadow-inner transition-colors"
      aria-label={`Open ${title} live site`}
      title={`Visit ${title}`}
    >
      {/* Fake browser chrome */}
      <div
        className="flex items-center gap-2 px-3 border-b border-sky-blue/20 bg-deep-navy/95 flex-shrink-0"
        style={{ height: CHROME_H }}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
        </div>

        {/* Address bar */}
        <div className="flex-1 flex items-center gap-1.5 bg-deep-navy-surface/80 rounded px-2 py-0.5 border border-sky-blue/15 min-w-0">
          <Globe className="w-2.5 h-2.5 text-emerald-400 flex-shrink-0" />
          <span className="font-mono text-[9px] text-sky-light/60 truncate">{hostname}</span>
        </div>

        {/* Live indicator tag in chrome */}
        <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 font-mono text-[9px] font-bold flex-shrink-0 border border-red-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span>LIVE</span>
        </span>

        {/* Open in tab icon */}
        <ExternalLink className="w-3 h-3 text-sky-light/40 group-hover/preview:text-red-400 transition-colors flex-shrink-0" />
      </div>

      {/* Screenshot */}
      <div className="relative w-full overflow-hidden aspect-[2/1] bg-black/40">
        <img
          src={screenshot}
          alt={`${title} website preview`}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/preview:scale-[1.03]"
          draggable={false}
        />
        {/* Subtle bottom fade into the card */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-deep-navy-card/80 to-transparent pointer-events-none" />
      </div>
    </a>
  )
}

