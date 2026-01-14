'use client'

import { XangaAppletFrame } from '@/components/xanga/XangaAppletFrame'
import { XANGA_APPLETS } from '@/components/xanga/applets/registry'

export function XangaSidebar() {
  return (
    <div className="space-y-6">
      {XANGA_APPLETS.filter((a) => a.enabled !== false).map((applet) => (
        <XangaAppletFrame key={applet.id} title={applet.title}>
          <applet.Component />
        </XangaAppletFrame>
      ))}
      <div className="border-4 border-dashed border-border p-3 text-xs text-text-secondary">
        Want more applets? This sidebar is registry-driven—new widgets can be dropped in
        without changing layout.
      </div>
    </div>
  )
}

