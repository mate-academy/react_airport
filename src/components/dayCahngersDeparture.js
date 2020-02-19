import React from 'react';
import { NavLink } from 'react-router-dom';
import '../index.css';

function DayChangersDeparture({
  activeDay, yesterday, today, tomorrow,
}) {
  const date = new Date();

  return (
    <div className="dateContainer">
      <NavLink
        to={`/departures/${yesterday()}`}
        className="dateDayContainer"
        activeClassName="activeDate"
        onClick={() => activeDay('YESTERDAY')}
      >
        <div className="dateDay">
          {`${date.getDate() - 1}/${(date.getMonth() + 1)}`}
        </div>
        <div className="dateText">YESTERDAY</div>
      </NavLink>

      <NavLink
        to={`/departures/${today()}`}
        className="dateDayContainer"
        activeClassName="activeDate"
        onClick={() => activeDay('TODAY')}
      >
        <div className="dateDay">
          {`${date.getDate()}/${(date.getMonth() + 1)}`}
        </div>
        <div className="dateText">TODAY</div>
      </NavLink>

      <NavLink
        to={`/departures/${tomorrow()}`}
        className="dateDayContainer"
        activeClassName="activeDate"
        onClick={() => activeDay('TOMORROW')}
      >
        <div className="dateDay">
          {`${date.getDate() + 1}/${(date.getMonth() + 1)}`}
        </div>
        <div className="dateText">TOMORROW</div>
      </NavLink>
    </div>
  );
}

export default DayChangersDeparture;
