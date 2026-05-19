import { motion } from 'framer-motion'
import { useGSAPReveal } from '../../hooks/useGSAPReveal'

const BLOCKS = [
  {
    num: '01',
    title: 'The Beginning',
    side: 'left',
    body: [
      'It started simply — a love for attars collected from markets in old Delhi, Lucknow, and the lanes of Hyderabad. Each bottle held a memory, a mood, a moment.',
      'What began as a personal obsession grew into a question: why can\'t everyone have a fragrance made just for them? That question became M. M. Attarwala.',
    ],
    ornament: 'ring',
  },
  {
    num: '02',
    title: 'The Craft',
    side: 'right',
    body: [
      'We source our raw materials from trusted farms and distilleries — oud from Assam and Cambodia, rose from Kannauj, sandalwood from Mysore. Only the finest, always natural.',
      'Every blend is created by hand using traditional methods passed down through generations of Indian perfumers. No machines. No mass production. Just craft.',
    ],
    ornament: 'arabesque',
  },
  {
    num: '03',
    title: 'The Promise',
    side: 'left',
    body: [
      'Every bottle of M. M. Attarwala is made fresh for you — not sitting on a shelf, not batch-produced. Your vision, our craft, delivered free across India.',
      'We believe luxury fragrance shouldn\'t be a privilege. It should be personal. That\'s the promise we make with every order.',
    ],
    ornament: 'diamond',
  },
]

/* Decorative SVG ornaments per block */
function Ornament({ type }) {
  if (type === 'ring') {
    return (
      <div className="relative w-48 h-48 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border border-dashed border-gold-400/10"
        />
        <div className="w-32 h-32 rounded-full border border-gold-400/8 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border border-gold-400/12 flex items-center justify-center">
            <span className="text-gold-400/20 font-heading text-3xl italic">م</span>
          </div>
        </div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute w-44 h-44 rounded-full border border-gold-400/5"
          style={{ borderStyle: 'dashed', borderDasharray: '4 8' }}
        />
      </div>
    )
  }

  if (type === 'arabesque') {
    return (
      <svg width="180" height="180" viewBox="0 0 180 180" fill="none" className="opacity-15">
        <path d="M90 10 L170 90 L90 170 L10 90 Z" stroke="#C9A84C" strokeWidth="0.6" fill="none" />
        <path d="M90 30 L150 90 L90 150 L30 90 Z" stroke="#C9A84C" strokeWidth="0.4" fill="none" />
        <path d="M90 50 L130 90 L90 130 L50 90 Z" stroke="#C9A84C" strokeWidth="0.3" fill="none" />
        <circle cx="90" cy="90" r="6" fill="none" stroke="#C9A84C" strokeWidth="0.5" />
        <circle cx="90" cy="90" r="2" fill="#C9A84C" opacity="0.4" />
        {[0, 90, 180, 270].map((deg, i) => (
          <circle
            key={i}
            cx={90 + Math.cos((deg * Math.PI) / 180) * 80}
            cy={90 + Math.sin((deg * Math.PI) / 180) * 80}
            r="3"
            fill="#C9A84C"
            opacity="0.25"
          />
        ))}
      </svg>
    )
  }

  /* diamond */
  return (
    <div className="flex flex-col items-center gap-4">
      {[60, 40, 20].map((size, i) => (
        <div
          key={i}
          style={{
            width: size,
            height: size,
            border: '1px solid rgba(201,168,76,0.15)',
            transform: 'rotate(45deg)',
            opacity: 1 - i * 0.25,
          }}
        />
      ))}
    </div>
  )
}

function StoryBlock({ block, index }) {
  const isLeft = block.side === 'left'

  const contentRef = useGSAPReveal({
    from: { opacity: 0, x: isLeft ? -60 : 60 },
    to:   { opacity: 1, x: 0 },
    duration: 0.9,
    ease: 'power3.out',
    start: 'top 82%',
  })

  const ornRef = useGSAPReveal({
    from: { opacity: 0, scale: 0.85 },
    to:   { opacity: 1, scale: 1 },
    duration: 1,
    ease: 'power2.out',
    delay: 0.2,
    start: 'top 82%',
  })

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center ${index > 0 ? 'pt-20 md:pt-28' : ''}`}>

      {/* Content — conditionally ordered */}
      <div ref={contentRef} className={isLeft ? 'md:order-1' : 'md:order-2'}>
        {/* Large background number */}
        <div className="relative">
          <span
            className="absolute -top-8 -left-4 font-heading text-8xl md:text-9xl select-none pointer-events-none"
            style={{ color: 'rgba(201,168,76,0.04)', fontWeight: 700, lineHeight: 1 }}
          >
            {block.num}
          </span>
          <div className="relative z-10">
            <p className="text-[9px] tracking-[0.45em] uppercase mb-3" style={{ color: 'rgba(201,168,76,0.75)' }}>{block.num}</p>
            <h3 className="font-heading text-3xl md:text-4xl mb-6" style={{ color: 'rgba(255,248,240,0.92)' }}>{block.title}</h3>
            <div className="h-px w-12 mb-6" style={{ background: 'rgba(201,168,76,0.28)' }} />
            {block.body.map((para, i) => (
              <p key={i} className="text-sm md:text-base leading-relaxed font-light mb-4 last:mb-0" style={{ color: 'rgba(255,252,245,0.85)' }}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Ornament */}
      <div
        ref={ornRef}
        className={`hidden md:flex items-center justify-center ${isLeft ? 'md:order-2' : 'md:order-1'}`}
      >
        <Ornament type={block.ornament} />
      </div>
    </div>
  )
}

export default function OurStory() {
  const headRef = useGSAPReveal({ from: { opacity: 0, y: 30 }, to: { opacity: 1, y: 0 } })

  return (
    <section className="py-24 md:py-36"><div className="cx">
      <div ref={headRef} className="mb-16 md:mb-24">
        <p className="text-[10px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(201,168,76,0.82)' }}>Our Journey</p>
        <h2 className="font-heading text-4xl md:text-6xl" style={{ color: 'rgba(255,248,240,0.92)' }}>The Story Behind</h2>
      </div>

      <div className="flex flex-col divide-y divide-gold-400/6">
        {BLOCKS.map((block, i) => (
          <div key={block.num} className={i > 0 ? 'pt-20 md:pt-28' : ''}>
            <StoryBlock block={block} index={i} />
          </div>
        ))}
      </div>
    </div></section>
  )
}
