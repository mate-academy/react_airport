import React  from 'react';
import './CityCard.scss';
import {
  Cloudy,
  SunnyWithWind,
  CloudyWithLightning,
  Rainy,
  CloudyWithSun,
  Lightning,
  Sunny,
  Snowy
} from '../SvgSprite/SvgSprite';
import { ABSOLUTE_ZERO } from '../../helpers/constants';
import Close from '@material-ui/icons/Close';
import Autorenew from '@material-ui/icons/Autorenew';
import { useDispatch } from 'react-redux';
import { removeCityWeather } from '../../store/cityWeather';
import { loadCityWeatherData } from '../../store';
import { NavLink } from 'react-router-dom';

type cityCardProps = {
  cityWeather: CurrentWeather;
};

export const CityCard: React.FC<cityCardProps> = ({ cityWeather }) => {
  const icons = [
    {id: '04d',component: <Cloudy />},
    {id: '04n',component: <Cloudy />},
    {id: '10d',component: <Rainy />},
    {id: '10n',component: <Rainy />},
    {id: '02d',component: <CloudyWithSun />},
    {id: '02n',component: <CloudyWithSun />},
    {id: '11d',component: <Lightning />},
    {id: '09d',component: <CloudyWithLightning />},
    {id: '01d',component: <Sunny />},
    {id: '01n',component: <Sunny />},
    {id: '13d',component: <Snowy />},
    {id: '03d',component: <Cloudy />},
    {id: '03n',component: <Cloudy />},
    {id: '50d',component: <SunnyWithWind />},
  ]

  const dispatch = useDispatch()
  const { name, weather, main, id } = cityWeather;
  let icon;
  icon = icons.find(item => item.id === weather[0].icon)?.component || '';

  return (
    <div  className="citycard">
      <NavLink to={`/${id}`} className="city__link">
        <li>
          <div className="citycard__container">
            <div className="citycard__city">
              <p className="citycard__city-name">{name}</p>
              <p className="citycard__feels">
                feels like {Math.round(main.feels_like + +ABSOLUTE_ZERO)}&deg;
              </p>
            </div>
            <div className="citycard__weather-main">
              <p className="citycard__weather-icon">
                {icon}
              </p>
              <p className="citycard__weather-describe">
                {weather[0].main}
              </p>
            </div>
            <div className="citycard__temperature">
              {Math.round(main.temp + +ABSOLUTE_ZERO)}&deg;
            </div>
          </div>
        </li>
      </NavLink>
      <button
        className="citycard__btn citycard__btn--delete"
        type="button"
        onClick={() => dispatch(removeCityWeather(cityWeather))}
      >
        <Close color="disabled"/>
      </button>
      <button
        className="citycard__btn citycard__btn--update"
        type="button"
        onClick={() => dispatch(loadCityWeatherData(id))}
      >
        <Autorenew color="disabled"/>
      </button>
    </div>
  );
};
