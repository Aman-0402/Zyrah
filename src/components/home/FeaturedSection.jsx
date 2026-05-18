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
    name: 'Dehnul Oudh',
    arabic: 'دهن العود',
    desc: 'Sacred oud oil from ancient forests — smoky, resinous, hauntingly royal.',
    notes: ['Oud', 'Amber Resin', 'Smoke'],
    gradient: 'linear-gradient(160deg, #0A0A0A 0%, #1a0e05 50%, #2e1a08 100%)',
    accentColor: '#C9A84C',
    featured: true,
    bgImage: `${BASE}Collection/DEHNUL%20OUDH%203.1.png`,
    image: `${BASE}Collection/DEHNUL%20OUDH%203.2.png`,
  },
  {
    id: 3,
    name: 'Classic MM Pour Homme',
    arabic: 'كلاسيك للرجال',
    desc: 'Mountain-fresh neroli and cedar — clean confidence wrapped in sunset gold.',
    notes: ['Neroli', 'Cedarwood', 'Lemon'],
    gradient: 'linear-gradient(160deg, #0A0A0A 0%, #0a1208 50%, #111a0d 100%)',
    accentColor: '#C9A84C',
    featured: false,
    bgImage: `${BASE}Collection/CLASSIC%20MM%20POUR%20HOMME%205.1.png`,
    image: `${BASE}Collection/CLASSIC%20MM%20POUR%20HOMME%205.2.png`,
  },
  {
    id: 4,
    name: 'Coming Soon',
    arabic: 'قريباً',
    desc: 'A new chapter in luxury fragrance. Stay tuned.',
    notes: ['—'],
    gradient: 'linear-gradient(160deg, #0A0A0A 0%, #100a00 50%, #1a1200 100%)',
    accentColor: '#C9A84C',
    featured: false,
  },
  {
    id: 5,
    name: 'Coming Soon',
    arabic: 'قريباً',
    desc: 'A new chapter in luxury fragrance. Stay tuned.',
    notes: ['—'],
    gradient: 'linear-gradient(160deg, #0A0A0A 0%, #0a0a10 50%, #10101a 100%)',
    accentColor: '#C9A84C',
    featured: false,
  },
  {
    id: 6,
    name: 'Coming Soon',
    arabic: 'قريباً',
    desc: 'A new chapter in luxury fragrance. Stay tuned.',
    notes: ['—'],
    gradient: 'linear-gradient(160deg, #0A0A0A 0%, #0a1008 50%, #0e1a0c 100%)',
    accentColor: '#C9A84C',
    featured: false,
  },
]

// Only bottle pops — image layer tilts, text+border stay flat
const imageTiltVariants = {
  rest:  { rotateX: 0, rotateY: 0 },
  hover: { rotateX: -3, rotateY: 3 },
}

const bottleVariants = {
  rest:  { scale: 0.90, y: 0   },
  hover: { scale: 1.10, y: -16 },
}

