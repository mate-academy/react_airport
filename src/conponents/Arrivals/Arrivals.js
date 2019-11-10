import React from 'react';
import Flight from './../Flight/Flight';
import DateSelect from '../DateSelect/DateSelect';
import InfoMainButton from '../tabInfoMainButtons/InfoMainButtons';

function Arrivals(props) {
  const {
    changeToDefaultDate,
    activeButton,
    arrivalArr,
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
          {arrivalArr.map(flight =>
            <Flight
              key={flight.ID}
              term={flight.term}
              localTime={flight.timeToStand}
              destination={flight["airportFromID.city_en"]}
              statusTime={flight.timeLandFact}
              flightCode={flight.codeShareData}
              status={flight.status}
            />)}
        </tbody>
      </table>
    </>
  )
}

export default Arrivals;
