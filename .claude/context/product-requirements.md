# Barbershop App

## TL;DR

Point of Sales for Barbershops that does not instruct the barbershop on how it should run, but provides the tools that are required to run a good barbershop business.

## Project Goal

A **multi-tenant** barbershop booking + POS platform with:

- **Web Client**: Mbile-first web app (calendar + queue, schedule overrides, POS), plus admin dashboardsfor setup, config, and reporting.
- **Embeddable Web Client Widget**: ✅ Embeddable, frictionless booking widget (iframe) for shop websites.
- **API**: Server-side functions for long running calls.

## Requirements

* Client-facing  
  * Client-facing booking portal  
  * (Optional) Client-facing native Android / iOS app  
* Barber-facing  
  * Barber-facing Android / iOS app  
  * Backend dashboard web app for running reports  
* Point of sale UI for checking out clients

## Acceptance Criteria (MVP)

- I can embed the **client widget** via iframe on any site, complete a booking without redirects.
- A client can **join a waitlist** (card required), receive **SMS offer**, accept within default **1 hour**, and be booked.
- A barber can apply **arbitrary schedule overrides** (open/close any time window) and see slots update in real-time.
- **Checkout** shows discounted total largest; tips support **% presets, fixed $, custom**.
- **1099** defaults to decentralized POS; **W-2** defaults to centralized; shop can reconfigure.
- **Reports**: revenue by barber, total shop revenue, tips breakdown, client retention, no-show rate, utilization — with **CSV/PDF** aggregated exports.

## Market Competition

What else is out there, and where does it fall short.

* Square  
  * Doesn't have a waitlist  
  * Embedded widget doesn't look native to your app  
* Squire  
  * Navigating is opaque  
  * User interface is unclear and misleading at the point of sale  
  * When barber provides discount, and customer sees the payment screen, the discount is not clear

## Features

General features

* Waitlist  
* Book appointments  
* See appointments  
* Walk queue  
* Client profiles

Client-facing booking portal

* Pay for appointment ahead of time  
* View your current waitlist

Barber-facing

* Reporting  
* Point of sale  
* Configurability & onboarding  
  * Appointments vs walk-ins vs both  
  * Front desk receptionist? Yes or no  
  * 1099 or W2 employees or both  
  * Cutting employees check or  
* Ease of opening appointment slots  
  * Staying late  
  * Blocking time

## Specific Use Cases & Customer Workflows

* **Dynamic Schedule Management for Barbers**  
  * Barbers need a simple, intuitive way to adjust their availability on the fly without navigating complex scheduling settings. Life events, last-minute cancellations, or opportunities to extend hours frequently arise, and the current process of blocking/unblocking time is too rigid and cumbersome. Barbers want to quickly open, close, or adjust their bookable hours without rebuilding their entire schedule.  
  * Customer Workflow (Barber App)  
    * Set Baseline Hours  
      * The barber defines a recurring weekly schedule (e.g., Tue–Sat, 9am–5pm).  
    * Ad-Hoc Adjustments  
      * If the barber needs to close for a day (e.g., child is sick), they simply tap the calendar, select “Close Day,” and all appointments for that day are blocked.  
      * If the barber wants to open up extra time (e.g., stay late on Thursday), they tap the day, add “Extended Hours,” and new time slots immediately appear for clients to book.  
    * Real-Time Updates  
      * Any changes update instantly across client-facing booking interfaces.  
      * Clients can self-serve — booking newly opened time slots or adjusting appointments when the barber frees up blocked times.  
    * Future Flexibility  
      * Barbers can plan recurring schedule changes in advance (e.g., switch to a summer schedule) without rebuilding blocks and overrides manually.  
  * ⚡ In short: the app must let barbers toggle availability with one action per day or time slot, instead of juggling recurring schedules, blocks, and overrides.

## Meeting Notes

### **Barbershop Booking/POS Solution Concept**

* Building simplest booking and point-of-sale solution for barbershops  
  * Doesn’t dictate how shop should run  
  * Provides modular tools for different operational styles  
* Key modularity needs:  
  * Walk-in vs appointment-based shops  
  * Online queues/waitlists for walk-ins  
  * Front desk vs individual barber checkout  
  * Contractor (1099) vs employee (W2) payment processing  
* Proposed onboarding: questionnaire-based setup  
  * “Do you have front desk receptionist?”  
  * “Do contractors need separate bank accounts?”  
  * Suggests appropriate tools based on workflow

