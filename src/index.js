import { Command } from 'commander'
import chalk from 'chalk'
import ora from 'ora'
import { execFileSync } from 'child_process'
import { resolve, join } from 'path'
import { writeFileSync } from 'fs'
import { homedir } from 'os'

import { startSession, stopSession, getActive, getAllSessions, clearActive } from './tracker.js'
import { analyzeSession } from './analyzer.js'
import { computeLifetimeStats, computeLeaderboard, formatMultiplier, formatDuration, formatPercent } from './stats.js'
import { generateBadgeSVG, generateScorecard } from './badge.js'

const program = new Command()

function dim(text) { return chalk.hex('#484F58')(text) }
function gold(text) { return chalk.hex('#FBBF24')(text) }
function muted(text) { return chalk.hex('#8B949E')(text) }
function bright(text) { return chalk.hex('#E6EDF3')(text) }
function green(text) { return chalk.greenBright(text) }
function orange(text) { return chalk.hex('#F97316')(text) }
function red(text) { return chalk.redBright(text) }

function renderBar(ratio, width = 30) {
  const filled = Math.round(ratio * width)
  const empty = width - filled
  const bar = chalk.hex('#FBBF24')('█'.repeat(filled)) + chalk.hex('#30363D')('░'.repeat(empty))
  return `[${bar}]`
}

