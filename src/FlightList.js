import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Flights from './Flights';

class FlightList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flights: null,
      arrivals: null,
      departures: null,
      imgDeparturesColor: '',
      imgArrivalsColor: '',
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
          imgDeparturesColor: '#FFFFFF',
          imgArrivalsColor: '#1EB7EE',
        });
      } else {
        this.setState({
          flights: actualFlights[date],
          arrivals: 'arrivals',
          departures: 'departures active',
          imgDeparturesColor: '#1EB7EE',
          imgArrivalsColor: '#FFFFFF',
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
          gate={flight.gateNo}
        />
      ));
      return (
        <section>
          <div>
            <input className={this.state.departures} type="button" value="Departures" onClick={this.showDepartures} />
            <input className={this.state.arrivals} type="button" value="Arrivals" onClick={this.showArrivals} />
            {/* eslint-disable-next-line max-len */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <span className="imgDepartures" onClick={this.showDepartures}>
              {/* eslint-disable-next-line max-len */}
              <svg data-v-2cc0fd12="" width="30px" height="18px" viewBox="0 0 40 28" version="1.1" xmlns="http://www.w3.org/2000/svg">
                {/* eslint-disable-next-line max-len */}
                <g data-v-2cc0fd12="" id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g data-v-2cc0fd12="" id="Path-403" transform="translate(-1.000000, -1.000000)" fill={this.state.imgDeparturesColor} fillRule="nonzero"><g data-v-2cc0fd12="" id="Group"><path data-v-2cc0fd12="" d="M40.9190312,14.2925525 C40.731055,13.5210761 40.2396434,12.8581323 39.5561585,12.4539552 C38.8726735,12.0497781 38.0549837,11.9385881 37.2883912,12.1455827 L26.8096581,15.0218819 L13.1945082,2 L9.38678826,3.03046545 L17.5564785,17.5510243 L7.75204986,20.2442408 L3.86129243,17.1278331 L1,17.9171897 L4.59162231,24.3200818 L6.11030829,27.0112974 L9.26373268,26.1409043 L19.7414654,23.2656055 L28.3253427,20.9165445 L38.8070772,18.0372439 C40.4055057,17.5625364 41.3397513,15.9060318 40.9190312,14.2925525 Z" id="Path_403" transform="translate(21.009879, 14.505649) rotate(-4.012171) translate(-21.009879, -14.505649) " /></g></g></g>
              </svg>
            </span>
            {/* eslint-disable-next-line max-len */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <span className="imgArrivals" onClick={this.showArrivals}>
              {/* eslint-disable-next-line max-len */}
              <svg data-v-2cc0fd12="" width="30px" height="18px" viewBox="0 0 40 28" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <g data-v-2cc0fd12="" id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g data-v-2cc0fd12="" id="Group" transform="translate(-4.000000, -7.000000)">
                    <g data-v-2cc0fd12="" id="Path-402" />
                    {/* eslint-disable-next-line max-len */}
                    <path data-v-2cc0fd12="" d="M43.8940167,20.2848496 C43.7061583,19.5138567 43.2150547,18.8513283 42.531998,18.4474045 C41.8489414,18.0434806 41.031764,17.9323603 40.2656518,18.1392252 L29.793485,21.013722 L16.1868667,8 L12.3815328,9.02981973 L20.5461037,23.5412796 L10.7478188,26.2328084 L6.85949946,23.1183536 L4,23.9072155 L7.5893717,30.3060954 L9.10710602,32.9956246 L12.2585544,32.1257769 L22.7297214,29.2522799 L31.3082198,26.9046908 L41.7833862,24.0271945 C43.3808131,23.5527844 44.3144732,21.8973179 43.8940167,20.2848496 Z" id="Path_402" fill={this.state.imgArrivalsColor} fillRule="nonzero" transform="translate(23.997341, 20.497812) rotate(27.974730) translate(-23.997341, -20.497812) " />
                  </g>
                </g>
              </svg>
            </span>
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
                <th>Gate</th>
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

Flights.propTypes = {
  flight: PropTypes.arrayOf(PropTypes.object),
  term: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  time: PropTypes.object,
  airportTo: PropTypes.string,
  status: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  actual: PropTypes.object,
  gate: PropTypes.string,
};

export default FlightList;
