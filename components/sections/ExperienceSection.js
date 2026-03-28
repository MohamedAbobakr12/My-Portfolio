'use client'
// components/sections/ExperienceSection.js
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Briefcase, GraduationCap } from 'lucide-react'
import { experience } from '../../lib/data'

gsap.registerPlugin(ScrollTrigger)

export default function ExperienceSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.exp-header',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      )
      gsap.fromTo('.timeline-line',
        { scaleY: 0, transformOrigin: 'top' },
        { scaleY: 1, duration: 1.5, ease: 'power3.out',
          scrollTrigger: { trigger: '.timeline-container', start: 'top 80%' } }
      )
      gsap.fromTo('.timeline-item',
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.7, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.timeline-container', start: 'top 80%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section" id="experience" ref={sectionRef} style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        <div className="exp-header" style={{ marginBottom: '60px', opacity: 0 }}>
          <div className="accent-line"><span className="accent-label">Journey</span></div>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', marginTop: '12px' }}>
            Experience &<br /><span style={{ color: 'var(--accent)' }}>Education</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', marginBottom: '80px' }}>
          {/* Timeline */}
          <div className="timeline-container" style={{ position: 'relative' }}>
            {/* Line */}
            <div className="timeline-line" style={{
              position: 'absolute', left: '18px', top: 0, bottom: 0,
              width: '1px', background: 'linear-gradient(to bottom, var(--accent), var(--border))',
            }} />

            {experience.map((item, i) => (
              <div key={i} className="timeline-item" style={{
                display: 'flex', gap: '28px', marginBottom: '40px', opacity: 0, position: 'relative',
              }}>
                {/* Dot */}
                <div style={{
                  width: '38px', height: '38px', flexShrink: 0,
                  background: item.type === 'work' ? 'var(--accent-dim)' : 'rgba(100,100,255,0.1)',
                  border: `1px solid ${item.type === 'work' ? 'var(--border-accent)' : 'rgba(100,100,255,0.3)'}`,
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: item.type === 'work' ? 'var(--accent)' : '#6464ff',
                  zIndex: 1,
                }}>
                  {item.type === 'work' ? <Briefcase size={16} /> : <GraduationCap size={16} />}
                </div>

                <div>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '11px',
                    color: 'var(--accent)', letterSpacing: '0.1em',
                    display: 'block', marginBottom: '6px',
                  }}>
                    {item.year}
                  </span>
                  <h4 style={{ fontSize: '18px', marginBottom: '4px' }}>{item.role}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '10px' }}>{item.company}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6, marginBottom: '12px' }}>
                    {item.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {item.skills.map(s => <span key={s} className="tag">{s}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right panel — Quick facts */}
          <div>
            <h3 style={{ fontSize: '24px', marginBottom: '32px', color: 'var(--text-muted)', fontWeight: 400 }}>
              Numbers that <span style={{ color: 'var(--text)', fontWeight: 700 }}>speak for themselves</span>
            </h3>
            <div style={{ display: 'grid', gap: '16px', marginBottom: '40px' }} className='grid-cols-2 max-md:grid-cols-1'>
              {[
                { n: '30+', label: 'Projects Completed', emoji: '🚀' },
                { n: '20+', label: 'Happy Clients', emoji: '🤝' },
                { n: '3+', label: 'Years Experience', emoji: '⏱️' },
                { n: '100%', label: 'Satisfaction Rate', emoji: '⭐' },
                { n: '10+', label: 'Open Source Repos', emoji: '🐙' },
                { n: '24/7', label: 'Available Support', emoji: '🛠️' },
              ].map((stat, i) => (
                <div key={i} style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '20px',
                  transition: 'all 0.3s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-accent)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none' }}
                >
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>{stat.emoji}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>{stat.n}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.05em', marginTop: '4px' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #experience .container > div:first-child { display: none; }
          #experience .container > div:nth-child(3) { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  )
}
