import React, { Component } from 'react';
import Flights from './Flights';
import Tabs from './Tabs';

class FlightList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flights: null,
      arrivals: null,
      departures: null,
      imgDeparturesColor: '',
      imgArrivalsColor: '',
      isGate: false,
    };

    this.showArrivals = this.showArrivals.bind(this);
    this.showDepartures = this.showDepartures.bind(this);
    this.loadData = this.loadData.bind(this);
    this.getProps = this.getProps.bind(this);
  }

  componentDidMount() {
    this.loadData('departure');
  }

  loadData(date) {
    const dateNow = new Date().toLocaleString().slice(0, 10).replace(/\./g, '-');
    const xhrFlights = new XMLHttpRequest();
    xhrFlights.open('GET', `https://api.iev.aero/api/flights/${dateNow}`);
    xhrFlights.addEventListener('load', () => {
      const actualFlights = JSON.parse(xhrFlights.response).body;
      if (date === 'arrival') {
        this.setState({
          flights: actualFlights[date],
          arrivals: 'arrivals active',
          departures: 'departures',
          imgDeparturesColor: '#FFFFFF',
          imgArrivalsColor: '#1EB7EE',
          isGate: false,
        });
      } else {
        this.setState({
          flights: actualFlights[date],
          arrivals: 'arrivals',
          departures: 'departures active',
          imgDeparturesColor: '#1EB7EE',
          imgArrivalsColor: '#FFFFFF',
          isGate: true,
        });
      }
    });

    xhrFlights.send();
  }

  showArrivals() {
    this.loadData('arrival');
  }

  showDepartures() {
    this.loadData('departure');
  }

  getProps() {
      const flightComponents = this.state.flights.map(flight => (
        <Flights
          key={flight.ID}
          term={flight.term}
          time={flight.timeDepShedule ? new Date(flight.timeDepShedule) : new Date(flight.timeArrShedule)}
          airportTo={flight['airportToID.city_en'] ? flight['airportToID.city_en'] : flight['airportFromID.city_en']}
          flight={flight.codeShareData}
          statusCode={flight.status}
          actual={new Date(flight.actual)}
          gate={flight.gateNo || '-'}
        />
    ));

    const headers = [
      'Terminal',
      'Gate',
      'Time',
      'Destination',
      'Status',
      'Airline',
      'Flight',

    ];

    const headerWithGate = headers.map(header=><th key={header}>
      {header}
    </th>);

    const headerWithoutGate = headers.filter(header=>{return header!=='Gate'}).map(header=><th key={header}>
      {header}
    </th>);
    const headersActive = this.state.isGate? headerWithGate:headerWithoutGate;
console.log(headersActive);
    return {
      flightComponents,
      headersItems: headersActive
    }
  }

  render() {
    const { flights } = this.state;

    if(flights){
      const {flightComponents, headersItems} = this.getProps();
      return (
        <section>
          <Tabs
            departures={this.state.departures}
            arrivals={this.state.arrivals}
            showDepartures={this.showDepartures}
            showArrivals={this.showArrivals}
            imgDeparturesColor={this.state.imgDeparturesColor}
            imgArrivalsColor={this.state.imgArrivalsColor}
          />
          <table>
            <thead>
            <tr>
              {headersItems}
            </tr>
            </thead>
            <tbody>
            {flightComponents}
            </tbody>
          </table>
        </section>
      )
    }
    return null;
  }
}

export default FlightList;
