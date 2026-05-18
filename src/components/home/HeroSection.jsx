import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } },
}
const lineReveal = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  show: { clipPath: 'inset(0 0% 0 0)', transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } },
}

function ArabesqueCorner({ flip = false }) {
  return (
    <svg width="180" height="180" viewBox="0 0 180 180" fill="none" className={`opacity-[0.06] ${flip ? 'scale-x-[-1]' : ''}`}>
      <path d="M10 10 Q90 10 90 90 Q90 170 170 170" stroke="#E2C27D" strokeWidth="0.8" fill="none" />
      <path d="M10 30 Q70 30 70 90 Q70 150 130 170" stroke="#C9A84C" strokeWidth="0.5" fill="none" />
      <circle cx="10" cy="10" r="3" fill="#C9A84C" opacity="0.4" />
      <circle cx="170" cy="170" r="3" fill="#C9A84C" opacity="0.4" />
      <path d="M30 10 Q30 50 60 60 Q90 70 90 110 Q90 140 120 150" stroke="#E2C27D" strokeWidth="0.3" fill="none" opacity="0.5" />
    </svg>
  )
}

function BottleSVG() {
  return (
    <svg width="220" height="370" viewBox="0 0 140 235" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hcapGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#E2C27D" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#8A6D1E" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="hglassL" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="white" stopOpacity="0.08" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hglassR" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="white" stopOpacity="0.035" />
        </linearGradient>
        <linearGradient id="hliquid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(130,65,10,0)"    />
          <stop offset="25%"  stopColor="rgba(130,65,10,0.28)" />
          <stop offset="100%" stopColor="rgba(55,22,4,0.55)"   />
        </linearGradient>
        <linearGradient id="hbaseGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(201,168,76,0.35)" />
          <stop offset="100%" stopColor="rgba(168,134,46,0.08)" />
        </linearGradient>
        <clipPath id="hbodyClip">
          <rect x="18" y="68" width="104" height="147" rx="6" />
        </clipPath>
      </defs>
      <rect x="80" y="9"  width="7"  height="24" rx="2" fill="url(#hcapGrad)" opacity="0.75" />
      <rect x="76" y="7"  width="15" height="7"  rx="2" fill="url(#hcapGrad)" opacity="0.55" />
      <rect x="41" y="25" width="58" height="30" rx="5" fill="url(#hcapGrad)" />
      <rect x="43" y="27" width="54" height="13" rx="3" fill="rgba(255,255,255,0.07)" />
      <path d="M56 55 L56 68 L84 68 L84 55 Z" fill="rgba(201,168,76,0.1)" stroke="rgba(201,168,76,0.3)" strokeWidth="0.5" />
      <rect x="18" y="68" width="104" height="147" rx="6" fill="rgba(8,5,3,0.9)" stroke="rgba(201,168,76,0.32)" strokeWidth="1" />
      <rect x="19" y="148" width="102" height="66" fill="url(#hliquid)" clipPath="url(#hbodyClip)" />
      <ellipse cx="70" cy="149" rx="49" ry="3" fill="rgba(201,168,76,0.07)" />
      <rect x="18" y="68" width="10" height="147" rx="6 0 0 6" fill="url(#hglassL)" />
      <rect x="112" y="68" width="10" height="147" rx="0 6 6 0" fill="url(#hglassR)" />
      <rect x="28" y="82" width="84" height="103" rx="2" fill="rgba(201,168,76,0.015)" stroke="rgba(201,168,76,0.14)" strokeWidth="0.6" />
      <path d="M28 93 L28 82 L39 82"    stroke="rgba(201,168,76,0.55)" strokeWidth="1" fill="none" />
      <path d="M101 82 L112 82 L112 93"  stroke="rgba(201,168,76,0.55)" strokeWidth="1" fill="none" />
      <path d="M28 174 L28 185 L39 185"  stroke="rgba(201,168,76,0.55)" strokeWidth="1" fill="none" />
      <path d="M101 185 L112 185 L112 174" stroke="rgba(201,168,76,0.55)" strokeWidth="1" fill="none" />
      <line x1="33" y1="97"  x2="107" y2="97"  stroke="rgba(201,168,76,0.1)" strokeWidth="0.5" />
      <line x1="33" y1="178" x2="107" y2="178" stroke="rgba(201,168,76,0.1)" strokeWidth="0.5" />
      <text x="70" y="113" textAnchor="middle" fill="rgba(201,168,76,0.5)" fontSize="5.5" letterSpacing="2.5" fontFamily="Inter, sans-serif">M. M. Attarwala</text>
      <text x="70" y="157" textAnchor="middle" fill="rgba(201,168,76,0.18)" fontSize="40" fontFamily="Georgia, serif">م</text>
      <path d="M70 168 L73 172 L70 176 L67 172 Z" fill="none" stroke="rgba(201,168,76,0.35)" strokeWidth="0.6" />
      <rect x="11" y="213" width="118" height="11" rx="5.5" fill="url(#hbaseGrad)" />
      <rect x="18" y="214" width="104" height="7"  rx="3.5" fill="rgba(201,168,76,0.06)" />
    </svg>
  )
}

