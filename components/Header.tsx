'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from './ThemeProvider'

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

export function Header() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <header className="border-b border-border bg-bg-primary sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-xl font-bold text-accent hover:text-accent-hover transition-colors font-mono tracking-wider">
              THOMASLBOHN.COM
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              {/* Public navigation items */}
              {publicNavItems.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== '/' && pathname?.startsWith(item.href))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`transition-colors ${
                      isActive
                        ? 'text-accent font-semibold'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
              
              {/* Visual separator */}
              <div className="h-4 w-px bg-border" aria-hidden="true" />
              
              {/* VIP navigation items */}
              {vipNavItems.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== '/' && pathname?.startsWith(item.href))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group relative flex items-center gap-1.5 transition-colors ${
                      isActive
                        ? 'text-accent font-semibold'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                    title="VIP Content - Login Required"
                  >
                    <LockIcon className="opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span>{item.label}</span>
                    <span className="absolute -top-1 -right-1 text-[9px] font-bold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                      VIP
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="inline-flex overflow-hidden">
              {(['light', 'dark', 'xanga'] as const).map((t) => (
                <ThemeIconButton
                  key={t}
                  value={t}
                  active={theme === t}
                  onClick={() => setTheme(t)}
                />
              ))}
            </div>
          </div>
        </nav>
        {/* Mobile menu */}
        <div className="md:hidden mt-4 pb-2">
          <div className="flex flex-col gap-3">
            {/* Public navigation items */}
            <div className="flex flex-wrap gap-2">
              {publicNavItems.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== '/' && pathname?.startsWith(item.href))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      isActive
                        ? 'bg-accent text-white'
                        : 'bg-bg-secondary text-text-secondary hover:bg-accent hover:text-white'
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
            
            {/* VIP navigation items */}
            <div className="flex flex-wrap gap-2">
              {vipNavItems.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== '/' && pathname?.startsWith(item.href))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group relative px-3 py-1 rounded text-sm transition-colors flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-accent text-white'
                        : 'bg-bg-secondary/70 text-text-secondary hover:bg-accent hover:text-white border border-border/50'
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
    </header>
  )
}
