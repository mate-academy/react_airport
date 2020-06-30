import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Header, Table, Image, Accordion, Message, Label,
} from 'semantic-ui-react';
import cn from 'classnames';
import ReactHtmlParser from 'react-html-parser';
import * as selectors from '../../store';
import Spinner from '../common/Spinner';
import { statusFlight } from '../../helpers/statusFlight';
import { DEPARTURE, ARRIVAL } from '../../constants/flightDirection';
import './FlightDetails.scss';

const headersDetailsConfig: IHeadersDetailsConfig = {
  date: 'Date',
  time: 'Local time',
  terminal: 'Terminal',
  flight: 'Flight',
  stand: 'Stand',
  gate: 'Gate',
};

type TableHeader = {
  code: string;
  name: string;
};

const tableHeaders: TableHeader[] = Object.entries(headersDetailsConfig)
  .map(([key, value]) => ({
    code: key, name: value,
  }));

const options = { day: '2-digit', month: '2-digit' };

const FlightDetails = () => {
  const flights = useSelector(selectors.getFlightsAll);
  const { flightsId } = useParams();
  const currentFlight: IFlight | undefined = useMemo(() => {
    return (
      flights[DEPARTURE].find(flight => flight.ID === +flightsId)
      || flights[ARRIVAL].find(flight => flight.ID === +flightsId)
    );
  }, [flights, flightsId]);

  if (!currentFlight) {
    return <Spinner />;
  }

  const {
    'airportToID.city_en': airportTo,
    'airportFromID.city_en': airportFrom,
    timeDepShedule = '',
    timeToStand = '',
    term,
    codeShareData,
    checkinNo,
    gateNo,
    status,
    airline,
  } = currentFlight;
  const localDate = new Date(timeDepShedule || timeToStand);
  const visibleDate = localDate.toLocaleDateString('de-DE', options).slice(0, -1);
  const localeTime = `${localDate.getHours()}:${localDate
    .getMinutes().toString().padStart(2, '0')}`;

  return (
    <div className="FlightDetails">
      <Header
        className="FlightDetails-Header"
        content="Flight details"
        size="huge"
        color="blue"
      />
      <div className="FlightDetails-Flight">
        <Header
          className="FlightDetails-FlightCode"
          content={codeShareData[0].codeShare}
          size="large"
        />
        <Header
          className="FlightDetails-FlightFlies"
          content="flies in"
          size="large"
        />
      </div>
      <div className="FlightDetails-Destination">
        <Header
          className="FlightDetails-DestinationHeader"
          content={airportTo || airportFrom}
        />
        <Image
          className="FlightDetails-DestinationImage"
          src={airline.en.logoSmallName}
          verticalAlign="middle"
          size="small"
        />
      </div>
      <Table
        className="FlightDetails-Table"
        collapsing
        padded="very"
        basic="very"
        size="large"
      >
        <Table.Header className="FlightDetails-TableHeader">
          <Table.Row className="FlightDetails-TableRow">
            {tableHeaders.map(({ name, code }) => (
              !gateNo && (name === 'Gate' || name === 'Stand') ? null
                : (
                  <Table.HeaderCell
                    key={code}
                    textAlign="center"
                    className={cn({
                      'FlightDetails-HeaderCell': true,
                      [`FlightDetails-HeaderCell_${code}`]: true,
                    })}
                  >
                    {name}
                  </Table.HeaderCell>
                )))}
          </Table.Row>
        </Table.Header>
        <Table.Body className="FlightDetails-TableBody">
          <Table.Row
            className="Flight FlightsTable-TableRow"
            textAlign="center"
          >
            <Table.Cell>{visibleDate}</Table.Cell>
            <Table.Cell>{localeTime}</Table.Cell>
            <Table.Cell>{term}</Table.Cell>
            <Table.Cell>{codeShareData[0].codeShare}</Table.Cell>
            {checkinNo ? <Table.Cell>{checkinNo}</Table.Cell> : null}
            {gateNo ? <Table.Cell>{gateNo}</Table.Cell> : null}
          </Table.Row>
        </Table.Body>
      </Table>
      <Header
        className="FlightDetails-Status"
        content={statusFlight(status)}
        textAlign="left"
        size="huge"
      />
      <Accordion
        className="FlightDetails-Airline"
        panels={[{
          key: 'Contacts',
          title: {
            content: <Label
              content="Airline contacts"
              color="blue"
              size="big"
            />,
          },
          content: {
            content: (
              <Message info size="big">
                <Message.Header className="FlightDetails-AirlineName">
                  {airline.en.name}
                  <Image
                    className="FlightDetails-DestinationImage"
                    src={airline.en.logoSmallName}
                    verticalAlign="middle"
                    size="tiny"
                  />
                </Message.Header>
                {ReactHtmlParser(airline.en.about)}
              </Message>
            ),
          },
        }]}
      />
    </div>
  );
};

export default FlightDetails;
