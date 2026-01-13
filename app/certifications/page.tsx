import { getCertifications } from '@/lib/certifications'

export default async function Certifications() {
  const certifications = await getCertifications()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-text-primary">
          Certifications & Learning
        </h1>
        <p className="text-xl text-text-secondary mb-12">
          My journey of continuous learning and professional development
        </p>

        {certifications.length === 0 ? (
          <div className="text-center py-12 border border-border rounded-lg bg-bg-secondary">
            <p className="text-text-secondary mb-4">No certifications listed yet.</p>
            <p className="text-text-secondary text-sm">
              Certifications and learning progress will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="border border-border rounded-lg p-6 hover:border-accent hover:shadow-lg transition-all bg-bg-secondary"
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-2xl font-semibold text-accent">
                    {cert.title}
                  </h2>
                  {cert.date && (
                    <span className="text-text-secondary text-sm">
                      {new Date(cert.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                      })}
                    </span>
                  )}
                </div>
                {cert.issuer && (
                  <p className="text-text-secondary mb-2">
                    <strong>Issuer:</strong> {cert.issuer}
                  </p>
                )}
                {cert.description && (
                  <p className="text-text-secondary mb-4">{cert.description}</p>
                )}
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link hover:text-link-hover underline"
                  >
                    View Credential →
                  </a>
                )}
                {cert.status && (
                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded text-sm ${
                      cert.status === 'completed'
                        ? 'bg-green-500 text-white'
                        : cert.status === 'in-progress'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-500 text-white'
                    }`}
                  >
                    {cert.status}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
