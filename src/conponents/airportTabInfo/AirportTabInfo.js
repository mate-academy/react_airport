import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Arrivals from '../Arrivals/Arrivals';
import Departures from '../Departures/Departures';
import InfoMainButton from './../tabInfoMainButtons/InfoMainButtons';

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
  const [ activeButton, setActiveButton ] = useState('departure');
  const [ currentDay, setCurrentDay] = useState(new Date().getDate());

  useEffect(() => {
    downloadAirApi()
      .then(data => {
        setDeparturesData(data.body.departure)
        setArrivalsData(data.body.arrival)
      });
  }, []);

  const filteredFlights = (currentDay) => {
    if (activeButton === 'departure') {
      return departuresData.filter(dep => new Date(dep.actual).getDate() === currentDay);
    } else {
      return arrivalsData.filter(arriv => new Date(arriv.actual).getDate() === currentDay);
    }
  }

  const changeToDefaultDate = (active) => {
    setCurrentDay(new Date().getDate());
    setActiveButton(active);
  }

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
            <Switch>
              <Route path='/departures' exac render={() =>
                <Departures
                  departureArr={filteredFlights(currentDay)}
                  setCurrentDay={setCurrentDay}
                  currentDay={currentDay}
                  changeToDefaultDate={changeToDefaultDate}
                  activeButton={activeButton}
                />} />
              <Route path='/arrivals' exac render={() =>
                <Arrivals
                  arrivalArr={filteredFlights(currentDay)}
                  setCurrentDay={setCurrentDay}
                  currentDay={currentDay}
                  changeToDefaultDate={changeToDefaultDate}
                  activeButton={activeButton}
                />} />
              <Route path="/" render={() =>
              <InfoMainButton
                changeToDefaultDate={changeToDefaultDate}
                activeButton={activeButton}
              />} />
            </Switch>
          </Router>
        </div>
      </>
    )
  }
}

export default AirportTabInfo;
