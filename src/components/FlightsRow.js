import React from 'react';
import { FLIGHT_TYPES } from '../constants';
import './flightsRow.css'

export default function FlightsRow(props) {
  const { DEPARTURE } = FLIGHT_TYPES;
  const { 
    terminal,
    gate,
    time,
    destination,
    status,
    airline,
    flightNumber,
  } = props.data;

  const { currRender } = props;

  return (
    <tr className="flights-body__row">
      <td className="flights-body__row-terminal"><p>{terminal}</p></td>
      {currRender ===  DEPARTURE &&
        <td className="flights-body__row-ggate">{gate || '-'}</td>}
      <td className="flights-body__row-time">{time}</td>
      <td className="flights-body__row-destination">{destination}</td>
      <td className="flights-body__row-status">{status}</td>
      <td className="flights-body__row-airline">{airline}</td>
      <td className="flights-body__row-flight">{flightNumber}</td>
    </tr>
  )
}
