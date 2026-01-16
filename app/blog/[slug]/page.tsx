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
          <Link
            href="/blog/"
            className="text-link hover:text-link-hover underline mb-4 inline-block"
          >
            ← Back to Blog
          </Link>
          <p className="text-sm text-accent mb-4 font-mono">{'>'} SOFTWARE ENGINEER</p>
          <h1 className="text-2xl font-semibold mb-4 text-text-primary font-mono">
            {'// BLOG'}
          </h1>
        </div>

        <article className="prose prose-lg max-w-3xl">
          <div className="flex items-center justify-between mb-6">
            <p className="text-text-secondary text-sm">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
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
          <h2 className="text-4xl font-bold mb-8 text-text-primary">{post.title}</h2>
          <div
            className="blog-content text-text-primary leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          {post.mediumUrl && (
            <div className="mt-8 pt-6 border-t border-border">
              <a
                href={post.mediumUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-link hover:text-link-hover underline"
              >
                <FaMedium className="w-4 h-4" />
                Read the full article on Medium
              </a>
            </div>
          )}
        </article>
      </div>
    </div>
  )
}
