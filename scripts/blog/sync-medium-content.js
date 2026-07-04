#!/usr/bin/env node

/* eslint-disable no-console */
const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const WORKSPACE_ROOT = path.resolve(__dirname, '..', '..')
const BLOG_CONTENT_DIR = path.join(WORKSPACE_ROOT, 'content', 'blog')
const HOMEPAGE_DATA_FILE = path.join(WORKSPACE_ROOT, 'data', 'medium-homepage.json')
const AUTO_SYNC_MARKER =
  'This post is synced automatically from Medium to keep this website blog index up to date.'

const MEDIUM_PROFILE = process.env.MEDIUM_PROFILE || 'ThomasLBohn'
const MEDIUM_FEED_URL = process.env.MEDIUM_FEED_URL || `https://medium.com/feed/@${MEDIUM_PROFILE}`
const MEDIUM_PROFILE_URL = process.env.MEDIUM_PROFILE_URL || `https://medium.com/@${MEDIUM_PROFILE}`
const HOMEPAGE_ARTICLE_LIMIT = Number(process.env.MEDIUM_HOMEPAGE_LIMIT || 3)
const EXCERPT_CHAR_LIMIT = Number(process.env.MEDIUM_EXCERPT_MAX || 320)
const BLOG_BODY_CHAR_LIMIT = Number(process.env.MEDIUM_BLOG_BODY_MAX || 2400)
const BLOG_BODY_PARAGRAPH_LIMIT = Number(process.env.MEDIUM_BLOG_PARAGRAPH_MAX || 10)
const REFRESH_AUTO_SYNCED = process.env.MEDIUM_REFRESH_AUTOSYNCED !== 'false'

const RELEVANCE_KEYWORDS = [
  { keyword: 'leadership', weight: 24 },
  { keyword: 'engineering', weight: 18 },
  { keyword: 'management', weight: 18 },
  { keyword: 'product', weight: 14 },
  { keyword: 'architecture', weight: 12 },
  { keyword: 'ai', weight: 10 },
  { keyword: 'framework', weight: 8 },
  { keyword: 'data', weight: 8 },
  { keyword: 'governance', weight: 8 },
]

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function decodeHtmlEntities(text) {
  if (!text) return ''

  const named = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&nbsp;': ' ',
  }

  return text
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&(amp|lt|gt|quot|#39|apos|nbsp);/g, (match) => named[match] || match)
}

function normalizeWhitespace(text) {
  return text.replace(/\s+/g, ' ').trim()
}

function stripHtml(html) {
  return normalizeWhitespace(decodeHtmlEntities((html || '').replace(/<[^>]+>/g, ' ')))
}

function isLowValueParagraph(text) {
  const lower = text.toLowerCase()

  // Filter common Medium end-of-article boilerplate snippets.
  const lowValuePhrases = [
    'already have an account',
    'sign up for',
    'discover more from medium',
    'read more from',
    'member-only story',
    'follow me on',
    'thanks for reading',
  ]

  return lowValuePhrases.some((phrase) => lower.includes(phrase))
}

function htmlToParagraphs(html) {
  if (!html) return []

  const withBreaks = decodeHtmlEntities(html)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<figure[\s\S]*?<\/figure>/gi, ' ')
    .replace(/<figcaption[\s\S]*?<\/figcaption>/gi, ' ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|section|article|blockquote|h1|h2|h3|h4|h5|h6|ul|ol)>/gi, '\n\n')
    .replace(/<li[^>]*>/gi, '- ')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\u00a0/g, ' ')

  return withBreaks
    .split(/\n{2,}/)
    .map((part) => normalizeWhitespace(part))
    .filter(Boolean)
    .filter((part) => !isLowValueParagraph(part))
}

