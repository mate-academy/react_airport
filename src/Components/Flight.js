import React from 'react';

function Flight(props) {
  const { timeDepart, term, gate, destionation, airline, flight, status, timeDepFact } = props;
  const actualTime = new Date(timeDepart);
  const actualHours = actualTime.getHours();
  const actualMins = `${actualTime.getMinutes()}`.padStart(2, '0');
  const actualDep = new Date(timeDepFact);
  const depHours = actualDep.getHours();
  const depMins = `${actualDep.getMinutes()}`.padStart(2, '0');
  const departedStatus = `Departed at ${depHours}:${depMins}`;
  function getStatus(stat) {
    switch (stat) {
      case 'DP':
        return departedStatus;
      case 'CX':
        return 'Cansaled';
      case 'CK':
        return 'Check-in';
      case 'ON':
        return 'ON time';
      default:
        return 'n/d';
    }
  }

  return (
    <tr>
      <td>{term}</td>
      <td>{gate !== undefined ? gate : 'N/D'}</td>
      <td>
        {actualHours}
        :
        {actualMins}
      </td>
      <td>{destionation}</td>
      <td>{getStatus(status)}</td>
      <td>{airline}</td>
      <td>{flight}</td>
      <td className="details"><a href="#">Flight details</a></td>
    </tr>
  );
}

export default Flight;
