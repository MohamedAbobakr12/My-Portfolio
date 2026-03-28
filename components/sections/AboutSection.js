'use client'
// components/sections/AboutSection.js
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CheckCircle2, Code2, Rocket, Users } from 'lucide-react'
import { personalInfo, services } from '../../lib/data'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

const values = [
  { icon: <Code2 size={20} />, title: 'Clean Code', desc: 'Scalable, readable, maintainable.' },
  { icon: <Rocket size={20} />, title: 'Ship Fast', desc: 'Deliver on time, every time.' },
  { icon: <Users size={20} />, title: 'Client First', desc: 'Your success is my success.' },
]

export default function AboutSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-left',
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      )
      gsap.fromTo('.about-right',
        { opacity: 0, x: 50 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      )
      gsap.fromTo('.about-value-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-values', start: 'top 80%' }
        }
      )
      gsap.fromTo('.service-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.services-grid', start: 'top 80%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section" id="about" ref={sectionRef}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center', marginBottom: '80px' }}>
          {/* Left */}
          <div className="about-left" style={{ opacity: 0 }}>
            <div className="accent-line"><span className="accent-label">About Me</span></div>
            <h2 style={{ fontSize: 'clamp(36px, 5vw, 54px)', marginBottom: '24px', lineHeight: 1.1 }}>
              Not Just a Developer.<br />
              <span style={{ color: 'var(--accent)' }}>A Growth Partner.</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '20px', fontSize: '17px' }}>
              I'm Mohamed Abobakr — a MERN stack developer who builds web products that actually move the needle. After 3+ years and 30+ projects, I've learned that great code alone doesn't win. Great products do.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '32px', fontSize: '17px' }}>
              Every client I work with gets a developer who thinks like a founder — obsessing over user experience, performance, and the business impact of every decision.
            </p>

            {/* Checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'MERN Stack expert with production experience',
                'Delivered 30+ projects on time and on budget',
                '100% client satisfaction rate on Upwork & direct',
                'Available for long-term partnerships',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                  <span style={{ color: 'var(--text-muted)', fontSize: '15px' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Profile Card */}
          <div className="about-right" style={{ opacity: 0 }}>
            <div style={{
              position: 'relative',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '40px',
              overflow: 'hidden',
            }}>
              {/* Glow */}
              <div style={{
                position: 'absolute',
                top: 0, right: 0,
                width: '200px', height: '200px',
                background: 'radial-gradient(circle, rgba(0,255,157,0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                transform: 'translate(30%, -30%)',
                pointerEvents: 'none',
              }} />

              {/* Avatar */}
              <div style={{
                width: '80px', height: '80px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, var(--accent), rgba(0,100,255,0.5))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '32px',
                marginBottom: '24px',
                boxShadow: '0 0 30px rgba(0,255,157,0.2)',
              }}>
                👨‍💻
              </div>

              <h3 style={{ fontSize: '24px', marginBottom: '4px' }}>{personalInfo.name}</h3>
              <p style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '13px', marginBottom: '24px' }}>
                {personalInfo.title}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { label: 'Location', value: personalInfo.location },
                  { label: 'Email', value: personalInfo.email },
                  { label: 'Status', value: personalInfo.availability },
                ].map(({ label, value }) => (
                  <div key={label} style={{
                    display: 'flex', justifyContent: 'space-between',
                    padding: '12px 0',
                    borderBottom: '1px solid var(--border)',
                  }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>{label.toUpperCase()}</span>
                    <span style={{ fontSize: '14px', color: label === 'Status' ? 'var(--accent)' : 'var(--text)' }}>{value}</span>
                  </div>
                ))}
              </div>

              <Link
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: '24px' }}
              >
                View GitHub Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="about-values" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '80px' }}>
          {values.map((v, i) => (
            <div key={i} className="about-value-card card" style={{ padding: '32px', opacity: 0, textAlign: 'center' }}>
              <div style={{
                width: '48px', height: '48px',
                background: 'var(--accent-dim)',
                border: '1px solid var(--border-accent)',
                borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent)',
                margin: '0 auto 16px',
              }}>
                {v.icon}
              </div>
              <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>{v.title}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Services */}
        <div className="accent-line" style={{ marginBottom: '40px' }}>
          <span className="accent-label">Services</span>
        </div>
        <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {services.map((s, i) => (
            <div key={i} className="service-card card" style={{ padding: '28px', opacity: 0, display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '32px' }}>{s.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h4 style={{ fontSize: '17px' }}>{s.title}</h4>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '18px',
                    color: 'var(--accent)',
                    background: 'var(--accent-dim)',
                    padding: '3px 8px',
                    borderRadius: '3px',
                  }}>
                    {s.tag}
                  </span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6 }}>{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .container > div:first-child { grid-template-columns: 1fr !important; gap: 40px !important; }
          .about-values { grid-template-columns: 1fr !important; }
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
