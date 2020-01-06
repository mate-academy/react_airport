import React, { useState, useEffect } from 'react';
import { getFlights } from '../../api/service';
import FlightRow from './FlightRow';

const FlightTable = () => {
  const [departures, setDepartures] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [arrivals, setArrivals] = useState([]);

  useEffect(() => {
    getFlights()
      .then((json) => {
        setDepartures(json.body.departure);
        setArrivals(json.body.arrivals);
      });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Terminal</th>
          <th>Gate</th>
          <th>Time</th>
          <th>Destination</th>
          <th>Airline</th>
          <th>Flight</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {departures.length === 0
          ? <tr>loading</tr>
          : (
            departures
              .map(item => (
                <tr><FlightRow departure={item} key={item.id} /></tr>
              ))
          )
        }
      </tbody>
    </table>
  );
};

export default FlightTable;
