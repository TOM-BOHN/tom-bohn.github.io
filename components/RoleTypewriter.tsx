'use client'

import { useEffect, useState } from 'react'

// Cycles through prior roles before settling permanently on the final,
// current role. The blinking cursor itself is rendered by the parent's
// `typewriter-cursor` CSS class (see globals.css), so this component only
// needs to manage the animated text.
const ROLES = [
  'PRODUCT MANAGER',
  'PROGRAM MANAGER',
  'SOFTWARE ENGINEER',
  'SOLUTION ARCHITECT',
  'PRODUCT MANAGER & SOFTWARE DESIGNER',
] as const

const FINAL_ROLE = ROLES[ROLES.length - 1]

const TYPE_SPEED_MS = 55
const DELETE_SPEED_MS = 32
const PAUSE_AFTER_TYPE_MS = 1400
const PAUSE_AFTER_DELETE_MS = 250

type Phase = 'typing' | 'deleting'

export function RoleTypewriter() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState<Phase>('typing')
  const [reducedMotion, setReducedMotion] = useState(false)

  // Respect users who've asked for less motion - show the final role only.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    const handleChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (reducedMotion) return

    const isFinalRole = roleIndex === ROLES.length - 1
    const currentRole = ROLES[roleIndex]

    if (phase === 'typing') {
      if (text.length < currentRole.length) {
        const timer = setTimeout(
          () => setText(currentRole.slice(0, text.length + 1)),
          TYPE_SPEED_MS
        )
        return () => clearTimeout(timer)
      }
      // Fully typed. The final role stays on screen forever; earlier roles
      // pause briefly, then get deleted to make room for the next one.
      if (isFinalRole) return
      const timer = setTimeout(() => setPhase('deleting'), PAUSE_AFTER_TYPE_MS)
      return () => clearTimeout(timer)
    }

    // phase === 'deleting'
    if (text.length > 0) {
      const timer = setTimeout(
        () => setText(currentRole.slice(0, text.length - 1)),
        DELETE_SPEED_MS
      )
      return () => clearTimeout(timer)
    }
    const timer = setTimeout(() => {
      setRoleIndex((index) => index + 1)
      setPhase('typing')
    }, PAUSE_AFTER_DELETE_MS)
    return () => clearTimeout(timer)
  }, [text, phase, roleIndex, reducedMotion])

  if (reducedMotion) {
    return <span>{FINAL_ROLE}</span>
  }

  return (
    <span>
      {/* Animated text is decorative; screen readers get the stable final role below. */}
      <span aria-hidden="true">{text}</span>
      <span className="sr-only">{FINAL_ROLE}</span>
    </span>
  )
}
