import { useState, useEffect, useRef, useCallback } from 'react'

const LOGO_WIDTH = 200
const LOGO_HEIGHT = 120
const SPEED = 3.45
const CORNER_HIT_CHANCE = 1 / 20

// Hue rotation values
const HUE_ROTATIONS = [0, 45, 90, 135, 180, 225, 270, 315]

function BouncingLogo() {
  const containerRef = useRef(null)
  const posRef = useRef({ x: 100, y: 80 })
  const velRef = useRef({ dx: SPEED, dy: SPEED })
  const colorIndexRef = useRef(0)
  const [renderPos, setRenderPos] = useState({ x: 100, y: 80 })
  const [hue, setHue] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animationId

    const animate = () => {
      const bounds = container.getBoundingClientRect()
      const maxX = bounds.width - LOGO_WIDTH
      const maxY = bounds.height - LOGO_HEIGHT

      const pos = posRef.current
      const vel = velRef.current

      // Move at exact 45-degree angle (DVD style)
      pos.x += vel.dx
      pos.y += vel.dy

      let hitWall = false

      // Check horizontal bounds (left/right walls)
      if (pos.x <= 0) {
        pos.x = 0
        vel.dx = SPEED
        hitWall = true
      } else if (pos.x >= maxX) {
        pos.x = maxX
        vel.dx = -SPEED
        hitWall = true
      }

      // Check vertical bounds (top/bottom walls)
      if (pos.y <= 0) {
        pos.y = 0
        vel.dy = SPEED
        hitWall = true
      } else if (pos.y >= maxY) {
        pos.y = maxY
        vel.dy = -SPEED
        hitWall = true
      }

      // Change color on wall hit
      if (hitWall) {
        colorIndexRef.current = (colorIndexRef.current + 1) % HUE_ROTATIONS.length
        setHue(HUE_ROTATIONS[colorIndexRef.current])

        // Maybe nudge toward corner (1 in 20 chance)
        if (Math.random() < CORNER_HIT_CHANCE) {
          const targetCornerX = vel.dx > 0 ? maxX : 0
          const targetCornerY = vel.dy > 0 ? maxY : 0

          const distToVertical = Math.abs(targetCornerX - pos.x)
          const distToHorizontal = Math.abs(targetCornerY - pos.y)

          if (distToVertical > distToHorizontal) {
            pos.y = targetCornerY - (vel.dy > 0 ? distToVertical : -distToVertical)
            pos.y = Math.max(0, Math.min(maxY, pos.y))
          } else {
            pos.x = targetCornerX - (vel.dx > 0 ? distToHorizontal : -distToHorizontal)
            pos.x = Math.max(0, Math.min(maxX, pos.x))
          }
        }
      }

      setRenderPos({ x: pos.x, y: pos.y })
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <div className="bouncing-container" ref={containerRef}>
      <div
        className="logo-wrapper"
        style={{
          transform: `translate(${renderPos.x}px, ${renderPos.y}px)`,
        }}
      >
        <img
          src="/man2.png"
          alt="DVD"
          className="bouncing-logo"
          style={{ filter: `hue-rotate(${hue}deg)` }}
        />
      </div>
    </div>
  )
}

