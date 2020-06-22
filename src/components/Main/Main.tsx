import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as selectors from '../../store';
import HomePage from '../HomePage';
import ErrorPage from '../ErrorPage';
import FlightsPage from '../FlightsPage';
import FlightDetails from '../FlightDetails';
import Spinner from '../common/Spinner';
import './Main.scss';

const Main = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectors.getLoading);
  const loaded = useSelector(selectors.getLoaded);

  useEffect(() => {
    dispatch(selectors.loadFlights());
  }, [dispatch]);

  return (
    <div className="Main">
      {loading && !loaded ? (
        <Spinner />
      ) : (
        <Switch>
          <Route path="/flights/:currentDay(yesterday|today|tomorrow)?" exact>
            <FlightsPage />
          </Route>

          <Route path="/flights/:flightsId">
            <FlightDetails />
          </Route>

          <Route path="/" exact>
            <HomePage />
          </Route>
          <Redirect from="/home" to="/" />

          <Route path="/error">
            <ErrorPage message="Not found" />
          </Route>

          <Redirect from="/*" to="/error" />
        </Switch>
      )}
    </div>
  );
};

export default Main;
