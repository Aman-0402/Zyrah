import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ContactHero from '../components/contact/ContactHero'
import ContactForm from '../components/contact/ContactForm'
import ContactInfo from '../components/contact/ContactInfo'
import { useGSAPReveal } from '../hooks/useGSAPReveal'
import Button from '../components/ui/Button'

function BottomCTA() {
  const ref = useGSAPReveal({ from: { opacity: 0, y: 30 }, to: { opacity: 1, y: 0 }, start: 'top 88%' })

  return (
    <div
      ref={ref}
      className="border-t border-gold-400/10 py-16 md:py-20 px-6 text-center"
      style={{ background: 'linear-gradient(180deg, rgba(59,31,15,0.08) 0%, transparent 100%)' }}
    >
      <p className="text-[10px] tracking-[0.5em] uppercase text-gold-400/40 mb-4">Explore More</p>
      <h3 className="font-heading text-3xl md:text-4xl text-ivory mb-8">
        Still Have <span className="italic text-gold-300">Questions?</span>
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
      className="min-h-screen bg-black"
    >
      <ContactHero />

      {/* Main 2-col layout */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_420px] gap-14 lg:gap-24">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>

      {/* Bottom CTA strip */}
      <div className="max-w-7xl mx-auto px-6">
        <BottomCTA />
      </div>
    </motion.main>
  )
}