function AgendaSlide() {
  return (
    <div className="agenda-slide">
      <div className="agenda-header">Claude Code Community Dublin Event #1 — Hosted by Vibeworks</div>
      <h1 className="agenda-title">AGENDA</h1>
      <div className="clawd-surprise">
        <img src="/clawd.png" alt="Clawd" />
        <div className="eyebrow surprise-eyebrow-left"></div>
        <div className="eyebrow surprise-eyebrow-right"></div>
        <div className="surprise-laser surprise-laser-top"></div>
        <div className="surprise-laser surprise-laser-bottom"></div>
      </div>
      <div className="agenda-list">
        <div className="agenda-item">
          <span className="agenda-time">6:00</span>
          <span className="agenda-text">Introduction</span>
          <span className="agenda-duration">15 min</span>
        </div>
        <div className="agenda-item">
          <span className="agenda-time">6:15</span>
          <span className="agenda-text">Anthropic Q&A</span>
          <span className="agenda-duration">30 min</span>
        </div>
        <div className="agenda-item break">
          <span className="agenda-time">6:45</span>
          <span className="agenda-text">☕ 5 MIN BREAK</span>
        </div>
        <div className="agenda-item workshop">
          <span className="agenda-time">6:50</span>
          <div className="agenda-text">
            Workshop
            <div className="agenda-sub">Landing Page • Subagents • Skills • Deploy to AWS</div>
          </div>
          <span className="agenda-duration">45 min</span>
        </div>
        <div className="agenda-item break">
          <span className="agenda-time">7:35</span>
          <span className="agenda-text">☕ 10 MIN BREAK</span>
        </div>
        <div className="agenda-item">
          <span className="agenda-time">7:45</span>
          <span className="agenda-text">Stephen Dillon Demo</span>
          <span className="agenda-duration">15 min</span>
        </div>
        <div className="agenda-item">
          <span className="agenda-time">8:00</span>
          <span className="agenda-text">Miha Rothl Demo</span>
          <span className="agenda-duration">15 min</span>
        </div>
        <div className="agenda-item pizza">
          <span className="agenda-time">8:15</span>
          <span className="agenda-text">🍕 Pizza & Networking</span>
        </div>
      </div>
    </div>
  )
}

function BeforeWeStartSlide() {
  return (
    <div className="before-slide">
      <div className="before-content">
        <div className="before-left">
          <h1 className="before-title">BEFORE WE START</h1>
          <div className="info-list">
            <div className="info-item">
              <span className="info-icon">📷</span>
              <span className="info-text">NO PHOTOS? Tell Me or Anthony</span>
            </div>
            <div className="info-item">
              <span className="info-icon">☕</span>
              <span className="info-text">DRINKS + COFFEE → Over there</span>
            </div>
            <div className="info-item">
              <span className="info-icon">🚻</span>
              <span className="info-text">RESTROOMS → That way</span>
            </div>
            <div className="info-item">
              <span className="info-icon">📱</span>
              <span className="info-text">WIFI + MATERIALS → Scan QR on desk</span>
            </div>
            <div className="info-item">
              <span className="info-icon">🤝</span>
              <span className="info-text">SAY HI TO THE PERSON BESIDE YOU!</span>
            </div>
          </div>
        </div>
        <div className="before-right">
          <div className="clawd-assemble">
            <div className="particle p1"></div>
            <div className="particle p2"></div>
            <div className="particle p3"></div>
            <div className="particle p4"></div>
            <div className="particle p5"></div>
            <div className="particle p6"></div>
            <div className="particle p7"></div>
            <div className="particle p8"></div>
            <div className="particle p9"></div>
            <div className="particle p10"></div>
            <div className="particle p11"></div>
            <div className="particle p12"></div>
            <img src="/clawd.png" alt="Clawd" className="clawd-assembled" />
          </div>
        </div>
      </div>
      <div className="press-continue">PRESS ANY KEY TO CONTINUE</div>
    </div>
  )
}

function ThanksSlide() {
  return (
    <div className="thanks-slide">
      <h1 className="thanks-title">THANKS</h1>
      <div className="sponsors">
        <div className="sponsor-row">
          <img src="/Darius Cubed.png" alt="Darius Cubed" className="sponsor-logo darius-logo" />
        </div>
        <div className="sponsor-row vibeworks-row">
          <img src="/vibeworks.png" alt="Vibeworks" className="sponsor-logo vibeworks-logo" />
          <div className="clawd-peep">
            <img src="/clawd.png" alt="Clawd" />
          </div>
        </div>
        <div className="sponsor-row">
          <img src="/tensorix.jpg" alt="Tensorix" className="sponsor-logo tensorix-logo" />
        </div>
        <div className="sponsor-row">
          <img src="/echofold.png" alt="Echofold" className="sponsor-logo echofold-logo" />
        </div>
      </div>
    </div>
  )
}