function getCurrentRepo() {
  try {
    return execFileSync('git', ['rev-parse', '--show-toplevel'], {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim()
  } catch {
    return null
  }
}

function printHeader() {
  console.log()
  console.log(gold('  100x-dev') + dim(' — AI velocity tracker'))
  console.log(dim('  ─────────────────────────────'))
}

program
  .name('100x-dev')
  .description('Track your AI-powered velocity. Measures how much Claude writes vs you.')
  .version('1.0.0')

// ─── start ────────────────────────────────────────────────────────────────────
program
  .command('start')
  .description('Begin tracking a coding session')
  .option('-r, --repo <path>', 'Path to git repo (defaults to current directory)')
  .option('-l, --label <name>', 'Label for this session (e.g. "fix auth bug")')
  .action((opts) => {
    printHeader()

    const repoPath = opts.repo ? resolve(opts.repo) : getCurrentRepo()
    if (!repoPath) {
      console.log(red('  Error: Not in a git repository. Use --repo to specify a path.'))
      process.exit(1)
    }

    const spinner = ora({ text: muted('  Starting session...'), color: 'yellow' }).start()

    const result = startSession(repoPath, opts.label)

    if (result.error) {
      spinner.fail(red(`  ${result.error}`))
      process.exit(1)
    }

    spinner.succeed(green('  Session started'))
    console.log()
    console.log(dim('  Repo   ') + bright(repoPath))
    console.log(dim('  Label  ') + (opts.label ? bright(opts.label) : muted('(none)')))
    console.log(dim('  From   ') + muted(result.session.startCommit?.slice(0, 8) || 'HEAD'))
    console.log()
    console.log(muted('  Make commits. Run ' + chalk.white('`100x-dev stop`') + ' when done.'))
    console.log()
  })

// ─── stop ─────────────────────────────────────────────────────────────────────
program
  .command('stop')
  .description('End session and calculate your multiplier')
  .action(() => {
    printHeader()

    const active = getActive()
    if (!active || !active.repoPath) {
      console.log(red('  No active session. Run `100x-dev start` first.'))
      process.exit(1)
    }

    const spinner = ora({ text: muted('  Analysing commits...'), color: 'yellow' }).start()

    const analysis = analyzeSession(active.repoPath, active.startCommit)
    const result = stopSession(analysis)

    if (result.error) {
      spinner.fail(red(`  ${result.error}`))
      process.exit(1)
    }

    spinner.succeed(green('  Session complete'))

    const s = result.session
    const multStr = formatMultiplier(s.multiplier)
    const duration = formatDuration(s.durationMs)

    console.log()

    // Hero multiplier
    console.log('  ' + gold(multStr) + dim(' multiplier'))
    console.log()

    // Bar chart
    const aiRatio = s.aiRatio || 0
    console.log('  AI    ' + renderBar(aiRatio) + ' ' + gold(formatPercent(aiRatio)))
    console.log('  Human ' + renderBar(1 - aiRatio) + ' ' + muted(formatPercent(1 - aiRatio)))
    console.log()

    // Stats grid
    console.log(dim('  ─────────────────────────────'))
    console.log(dim('  Duration   ') + bright(duration))
    console.log(dim('  Commits    ') + bright(String(s.commits?.length || 0)) + dim(' total  ') +
      gold(String(s.aiCommits || 0)) + dim(' AI  ') + muted(String(s.humanCommits || 0)) + dim(' human'))
    console.log(dim('  Lines +    ') + green(`+${(s.totalAdded || 0).toLocaleString()}`))
    console.log(dim('  Lines −    ') + red(`-${(s.totalRemoved || 0).toLocaleString()}`))
    console.log(dim('  AI wrote   ') + gold(`${((s.aiAdded || 0) + (s.aiRemoved || 0)).toLocaleString()} lines`))
    console.log(dim('  You wrote  ') + muted(`${((s.humanAdded || 0) + (s.humanRemoved || 0)).toLocaleString()} lines`))
    console.log()

    if (s.multiplier > 10) {
      console.log('  ' + gold('🔥 Legendary session. That\'s 100x energy.'))
    } else if (s.multiplier > 5) {
      console.log('  ' + green('⚡ Solid multiplier. AI is doing the heavy lifting.'))
    } else if (s.multiplier > 1) {
      console.log('  ' + muted('  Decent. Keep leaning on Claude more.'))
    } else if (s.totalLines === 0) {
      console.log('  ' + muted('  No commits detected in this session.'))
    }

    console.log()
    console.log(muted('  Run `100x-dev badge` to generate your badge.'))
    console.log()
  })

// ─── stats ────────────────────────────────────────────────────────────────────
program
  .command('stats')
  .description('Show lifetime stats: sessions, lines, AI ratio, multiplier')
  .action(() => {
    printHeader()

    const stats = computeLifetimeStats()

    if (stats.sessions === 0) {
      console.log(muted('  No sessions recorded yet. Run `100x-dev start` in a git repo.'))
      console.log()
      process.exit(0)
    }

    const multStr = formatMultiplier(stats.multiplier)
    const bestStr = formatMultiplier(stats.bestMultiplier)

    // Hero
    console.log('  ' + gold(multStr) + dim(' lifetime multiplier'))
    console.log('  ' + muted('Best: ') + orange(bestStr))
    console.log()

    // Bar
    const aiRatio = stats.aiRatio || 0
    console.log('  AI    ' + renderBar(aiRatio) + ' ' + gold(formatPercent(aiRatio)))
    console.log('  Human ' + renderBar(1 - aiRatio) + ' ' + muted(formatPercent(1 - aiRatio)))
    console.log()

    console.log(dim('  ─────────────────────────────'))
    console.log(dim('  Sessions      ') + bright(String(stats.sessions)))
    console.log(dim('  Total lines   ') + bright(stats.totalLines.toLocaleString()))
    console.log(dim('  AI wrote      ') + gold(stats.aiLines.toLocaleString() + ' lines'))
    console.log(dim('  You wrote     ') + muted(stats.humanLines.toLocaleString() + ' lines'))
    console.log(dim('  Total time    ') + bright(formatDuration(stats.totalDurationMs)))
    console.log(dim('  Avg session   ') + bright(formatDuration(stats.averageDurationMs)))
    console.log()

    if (stats.recentSessions.length > 0) {
      console.log(dim('  Recent sessions'))
      for (const s of stats.recentSessions) {
        const date = new Date(s.startTime).toLocaleDateString()
        const mult = formatMultiplier(s.multiplier)
        const label = s.label ? ` ${muted(s.label)}` : ''
        console.log(`  ${dim(date)}  ${gold(mult)}${label}`)
      }
      console.log()
    }
  })

// ─── badge ────────────────────────────────────────────────────────────────────
program
  .command('badge')
  .description('Generate a shields.io-style SVG badge + scorecard')
  .option('-o, --output <dir>', 'Output directory (default: current dir)', '.')
  .option('--scorecard', 'Also generate a full scorecard SVG')
  .action((opts) => {
    printHeader()

    const stats = computeLifetimeStats()
    const spinner = ora({ text: muted('  Generating badge...'), color: 'yellow' }).start()

    const badgeSVG = generateBadgeSVG(stats.multiplier, stats.aiRatio, stats.totalLines)
    const outDir = resolve(opts.output)
    const badgePath = join(outDir, '100x-badge.svg')
    writeFileSync(badgePath, badgeSVG, 'utf8')

    let scorecardPath = null
    if (opts.scorecard) {
      const scorecardSVG = generateScorecard(stats)
      scorecardPath = join(outDir, '100x-scorecard.svg')
      writeFileSync(scorecardPath, scorecardSVG, 'utf8')
    }

    spinner.succeed(green('  Badge generated'))
    console.log()
    console.log(dim('  Badge      ') + bright(badgePath))
    if (scorecardPath) {
      console.log(dim('  Scorecard  ') + bright(scorecardPath))
    }
    console.log()
    console.log(dim('  Embed in your README:'))
    console.log()
    console.log(muted('  ![100x Developer](100x-badge.svg)'))
    console.log()
    console.log(dim('  Or with shields.io format (host your badge first):'))
    console.log(muted(`  https://img.shields.io/badge/100x--dev-${formatMultiplier(stats.multiplier).replace(/\./g, '.').replace(/ /g, '%20')}-FBBF24`))
    console.log()
  })

// ─── leaderboard ──────────────────────────────────────────────────────────────
program
  .command('leaderboard')
  .description('Show your personal best sessions ranked by multiplier')
  .action(() => {
    printHeader()

    const board = computeLeaderboard()

    if (board.length === 0) {
      console.log(muted('  No sessions with data yet. Run `100x-dev start` and make some commits.'))
      console.log()
      process.exit(0)
    }

    console.log(dim('  # ') + dim('Multiplier') + dim('   AI%    Lines    Duration  Label'))
    console.log(dim('  ─────────────────────────────────────────────────────'))

    for (const entry of board) {
      const rank = entry.rank === 1 ? gold(`  1`) : entry.rank === 2 ? muted(`  2`) : dim(`  ${entry.rank}`)
      const mult = gold(formatMultiplier(entry.multiplier).padStart(10))
      const ai = muted(formatPercent(entry.aiRatio).padStart(7))
      const lines = bright(entry.totalLines.toLocaleString().padStart(8))
      const dur = muted(formatDuration(entry.durationMs).padStart(9))
      const label = entry.label ? dim(`  ${entry.label}`) : dim(`  ${entry.date}`)
      console.log(`${rank}${mult}${ai}${lines}${dur}${label}`)
    }

    console.log()

    if (board[0]) {
      const best = board[0]
      console.log(dim('  Personal best: ') + gold(formatMultiplier(best.multiplier)) +
        dim(' on ') + muted(best.date) + (best.label ? dim(` — ${best.label}`) : ''))
    }
    console.log()
  })

// ─── reset ────────────────────────────────────────────────────────────────────
program
  .command('reset')
  .description('Clear any stuck active session (emergency use)')
  .action(() => {
    clearActive()
    console.log(green('  Active session cleared.'))
    console.log()
  })

// ─── export ───────────────────────────────────────────────────────────────────
program
  .command('export')
  .description('Export session data as JSON')
  .option('-o, --output <file>', 'Output file (default: stdout)')
  .action((opts) => {
    const sessions = getAllSessions()
    const json = JSON.stringify(sessions, null, 2)
    if (opts.output) {
      writeFileSync(resolve(opts.output), json, 'utf8')
      console.log(green(`  Exported ${sessions.length} sessions to ${opts.output}`))
    } else {
      console.log(json)
    }
  })

export function run() {
  program.parse(process.argv)
}
