import Link from 'next/link'
import { getBlogPosts } from '@/lib/blog'

export default async function Blog() {
  const posts = await getBlogPosts()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-text-primary">Blog</h1>
        <p className="text-xl text-text-secondary mb-12">
          Thoughts, tutorials, and random musings
        </p>

        {posts.length === 0 ? (
          <div className="text-center py-12 border border-border rounded-lg bg-bg-secondary">
            <p className="text-text-secondary mb-4">No blog posts yet.</p>
            <p className="text-text-secondary text-sm">
              Check back soon for new content!
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="border border-border rounded-lg p-6 hover:border-accent hover:shadow-lg transition-all bg-bg-secondary"
              >
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-semibold mb-2 text-accent hover:text-accent-hover">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-text-secondary text-sm mb-4">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-text-secondary leading-relaxed">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-block mt-4 text-link hover:text-link-hover underline"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
