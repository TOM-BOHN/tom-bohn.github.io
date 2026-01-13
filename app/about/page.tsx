export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-text-primary">About</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-text-primary">Who I Am</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              [Your introduction and background will go here]
            </p>
            <p className="text-text-secondary leading-relaxed">
              [More about your interests, values, and what drives you]
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-text-primary">What I Do</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              [Your professional background and current work]
            </p>
            <p className="text-text-secondary leading-relaxed">
              [Your skills and areas of expertise]
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-text-primary">Interests</h2>
            <ul className="list-disc list-inside text-text-secondary space-y-2">
              <li>[Interest 1]</li>
              <li>[Interest 2]</li>
              <li>[Interest 3]</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-text-primary">Get in Touch</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Feel free to reach out if you'd like to connect or collaborate.
            </p>
            <a
              href="/contact"
              className="inline-block px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors"
            >
              Contact Me
            </a>
          </section>
        </div>
      </div>
    </div>
  )
}
