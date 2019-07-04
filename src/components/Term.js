import React from 'react';

function Term(props) {
  const terminalLetter = props.flight.term === 'A' ? 'terminal terminalA' : 'terminal terminalD';
  return <td><div className={terminalLetter}>{props.flight.term}</div></td>;
}

export default Term;
