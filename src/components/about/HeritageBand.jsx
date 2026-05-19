import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SEPARATORS = Array.from({ length: 8 }, (_, i) => i)

export default function HeritageBand() {
  const textRef = useRef(null)
  const dotsRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Main text clip reveal */
      gsap.fromTo(
        textRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )

      /* Separator dots fade */
      gsap.fromTo(
        dotsRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          delay: 0.6,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-16 md:py-20 border-y border-gold-400/10"
      style={{
        background: 'linear-gradient(180deg, rgba(59,31,15,0.18) 0%, rgba(59,31,15,0.35) 50%, rgba(59,31,15,0.18) 100%)',
      }}
    >
      {/* Repeating diamond separators */}
      <div
        ref={dotsRef}
        className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-8 pointer-events-none opacity-0"
      >
        {SEPARATORS.map((i) => (
          <span key={i} className="text-gold-400/12 text-xs select-none">◆</span>
        ))}
      </div>

      {/* Main headline */}
      <div className="overflow-hidden px-6 md:px-12 text-center">
        <p
          ref={textRef}
          className="font-heading text-ivory/88 leading-tight select-none"
          style={{
            fontSize: 'clamp(2rem, 6vw, 6.5rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            clipPath: 'inset(0 100% 0 0)',
          }}
        >
          Rooted in India.{' '}
          <span style={{ color: 'rgba(201,168,76,0.7)' }}>Inspired by Arabia.</span>
        </p>
      </div>
    </section>
  )
}
