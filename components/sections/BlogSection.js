'use client'
// components/sections/BlogSection.js
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Clock, ArrowUpRight } from 'lucide-react'
import { blogPosts } from '../../lib/data'

gsap.registerPlugin(ScrollTrigger)

export default function BlogSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.blog-header',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      )
      gsap.fromTo('.blog-card',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.blog-grid', start: 'top 80%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section" id="blog" ref={sectionRef} style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        {/* Header */}
        <div className="blog-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', opacity: 0, flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <div className="accent-line"><span className="accent-label">Writing</span></div>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', marginTop: '12px' }}>
              Thoughts &<br /><span style={{ color: 'var(--accent)' }}>Insights</span>
            </h2>
          </div>
          <p style={{ color: 'var(--text-muted)', maxWidth: '300px', fontSize: '15px', lineHeight: 1.7 }}>
            I write about MERN stack, freelancing, and building products that matter.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {blogPosts.map((post, i) => (
            <article
              key={post.id}
              className="blog-card"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                overflow: 'hidden',
                opacity: 0,
                transition: 'all 0.35s',
                cursor: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--border-accent)'
                e.currentTarget.style.transform = 'translateY(-6px)'
                e.currentTarget.style.boxShadow = '0 20px 40px var(--shadow)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                <img src={post.image} alt={post.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.target.style.transform = 'none'}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, transparent 50%, rgba(10,10,15,0.7))',
                }} />
                <span style={{
                  position: 'absolute', bottom: '12px', left: '12px',
                  padding: '4px 10px',
                  background: 'var(--accent)',
                  color: '#0a0a0f',
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  borderRadius: '3px',
                  letterSpacing: '0.1em',
                }}>
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-dim)' }}>{post.date}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-dim)' }}>
                    <Clock size={11} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }}>{post.readTime}</span>
                  </div>
                </div>

                <h3 style={{ fontSize: '17px', lineHeight: 1.4, marginBottom: '10px' }}>{post.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>{post.excerpt}</p>

                <a
                  href={`/blog/${post.slug}`}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    color: 'var(--accent)',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '14px',
                    fontFamily: 'var(--font-mono)',
                    transition: 'gap 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                  onMouseLeave={e => e.currentTarget.style.gap = '6px'}
                >
                  Read Article <ArrowUpRight size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* View All */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <a href="/blog" className="btn-outline">
            View All Articles →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .blog-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 600px) and (max-width: 900px) {
          .blog-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
