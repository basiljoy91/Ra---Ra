# Ra & Ra — Shopify Admin actions for T08 / R04

Status: **BLOCKED / not ready for live customer orders**  
Prepared: 17 November 2026

The custom Next.js storefront now contains draft German routes. Codex did not access or modify Shopify Admin. Complete and evidence-test every action below before publishing policies or enabling live checkout.

## 1. Settings → Policies

- Add the final, legally reviewed German `Return and refund policy`, `Privacy policy`, `Terms of service`, `Shipping policy`, `Legal notice`, and `Contact information` where Shopify offers those fields.
- Add a custom Shopify page or other checkout-reachable destination for the statutory withdrawal information and the `/widerruf` function when the native policy types do not provide one.
- Confirm the checkout footer or combined “Terms and policies” view exposes the correct German versions.
- Ensure every policy uses the same proprietor, full street address, telephone, email, return-cost rule, return address, delivery scope, VAT treatment, and contract-acceptance wording as the custom storefront.
- Export or otherwise retain the approved version history.

## 2. Settings → Shipping and delivery

- Restrict launch delivery to Germany only; remove all unapproved countries/zones.
- Confirm the actual fulfillment origin in Germany.
- Approve and configure the proposed €4.90 standard rate and free-from-€79 rule only after checking VAT, discounts, gift services, packing and carrier costs.
- Verify the threshold basis used by Shopify and the custom cart.
- Connect and test the intended DHL Paket service, label creation and tracking notifications.
- Confirm island/postcode coverage, exclusions and surcharges.
- Test the proposed 1–2 working-day handling plus 2–4 working-day transport estimate against real operations.

## 3. Returns operations

- Enter and approve a complete German receiving return address.
- Implement and test a merchant-funded workflow: verified prepaid label or documented reimbursement of necessary ordinary postage.
- Keep the owner-approved wording consistent everywhere: **“Wir tragen die unmittelbaren Kosten der Rücksendung der Waren.”**
- Do not require a label, support approval, account, reason or order match before accepting a timely withdrawal.
- Ensure defect/wrong-item workflows remain separate from ordinary withdrawal returns.

## 4. Settings → Taxes and duties

- Obtain the post-20-November VAT decision from the proprietor/tax adviser.
- Confirm regular VAT versus §19 UStG; then update storefront, product prices, cart, checkout, invoices, emails and AGB with exactly one accurate treatment.
- Add USt-IdNr. or Wirtschafts-Identifikationsnummer only when assigned and reviewed. Never publish the private Steuernummer.

## 5. Settings → Payments

- Inventory actual enabled gateways and accelerated checkout methods.
- Publish no payment-method names or logos that are not active for the German market.
- Test refund routing to the original payment method.

## 6. Settings → Customer privacy

- Audit Shopify automated privacy policy settings, Network Intelligence, cookie banner, Customer Privacy API integration, pixels and app pixels.
- Inventory every app, tag, script, iframe and consent category in both Shopify and the custom frontend.
- Confirm reject/accept/revoke behavior and cross-surface synchronization.
- Record processor role, purpose, data, legal basis, country/transfer mechanism and retention for the final privacy notice.

## 7. Checkout, notifications and accounts

- Verify the actual order button wording and the exact contract-acceptance event.
- Review order receipt, payment, fulfillment, cancellation, refund and return emails in German.
- Add a conspicuous `Vertrag widerrufen` destination to eligible order communications and account/order surfaces where Shopify permits it.
- Confirm checkout displays the full seller identity, price/VAT treatment, delivery countries, shipping amount, payment methods and policy links before payment.
- Verify Shopify checkout returns/redirects to the intended Ra & Ra frontend domain.

## 8. § 356a BGB submission backend

- Deploy an owner-controlled HTTPS endpoint and configure `RA_LEGAL_SUBMISSION_ENDPOINT`, `RA_LEGAL_SUBMISSION_SECRET` and `RA_LEGAL_RATE_LIMIT_SALT` in Vercel.
- For `withdrawal.declared`, atomically persist the full declaration, channel and exact UTC timestamp, return a stable receipt reference and `persistedAt`, and set `durableAcknowledgementQueued: true` only after an immediate durable customer email is queued.
- Alert the monitored Ra & Ra mailbox, use a retry/dead-letter strategy, retain audit evidence securely and handle duplicate `Idempotency-Key` values safely.
- Accept guest and unmatched orders for manual reconciliation; do not decide legal eligibility at submission time.
- Run successful, duplicate, invalid-order, email-failure and persistence-failure tests. Never return success after partial failure.
- `contact.requested` must reach the monitored support process and return a real receipt reference.

## 9. Final comparison

- Compare custom routes with Shopify policies and checkout side by side.
- Run `pnpm legal:check`; it is intentionally failing while release blockers remain.
- Obtain proprietor sign-off and qualified German e-commerce/privacy legal review before changing the draft status or enabling live orders.

