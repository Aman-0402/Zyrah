import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useGSAPReveal, useGSAPStaggerReveal } from '../../hooks/useGSAPReveal'
import Button from '../ui/Button'
import heavenTouchImg from '../../../public/Sqaure Perfume Images/Heaven Touch perfume allure.png'

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
    imageH: 'h-64',
    image: heavenTouchImg,
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
    imageH: 'h-96',
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
    imageH: 'h-64',
  },
]

function FragranceCard({ fragrance, index }) {
  const { featured, accentColor, gradient, arabic, name, desc, notes, imageH, image } = fragrance

  return (
    <motion.article
      data-reveal
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className={[
        'group relative flex flex-col border transition-colors duration-500 cursor-pointer',
        featured
          ? 'border-gold-400/30 hover:border-gold-400/60'
          : 'border-gold-400/10 hover:border-gold-400/35',
      ].join(' ')}
      style={{ background: featured ? 'rgba(20,10,4,0.9)' : '#111111' }}
    >
      {/* Featured badge */}
      {featured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="text-[8px] tracking-[0.35em] uppercase px-3 py-1 border border-gold-400/40 text-gold-400/80 bg-black/60">
            Bestseller
          </span>
        </div>
      )}

      {/* Image */}
      <div className={`relative overflow-hidden ${imageH}`} style={{ background: gradient }}>
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ background: `linear-gradient(135deg, ${accentColor}0D 0%, transparent 60%)` }}
        />

        {/* Arabic name watermark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-6xl md:text-7xl font-light transition-transform duration-700 group-hover:scale-110"
            style={{ color: accentColor, opacity: image ? 0.03 : 0.09, fontFamily: 'Georgia, serif' }}
          >
            {arabic}
          </span>
        </div>

        {/* Swaying bottle image */}
        {image && (
          <div
            className="absolute inset-0 flex items-end justify-center pointer-events-none"
            style={{ perspective: '700px' }}
          >
            <motion.img
              src={image}
              alt={name}
              animate={{ rotateY: [-12, 12, -12] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="object-contain relative z-10"
              style={{
                height: '92%',
                width: 'auto',
                filter: 'drop-shadow(-6px 18px 18px rgba(0,0,0,0.8)) drop-shadow(6px 0px 12px rgba(201,168,76,0.08))',
                transformOrigin: 'bottom center',
              }}
            />
          </div>
        )}

        {/* Index */}
        <div className="absolute top-4 left-4">
          <span className="text-[9px] tracking-[0.4em] uppercase text-gold-400/30">No. 0{index + 1}</span>
        </div>

        {/* Arabic italic in image bottom */}
        <div className="absolute bottom-4 left-4 right-4">
          <p className="font-heading text-2xl text-ivory/80 group-hover:text-ivory transition-colors duration-300" style={{ fontStyle: 'italic', fontWeight: 300 }}>
            {arabic}
          </p>
        </div>

        {/* Corner gold lines */}
        <div className="absolute top-0 right-0 w-12 h-px transition-all duration-500 group-hover:w-20" style={{ background: `linear-gradient(to left, ${accentColor}60, transparent)` }} />
        <div className="absolute top-0 right-0 w-px h-12 transition-all duration-500 group-hover:h-20" style={{ background: `linear-gradient(to bottom, ${accentColor}60, transparent)` }} />

        {/* Featured: extra glow overlay */}
        {featured && (
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(226,194,125,0.06) 0%, transparent 70%)' }} />
        )}
      </div>

      {/* Card body */}
      <div className={`p-6 flex flex-col gap-3 flex-1 ${featured ? 'gap-4' : ''}`}>
        <div className="flex items-start justify-between">
          <h3 className={`font-heading text-ivory group-hover:text-gold-300 transition-colors duration-300 ${featured ? 'text-2xl' : 'text-xl'}`}>
            {name}
          </h3>
          <motion.div className="text-gold-400/40 group-hover:text-gold-400 transition-colors duration-300 mt-1" whileHover={{ x: 3 }}>
            <ArrowRight size={16} strokeWidth={1.5} />
          </motion.div>
        </div>

        <p className={`text-ivory/40 font-light leading-relaxed ${featured ? 'text-sm' : 'text-sm'}`}>{desc}</p>

        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {notes.map((note) => (
            <span key={note} className="text-[9px] tracking-[0.3em] uppercase px-3 py-1 border border-gold-400/15 text-gold-400/50 group-hover:border-gold-400/30 group-hover:text-gold-400/70 transition-all duration-300">
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

      {/* Staggered 3-col grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-14 md:items-end">
        <div className="md:mb-16">
          <FragranceCard fragrance={FRAGRANCES[0]} index={0} />
        </div>
        <div>
          <FragranceCard fragrance={FRAGRANCES[1]} index={1} />
        </div>
        <div className="md:mb-8">
          <FragranceCard fragrance={FRAGRANCES[2]} index={2} />
        </div>
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
