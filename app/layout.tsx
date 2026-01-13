import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tom Bohn',
  description: 'Personal website and blog',
  metadataBase: new URL('https://thomaslbohn.com'),
  alternates: {
    canonical: 'https://thomaslbohn.com',
  },
  openGraph: {
    title: 'Tom Bohn',
    description: 'Personal website and blog',
    url: 'https://thomaslbohn.com',
    siteName: 'Tom Bohn',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Tom Bohn',
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
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
