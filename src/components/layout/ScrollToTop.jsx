import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useScrollPosition } from '../../hooks/useScrollPosition'

export default function ScrollToTop() {
  const { scrollY } = useScrollPosition()
  const visible = scrollY > 400

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-top"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full border border-gold-400/40 flex items-center justify-center group transition-all duration-300 hover:bg-gold-400 hover:border-gold-400"
          style={{ background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(8px)' }}
          aria-label="Scroll to top"
        >
          <ArrowUp
            size={15}
            strokeWidth={1.5}
            className="text-gold-400/70 group-hover:text-black transition-colors duration-300"
          />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
