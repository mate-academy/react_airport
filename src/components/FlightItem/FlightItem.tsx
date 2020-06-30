import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { Button, Icon, Image, Table } from 'semantic-ui-react';
import * as selectors from '../../store';
import { statusFlight } from '../../helpers/statusFlight';
import { DEPARTURE } from '../../constants/flightDirection';
import './FlightItem.scss';

type Props = {
  flight: IFlight;
};

const FlightItem: React.FC<Props> = ({ flight: {
  ID,
  airline,
  'airportToID.city_en': airportTo,
  'airportFromID.city_en': airportFrom,
  codeShareData,
  gateNo = '',
  status,
  timeDepShedule = '',
  timeToStand = '',
  timeTakeofFact = '',
  term,
} }) => {
  const match = useRouteMatch('/flights');
  const direction = useSelector(selectors.getDirection);
  const localDate = new Date(timeDepShedule || timeToStand);
  const departureDate = new Date(timeTakeofFact);
  const localeTime = `${localDate.getHours()}:${localDate
    .getMinutes().toString().padStart(2, '0')}`;
  const departureTime = `${departureDate.getHours()}:${departureDate
    .getMinutes().toString().padStart(2, '0')}`;

  return (
    <Table.Row className="Flight FlightsTable-TableRow" textAlign="center">
      <Table.Cell className="Flight-Term">
        <span className={cn({
          'Flight-TermCircle': true,
          [`Flight-TermCircle_${term.toLowerCase()}`]: true,
        })}
        >
          {term}
        </span>
      </Table.Cell>
      {
        direction === DEPARTURE
          ? <Table.Cell className="Flight-Gate">{gateNo}</Table.Cell>
          : null
      }
      <Table.Cell className="Flight-Time">{localeTime}</Table.Cell>
      <Table.Cell className="Flight-Destination">
        {airportTo || airportFrom}
      </Table.Cell>
      <Table.Cell className="Flight-Status">
        {status === 'DP'
          ? `${statusFlight(status)} ${
            timeTakeofFact ? `at: ${departureTime}` : ''
          }`
          : statusFlight(status)}
      </Table.Cell>
      <Table.Cell className="Flight-Airline">
        <Image
          className="Flight-AirlineImage"
          src={airline.en.logoSmallName}
          verticalAlign="middle"
          size="mini"
        />
        <div className="Flight-AirlineName">
          {airline ? airline.en.name : null}
        </div>
      </Table.Cell>
      <Table.Cell className="Flight-Flight">
        {codeShareData[0].codeShare}
      </Table.Cell>
      <Table.Cell className="Flight-Details">
        <Button
          className="Flight-DetailsButton"
          as={Link}
          to={`${match?.path}/${ID}`}
          icon
          basic
          color="blue"
          size="small"
          airline={airline}
        >
          <Icon className="Flight-DetailsIcon" name="plane" />
          Details
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};

export default FlightItem;
