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
  port: 587,
  secure: false,
  user: 'accounts@ibraem.com',
} as const

const contactEmail = 'sales@emrcommerce.co'
const contactSender = `${smtpConfig.user}`

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

function contactResponse(
  body: Record<string, unknown>,
  status: number,
  requestId: string,
  headers?: HeadersInit,
) {
  return jsonResponse(
    { ...body, requestId },
    status,
    { 'X-Request-ID': requestId, ...headers },
  )
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

async function getSecretFingerprint(secret: string) {
  const bytes = new TextEncoder().encode(secret)
  const digest = await crypto.subtle.digest('SHA-256', bytes)

  return Array.from(new Uint8Array(digest))
    .slice(0, 6)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
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

async function handleContact(request: Request, env: Env, requestId: string) {
  if (!request.headers.get('Content-Type')?.toLowerCase().includes('application/json')) {
    return contactResponse({ error: 'Content-Type must be application/json.' }, 415, requestId)
  }

  const contentLength = Number(request.headers.get('Content-Length') ?? 0)
  if (Number.isFinite(contentLength) && contentLength > 16_384) {
    return contactResponse({ error: 'Request body is too large.' }, 413, requestId)
  }

  let body: unknown

  try {
    body = await request.json()
  } catch {
    return contactResponse({ error: 'Request body must contain valid JSON.' }, 400, requestId)
  }

  if (!isRecord(body)) {
    return contactResponse({ error: 'Request body must be a JSON object.' }, 400, requestId)
  }

  const payload = normalizePayload(body)
  if (!payload) {
    return contactResponse({ error: 'All submitted fields must be text.' }, 400, requestId)
  }

  if (payload.website) {
    return contactResponse({ ok: true }, 200, requestId)
  }

  if (!payload.firstName || !payload.email || !payload.message) {
    return contactResponse({ error: 'First name, email, and message are required.' }, 400, requestId)
  }

  const oversizedField = (Object.keys(fieldLimits) as Array<keyof ContactPayload>).find(
    (field) => payload[field].length > fieldLimits[field],
  )
  if (oversizedField) {
    return contactResponse({ error: 'One or more fields exceed the allowed length.' }, 400, requestId)
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(payload.email)) {
    return contactResponse({ error: 'Please enter a valid email address.' }, 400, requestId)
  }

  if (!inquiryTypes.has(payload.inquiryType)) {
    return contactResponse({ error: 'Please select a valid inquiry type.' }, 400, requestId)
  }

  console.info('Contact request validated.', { requestId })

  if (!env.SMTP_TOKEN) {
    const diagnostics = {
      stage: 'configuration',
      smtpTokenConfigured: false,
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.secure,
      authUser: smtpConfig.user,
    }

    console.error('Contact SMTP configuration is missing.', {
      requestId,
      ...diagnostics,
    })
    return contactResponse(
      {
        error: 'Email delivery is temporarily unavailable.',
        diagnostics,
      },
      503,
      requestId,
    )
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
    const smtpTokenFingerprint = await getSecretFingerprint(env.SMTP_TOKEN)

    console.info('Contact SMTP delivery starting.', {
      requestId,
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.secure,
      authUser: smtpConfig.user,
      from: contactSender,
      to: contactEmail,
      smtpTokenConfigured: true,
      smtpTokenLength: env.SMTP_TOKEN.length,
      smtpTokenFingerprint,
    })

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

    const delivery = await transporter.sendMail({
      from: contactSender,
      to: contactEmail,
      replyTo: payload.email,
      subject: `New website inquiry — ${payload.inquiryType}`,
      text,
    })

    console.info('Contact SMTP delivery succeeded.', {
      requestId,
      messageId: delivery.messageId,
      response: delivery.response,
      acceptedCount: delivery.accepted.length,
      rejectedCount: delivery.rejected.length,
    })
  } catch (error) {
    const smtpError = error as {
      code?: unknown
      command?: unknown
      errno?: unknown
      hostname?: unknown
      message?: unknown
      response?: unknown
      responseCode?: unknown
      syscall?: unknown
    }
    const diagnostics = {
      stage: 'delivery',
      smtpTokenConfigured: true,
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.secure,
      authUser: smtpConfig.user,
      name: error instanceof Error ? error.name : undefined,
      message: typeof smtpError.message === 'string' ? smtpError.message.slice(0, 500) : undefined,
      code: typeof smtpError.code === 'string' ? smtpError.code : undefined,
      command: typeof smtpError.command === 'string' ? smtpError.command : undefined,
      responseCode: typeof smtpError.responseCode === 'number' ? smtpError.responseCode : undefined,
      response: typeof smtpError.response === 'string' ? smtpError.response.slice(0, 500) : undefined,
      errno: typeof smtpError.errno === 'string' || typeof smtpError.errno === 'number' ? smtpError.errno : undefined,
      syscall: typeof smtpError.syscall === 'string' ? smtpError.syscall : undefined,
      hostname: typeof smtpError.hostname === 'string' ? smtpError.hostname : undefined,
    }

    console.error('SMTP delivery failed.', {
      requestId,
      ...diagnostics,
    })
    return contactResponse(
      {
        error: 'Email delivery failed. Please try again later.',
        diagnostics,
      },
      502,
      requestId,
    )
  }

  return contactResponse({ ok: true }, 200, requestId)
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/api/contact') {
      const requestId = request.headers.get('cf-ray') ?? crypto.randomUUID()

      console.info('Contact request received.', {
        requestId,
        method: request.method,
        smtpTokenConfigured: Boolean(env.SMTP_TOKEN),
      })

      if (request.method !== 'POST') {
        return contactResponse(
          { error: 'Method not allowed.' },
          405,
          requestId,
          { Allow: 'POST' },
        )
      }

      return handleContact(request, env, requestId)
    }

    if (url.pathname.startsWith('/api/')) {
      return jsonResponse({ error: 'API route not found.' }, 404)
    }

    return env.ASSETS.fetch(request)
  },
} satisfies ExportedHandler<Env>