function buildParagraphExcerpt(paragraphs, maxChars, maxParagraphs) {
  const selected = []
  let usedChars = 0

  for (const paragraph of paragraphs) {
    if (selected.length >= maxParagraphs || usedChars >= maxChars) {
      break
    }

    const remaining = maxChars - usedChars
    if (paragraph.length <= remaining) {
      selected.push(paragraph)
      usedChars += paragraph.length + 2
      continue
    }

    selected.push(truncateAtWord(paragraph, remaining))
    usedChars = maxChars
    break
  }

  return selected.join('\n\n')
}

function stripCdata(value) {
  const cdataMatch = value.match(/^<!\[CDATA\[([\s\S]*)\]\]>$/)
  return cdataMatch ? cdataMatch[1] : value
}

function extractTagValue(xmlChunk, tagName) {
  const tagPattern = new RegExp(
    `<${escapeRegExp(tagName)}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escapeRegExp(tagName)}>`,
    'i'
  )
  const match = xmlChunk.match(tagPattern)
  return match ? stripCdata(match[1]).trim() : ''
}

function canonicalizeMediumUrl(urlValue) {
  if (!urlValue) return ''

  try {
    const parsed = new URL(urlValue)
    parsed.search = ''
    parsed.hash = ''
    return parsed.toString().replace(/\/$/, '')
  } catch {
    return String(urlValue)
      .trim()
      .replace(/[#?].*$/, '')
      .replace(/\/$/, '')
  }
}

function slugFromUrl(urlValue) {
  try {
    const parsed = new URL(urlValue)
    const segments = parsed.pathname.split('/').filter(Boolean)
    const lastSegment = segments[segments.length - 1] || 'medium-post'
    return lastSegment.replace(/-[a-f0-9]{8,}$/i, '')
  } catch {
    return 'medium-post'
  }
}

function slugifyTitle(title) {
  return title
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
}

function truncateAtWord(value, maxLength) {
  const normalized = normalizeWhitespace(value || '')
  if (normalized.length <= maxLength) return normalized

  const slice = normalized.slice(0, maxLength + 1)
  const lastSpace = slice.lastIndexOf(' ')
  const trimmed = lastSpace > 0 ? slice.slice(0, lastSpace) : slice.slice(0, maxLength)
  return `${trimmed.trim()}...`
}

function yamlQuote(value) {
  return `"${String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
}

function formatDate(dateValue) {
  const parsed = new Date(dateValue)
  if (Number.isNaN(parsed.getTime())) {
    return new Date().toISOString().slice(0, 10)
  }
  return parsed.toISOString().slice(0, 10)
}

function parseMediumFeed(xmlText) {
  const items = []
  const itemPattern = /<item>([\s\S]*?)<\/item>/gi
  let match = itemPattern.exec(xmlText)

  while (match) {
    const itemXml = match[1]
    const title = decodeHtmlEntities(extractTagValue(itemXml, 'title')).trim()
    const link = canonicalizeMediumUrl(decodeHtmlEntities(extractTagValue(itemXml, 'link')))
    const pubDate = extractTagValue(itemXml, 'pubDate')
    const descriptionHtml = extractTagValue(itemXml, 'description')
    const contentHtml = extractTagValue(itemXml, 'content:encoded')

    const summarySource = contentHtml || descriptionHtml
    const paragraphs = htmlToParagraphs(summarySource)
    const summary = truncateAtWord(paragraphs.join(' ') || stripHtml(summarySource), 620)
    const articleBody = buildParagraphExcerpt(
      paragraphs,
      BLOG_BODY_CHAR_LIMIT,
      BLOG_BODY_PARAGRAPH_LIMIT
    )

    if (title && link) {
      items.push({
        // Keep title exactly as Medium provides it (entity-decoded + trimmed).
        title,
        url: link,
        publishedAt: pubDate || new Date().toUTCString(),
        summary,
        articleBody,
      })
    }

    match = itemPattern.exec(xmlText)
  }

  return items
}

function readExistingBlogPosts() {
  if (!fs.existsSync(BLOG_CONTENT_DIR)) {
    return {
      knownSlugs: new Set(),
      knownMediumUrls: new Set(),
      postByMediumUrl: new Map(),
      posts: [],
    }
  }

  const files = fs
    .readdirSync(BLOG_CONTENT_DIR)
    .filter((name) => name.endsWith('.md'))

  const posts = []
  const knownSlugs = new Set()
  const knownMediumUrls = new Set()

  for (const fileName of files) {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(BLOG_CONTENT_DIR, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const parsed = matter(fileContents)
    const mediumUrl = canonicalizeMediumUrl(parsed.data.mediumUrl)
    const isAutoSynced = fileContents.includes(AUTO_SYNC_MARKER)

    knownSlugs.add(slug)
    if (mediumUrl) {
      knownMediumUrls.add(mediumUrl)
    }

    const post = {
      slug,
      title: String(parsed.data.title || slug),
      excerpt: String(parsed.data.excerpt || ''),
      date: String(parsed.data.date || new Date().toISOString().slice(0, 10)),
      mediumUrl,
      filePath: fullPath,
      isAutoSynced,
    }
    posts.push(post)
  }

  const postByMediumUrl = new Map()
  for (const post of posts) {
    if (post.mediumUrl) {
      postByMediumUrl.set(post.mediumUrl, post)
    }
  }

  return {
    knownSlugs,
    knownMediumUrls,
    postByMediumUrl,
    posts,
  }
}

function ensureUniqueSlug(baseSlug, knownSlugs) {
  let candidate = baseSlug || 'medium-post'
  let suffix = 2
  while (knownSlugs.has(candidate)) {
    candidate = `${baseSlug}-${suffix}`
    suffix += 1
  }
  knownSlugs.add(candidate)
  return candidate
}

function buildBlogMarkdown(article) {
  const date = formatDate(article.publishedAt)
  const excerpt = truncateAtWord(
    article.summary || article.articleBody || `Published on Medium: ${article.title}`,
    EXCERPT_CHAR_LIMIT
  )
  const body = article.articleBody || truncateAtWord(article.summary || excerpt, BLOG_BODY_CHAR_LIMIT)

  return [
    '---',
    `title: ${yamlQuote(article.title)}`,
    `date: ${yamlQuote(date)}`,
    `excerpt: ${yamlQuote(excerpt)}`,
    `mediumUrl: ${yamlQuote(article.url)}`,
    '---',
    '',
    AUTO_SYNC_MARKER,
    '',
    '## Summary',
    '',
    body,
    '',
    '## Continue Reading',
    '',
    `Read the full article on [Medium](${article.url}).`,
    '',
  ].join('\n')
}

function scoreArticle(post) {
  const now = Date.now()
  const published = new Date(post.date)
  const publishedTime = Number.isNaN(published.getTime()) ? now : published.getTime()
  const daysOld = Math.max(0, (now - publishedTime) / (1000 * 60 * 60 * 24))

  // Up to 45 points for recency (within ~45 days gets strongest boost).
  const recencyScore = Math.max(0, 45 - daysOld)
  const text = `${post.title} ${post.excerpt}`.toLowerCase()

  let relevanceScore = 0
  const hits = []
  for (const { keyword, weight } of RELEVANCE_KEYWORDS) {
    if (text.includes(keyword)) {
      relevanceScore += weight
      hits.push(keyword)
    }
  }

  const titleClarityScore = Math.min(12, Math.floor(post.title.length / 8))
  const totalScore = recencyScore + relevanceScore + titleClarityScore

  return {
    ...post,
    score: Number(totalScore.toFixed(2)),
    keywordHits: hits,
  }
}

function selectHomepageArticles(posts, limit) {
  const ranked = posts
    .filter((post) => post.mediumUrl)
    .map(scoreArticle)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

  return ranked.slice(0, limit).map((post) => ({
    title: post.title,
    url: post.mediumUrl,
    slug: post.slug,
    date: post.date,
    excerpt: post.excerpt,
    score: post.score,
    reason:
      post.keywordHits.length > 0
        ? `Recent and aligned to ${post.keywordHits.join(', ')} themes`
        : 'Recent post with strong relevance',
  }))
}

function writeHomepageData(featuredArticles) {
  const payload = {
    generatedAt: new Date().toISOString(),
    profileUrl: MEDIUM_PROFILE_URL,
    sourceFeedUrl: MEDIUM_FEED_URL,
    selectionStrategy: 'recency-plus-topic-relevance',
    featuredArticles,
  }

  fs.writeFileSync(HOMEPAGE_DATA_FILE, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
}

async function fetchMediumArticles() {
  const response = await fetch(MEDIUM_FEED_URL, {
    headers: {
      'user-agent': 'tom-bohn-medium-sync-script',
      accept: 'application/rss+xml, application/xml, text/xml, */*',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch Medium feed (${response.status} ${response.statusText})`)
  }

  const xmlText = await response.text()
  return parseMediumFeed(xmlText)
}

