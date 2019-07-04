import React from 'react';

function Status(props) {
  let statusD;
  switch (props.flight.status) {
    case 'DP':
      statusD = `Departed at ${props.flight.timeFact}`;
      break;
    case 'CX':
      statusD = 'Cancelled';
      break;
    case 'BD':
      statusD = 'In boarding';
      break;
    case 'DL':
      statusD = 'Delayed';
      break;
    case 'CK':
      statusD = 'Check in';
      break;
    case 'LN':
      statusD = `Landed at ${props.flight.timeFact}`;
      break;
    default: statusD = 'On time';
  }
  return <td>{statusD}</td>;
}

export default Status;
