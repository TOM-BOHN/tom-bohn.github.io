import { getProjects } from '@/lib/projects'

export default async function Projects() {
  const projects = await getProjects()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-sm text-accent mb-4 font-mono">{'>'} PRODUCT MANAGER & SOFTWARE DESIGNER</p>
          <h1 className="text-2xl font-semibold mb-4 text-text-primary font-mono">
            {'// PROJECTS'}
          </h1>
          <p className="text-text-secondary leading-relaxed">
            A collection of projects I&apos;ve worked on
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12 border border-border rounded-lg bg-bg-secondary">
            <p className="text-text-secondary mb-4">No projects listed yet.</p>
            <p className="text-text-secondary text-sm">
              Projects will appear here once added.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="border border-border rounded-lg p-6 hover:border-accent hover:shadow-lg transition-all bg-bg-secondary"
              >
                <h2 className="text-2xl font-semibold mb-2 text-accent">
                  {project.title}
                </h2>
                <p className="text-text-secondary mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-accent text-white text-sm rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link hover:text-link-hover underline"
                  >
                    View Project →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
