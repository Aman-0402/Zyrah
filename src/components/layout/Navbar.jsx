import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useScrollPosition } from '../../hooks/useScrollPosition'

const BASE = import.meta.env.BASE_URL
const LUXURY = [0.22, 1, 0.36, 1]

const NAV_LINKS = [
  { label: 'Home',             to: '/' },
  { label: 'Collections',      to: '/collections' },
  { label: 'Custom Fragrance', to: '/custom-fragrance' },
  { label: 'About',            to: '/about' },
  { label: 'Contact',          to: '/contact' },
]

const menuVariants = {
  closed: { opacity: 0, clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
  open:   { opacity: 1, clipPath: 'inset(0 0 0% 0)',   transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } },
}

const linkVariants = {
  closed: { opacity: 0, y: 20 },
  open: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.07, duration: 0.4, ease: 'easeOut' },
  }),
}

function NavItem({ label, to }) {
  return (
    <li>
      <NavLink
        to={to}
        end={to === '/'}
        className="relative group flex flex-col items-center gap-0 select-none"
      >
        {({ isActive }) => (
          <>
            <span
              className="text-[11px] tracking-[0.32em] uppercase font-medium transition-all duration-400"
              style={{
                color: isActive ? 'rgba(224,188,100,1)' : 'rgba(255,252,245,0.88)',
                textShadow: isActive ? '0 0 20px rgba(201,168,76,0.4)' : 'none',
              }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = 'rgba(224,188,100,1)'; e.currentTarget.style.textShadow = '0 0 16px rgba(201,168,76,0.35)' } }}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = 'rgba(255,252,245,0.88)'; e.currentTarget.style.textShadow = 'none' } }}
            >
              {label}
            </span>

            {/* Glow underline — expands from center */}
            <motion.span
              className="block mt-1.5"
              initial={false}
              animate={{
                scaleX: isActive ? 1 : 0,
                opacity: isActive ? 1 : 0,
              }}
              whileHover={{ scaleX: 1, opacity: 0.45 }}
              transition={{ duration: 0.45, ease: LUXURY }}
              style={{
                height: '1px',
                width: '100%',
                background: 'linear-gradient(to right, transparent, rgba(176,141,87,0.8), transparent)',
                transformOrigin: 'center',
                filter: 'blur(0.5px)',
              }}
            />
          </>
        )}
      </NavLink>
    </li>
  )
}

