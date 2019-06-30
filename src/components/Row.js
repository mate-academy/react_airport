import React from 'react';
import PropTypes from 'prop-types';

function Row({ data }) {
  return (
    <tr>
      {data.map(cellData => (<td>{cellData}</td>))}
    </tr>
  );
}

Row.propTypes = {
  data: PropTypes.arrayOf.isRequired,
};

export default Row;
