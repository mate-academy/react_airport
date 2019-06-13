import React from 'react';

function Flight(props) {
  return (
    <td>
      <ul>
        {props.flight.codeShareData
          .map(item => <li key={item.codeShare}>{item.codeShare}</li>)}
      </ul>
    </td>
  );
}

export default Flight;
