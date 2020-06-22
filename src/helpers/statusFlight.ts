export const statusFlight = (status: Status): string => {
  switch (status) {
    case 'ON':
      return 'On time';
    case 'CX':
      return 'Canceled';
    case 'LN':
      return 'Landed';
    case 'CK':
      return 'Check-in';
    case 'FR':
      return 'In flight';
    case 'DP':
      return 'Departed at:';
    default:
      return status;
  }
};
