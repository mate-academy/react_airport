import React, { Component } from 'react';
import FlightItem from './FlightItem';
import Button from './Button';
class FlightList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departure: [],
      arrival: [],
      display: 'departures',
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
          arrival, departure
        }))
      });
  }

  updateDisplayMode () {
    this.setState({display: 'arrivals'})
  }

  render() {
     return (
      <div>
        <Button  onClick={this.updateDisplayMode} />
        <table>
          <thead>
            <tr>
              <th>Terminal</th>
              {this.state.arrival.gateNo ? <th>Gate</th> : null}
              <th>Local Time</th>
              <th>Destination</th>
              <th>Status</th>
              <th>Airline</th>
              <th>Flight </th>
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>
            {this.state.arrival.map(item => <FlightItem arrival={item} key={item.ID} />)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default FlightList;
