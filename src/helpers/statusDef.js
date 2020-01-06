const statusDefinition = (status, statusTime) => {
  switch (status) {
    case 'DP':
      return `Departed at ${new Date(statusTime).getHours()}:${
        (`0${new Date(statusTime).getMinutes()}`).slice(-2)}`;
    case 'CX':
      return `Cancelled`;
    case 'LN':
      return `Landed ${new Date(statusTime).getHours()}:${
        (`0${new Date(statusTime).getMinutes()}`).slice(-2)}`;
    case 'FR':
      return 'In fly';
    case 'ON':
      return 'On time';
    case 'CK':
      return 'Check-in';
    case 'GC':
      return 'Gate close';
    case 'BD':
      return 'Begin departure';
    default:
      return '';
  }
};

export default statusDefinition;
