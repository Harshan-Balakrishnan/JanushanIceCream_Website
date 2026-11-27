# Scoop Match — implementation note

**Branch:** `feature/scoop-match-customer-experience`  
**Scope:** customer-facing flavour discovery component only.

## What it does

- Adds a four-choice flavour mood selector: bright/fruity, chocolatey, classic and surprise.
- Uses the existing Firestore `flavours` collection through the site's existing catalogue hook, with the existing approved default flavour list as fallback.
- Produces a simple, transparent keyword match against the configured flavour name and description.
- Shows the selected flavour's existing image and links the customer to the menu.
- Adds a navigation entry so the experience can be discovered.
- Uses existing Framer Motion dependency and honours reduced-motion preferences.
- Provides keyboard-operable native buttons, pressed states, descriptive labels and a live result announcement.
- Does not collect personal data, call an AI provider, create an account, write to Firestore, claim live stock or make health/ingredient assertions.

## Deliberate limitations

This is a lightweight discovery interaction, not an AI recommendation engine. The result is deterministic and only as accurate as the existing flavour names/descriptions. “Surprise me” cycles through the configured flavour list each time the customer asks for a suggestion; it does not use inventory or a customer profile. Selection is event-driven and deterministic during rendering to avoid server/client hydration mismatches. The customer is told to confirm availability with the team.

## Validation status

The changed files were fetched back from the feature branch after writing and their contents/paths checked. Automated Next.js build, TypeScript, ESLint, browser, accessibility and real-device tests have not been run in this environment. The pull request should remain draft until the repository's CI and a visual preview have passed.
