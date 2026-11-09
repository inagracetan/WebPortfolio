import React from 'react'
import { Modal } from '@/components/ui/Modal'
import { useObjectInspection } from '@/interactions/useObjectInspection'
import { contactData } from '@/data/contact'
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
} from 'lucide-react'

export const AboutMeModal: React.FC = () => {
  const { activeInspectionModal, closeInspection } = useObjectInspection()

  return (
    <Modal
      isOpen={activeInspectionModal === 'ABOUT_ME'}
      onClose={closeInspection}
      title="ABOUT ME // INA GRACE TAN"
      subtitle="BS Information Technology — Data Networking Specialization"
      badge="PROFILE"
      maxWidth="3xl"
    >
      <div className="space-y-6">
        {/* Intro Banner */}
        <div className="p-5 bg-deep-navy/80 border border-sky-blue/25 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
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

          <div className="flex flex-col gap-1.5 text-xs font-mono">
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
