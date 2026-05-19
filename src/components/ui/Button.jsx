import { motion } from 'framer-motion'

const variants = {
  primary: [
    'bg-gold-400 text-black',
    'border border-gold-400',
    'hover:bg-gold-300 hover:border-gold-300',
    'font-medium tracking-widest uppercase text-xs',
    'shadow-[0_0_20px_rgba(201,168,76,0.22)]',
    'hover:shadow-[0_8px_32px_rgba(201,168,76,0.38),0_0_20px_rgba(201,168,76,0.20)]',
  ].join(' '),

  outline: [
    'bg-transparent text-gold-400',
    'border border-gold-400',
    'hover:bg-gold-400 hover:text-black',
    'font-medium tracking-widest uppercase text-xs',
  ].join(' '),

  ghost: [
    'bg-transparent text-ivory',
    'border border-transparent',
    'hover:text-gold-400',
    'font-medium tracking-widest uppercase text-xs',
  ].join(' '),
}

const sizes = {
  sm: 'px-5 py-2 text-[10px]',
  md: 'px-8 py-3 text-xs',
  lg: 'px-12 py-4 text-sm',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.97, y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={[
        'relative inline-flex items-center justify-center gap-2',
        'transition-all duration-300 ease-out',
        'cursor-pointer select-none',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </motion.button>
  )
}
