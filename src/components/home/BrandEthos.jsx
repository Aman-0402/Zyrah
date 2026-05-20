import { motion } from 'framer-motion'
import { useGSAPReveal, useGSAPStaggerReveal } from '../../hooks/useGSAPReveal'

const PILLARS = [
  { label: 'Pure Ingredients', icon: '◈' },
  { label: 'Custom Blended',   icon: '◇' },
]

const textContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const textItem = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
}

/* Decorative right-side ornamental panel */
function OrnamentPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      className="relative flex items-center justify-center w-full h-full min-h-[460px]"
    >
      {/* Outer glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 70%)' }}
      />

      {/* Rotating outer ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        className="absolute w-72 h-72 md:w-80 md:h-80 rounded-full border border-dashed border-gold-400/8 pointer-events-none"
      />

      {/* Counter-rotating inner ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
        className="absolute w-48 h-48 md:w-56 md:h-56 rounded-full border border-gold-400/6 pointer-events-none"
      />

      {/* Central ornament box */}
      <div className="relative" style={{ width: 200, height: 200 }}>

        {/* Outer border box */}
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" className="absolute inset-0">
          {/* Main border */}
          <rect x="1" y="1" width="198" height="198" stroke="rgba(201,168,76,0.18)" strokeWidth="0.8" />

          {/* Corner brackets */}
          <path d="M1 20 L1 1 L20 1"   stroke="rgba(201,168,76,0.6)" strokeWidth="1.2" fill="none" />
          <path d="M180 1 L199 1 L199 20"   stroke="rgba(201,168,76,0.6)" strokeWidth="1.2" fill="none" />
          <path d="M1 180 L1 199 L20 199"   stroke="rgba(201,168,76,0.6)" strokeWidth="1.2" fill="none" />
          <path d="M180 199 L199 199 L199 180" stroke="rgba(201,168,76,0.6)" strokeWidth="1.2" fill="none" />

          {/* Inner decorative diamond */}
          <path d="M100 30 L170 100 L100 170 L30 100 Z" stroke="rgba(201,168,76,0.1)" strokeWidth="0.6" fill="none" />

          {/* Cross lines */}
          <line x1="100" y1="1"   x2="100" y2="199" stroke="rgba(201,168,76,0.04)" strokeWidth="0.5" />
          <line x1="1"   y1="100" x2="199" y2="100" stroke="rgba(201,168,76,0.04)" strokeWidth="0.5" />

          {/* Corner dots */}
          <circle cx="1"   cy="1"   r="2" fill="rgba(201,168,76,0.4)" />
          <circle cx="199" cy="1"   r="2" fill="rgba(201,168,76,0.4)" />
          <circle cx="1"   cy="199" r="2" fill="rgba(201,168,76,0.4)" />
          <circle cx="199" cy="199" r="2" fill="rgba(201,168,76,0.4)" />

          {/* Mid-edge diamonds */}
          <path d="M100 10 L104 14 L100 18 L96 14 Z" fill="rgba(201,168,76,0.3)" />
          <path d="M100 182 L104 186 L100 190 L96 186 Z" fill="rgba(201,168,76,0.3)" />
          <path d="M10 100 L14 104 L10 108 L6 104 Z" fill="rgba(201,168,76,0.3)" />
          <path d="M190 100 L194 104 L190 108 L186 104 Z" fill="rgba(201,168,76,0.3)" />
        </svg>

        {/* Central Arabic م */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <motion.span
            animate={{ opacity: [0.3, 0.55, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="font-heading"
            style={{
              fontSize: '5rem',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(201,168,76,0.55)',
              lineHeight: 1,
              display: 'block',
            }}
          >
            م
          </motion.span>
          <span className="text-[7px] tracking-[0.4em] uppercase text-gold-400/65">Attar</span>
        </div>
      </div>

      {/* Floating gold particles around box */}
      {[
        { top: '15%', left: '12%', dur: 3.1, del: 0 },
        { top: '18%', left: '82%', dur: 2.6, del: 0.8 },
        { top: '75%', left: '10%', dur: 3.4, del: 1.5 },
        { top: '78%', left: '84%', dur: 2.9, del: 0.4 },
        { top: '48%', left: '5%',  dur: 2.3, del: 1.1 },
        { top: '45%', left: '90%', dur: 3.0, del: 0.7 },
      ].map(({ top, left, dur, del }, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gold-400 pointer-events-none"
          style={{ top, left }}
          animate={{ opacity: [0.1, 0.5, 0.1], scale: [1, 1.8, 1] }}
          transition={{ duration: dur, repeat: Infinity, delay: del, ease: 'easeInOut' }}
        />
      ))}

      {/* Quote below box */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-[9px] tracking-[0.4em] uppercase text-gold-400/60 italic font-heading">
          &ldquo; Wear your story &rdquo;
        </p>
      </div>
    </motion.div>
  )
}

export default function BrandEthos() {
  const headRef    = useGSAPReveal({ from: { opacity: 0, y: 35 }, to: { opacity: 1, y: 0 }, duration: 0.9, start: 'top 82%' })
  const pillarsRef = useGSAPStaggerReveal({ selector: '[data-reveal]', from: { opacity: 0, y: 20, scale: 0.96 }, to: { opacity: 1, y: 0, scale: 1 }, stagger: 0.13, start: 'top 80%' })

  return (
    <section className="py-28 md:py-40 luxury-section luxury-section-alt luxury-divider-glow relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(9,6,5,0.22)' }} />
      {/* Cinematic glow behind emblem */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.11) 0%, rgba(95,28,45,0.08) 38%, transparent 68%)' }}
      />
      {/* Heading glow */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 0% 50%, rgba(143,71,25,0.12) 0%, transparent 65%)' }}
      />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.012] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(201,168,76,1) 40px, rgba(201,168,76,1) 41px),
                            repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(201,168,76,1) 40px, rgba(201,168,76,1) 41px)`,
        }}
      />

      {/* 2-col layout */}
      <div className="cx relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

        {/* LEFT: Text content */}
        <div className="flex flex-col gap-8">

          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.3em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.5em' }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="text-[10px] uppercase text-gold-400/80"
          >
            Our Philosophy
          </motion.p>

          <div ref={headRef} className="w-full">
            <h2 className="luxury-heading text-4xl md:text-5xl lg:text-6xl text-ivory">
              Every Scent
              <br />
              <span className="italic text-gold-300">Tells A Story</span>
            </h2>
          </div>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="h-px bg-gold-400/35"
          />

          <motion.div
            variants={textContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col gap-6"
          >
            <motion.p variants={textItem} className="luxury-body max-w-lg" style={{ color: 'rgba(255,252,245,0.88)' }}>
              At M. M. Attarwala, we believe fragrance is deeply personal.
              Every bottle we craft is a conversation between you and
              your senses — blended fresh, just for you.
            </motion.p>
            <motion.p variants={textItem} className="luxury-body max-w-md" style={{ color: 'rgba(255,252,245,0.82)' }}>
              Rooted in the rich tradition of Indian and Arabic attar-making,
              we source the finest raw ingredients and blend them with care.
              No mass production. No shortcuts. No compromise.
            </motion.p>
            <motion.p variants={textItem} className="text-[10px] tracking-[0.4em] uppercase italic font-heading" style={{ color: 'rgba(201,168,76,0.70)' }}>
              जनत का एहसास — The Feeling of Paradise
            </motion.p>
          </motion.div>

          {/* Pillars */}
          <div ref={pillarsRef} className="flex flex-col sm:flex-row gap-3 mt-2">
            {PILLARS.map(({ label, icon }) => (
              <motion.div
                key={label}
                data-reveal
                whileHover={{ borderColor: 'rgba(201,168,76,0.45)', y: -2 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-2 px-5 py-2.5 border border-gold-400/15 group cursor-default"
              >
                <motion.span
                  className="text-gold-400/70 group-hover:text-gold-400 transition-colors duration-300 text-xs"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 2 }}
                >
                  {icon}
                </motion.span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-ivory/80 group-hover:text-ivory transition-colors duration-300 whitespace-nowrap">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT: Ornamental visual — hidden on mobile */}
        <div className="hidden lg:block">
          <OrnamentPanel />
        </div>
      </div>
    </section>
  )
}
