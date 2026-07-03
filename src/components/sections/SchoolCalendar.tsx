import { useEffect, useRef } from 'react'
import { CalendarDays, PartyPopper } from 'lucide-react'

const milestones = [
  { date: '1er septembre 2026', label: 'Rentrée scolaire 2026-2027' },
  { date: '5 au 7 novembre 2026', label: 'Congé de détente du 1er trimestre' },
  { date: '23 décembre 2026 au 9 janvier 2027', label: 'Vacances de Noël (fin du 1er trimestre)' },
  { date: '18 au 20 février 2027', label: 'Congé de détente du 2ème trimestre' },
  { date: '22 mars au 3 avril 2027', label: 'Vacances de Pâques (fin du 2ème trimestre)' },
  { date: '3 et 4 juin 2027', label: "TENASOSP — Test National d'Orientation Scolaire" },
  { date: '8 et 9 juin 2027', label: "ENAFEP — Examen National de Fin d'Études Primaires" },
  { date: '21 au 24 juin 2027', label: "Examen d'État — session ordinaire" },
  { date: '2 juillet 2027', label: "Clôture de l'année scolaire 2026-2027" },
  { date: '1er septembre 2027', label: 'Rentrée scolaire suivante (2027-2028)' },
]

const holidays = [
  { date: '25 décembre', label: 'Fête de la Nativité' },
  { date: '1er janvier', label: 'Fête du Nouvel An' },
  { date: '4 janvier', label: "Martyrs de l'Indépendance" },
  { date: '6 avril', label: 'Combat de Simon Kimbangu' },
  { date: '1er mai', label: 'Fête du Travail' },
  { date: '30 juin', label: "Fête de l'Indépendance" },
]

export default function SchoolCalendar() {
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
    <section id="calendrier" ref={sectionRef} className="bg-afrika-cream py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center opacity-0 animate-on-scroll md:mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest text-afrika-orange">Année Scolaire 2026-2027</span>
          <h2 className="mt-3 font-display text-3xl font-black text-afrika-blue sm:text-4xl md:text-5xl md:mb-6 mb-4">
            Calendrier <span className="text-gradient">scolaire</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-afrika-blue/60 sm:text-lg">
            Les dates clés de l'année scolaire 2026-2027, conformes au calendrier officiel du Ministère de l'Éducation Nationale et Nouvelle Citoyenneté.
          </p>
        </div>

        <div className="mb-10 overflow-hidden rounded-2xl bg-white p-5 opacity-0 shadow-sm animate-on-scroll sm:rounded-3xl sm:p-8 md:mb-12">
          <ul className="divide-y divide-afrika-blue/10">
            {milestones.map((item, index) => (
              <li key={index} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:gap-6 sm:py-5">
                <div className="flex shrink-0 items-center gap-2 sm:w-64">
                  <CalendarDays className="h-4 w-4 shrink-0 text-afrika-orange" />
                  <span className="text-sm font-semibold text-afrika-blue sm:text-base">{item.date}</span>
                </div>
                <span className="text-sm leading-relaxed text-afrika-blue/70 sm:text-base">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-afrika-blue p-6 opacity-0 animate-on-scroll sm:rounded-3xl sm:p-10 md:p-12">
          <div className="mb-6 flex items-center gap-3 sm:mb-8">
            <PartyPopper className="h-6 w-6 shrink-0 text-afrika-gold" />
            <h3 className="font-display text-xl font-bold text-white sm:text-2xl">Jours fériés légaux</h3>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {holidays.map((holiday, index) => (
              <span
                key={index}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white sm:px-4 sm:py-2 sm:text-sm"
              >
                <span className="font-semibold text-afrika-gold">{holiday.date}</span> — {holiday.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
