## Tech Stack

- Next.js 16.0.3
- Firebase 12.6.0
- React 19.2.0
- Radix UI 3.1.3
- RxJS 7.8.2
- Tailwind 4.1.17

## Tech Stack

- Next.js 16.0.3
- Firebase 12.6.0
- React 19.2.0
- Radix UI 3.1.3
- RxJS 7.8.2
- Tailwind 4.1.17

## Data Model (Firestore)

Use top-level multi-tenant collections (flattened for query/index simplicity).

### Collections & Fields

- `shops/{shop_id}`

  - `name`, `slug`, `timezone`, `address`, `phone`
  - `branding`: `{logoUrl, primaryColor, secondaryColor, font}`
  - `bookingSettings`: `{mode: "appointments"|"walkins"|"both", receptionist: boolean, marketplaceEnabled: false, widgetEmbedAllowed: true}`
  - `paymentSettings`: `{processor: "stripe", payoutMode: "shop"|"connect", tipTiming: "prepay"|"in_person", taxRate, currency}`
  - `workforce`: `{type: "w2"|"1099"|"mixed"}`
  - `posSettings`: `{mode: "centralized"|"decentralized"|"configurable", defaultByRole: {w2:"centralized", _1099:"decentralized"}}`
  - `cancellationPolicy`: `{minNoticeHours: 24, lateCancelPct: 50, noShowPct:100, graceMin:10, autoCharge:true}`
  - `reminders`: `{defaultSchedule: ["24h"], channels:{sms:true,email:true}}`
  - `waitlist`: `{requiresCard:true, defaultOfferExpiryMin:60, remoteJoin:true, geofenceMeters:null, maxQueueSize:null, fifo:true, confirmRequired:true, notifyChannel:"sms"}`
  - `pricingMode`: `"unified"|"barber_specific"`
  - `brandingMode`: `"co_branded"`
  - `reports`: `{exportsEnabled:true, exportIncludesPII:false}`
  - `createdAt`, `updatedAt`

- `barbers/{barber_id}` (scoped by `shop_id` field)

  - `shop_id`, `user_id`, `displayName`, `photoUrl`, `bio`, `active:boolean`
  - `servicesOffered: string[]`
  - `pricingOverrides: { [service_id]: {price:number} }` (only when shop pricingMode=barber_specific)
  - `baselineSchedule`: RRULE-like by weekday; e.g., `{mon:[{start:"09:00",end:"17:00"}], ...}`
  - `overrides`: array of `{type:"CLOSE_DAY"|"EXTEND_HOURS"|"OPEN_WINDOW"|"BLOCK_SLOT", startISO, endISO, reason}` (arbitrary ranges allowed)
  - `pto: [{startISO,endISO,reason}]`
  - `buffersDefaultMin: number`
  - `clientServiceDurationOverrides: { [client_id]: { [service_id]: minutes } }`
  - `posModeOverride: "centralized"|"decentralized"|null`
  - `createdAt`,`updatedAt`

- `services/{service_id}`

  - `shop_id`, `name`, `description`, `durationMin`, `basePrice`, `defaultBufferMin`, `active:boolean`
  - `createdAt`,`updatedAt`

- `clients/{client_id}`

  - `global_user_id` (maps to Auth UID),
  - `shop_id` (primary association; first shop they book with)
  - `email`, `phone`, `name`, `preferred_barber_id`
  - `paymentMethodTokenRef` (one saved card)
  - `customFields: { [key]: string }` (extensible)
  - `createdAt`,`updatedAt`

- `appointments/{appointment_id}`

  - `shop_id`, `barber_id`, `client_id`
  - `service_ids: string[]`, `startISO`, `endISO`, `status: "booked"|"checked_in"|"complete"|"cancelled"|"no_show"`
  - `durationMin`, `bufferMinApplied`, `notes`
  - `paymentIntentId`, `prepay:boolean`, `tipValue`, `discounts:[{type:"manual"|"promo", amount:number, isPct:boolean, code?:string}]`
  - `createdAt`,`updatedAt`

