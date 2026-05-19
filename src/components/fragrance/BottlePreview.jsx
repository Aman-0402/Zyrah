import { motion, AnimatePresence } from 'framer-motion'
import { FAMILIES, INTENSITY_LEVELS } from '../../data/notes'

function getFamily(id) {
  return FAMILIES.find((f) => f.id === id) || null
}

const BOTTLE_PARTICLES = [
  { x: -58, y: -18, dur: 4,   del: 0,   size: 1.5 },
  { x: 62,  y: -35, dur: 5,   del: 0.8, size: 1 },
  { x: -42, y: 28,  dur: 3.5, del: 1.5, size: 1 },
  { x: 52,  y: 12,  dur: 4.5, del: 0.3, size: 1.5 },
  { x: 0,   y: -62, dur: 6,   del: 2.0, size: 1 },
  { x: -70, y: -5,  dur: 5,   del: 1.1, size: 1 },
]

function BottleSVG({ fillColor, fillOpacity, fillHeight, glowColor }) {
  const h = 180
  const fillY = h - fillHeight

  return (
    <svg width="120" height="232" viewBox="0 0 110 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="bottle-clip">
          <path d="M20 60 Q18 70 18 90 L18 180 Q18 200 55 200 Q92 200 92 180 L92 90 Q92 70 90 60 Z" />
        </clipPath>
        <linearGradient id="fill-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={fillColor} stopOpacity={fillOpacity * 0.9} />
          <stop offset="100%" stopColor={fillColor} stopOpacity={fillOpacity * 0.40} />
        </linearGradient>
        <linearGradient id="glass-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="rgba(245,240,232,0.06)" />
          <stop offset="35%"  stopColor="rgba(245,240,232,0.03)" />
          <stop offset="100%" stopColor="rgba(245,240,232,0.01)" />
        </linearGradient>
        <radialGradient id="specular" cx="38%" cy="32%" r="28%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.11)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      {/* Neck */}
      <rect x="42" y="10" width="26" height="35" rx="3"
        fill="rgba(245,240,232,0.025)"
        stroke="rgba(245,240,232,0.14)" strokeWidth="0.8" />

      {/* Cap with detail */}
      <rect x="37" y="3" width="36" height="13" rx="3"
        fill="rgba(201,168,76,0.22)"
        stroke="rgba(201,168,76,0.45)" strokeWidth="0.8" />
      {/* Cap highlight line */}
      <line x1="40" y1="6" x2="73" y2="6" stroke="rgba(255,255,255,0.10)" strokeWidth="0.8" strokeLinecap="round" />

      {/* Bottle body */}
      <path
        d="M20 60 Q18 70 18 90 L18 180 Q18 200 55 200 Q92 200 92 180 L92 90 Q92 70 90 60 Z"
        fill="url(#glass-grad)"
        stroke="rgba(245,240,232,0.14)"
        strokeWidth="0.8"
      />

      {/* Liquid fill */}
      <motion.rect
        x="18" y={0} width="74"
        animate={{ y: fillY, height: fillHeight }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        fill="url(#fill-grad)"
        clipPath="url(#bottle-clip)"
      />

      {/* Glass body — specular highlight oval */}
      <ellipse cx="36" cy="105" rx="7" ry="38"
        fill="url(#specular)"
        clipPath="url(#bottle-clip)" />

      {/* Left primary shine line */}
      <line x1="28" y1="68" x2="28" y2="188"
        stroke="rgba(255,255,255,0.06)" strokeWidth="5" strokeLinecap="round"
        clipPath="url(#bottle-clip)" />

      {/* Right rim light */}
      <line x1="87" y1="68" x2="87" y2="186"
        stroke="rgba(255,255,255,0.035)" strokeWidth="2.5" strokeLinecap="round"
        clipPath="url(#bottle-clip)" />

      {/* Bottom depth shadow inside bottle */}
      <ellipse cx="55" cy="195" rx="28" ry="6"
        fill="rgba(0,0,0,0.18)"
        clipPath="url(#bottle-clip)" />

      {/* Neck connectors */}
      <path d="M42 45 Q35 52 22 60" stroke="rgba(245,240,232,0.09)" strokeWidth="0.8" fill="none" />
      <path d="M68 45 Q75 52 88 60" stroke="rgba(245,240,232,0.09)" strokeWidth="0.8" fill="none" />

      {/* Neck inner shine */}
      <rect x="44" y="12" width="4" height="28" rx="2"
        fill="rgba(255,255,255,0.06)" />
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
  const intensityFactor = (intensity - 1) / 4

  /* Intensity-reactive glow: grows with intensity */
  const glowSize = 160 + intensityFactor * 100
  const glowStrength = 0.6 + intensityFactor * 0.8

  const allNotes = [...topNotes, ...middleNotes, ...baseNotes]

  if (compact) {
    return (
      <div className="flex items-center gap-4 px-6 py-3 border-t"
        style={{ borderColor: 'rgba(176,141,87,0.07)', background: 'rgba(5,4,3,0.97)' }}>
        <div className="scale-[0.45] origin-left -ml-8 -my-6">
          <BottleSVG fillColor={fillColor} fillOpacity={fillOpacity} fillHeight={fillHeight} />
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          {name ? (
            <p className="font-heading text-sm italic truncate"
              style={{ color: 'rgba(201,168,76,0.85)' }}>{name}</p>
          ) : (
            <p className="text-[10px] tracking-[0.2em] uppercase font-medium"
              style={{ color: 'rgba(236,230,220,0.62)' }}>Your Fragrance</p>
          )}
          {fam && (
            <p className="text-[9px] tracking-[0.18em] uppercase font-medium"
              style={{ color: 'rgba(201,168,76,0.75)' }}>{fam.label}</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-4 py-6">
      {/* Fragrance name */}
      <div className="text-center min-h-[40px] flex flex-col items-center justify-end">
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
              className="text-[10px] tracking-[0.2em] uppercase font-medium"
              style={{ color: 'rgba(236,230,220,0.58)' }}
            >
              Your Fragrance
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Bottle + intensity-reactive ambient glow + particles */}
      <div className="relative flex items-center justify-center" style={{ width: 220, height: 260 }}>

        {/* Outer ambient glow — scales with intensity */}
        <AnimatePresence>
          {fam && (
            <motion.div
              key={`${fam.id}-outer`}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute pointer-events-none"
              style={{
                width: `${glowSize}px`,
                height: `${glowSize}px`,
                background: `radial-gradient(circle, ${fam.glowColor} 0%, transparent 68%)`,
                filter: `blur(${16 + intensityFactor * 12}px)`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                opacity: glowStrength,
              }}
            />
          )}
        </AnimatePresence>

        {/* Inner tight glow — at high intensity becomes dramatic */}
        <AnimatePresence>
          {fam && intensity >= 3 && (
            <motion.div
              key={`${fam.id}-inner-${intensity}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: (intensity - 2) / 3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute pointer-events-none"
              style={{
                width: '90px',
                height: '160px',
                background: `radial-gradient(ellipse, ${fam.glowColor} 0%, transparent 70%)`,
                filter: 'blur(10px)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
              }}
            />
          )}
        </AnimatePresence>

        {/* Smoke wisps at base — appear at Bold/Intense */}
        <AnimatePresence>
          {fam && intensity >= 4 && (
            <>
              {['-30px', '10px', '40px'].map((left, i) => (
                <motion.div
                  key={`smoke-${i}-${fam.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                  className="absolute pointer-events-none"
                  style={{ bottom: 10, left: '50%', marginLeft: left, width: 40, height: 80 }}
                >
                  <motion.div
                    animate={{ y: [0, -20, 0], opacity: [0, (intensity - 3) * 0.12, 0] }}
                    transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8, ease: 'easeOut' }}
                    style={{
                      width: '100%',
                      height: '100%',
                      background: `radial-gradient(ellipse, ${fam.glowColor} 0%, transparent 70%)`,
                      filter: 'blur(12px)',
                    }}
                  />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Floating particles */}
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
                opacity: [0, 0.35 + intensityFactor * 0.2, 0.12, 0.35, 0],
                x: [p.x * 0.8, p.x, p.x * 1.1, p.x],
                y: [p.y, p.y - 12, p.y, p.y - 8],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: p.dur, delay: p.del, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </AnimatePresence>

        {/* Bottle SVG — gentle breathing animation */}
        <motion.div
          animate={{ y: [0, -3, 0], scale: [1, 1.006, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10"
        >
          <BottleSVG
            fillColor={fillColor}
            fillOpacity={fillOpacity}
            fillHeight={fillHeight}
            glowColor={fam?.glowColor}
          />
        </motion.div>
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
            <p className="text-[10px] tracking-[0.2em] uppercase font-semibold"
              style={{ color: fam.accentColor, opacity: 0.86 }}>
              {fam.label}
            </p>
            <p className="font-heading text-2xl mt-0.5 italic"
              style={{ color: fam.accentColor, opacity: 0.12 }}>
              {fam.arabicLabel}
            </p>
          </motion.div>
        ) : (
          <motion.p
            key="no-family"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] tracking-[0.2em] uppercase font-medium"
            style={{ color: 'rgba(236,230,220,0.58)' }}
          >
            Select a family
          </motion.p>
        )}
      </AnimatePresence>

      {/* Intensity bars */}
      {intensityLevel && (
        <motion.div className="flex items-end gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                height: i < intensity ? 10 + i * 4 : 4,
                background: i < intensity ? fillColor : 'rgba(245,240,232,0.06)',
              }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              style={{ width: '4px', borderRadius: '2px' }}
            />
          ))}
          <span className="text-[9px] tracking-[0.16em] uppercase ml-2 font-medium"
            style={{ color: 'rgba(236,230,220,0.62)' }}>
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
                  border: `1px solid ${fillColor}20`,
                  color: `${fillColor}55`,
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
