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
      className="min-h-screen"
      style={{ background: '#050403' }}
    >
      <div ref={heroRef}>
        <CollectionsHero />
      </div>

      <FilterTabs
        active={activeFilter}
        onChange={setActiveFilter}
        isSticky={tabsSticky}
      />

      <ProductGrid activeFilter={activeFilter} />
    </motion.main>
  )
}
