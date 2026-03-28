'use client'
// components/layout/Footer.js
import { Github, Linkedin, Twitter, Facebook, Phone, Heart } from 'lucide-react'
import { personalInfo } from '../../lib/data'
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      padding: '50px 0 30px',
      borderTop: '1px solid var(--border)',
      background: 'var(--bg-alt)',
    }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px', marginBottom: '40px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, marginBottom: '8px' }}>
              MA<span style={{ color: 'var(--accent)' }}>.</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '300px' }}>
              Building premium web experiences that drive real business results.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {[
              { icon: <Github size={18} />, href: personalInfo.social.github },
              { icon: <Linkedin size={18} />, href: personalInfo.social.linkedin },
              { icon: <Twitter size={18} />, href: personalInfo.social.twitter },
              { icon: <Facebook size={18} />, href: personalInfo.social.facebook},
              { icon: <Phone size={18} />, href: personalInfo.social.whatsapp},
            ].map((s, i) => (
              <Link key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{
                  width: '42px', height: '42px',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-muted)',
                  transition: 'all 0.3s',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
              >
                {s.icon}
              </Link>
            ))}
          </div>
        </div>

        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: '24px', borderTop: '1px solid var(--border)',
          flexWrap: 'wrap', gap: '12px',
        }}>
          <p style={{ color: 'var(--text-dim)', fontSize: '13px', fontFamily: 'var(--font-mono)' }}>
            © { new Date().getFullYear() } Mohamed Abobakr. All rights reserved.
          </p>
          <p style={{ color: 'var(--text-dim)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            Built with <Heart size={12} style={{ color: 'var(--accent)' }} /> Mohamed Abobakr
          </p>
        </div>
      </div>
    </footer>
  )
}
