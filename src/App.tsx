import { ContactForm } from './components/ContactForm'
import { Header } from './components/Header'
import { siteConfig } from './config'

const services = [
  {
    number: '01',
    title: 'Wholesale & Bulk Purchasing',
    description:
      'We evaluate and purchase inventory in wholesale quantities with attention to product fit, availability, and sustainable economics.',
  },
  {
    number: '02',
    title: 'Product Distribution',
    description:
      'We purchase and distribute consumer products through established sales channels.',
  },
  {
    number: '03',
    title: 'Supplier Relationships',
    description:
      'We prioritize clear communication, dependable purchasing, and relationships built for the long term.',
  },
]

const sourcingFactors = [
  'Market demand',
  'Pricing and product fit',
  'Inventory availability',
  'Operational considerations',
  'Sustainable wholesale economics',
]

const containerClasses =
  'mx-auto w-full max-w-[1160px] px-6 max-[760px]:px-4'
const sectionClasses =
  'scroll-mt-[81px] py-16 max-[960px]:scroll-mt-[71px] max-[520px]:py-10'
const sectionLabelClasses =
  'mb-4 text-[0.76rem] font-bold leading-[1.4] tracking-[0.15em] text-emr-navy uppercase'
const headingTwoClasses =
  'm-0 text-5xl leading-tight font-semibold tracking-tight text-emr-navy max-[760px]:text-4xl'
const primaryButtonClasses =
  'inline-flex min-h-12 cursor-pointer items-center justify-center rounded-md border border-emr-navy bg-emr-navy px-6 py-3 text-sm font-bold leading-tight text-white transition duration-200 hover:-translate-y-px hover:bg-emr-navy-light motion-reduce:transform-none'
const textLinkClasses =
  'group inline-flex cursor-pointer items-center gap-2 text-sm font-bold text-emr-navy'

