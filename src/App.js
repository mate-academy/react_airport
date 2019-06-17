import React, { Component } from 'react'
import './App.css';
import FlightDep from './components/FlightDep';
import FlightArr from './components/FlightArr';
import Navigation from './components/Navigation';
import Thead from './components/Thead';

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

  normalizeTime (timeStr) {
    return timeStr.match(/\d{2}:\d{2}/);
  }

  getStatus = (flight) => {
    switch (flight.status) {
      case 'DP': return <td>Departed at {this.normalizeTime(flight.timeDepFact)}</td>;
      case 'LN': return <td>Landed at {this.normalizeTime(flight.timeLandFact)}</td>;
      case 'ON': return <td>On time</td>;
      case 'CK': return <td>Check-in</td>;
      case 'BD': return <td>Boarding</td>;
      case 'GC': return <td>Gate cloased</td>;
      case 'CX': return <td>Cancelled</td>;
      case 'FR': return <td>On flight</td>;
      default: return <td>{flight.status}</td>;
    }
  }

  getTodayDate() {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0')
    return `${today.getDate()}-${month}-${today.getFullYear()}`
  }

  componentDidMount() {
    fetch(`https://api.iev.aero/api/flights/${this.getTodayDate()}`)
      .then(response => response.json())
      .then(({ body, }) => {
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
          <div className='preload'>Loading...</div>
        </>
      );
    } else {
      return (
        <>
          <Navigation page={page} switchPage={this.switchPage} />
          <table className='list-of-flights'>
            <Thead page={page} />
            <tbody>
              {page === 'departure' ?
                departure.map(flight => <FlightDep getStatus={this.getStatus} normalizeTime={this.normalizeTime} flight={flight} key={flight.ID} />) :
                arrival.map(flight => <FlightArr getStatus={this.getStatus} normalizeTime={this.normalizeTime} flight={flight} key={flight.ID} />)}
            </tbody>
          </table>
        </>
      );
    }
  }
}

export default App;
