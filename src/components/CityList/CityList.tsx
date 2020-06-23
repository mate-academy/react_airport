import React from 'react';
import { useSelector } from 'react-redux';
import {  getCitiesWeather } from '../../store';
import './CityList.scss';
import { CityCard } from './../CityCard';
import  Grid  from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    maxWidth: 1240,
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
  }
}));

export const CityList = () => {
  const cityWeatherList = useSelector(getCitiesWeather);
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={6} style={{width: '100%'}} className={classes.root} alignContent="center">
        {cityWeatherList.map(cityWeather => (
          <Grid item
            xs={12} md={6}
            className={classes.card}
            key={cityWeather.id}
          >
            <CityCard
              cityWeather={cityWeather}
              key={cityWeather.id}
            />
          </Grid>
        ))}
        </Grid>
    </>
  )
};

