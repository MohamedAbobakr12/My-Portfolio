'use client'
// components/layout/Navbar.js
import { useEffect, useRef, useState } from 'react'
import { useTheme } from './ThemeProvider'
import { gsap } from 'gsap'
import { Sun, Moon, Menu, X, Github, Linkedin, Twitter, Facebook, Phone } from 'lucide-react'
import Link from 'next/link'
import { personalInfo } from '../../lib/data'

const navLinks = [
  { label: '01. About', href: '#about' },
  { label: '02. Skills', href: '#skills' },
  { label: '03. Projects', href: '#projects' },
  { label: '04. Blog', href: '#blog' },
  { label: '05. Contact', href: '#contact' },
]

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const navRef = useRef(null)

  useEffect(() => {
    // GSAP entrance
    const tl = gsap.timeline({ delay: 2.5 })
    tl.fromTo(navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )

    // Scroll listener
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      // Active section detection
      const sections = document.querySelectorAll('section[id]')
      let current = ''
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 200) current = s.id
      })
      setActiveSection(current)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
      setMenuOpen(false)
    }
  }

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: scrolled ? '12px 0' : '20px 0',
        transition: 'all 0.4s ease',
        background: scrolled
          ? 'var(--bg-nav)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link
          href="#"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '22px',
            fontWeight: 800,
            color: 'var(--text)',
            textDecoration: 'none',
            letterSpacing: '-0.03em',
          }}
        >
          MA<span style={{ color: 'var(--accent)' }}>.</span>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="desktop-nav">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={e => handleNavClick(e, link.href)}
              className={`nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Theme Toggle */}
          <button
            onClick={toggle}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              background: 'var(--bg-glass)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s',
              backdropFilter: 'blur(10px)',
            }}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Hire Me */}
          <Link
            href="#contact"
            onClick={e => handleNavClick(e, '#contact')}
            className="btn-primary"
            style={{ padding: '10px 20px', fontSize: '13px' }}
          >
            Hire Me
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none',
              width: '38px', height: '38px',
              background: 'var(--bg-glass)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              color: 'var(--text)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0, right: 0,
          background: 'var(--bg-card)',
          borderBottom: '1px solid var(--border)',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          backdropFilter: 'blur(20px)',
        }}>
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={e => handleNavClick(e, link.href)}
              style={{
                color: 'var(--text)',
                textDecoration: 'none',
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
              }}
            >
              {link.label}
            </Link>
          ))}

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            zIndex: 2,
          }}>
            {[
              { icon: <Github size={16} />, href: personalInfo.social.github },
              { icon: <Linkedin size={16} />, href: personalInfo.social.linkedin },
              { icon: <Twitter size={16} />, href: personalInfo.social.twitter },
              { icon: <Facebook size={16} />, href: personalInfo.social.facebook },
              { icon: <Phone size={16} />, href: personalInfo.social.whatsapp },
            ].map((s, i) => (
              <Link
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
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
              >
                {s.icon}
              </Link>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
