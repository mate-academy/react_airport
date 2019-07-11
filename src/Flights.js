import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlightsTable from './FlightsTable';
import flightsData from './helper';
import getData from './service';

class Flights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: [],
      currentFlightsData: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    const { currentDay, type } = this.props;
    if (currentDay !== prevProps.currentDay || type !== prevProps.type) {
      this.setState(prevState => ({
        currentFlightsData: flightsData(prevState.flights[type], currentDay),
      }));
    }
  }

  async fetchData() {
    const { currentDay, type } = this.props;
    const flights = await getData();
    this.setState({
      flights,
      currentFlightsData: flightsData(flights[type], currentDay),
    });
  }

  render() {
    const { type } = this.props;
    const { currentFlightsData } = this.state;

    return <FlightsTable flightsList={currentFlightsData} pageType={type} />;
  }
}

Flights.propTypes = {
  currentDay: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Flights;
