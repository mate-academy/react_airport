import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Icon, Table } from 'semantic-ui-react';
import * as selectors from '../../store';
import { DEPARTURE } from '../../constants/flightDirection';
import './Flight.scss';

type Props = {
  flight: IFlight;
};

const Flight: React.FC<Props> = ({ flight: {
  ID,
  actual,
  airline,
  'airportToID.city_en': airportTo,
  'airportFromID.city_en': airportFrom,
  // checkinNo = '',
  codeShareData,
  gateNo = '',
  status,
  // timeArrShedule = '',
  // timeDepShedule = '',
  term,
} }) => {
  const direction = useSelector(selectors.getDirection);
  const localDate = new Date(actual);
  const localeTime = `
    ${localDate.getHours()}:${localDate.getMinutes().toString().padStart(2, '0')}
  `;
  // const departureDate = new Date(timeArrShedule || timeDepShedule);
  // const departureTime = `
  //   ${departureDate.getHours()}:${departureDate.getMinutes().toString().padStart(2, '0')}
  // `;

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
      <Table.Cell>{status}</Table.Cell>
      <Table.Cell>{airline ? airline.en.name : null}</Table.Cell>
      <Table.Cell>{codeShareData[0].codeShare}</Table.Cell>
      <Table.Cell className="Flight-Details">
        <Button
          className="Flight-DetailsButton"
          icon
          basic
          color="blue"
          size="small"
        >
          <Icon className="Flight-DetailsIcon" name="plane" />
          Details
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};

export default Flight;
