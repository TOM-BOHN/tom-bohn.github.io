'use client'

export function XangaHistoryApplet() {
  return (
    <div className="space-y-2 text-sm text-text-secondary">
      <p>
        A tiny time capsule of one of the internet&apos;s most iconic early social blogging
        platforms.
      </p>

      <div className="flex items-center gap-2 text-xs whitespace-nowrap overflow-x-auto">
        <a href="https://en.wikipedia.org/wiki/Xanga" target="_blank" rel="noopener noreferrer">
          Wikipedia
        </a>
        <span className="opacity-50">•</span>
        <a
          href="https://medium.com/@successvet/what-happened-to-xanga-98195df1de2"
          target="_blank"
          rel="noopener noreferrer"
        >
          Medium
        </a>
        <span className="opacity-50">•</span>
        <a
          href="https://www.webdesignmuseum.org/gallery/xanga-in-2002"
          target="_blank"
          rel="noopener noreferrer"
        >
          Web Design Museum
        </a>
      </div>
    </div>
  )
}

