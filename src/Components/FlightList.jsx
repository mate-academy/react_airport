import React, { Component } from 'react';
import Flight from './Flight.jsx';
import './FlightList.css';
import FlightBtn from './FlightBtn.jsx';

export default class FlightList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departures: [],
      arrivals: [],
      display: 'departures'
    }
    this.displayChanged = this.displayChanged.bind(this);
  }

  componentDidMount() {
    fetch(`https://api.iev.aero/api/flights/${new Date()
      .toISOString()}`.split('T')[0])
      .then(data => data.json())
      .then(({ body }) => {
        this.setState(() => ({
          departures: body.departure,
          arrivals: body.arrival
        }))
      });
  }

  displayChanged(stateItems) {
    this.setState({
        display: stateItems
    });
  }

  render() {
    return (
      <div className="air-wrapper">
          <FlightBtn
            display={this.state.display}
            displayChanged={this.displayChanged}
          />
        <table className="air-table">
          <thead >
            <tr>
              <th>Terminal</th>
              {this.state.display === 'departures' ? <th>Gate</th> : null}
              <th>Local time</th>
              <th>Destination</th>
              <th>Status</th>
              <th>Airline</th>
              <th>Flight</th>
            </tr>
          </thead>
          <tbody>
            {this.state[this.state.display].map(item =>
              <Flight key={item.ID} items={item}
                displayGate={this.state.display === 'departures'}/>)}
          </tbody>
        </table>
      </div>
    )
  }
}
