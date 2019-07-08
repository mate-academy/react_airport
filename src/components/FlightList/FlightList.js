import React from 'react';
import Flight from '../Flight/Flight';
import './flightList.css';

export default function FlightList(props) {
  return (
    <table>
      <thead>
        <tr>
          <th className="tableHeadData">Terminal</th>
          <th className="tableHeadData">Local Time</th>
          <th className="tableHeadData">Destination</th>
          <th className="tableHeadData">Status</th>
          <th className="tableHeadData">Airline</th>
          <th className="tableHeadData">Flight</th>
        </tr>
      </thead>
      <tbody>
        {props.flightItems.map(item => { 
          return <Flight key={item.ID} flight={item}/>
        })}
      </tbody>
    </table>
  )
}
