'use client'
// components/ui/ChatWidget.js
import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, Loader } from 'lucide-react'
import { gsap } from 'gsap'

const INITIAL_MESSAGES = [
  {
    role: 'assistant',
    content: "👋 Hey! I'm Mohamed's AI assistant. Ask me anything about his skills, projects, or services — I'm here to help!",
  },
]

const QUICK_PROMPTS = [
  'What services do you offer?',
  'Tell me about your top projects',
  'What is your tech stack?',
  'How much does it cost?',
]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const windowRef = useRef(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (open && windowRef.current) {
      gsap.fromTo(windowRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'back.out(1.5)' }
      )
    }
  }, [open])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text) => {
    const userText = text || input.trim()
    if (!userText || loading) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userText }])
    setLoading(true)

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `You are Mohamed Abobakr's AI portfolio assistant. Mohamed is a MERN Stack Developer (MongoDB, Express, React, Node.js) with 3+ years of experience and 30+ projects. He is based in Cairo, Egypt and works with clients worldwide.

Services: Full-Stack Apps (from $3,000), APIs ($1,500+), Performance Optimization ($800+), SaaS Development ($8,000+).
Top projects: NexaCommerce (e-commerce), TaskFlow Pro (project management SaaS), CryptoTracker (real-time crypto portfolio), MedConnect (telemedicine).
Skills: React, Next.js, Node.js, Express, MongoDB, TypeScript, PostgreSQL, Redis, Docker, AWS, GraphQL.
Email: mohamed.dev.m@gmail.com
Availability: Open to new projects.

Be friendly, concise, and persuasive. Help visitors understand why they should hire Alex. Keep responses under 150 words.`,
          messages: [{ role: 'user', content: userText }],
        }),
      })

      const data = await response.json()
      const reply = data.content?.[0]?.text || "I'm having trouble responding. Please email mohamed.dev.m@gmail.com directly."
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I'm temporarily offline. Please reach out at mohamed.dev.m@gmail.com 📧",
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="chat-widget">
      {/* Chat Window */}
      {open && (
        <div className="chat-window" ref={windowRef}>
          {/* Header */}
          <div className="chat-header">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Bot size={18} color="#0a0a0f" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px' }}>Mohamed's Assistant</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00ff9d' }} />
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', padding: '4px' }}>
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.role}`}>
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="chat-message assistant" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Loader size={14} style={{ animation: 'spin 1s linear infinite', color: 'var(--accent)' }} />
                <span>Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length <= 1 && (
            <div style={{ padding: '8px 12px', display: 'flex', flexWrap: 'wrap', gap: '6px', borderTop: '1px solid var(--border)' }}>
              {QUICK_PROMPTS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(p)}
                  style={{
                    padding: '5px 10px',
                    fontSize: '11px',
                    background: 'var(--accent-dim)',
                    border: '1px solid var(--border-accent)',
                    borderRadius: '20px',
                    color: 'var(--accent)',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="chat-input-area">
            <input
              className="chat-input"
              placeholder="Ask anything..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              style={{
                width: '38px', height: '38px',
                background: 'var(--accent)',
                border: 'none',
                borderRadius: '8px',
                color: '#0a0a0f',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: (!input.trim() || loading) ? 0.5 : 1,
                transition: 'opacity 0.2s',
              }}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button className="chat-bubble" onClick={() => setOpen(!open)}>
        {open ? <X size={22} color="#0a0a0f" /> : <MessageCircle size={22} color="#0a0a0f" />}
      </button>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
