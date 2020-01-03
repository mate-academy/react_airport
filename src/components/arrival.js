import React from 'react';
import '../index.css';
import { NavLink, Route } from 'react-router-dom';
import TableHead from './TableHead';
import ArrivalsDetails from './ArrivalsDetails';
import DayChangersArrival from './dayChangersArrival';

const localtime = (time) => {
  const numbers = new Date(time).toLocaleTimeString('uk-UA');

  return numbers;
};

const Arrival = ({
  arrival, activeDay, yesterday, today, tomorrow, props, setItemForDetails,
}) => {
  const status = (item) => {
    if (item.status === 'LN') {
      return `Landed ${localtime(item.timeLandFact)}`;
    }

    switch (item.status) {
      case 'CX':
        return 'Cancelled';
      case 'FR':
        return 'In flight';
      case 'ON':
        return 'On time';
      default:
        return '';
    }
  };

  return (
    <>
      <DayChangersArrival
        activeDay={activeDay}
        yesterday={yesterday}
        today={today}
        tomorrow={tomorrow}
        props={props}
      />
      <table>
        <TableHead />

        <tbody>
          {arrival.map((item, index) => (
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
                <td className="cell">{new Date(item.timeToStand).toLocaleTimeString('uk-UA')}</td>
                <td className="cell">{item['airportFromID.city_en']}</td>
                <td className="cell">{status(item)}</td>
                <td className="cell">{item.airline.en.name}</td>
                <td className="cell">{item['carrierID.IATA'] + item.fltNo}</td>
                <td className="cell lasetCell">
                  <NavLink to="/arrivalsDetails" exact onClick={() => setItemForDetails([item])}>
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

export default Arrival;
