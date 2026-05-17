import { motion } from 'framer-motion'

export default function About() {
  return (
    <div className="page-wrapper flex items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center"
      >
        <p className="text-[10px] tracking-[0.4em] uppercase text-gold-400/60 mb-6">
          Phase 2 — Coming Soon
        </p>
        <h1 className="font-heading text-6xl md:text-8xl text-ivory/10 tracking-wider">
          About
        </h1>
      </motion.div>
    </div>
  )
}
