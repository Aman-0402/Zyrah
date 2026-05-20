import { MessageCircle, Mail, Package, Instagram, MapPin, Clock, Phone } from 'lucide-react'
import { useGSAPStaggerReveal } from '../../hooks/useGSAPReveal'

const WA_ROEESH = '919724586101'

const INFO_CARDS = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    name: 'M. Roeesh',
    value: '+91 97245 86101',
    sub: 'Primary contact · Replies fast',
    href: `https://wa.me/${WA_ROEESH}`,
    accent: '#C9A84C',
  },
  {
    icon: Phone,
    label: 'Call',
    name: 'M. Munavvar',
    value: '+91 90163 61538',
    sub: 'Alternate contact',
    href: `tel:+919016361538`,
    accent: '#C9A84C',
  },
  {
    icon: Mail,
    label: 'Email',
    name: null,
    value: 'mmattarwala2008@rediff.com',
    sub: 'For detailed enquiries',
    href: 'mailto:mmattarwala2008@rediff.com',
    accent: '#E2C27D',
  },
  {
    icon: MapPin,
    label: 'Store 1',
    name: 'Nazarbaug Palace',
    value: 'GF 154/155, Nazarbaug Palace',
    sub: 'Opp. Jamnabai Hospital · Mandvi, Vadodara 390 017',
    href: 'https://maps.google.com/?q=Nazarbaug+Palace+Mandvi+Vadodara',
    accent: '#F5F0E8',
  },
  {
    icon: MapPin,
    label: 'Store 2',
    name: 'Fortune Point',
    value: 'Shop No. 3, Fortune Point',
    sub: 'Opp. Jumma Masjid · Mandvi, Vadodara 390 017',
    href: 'https://maps.google.com/?q=Fortune+Point+Mandvi+Vadodara',
    accent: '#F5F0E8',
  },
  {
    icon: Clock,
    label: 'Hours',
    name: 'Open Daily',
    value: '10:00 am – 8:00 pm',
    sub: 'Mon: Closed · Fri: Closed 12:45–2:45 pm (Namaz)',
    href: null,
    accent: '#E2C27D',
  },
]

const PRODUCTS = ['Indian Attar', 'Perfume Spray', 'Deodorant', 'Room Freshener', 'Car Spray', 'Agarbatti']