export default function Navbar() {
  const { isScrolled } = useScrollPosition()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.4, ease: LUXURY, delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
        style={isScrolled
          ? {
              background: 'linear-gradient(to bottom, rgba(4,3,2,0.97) 0%, rgba(4,3,2,0.82) 100%)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              borderBottom: '1px solid rgba(176,141,87,0.07)',
              paddingTop: '14px',
              paddingBottom: '6px',
            }
          : {
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.22) 70%, transparent 100%)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              paddingTop: '22px',
              paddingBottom: '14px',
            }
        }
      >
        {/* Atmospheric warm glow behind navbar — cinematic depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 120% at 50% -20%, rgba(100,50,12,0.22) 0%, transparent 100%)',
          }}
        />

        {/* Bottom gold divider — always present, stronger when scrolled */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px pointer-events-none transition-opacity duration-700"
          style={{
            background: 'linear-gradient(to right, transparent 5%, rgba(176,141,87,0.22) 40%, rgba(176,141,87,0.32) 50%, rgba(176,141,87,0.22) 60%, transparent 95%)',
            opacity: isScrolled ? 1 : 0.4,
          }}
        />

        <nav className="cx relative z-10 flex items-center justify-between">

          {/* ── Logo ── */}
          <NavLink to="/" className="relative flex items-center select-none group">
            {/* Soft ambient glow behind logo */}
            <motion.div
              className="absolute -inset-2 pointer-events-none rounded-full"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ background: 'radial-gradient(ellipse, rgba(176,141,87,0.12) 0%, transparent 70%)' }}
            />
            <motion.img
              src={`${BASE}logoakatar.png`}
              alt="M. M. Attarwala"
              draggable={false}
              className="relative h-16 md:h-[82px] w-auto object-contain"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              style={{ filter: 'drop-shadow(0 0 16px rgba(176,141,87,0.35))' }}
            />
          </NavLink>

          {/* ── Desktop Links ── */}
          <ul className="hidden md:flex items-center gap-10 lg:gap-12">
            {NAV_LINKS.map(({ label, to }) => (
              <NavItem key={to} label={label} to={to} />
            ))}
          </ul>

          {/* ── CTA — desktop ── */}
          <div className="hidden md:flex items-center">
            <NavLink
              to="/custom-fragrance"
              className="relative group overflow-hidden select-none transition-all duration-500"
              style={{
                border: '1px solid rgba(176,141,87,0.28)',
                color: 'rgba(176,141,87,0.80)',
                background: 'rgba(176,141,87,0.04)',
                padding: '11px 24px',
                fontSize: '10px',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                fontWeight: 400,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(176,141,87,0.65)'
                e.currentTarget.style.color = 'rgba(201,168,76,1)'
                e.currentTarget.style.background = 'rgba(176,141,87,0.10)'
                e.currentTarget.style.boxShadow = '0 0 24px rgba(176,141,87,0.18), inset 0 0 12px rgba(176,141,87,0.04)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(176,141,87,0.28)'
                e.currentTarget.style.color = 'rgba(176,141,87,0.80)'
                e.currentTarget.style.background = 'rgba(176,141,87,0.04)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Shimmer sweep on hover */}
              <span className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(201,168,76,0.06) 50%, transparent 70%)' }}
              />
              <span className="relative">Craft Yours</span>
            </NavLink>
          </div>

          {/* ── Hamburger — mobile ── */}
          <motion.button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2 transition-colors duration-300"
            style={{ color: 'rgba(245,240,232,0.7)' }}
            whileTap={{ scale: 0.88 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <X size={20} strokeWidth={1.5} />
                </motion.span>
              ) : (
                <motion.span key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <Menu size={20} strokeWidth={1.5} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>
      </motion.header>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: 'rgba(4,3,2,0.98)', backdropFilter: 'blur(20px)' }}
          >
            {/* Gold accent lines */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(176,141,87,0.5), transparent)' }} />
            <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(176,141,87,0.2), transparent)' }} />

            {/* Atmospheric glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(80,40,10,0.12) 0%, transparent 70%)' }} />

            <div className="relative flex flex-col items-center justify-center h-full gap-1.5">

              {/* Logo */}
              <motion.div custom={-1} variants={linkVariants} initial="closed" animate="open" className="mb-12">
                <img src={`${BASE}logoakatar.png`} alt="M. M. Attarwala" draggable={false}
                  className="h-14 w-auto object-contain" style={{ opacity: 0.35, filter: 'drop-shadow(0 0 8px rgba(176,141,87,0.2))' }} />
              </motion.div>

              {NAV_LINKS.map(({ label, to }, i) => (
                <motion.div key={to} custom={i} variants={linkVariants} initial="closed" animate="open">
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className="block py-3 text-center transition-all duration-300"
                  >
                    {({ isActive }) => (
                      <span
                        className="font-heading text-3xl sm:text-4xl font-light tracking-wide transition-all duration-300"
                        style={{
                          color: isActive ? 'rgba(176,141,87,0.95)' : 'rgba(255,252,245,0.88)',
                          textShadow: isActive ? '0 0 30px rgba(176,141,87,0.25)' : 'none',
                        }}
                      >
                        {label}
                      </span>
                    )}
                  </NavLink>
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.div custom={NAV_LINKS.length + 1} variants={linkVariants} initial="closed" animate="open" className="mt-10">
                <NavLink
                  to="/custom-fragrance"
                  className="text-[10px] tracking-[0.45em] uppercase transition-all duration-300"
                  style={{ color: '#0A0A0A', background: 'rgba(176,141,87,0.92)', padding: '14px 36px', display: 'block' }}
                >
                  Craft Your Fragrance
                </NavLink>
              </motion.div>

              {/* Tagline */}
              <motion.div custom={NAV_LINKS.length + 2} variants={linkVariants} initial="closed" animate="open"
                className="absolute bottom-10 flex flex-col items-center gap-2">
                <div className="w-8 h-px" style={{ background: 'rgba(176,141,87,0.3)' }} />
                <p className="text-[9px] tracking-[0.4em] uppercase" style={{ color: 'rgba(255,252,245,0.55)' }}>
                  Mandvi, Vadodara · Since India
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
