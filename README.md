# Grail - Barbershop Booking & POS Platform

**App Name:** Grail

Multi-tenant barbershop booking and point-of-sale platform built with Next.js, TypeScript and Firebase.

## Architecture

This is a Yarn 2 monorepo containing three packages:

- **packages/web** - Next.js 16 web application for barbershop owners and staff
- **packages/widget** - Embeddable React booking widget for customer-facing websites
- **packages/functions** - Firebase Cloud Functions for backend logic

## Prerequisites

- Node.js 22+
- Yarn 4.11.0
- Firebase CLI (for deploying functions and using emulators)

## Getting Started

### 1. Install Dependencies

```bash
# Use the correct Node version
nvm use

# Install all workspace dependencies
yarn install
```

### 2. Configure Environment Variables

#### Web Package

Create `packages/web/.env.local`:

```bash
cp packages/web/.env.example packages/web/.env.local
```

Edit the file and add your Firebase configuration.

#### Functions Package

Create `packages/functions/.env`:

```bash
cp packages/functions/.env.example packages/functions/.env
```

Edit the file and add your Stripe API keys.

### 3. Start Development

#### Run the Web Application

```bash
# Start Next.js dev server on http://localhost:3000
yarn workspace @grail/web dev
```

#### Run the Widget

```bash
# Start Vite dev server on http://localhost:5173
yarn workspace @grail/widget dev
```

#### Run Firebase Emulators

```bash
# Start all Firebase emulators
firebase emulators:start
```

This will start:
- Firestore emulator on port 8080
- Auth emulator on port 9099
- Functions emulator on port 5001
- Hosting emulator on port 5000
- Emulator UI on port 4000

## Development Commands

### Root Level

```bash
# Build all packages
yarn build

# Type check all packages
yarn typecheck

# Lint all packages
yarn lint

# Clean all packages
yarn clean
```

### Per Package

```bash
# Web package
yarn workspace @grail/web dev        # Start dev server
yarn workspace @grail/web build      # Build for production
yarn workspace @grail/web typecheck  # Type check
yarn workspace @grail/web lint       # Lint code

# Widget package
yarn workspace @grail/widget dev        # Start dev server
yarn workspace @grail/widget build      # Build library
yarn workspace @grail/widget typecheck  # Type check
yarn workspace @grail/widget preview    # Preview build

# Functions package
yarn workspace @grail/functions build      # Compile to JavaScript
yarn workspace @grail/functions typecheck  # Type check
yarn workspace @grail/functions serve      # Serve locally with emulator
```

## Project Structure

```
grail/
├── packages/
│   ├── web/                 # Next.js web application
│   │   ├── app/            # App Router pages
│   │   │   ├── (barber)/  # Barber role pages
│   │   │   └── (owner)/   # Owner role pages
│   │   ├── lib/           # Utilities and Firebase setup
│   │   └── middleware.ts  # Next.js middleware (auth)
│   │
│   ├── widget/             # Embeddable booking widget
│   │   ├── src/
│   │   │   ├── components/  # Widget UI components
│   │   │   ├── styles/      # Widget CSS
│   │   │   ├── Widget.tsx   # Main widget component
│   │   │   └── index.tsx    # Entry point with mount function
│   │   └── public/          # Dev and embed examples
│   │
│   └── functions/          # Firebase Cloud Functions
│       └── src/
│           ├── scheduling/      # Appointment scheduling
│           ├── waitlist/        # Waitlist management
│           ├── payments/        # Stripe integration
│           ├── notifications/   # Email/SMS reminders
│           ├── reports/         # Analytics exports
│           └── shared/          # Shared types and utilities
│
├── firestore.rules         # Firestore security rules
├── firestore.indexes.json  # Firestore indexes
├── firebase.json           # Firebase config
├── tsconfig.base.json      # Shared TypeScript config
└── package.json            # Root workspace config
```

## Widget Integration

To embed the booking widget on your website:

```html
<!-- Add this div where you want the widget -->
<div data-grail-widget data-shop-slug="your-shop-slug"></div>

<!-- Include the widget script -->
<script src="https://your-cdn.com/grail-widget.umd.cjs"></script>
```

Or use the programmatic API:

```javascript
import { mountWidget } from '@grail/widget';

mountWidget({
  shopSlug: 'your-shop-slug',
  container: '#widget-container'
});
```

## Firebase Deployment

### Deploy Functions

```bash
firebase deploy --only functions
```

### Deploy Hosting

```bash
# Build the web app first
yarn workspace @grail/web build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

### Deploy Firestore Rules

```bash
firebase deploy --only firestore:rules
```

## Technology Stack

- **Frontend**: Next.js 16, React 19, Radix UI, Tailwind CSS
- **Backend**: Firebase (Firestore, Auth, Functions, Hosting)
- **Build Tools**: Yarn 2, TypeScript, Vite
- **Payments**: Stripe
- **Reactive**: RxJS

## License

UNLICENSED - Private project
