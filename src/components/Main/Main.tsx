import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from '../HomePage';
import ErrorPage from '../ErrorPage';
import FlightsPage from '../FlightsPage';
import './Main.scss';

const Main = () => {
  return (
    <div className="Main">
      <Switch>
        <Route
          path="/flights/:flightsID?"
          render={() => (
            <FlightsPage />
          )}
        />

        <Route path="/" exact>
          <HomePage />
        </Route>
        <Redirect from="/home" to="/" />

        <Route path="/error">
          <ErrorPage message="Not found" />
        </Route>

        <Redirect from="/*" to="/error" />
      </Switch>
    </div>
  );
};

export default Main;
