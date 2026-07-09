'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from './ThemeProvider'
import { useXangaLayoutOptional } from '@/components/xanga/XangaLayoutContext'

function ThemeIcon({ theme }: { theme: 'light' | 'dark' | 'xanga' }) {
  if (theme === 'light') {
    return (
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        aria-hidden="true"
        className="block"
      >
        <path
          fill="currentColor"
          d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-16a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 18a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM2 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Zm18 0a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1ZM4.22 4.22a1 1 0 0 1 1.42 0l.7.7a1 1 0 1 1-1.4 1.42l-.72-.7a1 1 0 0 1 0-1.42Zm13.44 13.44a1 1 0 0 1 1.42 0l.7.7a1 1 0 1 1-1.4 1.42l-.72-.7a1 1 0 0 1 0-1.42ZM19.78 4.22a1 1 0 0 1 0 1.42l-.7.7a1 1 0 1 1-1.42-1.4l.7-.72a1 1 0 0 1 1.42 0ZM6.34 17.66a1 1 0 0 1 0 1.42l-.7.7a1 1 0 1 1-1.42-1.4l.72-.72a1 1 0 0 1 1.4 0Z"
        />
      </svg>
    )
  }

  if (theme === 'dark') {
    return (
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        aria-hidden="true"
        className="block"
      >
        <path
          fill="currentColor"
          d="M21 14.5A8.5 8.5 0 0 1 9.5 3a.75.75 0 0 0-.86-.98A10 10 0 1 0 21.98 15.36a.75.75 0 0 0-.98-.86Z"
        />
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      className="block"
    >
      <path
        fill="currentColor"
        d="M12 2 9.5 8H3l5.25 3.9L6.5 18 12 14.2 17.5 18l-1.75-6.1L21 8h-6.5L12 2Z"
      />
    </svg>
  )
}

function ThemeIconButton({
  value,
  active,
  onClick,
}: {
  value: 'light' | 'dark' | 'xanga'
  active: boolean
  onClick: () => void
}) {
  const label = value === 'xanga' ? 'Xanga' : value === 'dark' ? 'Dark' : 'Light'
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={`${label} theme`}
      title={`${label} theme`}
      className={`relative group w-9 h-9 flex items-center justify-center transition-colors ${
        active
          ? 'bg-bg-secondary text-accent'
          : 'bg-transparent text-text-primary hover:bg-bg-secondary'
      }`}
    >
      <ThemeIcon theme={value} />
      <span className="sr-only">{label}</span>
      <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-border bg-bg-primary px-2 py-1 text-[11px] text-text-primary opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
        {label}
      </span>
    </button>
  )
}

// Public navigation items (always visible)
const publicNavItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

// VIP navigation items (require Cloudflare login)
const vipNavItems = [
  { href: '/hub', label: 'Hub' },
  { href: '/links', label: 'Links' },
  { href: '/v2me', label: 'V2ME' },
  { href: '/certifications', label: 'Learning' },
  { href: '/projects', label: 'Projects' },
]

// Lock icon component for VIP items
function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      aria-hidden="true"
      className={className}
    >
      <path
        fill="currentColor"
        d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10z"
      />
    </svg>
  )
}

