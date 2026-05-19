import { MessageCircle, Mail, Package, Instagram, MapPin, Clock, Phone } from 'lucide-react'
import { useGSAPStaggerReveal } from '../../hooks/useGSAPReveal'

const WA_ROEESH   = '919724586101'
const WA_MUNAVVAR = '919016361538'

const INFO_CARDS = [
  {
    icon: MessageCircle,
    label: 'WhatsApp — M. Roeesh',
    value: '+91 97245 86101',
    sub: 'Primary contact',
    href: `https://wa.me/${WA_ROEESH}`,
    accent: '#C9A84C',
  },
  {
    icon: Phone,
    label: 'Call — M. Munavvar',
    value: '+91 90163 61538',
    sub: 'Alternate contact',
    href: `tel:+919016361538`,
    accent: '#C9A84C',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'mmattarwala2008@rediff.com',
    sub: 'For detailed enquiries',
    href: 'mailto:mmattarwala2008@rediff.com',
    accent: '#E2C27D',
  },
  {
    icon: MapPin,
    label: 'Store 1 — Nazarbaug Palace',
    value: 'GF 154/155, Nazarbaug Palace',
    sub: 'Opp. Jamnabai Hospital, Mandvi, Vadodara – 390 017',
    href: 'https://maps.google.com/?q=Nazarbaug+Palace+Mandvi+Vadodara',
    accent: '#F5F0E8',
  },
  {
    icon: MapPin,
    label: 'Store 2 — Fortune Point',
    value: 'Shop No. 3, Fortune Point',
    sub: 'Opp. Jumma Masjid, Mandvi, Vadodara – 390 017',
    href: 'https://maps.google.com/?q=Fortune+Point+Mandvi+Vadodara',
    accent: '#F5F0E8',
  },
  {
    icon: Clock,
    label: 'Hours',
    value: '10:00 am – 8:00 pm',
    sub: 'Monday: Closed · Friday: Closed 12:45–2:45 pm (Namaz)',
    href: null,
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
    <div ref={ref} className="flex flex-col gap-4">

      <div>
        <p className="text-[10px] tracking-[0.45em] uppercase mb-3" style={{ color: 'rgba(201,168,76,0.82)' }}>Reach Us</p>
        <h2 className="font-heading text-3xl md:text-4xl mb-2" style={{ color: 'rgba(255,248,240,0.92)' }}>
          We're <span className="italic" style={{ color: 'rgba(226,194,125,0.90)' }}>Here</span>
        </h2>
        <p className="text-sm font-light mb-8" style={{ color: 'rgba(255,252,245,0.82)' }}>
          Every message is read personally. No bots, no auto-replies.
        </p>
      </div>

      {/* Info cards */}
      {INFO_CARDS.map(({ icon: Icon, label, value, sub, href, accent }) => {
        const Inner = (
          <div
            className="flex items-start gap-4 p-5 border border-gold-400/12 hover:border-gold-400/30 transition-all duration-400 group"
            style={{
              background: 'linear-gradient(160deg, rgba(201,168,76,0.025) 0%, rgba(201,168,76,0.010) 100%)',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(160deg, rgba(201,168,76,0.045) 0%, rgba(201,168,76,0.018) 100%)'}
            onMouseLeave={e => e.currentTarget.style.background = 'linear-gradient(160deg, rgba(201,168,76,0.025) 0%, rgba(201,168,76,0.010) 100%)'}
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
              <p className="text-sm font-light transition-colors duration-300 truncate" style={{ color: 'rgba(255,248,240,0.82)' }}>
                {value}
              </p>
              <p className="text-xs font-light" style={{ color: 'rgba(255,252,245,0.80)' }}>{sub}</p>
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
        <span className="text-gold-400/78 text-xs">✦</span>
        <span className="text-[10px] tracking-[0.4em] uppercase text-gold-400/82">
          Free Delivery Across India
        </span>
        <span className="text-gold-400/78 text-xs">✦</span>
      </div>

      {/* Products */}
      <div data-reveal className="flex flex-col gap-2 pt-1">
        <p className="text-[9px] tracking-[0.35em] uppercase" style={{ color: 'rgba(201,168,76,0.72)' }}>Our Products</p>
        <div className="flex flex-wrap gap-2">
          {['Indian Attar', 'Perfume Spray', 'Deodorant Spray', 'Room Freshener', 'Car Spray', 'Agarbatti'].map(p => (
            <span key={p} className="text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 border border-gold-400/15"
              style={{ color: 'rgba(255,252,245,0.80)', background: 'rgba(201,168,76,0.04)' }}>
              {p}
            </span>
          ))}
        </div>
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
        <span className="text-[10px] tracking-[0.3em] uppercase transition-colors duration-300" style={{ color: 'rgba(255,252,245,0.76)' }}
          onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,252,245,0.90)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,252,245,0.76)'}
        >
          Follow Our Journey
        </span>
      </a>
    </div>
  )
}
