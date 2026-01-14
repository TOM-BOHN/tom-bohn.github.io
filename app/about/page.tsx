import Image from 'next/image'

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header section with role tag */}
        <div className="mb-12">
          <p className="text-sm text-accent mb-4 font-mono">{'>'} SOFTWARE ENGINEER</p>
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
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Left column - Profile picture */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-64 h-80 md:w-80 md:h-96">
              <div className="absolute inset-0 border-2 border-accent/30 rounded-lg" 
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
              {/* Bottom border accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-blue-900" />
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
                  I&apos;m a software engineer and technical leader with a passion for building 
                  scalable, maintainable solutions. My expertise spans Salesforce development, 
                  data engineering, cloud architecture, and team leadership.
                </p>
                <p>
                  Throughout my career, I&apos;ve focused on delivering high-quality enterprise 
                  solutions that solve real business problems. I specialize in Salesforce 
                  platform development, working with Apex, Lightning Web Components, Flows, 
                  and the broader Salesforce ecosystem to build custom applications and 
                  integrations.
                </p>
                <p>
                  In addition to hands-on development, I&apos;m passionate about data engineering 
                  and building robust data pipelines. I work with modern data stack tools 
                  including dbt, Spark, Trino, and various cloud data warehouses to transform 
                  raw data into actionable insights.
                </p>
                <p>
                  As a technical leader, I believe in the power of mentorship and knowledge 
                  sharing. I enjoy working with teams to establish best practices, improve 
                  code quality, and foster a culture of continuous learning. I&apos;m particularly 
                  interested in agentic SDLC processes and spec-driven development methodologies 
                  that help teams deliver better software faster.
                </p>
                <p>
                  When I&apos;m not coding, I&apos;m likely writing about software engineering, 
                  contributing to open source projects, or exploring new technologies. 
                  I believe in the importance of giving back to the developer community 
                  and sharing knowledge through writing, speaking, and open source contributions.
                </p>
                <p>
                  I&apos;m always interested in connecting with fellow developers, discussing 
                  technical challenges, and exploring opportunities to collaborate on 
                  interesting projects. Feel free to reach out if you&apos;d like to connect!
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-text-primary font-mono">
                {'// TECHNICAL EXPERTISE'}
              </h2>
              <div className="text-text-secondary">
                <p className="mb-3">
                  <strong className="text-text-primary">Salesforce Platform:</strong> Apex, Lightning Web Components, 
                  Flows, Process Builder, Salesforce DX, Metadata API, Integration Patterns
                </p>
                <p className="mb-3">
                  <strong className="text-text-primary">Data Engineering:</strong> dbt, Spark, Trino, SQL, 
                  Data Warehousing, ETL/ELT Pipelines, Data Modeling
                </p>
                <p className="mb-3">
                  <strong className="text-text-primary">Languages & Tools:</strong> JavaScript, TypeScript, 
                  Python, SQL, Git, CI/CD, Agile Methodologies
                </p>
                <p>
                  <strong className="text-text-primary">Cloud & Infrastructure:</strong> AWS, Azure, 
                  Cloud Architecture, DevOps Practices
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
