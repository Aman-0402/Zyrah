import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: i * 0.07,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.25 } },
}

export default function ProductCard({ product, index }) {
  const { name, arabicName, desc, notes, gradient, accentColor, price, isNew, isBestseller } = product

  return (
    <motion.article
      layout
      variants={cardVariants}
      custom={index}
      initial="hidden"
      animate="show"
      exit="exit"
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className="group relative flex flex-col border border-gold-400/10 hover:border-gold-400/35 transition-colors duration-500 cursor-pointer"
      style={{ background: '#111111' }}
    >
      {/* ── Image area ─────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ height: '220px', background: gradient }}>

        {/* Hover shimmer */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ background: `linear-gradient(135deg, ${accentColor}08 0%, transparent 60%)` }}
        />

        {/* Arabic watermark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-heading text-7xl font-light transition-transform duration-700 group-hover:scale-105 select-none"
            style={{ color: accentColor, opacity: 0.07 }}
          >
            {arabicName}
          </span>
        </div>

        {/* Corner accents */}
        <div
          className="absolute top-0 right-0 h-px transition-all duration-500 group-hover:w-16"
          style={{ width: '32px', background: `linear-gradient(to left, ${accentColor}50, transparent)` }}
        />
        <div
          className="absolute top-0 right-0 w-px transition-all duration-500 group-hover:h-16"
          style={{ height: '32px', background: `linear-gradient(to bottom, ${accentColor}50, transparent)` }}
        />
        <div
          className="absolute bottom-0 left-0 h-px transition-all duration-500 group-hover:w-16"
          style={{ width: '32px', background: `linear-gradient(to right, ${accentColor}50, transparent)` }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {isNew && (
            <span className="text-[8px] tracking-[0.3em] uppercase px-2.5 py-1 bg-gold-400 text-black font-medium">
              New
            </span>
          )}
          {isBestseller && (
            <span className="text-[8px] tracking-[0.3em] uppercase px-2.5 py-1 border border-gold-400/50 text-gold-400">
              Bestseller
            </span>
          )}
        </div>

        {/* Number */}
        <div className="absolute bottom-3 right-3">
          <span className="text-[9px] tracking-[0.3em] text-gold-400/58">
            No.{String(product.id).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <div className="p-5 flex flex-col gap-3 flex-1">

        {/* Name row */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-heading text-lg text-ivory group-hover:text-gold-300 transition-colors duration-300 leading-tight">
              {name}
            </h3>
            <p className="text-[10px] tracking-wider text-gold-400/65 mt-0.5">{arabicName}</p>
          </div>
          <motion.div
            className="text-ivory/20 group-hover:text-gold-400 transition-colors duration-300 mt-1 flex-shrink-0"
            animate={{ x: 0 }}
            whileHover={{ x: 3 }}
          >
            <ArrowRight size={15} strokeWidth={1.5} />
          </motion.div>
        </div>

        {/* Desc */}
        <p className="text-ivory/35 text-xs leading-relaxed font-light">{desc}</p>

        {/* Notes */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {notes.map((note) => (
            <span
              key={note}
              className="text-[8px] tracking-[0.25em] uppercase px-2.5 py-1 border border-gold-400/20 text-gold-400/70 group-hover:border-gold-400/45 group-hover:text-gold-400/90 transition-all duration-300"
            >
              {note}
            </span>
          ))}
        </div>

        {/* Price + CTA row */}
        <div className="flex items-center justify-between pt-2 border-t border-gold-400/8 group-hover:border-gold-400/18 transition-colors duration-300">
          <span className="text-gold-400 text-sm font-medium tracking-wide">{price}</span>
          <span className="text-[9px] tracking-[0.3em] uppercase text-ivory/0 group-hover:text-ivory/40 transition-all duration-300">
            Enquire →
          </span>
        </div>
      </div>

      {/* Bottom gold reveal line */}
      <div
        className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
        style={{ background: `linear-gradient(to right, transparent, ${accentColor}50, transparent)` }}
      />
    </motion.article>
  )
}
