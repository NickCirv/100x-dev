import { getAllSessions } from './tracker.js'

export function computeLifetimeStats() {
  const sessions = getAllSessions()

  if (sessions.length === 0) {
    return {
      sessions: 0,
      totalLines: 0,
      totalAdded: 0,
      totalRemoved: 0,
      aiLines: 0,
      humanLines: 0,
      aiRatio: 0,
      multiplier: 1,
      totalDurationMs: 0,
      averageDurationMs: 0,
      bestMultiplier: 1,
      bestSession: null,
      recentSessions: [],
    }
  }

  let totalLines = 0
  let totalAdded = 0
  let totalRemoved = 0
  let aiLines = 0
  let humanLines = 0
  let totalDurationMs = 0
  let bestMultiplier = 0
  let bestSession = null

  for (const session of sessions) {
    const sessionTotal = (session.totalLines || 0)
    const sessionAI = (session.aiAdded || 0) + (session.aiRemoved || 0)
    const sessionHuman = (session.humanAdded || 0) + (session.humanRemoved || 0)

    totalAdded += session.totalAdded || 0
    totalRemoved += session.totalRemoved || 0
    totalLines += sessionTotal
    aiLines += sessionAI
    humanLines += sessionHuman
    totalDurationMs += session.durationMs || 0

    const mult = session.multiplier || 1
    if (mult > bestMultiplier) {
      bestMultiplier = mult
      bestSession = session
    }
  }

  const aiRatio = totalLines > 0 ? aiLines / totalLines : 0
  const multiplier = humanLines > 0 ? totalLines / humanLines : totalLines > 0 ? Infinity : 1
  const averageDurationMs = sessions.length > 0 ? totalDurationMs / sessions.length : 0

  const recentSessions = [...sessions]
    .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
    .slice(0, 5)

  return {
    sessions: sessions.length,
    totalLines,
    totalAdded,
    totalRemoved,
    aiLines,
    humanLines,
    aiRatio,
    multiplier,
    totalDurationMs,
    averageDurationMs,
    bestMultiplier,
    bestSession,
    recentSessions,
  }
}

export function formatMultiplier(multiplier) {
  if (!isFinite(multiplier)) return '∞x'
  if (multiplier >= 100) return `${Math.round(multiplier)}x`
  return `${multiplier.toFixed(1)}x`
}

export function formatDuration(ms) {
  if (!ms || ms <= 0) return '0m'
  const totalSeconds = Math.floor(ms / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
}

export function formatPercent(ratio) {
  return `${(ratio * 100).toFixed(1)}%`
}

export function computeLeaderboard() {
  const sessions = getAllSessions()
  if (sessions.length === 0) return []

  return [...sessions]
    .filter((s) => s.totalLines > 0)
    .sort((a, b) => (b.multiplier || 0) - (a.multiplier || 0))
    .slice(0, 10)
    .map((s, i) => ({
      rank: i + 1,
      multiplier: s.multiplier || 1,
      totalLines: s.totalLines || 0,
      aiRatio: s.aiRatio || 0,
      label: s.label || null,
      date: s.startTime ? new Date(s.startTime).toLocaleDateString() : 'unknown',
      durationMs: s.durationMs || 0,
    }))
}
