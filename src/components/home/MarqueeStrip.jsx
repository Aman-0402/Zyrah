const ITEMS = [
  'Custom Made',
  'Free Delivery',
  'Premium Attars',
  'Crafted For You',
  'Arabic Oudh',
  'Pure Essence',
  'Luxury Fragrances',
  'Bespoke Blends',
]

function MarqueeContent() {
  return (
    <div className="flex items-center gap-0 shrink-0">
      {ITEMS.map((text, i) => (
        <span key={i} className="flex items-center">
          <span className="text-[10px] tracking-[0.35em] uppercase text-gold-400/50 whitespace-nowrap px-6">
            {text}
          </span>
          <span className="text-gold-400/30 text-xs">◆</span>
        </span>
      ))}
    </div>
  )
}

export default function MarqueeStrip() {
  return (
    <div className="relative overflow-hidden border-y border-gold-400/10 py-4 bg-black-soft/30">
      {/* Left fade */}
      <div
        className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #0A0A0A, transparent)' }}
      />
      {/* Right fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #0A0A0A, transparent)' }}
      />

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        <MarqueeContent />
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </div>
  )
}
