# Grail Barbershop Booking & POS Platform: Comprehensive Codebase Exploration Guide

**Exploration Date:** December 3, 2025
**Repository:** `/Users/byrondover/code/workshop/grail`
**Git Branch:** main
**Status:** Monorepo scaffolding complete with page stubs and function skeletons

---

## Executive Summary

**Grail** is a **multi-tenant barbershop booking and point-of-sale (POS) platform** currently in the scaffolding phase. It's built as a Yarn 2 monorepo with three integrated packages: a Next.js web application for shop staff and owners, a Vite-based embeddable booking widget for customer websites, and Firebase Cloud Functions for backend logic.

This codebase represents the **architectural foundation** of a sophisticated SaaS product. While the UI shells are in place and the function exports are defined, the **core business logic implementations are stubs** (TODOs remain in critical functions like `generateSlots`, `stripeWebhook`, and appointment creation). This is intentional—the scaffolding provides a clear roadmap for rapid feature development.

### Key Observations

1. **Architecture is production-ready**: Proper monorepo structure, TypeScript strict mode, Radix UI for accessibility, Firebase for scalability
2. **Business logic is stubbed**: Core functions (slot generation, payments, waitlist) have skeleton code with TODO markers
3. **UI is placeholder-heavy**: All pages display "will be displayed here" placeholders—ready for component implementation
4. **Multi-tenancy is built-in**: All Firestore queries designed with `shop_id` scoping from the start
5. **Type safety is enforced**: Shared `firestore-types.ts` between web and functions ensures consistency

---

## Architecture Overview

### System Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      GRAIL PLATFORM                              │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  CLIENT LAYER                                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  [Web App @ localhost:3000]          [Widget @ localhost:5173]  │
│  Next.js 16 (Server-side Rendered)   Vite + React Library       │
│  - Barber UI (Today, Calendar, etc)  - Embeddable iframe/script │
│  - Owner Dashboard (Reports, Config) - Customer booking flow    │
│  - Radix UI + Tailwind CSS           - Auto-mount + Programmatic│
│                                                                   │
│  Auth: Firebase Client SDK (localhost:9099 emulator)             │
│  State: RxJS streams + React hooks                               │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                    (HTTP/Firestore API)
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  BACKEND LAYER                                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Firebase Cloud Functions (@grail/functions)                    │
│  ├── scheduling/                                                │
│  │   ├── generateSlots (scheduled daily, slot generation)      │
│  │   └── createAppointment (callable, booking logic)           │
│  ├── waitlist/                                                  │
│  │   ├── joinWaitlist (callable, FIFO queue)                   │
│  │   ├── offerWaitlistSlot (offer creation)                    │
│  │   ├── expireOffer (TTL management)                          │
│  │   └── acceptOffer (conversion to appointment)               │
│  ├── payments/                                                  │
│  │   ├── stripeWebhook (payment event handling)                │
│  │   └── chargeCancellationFee (policy enforcement)            │
│  ├── notifications/                                             │
│  │   └── sendReminder (SMS/email via scheduled tasks)          │
│  └── reports/                                                   │
│      └── exportReport (CSV/PDF generation)                      │
│                                                                   │
│  Admin SDK: firebase-admin 12.6.0 (elevated privileges)         │
│  External integrations: Stripe 17.5.0 for payments             │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  DATA LAYER                                                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Firestore (localhost:8080 emulator in dev)                     │
│  ├── shops/                  (shop configuration & settings)    │
│  ├── staff/                  (barbers, receptionists)           │
│  ├── services/               (service catalog)                  │
│  ├── appointments/           (bookings with status)             │
│  ├── waitlists/              (FIFO queue with offer logic)      │
│  ├── clients/                (customer records)                 │
│  ├── transactions/           (payment records)                  │
│  ├── promos/                 (discount codes)                   │
│  └── users/                  (global user identity)             │
│                                                                   │
│  Architecture: Flattened collections (not nested) for           │
│  multi-tenancy performance. All queries MUST filter by shop_id. │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Technology Stack by Layer

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| **Frontend Framework** | Next.js | 16.0.3 | Server-side rendering, App Router (file-based routes) |
| **UI Library** | React | 19.2.0 | Component rendering |
| **Component Primitives** | Radix UI | 3.1.3 | Accessible, unstyled building blocks |
| **Styling** | Tailwind CSS | 4.1.17 | Utility-first CSS framework |
| **Icons** | @radix-ui/react-icons | 1.3.2 | Consistent icon set |
| **Widget Bundler** | Vite | 6.4.1 | Fast build, tree-shaking for library output |
| **Backend (Realtime DB)** | Firebase Firestore | (via SDK) | NoSQL document store, real-time subscriptions |
| **Authentication** | Firebase Auth | (via SDK) | User identity, token management |
| **Cloud Functions** | Firebase Functions | v2 API | Serverless compute, scheduled tasks, callable endpoints |
| **Admin SDK** | firebase-admin | 12.6.0 | Server-side database access with elevated privileges |
| **Reactive State** | RxJS | 7.8.2 | Observable streams, timers, multi-tenant sessions |
| **Payments** | Stripe | 17.5.0 | Payment processing, webhook handling |
| **Language** | TypeScript | 5.7.0 | Strict type safety across all packages |
| **Package Manager** | Yarn | 4.11.0 | Monorepo workspace management |

