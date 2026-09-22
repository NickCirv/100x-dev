# 100x-dev — documentation research

Reviewed 21 September 2026. Public GitHub source only.

## Revision and scope

- Commit: [`58f5433f5d88df862eec6cf694d64b1237b84308`](https://github.com/NickCirv/100x-dev/commit/58f5433f5d88df862eec6cf694d64b1237b84308).
- Tree: `a92fd7b03b9a706ebbdbfcdff8f479f5e3fd00ad`; truncated: `false`.
- Capture: 11 of 11 eligible text files; all eligible text files.
- Method: package and entrypoint inspection, implementation-interface review, targeted behavior/limitation inspection, and test-source review. This is not an exhaustive correctness or security audit.
- Commands run against repository code: **none**. External services, deployment and npm publication were not verified.

## Claim and evidence map

| Documentation claim | Pinned evidence | Assessment |
| --- | --- | --- |
| Runtime, executable and development commands | [package.json](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/package.json) | Source declaration inspected; runtime unverified |
| Records coding sessions against Git commits and estimates the share attributed to AI for developers reflecting on their workflow. | [bin/100x.js](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/bin/100x.js) · [src/index.js](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/src/index.js) | Implementation interfaces inspected; behavior not executed |
| Start/stop session tracking; lifetime statistics and personal leaderboard; SVG badges and JSON export. | [bin/100x.js](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/bin/100x.js), [src/analyzer.js](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/src/analyzer.js), [src/badge.js](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/src/badge.js), [src/index.js](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/src/index.js), [src/stats.js](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/src/stats.js), [src/tracker.js](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/src/tracker.js) | Source-backed scope, not a test result |
| AI attribution comes from commit-message patterns; the multiplier is a local heuristic, not a measured productivity improvement. Session data lives in ~/.100x-dev; badge and export commands write files. | [bin/100x.js](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/bin/100x.js), [src/analyzer.js](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/src/analyzer.js), [src/badge.js](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/src/badge.js), [src/index.js](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/src/index.js), [src/stats.js](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/src/stats.js), [src/tracker.js](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/src/tracker.js) | Material limits documented; service compatibility remains open |
| Existing checks | [test/smoke.test.js](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/test/smoke.test.js) | Test source read; no passing-run claim |

## Documentation inventory and disposition

| Existing document | Decision |
| --- | --- |
| [README.md](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/README.md) | Rewritten with source-specific purpose, direct checkout setup, limitations and verification status. Old section fragments retained where practical. |

Added `docs/REFERENCE.md` for the observed implementation and command surface, and this research record. Protected license and attribution files remain in their original locations without edits. No source or product UI was changed.

## Quality dimensions

| Dimension | Status | Evidence / next step |
| --- | --- | --- |
| Pinned provenance | Verified | Captured commit, tree and per-file hashes recorded below |
| Interface documentation | Partially verified | Source inspection only; run clean-checkout quickstart |
| Runtime behavior | Unverified | No repository execution in this review |
| Test results | Unverified | Existing tests were not run |
| Deployment / package availability | Unverified | No remote publish or live-service check |
| Visual / link checks | Unverified | Portfolio renderer and independent QA are separate from this authoring step |

## Unresolved issues

AI attribution comes from commit-message patterns; the multiplier is a local heuristic, not a measured productivity improvement. Session data lives in ~/.100x-dev; badge and export commands write files.

## Captured source inventory

This lists captured provenance, not a claim that every line received a full audit. Binary/generated/excluded files are outside the eligible text capture.

| File | SHA-256 | Bytes |
| --- | --- | --- |
| [LICENSE](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/LICENSE) | `8edf13ba2a2e443fa49e42493414f6952a4a14b6c407983a7c95162ab37f6265` | 1065 |
| [README.md](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/README.md) | `7d9230994b841c4c5f46a1ffd1bf7fe90767c3b3ce656215ad26ad7fa93893d8` | 1938 |
| [package.json](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/package.json) | `060707ae8308bf2d788af061f23911d97f5560d111471f155083b11b72f7c8be` | 932 |
| [.github/workflows/ci.yml](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/.github/workflows/ci.yml) | `433fbf65635a767ef5cd787147104c248d0cea6bbd6523c6c862f915e0e3206a` | 384 |
| [bin/100x.js](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/bin/100x.js) | `504785ce0140e00213671b69c1de20fa6c4671103bf46d59f9c2f9f729a95ddc` | 65 |
| [src/analyzer.js](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/src/analyzer.js) | `e15f7404e86b1209e9327408309f9176b131944f7f72c165c540fcd0c4155288` | 3698 |
| [src/badge.js](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/src/badge.js) | `03ce27b2933acc71d3711484db20db37360158ed17e7a253919389bc0e449ecc` | 5410 |
| [src/index.js](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/src/index.js) | `c56de5c1ebc9a28a2c75351db9074480f901e971e2654a0136906be0ddb61894` | 12772 |
| [src/stats.js](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/src/stats.js) | `362ede5e4db22daf088b07ec63e29df651d8de4a2adae8e7ba94a1830f23763b` | 3012 |
| [src/tracker.js](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/src/tracker.js) | `b4b8ab5660346077c3682ddd15d635b792de7500c0da8f43006e3a408a736795` | 2517 |
| [test/smoke.test.js](https://github.com/NickCirv/100x-dev/blob/58f5433f5d88df862eec6cf694d64b1237b84308/test/smoke.test.js) | `7f2debc80e850f3d3e6628b9e25304d7549905ace1ef5bbcc23162352e381f53` | 459 |
