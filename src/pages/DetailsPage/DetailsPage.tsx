import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCitiesWeather, loadWeatherDetails } from '../../store';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { CurrentWeatherCard } from '../../components/CurrentWeatherCard';
import { CurrentDate } from '../../components/CurrentDate';
import { WeatherTable } from '../../components/WeatherTable';
import { WeatherChart } from '../../components/WeatherChart';
import { WeekForecast } from '../../components/WeekForecast';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import { BackButton } from '../../components/BackButton/BackButtom';


const useStyles = makeStyles((theme: Theme) =>
createStyles({
    root: {
      flexGrow: 1,
      maxWidth: 1240,
      marginTop: 20,
      margin: `auto`,
      paddingLeft: 10,
      paddingRight: 10,
    },

    subcontainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      [theme.breakpoints.down('xs')]: {
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'repeat(5, 100px)',
      },
    },

    paper: {
      position: 'relative',
      padding: theme.spacing(2),
      textAlign: 'center',
      color: `rgba(0, 0, 0, 0.87)`,
      backgroundColor: 'transparent',
    },
  }),
);

export const DetailsPage = () => {
  const classes = useStyles();
  const citiesWeather: CurrentWeather[] = useSelector(getCitiesWeather);
  const { cityId } = useParams();
  const dispatch = useDispatch();

  const cityWeather = useMemo(() => (
      citiesWeather.find(city => city.id === +cityId)
  ), [cityId, citiesWeather])


  useEffect(() => {
    dispatch(loadWeatherDetails(cityId));
  }, [cityId, dispatch])

  return (
    (!cityWeather)
      ? <ErrorPage />
      : (
      <div className={classes.root}>
        <BackButton />
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper} style={{height: '20vh'}}>
              <CurrentDate cityWeather={cityWeather} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper} style={{height: '20vh'}}>
              { cityWeather&&<CurrentWeatherCard
                cityWeather={cityWeather}
              />}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} >
            <Paper className={classes.paper} style={{height: '30vh'}}>
              <WeatherTable  cityWeather={cityWeather} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} >
            <Paper
              className={classes.paper}
              style={{height: '30vh'}}
            >
              <WeatherChart currentDate={cityWeather.dt}/>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} className={classes.subcontainer}>
           <WeekForecast />
          </Grid>
        </Grid>
      </div>
    )
  )
}
