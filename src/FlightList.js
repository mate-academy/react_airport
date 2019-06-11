import React, {Component} from 'react';
import Arrivals from './Arrivals';
import Departures from './Departures';
import Flights from './Flights';

class FlightList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departure: null,
      arrival: null,
      flights:null
    };




    this.showArrivals=this.showArrivals.bind(this);
    this.showDepartures= this.showDepartures.bind(this);
    this.loadededate= this.loadededate.bind(this);
  }

  loadededate(){
    const xhrflights = new XMLHttpRequest();
    xhrflights.open('GET', `https://api.iev.aero/api/flights/13-06-2019`);
    xhrflights.addEventListener('load', () => {
      const flights = JSON.parse(xhrflights.response).body;
      this.setState({
        departure: flights.departure,
        arrival: flights.arrival,
        flights: flights.departure
      });
    });

    xhrflights.send();
  }

  // componentDidMount() {
  //
  //
  //   const xhrflights = new XMLHttpRequest();
  //
  //   xhrflights.open('GET', `https://api.iev.aero/api/flights/13-06-2019`);
  //
  //   xhrflights.addEventListener('load', () => {
  //     console.log(JSON.parse(xhrflights.response));
  //     this.setState({
  //       flights: JSON.parse(xhrflights.response)
  //     });
  //   });
  //
  //   xhrflights.send();
  //
  // }

  showArrivals(){}

  showDepartures(){}





  render() {
    this.loadededate();

if(this.state.departure){


  const flightComponents = this.state.flights.map(flight=><Flights
    key={flight.ID}
    term={flight.term}
    timeDepExpectCalc={flight.timeDepExpectCalc}
    gateNo={flight.gateNo}
    airportTo={flight["airportToID.city_en"]}
    airline={flight.airline.en}
    fltNo={flight.fltNo}
    status={flight.status}

  />)
  return (
    <section>
      <Arrivals onclick={this.showArrivals}/>
      <Departures onclick={this.showDepartures}/>

      <table>
        <thead>
        <tr>
          <th>Terminal</th>
          <th>Gate </th>
          <th>Time</th>
          <th>Destination</th>
          <th>Airline </th>
          <th>Flight </th>
          <th>Status</th>
        </tr>
        </thead>
        <tbody>
        {flightComponents}
        </tbody>
      </table>
    </section>
  );
}
return null;

  }
}

export default  FlightList;
