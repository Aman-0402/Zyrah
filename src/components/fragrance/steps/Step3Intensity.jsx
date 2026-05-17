import { motion, AnimatePresence } from 'framer-motion'
import { INTENSITY_LEVELS, FAMILIES } from '../../../data/notes'

export default function Step3Intensity({ selections, update }) {
  const { intensity, family } = selections
  const fam = FAMILIES.find((f) => f.id === family)
  const level = INTENSITY_LEVELS.find((l) => l.value === intensity)
  const accentColor = fam?.accentColor || '#C9A84C'

  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="text-[10px] tracking-[0.5em] uppercase text-gold-400/50 mb-2">Step 3 of 5</p>
        <h2 className="font-heading text-3xl md:text-4xl text-ivory mb-2">
          Set the <span className="italic text-gold-300">Intensity</span>
        </h2>
        <p className="text-ivory/35 text-sm font-light">
          How loud should your fragrance speak?
        </p>
      </div>

      {/* Intensity value display */}
      <div className="text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={intensity}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <p
              className="font-heading text-6xl md:text-7xl"
              style={{ color: accentColor, opacity: 0.9 }}
            >
              {level?.label}
            </p>
            <p className="text-ivory/30 text-sm mt-2 max-w-xs mx-auto font-light">
              {level?.desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Custom slider */}
      <div className="flex flex-col gap-6">
        <div className="relative px-2">
          {/* Track */}
          <div className="relative h-px w-full" style={{ background: 'rgba(201,168,76,0.12)' }}>
            {/* Filled track */}
            <motion.div
              className="absolute left-0 top-0 h-px"
              animate={{ width: `${((intensity - 1) / 4) * 100}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              style={{ background: `linear-gradient(to right, ${accentColor}40, ${accentColor})` }}
            />
          </div>

          {/* Native range input (invisible, positioned over custom track) */}
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            value={intensity}
            onChange={(e) => update({ intensity: Number(e.target.value) })}
            className="absolute inset-0 w-full opacity-0 cursor-pointer"
            style={{ height: '40px', marginTop: '-20px' }}
          />

          {/* Thumb */}
          <motion.div
            className="absolute top-0 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
            animate={{ left: `${((intensity - 1) / 4) * 100}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          >
            <div
              className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
              style={{
                background: '#0A0A0A',
                borderColor: accentColor,
                boxShadow: `0 0 12px ${accentColor}60`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: accentColor }}
              />
            </div>
          </motion.div>
        </div>

        {/* Level labels */}
        <div className="flex justify-between">
          {INTENSITY_LEVELS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => update({ intensity: value })}
              className={[
                'flex flex-col items-center gap-1 cursor-pointer outline-none group',
                'transition-all duration-300',
              ].join(' ')}
            >
              <div
                className="transition-all duration-300"
                style={{
                  width: '4px',
                  height: value <= intensity ? '16px' : '6px',
                  background: value <= intensity ? accentColor : 'rgba(245,240,232,0.08)',
                  borderRadius: '2px',
                }}
              />
              <span
                className={[
                  'text-[8px] tracking-[0.2em] uppercase transition-colors duration-300',
                  value === intensity ? 'text-gold-400' : 'text-ivory/20',
                ].join(' ')}
              >
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Sillage guide */}
      <div
        className="border border-gold-400/10 p-4 flex flex-col gap-1"
        style={{ background: 'rgba(201,168,76,0.02)' }}
      >
        <p className="text-[9px] tracking-[0.3em] uppercase text-gold-400/30 mb-1">Sillage Guide</p>
        <p className="text-ivory/25 text-xs font-light leading-relaxed">
          {intensity <= 2
            ? 'Intimate trail — only noticed when close. Perfect for personal wear and office.'
            : intensity === 3
            ? 'Moderate sillage — noticed as you pass. Versatile for any occasion.'
            : 'Strong projection — announces your arrival. For evenings and special moments.'}
        </p>
      </div>
    </div>
  )
}
