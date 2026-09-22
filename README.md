![Nicholas Ashkar — 100x-dev](assets/nicholas-ashkar/banner.png)

# 100x-dev

Records coding sessions against Git commits and estimates the share attributed to AI for developers reflecting on their workflow.



<a id="usage"></a>

<a id="-commit-code-with-claude-code-or-manually-"></a>

## What it does

- Start/stop session tracking.
- Lifetime statistics and personal leaderboard.
- SVG badges and JSON export.


<a id="install"></a>

## Quickstart

Prerequisites: Node.js `>=18.0.0` and npm; Git is also used by the implementation. The checkout below pins the source used for this documentation.

```sh
git clone https://github.com/NickCirv/100x-dev.git
cd 100x-dev
git checkout 58f5433f5d88df862eec6cf694d64b1237b84308
npm install
node bin/100x.js stats
```

**Expected behavior (illustrative, not captured):** Displays saved session totals, or the no-sessions message on a fresh setup.

Examples are source-inspected, **not runtime-tested**. See the research record for verification gaps.

## Boundaries and data

AI attribution comes from commit-message patterns; the multiplier is a local heuristic, not a measured productivity improvement. Session data lives in ~/.100x-dev; badge and export commands write files.

## Development

The manifest defines `npm test` as:

```sh
node --test
```

The captured suite is a smoke check, not end-to-end behavior coverage. Examples include “entry is valid JavaScript”, “--help exits 0”. Tests were not run for this documentation revision.

See [implementation and command reference](docs/REFERENCE.md) for the package scripts and inspected interfaces, and [research record](docs/RESEARCH.md) for the pinned source, document decisions and unresolved checks.

## License and contact

See [LICENSE](LICENSE) for the original terms and attribution. Legal text is unchanged.

[Nicholas Ashkar](https://nicholashkar.com/) · [Discuss a project](https://nicholashkar.com/#oxblood-contact)
