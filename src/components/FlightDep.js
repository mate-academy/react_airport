import React from 'react';
import PropTypes from 'prop-types';

export function FlightDep({ flight, getStatus, normalizeTime }) {
  return (
    <tr>
      <td><span className={flight.term === 'A' ? 'terminal-a': 'terminal-d'}>{flight.term}</span></td>
      <td>{flight.gateNo}</td>
      <td>{normalizeTime(flight.timeDepShedule)}</td>
      <td>{flight[`airportToID.city`]}</td>
      <td>{getStatus(flight)}</td>
      <td className = 'airline-info'>
        <img  src={flight.airline.ua.logoSmallName} alt={`${flight.airline.ua.name} logo`}/>
        <span> {flight.airline.ua.name}</span>
      </td>
      <td>{flight.airline.ua.icao + flight.fltNo}</td>
      <td>{flight[`planeTypeID.name`]}</td>
    </tr>
  );
}

FlightDep.propTypes = {
  flight: PropTypes.shape({
    term: PropTypes.string,
    timeArrShedule: PropTypes.string,
    ['airline.ua.logoSmallName']: PropTypes.string,
    [`airportFromID.city`]: PropTypes.string,
  }),
  getStatus: PropTypes.func,
  normalizeTime: PropTypes.func
}
