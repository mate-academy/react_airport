import React from 'react';

const FlightsTable = ({ flightsList, pageType }) => {
  const flightTimeType = pageType === 'arrival'
    ? 'timeToStand'
    : 'timeDepShedule';
  return flightsList.map((flight) => {
    const localTime = new Date(flight[flightTimeType])
      .toTimeString()
      .slice(0, 5);
    return (
      <tr className="flights" key={flight.fltNo + flight.status}>
        <td>{flight.term}</td>
        <td>{localTime}</td>
        <td>{flight['airportFromID.city'] || flight['airportToID.city']}</td>
        <td>{flight.status}</td>
        <td>{flight.airline.ua.name}</td>
        <td>{flight.codeShareData['0'].icao + flight.fltNo}</td>
      </tr>
    );
  });
};

export default FlightsTable;
