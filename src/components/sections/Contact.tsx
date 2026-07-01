import { useEffect, useRef, useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import { accentTheme } from '../../constants/accentTheme'

const contactInfo = [
  {
    icon: MapPin,
    label: 'Adresse',
    value: '13, 7ème Rue Industriel\nC/Limeté, Kinshasa, RDC',
    color: 'afrika-orange',
  },
  {
    icon: Phone,
    label: 'Téléphone',
    value: '(+243) 899 170 401\n(+243) 904 937 213',
    color: 'afrika-gold',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@afrika.edu\nadmission@afrika.edu',
    color: 'afrika-orange',
  },
  {
    icon: Clock,
    label: 'Horaires',
    value: 'Lundi - Vendredi : 7h30 - 16h\nSamedi : 8h - 12h',
    color: 'afrika-gold',
  },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const apiUrl = import.meta.env.VITE_API_URL || ''
      const res = await fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error('request failed')
      setStatus('idle')
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="bg-afrika-cream py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center opacity-0 animate-on-scroll md:mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest text-afrika-orange">Contactez-nous</span>
          <h2 className="mt-3 font-display text-3xl font-black text-afrika-blue sm:text-4xl md:text-5xl md:mb-6 mb-4">
            Rejoignez <span className="text-gradient">l'excellence</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-afrika-blue/60 sm:text-lg">
            Inscrivez votre enfant dès maintenant ou contactez-nous pour plus d'informations.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12">
          <div className="space-y-4 opacity-0 animate-on-scroll sm:space-y-6">
            {contactInfo.map((info, index) => {
              const accent = accentTheme[info.color as keyof typeof accentTheme]
              const Icon = info.icon
              return (
              <div key={index} className="flex items-start gap-4 rounded-2xl bg-white p-4 sm:gap-5 sm:p-6">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${accent.bgSoft}`}
                >
                  <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${accent.text}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="mb-1 font-semibold text-afrika-blue">{info.label}</h4>
                  <p className="whitespace-pre-line break-words text-sm text-afrika-blue/60 sm:text-base">
                    {info.value}
                  </p>
                </div>
              </div>
              )
            })}
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-lg opacity-0 animate-on-scroll sm:p-8">
            <h3 className="mb-5 font-display text-xl font-bold text-afrika-blue sm:mb-6 sm:text-2xl">Formulaire d'inscription</h3>
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-green-800 mb-2">Message envoyé !</h4>
                <p className="text-green-600">Nous vous contacterons dans les plus brefs délais.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-afrika-blue mb-2">Nom complet</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-afrika-blue/10 focus:border-afrika-orange focus:ring-2 focus:ring-afrika-orange/20 outline-none transition-all bg-afrika-cream"
                    placeholder="Votre nom complet"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-afrika-blue mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-afrika-blue/10 focus:border-afrika-orange focus:ring-2 focus:ring-afrika-orange/20 outline-none transition-all bg-afrika-cream"
                      placeholder="votre@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-afrika-blue mb-2">Téléphone</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-afrika-blue/10 focus:border-afrika-orange focus:ring-2 focus:ring-afrika-orange/20 outline-none transition-all bg-afrika-cream"
                      placeholder="+243 ..."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-afrika-blue mb-2">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-afrika-blue/10 focus:border-afrika-orange focus:ring-2 focus:ring-afrika-orange/20 outline-none transition-all bg-afrika-cream resize-none"
                    placeholder="Votre message ou questions..."
                  />
                </div>
                {status === 'error' && (
                  <p className="text-sm text-red-600">
                    Une erreur est survenue lors de l'envoi. Merci de réessayer, ou de nous appeler directement.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-afrika-orange hover:bg-afrika-orange-light text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-afrika-orange/30 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                  {status === 'loading' ? 'Envoi en cours...' : 'Envoyer ma demande'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
