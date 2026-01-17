import Link from 'next/link'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { SiMedium } from 'react-icons/si'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-bg-secondary py-8 mt-auto">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-text-secondary text-sm">
          {/* First row: Icons centered */}
          <div className="flex items-center justify-center gap-6 mb-4">
            <Link
              href="/contact"
              className="text-text-secondary hover:text-accent transition-colors"
              aria-label="Contact"
            >
              <FaEnvelope className="w-5 h-5" />
            </Link>
            <a
              href="https://www.linkedin.com/in/thomaslbohn/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a
              href="https://medium.com/@bohn.tl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent transition-colors"
              aria-label="Medium"
            >
              <SiMedium className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/TOM-BOHN"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5" />
            </a>
          </div>
          {/* Second row: Copyright centered */}
          <div className="text-center">
            <p>&copy; {currentYear} Thomas Bohn. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
