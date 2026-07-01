import { MapPin, Phone, Calendar, Users } from 'lucide-react'
import { accentTheme } from '../../constants/accentTheme'

const stats = [
  {
    icon: MapPin,
    label: 'Adresse',
    value: '13, 7ème Rue Industriel, C/Limeté',
    color: 'afrika-orange',
  },
  {
    icon: Phone,
    label: 'Téléphone',
    value: '(+243) 899 170 401',
    color: 'afrika-gold',
  },
  {
    icon: Calendar,
    label: 'Année de création',
    value: '1988',
    color: 'afrika-orange',
  },
  {
    icon: Users,
    label: 'Élèves inscrits',
    value: '500+',
    color: 'afrika-gold',
  },
]

export default function Stats() {
  return (
    <section className="relative z-10 -mt-12 sm:-mt-16 md:-mt-20 px-0 sm:px-0">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const accent = accentTheme[stat.color as keyof typeof accentTheme]
            const Icon = stat.icon
            return (
            <div
              key={index}
              className="group rounded-2xl border border-afrika-blue/5 bg-white/90 p-4 shadow-lg backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl sm:p-6"
            >
              <div
                className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl sm:mb-4 sm:h-12 sm:w-12 ${accent.bgSoft} transition-transform group-hover:scale-110 sm:rounded-xl`}
              >
                <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${accent.text}`} />
              </div>
              <div className="mb-1 text-xs text-afrika-blue/60 sm:text-sm">{stat.label}</div>
              <div className="break-words text-base font-bold leading-snug text-afrika-blue sm:text-lg">
                {stat.value}
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