const DUST = [
  { x: 12, y: 22, dur: 8,  del: 0,   size: 1.5 },
  { x: 82, y: 38, dur: 10, del: 1.4, size: 1 },
  { x: 22, y: 62, dur: 7,  del: 0.6, size: 2 },
  { x: 78, y: 72, dur: 9,  del: 2.2, size: 1.5 },
  { x: 8,  y: 48, dur: 11, del: 0.9, size: 1 },
  { x: 90, y: 55, dur: 8,  del: 1.8, size: 1.5 },
  { x: 48, y: 12, dur: 9,  del: 0.4, size: 1 },
  { x: 62, y: 82, dur: 10, del: 1.6, size: 2 },
]

const SPARKLES = [
  { left: '8%',  top: '18%', dur: 3.5, del: 0 },
  { left: '88%', top: '28%', dur: 4.2, del: 0.8 },
  { left: '5%',  top: '55%', dur: 3.0, del: 1.5 },
  { left: '92%', top: '62%', dur: 4.0, del: 1.0 },
  { left: '14%', top: '80%', dur: 4.5, del: 0.4 },
  { left: '82%', top: '76%', dur: 3.2, del: 1.8 },
]

const NOZZLE_SMOKE = [
  { x: -14, del: 0,    dur: 2.4 },
  { x: 8,   del: 0.65, dur: 2.1 },
  { x: -2,  del: 1.3,  dur: 2.9 },
]

const WISPS = [
  { left: '38%', del: 0 },
  { left: '54%', del: 3.5 },
  { left: '46%', del: 7 },
]

