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

/**
 * Get distinct soft background & text styling per event category
 * @param {string} category 
 * @returns {string}
 */
export const getCategoryBadgeStyle = (category) => {
  switch (category?.toLowerCase()) {
    case 'tech':
      return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
    case 'music':
      return 'bg-purple-500/15 text-purple-400 border-purple-500/30';
    case 'education':
      return 'bg-sky-500/15 text-sky-400 border-sky-500/30';
    case 'business':
      return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
    case 'food & drink':
    case 'food':
      return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
    case 'virtual':
      return 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30';
    default:
      return 'bg-brand-500/15 text-brand-400 border-brand-500/30';
  }
};
