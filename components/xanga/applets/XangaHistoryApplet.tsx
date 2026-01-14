'use client'

export function XangaHistoryApplet() {
  return (
    <div className="space-y-2 text-sm text-text-secondary">
      <p>
        A tiny time capsule of one of the internet&apos;s most iconic early social blogging
        platforms.
      </p>

      <ul className="list-disc pl-5 space-y-1 text-xs">
        <li className="whitespace-nowrap overflow-hidden text-ellipsis">
          <a
            href="https://en.wikipedia.org/wiki/Xanga"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap"
          >
            Wikipedia
          </a>
        </li>
        <li className="whitespace-nowrap overflow-hidden text-ellipsis">
          <a
            href="https://medium.com/@successvet/what-happened-to-xanga-98195df1de2"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap"
          >
            Medium
          </a>
        </li>
        <li className="whitespace-nowrap overflow-hidden text-ellipsis">
          <a
            href="https://www.webdesignmuseum.org/gallery/xanga-in-2002"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap"
          >
            Web Design Museum
          </a>
        </li>
      </ul>
    </div>
  )
}

