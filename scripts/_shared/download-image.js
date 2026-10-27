'use strict'

const https = require('https')
const http = require('http')
const fs = require('fs')

/**
 * Download a remote image to `filepath`, following one level of redirects.
 * @param {string} url
 * @param {string} filepath
 * @param {{ timeoutMs?: number }} [options]
 * @returns {Promise<string>}
 */
function downloadImage(url, filepath, options = {}) {
  const timeoutMs = options.timeoutMs ?? 10000

  return new Promise((resolve, reject) => {
    if (!url || !url.startsWith('http')) {
      reject(new Error('Invalid URL'))
      return
    }

    const protocol = url.startsWith('https') ? https : http

    const request = protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath)
        response.pipe(fileStream)
        fileStream.on('finish', () => {
          fileStream.close()
          resolve(filepath)
        })
        fileStream.on('error', reject)
      } else if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307 || response.statusCode === 308) {
        const location = response.headers.location
        if (!location) {
          reject(new Error(`Redirect without location: ${response.statusCode}`))
          return
        }
        downloadImage(location, filepath, options).then(resolve).catch(reject)
      } else {
        reject(new Error(`Failed to download: ${response.statusCode}`))
      }
    })

    request.on('error', reject)

    request.setTimeout(timeoutMs, () => {
      request.destroy()
      reject(new Error('Download timeout'))
    })
  })
}

/**
 * Sanitize a display name into a safe filename stem.
 * @param {string} name
 * @param {{ separator?: '_' | '-', maxLength?: number }} [options]
 * @returns {string}
 */
function sanitizeFilename(name, options = {}) {
  const separator = options.separator ?? '_'
  const maxLength = options.maxLength ?? 100
  const escaped = separator === '-' ? '-' : '_'

  return String(name || 'badge')
    .replace(/[^a-z0-9]/gi, escaped)
    .toLowerCase()
    .replace(new RegExp(`${escaped}+`, 'g'), escaped)
    .replace(new RegExp(`^${escaped}|${escaped}$`, 'g'), '')
    .substring(0, maxLength)
}

module.exports = {
  downloadImage,
  sanitizeFilename,
}
