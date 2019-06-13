import React from 'react';
import '../css/Head.css';

function Head (props) {
  return (
    <thead>
      <tr className="thead_tr">
        <th>Terminal</th>
        <th className={props.status}>Gate</th>
        <th>Local time</th>
        <th>Destination</th>
        <th>Status</th>
        <th>Airline</th>
        <th>Flight</th>
      </tr>
    </thead>
  );
}

export default Head;