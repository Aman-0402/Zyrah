import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ContactHero from '../components/contact/ContactHero'
import ContactForm from '../components/contact/ContactForm'
import ContactInfo from '../components/contact/ContactInfo'
import { useGSAPReveal } from '../hooks/useGSAPReveal'
import Button from '../components/ui/Button'

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
      className="border-t py-16 md:py-20 px-6 text-center"
      style={{
        borderColor: 'rgba(201,168,76,0.12)',
        background: 'linear-gradient(180deg, rgba(59,31,15,0.10) 0%, transparent 100%)',
      }}
    >
      <p className="text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(201,168,76,0.50)' }}>Explore More</p>
      <h3 className="font-heading text-3xl md:text-4xl mb-8" style={{ color: 'rgba(255,248,240,0.90)' }}>
        Still Have <span className="italic" style={{ color: 'rgba(226,194,125,0.90)' }}>Questions?</span>
      </h3>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/custom-fragrance">
          <Button variant="outline" size="lg">Craft Your Fragrance</Button>
        </Link>
        <Link to="/collections">
          <Button variant="ghost" size="lg">View Collections</Button>
        </Link>
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
      className="min-h-screen relative"
      style={{ background: '#050403' }}
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
          background: 'radial-gradient(ellipse 70% 70% at 20% 35%, rgba(110,58,12,0.08) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute',
          top: '40%', right: '10%',
          width: '400px', height: '500px',
          background: 'radial-gradient(ellipse 70% 70% at 80% 45%, rgba(90,48,10,0.06) 0%, transparent 70%)',
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
