# Grail: Modular Barber Shop OS

A modular barber shop operating system that can be configured to match any barbershop's workflow.

## Configuration Dimensions

- **Visit style:** Appointments, walk-ins, or hybrid
- **Checkout style:** Front desk, at the chair, or online pay
- **Payment mix:** Tap, chip, swipe, cash, online, memberships, etc.
- **Business model:** Commission, booth rent, hourly, or mixed

## Core Principles

1. **Config over customization** – Same core engine, toggled behavior
2. **Role-aware** – Different UX for owner, manager, barber, receptionist, and client
3. **Barber-first flows** – Everything optimized for the "I'm mid-cut and need to tap something fast" reality

---

## Feature & Module Outline

### A. Shop & Configuration Module

**Goal:** Express any shop's structure in settings.

#### Shop Profile
- Name, branding (logo, colors), address, contact
- Opening hours per day + special days (holidays, events)

#### Location & Layout
- Single vs multi-location
- Number of chairs/stations; which barbers work where

#### Operational Mode Toggles

**Visit mode:**
- Appointments, walk-ins, hybrid

**Queue mode (for walk-ins):**
- By rotation
- By fastest available
- Client chooses barber

**POS mode:**
- Unified front desk
- Station-based POS
- Online payment only (e.g., card on file)
- Combinations (e.g., ticket opened at front, closed at station)

#### Payments Allowed
- Cash, card-present, tap-to-pay, online, memberships, gift cards

#### Business Model & Payouts
- Commission, booth rent, hourly, hybrid
- Tip distribution rules (per barber, shared, pooled)

---

### B. Staff & Role Management

**Goal:** Get the human structure right.

#### Roles & Permissions
- Owner, Manager, Barber, Receptionist, Bookkeeper, etc.
- Permission sets (view schedule, edit prices, issue refunds, see reports, etc.)

#### Staff Profiles
- Name, pronouns, bio, photo
- Skills & services offered
- Custom durations per service (e.g., "fades take 45 min, buzzcuts 20 min")

#### Availability & Scheduling
- Weekly schedule per barber
- Breaks, lunch, blocked times
- Time-off requests and approval (vacation, sick days)

#### Real-Time Status
- On floor / off floor
- Currently cutting, cleaning, no-show, etc.

---

### C. Services, Pricing & Add-ons

**Goal:** Define what can be booked and sold.

#### Service Catalog
- Haircut, beard trim, combo services, kids cut, etc.
- Duration (base + per barber overrides)
- Price (base + per barber overrides)
- Gender-neutral + age-based options

#### Service Groups & Combos
- Packages (e.g., "Cut & Beard Combo", "Father & Son Package")
- Multi-seat bookings (family/group appointments)

#### Add-ons and Upsells
- Hot towel, shampoo, designs, etc.
- Quick-add upsell buttons in POS and booking

#### Products
- Retail catalog (SKU, cost, price, inventory)
- Product-only sales (walk-in retail)

---

### D. Appointment Engine

**Goal:** Robust, barber-friendly scheduling (for appointment/hybrid shops).

#### Client Booking Flows
- Choose service then barber, or barber then service
- "First available" option
- Group bookings (multiple people in one time slot)

#### Rules and Constraints
- Minimum/maximum notice to book/cancel
- Setup and cleanup buffers (before/after)
- Overlap rules (e.g., color processing + second client)
- Max appointments per slot/day/barber

#### Waitlist Logic
- Day/time-specific waitlists
- Priority rules (first-come, VIP, etc.)
- Auto-fill cancellations: notify next in line with link to confirm

#### Rescheduling & Cancellations
- Policies (fees, time windows)
- No-show + late cancellation flags
- Automated application of fees if policy is violated

#### Sync & Integrations (Later)
- Calendar sync options (iCal / Google / Apple)

---

### E. Walk-in Queue Engine

**Goal:** Elite walk-in flow for barber shops.

#### Queue Creation & Management
- Online "Hop in line" for walk-ins with ETA
- In-shop check-in (reception or kiosk)
- Option for "specific barber" or "first available"

#### Rotation Logic
- Simple round-robin (balanced)
- Weighted by seniority/requests
- Barber out-of-rotation (cleaning, break, off floor)

#### Time Estimation
- Simple rule-based (avg service time × people ahead)
- Better: learn from actual historical durations

#### Client Updates
- Text updates: "You're on deck", "2 ahead of you", etc.
- Easy "I'm running late" button for clients

