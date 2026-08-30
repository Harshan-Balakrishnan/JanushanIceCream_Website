# Janushan Ice Cream Website — Milestone 10 / Release 1.0.0

Milestone 10 is the production-deployment handoff for the Janushan Ice Cream cinematic website. It preserves all customer experiences and the Firebase Control Room from Milestones 1–9, then adds reproducible release tooling so the project can be deployed without guessing.

## Release 1.0.0 includes

- Cinematic scoop-drop opening experience.
- Choose Your Craving interactive product universe.
- Five flavour worlds.
- Build Your Dream Ice Cream interactive creator.
- Scroll-driven Since 2004 story.
- Scoop Wall gallery, location/contact experience and cinematic footer.
- Firebase-backed Control Room for products, flavours, gallery, promotions and locations.
- SEO, Open Graph, structured data, sitemap, robots, PWA metadata, security headers and error experiences.
- Production environment verifier (`npm run verify:env`).
- Combined release gate (`npm run release:check`).
- `/api/health` no-cache health endpoint.
- GitHub Actions quality gate for pushes/PRs.
- Vercel deployment descriptor.
- Dockerfile for an alternate self-hosted deployment route.
- Firebase rules deployment helper.
- `DEPLOYMENT_GUIDE.md` with domain, Firebase, Vercel, Search Console, smoke-test and rollback steps.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Admin Control Room:

```text
http://localhost:3000/admin
```

## Before a production release

Copy `.env.example` to `.env.local` and enter your real development values. Production values belong in the hosting provider's encrypted environment settings, not in Git.

Run:

```bash
npm run check
```

With real production environment variables loaded, also run:

```bash
npm run verify:env
```

Or perform both gates:

```bash
npm run release:check
```

## Deployment

Read `DEPLOYMENT_GUIDE.md`. The recommended architecture is Next.js on Vercel with Firebase Authentication, Firestore, Storage and App Check.

A custom domain and authenticated access to your Firebase/hosting accounts are intentionally not hardcoded. Milestone 10 therefore prepares the actual deployment workflow but does not pretend that a live public deployment has occurred.

## Firebase rules

After authenticating the Firebase CLI and selecting the correct production project:

```bash
npm run firebase:deploy:rules
```

Always review the target Firebase project before deploying rules.

## Health endpoint

```text
GET /api/health
```

Expected production response contains `status: "ok"` and version `1.0.0`.

## Security note

Never commit `.env.local`, service-account keys, private credentials, Firebase Admin SDK secrets, registrar credentials or hosting account tokens.
