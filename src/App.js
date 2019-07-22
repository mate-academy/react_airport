import React from 'react';
import getFlights from './API_DATA';
import FlightsTable from './components/FlightsTable';

class App extends React.Component {
  state = {
    arrivalsOrigin: [],
    departuresOrigin: [],
    arrivals: [],
    departures: [],
    sortOrder: 1,
    isSortOn: false,
    isLoading: false,
  }

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });

    const flights = await getFlights();

    this.setState({
      arrivalsOrigin: [...flights.body.arrival],
      departuresOrigin: [...flights.body.departure],

      arrivals: [...flights.body.arrival],
      departures: [...flights.body.departure],
      isLoading: false,
    });
  }

  isValueExist = (flight, value) => {
    const valueLower = value.toLowerCase();
    const planeIdLower = flight['planeTypeID.code'].toLowerCase();
    const arlineNameLower = flight.airline.en.name.toLowerCase();
    const airportToId = flight['airportToID.name_en'];
    const airportFromId = flight['airportFromID.name_en'];

    return planeIdLower.includes(valueLower)
      || arlineNameLower.includes(valueLower)
      || (airportToId
        ? airportToId.toLowerCase().includes(valueLower)
        : airportFromId.toLowerCase().includes(valueLower));
  }

  filterFlight = (filterValue) => {
    this.setState(prevState => ({
      departures: [...prevState.departuresOrigin].filter(flight => (
        this.isValueExist(flight, filterValue)
      )),

      arrivals: [...prevState.arrivalsOrigin].filter(flight => (
        this.isValueExist(flight, filterValue)
      )),
    }));
  }

  getMinutes = (time) => {
    const date = new Date(Date.parse(time));
    const hoursMinutes = (date.getHours() * 60) + date.getMinutes();

    return hoursMinutes;
  }

  sortTable = (event) => {
    switch (event.target.getAttribute('name')) {
      case 'Terminal':
        return (
          this.setState(prevState => ({
            departures: [...prevState.departuresOrigin].sort((a, b) => (
              prevState.sortOrder * a.term.localeCompare(b.term)
            )),

            arrivals: [...prevState.arrivalsOrigin].sort((a, b) => (
              prevState.sortOrder * a.term.localeCompare(b.term)
            )),

            sortOrder: -prevState.sortOrder,
            isSortOn: true,
          }))
        );

      case 'Local time':
        return (
          this.setState(prevState => ({
            departures: [...prevState.departuresOrigin].sort((a, b) => (
              prevState.sortOrder
              * (this.getMinutes(a.timeDepExpectCalc)
              - this.getMinutes(b.timeDepExpectCalc))
            )),

            arrivals: [...prevState.arrivalsOrigin].sort((a, b) => (
              prevState.sortOrder
              * (this.getMinutes(a.timeArrExpectCalc)
              - this.getMinutes(b.timeArrExpectCalc))
            )),

            sortOrder: -prevState.sortOrder,
            isSortOn: true,
          }))
        );

      case 'Destination':
        return (
          this.setState(prevState => ({
            departures: [...prevState.departuresOrigin].sort((a, b) => (
              prevState.sortOrder
              * a['airportToID.name_en']
                .localeCompare(b['airportToID.name_en'])
            )),

            arrivals: [...prevState.arrivalsOrigin].sort((a, b) => (
              prevState.sortOrder
              * a['airportFromID.name_en']
                .localeCompare(b['airportFromID.name_en'])
            )),

            sortOrder: -prevState.sortOrder,
            isSortOn: true,
          }))
        );

      case 'Status':
        return (
          this.setState(prevState => ({
            departures: [...prevState.departuresOrigin].sort((a, b) => (
              prevState.sortOrder
              * (this.getMinutes(a.timeDepShedule)
              - this.getMinutes(b.timeDepShedule))
            )),

            arrivals: [...prevState.arrivalsOrigin].sort((a, b) => (
              prevState.sortOrder
              * (this.getMinutes(a.timeArrShedule)
              - this.getMinutes(b.timeArrShedule))
            )),

            sortOrder: -prevState.sortOrder,
            isSortOn: true,
          }))
        );

      case 'Airline':
        return (
          this.setState(prevState => ({
            departures: [...prevState.departuresOrigin].sort((a, b) => (
              prevState.sortOrder
              * a.airline.en.name.localeCompare(b.airline.en.name)
            )),

            arrivals: [...prevState.arrivalsOrigin].sort((a, b) => (
              prevState.sortOrder
              * a.airline.en.name.localeCompare(b.airline.en.name)
            )),

            sortOrder: -prevState.sortOrder,
            isSortOn: true,
          }))
        );

      case 'Flight':
        return (
          this.setState(prevState => ({
            departures: [...prevState.departuresOrigin].sort((a, b) => (
              prevState.sortOrder
              * a['planeTypeID.code'].localeCompare(b['planeTypeID.code'])
            )),

            arrivals: [...prevState.arrivalsOrigin].sort((a, b) => (
              prevState.sortOrder
              * a['planeTypeID.code'].localeCompare(b['planeTypeID.code'])
            )),

            sortOrder: -prevState.sortOrder,
            isSortOn: true,
          }))
        );

      case 'unSort':
        return (
          this.setState(prevState => ({
            departures: [...prevState.departuresOrigin],
            arrivals: [...prevState.arrivalsOrigin],
            sortOrder: 1,
            isSortOn: false,
          }))
        );

      default: return undefined;
    }
  }

  render() {
    const {
      arrivals, departures, isSortOn, isLoading,
    } = this.state;

    const loader = <div className="loader" />;

    return (
      <div className="App">
        <h1 className="App-header">React airport SEARCH FLIGHT</h1>

        {isLoading && loader}

        <FlightsTable
          arrivals={arrivals}
          departures={departures}
          filterFlight={this.filterFlight}
          sortTable={this.sortTable}
          isSortOn={isSortOn}
        />
      </div>
    );
  }
}

export default App;
