# Janushan Ice Cream — Phase 1 Core Foundation

**Status:** Proposed architecture baseline  
**Scope:** Design and contracts only; not a production implementation  
**Business timezone:** Asia/Colombo  
**Currency:** LKR (integer minor units; do not use floating point for money)  
**Brand:** Preserve approved Janushan Ice Cream identity and assets.

## 1. Objective

Establish one authoritative business system for products, price lists, stock, orders, sales, payments, refunds and financial records. Website, Android and POS are channels, not independent authorities for those records.

The existing PHP/MySQL ERP is the proposed system of record because the audit found the broadest operational and accounting scope there. This is a target decision, not proof that its current database or workflows are production-ready. Phase 1 must validate the ERP schema, deployment model, transaction boundaries, permissions and backup/restore process before any migration or integration.

## 2. System boundaries

- **JIC ERP / core backend:** authoritative business rules and records after remediation and acceptance.
- **Website (Next.js):** public brand experience, catalogue presentation and commerce client. It must not calculate authoritative prices, reserve stock or declare an order paid.
- **Android:** customer and staff experiences through documented services. Firebase data currently used by the app must be classified and migrated/bridged deliberately; no silent dual-write.
- **POS:** a channel into the same order/sale/payment/stock services. It must use the same business invariants as online orders.
- **Firebase:** optional supporting identity, notifications or media adapter only where approved. It is not a parallel catalogue, pricing, inventory or order authority.
- **External providers:** payments, messaging, maps, delivery and AI accessed through replaceable adapters. Provider identifiers are not JIC primary keys.

## 3. Canonical domain ownership

| Domain | Authoritative owner | Required invariants |
|---|---|---|
| Products / variants / units | Core catalogue | Stable SKU and ID; archived rather than hard-deleted once referenced |
| Price lists / promotions | Pricing service | Effective dates, channel eligibility, approval, immutable sale snapshots |
| Locations | Business configuration | Explicit location on every stock and POS transaction; no implicit branch fallback |
| Inventory | Inventory ledger | Append-only movements; balances derived/reconciled; reason, actor, time and reference |
| Orders | Order management | Explicit state machine; unique idempotency key; server-side price/stock/fulfilment validation |
| Sales | POS / sales service | Atomic header, lines, payment allocations and stock movements; cashier shift required |
| Payments | Payment ledger / provider adapter | Never infer success from client callback; provider reference and reconciliation |
| Refunds / returns | Refund service | Linked to original sale and quantities; allocate original discounts/tax consistently; approval rules |
| Customers / consent | CRM | Minimise personal data; separate transactional and marketing consent |
| Accounting | General ledger | Balanced journal entries; immutable posted entries; reversal, not destructive edit |
| Staff / permissions | Identity and access service | Deny by default; least privilege; separation of duties |
| Audit | Audit service | Actor, action, object, timestamp, correlation ID, before/after or safe diff; protected retention |

Do not assume multiple branches, distributors, tax rates, payment providers or delivery zones exist. Model these as configurable capabilities, enabled only after owner confirmation.

## 4. Order lifecycle

The canonical lifecycle must be explicit and validated server-side:

`draft -> submitted -> awaiting_confirmation -> accepted -> preparing -> ready -> dispatched -> completed`

Additional controlled outcomes: `cancelled`, `payment_pending`, `paid`, `partially_refunded`, `refunded`.

Not every channel uses every state. State transitions must be defined by role, prior state, payment state and fulfilment method. A customer-facing channel may request a transition; only the authoritative service may commit it.

## 5. Transaction and money rules

- Store LKR as integer minor units (for LKR, integer rupees may be sufficient only if all configured payment/discount rules support that precision; document the chosen scale before coding).
- Define one rounding policy and test it for line discounts, order discounts, tax, refunds and payment allocation.
- At checkout, re-read product, active status, current price, promotion eligibility, customer eligibility, stock and fulfilment capacity on the server.
- Persist sale-line snapshots: SKU, product description, quantity, unit, unit price, line/order discount allocation, tax treatment and cost basis where known.
- Catalogue edits must not rewrite completed sale history.
- Create sale/order, payment record, stock movement and outbox event within a transaction or a documented recoverable workflow.
- Use a unique idempotency key scoped to actor/channel and operation. Repeated same-key/same-payload requests return the original result; same-key/different-payload requests conflict.
- Never store raw card credentials. Payment provider callbacks require signature verification, replay protection and reconciliation.

## 6. Inventory rules

Inventory changes must be represented by immutable movements: receipt, production output, sale, return, waste, transfer, count adjustment or reversal. Each movement records location, SKU, base unit, quantity delta, reason, source reference, actor and timestamp.

Unit conversions must be explicit and dimensionally valid. Do not combine kg, litres, pieces, cups or packs without configured conversions and traceability.

A stock count is not an ordinary edit to a quantity field. It creates a proposed variance; a separate authorised person approves and posts an adjustment. Where staffing makes strict maker-checker impossible, record an explicit owner-approved exception with compensating audit controls.

## 7. API and integration principles

- Version prefix: `/api/v1`.
- JSON request/response; UTF-8; ISO-8601 timestamps with explicit offset or UTC.
- Stable opaque IDs; never expose sequential database IDs as authorization tokens.
- Authentication plus object-level authorization on every protected operation.
- Validate request schemas server-side; reject unknown fields on sensitive writes.
- Require idempotency keys on order submission, payment initiation, refund and stock-adjustment commands.
- Use cursor pagination, bounded page sizes, filtering allowlists and rate limits.
- Return stable error codes, correlation IDs and no stack traces or secrets.
- Emit domain events through a transactional outbox; consumers must be idempotent.
- Webhooks must be signed, timestamped, replay-protected and retried with bounded backoff and a dead-letter/reconciliation path.

## 8. Environments and release

Development, staging and production must be separate in credentials, databases, storage and provider accounts. No test command may point at production by default. Migrations must be reviewed, backed up, tested on a staging copy, reversible where feasible, and have a documented forward-recovery plan.

A backup is not accepted until a restore drill is observed. No production deployment, Firebase rules deployment or live data migration is included in this document.

## 9. Decisions still requiring evidence

1. Exact ERP repository/source version and supported PHP/MySQL versions.
2. Actual database engine/version, schema, constraints, isolation level and transaction usage.
3. Existing order/payment/refund schema and current POS code paths.
4. Whether ERP is already in use for live transactions and the permitted maintenance window.
5. Actual branch/location model; do not rely on hard-coded branch IDs.
6. Currency precision and any approved tax/discount policy.
7. Identity provider and migration strategy for ERP, Firebase and Android identities.
8. Backup retention, recovery-point objective and recovery-time objective affordable to the business.
9. Existing payment/messaging/delivery providers and their documented callback security.
10. Data retention, consent and privacy requirements reviewed for Sri Lanka and any target market.

## 10. Non-goals for Phase 1

No visual redesign, AI transaction execution, automatic marketing broadcasts, production database migration, payment-provider switch, multi-branch rollout or deployment. Those follow only after the core controls and owner acceptance tests pass.
