import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
}
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
}

export default function ContactHero() {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden bg-black"
      style={{ minHeight: '50vh' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 55%, rgba(201,168,76,0.05) 0%, rgba(59,31,15,0.2) 50%, transparent 75%)',
        }}
      />

      {/* Top border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-20 left-0 right-0 h-px origin-left"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)' }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center px-6 max-w-3xl mx-auto"
      >
        {/* Breadcrumb */}
        <motion.nav variants={item} className="flex items-center justify-center gap-1.5 mb-8">
          <Link to="/" className="text-[9px] tracking-[0.35em] uppercase text-gold-400/30 hover:text-gold-400/60 transition-colors duration-300">
            Home
          </Link>
          <ChevronRight size={10} className="text-gold-400/20" />
          <span className="text-[9px] tracking-[0.35em] uppercase text-gold-400/50">Contact</span>
        </motion.nav>

        <motion.p variants={item} className="text-[10px] tracking-[0.5em] uppercase text-gold-400/50 mb-5">
          We'd Love To Hear From You
        </motion.p>

        <motion.h1 variants={item} className="font-heading leading-tight mb-4">
          <span className="text-5xl md:text-7xl text-ivory block" style={{ fontWeight: 300 }}>Get In</span>
          <span className="text-5xl md:text-7xl italic text-gold-gradient block" style={{ fontWeight: 400 }}>Touch</span>
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ duration: 0.85, delay: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="h-px bg-gold-400/50 mx-auto mb-5"
        />

        <motion.p variants={item} className="font-heading italic text-ivory/30 text-base md:text-lg">
          Custom orders, questions, or just a hello —
        </motion.p>
        <motion.p variants={item} className="text-[10px] tracking-[0.4em] uppercase mt-2" style={{ color: 'rgba(201,168,76,0.28)' }}>
          Mandvi, Vadodara · Two Locations
        </motion.p>
      </motion.div>

      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0A0A0A, transparent)' }}
      />
    </section>
  )
}
