import React from 'react';
import '../index.css';
import { NavLink, Route } from 'react-router-dom';
import TableHead from './TableHead';
import Details from './DeparturesDetails';
import DayChangersDeparture from './dayCahngersDeparture';

const localtime = (time) => {
  const numbers = new Date(time).toLocaleTimeString('uk-UA');

  return numbers;
};

const Departure = ({
  departure, activeDay, yesterday, today, tomorrow, props, setItemForDetails,
}) => {
  const status = (item) => {
    if (item.status === 'DP') {
      return `Departed at ${localtime(item.timeDepExpectCalc)}`;
    }

    switch (item.status) {
      case 'CX':
        return 'Cancelled';
      case 'CK':
        return 'Check-in';
      case 'ON':
        return 'On time';
      default:
        return '';
    }
  };

  return (
    <>
      <DayChangersDeparture
        activeDay={activeDay}
        yesterday={yesterday}
        today={today}
        tomorrow={tomorrow}
        props={props}
      />
      <table>
        <TableHead />
        <tbody>
          {departure.map((item, index) => (
            <>
              <tr
                key={item.ID}
                className={index % 2 === 0 ? 'row oddRow' : 'row'}
              >
                <td className="cell terminal">
                  <span className={item.term === 'A' ? 'terminalA' : 'terminalD'}>
                    {item.term}
                  </span>
                </td>
                <td className="cell">{localtime(item.timeToStand)}</td>
                <td className="cell">{item['airportToID.city_en']}</td>
                <td className="cell">{status(item)}</td>
                <td className="cell">{item.airline.en.name}</td>
                <td className="cell">{item['carrierID.IATA'] + item.fltNo}</td>
                <td className="cell lasetCell">
                  <NavLink to="/departuresDetails" exact onClick={() => setItemForDetails([item])}>
                    Flight details
                  </NavLink>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Departure;
