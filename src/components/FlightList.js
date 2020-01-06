import React from 'react';
import PropTypes from 'prop-types';
import FlightRow from './FlightRow';

const FlightList = ({ departuresData, activeLink }) => (
  <table>
    <thead>
      <tr>
        <th>Terminal</th>
        <th>Local time</th>
        <th>Destination</th>
        <th>Status</th>
        <th>Airline</th>
        <th>Flight</th>
      </tr>
    </thead>
    <tbody>
      {departuresData.map(flight => (
        <FlightRow
          key={flight.ID}
          term={flight.term}
          localTime={
            activeLink === 'departures'
              ? flight.timeDepExpectCalc
              : flight.timeToStand
          }
          destination={
            activeLink === 'departures'
              ? flight['airportToID.city_en']
              : flight['airportFromID.city_en']
          }
          statusTime={flight.timeTakeofFact || flight.timeDepFact}
          flightCode={flight.codeShareData}
          status={flight.status}
        />
      ))}
    </tbody>
  </table>
);

FlightList.propTypes = {
  departuresData: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeLink: PropTypes.string.isRequired,
};

export default FlightList;
