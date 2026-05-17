import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import FragranceBuilderHero from '../components/fragrance/FragranceBuilderHero'
import StepIndicator from '../components/fragrance/StepIndicator'
import BottlePreview from '../components/fragrance/BottlePreview'
import Step1Family from '../components/fragrance/steps/Step1Family'
import Step2Notes from '../components/fragrance/steps/Step2Notes'
import Step3Intensity from '../components/fragrance/steps/Step3Intensity'
import Step4Name from '../components/fragrance/steps/Step4Name'
import Step5Enquiry from '../components/fragrance/steps/Step5Enquiry'

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

/* Slide direction variants */
function makeVariants(direction) {
  return {
    enter:  { x: direction > 0 ?  40 : -40, opacity: 0 },
    center: { x: 0, opacity: 1, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
    exit:   { x: direction > 0 ? -40 :  40, opacity: 0, transition: { duration: 0.25 } },
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

  /* Detect hero out of view → sticky step indicator */
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

  /* Keyboard Enter to advance */
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
      className="min-h-screen bg-black"
    >
      <div ref={heroRef}>
        <FragranceBuilderHero />
      </div>

      <StepIndicator currentStep={step} isSticky={tabsSticky} />

      {/* Main builder area */}
      <div className="max-w-7xl mx-auto px-6 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-12 lg:gap-20 items-start">

          {/* ── Left: Step content ───────────────────────────────────────── */}
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

            {/* Navigation buttons */}
            {step < TOTAL_STEPS && (
              <div className="flex items-center gap-4 mt-10">
                {step > 1 && (
                  <button
                    onClick={goBack}
                    className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-ivory/30 hover:text-ivory/60 transition-colors duration-300"
                  >
                    <ArrowLeft size={13} strokeWidth={1.5} />
                    Back
                  </button>
                )}
                <motion.button
                  onClick={goNext}
                  disabled={!canGo}
                  whileHover={{ scale: canGo ? 1.02 : 1 }}
                  whileTap={{ scale: canGo ? 0.97 : 1 }}
                  className={[
                    'ml-auto flex items-center gap-3 px-8 py-3',
                    'text-[10px] tracking-[0.35em] uppercase font-medium transition-all duration-300',
                    canGo
                      ? 'bg-gold-400 text-black hover:bg-gold-300 shadow-[0_0_20px_rgba(201,168,76,0.25)] hover:shadow-[0_0_30px_rgba(201,168,76,0.45)]'
                      : 'bg-gold-400/20 text-ivory/20 cursor-not-allowed',
                  ].join(' ')}
                >
                  {step === TOTAL_STEPS - 1 ? 'Review & Enquire' : 'Continue'}
                  <ArrowRight size={13} strokeWidth={2} />
                </motion.button>
              </div>
            )}

            {/* Back button on Step 5 */}
            {step === TOTAL_STEPS && (
              <button
                onClick={goBack}
                className="flex items-center gap-2 mt-8 text-[10px] tracking-[0.3em] uppercase text-ivory/25 hover:text-ivory/50 transition-colors duration-300"
              >
                <ArrowLeft size={13} strokeWidth={1.5} />
                Edit Selections
              </button>
            )}
          </div>

          {/* ── Right: Bottle preview (desktop sticky) ───────────────────── */}
          <div className="hidden md:block">
            <div className="sticky top-40">
              <div
                className="border border-gold-400/10 p-6"
                style={{ background: '#111111' }}
              >
                <p className="text-[9px] tracking-[0.4em] uppercase text-gold-400/30 text-center mb-2">
                  Your Fragrance
                </p>
                <BottlePreview selections={selections} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile compact preview strip */}
      <div className="md:hidden sticky bottom-0 z-20">
        <BottlePreview selections={selections} compact />
      </div>
    </motion.main>
  )
}
