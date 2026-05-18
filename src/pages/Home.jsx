import { motion } from 'framer-motion'
import HeroSection from '../components/home/HeroSection'
import MarqueeStrip from '../components/home/MarqueeStrip'
import FeaturedSection from '../components/home/FeaturedSection'
import BrandEthos from '../components/home/BrandEthos'

// Very slow ambient drifters — cross-section atmosphere
const DRIFTERS = [
  { w: 700, h: 700, top: '12%',  left: '-8%',  color: 'rgba(120,58,0,0.055)', dur: 28, dx: [0,45,0],  dy: [0,-30,0],  del: 0  },
  { w: 600, h: 600, top: '38%',  right: '-6%', color: 'rgba(80,35,0,0.045)',  dur: 35, dx: [0,-35,0], dy: [0,40,0],   del: 8  },
  { w: 800, h: 500, top: '68%',  left: '15%',  color: 'rgba(100,45,0,0.04)', dur: 40, dx: [0,25,-15,0],dy: [0,-20,15,0],del:16},
  { w: 500, h: 500, top: '85%',  right: '10%', color: 'rgba(60,25,0,0.035)', dur: 32, dx: [0,-20,0],  dy: [0,-35,0],  del: 5  },
]

function AtmosphericBridge({ warm = false, height = 32 }) {
  return (
    <div
      className="relative pointer-events-none overflow-hidden"
      style={{ height }}
    >
      {/* Horizontal gold thread */}
      <div className="absolute inset-x-0 top-1/2 h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.12) 30%, rgba(201,168,76,0.22) 50%, rgba(201,168,76,0.12) 70%, transparent 100%)' }} />
      {/* Diamond center accent */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45 border border-gold-400/35" style={{ background: '#050505' }} />
      {/* Warm color bleed */}
      {warm && (
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(120,58,0,0.06) 0%, transparent 70%)' }} />
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
      className="relative"
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
      <div className="h-12 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(5,5,5,0.6) 100%)' }} />

      <MarqueeStrip />

      {/* Marquee → Featured: warm atmospheric bridge */}
      <div className="h-16 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(5,5,5,0.6) 0%, rgba(30,14,4,0.08) 50%, rgba(5,5,5,0) 100%)' }} />

      <FeaturedSection />

      {/* Featured → Philosophy: cinematic divider */}
      <AtmosphericBridge warm height={48} />

      {/* Warm glow bleed into philosophy */}
      <div className="h-12 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(5,5,5,0) 0%, rgba(15,8,3,0.25) 100%)' }} />

      <BrandEthos />
    </motion.main>
  )
}
