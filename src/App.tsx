import { useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import { About, Skills, Experience, Projects, Philosophy, Contact } from './sections/Sections'

function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    let fx = 0, fy = 0
    let rafId: number

    const onMove = (e: MouseEvent) => {
      const x = e.clientX, y = e.clientY
      if (cursorRef.current) {
        cursorRef.current.style.left = x + 'px'
        cursorRef.current.style.top = y + 'px'
      }
    }

    const loop = () => {
      if (cursorRef.current && followerRef.current) {
        const cx = parseFloat(cursorRef.current.style.left || '0')
        const cy = parseFloat(cursorRef.current.style.top || '0')
        fx += (cx - fx) * 0.12
        fy += (cy - fy) * 0.12
        followerRef.current.style.left = fx + 'px'
        followerRef.current.style.top = fy + 'px'
      }
      rafId = requestAnimationFrame(loop)
    }

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element
      const interactive = t.closest('a, button, [role="button"], .pill, .info-card, .project-showcase')
      cursorRef.current?.classList.toggle('hovered', !!interactive)
      followerRef.current?.classList.toggle('hovered', !!interactive)
    }

    const onLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '0'
      if (followerRef.current) followerRef.current.style.opacity = '0'
    }
    const onEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '1'
      if (followerRef.current) followerRef.current.style.opacity = '1'
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    rafId = requestAnimationFrame(loop)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-follower" ref={followerRef} />
    </>
  )
}

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible')
          }, i * 60)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })

    const observe = () => {
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    }

    observe()
    // Re-observe after a tick in case of dynamic content
    setTimeout(observe, 500)

    return () => observer.disconnect()
  }, [])
}

export default function App() {
  useScrollReveal()

  return (
    <>
      <div className="noise" aria-hidden="true" />
      <Cursor />
      <Navbar />

      <main>
        <Hero />
        <div className="section-sep" aria-hidden="true" />
        <About />
        <div className="section-sep" aria-hidden="true" />
        <Skills />
        <div className="section-sep" aria-hidden="true" />
        <Experience />
        <div className="section-sep" aria-hidden="true" />
        <Projects />
        <div className="section-sep" aria-hidden="true" />
        <Philosophy />
      </main>

      <div className="section-sep" aria-hidden="true" />
      <Contact />
    </>
  )
}
