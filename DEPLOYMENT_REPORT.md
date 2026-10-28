# JIC Ascension — Deployment Report
Date: 2026-10-28
Validated PR commit: `0df3340a04faae9c7ed1ccf471e08618623938d1`.

## Status
- PR #19 remains open and is marked draft.
- Vercel preview deployment `dpl_8M5JwgiaM4189YmqBn2GDMvAu9gS` reached READY for the validated commit.
- Preview URL: https://janushan-ice-cream-website-cpxd6mj3x.vercel.app
- GitHub Quality Gate run #224 passed for the same commit.
- Production deployment: NOT PERFORMED by this work.
- Firebase rules deployment: NOT PERFORMED.
- The preview build succeeding does not prove the catalogue is connected to the intended production Firebase project or that all customer flows work.
- Browser checks of the preview and HTTP verification of the logo asset remain NOT RUN.
- Rollback is not needed because production was not changed.

## Before merge/release
1. Re-check latest PR head and CI status; documentation changes may create a newer commit and require revalidation.
2. Verify the preview's rendered availability states, navigation and contact action.
3. Confirm the logo URL returns the intended image over HTTPS and validate the rendered JSON-LD.
4. Resolve the live catalogue issue with authorized production diagnostics.
5. Run Firebase Emulator Suite rules tests and compare deployed rules with reviewed source.
6. Obtain owner approval before any production promotion.
7. After an authorized release, smoke-test homepage, menu, contact links, admin denial for unauthorized users, health endpoint, robots and sitemap.

## Rollback
If a future production release causes a serious regression, promote the last known-good Vercel deployment if authorized. Revert Firebase rules separately only after checking the target project and impact.
