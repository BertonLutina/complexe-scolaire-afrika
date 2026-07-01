import { useEffect, useRef } from 'react'
import { Target, Heart, Lightbulb, Shield } from 'lucide-react'
import { accentTheme } from '../../constants/accentTheme'

const values = [
  {
    icon: Target,
    title: 'Excellence',
    description: "Nous visons l'excellence dans tous les aspects de l'éducation.",
    color: 'afrika-orange',
  },
  {
    icon: Heart,
    title: 'Holistique',
    description: 'Un développement complet de chaque enfant : intellectuel, physique et moral.',
    color: 'afrika-gold',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: "Méthodes pédagogiques modernes et technologie au service de l'apprentissage.",
    color: 'afrika-orange',
  },
  {
    icon: Shield,
    title: 'Valeurs',
    description: 'Respect, intégrité, discipline et solidarité au cœur de notre enseignement.',
    color: 'afrika-gold',
  },
]

export default function About() {
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
    <section id="a-propos" ref={sectionRef} className="bg-afrika-cream py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center opacity-0 animate-on-scroll md:mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest text-afrika-orange">À Propos de nous</span>
          <h2 className="mt-3 font-display text-3xl font-black text-afrika-blue sm:text-4xl md:text-5xl md:mb-6 mb-4">
            Une institution d'<span className="text-gradient">excellence</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-afrika-blue/60 sm:text-lg">
            Fondé en 1988, le Complexe Scolaire Afrika s'engage à offrir une éducation de qualité
            qui prépare les jeunes aux défis du monde moderne tout en préservant les valeurs africaines.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {values.map((value, index) => {
            const accent = accentTheme[value.color as keyof typeof accentTheme]
            const Icon = value.icon
            return (
            <div
              key={index}
              className="group rounded-2xl bg-white p-6 opacity-0 shadow-lg transition-all animate-on-scroll hover:-translate-y-2 hover:shadow-xl sm:p-8"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div
                className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl sm:mb-6 ${accent.bgSoft} transition-transform group-hover:scale-110`}
              >
                <Icon className={`h-7 w-7 ${accent.text}`} />
              </div>
              <h3 className="font-display font-bold text-xl text-afrika-blue mb-3">{value.title}</h3>
              <p className="text-afrika-blue/60 leading-relaxed">{value.description}</p>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
