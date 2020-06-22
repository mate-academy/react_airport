import React, { useState, useEffect } from 'react';
import { getWeatherDetails } from '../../store';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { WeekDayCard } from '../WeekDayCard';

export const WeekForecast = () => {
  const [weekForeCast, setWeekForecst] = useState<CurrentWeather[]>([])
  const weatherDetails: WeatherDetails = useSelector(getWeatherDetails);

  useEffect(() => {
    if(weatherDetails) {

      const preparedWeeksData = weatherDetails.list
        .filter((item) => /\b(12:00)/.test(item.dt_txt||''))
        .slice(0,5);

      setWeekForecst(preparedWeeksData)
    }
  }, [weatherDetails])

  return (
    <>
      {weekForeCast.map(dayForecast => (
        <Grid item key={dayForecast.id}>
          <WeekDayCard dayForecast={dayForecast}  />
        </Grid>
      ))}
    </>
  )
}

