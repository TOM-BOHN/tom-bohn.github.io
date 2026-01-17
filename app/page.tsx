import Image from 'next/image'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Role tag */}
        <p className="text-sm text-accent mb-4 font-mono">{'>'} PRODUCT MANAGER & SOFTWARE DESIGNER</p>
        
        {/* Main content area - two column layout */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Left column - Name and bio */}
          <div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Thomas
              </span>
              {' '}
              <span className="bg-gradient-to-r from-blue-900 to-blue-800 bg-clip-text text-transparent">
                Bohn
              </span>
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed mb-4">
              Product manager and software designer specializing in AI products, data management, 
              and analytics. I bridge product strategy with hands-on development, using software 
              engineering tools and LLMs to define product details, explore ideas faster, and build 
              proof-of-concepts that directly address customer needs.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              Currently leading AI product initiatives at Salesforce, focusing on data management 
              maturity and metadata AI solutions. Passionate about building data products that 
              power trusted AI, and sharing insights on product strategy, data governance, and 
              technical leadership.{' '}
              <a 
                href="/contact" 
                className="text-link hover:text-link-hover underline"
              >
                Get in touch
              </a>.
            </p>
          </div>
          
          {/* Right column - Profile picture */}
          <div className="flex justify-center md:justify-end">
            <div className="w-64 md:w-80">
              <div className="relative h-80 md:h-96">
                <div
                  className="absolute inset-0 border-2 border-accent/30 rounded-lg"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                    borderTopLeftRadius: '0.5rem',
                    borderTopRightRadius: '0.5rem',
                  }}
                />
                <div className="relative w-full h-full rounded-lg overflow-hidden bg-bg-secondary">
                  <Image
                    src="/profile.jpg"
                    alt="Thomas Bohn"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              {/* Bottom border accent (below image, not over it) */}
              <div className="h-1 bg-gradient-to-r from-orange-500 to-blue-900" />
            </div>
          </div>
        </div>

        {/* Project Cards Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-8 text-text-primary font-mono">
            {'// MY WORK'}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Medium Card */}
            <div className="border-2 border-border rounded-lg p-8 bg-bg-secondary hover:border-accent transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-accent rounded flex items-center justify-center text-white font-bold text-xl">
                  M
                </div>
                <h3 className="text-3xl font-bold text-text-primary">Medium</h3>
              </div>
              <p className="text-text-secondary mb-6 leading-relaxed">
                Writing about software engineering, Salesforce development, data engineering, 
                and technical leadership. Sharing insights, tutorials, and experiences from 
                building enterprise solutions.
              </p>
              <div className="mb-6">
                <p className="text-sm font-semibold text-text-primary mb-3 font-mono">RECENT ARTICLES:</p>
                <ul className="space-y-2 text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">→</span>
                    <a
                      href="https://medium.com/@bohn.tl/the-4-cs-of-data-governance-measurement-5759fdbbc373"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link hover:text-link-hover underline"
                    >
                      The 4 Cs of Data Governance Measurement
                    </a>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">→</span>
                    <a
                      href="https://medium.com/@bohn.tl/the-enabling-team-playbook-78b60b0bb4f0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link hover:text-link-hover underline"
                    >
                      The Enabling Team Framework
                    </a>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">→</span>
                    <a
                      href="https://medium.com/@bohn.tl/the-spec-driven-writing-framework-55facae16425"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link hover:text-link-hover underline"
                    >
                      The Spec-Driven Writing Framework
                    </a>
                  </li>
                </ul>
              </div>
              <a
                href="https://medium.com/@bohn.tl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-link hover:text-link-hover underline font-semibold"
              >
                READ ON MEDIUM →
              </a>
            </div>

            {/* GitHub Card */}
            <div className="border-2 border-border rounded-lg p-8 bg-bg-secondary hover:border-accent transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.442 22 12.017 22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-text-primary">GitHub</h3>
              </div>
              <p className="text-text-secondary mb-6 leading-relaxed">
                Open source projects, code samples, and contributions. Exploring new 
                technologies, building tools, and sharing code with the developer community.
              </p>
              <div className="mb-6">
                <p className="text-sm font-semibold text-text-primary mb-3 font-mono">FEATURED REPOS:</p>
                <ul className="space-y-2 text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">→</span>
                    <a
                      href="https://github.com/TOM-BOHN/MsDS-deep-learing-gan-monet-painting/tree/main"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link hover:text-link-hover underline"
                    >
                      deep-learing-gan-monet-painting
                    </a>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">→</span>
                    <a
                      href="https://github.com/TOM-BOHN/MsDS-deep-learing-cnn-cancer-detection"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link hover:text-link-hover underline"
                    >
                      deep-learing-cnn-cancer-detection
                    </a>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">→</span>
                    <a
                      href="https://github.com/TOM-BOHN/MsDS-deep-learning-llm-classification-finetuning"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link hover:text-link-hover underline"
                    >
                      deep-learning-llm-classification-finetuning
                    </a>
                  </li>
                </ul>
              </div>
              <a
                href="https://github.com/TOM-BOHN"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-link hover:text-link-hover underline font-semibold"
              >
                VIEW ON GITHUB →
              </a>
            </div>
          </div>
        </div>

        {/* Dig Deeper Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-8 text-text-primary font-mono">
            {'// DIG DEEPER'}
          </h2>
          <div className="border-2 border-accent/30 rounded-lg p-8 bg-bg-secondary">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-accent/20 rounded flex items-center justify-center">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text-primary">VIP + Beta Program</h3>
            </div>
            <p className="text-text-secondary mb-4 leading-relaxed">
              Locked tags and exclusive content are available to a limited set of people through the{' '}
              <span className="font-semibold text-text-primary">VIP + Beta program</span>.
            </p>
            <p className="text-text-secondary leading-relaxed">
              Interested in early access? Contact{' '}
              <a 
                href="mailto:hello@thomaslbohn.com" 
                className="text-link hover:text-link-hover underline font-semibold"
              >
                hello@thomaslbohn.com
              </a>
              {' '}to request access.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
