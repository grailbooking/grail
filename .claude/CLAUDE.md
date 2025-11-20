# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Grail** is a multi-tenant barbershop booking and point-of-sale platform built with Next.js, TypeScript, and Firebase.

This is a **Yarn 2 monorepo** with three packages:

- **packages/web** - Next.js 16 web application for barbershop owners and staff
- **packages/widget** - Embeddable React booking widget for customer-facing websites
- **packages/functions** - Firebase Cloud Functions for backend logic (scheduling, payments, waitlist)

## Start Here

You are an expert in Next.js, TypeScript and scalable web application development. You write elegant, thoughtful, maintainable, performant code following modern best practices and using the latest cutting-edge frameworks, libraries and official documentation.

Read the README.md for setup instructions and development commands.

## Technology Stack

### Core Framework Versions

- **Node.js:** 22+
- **Yarn:** 4.11.0
- **Next.js:** 16.0.3 (App Router)
- **React:** 19.2.0
- **TypeScript:** 5.7.0

### Frontend

- **UI Library:** Radix UI 3.1.3 (accessible, unstyled primitives)
- **Styling:** Tailwind CSS 4.1.17 (utility-first)
- **Reactive State:** RxJS 7.8.2
- **Icons:** @radix-ui/react-icons

### Backend

- **Database:** Firebase Firestore (NoSQL, real-time)
- **Auth:** Firebase Authentication
- **Functions:** Firebase Cloud Functions (v2 API)
- **Admin SDK:** firebase-admin 12.6.0
- **Payments:** Stripe 17.7.0

### Build Tools

- **Web App Bundler:** Next.js (Turbopack)
- **Widget Bundler:** Vite 6.4.1 (library mode)
- **Functions Compiler:** TypeScript → CommonJS

## Development Workflow

### Starting Services

Each package runs on a different port:

```bash
# Web application (Next.js)
yarn workspace @grail/web dev
# → http://localhost:3000

# Widget (Vite)
yarn workspace @grail/widget dev
# → http://localhost:5173

# Firebase Emulators
firebase emulators:start
# → Emulator UI: http://localhost:4000
# → Firestore: localhost:8080
# → Auth: localhost:9099
# → Functions: localhost:5001
```

### Build Commands

```bash
# Build all packages
yarn build

# Build individual packages
yarn workspace @grail/web build
yarn workspace @grail/widget build
yarn workspace @grail/functions build

# Type check all packages
yarn typecheck
```

## Architectural Patterns

### Monorepo Structure

**Pattern:** Yarn 2 workspaces with shared dependencies hoisted to root.

**Workspace naming:** `@grail/<package-name>` (scoped packages)

**Shared code approach:**

- Widget shares UI components (Radix UI) and Firebase client SDK with web app
- Both web and functions packages have identical `firestore-types.ts` for type consistency
- Timezone utilities shared in functions package for server-side date handling

### Multi-Tenant Architecture

**Pattern:** Flattened Firestore collections with `shop_id` scoping.

**Why:** Simpler queries and indexing than nested subcollections, better performance at scale.

**Example:**

```typescript
// All appointments have shop_id field
const appointments = await db
  .collection('appointments')
  .where('shop_id', '==', shopId)
  .where('startISO', '>=', startDate)
  .get();
```

**Security:** All Firestore queries MUST filter by `shop_id` first to prevent cross-tenant data leaks.

### Firebase Configuration

**Pattern:** Environment-aware initialization with emulator detection.

**Web app (`lib/firebase.ts`):**

- Uses Firebase Client SDK
- Auto-detects `localhost` and connects to emulators
- Initialized once and exported for reuse

**Functions (`src/index.ts`):**

- Uses Firebase Admin SDK (elevated privileges)
- Exports all functions from index.ts
- Uses Functions v2 API (onCall, onSchedule, onDocumentCreated)

### Next.js App Router

**Pattern:** Route groups for role-based pages.

**Structure:**

```
app/
├── (barber)/          # Barber role pages (Today, Calendar, Clients, POS)
├── (owner)/           # Owner role pages (Dashboard, Settings, Reports)
├── layout.tsx         # Root layout with Radix UI Theme provider
├── page.tsx           # Home page
└── globals.css        # Tailwind imports + CSS custom properties
```

**Why:** Route groups organize pages by role without affecting URL structure.

### Widget Architecture

**Pattern:** Standalone library build with auto-mount capability.

**Build outputs:**

- ES module (`grail-widget.js`) for modern bundlers
- UMD bundle (`grail-widget.umd.cjs`) for script tags

**Embedding methods:**

