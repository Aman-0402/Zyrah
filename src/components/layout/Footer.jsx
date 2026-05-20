import { NavLink, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Instagram, Facebook, MessageCircle, Mail, ArrowRight, MapPin, Clock, Phone } from 'lucide-react'

const BASE = import.meta.env.BASE_URL
const WA_NUMBER = '919724586101'
const LUXURY = [0.22, 1, 0.36, 1]

/* Warm ivory text scale — luxury ≠ low contrast */
const T = {
  quote:   'rgba(255,252,245,0.97)',
  body:    'rgba(245,241,234,0.92)',
  contact: 'rgba(236,230,220,0.90)',
  address: 'rgba(236,230,220,0.86)',
  faint:   'rgba(236,230,220,0.78)',
  gold:    'rgba(226,194,125,0.95)',
  goldDim: 'rgba(200,169,107,0.86)',
}

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
      {/* Cinematic transition into footer */}
      <div className="h-32 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, transparent 0%, rgba(20,11,9,0.66) 55%, rgba(10,6,6,0.96) 100%)',
      }} />

      <footer className="relative overflow-hidden luxury-section luxury-section-alt luxury-divider-glow" style={{ background: '#050302' }}>

        {/* Atmospheric glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px]"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(180,104,32,0.13) 0%, transparent 65%)' }}
          />
          <div className="absolute bottom-0 left-0 w-[500px] h-[300px]"
            style={{ background: 'radial-gradient(ellipse at 0% 100%, rgba(85,24,42,0.11) 0%, transparent 65%)' }}
          />
        </div>

        {/* Arabesque wave */}
        <div className="absolute top-0 left-0 right-0 -translate-y-full pointer-events-none">
          <FooterWave />
        </div>

        {/* Top gold line */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(to right, transparent 5%, rgba(201,168,76,0.50) 40%, rgba(226,194,125,0.70) 50%, rgba(201,168,76,0.50) 60%, transparent 95%)' }}
        />

        {/* Brand watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span
            className="font-heading font-light select-none whitespace-nowrap"
            style={{ fontSize: 'clamp(56px,9vw,110px)', letterSpacing: '0.5em', color: 'rgba(255,248,240,1)', opacity: 0.055 }}
          >
            M. M. ATTARWALA
          </span>
        </div>

        <div className="cx relative z-10 pt-28 pb-14">

          {/* Emotional closing line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: LUXURY }}
            className="flex flex-col items-center py-16 md:py-24"
          >
            <p
              className="font-heading italic text-center text-4xl md:text-5xl lg:text-6xl"
              style={{ color: T.quote, letterSpacing: '0.01em', fontWeight: 300, lineHeight: 1.2 }}
            >
              Crafted to linger beyond memory.
            </p>
          </motion.div>

          {/* Gold separator */}
          <div className="flex items-center gap-4 mb-16 md:mb-20">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.25))' }} />
            <span style={{ color: 'rgba(201,168,76,0.35)', fontSize: '7px' }}>◆</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.25))' }} />
          </div>

          {/* 3-col grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-20 mb-16">

            {/* Brand col */}
            <div className="flex flex-col gap-6">
              <Link to="/" className="w-fit">
                <img
                  src={`${BASE}logoakatar.png`}
                  alt="M. M. Attarwala"
                  className="h-14 w-auto object-contain"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(201,168,76,0.12))', opacity: 0.90 }}
                  draggable={false}
                />
              </Link>

              <p className="text-sm font-normal leading-[1.85] max-w-[230px]"
                style={{ color: T.body }}>
                Custom-made attars blended for you alone. Crafted fresh, just for you.
              </p>

              <div className="flex items-center gap-4 mt-1">
                {[
                  { href: 'https://instagram.com/mm_attarwala', icon: Instagram, label: 'Instagram' },
                  { href: 'https://facebook.com/mmattarwala', icon: Facebook, label: 'Facebook' },
                  { href: `https://wa.me/${WA_NUMBER}`, icon: MessageCircle, label: 'WhatsApp' },
                  { href: 'mailto:mmattarwala2008@rediff.com', icon: Mail, label: 'Email' },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-400"
                    style={{
                      borderColor: 'rgba(201,168,76,0.55)',
                      color: 'rgba(255,252,245,0.92)',
                      background: 'rgba(201,168,76,0.12)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'rgba(201,168,76,1)'
                      e.currentTarget.style.color = '#0a0603'
                      e.currentTarget.style.background = 'rgba(201,168,76,1)'
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(201,168,76,0.35)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(201,168,76,0.55)'
                      e.currentTarget.style.color = 'rgba(255,252,245,0.92)'
                      e.currentTarget.style.background = 'rgba(201,168,76,0.12)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <Icon size={14} strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>

            {/* Nav col */}
            <div className="flex flex-col gap-4">
              <p className="luxury-label mb-1" style={{ color: T.goldDim }}>Explore</p>
              <div className="grid grid-cols-2 md:flex md:flex-col gap-3 md:gap-4">
                {NAV_LINKS.map(({ label, to }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === '/'}
                    className="text-[12px] tracking-[0.18em] uppercase font-medium transition-colors duration-500 w-fit"
                    style={({ isActive }) => ({
                      color: isActive ? T.gold : T.address,
                    })}
                    onMouseEnter={e => { if (!e.currentTarget.className.includes('active')) e.currentTarget.style.color = T.body }}
                    onMouseLeave={e => { if (!e.currentTarget.className.includes('active')) e.currentTarget.style.color = T.address }}
                  >
                    {label}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Connect col */}
            <div className="flex flex-col gap-4">
              <p className="luxury-label mb-2" style={{ color: T.goldDim }}>Connect</p>

              <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-3 group w-fit">
                <MessageCircle size={13} strokeWidth={1} className="mt-0.5 flex-shrink-0" style={{ color: T.goldDim }} />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] tracking-[0.18em] uppercase font-semibold" style={{ color: T.goldDim }}>WhatsApp · M. Roeesh</span>
                  <span
                    className="text-[12px] font-normal tracking-wide transition-colors duration-500"
                    style={{ color: T.contact }}
                    onMouseEnter={e => e.currentTarget.style.color = T.body}
                    onMouseLeave={e => e.currentTarget.style.color = T.contact}
                  >+91 97245 86101</span>
                </div>
              </a>

              <a href="tel:+919016361538" className="flex items-start gap-3 group w-fit">
                <Phone size={13} strokeWidth={1} className="mt-0.5 flex-shrink-0" style={{ color: T.goldDim }} />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] tracking-[0.18em] uppercase font-semibold" style={{ color: T.goldDim }}>Call · M. Munavvar</span>
                  <span
                    className="text-[12px] font-normal tracking-wide transition-colors duration-500"
                    style={{ color: T.contact }}
                    onMouseEnter={e => e.currentTarget.style.color = T.body}
                    onMouseLeave={e => e.currentTarget.style.color = T.contact}
                  >+91 90163 61538</span>
                </div>
              </a>

              <a href="mailto:mmattarwala2008@rediff.com" className="flex items-start gap-3 group w-fit">
                <Mail size={13} strokeWidth={1} className="mt-0.5 flex-shrink-0" style={{ color: T.goldDim }} />
                <span
                  className="text-[12px] font-normal tracking-wide transition-colors duration-500"
                  style={{ color: T.contact }}
                  onMouseEnter={e => e.currentTarget.style.color = T.body}
                  onMouseLeave={e => e.currentTarget.style.color = T.contact}
                >mmattarwala2008@rediff.com</span>
              </a>

              <div className="flex items-start gap-3">
                <MapPin size={13} strokeWidth={1} className="mt-0.5 flex-shrink-0" style={{ color: T.goldDim }} />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] tracking-[0.18em] uppercase font-semibold" style={{ color: T.goldDim }}>Nazarbaug · Fortune Point</span>
                  <span className="text-[12px] font-normal leading-relaxed" style={{ color: T.address }}>
                    Mandvi, Vadodara – 390 017
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock size={13} strokeWidth={1} className="mt-0.5 flex-shrink-0" style={{ color: T.goldDim }} />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] tracking-[0.18em] uppercase font-semibold" style={{ color: T.goldDim }}>Open Hours</span>
                  <span className="text-[12px] font-normal leading-relaxed" style={{ color: T.address }}>
                    10 am – 8 pm · Mon closed<br />Fri closed 12:45–2:45 pm
                  </span>
                </div>
              </div>

              <Link to="/custom-fragrance" className="mt-2">
                <motion.span
                  className="inline-flex items-center gap-3 cursor-pointer select-none"
                  style={{ border: '1px solid rgba(176,141,87,0.28)', color: 'rgba(176,141,87,0.60)', padding: '10px 20px' }}
                  whileHover={{ borderColor: 'rgba(201,168,76,0.55)', color: 'rgba(201,168,76,0.90)', boxShadow: '0 0 16px rgba(201,168,76,0.07)' }}
                  transition={{ duration: 0.45, ease: LUXURY }}
                >
                  <span className="text-[10px] tracking-[0.28em] uppercase font-medium">Craft Yours</span>
                  <ArrowRight size={11} strokeWidth={1} />
                </motion.span>
              </Link>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{ borderTop: '1px solid rgba(201,168,76,0.07)' }}>
            <p className="text-[10px] tracking-[0.22em] uppercase font-normal" style={{ color: T.faint }}>
              © {year} M. M. Attarwala. All rights reserved.
            </p>
            <p className="text-[10px] tracking-[0.22em] uppercase font-normal" style={{ color: 'rgba(236,230,220,0.76)' }}>
              Made with love in India ♥
            </p>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.5))' }}
        />
      </footer>
    </>
  )
}
