'use client'
// components/sections/SkillsSection.js
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { categoryColors, skills } from '../../lib/data'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

const CATEGORIES = ['all', 'frontend', 'backend', 'database', 'devops', 'language', 'tools']

export default function SkillsSection() {
  const sectionRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [animated, setAnimated] = useState(false)

  const filtered = activeCategory === 'all' ? skills : skills.filter(s => s.category === activeCategory)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.skills-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      )
      ScrollTrigger.create({
        trigger: '.skills-grid',
        start: 'top 80%',
        onEnter: () => setAnimated(true),
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!animated) return
    gsap.fromTo('.skill-item',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' }
    )
    // Animate skill bars
    setTimeout(() => {
      document.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const badge = bar.getAttribute('data-badge')
        bar.style.width = '100%'
      })
    }, 200)
  }, [animated, filtered])

  const handleCategoryChange = (cat) => {
    gsap.to('.skill-item', {
      opacity: 0, y: 10, duration: 0.2, stagger: 0.03,
      onComplete: () => {
        setActiveCategory(cat)
        setTimeout(() => {
          gsap.fromTo('.skill-item',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.06 }
          )
          document.querySelectorAll('.skill-bar-fill').forEach(bar => {
            bar.style.width = '0'
            setTimeout(() => { bar.style.width = `${bar.getAttribute('data-badge')}` }, 100)
          })
        }, 50)
      }
    })
  }

  return (
    <section className="section" id="skills" ref={sectionRef} style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        {/* Header */}
        <div className="skills-header" style={{ textAlign: 'center', marginBottom: '60px', opacity: 0 }}>
          <div className="accent-line" style={{ justifyContent: 'center' }}>
            <span className="accent-label">Skills & Expertise</span>
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', marginTop: '16px', marginBottom: '16px' }}>
            My Technical Arsenal
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto', fontSize: '16px' }}>
            Constantly learning and evolving. Here's what I bring to every project.
          </p>
        </div>

        {/* Category Filter */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              style={{
                padding: '8px 18px',
                background: activeCategory === cat ? 'var(--accent)' : 'var(--bg-glass)',
                color: activeCategory === cat ? '#0a0a0f' : 'var(--text-muted)',
                border: `1px solid ${activeCategory === cat ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: '4px',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                transition: 'all 0.3s',
                backdropFilter: 'blur(10px)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div
          className="skills-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px',
          }}
        >
          {filtered.map((skill, i) => (
            <div
              key={i}
              className="skill-item"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '20px',
                opacity: 0,
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--border-accent)'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 10px 30px var(--shadow)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '20px' }}>{skill.icon}</span>
                  <span style={{ fontWeight: 600, fontSize: '15px' }}>{skill.name}</span>
                </div>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  color: 'var(--accent)',
                  fontWeight: 600,
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: categoryColors[skill.category],
                    boxShadow: '0 0 6px 2px ${categoryColors[skill.category]}',
                    flexShrink: 0,
                  }} />
                </span>
              </div>
              <div className="skill-bar">
                <div
                  className="skill-bar-fill"
                  data-badge={skill.badge}
                  style={{ width: '0%' }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
            Always learning. Currently exploring: <span style={{ color: 'var(--accent)' }}>AI/ML integration</span> & <span style={{ color: 'var(--accent)' }}>Web3</span>
          </p>
          <Link
            href="https://github.com/MohamedAbobakr12"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            See My Code on GitHub
          </Link>
        </div>
      </div>
    </section>
  )
}
