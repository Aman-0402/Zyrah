import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useGSAPReveal } from '../../hooks/useGSAPReveal'

const PILLARS = [
  { label: 'Pure Ingredients', icon: '◈' },
  { label: 'Custom Blended', icon: '◈' },
  { label: 'Free Delivery', icon: '◈' },
]

export default function BrandEthos() {
  const ornamentRef = useGSAPReveal({
    from: { opacity: 0, scale: 0.85 },
    to: { opacity: 1, scale: 1 },
    duration: 1.2,
    ease: 'power2.out',
    start: 'top 80%',
  })

  const contentRef = useGSAPReveal({
    from: { opacity: 0, x: 50 },
    to: { opacity: 1, x: 0 },
    duration: 0.9,
    ease: 'power3.out',
    delay: 0.2,
    start: 'top 80%',
  })

  return (
    <section className="py-24 md:py-36 px-6 relative overflow-hidden">
      {/* Section background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #0A0A0A 0%, #0f0805 50%, #0A0A0A 100%)',
        }}
      />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(201,168,76,1) 40px, rgba(201,168,76,1) 41px),
                            repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(201,168,76,1) 40px, rgba(201,168,76,1) 41px)`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

          {/* Left — Decorative ornament */}
          <div ref={ornamentRef} className="flex items-center justify-center">
            <div className="relative">
              {/* Large Arabic calligraphy ornament */}
              <div
                className="text-[180px] md:text-[240px] leading-none select-none font-heading"
                style={{
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(201,168,76,0.08)',
                  fontStyle: 'italic',
                }}
              >
                م
              </div>

              {/* Center circle ornament */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div
                    className="w-32 h-32 rounded-full border border-gold-400/10 flex items-center justify-center"
                  >
                    <div className="w-20 h-20 rounded-full border border-gold-400/15 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-gold-400/40" />
                    </div>
                  </div>
                  {/* Rotating ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border border-dashed border-gold-400/10"
                    style={{ margin: '-12px' }}
                  />
                </div>
              </div>

              {/* Four cardinal dots */}
              {[0, 90, 180, 270].map((deg) => (
                <div
                  key={deg}
                  className="absolute w-1 h-1 bg-gold-400/20 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${deg}deg) translateY(-80px) translateX(-50%)`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right — Content */}
          <div ref={contentRef} className="flex flex-col gap-6">
            <p className="text-[10px] tracking-[0.5em] uppercase text-gold-400/50">
              Our Philosophy
            </p>

            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-ivory leading-tight">
              Every Scent
              <br />
              <span className="italic text-gold-300">Tells A Story</span>
            </h2>

            <p className="text-ivory/50 text-sm md:text-base leading-relaxed font-light max-w-md">
              At m_m_attarwala, we believe fragrance is deeply personal.
              Every bottle we craft is a conversation between you and
              your senses — blended fresh, just for you.
            </p>

            <p className="text-ivory/35 text-sm leading-relaxed font-light max-w-md">
              Rooted in the rich tradition of Indian and Arabic attar-making,
              we source the finest raw ingredients and blend them with care.
              No mass production. No shortcuts.
            </p>

            {/* Gold divider */}
            <div className="h-px w-16 bg-gold-400/30 my-2" />

            {/* Pillars */}
            <div className="flex flex-col sm:flex-row gap-3">
              {PILLARS.map(({ label, icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 border border-gold-400/15 hover:border-gold-400/35 transition-colors duration-300 group"
                >
                  <span className="text-gold-400/50 group-hover:text-gold-400 transition-colors duration-300 text-xs">
                    {icon}
                  </span>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-ivory/50 group-hover:text-ivory/80 transition-colors duration-300 whitespace-nowrap">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