- `waitlists/{waitlist_id}`

  - `shop_id`, `client_id`, `barber_id:null|id` (null = any)
  - `dateRange:{startISO,endISO}|null` OR `targetDateISO`
  - `timePrefs:{earliest:"HH:mm", latest:"HH:mm"}|null`
  - `state:"queued"|"offered"|"accepted"|"expired"|"withdrawn"`
  - `offer:{appointment_id?:string, expiresAtISO?:string}`
  - `requiresCard:true`, `notifiedVia:"sms"`
  - `createdAt`,`updatedAt`

- `transactions/{tx_id}`

  - `shop_id`, `appointment_id`, `barber_id`, `client_id`
  - `lineItems:[{label,qty,unitPrice,subtotal}]`, `discounts`, `tax`, `tip`, `total`, `paid:boolean`
  - `processor:"stripe"`, `mode:"shop"|"connect"`, `destinationAccountId?:string`
  - `createdAt`,`updatedAt`

- `promos/{promo_id}`

  - `shop_id`, `code`, `active`, `type:"percent"|"amount"`, `value`, `appliesTo:{service_ids?:string[]}`, `startsAtISO?`, `endsAtISO?`
  - `createdAt`,`updatedAt`

- `users/{global_user_id}` (global identity)

  - `email`, `phone`, `name`, `linkedShops:string[]` (shops they’ve interacted with), `default_shop_id`
  - `createdAt`,`updatedAt`

### Composite Indexes (examples)

- `appointments`: `shop_id + startISO` (query by day), `barber_id + startISO`
- `waitlists`: `shop_id + state`, `shop_id + barber_id + state`
- `transactions`: `shop_id + createdAt`, `barber_id + createdAt`
- `clients`: `shop_id + email`, `shop_id + phone`

## Security Rules

Do not implement security rules. We will add these later (post-MVP).

## Scheduling Engine

- **Baseline** weekly schedule per barber + **arbitrary overrides**: `OPEN_WINDOW`, `EXTEND_HOURS`, `CLOSE_DAY`, `BLOCK_SLOT`.
- **Buffers**: apply `service.defaultBufferMin` or `barber.buffersDefaultMin`; allow **client-specific service duration overrides**.
- **Slot generation**: server-side Function builds bookable slots for a barber/day considering services, buffers, overrides, and conflicts. Expose as `GET /slots?shop_id&barber_id&date`.
- **Time zone**: **always shop’s TZ** for all calculations and UI.

## Waitlist Logic

- Joining requires **card on file**.
- FIFO with **first right of refusal**. No auto-booking.
- Offer = SMS with accept/decline link; **expiry** = per-shop (default 60 min).
- On accept → create appointment (charge if required). On expire/decline → offer next in line.
- Cloud Task per offer handles TTL and cascading to next client.

## Payments (Stripe)

- **Option A (Shop payout)**: single merchant per shop; charges go to shop; barbers see their own revenue/tips in reports.
- **Option B (Connect)**: platform account with connected accounts; charges split to `destinationAccountId` for 1099 barbers; W-2 stays to shop.
- Shop selects default in onboarding; barber-level overrides allowed when workforce type is `mixed`.
- **Tipping**: presets 15/20/25, fixed $, and custom. Tip timing per config.
- **Discounts**: manual and promo codes; **checkout UI shows discounted total largest**, pre-discount smaller and clearly labeled.

## Seed & Fixtures

- Create sample `shop` with slug `blind-tiger`, workforce `mixed`, payoutMode `shop`.
- Two barbers with different schedules/prices and a few services.
- A few clients (one with preferred barber, one with client-specific duration override).
- A promo code `FIRSTCUT20` (20% off).

## Cloud Functions (generate stubs with mock data)

