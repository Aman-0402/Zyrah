import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FAMILIES } from '../../../data/notes'

const ARABIC_DECORATIONS = ['◈', '◇', '✦', '◆', '❋']

export default function Step4Name({ selections, update }) {
  const [focused, setFocused] = useState(false)
  const { name, family } = selections
  const fam = FAMILIES.find((f) => f.id === family)
  const accentColor = fam?.accentColor || '#C9A84C'
  const remaining = 30 - name.length

  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="editorial-label mb-2">Step 4 of 5</p>
        <h2 className="font-heading text-3xl md:text-4xl text-ivory mb-2">
          Name Your <span className="italic text-gold-300">Fragrance</span>
        </h2>
        <p className="text-ivory/84 text-[15px] font-normal leading-[1.85]">
          Give your creation an identity. Make it yours.
        </p>
      </div>

      {/* Input area */}
      <div className="flex flex-col items-center gap-6 py-4">

        {/* Decorative ornaments */}
        <div className="flex gap-4 text-gold-400/15 select-none">
          {ARABIC_DECORATIONS.map((d, i) => (
            <motion.span
              key={i}
              animate={{ opacity: name.length > i * 5 ? 0.3 : 0.1 }}
              transition={{ duration: 0.4 }}
              className="text-lg"
              style={{ color: accentColor }}
            >
              {d}
            </motion.span>
          ))}
        </div>

        {/* Main input */}
        <div className="w-full max-w-sm relative">
          <motion.input
            type="text"
            value={name}
            onChange={(e) => {
              if (e.target.value.length <= 30) update({ name: e.target.value })
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="e.g. Midnight Oud, My Rose..."
            animate={{ letterSpacing: focused ? '0.08em' : '0.04em' }}
            className={[
              'w-full bg-transparent text-center font-heading text-2xl md:text-3xl',
              'outline-none border-b pb-3 transition-colors duration-400',
              'placeholder:text-ivory/15',
            ].join(' ')}
            style={{
              color: name ? accentColor : 'rgba(236,230,220,0.78)',
              borderColor: focused
                ? accentColor
                : name
                ? `${accentColor}40`
                : 'rgba(245,240,232,0.1)',
              caretColor: accentColor,
            }}
          />

          {/* Character count */}
          <div className="flex justify-between mt-2">
            <span />
            <span
              className="text-[9px] tracking-[0.25em] transition-colors duration-300"
              style={{ color: remaining < 5 ? '#E57373' : 'rgba(236,230,220,0.58)' }}
            >
              {remaining}
            </span>
          </div>
        </div>

        {/* Live preview */}
        <AnimatePresence mode="wait">
          {name ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              <p className="text-[10px] tracking-[0.2em] uppercase text-ivory/62 font-medium mb-2">Your fragrance</p>
              <p
                className="font-heading italic text-4xl"
                style={{ color: accentColor, opacity: 0.7 }}
              >
                {name}
              </p>
              {fam && (
                <p className="text-[10px] tracking-[0.2em] uppercase text-ivory/58 mt-1">
                  {fam.label} · M. M. Attarwala
                </p>
              )}
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[10px] tracking-[0.2em] uppercase text-ivory/58 text-center"
            >
              What will you call it?
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Skip hint */}
      <div className="text-center">
        <button
          onClick={() => update({ name: '' })}
          className="text-[10px] tracking-[0.2em] uppercase text-ivory/58 hover:text-ivory/78 transition-colors duration-300 underline underline-offset-4"
        >
          Skip — we'll name it together
        </button>
      </div>
    </div>
  )
}
