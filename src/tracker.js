import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'
import { homedir } from 'os'
import { execFileSync } from 'child_process'

const DATA_DIR = join(homedir(), '.100x-dev')
const SESSIONS_FILE = join(DATA_DIR, 'sessions.json')
const ACTIVE_FILE = join(DATA_DIR, 'active.json')

function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true })
  }
}

function readSessions() {
  ensureDataDir()
  if (!existsSync(SESSIONS_FILE)) return []
  try {
    return JSON.parse(readFileSync(SESSIONS_FILE, 'utf8'))
  } catch {
    return []
  }
}

function writeSessions(sessions) {
  ensureDataDir()
  writeFileSync(SESSIONS_FILE, JSON.stringify(sessions, null, 2), 'utf8')
}

function readActive() {
  ensureDataDir()
  if (!existsSync(ACTIVE_FILE)) return null
  try {
    const raw = readFileSync(ACTIVE_FILE, 'utf8').trim()
    if (raw === 'null' || raw === '') return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function writeActive(session) {
  ensureDataDir()
  writeFileSync(ACTIVE_FILE, JSON.stringify(session, null, 2), 'utf8')
}

function getHeadCommit(repoPath) {
  try {
    return execFileSync('git', ['-C', repoPath, 'rev-parse', 'HEAD'], {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim()
  } catch {
    return null
  }
}

export function startSession(repoPath, label) {
  const existing = readActive()
  if (existing && existing.repoPath) {
    return {
      error: `Session already active for ${existing.repoPath}. Run \`100x-dev stop\` first.`,
    }
  }

  const startCommit = getHeadCommit(repoPath)

  const session = {
    id: `session_${Date.now()}`,
    label: label || null,
    repoPath,
    startTime: new Date().toISOString(),
    startCommit,
  }

  writeActive(session)
  return { session }
}

export function getActive() {
  return readActive()
}

export function stopSession(analysis) {
  const active = readActive()
  if (!active || !active.repoPath) {
    return { error: 'No active session. Run `100x-dev start` first.' }
  }

  const completed = {
    ...active,
    endTime: new Date().toISOString(),
    durationMs: Date.now() - new Date(active.startTime).getTime(),
    ...analysis,
  }

  const sessions = readSessions()
  sessions.push(completed)
  writeSessions(sessions)
  writeActive(null)

  return { session: completed }
}

export function getAllSessions() {
  return readSessions()
}

export function clearActive() {
  writeActive(null)
}
