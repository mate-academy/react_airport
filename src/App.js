import React, {Component} from 'react';
import './App.css';
import Service from './service';
import FlightTable from './components/FlightTable';
import Loader from './components/Loader';

export default class App extends Component{
  state = {
    flightData: {},
    loading: true,
    date: new Date()
  };
  flightsService = new Service();

  componentDidMount() {
    const { date } = this.state;
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const dateToday = `${day}-${month}-${year}`;
    this.flightsService.getFlight(dateToday)
      .then(flights => {
        this.setState({
          flightData: flights,
          loading: false,
        });
      });

  }

  render() {
    const { loading, flightData } = this.state;
    return (
      <div className="App">
        {!loading
          ? <FlightTable
          departure={flightData.departure}
          arrival={flightData.arrival}
          />
          : <Loader/>
        }
      </div>
    );
  }
}

