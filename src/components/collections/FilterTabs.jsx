import { motion } from 'framer-motion'
import { CATEGORIES, PRODUCTS } from '../../data/products'

function countByCategory(cat) {
  if (cat === 'all') return PRODUCTS.length
  return PRODUCTS.filter((p) => p.category === cat).length
}

export default function FilterTabs({ active, onChange, isSticky }) {
  return (
    <div
      className={[
        'sticky z-30 transition-all duration-400',
        isSticky
          ? 'glass border-b border-gold-400/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'border-b border-gold-400/8',
      ].join(' ')}
      style={{ top: '80px' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide py-1">
          {CATEGORIES.map(({ id, label }) => {
            const isActive = active === id
            const count = countByCategory(id)

            return (
              <button
                key={id}
                onClick={() => onChange(id)}
                className={[
                  'relative flex items-center gap-2 px-5 py-4',
                  'text-[10px] tracking-[0.3em] uppercase whitespace-nowrap',
                  'transition-colors duration-300 outline-none flex-shrink-0',
                  isActive ? 'text-gold-400' : 'text-ivory/40 hover:text-ivory/80',
                ].join(' ')}
              >
                {label}

                {/* Count badge */}
                <span
                  className={[
                    'text-[8px] tabular-nums transition-colors duration-300',
                    isActive ? 'text-gold-400/60' : 'text-ivory/20',
                  ].join(' ')}
                >
                  {count}
                </span>

                {/* Active underline — layoutId for smooth slide */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-px bg-gold-400"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
