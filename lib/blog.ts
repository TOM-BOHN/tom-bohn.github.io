import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content/blog')

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
        const contentHtml = processedContent.toString()

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
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()

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
