import { useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PRODUCTS } from '../../data/products'
import CollectionCard from './CollectionCard'

/* Empty state */
function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="col-span-full flex flex-col items-center justify-center py-28 gap-4"
    >
      <div
        className="text-6xl font-heading text-gold-400/10 select-none"
        style={{ fontStyle: 'italic' }}
      >
        ◈
      </div>
      <p className="text-[11px] tracking-[0.4em] uppercase text-ivory/25">
        No fragrances found
      </p>
    </motion.div>
  )
}

export default function ProductGrid({ activeFilter }) {
  const filtered = useMemo(
    () =>
      activeFilter === 'all'
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === activeFilter),
    [activeFilter]
  )

  return (
    <div className="cx pt-14 pb-24 md:pb-36" style={{ position: 'relative' }}>
      <motion.div
        layout
        className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-10"
      >
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <EmptyState key="empty" />
          ) : (
            filtered.map((product, i) => {
              const isFeatured = product.id === 1
              // Editorial stagger: 3-col waterfall on desktop, 2-col on mobile
              // Use CSS classes to keep responsive
              const staggerClass = isFeatured
                ? ''
                : i % 3 === 1
                  ? 'lg:pt-10'
                  : i % 3 === 2
                    ? 'lg:pt-5'
                    : ''
              const mobileStagger = !isFeatured && i % 2 === 1 ? 'pt-5 lg:pt-0' : ''

              return (
                <div
                  key={product.id}
                  className={`${isFeatured ? 'md:col-span-2' : ''} ${mobileStagger} ${staggerClass}`.trim()}
                >
                  <CollectionCard product={product} index={i} featured={isFeatured} />
                </div>
              )
            })
          )}
        </AnimatePresence>
      </motion.div>

      {/* Result count */}
      <motion.p
        key={activeFilter}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mt-12 text-[9px] tracking-[0.4em] uppercase"
        style={{ color: 'rgba(255,248,240,0.32)' }}
      >
        {filtered.length} {filtered.length === 1 ? 'fragrance' : 'fragrances'}
      </motion.p>
    </div>
  )
}
