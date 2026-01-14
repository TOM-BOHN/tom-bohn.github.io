'use client'

import { XangaAppletFrame } from '@/components/xanga/XangaAppletFrame'
import { XANGA_APPLETS } from '@/components/xanga/applets/registry'

export function XangaSidebar() {
  return (
    <div className="space-y-6">
      {XANGA_APPLETS.filter((a) => a.enabled !== false).map((applet) => {
        // "Layout" should be a compact single-line control (no frame).
        if (applet.id === 'layout') {
          return <applet.Component key={applet.id} />
        }

        return (
          <XangaAppletFrame key={applet.id} title={applet.title}>
            <applet.Component />
          </XangaAppletFrame>
        )
      })}
    </div>
  )
}

