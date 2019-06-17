import React from 'react';

function normalizeTime(timeStr) {
  return timeStr.match(/\d{2}:\d{2}/)
}

function getStatus(flight) {
  if(flight.status === 'DP' && flight.timeDepFact) {
    return <td>Departed at {normalizeTime(flight.timeDepFact)}</td>
  } else if(flight.status === 'CX') {
    return <td>Cancelled</td>
  } else if(flight.status === 'CK') {
    return <td>Check-in</td>
  } else if(flight.status === 'ON') {
    return <td>On time</td>
  } else if(flight.status === 'BD') {
    return <td>Boarding</td>
  } else if(flight.status === 'GC') {
    return <td>Gate cloased</td>
  } else {
    return <td>{flight.status}</td>
  };
}

function Flight({ flight }) {
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

export default Flight;
