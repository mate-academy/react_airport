import React from 'react';
import Arrival from './Arrival';

function ArrivalHolder(props) {
  return (
    <>
      <table className="arrival current_table">
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
          <Arrival data={props.data} />
        </tbody>
      </table>
    </>
  );
}

export default ArrivalHolder;
