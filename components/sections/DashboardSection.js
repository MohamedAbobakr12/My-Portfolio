'use client'
// components/sections/DashboardSection.js
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BarChart2, Users, TrendingUp, DollarSign, Activity, Bell, Search, Settings, Home, Package, ShoppingCart, ChevronUp, ChevronDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const METRICS = [
  { label: 'Total Revenue', value: '$84,231', change: '+12.5%', up: true, icon: <DollarSign size={16} /> },
  { label: 'Active Users', value: '12,842', change: '+8.2%', up: true, icon: <Users size={16} /> },
  { label: 'Orders', value: '3,291', change: '-2.1%', up: false, icon: <ShoppingCart size={16} /> },
  { label: 'Growth Rate', value: '24.8%', change: '+4.6%', up: true, icon: <TrendingUp size={16} /> },
]

const RECENT_ORDERS = [
  { id: '#1082', customer: 'Sarah Kim', product: 'Pro Plan', amount: '$149', status: 'Completed' },
  { id: '#1081', customer: 'Mark Evans', product: 'Starter', amount: '$49', status: 'Pending' },
  { id: '#1080', customer: 'Lena Osei', product: 'Enterprise', amount: '$499', status: 'Completed' },
  { id: '#1079', customer: 'Raj Patel', product: 'Pro Plan', amount: '$149', status: 'Cancelled' },
]

