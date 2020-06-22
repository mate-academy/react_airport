import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Icon, Table } from 'semantic-ui-react';
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
  // checkinNo = '',
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
    <Table.Row key={ID} className="Flight FlightsTable-TableRow">
      <Table.Cell className="Flight-Term">
        <span className={term === 'A' ? 'Flight-Term_a' : 'Flight-Term_d'}>
          {term}
        </span>
      </Table.Cell>
      {direction === DEPARTURE ? <td>{gateNo}</td> : null}
      <Table.Cell>{localeTime}</Table.Cell>
      <Table.Cell>{airportTo || airportFrom}</Table.Cell>
      <Table.Cell>
        {status === 'DP'
          ? `${statusFlight(status)} ${departureTime}`
          : statusFlight(status)}
      </Table.Cell>
      <Table.Cell>{airline ? airline.en.name : null}</Table.Cell>
      <Table.Cell>{codeShareData[0].codeShare}</Table.Cell>
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
