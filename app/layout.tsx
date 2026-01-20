import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { XangaShell } from '@/components/XangaShell'
import { XangaLayoutWrapper } from '@/components/XangaLayoutWrapper'

const openSans = Open_Sans({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
})

export const metadata: Metadata = {
  title: 'Thomas Bohn',
  description: 'Personal website and blog',
  metadataBase: new URL('https://thomaslbohn.com'),
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://thomaslbohn.com',
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Thomas Bohn',
    description: 'Personal website and blog',
    url: 'https://thomaslbohn.com',
    siteName: 'Thomas Bohn',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Thomas Bohn',
    description: 'Personal website and blog',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${openSans.className} ${openSans.variable}`} suppressHydrationWarning>
        <ThemeProvider>
          <XangaLayoutWrapper>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                <XangaShell>{children}</XangaShell>
              </main>
              <Footer />
            </div>
          </XangaLayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
