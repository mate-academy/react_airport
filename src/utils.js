const MS_IN_DAY = 86400000;

export function getCurrentDate(dayShiftSize = 0) {
  const today = new Date(new Date().getTime() + MS_IN_DAY * dayShiftSize);
  const day = `${today.getDate()}`;
  const month = `${today.getMonth() + 1}`;
  const year = today.getFullYear();

  return `${normalizeTimeUnit(day)}-${normalizeTimeUnit(month)}-${year}`;
}

function normalizeTimeUnit(date) {
  return date.padStart(2, '0');
}

export function doFetch(url) {
  return fetch(url).then(request => request.json())
    .then(data => data.body);
}

export function parseTime(dateString) {
  const date = new Date(dateString);
  const hour = `${date.getHours()}`;
  const minutes = `${date.getMinutes()}`;
  const day = `${date.getDate()}`;

  return {
    day: normalizeTimeUnit(day),
    hour: normalizeTimeUnit(hour),
    minutes: normalizeTimeUnit(minutes),
  };
}

export function parseFlightData(flightData) {
  const {
    ID,
    term,
    airline,
    status,
    codeShareData,
    timeDepExpectCalc,
    timeToStand,
    timeDepFact,
    timeLandFact,
  } = flightData;
  const expTime = parseTime(timeDepExpectCalc || timeToStand);
  const factTime = parseTime(timeDepFact || timeLandFact);

  return {
    terminal: term,
    time: `${expTime.hour}:${expTime.minutes}`,
    destination: flightData['airportToID.city_en']
      || flightData['airportFromID.city_en'],
    airline: airline.en.name,
    flight: codeShareData[0].codeShare[0].match(/[A-Z]/)
      ? codeShareData[0].codeShare
      : codeShareData[0].icao + codeShareData[0].codeShare,
    status: decodeStatus(status, `${factTime.hour}:${factTime.minutes}`),
    id: ID,
  };
}

function decodeStatus(statusMessage, time) {
  switch (statusMessage) {
    case 'CX': return 'Cancelled';
    case 'LN': return `Landed ${time}`;
    case 'GC': return 'Gate closed';
    case 'DP': return `Departed at ${time}`;
    case 'CK': return 'Check-in';
    case 'FR': return 'In flight';
    default: return 'On time';
  }
}
