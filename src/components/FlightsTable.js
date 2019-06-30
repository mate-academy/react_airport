import React from 'react';
import Table from './Table';
import {
  doFetch, getCurrentDate, parseFlightData, parseTime,
} from '../utils';

class FlightsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      listOfFlights: [],
      departures: true,
      currentDate: getCurrentDate(),
      currentRadio: 'today',
      currentTab: 'departures',
    };
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentDate } = this.state;

    if (currentDate !== prevState.currentDate) {
      this.loadData();
    }
  }

  loadData() {
    this.setState(prevState => ({
      loaded: false,
      requested: true,
    }));

    const { currentDate } = this.state;
    const dynamicUrl = `https://api.iev.aero/api/flights/${currentDate}`;
    const fetchedData = doFetch(dynamicUrl);

    Promise.resolve(fetchedData)
      .then(
        (data) => {
          this.setState(prevState => ({
            loaded: true,
            listOfFlights: data,
            requested: false,
          }));
        }
      );
  }

  changeTab(toTab) {
    const { currentTab } = this.state;

    if (currentTab !== toTab) {
      this.setState(prevState => ({
        departures: !prevState.departures,
        currentTab: toTab,
      }));
    }
  }

  changeDate(n, radioValue) {
    const { currentRadio } = this.state;

    if (currentRadio !== radioValue) {
      this.setState(prevState => ({
        currentDate: getCurrentDate(n),
        currentRadio: radioValue,
      }));
    }
  }

  render() {
    const {
      departures,
      listOfFlights,
      loaded,
      currentDate,
      currentRadio,
      requested,
    } = this.state;

    if (requested) {
      return <div>Loading data...</div>;
    }

    if (loaded) {
      const date = currentDate.slice(0, 2);
      const flightsData = departures
        ? listOfFlights.departure
          .filter(data => parseTime(data.timeDepExpectCalc).day === date)
          .map(parseFlightData)
        : listOfFlights.arrival
          .filter(data => parseTime(data.timeToStand).day === date)
          .map(parseFlightData);

      return (
        <>
          <button
            type="button"
            onClick={this.changeTab.bind(this, 'departures')}
          >
            Departures
          </button>
          <button
            type="button"
            onClick={this.changeTab.bind(this, 'arrivals')}
          >
            Arrivals
          </button>

          <div>
            <label>
              <input
                type="radio"
                name="date"
                value="yesterday"
                onClick={this.changeDate.bind(this, -1, 'yesterday')}
                checked={currentRadio === 'yesterday'}
              />
              Yesterday
            </label>

            <label>
              <input
                type="radio"
                name="date"
                value="today"
                onClick={this.changeDate.bind(this, 0, 'today')}
                checked={currentRadio === 'today'}
              />
              Today
            </label>

            <label>
              <input
                type="radio"
                name="date"
                value="tomorrow"
                onClick={this.changeDate.bind(this, 1, 'tomorrow')}
                checked={currentRadio === 'tomorrow'}
              />
              Tomorrow
            </label>
          </div>

          <Table data={flightsData} />
        </>
      );
    }

    return <div>Something went wrong</div>;
  }
}

export default FlightsTable;
