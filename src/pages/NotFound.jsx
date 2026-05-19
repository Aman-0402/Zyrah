import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } },
}

export default function NotFound() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen luxury-page flex items-center justify-center px-6 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(150,78,27,0.18) 0%, rgba(82,24,42,0.12) 42%, transparent 70%)',
        }}
      />

      {/* Giant 404 watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-heading font-bold text-gold-400"
          style={{ fontSize: 'clamp(8rem, 30vw, 28rem)', opacity: 0.04, lineHeight: 1 }}
        >
          404
        </span>
      </div>

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center max-w-lg"
      >
        <motion.p variants={item} className="text-[10px] tracking-[0.5em] uppercase text-gold-400/80 mb-6">
          Page Not Found
        </motion.p>

        <motion.h1
          variants={item}
          className="font-heading text-4xl md:text-6xl text-ivory mb-4 leading-tight"
          style={{ fontWeight: 300 }}
        >
          Lost in the{' '}
          <span className="italic text-gold-gradient" style={{ fontWeight: 400 }}>
            Attar Garden
          </span>
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="h-px bg-gold-400/40 mx-auto mb-6"
        />

        <motion.p variants={item} className="font-heading italic text-ivory/75 text-base md:text-lg mb-10">
          This page doesn't exist, but your perfect fragrance does.
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/">
            <Button variant="primary" size="lg">Return Home</Button>
          </Link>
          <Link to="/collections">
            <Button variant="outline" size="lg">View Collections</Button>
          </Link>
        </motion.div>

        <motion.p variants={item} className="mt-8 text-[9px] tracking-[0.4em] uppercase text-ivory/15">
          M. M. Attarwala · Free delivery across India
        </motion.p>
      </motion.div>
    </motion.main>
  )
}