// Desktop nav link with an animated underline indicator that grows in from
// the center on hover, and stays put (in the accent color) on the active page.
function DesktopNavLink({
  href,
  label,
  isActive,
  vip,
}: {
  href: string
  label: string
  isActive: boolean
  vip?: boolean
}) {
  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-1.5 pb-1 transition-colors ${
        isActive ? 'text-accent font-semibold' : 'text-text-secondary hover:text-accent-orange'
      }`}
      title={vip ? 'VIP Content - Login Required' : undefined}
    >
      {vip && <LockIcon className="opacity-60 group-hover:opacity-100 transition-opacity" />}
      <span>{label}</span>
      {vip && (
        <span className="absolute -top-1 -right-1 text-[9px] font-bold text-accent-orange opacity-0 group-hover:opacity-100 transition-opacity">
          VIP
        </span>
      )}
      <span
        aria-hidden="true"
        className={`absolute -bottom-0.5 left-0 h-0.5 w-full origin-center scale-x-0 bg-accent-orange transition-transform duration-300 ease-out group-hover:scale-x-100 ${
          isActive ? 'scale-x-100 bg-accent' : ''
        }`}
      />
    </Link>
  )
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {open ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      )}
    </svg>
  )
}

export function Header() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const layout = useXangaLayoutOptional()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isXanga = theme === 'xanga'
  const showCollapsedIcon = isXanga && layout !== null && layout.sidebarSide === 'hide'

  // Close the mobile menu whenever the route changes (e.g. after tapping a link).
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <header className="border-b border-border bg-bg-primary sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-xl font-bold text-accent hover:text-accent-orange transition-colors font-mono tracking-wider">
              THOMASLBOHN.COM
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              {/* Public navigation items */}
              {publicNavItems.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== '/' && pathname?.startsWith(item.href))
                return (
                  <DesktopNavLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    isActive={isActive}
                  />
                )
              })}
              
              {/* Visual separator */}
              <div className="h-4 w-px bg-border" aria-hidden="true" />
              
              {/* VIP navigation items */}
              {vipNavItems.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== '/' && pathname?.startsWith(item.href))
                return (
                  <DesktopNavLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    isActive={isActive}
                    vip
                  />
                )
              })}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="inline-flex overflow-hidden">
              {(['light', 'dark'] as const).map((t) => (
                <ThemeIconButton
                  key={t}
                  value={t}
                  active={theme === t}
                  onClick={() => setTheme(t)}
                />
              ))}
              {showCollapsedIcon && layout ? (
                <button
                  onClick={() => layout.setSidebarSide('right')}
                  className="relative group w-9 h-9 flex items-center justify-center transition-colors bg-bg-secondary text-accent hover:bg-bg-secondary"
                  aria-label="Show sidebar"
                  title="Show sidebar"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <span className="sr-only">Show sidebar</span>
                  <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-border bg-bg-primary px-2 py-1 text-[11px] text-text-primary opacity-0 shadow-sm transition-opacity group-hover:opacity-100 z-10">
                    Show sidebar
                  </span>
                </button>
              ) : (
                <ThemeIconButton
                  value="xanga"
                  active={theme === 'xanga'}
                  onClick={() => setTheme('xanga')}
                />
              )}
            </div>
            {/* Hamburger toggle for mobile navigation */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="md:hidden relative w-9 h-9 flex items-center justify-center text-text-primary hover:bg-bg-secondary transition-colors"
            >
              <HamburgerIcon open={mobileMenuOpen} />
            </button>
          </div>
        </nav>

        {/* Mobile menu - smoothly expands/collapses via the grid-rows trick (no JS height measuring needed) */}
        <div
          id="mobile-nav"
          className={`md:hidden grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out ${
            mobileMenuOpen ? 'grid-rows-[1fr] mt-4' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="flex flex-col gap-3 pb-2">
              {/* Public navigation items */}
              <div className="flex flex-wrap justify-center gap-2">
                {publicNavItems.map((item) => {
                  const isActive = pathname === item.href || 
                    (item.href !== '/' && pathname?.startsWith(item.href))
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`px-4 py-1.5 rounded text-sm transition-colors flex-1 min-w-[70px] text-center ${
                        isActive
                          ? 'bg-accent text-white'
                          : 'bg-bg-secondary text-text-secondary hover:bg-accent-orange hover:text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </div>
              
              {/* Visual separator */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-border" aria-hidden="true" />
                <span className="text-xs text-text-secondary/60 px-2">VIP</span>
                <div className="flex-1 h-px bg-border" aria-hidden="true" />
              </div>
              
              {/* VIP navigation items - Row 1: Hub, Links, V2ME */}
              <div className="flex justify-center gap-2">
                {vipNavItems.slice(0, 3).map((item) => {
                  const isActive = pathname === item.href || 
                    (item.href !== '/' && pathname?.startsWith(item.href))
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group relative px-3 py-1.5 rounded text-sm transition-colors flex items-center justify-center gap-1.5 flex-1 min-w-[70px] ${
                        isActive
                          ? 'bg-accent text-white'
                          : 'bg-bg-secondary text-text-secondary hover:bg-accent-orange hover:text-white'
                      }`}
                      title="VIP Content - Login Required"
                    >
                      <LockIcon className={isActive ? 'opacity-100' : 'opacity-60'} />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </div>
              
              {/* VIP navigation items - Row 2: Learning, Projects */}
              <div className="flex justify-center gap-2">
                {vipNavItems.slice(3).map((item) => {
                  const isActive = pathname === item.href || 
                    (item.href !== '/' && pathname?.startsWith(item.href))
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group relative px-3 py-1.5 rounded text-sm transition-colors flex items-center justify-center gap-1.5 flex-1 min-w-[70px] ${
                        isActive
                          ? 'bg-accent text-white'
                          : 'bg-bg-secondary text-text-secondary hover:bg-accent-orange hover:text-white'
                      }`}
                      title="VIP Content - Login Required"
                    >
                      <LockIcon className={isActive ? 'opacity-100' : 'opacity-60'} />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