#### Hybrid Behavior
- How walk-ins fill gaps between appointments
- Rules for when walk-ins are allowed (e.g., "no walk-ins after 4 PM")

---

### F. Front-of-House Tools

**Goal:** Support shops with a front desk, but not require one.

#### Reception Dashboard
- Today's schedule (appointments, walk-ins, waitlist) in a unified view
- Quick actions: check-in, assign barber, reassign, mark arrived, no-show

#### Kiosk Mode (iPad)
- Client self check-in
- Sign-in for walk-ins (choose barber or first available)
- Display approx wait time

#### Lobby Display (TV or Tablet)
- Queue list: Name/initials/status
- Barber availability
- Estimated wait times

---

### G. POS & Ticketing

**Goal:** A ticket-centric POS that makes sense for services + products + multiple barbers.

#### Ticket Lifecycle
- Open ticket at check-in or when seated
- Add services (+ change price if allowed), add products
- Assign services to specific barbers on the same ticket

#### Checkout Experience
- Discount options (per item or whole ticket)
- Tips (fixed buttons + custom amount)
- Split tender: cash + card, multiple cards, etc.

#### Multi-Barber Handling
- Split tips and revenue automatically by service provider
- Commissions calculated per line item

#### Refunds, Comps & Adjustments
- Permission-gated discounts/comps/refunds
- Reason codes for refunds/voids

#### Receipts
- Text, email, print
- Toggling display of barber names, shop phone, etc.

---

### H. Payments & Money Flow

**Goal:** Support all the real-world ways shops get paid.

#### Payment Methods
- Card-present: tap/chip/swipe
- Card-not-present: online pay, card on file
- Cash with cash drawer support
- Gift cards / vouchers
- Memberships / subscriptions (optional future module)

#### Payout Logic
- Daily batch totals (by location)
- Reports by payment method and by staff

#### Fees & Policies
- No-show fees, late cancellations
- Deposits for high-value or long services
- Automatic charge rules based on policy

---

### I. Client Profiles & CRM

**Goal:** Treat clients as real ongoing relationships, not anonymous tickets.

#### Client Accounts
- Basic info, contact, preferred barber
- Payment method on file (if enabled)

#### History
- Past visits, services, products
- Notes (haircut details, preferences, "don't use razors," etc.)

#### Communication Preferences
- Text/email preference
- Opt-in for marketing vs transactional only

---

### J. Notifications & Communication

**Goal:** Keep everyone informed without spam.

#### Client Notifications
- Booking confirmations, reminders (X hours prior)
- Queue status notifications (walk-ins)
- Waitlist offers ("A spot opened at 3:30 — claim it?")
- Receipts, review requests (optional)

#### Staff Notifications
- New booking / cancellation / reschedule
- Changes in their queue when they're off-floor

#### Channels
- SMS, email, push (if you later build native apps)

---

### K. Reporting & Analytics

**Goal:** Owner & barbers can see how they're doing at a glance.

#### Daily/Monthly Reports
- Total revenue, by payment type
- Revenue per barber
- Service vs product breakdown

#### Utilization & Performance
- Booked hours vs available hours per barber
- No-show and cancellation rates
- Average ticket value, average tip percentage

#### Client Metrics
- New vs returning clients
- Retention by barber
- Top services and products

---

### L. Multi-Location & Advanced Configurations

*Later phase*

- Centralized owner dashboard across locations
- Shared vs location-specific services/pricing
- Staff who work in multiple locations

---

### M. Technical & Operational (Under the Hood)

*For developers*

- Audit logging (who changed what, when)
- Data export (CSV, basic accounting exports)
- Backups and basic disaster recovery
- Role-based access control patterns
- Offline tolerance (e.g., queue + POS behavior if internet is flaky)

---

## Shop Configuration Matrix

This helps reason in terms of "archetypes" instead of one-off edge cases:

| Shop Type | Key Modules Needed |
|-----------|-------------------|
| Appointment-only, front desk POS | A, B, C, D, F, G, H, I, J, K |
| Appointment-only, barbers check out | A, B, C, D, G (station mode), H, I, J, K |
| Walk-in-only, front desk POS | A, B, C, E, F, G, H, I, J, K |
| Walk-in-only, station POS | A, B, C, E, G (station), H, I, J, K |
| Hybrid (appointments + walk-ins), desk | A, B, C, D, E, F, G, H, I, J, K |
| Hybrid, fully distributed (no desk) | A, B, C, D, E, G (station), H, I, J, K |

Each module has config toggles to fine-tune behavior per shop.
