'use client'
// components/sections/ProjectsSection.js
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, Github, Star } from 'lucide-react'
import { projects } from '../../lib/data'

gsap.registerPlugin(ScrollTrigger)

const PLATFORM_FILTERS = ['all', 'web', 'mobile', 'desktop']
const TYPE_FILTERS = ['all', 'fullstack', 'frontend', 'backend']

export default function ProjectsSection() {
  const sectionRef = useRef(null)
  const [platform, setPlatform] = useState('all')
  const [type, setType] = useState('all')
  const [hoveredId, setHoveredId] = useState(null)

  const filtered = projects.filter(p => {
    const matchPlatform = platform === 'all' || p.platform === platform
    const matchType = type === 'all' || p.type === type
    return matchPlatform && matchType
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.projects-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const animateCards = () => {
    gsap.fromTo('.project-card',
      { opacity: 0, y: 30, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' }
    )
  }

  useEffect(() => {
    const timer = setTimeout(animateCards, 100)
    return () => clearTimeout(timer)
  }, [filtered.length])

  const handleFilterChange = (setter, value) => {
    gsap.to('.project-card', {
      opacity: 0, y: 10, scale: 0.97, duration: 0.2, stagger: 0.04,
      onComplete: () => {
        setter(value)
      }
    })
  }

  return (
    <section className="section" id="projects" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="projects-header" style={{ marginBottom: '48px', opacity: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <div className="accent-line"><span className="accent-label">Portfolio</span></div>
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', marginTop: '12px' }}>
                Selected Work<br />
                <span style={{ color: 'var(--accent)' }}>that Ships</span>
              </h2>
            </div>
            <p style={{ color: 'var(--text-muted)', maxWidth: '300px', fontSize: '15px', lineHeight: 1.7 }}>
              Every project here solved a real problem. No fake projects, no tutorial clones.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '32px', marginBottom: '40px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Platform */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '0.15em' }}>PLATFORM:</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {PLATFORM_FILTERS.map(f => (
                <button key={f} onClick={() => handleFilterChange(setPlatform, f)} style={{
                  padding: '6px 14px',
                  background: platform === f ? 'var(--accent)' : 'transparent',
                  color: platform === f ? '#0a0a0f' : 'var(--text-muted)',
                  border: `1px solid ${platform === f ? 'var(--accent)' : 'var(--border)'}`,
                  borderRadius: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  transition: 'all 0.25s',
                }}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          {/* Type */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '0.15em' }}>TYPE:</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {TYPE_FILTERS.map(f => (
                <button key={f} onClick={() => handleFilterChange(setType, f)} style={{
                  padding: '6px 14px',
                  background: type === f ? 'var(--accent)' : 'transparent',
                  color: type === f ? '#0a0a0f' : 'var(--text-muted)',
                  border: `1px solid ${type === f ? 'var(--accent)' : 'var(--border)'}`,
                  borderRadius: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  transition: 'all 0.25s',
                }}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-dim)' }}>
            {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Projects Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
          {filtered.map((project) => (
            <div
              key={project.id}
              className="project-card"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                background: 'var(--bg-card)',
                border: `1px solid ${hoveredId === project.id ? 'var(--border-accent)' : 'var(--border)'}`,
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'all 0.35s',
                transform: hoveredId === project.id ? 'translateY(-6px)' : 'none',
                boxShadow: hoveredId === project.id ? '0 20px 40px var(--shadow)' : 'none',
                opacity: 0,
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden', background: 'var(--bg-alt)' }}>
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    transform: hoveredId === project.id ? 'scale(1.06)' : 'scale(1)',
                  }}
                />
                {/* Overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, transparent 50%, rgba(10,10,15,0.8) 100%)',
                }} />
                {/* Featured Badge */}
                {project.featured && (
                  <div style={{
                    position: 'absolute', top: '12px', left: '12px',
                    display: 'flex', alignItems: 'center', gap: '4px',
                    padding: '4px 10px',
                    background: 'rgba(0,255,157,0.15)',
                    border: '1px solid var(--border-accent)',
                    borderRadius: '20px',
                    backdropFilter: 'blur(10px)',
                  }}>
                    <Star size={10} style={{ color: 'var(--accent)', fill: 'var(--accent)' }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)', letterSpacing: '0.1em' }}>FEATURED</span>
                  </div>
                )}
                {/* Type badge */}
                <div style={{
                  position: 'absolute', top: '12px', right: '12px',
                  padding: '4px 10px',
                  background: 'var(--bg-badge)',
                  border: '1px solid var(--border)',
                  borderRadius: '20px',
                  backdropFilter: 'blur(10px)',
                }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{project.type}</span>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{project.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6, marginBottom: '16px' }}>
                  {project.description}
                </p>

                {/* Stats */}
                {project.stats && (
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', padding: '12px', background: 'var(--bg-alt)', borderRadius: '8px' }}>
                    {Object.entries(project.stats).map(([k, v]) => (
                      <div key={k} style={{ textAlign: 'center' }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: 'var(--accent)' }}>{v}</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-dim)', textTransform: 'uppercase' }}>{k}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {project.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>

                {/* Links */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ flex: 1, justifyContent: 'center', padding: '10px', fontSize: '13px' }}>
                    <ExternalLink size={14} /> Live Demo
                  </a>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="btn-outline"
                    style={{ padding: '10px 16px' }}>
                    <Github size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No results */}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔍</div>
            <p>No projects match the selected filters. Try adjusting your selection.</p>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 600px) {
          #projects .container > div:nth-child(3) { flex-direction: column; gap: 16px; }
          #projects .container > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
