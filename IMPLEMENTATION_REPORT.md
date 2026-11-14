# JIC Ascension — Implementation Report
Date: 2026-10-28
Branch: `jic-ascension/p0-trust-fixes`

## Changes implemented
1. `components/ProductUniverse.tsx`
   - Uses a shared availability presentation helper for card and modal labels, CSS state and action wording.
   - Unknown, null and malformed availability no longer imply stock. Unknown products get a distinct `is-unknown` state.
   - Modal call-to-action distinguishes ordering from checking stock; low-stock and sold-out states retain distinct wording.
2. `lib/product-availability.mjs` and `lib/product-availability.d.mts`
   - Added runtime normalization/presentation helper and TypeScript declarations for untrusted Firestore values.
3. `app/globals.css`
   - Added neutral blue styling for unknown availability; the base stock pill was previously green, visually implying availability even without an in-stock state.
4. `tests/product-availability.test.mjs`
   - Added Node built-in tests for in-stock, low-stock, sold-out, missing, null and malformed states.
5. `package.json`
   - Added `test:availability` and included it in `npm run check`.
6. `components/StructuredData.tsx`
   - Corrected the structured-data logo URL to `/brand/janushan-logo.png`.

## Validation evidence
- GitHub Quality Gate run #224 (run ID `40624552761`) passed for commit `0df3340a04faae9c7ed1ccf471e08618623938d1`. `npm ci` and `npm run check` both completed successfully; `check` includes typecheck, lint, availability tests and production build.
- Five targeted availability tests passed in the GitHub quality workflow.
- Vercel preview deployment `dpl_8M5JwgiaM4189YmqBn2GDMvAu9gS` reached READY for commit `0df3340a04faae9c7ed1ccf471e08618623938d1`.
- Browser-level verification of the rendered states and HTTP verification of the logo URL have not been performed.
- Production Firebase diagnostics, emulator rules tests, Lighthouse and production smoke tests remain incomplete.
- The live catalogue fallback root cause remains unknown.
- No production deployment or Firebase rule change was performed.
