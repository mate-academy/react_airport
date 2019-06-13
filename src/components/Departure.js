import React from 'react';
import Status from './Status';
import Airline from './Airline';
import Flight from './Flight';
import Term from './Term';

function Departure(props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Terminal</th>
          <th>Gate</th>
          <th>Local time</th>
          <th>Destination</th>
          <th>Status</th>
          <th>Airline</th>
          <th>Flight</th>
        </tr>
      </thead>
      <tbody>
        {props.flight.map((item) => {
          return (
            <tr key={item.ID}>
              <Term flight={item} />
              <td>{item.gateNo}</td>
              <td>{item.timeSchedule}</td>
              <td>{item['airportToID.city_en']}</td>
              <Status flight={item} />
              <Airline flight={item} />
              <Flight flight={item} />
            </tr>
          );
        })
        }
      </tbody>
    </table>
  );
}

export default Departure;
