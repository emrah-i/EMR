import nodemailer from 'nodemailer'

interface Env {
  ASSETS: Fetcher
  SMTP_TOKEN?: string
}

type ContactPayload = {
  firstName: string
  lastName: string
  email: string
  company: string
  inquiryType: string
  message: string
  website: string
}

const inquiryTypes = new Set([
  'Wholesale / Supplier Inquiry',
  'Distribution',
  'Sourcing Opportunity',
  'General Inquiry',
])

const smtpConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  user: 'sales@emrcommerce.co',
} as const

const contactEmail = 'sales@emrcommerce.co'
const contactSender = `EMR Commerce <${contactEmail}>`

const fieldLimits: Record<keyof ContactPayload, number> = {
  firstName: 80,
  lastName: 80,
  email: 254,
  company: 160,
  inquiryType: 80,
  message: 5000,
  website: 200,
}

function jsonResponse(body: Record<string, unknown>, status = 200, headers?: HeadersInit) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...headers,
    },
  })
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function normalizePayload(value: Record<string, unknown>): ContactPayload | null {
  const fields: Array<keyof ContactPayload> = [
    'firstName',
    'lastName',
    'email',
    'company',
    'inquiryType',
    'message',
    'website',
  ]

  const payload = {} as ContactPayload

  for (const field of fields) {
    const fieldValue = value[field]

    if (fieldValue === undefined) {
      payload[field] = ''
      continue
    }

    if (typeof fieldValue !== 'string') {
      return null
    }

    payload[field] = fieldValue.trim()
  }

  return payload
}

async function handleContact(request: Request, env: Env) {
  if (!request.headers.get('Content-Type')?.toLowerCase().includes('application/json')) {
    return jsonResponse({ error: 'Content-Type must be application/json.' }, 415)
  }

  const contentLength = Number(request.headers.get('Content-Length') ?? 0)
  if (Number.isFinite(contentLength) && contentLength > 16_384) {
    return jsonResponse({ error: 'Request body is too large.' }, 413)
  }

  let body: unknown

  try {
    body = await request.json()
  } catch {
    return jsonResponse({ error: 'Request body must contain valid JSON.' }, 400)
  }

  if (!isRecord(body)) {
    return jsonResponse({ error: 'Request body must be a JSON object.' }, 400)
  }

  const payload = normalizePayload(body)
  if (!payload) {
    return jsonResponse({ error: 'All submitted fields must be text.' }, 400)
  }

  if (payload.website) {
    return jsonResponse({ ok: true })
  }

  if (!payload.firstName || !payload.email || !payload.message) {
    return jsonResponse({ error: 'First name, email, and message are required.' }, 400)
  }

  const oversizedField = (Object.keys(fieldLimits) as Array<keyof ContactPayload>).find(
    (field) => payload[field].length > fieldLimits[field],
  )
  if (oversizedField) {
    return jsonResponse({ error: 'One or more fields exceed the allowed length.' }, 400)
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(payload.email)) {
    return jsonResponse({ error: 'Please enter a valid email address.' }, 400)
  }

  if (!inquiryTypes.has(payload.inquiryType)) {
    return jsonResponse({ error: 'Please select a valid inquiry type.' }, 400)
  }

  if (!env.SMTP_TOKEN) {
    console.error('The contact form SMTP token is not configured.')
    return jsonResponse({ error: 'Email delivery is temporarily unavailable.' }, 503)
  }

  const fullName = [payload.firstName, payload.lastName].filter(Boolean).join(' ')
  const text = [
    `Name: ${fullName}`,
    `Email: ${payload.email}`,
    `Company: ${payload.company || 'Not provided'}`,
    `Inquiry Type: ${payload.inquiryType}`,
    '',
    'Message:',
    payload.message,
  ].join('\n')

  try {
    const transporter = nodemailer.createTransport({
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.secure,
      auth: {
        user: smtpConfig.user,
        pass: env.SMTP_TOKEN,
      },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    })

    await transporter.sendMail({
      from: contactSender,
      to: contactEmail,
      replyTo: payload.email,
      subject: `New website inquiry — ${payload.inquiryType}`,
      text,
    })
  } catch (error) {
    const smtpError = error as { code?: unknown; responseCode?: unknown }
    console.error('SMTP delivery failed.', {
      code: typeof smtpError.code === 'string' ? smtpError.code : undefined,
      responseCode: typeof smtpError.responseCode === 'number' ? smtpError.responseCode : undefined,
    })
    return jsonResponse({ error: 'Email delivery failed. Please try again later.' }, 502)
  }

  return jsonResponse({ ok: true })
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/api/contact') {
      if (request.method !== 'POST') {
        return jsonResponse(
          { error: 'Method not allowed.' },
          405,
          { Allow: 'POST' },
        )
      }

      return handleContact(request, env)
    }

    if (url.pathname.startsWith('/api/')) {
      return jsonResponse({ error: 'API route not found.' }, 404)
    }

    return env.ASSETS.fetch(request)
  },
} satisfies ExportedHandler<Env>
