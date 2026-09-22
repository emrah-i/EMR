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

const fieldClasses = 'mb-[18px]'
const labelClasses = 'mb-2 block text-[0.84rem] font-semibold text-[#343b40]'
const controlClasses =
  'w-full rounded-md border border-[#bdc3c8] bg-white text-base text-emr-charcoal transition duration-150 focus:border-emr-navy focus:ring-[3px] focus:ring-emr-navy/10 focus:outline-none'

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

    if (fields.website) {
      setStatus('error')
      setStatusMessage('We could not submit this form. Please try again.')
      return
    }

    if (!siteConfig.contactFormEndpoint) {
      const message = 'The contact form endpoint has not been configured yet. Please email us directly.'
      console.error(`${message} Set VITE_CONTACT_FORM_ENDPOINT to enable submissions.`)
      setStatus('error')
      setStatusMessage(message)
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
        }),
      })

      if (!response.ok) {
        throw new Error(`Form submission failed with status ${response.status}`)
      }

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
    <form className="rounded-md border border-emr-border bg-emr-surface p-[clamp(28px,4vw,42px)] shadow-[0_18px_50px_rgb(7_39_81_/_6%)] max-[520px]:px-5 max-[520px]:py-6" onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-2 gap-[18px] max-[520px]:grid-cols-1 max-[520px]:gap-0">
        <div className={fieldClasses}>
          <label className={labelClasses} htmlFor="first-name">First Name <span aria-hidden="true">*</span></label>
          <input
            className={`${controlClasses} h-[50px] px-3.5`}
            id="first-name"
            name="firstName"
            type="text"
            autoComplete="given-name"
            value={fields.firstName}
            onChange={(event) => updateField('firstName', event.target.value)}
            required
          />
        </div>
        <div className={fieldClasses}>
          <label className={labelClasses} htmlFor="last-name">Last Name</label>
          <input
            className={`${controlClasses} h-[50px] px-3.5`}
            id="last-name"
            name="lastName"
            type="text"
            autoComplete="family-name"
            value={fields.lastName}
            onChange={(event) => updateField('lastName', event.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[18px] max-[520px]:grid-cols-1 max-[520px]:gap-0">
        <div className={fieldClasses}>
          <label className={labelClasses} htmlFor="email">Email <span aria-hidden="true">*</span></label>
          <input
            className={`${controlClasses} h-[50px] px-3.5`}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={fields.email}
            onChange={(event) => updateField('email', event.target.value)}
            required
          />
        </div>
        <div className={fieldClasses}>
          <label className={labelClasses} htmlFor="company">Company</label>
          <input
            className={`${controlClasses} h-[50px] px-3.5`}
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={fields.company}
            onChange={(event) => updateField('company', event.target.value)}
          />
        </div>
      </div>

      <div className={fieldClasses}>
        <label className={labelClasses} htmlFor="inquiry-type">Inquiry Type</label>
        <select
          className={`${controlClasses} h-[50px] px-3.5`}
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

      <div className="absolute left-[-10000px] h-px w-px overflow-hidden" aria-hidden="true">
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
          className={`${controlClasses} min-h-[142px] resize-y px-3.5 py-[13px] leading-[1.55]`}
          id="message"
          name="message"
          rows={6}
          value={fields.message}
          onChange={(event) => updateField('message', event.target.value)}
          required
        />
      </div>

      <div className="flex items-center justify-between gap-[18px] max-[520px]:flex-col max-[520px]:items-stretch">
        <p
          className={`m-0 flex-1 text-[0.85rem] leading-normal ${status === 'error' ? 'text-[#8a2830]' : status === 'success' ? 'text-[#23623b]' : ''}`}
          role="status"
          aria-live="polite"
        >
          {statusMessage}
        </p>
        <button
          className="inline-flex min-h-[50px] min-w-[154px] cursor-pointer items-center justify-center rounded-md border-0 bg-emr-navy px-[22px] py-[13px] text-[0.92rem] font-bold leading-[1.2] text-white transition duration-200 hover:-translate-y-px hover:bg-emr-navy-light disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0 motion-reduce:transform-none max-[520px]:w-full"
          type="submit"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Sending…' : 'Send Message'}
        </button>
      </div>
    </form>
  )
}
