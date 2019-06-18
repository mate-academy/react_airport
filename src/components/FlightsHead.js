import React from 'react';
import { FLIGHT_TYPES } from '../constants';
import './flightsHead.css'

export default function FlightsHead(props) {
  const { DEPARTURE } = FLIGHT_TYPES;
  const { currRender } = props;

  return (
    <thead className="flights-body__head">
      <tr>
        <th className="flights-body__head-info">terminal</th>
        {currRender === DEPARTURE &&
          <th className="flights-body__head-info">gate</th>}
        <th className="flights-body__head-info">local time</th>
        <th className="flights-body__head-info">destination</th>
        <th className="flights-body__head-info">status</th>
        <th className="flights-body__head-info">airline</th>
        <th className="flights-body__head-info">flight</th>
      </tr>
    </thead>
  );
}
