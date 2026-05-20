import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Check, Send } from 'lucide-react'
import { useGSAPReveal } from '../../hooks/useGSAPReveal'

const WA_NUMBER = '919724586101'
const SUBJECTS = ['Custom Order', 'General Enquiry', 'Feedback', 'Other']
const LUXURY = [0.22, 1, 0.36, 1]

function GlassInput({ label, type = 'text', value, onChange, placeholder, required }) {
  const [focused, setFocused] = useState(false)
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-[10px] tracking-[0.26em] uppercase font-semibold transition-colors duration-300"
        style={{ color: focused ? 'rgba(201,168,76,0.90)' : 'rgba(201,168,76,0.55)' }}
      >
        {label}{required && <span style={{ color: 'rgba(201,168,76,0.70)', marginLeft: '4px' }}>*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full text-[14px] outline-none font-normal transition-all duration-400"
          style={{
            background: focused
              ? 'rgba(201,168,76,0.06)'
              : 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: `1px solid ${focused ? 'rgba(201,168,76,0.55)' : 'rgba(201,168,76,0.14)'}`,
            borderRadius: '2px',
            padding: '14px 16px',
            color: 'rgba(255,248,240,0.90)',
            caretColor: 'rgba(201,168,76,0.90)',
            boxShadow: focused
              ? '0 0 0 1px rgba(201,168,76,0.10), 0 4px 28px rgba(201,168,76,0.12), inset 0 1px 0 rgba(255,255,255,0.04)'
              : 'inset 0 1px 0 rgba(255,255,255,0.025)',
          }}
        />
        {/* Focus bottom accent line */}
        <motion.div
          animate={{ scaleX: focused ? 1 : 0, opacity: focused ? 1 : 0 }}
          transition={{ duration: 0.35, ease: LUXURY }}
          className="absolute bottom-0 left-0 right-0 h-px origin-left pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgba(201,168,76,0.80), rgba(226,194,125,0.50), transparent)' }}
        />
      </div>
    </div>
  )
}

