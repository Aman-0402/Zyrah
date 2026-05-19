import { motion, AnimatePresence } from 'framer-motion'
import { INTENSITY_LEVELS, FAMILIES } from '../../../data/notes'

const LUXURY = [0.22, 1, 0.36, 1]

export default function Step3Intensity({ selections, update }) {
  const { intensity, family } = selections
  const fam = FAMILIES.find((f) => f.id === family)
  const level = INTENSITY_LEVELS.find((l) => l.value === intensity)
  const accentColor = fam?.accentColor || '#C9A84C'
  const intensityFactor = (intensity - 1) / 4

  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="editorial-label mb-2"
          style={{ color: 'rgba(176,141,87,0.82)' }}>
          Step 3 of 5
        </p>
        <h2 className="font-heading text-3xl md:text-4xl mb-2"
          style={{ color: 'rgba(245,240,232,0.92)', fontWeight: 300 }}>
          Set the <span className="italic" style={{ color: 'rgba(201,168,76,0.90)' }}>Intensity</span>
        </h2>
        <p className="text-[15px] font-normal leading-[1.85]" style={{ color: 'rgba(236,230,220,0.86)' }}>
          How loud should your fragrance speak?
        </p>
      </div>

      {/* Intensity label — reduced from 6xl/7xl, more elegant */}
      <div className="text-center py-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={intensity}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            className="flex flex-col items-center gap-2"
          >
            <p
              className="font-heading italic"
              style={{
                fontSize: 'clamp(2.8rem, 8vw, 4.2rem)',
                color: accentColor,
                opacity: 0.88,
                fontWeight: 300,
                letterSpacing: '-0.01em',
                lineHeight: 1,
                textShadow: `0 0 40px ${accentColor}40`,
              }}
            >
              {level?.label}
            </p>

            {/* Dynamic strength indicator dots */}
            <div className="flex gap-1.5 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    width: i < intensity ? '18px' : '6px',
                    background: i < intensity ? accentColor : 'rgba(245,240,232,0.08)',
                    opacity: i < intensity ? 0.7 + (i / 5) * 0.3 : 1,
                  }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  style={{ height: '2px', borderRadius: '1px' }}
                />
              ))}
            </div>

            <p className="text-[12px] font-normal leading-relaxed max-w-[280px] text-center mt-1"
              style={{ color: 'rgba(255,252,245,0.72)' }}>
              {level?.desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slider */}
      <div className="flex flex-col gap-5">
        <div className="relative px-1">
          {/* Track base */}
          <div className="relative h-px w-full" style={{ background: 'rgba(201,168,76,0.10)' }}>
            {/* Filled track — gradient glow */}
            <motion.div
              className="absolute left-0 top-0 h-px"
              animate={{ width: `${((intensity - 1) / 4) * 100}%` }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              style={{
                background: `linear-gradient(to right, ${accentColor}30, ${accentColor})`,
                boxShadow: `0 0 8px ${accentColor}60`,
              }}
            />
          </div>

          {/* Native input (invisible) */}
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            value={intensity}
            onChange={(e) => update({ intensity: Number(e.target.value) })}
            className="absolute inset-0 w-full opacity-0 cursor-pointer"
            style={{ height: '44px', marginTop: '-22px' }}
          />

          {/* Thumb */}
          <motion.div
            className="absolute top-0 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
            animate={{ left: `${((intensity - 1) / 4) * 100}%` }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          >
            <div
              className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, #1b100c, #0e0908)',
                borderColor: accentColor,
                boxShadow: `0 0 16px ${accentColor}70, 0 0 6px ${accentColor}40`,
              }}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: accentColor }} />
            </div>
          </motion.div>
        </div>

        {/* Level labels — more visible */}
        <div className="flex justify-between px-0.5">
          {INTENSITY_LEVELS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => update({ intensity: value })}
              className="flex flex-col items-center gap-1.5 cursor-pointer outline-none transition-all duration-300"
            >
              <motion.div
                animate={{
                  height: value <= intensity ? '14px' : '5px',
                  background: value <= intensity ? accentColor : 'rgba(245,240,232,0.07)',
                }}
                transition={{ duration: 0.35 }}
                style={{ width: '3px', borderRadius: '2px' }}
              />
              <span
                className="transition-all duration-300"
                style={{
                  fontSize: '9px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: value === intensity
                    ? accentColor
                    : value < intensity
                    ? `${accentColor}55`
                    : 'rgba(236,230,220,0.76)',
                  opacity: value === intensity ? 1 : 0.65,
                }}
              >
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Sillage guide — cleaner layout */}
      <AnimatePresence mode="wait">
        <motion.div
          key={intensity}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.35 }}
          className="flex gap-4 items-start"
          style={{
            borderLeft: `2px solid ${accentColor}30`,
            paddingLeft: '16px',
          }}
        >
          <div className="flex flex-col gap-1">
            <p className="text-[10px] tracking-[0.18em] uppercase font-semibold mb-0.5"
              style={{ color: `${accentColor}55` }}>
              Sillage
            </p>
            <p className="text-[13px] font-normal leading-[1.75]"
              style={{ color: 'rgba(255,252,245,0.72)' }}>
              {intensity <= 2
                ? 'Intimate trail — only noticed when close. Perfect for personal wear and office.'
                : intensity === 3
                ? 'Moderate sillage — noticed as you pass. Versatile for any occasion.'
                : intensity === 4
                ? 'Strong projection — announces your arrival. For evenings and special moments.'
                : 'Dramatic and unforgettable — a full cinematic presence.'}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
