import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import sanitizeHtml from 'sanitize-html'

const postsDirectory = path.join(process.cwd(), 'content/blog')

// Blog HTML is generated from Markdown (local files plus Medium-synced content).
// remark-html does not sanitize its output, so raw HTML embedded in a Markdown
// file (e.g. <script>, event handlers, <iframe>) would otherwise be rendered
// as-is via dangerouslySetInnerHTML. Sanitize with an allowlist before it ever
// reaches the page.
function sanitizeBlogHtml(unsafeHtml: string): string {
  return sanitizeHtml(unsafeHtml, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      a: ['href', 'name', 'target', 'rel'],
      img: ['src', 'alt', 'title', 'width', 'height'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }, true),
    },
  })
}

// Guards against a slug like `../../secret` escaping content/blog when
// resolving a file path, even though slugs currently only ever come from
// build-time generateStaticParams() (derived from real filenames), not from
// live user/request input.
function resolvePostPath(slug: string): string | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const resolved = path.resolve(fullPath)
  const resolvedDir = path.resolve(postsDirectory)
  if (resolved !== resolvedDir && !resolved.startsWith(resolvedDir + path.sep)) {
    return null
  }
  return resolved
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  mediumUrl?: string
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = await Promise.all(
    fileNames
      .filter((name) => name.endsWith('.md'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        const processedContent = await remark().use(html).process(content)
        const contentHtml = sanitizeBlogHtml(processedContent.toString())

        // Get excerpt (first paragraph or first 200 chars)
        const excerpt = data.excerpt || content.split('\n\n')[0].substring(0, 200) + '...'

        return {
          slug,
          title: data.title || slug,
          date: data.date || new Date().toISOString(),
          excerpt,
          content: contentHtml,
          mediumUrl: data.mediumUrl,
        }
      })
  )

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const fullPath = resolvePostPath(slug)

  if (!fullPath || !fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const processedContent = await remark().use(html).process(content)
  const contentHtml = sanitizeBlogHtml(processedContent.toString())

  const excerpt = data.excerpt || content.split('\n\n')[0].substring(0, 200) + '...'

  return {
    slug,
    title: data.title || slug,
    date: data.date || new Date().toISOString(),
    excerpt,
    content: contentHtml,
    mediumUrl: data.mediumUrl,
  }
}
