import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, MessageCircle, Mail } from 'lucide-react'
import { FAMILIES, INTENSITY_LEVELS } from '../../../data/notes'
import Button from '../../ui/Button'

const WA_NUMBER = '919724586101'

function buildWhatsAppText(selections) {
  const { family, topNotes, middleNotes, baseNotes, intensity, name, customerName, phone, message } = selections
  const fam = FAMILIES.find((f) => f.id === family)
  const level = INTENSITY_LEVELS.find((l) => l.value === intensity)

  const lines = [
    `🌟 Custom Fragrance Enquiry — M. M. Attarwala`,
    ``,
    `👤 Name: ${customerName || 'Not provided'}`,
    `📱 Phone: ${phone || 'Not provided'}`,
    ``,
    `🧴 Fragrance Name: ${name || 'To be decided'}`,
    `🌿 Family: ${fam?.label || '—'}`,
    `🎵 Top Notes: ${topNotes.length ? topNotes.join(', ') : 'Leave to perfumer'}`,
    `💛 Middle Notes: ${middleNotes.length ? middleNotes.join(', ') : 'Leave to perfumer'}`,
    `🌑 Base Notes: ${baseNotes.length ? baseNotes.join(', ') : 'Leave to perfumer'}`,
    `💪 Intensity: ${level?.label || '—'} (${intensity}/5)`,
    message ? `\n📝 Message: ${message}` : '',
    ``,
    `Crafted with love by M. M. Attarwala ✨`,
  ]

  return encodeURIComponent(lines.filter(Boolean).join('\n'))
}

/* Summary pill */
function SummaryPill({ label, value }) {
  if (!value) return null
  return (
    <div className="flex flex-col gap-0.5 px-3 py-2 border border-gold-400/15" style={{ background: 'rgba(201,168,76,0.03)' }}>
      <span className="text-[9px] tracking-[0.2em] uppercase text-gold-300/86 font-semibold">{label}</span>
      <span className="text-[13px] text-ivory/78 font-normal">{value}</span>
    </div>
  )
}

/* Luxury form input */
function LuxuryInput({ label, type = 'text', value, onChange, placeholder, required }) {
  const [focused, setFocused] = useState(false)
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] tracking-[0.2em] uppercase text-ivory/78 font-semibold">
        {label}{required && <span className="text-gold-400/60 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="bg-transparent border-b py-2 text-[15px] text-ivory/88 outline-none transition-colors duration-300 placeholder:text-ivory/30 font-normal"
        style={{ borderColor: focused ? 'rgba(201,168,76,0.6)' : 'rgba(201,168,76,0.12)' }}
      />
    </div>
  )
}

export default function Step5Enquiry({ selections, update }) {
  const [submitted, setSubmitted] = useState(false)
  const { family, topNotes, middleNotes, baseNotes, intensity, name, customerName, phone, email, message } = selections
  const fam = FAMILIES.find((f) => f.id === family)
  const level = INTENSITY_LEVELS.find((l) => l.value === intensity)
  const canSubmit = customerName.trim().length > 0 && phone.trim().length >= 10

  function handleSubmit(e) {
    e.preventDefault()
    if (!canSubmit) return
    const text = buildWhatsAppText(selections)
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank')
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-6 py-16 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)' }}
        >
          <Check size={28} strokeWidth={1.5} className="text-gold-400" />
        </motion.div>
        <div>
          <h3 className="font-heading text-3xl text-ivory mb-2">Enquiry Sent ✦</h3>
          <p className="text-ivory/86 text-[15px] font-normal max-w-sm leading-[1.75]">
            We'll be in touch within 24 hours to craft your signature fragrance.
          </p>
        </div>
        <p className="text-[9px] tracking-[0.4em] uppercase text-gold-400/72">
          Free delivery across India
        </p>
      </motion.div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="editorial-label mb-2">Step 5 of 5</p>
        <h2 className="font-heading text-3xl md:text-4xl text-ivory mb-2">
          Your <span className="italic text-gold-300">Enquiry</span>
        </h2>
        <p className="text-ivory/84 text-[15px] font-normal leading-[1.85]">
          Review your creation and send it to us.
        </p>
      </div>

      {/* Summary */}
      <div className="flex flex-col gap-2">
        <p className="text-[10px] tracking-[0.2em] uppercase text-ivory/76 font-semibold mb-1">Your Selections</p>
        <div className="grid grid-cols-2 gap-2">
          <SummaryPill label="Family" value={fam?.label} />
          <SummaryPill label="Intensity" value={level?.label} />
          <SummaryPill label="Name" value={name || 'To be decided'} />
          <SummaryPill label="Top Notes" value={topNotes.length ? topNotes.join(', ') : 'Perfumer\'s choice'} />
          <SummaryPill label="Middle Notes" value={middleNotes.length ? middleNotes.join(', ') : 'Perfumer\'s choice'} />
          <SummaryPill label="Base Notes" value={baseNotes.length ? baseNotes.join(', ') : 'Perfumer\'s choice'} />
        </div>
      </div>

      <div className="h-px bg-gold-400/8" />

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <LuxuryInput
          label="Your Name"
          value={customerName}
          onChange={(v) => update({ customerName: v })}
          placeholder="Full name"
          required
        />
        <LuxuryInput
          label="WhatsApp Number"
          type="tel"
          value={phone}
          onChange={(v) => update({ phone: v })}
          placeholder="+91 XXXXX XXXXX"
          required
        />
        <LuxuryInput
          label="Email (optional)"
          type="email"
          value={email}
          onChange={(v) => update({ email: v })}
          placeholder="your@email.com"
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] tracking-[0.2em] uppercase text-ivory/78 font-semibold">
            Additional Notes (optional)
          </label>
          <textarea
            value={message}
            onChange={(e) => update({ message: e.target.value })}
            placeholder="Occasion, preferences, skin type..."
            rows={3}
            className="bg-transparent border-b border-gold-400/18 py-2 text-[15px] text-ivory/88 outline-none transition-colors duration-300 placeholder:text-ivory/30 font-normal resize-none focus:border-gold-400/60"
          />
        </div>

        {/* Submit buttons */}
        <div className="flex flex-col gap-3 pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={!canSubmit}
            className="w-full justify-center gap-3"
          >
            <MessageCircle size={15} strokeWidth={1.5} />
            Send via WhatsApp
          </Button>

          <a
            href={`mailto:mmattarwala2008@rediff.com?subject=Custom Fragrance Enquiry${name ? ` — ${name}` : ''}&body=Name: ${customerName}%0APhone: ${phone}%0AFamily: ${fam?.label}%0ANotes: ${[...topNotes, ...middleNotes, ...baseNotes].join(', ')}`}
            className="flex items-center justify-center gap-2 text-[10px] tracking-[0.2em] uppercase text-ivory/76 hover:text-ivory/92 transition-colors duration-300 py-2"
          >
            <Mail size={13} strokeWidth={1.5} />
            Or email us instead
          </a>
        </div>

        <p className="text-[9px] tracking-[0.18em] uppercase text-ivory/48 text-center">
          Free delivery · Handcrafted · Ships within 7 days
        </p>
      </form>
    </div>
  )
}
