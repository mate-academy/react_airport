import React from 'react';
import PropTypes from 'prop-types';

const FlightRow = ({ flight, isDepartures }) => {
  const timeLocal = isDepartures
    ? flight.timeDepExpectCalc
    : flight.timeArrExpectCalc;

  const timeShedule = isDepartures
    ? flight.timeDepShedule
    : flight.timeArrShedule;

  const getTime = (time) => {
    const date = new Date(Date.parse(time));
    const hoursMinutes = `${date.getHours()}:${date.getMinutes()}`;

    return hoursMinutes;
  };

  return (
    <tr>
      <td>
        <span className="flights-table__terminal">
          {flight.term}
        </span>
      </td>

      <td>
        {getTime(timeLocal)}
      </td>

      <td>
        {isDepartures
          ? flight['airportToID.name_en']
          : flight['airportFromID.name_en']
        }
      </td>

      <td>
        {isDepartures ? 'Departed at ' : 'Landed '}
        {getTime(timeShedule)}
      </td>

      <td className="flights-table__logo-cell">
        <img
          src={flight.airline.en.logoSmallName}
          alt="logo"
          style={{ width: '50px' }}
        />
        <p>{flight.airline.en.name}</p>
      </td>

      <td>
        {flight['planeTypeID.code']}
      </td>

      <td className="flights-table__link-cell">
        <a href="https://iev.aero/en/departures?date=20-07-2019">
          Flight details
        </a>
      </td>
    </tr>
  );
};

FlightRow.propTypes = {
  flight: PropTypes.objectOf(
    PropTypes.string,
    PropTypes.object,
  ).isRequired,
  isDepartures: PropTypes.bool.isRequired,
};

export default FlightRow;
