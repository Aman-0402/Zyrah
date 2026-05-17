import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Check } from 'lucide-react'
import { useGSAPReveal } from '../../hooks/useGSAPReveal'
import Button from '../ui/Button'

const WA_NUMBER = '919999999999'

const SUBJECTS = ['Custom Order', 'General Enquiry', 'Feedback', 'Other']

function LuxuryInput({ label, type = 'text', value, onChange, placeholder, required }) {
  const [focused, setFocused] = useState(false)
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[9px] tracking-[0.35em] uppercase text-ivory/30">
        {label}{required && <span className="text-gold-400/60 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="bg-transparent border-b py-2.5 text-sm text-ivory/80 outline-none transition-colors duration-300 placeholder:text-ivory/15 font-light"
        style={{ borderColor: focused ? 'rgba(201,168,76,0.6)' : 'rgba(201,168,76,0.12)' }}
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
      `Hi m_m_attarwala! 🌸\n\nName: ${form.name}\nPhone: ${form.phone}${form.email ? `\nEmail: ${form.email}` : ''}\nSubject: ${form.subject}\n\nMessage: ${form.message}\n\n— Sent via mmattarwala.com`
    )
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank')
    setSubmitted(true)
  }

  return (
    <div ref={ref}>
      <p className="text-[10px] tracking-[0.45em] uppercase text-gold-400/50 mb-3">Write To Us</p>
      <h2 className="font-heading text-3xl md:text-4xl text-ivory mb-8">
        Send Us A <span className="italic text-gold-300">Message</span>
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
              <p className="text-ivory/40 text-sm font-light max-w-xs">
                We'll reply within 24 hours. Thank you for reaching out.
              </p>
            </div>
            <button
              onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', subject: 'Custom Order', message: '' }) }}
              className="text-[9px] tracking-[0.35em] uppercase text-ivory/25 hover:text-ivory/50 transition-colors duration-300 underline underline-offset-4"
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
            <div className="flex flex-col gap-2.5">
              <label className="text-[9px] tracking-[0.35em] uppercase text-ivory/30">Subject</label>
              <div className="flex flex-wrap gap-2">
                {SUBJECTS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, subject: s }))}
                    className={[
                      'px-4 py-1.5 text-[10px] tracking-[0.25em] uppercase transition-all duration-300 border outline-none',
                      form.subject === s
                        ? 'bg-gold-400 text-black border-gold-400'
                        : 'bg-transparent text-ivory/40 border-gold-400/18 hover:border-gold-400/40 hover:text-ivory/70',
                    ].join(' ')}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] tracking-[0.35em] uppercase text-ivory/30">
                Message <span className="text-gold-400/60">*</span>
              </label>
              <textarea
                value={form.message}
                onChange={(e) => set('message')(e.target.value)}
                placeholder="Tell us about your enquiry, custom fragrance vision, or anything else..."
                rows={4}
                className="bg-transparent border-b border-gold-400/12 py-2.5 text-sm text-ivory/80 outline-none transition-colors duration-300 placeholder:text-ivory/15 font-light resize-none focus:border-gold-400/55"
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
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
              <p className="text-center mt-3 text-[8px] tracking-[0.3em] uppercase text-ivory/18">
                Opens WhatsApp with your message pre-filled
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
