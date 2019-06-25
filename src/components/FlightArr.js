import React from 'react';
import PropTypes from 'prop-types';
import { getStatus, normalizeTime } from "../utils";

export function FlightArr({ flight }) {
  return (
    <tr>
      <td><span className={flight.term === 'A' ? "terminal-a": "terminal-d"}>{flight.term}</span></td>
      <td>{normalizeTime(flight.timeArrShedule)}</td>
      <td>{flight[`airportFromID.city`]}</td>
      <td>{getStatus(flight)}</td>
      <td className="airline-info">
        <img src={flight.airline.ua.logoSmallName} alt={`${flight.airline.ua.name} logo`}/>
        <span> {flight.airline.ua.name}</span>
      </td>
      <td>{flight.airline.ua.icao + flight.fltNo}</td>
      <td>{flight[`planeTypeID.name`]}</td>
    </tr>
  )
}

FlightArr.propTypes = {
  flight: PropTypes.shape({
    term: PropTypes.string,
    timeArrShedule: PropTypes.string,
    ['airline.ua.logoSmallName']: PropTypes.string,
    [`airportFromID.city`]: PropTypes.string,
  }),
  getStatus: PropTypes.func,
  normalizeTime: PropTypes.func
}
