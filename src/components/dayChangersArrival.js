import React from 'react';
import { NavLink } from 'react-router-dom';
import '../index.css';

function DayChangersArrival({
  activeDay, yesterday, today, tomorrow,
}) {
  const date = new Date();

  return (
    <div className="dateContainer">
      <NavLink
        to={`/arrivals/${yesterday()}`}
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
        to={`/arrivals/${today()}`}
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
        to={`/arrivals/${tomorrow()}`}
        exact
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

export default DayChangersArrival;
