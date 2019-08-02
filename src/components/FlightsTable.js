import React from 'react';
import PropTypes from 'prop-types';
import FlightsTableHeader from './FlightsTableHeader';
import FlightRow from './FlightRow';

const FlightsTable = (props) => {
  const {
    currentSchedule, sortTable, isSortOn, isDepartures,
  } = props;

  return (
    <table className="flights-table">
      <FlightsTableHeader
        sortTable={sortTable}
        isSortOn={isSortOn}
      />

      <tbody className="flights-table__body">
        {currentSchedule.map(flight => (
          <FlightRow
            key={flight.ID}
            flight={flight}
            isDepartures={isDepartures}
          />
        ))}
      </tbody>
    </table>
  );
};

FlightsTable.propTypes = {
  currentSchedule: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortTable: PropTypes.func.isRequired,
  isSortOn: PropTypes.bool.isRequired,
  isDepartures: PropTypes.bool.isRequired,
};

export default FlightsTable;
