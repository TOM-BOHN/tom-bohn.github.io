'use client'

import { useState } from 'react'
import { FaLinkedin, FaEnvelope, FaCopy, FaCheck, FaLock } from 'react-icons/fa'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const email = 'hello@thomaslbohn.com'
  const linkedinUrl = 'https://www.linkedin.com/in/thomaslbohn'

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }

  return (
    <>
      {/* Animated background elements for dark mode */}
      <div className="stars-bg" aria-hidden="true" />
      <div className="nebula-bg" aria-hidden="true" />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 fade-in-up">
            <p className="text-sm text-accent mb-4 font-mono typewriter-cursor">PRODUCT MANAGER & SOFTWARE DESIGNER</p>
            <h1 className="text-2xl font-semibold mb-4 text-text-primary font-mono flex items-center gap-3">
              <span className="text-accent-orange">{'⟩'}</span>
              {'CONTACT'}
            </h1>
<p className="text-text-secondary leading-loose text-lg">
            I'm always open to discussing new opportunities, technical challenges, or potential collaborations. Reach out through any of the channels below.
          </p>
          </div>

          <div className="space-y-6 fade-in-up fade-in-up-delay-1">
            {/* Email Section */}
            <div className="glass-card shine-effect rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-hover rounded-xl flex items-center justify-center icon-bounce shadow-lg">
                  <FaEnvelope className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-text-primary">Email</h2>
              </div>
            <div className="flex items-center gap-3 mb-4">
              <p className="text-text-primary text-lg font-mono">{email}</p>
              <button
                onClick={copyToClipboard}
                className="p-2 hover:bg-bg-primary rounded transition-colors group"
                title="Copy email to clipboard"
                aria-label="Copy email to clipboard"
              >
                {copied ? (
                  <FaCheck className="w-4 h-4 text-green-500" />
                ) : (
                  <FaCopy className="w-4 h-4 text-text-secondary group-hover:text-accent transition-colors" />
                )}
              </button>
            </div>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 text-link hover:text-link-hover font-semibold group"
            >
              <FaEnvelope className="w-4 h-4" />
              Send me an email
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* LinkedIn Section */}
          <div className="glass-card shine-effect rounded-xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0077b5] to-[#005582] rounded-xl flex items-center justify-center icon-bounce shadow-lg">
                <FaLinkedin className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-text-primary">LinkedIn</h2>
            </div>
            <p className="text-text-secondary mb-4">
              Connect with me on LinkedIn to stay updated with my professional journey and network.
            </p>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-link hover:text-link-hover font-semibold group"
            >
              <FaLinkedin className="w-4 h-4" />
              Visit my LinkedIn profile
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Other Section */}
          <div className="glass-card rounded-xl p-6 border-l-4 border-l-accent-orange">
            <h2 className="text-2xl font-semibold mb-4 text-text-primary">More Ways to Connect</h2>
            <p className="text-text-secondary mb-4">
              Check out my{' '}
              <a href="/hub" className="inline-flex items-center gap-1.5 text-link hover:text-link-hover font-semibold">
                <FaLock className="w-3.5 h-3.5 opacity-70" />
                Hub page
              </a>
              {' '}for all the places you can find me online, including GitHub, Medium, Credly, and more.
            </p>
            <div className="mt-4 p-4 bg-accent-orange/10 border border-accent-orange/20 rounded-lg">
              <p className="text-sm text-text-secondary">
                <span className="font-semibold text-accent-orange">Note:</span> The Hub is currently in{' '}
                <span className="font-semibold">beta testing</span> and{' '}
                <span className="font-semibold">locked</span>, but{' '}
                <span className="font-semibold text-accent-orange">coming soon</span>!
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  )
}
