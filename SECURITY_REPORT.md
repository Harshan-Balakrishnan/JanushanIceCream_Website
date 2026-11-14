# JIC Ascension — Security Review

Date: 2026-10-28
Status: Initial source review only. This is not a penetration-test certification.

## Reviewed
- `firestore.rules`
- `storage.rules`
- `lib/firebase.ts`
- `components/admin/AdminDashboard.tsx`
- `next.config.ts`
- `.env.example`
- `scripts/verify-production-env.mjs`
- GitHub Actions quality workflow

## Observations
1. Firestore rules use the presence of `admins/{uid}` as the admin authorization condition. Writes to the `admins` collection are denied by the rules shown in the repository. Confirm privileged admin documents are provisioned only through a trusted administrative process.
2. Public Firestore reads are limited to documents with `active == true`; public catalogue queries should remain compatible with that constraint.
3. Storage rules allow public reads from `/website/**` and restrict writes to admin users, files smaller than 8 MiB and MIME types matching `image/.*`. Consider restricting allowed formats to the exact formats required by the application and validating file contents; MIME headers alone are not proof of file type.
4. The Firebase web configuration is exposed through `NEXT_PUBLIC_*` variables, which is normal for Firebase client apps. This does not by itself prove a secret leak. Security depends on rules, Authentication configuration, API restrictions where appropriate and App Check enforcement.
5. App Check initialization is conditional on a public site key being present. Its production enforcement state cannot be inferred from this client code.
6. The admin UI checks for an `admins/{uid}` document, but UI checks are not a security boundary by themselves. Firestore rules must enforce every privileged operation.
7. Security headers are configured in `next.config.ts`; deployed header responses and CSP were not verified.

## Retests required
- Firebase Emulator Suite rules tests for anonymous, ordinary-user and admin cases.
- Confirm production Firestore and Storage rules match reviewed source.
- Confirm App Check enforcement and Firebase Auth authorized domains.
- Review admin document provisioning and owner recovery.
- Scan tracked files and Git history for secrets using an approved scanner; rotate credentials only if exposure is confirmed.
- Verify headers on the deployed domain and review third-party script requirements before introducing CSP.
- Test upload size, file type and malformed metadata handling.
- Check rate limits/abuse controls for any server-side mutation routes that are discovered.

## Result
No production security test was run and no production rules were changed. Residual risk remains UNASSESSED for runtime authorization and deployed configuration.
