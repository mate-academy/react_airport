import React, { useEffect } from 'react';
import {
  Route,
  NavLink,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';

import './style.scss';
import DateSelect from './components/DateSelect';
import FlightsTable from './components/FlightsTable';
import composeDate from './helpers/composeDate';

const App = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    searchParams.set('date', composeDate());
    history.push({
      pathname: '/departures',
      search: searchParams.toString(),
    });
  }, []);

  return (
    <div className="App">
      <h3>Kyiv Sikorsky Airport - Flight Schedule</h3>
      <header>
        <nav>
          <NavLink
            to={{
              pathname: '/departures',
              search: location.search,
            }}
          >
            Departures
          </NavLink>

          <NavLink
            to={{
              pathname: '/arrivals',
              search: location.search,
            }}
          >
            Arrivals
          </NavLink>
        </nav>

        <DateSelect />
      </header>

      <Switch>
        <Route
          path="/departures"
          render={() => (
            <FlightsTable
              direction="departure"
              date={searchParams.get('date')}
            />
          )}
        />
        <Route
          path="/arrivals"
          render={() => (
            <FlightsTable
              direction="arrival"
              date={searchParams.get('date')}
            />
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
