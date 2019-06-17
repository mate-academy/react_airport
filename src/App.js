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

  componentDidMount() {
    fetch('https://api.iev.aero/api/flights/17-06-2019')
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
        <div className='preload'>Loading...</div>
      );
    } else {
      return (
        <>
          <Navigation page={page} switchPage={this.switchPage} />
          <table className='list-of-flights'>
            <Thead page={page}/>
            <tbody>
              {page === 'departure' ?
                departure.map(flight => <FlightDep flight={flight} key={flight.ID} />) :
                arrival.map(flight => <FlightArr flight={flight} key={flight.ID} />)}
            </tbody>
          </table>
        </>
      );
    }
  }
}

export default App;
