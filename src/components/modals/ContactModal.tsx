import React, { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { contactData } from '@/data/contact'
import { useGameStore } from '@/hooks/useGameStore'
import { Mail, Copy, Check, ExternalLink, Radio, MessageSquare } from 'lucide-react'

export const ContactModal: React.FC = () => {
  const { activeModal, closeModal } = useGameStore()
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactData.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Modal
      isOpen={activeModal === 'CONTACT'}
      onClose={closeModal}
      title="CONTACT BEACON"
      subtitle="Direct transmissions, social channels & collaboration inquiries"
      badge="TRANSMISSIONS"
      maxWidth="xl"
    >
      <div className="space-y-5">
        {/* Availability Status Banner */}
        <div className="p-3.5 bg-muted-green-dark/30 border border-muted-green-light/40 rounded-sm flex items-start gap-3">
          <Radio className="w-4 h-4 text-muted-green-light mt-0.5 animate-pulse" />
          <div className="text-xs">
            <span className="font-mono font-semibold text-muted-green-light uppercase tracking-wider block">
              Status // Available for Opportunities
            </span>
            <p className="text-warm-ivory-dim mt-0.5 font-sans">
              {contactData.availability}
            </p>
          </div>
        </div>

        {/* Bio snippet */}
        <p className="text-xs sm:text-sm text-warm-ivory-dim leading-relaxed">
          {contactData.bio}
        </p>

        {/* Email Direct Action */}
        <div className="p-4 bg-deep-navy/80 border border-sky-blue/25 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-blue/10 border border-sky-blue/30 rounded text-electric-blue">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-sky-light uppercase tracking-wider block">
                Primary Frequency // Email
              </span>
              <span className="font-mono text-sm text-warm-ivory font-semibold">
                {contactData.email}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="px-3 py-1.5 bg-deep-navy hover:bg-deep-navy-surface border border-sky-blue/30 text-warm-ivory hover:text-electric-blue text-xs font-mono rounded flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-muted-green-light" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'COPIED' : 'COPY'}</span>
            </button>
            <a
              href={`mailto:${contactData.email}`}
              className="px-3.5 py-1.5 bg-electric-blue hover:bg-sky-light text-deep-navy text-xs font-mono font-bold rounded flex items-center gap-1.5 transition-colors shadow-[0_0_12px_rgba(0,240,255,0.35)]"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>SEND</span>
            </a>
          </div>
        </div>

        {/* Social channels */}
        <div>
          <h4 className="font-mono text-xs text-sky-light font-semibold tracking-wider mb-2.5 uppercase">
            Network Coordinates
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {contactData.socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 bg-deep-navy/50 hover:bg-deep-navy border border-sky-blue/15 hover:border-sky-blue/40 text-warm-ivory hover:text-electric-blue rounded-sm text-xs font-mono transition-all group"
              >
                <div>
                  <span className="font-semibold block text-warm-ivory group-hover:text-electric-blue">
                    {link.platform}
                  </span>
                  <span className="text-warm-ivory-dim/60 text-[11px]">
                    {link.handle}
                  </span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}

