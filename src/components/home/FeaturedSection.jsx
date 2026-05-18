import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useGSAPReveal, useGSAPStaggerReveal } from '../../hooks/useGSAPReveal'
import Button from '../ui/Button'

// import.meta.env.BASE_URL = '/' in dev, '/Zyrah/' in production
const BASE = import.meta.env.BASE_URL

const FRAGRANCES = [
  {
    id: 1,
    name: 'Oud Al Layl',
    arabic: 'عود الليل',
    desc: 'A deep, smoky oud journey through ancient Arabian nights.',
    notes: ['Oud', 'Amber', 'Musk'],
    gradient: 'linear-gradient(160deg, #0A0A0A 0%, #1a0a05 50%, #2d1507 100%)',
    accentColor: '#C9A84C',
    featured: false,
    bgImage: `${BASE}Collection/Citrusandamberonmarble.png`,
    image: `${BASE}Collection/Luxurious%20amber%20fragrance%20in%20golden%20bottle.png`,
  },
  {
    id: 2,
    name: 'Rose Shamama',
    arabic: 'شمامة الورد',
    desc: 'Velvety rose petals wrapped in a warm, powdery embrace. Our best-loved signature.',
    notes: ['Rose', 'Sandalwood', 'Vetiver'],
    gradient: 'linear-gradient(160deg, #0A0A0A 0%, #1f0a10 50%, #3a1020 100%)',
    accentColor: '#E2C27D',
    featured: true,
  },
  {
    id: 3,
    name: 'Misk Malaki',
    arabic: 'مسك ملكي',
    desc: 'Royal white musk — clean, celestial, and unforgettable.',
    notes: ['White Musk', 'Jasmine', 'Cedarwood'],
    gradient: 'linear-gradient(160deg, #0A0A0A 0%, #0d0d12 50%, #141424 100%)',
    accentColor: '#F5F0E8',
    featured: false,
  },
]

/* Variant sets — propagate from article → tilt wrapper → bottle */
const tiltVariants = {
  rest:  { rotateX: 0,  rotateY: 0,  scale: 1    },
  hover: { rotateX: -4, rotateY: 6,  scale: 1.03 },
}

const bottleVariants = {
  rest:  { scale: 0.92, y: 0   },
  hover: { scale: 1.28, y: -32 },
}

