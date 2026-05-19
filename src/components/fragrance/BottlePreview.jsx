import { motion, AnimatePresence } from 'framer-motion'
import { FAMILIES, INTENSITY_LEVELS } from '../../data/notes'

function getFamily(id) {
  return FAMILIES.find((f) => f.id === id) || null
}

const BOTTLE_PARTICLES = [
  { x: -55, y: -20, dur: 4,  del: 0,   size: 1.5 },
  { x: 60,  y: -40, dur: 5,  del: 0.8, size: 1 },
  { x: -40, y: 30,  dur: 3.5, del: 1.5, size: 1 },
  { x: 50,  y: 10,  dur: 4.5, del: 0.3, size: 1.5 },
  { x: 0,   y: -60, dur: 6,  del: 2.0, size: 1 },
  { x: -70, y: 0,   dur: 5,  del: 1.1, size: 1 },
]

function BottleSVG({ fillColor, fillOpacity, fillHeight }) {
  const h = 180
  const fillY = h - fillHeight

  return (
    <svg width="120" height="230" viewBox="0 0 110 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Neck */}
      <rect x="42" y="10" width="26" height="35" rx="4" fill="none" stroke="rgba(245,240,232,0.12)" strokeWidth="1" />
      {/* Cap */}
      <rect x="38" y="4" width="34" height="12" rx="3" fill="rgba(201,168,76,0.25)" stroke="rgba(201,168,76,0.4)" strokeWidth="0.8" />

      {/* Bottle body outline */}
      <path
        d="M20 60 Q18 70 18 90 L18 180 Q18 200 55 200 Q92 200 92 180 L92 90 Q92 70 90 60 Z"
        fill="rgba(245,240,232,0.025)"
        stroke="rgba(245,240,232,0.15)"
        strokeWidth="1"
      />

      {/* Liquid fill */}
      <defs>
        <clipPath id="bottle-clip">
          <path d="M20 60 Q18 70 18 90 L18 180 Q18 200 55 200 Q92 200 92 180 L92 90 Q92 70 90 60 Z" />
        </clipPath>
        <linearGradient id="fill-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={fillColor} stopOpacity={fillOpacity * 0.9} />
          <stop offset="100%" stopColor={fillColor} stopOpacity={fillOpacity * 0.45} />
        </linearGradient>
      </defs>

      <motion.rect
        x="18"
        y={0}
        width="74"
        animate={{ y: fillY, height: fillHeight }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        fill="url(#fill-grad)"
        clipPath="url(#bottle-clip)"
      />

      {/* Inner shimmer */}
      <line x1="30" y1="70" x2="30" y2="185" stroke="rgba(255,255,255,0.04)" strokeWidth="5" strokeLinecap="round" />

      {/* Neck connectors */}
      <path d="M42 45 Q35 52 22 60" stroke="rgba(245,240,232,0.10)" strokeWidth="1" fill="none" />
      <path d="M68 45 Q75 52 88 60" stroke="rgba(245,240,232,0.10)" strokeWidth="1" fill="none" />
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
      <div className="flex items-center gap-4 px-6 py-3 border-t" style={{ borderColor: 'rgba(176,141,87,0.08)', background: 'rgba(5,4,3,0.96)' }}>
        <div className="scale-[0.45] origin-left -ml-8 -my-6">
          <BottleSVG fillColor={fillColor} fillOpacity={fillOpacity} fillHeight={fillHeight} />
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          {name ? (
            <p className="font-heading text-sm italic truncate" style={{ color: 'rgba(201,168,76,0.85)' }}>{name}</p>
          ) : (
            <p className="text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(245,240,232,0.20)' }}>Your Fragrance</p>
          )}
          {fam && (
            <p className="text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(201,168,76,0.40)' }}>{fam.label}</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-5 py-8">
      {/* Fragrance name */}
      <div className="text-center min-h-[44px] flex flex-col items-center justify-end">
        <AnimatePresence mode="wait">
          {name ? (
            <motion.p
              key={name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="font-heading italic text-xl tracking-wide"
              style={{ color: fam ? fam.accentColor : 'rgba(201,168,76,0.85)' }}
            >
              {name}
            </motion.p>
          ) : (
            <motion.p
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[9px] tracking-[0.4em] uppercase"
              style={{ color: 'rgba(245,240,232,0.14)' }}
            >
              Your Fragrance
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Bottle + ambient glow + particles */}
      <div className="relative flex items-center justify-center" style={{ width: 220, height: 260 }}>
        {/* Large ambient glow — family-reactive */}
        <AnimatePresence>
          {fam && (
            <motion.div
              key={fam.id + '-glow'}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute pointer-events-none"
              style={{
                width: '220px',
                height: '220px',
                background: `radial-gradient(circle, ${fam.glowColor} 0%, transparent 68%)`,
                filter: 'blur(18px)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
              }}
            />
          )}
        </AnimatePresence>

        {/* Floating ambient particles — visible when family selected */}
        <AnimatePresence>
          {fam && BOTTLE_PARTICLES.map((p, i) => (
            <motion.div
              key={`${fam.id}-p${i}`}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: p.size,
                height: p.size,
                background: fam.accentColor,
                top: '50%',
                left: '50%',
              }}
              initial={{ opacity: 0, x: p.x * 0.5, y: p.y * 0.5 }}
              animate={{
                opacity: [0, 0.4, 0.15, 0.4, 0],
                x: [p.x * 0.8, p.x, p.x * 1.1, p.x],
                y: [p.y, p.y - 12, p.y, p.y - 8],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: p.dur,
                delay: p.del,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </AnimatePresence>

        {/* Bottle */}
        <div className="relative z-10">
          <BottleSVG fillColor={fillColor} fillOpacity={fillOpacity} fillHeight={fillHeight} />
        </div>
      </div>

      {/* Family label */}
      <AnimatePresence mode="wait">
        {fam ? (
          <motion.div
            key={fam.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <p
              className="text-[9px] tracking-[0.4em] uppercase"
              style={{ color: fam.accentColor, opacity: 0.65 }}
            >
              {fam.label}
            </p>
            <p
              className="font-heading text-2xl mt-0.5"
              style={{ color: fam.accentColor, opacity: 0.15, fontStyle: 'italic' }}
            >
              {fam.arabicLabel}
            </p>
          </motion.div>
        ) : (
          <motion.p
            key="no-family"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[9px] tracking-[0.35em] uppercase"
            style={{ color: 'rgba(245,240,232,0.14)' }}
          >
            Select a family
          </motion.p>
        )}
      </AnimatePresence>

      {/* Intensity bars */}
      {intensityLevel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-end gap-1.5"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                height: i < intensity ? 12 + i * 3 : 5,
                background: i < intensity ? fillColor : 'rgba(245,240,232,0.07)',
              }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              style={{ width: '5px', borderRadius: '2px' }}
            />
          ))}
          <span
            className="text-[8px] tracking-[0.25em] uppercase ml-2"
            style={{ color: 'rgba(245,240,232,0.28)' }}
          >
            {intensityLevel.label}
          </span>
        </motion.div>
      )}

      {/* Selected notes */}
      <AnimatePresence>
        {allNotes.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-wrap gap-1.5 justify-center max-w-[210px]"
          >
            {allNotes.map((note) => (
              <motion.span
                key={note}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-[7px] tracking-[0.2em] uppercase px-2 py-0.5"
                style={{
                  border: `1px solid ${fillColor}22`,
                  color: `${fillColor}60`,
                  background: `${fillColor}06`,
                }}
              >
                {note}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
