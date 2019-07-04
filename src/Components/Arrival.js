import React from 'react';
import ArrivalFlights from './ArrivalFlights';

function Arrival(props) {
  const dataListArrival = props.data.map((el) => {
    return (
      <ArrivalFlights
        key={el.ID}
        term={el.term}
        airline={el.airline.en.name}
        flight={el.codeShareData[0].codeShare}
        status={el.status}
        destionation={el['airportFromID.city_en']}
        expectTimeLand={el.timeLandCalc}
        timeLandFact={el.timeLandFact}
      />
    );
  });
  return (
    <>
      {dataListArrival}
    </>
  );
}

export default Arrival;