function FragranceCard({ fragrance, index }) {
  const { featured, accentColor, gradient, arabic, name, desc, notes, image, bgImage } = fragrance

  return (
    <motion.article
      data-reveal
      initial="rest"
      whileHover="hover"
      className={[
        // Border on article — never tilts, always aligned
        'group relative flex flex-col border transition-colors duration-500 cursor-pointer',
        featured
          ? 'border-gold-400/30 hover:border-gold-400/55'
          : 'border-gold-400/12 hover:border-gold-400/30',
      ].join(' ')}
      style={{
        background: featured ? 'rgba(20,10,4,0.9)' : '#111111',
        // High perspective = cinematic depth, not cardboard
        perspective: '1400px',
      }}
    >

      {/* ── IMAGE AREA: tilts on hover ─────────────────────────────── */}
      <motion.div
        variants={imageTiltVariants}
        transition={{ type: 'spring', stiffness: 180, damping: 30 }}
        style={{ transformStyle: 'preserve-3d', transformOrigin: 'center center' }}
        className="relative h-64"
      >
        {/* Background — own overflow-hidden so it clips cleanly */}
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
              style={{ background: 'linear-gradient(180deg, rgba(10,10,10,0.25) 0%, rgba(10,10,10,0.55) 100%)' }}
            />
          )}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{ background: `linear-gradient(135deg, ${accentColor}0A 0%, transparent 60%)` }}
          />
          {/* Arabic watermark */}
          <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
            <span
              className="text-6xl md:text-7xl font-light"
              style={{ color: accentColor, opacity: image ? 0.03 : 0.09, fontFamily: 'Georgia, serif' }}
            >
              {arabic}
            </span>
          </div>
          {/* Corner gold accents — inside overflow-hidden so they clip */}
          <div className="absolute top-0 right-0 w-10 h-px transition-all duration-500 group-hover:w-16" style={{ background: `linear-gradient(to left, ${accentColor}55, transparent)` }} />
          <div className="absolute top-0 right-0 w-px h-10 transition-all duration-500 group-hover:h-16" style={{ background: `linear-gradient(to bottom, ${accentColor}55, transparent)` }} />
        </div>

        {/* Arabic italic bottom-left — clipped to image area */}
        <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none">
          <p className="font-heading text-2xl text-ivory/75 group-hover:text-ivory/95 transition-colors duration-500" style={{ fontStyle: 'italic', fontWeight: 300 }}>
            {arabic}
          </p>
        </div>

        {/* Bottle — sits on top of image, can overflow upward */}
        {image && (
          <motion.div
            variants={bottleVariants}
            transition={{ type: 'spring', stiffness: 180, damping: 30 }}
            className="absolute inset-0 flex items-end justify-center pointer-events-none"
            style={{ zIndex: 20, transformOrigin: 'bottom center' }}
          >
            <img
              src={image}
              alt={name}
              draggable={false}
              className="h-full w-auto object-contain"
              style={{
                filter: 'drop-shadow(-3px 14px 20px rgba(0,0,0,0.8)) drop-shadow(0 0 16px rgba(201,168,76,0.14))',
              }}
            />
          </motion.div>
        )}

        {/* Badges + index — z-top */}
        {featured && (
          <div className="absolute top-4 right-4 z-30">
            <span className="text-[8px] tracking-[0.35em] uppercase px-3 py-1 border border-gold-400/40 text-gold-400/80 bg-black/60">
              Bestseller
            </span>
          </div>
        )}
        <div className="absolute top-4 left-4 z-30">
          <span className="text-[9px] tracking-[0.4em] uppercase text-gold-400/30">No. {String(index + 1).padStart(2, '0')}</span>
        </div>
      </motion.div>
      {/* ── END IMAGE AREA ─── */}

      {/* ── CARD BODY: flat, no tilt, border-aligned ───────────────── */}
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-xl text-ivory group-hover:text-gold-300 transition-colors duration-300">
            {name}
          </h3>
          <ArrowRight size={15} strokeWidth={1.5} className="text-gold-400/35 group-hover:text-gold-400 transition-colors duration-300 flex-shrink-0" />
        </div>

        <p className="text-ivory/40 font-light leading-relaxed text-sm">{desc}</p>

        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {notes.map((note) => (
            <span key={note} className="text-[9px] tracking-[0.3em] uppercase px-3 py-1 border border-gold-400/15 text-gold-400/50 group-hover:border-gold-400/28 group-hover:text-gold-400/65 transition-all duration-300">
              {note}
            </span>
          ))}
        </div>
      </div>

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

      {/* 2-row 3-col grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-14">
        <FragranceCard fragrance={FRAGRANCES[0]} index={0} />
        <FragranceCard fragrance={FRAGRANCES[1]} index={1} />
        <FragranceCard fragrance={FRAGRANCES[2]} index={2} />
        <FragranceCard fragrance={FRAGRANCES[3]} index={3} />
        <FragranceCard fragrance={FRAGRANCES[4]} index={4} />
        <FragranceCard fragrance={FRAGRANCES[5]} index={5} />
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
