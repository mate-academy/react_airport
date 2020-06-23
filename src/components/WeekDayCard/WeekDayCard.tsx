import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { weekDays, monthes, ABSOLUTE_ZERO } from '../../helpers/constants';

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  card: {
    margin: 0,
    backgroundColor: 'rgba(255, 159, 64, 0.4)',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
    }
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundSize: 'auto',
    margin: 'auto',
    backgroundColor: 'rgba(229, 229, 229, 0.6);',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '0',
      height: 80,
      width: 80,
      backgroundColor: 'transparent',
    }
  },
  image: {
    width: 64,
    height: 64,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
}));

type CardProps = {
  dayForecast: CurrentWeather;
}

export const WeekDayCard: React.FC<CardProps> = ({ dayForecast }) => {
  const classes = useStyles();
  const date: Date = new Date(dayForecast.dt * 1000);
  const weekDay = date.getDay();
  const monthDay = date.getDate();
  const month = date.getMonth();

  return (
    <Card className={classes.card}>
      <CardContent
        style={{
          boxSizing: 'border-box',
          height: 100
        }}
      >
        <Typography  gutterBottom style={{fontSize: '1.5rem'}} component="h2">
          {weekDays[weekDay].substr(0,3)}
          <Typography component="p">
          {monthDay}{' '}{monthes[month]}
          </Typography>
        </Typography>
      </CardContent>
      <CardMedia
        className={classes.media}
        image={`http://openweathermap.org/img/wn/${dayForecast.weather[0].icon}@2x.png`}
        title="weather__icon"
      />
      <CardContent
        style={{
          boxSizing: 'border-box',
          height: 100
        }}
      >
        <Typography gutterBottom variant="h6" component="h2">
          {dayForecast.main.temp >= 0 ? "+" : "-"}
          {Math.round(dayForecast.main.temp + ABSOLUTE_ZERO)}
        </Typography>
        <Typography component="p">
        {dayForecast.weather[0].main}
        </Typography>
      </CardContent>
    </Card>
  )
}

