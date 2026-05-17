import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
}

/* Horizontal arabesque divider */
function ArabesqueDivider() {
  return (
    <svg
      className="absolute bottom-0 left-0 right-0 w-full opacity-20"
      height="24"
      viewBox="0 0 1440 24"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 12 Q180 0 360 12 Q540 24 720 12 Q900 0 1080 12 Q1260 24 1440 12"
        stroke="#C9A84C"
        strokeWidth="0.6"
        fill="none"
      />
      {[180, 540, 900, 1260].map((cx) => (
        <circle key={cx} cx={cx} cy="2" r="2" fill="#C9A84C" opacity="0.5" />
      ))}
      {[360, 720, 1080].map((cx) => (
        <circle key={cx} cx={cx} cy="22" r="2" fill="#C9A84C" opacity="0.5" />
      ))}
    </svg>
  )
}

export default function CollectionsHero() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-black" style={{ minHeight: '60vh' }}>

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Top border line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-20 left-0 right-0 h-px origin-left"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)' }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        {/* Breadcrumb */}
        <motion.nav variants={item} className="flex items-center justify-center gap-1.5 mb-8">
          <Link to="/" className="text-[9px] tracking-[0.35em] uppercase text-gold-400/30 hover:text-gold-400/60 transition-colors duration-300">
            Home
          </Link>
          <ChevronRight size={10} className="text-gold-400/20" />
          <span className="text-[9px] tracking-[0.35em] uppercase text-gold-400/50">
            Collections
          </span>
        </motion.nav>

        {/* Label */}
        <motion.p variants={item} className="text-[10px] tracking-[0.5em] uppercase text-gold-400/50 mb-5">
          Our Catalogue
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="font-heading text-5xl md:text-7xl lg:text-8xl text-ivory mb-4 leading-tight"
          style={{ fontWeight: 300 }}
        >
          The{' '}
          <span className="italic text-gold-gradient" style={{ fontWeight: 400 }}>
            Collection
          </span>
        </motion.h1>

        {/* Gold divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 0.9, delay: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="h-px bg-gold-400/50 mx-auto mb-6"
        />

        {/* Subtext */}
        <motion.p
          variants={item}
          className="font-heading italic text-ivory/35 text-lg md:text-xl max-w-sm mx-auto"
        >
          Twelve signatures. Countless stories.
        </motion.p>
      </motion.div>

      <ArabesqueDivider />
    </section>
  )
}
