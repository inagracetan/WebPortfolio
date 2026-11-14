import React, { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { useObjectInspection } from '@/interactions/useObjectInspection'
import { contactData } from '@/data/contact'
import { useGameStore } from '@/hooks/useGameStore'
import {
  MapPin,
  Network,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Mail,
  Server,
  Code2,
  Phone,
  Printer,
  Download,
  FileText,
  ChevronDown,
  ChevronUp,
  X,
  ExternalLink,
} from 'lucide-react'

export const AboutMeModal: React.FC = () => {
  const { activeInspectionModal, closeInspection } = useObjectInspection()
  const { activeModal, closeModal } = useGameStore()
  const [isPdfOpen, setIsPdfOpen] = useState(false)

  const isOpen = activeModal === 'ABOUT' || activeInspectionModal === 'ABOUT_ME'

  const handleClose = () => {
    if (activeModal === 'ABOUT') {
      closeModal()
    }
    if (activeInspectionModal === 'ABOUT_ME') {
      closeInspection()
    }
  }

  const handlePrint = () => {
    const printWindow = window.open('/Tan_IG_CV.pdf', '_blank')
    if (printWindow) {
      printWindow.focus()
      try {
        printWindow.onload = () => {
          printWindow.print()
        }
      } catch {
        // Fallback handled by browser
      }
    } else {
      window.print()
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="PERSONAL_WORKSPACE // INA GRACE TAN.EXE"
      subtitle="BS Information Technology — Data Networking Specialization"
      badge="STUDIO VILLA"
      locationTag="PERSONAL WORKSPACE"
      maxWidth="3xl"
    >
      <div className="space-y-6">
        {/* Intro Banner with Authentic Photograph */}
        <div className="p-5 bg-deep-navy/80 border border-sky-blue/25 rounded-sm flex flex-col sm:flex-row items-center gap-5">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl p-0.5 bg-gradient-to-tr from-electric-blue via-sky-blue/40 to-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.3)] flex-shrink-0">
            <div className="w-full h-full rounded-[14px] overflow-hidden bg-deep-navy">
              <img
                src="/profile.jpg"
                alt="Ina Grace Tan"
                width={112}
                height={112}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <span className="text-xs font-mono text-electric-blue tracking-wider uppercase block mb-1">
              Terminal Log // Verified Candidate Profile
            </span>
            <h3 className="font-display font-extrabold text-2xl text-warm-ivory">
              Hello, I'm Ina Grace Tan.
            </h3>
            <p className="text-xs text-sky-light mt-1 font-mono">
              BS Information Technology (Major in Data Networking) &bull; Central Mindanao University
            </p>
          </div>

          <div className="flex flex-col gap-1.5 text-xs font-mono flex-shrink-0">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-sky-blue/10 border border-sky-blue/30 rounded text-electric-blue">
              <Phone className="w-3.5 h-3.5 text-sky-light flex-shrink-0" />
              <a href={`tel:${contactData.phone}`} className="hover:underline">
                {contactData.phoneFormatted}
              </a>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-deep-navy border border-sky-blue/20 rounded text-warm-ivory-dim text-[11px]">
              <MapPin className="w-3 h-3 text-sky-light flex-shrink-0" />
              <span>{contactData.location}</span>
            </div>
          </div>
        </div>

        {/* Narrative Section */}
        <div className="space-y-3.5 text-sm text-warm-ivory-dim leading-relaxed">
          <p>
            I am a Bachelor of Science in Information Technology student/graduate from Central
            Mindanao University with a specialized track in Data Networking. My technical journey is
            driven by a deep curiosity about how computer networks, software systems, and cloud
            services connect people and organizations.
          </p>

          <p>
            My core technical interests span IT support and hardware troubleshooting, computer
            networking architecture, cross-platform mobile software development in Flutter and Dart,
            cloud infrastructure via AWS Academy coursework, and cybersecurity risk management.
            Whether diagnosing network configurations, implementing real-time mobile scheduling, or
            encoding critical enterprise data with precision, I approach every project with focus,
            structured methodology, and attention to detail.
          </p>
        </div>

        {/* Primary Areas of Interest */}
        <div>
          <h4 className="font-mono text-xs text-sky-light font-semibold tracking-wider mb-3 flex items-center gap-2 uppercase">
            <Cpu className="w-3.5 h-3.5 text-electric-blue" />
            <span>Core Technical Focus Areas</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-deep-navy/60 border border-sky-blue/15 rounded space-y-1">
              <span className="font-bold text-warm-ivory flex items-center gap-2 font-mono">
                <Network className="w-3.5 h-3.5 text-electric-blue" />
                <span>Networking &amp; IT Support</span>
              </span>
              <p className="text-warm-ivory-dim/80">
                Specialized training in computer networking, routing concepts, system troubleshooting, hardware maintenance, and Active Directory administration.
              </p>
            </div>

            <div className="p-3.5 bg-deep-navy/60 border border-sky-blue/15 rounded space-y-1">
              <span className="font-bold text-warm-ivory flex items-center gap-2 font-mono">
                <Code2 className="w-3.5 h-3.5 text-sky-light" />
                <span>Software Development</span>
              </span>
              <p className="text-warm-ivory-dim/80">
                Practical development with Flutter and Dart, building real-time apps such as MusuanTrack and cloud-synchronized scheduling solutions.
              </p>
            </div>

            <div className="p-3.5 bg-deep-navy/60 border border-sky-blue/15 rounded space-y-1">
              <span className="font-bold text-warm-ivory flex items-center gap-2 font-mono">
                <Server className="w-3.5 h-3.5 text-muted-green-light" />
                <span>Cloud Computing</span>
              </span>
              <p className="text-warm-ivory-dim/80">
                Academic training in AWS Academy Cloud Foundations: virtual compute, storage, networking architectures, and managed database services.
              </p>
            </div>

            <div className="p-3.5 bg-deep-navy/60 border border-sky-blue/15 rounded space-y-1">
              <span className="font-bold text-warm-ivory flex items-center gap-2 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-pink-400" />
                <span>Cybersecurity &amp; Risk</span>
              </span>
              <p className="text-warm-ivory-dim/80">
                Academic cybersecurity analysis, threat modeling, security risk assessment, and AWS Academy Cloud Security coursework.
              </p>
            </div>
          </div>
        </div>

        {/* Academic & Geographic Quick Reference */}
        <div>
          <h4 className="font-mono text-xs text-sky-light font-semibold tracking-wider mb-2.5 uppercase">
            Academic &amp; Profile Summary
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="p-3 bg-deep-navy/50 border border-sky-blue/15 rounded">
              <span className="font-display font-extrabold text-sm text-electric-blue block">
                Central Mindanao Univ.
              </span>
              <span className="font-mono text-[10px] text-warm-ivory-dim uppercase">Institution</span>
            </div>
            <div className="p-3 bg-deep-navy/50 border border-sky-blue/15 rounded">
              <span className="font-display font-extrabold text-sm text-muted-green-light block">
                BS Info Tech
              </span>
              <span className="font-mono text-[10px] text-warm-ivory-dim uppercase">Degree Program</span>
            </div>
            <div className="p-3 bg-deep-navy/50 border border-sky-blue/15 rounded">
              <span className="font-display font-extrabold text-sm text-sky-light block">
                Data Networking
              </span>
              <span className="font-mono text-[10px] text-warm-ivory-dim uppercase">Specialization</span>
            </div>
            <div className="p-3 bg-deep-navy/50 border border-sky-blue/15 rounded">
              <span className="font-display font-extrabold text-sm text-warm-ivory block">
                Bukidnon, PH
              </span>
              <span className="font-mono text-[10px] text-warm-ivory-dim uppercase">Location</span>
            </div>
          </div>
        </div>

        {/* Resume Actions: Print Resume, Download PDF, View Original PDF */}
        <div className="p-4 bg-deep-navy/90 border border-sky-blue/25 rounded-md space-y-3 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-mono text-[10px] text-electric-blue uppercase tracking-wider block font-bold">
                Official Curriculum Vitae
              </span>
              <span className="font-display font-bold text-sm text-warm-ivory">
                Curriculum Vitae (CV) &amp; Resume
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* 1. Print Resume */}
              <button
                type="button"
                onClick={handlePrint}
                className="px-3 py-1.5 bg-deep-navy hover:bg-deep-navy-surface border border-sky-blue/30 text-warm-ivory hover:text-electric-blue text-xs font-mono rounded flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Print Resume using browser native print"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Resume</span>
              </button>

              {/* 2. Download PDF */}
              <a
                href="/Tan_IG_CV.pdf"
                download="Tan_IG_CV.pdf"
                className="px-3 py-1.5 bg-deep-navy hover:bg-deep-navy-surface border border-sky-blue/30 text-warm-ivory hover:text-emerald-400 text-xs font-mono rounded flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Download original Tan_IG_CV.pdf"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Download PDF</span>
              </a>

              {/* 3. View Original PDF */}
              <button
                type="button"
                onClick={() => setIsPdfOpen(!isPdfOpen)}
                className="px-3.5 py-1.5 bg-electric-blue/15 hover:bg-electric-blue text-electric-blue hover:text-deep-navy border border-electric-blue/40 text-xs font-mono font-bold rounded flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                title="Toggle embedded original resume PDF viewer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{isPdfOpen ? 'Hide Original PDF' : 'View Original PDF'}</span>
                {isPdfOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>
          </div>

          {/* PDF Viewer — Hidden by default, appears only when isPdfOpen is true */}
          {isPdfOpen && (
            <div className="pt-3 space-y-2 border-t border-sky-blue/15">
              <div className="flex items-center justify-between text-xs font-mono text-sky-light px-0.5">
                <span className="text-warm-ivory font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-pulse" />
                  ORIGINAL DOCUMENT: Tan_IG_CV.pdf
                </span>
                <button
                  type="button"
                  onClick={() => setIsPdfOpen(false)}
                  className="flex items-center gap-1 text-rose-300 hover:text-rose-200 transition-colors cursor-pointer text-xs font-mono"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Close Preview</span>
                </button>
              </div>

              <div className="w-full h-[450px] sm:h-[540px] rounded overflow-hidden border border-sky-blue/20 bg-black/60 shadow-inner">
                <iframe
                  src="/Tan_IG_CV.pdf#toolbar=1&navpanes=0"
                  title="Ina Grace Tan - Original Resume PDF"
                  className="w-full h-full border-0"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-sky-light/60 px-0.5 pt-1">
                <span>Verified 2-Page Curriculum Vitae</span>
                <a
                  href="/Tan_IG_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-electric-blue hover:underline"
                >
                  <span>Open Fullscreen</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer contact shortcut */}
        <div className="pt-2 border-t border-sky-blue/15 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-warm-ivory-dim">
          <div className="flex flex-wrap items-center gap-3">
            <a href={`tel:${contactData.phone}`} className="flex items-center gap-1.5 text-electric-blue hover:underline">
              <Phone className="w-3.5 h-3.5" />
              <span>{contactData.phoneFormatted}</span>
            </a>
            <span className="text-sky-light/40">&bull;</span>
            <a href={`mailto:${contactData.email}`} className="flex items-center gap-1.5 text-sky-light hover:underline">
              <Mail className="w-3.5 h-3.5" />
              <span>{contactData.email}</span>
            </a>
          </div>
          <span className="text-electric-blue flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-muted-green-light" />
            <span>Open for IT Support, Networking &amp; Dev Roles</span>
          </span>
        </div>
      </div>
    </Modal>
  )
}
