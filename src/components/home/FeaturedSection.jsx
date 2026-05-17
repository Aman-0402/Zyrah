import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useGSAPReveal, useGSAPStaggerReveal } from '../../hooks/useGSAPReveal'
import Button from '../ui/Button'

const FRAGRANCES = [
  {
    id: 1,
    name: 'Oud Al Layl',
    arabic: 'عود الليل',
    desc: 'A deep, smoky oud journey through ancient Arabian nights.',
    notes: ['Oud', 'Amber', 'Musk'],
    gradient: 'linear-gradient(160deg, #0A0A0A 0%, #1a0a05 50%, #2d1507 100%)',
    accentColor: '#C9A84C',
  },
  {
    id: 2,
    name: 'Rose Shamama',
    arabic: 'شمامة الورد',
    desc: 'Velvety rose petals wrapped in a warm, powdery embrace.',
    notes: ['Rose', 'Sandalwood', 'Vetiver'],
    gradient: 'linear-gradient(160deg, #0A0A0A 0%, #1f0a10 50%, #3a1020 100%)',
    accentColor: '#E2C27D',
  },
  {
    id: 3,
    name: 'Misk Malaki',
    arabic: 'مسك ملكي',
    desc: 'Royal white musk — clean, celestial, and unforgettable.',
    notes: ['White Musk', 'Jasmine', 'Cedarwood'],
    gradient: 'linear-gradient(160deg, #0A0A0A 0%, #0d0d12 50%, #141424 100%)',
    accentColor: '#F5F0E8',
  },
]

function FragranceCard({ fragrance, index }) {
  return (
    <motion.article
      data-reveal
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative flex flex-col border border-gold-400/10 hover:border-gold-400/40 transition-colors duration-500 cursor-pointer"
      style={{ background: '#111111' }}
    >
      {/* Image placeholder — atmospheric CSS gradient */}
      <div
        className="relative h-72 overflow-hidden"
        style={{ background: fragrance.gradient }}
      >
        {/* Shimmer overlay on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.05) 0%, transparent 60%)' }}
        />

        {/* Arabic name — decorative watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          <span
            className="text-6xl md:text-7xl font-light transition-transform duration-700 group-hover:scale-110"
            style={{ color: fragrance.accentColor, opacity: 0.08 }}
          >
            {fragrance.arabic}
          </span>
        </div>

        {/* Top index */}
        <div className="absolute top-4 left-4">
          <span className="text-[9px] tracking-[0.4em] uppercase text-gold-400/30">
            No. 0{index + 1}
          </span>
        </div>

        {/* Bottom: floating name in card image area */}
        <div className="absolute bottom-4 left-4 right-4">
          <p
            className="font-heading text-2xl text-ivory/80 group-hover:text-ivory transition-colors duration-300"
            style={{ fontStyle: 'italic', fontWeight: 300 }}
          >
            {fragrance.arabic}
          </p>
        </div>

        {/* Gold corner accent */}
        <div
          className="absolute top-0 right-0 w-12 h-px transition-all duration-500 group-hover:w-20"
          style={{ background: `linear-gradient(to left, ${fragrance.accentColor}60, transparent)` }}
        />
        <div
          className="absolute top-0 right-0 w-px h-12 transition-all duration-500 group-hover:h-20"
          style={{ background: `linear-gradient(to bottom, ${fragrance.accentColor}60, transparent)` }}
        />
      </div>

      {/* Card content */}
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between">
          <h3 className="font-heading text-xl text-ivory group-hover:text-gold-300 transition-colors duration-300">
            {fragrance.name}
          </h3>
          <motion.div
            className="text-gold-400/40 group-hover:text-gold-400 transition-colors duration-300 mt-1"
            whileHover={{ x: 3 }}
          >
            <ArrowRight size={16} strokeWidth={1.5} />
          </motion.div>
        </div>

        <p className="text-ivory/40 text-sm leading-relaxed font-light">
          {fragrance.desc}
        </p>

        {/* Note tags */}
        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {fragrance.notes.map((note) => (
            <span
              key={note}
              className="text-[9px] tracking-[0.3em] uppercase px-3 py-1 border border-gold-400/15 text-gold-400/50 group-hover:border-gold-400/30 group-hover:text-gold-400/70 transition-all duration-300"
            >
              {note}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom gold line — reveals on hover */}
      <div
        className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
        style={{ background: `linear-gradient(to right, transparent, ${fragrance.accentColor}60, transparent)` }}
      />
    </motion.article>
  )
}

export default function FeaturedSection() {
  const headingRef = useGSAPReveal({ from: { opacity: 0, y: 30 }, to: { opacity: 1, y: 0 } })
  const gridRef = useGSAPStaggerReveal({ selector: '[data-reveal]', stagger: 0.2, start: 'top 80%' })

  return (
    <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto">

      {/* Section header */}
      <div ref={headingRef} className="text-center mb-16">
        <p className="text-[10px] tracking-[0.5em] uppercase text-gold-400/50 mb-4">
          Our Craft
        </p>
        <h2 className="font-heading text-4xl md:text-6xl text-ivory mb-4">
          Signature Scents
        </h2>
        <p className="font-heading italic text-ivory/40 text-lg md:text-xl max-w-md mx-auto">
          Each fragrance tells a story, each drop holds a world.
        </p>
      </div>

      {/* Cards grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-14"
      >
        {FRAGRANCES.map((f, i) => (
          <FragranceCard key={f.id} fragrance={f} index={i} />
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link to="/collections">
          <Button variant="outline" size="lg">
            View All Collections
          </Button>
        </Link>
      </div>
    </section>
  )
}
