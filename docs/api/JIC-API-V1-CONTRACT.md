# JIC Core API — Version 1 Contract

**Status:** Proposed contract; endpoints are not yet implemented.  
**Base path:** `/api/v1`  
**Business timezone:** Asia/Colombo  
**Currency:** LKR  
**Authority:** The core backend is authoritative for prices, promotions, stock, orders, payments, refunds and business status.

## 1. Shared conventions

### Headers

- `Authorization: Bearer <short-lived-access-token>` for authenticated operations.
- `Idempotency-Key: <high-entropy-client-generated-value>` for commands that create or mutate financially/operationally significant records.
- `X-Correlation-ID: <opaque-id>` optional on requests; server generates one when absent.
- `Content-Type: application/json`.

Tokens must be audience-restricted, short-lived, revocable and never stored in URLs or logs. Authentication alone does not grant object access; every request must perform server-side authorization.

### Success envelope

```json
{
  "data": {},
  "meta": {
    "request_id": "opaque-correlation-id",
    "api_version": "v1"
  }
}
```

### Error envelope

```json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "The request could not be accepted.",
    "details": [],
    "request_id": "opaque-correlation-id"
  }
}
```

Do not return SQL errors, stack traces, secrets, internal file paths or unnecessary personal information.

### Money and time

Money is represented as integer minor units with an explicit ISO currency code. Do not use JSON floating-point values for amounts. The precise LKR scale and rounding rules must be approved and documented before implementation. Timestamps use ISO-8601 UTC (for example, `2026-11-27T12:00:00Z`); business opening hours are interpreted in `Asia/Colombo`.

## 2. Public read endpoints

| Method | Path | Purpose | Access |
|---|---|---|---|
| GET | `/catalog/products` | Active products and variants | Public, rate-limited |
| GET | `/catalog/products/{product_id}` | Product detail | Public, rate-limited |
| GET | `/catalog/flavours` | Published flavours | Public |
| GET | `/catalog/promotions` | Currently published promotions | Public |
| GET | `/storefront/config` | Public opening/status/contact configuration | Public, field allowlist |
| GET | `/fulfilment/options` | Available pickup/delivery methods | Public, validated by location |

Public responses must exclude internal cost, margin, supplier, stock valuation, staff, customer and unpublished fields. Availability may be coarse-grained; exact quantities are internal unless explicitly approved.

## 3. Customer and order endpoints

| Method | Path | Purpose | Access |
|---|---|---|---|
| POST | `/orders/quotes` | Validate basket and return authoritative quote | Guest or customer |
| POST | `/orders` | Submit an order after explicit customer confirmation | Guest or customer |
| GET | `/orders/{order_id}` | Read permitted order status | Owner of order / authorised staff |
| POST | `/orders/{order_id}/cancellation-requests` | Request cancellation | Owner / authorised staff |
| POST | `/orders/{order_id}/support-requests` | Create support request | Owner / authorised staff |

Order submission must revalidate all line items, current price, discounts, stock, fulfilment method, delivery zone/capacity and total. The client-supplied total is informational only and must never be trusted.

A quote is not a stock reservation unless the response explicitly includes a reservation ID and expiry. Reservation policy must be defined to prevent indefinite stock locking.

## 4. Payment endpoints

| Method | Path | Purpose | Access |
|---|---|---|---|
| POST | `/orders/{order_id}/payment-intents` | Initiate payment through an approved provider adapter | Customer / authorised cashier |
| GET | `/payments/{payment_id}` | Read payment status | Owner / authorised staff |
| POST | `/payments/{payment_id}/reconciliation-requests` | Request controlled reconciliation | Finance role |

A browser/app redirect or client callback does not prove payment. The backend verifies signed provider callbacks and reconciles provider references. Never accept raw card data.

## 5. Staff / POS endpoints

