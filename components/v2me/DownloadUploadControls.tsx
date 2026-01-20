'use client'

import { FaDownload, FaUpload } from 'react-icons/fa'

interface DownloadUploadControlsProps {
  onDownload: () => void
  onUpload: () => void
}

export function DownloadUploadControls({
  onDownload,
  onUpload,
}: DownloadUploadControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onDownload}
        className="flex items-center gap-2 px-3 py-1.5 text-sm bg-bg-secondary hover:bg-bg-primary border border-border rounded transition-colors text-text-primary"
        title="Download V2Me as JSON"
      >
        <FaDownload className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Download</span>
      </button>
      <button
        onClick={onUpload}
        className="flex items-center gap-2 px-3 py-1.5 text-sm bg-bg-secondary hover:bg-bg-primary border border-border rounded transition-colors text-text-primary"
        title="Upload V2Me JSON file"
      >
        <FaUpload className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Upload</span>
      </button>
    </div>
  )
}
