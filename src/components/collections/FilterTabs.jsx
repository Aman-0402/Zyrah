import { motion } from 'framer-motion'
import { CATEGORIES, PRODUCTS } from '../../data/products'

const LUXURY = [0.22, 1, 0.36, 1]

function countByCategory(cat) {
  if (cat === 'all') return PRODUCTS.length
  return PRODUCTS.filter((p) => p.category === cat).length
}

export default function FilterTabs({ active, onChange, isSticky }) {
  return (
    <div
      className="sticky z-30 transition-all duration-500"
      style={{
        top: '76px',
        background: isSticky
          ? 'rgba(4,3,2,0.92)'
          : 'transparent',
        backdropFilter: isSticky ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: isSticky ? 'blur(14px)' : 'none',
        borderBottom: isSticky ? '1px solid rgba(176,141,87,0.08)' : '1px solid rgba(176,141,87,0.06)',
        boxShadow: isSticky ? '0 4px 40px rgba(0,0,0,0.6)' : 'none',
      }}
    >
      <div className="cx">
        <div className="flex items-center justify-center gap-1 md:gap-2 overflow-x-auto py-4 md:py-5">
          {CATEGORIES.map(({ id, label }) => {
            const isActive = active === id
            const count = countByCategory(id)

            return (
              <button
                key={id}
                onClick={() => onChange(id)}
                className="relative flex items-center gap-2 flex-shrink-0 outline-none transition-all duration-500 group"
                style={{
                  padding: '10px 22px',
                  borderRadius: '999px',
                  border: `1px solid ${isActive ? 'rgba(176,141,87,0.42)' : 'rgba(176,141,87,0.10)'}`,
                  background: isActive ? 'rgba(176,141,87,0.08)' : 'rgba(176,141,87,0.02)',
                  boxShadow: isActive ? '0 0 22px rgba(176,141,87,0.12)' : 'none',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'rgba(176,141,87,0.28)'
                    e.currentTarget.style.background = 'rgba(176,141,87,0.05)'
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'rgba(176,141,87,0.10)'
                    e.currentTarget.style.background = 'rgba(176,141,87,0.02)'
                  }
                }}
              >
                <span
                  className="text-[10px] tracking-[0.35em] uppercase font-light transition-all duration-400"
                  style={{
                    color: isActive ? 'rgba(176,141,87,0.95)' : 'rgba(245,240,232,0.40)',
                    textShadow: isActive ? '0 0 16px rgba(176,141,87,0.3)' : 'none',
                  }}
                >
                  {label}
                </span>

                <span
                  className="text-[8px] tabular-nums transition-all duration-400"
                  style={{
                    color: isActive ? 'rgba(176,141,87,0.55)' : 'rgba(245,240,232,0.18)',
                  }}
                >
                  {count}
                </span>

                {/* Active shimmer sweep */}
                {isActive && (
                  <motion.div
                    layoutId="filterActive"
                    className="absolute inset-0 pointer-events-none overflow-hidden"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  >
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(105deg, transparent 20%, rgba(176,141,87,0.06) 50%, transparent 80%)',
                    }} />
                  </motion.div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
