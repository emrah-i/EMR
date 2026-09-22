import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '../config'

const navigation = [
  { label: 'About', href: '#about' },
  { label: 'What We Do', href: '#what-we-do' },
  { label: 'Sourcing', href: '#sourcing' },
]

const navLinkClasses =
  "relative py-2 after:absolute after:right-0 after:bottom-0.5 after:left-0 after:h-px after:origin-right after:scale-x-0 after:bg-emr-navy after:content-[''] after:transition-transform after:duration-200 hover:after:origin-left hover:after:scale-x-100 focus-visible:after:origin-left focus-visible:after:scale-x-100 max-[760px]:px-3 max-[760px]:py-3 max-[760px]:after:hidden"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  return (
    <header className="sticky top-0 z-[100] h-[82px] border-b border-emr-light-gray/65 bg-white/95 backdrop-blur-[14px] max-[960px]:h-[72px]">
      <div className="relative mx-auto flex h-full w-[calc(100%_-_3rem)] max-w-[1160px] items-center justify-between max-[760px]:w-[calc(100%_-_2rem)]">
        <a href="#top" aria-label={`${siteConfig.companyName} home`} onClick={closeMenu}>
          <img className="h-auto w-[132px] max-[960px]:w-28" src="/emr-commerce-logo.png" alt="EMR Commerce" />
        </a>

        <button
          ref={menuButtonRef}
          className="hidden h-11 w-11 cursor-pointer rounded-md border border-emr-border bg-white p-3 max-[760px]:block"
          type="button"
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className="my-[5px] block h-0.5 w-full bg-emr-navy" />
          <span className="my-[5px] block h-0.5 w-full bg-emr-navy" />
          <span className="my-[5px] block h-0.5 w-full bg-emr-navy" />
        </button>

        <nav
          id="primary-navigation"
          className={`flex items-center gap-[clamp(22px,2.5vw,36px)] text-[0.9rem] font-semibold text-[#384047] max-[760px]:absolute max-[760px]:top-[calc(100%+1px)] max-[760px]:right-4 max-[760px]:left-4 max-[760px]:flex-col max-[760px]:items-stretch max-[760px]:gap-0.5 max-[760px]:rounded-md max-[760px]:border max-[760px]:border-emr-border max-[760px]:bg-white max-[760px]:p-3 max-[760px]:shadow-[0_18px_50px_rgb(7_39_81_/_14%)] ${isOpen ? 'max-[760px]:flex' : 'max-[760px]:hidden'}`}
          aria-label="Primary navigation"
        >
          {navigation.map((item) => (
            <a className={navLinkClasses} key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <a
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-emr-navy bg-emr-navy px-[18px] py-[11px] text-[0.85rem] font-bold leading-[1.2] text-white transition duration-200 hover:-translate-y-px hover:bg-emr-navy-light motion-reduce:transform-none max-[760px]:mt-2"
            href="#contact"
            onClick={closeMenu}
          >
            Get in Touch
          </a>
        </nav>
      </div>
    </header>
  )
}
