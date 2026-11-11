import React from 'react'
import {
  Code2,
  Database,
  Network,
  Wrench,
  FileSpreadsheet,
  CheckCircle2,
  FileText,
  Server,
  FolderTree,
  Cpu,
  RefreshCw,
  Activity,
  Headphones,
  Download,
  Shield,
  Lock,
  Cloud,
  Layers,
  Palette,
} from 'lucide-react'

interface TechLogoProps {
  name: string
  className?: string
}

export const TechLogo: React.FC<TechLogoProps> = ({ name, className = 'w-5 h-5' }) => {
  switch (name.toLowerCase()) {
    // Programming
    case 'php':
      return (
        <span className={`inline-flex items-center justify-center font-mono font-bold text-[10px] px-1 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 ${className}`}>
          PHP
        </span>
      )
    case 'python':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 2C8 2 6 3 6 5.5V8h6V9H4.5C2 9 2 11 2 13.5S3 18 6 18h2v-2.5c0-2 1.5-3.5 3.5-3.5h5c1.5 0 2.5-1 2.5-2.5V5.5C19 3 17 2 12 2z" stroke="#38bdf8" />
          <path d="M12 22c4 0 6-1 6-3.5V16h-6v-1h7.5c2.5 0 2.5-2 2.5-4.5S21 6 18 6h-2v2.5c0 2-1.5 3.5-3.5 3.5h-5C6 12 5 13 5 14.5v4C5 21 7 22 12 22z" stroke="#fbbf24" />
        </svg>
      )
    case 'java':
      return (
        <span className={`inline-flex items-center justify-center font-mono font-bold text-[10px] px-1 py-0.2 rounded bg-red-500/20 text-red-300 border border-red-500/40 ${className}`}>
          JAVA
        </span>
      )
    case 'dart':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2">
          <path d="M4 14l6-10h6l4 4-10 12-6-6z" />
          <path d="M10 4l10 10-6 6" strokeOpacity="0.5" />
        </svg>
      )
    case 'javascript':
      return (
        <span className={`inline-flex items-center justify-center font-mono font-bold text-[10px] px-1 py-0.2 rounded bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 ${className}`}>
          JS
        </span>
      )
    case 'html':
      return (
        <span className={`inline-flex items-center justify-center font-mono font-bold text-[9px] px-1 py-0.2 rounded bg-orange-500/20 text-orange-400 border border-orange-500/40 ${className}`}>
          HTML5
        </span>
      )
    case 'css':
      return (
        <span className={`inline-flex items-center justify-center font-mono font-bold text-[9px] px-1 py-0.2 rounded bg-blue-500/20 text-blue-400 border border-blue-500/40 ${className}`}>
          CSS3
        </span>
      )

    // Database & Systems
    case 'mysql':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="1.8">
          <ellipse cx="12" cy="6" rx="8" ry="3" />
          <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
          <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
        </svg>
      )
    case 'firebase':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.8">
          <path d="M4.5 16.5l4-11 3.5 5.5-2.5 3.5L4.5 16.5z" />
          <path d="M19.5 16.5L13 3l-3.5 6 7 7.5h3z" />
        </svg>
      )
    case 'database':
      return <Database className={`${className} text-cyan-400`} />
    case 'data-encoding':
      return <FileSpreadsheet className={`${className} text-emerald-400`} />
    case 'data-validation':
      return <CheckCircle2 className={`${className} text-sky-400`} />
    case 'report':
      return <FileText className={`${className} text-amber-400`} />

    // Networking
    case 'network':
      return <Network className={`${className} text-electric-blue`} />
    case 'vlan':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2">
          <rect x="2" y="4" width="7" height="6" rx="1" />
          <rect x="15" y="4" width="7" height="6" rx="1" />
          <rect x="8.5" y="14" width="7" height="6" rx="1" />
          <path d="M5.5 10v2a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-2M12 14v-2" />
        </svg>
      )
    case 'dhcp':
      return <Server className={`${className} text-cyan-400`} />
    case 'active-directory':
      return <FolderTree className={`${className} text-indigo-400`} />
    case 'cisco':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2">
          <line x1="3" y1="14" x2="3" y2="18" />
          <line x1="7.5" y1="10" x2="7.5" y2="18" />
          <line x1="12" y1="6" x2="12" y2="18" />
          <line x1="16.5" y1="10" x2="16.5" y2="18" />
          <line x1="21" y1="14" x2="21" y2="18" />
        </svg>
      )

    // Technical Support
    case 'troubleshoot':
      return <Wrench className={`${className} text-blue-400`} />
    case 'hardware':
      return <Cpu className={`${className} text-cyan-400`} />
    case 'software-maint':
      return <RefreshCw className={`${className} text-violet-400`} />
    case 'monitoring':
      return <Activity className={`${className} text-emerald-400`} />
    case 'support':
      return <Headphones className={`${className} text-sky-400`} />
    case 'installation':
      return <Download className={`${className} text-teal-400`} />

    // Software & Tools
    case 'office':
      return (
        <span className={`inline-flex items-center justify-center font-mono font-bold text-[9px] px-1 py-0.2 rounded bg-red-500/20 text-orange-300 border border-orange-500/40 ${className}`}>
          MSO
        </span>
      )
    case 'google':
      return (
        <span className={`inline-flex items-center justify-center font-mono font-bold text-[9px] px-1 py-0.2 rounded bg-blue-500/20 text-sky-300 border border-blue-500/40 ${className}`}>
          G-SUITE
        </span>
      )
    case 'vscode':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2">
          <path d="M17 2l5 3v14l-5 3-9-7L3 17l-1-1V8l1-1 5 2 9-7z" />
        </svg>
      )
    case 'canva':
      return <Palette className={`${className} text-teal-400`} />
    case 'photoshop':
      return (
        <span className={`inline-flex items-center justify-center font-mono font-bold text-[10px] px-1 py-0.2 rounded bg-blue-600/30 text-blue-300 border border-blue-500/40 ${className}`}>
          Ps
        </span>
      )
    case 'figma':
      return <Layers className={`${className} text-purple-400`} />

    // Cloud & Cybersecurity
    case 'cloud':
      return <Cloud className={`${className} text-purple-400`} />
    case 'cloud-security':
      return <Shield className={`${className} text-indigo-400`} />
    case 'cybersecurity':
      return <Lock className={`${className} text-emerald-400`} />

    default:
      return <Code2 className={`${className} text-sky-light`} />
  }
}
