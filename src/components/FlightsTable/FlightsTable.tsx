import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { Table } from 'semantic-ui-react';
import * as selectors from '../../store';
import Flight from '../Flight';
import { ARRIVAL } from '../../constants/flightDirection';
import './FlightsTable.scss';

const headersConfig: IHeadersConfig = {
  terminal: 'Terminal',
  gate: 'Gate',
  time: 'Local time',
  destination: 'Destination',
  status: 'Status',
  airline: 'Airline',
  flight: 'Flight',
  details: 'Details',
};

type TableHeader = {
  code: string;
  name: string;
};

const createTableHeaders = (flights: IFlight[]): TableHeader[] => {
  if (flights.length === 0) {
    return [{ name: 'There are no flights', code: '' }];
  }

  return (
    Object.entries(headersConfig).map(([key, value]) => ({
      code: key, name: value,
    }))
  );
};

const FlightsTable = () => {
  const direction = useSelector(selectors.getDirection);
  const flights = useSelector(selectors.getFlightsAll)[direction];
  const tableHeaders = createTableHeaders(flights);
  const { currentDay } = useParams();

  console.log(currentDay);

  return (
    <Table
      className="FlightsTable"
      fixed
      celled
    >
      <Table.Header className="FlightsTable-TableHeader">
        <Table.Row className="FlightsTable-TableRow">
          {tableHeaders.map(({ name, code }) => (
            direction === ARRIVAL && name === 'Gate' ? null
              : (
                <Table.HeaderCell
                  key={code}
                  className={cn({
                    'FlightsTable-HeaderCell': true,
                    [`FlightsTable-HeaderCell_${code}`]: true,
                  })}
                >
                  {name}
                </Table.HeaderCell>
              )))}
        </Table.Row>
      </Table.Header>

      <Table.Body className="FlightsTable-TableBody">
        {flights.map(flight => (
          <Flight
            key={flight.ID}
            flight={flight}
          />
        ))}
      </Table.Body>
    </Table>
  );
};

export default FlightsTable;
