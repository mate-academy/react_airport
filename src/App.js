import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import Arrivals from './components/Arrivals/Arrivals';
import Departures from './components/Departues/Departures';

const App = () => (
  <div className="App">
    <NavLink to="/departures">Departures</NavLink>
    <NavLink to="/arrivals">Arrivals</NavLink>

    <Switch>
      <Route path="/departures" component={Departures} />
      <Route path="/arrivals" component={Arrivals} />
    </Switch>
  </div>
);

export default App;
