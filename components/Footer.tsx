export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-bg-secondary py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center text-text-secondary text-sm">
          <p>&copy; {currentYear} Thomas Bohn. All rights reserved.</p>
          <p className="mt-2">
            Built with{' '}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link hover:text-link-hover underline"
            >
              Next.js
            </a>
            {' '}and hosted on{' '}
            <a
              href="https://pages.github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link hover:text-link-hover underline"
            >
              GitHub Pages
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
