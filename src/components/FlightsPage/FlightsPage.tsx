import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from 'semantic-ui-react';
import * as selectors from '../../store';
import DirectionBtn from '../DirectionBtn';
import FlightsTable from '../FlightsTable';
import Spinner from '../common/Spinner';
import './FlightsPage.scss';

const FlightsPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectors.getLoading);
  const loaded = useSelector(selectors.getLoaded);
  const error = useSelector(selectors.getError);

  useEffect(() => {
    dispatch(selectors.loadFlights());
  }, [dispatch]);

  return (
    <div className="FlightsPage">
      {loading && !loaded ? (
        <Spinner />
      ) : (
        <>
          <Header
            className="FlightsPage-Header"
            content="Flights table"
            color="blue"
            size="huge"
          />
          <Header
            className="FlightsPage-Error"
            content={error}
            color="red"
            as="h2"
          />
          <DirectionBtn />
          <FlightsTable />
        </>
      )}
    </div>
  );
};

export default FlightsPage;
