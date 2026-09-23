import { FormEvent, useState } from 'react'
import { siteConfig } from '../config'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

type ContactFields = {
  firstName: string
  lastName: string
  email: string
  company: string
  inquiryType: string
  message: string
  website: string
}

const initialFields: ContactFields = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  inquiryType: 'Wholesale / Supplier Inquiry',
  message: '',
  website: '',
}

const fieldClasses = 'mb-4'
const rowFieldClasses = `${fieldClasses} min-w-0 flex-1`
const labelClasses = 'mb-2 block text-sm font-semibold text-emr-charcoal'
const controlClasses =
  'w-full rounded-md border border-emr-light-gray bg-white text-base text-emr-charcoal transition duration-150 focus:border-emr-navy focus:ring-2 focus:ring-emr-navy/10 focus:outline-none'

export function ContactForm() {
  const [fields, setFields] = useState<ContactFields>(initialFields)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const updateField = (field: keyof ContactFields, value: string) => {
    setFields((current) => ({ ...current, [field]: value }))
    if (status !== 'idle') {
      setStatus('idle')
      setStatusMessage('')
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!fields.firstName.trim() || !fields.email.trim() || !fields.message.trim()) {
      setStatus('error')
      setStatusMessage('Please complete your first name, email, and message.')
      return
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(fields.email.trim())) {
      setStatus('error')
      setStatusMessage('Please enter a valid email address.')
      return
    }

    setStatus('submitting')
    setStatusMessage('Sending your message…')

    try {
      const response = await fetch(siteConfig.contactFormEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          firstName: fields.firstName.trim(),
          lastName: fields.lastName.trim(),
          email: fields.email.trim(),
          company: fields.company.trim(),
          inquiryType: fields.inquiryType,
          message: fields.message.trim(),
          website: fields.website.trim(),
        }),
      })

      const responseBody = await response.json().catch(() => null) as {
        diagnostics?: unknown
        error?: unknown
        requestId?: unknown
      } | null

      if (!response.ok) {
        // Temporary client-side diagnostics for SMTP debugging.
        console.error('Contact endpoint rejected the submission.', {
          status: response.status,
          error: typeof responseBody?.error === 'string' ? responseBody.error : undefined,
          requestId:
            response.headers.get('x-request-id') ??
            (typeof responseBody?.requestId === 'string' ? responseBody.requestId : undefined),
          diagnostics:
            typeof responseBody?.diagnostics === 'object' && responseBody.diagnostics !== null
              ? responseBody.diagnostics
              : undefined,
        })
        throw new Error(`Form submission failed with status ${response.status}`)
      }

      console.info('Contact endpoint accepted the submission.', {
        status: response.status,
        requestId:
          response.headers.get('x-request-id') ??
          (typeof responseBody?.requestId === 'string' ? responseBody.requestId : undefined),
      })

      setFields(initialFields)
      setStatus('success')
      setStatusMessage('Thank you. Your message has been sent.')
    } catch (error) {
      console.error('Contact form submission failed.', error)
      setStatus('error')
      setStatusMessage('We could not send your message. Please try again or contact us by email.')
    }
  }

  return (
    <form className="w-full min-w-0 flex-1 rounded-md border border-emr-border bg-emr-surface p-8 shadow-[0_18px_50px_rgb(7_39_81_/_6%)] max-[520px]:p-5" onSubmit={handleSubmit} noValidate>
      <div className="flex gap-4 max-[520px]:flex-col max-[520px]:gap-0">
        <div className={rowFieldClasses}>
          <label className={labelClasses} htmlFor="first-name">First Name <span aria-hidden="true">*</span></label>
          <input
            className={`${controlClasses} h-12 px-4`}
            id="first-name"
            name="firstName"
            type="text"
            autoComplete="given-name"
            placeholder="First name"
            value={fields.firstName}
            onChange={(event) => updateField('firstName', event.target.value)}
            required
          />
        </div>
        <div className={rowFieldClasses}>
          <label className={labelClasses} htmlFor="last-name">Last Name</label>
          <input
            className={`${controlClasses} h-12 px-4`}
            id="last-name"
            name="lastName"
            type="text"
            autoComplete="family-name"
            placeholder="Last name"
            value={fields.lastName}
            onChange={(event) => updateField('lastName', event.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-4 max-[520px]:flex-col max-[520px]:gap-0">
        <div className={rowFieldClasses}>
          <label className={labelClasses} htmlFor="email">Email <span aria-hidden="true">*</span></label>
          <input
            className={`${controlClasses} h-12 px-4`}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@company.com"
            value={fields.email}
            onChange={(event) => updateField('email', event.target.value)}
            required
          />
        </div>
        <div className={rowFieldClasses}>
          <label className={labelClasses} htmlFor="company">Company</label>
          <input
            className={`${controlClasses} h-12 px-4`}
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Company name"
            value={fields.company}
            onChange={(event) => updateField('company', event.target.value)}
          />
        </div>
      </div>

      <div className={fieldClasses}>
        <label className={labelClasses} htmlFor="inquiry-type">Inquiry Type</label>
        <select
          className={`${controlClasses} h-12 px-4`}
          id="inquiry-type"
          name="inquiryType"
          value={fields.inquiryType}
          onChange={(event) => updateField('inquiryType', event.target.value)}
        >
          <option>Wholesale / Supplier Inquiry</option>
          <option>Distribution</option>
          <option>Sourcing Opportunity</option>
          <option>General Inquiry</option>
        </select>
      </div>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={fields.website}
          onChange={(event) => updateField('website', event.target.value)}
        />
      </div>

      <div className={fieldClasses}>
        <label className={labelClasses} htmlFor="message">Message <span aria-hidden="true">*</span></label>
        <textarea
          className={`${controlClasses} min-h-36 resize-y px-4 py-3 leading-relaxed`}
          id="message"
          name="message"
          rows={6}
          placeholder="Tell us about your inquiry"
          value={fields.message}
          onChange={(event) => updateField('message', event.target.value)}
          required
        />
      </div>

      <div className="flex items-center justify-between gap-4 max-[520px]:flex-col max-[520px]:items-stretch">
        <p
          className={`m-0 flex-1 text-sm leading-normal ${status === 'error' ? 'text-[#8a2830]' : status === 'success' ? 'text-[#23623b]' : ''}`}
          role="status"
          aria-live="polite"
        >
          {statusMessage}
        </p>
        <button
          className="inline-flex min-h-12 min-w-40 cursor-pointer items-center justify-center rounded-md border-0 bg-emr-navy px-6 py-3 text-sm font-bold leading-tight text-white transition duration-200 hover:-translate-y-px hover:bg-emr-navy-light disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0 motion-reduce:transform-none max-[520px]:w-full"
          type="submit"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Sending…' : 'Send Message'}
        </button>
      </div>
    </form>
  )
}
