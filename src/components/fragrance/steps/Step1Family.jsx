import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import { FAMILIES } from '../../../data/notes'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.10, delayChildren: 0.05 } },
}
const card = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } },
}

const FAMILY_ICONS = {
  oud:    '◈',
  floral: '✿',
  musk:   '◎',
  fresh:  '◇',
}

export default function Step1Family({ selections, update }) {
  const selected = selections.family

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-[10px] tracking-[0.5em] uppercase mb-2" style={{ color: 'rgba(176,141,87,0.55)' }}>
          Step 1 of 5
        </p>
        <h2 className="font-heading text-3xl md:text-4xl mb-2" style={{ color: 'rgba(245,240,232,0.92)', fontWeight: 300 }}>
          Choose Your <span className="italic" style={{ color: 'rgba(201,168,76,0.90)' }}>Family</span>
        </h2>
        <p className="text-sm font-light" style={{ color: 'rgba(245,240,232,0.35)' }}>
          The fragrance family sets the soul of your blend.
        </p>
      </div>

      {/* Atmospheric reaction overlay — full-width ambiance shift on selection */}
      <AnimatePresence>
        {selected && (() => {
          const fam = FAMILIES.find(f => f.id === selected)
          return (
            <motion.div
              key={selected}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 60% 40% at 30% 60%, ${fam.glowColor} 0%, transparent 70%)`,
                zIndex: 0,
              }}
            />
          )
        })()}
      </AnimatePresence>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10"
      >
        {FAMILIES.map((fam) => {
          const isSelected = selected === fam.id

          return (
            <motion.button
              key={fam.id}
              variants={card}
              onClick={() => update({ family: fam.id, topNotes: [], middleNotes: [], baseNotes: [] })}
              whileHover={{ scale: isSelected ? 1 : 1.015, y: isSelected ? 0 : -2 }}
              whileTap={{ scale: 0.97 }}
              className="relative flex flex-col items-start text-left cursor-pointer outline-none overflow-hidden"
              style={{
                padding: '28px 24px 24px',
                minHeight: '180px',
                background: isSelected ? fam.gradient : 'rgba(12,10,8,0.85)',
                border: `1px solid ${isSelected ? fam.accentColor + '55' : 'rgba(176,141,87,0.09)'}`,
                boxShadow: isSelected
                  ? `0 0 40px ${fam.glowColor}, 0 0 80px ${fam.glowColor}`
                  : '0 2px 20px rgba(0,0,0,0.3)',
                transition: 'all 0.45s cubic-bezier(0.22,1,0.36,1)',
              }}
              onMouseEnter={e => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = fam.accentColor + '28'
                  e.currentTarget.style.background = 'rgba(18,14,10,0.90)'
                }
              }}
              onMouseLeave={e => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = 'rgba(176,141,87,0.09)'
                  e.currentTarget.style.background = 'rgba(12,10,8,0.85)'
                }
              }}
            >
              {/* Atmospheric bottom glow on hover/select */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 pointer-events-none"
                animate={{ opacity: isSelected ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  height: '80px',
                  background: `linear-gradient(to top, ${fam.accentColor}14 0%, transparent 100%)`,
                }}
              />

              {/* Arabic watermark */}
              <span
                className="absolute right-4 bottom-3 font-heading text-6xl pointer-events-none select-none"
                style={{
                  color: fam.accentColor,
                  opacity: isSelected ? 0.18 : 0.06,
                  fontStyle: 'italic',
                  transition: 'opacity 0.45s ease',
                  lineHeight: 1,
                }}
              >
                {fam.arabicLabel}
              </span>

              {/* Selected checkmark */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: fam.accentColor }}
                  >
                    <Check size={11} strokeWidth={3} className="text-black" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Icon symbol */}
              <span
                className="text-2xl mb-3 select-none"
                style={{
                  color: fam.accentColor,
                  opacity: isSelected ? 0.8 : 0.25,
                  transition: 'opacity 0.4s ease',
                }}
              >
                {FAMILY_ICONS[fam.id]}
              </span>

              <h3
                className="font-heading text-2xl mb-2 transition-colors duration-400"
                style={{ color: isSelected ? fam.accentColor : 'rgba(245,240,232,0.82)', fontWeight: 300 }}
              >
                {fam.label}
              </h3>
              <p
                className="text-[12px] leading-[1.75] font-light"
                style={{ color: isSelected ? 'rgba(245,240,232,0.55)' : 'rgba(245,240,232,0.28)' }}
              >
                {fam.desc}
              </p>

              {/* Bottom accent line */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-px"
                animate={{ opacity: isSelected ? 1 : 0, scaleX: isSelected ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  background: `linear-gradient(to right, transparent, ${fam.accentColor}70, transparent)`,
                  transformOrigin: 'center',
                }}
              />
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )
}
