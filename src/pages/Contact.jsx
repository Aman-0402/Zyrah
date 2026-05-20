import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ContactHero from '../components/contact/ContactHero'
import ContactForm from '../components/contact/ContactForm'
import ContactInfo from '../components/contact/ContactInfo'
import { useGSAPReveal } from '../hooks/useGSAPReveal'

const PARTICLES = [
  { left: '3%',  top: '18%', dur: 9,  del: 0,   size: 1.5 },
  { left: '96%', top: '28%', dur: 7,  del: 1.4, size: 1 },
  { left: '6%',  top: '72%', dur: 10, del: 2.8, size: 1 },
  { left: '94%', top: '65%', dur: 8,  del: 0.6, size: 1.5 },
  { left: '50%', top: '5%',  dur: 11, del: 2.0, size: 1 },
]

function BottomCTA() {
  const ref = useGSAPReveal({ from: { opacity: 0, y: 30 }, to: { opacity: 1, y: 0 }, start: 'top 88%' })

  return (
    <div
      ref={ref}
      className="relative overflow-hidden py-20 md:py-28 px-6 text-center"
      style={{
        borderTop: '1px solid rgba(201,168,76,0.12)',
        background: 'linear-gradient(180deg, rgba(30,14,8,0.60) 0%, rgba(18,8,6,0.85) 100%)',
      }}
    >
      {/* Atmospheric glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 70%)',
      }} />

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.50))' }} />
          <span style={{ color: 'rgba(201,168,76,0.55)', fontSize: '8px' }}>✦</span>
          <div className="h-px w-12" style={{ background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.50))' }} />
        </div>

        <p className="text-[10px] tracking-[0.50em] uppercase mb-5" style={{ color: 'rgba(201,168,76,0.65)' }}>
          Your Scent Awaits
        </p>
        <h3 className="font-heading font-light mb-4 leading-tight" style={{
          fontSize: 'clamp(32px, 5vw, 56px)',
          color: 'rgba(255,248,240,0.94)',
        }}>
          A fragrance crafted{' '}
          <span className="italic" style={{ color: 'rgba(226,194,125,0.92)' }}>only for you.</span>
        </h3>
        <p className="text-[14px] leading-relaxed mb-10 max-w-md mx-auto" style={{ color: 'rgba(220,214,205,0.68)' }}>
          No two blends are the same. Tell us your vision and we'll create something unforgettable.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/custom-fragrance">
            <motion.span
              className="inline-flex items-center gap-3 cursor-pointer select-none transition-all duration-400 group relative overflow-hidden"
              style={{
                padding: '16px 36px',
                fontSize: '11px',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                fontWeight: 600,
                background: 'linear-gradient(135deg, rgba(201,168,76,1) 0%, rgba(176,141,87,0.95) 100%)',
                color: '#060402',
                border: '1px solid rgba(226,194,125,0.70)',
                boxShadow: '0 0 28px rgba(201,168,76,0.22), inset 0 1px 0 rgba(255,255,255,0.15)',
                display: 'inline-flex',
              }}
              whileHover={{ y: -3, boxShadow: '0 0 40px rgba(201,168,76,0.32), inset 0 1px 0 rgba(255,255,255,0.18)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.10) 50%, transparent 75%)' }}
              />
              <span className="relative">Craft Your Fragrance</span>
            </motion.span>
          </Link>
          <Link to="/collections">
            <motion.span
              className="inline-flex items-center gap-3 cursor-pointer select-none transition-all duration-400"
              style={{
                padding: '16px 32px',
                fontSize: '11px',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                fontWeight: 500,
                background: 'transparent',
                color: 'rgba(201,168,76,0.80)',
                border: '1px solid rgba(201,168,76,0.28)',
                display: 'inline-flex',
              }}
              whileHover={{ y: -3, borderColor: 'rgba(201,168,76,0.60)', color: 'rgba(201,168,76,1)', boxShadow: '0 0 20px rgba(201,168,76,0.12)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              View Collections
            </motion.span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function Contact() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen relative luxury-page"
    >
      {/* Ambient particles across entire page */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size, background: 'rgba(176,141,87,0.55)' }}
          animate={{ y: [0, -20, 0], opacity: [0, 0.25, 0] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.del, ease: 'easeInOut' }}
        />
      ))}

      {/* Page-level warm glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: 'absolute',
          top: '30%', left: '15%',
          width: '500px', height: '600px',
          background: 'radial-gradient(ellipse 70% 70% at 20% 35%, rgba(150,78,27,0.12) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute',
          top: '40%', right: '10%',
          width: '400px', height: '500px',
          background: 'radial-gradient(ellipse 70% 70% at 80% 45%, rgba(86,25,44,0.11) 0%, transparent 70%)',
        }} />
      </div>

      <div className="relative">
        <ContactHero />

        {/* Main 2-col layout */}
        <div className="cx py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_420px] gap-14 lg:gap-24">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>

        {/* Bottom CTA strip */}
        <div className="cx">
          <BottomCTA />
        </div>
      </div>
    </motion.main>
  )
}
