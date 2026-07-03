import { useEffect, useRef } from 'react'
import { CreditCard, AlertCircle } from 'lucide-react'

const feeTheme = {
  'afrika-orange': {
    header: 'bg-afrika-orange text-white',
    border: 'border-afrika-orange',
    total: 'text-afrika-orange',
  },
  'afrika-gold': {
    header: 'bg-afrika-gold text-afrika-blue',
    border: 'border-afrika-gold',
    total: 'text-afrika-gold',
  },
} as const

type FeeColor = keyof typeof feeTheme

const fees: {
  cycle: string
  tranches: { name: string; amount: string }[]
  total: string
  color: FeeColor
}[] = [
  {
    cycle: 'Maternelle',
    tranches: [
      { name: '1ère Tranche', amount: '150 000 FC' },
      { name: '2ème Tranche', amount: '100 000 FC' },
      { name: '3ème Tranche', amount: '100 000 FC' },
    ],
    total: '350 000 FC',
    color: 'afrika-orange',
  },
  {
    cycle: 'Primaire',
    tranches: [
      { name: '1ère Tranche', amount: '200 000 FC' },
      { name: '2ème Tranche', amount: '150 000 FC' },
      { name: '3ème Tranche', amount: '150 000 FC' },
    ],
    total: '500 000 FC',
    color: 'afrika-gold',
  },
  {
    cycle: 'Secondaire',
    tranches: [
      { name: '1ère Tranche', amount: '250 000 FC' },
      { name: '2ème Tranche', amount: '200 000 FC' },
      { name: '3ème Tranche', amount: '200 000 FC' },
    ],
    total: '650 000 FC',
    color: 'afrika-orange',
  },
  {
    cycle: 'Humanité',
    tranches: [
      { name: '1ère Tranche', amount: '300 000 FC' },
      { name: '2ème Tranche', amount: '250 000 FC' },
      { name: '3ème Tranche', amount: '250 000 FC' },
    ],
    total: '800 000 FC',
    color: 'afrika-gold',
  },
]

export default function Fees() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="frais" ref={sectionRef} className="bg-afrika-cream py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center opacity-0 animate-on-scroll md:mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest text-afrika-orange">Frais Scolaires</span>
          <h2 className="mt-3 font-display text-3xl font-black text-afrika-blue sm:text-4xl md:text-5xl md:mb-6 mb-4">
            Tarifs <span className="text-gradient">2026-2027</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-afrika-blue/60 sm:text-lg">
            Des frais de scolarité transparents et accessibles, avec possibilité de paiement en plusieurs tranches.
          </p>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-5 md:mb-12 md:grid-cols-2 md:gap-6">
          {fees.map((fee, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl bg-white opacity-0 shadow-lg transition-all animate-on-scroll hover:shadow-xl"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`${feeTheme[fee.color].header} px-4 py-4 sm:p-6`}>
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 shrink-0 opacity-90 sm:h-6 sm:w-6" />
                  <h3 className="font-display text-lg font-bold sm:text-xl">{fee.cycle}</h3>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="mb-6 space-y-2 sm:space-y-3">
                  {fee.tranches.map((tranche, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-0.5 border-b border-afrika-cream py-2 last:border-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                    >
                      <span className="text-sm text-afrika-blue/70 sm:text-base">{tranche.name}</span>
                      <span className="font-semibold text-afrika-blue sm:text-right">{tranche.amount}</span>
                    </div>
                  ))}
                </div>
                <div
                  className={`flex flex-col gap-1 border-t-2 pt-4 sm:flex-row sm:items-center sm:justify-between ${feeTheme[fee.color].border}`}
                >
                  <span className="font-semibold text-afrika-blue">Total annuel</span>
                  <span className={`font-display text-xl font-black sm:text-2xl ${feeTheme[fee.color].total}`}>
                    {fee.total}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start gap-4 rounded-2xl bg-white p-5 opacity-0 animate-on-scroll sm:flex-row sm:p-6">
          <AlertCircle className="w-6 h-6 text-afrika-orange shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-afrika-blue mb-2">Informations importantes</h4>
            <ul className="text-afrika-blue/60 space-y-1 text-sm">
              <li>Les frais d'inscription sont de 50 000 FC pour tous les cycles.</li>
              <li>Possibilité de paiement en 3 tranches sans frais supplémentaires.</li>
              <li>Réduction de 10% pour les familles avec 2 enfants et plus inscrits.</li>
              <li>Bourses d'étude disponibles sur demande et selon critères.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
