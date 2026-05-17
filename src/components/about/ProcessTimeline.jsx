import { useGSAPReveal, useGSAPStaggerReveal } from '../../hooks/useGSAPReveal'

const STEPS = [
  {
    num: '١',
    label: 'Consultation',
    desc: 'Share your vision, mood, and preferences. We listen deeply.',
  },
  {
    num: '٢',
    label: 'Sourcing',
    desc: 'We hand-select the finest raw ingredients from trusted origins.',
  },
  {
    num: '٣',
    label: 'Blending',
    desc: 'Our master perfumer crafts your unique formula with care.',
  },
  {
    num: '٤',
    label: 'Delivery',
    desc: 'Hand-packed and shipped free anywhere across India.',
  },
]

export default function ProcessTimeline() {
  const headRef = useGSAPReveal({ from: { opacity: 0, y: 30 }, to: { opacity: 1, y: 0 } })
  const stepsRef = useGSAPStaggerReveal({
    selector: '[data-reveal]',
    from: { opacity: 0, y: 30 },
    to:   { opacity: 1, y: 0 },
    stagger: 0.18,
    start: 'top 78%',
  })

  return (
    <section
      className="py-24 md:py-32 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #0d0805 50%, #0A0A0A 100%)' }}
    >
      {/* Section container */}
      <div className="cx">

        {/* Header */}
        <div ref={headRef} className="text-center mb-16 md:mb-20">
          <p className="text-[10px] tracking-[0.5em] uppercase text-gold-400/50 mb-3">The Process</p>
          <h2 className="font-heading text-4xl md:text-6xl text-ivory mb-3">How We Craft</h2>
          <p className="font-heading italic text-ivory/30 text-lg">From vision to vial.</p>
        </div>

        {/* Desktop: horizontal timeline */}
        <div ref={stepsRef} className="hidden md:block relative">
          {/* Connecting line */}
          <div
            className="absolute top-8 left-[12.5%] right-[12.5%] h-px"
            style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.25), rgba(201,168,76,0.25), transparent)' }}
          />

          <div className="grid grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <div key={i} data-reveal className="flex flex-col items-center text-center gap-4">
                {/* Circle */}
                <div
                  className="relative w-16 h-16 rounded-full border flex items-center justify-center z-10"
                  style={{
                    background: '#0A0A0A',
                    borderColor: 'rgba(201,168,76,0.3)',
                    boxShadow: '0 0 20px rgba(201,168,76,0.08)',
                  }}
                >
                  <span className="font-heading text-xl text-gold-400/70">{step.num}</span>
                </div>

                {/* Step number label */}
                <div className="flex flex-col items-center gap-1.5">
                  <p className="text-[9px] tracking-[0.4em] uppercase text-gold-400/35">
                    Step {String(i + 1).padStart(2, '0')}
                  </p>
                  <h4 className="font-heading text-xl text-ivory">{step.label}</h4>
                  <div className="h-px w-8 bg-gold-400/20" />
                  <p className="text-ivory/35 text-xs leading-relaxed font-light max-w-[180px]">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden flex flex-col gap-0">
          {STEPS.map((step, i) => (
            <div key={i} className="flex gap-6 relative">
              {/* Vertical line */}
              {i < STEPS.length - 1 && (
                <div
                  className="absolute left-6 top-14 bottom-0 w-px"
                  style={{ background: 'rgba(201,168,76,0.12)' }}
                />
              )}

              {/* Circle */}
              <div className="flex-shrink-0">
                <div
                  className="w-12 h-12 rounded-full border flex items-center justify-center"
                  style={{ borderColor: 'rgba(201,168,76,0.3)', background: '#0A0A0A' }}
                >
                  <span className="font-heading text-lg text-gold-400/70">{step.num}</span>
                </div>
              </div>

              {/* Content */}
              <div className="pb-10">
                <p className="text-[9px] tracking-[0.35em] uppercase text-gold-400/35 mb-1">
                  Step {String(i + 1).padStart(2, '0')}
                </p>
                <h4 className="font-heading text-xl text-ivory mb-2">{step.label}</h4>
                <p className="text-ivory/35 text-sm leading-relaxed font-light">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
