import React, { Component } from 'react';
import FlightItem from './FlightItem';
import Button from './Button';
import './FlightList.css';

class FlightList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departure: [],
      arrival: [],
      display: 'departure',
      departureEvent: true
    };
    this.updateDisplayMode = this.updateDisplayMode.bind(this);
  }

  componentDidMount() {
    fetch(`https://api.iev.aero/api/flights/${`${new Date()
      .toISOString()}`.split('T')[0]}`)
      .then(data => data.json())
      .then(({ body }) => {
        const { arrival, departure } = body;
        this.setState(() => ({
          arrival, 
          departure,
        }));
      });
  }

  updateDisplayMode(stateItem) {
    this.setState({ display: stateItem });
  }

  render() {
    const data = this.state[this.state.display];
    const displayGate = this.state.display === 'departure';
    return (
      <div>
        <Button updateDisplayMode={this.updateDisplayMode} display={this.state.display}  />
        <table>
          <thead>
            <tr>
              <th>Terminal</th>
              { displayGate ? <th>Gate</th> : null}
              <th>Local Time</th>
              <th>Destination</th>
              <th>Status</th>
              <th>Airline</th>
              <th>Flight </th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => <FlightItem item={item} key={item.ID}
              displayGate={displayGate} />)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default FlightList; 
