import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import Button from '../ui/Button'

/* ── Framer Motion variants ─────────────────────────────────────────────── */
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.5 },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
  },
}

const lineReveal = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  show: {
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] },
  },
}

/* ── Decorative SVG arabesque ───────────────────────────────────────────── */
function ArabesqueCorner({ flip = false }) {
  return (
    <svg
      width="180"
      height="180"
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`opacity-[0.06] ${flip ? 'scale-x-[-1]' : ''}`}
    >
      <path
        d="M10 10 Q90 10 90 90 Q90 170 170 170"
        stroke="#E2C27D"
        strokeWidth="0.8"
        fill="none"
      />
      <path
        d="M10 30 Q70 30 70 90 Q70 150 130 170"
        stroke="#C9A84C"
        strokeWidth="0.5"
        fill="none"
      />
      <circle cx="10" cy="10" r="3" fill="#C9A84C" opacity="0.4" />
      <circle cx="170" cy="170" r="3" fill="#C9A84C" opacity="0.4" />
      <path
        d="M30 10 Q30 50 60 60 Q90 70 90 110 Q90 140 120 150"
        stroke="#E2C27D"
        strokeWidth="0.3"
        fill="none"
        opacity="0.5"
      />
    </svg>
  )
}

export default function HeroSection() {
  const orb1Ref = useRef(null)
  const orb2Ref = useRef(null)
  const orb3Ref = useRef(null)

  /* GSAP: Floating ambient orbs */
  useEffect(() => {
    const orbs = [orb1Ref.current, orb2Ref.current, orb3Ref.current]

    orbs.forEach((orb, i) => {
      if (!orb) return
      gsap.to(orb, {
        x: `${(i % 2 === 0 ? 1 : -1) * (20 + i * 10)}px`,
        y: `${-15 - i * 8}px`,
        duration: 4 + i * 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.8,
      })
    })
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">

      {/* ── Ambient background orbs ─────────────────────────────────────── */}
      <div
        ref={orb1Ref}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(59,31,15,0.5) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        ref={orb3Ref}
        className="absolute top-2/3 left-1/2 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* ── Arabesque corners ───────────────────────────────────────────── */}
      <div className="absolute top-20 left-6 md:left-10 pointer-events-none">
        <ArabesqueCorner />
      </div>
      <div className="absolute top-20 right-6 md:right-10 pointer-events-none">
        <ArabesqueCorner flip />
      </div>

      {/* ── Thin gold border lines (top + bottom) ───────────────────────── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-20 left-0 right-0 h-px origin-left"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)' }}
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
        className="absolute bottom-24 left-0 right-0 h-px origin-right"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)' }}
      />

      {/* ── Main Content ────────────────────────────────────────────────── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* EST label */}
        <motion.p
          variants={item}
          className="text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-gold-400/60 mb-8"
        >
          Est. in India &nbsp;·&nbsp; Crafted With Love
        </motion.p>

        {/* Headline line 1 */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            variants={lineReveal}
            className="font-heading italic text-[72px] md:text-[120px] lg:text-[150px] text-ivory leading-none tracking-tight"
            style={{ fontWeight: 300 }}
          >
            Crafted
          </motion.h1>
        </div>

        {/* Headline line 2 */}
        <div className="overflow-hidden mb-8">
          <motion.h1
            variants={lineReveal}
            className="font-heading text-[72px] md:text-[120px] lg:text-[150px] leading-none tracking-tight text-gold-gradient"
            style={{ fontWeight: 400, transitionDelay: '0.2s' }}
          >
            For You.
          </motion.h1>
        </div>

        {/* Gold divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="h-px bg-gold-400/60 mx-auto mb-8"
        />

        {/* Subheading */}
        <motion.p
          variants={item}
          className="text-ivory/50 text-sm md:text-base font-light max-w-md mx-auto leading-relaxed mb-10 tracking-wide"
        >
          Custom-made fragrances, blended from the finest attars.
          <br />
          <span className="text-gold-400/70">Free delivery across India.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link to="/collections">
            <Button variant="primary" size="lg">
              Explore Collection
            </Button>
          </Link>
          <Link to="/custom-fragrance">
            <Button variant="outline" size="lg">
              Craft Yours
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ivory/30"
      >
        <span className="text-[9px] tracking-[0.4em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} strokeWidth={1} />
        </motion.div>
      </motion.div>

      {/* ── Bottom fade ─────────────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0A0A0A, transparent)' }}
      />
    </section>
  )
}
