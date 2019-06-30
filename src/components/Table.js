import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row';

function Table({ data }) {
  const rows = data.map((flightData) => {
    const rowData = [];

    Object.keys(flightData).forEach((key) => {
      if (flightData[key] && key !== 'id') {
        rowData.push(flightData[key]);
      }
    });

    return (
      <Row data={rowData} key={flightData.id} />
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Terminal</th>
          <th>Time</th>
          <th>Destination</th>
          <th>Airline</th>
          <th>Flight</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  data: PropTypes.arrayOf.isRequired,
};

export default Table;
