import React from 'react';

export default function Flights(props) {
  // console.log(props.airline.name)
  //const airlines = props.airlines.map(airline=> <div>airline.name</div>);

  return (
    <tr>
      <td>{props.term}</td>
      <td>{props.timeDepExpectCalc}</td>
      <td>{props.airportTo}</td>
      <td>{props.status}</td>
      <td>{props.airline.name}</td>
      <td>{props.fltNo}</td>
      <td>{props.gateNo}</td>
    </tr>
  );
}
