# JIC Phase 1 — Threat Model and Release Gates

**Status:** Initial design review; not a completed security assessment.  
**Scope:** ERP core, API boundary, website, Android, POS, Firebase supporting services and external integrations.

## 1. Assets to protect

- Cash, payment status, sales, refunds, journals and reconciliation.
- Inventory quantities, stock valuation, recipes and production records.
- Product catalogue, approved prices, promotions and supplier terms.
- Customer identities, contact information, addresses, order history and consent.
- Staff identities, roles, payroll and audit records.
- API credentials, signing keys, database credentials, backups and deployment credentials.
- Brand integrity, public claims, campaign approvals and customer communications.

## 2. Trust boundaries

1. Customer browser/app -> public API.
2. POS device -> staff API.
3. Staff/admin browser -> privileged API.
4. Core backend -> MySQL.
5. Core backend -> Firebase/supporting services.
6. Core backend -> payment/messaging/delivery providers.
7. AI model/tool adapter -> narrowly scoped JIC service.
8. Production -> staging/development and backup systems.

Treat every request, uploaded file, webhook, customer message, AI output and provider response as untrusted until validated.

## 3. Priority threats and required controls

| Threat | Business impact | Required control / verification |
|---|---|---|
| Duplicate POS/order request | Duplicate sale, payment or stock deduction | Database uniqueness + idempotency; timeout/retry and concurrency tests |
| Client price/discount tampering | Revenue leakage | Recompute on server from approved price and promotion rules |
| Concurrent final-stock checkout | Overselling | Transactional reservation/decrement or locking; concurrency test |
| Cashier without active shift | Unreconciled cash and weak accountability | Enforce shift and location in server transaction |
| Unauthorized refund/void | Direct financial loss | Separate permissions, thresholds, reason, maker-checker and immutable reversal |
| Incorrect partial refund | Customer over/under-refund and ledger mismatch | Allocate original discounts/tax proportionally by defined policy; test edge cases |
| Inventory adjustment abuse | Shrinkage concealed | Append-only movements, independent approval and count variance report |
| Privilege escalation | Business-wide compromise | Deny-by-default RBAC, object-level checks, MFA for privileged accounts, access review |
| Session/token theft | Unauthorized actions | Short-lived scoped tokens, secure storage, revocation, MFA and rate limiting |
| SQL injection / mass assignment | Data disclosure or tampering | Parameterized queries, strict DTO/schema validation, writable-field allowlists |
| Webhook spoof/replay | False payment confirmation | Signature, timestamp, nonce/event ID uniqueness and provider reconciliation |
| Malicious upload | Stored XSS/malware or storage abuse | Allowlisted formats, size limits, content inspection, random object keys, no executable serving |
| Sensitive log/export leakage | Privacy and commercial harm | Redaction, role checks, export audit and spreadsheet formula-injection protection |
| AI prompt injection/tool misuse | Data leak or unauthorized transaction | Treat content as data; scoped tools, policy checks, human confirmation and full audit |
| Ransomware/provider outage | Operational interruption | Isolated encrypted backups, restore drills, recovery runbook and manual fallback |
| Supply-chain compromise | Remote code execution/data loss | Lockfiles, dependency scanning, pinned CI actions, secret scanning and reviewed upgrades |

## 4. Security design requirements

- Deny by default. Authorization is checked in trusted server code, not only the UI or Firebase client rules.
- Separate customer, cashier, supervisor, inventory, finance, marketing, administrator and platform-owner capabilities.
- Enforce location scope in every location-bound record and query.
- Separate maker and approver for configured sensitive actions.
- Use immutable posted financial records. Correct them with linked reversals, never silent destructive edits.
- Use parameterized SQL and transaction boundaries around money/stock changes.
- Protect session cookies with Secure, HttpOnly and appropriate SameSite settings if cookie sessions are selected.
- Store secrets only in the deployment secret manager; rotate credentials and document ownership.
- Redact passwords, tokens, payment secrets and unnecessary personal data from logs.
- Backups must be encrypted, access-controlled, retained according to approved policy and restored in a test environment.
- Staging must use synthetic or properly de-identified data, not copied production personal data by default.

## 5. Phase 1 test matrix

### Financial correctness
- Full and partial refund with no discount.
- Partial refund after line discount.
- Partial refund after order-level discount allocated across multiple lines.
- Multiple partial refunds cannot exceed refundable quantity/value.
- Rounding remainder is deterministic and total refunds never exceed original captured amount.
- Tax and payment-fee treatment follows the approved local accounting policy.
- Reversal preserves links to original sale/payment/journal.

### POS and idempotency
- Sale without open shift is rejected.
- Sale without explicit location is rejected.
- Same idempotency key and same payload returns same sale.
- Same key with different payload conflicts.
- Two concurrent requests cannot sell the same final unit.
- Database failure at each transaction step leaves no partial sale/payment/stock state.
- Timeout after commit can be safely retried and queried.

### Authorization
- Test every critical endpoint for allowed and denied roles.
- Customer A cannot read Customer B's records.
- Cashier cannot approve own restricted refund.
- Inventory counter cannot approve own stock variance.
- Catalogue editor cannot change cost/margin or post financial entries.
- Staff account cannot grant itself a higher role.
- Revoked staff session/token loses access.

### Inventory and audit
- Every movement includes actor, location, SKU, base unit, reason and source reference.
- Reversals link to original movement and do not delete history.
- Concurrent stock changes reconcile to the ledger.
- Count variance requires approval under configured policy.
- Audit record cannot be modified by ordinary application roles.

### Integration and AI
- Invalid/replayed webhook is rejected.
- Provider outage produces pending/unknown state, not false success.
- AI cannot reveal unauthorized finance/payroll/customer records.
- AI cannot publish campaigns, change prices, issue refunds or adjust stock without explicit authorized approval.
- Malicious text in customer messages cannot change tool permissions or system policy.

## 6. Release gates

Do not release Phase 1 until:

- Critical/high-risk findings have been fixed or explicitly accepted by the owner with compensating controls.
- Unit, integration and concurrency tests pass in a non-production environment.
- Database migrations have a reviewed rollback/forward-recovery plan and have been tested on a staging copy.
- A backup restore drill is observed and recorded.
- Access control has both positive and negative tests.
- No secrets are present in repository history or build artifacts.
- Logs and exports have been checked for sensitive data leakage.
- Owner signs off on refund/discount/rounding policy, location policy and role matrix.
- Two clean verification runs complete against the same commit.
- Production deployment remains a separate, explicitly approved action.

## 7. Known limitations

This document is a threat model and test plan, not evidence of a penetration test, formal compliance review, backup restore, production hardening or security certification. Those require access to the actual ERP repository, its deployment configuration, a staging database and authorized test accounts.