export default function ContactForm() {
  const ref = useGSAPReveal({ from: { opacity: 0, y: 40 }, to: { opacity: 1, y: 0 }, start: 'top 85%' })

  const [form, setForm] = useState({
    name: '', phone: '', email: '', subject: 'Custom Order', message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const set = (key) => (val) => setForm((p) => ({ ...p, [key]: val }))
  const canSubmit = form.name.trim() && form.phone.trim().length >= 10 && form.message.trim()

  function handleSubmit(e) {
    e.preventDefault()
    if (!canSubmit) return
    const text = encodeURIComponent(
      `Hi M. M. Attarwala! 🌸\n\nName: ${form.name}\nPhone: ${form.phone}${form.email ? `\nEmail: ${form.email}` : ''}\nSubject: ${form.subject}\n\nMessage: ${form.message}`
    )
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank')
    setSubmitted(true)
  }

  return (
    <div ref={ref}>
      <p className="text-[10px] tracking-[0.45em] uppercase mb-3" style={{ color: 'rgba(201,168,76,0.75)' }}>Write To Us</p>
      <h2 className="font-heading text-3xl md:text-[2.6rem] mb-2 leading-tight" style={{ color: 'rgba(255,248,240,0.94)' }}>
        Send Us A <span className="italic" style={{ color: 'rgba(226,194,125,0.92)' }}>Message</span>
      </h2>
      <p className="text-[13px] leading-relaxed mb-10" style={{ color: 'rgba(236,230,220,0.70)' }}>
        Every message is read personally. We reply within 24 hours.
      </p>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-5 py-20 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20, delay: 0.1 }}
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(201,168,76,0.18), rgba(201,168,76,0.06))',
                border: '1px solid rgba(201,168,76,0.40)',
                boxShadow: '0 0 32px rgba(201,168,76,0.18)',
              }}
            >
              <Check size={26} strokeWidth={1.5} className="text-gold-400" />
            </motion.div>
            <div>
              <h3 className="font-heading text-2xl text-ivory mb-2">Message Sent ✦</h3>
              <p className="text-sm font-light max-w-xs" style={{ color: 'rgba(255,252,245,0.75)' }}>
                We'll reply within 24 hours. Thank you for reaching out.
              </p>
            </div>
            <button
              onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', subject: 'Custom Order', message: '' }) }}
              className="text-[10px] tracking-[0.24em] uppercase transition-colors duration-300"
              style={{ color: 'rgba(201,168,76,0.55)', textDecoration: 'underline', textUnderlineOffset: '4px' }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(201,168,76,0.85)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(201,168,76,0.55)'}
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <GlassInput label="Your Name" value={form.name} onChange={set('name')} placeholder="Full name" required />
              <GlassInput label="WhatsApp Number" type="tel" value={form.phone} onChange={set('phone')} placeholder="+91 XXXXX XXXXX" required />
            </div>

            <GlassInput label="Email (optional)" type="email" value={form.email} onChange={set('email')} placeholder="your@email.com" />

            {/* Subject — pill chips */}
            <div className="flex flex-col gap-3">
              <label className="text-[10px] tracking-[0.26em] uppercase font-semibold" style={{ color: 'rgba(201,168,76,0.55)' }}>Subject</label>
              <div className="flex flex-wrap gap-2">
                {SUBJECTS.map((s) => {
                  const active = form.subject === s
                  return (
                    <motion.button
                      key={s}
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, subject: s }))}
                      whileTap={{ scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      className="outline-none select-none transition-all duration-300"
                      style={{
                        padding: '8px 18px',
                        fontSize: '10px',
                        letterSpacing: '0.22em',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                        borderRadius: '99px',
                        border: active
                          ? '1px solid rgba(201,168,76,0.90)'
                          : '1px solid rgba(201,168,76,0.18)',
                        background: active
                          ? 'linear-gradient(135deg, rgba(201,168,76,1) 0%, rgba(176,141,87,0.90) 100%)'
                          : 'rgba(255,255,255,0.025)',
                        color: active ? '#080503' : 'rgba(236,230,220,0.75)',
                        boxShadow: active
                          ? '0 0 20px rgba(201,168,76,0.25), inset 0 1px 0 rgba(255,255,255,0.15)'
                          : 'none',
                        cursor: 'pointer',
                        backdropFilter: 'blur(8px)',
                      }}
                      onMouseEnter={e => {
                        if (!active) {
                          e.currentTarget.style.borderColor = 'rgba(201,168,76,0.40)'
                          e.currentTarget.style.background = 'rgba(201,168,76,0.08)'
                          e.currentTarget.style.color = 'rgba(255,248,240,0.90)'
                        }
                      }}
                      onMouseLeave={e => {
                        if (!active) {
                          e.currentTarget.style.borderColor = 'rgba(201,168,76,0.18)'
                          e.currentTarget.style.background = 'rgba(255,255,255,0.025)'
                          e.currentTarget.style.color = 'rgba(236,230,220,0.75)'
                        }
                      }}
                    >
                      {s}
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-[0.26em] uppercase font-semibold" style={{ color: 'rgba(201,168,76,0.55)' }}>
                Message <span style={{ color: 'rgba(201,168,76,0.70)' }}>*</span>
              </label>
              <div className="relative">
                <textarea
                  value={form.message}
                  onChange={(e) => set('message')(e.target.value)}
                  placeholder="Tell us about your enquiry, custom fragrance vision, or anything else..."
                  rows={5}
                  className="w-full text-[14px] outline-none font-normal resize-none transition-all duration-400"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(201,168,76,0.14)',
                    borderRadius: '2px',
                    padding: '14px 16px',
                    color: 'rgba(255,248,240,0.90)',
                    caretColor: 'rgba(201,168,76,0.90)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.025)',
                  }}
                  onFocus={e => {
                    e.target.style.background = 'rgba(201,168,76,0.06)'
                    e.target.style.borderColor = 'rgba(201,168,76,0.55)'
                    e.target.style.boxShadow = '0 0 0 1px rgba(201,168,76,0.10), 0 4px 28px rgba(201,168,76,0.12), inset 0 1px 0 rgba(255,255,255,0.04)'
                  }}
                  onBlur={e => {
                    e.target.style.background = 'rgba(255,255,255,0.03)'
                    e.target.style.borderColor = 'rgba(201,168,76,0.14)'
                    e.target.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.025)'
                  }}
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <motion.button
                type="submit"
                disabled={!canSubmit}
                whileHover={canSubmit ? { y: -3 } : {}}
                whileTap={canSubmit ? { scale: 0.98, y: 0 } : {}}
                transition={{ duration: 0.35, ease: LUXURY }}
                className="relative w-full overflow-hidden flex items-center justify-center gap-3 transition-all duration-400 group"
                style={{
                  padding: '20px 28px',
                  fontSize: '11px',
                  letterSpacing: '0.38em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  background: canSubmit
                    ? 'linear-gradient(135deg, rgba(201,168,76,1) 0%, rgba(176,141,87,0.95) 100%)'
                    : 'rgba(201,168,76,0.22)',
                  color: canSubmit ? '#060402' : 'rgba(10,6,3,0.40)',
                  border: `1px solid ${canSubmit ? 'rgba(226,194,125,0.80)' : 'rgba(201,168,76,0.22)'}`,
                  boxShadow: canSubmit
                    ? '0 0 32px rgba(201,168,76,0.25), 0 8px 32px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.18)'
                    : 'none',
                  cursor: canSubmit ? 'pointer' : 'not-allowed',
                  userSelect: 'none',
                }}
              >
                {/* Shimmer */}
                {canSubmit && (
                  <span
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-600"
                    style={{ background: 'linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.12) 50%, transparent 75%)' }}
                  />
                )}
                <Send size={14} strokeWidth={1.5} />
                <span className="relative">Send via WhatsApp</span>
              </motion.button>
              <p className="text-center mt-3 text-[9px] tracking-[0.22em] uppercase" style={{ color: 'rgba(201,168,76,0.45)' }}>
                Opens WhatsApp · Message pre-filled
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
