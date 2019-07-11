const dateMap = {
  Yesterday: -1,
  Today: 0,
  Tomorrow: +1,
};

const flightsData = (flights, day) => {
  const data = flights.filter((flight) => {
    const flightDate = new Date(flight.timeDepShedule || flight.timeToStand);
    const lookupDate = new Date();
    const currentDayCheck = (checkMap, checkDay) => {
      lookupDate.setDate(lookupDate.getDate() + checkMap[checkDay]);
    };

    currentDayCheck(dateMap, day);

    return flightDate.getDate() === lookupDate.getDate();
  });
  return data;
};

export default flightsData;