| Method | Path | Purpose | Access |
|---|---|---|---|
| POST | `/pos/shifts` | Open cashier shift for an explicit location | Cashier with permission |
| GET | `/pos/shifts/current` | Read current user's shift | Cashier / supervisor |
| POST | `/pos/sales` | Create a POS sale | Cashier with active shift |
| POST | `/pos/sales/{sale_id}/void-requests` | Request sale void | Cashier; approval may be required |
| POST | `/pos/sales/{sale_id}/refund-requests` | Request full/partial refund | Refund permission; approval policy |
| POST | `/inventory/counts` | Submit stock count | Stock counter |
| POST | `/inventory/counts/{count_id}/approvals` | Approve count variance | Independent approver |
| POST | `/inventory/adjustments` | Post approved adjustment | Inventory manager / authorised approver |

Every POS sale must identify the location and cashier shift explicitly. No fallback location is permitted. Shift enforcement, permissions, price validation, payment allocations and inventory movement must be enforced by the backend in the same atomic business operation where supported.

## 6. Administrative endpoints

Administrative APIs must be separated by capability, not a single unrestricted admin flag:

- catalogue: read/manage product content;
- pricing: propose/approve effective-dated prices and promotions;
- inventory: view/manage movements and count approvals;
- POS: operate shifts and sales;
- finance: view/reconcile finance and approve configured refunds;
- staff: manage roles and access;
- configuration: manage storefront and operational settings;
- audit: read protected audit events;
- platform owner: manage high-risk permissions and integrations.

High-risk actions require reason codes, audit events and configured approval thresholds. A user must not approve their own restricted transaction where maker-checker is required.

## 7. Idempotency

Required for order submission, POS sale creation, payment initiation, refunds, voids and inventory adjustments.

- Key is unique within actor/channel and operation scope.
- Persist key, canonical request hash, status, result reference and retention expiry.
- Same key and same payload: return original result/status.
- Same key and different payload: return `409 IDEMPOTENCY_KEY_REUSED`.
- In-progress request: return a stable pending response or status reference.
- A retry after timeout must query/reuse the same key, not create a new financial operation.
- Retention must exceed the maximum retry/reconciliation window and be documented.

## 8. Domain events

Proposed events: `ProductPublished`, `PriceChanged`, `StockMovementPosted`, `OrderSubmitted`, `OrderAccepted`, `PaymentConfirmed`, `OrderFulfilled`, `RefundIssued`, `ShiftOpened`, `ShiftClosed`, `InventoryCountApproved`.

Each event includes event ID, schema version, occurrence time, aggregate ID, actor/channel, correlation ID and a minimal payload. Do not publish customer secrets or unnecessary personal data. Use a transactional outbox and idempotent consumers. Define retry limits, dead-letter handling, replay and reconciliation before enabling subscribers.

## 9. Security requirements

- HTTPS only; secure token storage on clients.
- Authentication plus object-level authorization for every non-public resource.
- Server-side validation and allowlisted writable fields.
- Per-IP, per-account and per-token rate limits; stricter controls on login, quotes and commands.
- CSRF protection where cookie authentication is used.
- Strict CORS allowlist; no wildcard credentialed origins.
- Request-size limits and safe content-type validation.
- Signed, timestamped, replay-protected webhooks.
- Structured logs with secret/PII redaction.
- No AI agent receives database credentials or unrestricted staff permissions.
- All AI-originated actions are attributed to the agent, customer and human confirmation where applicable.

## 10. Contract acceptance tests

1. Anonymous user can read only published public catalogue fields.
2. Anonymous user cannot read another customer's order.
3. Customer cannot access another customer's address, order, payment or support ticket.
4. Client price/discount/stock tampering is rejected or recalculated.
5. Repeated order/POS/payment/refund request with same idempotency key does not duplicate effects.
6. Same key with changed payload returns conflict.
7. Concurrent final-stock purchase does not oversell.
8. Cashier cannot create POS sale without active shift and explicit location.
9. Cashier cannot approve own restricted refund/adjustment.
10. Invalid/unsigned/replayed payment webhook is rejected.
11. Public responses never expose cost, margin, supplier, payroll or internal stock valuation.
12. All sensitive commands generate traceable audit events.