async function main() {
  console.log(`Fetching Medium feed: ${MEDIUM_FEED_URL}`)
  const mediumArticles = await fetchMediumArticles()
  console.log(`Found ${mediumArticles.length} Medium articles in feed`)

  const existing = readExistingBlogPosts()
  const createdFiles = []
  const updatedFiles = []

  for (const article of mediumArticles) {
    const canonicalUrl = canonicalizeMediumUrl(article.url)
    if (!canonicalUrl) {
      continue
    }

    const existingPost = existing.postByMediumUrl.get(canonicalUrl)
    if (existingPost) {
      if (REFRESH_AUTO_SYNCED && existingPost.isAutoSynced) {
        fs.writeFileSync(existingPost.filePath, buildBlogMarkdown(article), 'utf8')
        existingPost.title = article.title
        existingPost.excerpt = truncateAtWord(article.summary, EXCERPT_CHAR_LIMIT)
        existingPost.date = formatDate(article.publishedAt)
        updatedFiles.push(path.relative(WORKSPACE_ROOT, existingPost.filePath))
      }
      continue
    }

    const generatedSlug =
      slugifyTitle(article.title) || slugifyTitle(slugFromUrl(article.url)) || 'medium-post'
    const slug = ensureUniqueSlug(generatedSlug, existing.knownSlugs)
    const filePath = path.join(BLOG_CONTENT_DIR, `${slug}.md`)
    const markdown = buildBlogMarkdown(article)

    fs.writeFileSync(filePath, markdown, 'utf8')
    existing.knownMediumUrls.add(canonicalUrl)
    const createdPost = {
      slug,
      title: article.title,
      excerpt: truncateAtWord(article.summary, EXCERPT_CHAR_LIMIT),
      date: formatDate(article.publishedAt),
      mediumUrl: canonicalUrl,
      filePath,
      isAutoSynced: true,
    }
    existing.posts.push(createdPost)
    existing.postByMediumUrl.set(canonicalUrl, createdPost)
    createdFiles.push(path.relative(WORKSPACE_ROOT, filePath))
  }

  const featuredArticles = selectHomepageArticles(existing.posts, HOMEPAGE_ARTICLE_LIMIT)
  writeHomepageData(featuredArticles)

  if (createdFiles.length > 0) {
    console.log(`Created ${createdFiles.length} missing blog post(s):`)
    for (const fileName of createdFiles) {
      console.log(`- ${fileName}`)
    }
  }

  if (updatedFiles.length > 0) {
    console.log(`Updated ${updatedFiles.length} existing auto-synced blog post(s):`)
    for (const fileName of updatedFiles) {
      console.log(`- ${fileName}`)
    }
  }

  if (createdFiles.length === 0 && updatedFiles.length === 0) {
    console.log('No missing or refreshable Medium posts detected. Blog content is already in sync.')
  }

  console.log('Updated homepage Medium article data:')
  for (const article of featuredArticles) {
    console.log(`- ${article.title} (${article.score})`)
  }
}

main().catch((error) => {
  console.error(`Medium sync failed: ${error.message}`)
  process.exit(1)
})
