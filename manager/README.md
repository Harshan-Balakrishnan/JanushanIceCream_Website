# Janushan Ice Cream Manager PWA

Bilingual (English/Tamil), mobile-first PWA for up to five individual team accounts.

## Backend
Supabase project: `igmntuedldippelbqgnm` (Asia Pacific - Mumbai).
The database schema and business RPC workflows were installed in Supabase.
The frontend uses only the Supabase publishable key. Never put a service-role key in browser code.

## Deploy
This folder is published by `.github/workflows/deploy-manager-pages.yml`.
In GitHub repository **Settings → Pages**, set Build and deployment source to **GitHub Actions**. Then rerun the workflow if the first run failed because Pages was not enabled.
The deployment URL is `https://harshan-balakrishnan.github.io/JanushanIceCream_Website/`.

## First use
1. Open the published URL and create the owner account.
2. Confirm the email if Supabase email confirmation is enabled.
3. Sign in. The app creates the Janushan Ice Cream business and assigns the owner role.
4. Add products with opening stock.
5. Each team member creates their own account. Owner adds their email and assigns operator/viewer.
6. Install from browser menu → Add to Home screen.

## Offline
The app shell and Supabase browser library are cached for offline opening. Offline sales are queued in this browser's local storage and replayed on reconnection using idempotent sale IDs. Offline transactions are device-specific until synchronized; do not clear browser data or uninstall before the pending queue syncs. Initial sign-in, product setup, team invitations, expenses, stock receipts and weekly stock counts require internet in this first release. Never use the offline queue as a multi-device stock lock: review pending sales and physical counts before closing stock.

## Important limitations
- Offline queue currently supports sales only; expense and stock-receipt entry require internet.
- The weekly count compares physical quantities with ledger stock, but a submitted variance does not automatically adjust inventory. Review the difference and enter a correcting stock movement.
- GitHub Pages must be enabled once by the repository owner.
- Five total business members are intended; Supabase free-plan quotas and email confirmation limits apply.
- This is a first operational build; test with sample data before relying on it for daily financial reconciliation.