const BAR_DATA = [65, 80, 45, 92, 70, 55, 88, 74, 60, 95, 78, 83]
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function DashboardSection() {
  const sectionRef = useRef(null)
  const [animated, setAnimated] = useState(false)
  const [activeNav, setActiveNav] = useState('dashboard')

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.dash-header',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      )
      ScrollTrigger.create({
        trigger: '.dashboard-preview',
        start: 'top 80%',
        onEnter: () => {
          setAnimated(true)
          gsap.fromTo('.dashboard-preview',
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
          )
        }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const statusColor = (status) => {
    if (status === 'Completed') return '#00ff9d'
    if (status === 'Pending') return '#ffd700'
    return '#ff6b6b'
  }

  return (
    <section className="section" id="dashboard" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="dash-header" style={{ textAlign: 'center', marginBottom: '60px', opacity: 0 }}>
          <div className="accent-line" style={{ justifyContent: 'center' }}>
            <span className="accent-label">Live Preview</span>
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', marginTop: '12px', marginBottom: '16px' }}>
            See What I Build
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto', fontSize: '16px' }}>
            An interactive preview of the kind of dashboards and admin panels I craft for clients.
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className="dashboard-preview" style={{
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid var(--border)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
          opacity: 0,
        }}>
          {/* Window chrome */}
          <div className="dashboard-topbar">
            <div className="dot dot-red" />
            <div className="dot dot-yellow" />
            <div className="dot dot-green" />
            <div style={{
              flex: 1, marginLeft: '12px',
              background: 'var(--bg-alt)',
              borderRadius: '4px',
              padding: '5px 12px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--text-dim)',
            }}>
              mohamed-dev-m/dashboard
            </div>
          </div>

          {/* Dashboard Body */}
          <div style={{ display: 'flex', height: '520px', background: 'var(--bg-alt)' }}>
            {/* Sidebar */}
            <div style={{
              width: '200px',
              background: 'var(--bg-card)',
              borderRight: '1px solid var(--border)',
              padding: '20px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              flexShrink: 0,
            }}>
              {/* Logo */}
              <div style={{ padding: '8px 12px', marginBottom: '16px', fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800 }}>
                Nexa<span style={{ color: 'var(--accent)' }}>.</span>
              </div>

              {[
                { id: 'dashboard', label: 'Dashboard', icon: <Home size={15} /> },
                { id: 'products', label: 'Products', icon: <Package size={15} /> },
                { id: 'orders', label: 'Orders', icon: <ShoppingCart size={15} /> },
                { id: 'analytics', label: 'Analytics', icon: <BarChart2 size={15} /> },
                { id: 'users', label: 'Users', icon: <Users size={15} /> },
                { id: 'settings', label: 'Settings', icon: <Settings size={15} /> },
              ].map(item => (
                <button key={item.id} onClick={() => setActiveNav(item.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '9px 12px',
                    borderRadius: '6px',
                    background: activeNav === item.id ? 'var(--accent-dim)' : 'transparent',
                    border: `1px solid ${activeNav === item.id ? 'var(--border-accent)' : 'transparent'}`,
                    color: activeNav === item.id ? 'var(--accent)' : 'var(--text-muted)',
                    fontSize: '13px',
                    fontFamily: 'var(--font-body)',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    width: '100%',
                  }}
                >
                  {item.icon} {item.label}
                </button>
              ))}
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
              {/* Topbar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h3 style={{ fontSize: '20px', marginBottom: '2px' }}>Good morning, Mohamed 👋</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Here's what's happening today.</p>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button style={{ width: '32px', height: '32px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                    <Search size={14} />
                  </button>
                  <button style={{ width: '32px', height: '32px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', position: 'relative' }}>
                    <Bell size={14} />
                    <div style={{ position: 'absolute', top: '6px', right: '6px', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)' }} />
                  </button>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), #0064ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: '#0a0a0f' }}>
                    MA
                  </div>
                </div>
              </div>

              {/* Metric Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
                {METRICS.map((m, i) => (
                  <div key={i} style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: '10px',
                    padding: '14px',
                    transition: 'border-color 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-accent)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-dim)', letterSpacing: '0.05em' }}>{m.label}</span>
                      <div style={{ color: 'var(--accent)', opacity: 0.6 }}>{m.icon}</div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>{m.value}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', color: m.up ? '#00ff9d' : '#ff6b6b', fontFamily: 'var(--font-mono)' }}>
                      {m.up ? <ChevronUp size={12} /> : <ChevronDown size={12} />} {m.change} vs last month
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', marginBottom: '16px' }}>
                {/* Bar Chart */}
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '10px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>Revenue Overview</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>{ new Date().getFullYear() }</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '80px' }}>
                    {BAR_DATA.map((h, i) => (
                      <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                        <div
                          style={{
                            width: '100%',
                            height: `${(h / 100) * 70}px`,
                            background: i === 11 ? 'var(--accent)' : 'rgba(0,255,157,0.2)',
                            borderRadius: '3px 3px 0 0',
                            transition: 'background 0.2s',
                            boxShadow: i === 11 ? '0 0 8px rgba(0,255,157,0.4)' : 'none',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = 'var(--accent)'}
                          onMouseLeave={e => { e.currentTarget.style.background = i === 11 ? 'var(--accent)' : 'rgba(0,255,157,0.2)' }}
                        />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', color: 'var(--text-dim)' }}>{MONTHS[i].slice(0, 1)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Donut-like */}
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '10px', padding: '16px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '16px' }}>Traffic Sources</span>
                  {[
                    { label: 'Organic', pct: 42, color: 'var(--accent)' },
                    { label: 'Paid', pct: 28, color: '#6464ff' },
                    { label: 'Social', pct: 18, color: '#ffd700' },
                    { label: 'Direct', pct: 12, color: '#ff6b6b' },
                  ].map((row, i) => (
                    <div key={i} style={{ marginBottom: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>{row.label}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: row.color }}>{row.pct}%</span>
                      </div>
                      <div style={{ height: '3px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${row.pct}%`, background: row.color, borderRadius: '2px', boxShadow: `0 0 6px ${row.color}` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Orders */}
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>Recent Orders</span>
                  <button style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)', background: 'none', border: 'none' }}>View all →</button>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      {['Order', 'Customer', 'Product', 'Amount', 'Status'].map(h => (
                        <th key={h} style={{ padding: '8px 16px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-dim)', letterSpacing: '0.1em', fontWeight: 500 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {RECENT_ORDERS.map((row, i) => (
                      <tr key={i} style={{ borderBottom: i < RECENT_ORDERS.length - 1 ? '1px solid var(--border)' : 'none' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-alt)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <td style={{ padding: '10px 16px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent)' }}>{row.id}</td>
                        <td style={{ padding: '10px 16px', fontSize: '13px' }}>{row.customer}</td>
                        <td style={{ padding: '10px 16px', fontSize: '13px', color: 'var(--text-muted)' }}>{row.product}</td>
                        <td style={{ padding: '10px 16px', fontSize: '13px', fontWeight: 600 }}>{row.amount}</td>
                        <td style={{ padding: '10px 16px' }}>
                          <span style={{
                            padding: '3px 8px',
                            borderRadius: '20px',
                            fontSize: '11px',
                            fontFamily: 'var(--font-mono)',
                            background: `${statusColor(row.status)}18`,
                            color: statusColor(row.status),
                            border: `1px solid ${statusColor(row.status)}40`,
                          }}>{row.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '24px', color: 'var(--text-muted)', fontSize: '14px', fontFamily: 'var(--font-mono)' }}>
          ↑ Fully interactive — try clicking the sidebar navigation
        </p>
      </div>
    </section>
  )
}
