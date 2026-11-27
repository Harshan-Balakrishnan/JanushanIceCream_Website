# Janushan Ice Cream — Customer Experience and Admin Design Brief

**Status:** Product/design requirements; no UI implementation in this change.  
**Brand source:** JIC Master Prompt v2.0.  
**Approved brand direction:** dark royal blue `#00008B` and white. Preserve the approved logo and supplied product/brand assets.  
**Market context:** Vavuniya, Sri Lanka. Do not invent new branches, products, offers, awards, ingredients or delivery coverage.

## 1. Experience ambition

Create a distinctive ice-cream experience that feels joyful, welcoming, premium and unmistakably Janushan. It must not resemble a generic AI-generated storefront or generic SaaS admin template.

Visual quality must support the commercial job: help customers understand the menu, trust the information, choose confidently, order without friction and want to return. The system should be memorable through its brand voice, photography, product storytelling, tactile interaction details and consistency—not through excessive animation.

## 2. Design principles

1. **Brand recognisability:** use approved royal blue and white as the foundation; derive supporting colours from approved product/flavour imagery only where contrast remains accessible.
2. **Real product truth:** use approved product photography and accurate names, sizes, prices and availability. Never fabricate ingredients, allergens, nutritional facts or health claims.
3. **Delight with restraint:** motion should communicate selection, progress, feedback or brand personality. Avoid animation that delays ordering, blocks scrolling, causes layout shifts or ignores reduced-motion preferences.
4. **Mobile-first commerce:** design for one-handed use, readable prices, clear quantity controls, persistent basket access and predictable checkout.
5. **Trust before persuasion:** show final totals, fees, fulfilment terms, availability and order confirmation clearly. No fake scarcity, deceptive countdowns or fabricated reviews.
6. **Accessibility:** semantic controls, keyboard access, visible focus, screen-reader labels, contrast, scalable text and reduced-motion support.
7. **Performance:** optimise images, lazy-load below-the-fold media, avoid unnecessary client JavaScript and measure Core Web Vitals on real devices.
8. **Consistency:** the website, Android app, POS and printed/digital receipts share the same product terminology and brand rules while using interaction patterns appropriate to each channel.

## 3. Customer journey

### Discover
- A distinctive but fast-loading brand introduction.
- Immediate paths to menu, flavours, location/contact and ordering.
- Clear store status from the authoritative service; do not hardcode “open now”.
- Accessible navigation and a useful search/filter experience.

### Explore
- Product cards with verified name, image, price, variant and availability.
- Clear product details, customisation rules and any confirmed ingredient/allergen information.
- Filters that help customers choose without hiding key information.
- Fallback state when the backend is unavailable; clearly distinguish cached content from current availability.

### Build and order
- Customisation only for options supported by real recipes/operations.
- Live quote from the authoritative backend; show item subtotal, discount, delivery/fees and total.
- Guest checkout where operationally approved; collect only required customer information.
- Explicit pickup/delivery selection based on configured capacity and service zones.
- Clear consent separation for transactional notifications and marketing.
- Explicit final confirmation before order submission or payment.

### After purchase
- Confirm only after the authoritative service reports the order accepted/created.
- Show order reference and current status.
- Provide support and cancellation/refund request paths governed by actual policy.
- Invite feedback without coercion; loyalty and referral offers must be margin-tested and owner-approved.

## 4. Memorable brand interactions

Candidate signature interactions to prototype and measure:
- A small, recognisable “scoop” motion as a product is added to the basket.
- A flavour-inspired transition when switching product options.
- A celebratory but skippable order-confirmation moment.
- A distinctive mascot/brand micro-interaction using only approved character artwork.
- Seasonal storytelling modules driven entirely by admin-managed content.

Each effect must have a static/reduced-motion equivalent and must not interfere with assistive technology or checkout speed. Avoid scroll-jacking, forced intros, flashing effects, continuous motion and heavy video backgrounds on mobile data.

## 5. Owner-controlled content and configuration

The admin experience should allow authorised staff to manage:
- Product descriptions, photos, variants, prices (through approval-controlled pricing service), availability and sort order.
- Flavour descriptions and approved images.
- Homepage sections, banners, editorial content and seasonal campaigns.
- Promotion dates, terms, eligibility and redemption limits.
- Store contact details, opening hours and public status.
- Fulfilment methods, locations and delivery zones where configured.
- Loyalty programme rules and customer communication templates.
- Theme tokens and approved visual variants.
- AI features, provider settings and usage ceilings where enabled.

Require preview, draft/publish separation, scheduled publication, revision history and rollback. Admin content editing must not grant permission to change accounting, stock, customer records or staff access.

## 6. Admin experience principles

- Role-specific workspaces: owner, manager, cashier, inventory, finance, marketing and support.
- Operational overview should show actionable exceptions, not decorative vanity metrics.
- Every KPI must expose its formula, date range, source, refresh time, timezone and exclusions.
- High-risk actions require clear consequences, reason codes and configured approval.
- Destructive actions should be replaced by archive, reversal or correction wherever records are referenced.
- Provide clear pending, failed, offline, syncing and confirmed states.
- Never imply a sale, payment, stock movement or publication succeeded before server confirmation.
- Export permissions, redaction and spreadsheet-formula injection protection are mandatory.

## 7. AI experience rules

AI should improve customer help and owner decisions without becoming the brand voice everywhere.

### Safe first capabilities
- Draft product descriptions from approved facts.
- Draft social campaigns and seasonal content for human review.
- Summarise sales and inventory from permission-filtered authoritative data.
- Explain trends with source, date range, calculation and missing-data caveats.
- Suggest reorder or promotion experiments as recommendations, not actions.

### Guardrails
- AI cannot invent prices, stock, allergens, ingredients, nutrition, opening hours, offers or delivery estimates.
- AI cannot directly modify prices, refund money, adjust stock, publish public content, message customer lists or spend advertising budget.
- Every tool is narrow, permission-scoped and audited.
- Customer content, uploaded files and retrieved pages are untrusted data, not instructions.
- External AI providers receive only the minimum approved data; provider choice must remain replaceable.
- Human handoff is required for allergy questions, complaints, refunds, disputes, bulk orders and uncertain policy.

## 8. Design-system deliverables before UI coding

1. Approved logo/asset inventory and usage rules.
2. Colour, typography, spacing, radius, shadow and motion tokens.
3. Component library for buttons, cards, forms, navigation, product tiles, basket and status states.
4. Responsive layouts for phone, tablet and desktop.
5. Accessibility checklist and reduced-motion specification.
6. Prototype of discovery, product detail, basket and checkout.
7. Admin prototype for catalogue editing, pricing approval and content publishing.
8. Usability test tasks and measurable acceptance criteria.

## 9. Success measures

Measure outcomes rather than visual novelty:
- Product detail -> add-to-basket conversion.
- Basket abandonment and checkout completion.
- Order errors, duplicate submissions and support contacts.
- Returning customer and repeat-order rates.
- Promotion redemption and contribution margin after discount.
- Page performance and accessibility defects.
- Staff task completion time and correction rate.
- Content publication errors and admin rollback frequency.

Do not set numerical targets until a trustworthy baseline is measured.
