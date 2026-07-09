import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { XangaShell } from '@/components/XangaShell'
import { XangaLayoutWrapper } from '@/components/XangaLayoutWrapper'
import { BackToTop } from '@/components/BackToTop'

const openSans = Open_Sans({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
})

export const metadata: Metadata = {
  title: {
    default: 'Thomas Bohn',
    template: 'Thomas Bohn - %s',
  },
  description: 'Personal website and blog',
  metadataBase: new URL('https://thomaslbohn.com'),
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://thomaslbohn.com',
  },
  icons: {
    icon: '/icons/icon.svg',
    shortcut: '/icons/icon.svg',
    apple: '/icons/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Thomas Bohn',
    description: 'Personal website and blog',
    url: 'https://thomaslbohn.com',
    siteName: 'Thomas Bohn',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Thomas Bohn - Product Manager & Software Designer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thomas Bohn',
    description: 'Personal website and blog',
    images: ['/images/og-image.png'],
  },
}

// This site is statically exported to GitHub Pages, which does not support
// setting custom HTTP response headers (no server, no _headers file). A CSP
// delivered via <meta http-equiv> is the only mechanism available in this
// environment - it can't enforce frame-ancestors, X-Frame-Options,
// Strict-Transport-Security, or Permissions-Policy (those require a real
// HTTP header and a hosting layer that can send one), but it does restrict
// which origins scripts, styles, images, fonts, and connections can load
// from, which is the main defense-in-depth value here.
//
// script-src includes 'unsafe-inline' because Next.js's static export embeds
// its RSC hydration payload as inline <script> tags with content that
// differs on every build; per-script hashing/nonces are not available
// without a server-rendering runtime (not used here). All other directives
// are scoped to the exact external origins this app actually calls (see the
// Xanga sidebar applets under components/xanga/applets/).
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://itunes.apple.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://images.credly.com",
  "font-src 'self' data:",
  "connect-src 'self' https://api.allorigins.win https://api.open-meteo.com",
  "frame-src https://w.soundcloud.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={CONTENT_SECURITY_POLICY} />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body className={`${openSans.className} ${openSans.variable}`} suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <XangaLayoutWrapper>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main id="main-content" className="flex-grow">
                <XangaShell>{children}</XangaShell>
              </main>
              <Footer />
              <BackToTop />
            </div>
          </XangaLayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
