import React from 'react';

function FlightRow(props) {
  const { flight } = props;
  const flightFields = [];
  for (const field in flight) {
    flightFields.push(
      (
        <td className={field}>
          {flight[field]}
        </td>
      )
    );
  }

  return (
    <tr>
      {flightFields}
      <td className={'flight-details'}>
        <a href="/">
          Flight details
        </a>
      </td>
    </tr>
  );
}

export default FlightRow;
