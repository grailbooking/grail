# Barbershop App

## TL;DR

Point of Sales for Barbershops that does not instruct the barbershop on how it should run, but provides the tools that are required to run a good barbershop business.

## Requirements

* Client-facing  
  * Client-facing booking portal  
  * (Optional) Client-facing native Android / iOS app  
* Barber-facing  
  * Barber-facing Android / iOS app  
  * Backend dashboard web app for running reports  
* Point of sale UI for checking out clients

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