const KEYS = {
  EVENTS: 'eventpulse_events_v1',
  TICKETS: 'eventpulse_tickets_v1',
  CHECK_INS: 'eventpulse_checkins_v1',
};

export const getStoredEvents = (defaultEvents) => {
  try {
    const data = localStorage.getItem(KEYS.EVENTS);
    if (!data) {
      localStorage.setItem(KEYS.EVENTS, JSON.stringify(defaultEvents));
      return defaultEvents;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading events from storage', error);
    return defaultEvents;
  }
};

export const saveEvents = (events) => {
  try {
    localStorage.setItem(KEYS.EVENTS, JSON.stringify(events));
  } catch (error) {
    console.error('Error saving events to storage', error);
  }
};

export const getStoredTickets = () => {
  try {
    const data = localStorage.getItem(KEYS.TICKETS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading tickets from storage', error);
    return [];
  }
};

export const saveTickets = (tickets) => {
  try {
    localStorage.setItem(KEYS.TICKETS, JSON.stringify(tickets));
  } catch (error) {
    console.error('Error saving tickets to storage', error);
  }
};

export const getStoredCheckIns = () => {
  try {
    const data = localStorage.getItem(KEYS.CHECK_INS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading check-ins from storage', error);
    return [];
  }
};

export const saveCheckIns = (checkIns) => {
  try {
    localStorage.setItem(KEYS.CHECK_INS, JSON.stringify(checkIns));
  } catch (error) {
    console.error('Error saving check-ins to storage', error);
  }
};
