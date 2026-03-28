'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ExternalLink, Github, Star, Eye } from 'lucide-react'
import { trackPreviewClick } from '../../lib/analytics'
import axios from 'axios'

export default function ProjectCard({ project, isHovered, onMouseEnter, onMouseLeave }) {
    const [hoveredId, setHoveredId] = useState(null)
    const [clickCount, setClickCount] = useState(null)
    
        useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/clicks/${project.slug}`)
            .then(r => setClickCount(r.data.count))
        }, [project.slug])

    return (
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
                    <Link 
                        onClick={() => {
                        trackPreviewClick(project.title, project.liveUrl)
                        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/clicks/${project.slug}`)
                        .then(r => setClickCount(r.data.count))
                    }} href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ flex: 1, justifyContent: 'center', padding: '10px', fontSize: '13px' }}>
                        <ExternalLink size={14} /> Live Demo 
                        <span className='flex items-center gap-1'>
                            <Eye size={22} color="#0a0a0f" /> {clickCount !== null ? `${clickCount}` : '...'}
                        </span>
                    </Link>
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                        className="btn-outline"
                        style={{ padding: '10px 16px' }}>
                        <Github size={14} />
                    </Link>
                </div>
            </div>
        </div>
    )
}