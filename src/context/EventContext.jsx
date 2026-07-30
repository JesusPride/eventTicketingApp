import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_EVENTS } from '../data/sampleEvents';
import { 
  initSqliteDatabase, 
  getEventsSql, 
  insertEventSql, 
  updateEventTicketsSql, 
  getTicketsSql, 
  insertTicketsBatchSql, 
  markTicketUsedSql, 
  getCheckInsSql, 
  insertCheckInSql 
} from '../services/sqlite';
import { generateTicketId, generateQRPayload } from '../utils/formatters';

const EventContext = createContext();

const DEFAULT_USER = {
  id: 'usr-001',
  name: 'Adewunmi Esther Opeyemi',
  email: 'esther.3mtt@example.com',
  handle: '@Jesuspride',
  phone: '08123456789',
  role: 'attendee', // 'attendee' or 'organizer'
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
};

const DEMO_ORGANIZER = {
  id: 'usr-002',
  name: '3MTT Events Team',
  email: 'organizer.3mtt@example.com',
  handle: '@3MTTHost',
  phone: '08098765432',
  role: 'organizer',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
};

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [checkIns, setCheckIns] = useState([]);
  const [isSqliteReady, setIsSqliteReady] = useState(false);

  // User Auth State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('eventpulse_user_v1');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch (e) {
      return DEFAULT_USER;
    }
  });

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All'); // All, Free, Paid

  // Modals & Active State
  const [activeModal, setActiveModal] = useState(null); // 'booking', 'ticketPass', 'createEvent', 'qrScanner', 'auth', 'sqliteConsole'
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedTicketPass, setSelectedTicketPass] = useState(null);

  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
  };

  const hideToast = () => setToast(null);

  // Initialize SQLite Database Engine on startup
  useEffect(() => {
    let isMounted = true;
    const startDb = async () => {
      try {
        await initSqliteDatabase(INITIAL_EVENTS);
        if (isMounted) {
          refreshFromSqlite();
          setIsSqliteReady(true);
        }
      } catch (err) {
        console.error('Error starting SQLite database:', err);
        // Fallback to sample events if initialization has temporary issue
        if (isMounted) {
          setEvents(INITIAL_EVENTS);
        }
      }
    };
    startDb();
    return () => { isMounted = false; };
  }, []);

  const refreshFromSqlite = () => {
    const evts = getEventsSql();
    const tkts = getTicketsSql();
    const chks = getCheckInsSql();
    setEvents(evts.length > 0 ? evts : INITIAL_EVENTS);
    setTickets(tkts);
    setCheckIns(chks);
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('eventpulse_user_v1', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('eventpulse_user_v1');
    }
  }, [currentUser]);

  // Auth Handlers
  const loginUser = (email, password) => {
    if (email.includes('organizer')) {
      setCurrentUser(DEMO_ORGANIZER);
      showToast('Logged in as Event Host Organizer!', 'success');
    } else {
      setCurrentUser({
        id: `usr-${Date.now()}`,
        name: email.split('@')[0].replace('.', ' '),
        email,
        handle: `@${email.split('@')[0]}`,
        phone: '08123456789',
        role: 'attendee',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      });
      showToast(`Welcome back, ${email.split('@')[0]}!`, 'success');
    }
    setActiveModal(null);
  };

  const quickDemoLogin = (role) => {
    if (role === 'organizer') {
      setCurrentUser(DEMO_ORGANIZER);
      showToast('Signed in as Organizer Host (3MTT Team)', 'success');
    } else {
      setCurrentUser(DEFAULT_USER);
      showToast('Signed in as Attendee (Adewunmi Esther Opeyemi)', 'success');
    }
    setActiveModal(null);
  };

  const signupUser = (name, email, role, avatar) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      handle: `@${name.toLowerCase().replace(/\s+/g, '')}`,
      phone: '08123456789',
      role,
      avatar: avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    };
    setCurrentUser(newUser);
    showToast(`Account created! Welcome ${name}`, 'success');
    setActiveModal(null);
  };

  const logoutUser = () => {
    setCurrentUser(null);
    showToast('Signed out successfully', 'info');
  };

  // Buy Ticket Handler (Writes to SQLite Database)
  const purchaseTicket = ({ event, ticketType, quantity, attendee }) => {
    const newTickets = [];
    
    // Update local tier counts
    const updatedTicketTiers = event.tickets.map(tier => {
      if (tier.id === ticketType.id) {
        return { ...tier, soldQuantity: tier.soldQuantity + quantity };
      }
      return tier;
    });

    updateEventTicketsSql(event.id, updatedTicketTiers);

    for (let i = 0; i < quantity; i++) {
      const ticketId = generateTicketId();
      const qrPayload = generateQRPayload(ticketId, event.id, attendee.email);
      newTickets.push({
        id: ticketId,
        eventId: event.id,
        eventTitle: event.title,
        eventDate: event.date,
        eventTime: event.time,
        eventVenue: event.venue,
        eventCity: event.city,
        eventImage: event.image,
        ticketTypeId: ticketType.id,
        ticketTypeName: ticketType.name,
        ticketPrice: ticketType.price,
        attendeeName: attendee.name,
        attendeeEmail: attendee.email,
        attendeePhone: attendee.phone,
        attendeeAvatar: attendee.avatar || (currentUser ? currentUser.avatar : null),
        qrPayload,
        purchaseDate: new Date().toISOString(),
        isUsed: false,
        usedAt: null,
      });
    }

    insertTicketsBatchSql(newTickets);
    refreshFromSqlite();

    showToast(`Successfully purchased ${quantity} ticket(s) saved to SQLite DB!`, 'success');
    return newTickets;
  };

  // Create Event Handler (Writes to SQLite Database)
  const addEvent = (newEventData) => {
    const newEvent = {
      id: `evt-${Date.now()}`,
      organizer: currentUser ? currentUser.name : 'Adewunmi Esther Opeyemi (Organizing Host)',
      featured: false,
      ...newEventData,
    };
    insertEventSql(newEvent);
    refreshFromSqlite();
    showToast('New event published to SQLite DB!', 'success');
  };

  // Gate Check-in Ticket Verification Handler (Reads/Writes to SQLite)
  const verifyAndCheckInTicket = (ticketIdOrPayload) => {
    let cleanTicketId = ticketIdOrPayload.trim();
    
    try {
      if (ticketIdOrPayload.startsWith('{')) {
        const parsed = JSON.parse(ticketIdOrPayload);
        cleanTicketId = parsed.tkt;
      }
    } catch (e) {}

    const ticket = tickets.find(t => t.id.toLowerCase() === cleanTicketId.toLowerCase());

    if (!ticket) {
      const failedLog = {
        id: `chk-${Date.now()}`,
        ticketId: cleanTicketId,
        timestamp: new Date().toISOString(),
        status: 'INVALID',
        message: 'Ticket ID not found in system SQLite database.'
      };
      insertCheckInSql(failedLog);
      refreshFromSqlite();
      return { success: false, status: 'INVALID', message: '❌ Invalid Ticket: Ticket ID not recognized in SQLite!' };
    }

    if (ticket.isUsed) {
      const duplicateLog = {
        id: `chk-${Date.now()}`,
        ticketId: cleanTicketId,
        eventId: ticket.eventId,
        eventTitle: ticket.eventTitle,
        attendeeName: ticket.attendeeName,
        timestamp: new Date().toISOString(),
        status: 'DUPLICATE',
        message: `Already used on ${new Date(ticket.usedAt).toLocaleTimeString()}`
      };
      insertCheckInSql(duplicateLog);
      refreshFromSqlite();
      return { 
        success: false, 
        status: 'DUPLICATE', 
        ticket,
        message: `⚠️ ALREADY CHECKED IN at ${new Date(ticket.usedAt).toLocaleTimeString('en-GB')}` 
      };
    }

    const nowIso = new Date().toISOString();
    markTicketUsedSql(ticket.id, nowIso);

    const successLog = {
      id: `chk-${Date.now()}`,
      ticketId: cleanTicketId,
      eventId: ticket.eventId,
      eventTitle: ticket.eventTitle,
      attendeeName: ticket.attendeeName,
      timestamp: nowIso,
      status: 'VERIFIED',
      message: 'Access Granted'
    };

    insertCheckInSql(successLog);
    refreshFromSqlite();

    const updatedTicket = { ...ticket, isUsed: true, usedAt: nowIso };

    return {
      success: true,
      status: 'VERIFIED',
      ticket: updatedTicket,
      message: `✅ ACCESS GRANTED! Welcome ${ticket.attendeeName} (${ticket.ticketTypeName})`
    };
  };

  return (
    <EventContext.Provider
      value={{
        events,
        tickets,
        checkIns,
        currentUser,
        isSqliteReady,
        refreshFromSqlite,
        loginUser,
        quickDemoLogin,
        signupUser,
        logoutUser,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedCity,
        setSelectedCity,
        priceFilter,
        setPriceFilter,
        activeModal,
        setActiveModal,
        selectedEvent,
        setSelectedEvent,
        selectedTicketPass,
        setSelectedTicketPass,
        purchaseTicket,
        addEvent,
        verifyAndCheckInTicket,
        toast,
        showToast,
        hideToast,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => useContext(EventContext);
