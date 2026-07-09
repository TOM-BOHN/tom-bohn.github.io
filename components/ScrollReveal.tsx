'use client'

import { useEffect, useRef, useState } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  /** Extra delay (ms) applied once the element enters the viewport - handy for staggering a list. */
  delayMs?: number
}

// Fades + slides content into place the first time it scrolls into view,
// rather than animating everything on mount (which meant content far below
// the fold had already "finished" its entrance animation before a visitor
// ever scrolled to it).
export function ScrollReveal({ children, className = '', delayMs = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (typeof IntersectionObserver === 'undefined' || prefersReducedMotion) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    )
    observer.observe(node)

    // Safety net: some capture/render paths (print preview, certain
    // screenshot tools, instant/programmatic viewport resizes) never fire a
    // scroll or intersection event. Never let content stay permanently
    // hidden - reveal it unconditionally after a short delay if the user
    // hasn't scrolled to it yet.
    const fallbackTimer = setTimeout(() => setVisible(true), 2500)

    return () => {
      observer.disconnect()
      clearTimeout(fallbackTimer)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
      style={{ transitionDelay: visible ? `${delayMs}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}
