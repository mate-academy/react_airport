import React from 'react';
// eslint-disable-next-line
const FlightRow = ({ departure }) => (
  <>
    <td>{departure.term}</td>
    <td>{departure.gateNo}</td>
    <td>{departure.timeBoard}</td>
    <td>{departure[`airportToID.name_en`]}</td>
    <td>{departure.airline.en.name}</td>
    <td>{departure.status}</td>
  </>
);

export default FlightRow;
