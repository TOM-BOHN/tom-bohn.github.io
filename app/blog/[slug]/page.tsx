import { getBlogPost, getBlogPosts } from '@/lib/blog'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link
            href="/blog"
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
          <h2 className="text-4xl font-bold mb-4 text-text-primary">{post.title}</h2>
          <p className="text-text-secondary text-sm mb-8">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <div
            className="blog-content text-text-primary leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  )
}
