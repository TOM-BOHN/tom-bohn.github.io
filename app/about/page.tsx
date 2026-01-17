import Image from 'next/image'

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header section with role tag */}
        <div className="mb-12">
          <p className="text-sm text-accent mb-4 font-mono">{'>'} PRODUCT MANAGER & SOFTWARE DESIGNER</p>
          <h1 className="text-6xl md:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Thomas
            </span>
            {' '}
            <span className="bg-gradient-to-r from-blue-900 to-blue-800 bg-clip-text text-transparent">
              Bohn
            </span>
          </h1>
        </div>

        {/* Two column layout - Picture and Bio */}
        <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-8 mb-16">
          {/* Left column - Profile picture */}
          <div className="flex justify-center md:justify-start">
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

          {/* Right column - About content */}
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-text-primary font-mono">
                {'// ABOUT ME'}
              </h2>
              <div className="text-text-secondary leading-relaxed space-y-4">
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
                  I&apos;m always interested in connecting with fellow product managers, data 
                  professionals, and technical leaders. Whether it&apos;s discussing data products, 
                  AI strategy, or exploring collaboration opportunities, feel free to reach out!
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-text-primary font-mono">
                {'// TECHNICAL EXPERTISE'}
              </h2>
              <div className="text-text-secondary">
                <p className="mb-3">
                  <strong className="text-text-primary">AI & Machine Learning:</strong> Large Language Models (LLM), 
                  Prompt Engineering, GenAI, Agentforce, Metadata AI, Model Interpretability
                </p>
                <p className="mb-3">
                  <strong className="text-text-primary">Data Management & Analytics:</strong> Data Management Maturity (DMM), 
                  Data Governance, Data Architecture, Metadata Management, Data Quality, dbt, Spark, Trino, 
                  Snowflake, Data Warehousing, ETL/ELT Pipelines
                </p>
                <p className="mb-3">
                  <strong className="text-text-primary">Salesforce Platform:</strong> Sales Cloud, Service Cloud, 
                  CRM Analytics (Einstein Analytics), Platform Development, Apex, Lightning Web Components, 
                  Flows, Salesforce DX, Integration Patterns
                </p>
                <p className="mb-3">
                  <strong className="text-text-primary">Data Visualization & BI:</strong> Tableau, Qlikview, 
                  MicroStrategy, Business Intelligence, Dashboard Design, Analytics Strategy
                </p>
                <p className="mb-3">
                  <strong className="text-text-primary">Programming & Languages:</strong> Python, R, SQL (PostgreSQL, 
                  Teradata, Oracle, HiveQL, SOQL), JavaScript, TypeScript, Bash, Java, C++
                </p>
                <p>
                  <strong className="text-text-primary">Product & Process:</strong> Product Strategy, Program Management, 
                  Solution Architecture, SDLC, Agile Methodologies, Change Management, Organizational Transformation
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-text-primary font-mono">
                {'// GET IN TOUCH'}
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                I&apos;m always open to discussing new opportunities, technical challenges, 
                or potential collaborations. Feel free to reach out through any of the 
                channels below.
              </p>
              <a
                href="/contact"
                className="inline-block px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors font-semibold"
              >
                Contact Me
              </a>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
