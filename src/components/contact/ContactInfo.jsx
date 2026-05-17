import { MessageCircle, Mail, Package, Instagram } from 'lucide-react'
import { useGSAPStaggerReveal } from '../../hooks/useGSAPReveal'

const WA_NUMBER = '919999999999'

const INFO_CARDS = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+91 99999 99999',
    sub: 'Chat with us directly',
    href: `https://wa.me/${WA_NUMBER}`,
    accent: '#C9A84C',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@mmattarwala.com',
    sub: 'For detailed enquiries',
    href: 'mailto:hello@mmattarwala.com',
    accent: '#E2C27D',
  },
  {
    icon: Package,
    label: 'Delivery',
    value: 'Free Across India',
    sub: 'Ships within 7 working days',
    href: null,
    accent: '#F5F0E8',
  },
]

export default function ContactInfo() {
  const ref = useGSAPStaggerReveal({
    selector: '[data-reveal]',
    from: { opacity: 0, x: 30 },
    to:   { opacity: 1, x: 0 },
    stagger: 0.15,
    start: 'top 80%',
  })

  return (
    <div ref={ref} className="flex flex-col gap-5">

      <div>
        <p className="text-[10px] tracking-[0.45em] uppercase text-gold-400/50 mb-3">Reach Us</p>
        <h2 className="font-heading text-3xl md:text-4xl text-ivory mb-2">
          We're <span className="italic text-gold-300">Here</span>
        </h2>
        <p className="text-ivory/35 text-sm font-light mb-8">
          Every message is read personally. No bots, no auto-replies.
        </p>
      </div>

      {/* Info cards */}
      {INFO_CARDS.map(({ icon: Icon, label, value, sub, href, accent }) => {
        const Inner = (
          <div
            className="flex items-start gap-4 p-5 border border-gold-400/10 hover:border-gold-400/28 transition-all duration-400 group"
            style={{ background: 'rgba(201,168,76,0.015)' }}
          >
            {/* Icon circle */}
            <div
              className="w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-400 group-hover:shadow-[0_0_16px_rgba(201,168,76,0.15)]"
              style={{ borderColor: `${accent}30`, background: `${accent}08` }}
            >
              <Icon size={16} strokeWidth={1.5} style={{ color: `${accent}80` }} />
            </div>

            <div className="flex flex-col gap-0.5 min-w-0">
              <p className="text-[9px] tracking-[0.35em] uppercase" style={{ color: `${accent}50` }}>
                {label}
              </p>
              <p className="text-ivory/75 text-sm font-light group-hover:text-ivory transition-colors duration-300 truncate">
                {value}
              </p>
              <p className="text-ivory/30 text-xs font-light">{sub}</p>
            </div>

            {/* Bottom accent */}
            <div
              className="absolute bottom-0 left-0 right-0 h-px w-0 group-hover:w-full transition-all duration-500"
              style={{ background: `linear-gradient(to right, transparent, ${accent}30, transparent)` }}
            />
          </div>
        )

        return (
          <div key={label} data-reveal className="relative">
            {href ? (
              <a href={href} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
                {Inner}
              </a>
            ) : (
              Inner
            )}
          </div>
        )
      })}

      {/* Free delivery badge */}
      <div
        data-reveal
        className="flex items-center justify-center gap-3 py-3 px-6 border border-gold-400/20 mt-2"
        style={{
          background: 'rgba(201,168,76,0.04)',
          boxShadow: '0 0 20px rgba(201,168,76,0.06)',
        }}
      >
        <span className="text-gold-400/50 text-xs">✦</span>
        <span className="text-[10px] tracking-[0.4em] uppercase text-gold-400/55">
          Free Delivery Across India
        </span>
        <span className="text-gold-400/50 text-xs">✦</span>
      </div>

      {/* Instagram link */}
      <a
        data-reveal
        href="https://instagram.com/mm_attarwala"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 group py-1"
      >
        <div
          className="w-8 h-8 rounded-full border border-gold-400/15 flex items-center justify-center group-hover:border-gold-400/35 transition-colors duration-300"
        >
          <Instagram size={14} strokeWidth={1.5} className="text-ivory/30 group-hover:text-gold-400/70 transition-colors duration-300" />
        </div>
        <span className="text-[10px] tracking-[0.3em] uppercase text-ivory/25 group-hover:text-ivory/50 transition-colors duration-300">
          Follow Our Journey
        </span>
      </a>
    </div>
  )
}
