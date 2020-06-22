import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { Header } from 'semantic-ui-react';
import * as selectors from '../../store';
import Spinner from '../common/Spinner';
import './FlightDetails.scss';

const FlightDetails = () => {
  const direction = useSelector(selectors.getDirection);
  const flights = useSelector(selectors.getFlightsAll)[direction];
  const { flightsId } = useParams();
  const currentFlight: IFlight | undefined = useMemo(() => {
    return flights.find(flight => flight.ID === +flightsId);
  }, [flights, flightsId]);

  if (!currentFlight) {
    return <Spinner />;
  }

  const { airline }: IFlight = currentFlight;

  // console.log(currentFlight)

  return (
    <div className="FlightDetails">
      <Header
        content="Flight details"
        className="FlightDetails-Header"
        size="huge"
        color="blue"
      />
      <div>{ReactHtmlParser(airline.en.about)}</div>
    </div>
  );
};

export default FlightDetails;