1. `generateSlots(shop_id, barber_id, date)` → returns bookable slots.
2. `createAppointment(payload)` → validates conflicts, applies buffers, creates doc, handles prepay intent if configured.
3. `joinWaitlist(shop_id, client_id, prefs)` → ensures card on file, enqueue FIFO.
4. `offerWaitlistSlot(waitlist_id, appointmentCandidate)` → creates offer, schedules expiration task.
5. `expireOffer(waitlist_id)` → if not accepted, moves to next.
6. `acceptOffer(waitlist_id)` → creates appointment, triggers payment if configured.
7. `chargeCancellationFee(appointment_id)` → per policy.
8. `sendReminder(appointment_id)` → per reminders schedule.
9. `stripeWebhook` → handle payment_intent events, tips, refunds.
10. `exportReport(reportType, params)` → generate CSV/PDF in tmp, provide download URL.

## Environment & Secrets

- `STRIPE_SECRET_KEY`
- `SMS_PROVIDER_API_KEY`

## Indexing & Performance

- Prebuild composite indexes listed above.
- Paginate list views (20/page).
- Use server-side Functions for slot generation and waitlist offers to keep widget fast.

## Features

### 1) Barber App (mobile-first web app)

**Navigation** tabs: `Today`, `Calendar`, `Queue` (if walk-ins), `Clients`, `POS`.

- **Today**: appointments list with quick actions (check-in, start, complete, no-show, rebook).
- **Calendar**: day view with **swipe across days**; side-by-side multi-barber board (toggle) to see all bookings for the shop.
- **Schedule Overrides**: **one-tap** actions + arbitrary time windows (open/close).
- **POS** (if decentralized or allowed): scan/lookup appointment → add discounts/promo → tip → pay.
- **Clients**: search, open profile, add notes/custom fields, set client-specific durations.

### 2) Client Booking Widget (iframe, frictionless)

Theming via querystring (`shop=<slug>`) and CSS variables.

**Flow**:

1. Select service → (optional) preferred barber (respect shop config; default to client’s preferred if any).
2. Show earliest available timeslot (calendar-first); **no recurring bookings**.
3. If no slots, offer **Join Waitlist** (requires card) with window (e.g., next 7 days).
4. Confirm → Pay (prepay or in-person per shop config).
5. Email receipt always.

**Screens**:

- `WidgetHome` (service picker)
- `WidgetCalendar` (timeslot choose)
- `WaitlistEnroll` (card check)
- `Checkout` (discount code, tip if prepay)
- `Confirmation`
- `MyWaitlists` (view/withdraw)

### 3) Owner/Manager Dashboard

- **Onboarding Wizard (one-time)**:

  - Walk-ins/appointments/both
  - Receptionist?
  - Workforce: W-2/1099/mixed → sets POS defaults (centralized for W-2, decentralized for 1099)
  - Payment processor + payout mode (Shop vs Connect)
  - Tipping timing (prepay vs in-person)
  - Cancellation/no-show rules
  - Reminder defaults
  - Branding (logo/colors/font), iframe embed snippet generator

- **Settings**: All above are editable here (no need to re-run wizard).

- **Services & Pricing**: define services; choose unified vs barber-specific pricing; enable barber overrides.

- **Promos**: create codes/campaigns.

- **Reports (must-have)**:

  - Revenue by barber
  - Total shop revenue
  - Tips breakdown
  - Client retention (new vs returning)
  - No-show rate
  - Utilization (booked time ÷ available time)
  - Export **CSV/PDF**, **aggregated only** (no PII in exports).

- **Staff**: Invite users, assign roles (owner, manager, barber, frontdesk).

- **Payouts**: Owner-only (bank accounts, Connect onboarding).

## Deployment

- Vercel: Next.js
- Firebase: Firestore & Functionsz

## Monorepo Architecture

Chalkfull is a monorepo with Yarn 2 workspaces consisting of 3 packages:

### Packages

1. **`web`** - Next.js 16.0.3 15 web application
   - Frontend UI with React 19, TypeScript, Tailwind CSS 4.1
   - Lightweight API routes and server actions

2. **`widget`** - Pure React 19 embeddable widget
   - Third party website can embed with widget with an HTML or JavaScript snippet

3. **`functions`** - Shared Firebase functions for long-running and database triggered server-side functions
   - Firestore database with comprehensive schema
   - Models for users, course invites, import progress
