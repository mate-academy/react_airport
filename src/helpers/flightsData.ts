const dateMap = {
  yesterday: -1,
  today: 0,
  tomorrow: +1,
};

export const flightsData = (flights: IFlight[], day: keyof DateMap) => {
  return flights.filter((flight: IFlight) => {
    const flightDate = new Date(flight.actual);
    const lookupDate = new Date();
    const currentDayCheck = (checkMap: DateMap, checkDay: keyof DateMap) => {
      lookupDate.setDate(lookupDate.getDate() + checkMap[checkDay]);
    };

    currentDayCheck(dateMap, day);

    return flightDate.getDate() === lookupDate.getDate();
  });
};
