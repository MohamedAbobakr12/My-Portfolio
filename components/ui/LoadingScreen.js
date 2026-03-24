'use client'
// components/ui/LoadingScreen.js
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function LoadingScreen() {
  const screenRef = useRef(null)
  const barRef = useRef(null)
  const percentRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 15
      if (p > 100) p = 100
      setProgress(Math.round(p))
      if (barRef.current) barRef.current.style.width = `${p}%`
      if (p >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          gsap.to(screenRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            onComplete: () => {
              if (screenRef.current) screenRef.current.style.display = 'none'
            }
          })
        }, 300)
      }
    }, 80)

    return () => clearInterval(interval)
  }, [])

  return (
    <div id="loading-screen" ref={screenRef}>
      {/* Logo */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '48px',
        fontWeight: 800,
        letterSpacing: '-0.03em',
        marginBottom: '32px',
      }}>
        MA<span style={{ color: 'var(--accent)' }}>.</span>
      </div>

      {/* Scanning line effect */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute',
          left: 0, right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
          animation: 'scan 2s linear infinite',
          opacity: 0.4,
        }} />
      </div>

      {/* Progress bar */}
      <div className="loading-bar-track">
        <div className="loading-bar" ref={barRef} />
      </div>

      {/* Percent */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        color: 'var(--accent)',
        letterSpacing: '0.2em',
        marginTop: '12px',
      }}>
        {progress}%
      </div>

      {/* Tagline */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        color: 'var(--text-dim)',
        letterSpacing: '0.15em',
      }}>
        INITIALIZING PORTFOLIO
      </div>
    </div>
  )
}
