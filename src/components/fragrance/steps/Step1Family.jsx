import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { FAMILIES } from '../../../data/notes'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const card = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } },
}

export default function Step1Family({ selections, update }) {
  const selected = selections.family

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-[10px] tracking-[0.5em] uppercase text-gold-400/50 mb-2">Step 1 of 5</p>
        <h2 className="font-heading text-3xl md:text-4xl text-ivory mb-2">
          Choose Your <span className="italic text-gold-300">Family</span>
        </h2>
        <p className="text-ivory/35 text-sm font-light">
          The fragrance family sets the soul of your blend.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-4"
      >
        {FAMILIES.map((fam) => {
          const isSelected = selected === fam.id

          return (
            <motion.button
              key={fam.id}
              variants={card}
              onClick={() => update({ family: fam.id, topNotes: [], middleNotes: [], baseNotes: [] })}
              whileHover={{ scale: isSelected ? 1 : 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="relative flex flex-col items-start p-5 border text-left cursor-pointer outline-none transition-all duration-400 overflow-hidden"
              style={{
                background: isSelected ? fam.gradient : '#111111',
                borderColor: isSelected ? fam.accentColor : 'rgba(201,168,76,0.12)',
                boxShadow: isSelected ? `0 0 30px ${fam.glowColor}` : 'none',
              }}
            >
              {/* Arabic watermark */}
              <span
                className="absolute right-3 bottom-2 font-heading text-5xl pointer-events-none select-none transition-opacity duration-400"
                style={{
                  color: fam.accentColor,
                  opacity: isSelected ? 0.15 : 0.05,
                  fontStyle: 'italic',
                }}
              >
                {fam.arabicLabel}
              </span>

              {/* Selected checkmark */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: fam.accentColor }}
                >
                  <Check size={10} strokeWidth={3} className="text-black" />
                </motion.div>
              )}

              <span
                className="text-[9px] tracking-[0.35em] uppercase mb-2 transition-colors duration-300"
                style={{ color: isSelected ? fam.accentColor : 'rgba(245,240,232,0.25)' }}
              >
                {fam.arabicLabel}
              </span>
              <h3
                className="font-heading text-xl mb-1 transition-colors duration-300"
                style={{ color: isSelected ? fam.accentColor : 'rgba(245,240,232,0.85)' }}
              >
                {fam.label}
              </h3>
              <p className="text-[11px] text-ivory/30 leading-relaxed font-light">
                {fam.desc}
              </p>

              {/* Bottom accent line */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-px"
                animate={{ opacity: isSelected ? 1 : 0 }}
                style={{ background: `linear-gradient(to right, transparent, ${fam.accentColor}60, transparent)` }}
              />
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )
}
