import React from 'react';
import Flight from './../Flight/Flight';
import DateSelect from './../DateSelect/DateSelect';
import InfoMainButton from '../tabInfoMainButtons/InfoMainButtons';

function Departures(props) {
  const {
    changeToDefaultDate,
    activeButton,
    departureArr,
    setCurrentDay,
    currentDay
  } = props;

  return (
    <>
      <InfoMainButton
        changeToDefaultDate={changeToDefaultDate}
        activeButton={activeButton}
      />
      <DateSelect setCurrentDay={setCurrentDay} currentDay={currentDay} />
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
    </>
  )
}

export default Departures;
