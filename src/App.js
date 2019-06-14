import React, {Component} from 'react';
import './App.css';
import Service from './service';
import FlightTable from './components/FlightTable';

export default class App extends Component{
  state = {
    flightData: {},
    loading: true,
    date: new Date()
  };

  componentDidMount() {
    const service = new Service();
    const day = this.state.date.getDate().toString().padStart(2, '0');
    const month = (this.state.date.getMonth() + 1).toString().padStart(2, '0');
    const year = this.state.date.getFullYear().toString();
    const dateToday = `${day}-${month}-${year}`;
    service.getFlight(dateToday)
      .then(flights => {
        this.setState({
          flightData: flights,
          loading: false
        })
      });
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          Loading...
        </div>
      )
    } else {
      return (
        <div className={'App'}>
          <FlightTable
            departure={this.state.flightData.departure}
            arrival={this.state.flightData.arrival}
          />
        </div>
      );
    }
  }
}
