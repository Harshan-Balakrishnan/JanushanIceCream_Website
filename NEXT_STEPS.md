# JIC Ascension — Prioritized Next Steps

## P0 — Reliability and security
1. Trace live catalogue fallback through production environment/project config, active Firestore documents, snapshot errors and rules. Do not remove the warning until the cause is fixed.
2. Compare deployed Firestore/Storage rules to repository source.
3. Run Firebase Emulator Suite tests for public reads, inactive documents, normal-user writes, admin writes and upload restrictions.
4. Verify trusted-only admin provisioning.
5. Run dependency-backed typecheck, lint and production build.

## P1 — Customer trust
6. Confirm official contact details, prices and stock-status policy with the owner.
7. Verify menu, call, directions and ordering actions on mobile.
8. Clearly distinguish fallback data from live data and never imply unverified stock.

## P2 — Quality
9. Validate the logo URL and structured data on production.
10. Measure Lighthouse/Core Web Vitals, bundle/image sizes and network failures.
11. Run keyboard, reduced-motion, automated accessibility and responsive tests from 320px through large desktop.
12. Test slow-network and Firebase-error states.

## P3 — Brand and growth
13. Refine motion only after reliability and mobile performance are stable.
14. Add privacy-conscious analytics only if approved and legally appropriate.
15. Measure meaningful enquiries and calls; do not equate clicks with completed sales.

## Blockers
Production Firebase diagnostics require authorized access to the owner’s Firebase/Vercel environment. Never paste credentials into chat or commit them.