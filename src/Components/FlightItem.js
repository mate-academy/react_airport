import React from 'react';
import './FlightList.css'

export default function FlightItem(props) {
  const localDate = new Date(props.item.actual);
  const localeTime = localDate.getHours() + ':' + localDate.getMinutes().toString().padStart(2, '0');
  const timeArrSheduleDate = new Date(props.item.timeArrShedule || props.item.timeDepShedule);
  const timeArrShedule = timeArrSheduleDate.getHours() + ':' + localDate.getMinutes().toString().padStart(2, '0');
  return (
    <tr className='flightList'>
      <td>
        <span className={props.item.term === 'A' ? 'term-a' : 'term-d'}>
          {props.item.term}
        </span>
      </td>
      {props.displayGate ? <td>{props.item.gateNo}</td> : null}
      <td>{localeTime}</td>
      <td>{props.item['airportFromID.city_en'] || props.item['airportToID.city_en']}</td>
      {timeArrSheduleDate ? <td>{timeArrShedule}</td> : 'Canceled'}
      <td>{props.item.airline.en.name}</td>
      <td>{props.item.status + props.item.fltNo}</td>
      <td><a href='https://github.com/OlhaMazurenko/js_ordering-food'>Flight details</a></td>
    </tr>
  );
}
