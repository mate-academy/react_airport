import React from 'react';

function ArrivalFlights(props) {
  const actualTime = new Date(props.expectTimeLand);
  const actualHours = `${actualTime.getHours()}`.padStart(2, '0');
  const actualMins = `${actualTime.getMinutes()}`.padStart(2, '0');
  const actualLand = new Date(props.timeLandFact);
  const landHours = `${actualLand.getHours()}`.padStart(2, '0');
  const landMins = `${actualLand.getMinutes()}`.padStart(2, '0');
  const landedStatus = `landed at ${landHours}:${landMins}`;
  function getStatus(stat) {
    if (stat === 'LN') {
      return landedStatus;
    } if (stat === 'CX') {
      return 'Cansaled';
    } if (stat === 'FR') {
      return 'in flight';
    } if (stat === 'ON') {
      return 'On time';
    } return `n/d`;
  }
  return (
    <tr>
      <td>{props.term}</td>
      <td>{actualHours}:{actualMins}</td>
      <td>{props.destionation}</td>
      <td>{getStatus(props.status)}</td>
      <td>{props.airline}</td>
      <td>{props.flight}</td>
      <td className="details"><a href="#">Flight details</a></td>
    </tr>
  );
}
export default ArrivalFlights;
