export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-text-primary">Contact</h1>
        <p className="text-xl text-text-secondary mb-12">
          Get in touch with me through any of these channels
        </p>

        <div className="space-y-6">
          <div className="border border-border rounded-lg p-6 bg-bg-secondary">
            <h2 className="text-2xl font-semibold mb-4 text-text-primary">Email</h2>
            <p className="text-text-secondary mb-4">
              [Your email address will go here]
            </p>
            <a
              href="mailto:[your-email@example.com]"
              className="text-link hover:text-link-hover underline"
            >
              Send me an email
            </a>
          </div>

          <div className="border border-border rounded-lg p-6 bg-bg-secondary">
            <h2 className="text-2xl font-semibold mb-4 text-text-primary">Social Media</h2>
            <div className="space-y-2 text-text-secondary">
              <p>
                <a href="#" className="text-link hover:text-link-hover underline">
                  [Social media link 1]
                </a>
              </p>
              <p>
                <a href="#" className="text-link hover:text-link-hover underline">
                  [Social media link 2]
                </a>
              </p>
            </div>
          </div>

          <div className="border border-border rounded-lg p-6 bg-bg-secondary">
            <h2 className="text-2xl font-semibold mb-4 text-text-primary">Other</h2>
            <p className="text-text-secondary">
              Check out my{' '}
              <a href="/hub" className="text-link hover:text-link-hover underline">
                Hub page
              </a>
              {' '}for all the places you can find me online.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
