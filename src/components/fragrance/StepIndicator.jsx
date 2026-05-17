import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const STEPS = [
  { n: 1, label: 'Family' },
  { n: 2, label: 'Notes' },
  { n: 3, label: 'Intensity' },
  { n: 4, label: 'Name' },
  { n: 5, label: 'Enquire' },
]

export default function StepIndicator({ currentStep, isSticky }) {
  return (
    <div
      className={[
        'sticky z-30 py-4 transition-all duration-400',
        isSticky
          ? 'glass border-b border-gold-400/10 shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
          : 'border-b border-gold-400/8',
      ].join(' ')}
      style={{ top: '80px' }}
    >
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex items-center justify-between relative">

          {/* Connecting track */}
          <div className="absolute left-0 right-0 top-4 h-px bg-gold-400/10" style={{ zIndex: 0 }} />

          {/* Filled track */}
          <motion.div
            className="absolute left-0 top-4 h-px bg-gold-400/40"
            style={{ zIndex: 0 }}
            animate={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          />

          {STEPS.map(({ n, label }) => {
            const isComplete = n < currentStep
            const isActive   = n === currentStep

            return (
              <div key={n} className="flex flex-col items-center gap-1.5 relative z-10">
                {/* Circle */}
                <motion.div
                  animate={{
                    backgroundColor: isComplete
                      ? '#C9A84C'
                      : isActive
                      ? 'transparent'
                      : 'transparent',
                    borderColor: isComplete || isActive ? '#C9A84C' : 'rgba(245,240,232,0.15)',
                    scale: isActive ? 1.15 : 1,
                  }}
                  transition={{ duration: 0.35 }}
                  className="w-8 h-8 rounded-full border flex items-center justify-center"
                  style={{
                    background: isComplete ? '#C9A84C' : isActive ? 'rgba(201,168,76,0.1)' : 'transparent',
                    borderColor: isComplete || isActive ? '#C9A84C' : 'rgba(245,240,232,0.15)',
                    boxShadow: isActive ? '0 0 16px rgba(201,168,76,0.3)' : 'none',
                  }}
                >
                  {isComplete ? (
                    <Check size={12} strokeWidth={2.5} className="text-black" />
                  ) : (
                    <span
                      className={[
                        'text-[10px] font-medium',
                        isActive ? 'text-gold-400' : 'text-ivory/20',
                      ].join(' ')}
                    >
                      {n}
                    </span>
                  )}
                </motion.div>

                {/* Label */}
                <span
                  className={[
                    'text-[8px] tracking-[0.25em] uppercase transition-colors duration-300',
                    isActive   ? 'text-gold-400' :
                    isComplete ? 'text-gold-400/50' :
                                 'text-ivory/20',
                  ].join(' ')}
                >
                  {label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