---

## Monorepo Structure & Package Organization

### Directory Tree

```
grail/ (root monorepo)
├── .claude/
│   ├── CLAUDE.md                          # Project instructions (read first)
│   ├── context/
│   │   ├── grail-product-spec.md          # Business requirements & use cases
│   │   ├── product-requirements.md        # MVP acceptance criteria
│   │   └── technical-implementation.md    # Data model, APIs, infrastructure
│   ├── guidelines/
│   │   ├── coding-best-practices.md       # RxJS, TypeScript conventions
│   │   └── design-principles.md           # S-Tier SaaS dashboard design
│   ├── commands/
│   ├── agents/
│   └── explorations/                      # (You are here)
│       └── 2025-12-03-grail-codebase-exploration-comprehensive-guide.md
│
├── packages/
│   ├── web/                              # Next.js web application
│   │   ├── app/                          # App Router pages (file-based routing)
│   │   │   ├── (barber)/                 # Route group for barber-facing pages
│   │   │   │   ├── today/page.tsx        # Today's schedule view
│   │   │   │   ├── calendar/page.tsx     # Calendar & availability management
│   │   │   │   ├── clients/page.tsx      # Client profiles & history
│   │   │   │   └── pos/page.tsx          # Point of sale checkout interface
│   │   │   ├── (owner)/                  # Route group for owner-facing pages
│   │   │   │   ├── dashboard/page.tsx    # Shop performance overview
│   │   │   │   ├── settings/page.tsx     # Shop configuration & onboarding
│   │   │   │   └── reports/page.tsx      # Analytics & exports
│   │   │   ├── layout.tsx                # Root layout with Theme provider
│   │   │   └── page.tsx                  # Home page (navigation hub)
│   │   ├── lib/
│   │   │   ├── firebase.ts               # Firebase client SDK initialization
│   │   │   └── firestore-types.ts        # TypeScript interfaces for Firestore docs
│   │   ├── middleware.ts                 # Auth stub (checks for auth-token cookie)
│   │   ├── globals.css                   # Tailwind imports + CSS variables
│   │   ├── tailwind.config.ts            # Tailwind configuration
│   │   ├── tsconfig.json                 # TypeScript config (extends base)
│   │   ├── next.config.ts                # Next.js config (static export mode)
│   │   ├── package.json                  # Dependencies: React, Radix UI, Firebase
│   │   └── .env.example                  # Firebase client config template
│   │
│   ├── widget/                           # Vite-based embeddable booking widget
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── WidgetHome.tsx        # Service & option selection screen
│   │   │   │   ├── WidgetCalendar.tsx    # Date/time picker for booking
│   │   │   │   ├── WaitlistEnroll.tsx    # Join waitlist form (requires card)
│   │   │   │   ├── Checkout.tsx          # Payment & discount code entry
│   │   │   │   └── Confirmation.tsx      # Booking confirmation screen
│   │   │   ├── styles/
│   │   │   │   └── widget.css            # Widget-specific styling
│   │   │   ├── Widget.tsx                # Main widget component (state management)
│   │   │   └── index.tsx                 # Entry point with auto-mount logic
│   │   ├── vite.config.ts                # Vite library build config
│   │   ├── tsconfig.json                 # React-specific TS config
│   │   ├── package.json                  # Dependencies: Radix UI, Firebase
│   │   └── public/                       # Dev examples and embed snippets
│   │
│   └── functions/                        # Firebase Cloud Functions
│       ├── src/
│       │   ├── scheduling/
│       │   │   ├── generateSlots.ts      # Scheduled function (daily slot generation)
│       │   │   └── createAppointment.ts  # Callable function (booking creation)
│       │   ├── waitlist/
│       │   │   ├── joinWaitlist.ts       # Callable (client joins FIFO queue)
│       │   │   ├── offerWaitlistSlot.ts  # Internal (create offer, schedule expiry)
│       │   │   ├── expireOffer.ts        # Scheduled (TTL management)
│       │   │   └── acceptOffer.ts        # Callable (convert offer to appointment)
│       │   ├── payments/
│       │   │   ├── stripeWebhook.ts      # HTTP endpoint (Stripe event handling)
│       │   │   └── chargeCancellationFee.ts # Callable (policy-based fees)
│       │   ├── notifications/
│       │   │   └── sendReminder.ts       # Scheduled (SMS/email reminders)
│       │   ├── reports/
│       │   │   └── exportReport.ts       # Callable (CSV/PDF generation)
│       │   ├── shared/
│       │   │   ├── firestore-types.ts    # Identical copy to web/lib/firestore-types.ts
│       │   │   └── timezone-utils.ts     # Server-side timezone helpers
│       │   └── index.ts                  # Exports all functions to Firebase
│       ├── tsconfig.json                 # CommonJS output, Node 22 target
│       ├── package.json                  # Dependencies: firebase-admin, Stripe
│       └── .env.example                  # Stripe keys template
│
├── firestore.rules                       # Firestore security rules (stubs, no-op for now)
├── firestore.indexes.json                # Composite indexes for efficient queries
├── firebase.json                         # Firebase CLI configuration
├── tsconfig.base.json                    # Root TypeScript base config
├── package.json                          # Root workspace config
├── README.md                             # Setup and development instructions
└── .gitignore                            # Standard Node.js + Firebase ignores

```

