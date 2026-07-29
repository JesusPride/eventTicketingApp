import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_EVENTS } from '../data/sampleEvents';
import { 
  getStoredEvents, 
  saveEvents, 
  getStoredTickets, 
  saveTickets, 
  getStoredCheckIns, 
  saveCheckIns 
} from '../utils/storage';
import { generateTicketId, generateQRPayload } from '../utils/formatters';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(() => getStoredEvents(INITIAL_EVENTS));
  const [tickets, setTickets] = useState(() => getStoredTickets());
  const [checkIns, setCheckIns] = useState(() => getStoredCheckIns());

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All'); // All, Free, Paid

  // Modals & Active State
  const [activeModal, setActiveModal] = useState(null); // 'booking', 'ticketPass', 'createEvent', 'qrScanner'
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedTicketPass, setSelectedTicketPass] = useState(null);

  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
  };

  const hideToast = () => setToast(null);

  // Save to localStorage when state updates
  useEffect(() => {
    saveEvents(events);
  }, [events]);

  useEffect(() => {
    saveTickets(tickets);
  }, [tickets]);

  useEffect(() => {
    saveCheckIns(checkIns);
  }, [checkIns]);

  // Buy Ticket Handler
  const purchaseTicket = ({ event, ticketType, quantity, attendee }) => {
    const newTickets = [];
    const updatedEvents = events.map(evt => {
      if (evt.id === event.id) {
        const updatedTicketTiers = evt.tickets.map(tier => {
          if (tier.id === ticketType.id) {
            return { ...tier, soldQuantity: tier.soldQuantity + quantity };
          }
          return tier;
        });
        return { ...evt, tickets: updatedTicketTiers };
      }
      return evt;
    });

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
        attendeeAvatar: attendee.avatar || null,
        qrPayload,
        purchaseDate: new Date().toISOString(),
        isUsed: false,
        usedAt: null,
      });
    }

    setEvents(updatedEvents);
    setTickets(prev => [...newTickets, ...prev]);

    showToast(`Successfully purchased ${quantity} ticket(s) for ${event.title}!`, 'success');
    return newTickets;
  };

  // Create Event Handler
  const addEvent = (newEventData) => {
    const newEvent = {
      id: `evt-${Date.now()}`,
      organizer: newEventData.organizer || 'Adewunmi Esther Opeyemi (Organizing Host)',
      featured: false,
      ...newEventData,
    };
    setEvents(prev => [newEvent, ...prev]);
    showToast('New event published successfully!', 'success');
  };

  // Gate Check-in Ticket Verification Handler
  const verifyAndCheckInTicket = (ticketIdOrPayload) => {
    let cleanTicketId = ticketIdOrPayload.trim();
    
    // Check if input is raw JSON QR payload
    try {
      if (ticketIdOrPayload.startsWith('{')) {
        const parsed = JSON.parse(ticketIdOrPayload);
        cleanTicketId = parsed.tkt;
      }
    } catch (e) {
      // Input is string ID
    }

    const ticketIndex = tickets.findIndex(t => t.id.toLowerCase() === cleanTicketId.toLowerCase());

    if (ticketIndex === -1) {
      const failedLog = {
        id: `chk-${Date.now()}`,
        ticketId: cleanTicketId,
        timestamp: new Date().toISOString(),
        status: 'INVALID',
        message: 'Ticket ID not found in system database.'
      };
      setCheckIns(prev => [failedLog, ...prev]);
      return { success: false, status: 'INVALID', message: '❌ Invalid Ticket: Ticket ID not recognized!' };
    }

    const ticket = tickets[ticketIndex];

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
      setCheckIns(prev => [duplicateLog, ...prev]);
      return { 
        success: false, 
        status: 'DUPLICATE', 
        ticket,
        message: `⚠️ ALREADY CHECKED IN at ${new Date(ticket.usedAt).toLocaleTimeString('en-GB')}` 
      };
    }

    // Mark as used
    const nowIso = new Date().toISOString();
    const updatedTickets = [...tickets];
    updatedTickets[ticketIndex] = {
      ...ticket,
      isUsed: true,
      usedAt: nowIso
    };

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

    setTickets(updatedTickets);
    setCheckIns(prev => [successLog, ...prev]);

    return {
      success: true,
      status: 'VERIFIED',
      ticket: updatedTickets[ticketIndex],
      message: `✅ ACCESS GRANTED! Welcome ${ticket.attendeeName} (${ticket.ticketTypeName})`
    };
  };

  // Reset to sample state
  const resetDemoData = () => {
    setEvents(INITIAL_EVENTS);
    setTickets([]);
    setCheckIns([]);
    localStorage.clear();
    showToast('Demo data reset to initial default state.', 'info');
  };

  return (
    <EventContext.Provider
      value={{
        events,
        tickets,
        checkIns,
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
        resetDemoData,
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