function CinematicBottle({ springX, springY }) {
  const floatRef = useRef(null)
  const bottleX = useTransform(springX, [-1, 1], [-6, 6])
  const bottleY = useTransform(springY, [-1, 1], [-4, 4])
  const glowScale = useTransform(springX, [-1, 1], [0.95, 1.05])

  useEffect(() => {
    if (!floatRef.current) return
    gsap.to(floatRef.current, { y: -12, duration: 6.5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
  }, [])

  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center select-none">

      {/* L1: breathing ambient glow — parallax scale */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 480, height: 480,
          top: '50%', left: '50%', x: '-50%', y: '-50%',
          background: 'radial-gradient(ellipse, rgba(201,168,76,0.09) 0%, transparent 65%)',
          filter: 'blur(50px)',
          scale: glowScale,
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* L2: warm deep glow */}
      <div className="absolute pointer-events-none" style={{
        width: 300, height: 400,
        top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(ellipse, rgba(59,31,15,0.4) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} />

      {/* L3: smoke wisps */}
      {WISPS.map(({ left, del }, i) => (
        <motion.div key={i} className="absolute bottom-1/3 pointer-events-none" style={{ left, width: 140, height: 220 }}
          animate={{ y: [0, -60], opacity: [0, 0.08, 0], scale: [0.9, 1.4] }}
          transition={{ duration: 9, repeat: Infinity, delay: del, ease: 'easeOut' }}
        >
          <div style={{ width: '100%', height: '100%', background: 'radial-gradient(ellipse, rgba(201,168,76,0.15) 0%, transparent 70%)', filter: 'blur(22px)' }} />
        </motion.div>
      ))}

      {/* L4: slow gold dust */}
      {DUST.map((d, i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.size, height: d.size, background: 'rgba(201,168,76,0.7)' }}
          animate={{ y: [0, -12, 0], x: [0, 5, 0], opacity: [0, 0.4, 0] }}
          transition={{ duration: d.dur, repeat: Infinity, delay: d.del, ease: 'easeInOut' }}
        />
      ))}

      {/* L5: bottle — parallax + float */}
      <motion.div style={{ x: bottleX, y: bottleY }} className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div ref={floatRef} className="relative">
            {/* Nozzle smoke */}
            <div className="absolute" style={{ top: 4, left: '50%' }}>
              {NOZZLE_SMOKE.map((s, i) => (
                <motion.div key={i} className="absolute rounded-full pointer-events-none"
                  style={{ width: 20, height: 20, background: 'radial-gradient(circle, rgba(201,168,76,0.35) 0%, transparent 70%)', filter: 'blur(5px)', left: s.x }}
                  animate={{ y: [0, -60, -110], opacity: [0, 0.7, 0], scale: [0.3, 1.8, 3] }}
                  transition={{ duration: s.dur, repeat: Infinity, delay: s.del, ease: 'easeOut', times: [0, 0.45, 1] }}
                />
              ))}
            </div>
            <BottleSVG />
          </div>
        </motion.div>
      </motion.div>

      {/* L6: ground reflection */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ width: 180, height: 30, background: 'radial-gradient(ellipse, rgba(201,168,76,0.14) 0%, transparent 70%)', filter: 'blur(12px)' }}
      />

      {/* L7: occasional light sweep */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden z-20"
        animate={{ opacity: [0, 0, 0.6, 0] }}
        transition={{ duration: 10, repeat: Infinity, delay: 4, times: [0, 0.35, 0.5, 1] }}
      >
        <div style={{ position: 'absolute', top: '5%', left: '-30%', width: '50%', height: '90%',
          background: 'linear-gradient(105deg, transparent, rgba(255,255,255,0.025), transparent)',
          transform: 'skewX(-12deg)',
        }} />
      </motion.div>

      {/* L8: sparkles */}
      {SPARKLES.map(({ left, top, dur, del }, i) => (
        <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-gold-400 pointer-events-none"
          style={{ left, top }}
          animate={{ opacity: [0.1, 0.55, 0.1], scale: [1, 1.5, 1], y: [0, -5, 0] }}
          transition={{ duration: dur, repeat: Infinity, delay: del, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

export default function HeroSection() {
  const orb1Ref = useRef(null)
  const orb2Ref = useRef(null)
  const orb3Ref = useRef(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const springX = useSpring(rawX, { stiffness: 25, damping: 20 })
  const springY = useSpring(rawY, { stiffness: 25, damping: 20 })

  useEffect(() => {
    const orbs = [orb1Ref.current, orb2Ref.current, orb3Ref.current]
    orbs.forEach((orb, i) => {
      if (!orb) return
      gsap.to(orb, {
        x: `${(i % 2 === 0 ? 1 : -1) * (20 + i * 10)}px`,
        y: `${-15 - i * 8}px`,
        duration: 4 + i * 1.5,
        repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.8,
      })
    })

    const onMove = (e) => {
      rawX.set((e.clientX / window.innerWidth  - 0.5) * 2)
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [rawX, rawY])

  return (
    <section className="relative min-h-screen flex justify-center items-center overflow-hidden bg-black">

      {/* Ambient orbs */}
      <div ref={orb1Ref} className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div ref={orb2Ref} className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(59,31,15,0.5) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div ref={orb3Ref} className="absolute top-2/3 left-1/2 w-[300px] h-[300px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)', filter: 'blur(50px)' }} />

      {/* Arabesque corners */}
      <div className="absolute top-20 left-6 md:left-10 pointer-events-none"><ArabesqueCorner /></div>
      <div className="absolute top-20 right-6 md:right-10 pointer-events-none"><ArabesqueCorner flip /></div>

      {/* Horizontal gold lines */}
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.5, delay: 0.2, ease: [0.76, 0, 0.24, 1] }} className="absolute top-20 left-0 right-0 h-px origin-left pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)' }} />
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.5, delay: 0.4, ease: [0.76, 0, 0.24, 1] }} className="absolute bottom-24 left-0 right-0 h-px origin-right pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)' }} />

      {/* Layout */}
      <div className="cx relative z-10 grid grid-cols-1 lg:grid-cols-[55%_45%] items-center min-h-screen pt-28 pb-20 gap-8 lg:gap-4">

        {/* LEFT */}
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-6 lg:gap-7 items-center lg:items-start text-center lg:text-left">

          <motion.p variants={item} className="text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-gold-400/60">
            Est. in India &nbsp;·&nbsp; Crafted With Love
          </motion.p>

          <div>
            <div className="overflow-hidden">
              <motion.h1
                variants={lineReveal}
                className="font-heading italic text-[64px] md:text-[88px] lg:text-[96px] xl:text-[116px] text-ivory tracking-tight"
                style={{ fontWeight: 300, lineHeight: 0.92 }}
              >
                Crafted
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                variants={lineReveal}
                className="font-heading text-[64px] md:text-[88px] lg:text-[96px] xl:text-[116px] tracking-tight text-gold-gradient"
                style={{ fontWeight: 400, lineHeight: 0.92 }}
              >
                For You.
              </motion.h1>
            </div>
          </div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="h-px bg-gold-400/60"
          />

          <motion.p variants={item} className="text-ivory/50 text-sm md:text-base font-light max-w-sm leading-relaxed tracking-wide">
            Custom-made fragrances, blended from the finest attars.
            <br />
            <span className="text-gold-400/70">Free delivery across India.</span>
          </motion.p>

          {/* Premium CTAs */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to="/collections">
              <motion.span
                className="inline-flex items-center gap-3 px-8 py-4 cursor-pointer select-none"
                style={{ background: 'rgba(176,141,87,0.92)', color: '#0A0A0A' }}
                whileHover={{ background: 'rgba(201,168,76,1)', boxShadow: '0 0 32px rgba(201,168,76,0.28)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-[11px] tracking-[0.4em] uppercase font-semibold">Explore Collection</span>
                <ArrowRight size={13} strokeWidth={1.5} />
              </motion.span>
            </Link>

            <Link to="/custom-fragrance">
              <motion.span
                className="inline-flex items-center gap-3 px-8 py-4 cursor-pointer select-none"
                style={{ border: '1px solid rgba(176,141,87,0.4)', color: 'rgba(176,141,87,0.8)' }}
                whileHover={{ borderColor: 'rgba(201,168,76,0.8)', color: 'rgba(201,168,76,1)', boxShadow: '0 0 20px rgba(201,168,76,0.12)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-[11px] tracking-[0.4em] uppercase font-light">Craft Yours</span>
              </motion.span>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div variants={item} className="flex gap-8 pt-6 border-t border-gold-400/10 mt-1 justify-center lg:justify-start">
            {[['500+', 'Blends Created'], ['100%', 'Custom Made'], ['Free', 'Delivery India']].map(([num, label]) => (
              <div key={label}>
                <p className="font-heading text-xl md:text-2xl text-gold-300">{num}</p>
                <p className="text-[9px] tracking-[0.3em] uppercase text-ivory/30 mt-1">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT: cinematic bottle */}
        <div className="hidden lg:block relative" style={{ minHeight: 500 }}>
          <CinematicBottle springX={springX} springY={springY} />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ivory/30"
      >
        <span className="text-[9px] tracking-[0.4em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={16} strokeWidth={1} />
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to top, #0A0A0A, transparent)' }} />
    </section>
  )
}
