import { useRef, useState, useCallback, useEffect } from 'react'
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

export default function CollectionCard({ product, index, featured = false }) {
  const { id, name, arabicName, desc, notes, gradient, accentColor, price, size, isNew, isBestseller, isComingSoon, image } = product

  const cardRef         = useRef(null)
  const [hovered, setHovered]   = useState(false)
  const [touchActive, setTouchActive] = useState(false)
  const [shineKey, setShineKey] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const prefersReduced  = useReducedMotion()

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    setIsMobile(mq.matches)
    const h = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])

  /* Combined active state — mouse hover on desktop, tap on mobile */
  const isActive = hovered || touchActive

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
      `${-x * 30}px ${-y * 22}px 55px rgba(0,0,0,0.6), 0 0 45px ${accentColor}12, 0 6px 40px rgba(0,0,0,0.5), 0 1px 0 rgba(201,168,76,0.08)`
  )

  /* ── Event handlers ── */
  const onMouseMove = useCallback((e) => {
    if (!cardRef.current || prefersReduced || isMobile) return
    const r = cardRef.current.getBoundingClientRect()
    rawX.set((e.clientX - r.left) / r.width  - 0.5)
    rawY.set((e.clientY - r.top)  / r.height - 0.5)
  }, [rawX, rawY, prefersReduced, isMobile])

  const onMouseEnter = useCallback(() => {
    setHovered(true)
    setShineKey(k => k + 1)
  }, [])

  const onMouseLeave = useCallback(() => {
    setHovered(false)
    rawX.set(0)
    rawY.set(0)
  }, [rawX, rawY])

  const onTap = useCallback(() => {
    if (isMobile) {
      setTouchActive(v => {
        if (!v) setShineKey(k => k + 1)
        return !v
      })
    }
  }, [isMobile])

  /* ── Disable 3D on mobile or reduced motion ── */
  const tiltStyle = (prefersReduced || isMobile) ? {} : { rotateX, rotateY }

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
      onClick={onTap}
      className={`group relative flex flex-col select-none h-full overflow-hidden rounded-xl ${isComingSoon ? 'cursor-default' : 'cursor-pointer'}`}
      style={{
        perspective: '900px',
        boxShadow: cardShadow,
        border: `1px solid ${isActive ? accentColor + '35' : accentColor + '18'}`,
        transition: 'border-color 0.5s',
        willChange: 'transform',
        outline: `1px solid ${isActive ? accentColor + '12' : 'transparent'}`,
        outlineOffset: '3px',
      }}
    >

      {/* ════════════════════════════════════════════════════════════
          3D IMAGE AREA — layers stack in z-order
          ════════════════════════════════════════════════════════════ */}
      <motion.div
        className="relative overflow-hidden"
        style={{
          height: isMobile ? undefined : featured ? '360px' : isBestseller ? '310px' : '268px',
          aspectRatio: isMobile ? (featured ? '16/9' : '4/3') : undefined,
          transformStyle: 'preserve-3d',
          ...tiltStyle,
        }}
      >

        {/* ── L1: Background gradient (inset -8% so parallax never shows edge) ── */}
        <motion.div
          className="absolute"
          style={{ inset: '-8%', background: gradient, x: bgX, y: bgY, zIndex: 0 }}
        />

        {/* ── L2: Arabic watermark — atmospheric, subtle ── */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ x: bgX, y: bgY, zIndex: 1 }}
        >
          <motion.span
            className="font-heading text-5xl font-light select-none"
            animate={{ opacity: isActive ? 0.03 : 0.06, scale: isActive ? 1.04 : 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ color: accentColor }}
          >
            {arabicName}
          </motion.span>
        </motion.div>

        {/* ── L3: Bottle + cursor tracking ── */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
          <motion.div
            className="absolute inset-0"
            style={{ x: bottleX, y: bottleY }}
          >
            {image ? (
              <>
                <motion.img
                  src={image}
                  alt={name}
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-cover"
                  animate={{ scale: isActive ? 1.06 : 1, filter: isActive ? 'brightness(1.06) saturate(1.08)' : 'brightness(1.0) saturate(1.0)' }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
                {/* Minimal bottom fade — only to separate image from content text */}
                <div className="absolute inset-x-0 bottom-0 h-12 pointer-events-none" style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 100%)',
                }} />
                {/* Accent color tint on hover */}
                <div className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                  style={{ background: `radial-gradient(ellipse at 50% 80%, ${accentColor}12 0%, transparent 65%)`, opacity: isActive ? 1 : 0 }} />
              </>
            ) : (
              <BottlePlaceholder accentColor={accentColor} arabicName={arabicName} />
            )}
          </motion.div>
        </div>

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
            opacity: isActive ? 1 : 0,
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

        {/* ── Coming Soon overlay ── */}
        {isComingSoon && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
            style={{ background: 'rgba(5,4,3,0.78)', backdropFilter: 'blur(2px)' }}>
            <span style={{ color: `${accentColor}30`, fontSize: '3rem', lineHeight: 1 }}>◈</span>
            <span className="text-[9px] tracking-[0.5em] uppercase mt-3" style={{ color: `${accentColor}55` }}>
              Coming Soon
            </span>
          </div>
        )}

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
          <span className="text-[9px] tracking-[0.3em] text-gold-400/58">
            No.{String(id).padStart(2, '0')}
          </span>
        </div>

        {/* Border glow */}
        <div
          className="absolute inset-0 pointer-events-none z-10 transition-all duration-500"
          style={{
            border: `1px solid ${isActive ? accentColor + '38' : accentColor + '12'}`,
            boxShadow: isActive ? `inset 0 0 30px ${accentColor}06` : 'none',
          }}
        />

        {/* Corner accent lines (top-right) */}
        <div className="absolute top-0 right-0 z-10 pointer-events-none">
          <motion.div
            className="absolute top-0 right-0 h-px"
            animate={{ width: isActive ? 64 : 32 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            style={{ background: `linear-gradient(to left, ${accentColor}65, transparent)` }}
          />
          <motion.div
            className="absolute top-0 right-0 w-px"
            animate={{ height: isActive ? 64 : 32 }}
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
        className="p-3 sm:p-5 flex flex-col gap-2 sm:gap-3 flex-1 border border-t-0 transition-all duration-500"
        style={{
          background: isActive
            ? 'rgba(22,15,6,0.99)'
            : 'linear-gradient(180deg, rgba(18,12,5,0.98) 0%, rgba(14,9,3,0.98) 100%)',
          borderColor: isActive ? `${accentColor}28` : `${accentColor}12`,
          paddingBottom: '16px',
        }}
      >
        {/* Featured signature label */}
        {featured && (
          <div className="flex items-center gap-2 mb-1">
            <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${accentColor}40, transparent)` }} />
            <span className="text-[9px] tracking-[0.24em] uppercase font-semibold" style={{ color: `${accentColor}CC` }}>Signature</span>
            <div className="h-px flex-1" style={{ background: `linear-gradient(to left, ${accentColor}40, transparent)` }} />
          </div>
        )}

        {/* Name row */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className={`font-heading ${featured ? 'text-lg sm:text-[1.7rem]' : 'text-base sm:text-[1.45rem]'} transition-colors duration-400 leading-tight`}
              style={{ color: isActive ? 'rgba(232,200,132,1)' : 'rgba(255,252,245,0.97)' }}>
              {name}
            </h3>
          </div>
          <motion.div
            className="flex-shrink-0 mt-1 transition-colors duration-400"
            animate={{ x: isActive ? 4 : 0, opacity: isActive ? 1 : 0.2 }}
            transition={{ duration: 0.35 }}
            style={{ color: isActive ? accentColor : 'rgba(255,252,245,0.55)' }}
          >
            <ArrowRight size={14} strokeWidth={1.2} />
          </motion.div>
        </div>

        {/* Description */}
        <p className="font-normal leading-[1.75]"
          style={{ fontSize: '0.875rem', color: isActive ? 'rgba(245,241,234,0.94)' : 'rgba(236,230,220,0.84)', transition: 'color 0.4s' }}>
          {desc}
        </p>

        {/* Note chips */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {notes.map((note) => (
            <span
              key={note}
              className="text-[9px] tracking-[0.18em] uppercase px-2.5 py-1.5 border transition-all duration-400"
              style={{
                borderColor: isActive ? `${accentColor}45` : `${accentColor}28`,
                color:       isActive ? `${accentColor}` : `${accentColor}AA`,
                background:  isActive ? `${accentColor}05` : 'transparent',
              }}
            >
              {note}
            </span>
          ))}
        </div>

        {/* Price + enquire */}
        <div
          className="flex flex-col gap-1 pt-2 sm:pt-3 border-t transition-colors duration-400 mt-auto"
          style={{ borderColor: isActive ? `${accentColor}15` : `${accentColor}06` }}
        >
          {/* Keyword label */}
          {!isComingSoon && (
            <span className="text-[9px] tracking-[0.22em] uppercase font-semibold"
              style={{ color: isActive ? `${accentColor}E6` : `${accentColor}80`, transition: 'color 0.4s' }}>
              Handcrafted · Pure Essence
            </span>
          )}
          {/* Price row */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-heading font-bold transition-colors duration-400"
                style={{ fontSize: featured ? '1.25rem' : '1.1rem', letterSpacing: '0.06em',
                  color: isComingSoon ? `${accentColor}45` : accentColor }}>
                {isComingSoon ? 'Coming Soon' : price.replace('₹ ', '₹')}
              </span>
              {!isComingSoon && (
                <span className="text-[10px] tracking-[0.14em]" style={{ color: `${accentColor}70` }}>
                  · {size}
                </span>
              )}
            </div>
            {!isComingSoon && (
              <motion.span
                className="text-[10px] tracking-[0.22em] uppercase font-semibold"
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -8 }}
                transition={{ duration: 0.35 }}
                style={{ color: 'rgba(255,252,245,0.72)' }}
              >
                Enquire
              </motion.span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom reveal line */}
      <motion.div
        className="absolute bottom-0 left-0 h-px pointer-events-none"
        animate={{ width: isActive ? '100%' : '0%' }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        style={{ background: `linear-gradient(to right, transparent, ${accentColor}65, transparent)` }}
      />

    </motion.article>
  )
}
