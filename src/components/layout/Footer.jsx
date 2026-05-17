import { NavLink, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Instagram, MessageCircle, Mail } from 'lucide-react'
import Button from '../ui/Button'

const WA_NUMBER = '919999999999'

const NAV_LINKS = [
  { label: 'Home',              to: '/' },
  { label: 'Collections',       to: '/collections' },
  { label: 'Custom Fragrance',  to: '/custom-fragrance' },
  { label: 'About',             to: '/about' },
  { label: 'Contact',           to: '/contact' },
]

/* Arabesque top wave */
function FooterWave() {
  return (
    <svg
      className="w-full opacity-15 block"
      height="20"
      viewBox="0 0 1440 20"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 10 Q180 0 360 10 Q540 20 720 10 Q900 0 1080 10 Q1260 20 1440 10"
        stroke="#C9A84C"
        strokeWidth="0.5"
        fill="none"
      />
      {[360, 720, 1080].map((cx) => (
        <circle key={cx} cx={cx} cy="10" r="2" fill="#C9A84C" opacity="0.4" />
      ))}
    </svg>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="relative border-t border-gold-400/10 mt-auto"
      style={{
        background: 'linear-gradient(180deg, rgba(59,31,15,0.10) 0%, #0A0A0A 60%)',
      }}
    >
      {/* Arabesque wave decoration */}
      <div className="absolute top-0 left-0 right-0 -translate-y-full pointer-events-none">
        <FooterWave />
      </div>

      {/* Top gold line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.25), transparent)' }}
      />

      {/* Main content */}
      <div className="cx pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16 mb-12">

          {/* ── Brand col ───────────────────────────────────────────────── */}
          <div className="flex flex-col gap-5">
            {/* Logo */}
            <Link to="/" className="inline-flex flex-col leading-none w-fit">
              <span className="font-heading text-xl text-gold-400 tracking-[0.15em] font-light">
                m_m_attarwala
              </span>
              <span className="text-[8px] tracking-[0.35em] text-ivory/30 uppercase mt-0.5 ml-0.5">
                Luxury Fragrances · Est. India
              </span>
            </Link>

            {/* Desc */}
            <p className="text-ivory/35 text-xs font-light leading-relaxed max-w-[220px]">
              Custom-made attars blended for you alone. Free delivery across India.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/mm_attarwala"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-gold-400/20 flex items-center justify-center text-gold-400/40 hover:text-gold-400 hover:border-gold-400/50 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={13} strokeWidth={1.5} />
              </a>
              <a
                href={`https://wa.me/${WA_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-gold-400/20 flex items-center justify-center text-gold-400/40 hover:text-gold-400 hover:border-gold-400/50 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle size={13} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* ── Nav col ─────────────────────────────────────────────────── */}
          <div className="flex flex-col gap-4">
            <p className="text-[9px] tracking-[0.45em] uppercase text-gold-400/40 mb-1">Explore</p>
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  [
                    'text-xs font-light transition-colors duration-300 w-fit relative group flex flex-col',
                    isActive ? 'text-gold-400' : 'text-ivory/45 hover:text-ivory',
                  ].join(' ')
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    <motion.span
                      className="h-px bg-gold-400"
                      animate={{ width: isActive ? '100%' : '0%' }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                      style={{ display: 'block' }}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* ── Contact col ─────────────────────────────────────────────── */}
          <div className="flex flex-col gap-4">
            <p className="text-[9px] tracking-[0.45em] uppercase text-gold-400/40 mb-1">Connect</p>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 group w-fit"
            >
              <MessageCircle size={13} strokeWidth={1.5} className="text-gold-400/40 group-hover:text-gold-400 transition-colors duration-300" />
              <span className="text-xs font-light text-ivory/45 group-hover:text-ivory transition-colors duration-300">
                +91 99999 99999
              </span>
            </a>

            {/* Email */}
            <a
              href="mailto:hello@mmattarwala.com"
              className="flex items-center gap-2.5 group w-fit"
            >
              <Mail size={13} strokeWidth={1.5} className="text-gold-400/40 group-hover:text-gold-400 transition-colors duration-300" />
              <span className="text-xs font-light text-ivory/45 group-hover:text-ivory transition-colors duration-300">
                hello@mmattarwala.com
              </span>
            </a>

            {/* Delivery pill */}
            <div
              className="flex items-center gap-2 px-3 py-1.5 border border-gold-400/20 w-fit mt-1"
              style={{ background: 'rgba(201,168,76,0.04)' }}
            >
              <span className="text-gold-400/50 text-[10px]">✦</span>
              <span className="text-[8px] tracking-[0.3em] uppercase text-gold-400/50">
                Free Delivery India
              </span>
            </div>

            {/* CTA */}
            <div className="mt-2">
              <Link to="/custom-fragrance">
                <Button variant="outline" size="sm">
                  Craft Yours →
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────────────────────────── */}
        <div className="border-t border-gold-400/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[9px] tracking-[0.3em] uppercase text-ivory/20">
            © {year} m_m_attarwala. All rights reserved.
          </p>
          <p className="text-[9px] tracking-[0.3em] uppercase text-ivory/15">
            Made with love in India ♥
          </p>
        </div>
      </div>
    </footer>
  )
}
