import React from 'react';
import PropTypes from 'prop-types';
import Flights from './Flights';

const tHead = [
  'Terminal',
  'Local Time',
  'Destination',
  'Status',
  'Airline',
  'Flight',
];
const FlightsTable = ({ currentData, type }) => (
  <table className="table table-borderless">
    <thead>
      <tr>
        {tHead.map(title => (
          <th key={Date.now() * Math.random()}>{title}</th>
        ))}
      </tr>
    </thead>

    <tbody>
      {currentData.map(data => (
        <Flights currentData={data} type={type} key={data.ID + data.fltNo} />
      ))}
    </tbody>
  </table>
);

FlightsTable.propTypes = {
  currentData: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
};

export default FlightsTable;