### Workspace Organization

**Root package.json** (`/Users/byrondover/code/workshop/grail/package.json`)
```json
{
  "name": "grail-monorepo",
  "workspaces": ["packages/web", "packages/widget", "packages/functions"],
  "scripts": {
    "dev": "yarn workspace @grail/web dev",
    "build": "yarn workspaces foreach -A run build",
    "typecheck": "yarn workspaces foreach -A run typecheck",
    "lint": "yarn workspaces foreach -A run lint",
    "clean": "yarn workspaces foreach -A run clean && rm -rf node_modules"
  }
}
```

**Scoped Package Names:**
- `@grail/web` - Web application
- `@grail/widget` - Booking widget library
- `@grail/functions` - Cloud Functions

---

## Database Schema Overview & Hierarchy

### Core Entity Relationships

The Firestore schema uses **flattened collections** with `shop_id` fields (rather than nested subcollections) for better query performance and multi-tenancy isolation.

```
HIERARCHICAL DATA RELATIONSHIPS:
(Multi-tenant partitioned by shop_id)

┌─────────────────────┐
│    Global Users     │
│   (Auth Identity)   │
├─────────────────────┤
│ id (Firebase UID)   │
│ email               │
│ phone               │
│ name                │
│ linked_shops[]      │
└──────────┬──────────┘
           │
           ├──────────────┬──────────────┬──────────────┐
           ↓              ↓              ↓              ↓
      ┌─────────┐   ┌─────────┐   ┌──────────┐   ┌──────────┐
      │  Shop   │   │  Shop   │   │  Shop    │   │  Shop    │
      │(Tenant) │   │(Tenant) │   │ (Tenant) │   │(Tenant)  │
      └────┬────┘   └────┬────┘   └────┬─────┘   └────┬─────┘
           │             │             │              │
    ┌──────┴──────┐     ...          ...             ...
    │ (shop_id)   │
    │             │
    ├─ Staff (n)  │──── Barbers
    │  - Role     │
    │  - Services │
    │  - Schedule │
    │
    ├─ Services (n)
    │  - Duration
    │  - Price
    │
    ├─ Clients (n)
    │  - Email
    │  - Preferred Barber
    │  - Payment Method on File
    │
    ├─ Appointments (n)
    │  - barber_id → links to Staff
    │  - client_id → links to Clients
    │  - service_id → links to Services
    │  - Status: scheduled|confirmed|in_progress|completed|cancelled|no_show
    │
    ├─ Waitlists (n)
    │  - client_id → links to Clients
    │  - service_id (optional barber_id)
    │  - State: waiting|offered|accepted|expired|cancelled
    │  - Offer expiry logic (TTL via Cloud Tasks)
    │
    ├─ Transactions (n)
    │  - appointment_id (optional)
    │  - barber_id, client_id
    │  - Stripe payment_intent_id
    │  - Processor: stripe
    │  - Mode: shop|connect (for split payouts)
    │
    └─ Promos (n)
       - Code
       - Value (% or $)
       - Validity window
```

### Collection Reference Table

| Collection | Purpose | Key Fields | Scoping |
|-----------|---------|-----------|---------|
| `users` | Global user identity (cross-shop) | id, email, phone, name, linked_shops[] | Global (no shop_id) |
| `shops` | Tenant root document | id, name, slug, timezone, settings, branding | Global (but acts as tenant root) |
| `staff` | Barbers and other shop staff | id, shop_id, user_id, role, name, email, active | shop_id (multi-tenant) |
| `services` | Service catalog (cuts, shaves, etc) | id, shop_id, name, duration_minutes, price, active | shop_id |
| `clients` | Customer records | id, email, name, phone, preferred_barber_id | shop_id |
| `appointments` | Bookings | id, shop_id, barber_id, client_id, service_id, start_time, end_time, status | shop_id |
| `waitlists` | FIFO queue for walk-ins/overbooked | id, shop_id, client_id, service_id, status, requested_at | shop_id |
| `transactions` | Payment records | id, shop_id, appointment_id, barber_id, client_id, amount, stripe_payment_intent_id | shop_id |
| `promos` | Discount codes | id, shop_id, code, type (percent\|amount), value, active | shop_id |

### TypeScript Interfaces

Located in two identical copies (for type safety between client and server):
- **Web:** `/Users/byrondover/code/workshop/grail/packages/web/lib/firestore-types.ts`
- **Functions:** `/Users/byrondover/code/workshop/grail/packages/functions/src/shared/firestore-types.ts`

Core interfaces include:
```typescript
Shop, ShopSettings, OpeningHours
Staff, Service
Appointment (with status enum)
Waitlist (with state enum)
Client
Availability, TimeSlot
Payment
```

---

## Key Files & Their Purposes

### Web Package

**Entry Points & Layout**

- **`/packages/web/app/layout.tsx`** - Root layout wrapping entire app with Radix Theme provider. Sets up dark mode support and Tailwind. All pages rendered within.
- **`/packages/web/app/page.tsx`** - Home page with navigation to barber and owner dashboards. Acts as hub.
- **`/packages/web/middleware.ts`** - Auth stub checking for `auth-token` cookie. Currently logs warnings on protected routes. TODO: Implement Firebase token verification.

**Barber-Facing Pages** (Route group: `(barber)/`)

