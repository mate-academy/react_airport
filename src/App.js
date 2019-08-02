import React from 'react';
import getFlights from './API_DATA';
import FlightsTable from './components/FlightsTable';
import ButoonContainer from './components/ButoonContainer';
import cashingFabric from './helpers';

const filterFlight = (flights, filterValue) => {
  let newFlights = [];

  const isIncludes = (flight, value) => {
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
  };

  newFlights = flights.filter(flight => (
    isIncludes(flight, filterValue)));

  return newFlights;
};

const sortTable = (name, flights, sortOrder, isDepartures) => {
  let newFlights = flights;

  const getMinutes = (time) => {
    const date = new Date(Date.parse(time));
    const hoursMinutes = (date.getHours() * 60) + date.getMinutes();

    return hoursMinutes;
  };

  switch (name) {
    case 'Terminal':
      return (
        newFlights = [...flights].sort((a, b) => (
          sortOrder * a.term.localeCompare(b.term)
        ))
      );

    case 'Local time':
      switch (isDepartures) {
        case true:
          return (
            newFlights = [...flights].sort((a, b) => (
              sortOrder * (getMinutes(a.timeDepExpectCalc)
              - getMinutes(b.timeDepExpectCalc))
            )));

        default:
          return (
            newFlights = [...flights].sort((a, b) => (
              sortOrder * (getMinutes(a.timeArrExpectCalc)
              - getMinutes(b.timeArrExpectCalc))
            )));
      }

    case 'Destination':
      if (flights[0]['airportToID.name_en']) {
        return (
          newFlights = [...flights].sort((a, b) => sortOrder
            * a['airportToID.name_en']
              .localeCompare(b['airportToID.name_en'])));
      }

      return (
        newFlights = [...flights].sort((a, b) => sortOrder
          * a['airportFromID.name_en']
            .localeCompare(b['airportFromID.name_en'])));

    case 'Status':
      switch (isDepartures) {
        case true:
          return (
            newFlights = [...flights].sort((a, b) => (
              sortOrder * (getMinutes(a.timeDepShedule)
              - getMinutes(b.timeDepShedule))
            )));

        default:
          return (
            newFlights = [...flights].sort((a, b) => (
              sortOrder * (getMinutes(a.timeArrShedule)
              - getMinutes(b.timeArrShedule))
            )));
      }

    case 'Airline':
      return (
        newFlights = [...flights].sort((a, b) => (
          sortOrder * a.airline.en.name.localeCompare(b.airline.en.name)
        ))
      );

    case 'Flight':
      return (
        newFlights = [...flights].sort((a, b) => (
          sortOrder
          * a['planeTypeID.code'].localeCompare(b['planeTypeID.code'])
        ))
      );

    default: return newFlights;
  }
};

const cashedFilterFlight = cashingFabric(filterFlight);
const cashedSortTable = cashingFabric(sortTable);

class App extends React.Component {
  state = {
    arrivals: [],
    departures: [],
    sortName: '',
    sortOrder: 1,
    isSortOn: false,
    isLoading: false,
    filterInput: '',
    isDepartures: true,
  }

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });

    let flights = [];

    try {
      flights = await getFlights();
      if (!flights.body) {
        throw new SyntaxError('Данные некорректны');
      }
    } catch (err) {
      document.location.reload(true);
    }

    this.setState({
      arrivals: flights.body.arrival,
      departures: flights.body.departure,
      isLoading: false,
    });
  }

  handleFilterTyping = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  toggleTab = (event) => {
    this.setState({
      isDepartures: event.target.name === 'departures',
    });
  }

  sortTable = (event) => {
    const name = event.target.getAttribute('name');

    switch (name) {
      case 'unSort':
        return (
          this.setState(prevState => ({
            sortName: '',
            sortOrder: 1,
            isSortOn: false,
          })));

      default:
        return (
          this.setState(prevState => ({
            sortName: name,
            sortOrder: -prevState.sortOrder,
            isSortOn: true,
          })));
    }
  }

  render() {
    const {
      isSortOn, isLoading, filterInput, isDepartures, sortName, sortOrder,
    } = this.state;

    let { arrivals, departures } = this.state;

    const date = new Date();
    const currentDate = (
      `${date.getDate()}:${date.getMonth() + 1}:${date.getFullYear()}`
    );

    const filteredDepartures = cashedFilterFlight(departures, filterInput);
    const filteredarrivals = cashedFilterFlight(arrivals, filterInput);

    departures = cashedSortTable(
      sortName, filteredDepartures, sortOrder, isDepartures
    );

    arrivals = cashedSortTable(
      sortName, filteredarrivals, sortOrder, isDepartures
    );

    const currentSchedule = isDepartures ? departures : arrivals;

    return (
      <div className="App">
        <h1 className="App-header">
React airport SEARCH FLIGHT of
          {currentDate}
        </h1>

        {isLoading && <div className="loader" />}

        <div>
          <form onSubmit={event => event.preventDefault()}>
            <input
              type="text"
              name="filterInput"
              value={filterInput}
              onChange={this.handleFilterTyping}
              className="filter"
              placeholder="Filtering by airline, destination or flight"
              autoComplete="off"
            />
          </form>

          <ButoonContainer
            toggleTab={this.toggleTab}
            isDepartures={isDepartures}
          />

          <FlightsTable
            currentSchedule={currentSchedule}
            filterFlight={this.filterFlight}
            sortTable={this.sortTable}
            isSortOn={isSortOn}
            isDepartures={isDepartures}
          />
        </div>
      </div>
    );
  }
}

export default App;
