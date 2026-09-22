# 100x-dev — implementation reference

Source revision: `58f5433f5d88df862eec6cf694d64b1237b84308`. This reference records source declarations; it is not a transcript of a successful run.

## Entrypoint and runtime

[package.json](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/package.json) declares `bin/100x.js`. Node.js `>=18.0.0` and npm; Git is also used by the implementation.

Executable mapping: `100x-dev` → `./bin/100x.js`.

## Supported workflow

Start/stop session tracking; lifetime statistics and personal leaderboard; SVG badges and JSON export.

AI attribution comes from commit-message patterns; the multiplier is a local heuristic, not a measured productivity improvement. Session data lives in ~/.100x-dev; badge and export commands write files.

## Declared command interface

Options belong to the preceding command in the linked source; they are not necessarily global.

| Kind | Declaration | Source description | Source |
| --- | --- | --- | --- |
| command | `start` | Begin tracking a coding session | [src/index.js](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/src/index.js) |
| option | `-r, --repo <path>` | Path to git repo (defaults to current directory) | [src/index.js](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/src/index.js) |
| option | `-l, --label <name>` | Label for this session (e.g. "fix auth bug") | [src/index.js](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/src/index.js) |
| command | `stop` | End session and calculate your multiplier | [src/index.js](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/src/index.js) |
| command | `stats` | Show lifetime stats: sessions, lines, AI ratio, multiplier | [src/index.js](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/src/index.js) |
| command | `badge` | Generate a shields.io-style SVG badge + scorecard | [src/index.js](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/src/index.js) |
| option | `-o, --output <dir>` | Output directory (default: current dir) | [src/index.js](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/src/index.js) |
| option | `--scorecard` | Also generate a full scorecard SVG | [src/index.js](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/src/index.js) |
| command | `leaderboard` | Show your personal best sessions ranked by multiplier | [src/index.js](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/src/index.js) |
| command | `reset` | Clear any stuck active session (emergency use) | [src/index.js](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/src/index.js) |
| command | `export` | Export session data as JSON | [src/index.js](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/src/index.js) |
| option | `-o, --output <file>` | Output file (default: stdout) | [src/index.js](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/src/index.js) |

## Option defaults

These are literal defaults or parsers declared by the command builder; flags belong to their command as shown above.

| Option | Declared default / parser |
| --- | --- |
| `-o, --output <dir>` | `'.'` |

## Package scripts

| Script | Exact command |
| --- | --- |
| `start` | `node bin/100x.js` |
| `test` | `node --test` |

## Implementation sources

[src/index.js](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/src/index.js).

## Verification boundary

No repository code, tests, network operation, hook installer or migration was executed for this review. Source inspection supports the documented interface; runtime correctness and external-service compatibility remain unverified.
