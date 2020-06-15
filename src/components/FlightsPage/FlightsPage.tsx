import React, { useEffect } from 'react';
import { Header } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { getFlightsAll, loadFlights } from '../../store';
import Spinner from '../common/Spinner';
import './FlightsPage.scss';

const FlightsPage = () => {
  const dispatch = useDispatch();
  const { departure, arrival } = useSelector(getFlightsAll);

  useEffect(() => {
    dispatch(loadFlights());
  }, [dispatch]);

  if (!departure.length || !arrival.length) {
    return <Spinner />;
  }

  return (
    <div className="FlightsPage">
      <Header
        content="Flights table"
        className="App-Header"
        size="huge"
        color="blue"
      />
    </div>
  );
};

export default FlightsPage;
