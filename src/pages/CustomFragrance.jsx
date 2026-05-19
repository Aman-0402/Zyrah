import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { FAMILIES } from '../data/notes'
import FragranceBuilderHero from '../components/fragrance/FragranceBuilderHero'
import StepIndicator from '../components/fragrance/StepIndicator'
import BottlePreview from '../components/fragrance/BottlePreview'
import Step1Family from '../components/fragrance/steps/Step1Family'
import Step2Notes from '../components/fragrance/steps/Step2Notes'
import Step3Intensity from '../components/fragrance/steps/Step3Intensity'
import Step4Name from '../components/fragrance/steps/Step4Name'
import Step5Enquiry from '../components/fragrance/steps/Step5Enquiry'

const LUXURY = [0.22, 1, 0.36, 1]
const TOTAL_STEPS = 5

/* Richer, more saturated per-family atmosphere */
const FAMILY_ATM = {
  oud:    { g1: '165,82,16',   g2: '100,46,8',    p: '201,168,76',  smoke: '180,100,20' },
  floral: { g1: '185,72,108',  g2: '115,42,68',   p: '226,194,125', smoke: '200,80,120' },
  musk:   { g1: '185,165,220', g2: '115,98,148',  p: '215,205,238', smoke: '180,165,215' },
  fresh:  { g1: '42,138,80',   g2: '22,88,52',    p: '110,195,145', smoke: '50,150,90' },
}
const DEFAULT_ATM = { g1: '130,72,22', g2: '68,34,10', p: '176,141,87', smoke: '140,80,20' }

const BUILDER_PARTICLES = [
  { left: '3%',  top: '22%', dur: 8,  del: 0,   size: 1.5 },
  { left: '95%', top: '28%', dur: 6,  del: 1.5, size: 1 },
  { left: '7%',  top: '62%', dur: 9,  del: 2.2, size: 1 },
  { left: '93%', top: '70%', dur: 7,  del: 0.7, size: 1.5 },
  { left: '48%', top: '6%',  dur: 10, del: 3.0, size: 1 },
  { left: '20%', top: '88%', dur: 8,  del: 1.1, size: 1 },
  { left: '80%', top: '8%',  dur: 7,  del: 2.8, size: 1 },
  { left: '33%', top: '94%', dur: 9,  del: 0.3, size: 1.5 },
  { left: '68%', top: '96%', dur: 8,  del: 1.8, size: 1 },
  { left: '12%', top: '42%', dur: 11, del: 4.0, size: 1 },
]

const SMOKE_WISPS = [
  { left: '8%',  del: 0 },
  { left: '38%', del: 7 },
  { left: '62%', del: 3 },
  { left: '88%', del: 11 },
]

const PILLARS = [
  { symbol: '◈', title: 'Hand-blended', sub: 'For you alone — no two alike' },
  { symbol: '✦', title: 'Free Delivery', sub: 'Across all of India' },
  { symbol: '◇', title: 'Ships in 7 Days', sub: 'Crafted by master perfumers' },
]

const initialSelections = {
  family: null,
  topNotes: [],
  middleNotes: [],
  baseNotes: [],
  intensity: 3,
  name: '',
  customerName: '',
  phone: '',
  email: '',
  message: '',
}

function makeVariants(direction) {
  return {
    enter:  { x: direction > 0 ? 50 : -50, opacity: 0 },
    center: { x: 0, opacity: 1, transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] } },
    exit:   { x: direction > 0 ? -50 : 50, opacity: 0, transition: { duration: 0.28 } },
  }
}

function canAdvance(step, selections) {
  if (step === 1) return !!selections.family
  return true
}

