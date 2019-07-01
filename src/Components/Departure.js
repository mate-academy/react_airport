import React from 'react';
import Flight from './Flight';

function Departure(props) {
  const dataListDepart = props.data.map((el) => {
    return (
      <Flight
        key={el.ID}
        gate={el.gateNo}
        destionation={el['airportToID.city_en']}
        term={el.term}
        airline={el.airline.en.name}
        flight={el.codeShareData[0].codeShare}
        timeDepart={el.timeDepExpectCalc}
        status={el.status}
        timeDepFact={el.timeDepFact}
      />
    );
  });

  return (
    <>
      {dataListDepart}
    </>
  );
}

export default Departure;
