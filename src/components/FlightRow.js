import React from 'react';

function FlightRow(props) {
  const { flight } = props;
  const flightFields = Object.entries(flight).map((field) => {
    return (
      <td className={field[0]}>
        {field[1]}
      </td>
    );
  });

  return (
    <tr>
      {flightFields}
      <td className="flight-details">
        <a href="/">
          Flight details
        </a>
      </td>
    </tr>
  );
}

export default FlightRow;