export default function ContactInfo() {
  const ref = useGSAPStaggerReveal({
    selector: '[data-reveal]',
    from: { opacity: 0, x: 30 },
    to:   { opacity: 1, x: 0 },
    stagger: 0.12,
    start: 'top 80%',
  })

  return (
    <div ref={ref} className="flex flex-col gap-5">

      <div data-reveal>
        <p className="text-[10px] tracking-[0.45em] uppercase mb-3" style={{ color: 'rgba(201,168,76,0.75)' }}>Reach Us</p>
        <h2 className="font-heading text-3xl md:text-[2.6rem] mb-2 leading-tight" style={{ color: 'rgba(255,248,240,0.94)' }}>
          We're <span className="italic" style={{ color: 'rgba(226,194,125,0.92)' }}>Here</span>
        </h2>
        <p className="text-[13px] leading-relaxed mb-2" style={{ color: 'rgba(236,230,220,0.68)' }}>
          No bots. No auto-replies. Every message read personally.
        </p>
      </div>

      {/* Info cards */}
      {INFO_CARDS.map(({ icon: Icon, label, name, value, sub, href, accent }) => {
        const Inner = (
          <div
            className="relative flex items-start gap-5 p-5 transition-all duration-400 group overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, rgba(201,168,76,0.03) 0%, rgba(201,168,76,0.01) 100%)',
              border: '1px solid rgba(201,168,76,0.10)',
              borderRadius: '4px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'linear-gradient(160deg, rgba(201,168,76,0.07) 0%, rgba(201,168,76,0.02) 100%)'
              e.currentTarget.style.borderColor = 'rgba(201,168,76,0.28)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'linear-gradient(160deg, rgba(201,168,76,0.03) 0%, rgba(201,168,76,0.01) 100%)'
              e.currentTarget.style.borderColor = 'rgba(201,168,76,0.10)'
            }}
          >
            {/* Icon */}
            <div
              className="w-12 h-12 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-400"
              style={{
                borderColor: `${accent}28`,
                background: `${accent}0C`,
                boxShadow: `0 0 0 0 ${accent}20`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = `0 0 18px ${accent}22`
                e.currentTarget.style.borderColor = `${accent}50`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = `${accent}28`
              }}
            >
              <Icon size={20} strokeWidth={1.4} style={{ color: `${accent}90` }} />
            </div>

            <div className="flex flex-col gap-1 min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <p className="text-[9px] tracking-[0.24em] uppercase font-semibold" style={{ color: `${accent}AA` }}>
                  {label}
                </p>
                {name && (
                  <p className="text-[9px] tracking-[0.18em] uppercase" style={{ color: 'rgba(236,230,220,0.45)' }}>
                    {name}
                  </p>
                )}
              </div>
              <p className="text-[14px] font-normal leading-snug" style={{ color: 'rgba(245,241,234,0.92)' }}>
                {value}
              </p>
              <p className="text-[12px] font-normal leading-relaxed" style={{ color: 'rgba(220,214,205,0.65)' }}>
                {sub}
              </p>
            </div>

            {/* Bottom hover line */}
            <div
              className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500 pointer-events-none"
              style={{ background: `linear-gradient(to right, ${accent}50, transparent)` }}
            />
          </div>
        )

        return (
          <div key={label} data-reveal>
            {href ? (
              <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="block">
                {Inner}
              </a>
            ) : Inner}
          </div>
        )
      })}

      {/* Our Products — redesigned */}
      <div data-reveal
        className="p-5 flex flex-col gap-4"
        style={{
          background: 'rgba(201,168,76,0.03)',
          border: '1px solid rgba(201,168,76,0.09)',
          borderRadius: '4px',
        }}
      >
        <div className="flex items-center gap-3">
          <Package size={16} strokeWidth={1.4} style={{ color: 'rgba(201,168,76,0.60)' }} />
          <p className="text-[9px] tracking-[0.32em] uppercase font-semibold" style={{ color: 'rgba(201,168,76,0.60)' }}>
            What We Make
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRODUCTS.map(p => (
            <span
              key={p}
              className="text-[10px] tracking-[0.18em] uppercase px-3 py-1.5 transition-colors duration-300"
              style={{
                color: 'rgba(236,230,220,0.80)',
                background: 'rgba(201,168,76,0.06)',
                border: '1px solid rgba(201,168,76,0.16)',
                borderRadius: '99px',
              }}
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* Instagram */}
      <a
        data-reveal
        href="https://instagram.com/mm_attarwala"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 group py-1 w-fit"
      >
        <div
          className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300"
          style={{ borderColor: 'rgba(201,168,76,0.18)', background: 'rgba(201,168,76,0.04)' }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(201,168,76,0.45)'
            e.currentTarget.style.background = 'rgba(201,168,76,0.10)'
            e.currentTarget.style.boxShadow = '0 0 16px rgba(201,168,76,0.15)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(201,168,76,0.18)'
            e.currentTarget.style.background = 'rgba(201,168,76,0.04)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <Instagram size={16} strokeWidth={1.4} style={{ color: 'rgba(201,168,76,0.55)' }} />
        </div>
        <span
          className="text-[11px] tracking-[0.24em] uppercase font-medium transition-colors duration-300"
          style={{ color: 'rgba(236,230,220,0.70)' }}
          onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,252,245,0.90)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(236,230,220,0.70)'}
        >
          Follow Our Journey
        </span>
      </a>
    </div>
  )
}
