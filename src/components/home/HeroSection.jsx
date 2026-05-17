import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import Button from '../ui/Button'

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

function SmokeParticle({ x, delay, duration }) {
  return (
    <motion.div
      className="absolute pointer-events-none rounded-full"
      style={{
        width: 20,
        height: 20,
        background: 'radial-gradient(circle, rgba(201,168,76,0.35) 0%, transparent 70%)',
        filter: 'blur(5px)',
        left: `${x}px`,
        top: 0,
      }}
      animate={{
        y: [0, -60, -110],
        opacity: [0, 0.7, 0],
        scale: [0.3, 1.8, 3],
      }}
      transition={{ duration, repeat: Infinity, delay, ease: 'easeOut', times: [0, 0.45, 1] }}
    />
  )
}

function PerfumeBottle() {
  const floatRef = useRef(null)

  useEffect(() => {
    if (!floatRef.current) return
    gsap.to(floatRef.current, { y: -14, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut' })
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.3, delay: 0.9, ease: [0.76, 0, 0.24, 1] }}
      className="relative flex items-center justify-center select-none"
    >
      {/* Outer ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 320, height: 420,
          background: 'radial-gradient(ellipse 60% 70% at 50% 55%, rgba(201,168,76,0.13) 0%, transparent 70%)',
          filter: 'blur(24px)',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div ref={floatRef} className="relative">

        {/* Smoke above nozzle */}
        <div className="absolute" style={{ top: 4, left: '50%' }}>
          <SmokeParticle x={-14} delay={0}    duration={2.4} />
          <SmokeParticle x={8}   delay={0.65} duration={2.1} />
          <SmokeParticle x={-2}  delay={1.3}  duration={2.9} />
          <SmokeParticle x={18}  delay={1.9}  duration={2.5} />
          <SmokeParticle x={-22} delay={0.35} duration={2.0} />
        </div>

        {/* Bottle SVG */}
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

          {/* Spray nozzle */}
          <rect x="80" y="9"  width="7"  height="24" rx="2" fill="url(#hcapGrad)" opacity="0.75" />
          <rect x="76" y="7"  width="15" height="7"  rx="2" fill="url(#hcapGrad)" opacity="0.55" />

          {/* Cap */}
          <rect x="41" y="25" width="58" height="30" rx="5" fill="url(#hcapGrad)" />
          <rect x="43" y="27" width="54" height="13" rx="3" fill="rgba(255,255,255,0.07)" />

          {/* Neck */}
          <path d="M56 55 L56 68 L84 68 L84 55 Z" fill="rgba(201,168,76,0.1)" stroke="rgba(201,168,76,0.3)" strokeWidth="0.5" />

          {/* Body */}
          <rect x="18" y="68" width="104" height="147" rx="6" fill="rgba(8,5,3,0.9)" stroke="rgba(201,168,76,0.32)" strokeWidth="1" />

          {/* Liquid fill */}
          <rect x="19" y="148" width="102" height="66" fill="url(#hliquid)" clipPath="url(#hbodyClip)" />

          {/* Liquid surface shimmer */}
          <ellipse cx="70" cy="149" rx="49" ry="3" fill="rgba(201,168,76,0.07)" />

          {/* Glass highlights */}
          <rect x="18" y="68" width="10" height="147" rx="6 0 0 6" fill="url(#hglassL)" />
          <rect x="112" y="68" width="10" height="147" rx="0 6 6 0" fill="url(#hglassR)" />

          {/* Label border */}
          <rect x="28" y="82" width="84" height="103" rx="2" fill="rgba(201,168,76,0.015)" stroke="rgba(201,168,76,0.14)" strokeWidth="0.6" />

          {/* Label corner brackets */}
          <path d="M28 93 L28 82 L39 82"   stroke="rgba(201,168,76,0.55)" strokeWidth="1" fill="none" />
          <path d="M101 82 L112 82 L112 93" stroke="rgba(201,168,76,0.55)" strokeWidth="1" fill="none" />
          <path d="M28 174 L28 185 L39 185"  stroke="rgba(201,168,76,0.55)" strokeWidth="1" fill="none" />
          <path d="M101 185 L112 185 L112 174" stroke="rgba(201,168,76,0.55)" strokeWidth="1" fill="none" />

          {/* Label dividers */}
          <line x1="33" y1="97"  x2="107" y2="97"  stroke="rgba(201,168,76,0.1)" strokeWidth="0.5" />
          <line x1="33" y1="178" x2="107" y2="178" stroke="rgba(201,168,76,0.1)" strokeWidth="0.5" />

          {/* Brand name */}
          <text x="70" y="113" textAnchor="middle" fill="rgba(201,168,76,0.5)" fontSize="5.5" letterSpacing="2.5" fontFamily="Inter, sans-serif">m_m_attarwala</text>

          {/* Arabic م */}
          <text x="70" y="157" textAnchor="middle" fill="rgba(201,168,76,0.18)" fontSize="40" fontFamily="Georgia, serif">م</text>

          {/* Diamond ornament below Arabic */}
          <path d="M70 168 L73 172 L70 176 L67 172 Z" fill="none" stroke="rgba(201,168,76,0.35)" strokeWidth="0.6" />

          {/* Base */}
          <rect x="11" y="213" width="118" height="11" rx="5.5" fill="url(#hbaseGrad)" />
          <rect x="18" y="214" width="104" height="7"  rx="3.5" fill="rgba(201,168,76,0.06)" />
        </svg>

        {/* Floating gold sparkles */}
        {[
          { left: '8%',  top: '18%', dur: 2.6, del: 0 },
          { left: '88%', top: '28%', dur: 3.1, del: 0.5 },
          { left: '5%',  top: '55%', dur: 2.2, del: 1.1 },
          { left: '92%', top: '62%', dur: 2.9, del: 0.8 },
          { left: '14%', top: '80%', dur: 3.4, del: 0.3 },
          { left: '82%', top: '76%', dur: 2.4, del: 1.4 },
        ].map(({ left, top, dur, del }, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gold-400 pointer-events-none"
            style={{ left, top }}
            animate={{ opacity: [0.15, 0.7, 0.15], scale: [1, 1.6, 1], y: [0, -6, 0] }}
            transition={{ duration: dur, repeat: Infinity, delay: del, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Ground reflection */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 120, height: 20,
          background: 'radial-gradient(ellipse, rgba(201,168,76,0.18) 0%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />
    </motion.div>
  )
}

export default function HeroSection() {
  const orb1Ref = useRef(null)
  const orb2Ref = useRef(null)
  const orb3Ref = useRef(null)

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

    const factors = [0.018, -0.012, 0.022]
    const xTo = orbs.map((orb, i) => orb ? gsap.quickTo(orb, 'x', { duration: 1.2 + i * 0.4, ease: 'power2.out' }) : null)
    const yTo = orbs.map((orb, i) => orb ? gsap.quickTo(orb, 'y', { duration: 1.2 + i * 0.4, ease: 'power2.out' }) : null)

    const onMove = (e) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      factors.forEach((f, i) => {
        xTo[i]?.((e.clientX - cx) * f)
        yTo[i]?.((e.clientY - cy) * f)
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

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

      {/* Split layout — cx class handles max-width + centering */}
      <div className="cx relative z-10 grid grid-cols-1 lg:grid-cols-[55%_45%] items-center min-h-screen pt-28 pb-20 gap-8 lg:gap-4">

        {/* LEFT: Typography — centered on mobile, left-aligned on desktop */}
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-6 lg:gap-7 items-center lg:items-start text-center lg:text-left">

          <motion.p variants={item} className="text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-gold-400/60">
            Est. in India &nbsp;·&nbsp; Crafted With Love
          </motion.p>

          <div>
            <div className="overflow-hidden">
              <motion.h1
                variants={lineReveal}
                className="font-heading italic text-[64px] md:text-[88px] lg:text-[96px] xl:text-[116px] text-ivory leading-none tracking-tight"
                style={{ fontWeight: 300 }}
              >
                Crafted
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                variants={lineReveal}
                className="font-heading text-[64px] md:text-[88px] lg:text-[96px] xl:text-[116px] leading-none tracking-tight text-gold-gradient"
                style={{ fontWeight: 400 }}
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

          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to="/collections"><Button variant="primary" size="lg">Explore Collection</Button></Link>
            <Link to="/custom-fragrance"><Button variant="outline" size="lg">Craft Yours</Button></Link>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={item} className="flex gap-8 pt-6 border-t border-gold-400/10 mt-1 justify-center lg:justify-start">
            {[['500+', 'Blends Created'], ['100%', 'Custom Made'], ['Free', 'Delivery India']].map(([num, label]) => (
              <div key={label}>
                <p className="font-heading text-xl md:text-2xl text-gold-300">{num}</p>
                <p className="text-[9px] tracking-[0.3em] uppercase text-ivory/30 mt-1">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT: Bottle visual */}
        <div className="hidden lg:flex items-center justify-center relative">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 65% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)' }} />
          <PerfumeBottle />
        </div>
      </div>

      {/* Scroll indicator — left-aligned to match text column */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
        className="absolute bottom-8 flex flex-col items-start gap-2 text-ivory/30"
        style={{ left: 'clamp(24px, calc(50% - 640px + 48px), 48px)' }}
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
