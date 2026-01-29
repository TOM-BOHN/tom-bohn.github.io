import Link from 'next/link'
import { getBlogPosts } from '@/lib/blog'
import { FaMedium } from 'react-icons/fa'

export default async function Blog() {
  const posts = await getBlogPosts()

  return (
    <>
      {/* Animated background elements for dark mode */}
      <div className="stars-bg" aria-hidden="true" />
      <div className="nebula-bg" aria-hidden="true" />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 fade-in-up">
            <p className="text-sm text-accent mb-4 font-mono typewriter-cursor">{'>'} PRODUCT MANAGER & SOFTWARE DESIGNER</p>
            <h1 className="text-2xl font-semibold mb-4 text-text-primary font-mono flex items-center gap-3">
              <span className="text-accent-orange">{'⟩'}</span>
              {'BLOG'}
            </h1>
<p className="text-text-secondary leading-loose text-lg">
            Frameworks, insights, and practical approaches to software engineering, data governance, and technical leadership.
          </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-12 glass-card rounded-xl fade-in-up fade-in-up-delay-1">
              <p className="text-text-secondary mb-4">No blog posts yet.</p>
              <p className="text-text-secondary text-sm">
                Check back soon for new content!
              </p>
            </div>
          ) : (
            <div className="space-y-8 fade-in-up fade-in-up-delay-1">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="glass-card shine-effect rounded-xl p-6 hover:border-accent transition-all"
                >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <Link href={`/blog/${post.slug}/`} className="flex-1">
                    {post.title.includes(':') ? (
                      <div>
                        <h2 className="text-2xl font-semibold mb-1 text-text-primary hover:text-accent transition-colors">
                          {post.title.split(':')[0]}
                        </h2>
                        <p className="text-lg text-text-secondary font-medium">
                          {post.title.split(':').slice(1).join(':').trim()}
                        </p>
                      </div>
                    ) : (
                      <h2 className="text-2xl font-semibold mb-2 text-text-primary hover:text-accent transition-colors">
                        {post.title}
                      </h2>
                    )}
                  </Link>
                  {post.mediumUrl && (
                    <a
                      href={post.mediumUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 p-2 hover:bg-bg-primary rounded transition-colors"
                      title="Read on Medium"
                      aria-label="Read on Medium"
                    >
                      <FaMedium className="w-5 h-5 text-text-secondary hover:text-black transition-colors" />
                    </a>
                  )}
                </div>
                <p className="text-text-secondary text-sm mb-4">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-text-secondary leading-loose">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}/`}
                  className="inline-flex items-center gap-2 mt-4 text-link hover:text-link-hover font-semibold group"
                >
                  Read more
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        )}
        </div>
      </div>
    </>
  )
}
