import React, { useState, useEffect } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import { getFlights } from './api/getFlights';
import DatePanel from './components/DatePanel';
import FlightList from './components/FlightList';
import localHistory from './helpers/localHistory';

const App = () => {
  const [departuresData, setDeparturesData] = useState([]);
  const [arrivalsData, setArrivalsData] = useState([]);
  const [activeLink, setActiveLink] = useState('departures');
  const [day, setDay] = useState(new Date().getDate());

  const filterFlightsByDay = () => {
    if (activeLink === 'departures') {
      return (
        departuresData.filter(item => new Date(item.actual).getDate() === +day)
      );
    }

    return (
      arrivalsData.filter(item => new Date(item.actual).getDate() === +day)
    );
  };

  useEffect(() => {
    getFlights()
      .then((d) => {
        setDeparturesData(d.body.departure);
        setArrivalsData(d.body.arrival);
      });
  }, []);

  return (
    <div className="App">
      <div className="globalLink__block">
        <NavLink
          to="/departures"
          className="globalLink"
          activeClassName="globalLink--active"
          onClick={() => setActiveLink('departures')}
        >
          Departures
        </NavLink>
        <NavLink
          to="/arrivals"
          className="globalLink"
          activeClassName="globalLink--active"
          onClick={() => setActiveLink('arrivals')}
        >
          Arrivals
        </NavLink>
      </div>

      <Switch>
        <Route
          path="/departures"
          render={({ location, history }) => (
            <>
              {setDay(localHistory(location))}
              <DatePanel location={location} history={history} />
              <FlightList
                departuresData={filterFlightsByDay()}
                activeLink={activeLink}
              />
            </>
          )}
        />
        <Route
          path="/arrivals"
          render={({ location, history }) => (
            <>
              {setDay(localHistory(location))}
              <DatePanel location={location} history={history} />
              <FlightList
                departuresData={filterFlightsByDay()}
                activeLink={activeLink}
              />
            </>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
