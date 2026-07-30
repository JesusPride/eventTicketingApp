import initSqlJs from 'sql.js';
import sqlWasmUrl from 'sql.js/dist/sql-wasm.wasm?url';

const STORAGE_KEY = 'eventpulse_sqlite_db_v1';

let dbInstance = null;
let SQL = null;
let initPromise = null;

// Save SQLite database binary data to LocalStorage as Base64 string for persistence across page refreshes
export const persistSqliteDb = () => {
  if (!dbInstance) return;
  try {
    const data = dbInstance.export();
    const buffer = new Uint8Array(data);
    let binary = '';
    const len = buffer.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(buffer[i]);
    }
    const base64 = btoa(binary);
    localStorage.setItem(STORAGE_KEY, base64);
  } catch (err) {
    console.error('Failed to persist SQLite DB to LocalStorage:', err);
  }
};

// Initialize SQLite WASM Engine and Schema
export const initSqliteDatabase = async (initialEvents = []) => {
  if (dbInstance) return dbInstance;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      SQL = await initSqlJs({
        locateFile: () => sqlWasmUrl,
      });

      const savedBase64 = localStorage.getItem(STORAGE_KEY);
      if (savedBase64) {
        try {
          const binary = atob(savedBase64);
          const bytes = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
          }
          dbInstance = new SQL.Database(bytes);
          console.log('⚡ SQLite DB restored from local storage binary');
        } catch (e) {
          console.warn('Could not parse saved SQLite DB, creating fresh instance', e);
          dbInstance = new SQL.Database();
        }
      } else {
        dbInstance = new SQL.Database();
      }

      // Create Relational Tables Schema
      dbInstance.run(`
        CREATE TABLE IF NOT EXISTS events (
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

        CREATE TABLE IF NOT EXISTS tickets (
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

        CREATE TABLE IF NOT EXISTS check_ins (
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

        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          role TEXT NOT NULL,
          avatar TEXT
        );
      `);

      // Check if events table has rows; if not, seed default events
      const countRes = dbInstance.exec('SELECT COUNT(*) as count FROM events;');
      const rowCount = countRes[0]?.values[0][0] || 0;

      if (rowCount === 0 && initialEvents.length > 0) {
        seedEventsSql(initialEvents);
      }

      persistSqliteDb();
      return dbInstance;
    } catch (err) {
      console.error('Error initializing SQLite WASM database:', err);
      initPromise = null;
      throw err;
    }
  })();

  return initPromise;
};

// Seed Initial Events into SQLite
export const seedEventsSql = (eventsList) => {
  if (!dbInstance) return;
  const stmt = dbInstance.prepare(`
    INSERT OR REPLACE INTO events (
      id, title, category, city, venue, date, time, price, available_tickets, image, description, organizer, featured, tickets_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `);

  eventsList.forEach(evt => {
    const lowestPrice = evt.tickets ? Math.min(...evt.tickets.map(t => t.price)) : 0;
    stmt.run([
      evt.id,
      evt.title,
      evt.category,
      evt.city,
      evt.venue,
      evt.date,
      evt.time,
      lowestPrice,
      evt.availableTickets || 150,
      evt.image,
      evt.description,
      evt.organizer,
      evt.featured ? 1 : 0,
      JSON.stringify(evt.tickets || []),
    ]);
  });

  stmt.free();
  persistSqliteDb();
};

// Fetch All Events from SQLite
export const getEventsSql = () => {
  if (!dbInstance) return [];
  try {
    const res = dbInstance.exec('SELECT * FROM events ORDER BY rowid DESC;');
    if (!res || res.length === 0) return [];
    
    const columns = res[0].columns;
    const values = res[0].values;

    return values.map(row => {
      const obj = {};
      columns.forEach((col, idx) => {
        obj[col] = row[idx];
      });
      return {
        id: obj.id,
        title: obj.title,
        category: obj.category,
        city: obj.city,
        venue: obj.venue,
        date: obj.date,
        time: obj.time,
        price: obj.price,
        image: obj.image,
        description: obj.description,
        organizer: obj.organizer,
        featured: Boolean(obj.featured),
        tickets: obj.tickets_json ? JSON.parse(obj.tickets_json) : [],
      };
    });
  } catch (err) {
    console.error('SQL Error reading events:', err);
    return [];
  }
};

