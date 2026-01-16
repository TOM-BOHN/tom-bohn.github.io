import { getBlogPost, getBlogPosts } from '@/lib/blog'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { FaMedium } from 'react-icons/fa'

export const dynamicParams = false

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = await Promise.resolve(params)
  const post = await getBlogPost(resolvedParams.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-sm text-accent mb-4 font-mono">{'>'} SOFTWARE ENGINEER</p>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-text-primary font-mono">
              {'// BLOG'}
            </h1>
            <div className="flex items-center gap-3">
              <Link
                href="/blog/"
                className="px-4 py-2 bg-bg-secondary border border-border rounded-lg hover:bg-accent hover:text-white hover:border-accent transition-colors text-sm font-semibold"
              >
                ← Back to Blog
              </Link>
              {post.mediumUrl && (
                <a
                  href={post.mediumUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-semibold"
                >
                  <FaMedium className="w-4 h-4" />
                  Read on Medium
                </a>
              )}
            </div>
          </div>
        </div>

        <article className="prose prose-lg max-w-6xl">
          <div className="mb-4">
            <p className="text-text-secondary text-sm">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          {post.title.includes(':') ? (
            <div className="mb-6">
              <h2 className="text-4xl font-bold mb-2 text-text-primary">
                {post.title.split(':')[0]}
              </h2>
              <p className="text-xl text-text-secondary font-medium">
                {post.title.split(':').slice(1).join(':').trim()}
              </p>
            </div>
          ) : (
            <h2 className="text-4xl font-bold mb-6 text-text-primary">{post.title}</h2>
          )}
          <div
            className="blog-content text-text-primary leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          {post.mediumUrl && (
            <div className="mt-6 pt-6 border-t border-border">
              <div className="bg-bg-secondary rounded-lg p-6 border border-border">
                <p className="text-text-secondary mb-4 text-sm">
                  This is a summary of the article. The full article continues on Medium with additional details, examples, and insights.
                </p>
                <a
                  href={post.mediumUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
                >
                  <FaMedium className="w-5 h-5" />
                  Continue reading on Medium
                </a>
              </div>
            </div>
          )}
        </article>
      </div>
      <div className="pb-12"></div>
    </div>
  )
}
