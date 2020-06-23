import React from 'react';
import { useCurrentTime } from '../hooks/useCurrentTime';
import './CurrentDate.scss';

type CurrentDateProps = {
  cityWeather: CurrentWeather;
}

export const CurrentDate: React.FC<CurrentDateProps> = ({ cityWeather }) => {
  const {
    month,
    monthDay,
    weekDay,
    hours,
    minuts,
  } = useCurrentTime(cityWeather.dt, cityWeather.timezone);

  return (
    <div className="date">
      <div className="date__calendar">
        <div className="date__weekday">
          {weekDay}
        </div>
        <div className="date__month">
          {monthDay} {month}
        </div>
      </div>
      <div className="date__time">
        {hours}:{minuts}
      </div>
    </div>
  )
}