export default function App() {
  const currentYear = new Date().getFullYear()

  return (
    <>
      <a
        className="fixed top-3 left-3 z-[200] -translate-y-[160%] rounded-md bg-transparent px-3.5 py-2.5 text-emr-navy shadow-[0_5px_20px_rgb(7_39_81_/_18%)] focus:translate-y-0"
        href="#main-content"
      >
        Skip to main content
      </a>
      <Header />

      <main id="main-content">
        <section
          className="emr-grid emr-grid-radial scroll-mt-[81px] overflow-hidden bg-white py-24 max-[960px]:scroll-mt-[71px] max-[760px]:py-14"
          id="top"
          aria-labelledby="hero-title"
        >
          <div className={`${containerClasses} flex items-center justify-center`}>
            <div className="flex w-full min-w-0 max-w-[980px] flex-col items-center justify-center text-center">
              <p className={sectionLabelClasses}>Wholesale Purchasing &amp; Product Distribution</p>
              <h1
                className="mx-auto mb-6 max-w-[980px] text-7xl leading-none font-semibold tracking-tight text-emr-navy max-[960px]:text-6xl max-[760px]:text-5xl"
                id="hero-title"
              >
                A dependable approach to wholesale purchasing and distribution
              </h1>
              <p className="mx-auto mb-7 max-w-[800px] text-lg leading-8 text-[#5c6368] max-[960px]:max-w-[680px] max-[520px]:max-w-[330px] max-[520px]:text-base max-[520px]:leading-7">
                EMR Commerce purchases and distributes consumer products through established sales channels. We work directly with individual brands and suppliers to support dependable, responsible distribution.
              </p>
              <div className="flex items-center justify-center gap-6 max-[520px]:w-full max-[520px]:flex-col max-[520px]:gap-4">
                <a className={`${primaryButtonClasses} max-[520px]:w-full`} href="#contact">Get in Touch</a>
                <a className={textLinkClasses} href="#about">
                  Learn About Us
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" aria-hidden="true">↘</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className={`${sectionClasses} border-t border-emr-border bg-emr-surface`} id="about" aria-labelledby="about-title">
          <div className={`${containerClasses} flex items-start gap-16 max-[960px]:flex-col max-[960px]:gap-10`}>
            <div className="min-w-0 flex-1">
              <p className={sectionLabelClasses}>About</p>
              <h2 className={headingTwoClasses} id="about-title">Built around reliable wholesale relationships</h2>
            </div>
            <div className="min-w-0 flex-1 pt-6 text-base text-[#5d6469] max-[960px]:max-w-[680px] max-[960px]:pt-0">
              <p className="mb-5">
                EMR Commerce is a U.S.-based wholesale purchasing and distribution company focused on sourcing quality consumer products and building dependable supplier relationships.
              </p>
              <p className="m-0">
                We work directly with individual brands, manufacturers, distributors, wholesalers, and suppliers to evaluate inventory opportunities, purchase in volume, and extend product distribution through established sales channels.
              </p>
            </div>
          </div>
        </section>

        <section className={`emr-grid emr-grid-linear ${sectionClasses} bg-white`} id="what-we-do" aria-labelledby="services-title">
          <div className={containerClasses}>
            <div className="mb-12 flex items-end justify-between gap-12 max-[760px]:mb-10 max-[760px]:flex-col max-[760px]:items-start max-[760px]:gap-6">
              <div className="min-w-0 flex-1">
                <p className={sectionLabelClasses}>What We Do</p>
                <h2 className={headingTwoClasses} id="services-title">From wholesale purchase to responsible distribution</h2>
              </div>
              <p className="mb-1 max-w-sm text-[#646b70] max-[760px]:max-w-[560px]">Focused wholesale operations designed to move the right products through dependable channels</p>
            </div>

            <div className="border-t border-emr-light-gray">
              {services.map((service) => (
                <article className="flex items-start gap-6 border-b border-emr-light-gray py-7 max-[760px]:gap-4" key={service.number}>
                  <span className="w-16 shrink-0 text-xs font-bold tracking-widest text-[#626a6f] max-[760px]:w-10">{service.number}</span>
                  <div className="flex min-w-0 flex-1 items-start gap-8 max-[760px]:flex-col max-[760px]:gap-2">
                    <h3 className="w-1/3 text-lg leading-snug font-semibold tracking-tight text-emr-navy max-[760px]:w-full">{service.title}</h3>
                    <p className="m-0 max-w-[520px] flex-1 text-[#646b70]">{service.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${sectionClasses} bg-emr-surface`} id="sourcing" aria-labelledby="sourcing-title">
          <div className={`${containerClasses} flex items-start gap-16 max-[960px]:flex-col max-[960px]:gap-10`}>
            <div className="min-w-0 flex-1">
              <p className={sectionLabelClasses}>Sourcing</p>
              <h2 className={headingTwoClasses} id="sourcing-title">A disciplined approach to product sourcing</h2>
              <p className="mt-5 mb-6 max-w-[530px] text-base">
                We evaluate sourcing opportunities carefully, with an emphasis on products that fit our distribution model and support sustainable, long-term purchasing relationships.
              </p>
              <a className={textLinkClasses} href="#contact">
                Discuss a sourcing opportunity
                <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" aria-hidden="true">↘</span>
              </a>
            </div>

            <div className="min-w-0 flex-1 rounded-md border border-emr-border bg-white p-6 px-8" aria-label="Sourcing considerations">
              <p className="mb-4 max-w-[420px] text-[#646b70]">Each opportunity is considered through a practical commercial lens</p>
              <ul className="m-0 list-none p-0">
                {sourcingFactors.map((factor, index) => (
                  <li className="flex items-start border-t border-emr-border py-2 font-semibold text-emr-navy" key={factor}>
                    <span className="w-12 shrink-0 text-xs tracking-wider text-[#626a6f]">{String(index + 1).padStart(2, '0')}</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="emr-grid emr-grid-linear scroll-mt-[81px] bg-white pt-20 pb-12 max-[960px]:scroll-mt-[71px] max-[520px]:pt-14 max-[520px]:pb-10" id="contact" aria-labelledby="contact-title">
          <div className={`${containerClasses} flex items-start gap-16 max-[960px]:flex-col max-[960px]:items-stretch max-[960px]:gap-10`}>
            <div className="min-w-0 flex-1">
              <p className={sectionLabelClasses}>Get in Touch</p>
              <h2 className={headingTwoClasses} id="contact-title">Let&apos;s talk</h2>
              <p className="mt-5 mb-8 max-w-[470px] text-base">Interested in discussing wholesale supply, inventory purchasing, distribution, or a sourcing opportunity? Get in touch with EMR Commerce.</p>

              <dl className="m-0 flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <dt className="text-[0.75rem] font-bold tracking-[0.12em] text-[#626a6f] uppercase">Email</dt>
                  <dd className="m-0 font-semibold text-emr-navy"><a className="hover:underline hover:underline-offset-[3px]" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-[0.75rem] font-bold tracking-[0.12em] text-[#626a6f] uppercase">Location</dt>
                  <dd className="m-0 font-semibold text-emr-navy">{siteConfig.location}</dd>
                </div>
                {siteConfig.phone && (
                  <div className="flex flex-col gap-1">
                    <dt className="text-[0.75rem] font-bold tracking-[0.12em] text-[#626a6f] uppercase">Phone</dt>
                    <dd className="m-0 font-semibold text-emr-navy"><a className="hover:underline hover:underline-offset-[3px]" href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a></dd>
                  </div>
                )}
                {siteConfig.businessHours && (
                  <div className="flex flex-col gap-1">
                    <dt className="text-[0.75rem] font-bold tracking-[0.12em] text-[#626a6f] uppercase">Business Hours</dt>
                    <dd className="m-0 flex flex-col gap-1 font-semibold text-emr-navy">
                      {siteConfig.businessHours.map((hours) => <span key={hours}>{hours}</span>)}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-emr-border bg-emr-surface py-3.5">
        <div className={`${containerClasses} text-center`}>
          <p className="m-0 text-[0.72rem] leading-5 text-[#626a6f]">© {currentYear} {siteConfig.companyName}. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
