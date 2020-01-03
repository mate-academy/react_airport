import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const Flight = ({ flight: {
  term,
  gateNo: gate,
  actual = '',
  timeArrShedule = '',
  'airportToID.city_en': destination,
  'airportFromID.city_en': from,
  airline: { en: { name: airline } },
  fltNo: flightNo,
  status,
} }) => {
  const location = useLocation();

  return (
    <TableRow className="row">
      <TableCell>{term}</TableCell>
      <TableCell>
        {location.pathname === '/arrivals'
          ? timeArrShedule.slice(11, 16)
          : gate}
      </TableCell>
      <TableCell>{actual.slice(11, 16)}</TableCell>
      <TableCell>
        {location.pathname === '/arrivals' ? from : destination}
      </TableCell>
      <TableCell>{airline}</TableCell>
      <TableCell>{flightNo}</TableCell>
      <TableCell>{status}</TableCell>
    </TableRow>
  );
};

Flight.propTypes = { flight: PropTypes.shape({
  term: PropTypes.string,
  gate: PropTypes.string,
  actual: PropTypes.string,
  timeArrShedule: PropTypes.string,
  'airportToID.city_en': PropTypes.string,
  'airportFromID.city_en': PropTypes.string,
  fltNo: PropTypes.string,
  status: PropTypes.string,
}).isRequired };

export default Flight;
