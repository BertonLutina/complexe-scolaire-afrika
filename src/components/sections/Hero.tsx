import { ArrowRight, Sparkles, Users, BookOpen, Award } from 'lucide-react'

const SCHOOL_FOUNDED_YEAR = 1988

export default function Hero() {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() // 0-indexed: 8 = September
  const schoolYearStart = currentMonth >= 8 ? currentYear : currentYear - 1
  const schoolYearEnd = schoolYearStart + 1
  const yearsExperience = Math.max(0, new Date().getFullYear() - SCHOOL_FOUNDED_YEAR)
  const experienceLabel = yearsExperience === 1 ? '1 an' : `${yearsExperience} ans`

  return (
    <section
      id="accueil"
      className="relative isolate flex min-h-[100dvh] items-center overflow-hidden bg-afrika-blue"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/backgroundimage.png"
            alt=""
            width={1920}
            height={1080}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover blur-xl sm:blur-2xl scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-afrika-blue/10 via-afrika-sky/28 to-afrika-gold-light/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-afrika-blue/50 via-afrika-blue/35 to-afrika-sky-light/5" />
        <div className="absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-afrika-mint/25 blur-3xl" />
        <div className="absolute top-1/4 right-0 h-96 w-96 rounded-full bg-afrika-orange/28 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-afrika-gold/25 blur-3xl" />
        <div className="absolute right-1/4 top-10 h-64 w-64 rounded-full bg-afrika-sky-light/35 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-[max(5rem,env(safe-area-inset-bottom))] pt-24 sm:px-6 sm:pb-24 sm:pt-28 md:pt-32 lg:px-8 lg:pb-28 lg:pt-36">
        <div className="grid items-center gap-8 md:gap-10 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <div className="order-1 space-y-6 sm:space-y-8 lg:col-span-7">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-afrika-sky-light/40 bg-white/20 px-3 py-2 text-xs font-medium text-white shadow-sm backdrop-blur-sm animate-fade-in-up sm:px-4 sm:text-sm">
            <Sparkles className="h-4 w-4 shrink-0" />
            <span className="truncate sm:whitespace-normal">
              Inscriptions {schoolYearStart}-{schoolYearEnd} ouvertes
            </span>
          </div>

          <h1
            className="animate-fade-in-up font-display text-[2.25rem] font-black leading-[1.1] text-white sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ animationDelay: '0.2s' }}
          >
            Complexe
            <span className="block text-gradient">Scolaire Afrika</span>
          </h1>

          <p
            className="max-w-xl text-base leading-relaxed text-white/80 animate-fade-in-up sm:text-lg"
            style={{ animationDelay: '0.4s' }}
          >
            Excellence académique depuis 1988. Nous formons les leaders de demain
            à travers une éducation holistique et innovante à Kinshasa.
          </p>

          <div
            className="flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap sm:gap-4 animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            <a
              href="#contact"
              className="group flex w-full min-[420px]:w-auto items-center justify-center gap-2 rounded-full bg-afrika-orange px-6 py-3.5 font-semibold text-white transition-all hover:bg-afrika-orange-light hover:shadow-lg hover:shadow-afrika-orange/30 sm:px-8 sm:py-4"
            >
              S'inscrire maintenant
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#cycles"
              className="w-full min-[420px]:w-auto rounded-full border border-white/35 px-6 py-3.5 text-center font-semibold text-white transition-all hover:border-afrika-sky-light hover:bg-white/15 hover:shadow-md hover:shadow-afrika-sky/20 sm:px-8 sm:py-4"
            >
              Découvrir nos cycles
            </a>
          </div>

          <div
            className="grid grid-cols-3 gap-2 pt-2 animate-fade-in-up sm:flex sm:flex-wrap sm:gap-x-8 sm:gap-y-6 sm:pt-4 md:pt-8"
            style={{ animationDelay: '0.8s' }}
          >
            <div className="flex min-w-0 flex-col items-center gap-2 text-center sm:flex-row sm:items-center sm:gap-3 sm:text-left">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-afrika-orange/20 sm:h-12 sm:w-12">
                <Users className="h-5 w-5 text-afrika-orange sm:h-6 sm:w-6" />
              </div>
              <div className="min-w-0">
                <div className="text-base font-bold text-white sm:text-xl">500+</div>
                <div className="text-[11px] text-white/50 sm:text-sm">Élèves</div>
              </div>
            </div>
            <div className="flex min-w-0 flex-col items-center gap-2 text-center sm:flex-row sm:items-center sm:gap-3 sm:text-left">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-afrika-gold/20 sm:h-12 sm:w-12">
                <BookOpen className="h-5 w-5 text-afrika-gold sm:h-6 sm:w-6" />
              </div>
              <div className="min-w-0">
                <div className="text-base font-bold text-white sm:text-xl">{experienceLabel}</div>
                <div className="text-[11px] text-white/50 sm:text-sm">d'expérience</div>
              </div>
            </div>
            <div className="flex min-w-0 flex-col items-center gap-2 text-center sm:flex-row sm:items-center sm:gap-3 sm:text-left">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-afrika-orange/20 sm:h-12 sm:w-12">
                <Award className="h-5 w-5 text-afrika-orange sm:h-6 sm:w-6" />
              </div>
              <div className="min-w-0">
                <div className="text-base font-bold text-white sm:text-xl">98%</div>
                <div className="text-[11px] text-white/50 sm:text-sm">Réussite</div>
              </div>
            </div>
          </div>
          </div>

          <div className="order-2 flex justify-center lg:order-2 lg:col-span-5 lg:items-center">
            <div className="relative mt-2 w-full max-w-[280px] animate-float sm:max-w-sm md:max-w-md lg:mt-0 lg:max-w-md">
              <div className="absolute inset-0 rotate-6 rounded-3xl bg-afrika-orange/25 blur-2xl" />
              <div className="relative rounded-3xl border border-afrika-sky-light/35 bg-white/15 p-6 shadow-2xl backdrop-blur-md sm:p-8">
                <img
                  src="/images/logo.png"
                  alt="Logo du Complexe Scolaire Afrika — carte d'Afrique, livre ouvert et symboles scolaires"
                  className="mx-auto h-auto w-full max-w-[220px] drop-shadow-2xl sm:max-w-sm xl:max-w-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
