import type { ReactNode } from 'react'

type IconProps = {
  className?: string
}

const iconClasses = 'h-5 w-5 text-emr-navy'

function SourceIcon({ className = iconClasses }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="m8 15 16-9 16 9v18l-16 9-16-9V15Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="m8 15 16 9 16-9M24 24v18M16 10.5l16 9" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  )
}

function PurchaseIcon({ className = iconClasses }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M7 9h5l4.5 22h21L41 16H14" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="20" cy="38" r="2.8" fill="currentColor" />
      <circle cx="36" cy="38" r="2.8" fill="currentColor" />
    </svg>
  )
}

function DistributionIcon({ className = iconClasses }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M5 14h24v21H5V14Zm24 8h8l6 7v6H29V22Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 21h9M1 27h7M1 33h5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="13" cy="36" r="4" fill="#eef5fb" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="36" cy="36" r="4" fill="#eef5fb" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  )
}

function PartnersIcon({ className = iconClasses }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="15" r="6" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="10" cy="21" r="4.5" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="38" cy="21" r="4.5" stroke="currentColor" strokeWidth="2.5" />
      <path d="M14 41v-3c0-6 4.5-10 10-10s10 4 10 10v3M2 38v-2c0-4.5 3.2-7.5 7.5-8M46 38v-2c0-4.5-3.2-7.5-7.5-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

type FlowStepProps = {
  icon: ReactNode
  label: string
  supportingLabel: string
  last?: boolean
}

function FlowStep({ icon, label, supportingLabel, last = false }: FlowStepProps) {
  return (
    <li className={`relative ${last ? '' : 'pb-2.5'}`}>
      <div className="grid grid-cols-[minmax(0,1fr)_64px_minmax(0,1fr)] items-center max-[520px]:grid-cols-1 max-[520px]:justify-items-center">
        <span aria-hidden="true" />
        <div className="flex flex-col items-center text-center">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#eef5fb] ring-1 ring-[#e2edf7]">
            {icon}
          </span>
          <strong className="mt-1 text-[0.75rem] leading-tight font-semibold text-emr-navy">{label}</strong>
        </div>
        <span className="ml-2 flex items-center gap-1.5 text-[0.7rem] leading-[1.3] font-medium text-[#5d7592] max-[520px]:mt-1 max-[520px]:ml-0 max-[520px]:justify-center max-[520px]:text-center">
          <span className="flex items-center max-[520px]:hidden" aria-hidden="true">
            <span className="h-px w-4 bg-[#8eb9e3]" />
            <span className="h-1.5 w-1.5 rounded-md bg-[#77abe0]" />
          </span>
          {supportingLabel}
        </span>
      </div>
      {!last && (
        <span className="absolute bottom-0 left-1/2 flex h-2.5 -translate-x-1/2 flex-col items-center text-[#77abe0]" aria-hidden="true">
          <span className="h-1 w-px bg-[#8eb9e3]" />
          <svg className="h-2 w-2" viewBox="0 0 10 10" fill="none">
            <path d="m2 3 3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </li>
  )
}

export function DistributionModel() {
  return (
    <aside
      className="relative w-full max-w-[360px] justify-self-center rounded-md border border-emr-border bg-white px-[clamp(18px,2.4vw,26px)] py-[clamp(14px,1.7vw,18px)] shadow-[0_22px_70px_rgb(7_39_81_/_10%)] max-[960px]:max-w-[420px]"
      aria-labelledby="distribution-model-title"
    >
      <div className="mb-2 text-center">
        <h2 className="m-0 text-[clamp(1.1rem,1.7vw,1.3rem)] leading-[1.18] font-semibold tracking-[-0.03em] text-emr-navy" id="distribution-model-title">
          A Focused Distribution Model
        </h2>
        <p className="mt-1 text-[0.72rem] leading-[1.45] text-[#64778d]">Disciplined purchasing. Responsible distribution.</p>
      </div>

      <ol className="m-0 list-none p-0" aria-label="EMR Commerce distribution process">
        <FlowStep icon={<SourceIcon />} label="Source" supportingLabel="Quality products" />
        <FlowStep icon={<PurchaseIcon />} label="Purchase" supportingLabel="Inventory planning" />

        <li className="relative pb-2.5">
          <div className="grid grid-cols-[minmax(0,1fr)_64px_minmax(0,1fr)] items-center max-[520px]:grid-cols-1 max-[520px]:justify-items-center">
            <span aria-hidden="true" />
            <div className="flex h-16 w-16 items-center justify-center rounded-md bg-emr-navy p-1 shadow-[0_8px_24px_rgb(7_39_81_/_16%)]" aria-label="EMR Commerce">
              <img className="h-full w-full object-contain" src="/brand/emr-logo-white.png" alt="EMR Commerce" />
            </div>
            <span aria-hidden="true" />
          </div>
          <span className="absolute bottom-0 left-1/2 flex h-2.5 -translate-x-1/2 flex-col items-center text-[#77abe0]" aria-hidden="true">
            <span className="h-1 w-px bg-[#8eb9e3]" />
            <svg className="h-2 w-2" viewBox="0 0 10 10" fill="none">
              <path d="m2 3 3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </li>

        <FlowStep icon={<DistributionIcon />} label="Distribute" supportingLabel="Logistics" />
        <FlowStep icon={<PartnersIcon />} label="Sales Channels" supportingLabel="Partners" last />
      </ol>
    </aside>
  )
}
