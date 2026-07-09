'use client'

import { useState } from 'react'
import { FaCheck, FaLink, FaShareAlt } from 'react-icons/fa'

export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)

  const getUrl = () => (typeof window !== 'undefined' ? window.location.href : '')

  const handleShare = async () => {
    const url = getUrl()

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch {
        // User cancelled the native share sheet, or it's unsupported for this
        // context - fall back to copying the link instead.
      }
    }

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-2 px-4 py-2 bg-bg-secondary border border-border rounded-lg hover:bg-accent hover:text-white hover:border-accent transition-colors text-sm font-semibold"
      title="Share this post"
      aria-label="Share this post"
    >
      {copied ? (
        <>
          <FaCheck className="w-4 h-4" />
          Link copied!
        </>
      ) : (
        <>
          <FaShareAlt className="w-4 h-4 hidden sm:block" />
          <FaLink className="w-4 h-4 sm:hidden" />
          Share
        </>
      )}
    </button>
  )
}
