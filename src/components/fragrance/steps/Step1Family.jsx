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

/* Per-family atmospheric backgrounds — each card subtly different even inactive */
const CARD_BG = {
  oud:    'linear-gradient(160deg, rgba(22,10,3,0.94) 0%, rgba(28,13,4,0.90) 100%)',
  floral: 'linear-gradient(160deg, rgba(22,8,12,0.94) 0%, rgba(28,10,16,0.90) 100%)',
  musk:   'linear-gradient(160deg, rgba(13,12,20,0.94) 0%, rgba(17,15,25,0.90) 100%)',
  fresh:  'linear-gradient(160deg, rgba(8,18,11,0.94) 0%, rgba(10,22,14,0.90) 100%)',
}

const CARD_HOVER_BG = {
  oud:    'linear-gradient(160deg, rgba(36,17,5,0.97) 0%, rgba(42,20,6,0.95) 100%)',
  floral: 'linear-gradient(160deg, rgba(36,12,20,0.97) 0%, rgba(42,15,25,0.95) 100%)',
  musk:   'linear-gradient(160deg, rgba(18,16,30,0.97) 0%, rgba(22,20,36,0.95) 100%)',
  fresh:  'linear-gradient(160deg, rgba(12,26,16,0.97) 0%, rgba(15,32,20,0.95) 100%)',
}

/* Subtle corner vignette color that hints at family character even when inactive */
const CARD_VIGNETTE = {
  oud:    'rgba(180,90,15,0.09)',
  floral: 'rgba(200,80,120,0.08)',
  musk:   'rgba(180,165,220,0.07)',
  fresh:  'rgba(50,150,90,0.08)',
}

export default function Step1Family({ selections, update }) {
  const selected = selections.family

  return (
    <div className="flex flex-col gap-7">
      <div>
        <p className="editorial-label mb-2"
          style={{ color: 'rgba(176,141,87,0.82)' }}>
          Step 1 of 5
        </p>
        <h2
          className="font-heading text-2xl md:text-3xl mb-2"
          style={{ color: 'rgba(245,240,232,0.90)', fontWeight: 300 }}
        >
          Choose Your <span className="italic" style={{ color: 'rgba(201,168,76,0.90)' }}>Family</span>
        </h2>
        <p className="text-[15px] font-normal leading-[1.85]" style={{ color: 'rgba(236,230,220,0.86)' }}>
          The fragrance family sets the soul of your blend.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-5"
      >
        {FAMILIES.map((fam) => {
          const isSelected = selected === fam.id

          return (
            <motion.button
              key={fam.id}
              variants={card}
              onClick={() => update({ family: fam.id, topNotes: [], middleNotes: [], baseNotes: [] })}
              whileHover={{ scale: isSelected ? 1 : 1.012, y: isSelected ? 0 : -2 }}
              whileTap={{ scale: 0.97 }}
              className="relative flex flex-col items-start text-left cursor-pointer outline-none overflow-hidden rounded-xl"
              style={{
                padding: '26px 22px 22px',
                minHeight: '175px',
                background: isSelected ? fam.gradient : CARD_BG[fam.id],
                border: `1px solid ${isSelected ? fam.accentColor + '50' : fam.accentColor + '0A'}`,
                boxShadow: isSelected
                  ? `0 0 50px ${fam.glowColor}, 0 0 100px ${fam.glowColor}, inset 0 0 30px ${fam.glowColor}`
                  : '0 2px 24px rgba(0,0,0,0.35)',
                transition: 'all 0.50s cubic-bezier(0.22,1,0.36,1)',
              }}
              onMouseEnter={e => {
                if (!isSelected) {
                  e.currentTarget.style.background = CARD_HOVER_BG[fam.id]
                  e.currentTarget.style.borderColor = fam.accentColor + '25'
                  e.currentTarget.style.boxShadow = `0 4px 32px rgba(0,0,0,0.5), 0 0 20px ${fam.glowColor}`
                }
              }}
              onMouseLeave={e => {
                if (!isSelected) {
                  e.currentTarget.style.background = CARD_BG[fam.id]
                  e.currentTarget.style.borderColor = fam.accentColor + '0A'
                  e.currentTarget.style.boxShadow = '0 2px 24px rgba(0,0,0,0.35)'
                }
              }}
            >
              {/* Corner vignette — hints family character even when inactive */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{
                background: `radial-gradient(ellipse at 0% 0%, ${CARD_VIGNETTE[fam.id]} 0%, transparent 55%)`,
                opacity: isSelected ? 0 : 1,
                transition: 'opacity 0.5s ease',
              }} />

              {/* Selected — atmospheric bottom glow */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 pointer-events-none"
                animate={{ opacity: isSelected ? 1 : 0, height: isSelected ? '90px' : '40px' }}
                transition={{ duration: 0.6 }}
                style={{
                  background: `linear-gradient(to top, ${fam.accentColor}18 0%, transparent 100%)`,
                }}
              />

              {/* Selected — inner light from bottom-center */}
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.8, 0.5, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
                  style={{
                    width: '120px',
                    height: '60px',
                    background: `radial-gradient(ellipse, ${fam.accentColor}20 0%, transparent 70%)`,
                    filter: 'blur(10px)',
                  }}
                />
              )}

              {/* Arabic watermark */}
              <span
                className="absolute right-3 bottom-2 font-heading text-6xl pointer-events-none select-none"
                style={{
                  color: fam.accentColor,
                  opacity: isSelected ? 0.20 : 0.07,
                  fontStyle: 'italic',
                  transition: 'opacity 0.5s ease',
                  lineHeight: 1,
                }}
              >
                {fam.arabicLabel}
              </span>

              {/* Checkmark */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                    className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: fam.accentColor }}
                  >
                    <Check size={11} strokeWidth={3} className="text-black" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Icon */}
              <span
                className="text-xl mb-3 select-none transition-all duration-500"
                style={{
                  color: fam.accentColor,
                  opacity: isSelected ? 0.85 : 0.28,
                  textShadow: isSelected ? `0 0 16px ${fam.accentColor}` : 'none',
                }}
              >
                {FAMILY_ICONS[fam.id]}
              </span>

              <h3
                className="font-heading text-2xl mb-1.5 transition-all duration-500"
                style={{
                  color: isSelected ? fam.accentColor : 'rgba(245,240,232,0.82)',
                  fontWeight: 300,
                  textShadow: isSelected ? `0 0 24px ${fam.accentColor}50` : 'none',
                }}
              >
                {fam.label}
              </h3>

              <p
                className="text-[13px] leading-[1.75] font-normal"
                style={{ color: isSelected ? 'rgba(245,241,234,0.90)' : 'rgba(236,230,220,0.82)' }}
              >
                {fam.desc}
              </p>

              {/* Bottom accent line */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-px"
                animate={{ opacity: isSelected ? 1 : 0, scaleX: isSelected ? 1 : 0.3 }}
                transition={{ duration: 0.55 }}
                style={{
                  background: `linear-gradient(to right, transparent, ${fam.accentColor}80, transparent)`,
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
