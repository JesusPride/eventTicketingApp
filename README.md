# EventPulse | Nigerian Event Ticketing & Gate Scanner App 🎟️

**3MTT NextGen Programme Graduation Project**  
**Student Name:** Adewunmi Esther Opeyemi  
**Submission Topic:** Event Ticketing App  
**Submission Deadline:** Friday, 31 July 2026 at 11:59 PM  

---

## 🇳🇬 The Nigerian Problem Statement
Local event organizers in major Nigerian cities (Lagos, Abuja, Ibadan, Port Harcourt) face several recurring challenges:
1. **Gate Ticket Fraud & Fake Passes**: Counterfeiting of paper tickets leading to overcrowded venues and lost revenue.
2. **Slow Check-in Bottlenecks**: Manual paper list verification causes long queues at venue gates.
3. **Payment & Currency Friction**: Lack of localized ticketing systems priced natively in Nigerian Naira (₦).
4. **Poor Organizer Visibility**: Difficulty tracking live ticket sales, gate attendance percentages, and attendee rosters in real time.

---

## ✨ Solution Overview (What Was Built)
**EventPulse** is a modern, high-performance web application that delivers an end-to-end digital ticketing experience tailored for Nigerian events:

- 🔍 **Event Discovery & Filtering**: Search and filter local events by category (*Tech, Music, Education, Business, Food & Drink, Virtual*), city (*Lagos, Abuja, Ibadan, Port Harcourt, Online*), and price range (*Free vs Paid ₦*).
- 🎫 **Multi-Tier Ticket Checkout**: Reserve Regular, VIP, and VVIP tickets with instant simulated NGN (₦) payment and automatic ticket generation.
- 📱 **Dynamic QR Code Ticket Passes**: Each purchase issues a unique digital gate pass containing a scannable QR payload (`TKT-NG-XXXXXX`), attendee credentials, venue details, and print options.
- 📷 **Real-Time Gate Scanner & Verification**: An integrated gatekeeper tool supporting live camera QR scanning and manual code entry with instant status alerts:
  - 🟢 `VERIFIED` — Access Granted (First-time valid scan)
  - 🟡 `DUPLICATE` — Flagged (Already checked in with timestamp)
  - 🔴 `INVALID` — Rejected (Ticket ID not recognized)
- 📊 **Organizer Hub & Sales Analytics**: Host portal to track total revenue in Naira (₦), total tickets issued, turnout rate, publish new events, and download full attendee rosters as CSV files.

---

## 🛠️ Tech Stack & Tools Used
- **Frontend Framework**: React 18 + Vite
- **Styling & Aesthetics**: Tailwind CSS (Glassmorphism, Vibrant Emerald/Indigo Nigerian Tech Theme)
- **Icons**: Lucide React Icons
- **QR Code Generation**: `qrcode.react` (`QRCodeSVG`)
- **Live Gate QR Scanning**: `html5-qrcode` API
- **Celebration Micro-animations**: `canvas-confetti`
- **Data Storage**: Client-side LocalStorage (with pre-seeded Nigerian event data)

---

## 🚀 Quick Start & How to Run Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+) installed on your machine.

### Installation Steps

1. **Clone or Navigate to the Project Folder**:
   ```bash
   cd /Users/theoneglobal/Desktop/Hadassah/3MTT/eventTicketingApp
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

4. **Build Production Bundle**:
   ```bash
   npm run build
   ```

---

## 📹 2-3 Minute Demo Video Guide for 3MTT Submission

When recording your demo video (using Loom, OBS, or Zoom):

1. **Introduction (30s)**:
   - Introduce yourself: *"Hello, my name is Adewunmi Esther Opeyemi, and this is my 3MTT NextGen graduation project: EventPulse."*
   - Briefly state the problem: *"Local events in Nigeria suffer from paper ticket fraud and slow gate check-ins."*
2. **Event Discovery & Purchasing (45s)**:
   - Show the homepage, filter events by category (e.g. *Tech*) or city (e.g. *Lagos*).
   - Click **Get Tickets** on *Lagos Tech Fest 2026*, select **VIP Pass** in ₦, fill in attendee details, and click **Confirm & Issue Ticket**. Show the confetti explosion!
3. **Digital Ticket Pass & QR Code (30s)**:
   - Show the generated ticket pass with the scannable QR Code and unique ID (`TKT-NG-XXXXXX`).
4. **Gate Scanner Verification (45s)**:
   - Navigate to **Gate Scanner**, enter or scan the Ticket ID.
   - Show the green **ACCESS GRANTED** message.
   - Re-enter the same Ticket ID to demonstrate duplicate fraud prevention with the yellow **ALREADY CHECKED IN** alert.
5. **Organizer Dashboard (30s)**:
   - Show total revenue in Naira (₦), attendee roster, and click **Export Attendee CSV**.
6. **Conclusion (15s)**:
   - Thank 3MTT instructors and NITDA for the learning journey!

---

## 📜 License & Acknowledgments
Created by **Adewunmi Esther Opeyemi** for the 3MTT NextGen Programme 2026. Sponsored by NITDA Nigeria.
