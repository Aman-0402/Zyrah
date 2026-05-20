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
      <p className="text-[11px] tracking-[0.22em] uppercase text-ivory/62 font-medium">
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
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-10 md:gap-x-8 md:gap-y-14"
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
              return (
                <div
                  key={product.id}
                  className={`${isFeatured ? 'md:col-span-2' : ''} ${staggerClass}`.trim()}
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
        className="text-center mt-12 text-[10px] tracking-[0.22em] uppercase font-medium"
        style={{ color: 'rgba(236,230,220,0.76)' }}
      >
        {filtered.length} {filtered.length === 1 ? 'fragrance' : 'fragrances'}
      </motion.p>
    </div>
  )
}
