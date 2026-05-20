const ITEMS = [
  'Custom Made',
  'Premium Attars',
  'Crafted For You',
  'Arabic Oudh',
  'Pure Essence',
  'Indian Attar',
  'Bespoke Blends',
]

function MarqueeContent() {
  return (
    <div className="flex items-center gap-0 shrink-0">
      {ITEMS.map((text, i) => (
        <span key={i} className="flex items-center">
          <span className="text-[10px] tracking-[0.35em] uppercase text-gold-400/80 whitespace-nowrap px-6">
            {text}
          </span>
          <span className="text-gold-400/60 text-xs">◆</span>
        </span>
      ))}
    </div>
  )
}

export default function MarqueeStrip() {
  return (
    <div className="relative overflow-hidden border-y border-gold-400/15 py-4" style={{ background: 'rgba(9,6,5,0.75)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.018), 0 0 34px rgba(201,168,76,0.035)' }}>
      {/* Left fade */}
      <div
        className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #090605, transparent)' }}
      />
      {/* Right fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #090605, transparent)' }}
      />

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        <MarqueeContent />
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </div>
  )
}
