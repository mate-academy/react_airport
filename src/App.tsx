import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { getFlightsAll, loadFlights } from './store';
import Nav from './components/Nav/Nav';
import HomePage from './components/HomePage';
import FlightsPage from './components/FlightsPage';
import ErrorPage from './components/ErrorPage';
import BackgroundAnimation from './components/common/BackgroundAnimation';
import './App.scss';

const App = () => {
  const dispatch = useDispatch();
  const { departure, arrival } = useSelector(getFlightsAll);

  useEffect(() => {
    dispatch(loadFlights());
  }, [dispatch]);

  useEffect(() => {
    console.log(departure, arrival);
  }, [departure, arrival]);

  return (
    <div className="App">
      <Nav />

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

      <footer className="App-Footer">
        &copy;Andreas Just 2020
      </footer>
      <BackgroundAnimation />
    </div>
  );
};

export default App;
