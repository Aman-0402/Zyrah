import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } },
}

export default function FragranceBuilderHero() {
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
            'radial-gradient(ellipse 60% 70% at 50% 60%, rgba(201,168,76,0.06) 0%, transparent 70%)',
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
        <motion.p variants={item} className="text-[10px] tracking-[0.5em] uppercase text-gold-400/50 mb-5">
          Bespoke Perfumery
        </motion.p>

        <motion.h1
          variants={item}
          className="font-heading leading-tight mb-3"
          style={{ fontWeight: 300 }}
        >
          <span className="text-5xl md:text-7xl text-ivory block">Craft Your</span>
          <span
            className="text-5xl md:text-7xl italic text-gold-gradient block"
            style={{ fontWeight: 400 }}
          >
            Signature
          </span>
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="h-px bg-gold-400/50 mx-auto mb-5"
        />

        <motion.p variants={item} className="font-heading italic text-ivory/30 text-base md:text-lg">
          Tell us your vision. We'll blend it to life.
        </motion.p>
      </motion.div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0A0A0A, transparent)' }}
      />
    </section>
  )
}
