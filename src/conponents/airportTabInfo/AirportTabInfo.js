import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Arrivals from '../Arrivals/Arrivals';
import Departures from '../Departures/Departures';

const downloadAirApi = async () => {
  const day = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  const response = await fetch(`https://api.iev.aero/api/flights/${day}-${month}-${year}`);
  return response.json();
}

function AirportTabInfo () {
  const [ departuresData, setDeparturesData ] = useState([]);
  const [ arrivalsData, setArrivalsData ] = useState([]);
  const [ activeButton, setActiveBUtton ] = useState('departure')

  useEffect(() => {

    downloadAirApi()
      .then(data => {
        setDeparturesData(data.body.departure
          .filter(dep => new Date(dep.actual).getDate() === new Date().getDate()));
        setArrivalsData(data.body.arrival
          .filter(dep => new Date(dep.actual).getDate() === new Date().getDate()));
      })
  }, []);

  if (departuresData.length === 0 || arrivalsData.length === 0) {
    return (
      <div className="info-tab">
        <h2>Loading...</h2>
      </div>
    )
  } else {

    return (
      <>
        <div className="info-tab">
          <Router>
            <div className="info-tab-button">
              <Link to="/departures">
                <button
                  className={activeButton === 'departure' ? 'active-button' : ''}
                  onClick={() => setActiveBUtton('departure')}
                >
                  DEPARTURES
                </button>
              </Link>
              <Link to="/arrivals">
                <button
                  className={activeButton === 'arrivals' ? 'active-button' : ''}
                  onClick={() => setActiveBUtton('arrivals')}
                >
                  ARRIVALS
                </button>
              </Link>
            </div>
            <Switch>
              <Route path='/departures' render={() => <Departures departureArr={departuresData} />} />
              <Route path='/arrivals' render={() => <Arrivals arrivalArr={arrivalsData} />} />
            </Switch>
          </Router>
        </div>
      </>
    )
  }
}

export default AirportTabInfo;
