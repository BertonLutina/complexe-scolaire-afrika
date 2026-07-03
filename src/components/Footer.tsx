import { MapPin, Phone, Heart } from 'lucide-react'

const quickLinks = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#a-propos', label: 'À Propos' },
  { href: '#cycles', label: 'Nos Cycles' },
  { href: '#calendrier', label: 'Calendrier Scolaire' },
  { href: '#frais', label: 'Frais Scolaires' },
  { href: '#uniforme', label: 'Uniforme' },
  { href: '#galerie', label: 'Galerie' },
  { href: '#contact', label: 'Contact' },
]

const cycles = [
  'Maternelle (3, 4, 5 ans)',
  'Primaire (Cycle Complet)',
  'Secondaire (7ème & 8ème)',
  'Humanité (6 Options)',
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-afrika-blue-light/25 via-afrika-blue to-afrika-blue-dark pb-[max(2rem,env(safe-area-inset-bottom))] pt-16 md:pt-20">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-0 left-1/2 h-40 w-[min(100%,28rem)] -translate-x-1/2 bg-afrika-orange/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 md:mb-16 lg:grid-cols-4 lg:gap-10">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/images/logo.png"
                alt=""
                className="h-20 w-auto object-contain shrink-0 sm:h-24"
                width={180}
                height={180}
              />
              <div className="flex flex-col">
                <span className="text-white/70 font-display font-bold text-xs leading-tight tracking-wide">
                  COMPLEXE SCOLAIRE
                </span>
                <span className="text-afrika-orange font-display font-black text-lg leading-tight tracking-widest">
                  AFRIKA
                </span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Institution d'enseignement privée fondée en 1988, engagée dans
              l'excellence académique et le développement holistique de
              chaque élève.
            </p>
            <div className="flex items-center gap-2 text-afrika-gold text-sm font-semibold">
              <span className="w-8 h-px bg-afrika-gold/50" />
              Créé en 1988
              <span className="w-8 h-px bg-afrika-gold/50" />
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-6">Liens Rapides</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-white/50 hover:text-afrika-orange transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-afrika-orange transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-6">Nos Cycles</h4>
            <ul className="space-y-3">
              {cycles.map((cycle, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-afrika-orange" />
                  <span className="text-white/50 text-sm">{cycle}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-afrika-orange shrink-0 mt-0.5" />
                <span className="text-white/50 text-sm">
                  Nº 16, 7ème Rue, Quartier Industriel
                  <br />
                  Commune de Limete, Kinshasa, RDC
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-afrika-orange shrink-0" />
                <div className="text-white/50 text-sm">
                  <div>(+243) 899 170 401</div>
                  <div>(+243) 904 937 213</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-8 flex h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} Complexe Scolaire Afrika. Tous droits réservés.
          </p>
          <p className="text-white/30 text-sm flex items-center gap-1">
            Fait avec <Heart className="w-3 h-3 text-afrika-orange fill-afrika-orange" /> pour l'éducation
          </p>
        </div>
      </div>
    </footer>
  )
}
