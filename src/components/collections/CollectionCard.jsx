import { useRef, useState, useCallback } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  useReducedMotion,
} from 'framer-motion'
import { ArrowRight } from 'lucide-react'

/* ─── Spring config: premium feel — responsive but not snappy ─── */
const SPRING = { stiffness: 180, damping: 28, mass: 0.8 }

/* ─── Particle layout: deterministic (no random = no re-render jitter) ─── */
const PARTICLES = [
  { left: '14%', top: '22%', size: 2.5, dur: 3.2, del: 0.0 },
  { left: '82%', top: '18%', size: 1.5, dur: 2.7, del: 0.7 },
  { left: '72%', top: '72%', size: 2.0, dur: 3.5, del: 1.3 },
  { left: '18%', top: '68%', size: 1.5, dur: 2.4, del: 0.4 },
  { left: '50%', top:  '8%', size: 1.5, dur: 3.0, del: 1.0 },
  { left: '88%', top: '48%', size: 1.0, dur: 2.6, del: 0.2 },
  { left:  '8%', top: '45%', size: 1.0, dur: 2.9, del: 1.6 },
]

/* ─── CSS bottle silhouette used when no image prop is provided ─── */
function BottlePlaceholder({ accentColor, arabicName }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative flex flex-col items-center" style={{ height: '82%' }}>
        {/* Cap */}
        <div style={{
          width: '30%', height: '10%', borderRadius: '2px 2px 0 0',
          background: `linear-gradient(180deg, ${accentColor}95 0%, ${accentColor}55 100%)`,
        }} />
        {/* Neck */}
        <div style={{
          width: '16%', height: '13%',
          background: `linear-gradient(180deg, ${accentColor}45, ${accentColor}22)`,
        }} />
        {/* Body */}
        <div style={{
          width: '58%', height: '77%',
          borderRadius: '4px 4px 10px 10px',
          background: `linear-gradient(135deg, ${accentColor}22 0%, ${accentColor}08 45%, ${accentColor}18 100%)`,
          border: `1px solid ${accentColor}28`,
          boxShadow: `inset 3px 0 12px ${accentColor}12, inset -1px 0 6px rgba(0,0,0,0.3), 0 12px 45px rgba(0,0,0,0.65)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Glass highlight strip */}
          <div style={{
            position: 'absolute', left: '10%', top: 0, bottom: 0, width: '12%',
            background: `linear-gradient(180deg, ${accentColor}18, transparent 75%)`,
            borderRadius: '4px',
          }} />
          {/* Arabic label on body */}
          <span className="font-heading select-none" style={{
            fontSize: '0.65rem', color: `${accentColor}50`,
            letterSpacing: '0.06em', writingMode: 'vertical-rl',
          }}>
            {arabicName}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ─── Card enter/exit variants (reused by ProductGrid) ─── */
export const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.55, delay: i * 0.07, ease: [0.76, 0, 0.24, 1] },
  }),
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.25 } },
}

export default function CollectionCard({ product, index }) {
  const { id, name, arabicName, desc, notes, gradient, accentColor, price, isNew, isBestseller, image } = product

  const cardRef         = useRef(null)
  const [hovered, setHovered]   = useState(false)
  const [shineKey, setShineKey] = useState(0) // increment → retrigger shine sweep
  const prefersReduced  = useReducedMotion()

  /* ── Raw normalized cursor position on card (-0.5 → +0.5) ── */
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  /* ── Card tilt: image area rotates TOWARD cursor ── */
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-14, 14]), SPRING)
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [10, -10]), SPRING)

  /* ── Background parallax: moves OPPOSITE cursor → depth illusion ── */
  const bgX = useSpring(useTransform(rawX, [-0.5, 0.5], [7, -7]), SPRING)
  const bgY = useSpring(useTransform(rawY, [-0.5, 0.5], [7, -7]), SPRING)

  /* ── Bottle layer: moves WITH cursor, amplified → Z-depth feel ── */
  const bottleX = useSpring(useTransform(rawX, [-0.5, 0.5], [-13, 13]), SPRING)
  const bottleY = useSpring(useTransform(rawY, [-0.5, 0.5], [-9, 9]), SPRING)

  /* ── Cursor glow position (percentage strings) ── */
  const glowLeft = useTransform(rawX, [-0.5, 0.5], ['15%', '85%'])
  const glowTop  = useTransform(rawY, [-0.5, 0.5], ['15%', '85%'])

  /* ── Card drop-shadow shifts with tilt direction ── */
  const cardShadow = useTransform(
    [rawX, rawY],
    ([x, y]) =>
      `${-x * 30}px ${-y * 22}px 55px rgba(0,0,0,0.55), 0 0 45px ${accentColor}07`
  )

  /* ── Event handlers ── */
  const onMouseMove = useCallback((e) => {
    if (!cardRef.current || prefersReduced) return
    const r = cardRef.current.getBoundingClientRect()
    rawX.set((e.clientX - r.left) / r.width  - 0.5)
    rawY.set((e.clientY - r.top)  / r.height - 0.5)
  }, [rawX, rawY, prefersReduced])

  const onMouseEnter = useCallback(() => {
    setHovered(true)
    setShineKey(k => k + 1) // fires shine sweep each hover-enter
  }, [])

  const onMouseLeave = useCallback(() => {
    setHovered(false)
    rawX.set(0) // spring back to center
    rawY.set(0)
  }, [rawX, rawY])

  /* ── Disable 3D when user prefers reduced motion ── */
  const tiltStyle = prefersReduced ? {} : { rotateX, rotateY }

  return (
    <motion.article
      layout
      variants={cardVariants}
      custom={index}
      initial="hidden"
      animate="show"
      exit="exit"
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group relative flex flex-col cursor-pointer select-none"
      style={{ perspective: '900px', boxShadow: cardShadow }}
    >

      {/* ════════════════════════════════════════════════════════════
          3D IMAGE AREA — layers stack in z-order
          ════════════════════════════════════════════════════════════ */}
      <motion.div
        className="relative overflow-hidden"
        style={{
          height: '268px',
          transformStyle: 'preserve-3d',
          ...tiltStyle,
        }}
      >

        {/* ── L1: Background gradient (inset -8% so parallax never shows edge) ── */}
        <motion.div
          className="absolute"
          style={{ inset: '-8%', background: gradient, x: bgX, y: bgY, zIndex: 0 }}
        />

        {/* ── L2: Arabic watermark — moves with BG (same parallax) ── */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ x: bgX, y: bgY, zIndex: 1 }}
        >
          <motion.span
            className="font-heading text-7xl font-light select-none"
            animate={{ opacity: hovered ? 0.04 : 0.08, scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ color: accentColor }}
          >
            {arabicName}
          </motion.span>
        </motion.div>

        {/* ── L3: Bottle — ambient float (outer) + cursor tracking (inner) ── */}
        {/* Outer div: idle float animation, pauses when hovered */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 2 }}
          animate={
            !hovered && !prefersReduced
              ? { y: [0, -11, 0] }
              : { y: 0 }
          }
          transition={
            !hovered && !prefersReduced
              ? { duration: 3.2, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }
              : { duration: 0.5, ease: 'easeOut' }
          }
        >
          {/* Inner div: cursor parallax — stacks with float */}
          <motion.div
            className="absolute inset-0"
            style={{ x: bottleX, y: bottleY }}
          >
            {image ? (
              <img
                src={image}
                alt={name}
                draggable={false}
                className="absolute inset-0 w-full h-full object-contain"
                style={{
                  transform: 'scale(0.86)',
                  filter: `drop-shadow(0 22px 32px rgba(0,0,0,0.72)) drop-shadow(0 0 18px ${accentColor}18)`,
                }}
              />
            ) : (
              <BottlePlaceholder accentColor={accentColor} arabicName={arabicName} />
            )}
          </motion.div>
        </motion.div>

        {/* ── L4: Dynamic cursor glow ── */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: glowLeft,
            top: glowTop,
            width: 210, height: 210,
            x: '-50%', y: '-50%',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${accentColor}22 0%, transparent 68%)`,
            filter: 'blur(26px)',
            zIndex: 3,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.35s ease',
          }}
        />

        {/* ── L5: Glass shine sweep on each hover-enter ── */}
        <AnimatePresence>
          {shineKey > 0 && (
            <motion.div
              key={shineKey}
              className="absolute inset-0 pointer-events-none overflow-hidden"
              style={{ zIndex: 20 }}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <motion.div
                className="absolute inset-y-0 w-1/3"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 60%, transparent)',
                  skewX: -12,
                }}
                initial={{ left: '-38%' }}
                animate={{ left: '138%' }}
                transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── L6: Ambient gold particles ── */}
        {!prefersReduced && PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: p.left, top: p.top,
              width: p.size, height: p.size,
              background: accentColor,
              zIndex: 5,
            }}
            animate={{
              opacity: [0.06, hovered ? 0.45 : 0.18, 0.06],
              y: [0, -(p.size * 4.5), 0],
              scale: [1, 1.7, 1],
            }}
            transition={{
              duration: p.dur, repeat: Infinity,
              delay: p.del, ease: 'easeInOut',
            }}
          />
        ))}

        {/* ── Badges ── */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {isNew && (
            <span className="text-[8px] tracking-[0.3em] uppercase px-2.5 py-1 bg-gold-400 text-black font-medium">
              New
            </span>
          )}
          {isBestseller && (
            <span className="text-[8px] tracking-[0.3em] uppercase px-2.5 py-1 border border-gold-400/50 text-gold-400">
              Bestseller
            </span>
          )}
        </div>

        {/* Product number */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="text-[9px] tracking-[0.3em] text-gold-400/20">
            No.{String(id).padStart(2, '0')}
          </span>
        </div>

        {/* Border glow */}
        <div
          className="absolute inset-0 pointer-events-none z-10 transition-all duration-500"
          style={{
            border: `1px solid ${hovered ? accentColor + '38' : accentColor + '12'}`,
            boxShadow: hovered ? `inset 0 0 30px ${accentColor}06` : 'none',
          }}
        />

        {/* Corner accent lines (top-right) */}
        <div className="absolute top-0 right-0 z-10 pointer-events-none">
          <motion.div
            className="absolute top-0 right-0 h-px"
            animate={{ width: hovered ? 64 : 32 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            style={{ background: `linear-gradient(to left, ${accentColor}65, transparent)` }}
          />
          <motion.div
            className="absolute top-0 right-0 w-px"
            animate={{ height: hovered ? 64 : 32 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            style={{ background: `linear-gradient(to bottom, ${accentColor}65, transparent)` }}
          />
        </div>

      </motion.div>
      {/* END IMAGE AREA */}

      {/* ════════════════════════════════════════════════════════════
          CONTENT AREA — flat (no 3D tilt)
          ════════════════════════════════════════════════════════════ */}
      <div
        className="p-5 flex flex-col gap-3 flex-1 border border-t-0 transition-all duration-400"
        style={{
          background: hovered ? 'rgba(18,12,4,0.96)' : '#111111',
          borderColor: hovered ? `${accentColor}28` : `${accentColor}10`,
        }}
      >
        {/* Name row */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-heading text-lg text-ivory group-hover:text-gold-300 transition-colors duration-300 leading-tight">
              {name}
            </h3>
            <p className="text-[10px] tracking-wider text-gold-400/30 mt-0.5">{arabicName}</p>
          </div>
          <motion.div
            className="text-ivory/20 group-hover:text-gold-400 transition-colors duration-300 mt-1 flex-shrink-0"
            animate={{ x: hovered ? 3 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight size={15} strokeWidth={1.5} />
          </motion.div>
        </div>

        {/* Description */}
        <p className="text-ivory/35 text-xs leading-relaxed font-light">{desc}</p>

        {/* Note chips */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {notes.map((note) => (
            <span
              key={note}
              className="text-[8px] tracking-[0.25em] uppercase px-2.5 py-1 border transition-all duration-300"
              style={{
                borderColor: hovered ? `${accentColor}28` : `${accentColor}12`,
                color:       hovered ? `${accentColor}72` : `${accentColor}40`,
              }}
            >
              {note}
            </span>
          ))}
        </div>

        {/* Price + enquire */}
        <div
          className="flex items-center justify-between pt-2 border-t transition-colors duration-300"
          style={{ borderColor: hovered ? `${accentColor}18` : `${accentColor}08` }}
        >
          <span className="text-gold-400 text-sm font-medium tracking-wide">{price}</span>
          <motion.span
            className="text-[9px] tracking-[0.3em] uppercase text-ivory/50"
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -5 }}
            transition={{ duration: 0.3 }}
          >
            Enquire →
          </motion.span>
        </div>
      </div>

      {/* Bottom reveal line */}
      <motion.div
        className="absolute bottom-0 left-0 h-px pointer-events-none"
        animate={{ width: hovered ? '100%' : '0%' }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        style={{ background: `linear-gradient(to right, transparent, ${accentColor}65, transparent)` }}
      />

    </motion.article>
  )
}
