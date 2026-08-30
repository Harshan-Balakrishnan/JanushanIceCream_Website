# Janushan Ice Cream — Production Launch Checklist

## 1. Environment
- [ ] Copy `.env.example` to `.env.local` for local development.
- [ ] Set every Firebase Web App variable.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain, with no trailing slash.
- [ ] Keep `NEXT_PUBLIC_GA_ID` empty unless analytics is intentionally enabled.
- [ ] Configure Firebase App Check, then set `NEXT_PUBLIC_FIREBASE_APPCHECK_SITE_KEY`.
- [ ] Never commit `.env.local` or private service-account keys.

## 2. Firebase
- [ ] Enable Email/Password Authentication only for approved administrators.
- [ ] Create `admins/{uid}` only for trusted Janushan admin accounts.
- [ ] Deploy `firestore.rules` and `storage.rules`.
- [ ] Turn on Firebase App Check enforcement only after verifying valid production traffic.
- [ ] Test that a normal signed-in account cannot write catalog data.
- [ ] Test that public users can read only active products, flavours, gallery items, promotions and locations.

## 3. Content
- [ ] Replace any temporary descriptions with approved Janushan copy.
- [ ] Confirm every product name and price before launch.
- [ ] Confirm ingredient/allergen information before publishing it in the future.
- [ ] Upload approved real product photography through the Control Room.
- [ ] Confirm location, phone, WhatsApp and email details.

## 4. Search & Sharing
- [ ] Open `/robots.txt` and confirm the production sitemap URL.
- [ ] Open `/sitemap.xml` and confirm the final HTTPS domain.
- [ ] Test the social preview image at `/og/og-default.png`.
- [ ] Submit the sitemap to Google Search Console after the domain is live.
- [ ] Verify the structured business data with a structured-data testing tool.

## 5. Quality Assurance
- [ ] Test Chrome, Edge, Firefox and Safari.
- [ ] Test Android and iPhone-sized screens.
- [ ] Navigate the whole site using only a keyboard.
- [ ] Verify visible focus states and the Skip to content link.
- [ ] Test reduced-motion mode.
- [ ] Test slow mobile network conditions.
- [ ] Check all call, WhatsApp, map and email links.
- [ ] Test the gallery lightbox with Escape and arrow keys.
- [ ] Test the mobile navigation menu.
- [ ] Test Firebase fallback content by temporarily removing Firebase environment variables.

## 6. Performance
- [ ] Run a production build locally: `npm run build`.
- [ ] Run Lighthouse against the deployed production site, not only localhost.
- [ ] Check Core Web Vitals after real traffic begins.
- [ ] Compress any future uploaded images before publishing when practical.

## 7. Deployment
- [ ] Use HTTPS only.
- [ ] Add production environment variables to the hosting provider.
- [ ] Confirm security headers on the deployed site.
- [ ] Confirm `/admin` is `noindex` and sends `Cache-Control: no-store`.
- [ ] Verify a custom 404 page and error recovery.
- [ ] Take a Firestore backup/export plan before major content changes.
