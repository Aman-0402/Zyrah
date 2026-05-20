import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useGSAPReveal, useGSAPStaggerReveal } from '../../hooks/useGSAPReveal'

// import.meta.env.BASE_URL = '/' in dev, '/Zyrah/' in production
const BASE = import.meta.env.BASE_URL

const FRAGRANCES = [
  {
    id: 1,
    name: 'Oud Al Layl',
    arabic: 'عود الليل',
    desc: 'A deep, smoky oud journey through ancient Arabian nights.',
    notes: ['Oud', 'Amber', 'Musk'],
    gradient: 'linear-gradient(160deg, #120b08 0%, #28100b 48%, #432011 100%)',
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
    gradient: 'linear-gradient(160deg, #120b08 0%, #271407 48%, #44260d 100%)',
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
    gradient: 'linear-gradient(160deg, #0f0b08 0%, #101b11 50%, #1d2917 100%)',
    accentColor: '#C9A84C',
    featured: false,
    bgImage: `${BASE}Collection/CLASSIC%20MM%20POUR%20HOMME%205.1.png`,
    image: `${BASE}Collection/CLASSIC%20MM%20POUR%20HOMME%205.2.png`,
  },
  {
    id: 4,
    name: 'Heaven Touch',
    arabic: 'لمسة الجنة',
    desc: 'Citrus bloom meets dark amber resin — a sensual evening luxury.',
    notes: ['Grapefruit', 'Jasmine', 'Amber'],
    gradient: 'linear-gradient(160deg, #120b08 0%, #281507 50%, #3f210e 100%)',
    accentColor: '#C9A84C',
    featured: false,
    bgImage: `${BASE}Collection/HEAVEN%20TOUCH%206.1.png`,
    image: `${BASE}Collection/HEAVEN%20TOUCH%206.2.png`,
  },
  {
    id: 5,
    name: 'Royal Tonka De Arabia',
    arabic: 'رويال طونكا العربية',
    desc: 'Saffron and rose meet oud and tonka — dark Arabian royalty in a bottle.',
    notes: ['Saffron', 'Rose', 'Tonka', 'Oud'],
    gradient: 'linear-gradient(160deg, #12090a 0%, #2a0b12 50%, #43121c 100%)',
    accentColor: '#C9A84C',
    featured: false,
    bgImage: `${BASE}Collection/ROYAL%20TONKA%20DE%20ARABIA%201.png`,
    image: `${BASE}Collection/ROYAL%20TONKA%20DE%20ARABIA%202.png`,
  },
  {
    id: 6,
    name: 'Heaven Aqua Fizz',
    arabic: 'هيفن أكوا فيز',
    desc: 'Ocean-fresh lemon and green apple with a clean aquatic heart.',
    notes: ['Lemon', 'Green Apple', 'Aqua'],
    gradient: 'linear-gradient(160deg, #0d0b0a 0%, #071723 50%, #0d2633 100%)',
    accentColor: '#5B9DAF',
    featured: false,
    bgImage: `${BASE}Collection/HEAVEN%20AQUA%20FIZZ%201.png`,
    image: `${BASE}Collection/HEAVEN%20AQUA%20FIZZ%202.png`,
  },
]

const LUXURY_EASE = [0.22, 1, 0.36, 1]

// Card floats up — no tilt (luxury restraint)
const articleVariants = {
  rest:  { y: 0 },
  hover: { y: -6 },
}

// Image: very subtle tilt, almost imperceptible
const imageTiltVariants = {
  rest:  { rotateX: 0, rotateY: 0 },
  hover: { rotateX: -1.5, rotateY: 1.5 },
}

// Bottle: lifts out of frame on hover
const bottleVariants = {
  rest:  { scale: 0.75, y: 10  },
  hover: { scale: 1.10, y: -22 },
}