function WelcomeSlide() {
  return (
    <div className="welcome-slide">
      <h1 className="welcome-title">
        WELCOME TO
        <br />
        <span className="highlight">CLAUDE CODE</span>
        <br />
        COMMUNITY DUBLIN
      </h1>
      <div className="floating-logo">
        <div className="clawd-container">
          <img src="/clawd.png" alt="Clawd" />
          <div className="eyebrow eyebrow-left"></div>
          <div className="eyebrow eyebrow-right"></div>
          <div className="laser laser-left"></div>
          <div className="laser laser-right"></div>
        </div>
      </div>
      <div className="press-start">
        PRESS START
      </div>
    </div>
  )
}

function IntroductionSlide() {
  return (
    <div className="section-slide">
      <div className="section-time">6:00</div>
      <h1 className="section-title cyan">INTRODUCTION</h1>
      <div className="section-duration">15 MIN</div>
    </div>
  )
}

function AnthropicQASlide() {
  return (
    <div className="section-slide">
      <div className="section-time">6:15 → 6:45</div>
      <h1 className="section-title purple">ANTHROPIC Q&A</h1>
      <div className="section-duration">30 MIN</div>
      <div className="clawd-singer">
        <img src="/clawd.png" alt="Clawd" className="clawd-mic-img" />
        <div className="mic">🎤</div>
        <div className="note note1">🎵</div>
        <div className="note note2">🎶</div>
        <div className="note note3">🎵</div>
        <div className="note note4">🎶</div>
        <div className="note note5">🎵</div>
      </div>
    </div>
  )
}

function BreakSlide({ duration, startTime, endTime }) {
  return (
    <div className="break-slide">
      <div className="break-icon">☕</div>
      <h1 className="break-title">{duration} MIN BREAK</h1>
      <div className="break-times">{startTime} → {endTime}</div>
      <div className="break-message">STRETCH YOUR LEGS</div>
      <div className="clawd-sipper">
        <img src="/clawd.png" alt="Clawd" className="clawd-sip-img" />
        <div className="tea-cup">🍵</div>
        <div className="sip-text sip1">#SIP</div>
        <div className="sip-text sip2">#SIP</div>
        <div className="sip-text sip3">#SIP</div>
        <div className="sip-text sip4">#SIP</div>
        <div className="sip-text sip5">#SIP</div>
      </div>
    </div>
  )
}

function WorkshopSlide() {
  return (
    <div className="section-slide workshop-section">
      <div className="section-time">6:50 → 7:35</div>
      <h1 className="section-title orange">WORKSHOP</h1>
      <div className="workshop-topics">
        <div className="workshop-topic">Landing Page</div>
        <div className="workshop-topic">Subagents</div>
        <div className="workshop-topic">Skills</div>
        <div className="workshop-topic">Deploy to AWS</div>
      </div>
      <div className="section-duration">45 MIN</div>
      <div className="clawd-builder">
        <img src="/clawd.png" alt="Clawd" className="clawd-build-img" />
        <div className="hammer">🔨</div>
        <div className="spark spark1">✨</div>
        <div className="spark spark2">⚡</div>
        <div className="spark spark3">✨</div>
      </div>
    </div>
  )
}

