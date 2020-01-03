import React from 'react';
import '../index.css';

function TableHead() {
  return (
    <thead>
      <tr>
        <th className="tableHead">Terminal</th>
        <th className="tableHead">Local time</th>
        <th className="tableHead">Destination</th>
        <th className="tableHead">Status</th>
        <th className="tableHead">Airline</th>
        <th className="tableHead">Flight</th>
        <th className="tableHead" />
      </tr>
    </thead>
  );
}

export default TableHead;