function FragranceCard({ fragrance, index, activeId, onTap }) {
  const { id, featured, accentColor, gradient, name, desc, notes, image, bgImage } = fragrance
  const isTapped = activeId === id

  return (
    <motion.article
      data-reveal
      variants={articleVariants}
      initial="rest"
      animate={isTapped ? 'hover' : 'rest'}
      whileHover="hover"
      onClick={() => onTap(id)}
      transition={{ duration: 0.6, ease: LUXURY_EASE }}
      className={[
        'group relative flex flex-col border transition-colors duration-700 cursor-pointer rounded-xl z-0 hover:z-10',
        featured
          ? 'border-gold-400/15 hover:border-gold-400/35'
          : 'border-gold-400/8 hover:border-gold-400/18',
      ].join(' ')}
      style={{
        background: featured
          ? 'linear-gradient(155deg, rgba(44,22,12,0.94) 0%, rgba(18,11,9,0.96) 58%, rgba(47,15,23,0.86) 100%)'
          : 'linear-gradient(155deg, rgba(24,15,12,0.94) 0%, rgba(16,11,10,0.97) 58%, rgba(29,13,18,0.82) 100%)',
        perspective: '1400px',
        boxShadow: featured
          ? '0 30px 90px rgba(0,0,0,0.38), 0 0 70px rgba(201,168,76,0.10), inset 0 1px 0 rgba(255,255,255,0.035)'
          : '0 24px 70px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.025)',
      }}
    >

      {/* ── IMAGE AREA: tilts on hover ─────────────────────────────── */}
      <motion.div
        variants={imageTiltVariants}
        transition={{ duration: 0.8, ease: LUXURY_EASE }}
        style={{ transformStyle: 'preserve-3d', transformOrigin: 'center center' }}
        className="relative h-56 sm:h-72 md:h-80"
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
              style={{ background: 'linear-gradient(180deg, rgba(18,10,8,0.12) 0%, rgba(10,7,6,0.42) 100%)' }}
            />
          )}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{ background: `linear-gradient(135deg, ${accentColor}0A 0%, transparent 60%)` }}
          />
          {/* Corner gold accents — inside overflow-hidden so they clip */}
          <div className="absolute top-0 right-0 w-10 h-px transition-all duration-500 group-hover:w-16" style={{ background: `linear-gradient(to left, ${accentColor}55, transparent)` }} />
          <div className="absolute top-0 right-0 w-px h-10 transition-all duration-500 group-hover:h-16" style={{ background: `linear-gradient(to bottom, ${accentColor}55, transparent)` }} />
        </div>

        {/* Bottle — sits on top of image, can overflow upward */}
        {image && (
          <motion.div
            variants={bottleVariants}
            transition={{ duration: 0.9, ease: LUXURY_EASE }}
            className="absolute left-0 right-0 bottom-0 flex items-end justify-center pointer-events-none"
            style={{ height: '130%', zIndex: 20, transformOrigin: 'bottom center' }}
          >
            <img
              src={image}
              alt={name}
              draggable={false}
              className="h-full w-auto object-contain"
              style={{
                filter: 'drop-shadow(-4px 20px 28px rgba(0,0,0,0.9)) drop-shadow(0 0 24px rgba(201,168,76,0.22))',
              }}
            />
          </motion.div>
        )}

        {/* Badges + index — z-top */}
        {featured && (
          <div className="absolute top-4 right-4 z-30">
            <span className="text-[8px] tracking-[0.35em] uppercase px-3 py-1 border border-gold-400/40 text-gold-300/90" style={{ background: 'rgba(21,11,8,0.68)', boxShadow: '0 0 20px rgba(201,168,76,0.12)' }}>
              Bestseller
            </span>
          </div>
        )}
        <div className="absolute top-4 left-4 z-30">
          <span className="editorial-label !text-[9px] tracking-[0.24em]">No. {String(index + 1).padStart(2, '0')}</span>
        </div>
      </motion.div>
      {/* ── END IMAGE AREA ─── */}

      {/* ── CARD BODY: flat, no tilt, border-aligned ───────────────── */}
      <div className="p-7 flex flex-col gap-4 flex-1 pb-10">
        <div className="flex items-center justify-between gap-3">
          <h3 className="luxury-card-title text-[1.75rem] md:text-[2rem] text-ivory group-hover:text-gold-300 transition-colors duration-300">
            {name}
          </h3>
          <ArrowRight size={14} strokeWidth={1} className="text-gold-400/60 group-hover:text-gold-400 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
        </div>

        <p className="luxury-body" style={{ maxWidth: '92%', color: 'rgba(245,241,234,0.90)' }}>{desc}</p>

        <div className="flex flex-wrap gap-2 mt-auto pt-3">
          {notes.map((note) => (
            <span key={note} className="text-[10px] tracking-[0.18em] uppercase px-3 py-1.5 border text-gold-300/90 group-hover:text-gold-300 transition-all duration-300 rounded-full" style={{ borderColor: `${accentColor}38`, background: `${accentColor}08` }}>
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
  const [activeId, setActiveId] = useState(null)
  const handleTap = (id) => setActiveId((prev) => (prev === id ? null : id))

  const headingRef = useGSAPReveal({ from: { opacity: 0, y: 30 }, to: { opacity: 1, y: 0 } })
  const gridRef    = useGSAPStaggerReveal({ selector: '[data-reveal]', stagger: 0.18, start: 'top 80%' })
  const ctaRef     = useGSAPReveal({ from: { opacity: 0, y: 24 }, to: { opacity: 1, y: 0 }, duration: 0.8, start: 'top 92%' })

  return (
    <section className="py-24 md:py-32 luxury-section luxury-divider-glow relative">

      {/* Atmospheric glow zone behind heading */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(170,96,31,0.14) 0%, transparent 65%)' }}
      />
      {/* Warm amber glow — bottom left */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 0% 100%, rgba(110,46,23,0.11) 0%, transparent 65%)' }}
      />
      {/* Cool right accent */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 50%, rgba(78,22,42,0.16) 0%, transparent 70%)' }}
      />

    <div className="cx relative z-10">

      {/* Header */}
      <div ref={headingRef} className="w-full text-center mb-20">
        <p className="editorial-label mb-8">Our Craft</p>
        <h2 className="luxury-heading text-4xl sm:text-5xl md:text-7xl text-ivory mb-8 text-center">Signature Scents</h2>
        <p className="font-heading italic text-[#ECE6DC] text-xl md:text-2xl max-w-md mx-auto text-center leading-relaxed">
          Each fragrance tells a story, each drop holds a world.
        </p>
      </div>

      {/* 2-row 3-col grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-14 mb-14">
        <FragranceCard fragrance={FRAGRANCES[0]} index={0} activeId={activeId} onTap={handleTap} />
        <FragranceCard fragrance={FRAGRANCES[1]} index={1} activeId={activeId} onTap={handleTap} />
        <FragranceCard fragrance={FRAGRANCES[2]} index={2} activeId={activeId} onTap={handleTap} />
        <FragranceCard fragrance={FRAGRANCES[3]} index={3} activeId={activeId} onTap={handleTap} />
        <FragranceCard fragrance={FRAGRANCES[4]} index={4} activeId={activeId} onTap={handleTap} />
        <FragranceCard fragrance={FRAGRANCES[5]} index={5} activeId={activeId} onTap={handleTap} />
      </div>

      {/* CTA */}
      <div ref={ctaRef} className="text-center mt-16 md:mt-20">
        <Link to="/collections">
          <motion.span
            className="group relative inline-flex items-center gap-3 cursor-pointer select-none overflow-hidden"
            initial="rest"
            whileHover="hover"
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '16px 40px',
              background: 'linear-gradient(135deg, rgba(201,168,76,1) 0%, rgba(176,141,87,0.95) 100%)',
              color: '#060402',
              border: '1px solid rgba(226,194,125,0.70)',
              boxShadow: '0 0 28px rgba(201,168,76,0.20), inset 0 1px 0 rgba(255,255,255,0.18)',
            }}
            variants={{
              rest: { y: 0, boxShadow: '0 0 28px rgba(201,168,76,0.20), inset 0 1px 0 rgba(255,255,255,0.18)' },
              hover: { y: -3, boxShadow: '0 0 48px rgba(201,168,76,0.38), inset 0 1px 0 rgba(255,255,255,0.22)' },
            }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Shimmer sweep */}
            <motion.span
              className="absolute inset-0 pointer-events-none"
              variants={{
                rest: { x: '-100%', opacity: 0 },
                hover: { x: '100%', opacity: 1 },
              }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: 'linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.14) 50%, transparent 75%)',
              }}
            />
            <span className="relative text-[11px] tracking-[0.36em] uppercase font-semibold">
              View All Collections
            </span>
            <motion.span
              className="relative"
              variants={{ rest: { x: 0 }, hover: { x: 4 } }}
              transition={{ duration: 0.3 }}
            >
              <ArrowRight size={13} strokeWidth={2} />
            </motion.span>
          </motion.span>
        </Link>
      </div>
    </div>
    </section>
  )
}
