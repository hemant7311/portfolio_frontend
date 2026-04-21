import React, { useEffect, useRef, useState } from 'react'
import styled, { useTheme } from 'styled-components'

const Canvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
`

const MouseTrail = () => {
  const theme = useTheme()
  const canvasRef = useRef(null)
  const posRef = useRef({ x: -100, y: -100 })
  const particlesRef = useRef([])
  const rafRef = useRef(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      for (let i = 0; i < 12; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 1.5 + Math.random() * 2.5
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          size: 2 + Math.random() * 2,
        })
      }
    }

    const step = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const pcol = theme.primary || '#854CE6'
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0.02)

      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i]
        p.vx *= 0.96
        p.vy *= 0.96
        const dx = posRef.current.x - p.x
        const dy = posRef.current.y - p.y
        const dist = Math.hypot(dx, dy) || 1
        const pull = 0.05
        p.vx += (dx / dist) * pull
        p.vy += (dy / dist) * pull
        p.x += p.vx
        p.y += p.vy
        p.life *= 0.965

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `${pcol}${Math.round(p.life * 255).toString(16).padStart(2, '0')}`
        ctx.fill()
      }

      const outerAlpha = 0.15
      ctx.beginPath()
      ctx.arc(posRef.current.x, posRef.current.y, 26, 0, Math.PI * 2)
      ctx.fillStyle = `${pcol}${Math.round(outerAlpha * 255).toString(16).padStart(2, '0')}`
      ctx.fill()
      ctx.beginPath()
      ctx.arc(posRef.current.x, posRef.current.y, 6, 0, Math.PI * 2)
      ctx.fillStyle = pcol
      ctx.fill()

      rafRef.current = requestAnimationFrame(step)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    rafRef.current = requestAnimationFrame(step)
    setMounted(true)
    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [theme])

  return <Canvas ref={canvasRef} aria-hidden={!mounted} />
}

export default MouseTrail