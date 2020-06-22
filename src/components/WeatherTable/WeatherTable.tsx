import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  table: {
    width: `100%`,
  },
});

function createData( name: string, value: string ) {
  return { name, value };
}

type WeatherTableProps = {
  cityWeather: CurrentWeather;
}

export const WeatherTable: React.FC<WeatherTableProps> = ({ cityWeather }) => {
  const classes = useStyles();

  const rows = [
    createData('Humidity',  cityWeather.main.humidity + '%' ),
    createData('Pressure', cityWeather.main.pressure + 'mb'),
    createData('Cloudiness', cityWeather.clouds.all + '%'),
    createData('Visibility',  Math.round(cityWeather.visibility)/1000 + 'km'),
    createData('Wind', Math.round(cityWeather.wind.speed) + 'mph'),
  ];

  return (
    <Table className={classes.table} aria-label="simple table">
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.name}>
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="right">{row.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

