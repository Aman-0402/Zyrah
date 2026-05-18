import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useScrollPosition } from '../../hooks/useScrollPosition'

const BASE = import.meta.env.BASE_URL

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Collections', to: '/collections' },
  { label: 'Custom Fragrance', to: '/custom-fragrance' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

/* Mobile menu animation variants */
const menuVariants = {
  closed: {
    opacity: 0,
    clipPath: 'inset(0 0 100% 0)',
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  open: {
    opacity: 1,
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
}

const linkVariants = {
  closed: { opacity: 0, y: 20 },
  open: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.07, duration: 0.4, ease: 'easeOut' },
  }),
}

export default function Navbar() {
  const { isScrolled } = useScrollPosition()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  /* Close mobile menu on route change */
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  /* Lock body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      {/* ── Main Navbar Bar ───────────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className={[
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-500 ease-out',
          isScrolled
            ? 'border-b border-gold-400/8 py-4'
            : 'py-5',
        ].join(' ')}
        style={isScrolled
          ? { background: 'linear-gradient(to bottom, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.75) 100%)', backdropFilter: 'blur(12px)' }
          : { background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)' }
        }
      >
        <nav className="cx flex items-center justify-between">

          {/* Logo */}
          <NavLink to="/" className="relative group flex items-center select-none">
            <motion.img
              src={`${BASE}logoakatar.png`}
              alt="M. M. Attarwala"
              draggable={false}
              className="h-16 md:h-20 w-auto object-contain"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              style={{ filter: 'drop-shadow(0 0 12px rgba(201,168,76,0.25))' }}
            />
          </NavLink>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map(({ label, to }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    [
                      'relative text-[12px] tracking-[0.22em] uppercase font-light',
                      'transition-colors duration-400',
                      'group flex flex-col items-center gap-1.5',
                      isActive ? 'text-gold-400/90' : 'text-ivory/60 hover:text-ivory/90',
                    ].join(' ')
                  }
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      <motion.span
                        className="h-px"
                        initial={false}
                        animate={{ width: isActive ? '60%' : '0%', opacity: isActive ? 0.65 : 0 }}
                        whileHover={{ width: '60%', opacity: 0.5 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        style={{ display: 'block', background: '#C9A84C' }}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA — desktop */}
          <div className="hidden md:flex items-center gap-4">
            <NavLink
              to="/custom-fragrance"
              className="text-[11px] tracking-[0.3em] uppercase font-light transition-all duration-400 px-8 py-3.5"
              style={{ border: '1px solid rgba(176,141,87,0.45)', color: 'rgba(176,141,87,0.85)' }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(176,141,87,0.85)'
                e.currentTarget.style.color = 'rgba(176,141,87,1)'
                e.currentTarget.style.boxShadow = '0 0 20px rgba(176,141,87,0.15)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(176,141,87,0.45)'
                e.currentTarget.style.color = 'rgba(176,141,87,0.85)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Craft Yours
            </NavLink>
          </div>

          {/* Hamburger — mobile */}
          <motion.button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden text-ivory/80 hover:text-gold-400 transition-colors duration-300 p-1"
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>
      </motion.header>

      {/* ── Mobile Menu Overlay ────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: 'rgba(10,10,10,0.97)' }}
          >
            {/* Gold top border accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />

            <div className="flex flex-col items-center justify-center h-full gap-2">
              {/* Brand repeat in menu */}
              <motion.div
                custom={-1}
                variants={linkVariants}
                initial="closed"
                animate="open"
                className="mb-10"
              >
                <img
                  src={`${BASE}logoakatar.png`}
                  alt="M. M. Attarwala"
                  draggable={false}
                  className="h-14 w-auto object-contain opacity-40"
                />
              </motion.div>

              {NAV_LINKS.map(({ label, to }, i) => (
                <motion.div
                  key={to}
                  custom={i}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                >
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      [
                        'font-heading text-4xl sm:text-5xl font-light tracking-wider',
                        'transition-colors duration-300 block py-2 text-center',
                        isActive ? 'text-gold-400' : 'text-ivory/70 hover:text-gold-300',
                      ].join(' ')
                    }
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.div
                custom={NAV_LINKS.length + 1}
                variants={linkVariants}
                initial="closed"
                animate="open"
                className="mt-10"
              >
                <NavLink
                  to="/custom-fragrance"
                  className="text-[10px] tracking-[0.4em] uppercase text-black bg-gold-400 hover:bg-gold-300 px-8 py-3 transition-all duration-300"
                >
                  Craft Your Fragrance
                </NavLink>
              </motion.div>

              {/* Tagline */}
              <motion.p
                custom={NAV_LINKS.length + 2}
                variants={linkVariants}
                initial="closed"
                animate="open"
                className="absolute bottom-10 text-[10px] tracking-[0.3em] uppercase text-ivory/20"
              >
                Free delivery across India
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
