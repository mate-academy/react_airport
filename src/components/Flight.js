import React from 'react';
import './Flight.css';

export default function Flight(props, text, departuresState) {
  const localDate = new Date(props.actual);
  const localeTime = `
        ${timeView(localDate.getHours())}:${timeView(localDate.getMinutes())}
        `;
  const depArrDate = new Date(props.timeDepShedule || props.timeArrShedule);
  const depArrTime = `
        ${timeView(depArrDate.getHours())}:${timeView(depArrDate.getMinutes())}
        `;

  return (
    <tr className="flight" key={props.ID}>
      <td><span className="terminal">{props.term}</span></td>
      {departuresState === undefined
        ? <td>{props.gateNo || ''}</td>
        : null}
      <td>{localeTime}</td>
      <td>{props['airportToID.city_en'] || props['airportFromID.city_en']}</td>
      <td>{text + depArrTime}</td>
      <td>{props.airline.en.name}</td>
      <td>{props.codeShareData[0].codeShare}</td>
      <td><a href="#" className="details">Flight details</a></td>
    </tr>
  );
}

function timeView(elem) {
  return elem < 10 ? `0${elem}` : elem;
}
