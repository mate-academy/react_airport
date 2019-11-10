import React from 'react';

function Flight({
    term,
    localTime,
    destination,
    statusTime,
    flightCode,
    status,
  }) {

    const statusInfo = () => {
      switch(status) {
        case 'DP':
          return `Departed at ${new Date(statusTime).getHours()}:${
            ('0' + new Date(statusTime).getMinutes()).slice(-2)}`;
        case 'CX':
          return `Cancelled`;
        case 'LN':
          return `Landed ${new Date(statusTime).getHours()}:${
            ('0' + new Date(statusTime).getMinutes()).slice(-2)}`;
        case 'FR':
            return 'In fly';
        case 'ON':
            return 'On time';
        case 'CK':
            return 'Check-in';
        case 'GC':
            return "Gate close"
        case 'BD':
            return 'Begin departure'
        default:
          return '';
      }
    }
  
  return (
    <tr>
      <td style={{ textAlign: 'center' }}>{term}</td>
      <td>{`${new Date(localTime).getHours()}:${('0' + new Date(localTime).getMinutes()).slice(-2)}`}</td>
      <td>{destination}</td>
      <td>{statusInfo()}</td>
      <td>{flightCode.map(air => <li key={air.codeShare}><img src={air.airline.en.logoSmallName} alt="logo" />{air.airline.en.name}</li>)}</td>
      <td>{flightCode.map(code => <li key={code.codeShare}>{code.codeShare}</li> )}</td>
    </tr>
  )
}

export default Flight;
