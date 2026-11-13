# Janushan Ice Cream Manager PWA

Bilingual (English/Tamil), mobile-first PWA for five team accounts.

## Backend
Supabase project: `igmntuedldippelbqgnm` (Asia Pacific - Mumbai).
The database schema and RPC functions were installed separately in Supabase.
The frontend contains only the Supabase publishable key; never place a service-role key in browser code.

## Deploy
This folder is deployed with the GitHub Actions workflow at `.github/workflows/deploy-manager-pages.yml`.
In GitHub repository Settings → Pages, set Build and deployment source to **GitHub Actions**. The workflow publishes this folder at:
`https://harshan-balakrishnan.github.io/JanushanIceCream_Website/` plus `manager/` is not required because the artifact root is this folder.

## First use
1. Open the published URL and create the owner account.
2. Confirm the email if Supabase email confirmation is enabled.
3. Sign in. The app creates the Janushan Ice Cream business and assigns the owner role.
4. Add products with opening stock.
5. Each team member creates their own account. Owner adds their email and assigns operator/viewer.
6. Install from browser menu → Add to Home screen.

## Offline
The app shell is cached. Offline sales are queued in this browser's local storage and replayed on reconnection using idempotent sale IDs. Offline transactions are device-specific until synchronized; do not clear browser data or uninstall before the pending queue syncs. The first sign-in, initial product load and team invitations require internet. Never use the offline queue as a multi-device stock lock: review pending sales and physical counts before closing stock.

## Known limits in this first build
- Offline mode queues sales only; expenses and stock receipts currently require internet.
- The weekly count compares with ledger stock, but a submitted variance does not automatically adjust inventory. Owner should review variance and create an adjustment entry.
- PWA static hosting needs GitHub Pages enabled once by repository owner.
- Five people can be assigned accounts; free-plan quotas and Supabase email limits apply.
