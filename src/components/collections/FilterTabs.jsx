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
          ? 'rgba(10,6,2,0.94)'
          : 'rgba(10,6,2,0.40)',
        backdropFilter: isSticky ? 'blur(16px)' : 'blur(8px)',
        WebkitBackdropFilter: isSticky ? 'blur(16px)' : 'blur(8px)',
        borderBottom: `1px solid rgba(176,141,87,${isSticky ? '0.12' : '0.08'})`,
        boxShadow: isSticky ? '0 4px 40px rgba(0,0,0,0.7), 0 1px 0 rgba(201,168,76,0.06)' : 'none',
      }}
    >
      <div className="cx overflow-x-auto">
        <div
          className="flex items-center gap-2 md:gap-2 md:justify-center py-4 md:py-5"
          style={{
            paddingLeft: 'clamp(12px, 4vw, 0px)',
            paddingRight: 'clamp(12px, 4vw, 0px)',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {CATEGORIES.map(({ id, label }) => {
            const isActive = active === id
            const count = countByCategory(id)

            return (
              <button
                key={id}
                onClick={() => onChange(id)}
                className="relative flex items-center gap-2 flex-shrink-0 outline-none transition-all duration-500 group"
                style={{
                  scrollSnapAlign: 'start',
                  padding: '10px 22px',
                  borderRadius: '999px',
                  border: `1px solid ${isActive ? 'rgba(201,168,76,0.50)' : 'rgba(176,141,87,0.18)'}`,
                  background: isActive
                    ? 'linear-gradient(180deg, rgba(201,168,76,0.12) 0%, rgba(176,141,87,0.06) 100%)'
                    : 'rgba(255,248,235,0.03)',
                  boxShadow: isActive ? '0 0 28px rgba(201,168,76,0.15), inset 0 1px 0 rgba(255,255,255,0.06)' : 'none',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'rgba(201,168,76,0.38)'
                    e.currentTarget.style.background = 'rgba(201,168,76,0.07)'
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'rgba(176,141,87,0.18)'
                    e.currentTarget.style.background = 'rgba(255,248,235,0.03)'
                  }
                }}
              >
                <span
                  className="text-[10px] tracking-[0.35em] uppercase font-light transition-all duration-400"
                  style={{
                    color: isActive ? 'rgba(224,188,100,1)' : 'rgba(255,252,245,0.85)',
                    textShadow: isActive ? '0 0 16px rgba(176,141,87,0.3)' : 'none',
                  }}
                >
                  {label}
                </span>

                <span
                  className="text-[8px] tabular-nums transition-all duration-400"
                  style={{
                    color: isActive ? 'rgba(201,168,76,0.70)' : 'rgba(255,252,245,0.65)',
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
