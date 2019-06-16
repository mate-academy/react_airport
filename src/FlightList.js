import React, { Component } from 'react';
import Flights from './Flights';
import Tabs from './Tabs';
import {
  ARRIVAL,
  DEPARTURE,
  ACTIVE,
  activeIcon,
  notActiveIcon,
  headersWithGate,
  headersWithoutGate,
} from './constants';

class FlightList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      arrival: null,
      departure: null,
      imgDeparturesColor: '',
      imgArrivalsColor: '',
      flightComponents: null,
      headersItems: null,
    };

    this.loadData = this.loadData.bind(this);
    this.getRowComponents = this.getRowComponents.bind(this);
    FlightList.getHeaders = FlightList.getHeaders.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  static getHeaders(displayGate) {
    return displayGate ? headersWithGate.map(header => (
      <th key={header}>
        {header}
      </th>
    )) : headersWithoutGate.map(header => (
      <th key={header}>
        {header}
      </th>
    ));
  }

  // eslint-disable-next-line class-methods-use-this
  getRowComponents(response, displayGate) {
    return response.map(flight => (
      <Flights
        key={flight.ID}
        term={flight.term}
        time={flight.timeDepShedule ? new Date(flight.timeDepShedule) : new Date(flight.timeArrShedule)}
        airportTo={flight['airportToID.city_en'] ? flight['airportToID.city_en'] : flight['airportFromID.city_en']}
        flight={flight.codeShareData}
        statusCode={flight.status}
        actual={new Date(flight.actual)}
        gateNo={flight.gateNo}
        displayGate={displayGate}
      />
    ));
  }

  loadData(eventTarget) {
    const direction = eventTarget ? eventTarget.currentTarget.attributes.data.value : DEPARTURE;
    const dateNow = new Date().toLocaleString().slice(0, 10).replace(/\./g, '-');
    const xhrFlights = new XMLHttpRequest();

    xhrFlights.open('GET', `https://api.iev.aero/api/flights/${dateNow}`);
    xhrFlights.addEventListener('load', () => {
      const actualFlights = JSON.parse(xhrFlights.response).body;
      const displayGate = direction === DEPARTURE;
      const headersItems = FlightList.getHeaders(displayGate);
      const flightComponents = this.getRowComponents(actualFlights[direction], displayGate);

      if (displayGate) {
        this.setState({
          arrival: ARRIVAL,
          departure: `${DEPARTURE} ${ACTIVE}`,
          imgDeparturesColor: activeIcon,
          imgArrivalsColor: notActiveIcon,
          flightComponents,
          headersItems,
        });
      } else {
        this.setState({
          arrival: `${ARRIVAL} ${ACTIVE}`,
          departure: DEPARTURE,
          imgDeparturesColor: notActiveIcon,
          imgArrivalsColor: activeIcon,
          flightComponents,
          headersItems,
        });
      }
    });

    xhrFlights.send();
  }

  render() {
    const {
      departure,
      arrival,
      imgDeparturesColor,
      imgArrivalsColor,
      flightComponents,
      headersItems,
    } = this.state;
    return (
      <section>
        <Tabs
          departure={departure}
          arrival={arrival}
          loadData={this.loadData}
          imgDeparturesColor={imgDeparturesColor}
          imgArrivalsColor={imgArrivalsColor}
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
    );
  }
}

export default FlightList;
