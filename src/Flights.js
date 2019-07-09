import React from 'react';
import PropTypes from 'prop-types';

export default function Flights(props) {
  const {
    flight,
    term,
    time,
    airportTo,
    statusCode,
    actual,
    gateNo,
    displayGate,
  } = props;

  const colorTerm = term === 'A' ? 'termAIcon' : 'termBIcon';
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
    switch (statusCode) {
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
        statusFlight = statusCode;
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
      {displayGate ? <td>{gateNo || '-'}</td> : null}
      <td>{flightTime}</td>
      <td>{airportTo}</td>
      <td>{getStatus()}</td>
      <td>{flights}</td>
      <td>{airlines}</td>
    </tr>
  );
}

Flights.propTypes = {
  flight: PropTypes.arrayOf(PropTypes.object),
  term: PropTypes.string,
  time: PropTypes.objectOf(PropTypes.string),
  airportTo: PropTypes.string,
  statusCode: PropTypes.string,
  actual: PropTypes.objectOf(PropTypes.string),
  gateNo: PropTypes.string,
  displayGate: PropTypes.bool,
};

Flights.defaultProps = {
  flight: [],
  term: '',
  time: {},
  airportTo: '',
  statusCode: '',
  actual: {},
  gateNo: '',
  displayGate: false,
};
