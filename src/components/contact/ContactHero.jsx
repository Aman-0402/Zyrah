import { motion } from 'framer-motion'

const BASE = import.meta.env.BASE_URL
const LUXURY = [0.22, 1, 0.36, 1]

const PARTICLES = [
  { left: '8%',  top: '35%', dur: 8,  del: 0,   size: 1.5 },
  { left: '85%', top: '25%', dur: 10, del: 1.2, size: 1 },
  { left: '12%', top: '72%', dur: 7,  del: 2.4, size: 2 },
  { left: '78%', top: '65%', dur: 9,  del: 0.7, size: 1.5 },
  { left: '50%', top: '20%', dur: 11, del: 1.8, size: 1 },
]

export default function ContactHero() {
  return (
    <section
      className="relative flex flex-col justify-center overflow-hidden"
      style={{
        minHeight: '82vh',
        paddingTop: 'clamp(100px, 11vw, 140px)',
        paddingBottom: '6vh',
      }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${BASE}contactbackground.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Dark scrim — light enough to show image, dark enough for text */}
      <div className="absolute inset-0" style={{ background: 'rgba(5,3,2,0.1)' }} />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(5,3,2,0.50) 0%, rgba(5,3,2,0.10) 35%, rgba(5,3,2,0.18) 65%, rgba(5,3,2,0.88) 100%)',
      }} />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 65% 55% at 50% 45%, transparent 20%, rgba(5,3,2,0.25) 100%)',
      }} />

      {/* Gold atmospheric glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 55% 45% at 50% 60%, rgba(201,168,76,0.08) 0%, transparent 70%)',
      }} />

      {/* Gold dust */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size, background: 'rgba(201,168,76,0.80)' }}
          animate={{ y: [0, -20, 0], opacity: [0, 0.45, 0], scale: [1, 2, 1] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.del, ease: 'easeInOut' }}
        />
      ))}

      {/* Content — centered */}
      <div className="cx relative z-10 flex flex-col items-center text-center">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: LUXURY }}
          className="flex items-center gap-4 mb-10 md:mb-12"
        >
          <div className="h-px w-10 md:w-16" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.60))' }} />
          <span className="text-[10px] md:text-[11px] tracking-[0.50em] uppercase font-semibold" style={{ color: 'rgba(201,168,76,0.75)' }}>
            We'd Love To Hear From You
          </span>
          <div className="h-px w-10 md:w-16" style={{ background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.60))' }} />
        </motion.div>

        {/* Headline — "Get In" white + "Touch." gold, same size, stacked */}
        <div className="overflow-hidden mb-3">
          <motion.h1
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.45, ease: LUXURY }}
            className="font-heading italic leading-none"
            style={{
              fontSize: 'clamp(64px, 13vw, 190px)',
              fontWeight: 300,
              color: 'rgba(245,241,234,0.97)',
              letterSpacing: '-0.025em',
              lineHeight: 0.88,
              textShadow: '0 4px 60px rgba(0,0,0,0.60)',
            }}
          >
            Get In
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-12 md:mb-16">
          <motion.h1
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.60, ease: LUXURY }}
            className="font-heading leading-none"
            style={{
              fontSize: 'clamp(64px, 13vw, 190px)',
              fontWeight: 400,
              background: 'linear-gradient(135deg, #E2C27D 0%, #C9A84C 38%, #A8862E 65%, #C9A84C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.025em',
              lineHeight: 0.92,
              filter: 'drop-shadow(0 4px 30px rgba(201,168,76,0.25))',
            }}
          >
            Touch.
          </motion.h1>
        </div>

        {/* Divider ✦ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex items-center gap-4 mb-8 md:mb-10"
        >
          <motion.div
            initial={{ width: 0 }} animate={{ width: 70 }}
            transition={{ duration: 1.2, delay: 1.0, ease: LUXURY }}
            className="h-px"
            style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.65))' }}
          />
          <span style={{ color: 'rgba(201,168,76,0.80)', fontSize: '10px' }}>✦</span>
          <motion.div
            initial={{ width: 0 }} animate={{ width: 70 }}
            transition={{ duration: 1.2, delay: 1.0, ease: LUXURY }}
            className="h-px"
            style={{ background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.65))' }}
          />
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 1.1, ease: LUXURY }}
          className="font-heading italic max-w-lg"
          style={{
            fontSize: 'clamp(18px, 2vw, 26px)',
            color: 'rgba(236,230,220,0.88)',
            letterSpacing: '0.01em',
            lineHeight: 1.4,
            textShadow: '0 2px 20px rgba(0,0,0,0.50)',
          }}
        >
          Custom orders, questions, or just a hello.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 1.3 }}
          className="text-[10px] tracking-[0.42em] uppercase mt-4"
          style={{ color: 'rgba(201,168,76,0.60)' }}
        >
          Mandvi, Vadodara &nbsp;·&nbsp; Two Locations
        </motion.p>
      </div>

      {/* Bottom fade into page */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #090605, rgba(9,6,5,0.80), transparent)' }}
      />
    </section>
  )
}
