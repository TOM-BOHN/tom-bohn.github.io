import { getHubLinks } from '@/lib/hub'

export default async function Hub() {
  const hubLinks = await getHubLinks()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-text-primary text-center">
          Hub
        </h1>
        <p className="text-xl text-text-secondary mb-12 text-center">
          All the places you can find me online
        </p>

        {hubLinks.length === 0 ? (
          <div className="text-center py-12 border border-border rounded-lg bg-bg-secondary">
            <p className="text-text-secondary mb-4">No links added yet.</p>
            <p className="text-text-secondary text-sm">
              Your online presence links will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {hubLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-border rounded-lg p-6 hover:border-accent hover:shadow-lg transition-all bg-bg-secondary text-center"
              >
                <h2 className="text-2xl font-semibold mb-2 text-accent">
                  {link.title}
                </h2>
                {link.description && (
                  <p className="text-text-secondary">{link.description}</p>
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