function FragranceCard({ fragrance, index }) {
  const { featured, accentColor, gradient, arabic, name, desc, notes, image, bgImage } = fragrance

  return (
    <motion.article
      data-reveal
      initial="rest"
      whileHover="hover"
      className={[
        'group relative flex flex-col border transition-colors duration-500 cursor-pointer',
        featured
          ? 'border-gold-400/30 hover:border-gold-400/60'
          : 'border-gold-400/10 hover:border-gold-400/35',
      ].join(' ')}
      style={{ background: featured ? 'rgba(20,10,4,0.9)' : '#111111', perspective: '900px' }}
    >
      {/* Tilt wrapper — whole card rotates as one unit */}
      <motion.div
        variants={tiltVariants}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        style={{ transformStyle: 'preserve-3d', transformOrigin: 'center bottom' }}
        className="flex flex-col flex-1"
      >

        {/* Image area — NO overflow-hidden here so bottle can pop out */}
        <div className="relative h-64">

          {/* Background layer — has its own overflow-hidden */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={
              bgImage
                ? { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                : { background: gradient }
            }
          >
            {bgImage && (
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(180deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.58) 100%)' }}
              />
            )}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ background: `linear-gradient(135deg, ${accentColor}0D 0%, transparent 60%)` }}
            />
            {/* Arabic watermark */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-6xl md:text-7xl font-light select-none"
                style={{ color: accentColor, opacity: image ? 0.03 : 0.09, fontFamily: 'Georgia, serif' }}
              >
                {arabic}
              </span>
            </div>
            {/* Corner gold lines */}
            <div className="absolute top-0 right-0 w-12 h-px transition-all duration-500 group-hover:w-20" style={{ background: `linear-gradient(to left, ${accentColor}60, transparent)` }} />
            <div className="absolute top-0 right-0 w-px h-12 transition-all duration-500 group-hover:h-20" style={{ background: `linear-gradient(to bottom, ${accentColor}60, transparent)` }} />
            {featured && (
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(226,194,125,0.06) 0%, transparent 70%)' }} />
            )}
          </div>

          {/* Arabic italic — inside bg div but separate so it stays clipped */}
          <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none overflow-hidden">
            <p className="font-heading text-2xl text-ivory/80 group-hover:text-ivory transition-colors duration-300" style={{ fontStyle: 'italic', fontWeight: 300 }}>
              {arabic}
            </p>
          </div>

          {/* Bottle — OUTSIDE overflow-hidden, scales up + floats out on hover */}
          {image && (
            <motion.div
              variants={bottleVariants}
              transition={{ type: 'spring', stiffness: 240, damping: 20 }}
              className="absolute inset-0 flex items-end justify-center pointer-events-none"
              style={{ zIndex: 20, transformOrigin: 'bottom center' }}
            >
              <img
                src={image}
                alt={name}
                draggable={false}
                className="h-full w-auto object-contain"
                style={{
                  filter: 'drop-shadow(-4px 16px 22px rgba(0,0,0,0.85)) drop-shadow(0 0 22px rgba(201,168,76,0.18))',
                }}
              />
            </motion.div>
          )}

          {/* Badges + index — always on top */}
          {featured && (
            <div className="absolute top-4 right-4 z-30">
              <span className="text-[8px] tracking-[0.35em] uppercase px-3 py-1 border border-gold-400/40 text-gold-400/80 bg-black/60">
                Bestseller
              </span>
            </div>
          )}
          <div className="absolute top-4 left-4 z-30">
            <span className="text-[9px] tracking-[0.4em] uppercase text-gold-400/30">No. 0{index + 1}</span>
          </div>
        </div>

        {/* Card body */}
        <div className="p-6 flex flex-col gap-3 flex-1">
          <div className="flex items-start justify-between">
            <h3 className="font-heading text-xl text-ivory group-hover:text-gold-300 transition-colors duration-300">
              {name}
            </h3>
            <motion.div className="text-gold-400/40 group-hover:text-gold-400 transition-colors duration-300 mt-1" whileHover={{ x: 3 }}>
              <ArrowRight size={16} strokeWidth={1.5} />
            </motion.div>
          </div>

        <p className="text-ivory/40 font-light leading-relaxed text-sm">{desc}</p>

          <div className="flex flex-wrap gap-2 mt-auto pt-2">
            {notes.map((note) => (
              <span key={note} className="text-[9px] tracking-[0.3em] uppercase px-3 py-1 border border-gold-400/15 text-gold-400/50 group-hover:border-gold-400/30 group-hover:text-gold-400/70 transition-all duration-300">
                {note}
              </span>
            ))}
          </div>
        </div>
        {/* ── end card body ── */}

      </motion.div>
      {/* ── end tilt wrapper ── */}

      {/* Bottom gold line on hover */}
      <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(to right, transparent, ${accentColor}60, transparent)` }} />
    </motion.article>
  )
}

export default function FeaturedSection() {
  const headingRef = useGSAPReveal({ from: { opacity: 0, y: 30 }, to: { opacity: 1, y: 0 } })
  const gridRef   = useGSAPStaggerReveal({ selector: '[data-reveal]', stagger: 0.18, start: 'top 80%' })

  return (
    <section className="py-24 md:py-32"><div className="cx">

      {/* Header */}
      <div ref={headingRef} className="w-full text-center mb-16">
        <p className="text-[10px] tracking-[0.5em] uppercase text-gold-400/50 mb-4">Our Craft</p>
        <h2 className="font-heading text-4xl md:text-6xl text-ivory mb-4 text-center">Signature Scents</h2>
        <p className="font-heading italic text-ivory/40 text-lg md:text-xl max-w-md mx-auto text-center">
          Each fragrance tells a story, each drop holds a world.
        </p>
      </div>

      {/* Equal 3-col grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-14">
        <FragranceCard fragrance={FRAGRANCES[0]} index={0} />
        <FragranceCard fragrance={FRAGRANCES[1]} index={1} />
        <FragranceCard fragrance={FRAGRANCES[2]} index={2} />
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link to="/collections">
          <Button variant="outline" size="lg">View All Collections</Button>
        </Link>
      </div>
    </div></section>
  )
}