### **Current Solutions Analysis**

* **Square**: Missing waitlist functionality  
  * Embedded widget doesn’t look native on websites  
  * Forces choice between aesthetics and SEO  
* **Squire**: Multiple frustrations  
  * Added unwanted “pay later” ads to embedded widget without permission  
  * UI unclear at point-of-sale (discount totals in tiny font)  
  * Difficult schedule management (can’t easily open/close availability)  
  * Marketplace feature undermines barber retention  
    * Shows all barbers when booking, not just preferred one  
    * Cannibalizes individual barber relationships  
* **Barbecue**: “Piece of shit software” used in Bozeman shop

### **Required Platform Components**

* **Client-facing portal**: embedded website widget (non-negotiable for SEO)  
  * Must stay on barbershop’s website, not redirect  
  * Native look essential for user experience  
* **Barber mobile app**: day-to-day queue/appointment management  
* **Back-end dashboard**: shop owner reports and settings  
* **Point-of-sale interface**: flexible checkout options  
  * iPhone-based, unified terminal, or touchless client-managed  
* **Optional client mobile app**: appointment/waitlist management  
* Core features needed:  
  * Waitlist functionality with proper user experience  
  * Client profiles/accounts for faster booking  
  * Configurable payment flow (prepay vs in-person, tip timing)  
  * Schedule flexibility for barbers

### **MVP Approach**

* Start with web-based responsive design  
  * Faster to prototype than native apps  
  * Works on all devices through browsers  
* Focus first on client booking experience  
  * Waitlisting through checkout flow  
  * Multiple use cases covered  
* Native app development after concept proven  
* Embedded widget remains core requirement for barbershop adoption

## Cancellations / No-Shows (defaults, per-shop configurable)

- Min notice: **24h**; Late cancel fee: **50%**; No-show: **100%**; Grace: **10 min**; Auto-charge: **true**.

## Notifications

- **Reminders**: per-shop schedule (default one at 24h). Channels enabled: **SMS + Email** (client can opt out; shop can require).
- **Waitlist**: **SMS only** in MVP.
- Push to be added when native apps exist.

## Non-Goals for MVP

- Inventory/retail tracking (phase 2)
- Marketplace discovery of barbers/shops (off by default)
- Multiple saved cards per client
- Loyalty points/memberships
- Native mobile apps
- Multi-language (English only)
- Push notifications

## MVP Scope Clarifications

### Multi-Barber Tickets

**MVP Scope:** 1 barber = 1 ticket.

Multi-barber tickets (where multiple barbers work on one client in a single transaction) are deferred. Each ticket is associated with exactly one barber for revenue and tip attribution.

### Real-Time Barber Status

**MVP Scope:** Binary status only—**On Floor** or **Off Floor**.

- Primary use case: Walk-in queue management
- No detailed statuses (e.g., "currently cutting", "cleaning", "on break") for MVP
- Status affects queue rotation and availability for walk-ins

### Setup/Cleanup Buffers

Buffers add non-client-facing time before or after appointments to account for setup, cleanup, or transition time.

**Key Requirements:**

1. **Dual Buffer Types:**
   - **Per-service buffers:** Service-specific setup/cleanup time (e.g., "Color processing needs 10 min cleanup")
   - **Per-barber buffers:** Barber-specific transition time (e.g., "Marcus always takes 5 min between clients")

2. **Invisible to Clients:**
   - Clients see only the service duration (e.g., "Haircut: 30 min")
   - Clients do **not** see buffer time (no "Haircut: 30 min + 10 min buffer")
   - Slot availability accounts for buffers internally, but presentation is clean

3. **Configuration Hierarchy:**
   - **Shop owner** can configure default buffers per service and per barber
   - **Barbers** can override their own buffers **if permitted by shop settings**
   - Shop setting: `allowBarberBufferOverrides` (boolean) controls whether barbers can customize their own buffers

4. **Calculation:**
   - Total blocked time = service duration + service buffer + barber buffer
   - Buffers are additive (both service buffer and barber buffer apply when present)

## Exports

- CSV/PDF for reports (aggregated metrics)
- Client lists viewable in dashboard

## Branding

- Co-branded (platform footer).
- Shop-configurable colors/logo/font.
- Widget inherits host site fonts/colors via CSS vars with safe fallbacks.

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