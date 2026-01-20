'use client'

import Link from 'next/link'

function ProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function BlogIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
      <path d="M10 9H8" />
    </svg>
  )
}

export function NavigationApplet() {
  const navItems = [
    { href: '/about', icon: ProfileIcon, label: 'Read my profile', tooltip: 'Read my profile' },
    { href: '/contact', icon: MessageIcon, label: 'Message me', tooltip: 'Message me' },
    { href: '/blog', icon: BlogIcon, label: 'Weblog', tooltip: 'Weblog' },
  ]

  return (
    <div className="flex items-center justify-center gap-2">
      {navItems.map((item) => {
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            className="relative group flex items-center justify-center w-12 h-12 border-2 border-border bg-bg-secondary text-text-primary hover:bg-accent hover:text-white transition-colors rounded"
            aria-label={item.label}
            title={item.tooltip}
          >
            <Icon />
            <span className="sr-only">{item.label}</span>
            <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-border bg-bg-primary px-2 py-1 text-[11px] text-text-primary opacity-0 shadow-sm transition-opacity group-hover:opacity-100 z-10">
              {item.tooltip}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