1. **Auto-mount:** Add `<div data-grail-widget data-shop-slug="..."></div>` + script tag
2. **Programmatic:** Call `mountWidget({ shopSlug, container })`

**Shared dependencies:** Widget uses same Radix UI components as web app for consistency.

### TypeScript Configuration

**Pattern:** Base config with package-specific overrides.

**Root:** `tsconfig.base.json` with strict mode, ES2022 target
**Web:** Extends base, adds Next.js types and path aliases
**Widget:** Extends base, uses `jsx: 'react-jsx'`, module: esnext
**Functions:** Extends base, uses `module: 'commonjs'`, target: es2020

### State Management

**Pattern:** RxJS for reactive state, React hooks for local state.

**Preference:** Use RxJS `timer()` instead of `setTimeout()` for consistency.

**Example use cases:**

- Waitlist offer countdown timers
- Real-time appointment updates
- Multi-tenant session management

## Code Organization Conventions

### File Naming

- **React components:** PascalCase (e.g., `WidgetHome.tsx`)
- **Utilities:** camelCase (e.g., `firebase.ts`, `firestore-types.ts`)
- **Configs:** kebab-case (e.g., `next.config.ts`, `tailwind.config.ts`)

### Import Order

1. External dependencies (React, Next.js, Firebase)
2. Radix UI components
3. Local components
4. Utilities and types
5. Styles

### Type Definitions

- **Firestore types:** Define in `firestore-types.ts` (web and functions have identical copies)
- **Component props:** Define inline or extract to `.types.ts` if complex
- **Avoid `any`:** Use proper typing or `unknown` with type guards

### Environment Variables

- **Web:** `.env.local` (gitignored) with Firebase client config
- **Functions:** `.env` (gitignored) with Stripe/SMS API keys
- **Examples:** `.env.example` files committed for reference

## Lessons Learned

### What Works Well

1. **Yarn Berry with corepack:** Easier setup than committing yarn binary, managed via Node.js
2. **Firebase Functions v2 API:** Cleaner than v1, better TypeScript support, more flexible triggers
3. **Next.js static export:** Works well with Firebase Hosting, no server needed
4. **Radix UI primitives:** Excellent accessibility out-of-box, easy to style with Tailwind
5. **Vite for widget:** Fast builds, tree-shaking, smaller bundle size than webpack
6. **Shared firestore-types:** Prevents type mismatches between client and functions

### What to Avoid

1. **Next.js middleware + static export:** Middleware has limitations with static export (expected, documented warning)
2. **Mixing Firebase SDK versions:** Keep Client SDK and Admin SDK versions in sync to avoid compatibility issues
3. **Nested Firestore collections for multi-tenancy:** Flattened collections with `shop_id` are simpler and faster
4. **Global state libraries:** RxJS + React hooks sufficient for this app's complexity
5. **Overly granular packages:** Three packages (web, widget, functions) is the right balance for this monorepo

### Development Best Practices

1. **Always filter by `shop_id` first:** Prevents cross-tenant data leaks in Firestore queries
2. **Use Firebase emulators:** Faster development, no cloud costs, easier debugging
3. **Prefer RxJS `timer()` over `setTimeout()`:** More testable, cancellable, composable
4. **Build widget after web changes:** Widget may share components, ensure compatibility
5. **Run type checks before commits:** `yarn typecheck` catches errors across all packages

## Firebase Firestore Schema

### Key Collections

- `users` - Global user identity (cross-shop)
- `shops` - Multi-tenant root entity (branding, settings, policies)
- `barbers` - Staff members with schedules and service overrides
- `services` - Service catalog (haircuts, shaves, etc.)
- `clients` - Customer records with payment methods
- `appointments` - Bookings with status tracking
- `waitlists` - FIFO queue with offer expiration logic
- `transactions` - Payment records with Stripe references
- `promos` - Discount codes

### Composite Indexes Required

See `firestore.indexes.json` for complete list. Key indexes:

- `appointments`: `shop_id + startISO`, `barber_id + startISO`
- `waitlists`: `shop_id + state`, `shop_id + barber_id + state`
- `transactions`: `shop_id + createdAt`, `barber_id + createdAt`

## Knowledge Management

### CLAUDE.md Updates

- **Always update after successful chats**: When a chat session results in new knowledge about the codebase, patterns, or best practices, update this CLAUDE.md file
- **Document new patterns**: Record any new architectural patterns, component structures, or conventions discovered
- **Capture lessons learned**: Include insights about what works well and what to avoid in this codebase
- **Update after refactoring**: When code structure changes, update the relevant sections to reflect current organization

---

**Last Updated:** 2025-11-19 - Initial monorepo scaffolding complete
