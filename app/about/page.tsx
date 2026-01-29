import Image from 'next/image'

export default function About() {
  return (
    <>
      {/* Animated background elements for dark mode */}
      <div className="stars-bg" aria-hidden="true" />
      <div className="nebula-bg" aria-hidden="true" />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header section with role tag */}
          <div className="mb-12 fade-in-up">
            <p className="text-sm text-accent mb-4 font-mono typewriter-cursor">{'>'} PRODUCT MANAGER & SOFTWARE DESIGNER</p>
            <h1 className="text-6xl md:text-7xl font-bold mb-8">
              <span className="gradient-text">
                Thomas Bohn
              </span>
            </h1>
          </div>

          {/* Two column layout - Picture and Bio */}
          <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-8 mb-16">
            {/* Left column - Profile picture */}
            <div className="flex justify-center md:justify-start fade-in-up fade-in-up-delay-1">
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
                      src="/profile.jpg"
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

            {/* Right column - About content */}
            <div className="prose prose-lg max-w-none fade-in-up fade-in-up-delay-2">
              <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-6 text-text-primary font-mono flex items-center gap-3">
                  <span className="text-accent-orange">{'⟩'}</span>
                  {'ABOUT ME'}
                </h2>
              <div className="text-text-secondary leading-loose space-y-5">
                <p>
                  I&apos;m a product manager and software designer with 15+ years of experience 
                  leading data-driven solutions and AI products. At Salesforce, I serve as Senior 
                  Manager of AI Products, where I focus on improving Data Management Maturity (DMM) 
                  to feed AI and Agents with the trusted data, metadata, and context needed for 
                  intelligent automation.
                </p>
                <p>
                  My approach combines product strategy with hands-on technical execution. I use 
                  software engineering tools and large language models to define product requirements, 
                  explore concepts faster, and build proof-of-concepts that directly validate customer 
                  needs. This hybrid approach allows me to understand customer problems deeply and 
                  move quickly from concept to working prototypes.
                </p>
                <p>
                  Throughout my career, I&apos;ve architected enterprise data solutions, led 
                  organizational transformation programs, and built products that drive measurable 
                  business impact. I founded the Data Visualization Center of Excellence, managed 
                  enterprise DMM programs that improved scores by 20% year-over-year, and mentored 
                  over 200 data visualization engineers supporting 30,000+ users.
                </p>
                <p>
                  I&apos;m passionate about data products that power AI, metadata management, and 
                  building context-rich systems that enable trusted automation. My work spans data 
                  architecture, product strategy, and technical implementation—from designing 
                  reference data applications to developing metadata AI products that identify 
                  patterns in data lakes.
                </p>
                <p>
                  When I&apos;m not building products, I&apos;m writing about data governance, 
                  product strategy, and technical leadership. I believe in sharing knowledge 
                  through publications, open source contributions, and thought leadership that 
                  helps others navigate the intersection of data, AI, and product management.
                </p>
                <p>
                  I&apos;m passionate about continuous learning and community engagement. 
                  I believe in sharing knowledge through publications, open source contributions, 
                  and thought leadership that helps others navigate the intersection of data, AI, 
                  and product management.
                </p>
                <p>
                  I&apos;m always interested in connecting with fellow product managers, data 
                  professionals, and technical leaders. Whether it&apos;s discussing data products, 
                  AI strategy, or exploring collaboration opportunities, feel free to reach out!
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-6 text-text-primary font-mono flex items-center gap-3">
                <span className="text-accent-orange">{'⟩'}</span>
                {'PERSONAL HIGHLIGHTS'}
              </h2>
              <div className="text-text-secondary leading-loose space-y-4">
                <p className="flex items-start gap-2">
                  <span className="text-accent mt-1">🎓</span>
                  <span>
                    <strong className="text-text-primary">Lifelong Learner:</strong> Continuously expanding my knowledge 
                    through formal education, certifications, and hands-on experimentation with emerging technologies.
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-accent mt-1">📚</span>
                  <span>
                    <strong className="text-text-primary">Knowledge Sharing:</strong> Published articles on data governance, 
                    technical leadership, and best practices to help others in the field.
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-accent mt-1">🌱</span>
                  <span>
                    <strong className="text-text-primary">Growth Mindset:</strong> Always exploring new technologies, 
                    methodologies, and approaches to solve complex problems.
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-accent mt-1">💡</span>
                  <span>
                    <strong className="text-text-primary">Innovation:</strong> Bridging the gap between academic research 
                    and practical business applications to deliver real-world value.
                  </span>
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-6 text-text-primary font-mono flex items-center gap-3">
                <span className="text-accent-orange">{'⟩'}</span>
                {'WHAT DRIVES ME'}
              </h2>
              <div className="text-text-secondary leading-loose space-y-4">
                <p className="flex items-start gap-2">
                  <span className="text-accent mt-1">🧩</span>
                  <span>
                    <strong className="text-text-primary">Solving Complex Problems:</strong> Using data to uncover insights 
                    that drive business value and inform strategic decision-making.
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-accent mt-1">👥</span>
                  <span>
                    <strong className="text-text-primary">Building Teams:</strong> Creating environments where data professionals 
                    can thrive, grow, and deliver their best work.
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-accent mt-1">🚀</span>
                  <span>
                    <strong className="text-text-primary">Continuous Innovation:</strong> Staying at the forefront of AI/ML 
                    developments and applying cutting-edge techniques to solve real business challenges.
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-accent mt-1">💼</span>
                  <span>
                    <strong className="text-text-primary">Making Impact:</strong> Contributing to projects that improve 
                    decision-making, outcomes, and the overall effectiveness of data-driven organizations.
                  </span>
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-6 text-text-primary font-mono flex items-center gap-3">
                <span className="text-accent-orange">{'⟩'}</span>
                {'TECHNICAL EXPERTISE'}
              </h2>
              <div className="text-text-secondary space-y-4">
                <p className="flex items-start gap-2">
                  <span className="text-accent mt-1">🤖</span>
                  <span>
                    <strong className="text-text-primary">AI & Machine Learning:</strong> Large Language Models (LLM), 
                    Prompt Engineering, GenAI, Agentforce, Metadata AI, Model Interpretability
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-accent mt-1">📊</span>
                  <span>
                    <strong className="text-text-primary">Data Management & Analytics:</strong> Data Management Maturity (DMM), 
                    Data Governance, Data Architecture, Metadata Management, Data Quality, dbt, Spark, Trino, 
                    Snowflake, Data Warehousing, ETL/ELT Pipelines
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-accent mt-1">☁️</span>
                  <span>
                    <strong className="text-text-primary">Salesforce Platform:</strong> Sales Cloud, Service Cloud, 
                    CRM Analytics (Einstein Analytics), Platform Development, Apex, Lightning Web Components, 
                    Flows, Salesforce DX, Integration Patterns
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-accent mt-1">📈</span>
                  <span>
                    <strong className="text-text-primary">Data Visualization & BI:</strong> Tableau, Qlikview, 
                    MicroStrategy, Business Intelligence, Dashboard Design, Analytics Strategy
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-accent mt-1">💻</span>
                  <span>
                    <strong className="text-text-primary">Programming & Languages:</strong> Python, R, SQL (PostgreSQL, 
                    Teradata, Oracle, HiveQL, SOQL), JavaScript, TypeScript, Bash, Java, C++
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-accent mt-1">⚙️</span>
                  <span>
                    <strong className="text-text-primary">Product & Process:</strong> Product Strategy, Program Management, 
                    Solution Architecture, SDLC, Agile Methodologies, Change Management, Organizational Transformation
                  </span>
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-6 text-text-primary font-mono flex items-center gap-3">
                <span className="text-accent-orange">{'⟩'}</span>
                {'ABOUT THIS PAGE'}
              </h2>
              <div className="text-text-secondary leading-loose space-y-5">
                <p>
                  Everything you see here I designed myself and implemented with the help of{' '}
                  <strong className="text-text-primary">Cursor AI agents</strong>. The website is built with{' '}
                  <strong className="text-text-primary">React</strong> and <strong className="text-text-primary">Next.js</strong>, 
                  using <strong className="text-text-primary">TypeScript</strong> for type safety and{' '}
                  <strong className="text-text-primary">Tailwind CSS</strong> as the design system. 
                  The pages are statically generated by Next.js and deployed as a static site.
                </p>
                <p>
                  Blog content is written in Markdown and processed with{' '}
                  <strong className="text-text-primary">remark</strong> for rendering. 
                  Icons are provided by <strong className="text-text-primary">react-icons</strong>, 
                  and the site uses a custom design system built on top of Tailwind CSS with a focus on 
                  accessibility and responsive design.
                </p>
                <p>
                  If you are curious, you can explore the code for this website on my{' '}
                  <a
                    href="https://github.com/TOM-BOHN/tom-bohn.github.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link hover:text-link-hover underline font-semibold"
                  >
                    GitHub
                  </a>.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-text-primary font-mono flex items-center gap-3">
                <span className="text-accent-orange">{'⟩'}</span>
                {'GET IN TOUCH'}
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                I&apos;m always open to discussing new opportunities, technical challenges, 
                or potential collaborations. Feel free to reach out through any of the 
                channels below.
              </p>
              <a
                href="/contact"
                className="gradient-btn"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Me
              </a>
            </section>
          </div>
        </div>
        </div>
      </div>
    </>
  )
}
