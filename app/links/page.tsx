import { getLinks } from '@/lib/links'

export default async function Links() {
  const links = await getLinks()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-text-primary">Links</h1>
        <p className="text-xl text-text-secondary mb-12">
          Bookmarks, tools, and resources I find useful
        </p>

        {Object.keys(links).length === 0 ? (
          <div className="text-center py-12 border border-border rounded-lg bg-bg-secondary">
            <p className="text-text-secondary mb-4">No links organized yet.</p>
            <p className="text-text-secondary text-sm">
              Links will be organized by category here.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(links).map(([category, items]) => (
              <section key={category} className="border border-border rounded-lg p-6 bg-bg-secondary">
                <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                  {category}
                </h2>
                <ul className="space-y-3">
                  {items.map((link) => (
                    <li key={link.id}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-link hover:text-link-hover underline flex items-center gap-2"
                      >
                        <span>{link.title}</span>
                        {link.description && (
                          <span className="text-text-secondary text-sm">
                            - {link.description}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
