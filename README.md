# 100x-dev

![100x Developer](banner.svg)

> Track your AI-powered velocity. Find out how much of your code Claude actually writes.

---

## What is this?

Every time you commit with Claude, you're getting leverage. `100x-dev` measures that leverage.

It scans your git history, separates AI commits from human commits, and gives you a **multiplier** — the ratio of total code shipped to code you actually typed.

If Claude wrote 94% of your code, you're a **16.7x developer**. If it wrote 99%, you're a **100x developer**.

---

## Install

```bash
npm install -g 100x-dev
```

Or use without installing:

```bash
npx 100x-dev start
```

---

## Usage

### Start a session

```bash
cd your-project
100x-dev start
100x-dev start --label "implement auth"
```

### Ship code with Claude

Make commits. Tag AI commits with any of these patterns:

- `Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>` (auto-added by Claude Code)
- `[AI]` or `[Claude]` in commit message
- `🤖` anywhere in the message

### Stop and see your multiplier

```bash
100x-dev stop
```

```
  100x-dev — AI velocity tracker
  ─────────────────────────────
  Session complete

  47.3x multiplier

  AI    [████████████████████████████░░] 97.9%
  Human [░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░]  2.1%

  ─────────────────────────────
  Duration     2h 14m
  Commits      38 total  36 AI  2 human
  Lines +      +4,832
  Lines −      -1,204
  AI wrote     5,909 lines
  You wrote    127 lines

  🔥 Legendary session. That's 100x energy.
```

### View lifetime stats

```bash
100x-dev stats
```

```
  47.3x lifetime multiplier
  Best: 89.1x

  AI    [████████████████████████████░░] 97.9%
  Human [░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░]  2.1%

  ─────────────────────────────
  Sessions      12
  Total lines   48,302
  AI wrote      47,291 lines
  You wrote     1,011 lines
  Total time    26h 42m
  Avg session   2h 13m

  Recent sessions
  2/27/2026  47.3x  implement auth
  2/26/2026  31.1x  fix schema audit
  2/25/2026  89.1x  build agent viewer
```

### Generate your badge

```bash
100x-dev badge
100x-dev badge --scorecard   # also generates a full scorecard card
```

Outputs `100x-badge.svg` — drop it in your README:

```markdown
![100x Developer](100x-badge.svg)
```

### Leaderboard (personal bests)

```bash
100x-dev leaderboard
```

```
  #  Multiplier   AI%    Lines   Duration  Label
  ─────────────────────────────────────────────────────
  1       89.1x  99.0%   15,302     4h 12  build agent viewer
  2       47.3x  97.9%    6,036     2h 14  implement auth
  3       31.1x  96.8%    4,122     1h 44  fix schema audit
```

---

## Detection Logic

`100x-dev` classifies a commit as **AI-written** if the message or body matches any of:

| Pattern | Example |
|---------|---------|
| `Co-Authored-By: Claude` | Added automatically by Claude Code |
| `🤖` in message | Manual tag |
| `[AI]` or `[Claude]` | Manual tag |
| `Generated with [Claude` | Claude Code footer |
| `noreply@anthropic.com` | Anthropic co-author email |

**Multiplier formula:**

```
multiplier = totalLines / humanLines
```

If Claude wrote 97.9% of your code:
- totalLines = 6,036
- humanLines = 127
- multiplier = 6,036 / 127 = **47.5x**

---

## Data storage

Sessions stored locally at `~/.100x-dev/sessions.json`. No telemetry, no API calls.

---

## Commands

| Command | Description |
|---------|-------------|
| `100x-dev start` | Begin tracking a session |
| `100x-dev stop` | End session, calculate multiplier |
| `100x-dev stats` | Lifetime stats |
| `100x-dev badge` | Generate SVG badge |
| `100x-dev leaderboard` | Personal best sessions |
| `100x-dev export` | Export sessions as JSON |
| `100x-dev reset` | Clear stuck active session |

### Options

```
start
  -r, --repo <path>    Git repo path (default: cwd)
  -l, --label <name>   Label for this session

badge
  -o, --output <dir>   Output directory (default: .)
  --scorecard          Also generate a scorecard card SVG

export
  -o, --output <file>  Output file (default: stdout)
```

---

## Requirements

- Node.js 18+
- Git installed and in PATH

---

## License

MIT — [NickCirv](https://github.com/NickCirv)
