# JIC Ascension — Test Report
Date: 2026-10-28
Validated commit: `0df3340a04faae9c7ed1ccf471e08618623938d1`.

## Automated quality gate — PASS
- Workflow: GitHub Actions Quality Gate run #224 (ID `40624552761`).
- `npm ci`: PASS.
- `npm run check`: PASS.
- The project's `check` script executes TypeScript checking, ESLint, the availability regression tests, and the production Next.js build.
- Workflow conclusion: `success`.
- The Vercel deployment for the same commit reached READY: deployment `dpl_8M5JwgiaM4189YmqBn2GDMvAu9gS`.

## Targeted availability tests
The test suite `tests/product-availability.test.mjs` covers:
1. Explicit in-stock status and ordering action.
2. Explicit low-stock status and confirm-stock action.
3. Explicit sold-out status and check-only action.
4. Missing availability treated as unknown.
5. Null and malformed values normalized to unknown.

The isolated Node test run also passed: 5 tests, 0 failures. The authoritative repository-level test result is the passing Quality Gate above.

## Not run / not verified
| Check | Status |
|---|---|
| Full repository typecheck | PASS via Quality Gate |
| ESLint | PASS via Quality Gate |
| Availability unit tests | PASS via Quality Gate |
| Production build | PASS via Quality Gate |
| Browser/end-to-end tests | NOT RUN |
| Structured-data URL HTTP check / external validator | NOT VERIFIED |
| Firebase Emulator Suite rules tests | NOT RUN |
| Production Firebase configuration/rules parity | BLOCKED by access |
| Lighthouse / Core Web Vitals | NOT MEASURED |
| Accessibility manual audit | NOT RUN |
| Full secret/history scan | NOT RUN |
| Production smoke test | NOT RUN |

## Gate
Code-level quality checks pass for the validated commit. Production readiness remains BLOCKED by unresolved live catalogue diagnostics and outstanding Firebase/runtime/browser verification.
