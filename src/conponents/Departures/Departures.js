import React from 'react';
import Flight from './../Flight/Flight';

function Departures({ departureArr }) {
  console.log(departureArr)
  console.log(departureArr.find(dep => dep.codeShareData[0].codeShare === 'B2830'))
  return (
    <table>
      <thead>
        <tr>
          <th style={{ textAlign: 'center' }}>Terminal</th>
          <th>Local time</th>
          <th>Destination</th>
          <th>Status</th>
          <th>Airline</th>
          <th>Flight</th>
        </tr>
      </thead>
      <tbody>
        {departureArr.map(flight =>
          <Flight
            key={flight.ID}
            term={flight.term}
            localTime={flight.timeDepExpectCalc}
            destination={flight["airportToID.city_en"]}
            statusTime={flight.timeTakeofFact || flight.timeDepFact}
            flightCode={flight.codeShareData}
            status={flight.status}
          />)}
      </tbody>
    </table>
  )
}

export default Departures;
