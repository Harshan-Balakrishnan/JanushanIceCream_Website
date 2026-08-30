# Janushan Ice Cream Website — Start Here

This folder is the single consolidated website project. You do **not** need Milestone 1–10 ZIP files.

## Easiest way on Windows

1. Install the current **Node.js LTS** release from nodejs.org if Node.js is not already installed.
2. Double-click **SETUP_AND_RUN.bat**.
3. The first run installs dependencies and starts the website.
4. Open **http://localhost:3000**.
5. On later runs, double-click **RUN_WEBSITE.bat**.

## Before publishing

Double-click **CHECK_PROJECT.bat**. It runs TypeScript checking, linting and a production build.

## Common changes

- Products / prices / fallback content: `lib/catalog.ts`
- Homepage section order: `components/DiscoverPreview.tsx`
- Main styling: `app/globals.css`
- Logo: `public/brand/janushan-logo.png`
- Product images: `public/products/`
- Flavour images: `public/flavours/`
- Contact/location fallback: `components/FindJanushan.tsx` and `components/ContactExperience.tsx`
- Admin dashboard: `/admin`

## Firebase is optional for local viewing

The public website runs using its built-in content even when Firebase is not configured. To enable the Admin Control Room and live content, copy `.env.example` to `.env.local`, add your Firebase Web App values, then follow `DEPLOYMENT_GUIDE.md`. Never put Firebase Admin SDK private keys into this project.

## Recommended editing workflow

After making changes, save the file and the development server refreshes automatically. Before deploying, run `CHECK_PROJECT.bat`.
