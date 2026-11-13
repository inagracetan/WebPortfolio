// Vercel Serverless Function: /api/transmission
// Handles direct transmission requests server-side

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method Not Allowed. Only POST transmissions are accepted.',
    })
  }

  const { name, email, message } = req.body || {}

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: 'Invalid or missing name parameter.',
    })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    return res.status(400).json({
      success: false,
      message: 'Invalid or missing email address.',
    })
  }

  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    return res.status(400).json({
      success: false,
      message: 'Message body must contain at least 10 characters.',
    })
  }

  const resendApiKey = process.env.RESEND_API_KEY
  const recipientEmail = process.env.CONTACT_EMAIL || 'inagracetan@gmail.com'

  // If RESEND_API_KEY is configured in Vercel environment variables:
  if (resendApiKey) {
    try {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'INA.EXE Beacon <onboarding@resend.dev>',
          to: recipientEmail,
          reply_to: email.trim(),
          subject: `[INA.EXE DIRECT TRANSMISSION] ${name.trim()}`,
          html: `
            <h2>New Direct Transmission from INA.EXE</h2>
            <p><strong>Sender:</strong> ${name.trim()}</p>
            <p><strong>Email:</strong> <a href="mailto:${email.trim()}">${email.trim()}</a></p>
            <hr />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message.trim()}</p>
            <hr />
            <small>Dispatched from INA.EXE Portfolio Terminal at ${new Date().toISOString()}</small>
          `,
        }),
      })

      const data = await resendRes.json()
      if (resendRes.ok) {
        return res.status(200).json({
          success: true,
          message: 'Transmission successfully delivered to destination mailbox.',
          id: data.id,
        })
      }
    } catch (err) {
      console.error('Resend delivery error:', err)
    }
  }

  // Fallback to FormSubmit relay server-side
  try {
    const relayRes = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        _subject: `[INA.EXE DIRECT TRANSMISSION] New message from ${name.trim()}`,
        _template: 'table',
      }),
    })

    const relayData = await relayRes.json()
    if (relayRes.ok && (relayData.success === 'true' || relayData.success === true)) {
      return res.status(200).json({
        success: true,
        message: 'Transmission confirmed and dispatched via primary relay.',
      })
    }

    return res.status(400).json({
      success: false,
      message: relayData.message || 'Transmission relay reported an error.',
    })
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || 'Internal server error processing transmission.',
    })
  }
}

