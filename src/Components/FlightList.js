import React, { Component } from 'react';
import FlightItem from './FlightItem';

class FlightList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departure: [],
      arrival: [],
      display: 'departures',
    };
  }

  componentDidMount() {
    fetch(`https://api.iev.aero/api/flights/${`${new Date()
      .toISOString()}`.split('T')[0]}`)
      .then(data => data.json())
      .then(({ body }) => {
        const { arrival, departure } = body;
        this.setState(() => ({
          arrival, departure
        }))
      });
  }

  render() {
    console.log(this.state.arrival);
    console.log(this.state);
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Terminal</th>
              <th>Gate</th>
              <th>Local Time</th>
              <th>Time</th>
              <th>Destination</th>
              <th>Airline</th>
              <th>Flight </th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.map(item => <FlightItem arrival={item.arrival} departure={item.departure} />)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default FlightList;
