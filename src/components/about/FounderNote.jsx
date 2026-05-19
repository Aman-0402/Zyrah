import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useGSAPReveal } from '../../hooks/useGSAPReveal'

const LUXURY = [0.22, 1, 0.36, 1]

const QUOTE = "We started M. M. Attarwala with one belief — that everyone deserves a fragrance crafted for them alone."
const WORDS = QUOTE.split(' ')

const wordContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.15 } },
}
const word = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } },
}

const PARTICLES = [
  { left: '8%',  top: '22%', dur: 8,  del: 0,   size: 1.5 },
  { left: '92%', top: '35%', dur: 6,  del: 1.2, size: 1 },
  { left: '85%', top: '70%', dur: 9,  del: 2.5, size: 1.5 },
  { left: '12%', top: '78%', dur: 7,  del: 0.8, size: 1 },
  { left: '50%', top: '10%', dur: 8,  del: 1.8, size: 1 },
  { left: '65%', top: '88%', dur: 7,  del: 3.2, size: 1 },
]

/* Decorative right-side visual — rotating rings + Arabic calligraphy */
function DecorativeVisual() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: '380px', height: '420px' }}>

      {/* Ambient glow behind */}
      <div className="absolute pointer-events-none" style={{
        width: '340px', height: '340px',
        background: 'radial-gradient(circle, rgba(176,141,87,0.09) 0%, transparent 68%)',
        filter: 'blur(50px)',
        borderRadius: '50%',
      }} />

      {/* Outer slow ring — clockwise */}
      <motion.div
        className="absolute rounded-full"
        style={{ width: '300px', height: '300px', border: '1px dashed rgba(176,141,87,0.10)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      />

      {/* Mid ring — counter-clockwise */}
      <motion.div
        className="absolute rounded-full"
        style={{ width: '230px', height: '230px', border: '1px solid rgba(176,141,87,0.07)' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
      />

      {/* Inner ring — static */}
      <div className="absolute rounded-full"
        style={{ width: '160px', height: '160px', border: '1px solid rgba(176,141,87,0.05)' }} />

      {/* Cardinal diamonds on outer ring */}
      {[
        { top: '4%',  left: '50%' },
        { top: '50%', left: '97%' },
        { top: '96%', left: '50%' },
        { top: '50%', left: '3%'  },
      ].map((pos, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: pos.top, left: pos.left,
          width: '5px', height: '5px',
          background: 'rgba(176,141,87,0.32)',
          transform: 'translate(-50%,-50%) rotate(45deg)',
        }} />
      ))}

      {/* Center: Arabic calligraphy */}
      <div className="relative z-10 flex flex-col items-center gap-1 select-none">
        <motion.span
          className="font-heading"
          animate={{ opacity: [0.07, 0.16, 0.07] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            fontSize: 'clamp(3.5rem, 6vw, 5.5rem)',
            color: 'rgba(201,168,76,1)',
            fontWeight: 300,
            lineHeight: 1,
          }}
        >
          م. م.
        </motion.span>
        <motion.span
          className="font-heading"
          animate={{ opacity: [0.04, 0.10, 0.04] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          style={{
            fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
            color: 'rgba(201,168,76,1)',
            letterSpacing: '0.18em',
            fontWeight: 300,
          }}
        >
          عطارولا
        </motion.span>

        {/* Small gold dot below */}
        <motion.div
          animate={{ opacity: [0.2, 0.55, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(201,168,76,0.5)', marginTop: '8px' }}
        />
      </div>
    </div>
  )
}

export default function FounderNote() {
  const sectionRef = useGSAPReveal({
    from: { opacity: 0 },
    to:   { opacity: 1 },
    duration: 1.2,
    start: 'top 85%',
  })

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden luxury-section luxury-section-alt luxury-divider-glow"
      style={{
        padding: 'clamp(6rem, 12vw, 10rem) 1.5rem',
      }}
    >
      {/* Top + bottom gold lines */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.22), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.14), transparent)' }} />

      {/* Atmospheric glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(164,86,28,0.13) 0%, rgba(82,24,42,0.09) 42%, transparent 72%)',
      }} />

      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size, background: 'rgba(176,141,87,0.55)' }}
          animate={{ y: [0, -22, 0], opacity: [0, 0.28, 0] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.del, ease: 'easeInOut' }}
        />
      ))}

      {/* 2-col layout */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-16 md:gap-24 items-center">

          {/* ── LEFT: quote + attribution + CTA ── */}
          <div className="flex flex-col gap-8 max-w-[640px]">

            {/* Opening mark */}
            <div className="font-heading select-none"
              style={{ fontSize: '7rem', color: 'rgba(201,168,76,0.08)', lineHeight: 0.75, fontStyle: 'italic' }}>
              "
            </div>

            {/* Word-by-word quote */}
            <motion.blockquote
              variants={wordContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              className="font-heading flex flex-wrap gap-x-2.5 gap-y-1"
              style={{
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.48,
                fontSize: 'clamp(1.65rem, 3.2vw, 2.6rem)',
              }}
            >
              {WORDS.map((w, i) => (
                <motion.span key={i} variants={word} style={{ color: 'rgba(255,248,240,0.88)' }}>
                  {w}
                </motion.span>
              ))}
            </motion.blockquote>

            {/* Attribution */}
            <div className="flex items-center gap-3 mt-1">
              <div className="h-px w-10" style={{ background: 'rgba(201,168,76,0.38)' }} />
              <p className="text-[10px] tracking-[0.5em] uppercase" style={{ color: 'rgba(201,168,76,0.70)' }}>
                The Founder, M. M. Attarwala
              </p>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <Link to="/custom-fragrance">
                <motion.span
                  className="inline-flex items-center gap-4 cursor-pointer select-none"
                  style={{
                    border: '1px solid rgba(176,141,87,0.35)',
                    color: 'rgba(176,141,87,0.78)',
                    padding: '16px 40px',
                    fontSize: '10px',
                    letterSpacing: '0.48em',
                    textTransform: 'uppercase',
                    fontWeight: 300,
                  }}
                  whileHover={{
                    borderColor: 'rgba(201,168,76,0.62)',
                    color: 'rgba(201,168,76,1)',
                    y: -3,
                    boxShadow: '0 14px 36px rgba(176,141,87,0.16)',
                  }}
                  transition={{ duration: 0.45, ease: LUXURY }}
                >
                  Craft Your Fragrance
                  <ArrowRight size={12} strokeWidth={1.5} />
                </motion.span>
              </Link>
            </div>

            {/* Premium attribute strip */}
            <div
              className="flex items-center gap-4 pt-6"
              style={{ borderTop: '1px solid rgba(201,168,76,0.09)' }}
            >
              {['Handcrafted', 'Made For You'].map((item, i) => (
                <span key={item} className="flex items-center gap-4">
                  {i > 0 && (
                    <span style={{ color: 'rgba(201,168,76,0.55)', fontSize: '6px' }}>◆</span>
                  )}
                  <span
                    className="text-[9px] tracking-[0.38em] uppercase"
                    style={{ color: 'rgba(255,252,245,0.72)' }}
                  >
                    {item}
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* ── RIGHT: decorative visual (desktop only) ── */}
          <div className="hidden md:flex items-center justify-center">
            <DecorativeVisual />
          </div>

        </div>
      </div>
    </section>
  )
}
