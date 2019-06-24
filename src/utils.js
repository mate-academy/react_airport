export function normalizeTime(timeStr) {
  return timeStr.match(/\d{2}:\d{2}/);
}

export const getStatus = (flight) => {
  switch (flight.status) {
    case 'DP': return `Departed at ${normalizeTime(flight.timeDepFact)}`;
    case 'LN': return `Landed at ${normalizeTime(flight.timeLandFact)}`;
    case 'ON': return 'On time';
    case 'CK': return 'Check-in';
    case 'BD': return 'Boarding';
    case 'GC': return 'Gate cloased';
    case 'CX': return 'Cancelled';
    case 'FR': return 'On flight';
    default: return flight.status;
  }
}

export function getTodayDate() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  return `${today.getDate()}-${month}-${today.getFullYear()}`
}
