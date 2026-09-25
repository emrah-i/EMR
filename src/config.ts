export const siteConfig = {
  companyName: 'EMR Commerce',
  email: 'sales@emrcommerce.co',
  phone: '',
  location: 'Chicago, IL',
  businessHours: [
    '9:00 AM–8:00 PM EST',
    '8:00 AM–7:00 PM CST',
    '6:00 AM–5:00 PM PST',
  ],
  contactFormEndpoint: import.meta.env.VITE_CONTACT_FORM_ENDPOINT?.trim() || '/api/contact',
  socialUrls: {
    linkedin: 'https://www.linkedin.com/company/emr-commerce/',
  },
} as const