function DemoSlide({ name, startTime, endTime }) {
  const isStephen = name === "Stephen Dillon"
  const isMiha = name === "Miha Rothl"

  return (
    <div className="section-slide demo-section">
      <div className="section-time">{startTime} → {endTime}</div>
      <h1 className="section-title cyan">DEMO</h1>
      <div className="demo-presenter">{name}</div>
      <div className="section-duration">15 MIN</div>
      {isStephen && (
        <>
          <div className="clawd-phone-left">
            <img src="/clawd.png" alt="Clawd" className="clawd-calling-img" />
            <div className="phone-hand">📱</div>
          </div>
          <div className="signal-waves">
            <div className="wave wave1"></div>
            <div className="wave wave2"></div>
            <div className="wave wave3"></div>
            <div className="wave wave4"></div>
            <div className="wave wave5"></div>
          </div>
          <div className="cell-tower">📡</div>
        </>
      )}
      {isMiha && (
        <>
          <div className="clawd-miner">
            <img src="/clawd.png" alt="Clawd" className="clawd-mining-img" />
            <div className="pickaxe">⛏️</div>
          </div>
          <div className="minecraft-blocks">
            <div className="mc-block block1">🟫</div>
            <div className="mc-block block2">🟩</div>
            <div className="mc-block block3">💎</div>
            <div className="mc-block block4">🪨</div>
            <div className="mc-block block5">🟫</div>
            <div className="mc-block block6">💎</div>
          </div>
          <div className="block-stack">
            <div className="stack-block s1">🟫</div>
            <div className="stack-block s2">🟩</div>
            <div className="stack-block s3">🪨</div>
            <div className="stack-block s4">🟫</div>
            <div className="stack-block s5">🟩</div>
          </div>
        </>
      )}
    </div>
  )
}

function BeforeWeEatSlide() {
  return (
    <div className="before-eat-slide">
      <h1 className="before-eat-title">BEFORE WE EAT...</h1>
      <div className="before-eat-content">
        <div className="before-eat-thanks">THANKS FOR COMING!</div>
        <div className="before-eat-info">
          <p>Want to stay updated?</p>
          <ul>
            <li>Future events</li>
            <li>Photos from tonight</li>
            <li>Links & resources</li>
            <li>News & updates</li>
          </ul>
        </div>
        <div className="before-eat-qr">
          <div className="qr-text">SCAN THE QR CODE ON YOUR DESK</div>
        </div>
      </div>
      <div className="clawd-photographer">
        <img src="/clawd.png" alt="Clawd" className="clawd-photo-img" />
        <div className="phone">📱</div>
        <div className="camera-flash"></div>
      </div>
    </div>
  )
}

function PizzaSlide() {
  return (
    <div className="pizza-slide">
      <div className="pizza-icon">🍕</div>
      <h1 className="pizza-title">PIZZA & NETWORKING</h1>
      <div className="pizza-message">GRAB A SLICE, MAKE A FRIEND</div>
      <div className="clawd-pizza">
        <img src="/clawd.png" alt="Clawd" className="clawd-pizza-img" />
        <div className="clawd-slice">🍕</div>
      </div>
    </div>
  )
}

function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const slides = [
    <BouncingLogo key="bouncing" />,
    <WelcomeSlide key="welcome" />,
    <ThanksSlide key="thanks" />,
    <BeforeWeStartSlide key="before" />,
    <AgendaSlide key="agenda" />,
    <AnthropicQASlide key="qa" />,
    <BreakSlide key="break1" duration={5} startTime="6:45" endTime="6:50" />,
    <WorkshopSlide key="workshop" />,
    <BreakSlide key="break2" duration={10} startTime="7:35" endTime="7:45" />,
    <DemoSlide key="demo1" name="Stephen Dillon" startTime="7:45" endTime="8:00" />,
    <DemoSlide key="demo2" name="Miha Rothl" startTime="8:00" endTime="8:15" />,
    <BeforeWeEatSlide key="before-eat" />,
    <PizzaSlide key="pizza" />,
  ]

  const totalSlides = slides.length

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide()
      } else if (e.key === 'ArrowLeft') {
        prevSlide()
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSlide])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  return (
    <div className="presentation">
      <div className="slide-container">
        {slides[currentSlide]}
      </div>
      <div className="controls">
        <button
          className="nav-btn"
          onClick={prevSlide}
          disabled={currentSlide === 0}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        <span className="slide-counter">{currentSlide} / {totalSlides}</span>
        <button
          className="nav-btn nav-btn-next"
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
          </svg>
        </button>
        <button className="fullscreen-btn" onClick={toggleFullscreen}>
          Fullscreen
        </button>
      </div>
    </div>
  )
}

export default function App() {
  return <Presentation />
}
