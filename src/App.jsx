import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Collections from './pages/Collections'
import CustomFragrance from './pages/CustomFragrance'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import RouteScrollToTop from './components/layout/RouteScrollToTop'

export default function App() {
  const location = useLocation()

  return (
    <>
      {/* Global atmospheric overlays */}
      <div className="page-grain" aria-hidden="true" />
      <div className="page-vignette" aria-hidden="true" />

      <RouteScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"                  element={<Home />} />
          <Route path="/collections"       element={<Collections />} />
          <Route path="/custom-fragrance"  element={<CustomFragrance />} />
          <Route path="/about"             element={<About />} />
          <Route path="/contact"           element={<Contact />} />
          <Route path="*"                  element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  )
}
