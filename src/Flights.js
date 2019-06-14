import React from 'react';

export default function Flights(props) {
  const {
    flight,
    term,
    time,
    airportTo,
    status,
    actual,
    gate,
  } = props;

  const colorTerm = term === 'A' ? 'termA' : 'termB';
  const gateTd = gate || '-';
  const flights = flight.map(flightItem => (
    <div key={flightItem.airline.en.id}>
      {flightItem.airline.en.name}
    </div>
  ));
  const airlines = flight.map(airline => (
    <div key={airline.airline.en.id}>
      {airline.codeShare}
    </div>
  ));
  const flightTime = `${time.getHours()}:${time.getMinutes()}`;
  const actualFlightTime = `${actual.getHours()}:${actual.getMinutes()}`;

  const getStatus = () => {
    let statusFlight;
    switch (status) {
      case 'ON':
        statusFlight = 'On time';
        break;
      case 'DP':
        statusFlight = 'Departed';
        break;
      case 'CK':
        statusFlight = 'Check-in';
        break;
      case 'LN':
        statusFlight = 'Landed';
        break;
      case 'CX':
        statusFlight = 'Cancelled';
        break;
      case 'BD':
        statusFlight = 'Boarding';
        break;
      default:
        statusFlight = status;
    }

    if (
      statusFlight === 'Boarding'
      || statusFlight === 'Landed'
      || statusFlight === 'Departed'
    ) {
      statusFlight = `${statusFlight} ${actualFlightTime}`;
    }

    return statusFlight;
  };
  return (
    <tr>
      <td><span className={colorTerm}>{term}</span></td>
      <td>{flightTime}</td>
      <td>{airportTo}</td>
      <td>{getStatus()}</td>
      <td>{flights}</td>
      <td>{airlines}</td>
      <td>{gateTd}</td>
    </tr>
  );
}
