import React from 'react';
import Departure from './Departure';

function DepartHolder(props) {
  return (
    <>
      <table className="departure current_table">
        <thead>
          <tr>
            <th>Terminal</th>
            <th>Gate</th>
            <th>Local time</th>
            <th>Destination</th>
            <th>Status</th>
            <th>Airline</th>
            <th>Flight</th>
          </tr>
        </thead>
        <tbody>
          <Departure data={props.data} />
        </tbody>
      </table>
    </>
  );
}

export default DepartHolder;
