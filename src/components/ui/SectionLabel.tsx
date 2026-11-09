import React from 'react'

export interface SectionLabelProps {
  label: string
  sublabel?: string
  coordinate?: string
  status?: string
  color?: string
  className?: string
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  label,
  sublabel,
  coordinate,
  status = 'ACTIVE',
  color = '#00f0ff',
  className = '',
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 font-mono text-xs select-none ${className}`}>
      <span className="flex h-2 w-2 relative">
        <span
          className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
          style={{ backgroundColor: color }}
        />
        <span
          className="relative inline-flex rounded-full h-2 w-2"
          style={{ backgroundColor: color }}
        />
      </span>
      <span className="font-semibold tracking-wider text-warm-ivory uppercase">
        {label}
      </span>
      {sublabel && (
        <span className="text-sky-light/70 tracking-widest text-[11px]">
          // {sublabel}
        </span>
      )}
      {coordinate && (
        <span className="px-1.5 py-0.5 bg-sky-blue/10 border border-sky-blue/20 text-electric-blue text-[10px] rounded">
          {coordinate}
        </span>
      )}
      {status && (
        <span className="text-muted-green-light text-[10px] tracking-widest font-mono">
          [{status}]
        </span>
      )}
    </div>
  )
}