// Insert a New Event into SQLite
export const insertEventSql = (eventObj) => {
  if (!dbInstance) return;
  const lowestPrice = eventObj.tickets ? Math.min(...eventObj.tickets.map(t => t.price)) : 0;
  dbInstance.run(
    `INSERT INTO events (id, title, category, city, venue, date, time, price, available_tickets, image, description, organizer, featured, tickets_json)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
    [
      eventObj.id,
      eventObj.title,
      eventObj.category,
      eventObj.city,
      eventObj.venue,
      eventObj.date,
      eventObj.time,
      lowestPrice,
      eventObj.availableTickets || 150,
      eventObj.image,
      eventObj.description,
      eventObj.organizer,
      eventObj.featured ? 1 : 0,
      JSON.stringify(eventObj.tickets || []),
    ]
  );
  persistSqliteDb();
};

// Update Event Ticket Tier Sales in SQLite
export const updateEventTicketsSql = (eventId, updatedTicketsTier) => {
  if (!dbInstance) return;
  dbInstance.run(
    `UPDATE events SET tickets_json = ? WHERE id = ?;`,
    [JSON.stringify(updatedTicketsTier), eventId]
  );
  persistSqliteDb();
};

// Fetch All Tickets from SQLite
export const getTicketsSql = () => {
  if (!dbInstance) return [];
  try {
    const res = dbInstance.exec('SELECT * FROM tickets ORDER BY rowid DESC;');
    if (!res || res.length === 0) return [];
    
    const columns = res[0].columns;
    const values = res[0].values;

    return values.map(row => {
      const obj = {};
      columns.forEach((col, idx) => {
        obj[col] = row[idx];
      });
      return {
        id: obj.id,
        eventId: obj.event_id,
        eventTitle: obj.event_title,
        eventDate: obj.event_date,
        eventTime: obj.event_time,
        eventVenue: obj.event_venue,
        eventCity: obj.event_city,
        eventImage: obj.event_image,
        ticketTypeId: obj.ticket_type_id,
        ticketTypeName: obj.ticket_type_name,
        ticketPrice: obj.ticket_price,
        attendeeName: obj.attendee_name,
        attendeeEmail: obj.attendee_email,
        attendeePhone: obj.attendee_phone,
        attendeeAvatar: obj.attendee_avatar,
        qrPayload: obj.qr_payload,
        purchaseDate: obj.purchase_date,
        isUsed: Boolean(obj.is_used),
        usedAt: obj.used_at,
      };
    });
  } catch (err) {
    console.error('SQL Error reading tickets:', err);
    return [];
  }
};

// Insert New Ticket into SQLite
export const insertTicketsBatchSql = (ticketsList) => {
  if (!dbInstance || ticketsList.length === 0) return;
  const stmt = dbInstance.prepare(`
    INSERT INTO tickets (
      id, event_id, event_title, event_date, event_time, event_venue, event_city, event_image,
      ticket_type_id, ticket_type_name, ticket_price, attendee_name, attendee_email,
      attendee_phone, attendee_avatar, qr_payload, purchase_date, is_used, used_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `);

  ticketsList.forEach(tkt => {
    stmt.run([
      tkt.id,
      tkt.eventId,
      tkt.eventTitle,
      tkt.eventDate,
      tkt.eventTime,
      tkt.eventVenue,
      tkt.eventCity,
      tkt.eventImage,
      tkt.ticketTypeId,
      tkt.ticketTypeName,
      tkt.ticketPrice,
      tkt.attendeeName,
      tkt.attendeeEmail,
      tkt.attendeePhone,
      tkt.attendeeAvatar,
      tkt.qrPayload,
      tkt.purchaseDate,
      tkt.isUsed ? 1 : 0,
      tkt.usedAt || null,
    ]);
  });

  stmt.free();
  persistSqliteDb();
};

// Update Ticket Used Status in SQLite (Check-In)
export const markTicketUsedSql = (ticketId, usedAtIso) => {
  if (!dbInstance) return;
  dbInstance.run(
    `UPDATE tickets SET is_used = 1, used_at = ? WHERE id = ?;`,
    [usedAtIso, ticketId]
  );
  persistSqliteDb();
};

// Fetch Check-in Log History from SQLite
export const getCheckInsSql = () => {
  if (!dbInstance) return [];
  try {
    const res = dbInstance.exec('SELECT * FROM check_ins ORDER BY rowid DESC;');
    if (!res || res.length === 0) return [];
    
    const columns = res[0].columns;
    const values = res[0].values;

    return values.map(row => {
      const obj = {};
      columns.forEach((col, idx) => {
        obj[col] = row[idx];
      });
      return {
        id: obj.id,
        ticketId: obj.ticket_id,
        eventId: obj.event_id,
        eventTitle: obj.event_title,
        attendeeName: obj.attendee_name,
        timestamp: obj.timestamp,
        status: obj.status,
        message: obj.message,
      };
    });
  } catch (err) {
    console.error('SQL Error reading check-ins:', err);
    return [];
  }
};

// Insert Check-in Log into SQLite
export const insertCheckInSql = (checkInLog) => {
  if (!dbInstance) return;
  dbInstance.run(
    `INSERT INTO check_ins (id, ticket_id, event_id, event_title, attendee_name, timestamp, status, message)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
    [
      checkInLog.id,
      checkInLog.ticketId,
      checkInLog.eventId || null,
      checkInLog.eventTitle || null,
      checkInLog.attendeeName || null,
      checkInLog.timestamp,
      checkInLog.status,
      checkInLog.message,
    ]
  );
  persistSqliteDb();
};

// Execute Arbitrary Raw SQL Query (Used by SQLite Console Modal)
export const executeRawSql = (sqlString) => {
  if (!dbInstance) {
    throw new Error('SQLite database is currently initializing. Please wait a moment and click Run Query again.');
  }
  try {
    const results = dbInstance.exec(sqlString);
    persistSqliteDb();
    return results;
  } catch (err) {
    console.error('Raw SQL Execution Error:', err);
    throw err;
  }
};

// Get SQLite Database Statistics
export const getSqliteDbStats = () => {
  if (!dbInstance) return { eventsCount: 0, ticketsCount: 0, checkInsCount: 0, dbSizeBytes: 0, dbSizeFormatted: '0 KB' };
  try {
    const eventsRes = dbInstance.exec('SELECT COUNT(*) FROM events;')[0]?.values[0][0] || 0;
    const ticketsRes = dbInstance.exec('SELECT COUNT(*) FROM tickets;')[0]?.values[0][0] || 0;
    const checkInsRes = dbInstance.exec('SELECT COUNT(*) FROM check_ins;')[0]?.values[0][0] || 0;
    const exportBytes = dbInstance.export().byteLength;

    return {
      eventsCount: eventsRes,
      ticketsCount: ticketsRes,
      checkInsCount: checkInsRes,
      dbSizeBytes: exportBytes,
      dbSizeFormatted: (exportBytes / 1024).toFixed(1) + ' KB',
    };
  } catch (e) {
    return { eventsCount: 0, ticketsCount: 0, checkInsCount: 0, dbSizeBytes: 0, dbSizeFormatted: '0 KB' };
  }
};

// Reset SQLite DB to Initial State
export const resetSqliteDbToSeed = (initialEvents) => {
  if (!dbInstance) return;
  dbInstance.run('DROP TABLE IF EXISTS events;');
  dbInstance.run('DROP TABLE IF EXISTS tickets;');
  dbInstance.run('DROP TABLE IF EXISTS check_ins;');
  dbInstance.run('DROP TABLE IF EXISTS users;');
  localStorage.removeItem(STORAGE_KEY);
  dbInstance = null;
  initPromise = null;
  return initSqliteDatabase(initialEvents);
};
