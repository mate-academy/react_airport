import React from 'react'
import PropTypes from 'prop-types';

function normalizeTime(timeStr) {
  return timeStr.match(/\d{2}:\d{2}/)
}

function getStatus(flight) {
  if(flight.status === 'LN' && flight.timeLandFact) {
    return <td>Landed at {normalizeTime(flight.timeLandFact)}</td>
  } else if(flight.status === 'CX') {
    return <td>Cancelled</td>
  } else if(flight.status === 'ON') {
    return <td>On time</td>
  } else if(flight.status === 'FR') {
    return <td>On flight</td>
  } else {
    return <td>{flight.status}</td>
  }
}

function Flight({ flight }) {
  return (
    <tr>
      <td><span className={flight.term === 'A' ? 'terminal-a': 'terminal-d'}>{flight.term}</span></td>
      <td>{normalizeTime(flight.timeArrShedule)}</td>
      <td>{flight[`airportFromID.city`]}</td>
      {getStatus(flight)}
      <td className = 'airline-info'>
        <img src={flight.airline.ua.logoSmallName} alt={`${flight.airline.ua.name} logo`}/>
        <span> {flight.airline.ua.name}</span>
      </td>
      <td>{flight.airline.ua.icao + flight.fltNo}</td>
      <td>{flight[`planeTypeID.name`]}</td>
    </tr>
  )
}

Flight.PropTypes = {
  flight: PropTypes.object.isRequired
}

export default Flight;
