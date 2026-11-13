import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle2, AlertCircle, RefreshCw, Mail, ShieldAlert, Loader2 } from 'lucide-react'
import {
  sendTransmission,
  validateTransmission,
  getMailtoFallbackUrl,
  type TransmissionPayload,
  type ValidationErrors,
} from '@/services/transmissionService'
import { APPLE_SPRINGS, APPLE_EASE } from '@/styles/motion'

interface TransmissionFormProps {
  compact?: boolean
  onSuccess?: () => void
}

type TransmissionStatus = 'idle' | 'transmitting' | 'success' | 'error'

export const TransmissionForm: React.FC<TransmissionFormProps> = ({ compact = false, onSuccess }) => {
  const [formData, setFormData] = useState<TransmissionPayload>({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<TransmissionStatus>('idle')
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [successInfo, setSuccessInfo] = useState<string>('')
  const lastSubmittedHash = useRef<string>('')

  const handleFieldChange = (field: keyof TransmissionPayload, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear field-specific error as user edits
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
    if (status === 'error') {
      setStatus('idle')
      setErrorMessage('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 1. Prevent duplicate submission while already transmitting
    if (status === 'transmitting') return

    // 2. Client-side field validation
    const validation = validateTransmission(formData)
    if (!validation.isValid) {
      setErrors(validation.errors)
      setStatus('error')
      setErrorMessage('VALIDATION_FAILED // Please correct the flagged transmission fields below.')
      return
    }

    // 3. Prevent duplicate submission of identical content if recently sent
    const currentHash = `${formData.name}::${formData.email}::${formData.message}`
    if (lastSubmittedHash.current === currentHash && status === 'success') {
      setErrorMessage('DUPLICATE_PAYLOAD // This exact transmission has already been delivered.')
      setStatus('error')
      return
    }

    // 4. Begin transmission
    setStatus('transmitting')
    setErrorMessage('')
    setErrors({})

    try {
      const result = await sendTransmission(formData)
      if (result.success) {
        lastSubmittedHash.current = currentHash
        setStatus('success')
        setSuccessInfo(result.message)
        onSuccess?.()
      } else {
        throw new Error(result.message || 'Unknown relay refusal')
      }
    } catch (err: unknown) {
      console.error('Transmission dispatch error:', err)
      const errorText = err instanceof Error ? err.message : 'Transmission network packet lost.'
      setStatus('error')
      setErrorMessage(errorText)
    }
  }

  const handleResetForNew = () => {
    setFormData({ name: '', email: '', message: '' })
    setStatus('idle')
    setErrors({})
    setErrorMessage('')
    setSuccessInfo('')
  }

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="transmission-success"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.35, ease: APPLE_EASE }}
            className="p-6 rounded-lg bg-muted-green/15 border border-muted-green/60 text-center space-y-4 shadow-xl"
          >
            <div className="w-12 h-12 rounded-full bg-muted-green/20 border border-muted-green text-muted-green-light flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(82,121,111,0.5)]">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h4 className="font-mono font-bold text-sm tracking-wider text-warm-ivory uppercase">
                TRANSMISSION RECEIVED // DISPATCH CONFIRMED
              </h4>
              <p className="font-sans text-xs text-warm-ivory-dim leading-relaxed max-w-md mx-auto">
                {successInfo || 'Your direct transmission has been registered. Ina Grace Tan will review your inquiry shortly.'}
              </p>
            </div>

            <div className="pt-2">
              <motion.button
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={APPLE_SPRINGS.snappy}
                onClick={handleResetForNew}
                className="px-4 py-2 rounded bg-deep-navy-surface hover:bg-deep-navy border border-sky-blue/30 text-sky-light text-xs font-mono font-semibold transition-colors cursor-pointer shadow-sm"
              >
                TRANSMIT ANOTHER MESSAGE
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="transmission-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-4 font-mono text-xs"
          >
            {/* Global Error Banner */}
            <AnimatePresence>
              {status === 'error' && errorMessage && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -8 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -6 }}
                  transition={{ duration: 0.28, ease: APPLE_EASE }}
                  className="overflow-hidden"
                >
                  <div className="p-3.5 rounded bg-red-950/40 border border-red-500/50 space-y-2 text-left shadow-lg">
                    <div className="flex items-start gap-2.5 text-red-400">
                      <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="font-bold text-[11px] tracking-wider uppercase">
                          TRANSMISSION RELAY ALERT
                        </div>
                        <div className="text-[11px] text-red-200/90 leading-relaxed break-words font-sans">
                          {errorMessage}
                        </div>
                      </div>
                    </div>

                    {/* Instant mailto fallback if network or relay provider is unreachable */}
                    <div className="pt-1 flex flex-wrap gap-2 border-t border-red-500/20 text-[11px]">
                      <a
                        href={getMailtoFallbackUrl(formData)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-red-900/40 hover:bg-red-900/70 border border-red-500/40 text-warm-ivory transition-colors cursor-pointer"
                        title="Open your device default mail app with this message pre-filled"
                      >
                        <Mail className="w-3.5 h-3.5 text-red-300" />
                        <span>DIRECT MAILTO DISPATCH</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 1. Name Field */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label htmlFor="transmission-name" className="block text-sky-light text-[11px] uppercase tracking-wider">
                  CALLSIGN // SENDER NAME
                </label>
                <AnimatePresence>
                  {errors.name && (
                    <motion.span
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 4 }}
                      transition={{ duration: 0.2 }}
                      className="text-[10px] text-red-400 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      <span>REQUIRED</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <input
                id="transmission-name"
                type="text"
                disabled={status === 'transmitting'}
                value={formData.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                placeholder="e.g. Jane Doe / Hiring Lead"
                className={`w-full px-3 py-2 rounded bg-deep-navy/90 border text-warm-ivory placeholder-warm-ivory-dim/40 transition-all duration-200 focus:outline-none focus:ring-2 ${
                  errors.name
                    ? 'border-red-500/80 focus:border-red-400 focus:ring-red-500/20'
                    : 'border-sky-blue/25 focus:border-electric-blue focus:ring-electric-blue/30'
                }`}
              />
              <AnimatePresence>
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -2 }}
                    className="text-[10px] text-red-400/90 italic pt-0.5"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* 2. Email Field */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label htmlFor="transmission-email" className="block text-sky-light text-[11px] uppercase tracking-wider">
                  FREQUENCY // RETURN EMAIL
                </label>
                <AnimatePresence>
                  {errors.email && (
                    <motion.span
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 4 }}
                      transition={{ duration: 0.2 }}
                      className="text-[10px] text-red-400 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      <span>REQUIRED</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <input
                id="transmission-email"
                type="email"
                disabled={status === 'transmitting'}
                value={formData.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                placeholder="e.g. recruiter@company.com"
                className={`w-full px-3 py-2 rounded bg-deep-navy/90 border text-warm-ivory placeholder-warm-ivory-dim/40 transition-all duration-200 focus:outline-none focus:ring-2 ${
                  errors.email
                    ? 'border-red-500/80 focus:border-red-400 focus:ring-red-500/20'
                    : 'border-sky-blue/25 focus:border-electric-blue focus:ring-electric-blue/30'
                }`}
              />
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -2 }}
                    className="text-[10px] text-red-400/90 italic pt-0.5"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* 3. Message Field */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label htmlFor="transmission-message" className="block text-sky-light text-[11px] uppercase tracking-wider">
                  TRANSMISSION PAYLOAD // MESSAGE
                </label>
                <AnimatePresence>
                  {errors.message && (
                    <motion.span
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 4 }}
                      transition={{ duration: 0.2 }}
                      className="text-[10px] text-red-400 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      <span>MIN 10 CHARACTERS</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <textarea
                id="transmission-message"
                rows={compact ? 3 : 4}
                disabled={status === 'transmitting'}
                value={formData.message}
                onChange={(e) => handleFieldChange('message', e.target.value)}
                placeholder="Detail your inquiry, project scope, or opportunity here..."
                className={`w-full px-3 py-2 rounded bg-deep-navy/90 border text-warm-ivory placeholder-warm-ivory-dim/40 transition-all duration-200 focus:outline-none focus:ring-2 resize-none ${
                  errors.message
                    ? 'border-red-500/80 focus:border-red-400 focus:ring-red-500/20'
                    : 'border-sky-blue/25 focus:border-electric-blue focus:ring-electric-blue/30'
                }`}
              />
              <AnimatePresence>
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -2 }}
                    className="text-[10px] text-red-400/90 italic pt-0.5"
                  >
                    {errors.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Submission Button */}
            <motion.button
              type="submit"
              whileHover={status === 'transmitting' ? undefined : { scale: 1.01 }}
              whileTap={status === 'transmitting' ? undefined : { scale: 0.98 }}
              transition={APPLE_SPRINGS.snappy}
              disabled={status === 'transmitting'}
              className={`w-full py-2.5 rounded font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                status === 'transmitting'
                  ? 'bg-electric-blue/50 text-deep-navy cursor-not-allowed'
                  : status === 'error'
                    ? 'bg-red-500 hover:bg-red-400 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                    : 'bg-electric-blue hover:bg-white text-deep-navy shadow-[0_0_15px_rgba(0,240,255,0.35)]'
              }`}
            >
              {status === 'transmitting' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>TRANSMITTING... // ENCRYPTING PACKET</span>
                </>
              ) : status === 'error' ? (
                <>
                  <RefreshCw className="w-4 h-4" />
                  <span>RETRY TRANSMISSION</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>SEND TRANSMISSION</span>
                </>
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

