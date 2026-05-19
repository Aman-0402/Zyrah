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

/*
  ALL page-level atmosphere stays warm amber/gold — brand identity.
  Family colors live only inside cards and bottle preview.
  Subtle intensity variation: opacity scales slightly with intensity.
*/
const FAMILY_ATM = {
  oud:    { glow: '145,72,18',  particle: '201,168,76' },
  floral: { glow: '152,78,20',  particle: '201,168,76' },
  musk:   { glow: '138,68,16',  particle: '201,168,76' },
  fresh:  { glow: '130,65,15',  particle: '201,168,76' },
}
const DEFAULT_ATM = { glow: '118,58,13', particle: '176,141,87' }

const BUILDER_PARTICLES = [
  { left: '4%',  top: '25%', dur: 9,  del: 0,   size: 1.5 },
  { left: '94%', top: '32%', dur: 7,  del: 1.8, size: 1 },
  { left: '8%',  top: '68%', dur: 10, del: 3.0, size: 1 },
  { left: '92%', top: '72%', dur: 8,  del: 0.6, size: 1.5 },
  { left: '48%', top: '8%',  dur: 11, del: 2.4, size: 1 },
  { left: '22%', top: '90%', dur: 9,  del: 1.2, size: 1 },
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
  /* Keep glow subtle — luxury = restraint */
  const glowOpacity = selections.family ? (0.05 + intensityFactor * 0.06) : 0.03

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
      className="min-h-screen relative luxury-page"
    >
      {/* ── Warm amber atmospheric glow — single soft centered layer ── */}
      <AnimatePresence>
        <motion.div
          key={selections.family || 'default'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: LUXURY }}
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
        >
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse 85% 70% at 25% 50%, rgba(${atm.glow},${glowOpacity + 0.035}) 0%, transparent 70%)`,
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse 60% 55% at 78% 42%, rgba(90,24,44,${glowOpacity * 0.72 + 0.035}) 0%, transparent 70%)`,
          }} />
        </motion.div>
      </AnimatePresence>

      {/* ── Gold dust particles — sparse, barely visible ── */}
      {selections.family && BUILDER_PARTICLES.map((p, i) => (
        <motion.div
          key={`${selections.family}-bp${i}`}
          className="fixed rounded-full pointer-events-none"
          style={{
            left: p.left, top: p.top,
            width: p.size, height: p.size,
            background: `rgba(${atm.particle},0.60)`,
            zIndex: 1,
          }}
          animate={{ y: [0, -14, 0], opacity: [0, 0.22, 0], scale: [1, 1.7, 1] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.del, ease: 'easeInOut' }}
        />
      ))}

      {/* ── Content ── */}
      <div className="relative" style={{ zIndex: 2 }}>
        <div ref={heroRef}>
          <FragranceBuilderHero />
        </div>

        <StepIndicator currentStep={step} isSticky={tabsSticky} />

        {/* Builder area */}
        <div className="cx py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-12 lg:gap-14 items-start">

            {/* ── Left ── */}
            <div className="min-w-0">
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

                  {/* Continue — shimmer sweep, family-amber tinted */}
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
                      padding: '14px 44px',
                      fontSize: '10px', letterSpacing: '0.38em', textTransform: 'uppercase', fontWeight: 300,
                      backdropFilter: canGo ? 'blur(8px)' : 'none',
                      WebkitBackdropFilter: canGo ? 'blur(8px)' : 'none',
                      background: canGo ? 'rgba(176,141,87,0.09)' : 'rgba(176,141,87,0.03)',
                      border: `1px solid ${canGo ? 'rgba(176,141,87,0.45)' : 'rgba(176,141,87,0.09)'}`,
                      color: canGo ? 'rgba(201,168,76,0.95)' : 'rgba(245,240,232,0.14)',
                      cursor: canGo ? 'pointer' : 'not-allowed',
                      boxShadow: canGo ? '0 0 24px rgba(176,141,87,0.10), inset 0 0 12px rgba(176,141,87,0.04)' : 'none',
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      variants={{
                        rest: { x: '-110%' },
                        hover: { x: '110%', transition: { duration: 0.65, ease: 'easeInOut' } },
                      }}
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }}
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
                    border: '1px solid rgba(176,141,87,0.07)',
                    background: 'linear-gradient(155deg, rgba(28,16,12,0.88), rgba(11,8,7,0.90) 56%, rgba(32,12,19,0.78))',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                  }}
                  animate={{
                    boxShadow: previewFam
                      ? `0 0 50px ${previewFam.glowColor}, 0 0 100px ${previewFam.glowColor}`
                      : '0 0 0 transparent',
                  }}
                  transition={{ duration: 1.0, ease: LUXURY }}
                >
                  {/* Intensity-reactive ambient inside panel — warm amber only */}
                  <AnimatePresence>
                    {previewFam && (
                      <motion.div
                        key={previewFam.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 + intensityFactor * 0.8 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.9 }}
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: `radial-gradient(ellipse at 50% 88%, ${previewFam.glowColor} 0%, transparent 62%)`,
                        }}
                      />
                    )}
                  </AnimatePresence>

                  <div className="relative z-10 p-6">
                    <p className="text-[8px] tracking-[0.45em] uppercase text-center mb-1"
                      style={{ color: 'rgba(176,141,87,0.68)' }}>
                      Your Fragrance
                    </p>
                    <BottlePreview selections={selections} />
                  </div>

                  <div className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: 'linear-gradient(to right, transparent, rgba(176,141,87,0.14), transparent)' }} />
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile compact preview */}
        <div className="md:hidden sticky bottom-0 z-20">
          <BottlePreview selections={selections} compact />
        </div>

        {/* Atmospheric bridge to footer */}
        <div className="h-24 pointer-events-none" style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(18,10,8,0.65) 60%, rgba(10,6,6,0.98) 100%)',
        }} />
      </div>
    </motion.main>
  )
}
