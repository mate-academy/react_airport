import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { Table } from 'semantic-ui-react';
import * as selectors from '../../store';
import FlightItem from '../FlightItem';
import { ARRIVAL } from '../../constants/flightDirection';
import { flightsData } from '../../helpers/flightsData';
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

  const flightsDay = useMemo(() => {
    return flightsData(flights, currentDay);
  }, [flights, currentDay]);

  return (
    <Table
      className="FlightsTable"
      padded
      fixed
    >
      <Table.Header className="FlightsTable-TableHeader">
        <Table.Row className="FlightsTable-TableRow">
          {tableHeaders.map(({ name, code }) => (
            direction === ARRIVAL && name === 'Gate' ? null
              : (
                <Table.HeaderCell
                  key={code}
                  textAlign="center"
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
        {flightsDay.map(flight => (
          <FlightItem
            key={flight.ID}
            flight={flight}
          />
        ))}
      </Table.Body>
    </Table>
  );
};

export default FlightsTable;
