import React from 'react';
import PropTypes from 'prop-types';

function Flight({ flight, getStatus, normalizeTime }) {
  return (
    <tr className=''>
      <td><span className={flight.term === 'A' ? 'terminal-a': 'terminal-d'}>{flight.term}</span></td>
      <td>{flight.gateNo}</td>
      <td>{normalizeTime(flight.timeDepShedule)}</td>
      <td>{flight[`airportToID.city`]}</td>
      {getStatus(flight)}
      <td className = 'airline-info'>
        <img  src={flight.airline.ua.logoSmallName} alt={`${flight.airline.ua.name} logo`}/>
        <span> {flight.airline.ua.name}</span>
      </td>
      <td>{flight.airline.ua.icao + flight.fltNo}</td>
      <td>{flight[`planeTypeID.name`]}</td>
    </tr>
  );
}

Flight.propTypes = {
  flight: PropTypes.object.isRequired
}

export default Flight;
