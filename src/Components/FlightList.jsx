import React, { Component } from 'react'
import FlightItem from './FlightItem.jsx'
import Switcher from "./Switcher";

export default class FlightList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departure: [],
      arrival: [],
      display: 'departure'
    }
    this.switchFlightList = this.switchFlightList.bind(this);
  }

  componentDidMount() {
    const date = new Date().toISOString().split('T')[0];
    fetch(`https://api.iev.aero/api/flights/${date}`)
      .then(data => data.json())
      .then(({ body }) => {
        const { arrival, departure } = body;
        this.setState(() => ({
          arrival, departure
        }))
      });
  }

  switchFlightList(displayMode) {
    this.setState({display: displayMode});
  }

  render() {
    const data = this.state[this.state.display]
    return (
      <div>
        <Switcher display={this.state.display} switchFlightList={this.switchFlightList}/>
        <table className="table">
          <thead className="thead">
            <tr>
              <th>Terminal</th>
              {this.state.display === 'departure' &&
              <th>Gate</th>
              }
              <th>Local time</th>
              <th>Destination</th>
              <th>Status</th>
              <th>Airline</th>
              <th>Flight</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="tbody">
            {data.map(item =><FlightItem key={item.ID} data={item} gate={this.state.display === 'departure'} />)}
          </tbody>
        </table>
      </div>
    )
  }
}
