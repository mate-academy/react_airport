import React from 'react';

function Thead({ page }) {
  return (
    <thead>
      <tr>
        <td>Terminal</td>
        {page === 'departure' ? <td>Gate</td> : null}
        <td className='time'>Local time</td>
        <td className='destination'>Destination</td>
        <td className='status'>Status</td>
        <td className='airline'>Airline</td>
        <td className='flight'>Flight</td>
        <td className='model'>Model</td>
      </tr>
    </thead>
  );
}

export default Thead;
