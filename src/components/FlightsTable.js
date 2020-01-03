import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import getFlights from '../api/getFlights';
import Flight from './Flight';

const FlightsTable = ({ direction, date }) => {
  const [flights, setFlights] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const reversedDate = date.split('-').reverse().join('-');

    getFlights(date)
      .then((data) => {
        setFlights(data.body[direction]
          .filter(flight => flight.actual.includes(reversedDate)));
      });
  }, [direction, date]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {[
              'Terminal',
              location.pathname === '/arrivals' ? 'Takeoff Time' : 'Gate',
              location.pathname === '/arrivals'
                ? 'Landing Time'
                : 'Takeoff Time',
              location.pathname === '/arrivals' ? 'From' : 'Destination',
              'Airline',
              'Flight #',
              'Status',
            ].map(title => (
              <TableCell key={title}>{title}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {flights.map(flight => (
            <Flight key={flight.ID} flight={flight} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

FlightsTable.propTypes = {
  direction: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default FlightsTable;
