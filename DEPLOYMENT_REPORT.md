# JIC Ascension — Deployment Report
Date: 2026-10-28. Branch: `jic-ascension/p0-trust-fixes`.

## Status
Changes committed to a feature branch. Production deployment: NOT PERFORMED. Post-change production verification: NOT RUN. Firebase rules deployment: NOT PERFORMED. Rollback not required because production was not changed.

## Before release
1. Run `npm ci` and `npm run check`.
2. Review the branch diff and security-sensitive changes.
3. Resolve the live catalogue issue with authorized production diagnostics.
4. Run Firebase Emulator Suite rules tests.
5. Confirm required production variables exist without printing values.
6. Deploy a preview and test key flows.
7. Obtain owner approval before production promotion.
8. Smoke-test homepage, menu, contact links, admin rejection for unauthorized users, health endpoint, robots and sitemap.

## Rollback
If a later release causes a serious regression, promote the last known-good Vercel deployment if authorized. Revert Firebase rules separately only after checking the target project and impact.