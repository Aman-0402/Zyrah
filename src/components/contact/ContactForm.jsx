import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Check } from 'lucide-react'
import { useGSAPReveal } from '../../hooks/useGSAPReveal'

const WA_NUMBER = '919724586101'

const SUBJECTS = ['Custom Order', 'General Enquiry', 'Feedback', 'Other']

function LuxuryInput({ label, type = 'text', value, onChange, placeholder, required }) {
  const [focused, setFocused] = useState(false)
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-[10px] tracking-[0.22em] uppercase font-semibold"
        style={{ color: focused ? 'rgba(201,168,76,0.72)' : 'rgba(255,252,245,0.82)', transition: 'color 0.35s' }}
      >
        {label}{required && <span style={{ color: 'rgba(201,168,76,0.72)', marginLeft: '4px' }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="text-[15px] outline-none font-normal transition-all duration-350"
        style={{
          background: focused ? 'rgba(201,168,76,0.04)' : 'rgba(255,255,255,0.022)',
          border: `1px solid ${focused ? 'rgba(201,168,76,0.60)' : 'rgba(201,168,76,0.16)'}`,
          padding: '12px 14px',
          color: 'rgba(255,248,240,0.88)',
          caretColor: 'rgba(201,168,76,0.85)',
          boxShadow: focused ? '0 0 0 1px rgba(201,168,76,0.12), 0 4px 22px rgba(201,168,76,0.10)' : 'none',
        }}
      />
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
      <p className="text-[10px] tracking-[0.45em] uppercase mb-3" style={{ color: 'rgba(201,168,76,0.82)' }}>Write To Us</p>
      <h2 className="font-heading text-3xl md:text-4xl mb-8" style={{ color: 'rgba(255,248,240,0.92)' }}>
        Send Us A <span className="italic" style={{ color: 'rgba(226,194,125,0.90)' }}>Message</span>
      </h2>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-5 py-16 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.35)' }}
            >
              <Check size={24} strokeWidth={1.5} className="text-gold-400" />
            </motion.div>
            <div>
              <h3 className="font-heading text-2xl text-ivory mb-2">Message Sent ✦</h3>
              <p className="text-sm font-light max-w-xs" style={{ color: 'rgba(255,252,245,0.82)' }}>
                We'll reply within 24 hours. Thank you for reaching out.
              </p>
            </div>
            <button
              onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', subject: 'Custom Order', message: '' }) }}
              className="text-[10px] tracking-[0.22em] uppercase text-ivory/55 hover:text-ivory/80 transition-colors duration-300 underline underline-offset-4"
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
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <LuxuryInput label="Your Name" value={form.name} onChange={set('name')} placeholder="Full name" required />
              <LuxuryInput label="WhatsApp Number" type="tel" value={form.phone} onChange={set('phone')} placeholder="+91 XXXXX XXXXX" required />
            </div>

            <LuxuryInput label="Email (optional)" type="email" value={form.email} onChange={set('email')} placeholder="your@email.com" />

            {/* Subject chips */}
            <div className="flex flex-col gap-3">
              <label className="text-[10px] tracking-[0.22em] uppercase font-semibold" style={{ color: 'rgba(236,230,220,0.88)' }}>Subject</label>
              <div className="flex flex-wrap gap-2.5">
                {SUBJECTS.map((s) => {
                  const active = form.subject === s
                  return (
                    <motion.button
                      key={s}
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, subject: s }))}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97, y: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="outline-none select-none flex items-center justify-center"
                      style={{
                        padding: '10px 20px',
                        fontSize: '9px',
                        letterSpacing: '0.28em',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                        border: active
                          ? '1px solid rgba(201,168,76,0.80)'
                          : '1px solid rgba(201,168,76,0.20)',
                        background: active
                          ? 'linear-gradient(180deg, rgba(224,188,86,1) 0%, rgba(182,141,42,1) 100%)'
                          : 'rgba(255,255,255,0.018)',
                        color: active
                          ? 'rgba(10,6,3,0.92)'
                          : 'rgba(255,252,245,0.80)',
                        boxShadow: active
                          ? '0 0 22px rgba(201,168,76,0.22), inset 0 1px 0 rgba(255,255,255,0.14)'
                          : 'inset 0 1px 0 rgba(255,255,255,0.03)',
                        cursor: 'pointer',
                        transition: 'background 0.35s, border-color 0.35s, color 0.35s, box-shadow 0.35s',
                      }}
                      onMouseEnter={e => {
                        if (!active) {
                          e.currentTarget.style.borderColor = 'rgba(201,168,76,0.42)'
                          e.currentTarget.style.color = 'rgba(255,248,240,0.78)'
                          e.currentTarget.style.background = 'rgba(201,168,76,0.06)'
                        }
                      }}
                      onMouseLeave={e => {
                        if (!active) {
                          e.currentTarget.style.borderColor = 'rgba(201,168,76,0.20)'
                          e.currentTarget.style.color = 'rgba(255,252,245,0.80)'
                          e.currentTarget.style.background = 'rgba(255,255,255,0.018)'
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
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-[0.22em] uppercase font-semibold" style={{ color: 'rgba(236,230,220,0.88)' }}>
                Message <span style={{ color: 'rgba(201,168,76,0.65)' }}>*</span>
              </label>
              <textarea
                value={form.message}
                onChange={(e) => set('message')(e.target.value)}
                placeholder="Tell us about your enquiry, custom fragrance vision, or anything else..."
                rows={5}
                className="text-[15px] outline-none font-normal resize-none transition-all duration-350"
                style={{
                  background: 'rgba(255,255,255,0.022)',
                  border: '1px solid rgba(201,168,76,0.16)',
                  padding: '12px 14px',
                  color: 'rgba(255,248,240,0.88)',
                  caretColor: 'rgba(201,168,76,0.85)',
                }}
                onFocus={e => {
                  e.target.style.background = 'rgba(201,168,76,0.04)'
                  e.target.style.borderColor = 'rgba(201,168,76,0.60)'
                  e.target.style.boxShadow = '0 0 0 1px rgba(201,168,76,0.12), 0 4px 22px rgba(201,168,76,0.10)'
                }}
                onBlur={e => {
                  e.target.style.background = 'rgba(255,255,255,0.022)'
                  e.target.style.borderColor = 'rgba(201,168,76,0.16)'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <motion.button
                type="submit"
                disabled={!canSubmit}
                whileHover={canSubmit ? { y: -3, boxShadow: '0 16px 40px rgba(201,168,76,0.30)' } : {}}
                whileTap={canSubmit ? { scale: 0.98, y: 0 } : {}}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="w-full flex items-center justify-center gap-3 transition-all duration-400"
                style={{
                  padding: '18px 28px',
                  fontSize: '10px',
                  letterSpacing: '0.38em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  background: canSubmit ? 'rgba(201,168,76,1)' : 'rgba(201,168,76,0.35)',
                  color: canSubmit ? '#0a0603' : 'rgba(10,6,3,0.5)',
                  border: `1px solid ${canSubmit ? 'rgba(201,168,76,1)' : 'rgba(201,168,76,0.35)'}`,
                  boxShadow: canSubmit ? '0 0 28px rgba(201,168,76,0.22)' : 'none',
                  cursor: canSubmit ? 'pointer' : 'not-allowed',
                  userSelect: 'none',
                }}
              >
                <MessageCircle size={15} strokeWidth={1.5} />
                Send via WhatsApp
              </motion.button>
              <p className="text-center mt-3 text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(236,230,220,0.76)' }}>
                Opens WhatsApp with your message pre-filled
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
