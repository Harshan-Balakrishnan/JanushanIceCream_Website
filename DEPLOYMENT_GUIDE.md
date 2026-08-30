# Janushan Ice Cream Website — Production Deployment Guide

Milestone 10 is the deployment handoff for release `1.0.0`. It does not assume a domain, Firebase project ID, or hosting account that has not been supplied.

## Recommended production route: Vercel + Firebase

The Next.js website runs on Vercel. Firebase remains responsible for Authentication, Firestore, Storage, and App Check. The website and Android app can continue to use shared business data while retaining independent user interfaces.

## 1. Local release gate

Use Node.js 22 LTS. From the project root:

```bash
npm install
npm run check
```

Then load your actual production environment variables and run:

```bash
npm run verify:env
```

`verify:env` intentionally fails if the final URL is missing, non-HTTPS, localhost, or still an example domain.

## 2. Firebase production setup

In Firebase Console:

1. Use the intended Janushan production Firebase project.
2. Register a Web App and copy the public web configuration into the hosting provider environment variables.
3. Enable Email/Password Authentication if it is used for the Control Room.
4. Enable Cloud Firestore and Firebase Storage.
5. Create the owner/admin account, then create `admins/{uid}` with an owner/admin role as documented in the project README.
6. Deploy the supplied rules:

```bash
npx firebase-tools login
npx firebase-tools use YOUR_FIREBASE_PROJECT_ID
npm run firebase:deploy:rules
```

7. Configure Firebase App Check with a reCAPTCHA v3 provider for the final domain. Test before enabling enforcement.
8. Add the final website domain to Firebase Authentication > Settings > Authorized domains.

## 3. Vercel deployment

1. Push this folder to a private Git repository.
2. Import the repository into Vercel.
3. Framework preset: Next.js.
4. Build command: `npm run build`.
5. Add every production variable from `.env.example` in Vercel Project Settings > Environment Variables.
6. Deploy the production branch.
7. Before attaching the custom domain, verify `/`, `/admin`, `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, and `/api/health` on the Vercel preview URL.

## 4. Attach the real domain

After purchasing/choosing the domain:

1. Add the domain in Vercel.
2. Apply the DNS records Vercel provides at the domain registrar.
3. Wait for DNS/SSL verification.
4. Set `NEXT_PUBLIC_SITE_URL=https://YOUR-REAL-DOMAIN` in Vercel Production variables.
5. Redeploy after changing the URL.
6. Add the same domain to Firebase Authentication Authorized Domains and App Check.

Do not launch while `NEXT_PUBLIC_SITE_URL` points to the preview URL or an example hostname.

## 5. Production smoke test

Test on at least one Android phone, one iPhone/iPad if available, and a desktop browser:

- Cinematic scoop entrance loads and does not trap scrolling.
- Navigation and mobile menu work.
- Choose Your Craving opens product details.
- Flavour Universe transitions correctly.
- Ice Cream Builder saves/shares without errors.
- Story timeline, gallery lightbox, location buttons, contact actions, and footer work.
- `/admin` rejects non-admin accounts and permits the approved admin account.
- Product/gallery/location changes made in the Control Room appear publicly after refresh.
- Images upload to Firebase Storage.
- `robots.txt` allows the public site but the admin route remains blocked from indexing.
- `sitemap.xml` uses the final HTTPS domain.
- `/api/health` returns `{ "status": "ok" }`.

## 6. Search launch

After the final domain is stable:

1. Add the domain property to Google Search Console.
2. Verify ownership using the method Google provides.
3. Submit `https://YOUR-REAL-DOMAIN/sitemap.xml`.
4. Inspect the homepage URL and request indexing.
5. Check the structured data with Google's Rich Results Test.
6. Confirm the Open Graph card renders correctly when sharing the homepage.

Indexing is controlled by search engines and cannot be guaranteed immediately.

## 7. Analytics and privacy

`NEXT_PUBLIC_GA_ID` is optional and blank by default. If analytics is enabled, review applicable privacy/cookie requirements before launch. Do not add unnecessary trackers to a brand website merely because they are available.

## 8. Rollback plan

Vercel keeps previous deployments. If a production release introduces a serious problem, promote the last known-good deployment while the issue is fixed. Firebase rules should be version-controlled with the website repository so rule changes can also be reviewed and reverted safely.

## 9. Health monitoring

The new endpoint is:

```text
GET /api/health
```

It returns service status, release version, and server timestamp with no-store caching. It can be used by an uptime monitor after launch.

## 10. What still requires the owner

A genuine public launch cannot be completed from this ZIP alone. It still requires:

- the chosen production domain;
- access to the production Firebase project;
- access to the hosting/Vercel account;
- approved real business content and final prices/locations;
- final local `npm run check` result.

Do not put Firebase admin credentials, private keys, passwords, service-account JSON, or registrar credentials into this project or send them in chat.
