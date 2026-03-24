'use client'
// components/sections/HeroSection.js
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowDown, Github, Linkedin, Twitter, Facebook, Phone, Sparkles } from 'lucide-react'
import { personalInfo } from '../../lib/data'

export default function HeroSection() {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const orb1Ref = useRef(null)
  const orb2Ref = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.2 })

    // Staggered entrance
    tl.fromTo('.hero-label',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    )
    .fromTo('.hero-h1-line',
      { opacity: 0, y: 60, skewY: 3 },
      { opacity: 1, y: 0, skewY: 0, duration: 0.9, stagger: 0.12, ease: 'power4.out' },
      '-=0.3'
    )
    .fromTo('.hero-sub',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo('.hero-ctas',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo('.hero-stats',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo('.hero-scroll',
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      '-=0.2'
    )
    .fromTo('.hero-social',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
      '-=0.5'
    )

    // Mouse parallax on orbs
    const onMove = (e) => {
      const { innerWidth: W, innerHeight: H } = window
      const dx = (e.clientX - W / 2) / W
      const dy = (e.clientY - H / 2) / H

      gsap.to(orb1Ref.current, {
        x: dx * 60,
        y: dy * 40,
        duration: 1.5,
        ease: 'power2.out',
      })
      gsap.to(orb2Ref.current, {
        x: dx * -40,
        y: dy * -30,
        duration: 2,
        ease: 'power2.out',
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg)',
      }}
    >
      {/* Animated Background */}
      <div className="bg-grid" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      {/* Glowing Orbs */}
      <div ref={orb1Ref} style={{
        position: 'absolute',
        top: '15%', left: '10%',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(0,255,157,0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0,
        filter: 'blur(40px)',
      }} />
      <div ref={orb2Ref} style={{
        position: 'absolute',
        bottom: '20%', right: '5%',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(0,100,255,0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0,
        filter: 'blur(50px)',
      }} />

      {/* Social Links (Vertical) */}
      <div style={{
        position: 'absolute',
        left: '28px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        zIndex: 2,
      }} className="hero-social-container">
        {[
          { icon: <Github size={16} />, href: personalInfo.social.github },
          { icon: <Linkedin size={16} />, href: personalInfo.social.linkedin },
          { icon: <Twitter size={16} />, href: personalInfo.social.twitter },
          { icon: <Facebook size={16} />, href: personalInfo.social.facebook },
          { icon: <Phone size={16} />, href: personalInfo.social.whatsapp },
        ].map((s, i) => (
          <a
            key={i}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social"
            style={{
              width: '36px', height: '36px',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'all 0.3s',
              background: 'var(--bg-glass)',
              backdropFilter: 'blur(10px)',
              opacity: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
          >
            {s.icon}
          </a>
        ))}
        <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, var(--border), transparent)' }} />
      </div>

      {/* Main Content */}
      <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '100px', paddingBottom: '80px' }}>
        {/* Label */}
        <div className="accent-line hero-label" style={{ opacity: 0, marginBottom: '24px' }}>
          <span className="accent-label">Available for Projects</span>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '4px 10px',
            background: 'rgba(0,255,157,0.1)',
            border: '1px solid var(--border-accent)',
            borderRadius: '20px',
          }}>
            <div style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: 'var(--accent)',
              animation: 'pulse 2s ease-in-out infinite',
            }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)' }}>
              Open to Work
            </span>
          </div>
        </div>

        {/* Headline */}
        <div ref={headlineRef} style={{ overflow: 'hidden', marginBottom: '28px' }}>
          <h1 style={{
            fontSize: 'clamp(48px, 8vw, 96px)',
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: '-0.04em',
            color: 'var(--text)',
          }}>
            {['I Build', 'Products That', 'Win Clients.'].map((line, i) => (
              <div
                key={i}
                className="hero-h1-line"
                style={{
                  display: 'block',
                  opacity: 0,
                  color: i === 2 ? 'var(--accent)' : 'var(--text)',
                }}
              >
                {line}
              </div>
            ))}
          </h1>
        </div>

        {/* Subtitle */}
        <p className="hero-sub" style={{
          fontSize: 'clamp(16px, 2vw, 20px)',
          color: 'var(--text-muted)',
          maxWidth: '600px',
          lineHeight: 1.7,
          marginBottom: '40px',
          opacity: 0,
        }}>
          {personalInfo.bio}
        </p>

        {/* CTA Buttons */}
        <div className="hero-ctas" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '64px', opacity: 0 }}>
          <a
            href="#projects"
            onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="btn-primary"
            style={{ fontSize: '15px', padding: '16px 32px' }}
          >
            <Sparkles size={16} />
            View My Work
          </a>
          <a
            href="#contact"
            onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="btn-outline"
            style={{ fontSize: '15px', padding: '16px 32px' }}
          >
            Hire Me →
          </a>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
          {[
            { number: '30+', label: 'Projects Shipped' },
            { number: '20+', label: 'Happy Clients' },
            { number: '3+', label: 'Years Experience' },
            { number: '100%', label: 'Client Satisfaction' },
          ].map((stat, i) => (
            <div key={i} className="hero-stats" style={{ opacity: 0 }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 40px)',
                fontWeight: 800,
                color: 'var(--accent)',
                lineHeight: 1,
                marginBottom: '4px',
              }}>
                {stat.number}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--text-muted)',
                letterSpacing: '0.1em',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        className="hero-scroll"
        onClick={scrollToNext}
        style={{
          position: 'absolute',
          bottom: '0px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: 0,
          zIndex: 2,
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em' }}>SCROLL</span>
        <div style={{
          width: '24px', height: '40px',
          border: '1.5px solid var(--border-mouse)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '6px',
        }}>
          <div style={{
            width: '3px', height: '8px',
            background: 'var(--accent)',
            borderRadius: '2px',
            animation: 'float 1.5s ease-in-out infinite',
          }} />
        </div>
      </button>

      <style>{`
        @media (max-width: 768px) {
          .hero-social-container { display: none; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </section>
  )
}
