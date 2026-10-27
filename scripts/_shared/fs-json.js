'use strict'

const fs = require('fs')
const path = require('path')

/** Repository root (two levels up from scripts/_shared). */
const workspaceRoot = path.resolve(__dirname, '../..')

/**
 * @param {...string} segments
 * @returns {string}
 */
function fromRoot(...segments) {
  return path.join(workspaceRoot, ...segments)
}

/**
 * @param {string} filePath
 * @param {*} fallback
 * @returns {*}
 */
function readJson(filePath, fallback = null) {
  if (!fs.existsSync(filePath)) {
    return fallback
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

/**
 * @param {string} filePath
 * @param {*} data
 * @param {{ pretty?: boolean }} [options]
 */
function writeJson(filePath, data, options = {}) {
  const pretty = options.pretty !== false
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(filePath, pretty ? JSON.stringify(data, null, 2) + '\n' : JSON.stringify(data))
}

module.exports = {
  workspaceRoot,
  fromRoot,
  readJson,
  writeJson,
}
