// @ts-nocheck

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import semver from 'semver'

// Simulate __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const incrementVersion = (currentVersion, releaseType) => {
  return semver.inc(currentVersion, releaseType)
}

const updateVersion = (releaseType) => {
  const packageJsonPath = path.resolve(__dirname, '../package.json')

  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

    const newVersion = incrementVersion(packageJson.version, releaseType)

    if (!newVersion) {
      throw new Error('Invalid release type. Use "patch", "minor", or "major".')
    }

    packageJson.version = newVersion

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf8')
    console.log(`Version updated to ${newVersion}`)
  } catch (error) {
    console.error('Error updating package.json:', error.message)
    process.exit(1)
  }
}

// Pass the release type as a command-line argument
const releaseType = process.argv[2]

if (!['patch', 'minor', 'major'].includes(releaseType)) {
  console.error('Please specify a release type: "patch", "minor", or "major".')
  console.error('Example: node updateVersion.js patch')
  process.exit(1)
}

updateVersion(releaseType)