- **`/packages/web/app/(barber)/today/page.tsx`** - Today's appointment list. Placeholder for appointment cards, quick actions (check-in, start, complete, no-show).
- **`/packages/web/app/(barber)/calendar/page.tsx`** - Calendar view with day/week swipe navigation. TODO: Integration with Firestore availability queries.
- **`/packages/web/app/(barber)/clients/page.tsx`** - Client directory search and profile management. TODO: List, filter, and detailed view.
- **`/packages/web/app/(barber)/pos/page.tsx`** - Point-of-sale checkout interface. TODO: Appointment lookup, discount/promo code entry, tip options, payment integration.

**Owner-Facing Pages** (Route group: `(owner)/`)

- **`/packages/web/app/(owner)/dashboard/page.tsx`** - Shop performance overview (revenue, bookings, utilization). TODO: Real-time Firestore aggregation.
- **`/packages/web/app/(owner)/settings/page.tsx`** - Onboarding wizard and configuration. TODO: Form UI for booking mode (appointments/walk-ins/hybrid), receptionist toggle, workforce type, payment settings, branding.
- **`/packages/web/app/(owner)/reports/page.tsx`** - Analytics and CSV/PDF exports. TODO: Revenue by barber, tips breakdown, client retention, no-show rate, utilization metrics.

**Utilities & Configuration**

- **`/packages/web/lib/firebase.ts`** - Firebase Client SDK initialization. Auto-detects development environment and connects to emulators (Auth: :9099, Firestore: :8080). Exports singleton `app`, `auth`, `firestore` instances for use throughout the app.
- **`/packages/web/lib/firestore-types.ts`** - TypeScript interfaces for all Firestore documents. Ensures type safety when reading/writing. Identical to functions version.
- **`/packages/web/tailwind.config.ts`** - Tailwind CSS configuration.
- **`/packages/web/next.config.ts`** - Next.js config: static export mode (for Firebase Hosting), no server runtime needed, routes typed via `typedRoutes: true`.
- **`/packages/web/globals.css`** - Imports Tailwind, defines CSS custom properties for dark mode (--background, --foreground).

### Widget Package

**Core Components**

- **`/packages/widget/src/Widget.tsx`** - Main widget component. Manages view state (home → calendar → waitlist → checkout → confirmation). Routes between component screens based on `currentView`.
- **`/packages/widget/src/index.tsx`** - Entry point. Exports `mountWidget()` function for programmatic mounting. Also implements auto-mount detection: scans DOM for `[data-grail-widget]` attributes and mounts automatically.

**Widget Screens** (Components)

- **`/packages/widget/src/components/WidgetHome.tsx`** - Initial screen. Buttons: "View Available Times" (→ calendar) and "Join Waitlist".
- **`/packages/widget/src/components/WidgetCalendar.tsx`** - Date/time picker. TODO: Fetch shop availability from Cloud Function, display slots, handle selection.
- **`/packages/widget/src/components/WaitlistEnroll.tsx`** - Waitlist enrollment form. TODO: Card validation (Stripe tokenization), SMS notification opt-in.
- **`/packages/widget/src/components/Checkout.tsx`** - Discount code input, tip presets (15/20/25% + custom), prepay payment. TODO: Stripe integration.
- **`/packages/widget/src/components/Confirmation.tsx`** - Success screen with appointment details, email receipt.

**Configuration & Build**

- **`/packages/widget/vite.config.ts`** - Builds to two formats: ES module (`grail-widget.js`) and UMD (`grail-widget.umd.cjs`). External deps: React, React-DOM (provided by host).
- **`/packages/widget/src/styles/widget.css`** - Widget-specific styles (scoped to `.grail-widget` container).

### Functions Package

**Core Functions**

- **`/packages/functions/src/index.ts`** - Exports all functions to Firebase. Re-exports from subfolders.

**Scheduling**

- **`/packages/functions/src/scheduling/generateSlots.ts`** - Scheduled function (daily at midnight). TODO: Iterate shops, fetch barber baseline schedules + overrides, generate time slots, write to Firestore.
- **`/packages/functions/src/scheduling/createAppointment.ts`** - Callable function (triggered by widget/web booking). TODO: Validate conflicts, apply buffers, create appointment doc, handle prepay if configured.

**Waitlist**

- **`/packages/functions/src/waitlist/joinWaitlist.ts`** - Callable function. Adds client to Firestore waitlist collection with `status: 'waiting'`. TODO: Verify card on file, enqueue FIFO.
- **`/packages/functions/src/waitlist/offerWaitlistSlot.ts`** - Internal function. Creates offer record, schedules TTL via Cloud Tasks. TODO: Send SMS with acceptance link.
- **`/packages/functions/src/waitlist/expireOffer.ts`** - Scheduled via Cloud Tasks. Moves offer to expired, notifies next in queue.
- **`/packages/functions/src/waitlist/acceptOffer.ts`** - Callable function. Converts waitlist entry to appointment, charges deposit if configured.

**Payments**

- **`/packages/functions/src/payments/stripeWebhook.ts`** - HTTP endpoint for Stripe webhooks. Verifies signature, logs events. TODO: Handle `payment_intent.succeeded`, `payment_intent.payment_failed`, refunds.
- **`/packages/functions/src/payments/chargeCancellationFee.ts`** - Callable function. Charges client based on cancellation policy (50% late cancel, 100% no-show). TODO: Stripe integration.

