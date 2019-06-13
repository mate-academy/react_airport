import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import Flights from './Flights';

class FlightList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flights: null,
      arrivals: null,
      departures:null
    };

    this.showArrivals = this.showArrivals.bind(this);
    this.showDepartures = this.showDepartures.bind(this);
    this.loadData = this.loadData.bind(this);
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
        });
      } else {
        this.setState({
          flights: actualFlights[date],
          arrivals: 'arrivals',
          departures: 'departures active',
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

  render() {
    const { flights } = this.state;
    if (flights) {
      const flightComponents = flights.map(flight => (
        <Flights
          key={flight.ID}
          term={flight.term}
          time={flight.timeDepShedule ? new Date(flight.timeDepShedule) : new Date(flight.timeArrShedule)}
          airportTo={flight['airportToID.city_en'] ? flight['airportToID.city_en'] : flight['airportFromID.city_en']}
          flight={flight.codeShareData}
          status={flight.status}
          actual={new Date(flight.actual)}
        />
      ));
      return (
        <section>
          <div>
            <input className={this.state.arrivals} type="button" value="Arrivals" onClick={this.showArrivals} />
            <input className={this.state.departures} type="button" value="Departures" onClick={this.showDepartures} />
          </div>
          <table>
            <thead>
              <tr>
                <th>Terminal</th>
                <th>Time</th>
                <th>Destination</th>
                <th>Status</th>
                <th>Airline</th>
                <th>Flight</th>
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

// Flights.propTypes = {
//   flight: PropTypes.arrayOf(PropTypes.object),
//   term: PropTypes.string,
//   time: PropTypes.object,
//   airportTo: PropTypes.string,
//   status: PropTypes.string,
//   actual: PropTypes.object,
// };

export default FlightList;
