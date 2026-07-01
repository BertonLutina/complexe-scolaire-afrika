import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Images, X, ZoomIn } from 'lucide-react'
import { galleryImages } from '../../data/galleryImages'

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isLightboxVisible, setIsLightboxVisible] = useState(false)

  const openLightbox = (index: number) => {
    setActiveIndex(index)
    requestAnimationFrame(() => setIsLightboxVisible(true))
  }

  const closeLightbox = useCallback(() => {
    setIsLightboxVisible(false)
    window.setTimeout(() => setActiveIndex(null), 280)
  }, [])

  const showPrevious = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + galleryImages.length) % galleryImages.length
    )
  }, [])

  const showNext = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % galleryImages.length
    )
  }, [])

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
      { threshold: 0.08 }
    )

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (activeIndex === null) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox()
      if (event.key === 'ArrowLeft') showPrevious()
      if (event.key === 'ArrowRight') showNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeIndex, closeLightbox, showNext, showPrevious])

  const activeImage = activeIndex !== null ? galleryImages[activeIndex] : null

  return (
    <>
      <section id="galerie" ref={sectionRef} className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center opacity-0 animate-on-scroll md:mb-14">
            <span className="text-sm font-semibold uppercase tracking-widest text-afrika-orange">
              Galerie photos
            </span>
            <h2 className="mb-4 mt-3 font-display text-3xl font-black text-afrika-blue sm:text-4xl md:mb-6 md:text-5xl">
              La vie à <span className="text-gradient">l'école</span>
            </h2>
            <p className="mx-auto max-w-2xl text-base text-afrika-blue/60 sm:text-lg">
              Découvrez en images l'ambiance, les activités et la communauté du Complexe Scolaire Afrika.
              Touchez ou cliquez sur une photo pour l'agrandir.
            </p>
          </div>

          <div className="columns-2 gap-3 sm:columns-3 sm:gap-4 md:columns-4 lg:gap-5">
            {galleryImages.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => openLightbox(index)}
                className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-afrika-cream opacity-0 shadow-md animate-on-scroll focus:outline-none focus-visible:ring-2 focus-visible:ring-afrika-orange focus-visible:ring-offset-2 sm:mb-4 lg:mb-5"
                style={{ animationDelay: `${(index % 8) * 0.05}s` }}
                aria-label={`Agrandir : ${image.alt}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-afrika-blue/70 via-afrika-blue/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-afrika-blue opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 sm:bottom-4 sm:right-4">
                  <ZoomIn className="h-4 w-4" aria-hidden />
                </div>
              </button>
            ))}
          </div>

          <p className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-afrika-blue/50 opacity-0 animate-on-scroll">
            <Images className="h-4 w-4 shrink-0" aria-hidden />
            {galleryImages.length} photos — navigation au clavier disponible dans la visionneuse
          </p>
        </div>
      </section>

      {activeImage && activeIndex !== null && (
        <div
          className={`gallery-lightbox fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 ${
            isLightboxVisible ? 'gallery-lightbox--open' : 'gallery-lightbox--closing'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Visionneuse de photos"
        >
          <button
            type="button"
            className="absolute inset-0 bg-afrika-blue/90 backdrop-blur-md"
            onClick={closeLightbox}
            aria-label="Fermer la galerie"
          />

          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Fermer"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={showPrevious}
            className="absolute left-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-4 sm:flex"
            aria-label="Photo précédente"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          <button
            type="button"
            onClick={showNext}
            className="absolute right-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-4 sm:flex"
            aria-label="Photo suivante"
          >
            <ChevronRight className="h-7 w-7" />
          </button>

          <figure
            className={`gallery-lightbox__figure relative z-[1] max-h-[min(85dvh,900px)] w-full max-w-5xl ${
              isLightboxVisible ? 'gallery-lightbox__figure--open' : ''
            }`}
          >
            <img
              key={activeImage.src}
              src={activeImage.src}
              alt={activeImage.alt}
              className="gallery-lightbox__image mx-auto max-h-[min(78dvh,820px)] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
            />
            <figcaption className="mt-4 text-center text-sm text-white/80 sm:text-base">
              {activeImage.alt}
              <span className="mt-1 block text-xs text-white/50 sm:text-sm">
                {activeIndex + 1} / {galleryImages.length}
              </span>
            </figcaption>
          </figure>

          <div className="absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-10 flex -translate-x-1/2 gap-3 sm:hidden">
            <button
              type="button"
              onClick={showPrevious}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white"
              aria-label="Photo précédente"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={showNext}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white"
              aria-label="Photo suivante"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
