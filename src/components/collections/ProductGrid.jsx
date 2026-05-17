import { useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PRODUCTS } from '../../data/products'
import ProductCard from './ProductCard'

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
    <div className="cx py-16 md:py-20">
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <EmptyState key="empty" />
          ) : (
            filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))
          )}
        </AnimatePresence>
      </motion.div>

      {/* Result count */}
      <motion.p
        key={activeFilter}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mt-12 text-[9px] tracking-[0.4em] uppercase text-ivory/20"
      >
        {filtered.length} {filtered.length === 1 ? 'fragrance' : 'fragrances'}
      </motion.p>
    </div>
  )
}