export default function CustomFragrance() {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [selections, setSelections] = useState(initialSelections)
  const [tabsSticky, setTabsSticky] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setTabsSticky(!entry.isIntersecting),
      { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
    )
    if (heroRef.current) observer.observe(heroRef.current)
    return () => observer.disconnect()
  }, [])

  function update(patch) {
    setSelections((prev) => ({ ...prev, ...patch }))
  }

  function goNext() {
    if (step >= TOTAL_STEPS || !canAdvance(step, selections)) return
    setDirection(1)
    setStep((s) => s + 1)
  }

  function goBack() {
    if (step <= 1) return
    setDirection(-1)
    setStep((s) => s - 1)
  }

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Enter' && canAdvance(step, selections)) goNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [step, selections])

  const variants = makeVariants(direction)
  const canGo = canAdvance(step, selections)
  const stepProps = { selections, update }

  const atm = FAMILY_ATM[selections.family] || DEFAULT_ATM
  const intensityFactor = (selections.intensity - 1) / 4
  const glowOpacity = 0.09 + intensityFactor * 0.14

  const previewFam = useMemo(
    () => selections.family ? FAMILIES.find(f => f.id === selections.family) : null,
    [selections.family]
  )

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen relative"
      style={{ background: '#050403' }}
    >
      {/* ── Full-page reactive atmosphere — family + intensity driven ── */}
      <AnimatePresence>
        <motion.div
          key={selections.family || 'default'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: LUXURY }}
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
        >
          {/* Primary glow — left deep */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse 80% 60% at 15% 55%, rgba(${atm.g1},${glowOpacity}) 0%, transparent 65%)`,
          }} />
          {/* Secondary glow — right mid */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse 60% 50% at 85% 45%, rgba(${atm.g2},${glowOpacity * 0.55}) 0%, transparent 65%)`,
          }} />
          {/* Top-center ambient accent */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse 40% 30% at 50% 15%, rgba(${atm.g1},${glowOpacity * 0.35}) 0%, transparent 70%)`,
          }} />
        </motion.div>
      </AnimatePresence>

      {/* ── Smoke wisps — fixed, family-reactive ── */}
      {selections.family && SMOKE_WISPS.map(({ left, del }, i) => (
        <motion.div
          key={`${selections.family}-sw${i}`}
          className="fixed bottom-0 pointer-events-none"
          style={{ left, width: 180, height: 280, zIndex: 1 }}
          animate={{ y: [0, -70], opacity: [0, 0.065, 0], scale: [0.8, 1.45] }}
          transition={{ duration: 14, repeat: Infinity, delay: del, ease: 'easeOut' }}
        >
          <div style={{
            width: '100%', height: '100%',
            background: `radial-gradient(ellipse, rgba(${atm.smoke},0.25) 0%, transparent 70%)`,
            filter: 'blur(28px)',
          }} />
        </motion.div>
      ))}

      {/* ── Floating particles — fixed, family-reactive ── */}
      {selections.family && BUILDER_PARTICLES.map((p, i) => (
        <motion.div
          key={`${selections.family}-bp${i}`}
          className="fixed rounded-full pointer-events-none"
          style={{
            left: p.left, top: p.top,
            width: p.size, height: p.size,
            background: `rgba(${atm.p},0.70)`,
            zIndex: 1,
          }}
          animate={{ y: [0, -16, 0], opacity: [0, 0.30, 0], scale: [1, 1.8, 1] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.del, ease: 'easeInOut' }}
        />
      ))}

      {/* ── Content (above atmosphere) ── */}
      <div className="relative" style={{ zIndex: 2 }}>
        <div ref={heroRef}>
          <FragranceBuilderHero />
        </div>

        <StepIndicator currentStep={step} isSticky={tabsSticky} />

        {/* Builder area */}
        <div className="cx py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_330px] gap-12 lg:gap-14 items-start">

            {/* ── Left ── */}
            <div>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  {step === 1 && <Step1Family {...stepProps} />}
                  {step === 2 && <Step2Notes  {...stepProps} />}
                  {step === 3 && <Step3Intensity {...stepProps} />}
                  {step === 4 && <Step4Name  {...stepProps} />}
                  {step === 5 && <Step5Enquiry {...stepProps} />}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              {step < TOTAL_STEPS && (
                <div className="flex items-center gap-4 mt-12">
                  {step > 1 && (
                    <button
                      onClick={goBack}
                      className="flex items-center gap-2 transition-colors duration-300"
                      style={{
                        fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase',
                        color: 'rgba(245,240,232,0.22)', padding: '15px 0',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = 'rgba(245,240,232,0.50)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,240,232,0.22)'}
                    >
                      <ArrowLeft size={11} strokeWidth={1.5} />
                      Back
                    </button>
                  )}

                  {/* Continue button — shimmer sweep on hover */}
                  <motion.button
                    onClick={goNext}
                    disabled={!canGo}
                    initial="rest"
                    whileHover={canGo ? 'hover' : 'rest'}
                    whileTap={canGo ? { scale: 0.98 } : {}}
                    variants={{
                      rest: { y: 0 },
                      hover: { y: -2, transition: { duration: 0.3, ease: LUXURY } },
                    }}
                    className="ml-auto relative overflow-hidden flex items-center gap-3 transition-all duration-500"
                    style={{
                      padding: '15px 44px',
                      fontSize: '10px', letterSpacing: '0.38em', textTransform: 'uppercase', fontWeight: 300,
                      backdropFilter: canGo ? 'blur(10px)' : 'none',
                      WebkitBackdropFilter: canGo ? 'blur(10px)' : 'none',
                      background: canGo ? `rgba(${atm.p},0.10)` : 'rgba(176,141,87,0.03)',
                      border: `1px solid ${canGo ? `rgba(${atm.p},0.48)` : 'rgba(176,141,87,0.09)'}`,
                      color: canGo ? `rgba(${atm.p},1.0)` : 'rgba(245,240,232,0.14)',
                      cursor: canGo ? 'pointer' : 'not-allowed',
                      boxShadow: canGo
                        ? `0 0 28px rgba(${atm.p},0.14), inset 0 0 14px rgba(${atm.p},0.05)`
                        : 'none',
                    }}
                  >
                    {/* Shimmer sweep */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      variants={{
                        rest: { x: '-110%' },
                        hover: { x: '110%', transition: { duration: 0.65, ease: 'easeInOut' } },
                      }}
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)' }}
                    />
                    <span className="relative z-10">
                      {step === TOTAL_STEPS - 1 ? 'Review & Enquire' : 'Continue'}
                    </span>
                    <ArrowRight size={11} strokeWidth={1.5} className="relative z-10" />
                  </motion.button>
                </div>
              )}

              {step === TOTAL_STEPS && (
                <button
                  onClick={goBack}
                  className="flex items-center gap-2 mt-8 transition-colors duration-300"
                  style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.18)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'rgba(245,240,232,0.42)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,240,232,0.18)'}
                >
                  <ArrowLeft size={11} strokeWidth={1.5} />
                  Edit Selections
                </button>
              )}
            </div>

            {/* ── Right: Bottle preview ── */}
            <div className="hidden md:block">
              <div className="sticky top-40">
                <motion.div
                  className="relative overflow-hidden"
                  style={{
                    border: '1px solid rgba(176,141,87,0.05)',
                    background: 'rgba(6,5,3,0.80)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                  }}
                  animate={{
                    boxShadow: previewFam
                      ? `0 0 60px ${previewFam.glowColor}, 0 0 120px ${previewFam.glowColor}`
                      : '0 0 0 transparent',
                  }}
                  transition={{ duration: 1.0, ease: LUXURY }}
                >
                  {/* Intensity-reactive ambient inside panel */}
                  <AnimatePresence>
                    {previewFam && (
                      <motion.div
                        key={`${previewFam.id}-${Math.round(intensityFactor * 4)}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.55 + intensityFactor * 0.9 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.9 }}
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: `radial-gradient(ellipse at 50% 90%, ${previewFam.glowColor} 0%, transparent 60%)`,
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Top-right particle hint */}
                  {previewFam && (
                    <motion.div
                      className="absolute top-4 right-4 pointer-events-none"
                      animate={{ opacity: [0.15, 0.35, 0.15] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      style={{
                        width: '40px', height: '40px',
                        background: `radial-gradient(circle, ${previewFam.glowColor} 0%, transparent 70%)`,
                        filter: 'blur(8px)',
                      }}
                    />
                  )}

                  <div className="relative z-10 p-5">
                    <p className="text-[8px] tracking-[0.45em] uppercase text-center mb-1"
                      style={{ color: 'rgba(176,141,87,0.25)' }}>
                      Your Fragrance
                    </p>
                    <BottlePreview selections={selections} />
                  </div>

                  <div className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: 'linear-gradient(to right, transparent, rgba(176,141,87,0.12), transparent)' }} />
                </motion.div>

                {/* Gradient bridge from preview panel to left content */}
                {previewFam && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2 }}
                    className="absolute top-0 -left-8 w-8 h-full pointer-events-none"
                    style={{
                      background: `linear-gradient(to right, transparent, ${previewFam.glowColor})`,
                      opacity: 0.3,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Craftsmanship strip ── */}
        <div
          className="relative overflow-hidden py-16"
          style={{
            borderTop: '1px solid rgba(176,141,87,0.05)',
            background: 'rgba(7,5,3,0.55)',
          }}
        >
          {/* Atmospheric continuation from builder */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: `radial-gradient(ellipse 80% 100% at 50% 50%, rgba(${atm.g1},0.05) 0%, transparent 70%)`,
          }} />
          {/* Top fade continuation */}
          <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none" style={{
            background: 'linear-gradient(to bottom, rgba(5,4,3,0.40), transparent)',
          }} />

          <div className="cx relative z-10">
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px flex-1 max-w-[100px]"
                style={{ background: 'linear-gradient(to right, transparent, rgba(176,141,87,0.18))' }} />
              <span style={{ color: 'rgba(176,141,87,0.30)', fontSize: '8px' }}>✦</span>
              <div className="h-px flex-1 max-w-[100px]"
                style={{ background: 'linear-gradient(to left, transparent, rgba(176,141,87,0.18))' }} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6">
              {PILLARS.map(({ symbol, title, sub }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: LUXURY }}
                  className="flex flex-col items-center text-center gap-3"
                >
                  <span style={{ color: 'rgba(176,141,87,0.30)', fontSize: '16px' }}>{symbol}</span>
                  <p className="text-[10px] tracking-[0.4em] uppercase font-light"
                    style={{ color: 'rgba(245,240,232,0.52)' }}>
                    {title}
                  </p>
                  <p className="text-[11px] font-light leading-relaxed"
                    style={{ color: 'rgba(245,240,232,0.26)' }}>
                    {sub}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5, ease: LUXURY }}
              className="text-center mt-12 font-heading italic"
              style={{ color: 'rgba(245,240,232,0.20)', fontSize: '1.05rem', letterSpacing: '0.01em' }}
            >
              Every drop carries your story.
            </motion.p>
          </div>
        </div>

        {/* Mobile compact preview */}
        <div className="md:hidden sticky bottom-0 z-20">
          <BottlePreview selections={selections} compact />
        </div>

        {/* Atmospheric bridge to footer */}
        <div className="h-24 pointer-events-none" style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(5,4,3,0.70) 60%, rgba(5,4,3,0.98) 100%)',
        }} />
      </div>
    </motion.main>
  )
}
