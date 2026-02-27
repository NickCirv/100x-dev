import { formatMultiplier } from './stats.js'

// Color scale based on multiplier
function badgeColor(multiplier) {
  if (!isFinite(multiplier) || multiplier >= 50) return '#FBBF24' // gold
  if (multiplier >= 20) return '#F97316' // orange
  if (multiplier >= 10) return '#22C55E' // green
  if (multiplier >= 5) return '#3B82F6'  // blue
  return '#8B5CF6' // purple
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// Calculate approximate text width for SVG (monospace-ish heuristic)
function textWidth(str, fontSize) {
  return str.length * fontSize * 0.6
}

export function generateBadgeSVG(multiplier, aiRatio, totalLines) {
  const multStr = formatMultiplier(multiplier)
  const label = '100x Developer'
  const value = `${multStr} — ${(aiRatio * 100).toFixed(0)}% AI`
  const color = badgeColor(multiplier)

  const fontSize = 11
  const labelWidth = Math.ceil(textWidth(label, fontSize)) + 20
  const valueWidth = Math.ceil(textWidth(value, fontSize)) + 20
  const totalWidth = labelWidth + valueWidth
  const height = 20

  const labelX = labelWidth / 2
  const valueX = labelWidth + valueWidth / 2

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${totalWidth}" height="${height}" role="img" aria-label="${escapeXml(label)}: ${escapeXml(value)}">
  <title>${escapeXml(label)}: ${escapeXml(value)}</title>
  <linearGradient id="s" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <clipPath id="r">
    <rect width="${totalWidth}" height="${height}" rx="3" fill="#fff"/>
  </clipPath>
  <g clip-path="url(#r)">
    <rect width="${labelWidth}" height="${height}" fill="#555"/>
    <rect x="${labelWidth}" width="${valueWidth}" height="${height}" fill="${color}"/>
    <rect width="${totalWidth}" height="${height}" fill="url(#s)"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="${fontSize}">
    <text x="${labelX}" y="15" fill="#010101" fill-opacity=".3" aria-hidden="true">${escapeXml(label)}</text>
    <text x="${labelX}" y="14">${escapeXml(label)}</text>
    <text x="${valueX}" y="15" fill="#010101" fill-opacity=".3" aria-hidden="true">${escapeXml(value)}</text>
    <text x="${valueX}" y="14">${escapeXml(value)}</text>
  </g>
</svg>`
}

export function generateScorecard(stats) {
  const {
    multiplier,
    aiRatio,
    totalLines,
    totalAdded,
    totalRemoved,
    sessions,
    bestMultiplier,
  } = stats

  const multStr = formatMultiplier(multiplier)
  const bestStr = formatMultiplier(bestMultiplier)
  const color = badgeColor(multiplier)
  const aiPct = (aiRatio * 100).toFixed(1)

  const width = 400
  const height = 200

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="${width}" y2="${height}" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0D1117"/>
      <stop offset="100%" stop-color="#161B22"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect width="${width}" height="${height}" rx="12" fill="url(#bg)"/>
  <rect width="${width}" height="${height}" rx="12" fill="none" stroke="#30363D" stroke-width="1"/>

  <!-- Top accent -->
  <rect x="0" y="0" width="${width}" height="3" rx="1.5" fill="${escapeXml(color)}" opacity="0.8"/>

  <!-- Multiplier (hero number) -->
  <text x="200" y="80" font-family="ui-monospace,'SF Mono',monospace" font-size="52" font-weight="bold"
    fill="${escapeXml(color)}" text-anchor="middle" filter="url(#glow)">${escapeXml(multStr)}</text>

  <!-- Label -->
  <text x="200" y="108" font-family="-apple-system,Helvetica,Arial,sans-serif" font-size="13"
    fill="#8B949E" text-anchor="middle" letter-spacing="2">100X DEVELOPER</text>

  <!-- Divider -->
  <rect x="140" y="122" width="120" height="1" fill="#30363D"/>

  <!-- Stats row -->
  <text x="68" y="148" font-family="ui-monospace,'SF Mono',monospace" font-size="11" fill="#E6EDF3" text-anchor="middle">${escapeXml(aiPct)}%</text>
  <text x="68" y="162" font-family="-apple-system,Helvetica,Arial,sans-serif" font-size="10" fill="#484F58" text-anchor="middle">AI-written</text>

  <text x="200" y="148" font-family="ui-monospace,'SF Mono',monospace" font-size="11" fill="#E6EDF3" text-anchor="middle">${escapeXml(String(totalLines.toLocaleString()))}</text>
  <text x="200" y="162" font-family="-apple-system,Helvetica,Arial,sans-serif" font-size="10" fill="#484F58" text-anchor="middle">lines tracked</text>

  <text x="332" y="148" font-family="ui-monospace,'SF Mono',monospace" font-size="11" fill="#E6EDF3" text-anchor="middle">${escapeXml(String(sessions))}</text>
  <text x="332" y="162" font-family="-apple-system,Helvetica,Arial,sans-serif" font-size="10" fill="#484F58" text-anchor="middle">sessions</text>

  <!-- Footer -->
  <text x="200" y="188" font-family="-apple-system,Helvetica,Arial,sans-serif" font-size="9"
    fill="#30363D" text-anchor="middle">github.com/NickCirv/100x-dev</text>
</svg>`
}
