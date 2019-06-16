import { FLIGHT_TYPES } from './constants';

export function createFlightMapper(type) {
  const { DEPARTURE, ARRIVAL } = FLIGHT_TYPES;

  return flightItem => {
    const base = {
      id: flightItem.ID,
      terminal: flightItem.term,
      airline:
        flightItem.airline &&
        flightItem.airline.en &&
        flightItem.airline.en.name,
      flightNumber:
        flightItem.codeShareData &&
        flightItem.codeShareData[0] &&
        flightItem.codeShareData[0].codeShare
    };
    switch (type) {
      case DEPARTURE:
        return {
          ...base,
          gate: flightItem.gateNo,
          time: `${timeNormilize(flightItem.timeDepShedule)}`,
          destination: flightItem['airportToID.name_en'],
          status: `${statusDecoder(flightItem.status)} ${timeNormilize(
            flightItem.timeDepFact
          )}`
        };
      case ARRIVAL:
        return {
          ...base,
          time: `${timeNormilize(flightItem.timeArrShedule)}`,
          destination: flightItem['airportFromID.name_en'],
          status: `${statusDecoder(flightItem.status)} ${timeNormilize(
            flightItem.timeTakeofFact
          )}`
        };
    }
  };
}

export function createDateString(date) {
  const monthDay = date
    .getDate()
    .toString()
    .padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${monthDay}-${month}-${year}`;
}

function timeNormilize(timeStr) {
  if (typeof timeStr !== 'string') {
    return ''
  }
  return timeStr.match(/\d{2}:\d{2}/);
}

function statusDecoder(code) {
  switch (code) {
    case 'ON':
      return 'On time';
    case 'LN':
      return 'Landed';
    case 'CX':
      return 'Canceled';
    case 'DP':
      return 'Departed at';
    case 'CK':
      return 'Check -in';
    default:
      return '-';
  }
}
