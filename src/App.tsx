import { ContactForm } from './components/ContactForm'
import { DistributionModel } from './components/DistributionModel'
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
  'mx-auto w-[calc(100%_-_3rem)] max-w-[1160px] max-[760px]:w-[calc(100%_-_2rem)]'
const sectionClasses =
  'scroll-mt-[81px] py-[clamp(72px,7vw,104px)] max-[960px]:scroll-mt-[71px] max-[520px]:py-14'
const sectionLabelClasses =
  'mb-4 text-[0.76rem] font-bold leading-[1.4] tracking-[0.15em] text-emr-navy uppercase'
const headingTwoClasses =
  'm-0 text-[clamp(2rem,3.6vw,3.45rem)] leading-[1.12] font-semibold tracking-[-0.035em] text-emr-navy'
const primaryButtonClasses =
  'inline-flex min-h-[50px] items-center justify-center rounded-md border border-emr-navy bg-emr-navy px-[22px] py-[13px] text-[0.92rem] font-bold leading-[1.2] text-white transition duration-200 hover:-translate-y-px hover:bg-emr-navy-light motion-reduce:transform-none'
const textLinkClasses =
  'group inline-flex items-center gap-2.5 text-[0.94rem] font-bold text-emr-navy'

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
          className="emr-grid emr-grid-radial scroll-mt-[81px] overflow-hidden bg-white pt-[clamp(60px,7vw,96px)] pb-[clamp(68px,8vw,110px)] max-[960px]:scroll-mt-[71px] max-[760px]:pt-[52px] max-[760px]:pb-[68px]"
          id="top"
          aria-labelledby="hero-title"
        >
          <div className={`${containerClasses} grid grid-cols-[minmax(0,1.2fr)_minmax(350px,0.8fr)] items-center gap-[clamp(48px,6vw,80px)] max-[960px]:grid-cols-1 max-[960px]:gap-[52px]`}>
            <div className="max-[960px]:max-w-[760px]">
              <p className={sectionLabelClasses}>Wholesale Purchasing &amp; Product Distribution</p>
              <h1
                className="mb-[22px] max-w-[760px] text-[clamp(2.75rem,5.25vw,4.5rem)] leading-[1.06] font-semibold tracking-[-0.035em] text-emr-navy max-[760px]:text-[clamp(2.45rem,12vw,3.6rem)]"
                id="hero-title"
              >
                A dependable approach to wholesale purchasing and distribution
              </h1>
              <p className="mb-7 max-w-[630px] text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.75] text-[#5c6368]">
                EMR Commerce purchases and distributes consumer products through established sales channels, with a focus on clear communication and dependable supplier relationships
              </p>
              <div className="flex items-center gap-6 max-[520px]:flex-col max-[520px]:items-start max-[520px]:gap-4">
                <a className={`${primaryButtonClasses} max-[520px]:w-full`} href="#contact">Get in Touch</a>
                <a className={textLinkClasses} href="#about">
                  Learn About Us
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" aria-hidden="true">↘</span>
                </a>
              </div>
            </div>

            <DistributionModel />
          </div>
        </section>

        <section className={`${sectionClasses} border-t border-emr-border bg-emr-surface`} id="about" aria-labelledby="about-title">
          <div className={`${containerClasses} grid grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] gap-[clamp(48px,7vw,88px)] max-[960px]:grid-cols-1 max-[960px]:gap-10`}>
            <div>
              <p className={sectionLabelClasses}>About</p>
              <h2 className={headingTwoClasses} id="about-title">Built around reliable wholesale relationships</h2>
            </div>
            <div className="pt-7 text-[1.05rem] text-[#5d6469] max-[960px]:max-w-[680px] max-[960px]:pt-0">
              <p className="mb-5">
                EMR Commerce is a U.S.-based wholesale purchasing and distribution company focused on sourcing quality consumer products and building dependable supplier relationships.
              </p>
              <p className="m-0">
                We work with manufacturers, distributors, wholesalers, and suppliers to evaluate inventory opportunities, purchase in volume, and support responsible product distribution.
              </p>
            </div>
          </div>
        </section>

        <section className={`emr-grid emr-grid-linear ${sectionClasses} bg-white`} id="what-we-do" aria-labelledby="services-title">
          <div className={containerClasses}>
            <div className="mb-[52px] grid grid-cols-[minmax(0,1.4fr)_minmax(280px,0.6fr)] items-end gap-12 max-[760px]:mb-10 max-[760px]:grid-cols-1 max-[760px]:gap-6">
              <div>
                <p className={sectionLabelClasses}>What We Do</p>
                <h2 className={headingTwoClasses} id="services-title">From wholesale purchase to responsible distribution</h2>
              </div>
              <p className="mb-1.5 text-[#646b70] max-[760px]:max-w-[560px]">Focused wholesale operations designed to move the right products through dependable channels</p>
            </div>

            <div className="border-t border-emr-light-gray">
              {services.map((service) => (
                <article
                  className="grid grid-cols-[88px_minmax(220px,0.85fr)_minmax(300px,1.15fr)] items-start gap-6 border-b border-emr-light-gray py-[30px] max-[760px]:grid-cols-[54px_1fr] max-[760px]:gap-4 max-[520px]:grid-cols-[42px_1fr]"
                  key={service.number}
                >
                  <span className="text-[0.78rem] font-bold tracking-[0.11em] text-[#626a6f]">{service.number}</span>
                  <h3 className="mb-2.5 text-[1.16rem] leading-[1.35] font-semibold tracking-[-0.035em] text-emr-navy">{service.title}</h3>
                  <p className="m-0 max-w-[520px] text-[#646b70] max-[760px]:col-start-2">{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${sectionClasses} bg-emr-surface`} id="sourcing" aria-labelledby="sourcing-title">
          <div className={`${containerClasses} grid grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] items-center gap-[clamp(48px,7vw,88px)] max-[960px]:grid-cols-1 max-[960px]:gap-10`}>
            <div>
              <p className={sectionLabelClasses}>Sourcing</p>
              <h2 className={headingTwoClasses} id="sourcing-title">A disciplined approach to product sourcing</h2>
              <p className="mt-[22px] mb-[26px] max-w-[530px] text-[1.05rem]">
                We evaluate sourcing opportunities carefully, with an emphasis on products that fit our distribution model and support sustainable, long-term purchasing relationships.
              </p>
              <a className={textLinkClasses} href="#contact">
                Discuss a sourcing opportunity
                <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" aria-hidden="true">↘</span>
              </a>
            </div>

            <div className="rounded-md border border-emr-border bg-white p-[clamp(30px,4vw,44px)]" aria-label="Sourcing considerations">
              <p className="mb-6 max-w-[420px] text-[#646b70]">Each opportunity is considered through a practical commercial lens.</p>
              <ul className="m-0 list-none p-0">
                {sourcingFactors.map((factor, index) => (
                  <li className="grid grid-cols-[48px_1fr] border-t border-emr-border py-3.5 font-semibold text-emr-navy" key={factor}>
                    <span className="text-[0.76rem] tracking-[0.08em] text-[#626a6f]">{String(index + 1).padStart(2, '0')}</span>
                    {factor}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className={`emr-grid emr-grid-linear ${sectionClasses} bg-white`} id="contact" aria-labelledby="contact-title">
          <div className={`${containerClasses} grid grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] items-start gap-[clamp(48px,7vw,88px)] max-[960px]:grid-cols-1 max-[960px]:gap-10`}>
            <div>
              <p className={sectionLabelClasses}>Get in Touch</p>
              <h2 className={headingTwoClasses} id="contact-title">Let&apos;s talk.</h2>
              <p className="mt-[22px] mb-8 max-w-[470px] text-[1.05rem]">Interested in discussing wholesale supply, inventory purchasing, distribution, or a sourcing opportunity? Get in touch with EMR Commerce.</p>

              <dl className="m-0 grid gap-5">
                <div className="grid gap-[3px]">
                  <dt className="text-[0.75rem] font-bold tracking-[0.12em] text-[#626a6f] uppercase">Email</dt>
                  <dd className="m-0 font-semibold text-emr-navy"><a className="hover:underline hover:underline-offset-[3px]" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></dd>
                </div>
                <div className="grid gap-[3px]">
                  <dt className="text-[0.75rem] font-bold tracking-[0.12em] text-[#626a6f] uppercase">Location</dt>
                  <dd className="m-0 font-semibold text-emr-navy">{siteConfig.location}</dd>
                </div>
                {siteConfig.phone && (
                  <div className="grid gap-[3px]">
                    <dt className="text-[0.75rem] font-bold tracking-[0.12em] text-[#626a6f] uppercase">Phone</dt>
                    <dd className="m-0 font-semibold text-emr-navy"><a className="hover:underline hover:underline-offset-[3px]" href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a></dd>
                  </div>
                )}
                {siteConfig.businessHours && (
                  <div className="grid gap-[3px]">
                    <dt className="text-[0.75rem] font-bold tracking-[0.12em] text-[#626a6f] uppercase">Business Hours</dt>
                    <dd className="m-0 font-semibold text-emr-navy">{siteConfig.businessHours}</dd>
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