**Notifications**

- **`/packages/functions/src/notifications/sendReminder.ts`** - Scheduled function (per shop reminder schedule). TODO: SMS/email via Twilio/SendGrid.

**Reports**

- **`/packages/functions/src/reports/exportReport.ts`** - Callable function. TODO: Aggregate shop metrics (revenue by barber, tips, client retention, no-show rate, utilization), generate CSV/PDF.

**Shared**

- **`/packages/functions/src/shared/firestore-types.ts`** - Identical to web version. Core interfaces for type safety.
- **`/packages/functions/src/shared/timezone-utils.ts`** - Server-side timezone helpers. TODO: Convert ISO dates to shop timezone for slot generation and reporting.

### Configuration Files

- **`/Users/byrondover/code/workshop/grail/firebase.json`** - Firebase CLI config. Defines Firestore rules/indexes path, Functions codebase, Hosting public dir (packages/web/out), and emulator ports.
- **`/Users/byrondover/code/workshop/grail/tsconfig.base.json`** - Shared TypeScript configuration. ES2022 target, strict mode, path aliases (inherited by packages).
- **`/Users/byrondover/code/workshop/grail/.claude/CLAUDE.md`** - Project instructions and best practices (READ FIRST).

---

## Authentication & Authorization Flow

### Current State: Stub Implementation

The authentication flow is currently **stubbed** for development:

```
User Action
    ↓
[Middleware.ts]
- Checks for 'auth-token' cookie
- If protected route + no cookie → logs warning
- Currently just continues (no blocking)
    ↓
[Firebase Client SDK (web/lib/firebase.ts)]
- Initialized once
- Connected to emulator (localhost:9099 in dev)
- Ready for Firebase Auth methods
    ↓
[Future Implementation Points]
- Login page (not yet created)
- Firebase signInWithEmail/Password or OAuth
- Set auth-token cookie
- Verify token in middleware
- Role-based access control (owner vs barber)
```

### Key Implementation Details

1. **Firebase Client SDK** (`packages/web/lib/firebase.ts`)
   - Auto-detects development and connects to auth emulator
   - Exports singleton `auth` instance
   - Ready for `signInWithEmailAndPassword()`, `createUserWithEmailAndPassword()`, etc.

2. **Middleware** (`packages/web/middleware.ts`)
   - Checks for `auth-token` cookie on protected routes
   - Currently logs warnings but allows access (stub)
   - TODO: Verify Firebase auth token, implement role-based route protection

3. **Protected Routes**
   - Defined in middleware: `/today`, `/calendar`, `/clients`, `/pos`, `/dashboard`, `/settings`, `/reports`
   - All barber and owner pages should require authentication

4. **Multi-Tenancy & Role Context**
   - User document in Firestore tracks `linked_shops[]` and `default_shop_id`
   - `shop_id` derived from URL query param or user's default
   - Barber vs Owner determined by role in `staff` collection

---

## Development Workflow & Commands

### Installation & Setup

```bash
# 1. Install Node.js 22+
nvm use

# 2. Install dependencies (all workspaces)
yarn install

# 3. Configure environment
cp packages/web/.env.example packages/web/.env.local
cp packages/functions/.env.example packages/functions/.env

# 4. Add Firebase config and Stripe keys
# Edit .env.local and .env with your credentials
```

### Running Services

```bash
# Terminal 1: Start Next.js web app (port 3000)
yarn workspace @grail/web dev

# Terminal 2: Start Vite widget dev server (port 5173)
yarn workspace @grail/widget dev

# Terminal 3: Start Firebase emulators (ports 5001, 8080, 9099, 4000)
firebase emulators:start

# Terminal 4 (optional): Tail logs
tail -f api.log  # Firebase Functions logs
tail -f ui.log   # Next.js logs
```

### Build & Test Commands

```bash
# Build all packages
yarn build

# Type check all packages
yarn typecheck

# Build individual packages
yarn workspace @grail/web build
yarn workspace @grail/widget build
yarn workspace @grail/functions build

# Preview widget build
yarn workspace @grail/widget preview
```

### Firebase Deployment

```bash
# Deploy Functions
firebase deploy --only functions

# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy indexes
firebase deploy --only firestore:indexes

# Deploy everything
firebase deploy
```

---

## Current Implementation Status

### What's Built

1. **Project Structure** ✓
   - Yarn 2 monorepo with three packages
   - TypeScript strict mode enabled across all packages
   - Proper configuration files (tsconfig, next.config, vite.config, firebase.json)

2. **Page Scaffolding** ✓
   - All routes in place (Today, Calendar, Clients, POS, Dashboard, Settings, Reports)
   - Route groups organized by role ((barber) and (owner))
   - Home page with navigation hub
   - Middleware stub for auth

3. **UI Components** ✓
   - Radix UI Theme provider configured
   - Tailwind CSS integrated
   - All page shells using Radix components (Container, Heading, Box, Card, Button, Flex)
   - Widget component structure (5 screens) in place

4. **Function Exports** ✓
   - All 10 planned Cloud Functions exported from index.ts
   - Firebase Admin SDK initialized
   - RxJS available for reactive state

5. **TypeScript Definitions** ✓
   - Comprehensive Firestore types (Shop, Staff, Service, Appointment, Waitlist, Client, Payment, etc.)
   - Shared types between web and functions
   - Strict mode enforced

