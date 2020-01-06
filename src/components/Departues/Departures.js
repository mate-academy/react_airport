import React from 'react';
import DatePanel from '../DatePanel/DatePanel';
import FlightTable from '../FlightsTable/FlightsTable';
// eslint-disable-next-line
const Departures = ({ history, location }) => (
  <>
    <h1>Departures</h1>
    <DatePanel history={history} location={location} />
    <FlightTable />
  </>
);

export default Departures;
