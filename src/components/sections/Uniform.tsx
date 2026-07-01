import { useEffect, useRef } from 'react'
import { Shirt, Check } from 'lucide-react'
import { accentTheme } from '../../constants/accentTheme'

const uniformGroups = [
  {
    cycle: 'Maternelle',
    items: [
      'Chemise blanche avec logo',
      'Short bleu marine',
      'Chaussettes blanches',
      'Chaussures noires',
      'Tablier de protection',
    ],
    color: 'afrika-orange',
  },
  {
    cycle: 'Primaire',
    items: [
      'Chemise blanche avec logo',
      'Pantalon bleu marine (garçons)',
      'Jupe bleu marine (filles)',
      'Cravate bleue',
      'Chaussettes blanches',
      'Chaussures noires',
    ],
    color: 'afrika-gold',
  },
  {
    cycle: 'Secondaire & Humanité',
    items: [
      'Chemise blanche avec logo',
      'Pantalon bleu marine (garçons)',
      'Jupe bleu marine (filles)',
      'Cravate bleue',
      'Blazer bleu marine',
      'Chaussettes blanches',
      'Chaussures noires',
    ],
    color: 'afrika-orange',
  },
]

export default function Uniform() {
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
    <section id="uniforme" ref={sectionRef} className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center opacity-0 animate-on-scroll md:mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest text-afrika-orange">Uniforme Scolaire</span>
          <h2 className="mt-3 font-display text-3xl font-black text-afrika-blue sm:text-4xl md:text-5xl md:mb-6 mb-4">
            Tenue <span className="text-gradient">obligatoire</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-afrika-blue/60 sm:text-lg">
            L'uniforme scolaire est obligatoire pour tous les élèves. Il favorise l'égalité, la discipline et l'identité institutionnelle.
          </p>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:mb-12 lg:grid-cols-3">
          {uniformGroups.map((group, index) => {
            const accent = accentTheme[group.color as keyof typeof accentTheme]
            return (
            <div
              key={index}
              className="rounded-2xl bg-afrika-cream p-6 opacity-0 animate-on-scroll sm:p-8"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl sm:mb-6 ${accent.bgSoft}`}
              >
                <Shirt className={`h-7 w-7 ${accent.text}`} />
              </div>
              <h3 className="font-display font-bold text-xl text-afrika-blue mb-6">{group.cycle}</h3>
              <ul className="space-y-3">
                {group.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-afrika-blue/70">
                    <Check className={`mt-0.5 h-5 w-5 shrink-0 ${accent.text}`} />
                    <span className="text-sm leading-relaxed sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            )
          })}
        </div>

        <div className="rounded-2xl bg-afrika-blue p-6 text-center opacity-0 animate-on-scroll sm:p-8">
          <h3 className="mb-4 font-display text-xl font-bold text-white sm:text-2xl">Articles fournis par l'école</h3>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {['Badge avec photo', "Carte d'élève", 'Manuels scolaires', 'Fournitures de base'].map((item, index) => (
              <span
                key={index}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs text-white sm:px-6 sm:py-3 sm:text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
