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
      className="sticky z-30 transition-all duration-500"
      style={{
        top: '76px',
        background: isSticky ? 'rgba(4,3,2,0.94)' : 'transparent',
        backdropFilter: isSticky ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: isSticky ? 'blur(14px)' : 'none',
        borderBottom: isSticky
          ? '1px solid rgba(176,141,87,0.10)'
          : '1px solid rgba(176,141,87,0.06)',
        boxShadow: isSticky ? '0 4px 40px rgba(0,0,0,0.7)' : 'none',
      }}
    >
      <div className="cx">
        <div className="flex items-center justify-between relative py-5 md:py-6 max-w-2xl mx-auto">

          {/* Connecting track base */}
          <div
            className="absolute left-5 right-5 h-px"
            style={{ top: '50%', transform: 'translateY(-50%)', background: 'rgba(176,141,87,0.08)', zIndex: 0 }}
          />

          {/* Filled progress track */}
          <motion.div
            className="absolute left-5 h-px"
            style={{ top: '50%', transform: 'translateY(-50%)', zIndex: 0 }}
            animate={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * (100 - 8)}%` }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div
              className="h-full w-full"
              style={{ background: 'linear-gradient(to right, rgba(176,141,87,0.3), rgba(176,141,87,0.6))' }}
            />
          </motion.div>

          {STEPS.map(({ n, label }) => {
            const isComplete = n < currentStep
            const isActive   = n === currentStep

            return (
              <div key={n} className="flex flex-col items-center gap-2 relative z-10">

                {/* Circle */}
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                  className="relative flex items-center justify-center"
                  style={{ width: 40, height: 40 }}
                >
                  {/* Pulse ring on active */}
                  {isActive && (
                    <motion.div
                      className="absolute rounded-full pointer-events-none"
                      style={{
                        inset: -4,
                        border: '1px solid rgba(176,141,87,0.35)',
                        borderRadius: '50%',
                      }}
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}

                  <div
                    className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500"
                    style={{
                      background: isComplete
                        ? '#C9A84C'
                        : isActive
                        ? 'rgba(176,141,87,0.12)'
                        : 'rgba(5,4,3,0.8)',
                      borderColor: isComplete || isActive
                        ? 'rgba(176,141,87,0.75)'
                        : 'rgba(236,230,220,0.46)',
                      boxShadow: isActive
                        ? '0 0 20px rgba(176,141,87,0.25), inset 0 0 12px rgba(176,141,87,0.06)'
                        : isComplete
                        ? '0 0 14px rgba(176,141,87,0.20)'
                        : 'none',
                    }}
                  >
                    {isComplete ? (
                      <Check size={13} strokeWidth={2.5} className="text-black" />
                    ) : (
                      <span
                        className="text-[12px] font-medium tabular-nums"
                        style={{
                          color: isActive ? 'rgba(226,194,125,0.96)' : 'rgba(236,230,220,0.58)',
                        }}
                      >
                        {n}
                      </span>
                    )}
                  </div>
                </motion.div>

                {/* Label */}
                <span
                  className="text-[10px] tracking-[0.18em] uppercase font-medium transition-colors duration-400 hidden sm:block"
                  style={{
                    color: isActive
                      ? 'rgba(176,141,87,0.90)'
                      : isComplete
                      ? 'rgba(176,141,87,0.40)'
                      : 'rgba(236,230,220,0.58)',
                  }}
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
