<div align="center">

# 100x-dev

**Measure your actual AI coding velocity — not vibes, but math.**

[![license](https://img.shields.io/badge/license-MIT-blue?labelColor=0B0A09)](LICENSE)
[![node](https://img.shields.io/badge/node-%3E%3D18-brightgreen?labelColor=0B0A09)](https://nodejs.org)

</div>

## Install

```bash
npx github:NickCirv/100x-dev start
```

No global install needed. Run in any git repo.

## Usage

```bash
npx github:NickCirv/100x-dev start          # begin tracking
# ... commit code (with Claude Code or manually) ...
npx github:NickCirv/100x-dev stop           # calculate your multiplier
```

| Command | Description |
|---------|-------------|
| `start` | Begin tracking a session |
| `stop` | End session and show your multiplier |
| `stats` | Lifetime stats across all sessions |
| `badge` | Generate an SVG badge for your README |
| `leaderboard` | Personal best sessions |
| `export` | Export sessions as JSON |
| `reset` | Clear a stuck active session |

**`start` options**

| Flag | Description |
|------|-------------|
| `-r, --repo <path>` | Git repo path (default: cwd) |
| `-l, --label <name>` | Session label (e.g. "fix auth bug") |

**`badge` options**

| Flag | Description |
|------|-------------|
| `-o, --output <dir>` | Output directory (default: `.`) |
| `--scorecard` | Also generate a scorecard SVG |

## What it does

`100x-dev` records the git HEAD when you start a session, then walks every commit since that point when you stop. It classifies each commit as AI-written or human-written by looking for Claude Code co-author tags, `[AI]`/`[Claude]` prefixes, and `🤖` annotations. It counts lines per author, computes a multiplier (`totalLines / humanLines`), and renders a session card in the terminal. Stats persist locally in `~/.100x-dev/sessions.json` — no telemetry, no network calls.

---

<sub>Node ≥18 · MIT · by <a href="https://github.com/NickCirv">NickCirv</a></sub>
