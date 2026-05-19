import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const LUXURY = [0.22, 1, 0.36, 1]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] } },
}

const PARTICLES = [
  { left: '8%',  top: '30%', dur: 8,  del: 0,   size: 1.5 },
  { left: '88%', top: '22%', dur: 10, del: 1.5, size: 1 },
  { left: '15%', top: '70%', dur: 9,  del: 3.0, size: 1.5 },
  { left: '78%', top: '60%', dur: 7,  del: 1.0, size: 1 },
]

function ArabesqueDivider() {
  return (
    <svg
      className="absolute bottom-0 left-0 right-0 w-full"
      height="28"
      viewBox="0 0 1440 28"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d="M0 14 Q180 0 360 14 Q540 28 720 14 Q900 0 1080 14 Q1260 28 1440 14"
        stroke="rgba(176,141,87,0.18)"
        strokeWidth="0.7"
        fill="none"
      />
      {[360, 720, 1080].map((cx) => (
        <circle key={cx} cx={cx} cy="14" r="2" fill="rgba(176,141,87,0.35)" />
      ))}
      {[180, 540, 900, 1260].map((cx) => (
        <circle key={cx} cx={cx} cy="4" r="1.2" fill="rgba(176,141,87,0.2)" />
      ))}
    </svg>
  )
}

export default function CollectionsHero() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: 'clamp(38vh, 55vw, 56vh)', paddingTop: '90px' }}>

      {/* Background image */}
      <div className="absolute inset-0" style={{
        backgroundImage: `url(${import.meta.env.BASE_URL}backgrounddd.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }} />

      {/* Localized dark veil behind text center only */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 65% 80% at 50% 52%, rgba(10,6,5,0.42) 0%, rgba(31,13,17,0.24) 52%, transparent 76%)',
      }} />
      {/* Bottom fade into page */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(180deg, rgba(18,10,8,0.08) 0%, transparent 30%, transparent 65%, rgba(16,9,8,0.76) 100%)',
      }} />

      {/* Gold dust particles */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size, background: 'rgba(176,141,87,0.7)' }}
          animate={{ y: [0, -18, 0], opacity: [0, 0.35, 0], scale: [1, 1.8, 1] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.del, ease: 'easeInOut' }}
        />
      ))}

      {/* Top border line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.1, ease: LUXURY }}
        className="absolute top-20 left-0 right-0 h-px origin-left"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(176,141,87,0.25), transparent)' }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center px-6 max-w-3xl mx-auto"
      >
        {/* Breadcrumb */}
        <motion.nav variants={item} className="flex items-center justify-center gap-1.5 mb-10">
          <Link to="/" className="text-[10px] tracking-[0.24em] uppercase font-semibold transition-colors duration-300"
            style={{ color: 'rgba(176,141,87,0.65)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(176,141,87,0.90)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(176,141,87,0.65)'}
          >
            Home
          </Link>
          <ChevronRight size={9} style={{ color: 'rgba(176,141,87,0.45)' }} />
          <span className="text-[10px] tracking-[0.24em] uppercase font-semibold" style={{ color: 'rgba(200,169,107,0.90)' }}>
            Collections
          </span>
        </motion.nav>

        {/* Eyebrow */}
        <motion.p variants={item} className="editorial-label mb-6">
          Our Catalogue
        </motion.p>

        {/* Headline */}
        <motion.div variants={item} className="overflow-hidden mb-3">
          <h1 className="font-heading leading-none" style={{ fontWeight: 300 }}>
            <span className="block text-5xl md:text-7xl lg:text-[5.5rem]" style={{ color: 'rgba(255,252,245,0.98)', textShadow: '0 2px 30px rgba(0,0,0,0.72), 0 0 60px rgba(201,168,76,0.08)' }}>
              The
            </span>
            <span className="block text-5xl md:text-7xl lg:text-[5.5rem] italic text-gold-gradient" style={{ fontWeight: 400, lineHeight: 0.92, textShadow: '0 2px 30px rgba(0,0,0,0.68), 0 0 60px rgba(201,168,76,0.16)' }}>
              Collection
            </span>
          </h1>
        </motion.div>

        {/* Animated gold divider */}
        <motion.div className="flex items-center justify-center gap-3 my-7" variants={item}>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 60, opacity: 1 }}
            transition={{ duration: 1.0, delay: 1.0, ease: LUXURY }}
            className="h-px"
            style={{ background: 'linear-gradient(to right, transparent, rgba(176,141,87,0.6))' }}
          />
          <span style={{ color: 'rgba(176,141,87,0.75)', fontSize: '8px' }}>✦</span>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 60, opacity: 1 }}
            transition={{ duration: 1.0, delay: 1.0, ease: LUXURY }}
            className="h-px"
            style={{ background: 'linear-gradient(to left, transparent, rgba(176,141,87,0.6))' }}
          />
        </motion.div>

        {/* Subtext */}
        <motion.p variants={item} className="font-heading italic text-lg md:text-xl"
          style={{ color: 'rgba(255,248,232,0.80)', letterSpacing: '0.01em', textShadow: '0 1px 20px rgba(0,0,0,0.8)' }}>
          Twelve signatures. Countless stories.
        </motion.p>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #100908, transparent)' }} />

      <ArabesqueDivider />
    </section>
  )
}
