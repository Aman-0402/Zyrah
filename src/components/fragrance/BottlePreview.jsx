import { motion, AnimatePresence } from 'framer-motion'
import { FAMILIES, INTENSITY_LEVELS } from '../../data/notes'

function getFamily(id) {
  return FAMILIES.find((f) => f.id === id) || null
}

/* CSS-drawn SVG perfume bottle */
function BottleSVG({ fillColor, fillOpacity, fillHeight }) {
  const h = 180
  const fillY = h - fillHeight

  return (
    <svg width="110" height="220" viewBox="0 0 110 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Neck */}
      <rect x="42" y="10" width="26" height="35" rx="4" fill="none" stroke="rgba(245,240,232,0.12)" strokeWidth="1" />
      {/* Cap */}
      <rect x="38" y="4" width="34" height="12" rx="3" fill="rgba(201,168,76,0.25)" stroke="rgba(201,168,76,0.4)" strokeWidth="0.8" />

      {/* Bottle body outline */}
      <path
        d="M20 60 Q18 70 18 90 L18 180 Q18 200 55 200 Q92 200 92 180 L92 90 Q92 70 90 60 Z"
        fill="rgba(245,240,232,0.03)"
        stroke="rgba(245,240,232,0.15)"
        strokeWidth="1"
      />

      {/* Liquid fill — clipped to bottle shape */}
      <defs>
        <clipPath id="bottle-clip">
          <path d="M20 60 Q18 70 18 90 L18 180 Q18 200 55 200 Q92 200 92 180 L92 90 Q92 70 90 60 Z" />
        </clipPath>
        <linearGradient id="fill-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={fillColor} stopOpacity={fillOpacity * 0.9} />
          <stop offset="100%" stopColor={fillColor} stopOpacity={fillOpacity * 0.5} />
        </linearGradient>
      </defs>

      <motion.rect
        x="18"
        y={0}
        width="74"
        animate={{ y: fillY, height: fillHeight }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        fill="url(#fill-grad)"
        clipPath="url(#bottle-clip)"
      />

      {/* Shine line */}
      <line x1="30" y1="70" x2="30" y2="185" stroke="rgba(255,255,255,0.05)" strokeWidth="4" strokeLinecap="round" />

      {/* Neck connector */}
      <path d="M42 45 Q35 52 22 60" stroke="rgba(245,240,232,0.12)" strokeWidth="1" fill="none" />
      <path d="M68 45 Q75 52 88 60" stroke="rgba(245,240,232,0.12)" strokeWidth="1" fill="none" />
    </svg>
  )
}

export default function BottlePreview({ selections, compact = false }) {
  const { family, intensity, name, topNotes, middleNotes, baseNotes } = selections
  const fam = getFamily(family)
  const intensityLevel = INTENSITY_LEVELS.find((l) => l.value === intensity)

  const fillColor = fam ? fam.accentColor : '#C9A84C'
  const fillOpacity = 0.15 + (intensity / 5) * 0.55
  const fillHeight = 40 + (intensity / 5) * 120

  const allNotes = [...topNotes, ...middleNotes, ...baseNotes]

  if (compact) {
    return (
      <div className="flex items-center gap-4 px-6 py-3 border-t border-gold-400/10 bg-black">
        <div className="scale-50 origin-left -ml-8 -my-6">
          <BottleSVG fillColor={fillColor} fillOpacity={fillOpacity} fillHeight={fillHeight} />
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          {name ? (
            <p className="font-heading text-sm text-gold-400 italic truncate">{name}</p>
          ) : (
            <p className="text-[9px] tracking-[0.3em] uppercase text-ivory/20">Your Fragrance</p>
          )}
          {fam && (
            <p className="text-[8px] tracking-[0.2em] uppercase text-gold-400/40">{fam.label}</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      {/* Label above bottle */}
      <div className="text-center min-h-[40px] flex flex-col items-center justify-end">
        <AnimatePresence mode="wait">
          {name ? (
            <motion.p
              key={name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="font-heading italic text-xl text-gold-400 tracking-wide"
            >
              {name}
            </motion.p>
          ) : (
            <motion.p
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[9px] tracking-[0.4em] uppercase text-ivory/15"
            >
              Your Fragrance
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Bottle + ambient glow */}
      <div className="relative flex items-center justify-center">
        <AnimatePresence>
          {fam && (
            <motion.div
              key={fam.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: '180px',
                height: '180px',
                background: `radial-gradient(circle, ${fam.glowColor} 0%, transparent 70%)`,
                filter: 'blur(20px)',
              }}
            />
          )}
        </AnimatePresence>
        <BottleSVG fillColor={fillColor} fillOpacity={fillOpacity} fillHeight={fillHeight} />
      </div>

      {/* Family label */}
      <AnimatePresence mode="wait">
        {fam ? (
          <motion.div
            key={fam.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <p className="text-[9px] tracking-[0.4em] uppercase text-gold-400/50">{fam.label}</p>
            <p className="font-heading text-xl text-gold-400/20 mt-0.5">{fam.arabicLabel}</p>
          </motion.div>
        ) : (
          <motion.p
            key="no-family"
            className="text-[9px] tracking-[0.35em] uppercase text-ivory/15"
          >
            Select a family
          </motion.p>
        )}
      </AnimatePresence>

      {/* Intensity badge */}
      {intensityLevel && (
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="transition-all duration-300"
              style={{
                width: '6px',
                height: i < intensity ? '14px' : '6px',
                background: i < intensity ? fillColor : 'rgba(245,240,232,0.08)',
                borderRadius: '2px',
              }}
            />
          ))}
          <span className="text-[9px] tracking-[0.25em] uppercase text-ivory/30 ml-1">
            {intensityLevel.label}
          </span>
        </div>
      )}

      {/* Selected notes */}
      {allNotes.length > 0 && (
        <div className="flex flex-wrap gap-1.5 justify-center max-w-[200px]">
          {allNotes.map((note) => (
            <motion.span
              key={note}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-[7px] tracking-[0.2em] uppercase px-2 py-0.5 border border-gold-400/20 text-gold-400/40"
            >
              {note}
            </motion.span>
          ))}
        </div>
      )}
    </div>
  )
}
