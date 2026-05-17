import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useGSAPReveal } from '../../hooks/useGSAPReveal'
import Button from '../ui/Button'

const QUOTE = "We started M. M. Attarwala with one belief — that everyone deserves a fragrance crafted for them alone."
const WORDS = QUOTE.split(' ')

const wordContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
}
const word = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } },
}

export default function FounderNote() {
  const sectionRef = useGSAPReveal({
    from: { opacity: 0 },
    to:   { opacity: 1 },
    duration: 1,
    start: 'top 85%',
  })

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-40 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0A0A0A 0%, rgba(59,31,15,0.15) 40%, rgba(59,31,15,0.25) 60%, #0A0A0A 100%)',
      }}
    >
      {/* Decorative borders */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.2), transparent)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.15), transparent)' }}
      />

      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-8">

        {/* Opening quote mark */}
        <div
          className="font-heading leading-none select-none"
          style={{ fontSize: '8rem', color: 'rgba(201,168,76,0.08)', lineHeight: 0.8, fontStyle: 'italic' }}
        >
          "
        </div>

        {/* Word-by-word quote reveal */}
        <motion.blockquote
          variants={wordContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="font-heading text-2xl md:text-3xl lg:text-4xl text-ivory/75 leading-snug flex flex-wrap justify-center gap-x-2 gap-y-1"
          style={{ fontWeight: 300, fontStyle: 'italic' }}
        >
          {WORDS.map((w, i) => (
            <motion.span key={i} variants={word}>
              {w}
            </motion.span>
          ))}
        </motion.blockquote>

        {/* Attribution */}
        <div className="flex flex-col items-center gap-2">
          <div className="h-px w-12 bg-gold-400/30" />
          <p className="text-[10px] tracking-[0.45em] uppercase text-gold-400/50">
            — The Founder, M. M. Attarwala
          </p>
        </div>

        {/* CTA */}
        <div className="pt-4">
          <Link to="/custom-fragrance">
            <Button variant="primary" size="lg">
              Craft Your Fragrance
            </Button>
          </Link>
        </div>

        {/* Free delivery note */}
        <p className="text-[9px] tracking-[0.4em] uppercase text-ivory/20">
          Free delivery · Handcrafted · Made for you
        </p>
      </div>
    </section>
  )
}
