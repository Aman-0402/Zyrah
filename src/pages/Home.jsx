import { motion } from 'framer-motion'
import HeroSection from '../components/home/HeroSection'
import MarqueeStrip from '../components/home/MarqueeStrip'
import FeaturedSection from '../components/home/FeaturedSection'
import BrandEthos from '../components/home/BrandEthos'

// Very slow ambient drifters — cross-section atmosphere
const DRIFTERS = [
  { w: 700, h: 700, top: '12%',  left: '-8%',  color: 'rgba(154,83,28,0.080)', dur: 28, dx: [0,45,0],  dy: [0,-30,0],  del: 0  },
  { w: 620, h: 620, top: '38%',  right: '-6%', color: 'rgba(92,24,45,0.070)',  dur: 35, dx: [0,-35,0], dy: [0,40,0],   del: 8  },
  { w: 800, h: 500, top: '68%',  left: '15%',  color: 'rgba(130,67,20,0.060)', dur: 40, dx: [0,25,-15,0],dy: [0,-20,15,0],del:16},
  { w: 540, h: 540, top: '85%',  right: '10%', color: 'rgba(76,21,36,0.055)', dur: 32, dx: [0,-20,0],  dy: [0,-35,0],  del: 5  },
]

function AtmosphericBridge({ warm = false, height = 32 }) {
  return (
    <div
      className="relative pointer-events-none overflow-hidden"
      style={{ height }}
    >
      {/* Horizontal gold thread */}
      <div className="absolute inset-x-0 top-1/2 h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(226,194,125,0.15) 30%, rgba(226,194,125,0.32) 50%, rgba(226,194,125,0.15) 70%, transparent 100%)', boxShadow: '0 0 24px rgba(201,168,76,0.08)' }} />
      {/* Diamond center accent */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45 border border-gold-400/40" style={{ background: '#090605', boxShadow: '0 0 18px rgba(201,168,76,0.18)' }} />
      {/* Warm color bleed */}
      {warm && (
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(154,83,28,0.10) 0%, rgba(76,21,36,0.05) 45%, transparent 72%)' }} />
      )}
    </div>
  )
}

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative luxury-page"
    >
      {/* Global ambient atmosphere — slow drifters spanning all sections */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {DRIFTERS.map(({ w, h, top, left, right, color, dur, dx, dy, del }, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{ width: w, height: h, top, left, right,
              background: `radial-gradient(circle, ${color} 0%, transparent 65%)`,
            }}
            animate={{ x: dx, y: dy }}
            transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', delay: del }}
          />
        ))}
      </div>

      <HeroSection />

      {/* Hero → Marquee: fade out hero atmosphere */}
      <div className="h-12 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(9,6,5,0) 0%, rgba(9,6,5,0.70) 100%)' }} />

      <MarqueeStrip />

      {/* Marquee → Featured: warm atmospheric bridge */}
      <div className="h-16 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(9,6,5,0.70) 0%, rgba(9,6,5,0.18) 50%, rgba(9,6,5,0) 100%)' }} />

      <FeaturedSection />

      {/* Featured → Philosophy: cinematic divider */}
      <AtmosphericBridge warm height={48} />

      {/* Warm glow bleed into philosophy */}
      <div className="h-12 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(9,6,5,0) 0%, rgba(9,6,5,0.30) 100%)' }} />

      <BrandEthos />
    </motion.main>
  )
}