6. **Firebase Integration** ✓
   - Client SDK initialized with emulator support
   - Admin SDK ready in functions
   - Emulator configuration in place

### What's Stubbed (TODO)

1. **Booking Logic** ⚠️
   - `generateSlots` - Empty; needs slot generation algorithm
   - `createAppointment` - Empty; needs conflict detection, buffer application
   - `WidgetCalendar` - Placeholder; needs Firestore queries for availability

2. **Waitlist Logic** ⚠️
   - `joinWaitlist` - Basic structure; needs Stripe card validation, FIFO enqueuing
   - `offerWaitlistSlot` - Empty; needs SMS sending, Cloud Tasks scheduling
   - `expireOffer` & `acceptOffer` - Basic structure; need business logic

3. **Payments** ⚠️
   - `stripeWebhook` - Stub; has switch statement but no actual event handling
   - `chargeCancellationFee` - Empty; needs Stripe charge creation
   - `Checkout` component - Placeholder; needs Stripe Elements/Tokenization

4. **Notifications** ⚠️
   - `sendReminder` - Empty; needs SMS/email provider integration

5. **Reports** ⚠️
   - `exportReport` - Empty; needs aggregation logic and CSV/PDF generation
   - `ReportsPage` - Placeholder; needs tables, charts, export buttons

6. **Dashboard & Analytics** ⚠️
   - `DashboardPage` - Placeholder; needs real-time metric aggregation
   - `TodayPage` - Placeholder; needs appointment list with Firestore subscriptions
   - `CalendarPage` - Placeholder; needs interactive calendar with drag-drop availability overrides

7. **POS Interface** ⚠️
   - `POSPage` - Placeholder; needs appointment search, discount/promo entry, tip calculator
   - `Checkout` widget - Placeholder; needs payment flow

8. **Client Management** ⚠️
   - `ClientsPage` - Placeholder; needs search, profile view, notes

9. **Authentication** ⚠️
   - No login page
   - Auth cookie handling is stub-level
   - No role-based access control enforced

10. **Firestore Security** ⚠️
    - `firestore.rules` exists but is empty/stub
    - TODO: Implement rules enforcing shop_id scoping, role-based access

---

## Architecture Patterns & Best Practices Observed

### 1. Multi-Tenancy via shop_id Scoping

**Pattern:** Every Firestore collection (except users) has a `shop_id` field. All queries MUST filter by shop_id first.

**Example** (from CLAUDE.md):
```typescript
const appointments = await db
  .collection('appointments')
  .where('shop_id', '==', shopId)
  .where('startISO', '>=', startDate)
  .get();
```

**Why:** Prevents cross-tenant data leaks, simplifies indexing, better query performance than nested collections.

### 2. Firebase Configuration with Emulator Detection

**Pattern:** Single Firebase initialization that auto-detects development and connects to emulators.

**Located in:** `packages/web/lib/firebase.ts` and functions code

**Key benefit:** No need to switch configurations; same code runs locally and in production.

### 3. Shared Types Between Client and Server

**Pattern:** Identical `firestore-types.ts` in both web and functions packages.

**Files:**
- Web: `packages/web/lib/firestore-types.ts`
- Functions: `packages/functions/src/shared/firestore-types.ts`

**Why:** Ensures type consistency; prevents mismatches between what client writes and what functions expect.

### 4. Route Groups for Role-Based Organization

**Pattern:** Next.js route groups `(barber)` and `(owner)` organize pages by role without affecting URL structure.

**URLs:**
- `/today`, `/calendar`, `/clients`, `/pos` (no `(barber)` in URL)
- `/dashboard`, `/settings`, `/reports` (no `(owner)` in URL)

**Why:** Clean separation of concerns, easy to implement role-based middleware, no URL pollution.

### 5. Component-First UI with Radix UI Primitives

**Pattern:** Use Radix UI unstyled, accessible primitives (Button, Card, Box, Flex, etc.) and style with Tailwind.

**Observed in:** All pages, widget components

**Benefits:** Accessibility built-in (ARIA labels, focus management), fully customizable, smaller bundle.

### 6. RxJS for Reactive State (Principle, Not Yet Implemented)

**Pattern:** From CLAUDE.md: Prefer RxJS `timer()` over `setTimeout()`.

**When implemented:** Will use for:
- Waitlist offer countdown timers
- Real-time appointment updates
- Multi-tenant session management

**Current state:** RxJS imported but not yet used in components.

### 7. Callable vs Scheduled vs HTTP Functions

**Patterns observed in functions:**

| Trigger | Use Case | Example |
|---------|----------|---------|
| `onCall` | Client-invoked, requires auth | `joinWaitlist`, `acceptOffer`, `createAppointment` |
| `onSchedule` | Recurring tasks | `generateSlots` (daily), `sendReminder` (per-shop schedule) |
| `onRequest` (HTTP) | Webhooks, external APIs | `stripeWebhook`, report exports |

---

## Widget Embedding & Integration

### How the Widget Works

The widget is a **standalone React library** built with Vite. It exports two things:

1. **Auto-mount:** Add HTML to page, include script, widget mounts automatically
   ```html
   <div data-grail-widget data-shop-slug="blind-tiger"></div>
   <script src="https://cdn.grail.com/grail-widget.umd.cjs"></script>
   ```

