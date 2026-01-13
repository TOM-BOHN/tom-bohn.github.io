import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-6xl font-bold mb-4 text-text-primary">404</h1>
        <h2 className="text-3xl font-semibold mb-4 text-text-primary">Page Not Found</h2>
        <p className="text-text-secondary mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
