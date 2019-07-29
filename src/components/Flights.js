import React from 'react';
import PropTypes from 'prop-types';

import { TYPE_DEPARTURE } from '../helper';

const Flights = ({ currentData, type }) => {
  const currentTime = (
    type === TYPE_DEPARTURE ? (
      new Date(currentData.timeDepShedule).toTimeString().slice(0, 5)
    ) : (
      new Date(currentData.timeToStand).toTimeString().slice(0, 5)
    )
  );

  const currentDestination = (
    type === TYPE_DEPARTURE ? (
      currentData['airportToID.city_ru']
    ) : (
      currentData['airportFromID.city_ru']
    )
  );

  return (
    <tr>
      <td>{currentData.term}</td>
      <td>{currentTime}</td>
      <td>{currentDestination}</td>
      <td>{currentData.status}</td>
      <td>{currentData.airline.ru.name}</td>
      <td>
        {currentData['carrierID.IATA']}
        {currentData.fltNo}
      </td>
    </tr>
  );
};

Flights.propTypes = {
  currentData: PropTypes.shape({
    term: PropTypes.string.isRequired,
    timeToStand: PropTypes.string.isRequired,
    'airportToID.city_ru': PropTypes.string,
    'airportFromID.city_ru': PropTypes.string,
    'carrierID.IATA': PropTypes.string,
    fltNo: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  type: PropTypes.string.isRequired,
};

export default Flights;
