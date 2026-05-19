import { useGSAPReveal, useGSAPStaggerReveal } from '../../hooks/useGSAPReveal'

const VALUES = [
  {
    symbol: '◈',
    title: 'Pure Ingredients',
    arabicLabel: 'مكونات نقية',
    desc: 'No synthetics. No shortcuts. Every ingredient is natural, ethically sourced, and carefully chosen for quality and purity.',
    accent: '#C9A84C',
  },
  {
    symbol: '◇',
    title: 'Custom Blended',
    arabicLabel: 'مزيج مخصص',
    desc: 'Never mass produced. Every fragrance is blended fresh to order — a one-of-a-kind creation made for you alone.',
    accent: '#E2C27D',
  },
]

export default function ValuesGrid() {
  const headRef = useGSAPReveal({ from: { opacity: 0, y: 30 }, to: { opacity: 1, y: 0 } })
  const gridRef = useGSAPStaggerReveal({
    selector: '[data-reveal]',
    from: { opacity: 0, y: 40 },
    to:   { opacity: 1, y: 0 },
    stagger: 0.2,
    start: 'top 80%',
  })

  return (
    <section className="py-24 md:py-32"><div className="cx">

      <div ref={headRef} className="text-center mb-14">
        <p className="text-[10px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(201,168,76,0.82)' }}>Our Principles</p>
        <h2 className="font-heading text-4xl md:text-6xl" style={{ color: 'rgba(255,248,240,0.92)' }}>What We Stand For</h2>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-14 max-w-3xl mx-auto">
        {VALUES.map((val) => (
          <div
            key={val.title}
            data-reveal
            className="relative flex flex-col gap-5 p-8 border border-gold-400/10 hover:border-gold-400/28 transition-all duration-500 group overflow-hidden rounded-xl"
            style={{ background: 'rgba(201,168,76,0.015)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.032)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(201,168,76,0.015)'}
          >
            {/* Large symbol */}
            <div
              className="text-5xl select-none transition-all duration-500 group-hover:scale-105 origin-left"
              style={{ color: val.accent, opacity: 0.22 }}
            >
              {val.symbol}
            </div>

            {/* Arabic label */}
            <p className="text-[9px] tracking-[0.35em] uppercase" style={{ color: `${val.accent}50` }}>
              {val.arabicLabel}
            </p>

            {/* Title */}
            <h3
              className="font-heading text-2xl transition-colors duration-300 group-hover:text-gold-300"
              style={{ color: 'rgba(245,240,232,0.85)' }}
            >
              {val.title}
            </h3>

            {/* Divider */}
            <div className="h-px w-10 transition-all duration-500 group-hover:w-16" style={{ background: `${val.accent}40` }} />

            {/* Desc */}
            <p className="text-sm leading-relaxed font-light" style={{ color: 'rgba(255,252,245,0.84)' }}>{val.desc}</p>

            {/* Bottom accent */}
            <div
              className="absolute bottom-0 left-0 right-0 h-px w-0 group-hover:w-full transition-all duration-500"
              style={{ background: `linear-gradient(to right, transparent, ${val.accent}40, transparent)` }}
            />
          </div>
        ))}
      </div>
    </div></section>
  )
}
