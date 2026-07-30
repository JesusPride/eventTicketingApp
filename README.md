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
4. **Poor Organizer Visibility & Data Storage**: Difficulty tracking live ticket sales, gate attendance percentages, and relational attendee data in real time.

---

## ✨ Solution Overview (What Was Built)
**EventPulse** is a modern, high-performance web application that delivers an end-to-end digital ticketing experience powered by a native **SQLite WASM Database Engine**:

- 🗄️ **Relational SQLite WASM Database Engine**: Built with `sql.js` running WebAssembly. All events, ticket sales, check-in logs, and user records execute via real SQL queries (`CREATE TABLE`, `SELECT`, `INSERT`, `UPDATE`).
- 💻 **Interactive SQLite Query Console**: Includes an in-app SQL terminal and table inspector where instructors can run custom SQL queries (e.g., `SELECT * FROM tickets;`) and view raw database tables.
- 🔍 **Event Discovery & Filtering**: Search and filter local events by category (*Tech, Music, Education, Business, Food & Drink, Virtual*), city (*Lagos, Abuja, Ibadan, Port Harcourt, Online*), and price range (*Free vs Paid ₦*).
- 🎫 **Multi-Tier Ticket Checkout**: Reserve Regular, VIP, and VVIP tickets with instant simulated NGN (₦) payment and automatic ticket generation persisted directly to SQLite.
- 📱 **Dynamic QR Code Ticket Passes**: Each purchase issues a unique digital gate pass containing a scannable QR payload (`TKT-NG-XXXXXX`), attendee credentials, venue details, and print options.
- 📷 **Real-Time Gate Scanner & Verification**: An integrated gatekeeper tool supporting live camera QR scanning and manual code entry with instant status alerts:
  - 🟢 `VERIFIED` — Access Granted (First-time valid scan)
  - 🟡 `DUPLICATE` — Flagged (Already checked in with timestamp)
  - 🔴 `INVALID` — Rejected (Ticket ID not recognized in SQLite DB)
- 📊 **Organizer Hub & Sales Analytics**: Host portal to track total revenue in Naira (₦), total tickets issued, turnout rate, publish new events to SQLite, and download full attendee rosters as CSV files.

---

## 🗄️ Relational SQLite Database Schema

```sql
-- Events Table
CREATE TABLE events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  city TEXT NOT NULL,
  venue TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  price REAL DEFAULT 0,
  available_tickets INTEGER DEFAULT 100,
  image TEXT,
  description TEXT,
  organizer TEXT NOT NULL,
  featured INTEGER DEFAULT 0,
  tickets_json TEXT
);

-- Tickets Table
CREATE TABLE tickets (
  id TEXT PRIMARY KEY,
  event_id TEXT NOT NULL,
  event_title TEXT NOT NULL,
  event_date TEXT NOT NULL,
  event_time TEXT,
  event_venue TEXT NOT NULL,
  event_city TEXT,
  event_image TEXT,
  ticket_type_id TEXT,
  ticket_type_name TEXT NOT NULL,
  ticket_price REAL NOT NULL,
  attendee_name TEXT NOT NULL,
  attendee_email TEXT NOT NULL,
  attendee_phone TEXT,
  attendee_avatar TEXT,
  qr_payload TEXT NOT NULL,
  purchase_date TEXT NOT NULL,
  is_used INTEGER DEFAULT 0,
  used_at TEXT,
  FOREIGN KEY (event_id) REFERENCES events (id)
);

-- Gate Check-ins Table
CREATE TABLE check_ins (
  id TEXT PRIMARY KEY,
  ticket_id TEXT NOT NULL,
  event_id TEXT,
  event_title TEXT,
  attendee_name TEXT,
  timestamp TEXT NOT NULL,
  status TEXT NOT NULL,
  message TEXT,
  FOREIGN KEY (ticket_id) REFERENCES tickets (id)
);
```

---

## 🛠️ Tech Stack & Tools Used
- **Database Engine**: **SQLite 3.x (WebAssembly via `sql.js`)**
- **Frontend Framework**: React 18 + Vite
- **Styling & Aesthetics**: Tailwind CSS (Glassmorphism, Vibrant Emerald/Indigo Nigerian Tech Theme)
- **Icons**: Lucide React Icons
- **QR Code Generation**: `qrcode.react` (`QRCodeSVG`)
- **Live Gate QR Scanning**: `html5-qrcode` API
- **Celebration Micro-animations**: `canvas-confetti`

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
   - Briefly state the problem & database: *"Local events in Nigeria suffer from paper ticket fraud and slow gate check-ins. I built EventPulse powered by an embedded SQLite database."*
2. **SQLite Database Console Inspection (30s)**:
   - Click the **SQLite WASM** badge in the navbar to open the Interactive SQL Inspector. Show the `events`, `tickets`, and `check_ins` tables and run `SELECT * FROM tickets;`.
3. **Event Discovery & Purchasing (45s)**:
   - Show the homepage, filter events by category (e.g. *Tech*) or city (e.g. *Lagos*).
   - Click **Get Tickets** on *Lagos Tech Fest 2026*, select **VIP Pass** in ₦, fill in attendee details, and click **Confirm & Issue Ticket**. Show the confetti explosion!
4. **Digital Ticket Pass & QR Code (30s)**:
   - Show the generated ticket pass with the scannable QR Code and unique ID (`TKT-NG-XXXXXX`).
5. **Gate Scanner Verification (45s)**:
   - Navigate to **Gate Scanner**, enter or scan the Ticket ID.
   - Show the green **ACCESS GRANTED** message.
   - Re-enter the same Ticket ID to demonstrate duplicate fraud prevention with the yellow **ALREADY CHECKED IN** alert.
6. **Organizer Dashboard (30s)**:
   - Show total revenue in Naira (₦), SQLite database size metric, attendee roster, and click **Export Attendee CSV**.
7. **Conclusion (15s)**:
   - Thank 3MTT instructors and NITDA for the learning journey!

---

## 📜 License & Acknowledgments
Created by **Adewunmi Esther Opeyemi** for the 3MTT NextGen Programme 2026. Sponsored by NITDA Nigeria.
