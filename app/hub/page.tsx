import { getHubLinks } from '@/lib/hub'

export default async function Hub() {
  const hubLinks = await getHubLinks()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-text-primary text-center">
          Hub
        </h1>
        <p className="text-xl text-text-secondary mb-12 text-center">
          All the places you can find me online
        </p>

        {/* Social Media Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Medium Card */}
          <a
            href="https://medium.com/@bohn.tl"
            target="_blank"
            rel="noopener noreferrer"
            className="block border-2 border-border rounded-lg p-6 hover:border-accent hover:shadow-lg transition-all bg-bg-secondary text-center group"
          >
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-2xl">M</span>
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-accent">
              Medium
            </h2>
            <p className="text-text-secondary text-sm">
              Articles and writing on software engineering, data science, and technology
            </p>
          </a>

          {/* LinkedIn Card */}
          <a
            href="https://www.linkedin.com/in/thomaslbohn/"
            target="_blank"
            rel="noopener noreferrer"
            className="block border-2 border-border rounded-lg p-6 hover:border-accent hover:shadow-lg transition-all bg-bg-secondary text-center group"
          >
            <div className="w-16 h-16 bg-[#0077b5] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-accent">
              LinkedIn
            </h2>
            <p className="text-text-secondary text-sm">
              Professional network and career updates
            </p>
          </a>

          {/* GitHub Card */}
          <a
            href="https://github.com/TOM-BOHN"
            target="_blank"
            rel="noopener noreferrer"
            className="block border-2 border-border rounded-lg p-6 hover:border-accent hover:shadow-lg transition-all bg-bg-secondary text-center group"
          >
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.442 22 12.017 22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-accent">
              GitHub
            </h2>
            <p className="text-text-secondary text-sm">
              Open source projects, code samples, and contributions
            </p>
          </a>

          {/* Trailhead Card */}
          <a
            href="https://www.salesforce.com/trailblazer/thomasbohn"
            target="_blank"
            rel="noopener noreferrer"
            className="block border-2 border-border rounded-lg p-6 hover:border-accent hover:shadow-lg transition-all bg-bg-secondary text-center group"
          >
            <div className="w-16 h-16 bg-[#00A1E0] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-accent">
              Trailhead
            </h2>
            <p className="text-text-secondary text-sm">
              Salesforce learning profile, badges, and certifications
            </p>
          </a>
        </div>

        {/* Additional Links from hub.json */}
        {hubLinks.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-text-primary text-center mt-12">
              Additional Links
            </h2>
            <div className="space-y-4">
              {hubLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border border-border rounded-lg p-6 hover:border-accent hover:shadow-lg transition-all bg-bg-secondary text-center"
                >
                  <h3 className="text-2xl font-semibold mb-2 text-accent">
                    {link.title}
                  </h3>
                  {link.description && (
                    <p className="text-text-secondary">{link.description}</p>
                  )}
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
