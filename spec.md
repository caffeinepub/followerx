# FollowerX

## Current State
The payment screen (`PaymentScreen.tsx`) calls `onOrderSubmit` (passed from `App.tsx`) before opening WhatsApp. `App.tsx` `handleOrderSubmit` calls the backend `actor.submitOrder(...)`, which throws an error and displays "Failed to submit order. Please try again." The WhatsApp link also uses the wrong number (`6388029405` instead of `916388029405`) and an older message format.

## Requested Changes (Diff)

### Add
- WhatsApp direct-open logic in `PaymentScreen.handleConfirmOrder` using the new message template with fields: Instagram Username, Service, Quantity, Package Price, UPI, Order Time
- WhatsApp number updated to `916388029405`
- Order Time field dynamically set at click time

### Modify
- `PaymentScreen.handleConfirmOrder`: remove `await onOrderSubmit(details)` call entirely; build and open WhatsApp URL directly without any backend dependency
- `App.tsx`: remove the `handleOrderSubmit` function and the `onOrderSubmit` prop passed to `PaymentScreen`
- `PaymentScreen` interface: remove `onOrderSubmit` prop

### Remove
- Backend order submission (`actor.submitOrder`) from the payment flow
- "Failed to submit order" error toast

## Implementation Plan
1. Update `PaymentScreen.tsx`: remove `onOrderSubmit` from props interface, remove the `await onOrderSubmit(details)` call, replace with direct WhatsApp URL construction using the new message template and number `916388029405`
2. Update `App.tsx`: remove `handleOrderSubmit` function and `onOrderSubmit` prop from `<PaymentScreen>`
