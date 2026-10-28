# JIC Ascension — Test Report
Date: 2026-10-28
Current PR head at report edit: `63a97d69dcac57224b03d426a6e3088346058a4b`.

## Targeted availability tests
- Command: `node --test tests/product-availability.test.mjs`
- Result: PASS in an isolated temporary directory containing the same helper and test source copied from the branch.
- Result summary: 5 tests passed, 0 failed. Covered explicit in-stock, low-stock, sold-out, missing, null and malformed values.
- Limitation: This isolated run did not execute the full repository's TypeScript compiler or Next.js build.

## Current GitHub CI
- Workflow: Quality Gate, run #222 (ID `40624461275`).
- Dependency install: PASS (`npm ci` completed).
- `npm run check`: IN PROGRESS at last inspection.
- Final workflow conclusion: PENDING; do not infer success from an in-progress job.

## Vercel preview
- A previous PR commit `a0c3b4f2a9a5388e038ff8fae4403543513bf496` has a READY preview.
- That preview is stale relative to the current head and is not evidence for the latest changes.
- Latest commit `63a97d69dcac57224b03d426a6e3088346058a4b`: Vercel deployment BUILDING at last inspection.

## Not run / not verified
| Check | Status |
|---|---|
| Full repository `npm run typecheck` | Pending in Quality Gate |
| ESLint | Pending in Quality Gate |
| Full production build | Pending in Quality Gate |
| Browser/end-to-end tests | NOT RUN |
| Structured-data URL HTTP check / external validator | NOT VERIFIED |
| Firebase Emulator Suite rules tests | NOT RUN |
| Production Firebase configuration/rules parity | BLOCKED by access |
| Lighthouse / Core Web Vitals | NOT MEASURED |
| Accessibility manual audit | NOT RUN |
| Full secret/history scan | NOT RUN |
| Production smoke test | NOT RUN |

## Gate
PR readiness remains BLOCKED pending current-head CI results, preview verification, and clear resolution or explicit owner-accepted blocking status for the live catalogue issue.
