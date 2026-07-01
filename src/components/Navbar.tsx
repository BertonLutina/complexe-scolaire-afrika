import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#a-propos', label: 'À Propos' },
  { href: '#cycles', label: 'Cycles' },
  { href: '#frais', label: 'Frais' },
  { href: '#uniforme', label: 'Uniforme' },
  { href: '#galerie', label: 'Galerie' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-dark py-3 shadow-lg' : 'bg-transparent py-4 sm:py-5'
      } pt-[max(0.5rem,env(safe-area-inset-top))]`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          <a href="#accueil" className="group flex min-w-0 items-center gap-2 sm:gap-3">
            <img
              src="/images/logo.png"
              alt=""
              className="h-9 w-auto shrink-0 object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105 sm:h-11"
              width={120}
              height={120}
            />
            <div className="hidden min-[380px]:flex flex-col">
              <span className="font-display text-[10px] font-bold uppercase leading-tight tracking-wider text-white/70 sm:text-xs">
                COMPLEXE SCOLAIRE
              </span>
              <span className="font-display text-base font-black uppercase leading-tight tracking-widest text-afrika-orange sm:text-lg">
                AFRIKA
              </span>
            </div>
          </a>

          <div className="hidden items-center gap-6 md:flex lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-afrika-orange transition-colors text-sm font-medium relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-afrika-orange group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <a
              href="#contact"
              className="px-5 py-2.5 bg-afrika-orange hover:bg-afrika-orange-light text-white font-semibold text-sm rounded-full transition-all hover:shadow-lg hover:shadow-afrika-orange/30"
            >
              Inscription
            </a>
          </div>

          <button
            type="button"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-xl p-2 text-white md:hidden"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mx-3 mt-3 max-h-[min(70vh,calc(100dvh-5.5rem))] overflow-y-auto rounded-2xl border border-white/10 glass-dark p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-lg py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-afrika-orange"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-5 py-3 bg-afrika-orange text-white font-semibold text-sm rounded-full text-center mt-2"
            >
              Inscription
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
