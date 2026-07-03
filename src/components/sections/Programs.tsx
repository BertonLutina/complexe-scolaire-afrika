import { useEffect, useRef } from 'react'
import { Baby, BookOpen, School, GraduationCap, ChevronRight } from 'lucide-react'
import { accentTheme } from '../../constants/accentTheme'

const cycles = [
  {
    icon: Baby,
    title: 'Maternelle',
    subtitle: '3, 4 et 5 ans',
    description: "Premier pas dans l'apprentissage avec une approche ludique et affective. Développement de la motricité, du langage et de la socialisation.",
    color: 'afrika-orange',
    features: ['Apprentissage par le jeu', 'Développement du langage', 'Motricité fine et globale'],
  },
  {
    icon: BookOpen,
    title: 'Primaire',
    subtitle: '1ère à 6ème année',
    description: 'Acquisition des fondamentaux : lecture, écriture, mathématiques et sciences. Préparation solide pour le secondaire.',
    color: 'afrika-gold',
    features: ['Lecture et écriture', 'Mathématiques', 'Sciences et technologie'],
  },
  {
    icon: School,
    title: 'Secondaire',
    subtitle: '7ème et 8ème année',
    description: "Approfondissement des connaissances et préparation aux humanités. Développement de l'esprit critique et de l'autonomie.",
    color: 'afrika-orange',
    features: ['Sciences approfondies', 'Langues (Français, Anglais)', 'Mathématiques avancées'],
  },
  {
    icon: GraduationCap,
    title: 'Humanités',
    subtitle: '6 options disponibles',
    description: 'Formation complète préparant aux études supérieures et à la vie professionnelle avec un encadrement de qualité.',
    color: 'afrika-gold',
    features: ['Scientifique', 'Littéraire', 'Commercial et Gestion', 'Pédagogie'],
  },
]

const options = [
  'Électricité',
  'Littéraire',
  'Commercial et Gestion',
  'Coupe et Couture',
  'Pédagogie',
  'Scientifique',
]

export default function Programs() {
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
    <section id="cycles" ref={sectionRef} className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center opacity-0 animate-on-scroll md:mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest text-afrika-orange">Nos Cycles</span>
          <h2 className="mt-3 font-display text-3xl font-black text-afrika-blue sm:text-4xl md:text-5xl md:mb-6 mb-4">
            De la maternelle aux <span className="text-gradient">humanités</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-afrika-blue/60 sm:text-lg">
            Un parcours éducatif complet et structuré pour accompagner chaque enfant de ses premiers pas jusqu'à l'obtention du diplôme d'état.
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-5 md:mb-16 md:grid-cols-2 md:gap-6">
          {cycles.map((cycle, index) => {
            const accent = accentTheme[cycle.color as keyof typeof accentTheme]
            const Icon = cycle.icon
            return (
            <div
              key={index}
              className="group rounded-2xl bg-afrika-cream p-5 opacity-0 shadow-sm transition-all animate-on-scroll hover:-translate-y-1 hover:shadow-xl sm:p-8"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl sm:h-14 sm:w-14 ${accent.bgSoft} transition-transform group-hover:scale-110`}
                >
                  <Icon className={`h-6 w-6 sm:h-7 sm:w-7 ${accent.text}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                    <h3 className="font-display text-lg font-bold text-afrika-blue sm:text-xl">{cycle.title}</h3>
                    <span className="rounded-full bg-afrika-orange/10 px-3 py-1 text-xs font-semibold text-afrika-orange">
                      {cycle.subtitle}
                    </span>
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-afrika-blue/60 sm:text-base">{cycle.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {cycle.features.map((feature, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-afrika-blue/10 bg-white px-2.5 py-1 text-xs text-afrika-blue/70 sm:px-3 sm:py-1.5"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            )
          })}
        </div>

        <div className="rounded-2xl bg-afrika-blue p-6 opacity-0 animate-on-scroll sm:rounded-3xl sm:p-10 md:p-12">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center lg:gap-8">
            <div>
              <h3 className="mb-2 font-display text-xl font-bold text-white sm:text-2xl">Options d'Humanité</h3>
              <p className="max-w-xl text-sm text-white/60 sm:text-base">
                6 filières d'excellence pour préparer l'avenir professionnel de chaque élève selon ses aspirations et ses talents.
              </p>
            </div>
            <div className="flex w-full flex-wrap gap-2 sm:gap-3 lg:max-w-xl lg:justify-end xl:max-w-none">
              {options.map((option, index) => (
                <span
                  key={index}
                  className="cursor-default rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-all hover:border-afrika-orange hover:bg-afrika-orange/20 sm:px-4 sm:py-2 sm:text-sm"
                >
                  {option}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6 flex items-start gap-2 border-t border-white/10 pt-6 text-afrika-gold sm:mt-8 sm:items-center sm:pt-8">
            <ChevronRight className="mt-0.5 h-5 w-5 shrink-0 sm:mt-0" />
            <span className="text-sm font-semibold leading-snug sm:text-base">Toutes nos filières préparent au diplôme d'état (D6)</span>
          </div>
        </div>
      </div>
    </section>
  )
}
