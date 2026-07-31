# EventPulse | Nigerian Event Ticketing & Gate Scanner App 🎟️

A modern web-based event ticketing and gate verification system built as part of the **3MTT NextGen Programme 2026**. EventPulse helps event organizers manage ticket sales, issue secure QR code tickets, and verify attendees at the event gate using a real-time QR scanner.

---

## 📌 Problem Statement

Many event organizers in Nigeria still rely on paper tickets and manual attendance systems, leading to:

- Ticket fraud and fake passes
- Slow check-in processes at event venues
- Difficulty tracking ticket sales and attendance
- Limited access to real-time event analytics

EventPulse provides a digital solution that simplifies ticket management while improving security and the attendee experience.

---

## ✨ Features

- 🔍 Browse and search events
- 🎯 Filter events by category, city, and price
- 🎟️ Purchase Regular, VIP, and VVIP tickets
- 💳 Simulated ticket checkout in Nigerian Naira (₦)
- 📱 Generate secure QR code tickets
- 📷 Scan and verify tickets at the event gate
- 🚫 Detect duplicate or invalid tickets
- 📊 Organizer dashboard with sales analytics
- 📥 Export attendee lists as CSV
- 🗄️ Interactive SQLite database console for viewing and querying data

---

## 🛠️ Tech Stack

- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Database:** SQLite (sql.js WebAssembly)
- **QR Code Generation:** qrcode.react
- **QR Code Scanner:** html5-qrcode
- **Icons:** Lucide React
- **Animations:** canvas-confetti

---

## 🗄️ Database

EventPulse uses **SQLite** running in the browser through **sql.js (WebAssembly)**.

The database stores:

- Events
- Tickets
- Gate check-in records

All data operations are performed using SQL queries such as `CREATE`, `INSERT`, `SELECT`, and `UPDATE`.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v18 or later)
- npm

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the project for production:

```bash
npm run build
```

---

##  Project Structure

```
src/
├── assets/
├── components/
├── pages/
├── hooks/
├── utils/
├── database/
└── App.jsx
```

---

##  Key Functionalities

### Event Discovery

Users can browse and search for events by:

- Category
- City
- Ticket price

### Ticket Purchase

Attendees can:

- Select ticket type
- Enter attendee details
- Receive a unique QR code ticket

### Gate Verification

Gate officials can:

- Scan QR codes
- Verify ticket authenticity
- Detect duplicate check-ins
- Reject invalid tickets

### Organizer Dashboard

Organizers can:

- Create events
- Track ticket sales
- Monitor attendance
- Export attendee records
