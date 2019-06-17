import React from 'react';
import PropTypes from 'prop-types';

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

Thead.propTypes = {
  page: PropTypes.oneOf(['departure', 'arrival'])
}

export default Thead;
