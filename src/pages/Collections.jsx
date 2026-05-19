import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import CollectionsHero from '../components/collections/CollectionsHero'
import FilterTabs from '../components/collections/FilterTabs'
import ProductGrid from '../components/collections/ProductGrid'

export default function Collections() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [tabsSticky, setTabsSticky] = useState(false)
  const heroRef = useRef(null)

  /* Detect when hero scrolls out of view → make tabs sticky-glass */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setTabsSticky(!entry.isIntersecting),
      { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
    )
    if (heroRef.current) observer.observe(heroRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen relative luxury-page"
    >
      {/* Warm ambient glow — top left + bottom right */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div style={{
          position: 'absolute', top: '20%', left: '-5%',
          width: '45%', height: '60%',
          background: 'radial-gradient(ellipse 60% 60% at 20% 40%, rgba(145,75,26,0.12) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '-5%',
          width: '45%', height: '60%',
          background: 'radial-gradient(ellipse 60% 60% at 80% 60%, rgba(82,24,42,0.11) 0%, transparent 70%)',
        }} />
      </div>

      <div className="relative" style={{ zIndex: 1 }}>
        <div ref={heroRef}>
          <CollectionsHero />
        </div>

        <FilterTabs
          active={activeFilter}
          onChange={setActiveFilter}
          isSticky={tabsSticky}
        />

        <ProductGrid activeFilter={activeFilter} />
      </div>
    </motion.main>
  )
}
