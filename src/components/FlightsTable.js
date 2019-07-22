import React from 'react';
import PropTypes from 'prop-types';
import FlightsTableHeader from './FlightsTableHeader';
import FlightRow from './FlightRow';
import Filter from './Filter';
import ButoonContainer from './ButoonContainer';

class FlightsTable extends React.Component {
  state = {
    isDepartures: true,
    filterInput: '',
  }

  handleFilterTyping = (event) => {
    const { name, value } = event.target;

    this.props.filterFlight(value);

    this.setState({
      [name]: value,
    });
  }

  toggleTab = (event) => {
    this.setState(
      event.target.name === 'departures'
        ? { isDepartures: true }
        : { isDepartures: false },
    );
  }

  render() {
    const {
      departures, arrivals, sortTable, isSortOn,
    } = this.props;

    const { isDepartures, filterInput } = this.state;
    const currentSchedule = isDepartures ? departures : arrivals;

    const flights = currentSchedule.map(flight => (
      <FlightRow
        key={flight.ID}
        flight={flight}
        isDepartures={isDepartures}
      />
    ));

    return (
      <div>
        <Filter
          filterInput={filterInput}
          handleFilterTyping={this.handleFilterTyping}
        />

        <ButoonContainer
          toggleTab={this.toggleTab}
          isDepartures={isDepartures}
        />

        <table className="flights-table">
          <FlightsTableHeader sortTable={sortTable} isSortOn={isSortOn} />

          <tbody className="flights-table__body">
            {flights}
          </tbody>
        </table>
      </div>

    );
  }
}

FlightsTable.propTypes = {
  filterFlight: PropTypes.func.isRequired,
  departures: PropTypes.arrayOf(PropTypes.object).isRequired,
  arrivals: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortTable: PropTypes.func.isRequired,
  isSortOn: PropTypes.bool.isRequired,
};

export default FlightsTable;