2. **Programmatic:** Import and call `mountWidget()` in your app
   ```javascript
   import { mountWidget } from '@grail/widget';
   mountWidget({
     shopSlug: 'blind-tiger',
     container: '#my-widget-container'
   });
   ```

### Build Output

- **ES Module:** `dist/grail-widget.js` - For bundlers
- **UMD:** `dist/grail-widget.umd.cjs` - For `<script>` tags
- **TypeScript Definitions:** `dist/index.d.ts`

### Component Hierarchy

```
<Widget>
  ├─ <WidgetHome>          (service selection)
  │  └─ "View Available Times" → navigate to calendar
  │  └─ "Join Waitlist" → navigate to waitlist
  ├─ <WidgetCalendar>      (date/time picker)
  │  └─ Selects date → navigate to checkout
  ├─ <WaitlistEnroll>      (card info for waitlist)
  │  └─ Card validation → navigate to checkout
  ├─ <Checkout>            (discount, tip, payment)
  │  └─ Review & pay → navigate to confirmation
  └─ <Confirmation>        (success screen)
     └─ Email receipt sent
```

---

## Git History & Development Context

### Recent Commits

```
74e5d7e Set up Yarn monorepo          (Nov 19, 21:24)
50eb4cb Add technical implementation (Nov 19, 21:26)
a741c1e add product requirements      (Nov 19, 21:26)
442c5c3 first commit                 (Nov 19, 21:26)
```

### Branch Status

- **Current:** `main`
- **Remote:** `remotes/origin/main`
- **Status:** All changes committed, working directory clean

### Development Focus

The recent commits show the project in **scaffolding phase**:
1. First commit: Initial monorepo setup
2. Product requirements documented
3. Technical implementation specs added
4. Yarn monorepo formalized

**Next phase:** Implement stubs, starting with core booking and waitlist logic.

---

## Configuration & Environment Setup

### Firebase Emulator Configuration

Located in `firebase.json`:

```json
{
  "emulators": {
    "auth": { "port": 9099 },
    "functions": { "port": 5001 },
    "firestore": { "port": 8080 },
    "hosting": { "port": 5000 },
    "ui": { "enabled": true, "port": 4000 }
  }
}
```

**Start emulators:**
```bash
firebase emulators:start
```

Then visit http://localhost:4000 for the Emulator UI (view data, logs, etc).

### Environment Variables

**Web App** (`packages/web/.env.local`):
```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

**Functions** (`packages/functions/.env`):
```
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
SMS_PROVIDER_API_KEY=...  (optional, for Twilio/similar)
```

### TypeScript Configuration

**Root:** `tsconfig.base.json`
- Target: ES2022
- Module: ESNext
- Strict mode enabled
- Path aliases available for packages

**Per-package overrides:**
- Web: Adds Next.js types, `jsx: 'preserve'`
- Widget: `jsx: 'react-jsx'`, `module: esnext`
- Functions: `module: 'commonjs'`, `target: 'es2020'`

---

## Code Quality & Standards

### TypeScript Enforcement

- **Strict mode:** Enabled globally
- **No `any`:** Strict typing enforced; use `unknown` with type guards
- **Unused code:** `noUnusedLocals` and `noUnusedParameters` enabled
- **Type definitions:** Firestore types defined centrally in `firestore-types.ts`

### File Naming Conventions

- **Components:** PascalCase (`WidgetHome.tsx`, `Checkout.tsx`)
- **Utilities:** camelCase (`firebase.ts`, `timezone-utils.ts`)
- **Config:** kebab-case (`next.config.ts`, `tailwind.config.ts`)

### Import Order

1. External deps (React, Next.js, Firebase)
2. Radix UI components
3. Local components
4. Utilities and types
5. Styles

### Component Structure

All page components follow a simple pattern:
```typescript
import { Container, Heading, Text, Box, Card } from '@radix-ui/themes';

export default function PageName() {
  return (
    <Container size="4" p="4">
      <Box mb="4">
        <Heading size="8">Title</Heading>
        <Text size="3" color="gray">Description</Text>
      </Box>
      <Card>
        <Text size="3" color="gray">Content placeholder</Text>
      </Card>
    </Container>
  );
}
```

---

## Key Development Insights & Recommendations

### 1. Start with Core Booking Logic

**Priority:** Implement `generateSlots` and `createAppointment` first. These are blocking for all user flows.

**Why:** Every other feature (widget calendar, today's schedule, reports) depends on having appointments in Firestore.

**Effort estimate:** 1-2 days for basic logic, then iterate.

### 2. Implement Firestore Security Rules Early

**Status:** Currently stubbed (no real rules).

**Why:** Without rules, cross-tenant data leaks are possible. Even in development, enforce shop_id scoping.

**Key rules:**
- Client can only read their own user doc
- Can only read/write appointments for shops they're associated with
- Admin SDK (functions) has full access

### 3. Use Firestore Emulator for Fast Development

**Benefits:**
- No cloud costs during development
- Full data inspection via Emulator UI
- Fast feedback loop
- Easy to seed test data

### 4. Prioritize Widget Checkout Flow

**MVP:** Get the widget through a complete booking flow (home → calendar → checkout → confirmation).

**Why:** This demonstrates end-to-end functionality and is your primary customer interaction point.

### 5. Implement Role-Based Access Control in Middleware

**Current:** Auth is stubbed.

**Next:** Verify Firebase token, load user role from Firestore, protect routes based on role.

**Pseudocode:**
```typescript
// In middleware:
1. Extract Firebase ID token from cookie
2. Call Firebase Admin SDK to verify token
3. Load user's role (owner/barber/receptionist) from staff collection
4. Set role in request headers for components to access
5. Redirect to login if token invalid
```

### 6. Build Dashboard with Real-Time Subscriptions

**Pattern to use:** RxJS observables with Firestore listeners.

**Pseudocode:**
```typescript
// In React component:
const [revenue$] = useState(() =>
  firestore
    .collection('transactions')
    .where('shop_id', '==', shopId)
    .where('createdAt', '>=', startOfMonth)
    .onSnapshot(snapshot => {
      // Calculate revenue
      // Emit value via observable
    })
);

