'use client'

import Image from 'next/image'
import Link from 'next/link'

export function ProfileApplet() {
  return (
    <div className="space-y-3 text-sm text-text-secondary">
      <div className="flex gap-3">
        <div className="relative h-20 w-20 border-4 border-border bg-black">
          <Image
            src="/profile.jpg"
            alt="Profile photo"
            fill
            sizes="80px"
            className="object-cover"
            priority={false}
          />
        </div>
        <div className="min-w-0">
          <p className="font-bold text-text-primary truncate">Thomas Bohn</p>
          <p className="text-xs">Mood: building cool stuff</p>
          <p className="text-xs">Location: Chicago-ish</p>
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-bold tracking-widest uppercase text-text-primary">
          About
        </p>
        <p className="text-sm">
          Software engineer. Data + cloud + Salesforce. Nostalgia enthusiast.
        </p>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-bold tracking-widest uppercase text-text-primary">
          Interests
        </p>
        <p className="text-sm">
          post-rock • podcasts • building products • clean code • late-90s internet
        </p>
      </div>


      <p className="text-[11px] text-text-secondary">Member since: 2003 (emotionally)</p>
    </div>
  )
}

