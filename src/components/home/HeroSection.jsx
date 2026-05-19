import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

const LUXURY = [0.22, 1, 0.36, 1]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.5 } },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 1.3, ease: LUXURY } },
}
const lineReveal = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  show: { clipPath: 'inset(0 0% 0 0)', transition: { duration: 1.4, ease: LUXURY } },
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
    <svg width="260" height="430" viewBox="0 0 140 235" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    <div className="relative w-full h-full min-h-[520px] flex items-center justify-center select-none">

      {/* L1: breathing ambient glow — parallax scale */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 560, height: 560,
          top: '50%', left: '50%', x: '-50%', y: '-50%',
          background: 'radial-gradient(ellipse, rgba(201,168,76,0.11) 0%, transparent 65%)',
          filter: 'blur(50px)',
          scale: glowScale,
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* L2: warm deep glow */}
      <div className="absolute pointer-events-none" style={{
        width: 380, height: 480,
        top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(ellipse, rgba(59,31,15,0.5) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} />

      {/* Visual bridge — glow bleeds toward left text */}
      <div className="absolute pointer-events-none" style={{
        width: 300, height: 200,
        top: '50%', left: '-10%', transform: 'translateY(-50%)',
        background: 'radial-gradient(ellipse at 100% 50%, rgba(120,70,20,0.1) 0%, transparent 80%)',
        filter: 'blur(40px)',
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
    <section className="relative min-h-screen flex justify-center items-center overflow-hidden luxury-page" style={{ paddingTop: 'clamp(96px, 10vw, 130px)' }}>

      {/* Ambient orbs */}
      <div ref={orb1Ref} className="absolute top-1/4 left-1/4 w-[560px] h-[560px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.13) 0%, transparent 68%)', filter: 'blur(44px)' }} />
      <div ref={orb2Ref} className="absolute bottom-1/3 right-1/4 w-[520px] h-[520px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(80,23,41,0.34) 0%, rgba(59,31,15,0.22) 42%, transparent 72%)', filter: 'blur(62px)' }} />
      <div ref={orb3Ref} className="absolute top-2/3 left-1/2 w-[420px] h-[420px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(132,70,24,0.12) 0%, transparent 70%)', filter: 'blur(54px)' }} />
      {/* Deep amber sweep behind bottle */}
      <div className="absolute top-0 right-0 w-[760px] h-full pointer-events-none" style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(170,98,28,0.16) 0%, rgba(64,20,35,0.10) 42%, transparent 66%)', filter: 'blur(82px)' }} />

      {/* Arabesque corners */}
      <div className="absolute left-6 md:left-10 pointer-events-none" style={{ top: 'clamp(100px, 11vw, 136px)' }}><ArabesqueCorner /></div>
      <div className="absolute right-6 md:right-10 pointer-events-none" style={{ top: 'clamp(100px, 11vw, 136px)' }}><ArabesqueCorner flip /></div>

      {/* Horizontal gold lines */}
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.5, delay: 0.2, ease: [0.76, 0, 0.24, 1] }} className="absolute left-0 right-0 h-px origin-left pointer-events-none" style={{ top: 'clamp(100px, 11vw, 136px)', background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)' }} />
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.5, delay: 0.4, ease: [0.76, 0, 0.24, 1] }} className="absolute bottom-24 left-0 right-0 h-px origin-right pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)' }} />

      {/* Layout */}
      <div className="cx relative z-10 grid grid-cols-1 lg:grid-cols-[55%_45%] items-center min-h-[80vh] pt-12 md:pt-16 pb-20 gap-8 lg:gap-4">

        {/* LEFT */}
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-7 lg:gap-8 items-center lg:items-start text-center lg:text-left">

          <motion.p variants={item} className="editorial-label text-[10px] md:text-[11px] tracking-[0.22em] sm:tracking-[0.34em]">
            Est. in India &nbsp;·&nbsp; Crafted With Love
          </motion.p>

          <div>
            <div className="overflow-hidden">
              <motion.h1
                variants={lineReveal}
                className="luxury-hero italic text-[52px] sm:text-[72px] md:text-[96px] lg:text-[106px] xl:text-[130px] text-ivory"
              >
                Crafted
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                variants={lineReveal}
                className="luxury-hero text-[52px] sm:text-[72px] md:text-[96px] lg:text-[106px] xl:text-[130px] text-gold-gradient"
                style={{ fontWeight: 400 }}
              >
                For You.
              </motion.h1>
            </div>
          </div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1.4, delay: 1.4, ease: LUXURY }}
            className="h-px bg-gold-400/60"
          />

          <motion.p variants={item} className="editorial-copy tracking-[0.01em]" style={{ maxWidth: 460 }}>
            Custom-made fragrances, blended from the finest attars.
            <br />
            <span className="gold-soft">Blended fresh, crafted only for you.</span>
          </motion.p>

          {/* Premium CTAs */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to="/collections">
              <motion.span
                className="inline-flex items-center gap-3 cursor-pointer select-none"
                style={{ background: 'rgba(176,141,87,0.92)', color: '#0A0A0A', padding: '13px 28px', border: '1px solid rgba(176,141,87,0.25)' }}
                whileHover={{ background: 'rgba(201,168,76,1)', boxShadow: '0 0 36px rgba(201,168,76,0.3)', y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-[11px] tracking-[0.3em] uppercase font-semibold">Explore Collection</span>
                <ArrowRight size={13} strokeWidth={1.5} />
              </motion.span>
            </Link>

            <Link to="/custom-fragrance">
              <motion.span
                className="inline-flex items-center gap-3 cursor-pointer select-none"
                style={{ border: '1px solid rgba(176,141,87,0.25)', color: 'rgba(176,141,87,0.8)', padding: '13px 28px', background: 'rgba(176,141,87,0.04)' }}
                whileHover={{ borderColor: 'rgba(201,168,76,0.7)', color: 'rgba(201,168,76,1)', boxShadow: '0 0 22px rgba(201,168,76,0.12)', background: 'rgba(201,168,76,0.08)', y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-[11px] tracking-[0.3em] uppercase font-medium">Craft Yours</span>
              </motion.span>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div variants={item} className="relative grid w-full max-w-[380px] grid-cols-2 gap-x-8 border-t border-gold-400/10 pt-6 mt-1 sm:w-auto sm:min-w-[360px] sm:gap-x-12">
            <div className="flex min-w-0 flex-col items-center gap-2 px-2 lg:items-start">
              <p className="font-heading text-[26px] md:text-[30px] text-gold-300 leading-none">500+</p>
              <p className="editorial-label text-center !text-[10px] tracking-[0.18em] sm:tracking-[0.22em] leading-relaxed lg:text-left">Blends Created</p>
            </div>
            <div className="absolute bottom-1 top-6 left-1/2 w-px -translate-x-1/2" style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.24), transparent)' }} />
            <div className="flex min-w-0 flex-col items-center gap-2 px-2 lg:items-start">
              <p className="font-heading text-[26px] md:text-[30px] text-gold-300 leading-none">100%</p>
              <p className="editorial-label text-center !text-[10px] tracking-[0.18em] sm:tracking-[0.22em] leading-relaxed lg:text-left">Custom Made</p>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT: cinematic bottle */}
        <div className="hidden lg:block relative" style={{ minHeight: 500 }}>
          <CinematicBottle springX={springX} springY={springY} />
        </div>
      </div>

{/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none" style={{ background: 'linear-gradient(to top, #100908, rgba(16,9,8,0.72), transparent)' }} />
    </section>
  )
}
