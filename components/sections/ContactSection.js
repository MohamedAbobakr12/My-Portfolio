'use client'
// components/sections/ContactSection.js
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Send, Mail, MapPin, Clock, CheckCircle } from 'lucide-react'
import { personalInfo } from '../../lib/data'
import axios from 'axios'

gsap.registerPlugin(ScrollTrigger)

export default function ContactSection() {
  const sectionRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-left',
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      )
      gsap.fromTo('.contact-right',
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
    if (!form.message.trim()) e.message = 'Message is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSending(true)

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact`, form)
      setSent(true)
    } catch (error) {
      alert('Failed to send message, please try again.')
    } finally {
      setSending(false);
    }
  }

  const inputStyle = (field) => ({
    width: '100%',
    padding: '14px 16px',
    background: 'var(--bg-alt)',
    border: `1px solid ${errors[field] ? '#ff6b6b' : 'var(--border)'}`,
    borderRadius: '8px',
    color: 'var(--text)',
    fontFamily: 'var(--font-body)',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s',
  })

  return (
    <section className="section" id="contact" ref={sectionRef}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
          {/* Left */}
          <div className="contact-left" style={{ opacity: 0 }}>
            <div className="accent-line"><span className="accent-label">Let's Work Together</span></div>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', marginTop: '16px', marginBottom: '24px' }}>
              Have a Project<br />in Mind?
              <span style={{ color: 'var(--accent)' }}> Let's Talk.</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: 1.8, marginBottom: '48px' }}>
              Whether you have a clear brief or just a rough idea — I'm here to help turn it into a polished product. Response time: under 24 hours.
            </p>

            {/* Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
              {[
                { icon: <Mail size={18} />, label: 'Email', value: personalInfo.email },
                { icon: <MapPin size={18} />, label: 'Location', value: personalInfo.location },
                { icon: <Clock size={18} />, label: 'Response Time', value: 'Within 24 hours' },
              ].map(({ icon, label, value }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '44px', height: '44px',
                    background: 'var(--accent-dim)',
                    border: '1px solid var(--border-accent)',
                    borderRadius: '10px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--accent)',
                    flexShrink: 0,
                  }}>
                    {icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '0.1em', marginBottom: '2px' }}>
                      {label.toUpperCase()}
                    </div>
                    <div style={{ fontSize: '15px' }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Availability indicator */}
            <div style={{
              padding: '16px 20px',
              background: 'rgba(0,255,157,0.06)',
              border: '1px solid var(--border-accent)',
              borderRadius: '12px',
              display: 'flex', alignItems: 'center', gap: '12px',
            }}>
              <div style={{
                width: '10px', height: '10px', borderRadius: '50%',
                background: 'var(--accent)',
                boxShadow: '0 0 10px var(--accent)',
                animation: 'pulse 2s ease-in-out infinite',
                flexShrink: 0,
              }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '2px' }}>Currently Available</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Accepting new projects starting immediately</div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="contact-right" style={{ opacity: 0 }}>
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '20px',
              padding: '40px',
            }}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{
                    width: '64px', height: '64px',
                    background: 'var(--accent-dim)',
                    border: '1px solid var(--border-accent)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 24px',
                    color: 'var(--accent)',
                  }}>
                    <CheckCircle size={28} />
                  </div>
                  <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>Message Sent!</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <button className="btn-outline" onClick={() => { setSent(false); setForm({ name: '', email: '', type: '', message: '' }) }}>
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>
                    Start a Conversation
                  </h3>

                  {/* Name + Email */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '0.1em', marginBottom: '8px' }}>
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Mohamed"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        style={inputStyle('name')}
                        onFocus={e => e.target.style.borderColor = 'var(--border-accent)'}
                        onBlur={e => e.target.style.borderColor = errors.name ? '#ff6b6b' : 'var(--border)'}
                        required
                      />
                      {errors.name && <span style={{ fontSize: '12px', color: '#ff6b6b', marginTop: '4px', display: 'block' }}>{errors.name}</span>}
                    </div>
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '0.1em', marginBottom: '8px' }}>
                        EMAIL *
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. name@company.com"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        style={inputStyle('email')}
                        onFocus={e => e.target.style.borderColor = 'var(--border-accent)'}
                        onBlur={e => e.target.style.borderColor = errors.email ? '#ff6b6b' : 'var(--border)'}
                        required
                      />
                      {errors.email && <span style={{ fontSize: '12px', color: '#ff6b6b', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
                    </div>
                  </div>

                  {/* Type */}
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '0.1em', marginBottom: '8px' }}>
                      PROJECT TYPE
                    </label>
                    <select
                      value={form.type}
                      onChange={e => setForm({ ...form, type: e.target.value })}
                      style={{ ...inputStyle('type'), appearance: 'none' }}
                      required
                    >
                      <option value="" style={{ background: 'var(--bg-card)' }}>Select a type...</option>
                      <option value="landing-page" style={{ background: 'var(--bg-card)' }}>Landing Page</option>
                      <option value="web-app" style={{ background: 'var(--bg-card)' }}>Web App</option>
                      <option value="api" style={{ background: 'var(--bg-card)' }}>API Development</option>
                      <option value="saas" style={{ background: 'var(--bg-card)' }}>SaaS Platform</option>
                      <option value="ecommerce" style={{ background: 'var(--bg-card)' }}>E-Commerce</option>
                      <option value="other" style={{ background: 'var(--bg-card)' }}>Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '0.1em', marginBottom: '8px' }}>
                      YOUR MESSAGE *
                    </label>
                    <textarea
                      placeholder="Tell me about your project — what you want to build, your timeline, and any specific requirements..."
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      rows={5}
                      style={{ ...inputStyle('message'), resize: 'vertical', minHeight: '120px' }}
                      onFocus={e => e.target.style.borderColor = 'var(--border-accent)'}
                      onBlur={e => e.target.style.borderColor = errors.message ? '#ff6b6b' : 'var(--border)'}
                    />
                    {errors.message && <span style={{ fontSize: '12px', color: '#ff6b6b', marginTop: '4px', display: 'block' }}>{errors.message}</span>}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={sending}
                    style={{ justifyContent: 'center', fontSize: '15px', padding: '16px', opacity: sending ? 0.7 : 1 }}
                  >
                    {sending ? (
                      <>
                        <div style={{
                          width: '16px', height: '16px',
                          border: '2px solid rgba(10,10,15,0.3)',
                          borderTopColor: '#0a0a0f',
                          borderRadius: '50%',
                          animation: 'spin 0.8s linear infinite',
                        }} />
                        Sending...
                      </>
                    ) : (
                      <><Send size={16} /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 10px var(--accent); }
          50% { opacity: 0.6; box-shadow: 0 0 4px var(--accent); }
        }
        @media (max-width: 768px) {
          #contact .container > div { grid-template-columns: 1fr !important; gap: 40px !important; }
          #contact form > div:first-of-type { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
