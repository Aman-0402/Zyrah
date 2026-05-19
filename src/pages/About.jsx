import { motion } from 'framer-motion'
import AboutHero from '../components/about/AboutHero'
import HeritageBand from '../components/about/HeritageBand'
import OurStory from '../components/about/OurStory'
import ProcessTimeline from '../components/about/ProcessTimeline'
import ValuesGrid from '../components/about/ValuesGrid'
import FounderNote from '../components/about/FounderNote'

export default function About() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen luxury-page"
    >
      <AboutHero />
      <HeritageBand />
      <OurStory />
      <ProcessTimeline />
      <ValuesGrid />
      <FounderNote />
    </motion.main>
  )
}
