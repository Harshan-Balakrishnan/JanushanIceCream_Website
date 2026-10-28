# JIC Ascension — Initial Audit Report

Date: 2026-10-28
Scope: Public live website and source files on the repository default branch at audit start. This is a source review, not a full penetration test or complete runtime audit.

## Findings

### JIC-AUD-001 — Production catalogue is using fallback data
- Severity: High business impact (availability/reliability); security severity not applicable.
- Status: VERIFIED on the live page.
- Evidence: The live menu explicitly states that the built-in JIC menu is displayed because live catalogue data is unavailable. Source: `hooks/useCatalogCollection.ts`, `components/ProductUniverse.tsx`.
- Impact: Changes made in the admin system may not be reflected publicly; customers cannot tell whether displayed prices are current unless they confirm with the business.
- Root cause: NOT YET VERIFIED. The client hook switches to fallback data when Firebase is unconfigured, the query returns an empty snapshot, or the snapshot listener reports an error. Production environment configuration, Firestore contents, browser network responses and rules evaluation have not yet been inspected.
- Fix: Investigate production environment, active product documents, Firebase project/domain configuration and Firestore rules together. Do not hide the warning to make the site appear healthy.
- Verification: BLOCKED pending authenticated production Firebase diagnostics and a controlled browser/network trace.

### JIC-AUD-002 — Fallback products are labelled as available today
- Severity: Medium (customer-trust risk).
- Status: VERIFIED in source.
- Evidence: `components/ProductUniverse.tsx` defaulted missing availability to the label “Available today”; `lib/catalog.ts` supplies fallback products with no live inventory confirmation.
- Impact: Visitors could interpret fallback catalogue entries as confirmation of current stock.
- Additional verified defect: the base `.product-stock` CSS was green even when availability was unknown; removing the `is-in-stock` modifier did not remove the base green styling.
- Fix implemented on this branch: a typed presentation helper normalizes unknown/malformed values, gives unknown stock a neutral style, and differentiates action wording for in-stock, low-stock, sold-out and unknown states.
- Tests: five isolated Node tests passed; current repository CI is still running. Browser test NOT RUN.

### JIC-AUD-003 — Structured-data logo path does not match the repository asset
- Severity: Low (SEO/brand presentation).
- Status: VERIFIED in source and repository file inventory.
- Evidence: `components/StructuredData.tsx` referenced `/brand/Brand Logo.png`, while the tracked logo asset is `public/brand/janushan-logo.png`.
- Impact: Crawlers and structured-data consumers may request a nonexistent logo URL.
- Fix implemented on this branch: Structured-data logo URL now references `/brand/janushan-logo.png`.
- Retest: Source path corrected; production HTTP response and structured-data validation NOT RUN.

### JIC-AUD-004 — Contact information differs by purpose and must be owner-confirmed
- Severity: Medium (customer communication).
- Status: VERIFIED that multiple contact values are present; whether they are incorrect is NOT VERIFIED.
- Evidence: The site exposes +94 77 601 5041, 024 222 6041 and ramayabalan08@gmail.com in contact UI and structured data.
- Impact: If any detail is outdated, customers may reach the wrong contact.
- Fix: No change made. Obtain explicit owner confirmation before altering official contact details.

### JIC-AUD-005 — Firebase security configuration requires emulator/runtime verification
- Severity: High until verification is complete; no exploitable vulnerability established by this source review alone.
- Status: PARTIALLY REVIEWED.
- Evidence: `firestore.rules` grants public reads to active catalogue documents and writes to accounts with an `admins/{uid}` document; `storage.rules` permits public reads under `/website/**` and admin uploads under an 8 MiB limit when the MIME type matches `image/.*`.
- Impact: Correctness depends on deployed rules matching the repository, the admin-document provisioning process, and the real content and upload paths.
- Required verification: Firebase Emulator Suite tests for anonymous reads, inactive documents, normal-user writes, admin writes, admin-document protections, oversized files and non-image uploads. Confirm deployed rules version before changing production.
- Status: NOT RUN. No production rules were deployed.

## Limitations
- No production Firebase console access or authenticated admin session was used.
- No production environment variable values were accessed.
- No secret scan of full Git history was run.
- No full browser automation, Lighthouse run, real-user Core Web Vitals data or screen-reader audit was run.
- No production deployment or destructive test was performed.
