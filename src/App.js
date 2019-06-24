import React, { Component } from 'react'
import './App.css';
import { FlightDep } from './components/FlightDep';
import { FlightArr } from './components/FlightArr';
import { Navigation } from './components/Navigation';
import { Thead } from './components/Thead';
import { getStatus, getTodayDate, normalizeTime } from "./utils";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      page: 'departure',
      departure: null,
      arrival: null,
    };
  }

  componentDidMount() {
    fetch(`https://api.iev.aero/api/flights/${getTodayDate()}`)
      .then(response => response.json())
      .then(({ body }) => {
        this.setState({
          loaded: true,
          departure: body.departure,
          arrival: body.arrival,
        });
      });
  }

  switchPage = (event) => {
    this.setState({
      page: event.target.id
    });
  }

  render() {
    const { loaded, page, departure, arrival } = this.state;
    if (!loaded) {
      return (
        <>
          <Navigation page={page} switchPage={this.switchPage} />
          <div className="preload">Loading...</div>
        </>
      );
    } else {
      return (
        <>
          <Navigation page={page} switchPage={this.switchPage} />
          <table className="list-of-flights">
            <Thead page={page} />
            <tbody>
              {page === 'departure' ?
                departure.map(flight => <FlightDep getStatus={getStatus} normalizeTime={normalizeTime} flight={flight} key={flight.ID} />) :
                arrival.map(flight => <FlightArr getStatus={getStatus} normalizeTime={normalizeTime} flight={flight} key={flight.ID} />)}
            </tbody>
          </table>
        </>
      );
    }
  }
}

export default App;
