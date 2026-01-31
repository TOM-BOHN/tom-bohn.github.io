import Image from 'next/image'

export default function Home() {
  return (
    <>
      {/* Animated background elements for dark mode */}
      <div className="stars-bg" aria-hidden="true" />
      <div className="nebula-bg" aria-hidden="true" />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Role tag with fade-in animation */}
          <p className="text-sm text-accent mb-4 font-mono fade-in-up typewriter-cursor">PRODUCT MANAGER & SOFTWARE DESIGNER</p>
          
          {/* Main content area - two column layout */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Left column - Name and bio */}
            <div className="fade-in-up fade-in-up-delay-1">
              <h1 className="text-6xl md:text-7xl font-bold mb-6">
                <span className="gradient-text">
                  Thomas Bohn
                </span>
              </h1>
              <p className="text-lg text-text-secondary leading-loose mb-5">
              Product manager and software designer specializing in AI products, data management, 
              and analytics. I bridge product strategy with hands-on development, using software 
              engineering tools and LLMs to define product details, explore ideas faster, and build 
              proof-of-concepts that directly address customer needs.
            </p>
            <p className="text-lg text-text-secondary leading-loose mb-8">
              Currently leading AI product initiatives at Salesforce, focusing on data management 
              maturity and metadata AI solutions. Passionate about building data products that 
              power trusted AI, and sharing insights on product strategy, data governance, and 
              technical leadership.
            </p>
            <a 
              href="/contact" 
              className="gradient-btn"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Get in touch
            </a>
            </div>
          
            {/* Right column - Profile picture with floating animation */}
          <div className="flex justify-center md:justify-end fade-in-up fade-in-up-delay-2">
            <div className="w-64 md:w-80 float-animation">
              <div className="relative h-80 md:h-96 glow-orange">
                <div
                  className="absolute inset-0 border-2 border-accent-orange/40 rounded-lg"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                    borderTopLeftRadius: '0.5rem',
                    borderTopRightRadius: '0.5rem',
                  }}
                />
                <div className="relative w-full h-full rounded-lg overflow-hidden bg-bg-secondary shadow-2xl">
                  <Image
                    src="/images/profile.jpg"
                    alt="Thomas Bohn"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              {/* Bottom border accent with gradient */}
              <div className="h-1.5 bg-gradient-to-r from-[#c85200] via-[#fc7d0b] to-[#1170aa] rounded-b-lg" />
            </div>
          </div>
          </div>

        {/* Gradient Divider */}
        <hr className="gradient-divider fade-in-up fade-in-up-delay-2" />

        {/* Project Cards Section */}
        <div className="mb-12 fade-in-up fade-in-up-delay-3">
          <h2 className="text-2xl font-bold mb-10 text-text-primary font-mono flex items-center gap-3">
            <span className="text-accent-orange">{'⟩'}</span>
            {'MY WORK'}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Medium Card */}
            <div className="glass-card shine-effect rounded-xl p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-accent-orange to-accent-orange-hover rounded-xl flex items-center justify-center text-white font-bold text-xl icon-bounce shadow-lg">
                  M
                </div>
                <h3 className="text-3xl font-bold text-text-primary">Medium</h3>
              </div>
              <p className="text-text-secondary mb-6 leading-loose">
                Writing about software engineering, Salesforce development, data engineering, 
                and technical leadership. Sharing insights, tutorials, and experiences from 
                building enterprise solutions.
              </p>
              <div className="mb-6">
                <p className="text-sm font-semibold text-text-primary mb-3 font-mono">RECENT ARTICLES:</p>
                <ul className="space-y-2 text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-accent-orange mt-1">→</span>
                    <a
                      href="https://medium.com/@ThomasLBohn/the-4-cs-of-data-governance-measurement-5759fdbbc373"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link hover:text-link-hover underline"
                    >
                      The 4 Cs of Data Governance Measurement
                    </a>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-orange mt-1">→</span>
                    <a
                      href="https://medium.com/@ThomasLBohn/the-enabling-team-playbook-78b60b0bb4f0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link hover:text-link-hover underline"
                    >
                      The Enabling Team Framework
                    </a>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-orange mt-1">→</span>
                    <a
                      href="https://medium.com/@ThomasLBohn/the-spec-driven-writing-framework-55facae16425"
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
                href="https://medium.com/@ThomasLBohn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-link hover:text-link-hover font-semibold group"
              >
                READ ON MEDIUM 
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* GitHub Card */}
            <div className="glass-card shine-effect rounded-xl p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center icon-bounce shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.442 22 12.017 22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-text-primary">GitHub</h3>
              </div>
              <p className="text-text-secondary mb-6 leading-loose">
                Open source projects, code samples, and contributions. Exploring new 
                technologies, building tools, and sharing code with the developer community.
              </p>
              <div className="mb-6">
                <p className="text-sm font-semibold text-text-primary mb-3 font-mono">FEATURED REPOS:</p>
                <ul className="space-y-2 text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-accent-orange mt-1">→</span>
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
                    <span className="text-accent-orange mt-1">→</span>
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
                    <span className="text-accent-orange mt-1">→</span>
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
                className="inline-flex items-center gap-2 text-link hover:text-link-hover font-semibold group"
              >
                VIEW ON GITHUB
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Gradient Divider */}
        <hr className="gradient-divider fade-in-up fade-in-up-delay-4" />

        {/* Dig Deeper Section */}
        <div className="mb-8 fade-in-up fade-in-up-delay-4">
          <h2 className="text-2xl font-bold mb-8 text-text-primary font-mono flex items-center gap-3">
            <span className="text-accent-orange">{'⟩'}</span>
            {'DIG DEEPER'}
          </h2>
          <div className="glass-card rounded-xl p-8 border-l-4 border-l-accent-orange">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-accent-orange/30 to-accent/30 rounded-xl flex items-center justify-center icon-bounce">
                <svg className="w-7 h-7 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text-primary">VIP + Beta Program</h3>
            </div>
            <p className="text-text-secondary mb-4 leading-relaxed">
              Locked tags and exclusive content are available to a limited set of people through the{' '}
              <span className="font-semibold text-accent-orange">VIP + Beta program</span>.
            </p>
            <p className="text-text-secondary leading-relaxed mb-6">
              Interested in early access? Reach out to request access.
            </p>
            <a 
              href="mailto:hello@thomaslbohn.com" 
              className="gradient-btn-blue gradient-btn"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              Request VIP Access
            </a>
          </div>
        </div>
        </div>
      </div>
    </>
  )
}
