import React, { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { contactData } from '@/data/contact'
import { useGameStore } from '@/hooks/useGameStore'
import { useObjectInspection } from '@/interactions/useObjectInspection'
import {
  Mail,
  Copy,
  Check,
  ExternalLink,
  Radio,
  MessageSquare,
  Phone,
  PhoneCall,
  MapPin,
  Send,
  CheckCircle2,
} from 'lucide-react'

export const ContactModal: React.FC = () => {
  const { activeModal, closeModal } = useGameStore()
  const { activeInspectionModal, closeInspection } = useObjectInspection()
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formSent, setFormSent] = useState(false)

  const isContactOpen = activeModal === 'CONTACT' || activeInspectionModal === 'CONTACT'

  const handleContactClose = () => {
    closeModal()
    if (activeInspectionModal === 'CONTACT') {
      closeInspection()
    }
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactData.email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(contactData.phoneFormatted)
    setCopiedPhone(true)
    setTimeout(() => setCopiedPhone(false), 2000)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSent(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' })
      setFormSent(false)
    }, 4500)
  }

  return (
    <Modal
      isOpen={isContactOpen}
      onClose={handleContactClose}
      title="CONTACT_STATION // TRANSMISSIONS_TERMINAL.EXE"
      subtitle="Direct cellular telephone line, secure email link & collaboration channels"
      badge="0955-290-0484"
      locationTag="CONTACT STATION"
      maxWidth="xl"
    >
      <div className="space-y-4">
        {/* Availability Status Banner */}
        <div className="p-3.5 bg-muted-green-dark/30 border border-muted-green-light/40 rounded-sm flex items-start gap-3">
          <Radio className="w-4 h-4 text-muted-green-light mt-0.5 animate-pulse" />
          <div className="text-xs">
            <span className="font-mono font-semibold text-muted-green-light uppercase tracking-wider block">
              Status // Ready for IT Opportunities
            </span>
            <p className="text-warm-ivory-dim mt-0.5 font-sans leading-relaxed">
              {contactData.availability}
            </p>
          </div>
        </div>

        {/* Primary Contact Channels Grid: Phone & Email */}
        <div className="space-y-3">
          {/* 1. Mobile Phone (Highlighted) */}
          <div className="p-4 bg-deep-navy/90 border border-sky-blue/35 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-electric-blue/15 border border-electric-blue/40 rounded text-electric-blue">
                <Phone className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-mono text-sky-light uppercase tracking-wider block">
                  Direct Cellular // Mobile Phone
                </span>
                <a
                  href={`tel:${contactData.phone}`}
                  className="font-mono text-base sm:text-lg text-warm-ivory hover:text-electric-blue font-bold tracking-wider transition-colors inline-block"
                  aria-label={`Call ${contactData.phoneFormatted}`}
                >
                  {contactData.phoneFormatted}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={handleCopyPhone}
                className="px-3 py-1.5 bg-deep-navy hover:bg-deep-navy-surface border border-sky-blue/30 text-warm-ivory hover:text-electric-blue text-xs font-mono rounded flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Copy phone number to clipboard"
              >
                {copiedPhone ? (
                  <Check className="w-3.5 h-3.5 text-muted-green-light" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedPhone ? 'COPIED' : 'COPY'}</span>
              </button>
              <a
                href={`tel:${contactData.phone}`}
                className="px-3.5 py-1.5 bg-electric-blue hover:bg-sky-light text-deep-navy text-xs font-mono font-bold rounded flex items-center gap-1.5 transition-colors shadow-[0_0_12px_rgba(0,240,255,0.35)]"
                title="Call via phone dialer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>CALL</span>
              </a>
            </div>
          </div>

          {/* 2. Email Direct Action */}
          <div className="p-4 bg-deep-navy/80 border border-sky-blue/25 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-sky-blue/10 border border-sky-blue/30 rounded text-sky-light">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-mono text-sky-light uppercase tracking-wider block">
                  Electronic Mail // Official Address
                </span>
                <a
                  href={`mailto:${contactData.email}`}
                  className="font-mono text-sm text-warm-ivory hover:text-electric-blue font-semibold tracking-wide transition-colors break-all block"
                >
                  {contactData.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-3 py-1.5 bg-deep-navy hover:bg-deep-navy-surface border border-sky-blue/30 text-warm-ivory hover:text-electric-blue text-xs font-mono rounded flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Copy email to clipboard"
              >
                {copiedEmail ? (
                  <Check className="w-3.5 h-3.5 text-muted-green-light" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedEmail ? 'COPIED' : 'COPY'}</span>
              </button>
              <a
                href={`mailto:${contactData.email}`}
                className="px-3.5 py-1.5 bg-sky-blue/20 hover:bg-sky-blue/30 border border-sky-blue/40 text-electric-blue text-xs font-mono font-semibold rounded flex items-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>SEND</span>
              </a>
            </div>
          </div>

          {/* 3. Permanent Physical Address */}
          <div className="p-3 bg-deep-navy/60 border border-sky-blue/15 rounded-sm flex items-center gap-3 text-xs font-mono">
            <div className="p-1.5 bg-sky-blue/10 rounded text-sky-light">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="text-warm-ivory-dim">
              <span className="text-[10px] uppercase tracking-wider text-sky-light/70 block">
                Residential Location
              </span>
              <span className="text-warm-ivory font-medium">
                {contactData.location}
              </span>
            </div>
          </div>
        </div>

        {/* 4. Direct Transmission Terminal Form */}
        <div className="p-4 bg-deep-navy/90 border border-electric-blue/35 rounded-sm space-y-3.5 shadow-md">
          <div className="flex items-center justify-between border-b border-sky-blue/20 pb-2.5">
            <div className="flex items-center gap-2">
              <Send className="w-4 h-4 text-electric-blue" />
              <h4 className="font-mono text-xs text-warm-ivory font-bold tracking-wider uppercase">
                DIRECT TRANSMISSION TERMINAL
              </h4>
            </div>
            <span className="text-[10px] font-mono text-electric-blue bg-electric-blue/10 px-2 py-0.5 rounded border border-electric-blue/30 tracking-wider">
              ONLINE // READY
            </span>
          </div>

          {formSent ? (
            <div className="p-5 rounded bg-muted-green/20 border border-muted-green text-center space-y-2">
              <CheckCircle2 className="w-7 h-7 text-muted-green-light mx-auto" />
              <div className="font-mono font-bold text-xs text-warm-ivory uppercase tracking-wider">
                TRANSMISSION RECEIVED // DISPATCH CONFIRMED
              </div>
              <p className="font-sans text-xs text-warm-ivory-dim leading-relaxed">
                Thank you for reaching out. Ina Grace Tan will review your message shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-3 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="modal-contact-name" className="block text-[10px] text-sky-light uppercase tracking-wider font-semibold">
                    Sender Name
                  </label>
                  <input
                    id="modal-contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Recruiter / Client"
                    className="w-full px-3 py-2 rounded bg-deep-navy-card/90 border border-sky-blue/25 text-warm-ivory placeholder-warm-ivory-dim/40 focus:border-electric-blue focus:outline-none transition-colors text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="modal-contact-email" className="block text-[10px] text-sky-light uppercase tracking-wider font-semibold">
                    Return Email / Contact
                  </label>
                  <input
                    id="modal-contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. contact@company.com"
                    className="w-full px-3 py-2 rounded bg-deep-navy-card/90 border border-sky-blue/25 text-warm-ivory placeholder-warm-ivory-dim/40 focus:border-electric-blue focus:outline-none transition-colors text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="modal-contact-message" className="block text-[10px] text-sky-light uppercase tracking-wider font-semibold">
                  Transmission Message / Inquiry
                </label>
                <textarea
                  id="modal-contact-message"
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Detail your IT project, job opportunity, or inquiry..."
                  className="w-full px-3 py-2 rounded bg-deep-navy-card/90 border border-sky-blue/25 text-warm-ivory placeholder-warm-ivory-dim/40 focus:border-electric-blue focus:outline-none resize-none transition-colors text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded bg-electric-blue hover:bg-white text-deep-navy font-bold font-mono text-xs transition-all shadow-[0_0_12px_rgba(0,240,255,0.25)] flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Send className="w-3.5 h-3.5" />
                <span>DISPATCH TRANSMISSION</span>
              </button>
            </form>
          )}
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
                target={link.url.startsWith('tel:') || link.url.startsWith('mailto:') ? undefined : '_blank'}
                rel={link.url.startsWith('tel:') || link.url.startsWith('mailto:') ? undefined : 'noreferrer'}
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

