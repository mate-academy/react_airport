import React from 'react';
import PropTypes from 'prop-types';
import statusDefinition from '../helpers/statusDef';

const FlightRow = ({
  term,
  localTime,
  destination,
  statusTime,
  flightCode,
  status,
}) => (
  <tr>
    <td>{term}</td>
    <td>
      {`${new Date(localTime).getHours()}:${(`0${new Date(localTime)
        .getMinutes()}`).slice(-2)}`}
    </td>
    <td>{destination}</td>
    <td>{statusDefinition(status, statusTime)}</td>
    <td>
      {flightCode.map(air => (
        <li key={air.codeShare}>
          {air.airline.en.name}
        </li>
      ))}
    </td>
    <td>
      {flightCode.map(code => <li key={code.codeShare}>{code.codeShare}</li>)}
    </td>
  </tr>
);

FlightRow.propTypes = {
  term: PropTypes.string,
  localTime: PropTypes.string,
  destination: PropTypes.string,
  statusTime: PropTypes.string,
  flightCode: PropTypes.arrayOf(PropTypes.object),
  status: PropTypes.string,
}.isRequired;

FlightRow.defaultProps = {
  statusTime: '',
};

export default FlightRow;
