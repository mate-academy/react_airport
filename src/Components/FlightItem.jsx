import React from 'react';
import Airline from './Airline';

export default function FlightItem(props) {
  const { data } = props;
  const timeDepShedule = `${data.timeDepShedule}`.toString().slice(11, 16);
  const timeArrShedule = `${data.timeArrShedule}`.toString().slice(11, 16);
  return (
    <>
      <tr className="flight-item">
        <td>
          <span className={data.term === 'A' ? 'term-a' : 'term-d'}>{data.term}</span>
        </td>
        {props.gate ? <td>{data.gateNo}</td> : null}
        {timeDepShedule
            && (
              <td>
                {timeDepShedule}
              </td>
            )}
        {timeArrShedule
            && (
              <td>
                {timeArrShedule}
              </td>
            )}
        {data[`airportToID.city_en`]
            && (
              <td>
                {data[`airportToID.city_en`]}
              </td>
            )}
        {data['airportFromID.name_en']
            && (
              <td>
                {data['airportFromID.name_en']}
              </td>
            )}
        <td>{data.status}</td>
        <td>
          {data.codeShareData.map(data => (data.airline
            ? <Airline data={data} />
            : ''))}
        </td>
        {data[`carrierID.IATA`] + data.fltNo
            && (
              <td>
                {data[`carrierID.IATA`] + data.fltNo}
              </td>
            )}
        <td>
          <a href="#">
            Flight details
          </a>
        </td>
      </tr>
    </>
  );
}
