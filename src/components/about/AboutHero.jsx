import { motion } from 'framer-motion'

const LUXURY = [0.22, 1, 0.36, 1]

const PARTICLES = [
  { left: '9%',  top: '28%', dur: 7,  del: 0,   size: 1.5 },
  { left: '87%', top: '22%', dur: 9,  del: 1.3, size: 1 },
  { left: '14%', top: '68%', dur: 8,  del: 2.6, size: 2 },
  { left: '80%', top: '63%', dur: 6,  del: 0.9, size: 1.5 },
  { left: '55%', top: '45%', dur: 11, del: 1.8, size: 1 },
  { left: '72%', top: '78%', dur: 8,  del: 3.2, size: 1.5 },
]

export default function AboutHero() {
  return (
    <section
      className="relative flex flex-col justify-center overflow-hidden luxury-section"
      style={{
        minHeight: '75vh',
        paddingTop: 'clamp(100px, 11vw, 140px)',
        paddingBottom: '5vh',
        background: 'linear-gradient(160deg, #0a0705 0%, #0d0807 40%, #0a0705 70%, #090605 100%)',
      }}
    >
      {/* Atmospheric glows */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 55% at 75% 40%, rgba(156,88,28,0.18) 0%, transparent 65%)',
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 50% 45% at 15% 70%, rgba(84,25,42,0.14) 0%, transparent 65%)',
      }} />
      <div className="absolute top-0 right-0 w-[800px] h-[500px] pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.07) 0%, transparent 60%)',
      }} />

      {/* Gold dust */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size, background: 'rgba(176,141,87,0.75)' }}
          animate={{ y: [0, -22, 0], opacity: [0, 0.40, 0], scale: [1, 2, 1] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.del, ease: 'easeInOut' }}
        />
      ))}


      {/* Vertical gold rule — right side accent */}
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.6, ease: LUXURY }}
        className="absolute right-12 md:right-20 top-1/4 bottom-1/4 w-px pointer-events-none hidden md:block"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.35) 30%, rgba(226,194,125,0.50) 50%, rgba(201,168,76,0.35) 70%, transparent)',
          transformOrigin: 'top',
        }}
      />

      {/* EST label — vertical right side */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 1.2 }}
        className="absolute right-6 md:right-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4 pointer-events-none"
      >
        <span
          className="tracking-[0.4em] uppercase font-semibold"
          style={{
            fontSize: '9px',
            color: 'rgba(176,141,87,0.50)',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            letterSpacing: '0.4em',
          }}
        >
          Est. in India
        </span>
      </motion.div>

      {/* Main content — bottom aligned, left */}
      <div className="cx relative z-10">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: LUXURY }}
          className="text-[10px] md:text-[11px] tracking-[0.5em] uppercase font-semibold mb-8 md:mb-10"
          style={{ color: 'rgba(176,141,87,0.60)' }}
        >
          Est. In India &nbsp;·&nbsp; Since Generations
        </motion.p>

        {/* MASSIVE one-line headline */}
        <div className="overflow-hidden mb-8 md:mb-10">
          <motion.h1
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.45, ease: LUXURY }}
            className="font-heading leading-none whitespace-nowrap"
            style={{
              fontSize: 'clamp(56px, 11vw, 180px)',
              fontWeight: 300,
              letterSpacing: '-0.025em',
              lineHeight: 0.90,
            }}
          >
            <span style={{ color: 'rgba(245,241,234,0.97)', fontStyle: 'italic' }}>Our&nbsp;</span>
            <span style={{
              background: 'linear-gradient(135deg, #E2C27D 0%, #C9A84C 38%, #A8862E 65%, #C9A84C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontStyle: 'normal',
            }}>Story.</span>
          </motion.h1>
        </div>

        {/* Gold rule */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 120, opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.0, ease: LUXURY }}
          className="h-px mb-8"
          style={{ background: 'linear-gradient(to right, rgba(201,168,76,0.80), rgba(201,168,76,0.20), transparent)' }}
        />

        {/* Subtext + stat row */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-8 sm:gap-16">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 1.1, ease: LUXURY }}
            className="font-heading italic max-w-sm"
            style={{
              fontSize: 'clamp(17px, 1.8vw, 24px)',
              color: 'rgba(236,230,220,0.82)',
              letterSpacing: '0.005em',
              lineHeight: 1.4,
            }}
          >
            Born from a passion for pure fragrance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 1.25, ease: LUXURY }}
            className="flex items-center gap-8"
          >
            <div className="flex flex-col gap-1">
              <span className="font-heading text-3xl md:text-4xl leading-none" style={{ color: 'rgba(201,168,76,0.95)' }}>500+</span>
              <span className="text-[9px] tracking-[0.32em] uppercase" style={{ color: 'rgba(176,141,87,0.55)' }}>Blends Crafted</span>
            </div>
            <div className="w-px h-10" style={{ background: 'rgba(201,168,76,0.20)' }} />
            <div className="flex flex-col gap-1">
              <span className="font-heading text-3xl md:text-4xl leading-none" style={{ color: 'rgba(201,168,76,0.95)' }}>100%</span>
              <span className="text-[9px] tracking-[0.32em] uppercase" style={{ color: 'rgba(176,141,87,0.55)' }}>Custom Made</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0c0806, transparent)' }}
      />

      {/* Bottom gold line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.8, delay: 0.3, ease: LUXURY }}
        className="absolute bottom-0 left-0 right-0 h-px origin-left pointer-events-none"
        style={{ background: 'linear-gradient(90deg, rgba(201,168,76,0.40) 0%, rgba(226,194,125,0.55) 30%, transparent 80%)' }}
      />
    </section>
  )
}
