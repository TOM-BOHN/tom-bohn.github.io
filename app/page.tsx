import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-6 text-text-primary">
          Welcome
        </h1>
        <p className="text-xl text-text-secondary mb-8 leading-relaxed">
          Welcome to my personal website. Here you'll find my thoughts, projects, 
          and various corners of the internet where I exist.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Link
            href="/about"
            className="p-6 border border-border rounded-lg hover:border-accent hover:shadow-lg transition-all bg-bg-secondary"
          >
            <h2 className="text-2xl font-semibold mb-2 text-accent">About</h2>
            <p className="text-text-secondary">
              Learn more about me, my background, and what I'm passionate about.
            </p>
          </Link>

          <Link
            href="/blog"
            className="p-6 border border-border rounded-lg hover:border-accent hover:shadow-lg transition-all bg-bg-secondary"
          >
            <h2 className="text-2xl font-semibold mb-2 text-accent">Blog</h2>
            <p className="text-text-secondary">
              Thoughts, tutorials, and random musings on technology and life.
            </p>
          </Link>

          <Link
            href="/projects"
            className="p-6 border border-border rounded-lg hover:border-accent hover:shadow-lg transition-all bg-bg-secondary"
          >
            <h2 className="text-2xl font-semibold mb-2 text-accent">Projects</h2>
            <p className="text-text-secondary">
              A collection of projects I've worked on and things I've built.
            </p>
          </Link>

          <Link
            href="/hub"
            className="p-6 border border-border rounded-lg hover:border-accent hover:shadow-lg transition-all bg-bg-secondary"
          >
            <h2 className="text-2xl font-semibold mb-2 text-accent">Hub</h2>
            <p className="text-text-secondary">
              All the places you can find me online - a personal link hub.
            </p>
          </Link>
        </div>

        <div className="mt-12 p-6 border border-border rounded-lg bg-bg-secondary">
          <h2 className="text-2xl font-semibold mb-4 text-text-primary">Quick Links</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/links" className="text-link hover:text-link-hover underline">
              Bookmarks & Tools
            </Link>
            <Link href="/certifications" className="text-link hover:text-link-hover underline">
              Certifications & Learning
            </Link>
            <Link href="/contact" className="text-link hover:text-link-hover underline">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
