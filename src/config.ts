export const siteConfig = {
  companyName: 'EMR Commerce LLC',
  email: 'sales@emrcommerce.com',
  phone: '',
  location: 'Chicago, IL',
  businessHours: '9:00 AM - 6:00 PM CST',
  contactFormEndpoint: import.meta.env.VITE_CONTACT_FORM_ENDPOINT?.trim() ?? '',
  socialUrls: {} as Record<string, string>,
} as const
