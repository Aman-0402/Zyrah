import { motion } from 'framer-motion'
import HeroSection from '../components/home/HeroSection'
import MarqueeStrip from '../components/home/MarqueeStrip'
import FeaturedSection from '../components/home/FeaturedSection'
import BrandEthos from '../components/home/BrandEthos'

function SectionDivider({ fromColor = 'rgba(201,168,76,0.0)', toColor = 'rgba(201,168,76,0.0)', accent = false }) {
  return (
    <div className="relative h-px overflow-visible pointer-events-none">
      <div className="absolute left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(201,168,76,${accent ? '0.2' : '0.08'}), transparent)` }} />
      {accent && (
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45 border border-gold-400/40 bg-black" />
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
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <MarqueeStrip />

      {/* Atmospheric gradient between marquee and cards */}
      <div className="h-20 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(15,8,5,0) 0%, rgba(15,8,5,0.3) 50%, rgba(10,10,10,0) 100%)' }} />

      <FeaturedSection />

      <SectionDivider accent />

      {/* Atmospheric bridge */}
      <div className="h-8 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(10,10,10,1) 0%, rgba(15,8,5,0.5) 100%)' }} />

      <BrandEthos />
    </motion.main>
  )
}
