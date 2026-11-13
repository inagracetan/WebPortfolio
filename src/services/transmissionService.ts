import { contactData } from '@/data/contact'

export interface TransmissionPayload {
  name: string
  email: string
  message: string
}

export interface TransmissionResult {
  success: boolean
  message: string
  provider?: string
}

export interface ValidationErrors {
  name?: string
  email?: string
  message?: string
}

/**
 * Validates transmission payload fields
 */
export function validateTransmission(payload: TransmissionPayload): {
  isValid: boolean
  errors: ValidationErrors
} {
  const errors: ValidationErrors = {}
  const trimmedName = payload.name.trim()
  const trimmedEmail = payload.email.trim()
  const trimmedMessage = payload.message.trim()

  if (!trimmedName) {
    errors.name = 'CALLSIGN_REQUIRED // Identification name is mandatory'
  } else if (trimmedName.length < 2) {
    errors.name = 'CALLSIGN_TOO_SHORT // Minimum 2 characters required'
  }

  // RFC 5322 compliant email regex check
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/
  if (!trimmedEmail) {
    errors.email = 'FREQUENCY_REQUIRED // Return email address is mandatory'
  } else if (!emailRegex.test(trimmedEmail)) {
    errors.email = 'INVALID_FREQUENCY // Expected standard format (e.g. name@domain.com)'
  }

  if (!trimmedMessage) {
    errors.message = 'PAYLOAD_REQUIRED // Transmission body cannot be empty'
  } else if (trimmedMessage.length < 10) {
    errors.message = 'PAYLOAD_INSUFFICIENT // Minimum 10 characters required for dispatch'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

/**
 * Sends transmission to verified backend or configured email relay provider.
 * Priority order:
 * 1. Dedicated custom endpoint or Vercel serverless function (`VITE_TRANSMISSION_API_URL` or `/api/transmission`)
 * 2. Formspree relay (`VITE_FORMSPREE_ID`)
 * 3. Web3Forms relay (`VITE_WEB3FORMS_ACCESS_KEY`)
 * 4. FormSubmit relay (https://formsubmit.co/ajax/inagracetan@gmail.com)
 */
export async function sendTransmission(payload: TransmissionPayload): Promise<TransmissionResult> {
  const validation = validateTransmission(payload)
  if (!validation.isValid) {
    const errorDetails = Object.values(validation.errors).join('; ')
    throw new Error(`VALIDATION_ERROR: ${errorDetails}`)
  }

  const customApiUrl = import.meta.env.VITE_TRANSMISSION_API_URL
  const formspreeId = import.meta.env.VITE_FORMSPREE_ID
  const web3formsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

  // 1. Check custom API endpoint if explicitly configured or test local/relative /api/transmission
  if (customApiUrl) {
    try {
      const response = await fetch(customApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...payload,
          recipient: contactData.email,
          timestamp: new Date().toISOString(),
          system: 'INA.EXE TRANSMISSION TERMINAL',
        }),
      })

      const data = await response.json().catch(() => null)
      if (response.ok && data?.success !== false) {
        return {
          success: true,
          message: data?.message || 'Transmission dispatched successfully to remote server.',
          provider: 'Custom Endpoint',
        }
      }
      throw new Error(data?.message || `Remote endpoint responded with HTTP ${response.status}`)
    } catch (err: unknown) {
      console.warn('Custom transmission endpoint failed:', err)
      // Fall through to next provider
    }
  }

  // 2. Formspree integration if configured via environment variable
  if (formspreeId) {
    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: payload.name.trim(),
          email: payload.email.trim(),
          message: payload.message.trim(),
          _subject: `INA.EXE Transmission from ${payload.name.trim()}`,
        }),
      })

      const data = await response.json().catch(() => null)
      if (response.ok) {
        return {
          success: true,
          message: 'Transmission successfully routed through Formspree relay.',
          provider: 'Formspree',
        }
      }
      throw new Error(data?.error || `Formspree relay returned status ${response.status}`)
    } catch (err: unknown) {
      console.warn('Formspree transmission failed:', err)
      // Fall through to next provider
    }
  }

  // 3. Web3Forms integration if configured via environment variable
  if (web3formsKey) {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: web3formsKey,
          name: payload.name.trim(),
          email: payload.email.trim(),
          message: payload.message.trim(),
          subject: `INA.EXE Transmission from ${payload.name.trim()}`,
          from_name: 'INA.EXE Portfolio Beacon',
        }),
      })

      const data = await response.json().catch(() => null)
      if (response.ok && data?.success) {
        return {
          success: true,
          message: data.message || 'Transmission dispatched via Web3Forms gateway.',
          provider: 'Web3Forms',
        }
      }
      throw new Error(data?.message || 'Web3Forms transmission rejected')
    } catch (err: unknown) {
      console.warn('Web3Forms transmission failed:', err)
      // Fall through to next provider
    }
  }

  // 4. Default Production Relay: FormSubmit AJAX endpoint
  const targetEmail = contactData.email || 'inagracetan@gmail.com'
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: payload.name.trim(),
        email: payload.email.trim(),
        message: payload.message.trim(),
        _subject: `[INA.EXE DIRECT TRANSMISSION] New message from ${payload.name.trim()}`,
        _template: 'table',
        _captcha: 'false',
      }),
    })

    const data = await response.json().catch(() => null)

    if (response.ok && (data?.success === 'true' || data?.success === true)) {
      return {
        success: true,
        message: data?.message || 'Transmission confirmed and logged by relay provider.',
        provider: 'FormSubmit',
      }
    }

    // Handle provider-specific responses (e.g. activation pending or rate limit)
    if (data?.message) {
      throw new Error(data.message)
    }

    throw new Error(`Relay service responded with HTTP status ${response.status}`)
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown network transmission failure'
    throw new Error(errorMessage)
  }
}

/**
 * Builds mailto fallback link with pre-filled subject and payload
 */
export function getMailtoFallbackUrl(payload: TransmissionPayload): string {
  const subject = encodeURIComponent(`[INA.EXE TRANSMISSION] Inquiry from ${payload.name || 'Visitor'}`)
  const body = encodeURIComponent(
    `Sender: ${payload.name}\nEmail: ${payload.email}\n\nMessage:\n${payload.message}\n\n---\nSent via INA.EXE Portfolio Direct Transmission Link`
  )
  return `mailto:${contactData.email}?subject=${subject}&body=${body}`
}

