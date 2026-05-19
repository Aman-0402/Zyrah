import { useState, useRef, useEffect } from 'react'
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

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
      style={{ background: '#050403' }}
    >
      <div ref={heroRef}>
        <FragranceBuilderHero />
      </div>

      <StepIndicator currentStep={step} isSticky={tabsSticky} />

      {/* Main builder area */}
      <div className="cx py-14 md:py-20 relative">

        {/* Subtle ambient glow in builder area */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 70% 50% at 30% 40%, rgba(60,30,8,0.06) 0%, transparent 70%)',
        }} />

        <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-12 lg:gap-20 items-start relative z-10">

          {/* ── Left: Step content ── */}
          <div className="relative">
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

            {/* Navigation — bigger, more prominent */}
            {step < TOTAL_STEPS && (
              <div className="flex items-center gap-4 mt-12">
                {step > 1 && (
                  <button
                    onClick={goBack}
                    className="flex items-center gap-2 transition-colors duration-300"
                    style={{
                      fontSize: '9px',
                      letterSpacing: '0.3em',
                      textTransform: 'uppercase',
                      color: 'rgba(245,240,232,0.28)',
                      padding: '14px 0',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'rgba(245,240,232,0.55)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,240,232,0.28)'}
                  >
                    <ArrowLeft size={12} strokeWidth={1.5} />
                    Back
                  </button>
                )}

                <motion.button
                  onClick={goNext}
                  disabled={!canGo}
                  whileHover={canGo ? { y: -1, boxShadow: '0 0 40px rgba(176,141,87,0.35)' } : {}}
                  whileTap={canGo ? { scale: 0.98 } : {}}
                  transition={{ duration: 0.3, ease: LUXURY }}
                  className="ml-auto flex items-center gap-3 transition-all duration-400"
                  style={{
                    padding: '14px 36px',
                    fontSize: '10px',
                    letterSpacing: '0.38em',
                    textTransform: 'uppercase',
                    fontWeight: 400,
                    background: canGo
                      ? 'rgba(176,141,87,0.12)'
                      : 'rgba(176,141,87,0.04)',
                    border: `1px solid ${canGo ? 'rgba(176,141,87,0.55)' : 'rgba(176,141,87,0.12)'}`,
                    color: canGo ? 'rgba(176,141,87,0.95)' : 'rgba(245,240,232,0.18)',
                    cursor: canGo ? 'pointer' : 'not-allowed',
                    boxShadow: canGo ? '0 0 20px rgba(176,141,87,0.12)' : 'none',
                  }}
                >
                  {step === TOTAL_STEPS - 1 ? 'Review & Enquire' : 'Continue'}
                  <ArrowRight size={12} strokeWidth={1.5} />
                </motion.button>
              </div>
            )}

            {step === TOTAL_STEPS && (
              <button
                onClick={goBack}
                className="flex items-center gap-2 mt-8 transition-colors duration-300"
                style={{
                  fontSize: '9px',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,240,232,0.22)',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(245,240,232,0.48)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,240,232,0.22)'}
              >
                <ArrowLeft size={12} strokeWidth={1.5} />
                Edit Selections
              </button>
            )}
          </div>

          {/* ── Right: Bottle preview ── */}
          <div className="hidden md:block">
            <div className="sticky top-40">
              <div
                className="relative overflow-hidden"
                style={{
                  border: '1px solid rgba(176,141,87,0.09)',
                  background: 'rgba(8,6,4,0.85)',
                }}
              >
                {/* Per-family ambient tint in preview panel */}
                <AnimatePresence>
                  {selections.family && (() => {
                    const fam = FAMILIES.find(f => f.id === selections.family)
                    return fam ? (
                      <motion.div
                        key={fam.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: `radial-gradient(ellipse at 50% 80%, ${fam.glowColor} 0%, transparent 65%)`,
                        }}
                      />
                    ) : null
                  })()}
                </AnimatePresence>

                <div className="relative z-10 p-6">
                  <p className="text-[8px] tracking-[0.45em] uppercase text-center mb-1"
                    style={{ color: 'rgba(176,141,87,0.30)' }}>
                    Your Fragrance
                  </p>
                  <BottlePreview selections={selections} />
                </div>

                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: 'linear-gradient(to right, transparent, rgba(176,141,87,0.18), transparent)' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile compact preview strip */}
      <div className="md:hidden sticky bottom-0 z-20">
        <BottlePreview selections={selections} compact />
      </div>

      {/* Atmospheric bridge before footer */}
      <div className="h-24 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, transparent 0%, rgba(5,4,3,0.70) 60%, rgba(5,4,3,0.98) 100%)',
      }} />
    </motion.main>
  )
}