// Subscribe in useEffect
```

### 7. Plan Stripe Integration Carefully

**Points of integration:**
1. Widget checkout: `stripe.confirmPayment()` or `confirmCardPayment()`
2. Webhook: `stripeWebhook` function handles events
3. Payout mode: shop account or connect accounts for barbers

**Recommendation:** Start with simple shop-account mode (all funds to shop), add barber payouts later.

### 8. Seed Development Data Early

**Why:** Makes UI development faster; easier to test features without manual data creation.

**Where:** Create a seeding function or Firestore import in emulator UI.

**Sample data needed:**
- 1-2 test shops
- 3-4 barbers per shop
- 5-10 services
- Sample clients
- Appointments across different statuses

---

## Styling & Design System

### Tailwind CSS Configuration

- Integrated via `@import 'tailwindcss'` in `globals.css`
- Utility-first approach for all styling
- Custom CSS properties for theming

### Radix UI Theme Provider

All pages wrapped in `<Theme>` provider with:
- `accentColor: "blue"` - Primary brand color
- `grayColor: "slate"` - Neutral palette
- `radius: "medium"` - Border radius scale
- `scaling: "100%"` (web) and `"95%"` (widget) - Responsive sizing

### CSS Custom Properties

Defined in `globals.css`:
```css
:root {
  --background: #ffffff;
  --foreground: #0a0a0a;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

---

## Common Gotchas & Important Notes

### 1. Firebase SDK Initialization

The Firebase Client SDK should only be initialized once. In `/packages/web/lib/firebase.ts`, it checks if app is already initialized:

```typescript
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
```

This prevents double-initialization in development (hot reload).

### 2. Emulator Connection Timing

Emulator connection happens in `firebase.ts` inside a `typeof window !== 'undefined'` check. This is necessary because Next.js can execute code during SSR (server-side render), where `window` doesn't exist.

### 3. Static Export Mode

The web app is configured with `output: 'export'` in `next.config.ts`. This means:
- No server runtime at deployment time
- Output is pre-built static HTML/CSS/JS
- Dynamic routes (like `[id].tsx`) won't work at deployment
- API routes aren't supported (use Cloud Functions instead)

**Trade-off:** Faster initial load and no server costs, but less flexibility for dynamic content.

### 4. Shop Slug vs Shop ID

- **shop_id:** Firestore document ID (opaque UUID/string)
- **slug:** Human-readable identifier like "blind-tiger" (used in widget URLs)
- Must maintain 1:1 mapping in shop document

### 5. Timezone Handling

- All times in Firestore are stored as ISO strings or Timestamp objects (UTC)
- UI displays should convert to shop's timezone (stored in shop doc)
- Helper: `timezone-utils.ts` in functions package (server-side)

---

## Summary: Next Steps for Contributors

1. **Read CLAUDE.md first** - Contains project-specific best practices
2. **Understand the data model** - Section "Database Schema Overview & Hierarchy" above
3. **Familiarize with route structure** - Pages organized by role, all routes mapped
4. **Review existing patterns** - See how pages use Radix UI + Tailwind
5. **Start with a small feature** - E.g., implement client list view (ClientsPage)
6. **Use TypeScript strictly** - No `any` types; lean on interfaces
7. **Test with emulators** - Firebase emulators are your friend
8. **Check git history** - Recent commits show project intent

---

## Reference: File Locations Cheat Sheet

| What | Location |
|------|----------|
| React pages | `/packages/web/app/**/page.tsx` |
| Widget screens | `/packages/widget/src/components/*.tsx` |
| Cloud Functions | `/packages/functions/src/*/*.ts` |
| Firestore types | `/packages/web/lib/firestore-types.ts` (or functions version) |
| Firebase init | `/packages/web/lib/firebase.ts` |
| Tailwind config | `/packages/web/tailwind.config.ts` |
| Next.js config | `/packages/web/next.config.ts` |
| Vite config (widget) | `/packages/widget/vite.config.ts` |
| Firebase config | `/firebase.json` |
| Project instructions | `/.claude/CLAUDE.md` |
| Product spec | `/.claude/context/grail-product-spec.md` |
| Root package.json | `/package.json` |

---

**End of Exploration Guide**

This document is a comprehensive reference for understanding the Grail codebase. It covers architecture, file structure, database design, current implementation status, patterns, and recommendations. Use it as your starting point before diving into code, and refer back to it as you implement features.

**Last Updated:** 2025-12-03
**Version:** 1.0 - Initial Exploration Complete
