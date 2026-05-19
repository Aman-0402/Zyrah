import { NavLink, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Instagram, MessageCircle, Mail, ArrowRight, MapPin, Clock, Phone } from 'lucide-react'

const BASE = import.meta.env.BASE_URL
const WA_NUMBER = '919724586101'
const LUXURY = [0.22, 1, 0.36, 1]

const NAV_LINKS = [
  { label: 'Home',             to: '/' },
  { label: 'Collections',      to: '/collections' },
  { label: 'Custom Fragrance', to: '/custom-fragrance' },
  { label: 'About',            to: '/about' },
  { label: 'Contact',          to: '/contact' },
]

function FooterWave() {
  return (
    <svg className="w-full opacity-10 block" height="20" viewBox="0 0 1440 20"
      preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 10 Q180 0 360 10 Q540 20 720 10 Q900 0 1080 10 Q1260 20 1440 10"
        stroke="#C9A84C" strokeWidth="0.5" fill="none" />
      {[360, 720, 1080].map((cx) => (
        <circle key={cx} cx={cx} cy="10" r="1.5" fill="#C9A84C" opacity="0.3" />
      ))}
    </svg>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <>
      {/* ── Cinematic transition into footer ── */}
      <div className="h-32 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, transparent 0%, rgba(5,4,3,0.65) 55%, rgba(5,4,3,0.96) 100%)',
      }} />

      <footer className="relative overflow-hidden" style={{ background: '#050403' }}>

        {/* Atmospheric glow layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px]"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(120,58,0,0.07) 0%, transparent 65%)' }}
          />
          <div className="absolute bottom-0 left-0 w-[500px] h-[300px]"
            style={{ background: 'radial-gradient(ellipse at 0% 100%, rgba(80,35,0,0.05) 0%, transparent 65%)' }}
          />
        </div>

        {/* Arabesque wave above top line */}
        <div className="absolute top-0 left-0 right-0 -translate-y-full pointer-events-none">
          <FooterWave />
        </div>

        {/* Top gold line */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.15), transparent)' }}
        />

        {/* Brand watermark — behind everything */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span
            className="font-heading font-light text-ivory select-none whitespace-nowrap"
            style={{ fontSize: 'clamp(56px,9vw,110px)', letterSpacing: '0.5em', opacity: 0.068 }}
          >
            M. M. ATTARWALA
          </span>
        </div>

        <div className="cx relative z-10 pt-28 pb-14">

          {/* Emotional closing line */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: LUXURY }}
            className="font-heading italic text-center text-3xl md:text-4xl mb-20"
            style={{ color: 'rgba(245,240,232,0.50)', letterSpacing: '0.01em', fontWeight: 300 }}
          >
            Crafted to linger beyond memory.
          </motion.p>

          {/* 3-col grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-8 lg:gap-20 mb-16">

            {/* ── Brand col ── */}
            <div className="flex flex-col gap-6">
              <Link to="/" className="w-fit">
                <img
                  src={`${BASE}logoakatar.png`}
                  alt="M. M. Attarwala"
                  className="h-14 w-auto object-contain"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(201,168,76,0.1))', opacity: 0.88 }}
                  draggable={false}
                />
              </Link>

              <p className="text-[13px] font-light leading-[1.85] max-w-[200px]"
                style={{ color: 'rgba(245,240,232,0.60)' }}>
                Custom-made attars blended for you alone. Free delivery across India.
              </p>

              {/* Social — thin icons, no circles */}
              <div className="flex items-center gap-5">
                <a href="https://instagram.com/mm_attarwala" target="_blank" rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="transition-colors duration-500"
                  style={{ color: 'rgba(201,168,76,0.28)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'rgba(201,168,76,0.7)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(201,168,76,0.28)'}
                >
                  <Instagram size={15} strokeWidth={1} />
                </a>
                <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="transition-colors duration-500"
                  style={{ color: 'rgba(201,168,76,0.28)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'rgba(201,168,76,0.7)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(201,168,76,0.28)'}
                >
                  <MessageCircle size={15} strokeWidth={1} />
                </a>
              </div>
            </div>

            {/* ── Nav col ── */}
            <div className="flex flex-col gap-5">
              <p className="luxury-label mb-2" style={{ color: 'rgba(201,168,76,0.32)' }}>Explore</p>
              {NAV_LINKS.map(({ label, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    'text-[11px] tracking-[0.22em] uppercase font-light transition-colors duration-500 w-fit ' +
                    (isActive ? 'text-gold-400/70' : 'text-ivory/45 hover:text-ivory/80')
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>

            {/* ── Connect col ── */}
            <div className="flex flex-col gap-4">
              <p className="luxury-label mb-2" style={{ color: 'rgba(201,168,76,0.32)' }}>Connect</p>

              {/* WhatsApp — Roeesh */}
              <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-3 group w-fit">
                <MessageCircle size={13} strokeWidth={1} className="mt-0.5 flex-shrink-0 transition-colors duration-500" style={{ color: 'rgba(201,168,76,0.32)' }} />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(201,168,76,0.28)' }}>WhatsApp · M. Roeesh</span>
                  <span className="text-[11px] font-light tracking-wide transition-colors duration-500"
                    style={{ color: 'rgba(245,240,232,0.32)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'rgba(245,240,232,0.65)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,240,232,0.32)'}
                  >+91 97245 86101</span>
                </div>
              </a>

              {/* Phone — Munavvar */}
              <a href="tel:+919016361538" className="flex items-start gap-3 group w-fit">
                <Phone size={13} strokeWidth={1} className="mt-0.5 flex-shrink-0 transition-colors duration-500" style={{ color: 'rgba(201,168,76,0.32)' }} />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(201,168,76,0.28)' }}>Call · M. Munavvar</span>
                  <span className="text-[11px] font-light tracking-wide transition-colors duration-500"
                    style={{ color: 'rgba(245,240,232,0.32)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'rgba(245,240,232,0.65)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,240,232,0.32)'}
                  >+91 90163 61538</span>
                </div>
              </a>

              {/* Email */}
              <a href="mailto:mmattarwala2008@rediff.com" className="flex items-start gap-3 group w-fit">
                <Mail size={13} strokeWidth={1} className="mt-0.5 flex-shrink-0 transition-colors duration-500" style={{ color: 'rgba(201,168,76,0.32)' }} />
                <span className="text-[11px] font-light tracking-wide transition-colors duration-500"
                  style={{ color: 'rgba(245,240,232,0.32)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'rgba(245,240,232,0.65)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,240,232,0.32)'}
                >mmattarwala2008@rediff.com</span>
              </a>

              {/* Addresses */}
              <div className="flex items-start gap-3">
                <MapPin size={13} strokeWidth={1} className="mt-0.5 flex-shrink-0" style={{ color: 'rgba(201,168,76,0.32)' }} />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(201,168,76,0.28)' }}>Nazarbaug · Fortune Point</span>
                  <span className="text-[11px] font-light leading-relaxed" style={{ color: 'rgba(245,240,232,0.28)' }}>
                    Mandvi, Vadodara – 390 017
                  </span>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3">
                <Clock size={13} strokeWidth={1} className="mt-0.5 flex-shrink-0" style={{ color: 'rgba(201,168,76,0.32)' }} />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(201,168,76,0.28)' }}>Open Hours</span>
                  <span className="text-[11px] font-light leading-relaxed" style={{ color: 'rgba(245,240,232,0.28)' }}>
                    10 am – 8 pm · Mon closed<br />Fri closed 12:45–2:45 pm
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-1">
                <span style={{ color: 'rgba(201,168,76,0.28)', fontSize: '9px' }}>✦</span>
                <span className="text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(245,240,232,0.22)' }}>
                  Free Delivery India
                </span>
              </div>

              <Link to="/custom-fragrance" className="mt-2">
                <motion.span
                  className="inline-flex items-center gap-3 cursor-pointer select-none"
                  style={{ border: '1px solid rgba(176,141,87,0.28)', color: 'rgba(176,141,87,0.55)', padding: '10px 20px' }}
                  whileHover={{ borderColor: 'rgba(201,168,76,0.55)', color: 'rgba(201,168,76,0.85)', boxShadow: '0 0 16px rgba(201,168,76,0.07)' }}
                  transition={{ duration: 0.45, ease: LUXURY }}
                >
                  <span className="text-[9px] tracking-[0.45em] uppercase font-light">Craft Yours</span>
                  <ArrowRight size={11} strokeWidth={1} />
                </motion.span>
              </Link>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{ borderTop: '1px solid rgba(201,168,76,0.06)' }}>
            <p className="text-[9px] tracking-[0.35em] uppercase font-light"
              style={{ color: 'rgba(245,240,232,0.58)' }}>
              © {year} M. M. Attarwala. All rights reserved.
            </p>
            <p className="text-[9px] tracking-[0.35em] uppercase font-light"
              style={{ color: 'rgba(245,240,232,0.28)' }}>
              Made with love in India ♥
            </p>
          </div>
        </div>

        {/* Bottom fade to black */}
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.5))' }}
        />
      </footer>
    </>
  )
}
