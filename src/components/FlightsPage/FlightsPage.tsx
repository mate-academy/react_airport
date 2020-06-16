import React, { useEffect } from 'react';
import { Header } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import * as selectors from '../../store';
import Spinner from '../common/Spinner';
import './FlightsPage.scss';
import DirectionBtn from '../DirectionBtn';

const FlightsPage = () => {
  const dispatch = useDispatch();
  const { departure, arrival } = useSelector(selectors.getFlightsAll);
  const loading = useSelector(selectors.getLoading);
  const loaded = useSelector(selectors.getLoaded);
  const error = useSelector(selectors.getError);

  useEffect(() => {
    dispatch(selectors.loadFlights());
  }, [dispatch]);

  console.log(loading, departure, arrival);

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
        </>
      )}
    </div>
  );
};

export default FlightsPage;
