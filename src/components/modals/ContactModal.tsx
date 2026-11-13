import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Modal } from '@/components/ui/Modal'
import { contactData } from '@/data/contact'
import { useGameStore } from '@/hooks/useGameStore'
import { TransmissionForm } from '@/components/portfolio/TransmissionForm'
import { APPLE_SPRINGS, APPLE_EASE } from '@/styles/motion'
import {
  Mail,
  Copy,
  Check,
  ExternalLink,
  Radio,
  MessageSquare,
  Phone,
  PhoneCall,
  Send,
  MapPin,
} from 'lucide-react'

export const ContactModal: React.FC = () => {
  const { activeModal, closeModal } = useGameStore()
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)
  const [activeTab, setActiveTab] = useState<'coordinates' | 'transmit'>('transmit')

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

  return (
    <Modal
      isOpen={activeModal === 'CONTACT'}
      onClose={closeModal}
      title="CONTACT_STATION // TRANSMISSIONS_TERMINAL.EXE"
      subtitle="Direct cellular telephone line, secure email link & collaboration channels"
      badge="0955-290-0484"
      locationTag="CONTACT STATION"
      maxWidth="xl"
    >
      <div className="space-y-4">
        {/* Navigation Tabs */}
        <div className="flex border-b border-sky-blue/20 font-mono text-xs gap-2">
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('transmit')}
            className={`relative pb-2 px-3 font-semibold flex items-center gap-1.5 cursor-pointer transition-colors z-10 ${
              activeTab === 'transmit'
                ? 'text-electric-blue'
                : 'text-warm-ivory-dim hover:text-warm-ivory'
            }`}
          >
            {activeTab === 'transmit' && (
              <motion.div
                layoutId="contact-modal-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-electric-blue shadow-[0_0_8px_rgba(0,240,255,0.8)]"
                transition={APPLE_SPRINGS.pill}
              />
            )}
            <Send className="w-3.5 h-3.5" />
            <span>SEND TRANSMISSION</span>
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('coordinates')}
            className={`relative pb-2 px-3 font-semibold flex items-center gap-1.5 cursor-pointer transition-colors z-10 ${
              activeTab === 'coordinates'
                ? 'text-electric-blue'
                : 'text-warm-ivory-dim hover:text-warm-ivory'
            }`}
          >
            {activeTab === 'coordinates' && (
              <motion.div
                layoutId="contact-modal-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-electric-blue shadow-[0_0_8px_rgba(0,240,255,0.8)]"
                transition={APPLE_SPRINGS.pill}
              />
            )}
            <Radio className="w-3.5 h-3.5" />
            <span>DIRECT CHANNELS &amp; PHONE</span>
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'transmit' ? (
            <motion.div
              key="contact-tab-transmit"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: APPLE_EASE }}
              className="p-4 bg-deep-navy/80 border border-sky-blue/25 rounded-sm"
            >
              <div className="mb-3 font-mono text-[11px] text-sky-light/80">
                [DISPATCH PACKET TO INA GRACE TAN // 256-BIT ENCRYPTION]
              </div>
              <TransmissionForm compact />
            </motion.div>
          ) : (
            <motion.div
              key="contact-tab-coordinates"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: APPLE_EASE }}
              className="space-y-4"
            >
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
</Modal>
  )
}

