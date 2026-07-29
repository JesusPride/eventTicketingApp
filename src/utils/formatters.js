/**
 * Format currency to Nigerian Naira (₦)
 * @param {number} amount 
 * @returns {string}
 */
export const formatNGN = (amount) => {
  if (amount === 0 || amount === '0') return 'FREE';
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format ISO date string into readable Nigerian format
 * @param {string} dateString 
 * @returns {string}
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

/**
 * Format time range
 * @param {string} timeString 
 * @returns {string}
 */
export const formatTime = (timeString) => {
  if (!timeString) return '';
  return timeString;
};

/**
 * Generate unique Ticket ID
 * Example: TKT-NG-9842A
 */
export const generateTicketId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'TKT-NG-';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Generate unique Ticket QR Payload
 */
export const generateQRPayload = (ticketId, eventId, attendeeEmail) => {
  return JSON.stringify({
    tkt: ticketId,
    evt: eventId,
    email: attendeeEmail,
    ver: '3MTT-V1',
    ts: Date.now()
  });
};
