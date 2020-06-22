import React  from 'react';
import { ABSOLUTE_ZERO } from '../../helpers/constants';
import { useCurrentTime } from '../hooks/useCurrentTime';
import './CurrentWeatherCard.scss';

type CurrentWeatherProps = {
  cityWeather: CurrentWeather;
};

export const CurrentWeatherCard: React.FC<CurrentWeatherProps>  = ({ cityWeather }) => {
  const { name, weather, main, sys, timezone, dt } = cityWeather;
  const { sunset, sunrise } = useCurrentTime(dt,
    timezone,
    sys.sunrise,
    sys.sunset);


  return (
  <div className="current-weather__container">
    <div className="current-weather__weather">
      <div className="current-weather__weather-main">
        <p className="current-weather__temperature">
          {Math.round(main.temp + ABSOLUTE_ZERO)}&deg;
        </p>
        <p className="current-weather-describe">
          {weather[0].main}
        </p>
      </div>
      <div className="current-weather__city">
        <p className="current-weather__city-name">{name}</p>
        <p className="current-weather__feels">
          feels like {Math.round(main.feels_like+  ABSOLUTE_ZERO)}&deg;
        </p>
      </div>

    </div>
    <div className="current-weather__sun">
      <p className="current-weather__sunrise">
        {`Sunrise  ${sunrise}`}
      </p>
      <p className="current-weather__sunset">
        {`Sunset  ${sunset}`}
      </p>
    </div>
  </div>
  )
};
