'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from './ThemeProvider'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
  { href: '/links', label: 'Links' },
  { href: '/certifications', label: 'Learning' },
  { href: '/hub', label: 'Hub' },
  { href: '/contact', label: 'Contact' },
]

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
            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => {
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
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs font-semibold text-text-secondary">
              Theme:
            </span>
            <div className="inline-flex border-2 border-border overflow-hidden">
              {(['light', 'dark', 'xanga'] as const).map((t) => {
                const active = theme === t
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTheme(t)}
                    aria-pressed={active}
                    className={`px-3 py-2 text-xs font-bold tracking-widest uppercase transition-colors ${
                      active
                        ? 'bg-accent text-white'
                        : 'bg-bg-secondary text-text-secondary hover:bg-accent hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                )
              })}
            </div>
          </div>
        </nav>
        {/* Mobile menu */}
        <div className="md:hidden mt-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {navItems.map((item) => {
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
        </div>
      </div>
    </header>
  )
}
