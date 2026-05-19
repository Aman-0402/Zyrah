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
  { left: '9%',  top: '28%', dur: 7,  del: 0,   size: 1.5 },
  { left: '87%', top: '22%', dur: 9,  del: 1.3, size: 1 },
  { left: '14%', top: '68%', dur: 8,  del: 2.6, size: 2 },
  { left: '80%', top: '63%', dur: 6,  del: 0.9, size: 1.5 },
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

export default function AboutHero() {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: '56vh', paddingTop: '90px', background: '#050403' }}
    >
      {/* Deep cinematic glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 70% at 50% 60%, rgba(120,70,20,0.12) 0%, rgba(59,31,15,0.20) 45%, transparent 75%)',
      }} />
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 80% at 30% 20%, rgba(80,40,10,0.11) 0%, transparent 70%)',
      }} />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 80% at 70% 80%, rgba(60,30,8,0.09) 0%, transparent 70%)',
      }} />

      {/* Gold dust */}
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
          <Link
            to="/"
            className="text-[9px] tracking-[0.4em] uppercase transition-colors duration-300"
            style={{ color: 'rgba(176,141,87,0.65)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(176,141,87,0.90)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(176,141,87,0.65)'}
          >
            Home
          </Link>
          <ChevronRight size={9} style={{ color: 'rgba(176,141,87,0.45)' }} />
          <span className="text-[9px] tracking-[0.4em] uppercase" style={{ color: 'rgba(176,141,87,0.88)' }}>
            About
          </span>
        </motion.nav>

        {/* Eyebrow */}
        <motion.p
          variants={item}
          className="text-[10px] tracking-[0.6em] uppercase mb-6"
          style={{ color: 'rgba(176,141,87,0.82)' }}
        >
          Est. In India
        </motion.p>

        {/* Headline */}
        <motion.div variants={item} className="overflow-hidden mb-3">
          <h1 className="font-heading leading-none" style={{ fontWeight: 300 }}>
            <span className="block text-5xl md:text-7xl lg:text-[5.5rem]" style={{ color: 'rgba(245,240,232,0.92)' }}>
              Our
            </span>
            <span
              className="block text-5xl md:text-7xl lg:text-[5.5rem] italic text-gold-gradient"
              style={{ fontWeight: 400, lineHeight: 0.92 }}
            >
              Story
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
        <motion.p
          variants={item}
          className="font-heading italic text-lg md:text-xl"
          style={{ color: 'rgba(255,252,245,0.82)', letterSpacing: '0.01em' }}
        >
          Born from a passion for pure fragrance.
        </motion.p>
      </motion.div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #050403, transparent)' }}
      />
      <ArabesqueDivider />
    </section>
  )
}
